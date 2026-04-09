"use client"

import { DashboardCards } from "./dashboard-cards"
import { ActivityChart } from "./activity-chart"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Visão geral do seu marketplace
        </p>
      </div>
      
      <DashboardCards />
      <ActivityChart />
    </div>
  )
}
