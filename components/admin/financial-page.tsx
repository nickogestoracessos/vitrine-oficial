"use client"

import { useState } from "react"
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Key,
  Save,
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for transactions
const transactions = [
  { id: 1, product: "Conta Premium Netflix", customer: "João Silva", value: 29.90, status: "paid", date: "2024-01-15 14:32" },
  { id: 2, product: "Spotify Premium Anual", customer: "Maria Santos", value: 19.90, status: "paid", date: "2024-01-15 12:15" },
  { id: 3, product: "E-book Marketing Digital Pro", customer: "Pedro Costa", value: 47.00, status: "pending", date: "2024-01-15 11:45" },
  { id: 4, product: "Xbox Game Pass Ultimate", customer: "Ana Oliveira", value: 49.90, status: "paid", date: "2024-01-14 18:22" },
  { id: 5, product: "ChatGPT Plus", customer: "Lucas Mendes", value: 89.90, status: "failed", date: "2024-01-14 16:10" },
  { id: 6, product: "Canva Pro", customer: "Fernanda Lima", value: 39.90, status: "paid", date: "2024-01-14 10:05" },
]

export function FinancialPage() {
  const [pushinPayToken, setPushinPayToken] = useState("")
  const [showToken, setShowToken] = useState(false)
  const [tokenSaved, setTokenSaved] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleSaveToken = () => {
    if (pushinPayToken.trim()) {
      setIsConnected(true)
      setTokenSaved(true)
      setTimeout(() => setTokenSaved(false), 3000)
    }
  }

  // Calculate stats
  const totalPaid = transactions.filter(t => t.status === "paid").reduce((sum, t) => sum + t.value, 0)
  const totalPending = transactions.filter(t => t.status === "pending").reduce((sum, t) => sum + t.value, 0)
  const totalFailed = transactions.filter(t => t.status === "failed").reduce((sum, t) => sum + t.value, 0)
  const paidCount = transactions.filter(t => t.status === "paid").length
  const pendingCount = transactions.filter(t => t.status === "pending").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon/20 text-neon text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Pago
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-yellow/20 text-neon-yellow text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pendente
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Falhou
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neon">Financeiro</h2>
        <p className="text-sm text-muted-foreground">
          Acompanhe suas vendas e configure a integracao PushinPay
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-neon">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neon">
                R$ {totalPaid.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm text-muted-foreground">Faturamento</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{paidCount}</p>
              <p className="text-sm text-muted-foreground">Pagos</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-yellow/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-neon-yellow" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                R$ {totalPending.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm text-muted-foreground">A Receber</p>
            </div>
          </div>
        </div>
      </div>

      {/* PushinPay Integration */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-neon" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">PushinPay</h3>
              <p className="text-sm text-muted-foreground">Integracao de pagamentos PIX</p>
            </div>
          </div>
          {isConnected ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/20 text-neon text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Conectado
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Desconectado
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pushinPayToken" className="text-foreground flex items-center gap-2">
              <Key className="w-4 h-4" />
              Token de Integracao
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="pushinPayToken"
                  type={showToken ? "text" : "password"}
                  value={pushinPayToken}
                  onChange={(e) => setPushinPayToken(e.target.value)}
                  placeholder="Cole seu token PushinPay aqui"
                  className="pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-neon focus:ring-neon"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                onClick={handleSaveToken}
                className="bg-neon text-black font-semibold hover:bg-neon/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {tokenSaved ? "Salvo!" : "Salvar"}
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-muted-foreground">
              Para obter seu token, acesse o painel da PushinPay e gere uma nova chave de API.
            </p>
            <a 
              href="https://pushinpay.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-neon hover:underline mt-2"
            >
              Acessar PushinPay <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Ultimas Transacoes</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Produto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-foreground">{transaction.product}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">{transaction.customer}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-foreground">
                      R$ {transaction.value.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">{transaction.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma transacao encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}
