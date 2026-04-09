"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Dashboard } from "@/components/admin/dashboard"
import { ProductsList } from "@/components/admin/products-list"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "produtos":
        return <ProductsList />
      case "categorias":
        return (
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Categorias</h2>
            <p className="text-muted-foreground">Gerencie as categorias dos seus produtos.</p>
          </div>
        )
      case "financeiro":
        return (
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Financeiro</h2>
            <p className="text-muted-foreground">Acompanhe seu faturamento e transações.</p>
          </div>
        )
      case "configuracoes":
        return (
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Configurações</h2>
            <p className="text-muted-foreground">Configure seu painel e preferências.</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  )
}
