"use client"

import { useState } from "react"
import { Upload, Link2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const categories = [
  "Contas",
  "E-books",
  "Cursos",
  "Software",
  "Serviços",
  "Outros",
]

const discounts = [
  "Sem desconto",
  "5%",
  "10%",
  "15%",
  "20%",
  "25%",
  "30%",
]

const checkoutTypes = [
  { id: "direto", label: "Checkout Direto" },
  { id: "externo", label: "Link Externo" },
  { id: "whatsapp", label: "WhatsApp" },
]

export function ProductForm() {
  const [uploadMode, setUploadMode] = useState<"upload" | "url">("upload")
  const [checkoutType, setCheckoutType] = useState("direto")
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [showInStorefront, setShowInStorefront] = useState(true)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neon mb-1">Novo Produto</h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados do seu produto digital
        </p>
      </div>

      <div className="space-y-6 p-6 rounded-xl bg-card border border-border">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Nome</Label>
            <Input
              id="name"
              placeholder="Ex: Conta Premium Netflix"
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground">Preço</Label>
            <Input
              id="price"
              type="text"
              placeholder="R$ 0,00"
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground">Categoria</Label>
            <Select>
              <SelectTrigger className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category.toLowerCase()}
                    className="text-foreground focus:bg-neon/20 focus:text-neon"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Desconto</Label>
            <Select>
              <SelectTrigger className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon">
                <SelectValue placeholder="Selecione um desconto" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {discounts.map((discount) => (
                  <SelectItem
                    key={discount}
                    value={discount.toLowerCase().replace("%", "")}
                    className="text-foreground focus:bg-neon/20 focus:text-neon"
                  >
                    {discount}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDesc" className="text-foreground">Descrição Curta</Label>
          <Input
            id="shortDesc"
            placeholder="Uma breve descrição do produto"
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDesc" className="text-foreground">Descrição Completa</Label>
          <Textarea
            id="fullDesc"
            placeholder="Descreva detalhadamente seu produto..."
            rows={4}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <Label className="text-foreground">Imagem do Produto</Label>
          <div className="flex items-center gap-2 mb-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUploadMode("upload")}
              className={cn(
                "transition-all",
                uploadMode === "upload"
                  ? "border-neon text-neon bg-neon/10"
                  : "border-border text-muted-foreground bg-transparent hover:text-foreground"
              )}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUploadMode("url")}
              className={cn(
                "transition-all",
                uploadMode === "url"
                  ? "border-neon text-neon bg-neon/10"
                  : "border-border text-muted-foreground bg-transparent hover:text-foreground"
              )}
            >
              <Link2 className="w-4 h-4 mr-2" />
              URL
            </Button>
          </div>

          {uploadMode === "upload" ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-neon bg-neon/5 cursor-pointer hover:bg-neon/10 transition-all">
              <div className="p-4 rounded-full bg-neon/10 mb-4">
                <Upload className="w-8 h-8 text-neon" />
              </div>
              <p className="text-sm text-foreground font-medium mb-1">
                Arraste e solte ou clique para enviar
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG ou WEBP (máx. 5MB)
              </p>
            </div>
          ) : (
            <Input
              placeholder="https://exemplo.com/imagem.png"
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
            />
          )}
        </div>

        {/* Checkout Type */}
        <div className="space-y-3">
          <Label className="text-foreground">Tipo de Checkout</Label>
          <div className="flex flex-wrap gap-3">
            {checkoutTypes.map((type) => (
              <label
                key={type.id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
                  checkoutType === type.id
                    ? "border-neon bg-neon/10 text-neon"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <input
                  type="radio"
                  name="checkoutType"
                  value={type.id}
                  checked={checkoutType === type.id}
                  onChange={(e) => setCheckoutType(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    checkoutType === type.id ? "border-neon" : "border-muted-foreground"
                  )}
                >
                  {checkoutType === type.id && (
                    <div className="w-2 h-2 rounded-full bg-neon" />
                  )}
                </div>
                <span className="text-sm font-medium">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery Link */}
        <div className="space-y-2">
          <Label htmlFor="deliveryLink" className="text-foreground">Link de Entrega</Label>
          <Textarea
            id="deliveryLink"
            placeholder="Insira o link ou instruções de entrega do produto..."
            rows={3}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon resize-none"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Checkbox
              id="highlighted"
              checked={isHighlighted}
              onCheckedChange={(checked) => setIsHighlighted(checked as boolean)}
              className="border-border data-[state=checked]:bg-neon data-[state=checked]:border-neon"
            />
            <Label htmlFor="highlighted" className="text-foreground cursor-pointer">
              Produto em Destaque
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked as boolean)}
              className="border-border data-[state=checked]:bg-neon data-[state=checked]:border-neon"
            />
            <Label htmlFor="active" className="text-foreground cursor-pointer">
              Ativo
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="storefront"
              checked={showInStorefront}
              onCheckedChange={(checked) => setShowInStorefront(checked as boolean)}
              className="border-border data-[state=checked]:bg-neon data-[state=checked]:border-neon"
            />
            <Label htmlFor="storefront" className="text-foreground cursor-pointer">
              Exibir na Vitrine
            </Label>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-neon text-black font-semibold hover:bg-neon/90 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)]">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Produto
        </Button>
      </div>
    </div>
  )
}
