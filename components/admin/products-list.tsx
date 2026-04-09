"use client"

import { useState } from "react"
import { products, Product } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Package } from "lucide-react"
import Image from "next/image"
import { ProductForm } from "./product-form"

export function ProductsList() {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (showForm) {
    return (
      <div className="space-y-4">
        <Button
          onClick={handleCloseForm}
          variant="outline"
          className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          Voltar para Produtos
        </Button>
        <ProductForm product={editingProduct} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Meus Produtos</h2>
          <p className="text-sm text-muted-foreground">{products.length} produtos cadastrados</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-neon text-black hover:bg-neon/90 font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Criar Produto
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="p-4 bg-card border-border hover:border-neon/30 transition-all"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.isHighlighted && (
                  <div className="absolute top-1 left-1 bg-neon-yellow text-black p-1 rounded">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="border-border text-muted-foreground text-xs"
                      >
                        {product.category}
                      </Badge>
                      {product.orderBump && (
                        <Badge
                          variant="outline"
                          className="border-neon/50 text-neon text-xs"
                        >
                          <Package className="w-3 h-3 mr-1" />
                          Order Bump
                        </Badge>
                      )}
                      {product.isActive ? (
                        <Badge className="bg-neon/20 text-neon border-0 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inativo
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                      <span className="text-lg font-bold text-neon">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    {product.discount && (
                      <span className="text-xs text-neon-yellow font-semibold">
                        -{product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                    className="border-border text-muted-foreground hover:border-neon hover:text-neon"
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
