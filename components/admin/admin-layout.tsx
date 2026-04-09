"use client"

import { useState } from "react"
import { AdminHeader } from "./admin-header"
import { AdminNav } from "./admin-nav"

interface AdminLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <AdminNav activeTab={activeTab} onTabChange={onTabChange} />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
