"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ZairoLoader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Ensure loader runs for at least 5 seconds (5000ms)
    const minDisplayTime = 2000
    const startTime = Date.now()

    // Update progress gradually over 5 seconds
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const calculatedProgress = Math.min(Math.floor((elapsed / minDisplayTime) * 100), 99)

      setProgress(calculatedProgress)

      // When we reach 99%, wait a bit before hitting 100%
      if (calculatedProgress >= 99) {
        clearInterval(interval)

        // Ensure we've displayed for at least minDisplayTime
        const remainingTime = Math.max(0, minDisplayTime - elapsed)

        setTimeout(() => {
          setProgress(100)
          // Fade out the loader
          setTimeout(() => setVisible(false), 300)
        }, remainingTime)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-900 z-50"
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mb-6">
        {/* Main spinner */}
        <div className="w-20 h-20 relative">
          <motion.div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
            Z
          </div>
        </div>
      </div>

      {/* Company name */}
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">ZAIRO INTERNATIONAL</h1>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div className="h-full bg-blue-500" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </div>

      <p className="text-slate-600 dark:text-slate-400 mt-2">Loading...</p>
    </motion.div>
  )
}

