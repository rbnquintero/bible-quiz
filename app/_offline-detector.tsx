"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      if (wasOffline) {
        setShowReconnected(true)
        setTimeout(() => setShowReconnected(false), 3000)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [wasOffline])

  if (!isOnline) {
    return (
      <Alert variant="destructive" className="mb-4">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>Sin conexión</AlertTitle>
        <AlertDescription>
          Estás en modo sin conexión. La aplicación seguirá funcionando con los datos almacenados localmente.
        </AlertDescription>
      </Alert>
    )
  }

  if (showReconnected) {
    return (
      <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
        <Wifi className="h-4 w-4" />
        <AlertTitle>Conexión restaurada</AlertTitle>
        <AlertDescription>Tu conexión a internet ha sido restaurada.</AlertDescription>
      </Alert>
    )
  }

  return null
}

