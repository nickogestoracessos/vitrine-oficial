export interface StoreConfig {
  slug: string
  name: string
  description: string
  coverUrl: string
  logoUrl: string
  socialLinks: {
    instagram?: string
    twitter?: string
    youtube?: string
    tiktok?: string
    discord?: string
    telegram?: string
    whatsapp?: string
  }
  checkoutFields: {
    email: boolean
    cpf: boolean
    whatsapp: boolean
  }
  pushinPayToken?: string
}

export const storeConfig: StoreConfig = {
  slug: "nickofaroli",
  name: "GamerTech Store",
  description: "Sua loja de produtos digitais premium. Contas, jogos, cursos e muito mais com os melhores precos!",
  coverUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&h=400&fit=crop",
  logoUrl: "",
  socialLinks: {
    instagram: "https://instagram.com/gamertech",
    twitter: "",
    youtube: "",
    tiktok: "",
    discord: "https://discord.gg/gamertech",
    telegram: "",
    whatsapp: "5511999999999"
  },
  checkoutFields: {
    email: true,
    cpf: false,
    whatsapp: true
  },
  pushinPayToken: ""
}
