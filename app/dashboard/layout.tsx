import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"
import UserSidebar from "../../components/UserSidebar"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex bg-white min-h-screen">
        <UserSidebar />

        <div className="flex-1 flex flex-col">
          <Navbar userRole="user" />
          <main className="flex-1 p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  )
}
