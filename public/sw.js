// Service Worker for Preguntas Bíblicas PWA
const CACHE_NAME = "biblical-quiz-v1"
const VERSION = "1.0.0"

// Assets to cache on install - include ALL critical resources
const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icon-192x192.png",
  "/icon-512x512.png",
  // Add the data file containing questions
  "/data/questions.json",
  // Add critical JavaScript and CSS files
  "/_next/static/chunks/main.js",
  "/_next/static/chunks/webpack.js",
  "/_next/static/chunks/pages/_app.js",
  "/_next/static/chunks/pages/index.js",
  "/_next/static/css/main.css",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache the specified static assets
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error("Pre-caching failed:", error)
        // Continue even if some assets fail to cache
        return Promise.resolve()
      })
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)),
      )
    }),
  )
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim())
})

// Fetch event - serve from cache or network with improved offline handling
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and cross-origin requests
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Special handling for page navigations (HTML requests)
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" && event.request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If navigation fails, serve the cached homepage
        return caches.match("/")
      }),
    )
    return
  }

  // For all other requests, try cache first, then network with cache update
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        // Update cache in the background (for non-STATIC_ASSETS)
        if (!STATIC_ASSETS.includes(new URL(event.request.url).pathname)) {
          fetch(event.request)
            .then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, response)
                })
              }
            })
            .catch(() => {
              /* Ignore network errors during background update */
            })
        }
        return cachedResponse
      }

      // If not in cache, try network
      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200) {
            return response
          }

          // Clone the response to cache it and return it
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch((error) => {
          console.error("Fetch failed:", error)

          // For JavaScript or CSS files, return a fallback if possible
          if (event.request.url.match(/\.(js|css)$/)) {
            return caches.match("/offline.js")
          }

          // For images, return a fallback image
          if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return caches.match("/offline-image.png")
          }

          // For JSON data (like questions), return empty data
          if (event.request.url.includes("/data/")) {
            return new Response(JSON.stringify([]), {
              headers: { "Content-Type": "application/json" },
            })
          }

          // Otherwise, just propagate the error
          throw error
        })
    }),
  )
})

// Message event - handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

