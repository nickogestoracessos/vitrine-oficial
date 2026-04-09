"use client"

import { Package, Eye, MousePointerClick, Clock, CheckCircle, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  highlighted?: boolean
}

function StatCard({ title, value, icon, highlighted = false }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-5 rounded-xl bg-card transition-all duration-200",
        highlighted
          ? "border-2 border-neon shadow-[0_0_20px_rgba(57,255,20,0.15)]"
          : "border border-border"
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn(
          "text-sm font-medium",
          highlighted ? "text-neon" : "text-muted-foreground"
        )}>
          {title}
        </span>
        <div className={cn(
          "p-2 rounded-lg",
          highlighted ? "bg-neon/10 text-neon" : "bg-secondary text-muted-foreground"
        )}>
          {icon}
        </div>
      </div>
      <span className={cn(
        "text-2xl font-bold",
        highlighted ? "text-neon" : "text-foreground"
      )}>
        {value}
      </span>
    </div>
  )
}

export function DashboardCards() {
  const stats = [
    {
      title: "Total Produtos",
      value: "24",
      icon: <Package className="w-5 h-5" />,
      highlighted: true,
    },
    {
      title: "Visualizações",
      value: "1,234",
      icon: <Eye className="w-5 h-5" />,
      highlighted: false,
    },
    {
      title: "Cliques",
      value: "567",
      icon: <MousePointerClick className="w-5 h-5" />,
      highlighted: false,
    },
    {
      title: "Pedidos Pendentes",
      value: "8",
      icon: <Clock className="w-5 h-5" />,
      highlighted: false,
    },
    {
      title: "Pedidos Pagos",
      value: "156",
      icon: <CheckCircle className="w-5 h-5" />,
      highlighted: false,
    },
    {
      title: "Faturamento",
      value: "R$ 12.450,00",
      icon: <DollarSign className="w-5 h-5" />,
      highlighted: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
