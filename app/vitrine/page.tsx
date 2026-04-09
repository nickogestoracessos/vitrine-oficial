import { Zap } from "lucide-react"
import Link from "next/link"
import { getActiveProducts, getHighlightedProducts } from "@/lib/products-data"
import { VitrineProductCard } from "@/components/storefront/vitrine-product-card"

export const metadata = {
  title: "Vitrine - GamerTech",
  description: "Produtos digitais premium para gamers",
}

export default function VitrinePage() {
  const highlightedProducts = getHighlightedProducts()
  const allProducts = getActiveProducts()
  const regularProducts = allProducts.filter(p => !p.isHighlighted)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/vitrine" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon">
              <Zap className="w-5 h-5 text-neon" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">GamerTech</h1>
              <p className="text-xs text-muted-foreground">Produtos digitais premium</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neon/10 via-background to-background py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon/20 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Produtos Digitais
            <span className="text-neon block mt-2">Para Gamers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contas premium, gift cards, e-books e muito mais. Entrega imediata e suporte 24h.
          </p>
        </div>
      </section>

      {/* Highlighted Products */}
      {highlightedProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-neon rounded-full" />
            <h3 className="text-2xl font-bold text-foreground">Em Destaque</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {highlightedProducts.map((product) => (
              <VitrineProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-border rounded-full" />
          <h3 className="text-2xl font-bold text-foreground">Todos os Produtos</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regularProducts.map((product) => (
            <VitrineProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            GamerTech - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
