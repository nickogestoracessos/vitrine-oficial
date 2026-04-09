"use client"

import { useState } from "react"
import { 
  Store, 
  CreditCard, 
  Image, 
  Link2, 
  Instagram, 
  Youtube, 
  MessageCircle,
  Save,
  Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { storeConfig } from "@/lib/store-config"

export function SettingsPage() {
  const [config, setConfig] = useState(storeConfig)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Em producao, salvar no banco de dados
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neon">Configuracoes</h2>
          <p className="text-sm text-muted-foreground">Gerencie sua loja e preferencias</p>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-neon text-black font-semibold hover:bg-neon/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
        >
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Salvo!" : "Salvar Alteracoes"}
        </Button>
      </div>

      <Tabs defaultValue="loja" className="w-full">
        <TabsList className="bg-secondary border border-border p-1 mb-6">
          <TabsTrigger 
            value="loja" 
            className="data-[state=active]:bg-neon data-[state=active]:text-black px-6"
          >
            <Store className="w-4 h-4 mr-2" />
            Loja
          </TabsTrigger>
          <TabsTrigger 
            value="checkout" 
            className="data-[state=active]:bg-neon data-[state=active]:text-black px-6"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Checkout
          </TabsTrigger>
        </TabsList>

        {/* Tab Loja */}
        <TabsContent value="loja" className="space-y-6">
          {/* Informacoes Basicas */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Store className="w-5 h-5 text-neon" />
              Informacoes da Loja
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-foreground">Nome da Loja</Label>
                <Input
                  id="storeName"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeSlug" className="text-foreground">Slug da Loja</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">/loja/</span>
                  <Input
                    id="storeSlug"
                    value={config.slug}
                    onChange={(e) => setConfig({ ...config, slug: e.target.value })}
                    className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeDesc" className="text-foreground">Descricao da Loja</Label>
              <Textarea
                id="storeDesc"
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                rows={3}
                className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon resize-none"
              />
            </div>
          </div>

          {/* Imagens */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Image className="w-5 h-5 text-neon" />
              Imagens
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverUrl" className="text-foreground">URL da Capa</Label>
                <Input
                  id="coverUrl"
                  value={config.coverUrl}
                  onChange={(e) => setConfig({ ...config, coverUrl: e.target.value })}
                  placeholder="https://exemplo.com/capa.jpg"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
                {config.coverUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-border">
                    <img 
                      src={config.coverUrl} 
                      alt="Capa da loja" 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl" className="text-foreground">URL do Logo</Label>
                <Input
                  id="logoUrl"
                  value={config.logoUrl}
                  onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                  placeholder="https://exemplo.com/logo.png"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>
            </div>
          </div>

          {/* Links Sociais */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Link2 className="w-5 h-5 text-neon" />
              Links Sociais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </Label>
                <Input
                  value={config.socialLinks.instagram || ""}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socialLinks: { ...config.socialLinks, instagram: e.target.value } 
                  })}
                  placeholder="https://instagram.com/sualoja"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Youtube className="w-4 h-4" /> YouTube
                </Label>
                <Input
                  value={config.socialLinks.youtube || ""}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socialLinks: { ...config.socialLinks, youtube: e.target.value } 
                  })}
                  placeholder="https://youtube.com/@seucanal"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg> TikTok
                </Label>
                <Input
                  value={config.socialLinks.tiktok || ""}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socialLinks: { ...config.socialLinks, tiktok: e.target.value } 
                  })}
                  placeholder="https://tiktok.com/@seuuser"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                  </svg> Discord
                </Label>
                <Input
                  value={config.socialLinks.discord || ""}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socialLinks: { ...config.socialLinks, discord: e.target.value } 
                  })}
                  placeholder="https://discord.gg/seuservidor"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg> Telegram
                </Label>
                <Input
                  value={config.socialLinks.telegram || ""}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socialLinks: { ...config.socialLinks, telegram: e.target.value } 
                  })}
                  placeholder="https://t.me/seugrupo"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </Label>
                <Input
                  value={config.socialLinks.whatsapp || ""}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socialLinks: { ...config.socialLinks, whatsapp: e.target.value } 
                  })}
                  placeholder="5511999999999"
                  className="bg-secondary border-border text-foreground focus:border-neon focus:ring-neon"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab Checkout */}
        <TabsContent value="checkout" className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-neon" />
              Campos do Checkout
            </h3>
            <p className="text-sm text-muted-foreground">
              Selecione quais campos serao obrigatorios no checkout
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                <Checkbox
                  id="checkEmail"
                  checked={config.checkoutFields.email}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    checkoutFields: { ...config.checkoutFields, email: checked as boolean }
                  })}
                  className="border-border data-[state=checked]:bg-neon data-[state=checked]:border-neon"
                />
                <Label htmlFor="checkEmail" className="text-foreground cursor-pointer flex-1">
                  <span className="font-medium">Email</span>
                  <p className="text-sm text-muted-foreground">Solicitar email do comprador</p>
                </Label>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                <Checkbox
                  id="checkCpf"
                  checked={config.checkoutFields.cpf}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    checkoutFields: { ...config.checkoutFields, cpf: checked as boolean }
                  })}
                  className="border-border data-[state=checked]:bg-neon data-[state=checked]:border-neon"
                />
                <Label htmlFor="checkCpf" className="text-foreground cursor-pointer flex-1">
                  <span className="font-medium">CPF</span>
                  <p className="text-sm text-muted-foreground">Solicitar CPF do comprador</p>
                </Label>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                <Checkbox
                  id="checkWhatsapp"
                  checked={config.checkoutFields.whatsapp}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    checkoutFields: { ...config.checkoutFields, whatsapp: checked as boolean }
                  })}
                  className="border-border data-[state=checked]:bg-neon data-[state=checked]:border-neon"
                />
                <Label htmlFor="checkWhatsapp" className="text-foreground cursor-pointer flex-1">
                  <span className="font-medium">WhatsApp</span>
                  <p className="text-sm text-muted-foreground">Solicitar numero de WhatsApp</p>
                </Label>
              </div>
            </div>
          </div>

          {/* Metodo de Pagamento */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Metodo de Pagamento</h3>
            <div className="p-4 rounded-lg bg-neon/10 border border-neon/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-neon/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-neon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-neon">PIX</p>
                  <p className="text-sm text-muted-foreground">Pagamento instantaneo via PIX</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Configure a integracao com PushinPay na aba Financeiro para receber pagamentos via PIX.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
