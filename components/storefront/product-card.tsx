"use client"

import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  imageUrl: string
  isHighlighted?: boolean
}

export function ProductCard({
  name,
  description,
  price,
  originalPrice,
  discount,
  imageUrl,
  isHighlighted = false,
}: ProductCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isHighlighted && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neon text-black text-xs font-semibold">
            <Star className="w-3 h-3" />
            Destaque
          </span>
        )}
      </div>
      
      {discount && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-neon-yellow text-black text-xs font-bold">
            -{discount}%
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-neon">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
          {originalPrice && (
            <span className="text-sm text-neon-yellow line-through">
              R$ {originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {/* Buy Button */}
        <Button className="w-full bg-neon text-black font-semibold hover:bg-neon/90 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)]">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar
        </Button>
      </div>
    </div>
  )
}
