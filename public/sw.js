// Service Worker for Preguntas Bíblicas PWA
const CACHE_NAME = "biblical-quiz-v1.1"
const VERSION = "1.2.0"

// Assets to cache on install - include ALL critical resources
const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/offline-image.png",
  "/offline.js",
  "/data/questions.json",
]

// Create a fallback HTML page for offline navigation
const OFFLINE_HTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preguntas Bíblicas - Modo Sin Conexión</title>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 2rem; max-width: 600px; margin: 0 auto; }
    h1 { color: #4f46e5; }
    .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0; }
    .btn { background: #4f46e5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Preguntas Bíblicas</h1>
  <div class="card">
    <h2>Modo Sin Conexión</h2>
    <p>Actualmente estás sin conexión a internet. Algunas funciones pueden estar limitadas.</p>
    <p>Intenta volver a la página principal cuando recuperes la conexión.</p>
    <button class="btn" onclick="window.location.href='/'">Intentar Nuevamente</button>
  </div>
</body>
</html>
`

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing new service worker...")

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching app shell and content")
        // Pre-cache the specified static assets
        return cache.addAll(STATIC_ASSETS).then(() => {
          // Also cache an offline page
          return cache.put(
            new Request("/offline"),
            new Response(OFFLINE_HTML, {
              headers: { "Content-Type": "text/html" },
            }),
          )
        })
      })
      .catch((error) => {
        console.error("[Service Worker] Pre-caching failed:", error)
        // Continue even if some assets fail to cache
        return Promise.resolve()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating new service worker...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log("[Service Worker] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => {
        console.log("[Service Worker] Claiming clients...")
        return self.clients.claim()
      }),
  )
})

// Helper function to create a basic response
const createBasicResponse = (text, status = 200, headers = {}) => {
  return new Response(text, {
    status: status,
    headers: {
      "Content-Type": "text/plain",
      ...headers,
    },
  })
}

// Fetch event - serve from cache or network with improved offline handling
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Parse the URL
  const url = new URL(event.request.url)
  const pathname = url.pathname

  // Handle page navigations (HTML requests)
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" && event.request.headers.get("accept")?.includes("text/html"))
  ) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If navigation fails, try to serve the cached homepage
        return caches.match("/").then((response) => {
          // If we have the homepage cached, return it
          if (response) {
            return response
          }

          // Otherwise return the offline page
          return caches.match("/offline").then((offlineResponse) => {
            if (offlineResponse) {
              return offlineResponse
            }

            // Last resort fallback
            return createBasicResponse("Estás sin conexión y no se pudo cargar la página.", 503, {
              "Content-Type": "text/html",
            })
          })
        })
      }),
    )
    return
  }

  // For all other requests, try cache first, then network with cache update
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse
      }

      // If not in cache, try network
      return fetch(event.request)
        .then((networkResponse) => {
          // Don't cache if not a valid response
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse
          }

          // Clone the response to cache it and return it
          const responseToCache = networkResponse.clone()
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
            .catch((err) => {
              console.error("[Service Worker] Error caching response:", err)
            })

          return networkResponse
        })
        .catch((error) => {
          console.error("[Service Worker] Fetch failed:", error, event.request.url)

          // Provide appropriate fallbacks based on resource type

          // For JavaScript files
          if (pathname.endsWith(".js") || pathname.includes("/_next/static/chunks/")) {
            return caches
              .match("/offline.js")
              .then((response) => response || createBasicResponse('console.log("Offline fallback JS");'))
          }

          // For CSS files
          if (pathname.endsWith(".css")) {
            return createBasicResponse("/* Offline fallback CSS */", 200, { "Content-Type": "text/css" })
          }

          // For images
          if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) || pathname.includes("/image/")) {
            return caches
              .match("/offline-image.png")
              .then((response) => response || createBasicResponse("Image not available offline", 503))
          }

          // For JSON data (like questions)
          if (pathname.endsWith(".json") || pathname.includes("/data/")) {
            return createBasicResponse("[]", 200, { "Content-Type": "application/json" })
          }

          // Default fallback for any other resource type
          return createBasicResponse("Resource not available offline", 503)
        })
    }),
  )
})

// Message event - handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[Service Worker] Skip waiting and activate immediately")
    self.skipWaiting()
  }
})

// Log any errors that occur within the service worker
self.addEventListener("error", (event) => {
  console.error("[Service Worker] Error:", event.message, event.filename, event.lineno)
})

console.log("[Service Worker] Service worker registered with version", VERSION)

