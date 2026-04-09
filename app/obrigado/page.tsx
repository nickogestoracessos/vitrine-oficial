"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Download, ExternalLink, Gift, Zap, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductBySlug, getProductById } from "@/lib/products-data"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get("product")
  const orderBumpId = searchParams.get("orderbump")

  const mainProduct = productSlug ? getProductBySlug(productSlug) : null
  const orderBumpProduct = orderBumpId ? getProductById(parseInt(orderBumpId)) : null

  if (!mainProduct) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Pedido nao encontrado</h1>
        <Link href="/vitrine" className="text-neon hover:underline mt-4 inline-block">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto rounded-full bg-neon/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(57,255,20,0.3)]">
          <CheckCircle className="w-12 h-12 text-neon" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pagamento Confirmado!</h1>
        <p className="text-muted-foreground">
          Obrigado pela sua compra. Seus produtos estao prontos para acesso.
        </p>
      </div>

      {/* Products Deliverables */}
      <div className="space-y-4">
        {/* Main Product */}
        <div className="p-6 rounded-2xl bg-card border border-neon">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
              <Image
                src={mainProduct.imageUrl}
                alt={mainProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-neon" />
                <span className="text-xs font-medium text-neon uppercase">Produto Principal</span>
              </div>
              <h3 className="font-bold text-foreground text-lg">{mainProduct.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{mainProduct.description}</p>
            </div>
          </div>

          <Button
            asChild
            className="w-full h-14 text-lg bg-neon text-black font-bold hover:bg-neon/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
          >
            <a href={mainProduct.deliveryLink} target="_blank" rel="noopener noreferrer">
              <Download className="w-5 h-5 mr-2" />
              Acessar {mainProduct.name}
            </a>
          </Button>
        </div>

        {/* Order Bump Product */}
        {orderBumpProduct && (
          <div className="p-6 rounded-2xl bg-card border border-neon-yellow/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <Image
                  src={orderBumpProduct.imageUrl}
                  alt={orderBumpProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-4 h-4 text-neon-yellow" />
                  <span className="text-xs font-medium text-neon-yellow uppercase">Order Bump</span>
                </div>
                <h3 className="font-bold text-foreground text-lg">{orderBumpProduct.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{orderBumpProduct.description}</p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full h-14 text-lg border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10 font-bold"
            >
              <a href={orderBumpProduct.deliveryLink} target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Acessar {orderBumpProduct.name}
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-border">
        <h3 className="font-semibold text-foreground mb-3">Instrucoes Importantes</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-neon">•</span>
            Clique nos botoes acima para acessar seus produtos
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon">•</span>
            Os links tambem foram enviados para seu e-mail
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon">•</span>
            Em caso de duvidas, entre em contato pelo WhatsApp
          </li>
        </ul>
      </div>

      {/* Back to Store */}
      <div className="mt-8 text-center">
        <Link 
          href="/vitrine"
          className="inline-flex items-center gap-2 text-neon hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Continuar comprando
        </Link>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-yellow/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center">
          <Link href="/vitrine" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon">
              <Zap className="w-5 h-5 text-neon" />
            </div>
            <h1 className="text-lg font-bold text-foreground">GamerTech</h1>
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-6 py-12">
        <Suspense fallback={
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-neon border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }>
          <ThankYouContent />
        </Suspense>
      </main>
    </div>
  )
}
