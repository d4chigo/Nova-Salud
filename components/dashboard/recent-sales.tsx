"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Product = {
  id: string
  name: string
  category: string
  laboratory: string
  stock: number
  price: number
  status: string
  sales?: number
}

type RecentSale = {
  customer: string
  initials: string
  description: string
  amount: number
}

export function RecentSales({ products }: { products: Product[] }) {
  // Generar ventas recientes basadas en los productos del inventario
  const recentSales: RecentSale[] = [
    {
      customer: "Juan López",
      initials: "JL",
      description: `${products[0]?.name || "Medicamento"} y ${products[2]?.name || "otro producto"}`,
      amount: 89.0,
    },
    {
      customer: "María Rodríguez",
      initials: "MR",
      description: `${products[5]?.name || "Producto dermatológico"}`,
      amount: 139.5,
    },
    {
      customer: "Carlos Gómez",
      initials: "CG",
      description: `${products[1]?.name || "Antibiótico"} y ${products[0]?.name || "analgésico"}`,
      amount: 112.75,
    },
    {
      customer: "Lucía Vega",
      initials: "LV",
      description: `${products[5]?.name || "Producto dermatológico"}`,
      amount: 175.25,
    },
    {
      customer: "Roberto Mendoza",
      initials: "RM",
      description: `${products[0]?.name || "Medicamento"} y suplementos`,
      amount: 94.5,
    },
  ]

  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">{sale.description}</p>
          </div>
          <div className="ml-auto font-medium">S/. {sale.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}
