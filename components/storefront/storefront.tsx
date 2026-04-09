"use client"

import { Zap } from "lucide-react"
import { ProductCard } from "./product-card"

export function Storefront() {
  const products = [
    {
      id: 1,
      name: "Conta Premium Netflix",
      description: "Acesso completo a todos os filmes e séries em 4K Ultra HD",
      price: 29.90,
      originalPrice: 39.90,
      discount: 10,
      imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
      isHighlighted: true,
    },
    {
      id: 2,
      name: "Spotify Premium Anual",
      description: "Músicas ilimitadas sem anúncios, download offline",
      price: 19.90,
      imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop",
      isHighlighted: false,
    },
    {
      id: 3,
      name: "E-book Marketing Digital",
      description: "Guia completo para dominar o marketing nas redes sociais",
      price: 47.00,
      originalPrice: 97.00,
      discount: 50,
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
      isHighlighted: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-center gap-3 py-8 border-b border-border">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 border border-neon">
          <Zap className="w-7 h-7 text-neon" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Pulo do Gato Digital</h1>
          <p className="text-xs text-muted-foreground">Produtos digitais premium</p>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Produtos em Destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  )
}
