"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Package, AlertTriangle, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"

// Tipos simplificados
type Product = {
  id: string
  name: string
  category: string
  stock: number
  price: number
  status: "disponible" | "bajo" | "agotado"
  sales?: number
}

export default function DashboardClientPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Estado simplificado
  const [dashboardData, setDashboardData] = useState({
    totalSales: 12589.5,
    totalProducts: 6,
    totalTransactions: 173,
    salesGrowth: 15.3,
  })
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([])
  const [topSellingProducts, setTopSellingProducts] = useState<Product[]>([])

  // Cargar datos
  useEffect(() => {
    // Productos del inventario
    const products = [
      {
        id: "MED001",
        name: "Paracetamol 500mg",
        category: "Analgésicos",
        stock: 120,
        price: 0.8,
        status: "disponible",
        sales: 450,
      },
      {
        id: "MED002",
        name: "Amoxicilina 500mg",
        category: "Antibióticos",
        stock: 15,
        price: 1.2,
        status: "bajo",
        sales: 180,
      },
      {
        id: "MED003",
        name: "Loratadina 10mg",
        category: "Antialérgicos",
        stock: 78,
        price: 1.5,
        status: "disponible",
        sales: 320,
      },
      {
        id: "MED004",
        name: "Complejo B",
        category: "Vitaminas",
        stock: 0,
        price: 15.9,
        status: "agotado",
        sales: 120,
      },
      {
        id: "MED005",
        name: "Ibuprofeno 400mg",
        category: "Analgésicos",
        stock: 89,
        price: 0.9,
        status: "disponible",
        sales: 280,
      },
      {
        id: "MED006",
        name: "Crema Hidratante",
        category: "Dermatológicos",
        stock: 12,
        price: 45.0,
        status: "bajo",
        sales: 95,
      },
    ]

    // Filtrar productos con stock bajo
    setLowStockProducts(products.filter((p) => p.status === "bajo"))

    // Ordenar productos por ventas
    setTopSellingProducts([...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 5))
  }, [])

  const handleNewSale = () => {
    router.push("/ventas")
    toast({
      title: "Nueva venta",
      description: "Iniciando una nueva venta",
    })
  }

  const handleOrderProduct = (name: string) => {
    toast({
      title: "Pedido iniciado",
      description: `Se ha iniciado un pedido para ${name}`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-pharmacy-50">
      <div className="border-b bg-white shadow-sm">
        <div className="flex h-16 items-center px-4">
          <Logo size="small" className="mr-4" />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-pharmacy-800">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button onClick={handleNewSale} className="bg-pharmacy-500 hover:bg-pharmacy-600">
              <DollarSign className="mr-2 h-4 w-4" />
              Nueva Venta
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-pharmacy-100 text-pharmacy-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-pharmacy-700"
            >
              Resumen
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white data-[state=active]:text-pharmacy-700"
            >
              Análisis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-pharmacy-100 pharmacy-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pharmacy-700">Ventas Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-pharmacy-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pharmacy-800">S/. {dashboardData.totalSales.toFixed(2)}</div>
                  <p className="text-xs text-pharmacy-600">+{dashboardData.salesGrowth}% respecto al mes anterior</p>
                </CardContent>
              </Card>
              <Card className="border-pharmacy-100 pharmacy-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pharmacy-700">Productos</CardTitle>
                  <Package className="h-4 w-4 text-pharmacy-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pharmacy-800">{dashboardData.totalProducts}</div>
                  <p className="text-xs text-pharmacy-600">6 categorías diferentes</p>
                </CardContent>
              </Card>
              <Card className="border-pharmacy-100 pharmacy-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pharmacy-700">Transacciones</CardTitle>
                  <CreditCard className="h-4 w-4 text-pharmacy-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pharmacy-800">{dashboardData.totalTransactions}</div>
                  <p className="text-xs text-pharmacy-600">48 desde la semana pasada</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border-pharmacy-100 pharmacy-shadow">
                <CardHeader>
                  <CardTitle className="text-pharmacy-700">Resumen de Ventas</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3 border-pharmacy-100 pharmacy-shadow">
                <CardHeader>
                  <CardTitle className="text-pharmacy-700">Ventas Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-pharmacy-100 flex items-center justify-center text-pharmacy-700 font-medium">
                        JL
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Juan López</p>
                        <p className="text-sm text-muted-foreground">Paracetamol 500mg y Loratadina 10mg</p>
                      </div>
                      <div className="ml-auto font-medium">S/. 89.00</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-pharmacy-100 flex items-center justify-center text-pharmacy-700 font-medium">
                        MR
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">María Rodríguez</p>
                        <p className="text-sm text-muted-foreground">Crema Hidratante</p>
                      </div>
                      <div className="ml-auto font-medium">S/. 139.50</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-pharmacy-100 flex items-center justify-center text-pharmacy-700 font-medium">
                        CG
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Carlos Gómez</p>
                        <p className="text-sm text-muted-foreground">Amoxicilina 500mg y Paracetamol 500mg</p>
                      </div>
                      <div className="ml-auto font-medium">S/. 112.75</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border-pharmacy-100 pharmacy-shadow">
                <CardHeader className="flex flex-row items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-pharmacy-700">Productos con Stock Bajo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between rounded-md border border-pharmacy-200 p-3 bg-pharmacy-50"
                      >
                        <div>
                          <p className="font-medium text-pharmacy-700">{product.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-yellow-500">{product.category}</Badge>
                            <span className="text-sm text-pharmacy-600">Stock: {product.stock} unidades</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-pharmacy-500 hover:bg-pharmacy-600"
                          onClick={() => handleOrderProduct(product.name)}
                        >
                          Ordenar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 border-pharmacy-100 pharmacy-shadow">
                <CardHeader className="flex flex-row items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-pharmacy-500" />
                  <CardTitle className="text-pharmacy-700">Productos Más Vendidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellingProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between rounded-md border border-pharmacy-200 p-3 bg-white"
                      >
                        <div>
                          <p className="font-medium text-pharmacy-700">{product.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-pharmacy-500">{product.category}</Badge>
                            <span className="text-sm text-pharmacy-600">Ventas: {product.sales} unidades</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-pharmacy-700">S/. {product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  )
}
