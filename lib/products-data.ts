export interface Product {
  id: number
  slug: string
  name: string
  description: string
  fullDescription: string
  price: number
  originalPrice?: number
  discount?: number
  imageUrl: string
  category: string
  isHighlighted: boolean
  isActive: boolean
  showInStorefront: boolean
  checkoutType: "direto" | "externo" | "whatsapp"
  deliveryLink: string
  orderBump?: {
    productId: number
    discountedPrice: number
    description: string
  }
}

export const products: Product[] = [
  {
    id: 1,
    slug: "conta-premium-netflix",
    name: "Conta Premium Netflix",
    description: "Acesso completo a todos os filmes e séries em 4K Ultra HD",
    fullDescription: `Tenha acesso ilimitado ao catálogo completo da Netflix!

**O que está incluído:**
- Acesso a milhares de filmes e séries
- Qualidade 4K Ultra HD
- 4 telas simultâneas
- Download para assistir offline
- Sem anúncios

**Entrega imediata** após a confirmação do pagamento. Você receberá os dados de acesso no seu e-mail.`,
    price: 29.90,
    originalPrice: 39.90,
    discount: 25,
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop",
    category: "contas",
    isHighlighted: true,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/netflix",
    orderBump: {
      productId: 2,
      discountedPrice: 14.90,
      description: "Adicione o Spotify Premium por apenas R$ 14,90 (economize R$ 5,00)"
    }
  },
  {
    id: 2,
    slug: "spotify-premium-anual",
    name: "Spotify Premium Anual",
    description: "Músicas ilimitadas sem anúncios, download offline",
    fullDescription: `Spotify Premium com todas as funcionalidades desbloqueadas!

**Benefícios:**
- Músicas ilimitadas sem anúncios
- Pule quantas músicas quiser
- Download para ouvir offline
- Qualidade de áudio superior
- Funciona em todos os dispositivos

**Validade:** 12 meses de acesso garantido.`,
    price: 19.90,
    imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=600&fit=crop",
    category: "contas",
    isHighlighted: false,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/spotify"
  },
  {
    id: 3,
    slug: "ebook-marketing-digital",
    name: "E-book Marketing Digital Pro",
    description: "Guia completo para dominar o marketing nas redes sociais",
    fullDescription: `O guia definitivo para dominar o Marketing Digital em 2024!

**Conteúdo do E-book:**
- Estratégias avançadas de Facebook Ads
- Instagram para negócios
- TikTok marketing
- Funis de vendas automatizados
- Copywriting persuasivo
- +50 templates prontos para usar

**Formato:** PDF de alta qualidade com 250 páginas.
**Bônus:** Acesso ao grupo exclusivo de alunos.`,
    price: 47.00,
    originalPrice: 97.00,
    discount: 50,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
    category: "e-books",
    isHighlighted: true,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/ebook-marketing",
    orderBump: {
      productId: 4,
      discountedPrice: 27.00,
      description: "Adicione o Curso de Copywriting por apenas R$ 27,00 (50% OFF)"
    }
  },
  {
    id: 4,
    slug: "curso-copywriting",
    name: "Curso Copywriting Avançado",
    description: "Aprenda a escrever textos que vendem automaticamente",
    fullDescription: `Domine a arte de escrever textos que convertem!

**Módulos do Curso:**
1. Fundamentos do Copywriting
2. Gatilhos mentais poderosos
3. Headlines magnéticas
4. Storytelling para vendas
5. E-mails que convertem
6. Landing pages persuasivas

**Carga horária:** 15 horas de vídeo aulas
**Acesso:** Vitalício + Certificado`,
    price: 67.00,
    originalPrice: 127.00,
    discount: 47,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    category: "cursos",
    isHighlighted: false,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/curso-copy"
  },
  {
    id: 5,
    slug: "xbox-game-pass-ultimate",
    name: "Xbox Game Pass Ultimate",
    description: "Acesso a centenas de jogos no Xbox e PC",
    fullDescription: `Game Pass Ultimate - O melhor serviço de jogos!

**Inclui:**
- +400 jogos no Xbox e PC
- Xbox Live Gold
- EA Play
- Jogos no dia do lançamento
- Cloud Gaming (jogar na nuvem)
- Descontos exclusivos

**Duração:** 3 meses de assinatura`,
    price: 49.90,
    originalPrice: 69.90,
    discount: 29,
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop",
    category: "contas",
    isHighlighted: true,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/gamepass",
    orderBump: {
      productId: 6,
      discountedPrice: 19.90,
      description: "Adicione 1000 V-Bucks Fortnite por apenas R$ 19,90"
    }
  },
  {
    id: 6,
    slug: "vbucks-fortnite-1000",
    name: "1000 V-Bucks Fortnite",
    description: "Moeda virtual para compras no Fortnite",
    fullDescription: `V-Bucks para usar no Fortnite!

**Use para:**
- Comprar skins exclusivas
- Battle Pass
- Emotes
- Planadores
- Picaretas

**Entrega:** Código enviado por e-mail em até 15 minutos.`,
    price: 29.90,
    imageUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=800&h=600&fit=crop",
    category: "contas",
    isHighlighted: false,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/vbucks"
  },
  {
    id: 7,
    slug: "pacote-canva-pro",
    name: "Canva Pro - 1 Ano",
    description: "Ferramenta completa de design gráfico profissional",
    fullDescription: `Canva Pro com todos os recursos premium!

**Funcionalidades:**
- Milhões de templates premium
- Remoção de fundo automática
- Kit de marca
- Redimensionamento mágico
- Agendamento de posts
- 100GB de armazenamento

**Validade:** 12 meses de acesso`,
    price: 39.90,
    originalPrice: 59.90,
    discount: 33,
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    category: "software",
    isHighlighted: false,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/canva"
  },
  {
    id: 8,
    slug: "chatgpt-plus",
    name: "ChatGPT Plus - 1 Mês",
    description: "Acesso ao GPT-4 e recursos avançados de IA",
    fullDescription: `ChatGPT Plus com acesso ao modelo mais avançado!

**Benefícios:**
- Acesso ao GPT-4
- Respostas mais rápidas
- Prioridade em horários de pico
- Novos recursos em primeira mão
- Plugins e GPTs personalizados

**Duração:** 1 mês de assinatura`,
    price: 89.90,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "software",
    isHighlighted: true,
    isActive: true,
    showInStorefront: true,
    checkoutType: "direto",
    deliveryLink: "https://entrega.exemplo.com/chatgpt",
    orderBump: {
      productId: 7,
      discountedPrice: 29.90,
      description: "Adicione o Canva Pro por apenas R$ 29,90 (economize R$ 10,00)"
    }
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getActiveProducts(): Product[] {
  return products.filter(p => p.isActive && p.showInStorefront)
}

export function getHighlightedProducts(): Product[] {
  return products.filter(p => p.isHighlighted && p.isActive && p.showInStorefront)
}
