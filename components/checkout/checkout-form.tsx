"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Smartphone, QrCode, Check, Plus, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products-data"
import { getProductById } from "@/lib/products-data"

interface CheckoutFormProps {
  product: Product
}

const paymentMethods = [
  { id: "pix", label: "PIX", icon: QrCode, discount: "5% OFF" },
  { id: "cartao", label: "Cartao", icon: CreditCard },
  { id: "boleto", label: "Boleto", icon: Smartphone },
]

export function CheckoutForm({ product }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [orderBumpAccepted, setOrderBumpAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const orderBumpProduct = product.orderBump ? getProductById(product.orderBump.productId) : null

  const calculateTotal = () => {
    let total = product.price
    if (orderBumpAccepted && product.orderBump) {
      total += product.orderBump.discountedPrice
    }
    if (paymentMethod === "pix") {
      total = total * 0.95 // 5% discount for PIX
    }
    return total
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert("Pedido realizado com sucesso! Voce recebera os dados de acesso por e-mail.")
    setIsProcessing(false)
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
              placeholder="Seu nome completo"
              required
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
            />
            <p className="text-xs text-muted-foreground">O produto sera entregue neste e-mail</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-foreground">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                required
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">WhatsApp</Label>
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
              />
            </div>
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

      {/* Payment Method */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Forma de Pagamento</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                paymentMethod === method.id
                  ? "border-neon bg-neon/10"
                  : "border-border bg-secondary hover:border-neon/50"
              )}
            >
              {method.discount && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-neon text-black text-xs font-bold">
                  {method.discount}
                </span>
              )}
              <method.icon className={cn(
                "w-6 h-6",
                paymentMethod === method.id ? "text-neon" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm font-medium",
                paymentMethod === method.id ? "text-neon" : "text-foreground"
              )}>
                {method.label}
              </span>
            </button>
          ))}
        </div>

        {/* Card details form */}
        {paymentMethod === "cartao" && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-foreground">Numero do Cartao</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-foreground">Validade</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="000"
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-foreground">Nome no Cartao</Label>
              <Input
                id="cardName"
                placeholder="Como aparece no cartao"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
              />
            </div>
          </div>
        )}

        {paymentMethod === "pix" && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-neon/10 border border-neon/30">
              <QrCode className="w-8 h-8 text-neon" />
              <div>
                <p className="text-sm font-medium text-foreground">Pague com PIX e ganhe 5% de desconto!</p>
                <p className="text-xs text-muted-foreground">O QR Code sera gerado apos confirmar o pedido</p>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "boleto" && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border">
              <Smartphone className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Boleto Bancario</p>
                <p className="text-xs text-muted-foreground">O boleto sera gerado apos confirmar o pedido. Vencimento em 3 dias.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Total and Submit */}
      <div className="p-6 rounded-2xl bg-card border border-neon">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg text-foreground">Total a pagar:</span>
          <div className="text-right">
            <span className="text-3xl font-bold text-neon">
              R$ {calculateTotal().toFixed(2).replace(".", ",")}
            </span>
            {paymentMethod === "pix" && (
              <p className="text-xs text-neon">Inclui 5% de desconto PIX</p>
            )}
          </div>
        </div>

        <Button 
          type="submit"
          disabled={isProcessing}
          className="w-full h-14 text-lg bg-neon text-black font-bold hover:bg-neon/90 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] disabled:opacity-50"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Processando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Finalizar Compra
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
