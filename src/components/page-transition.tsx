"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ZairoLoader from "./loader"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Show loader on route change
    setIsLoading(true)

    // Route change completed
    const handleRouteComplete = () => {
      // The loader component handles its own timing
    }

    handleRouteComplete()

    return () => {
      // Cleanup if needed
    }
  }, [pathname])

  return (
    <>
      {isLoading && <ZairoLoader />}
      {children}
    </>
  )
}

