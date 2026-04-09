"use client"

import { useMemo } from "react"
import { Tag, Package, TrendingUp, Eye } from "lucide-react"
import { products } from "@/lib/products-data"

interface CategoryStats {
  name: string
  count: number
  activeCount: number
  totalRevenue: number
}

export function CategoriesPage() {
  // Extract unique categories from products and calculate stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, CategoryStats> = {}
    
    products.forEach((product) => {
      const cat = product.category.toLowerCase()
      
      if (!stats[cat]) {
        stats[cat] = {
          name: cat,
          count: 0,
          activeCount: 0,
          totalRevenue: 0
        }
      }
      
      stats[cat].count++
      if (product.isActive) {
        stats[cat].activeCount++
      }
      stats[cat].totalRevenue += product.price
    })
    
    return Object.values(stats).sort((a, b) => b.count - a.count)
  }, [])

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "contas": "Contas Digitais",
      "e-books": "E-books",
      "cursos": "Cursos Online",
      "software": "Software",
      "games": "Games",
      "assinaturas": "Assinaturas"
    }
    return labels[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  const getCategoryIcon = (category: string) => {
    // You can customize icons per category
    return Tag
  }

  const totalProducts = products.length
  const totalActive = products.filter(p => p.isActive).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neon">Categorias</h2>
        <p className="text-sm text-muted-foreground">
          Categorias sincronizadas automaticamente com seus produtos
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{categoryStats.length}</p>
              <p className="text-sm text-muted-foreground">Categorias</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
              <p className="text-sm text-muted-foreground">Total Produtos</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalActive}</p>
              <p className="text-sm text-muted-foreground">Produtos Ativos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Lista de Categorias</h3>
        
        <div className="space-y-3">
          {categoryStats.map((category) => {
            const Icon = getCategoryIcon(category.name)
            const percentage = totalProducts > 0 ? Math.round((category.count / totalProducts) * 100) : 0
            
            return (
              <div 
                key={category.name}
                className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-neon/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neon" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {getCategoryLabel(category.name)}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {category.activeCount} de {category.count} produtos ativos
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-neon">{category.count}</p>
                    <p className="text-xs text-muted-foreground">{percentage}% do total</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-neon rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Products in this category */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {products
                    .filter(p => p.category.toLowerCase() === category.name)
                    .slice(0, 5)
                    .map((product) => (
                      <span 
                        key={product.id}
                        className="px-2 py-1 text-xs rounded-full bg-background border border-border text-muted-foreground"
                      >
                        {product.name}
                      </span>
                    ))}
                  {category.count > 5 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-neon/10 text-neon">
                      +{category.count - 5} mais
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {categoryStats.length === 0 && (
          <div className="text-center py-8">
            <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma categoria encontrada</p>
            <p className="text-sm text-muted-foreground">
              Adicione produtos para criar categorias automaticamente
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-xl bg-neon/5 border border-neon/30">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Categorias Automaticas</p>
            <p className="text-xs text-muted-foreground">
              As categorias sao criadas automaticamente quando voce cadastra produtos. 
              Para adicionar uma nova categoria, basta criar um produto com a categoria desejada.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
