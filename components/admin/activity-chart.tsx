"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const filters = ["Todos", "Visualizações", "Cliques", "Pedidos"]

const data = [
  { day: "1", views: 120, clicks: 45, orders: 12 },
  { day: "5", views: 180, clicks: 67, orders: 18 },
  { day: "10", views: 240, clicks: 89, orders: 24 },
  { day: "15", views: 200, clicks: 78, orders: 20 },
  { day: "20", views: 320, clicks: 120, orders: 35 },
  { day: "25", views: 280, clicks: 98, orders: 28 },
  { day: "30", views: 350, clicks: 130, orders: 42 },
]

export function ActivityChart() {
  const [activeFilter, setActiveFilter] = useState("Todos")

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Atividade 30 dias
        </h3>
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200",
                activeFilter === filter
                  ? "bg-neon text-black"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="day"
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            {(activeFilter === "Todos" || activeFilter === "Visualizações") && (
              <Line
                type="monotone"
                dataKey="views"
                stroke="#39ff14"
                strokeWidth={2}
                dot={{ fill: "#39ff14", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#39ff14" }}
              />
            )}
            {(activeFilter === "Todos" || activeFilter === "Cliques") && (
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#00ff88"
                strokeWidth={2}
                dot={{ fill: "#00ff88", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#00ff88" }}
              />
            )}
            {(activeFilter === "Todos" || activeFilter === "Pedidos") && (
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#ffff00"
                strokeWidth={2}
                dot={{ fill: "#ffff00", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#ffff00" }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon" />
          <span className="text-xs text-muted-foreground">Visualizações</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00ff88]" />
          <span className="text-xs text-muted-foreground">Cliques</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-yellow" />
          <span className="text-xs text-muted-foreground">Pedidos</span>
        </div>
      </div>
    </div>
  )
}
