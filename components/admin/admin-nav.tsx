"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "produtos", label: "Meus Produtos" },
  { id: "categorias", label: "Categorias" },
  { id: "financeiro", label: "Financeiro" },
  { id: "configuracoes", label: "Configurações" },
]

interface AdminNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminNav({ activeTab, onTabChange }: AdminNavProps) {
  return (
    <nav className="flex items-center gap-1 px-6 py-2 bg-card border-b border-border overflow-x-auto">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            activeTab === item.id
              ? "bg-neon text-black"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
