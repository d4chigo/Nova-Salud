"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "@/components/dashboard/search"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Printer, SearchIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

type ProductItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function VentasClientPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<ProductItem[]>([
    { id: 1, name: "Paracetamol 500mg", price: 0.8, quantity: 3 },
    { id: 2, name: "Loratadina 10mg", price: 1.5, quantity: 2 },
    { id: 3, name: "Ibuprofeno 400mg", price: 0.9, quantity: 1 },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerDocument, setCustomerDocument] = useState("")
  const [cashReceived, setCashReceived] = useState("")

  // Productos disponibles para búsqueda
  const availableProducts = [
    { id: 1, name: "Paracetamol 500mg", price: 0.8 },
    { id: 2, name: "Loratadina 10mg", price: 1.5 },
    { id: 3, name: "Ibuprofeno 400mg", price: 0.9 },
    { id: 4, name: "Amoxicilina 500mg", price: 1.2 },
    { id: 5, name: "Complejo B", price: 15.9 },
    { id: 6, name: "Crema Hidratante", price: 45.0 },
  ]

  const handleAddProduct = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Ingrese un producto para agregar",
        variant: "destructive",
      })
      return
    }

    const foundProduct = availableProducts.find((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (foundProduct) {
      const existingItem = cartItems.find((item) => item.id === foundProduct.id)

      if (existingItem) {
        setCartItems(
          cartItems.map((item) => (item.id === foundProduct.id ? { ...item, quantity: item.quantity + 1 } : item)),
        )
      } else {
        setCartItems([...cartItems, { ...foundProduct, quantity: 1 }])
      }

      setSearchQuery("")
      toast({
        title: "Producto agregado",
        description: `${foundProduct.name} agregado al carrito`,
      })
    } else {
      toast({
        title: "Producto no encontrado",
        description: "El producto buscado no existe en el inventario",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    })
  }

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const handleProcessSale = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "No hay productos en el carrito",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Venta procesada",
      description: `Venta por S/. ${calculateTotal().toFixed(2)} completada exitosamente`,
    })

    // Limpiar el carrito y los campos
    setCartItems([])
    setCustomerName("")
    setCustomerDocument("")
    setCashReceived("")
  }

  const handleCancelSale = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Información",
        description: "No hay una venta en proceso",
      })
      return
    }

    setCartItems([])
    setCustomerName("")
    setCustomerDocument("")
    setCashReceived("")

    toast({
      title: "Venta cancelada",
      description: "La venta ha sido cancelada",
    })
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.18
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const calculateChange = () => {
    const received = Number.parseFloat(cashReceived) || 0
    return Math.max(0, received - calculateTotal())
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Punto de Venta</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar productos por nombre o código..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            </div>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Productos en la venta actual</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead className="text-right">Precio Unit.</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No hay productos en el carrito
                        </TableCell>
                      </TableRow>
                    ) : (
                      cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleQuantityChange(item.id, -1)}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">S/. {item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">S/. {(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Ventas Recientes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº Venta</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Método de Pago</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">V00123</TableCell>
                      <TableCell>Juan López</TableCell>
                      <TableCell>05/05/2023 10:30</TableCell>
                      <TableCell>Efectivo</TableCell>
                      <TableCell className="text-right">S/. 89.00</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">Completada</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">V00122</TableCell>
                      <TableCell>María Rodríguez</TableCell>
                      <TableCell>05/05/2023 09:45</TableCell>
                      <TableCell>Efectivo</TableCell>
                      <TableCell className="text-right">S/. 139.50</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">Completada</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">V00121</TableCell>
                      <TableCell>Carlos Gómez</TableCell>
                      <TableCell>05/05/2023 09:15</TableCell>
                      <TableCell>Efectivo</TableCell>
                      <TableCell className="text-right">S/. 112.75</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-600">Completada</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Venta</CardTitle>
                <CardDescription>Venta #V00124</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span>S/. {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IGV (18%):</span>
                    <span>S/. {calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span>Total:</span>
                    <span>S/. {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cliente</label>
                  <Input
                    placeholder="Nombre del cliente (opcional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">DNI/RUC</label>
                  <Input
                    placeholder="Documento de identidad (opcional)"
                    value={customerDocument}
                    onChange={(e) => setCustomerDocument(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Monto recibido</label>
                    <Input placeholder="0.00" value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cambio:</span>
                    <span>S/. {calculateChange().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={handleProcessSale}>
                  Procesar Pago
                </Button>
                <Button variant="outline" className="w-full" onClick={handleCancelSale}>
                  Cancelar Venta
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
