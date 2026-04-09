"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { QrCode, Check, Gift, Copy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products-data"
import { getProductById } from "@/lib/products-data"
import { storeConfig } from "@/lib/store-config"

interface CheckoutFormProps {
  product: Product
}

export function CheckoutForm({ product }: CheckoutFormProps) {
  const router = useRouter()
  const [orderBumpAccepted, setOrderBumpAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPixCode, setShowPixCode] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const { checkoutFields } = storeConfig
  const orderBumpProduct = product.orderBump ? getProductById(product.orderBump.productId) : null

  const calculateTotal = () => {
    let total = product.price
    if (orderBumpAccepted && product.orderBump) {
      total += product.orderBump.discountedPrice
    }
    return total
  }

  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540" + calculateTotal().toFixed(2) + "5802BR5925GAMERTECH STORE6009SAO PAULO62070503***63041234"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate PIX generation
    await new Promise(resolve => setTimeout(resolve, 1500))
    setShowPixCode(true)
    setIsProcessing(false)
  }

  const handleConfirmPayment = () => {
    // Build query params for thank you page
    const params = new URLSearchParams({
      product: product.slug,
      ...(orderBumpAccepted && product.orderBump ? { orderbump: product.orderBump.productId.toString() } : {})
    })
    router.push(`/obrigado?${params.toString()}`)
  }

  if (showPixCode) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-card border border-neon">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-neon/20 flex items-center justify-center mb-4">
              <QrCode className="w-8 h-8 text-neon" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Pague com PIX</h3>
            <p className="text-sm text-muted-foreground mt-1">Escaneie o QR Code ou copie o codigo</p>
          </div>

          {/* QR Code placeholder */}
          <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-6">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI5MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMzAiIHk9IjEwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTUwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjE3MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz48L3N2Zz4=')] bg-contain bg-center bg-no-repeat" />
          </div>

          {/* PIX Code */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary border border-border">
              <code className="flex-1 text-xs text-foreground break-all font-mono">
                {pixCode.substring(0, 50)}...
              </code>
              <Button
                type="button"
                onClick={handleCopyPix}
                variant="outline"
                size="sm"
                className="flex-shrink-0 border-neon text-neon hover:bg-neon/10"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-neon-yellow">
              <Clock className="w-4 h-4" />
              <span>Este codigo expira em 30 minutos</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground">Total:</span>
              <span className="text-2xl font-bold text-neon">
                R$ {calculateTotal().toFixed(2).replace(".", ",")}
              </span>
            </div>

            <Button
              onClick={handleConfirmPayment}
              className="w-full h-12 bg-neon text-black font-bold hover:bg-neon/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            >
              <Check className="w-5 h-5 mr-2" />
              Ja Fiz o Pagamento
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Data */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Dados do Comprador</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Nome Completo</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
            />
          </div>

          {checkoutFields.email && (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
              />
              <p className="text-xs text-muted-foreground">O produto sera entregue neste e-mail</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checkoutFields.cpf && (
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-foreground">CPF</Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  required
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
                />
              </div>
            )}
            
            {checkoutFields.whatsapp && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">WhatsApp</Label>
                <Input
                  id="phone"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(00) 00000-0000"
                  required
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Bump */}
      {product.orderBump && orderBumpProduct && (
        <div 
          className={cn(
            "p-6 rounded-2xl border-2 transition-all cursor-pointer",
            orderBumpAccepted 
              ? "bg-neon/10 border-neon" 
              : "bg-card border-neon-yellow/50 hover:border-neon-yellow"
          )}
          onClick={() => setOrderBumpAccepted(!orderBumpAccepted)}
        >
          <div className="flex items-start gap-4">
            <Checkbox
              id="orderBump"
              checked={orderBumpAccepted}
              onCheckedChange={(checked) => setOrderBumpAccepted(checked as boolean)}
              className="mt-1 border-neon-yellow data-[state=checked]:bg-neon data-[state=checked]:border-neon"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-neon-yellow" />
                <span className="text-sm font-bold text-neon-yellow uppercase">Oferta Especial!</span>
              </div>
              
              <div className="flex gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <Image
                    src={orderBumpProduct.imageUrl}
                    alt={orderBumpProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{orderBumpProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.orderBump.description}</p>
                  
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold text-neon">
                      R$ {product.orderBump.discountedPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {orderBumpProduct.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment - PIX Only */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Forma de Pagamento</h3>
        
        <div className="p-4 rounded-xl bg-neon/10 border border-neon/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon/20 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-neon" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-neon">PIX</p>
                <span className="px-2 py-0.5 rounded-full bg-neon text-black text-xs font-bold">
                  Instantaneo
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Pagamento instantaneo via PIX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total and Submit */}
      <div className="p-6 rounded-2xl bg-card border border-neon">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg text-foreground">Total a pagar:</span>
          <span className="text-3xl font-bold text-neon">
            R$ {calculateTotal().toFixed(2).replace(".", ",")}
          </span>
        </div>

        <Button 
          type="submit"
          disabled={isProcessing}
          className="w-full h-14 text-lg bg-neon text-black font-bold hover:bg-neon/90 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Gerando PIX...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Gerar PIX
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
