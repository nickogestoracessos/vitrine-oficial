"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products-data"

interface VitrineProductCardProps {
  product: Product
}

export function VitrineProductCard({ product }: VitrineProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isHighlighted && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon text-black text-xs font-semibold">
            <Star className="w-3 h-3" />
            Destaque
          </span>
        )}
      </div>
      
      {product.discount && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-neon-yellow text-black text-xs font-bold">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Image */}
      <Link href={`/vitrine/${product.slug}`}>
        <div className="relative h-44 overflow-hidden bg-secondary">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/vitrine/${product.slug}`}>
          <h3 className="text-base font-bold text-foreground mb-1 line-clamp-1 group-hover:text-neon transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-neon">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neon-yellow line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {/* Buy Button */}
        <Link href={`/vitrine/${product.slug}/checkout`}>
          <Button className="w-full bg-neon text-black font-semibold hover:bg-neon/90 transition-all shadow-[0_0_15px_rgba(57,255,20,0.25)] hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Comprar
          </Button>
        </Link>
      </div>
    </div>
  )
}
