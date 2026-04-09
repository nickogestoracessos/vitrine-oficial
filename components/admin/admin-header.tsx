"use client"

import { Gamepad2, LogOut, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neon/10 border border-neon">
          <Gamepad2 className="w-6 h-6 text-neon" />
        </div>
        <span className="text-lg font-semibold text-foreground">Painel Admin</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">nickofaroli</span>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-neon text-neon hover:bg-neon/10 hover:text-neon bg-transparent"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Ver Vitrine
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  )
}
