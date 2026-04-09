"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Dashboard } from "@/components/admin/dashboard"
import { ProductForm } from "@/components/admin/product-form"
import { Storefront } from "@/components/storefront/storefront"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showStorefront, setShowStorefront] = useState(false)

  if (showStorefront) {
    return (
      <div>
        <button
          onClick={() => setShowStorefront(false)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-card border border-neon text-neon rounded-lg hover:bg-neon/10 transition-all"
        >
          Voltar ao Admin
        </button>
        <Storefront />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "produtos":
        return <ProductForm />
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
      <button
        onClick={() => setShowStorefront(true)}
        className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-neon text-black font-semibold rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] transition-all"
      >
        Ver Vitrine
      </button>
      {renderContent()}
    </AdminLayout>
  )
}
