import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Zap, Star, ShoppingCart, ArrowLeft, Check, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductBySlug, products } from "@/lib/products-data"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    return { title: "Produto nao encontrado" }
  }

  return {
    title: `${product.name} - GamerTech`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/vitrine" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon">
              <Zap className="w-5 h-5 text-neon" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">GamerTech</h1>
              <p className="text-xs text-muted-foreground">Produtos digitais premium</p>
            </div>
          </Link>
          <Link 
            href="/vitrine" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </header>

      {/* Product Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isHighlighted && (
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-neon text-black text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    Destaque
                  </span>
                )}
              </div>
              {product.discount && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 rounded-full bg-neon-yellow text-black text-sm font-bold">
                    -{product.discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border">
                <Shield className="w-6 h-6 text-neon" />
                <span className="text-xs text-muted-foreground text-center">Compra Segura</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border">
                <Clock className="w-6 h-6 text-neon" />
                <span className="text-xs text-muted-foreground text-center">Entrega Imediata</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border">
                <Check className="w-6 h-6 text-neon" />
                <span className="text-xs text-muted-foreground text-center">Suporte 24h</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary text-xs text-muted-foreground capitalize">
              {product.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-neon">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-lg text-neon-yellow line-through">
                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-xs text-neon">
                    Economize R$ {(product.originalPrice - product.price).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href={`/vitrine/${product.slug}/checkout`} className="block mb-8">
              <Button className="w-full h-14 text-lg bg-neon text-black font-bold hover:bg-neon/90 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.5)]">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Comprar Agora
              </Button>
            </Link>

            {/* Description */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Descricao do Produto</h3>
              <div className="prose prose-invert prose-sm max-w-none">
                {product.fullDescription.split('\n').map((line, index) => (
                  <p key={index} className="text-muted-foreground whitespace-pre-wrap">
                    {line.startsWith('**') ? (
                      <strong className="text-foreground">{line.replace(/\*\*/g, '')}</strong>
                    ) : line.startsWith('- ') ? (
                      <span className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-neon mt-0.5 flex-shrink-0" />
                        {line.replace('- ', '')}
                      </span>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

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
