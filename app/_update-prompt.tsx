"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function UpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Get the registration when the component mounts
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          setRegistration(reg)

          // Set up an event listener for when a new service worker is waiting
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            // The service worker controller has changed, refresh the page
            window.location.reload()
          })
        }
      })

      // Listen for updates
      const handleUpdate = () => {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg && reg.waiting) {
            // A new service worker is waiting
            setShowUpdatePrompt(true)
          }
        })
      }

      // Check for updates when the page becomes visible
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
              reg.update().then(handleUpdate)
            }
          })
        }
      })

      // Set up an interval to check for updates
      const interval = setInterval(
        () => {
          navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
              reg.update().then(handleUpdate)
            }
          })
        },
        60 * 60 * 1000,
      ) // Check every hour

      return () => clearInterval(interval)
    }
  }, [])

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      // Send a message to the waiting service worker to skip waiting
      registration.waiting.postMessage({ type: "SKIP_WAITING" })
      setShowUpdatePrompt(false)
    }
  }

  if (!showUpdatePrompt) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground p-4 rounded-md shadow-lg flex items-center gap-3">
      <p>¡Nueva versión disponible!</p>
      <Button onClick={handleUpdate} variant="secondary" className="flex items-center gap-2">
        <RefreshCw size={16} />
        Actualizar
      </Button>
    </div>
  )
}

