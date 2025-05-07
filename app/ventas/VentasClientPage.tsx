"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Printer, SearchIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Logo } from "@/components/logo"

// Tipos simplificados
type ProductItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type Sale = {
  id: string
  customer: string
  date: string
  paymentMethod: string
  total: number
  status: string
  items?: ProductItem[]
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
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [productQuantity, setProductQuantity] = useState("1")
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [recentSales, setRecentSales] = useState<Sale[]>([
    {
      id: "V00123",
      customer: "Juan López",
      date: "05/05/2023 10:30",
      paymentMethod: "Efectivo",
      total: 89.0,
      status: "Completada",
      items: [
        { id: 1, name: "Paracetamol 500mg", price: 0.8, quantity: 10 },
        { id: 2, name: "Loratadina 10mg", price: 1.5, quantity: 5 },
        { id: 5, name: "Ibuprofeno 400mg", price: 0.9, quantity: 8 },
      ],
    },
    {
      id: "V00122",
      customer: "María Rodríguez",
      date: "05/05/2023 09:45",
      paymentMethod: "Efectivo",
      total: 139.5,
      status: "Completada",
      items: [
        { id: 6, name: "Crema Hidratante", price: 45.0, quantity: 3 },
        { id: 3, name: "Ibuprofeno 400mg", price: 0.9, quantity: 5 },
      ],
    },
    {
      id: "V00121",
      customer: "Carlos Gómez",
      date: "05/05/2023 09:15",
      paymentMethod: "Efectivo",
      total: 112.75,
      status: "Completada",
      items: [
        { id: 4, name: "Amoxicilina 500mg", price: 1.2, quantity: 10 },
        { id: 1, name: "Paracetamol 500mg", price: 0.8, quantity: 5 },
        { id: 2, name: "Loratadina 10mg", price: 1.5, quantity: 3 },
      ],
    },
  ])

  // Productos disponibles para búsqueda
  const [availableProducts, setAvailableProducts] = useState([
    { id: 1, name: "Paracetamol 500mg", price: 0.8, stock: 120 },
    { id: 2, name: "Loratadina 10mg", price: 1.5, stock: 78 },
    { id: 3, name: "Ibuprofeno 400mg", price: 0.9, stock: 89 },
    { id: 4, name: "Amoxicilina 500mg", price: 1.2, stock: 45 },
    { id: 5, name: "Complejo B", price: 15.9, stock: 0 },
    { id: 6, name: "Crema Hidratante", price: 45.0, stock: 12 },
  ])

  // Productos filtrados según la búsqueda
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = availableProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts([])
    }
  }, [searchQuery, availableProducts])

  const handleAddProductClick = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Ingrese un producto para buscar",
        variant: "destructive",
      })
      return
    }

    if (filteredProducts.length > 0) {
      setShowProductDialog(true)
      setSelectedProduct(filteredProducts[0])
      setProductQuantity("1")
    } else {
      toast({
        title: "Producto no encontrado",
        description: "El producto buscado no existe en el inventario",
        variant: "destructive",
      })
    }
  }

  const handleConfirmAddProduct = () => {
    if (!selectedProduct) return

    const quantity = Number.parseInt(productQuantity)
    if (isNaN(quantity) || quantity <= 0) {
      toast({
        title: "Error",
        description: "La cantidad debe ser un número positivo",
        variant: "destructive",
      })
      return
    }

    if (selectedProduct.stock < quantity) {
      toast({
        title: "Error",
        description: `Solo hay ${selectedProduct.stock} unidades disponibles`,
        variant: "destructive",
      })
      return
    }

    const existingItem = cartItems.find((item) => item.id === selectedProduct.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity,
        },
      ])
    }

    // Actualizar stock del producto
    setAvailableProducts(
      availableProducts.map((p) => (p.id === selectedProduct.id ? { ...p, stock: p.stock - quantity } : p)),
    )

    setShowProductDialog(false)
    setSearchQuery("")
    toast({
      title: "Producto agregado",
      description: `${quantity} ${selectedProduct.name} agregado al carrito`,
    })
  }

  const handleRemoveItem = (id: number) => {
    // Obtener el producto antes de eliminarlo
    const itemToRemove = cartItems.find((item) => item.id === id)

    if (itemToRemove) {
      // Actualizar el stock
      setAvailableProducts(
        availableProducts.map((p) => (p.id === id ? { ...p, stock: p.stock + itemToRemove.quantity } : p)),
      )

      // Eliminar del carrito
      setCartItems(cartItems.filter((item) => item.id !== id))

      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado del carrito",
      })
    }
  }

  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find((item) => item.id === id)
    const product = availableProducts.find((p) => p.id === id)

    if (!item || !product) return

    // Verificar si hay suficiente stock para aumentar
    if (change > 0 && product.stock < 1) {
      toast({
        title: "Error",
        description: "No hay más unidades disponibles",
        variant: "destructive",
      })
      return
    }

    const newQuantity = Math.max(1, item.quantity + change)
    const quantityDiff = newQuantity - item.quantity

    // Actualizar carrito
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )

    // Actualizar stock
    setAvailableProducts(availableProducts.map((p) => (p.id === id ? { ...p, stock: p.stock - quantityDiff } : p)))
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

    // Validar que se haya ingresado el monto recibido
    if (!cashReceived || Number.parseFloat(cashReceived) < calculateTotal()) {
      toast({
        title: "Error",
        description: "El monto recibido debe ser mayor o igual al total",
        variant: "destructive",
      })
      return
    }

    // Mostrar diálogo de confirmación
    setShowPaymentConfirmation(true)
  }

  const confirmPayment = () => {
    // Generar nuevo ID de venta
    const newSaleId = `V00${124 + recentSales.length}`

    // Crear nueva venta
    const newSale: Sale = {
      id: newSaleId,
      customer: customerName || "Cliente General",
      date: new Date().toLocaleString(),
      paymentMethod: "Efectivo",
      total: calculateTotal(),
      status: "Completada",
      items: [...cartItems],
    }

    // Actualizar lista de ventas recientes
    setRecentSales([newSale, ...recentSales])

    toast({
      title: "Venta procesada",
      description: `Venta ${newSaleId} por S/. ${calculateTotal().toFixed(2)} completada exitosamente`,
    })

    // Limpiar el carrito y los campos
    setCartItems([])
    setCustomerName("")
    setCustomerDocument("")
    setCashReceived("")
    setShowPaymentConfirmation(false)
  }

  const handleCancelSale = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Información",
        description: "No hay una venta en proceso",
      })
      return
    }

    // Devolver productos al inventario
    cartItems.forEach((item) => {
      const id = item.id
      setAvailableProducts(availableProducts.map((p) => (p.id === id ? { ...p, stock: p.stock + item.quantity } : p)))
    })

    setCartItems([])
    setCustomerName("")
    setCustomerDocument("")
    setCashReceived("")

    toast({
      title: "Venta cancelada",
      description: "La venta ha sido cancelada",
    })
  }

  const handlePrintReceipt = (sale: Sale) => {
    setSelectedSale(sale)
    setShowReceiptDialog(true)
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
          <h2 className="text-3xl font-bold tracking-tight text-pharmacy-800">Punto de Venta</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-pharmacy-400" />
                <Input
                  type="search"
                  placeholder="Buscar productos por nombre o código..."
                  className="pl-8 w-full border-pharmacy-200 focus-visible:ring-pharmacy-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleAddProductClick} className="bg-pharmacy-500 hover:bg-pharmacy-600">
                <Plus className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            </div>

            <Card className="border-pharmacy-100 pharmacy-shadow">
              <CardHeader className="p-4 bg-pharmacy-100">
                <CardTitle className="text-pharmacy-700">Productos en la venta actual</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-pharmacy-50">
                    <TableRow>
                      <TableHead className="text-pharmacy-700">Producto</TableHead>
                      <TableHead className="text-right text-pharmacy-700">Cantidad</TableHead>
                      <TableHead className="text-right text-pharmacy-700">Precio Unit.</TableHead>
                      <TableHead className="text-right text-pharmacy-700">Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-pharmacy-400">
                          No hay productos en el carrito
                        </TableCell>
                      </TableRow>
                    ) : (
                      cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-pharmacy-700">{item.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 border-pharmacy-200 text-pharmacy-700"
                                onClick={() => handleQuantityChange(item.id, -1)}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center text-pharmacy-700">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 border-pharmacy-200 text-pharmacy-700"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-pharmacy-700">S/. {item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right text-pharmacy-700">
                            S/. {(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-pharmacy-700 hover:text-red-500 hover:bg-red-50"
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

            <Card className="border-pharmacy-100 pharmacy-shadow">
              <CardHeader className="p-4 bg-pharmacy-100">
                <CardTitle className="text-pharmacy-700">Ventas Recientes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-pharmacy-50">
                    <TableRow>
                      <TableHead className="text-pharmacy-700">Nº Venta</TableHead>
                      <TableHead className="text-pharmacy-700">Cliente</TableHead>
                      <TableHead className="text-pharmacy-700">Fecha</TableHead>
                      <TableHead className="text-pharmacy-700">Método de Pago</TableHead>
                      <TableHead className="text-right text-pharmacy-700">Total</TableHead>
                      <TableHead className="text-pharmacy-700">Estado</TableHead>
                      <TableHead className="text-right text-pharmacy-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium text-pharmacy-700">{sale.id}</TableCell>
                        <TableCell className="text-pharmacy-700">{sale.customer}</TableCell>
                        <TableCell className="text-pharmacy-700">{sale.date}</TableCell>
                        <TableCell className="text-pharmacy-700">{sale.paymentMethod}</TableCell>
                        <TableCell className="text-right text-pharmacy-700">S/. {sale.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className="bg-pharmacy-500 hover:bg-pharmacy-600">{sale.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-pharmacy-700 hover:text-pharmacy-500"
                            onClick={() => handlePrintReceipt(sale)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-pharmacy-100 pharmacy-shadow">
              <CardHeader className="bg-pharmacy-100">
                <CardTitle className="text-pharmacy-700">Resumen de Venta</CardTitle>
                <CardDescription className="text-pharmacy-600">Venta #V00124</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pharmacy-700">Subtotal:</span>
                    <span className="text-pharmacy-700">S/. {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pharmacy-700">IGV (18%):</span>
                    <span className="text-pharmacy-700">S/. {calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-pharmacy-800">Total:</span>
                    <span className="text-pharmacy-800">S/. {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-pharmacy-700">Cliente</label>
                  <Input
                    placeholder="Nombre del cliente (opcional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-pharmacy-200 focus-visible:ring-pharmacy-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-pharmacy-700">DNI/RUC</label>
                  <Input
                    placeholder="Documento de identidad (opcional)"
                    value={customerDocument}
                    onChange={(e) => setCustomerDocument(e.target.value)}
                    className="border-pharmacy-200 focus-visible:ring-pharmacy-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-pharmacy-700">Monto recibido</label>
                    <Input
                      placeholder="0.00"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      className="border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pharmacy-700">Cambio:</span>
                    <span className="text-pharmacy-700">S/. {calculateChange().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 bg-pharmacy-50 rounded-b-lg">
                <Button className="w-full bg-pharmacy-500 hover:bg-pharmacy-600" onClick={handleProcessSale}>
                  Procesar Pago
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-pharmacy-300 text-pharmacy-700"
                  onClick={handleCancelSale}
                >
                  Cancelar Venta
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Diálogo para agregar producto */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="bg-white border-pharmacy-200">
          <DialogHeader>
            <DialogTitle className="text-pharmacy-700">Agregar Producto</DialogTitle>
            <DialogDescription className="text-pharmacy-600">
              Seleccione la cantidad del producto a agregar.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium text-pharmacy-700">Producto:</label>
                <div className="col-span-3 text-pharmacy-700">{selectedProduct.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium text-pharmacy-700">Precio:</label>
                <div className="col-span-3 text-pharmacy-700">S/. {selectedProduct.price.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right font-medium text-pharmacy-700">Stock:</label>
                <div className="col-span-3 text-pharmacy-700">{selectedProduct.stock} unidades</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right font-medium text-pharmacy-700">
                  Cantidad:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={selectedProduct.stock.toString()}
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-pharmacy-300 text-pharmacy-700"
              onClick={() => setShowProductDialog(false)}
            >
              Cancelar
            </Button>
            <Button className="bg-pharmacy-500 hover:bg-pharmacy-600" onClick={handleConfirmAddProduct}>
              Agregar al Carrito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación de pago */}
      <Dialog open={showPaymentConfirmation} onOpenChange={setShowPaymentConfirmation}>
        <DialogContent className="bg-white border-pharmacy-200">
          <DialogHeader>
            <DialogTitle className="text-pharmacy-700">Confirmar Pago</DialogTitle>
            <DialogDescription className="text-pharmacy-600">
              Verifique los detalles de la venta antes de procesar el pago.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-pharmacy-700">Cliente:</span>
                <span className="text-pharmacy-700">{customerName || "Cliente General"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-pharmacy-700">Documento:</span>
                <span className="text-pharmacy-700">{customerDocument || "Sin documento"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-pharmacy-700">Total a pagar:</span>
                <span className="text-pharmacy-700">S/. {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-pharmacy-700">Monto recibido:</span>
                <span className="text-pharmacy-700">S/. {Number.parseFloat(cashReceived).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-pharmacy-700">Cambio:</span>
                <span className="text-pharmacy-700">S/. {calculateChange().toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-pharmacy-300 text-pharmacy-700"
              onClick={() => setShowPaymentConfirmation(false)}
            >
              Cancelar
            </Button>
            <Button className="bg-pharmacy-500 hover:bg-pharmacy-600" onClick={confirmPayment}>
              Confirmar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar la boleta */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="bg-white border-pharmacy-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-pharmacy-700 text-center">BOLETA DE VENTA</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4 py-4">
              <div className="bg-pharmacy-50 p-4 rounded-md border border-pharmacy-200">
                <div className="flex justify-center mb-4">
                  <Logo size="medium" />
                </div>
                <h2 className="text-center font-bold text-pharmacy-700 text-lg">FARMACIA NOVA SALUD</h2>
                <p className="text-center text-pharmacy-600 text-sm">Av. Principal 123, Lima</p>
                <p className="text-center text-pharmacy-600 text-sm">RUC: 20123456789</p>
                <p className="text-center text-pharmacy-600 text-sm">Tel: 01-234-5678</p>
              </div>

              <div className="space-y-2 border-b border-pharmacy-200 pb-2">
                <div className="flex justify-between">
                  <span className="font-medium text-pharmacy-700">Nº Boleta:</span>
                  <span className="text-pharmacy-700">{selectedSale.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-pharmacy-700">Fecha:</span>
                  <span className="text-pharmacy-700">{selectedSale.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-pharmacy-700">Cliente:</span>
                  <span className="text-pharmacy-700">{selectedSale.customer}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-pharmacy-700">Detalle de productos:</h3>
                <div className="border-t border-pharmacy-200">
                  {selectedSale.items?.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-pharmacy-100">
                      <div>
                        <p className="text-pharmacy-700">{item.name}</p>
                        <p className="text-sm text-pharmacy-600">
                          {item.quantity} x S/. {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-pharmacy-700">S/. {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-pharmacy-700">Subtotal:</span>
                  <span className="text-pharmacy-700">S/. {(selectedSale.total / 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pharmacy-700">IGV (18%):</span>
                  <span className="text-pharmacy-700">
                    S/. {(selectedSale.total - selectedSale.total / 1.18).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-pharmacy-800">TOTAL:</span>
                  <span className="text-pharmacy-800">S/. {selectedSale.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 text-center">
                <p className="text-pharmacy-600 text-sm">¡Gracias por su compra!</p>
                <p className="text-pharmacy-600 text-xs mt-1">www.novasalud.com</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="w-full bg-pharmacy-500 hover:bg-pharmacy-600"
              onClick={() => setShowReceiptDialog(false)}
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
