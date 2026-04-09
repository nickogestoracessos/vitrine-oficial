"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { getActiveProducts, Product } from "@/lib/products-data"
import { Gamepad2, Star, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/vitrine/${product.slug}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-neon/50 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]"
    >
      {/* Image */}
      <div className="relative aspect-video bg-secondary overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isHighlighted && (
            <Badge className="bg-neon-yellow text-black border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Destaque
            </Badge>
          )}
          {product.discount && (
            <Badge className="bg-neon-yellow text-black border-0 shadow-lg font-bold">
              -{product.discount}%
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-neon transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through block">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span className="text-xl font-bold text-neon">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <Button
            size="sm"
            className="bg-neon text-black hover:bg-neon/90 font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Comprar
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const activeProducts = getActiveProducts()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neon/10 border border-neon">
                <Gamepad2 className="w-6 h-6 text-neon" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">@{slug}</h1>
                <p className="text-xs text-muted-foreground">Loja Digital</p>
              </div>
            </div>
            <Badge variant="outline" className="border-neon text-neon">
              {activeProducts.length} produtos
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-b from-neon/5 to-transparent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Produtos <span className="text-neon">Digitais</span> Premium
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Contas, licencas e produtos digitais com entrega imediata e suporte garantido
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Loja <span className="text-neon">@{slug}</span> - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
