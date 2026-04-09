import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Zap, Shield, Lock, ArrowLeft } from "lucide-react"
import { getProductBySlug, products } from "@/lib/products-data"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    return { title: "Checkout - Produto nao encontrado" }
  }

  return {
    title: `Checkout - ${product.name} - GamerTech`,
    description: `Finalize sua compra de ${product.name}`,
  }
}

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/vitrine" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon">
              <Zap className="w-5 h-5 text-neon" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">GamerTech</h1>
              <p className="text-xs text-muted-foreground">Checkout Seguro</p>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-sm text-neon">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Pagamento Seguro</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Link 
          href={`/vitrine/${product.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o produto
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <CheckoutForm product={product} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Product Summary Card */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Resumo do Pedido</h3>
                
                <div className="flex gap-4 pb-4 border-b border-border">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground line-clamp-1">{product.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      R$ {(product.originalPrice || product.price).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  
                  {product.discount && product.originalPrice && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neon">Desconto ({product.discount}%)</span>
                      <span className="text-neon">
                        - R$ {(product.originalPrice - product.price).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-neon">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neon/10">
                    <Shield className="w-5 h-5 text-neon" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Compra 100% Segura</p>
                    <p className="text-xs text-muted-foreground">Seus dados estao protegidos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">
            Ao finalizar a compra, voce concorda com nossos Termos de Uso e Politica de Privacidade
          </p>
        </div>
      </footer>
    </div>
  )
}
