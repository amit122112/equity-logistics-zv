"use client"

import type React from "react"
import { AuthProvider, useAuth } from "@/components/AuthProvider"
import { NotificationProvider } from "@/contexts/NotificationContext"

function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <LoadingWrapper>{children}</LoadingWrapper>
      </NotificationProvider>
    </AuthProvider>
  )
}
