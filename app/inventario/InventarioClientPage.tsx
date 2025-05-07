"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, AlertTriangle, Pencil, Trash, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Logo } from "@/components/logo"

type Product = {
  id: string
  name: string
  category: string
  laboratory: string
  stock: number
  price: number
  status: "disponible" | "bajo" | "agotado"
}

export default function InventarioClientPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState("")
  const [orderingProducts, setOrderingProducts] = useState<string[]>([])
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    laboratory: "",
    stock: "",
    price: "",
  })
  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    category: "",
    laboratory: "",
    stock: "",
    price: "",
  })

  // Datos de ejemplo
  const [products, setProducts] = useState<Product[]>([
    {
      id: "MED001",
      name: "Paracetamol 500mg",
      category: "Analgésicos",
      laboratory: "Farmacorp",
      stock: 120,
      price: 0.8,
      status: "disponible",
    },
    {
      id: "MED002",
      name: "Amoxicilina 500mg",
      category: "Antibióticos",
      laboratory: "Genfar",
      stock: 45,
      price: 1.2,
      status: "bajo",
    },
    {
      id: "MED003",
      name: "Loratadina 10mg",
      category: "Antialérgicos",
      laboratory: "Medifarma",
      stock: 78,
      price: 1.5,
      status: "disponible",
    },
    {
      id: "MED004",
      name: "Complejo B",
      category: "Vitaminas",
      laboratory: "Naturgen",
      stock: 0,
      price: 15.9,
      status: "agotado",
    },
    {
      id: "MED005",
      name: "Ibuprofeno 400mg",
      category: "Analgésicos",
      laboratory: "Farmacorp",
      stock: 89,
      price: 0.9,
      status: "disponible",
    },
    {
      id: "MED006",
      name: "Crema Hidratante",
      category: "Dermatológicos",
      laboratory: "Eucerin",
      stock: 12,
      price: 45.0,
      status: "bajo",
    },
  ])

  const handleAddProduct = () => {
    // Validación básica
    if (
      !newProduct.id ||
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.laboratory ||
      !newProduct.stock ||
      !newProduct.price
    ) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Verificar si el ID ya existe
    if (products.some((p) => p.id === newProduct.id)) {
      toast({
        title: "Error",
        description: "El código del producto ya existe",
        variant: "destructive",
      })
      return
    }

    const stock = Number.parseInt(newProduct.stock)
    const price = Number.parseFloat(newProduct.price)

    // Determinar el estado basado en el stock
    let status: "disponible" | "bajo" | "agotado" = "disponible"
    if (stock === 0) {
      status = "agotado"
    } else if (stock <= 20) {
      status = "bajo"
    }

    // Agregar el nuevo producto
    const productToAdd: Product = {
      id: newProduct.id,
      name: newProduct.name,
      category: newProduct.category,
      laboratory: newProduct.laboratory,
      stock: stock,
      price: price,
      status: status,
    }

    setProducts([...products, productToAdd])

    // Limpiar el formulario y cerrar el diálogo
    setNewProduct({
      id: "",
      name: "",
      category: "",
      laboratory: "",
      stock: "",
      price: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Producto agregado",
      description: `${productToAdd.name} ha sido agregado al inventario`,
    })
  }

  const handleEditProduct = (id: string) => {
    const product = products.find((p) => p.id === id)
    if (product) {
      setEditProduct({
        id: product.id,
        name: product.name,
        category: product.category,
        laboratory: product.laboratory,
        stock: product.stock.toString(),
        price: product.price.toString(),
      })
      setIsEditDialogOpen(true)
    }
  }

  const handleSaveEdit = () => {
    // Validación básica
    if (
      !editProduct.name ||
      !editProduct.category ||
      !editProduct.laboratory ||
      !editProduct.stock ||
      !editProduct.price
    ) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      })
      return
    }

    const stock = Number.parseInt(editProduct.stock)
    const price = Number.parseFloat(editProduct.price)

    // Determinar el estado basado en el stock
    let status: "disponible" | "bajo" | "agotado" = "disponible"
    if (stock === 0) {
      status = "agotado"
    } else if (stock <= 20) {
      status = "bajo"
    }

    // Actualizar el producto
    setProducts(
      products.map((p) =>
        p.id === editProduct.id
          ? {
              ...p,
              name: editProduct.name,
              category: editProduct.category,
              laboratory: editProduct.laboratory,
              stock: stock,
              price: price,
              status: status,
            }
          : p,
      ),
    )

    setIsEditDialogOpen(false)
    toast({
      title: "Producto actualizado",
      description: `${editProduct.name} ha sido actualizado correctamente`,
    })
  }

  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProductId))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del inventario",
    })
  }

  const handleOrderProduct = (name: string) => {
    // Agregar el producto a la lista de productos en proceso de pedido
    setOrderingProducts((prev) => [...prev, name])

    // Mostrar el toast de inmediato
    toast({
      title: "Pedido iniciado",
      description: `Se está ordenando producto: ${name}`,
      duration: 3000,
    })

    // Simular un proceso de pedido
    setTimeout(() => {
      // Eliminar el producto de la lista de productos en proceso de pedido
      setOrderingProducts((prev) => prev.filter((p) => p !== name))

      // Mostrar un toast de confirmación
      toast({
        title: "Pedido completado",
        description: `El pedido de ${name} ha sido procesado correctamente`,
        duration: 3000,
      })
    }, 2000)
  }

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    // Filtro de búsqueda
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de categoría
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase()

    // Filtro de estado
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Productos con stock bajo o agotados
  const lowStockProducts = products.filter((product) => product.status === "bajo")
  const outOfStockProducts = products.filter((product) => product.status === "agotado")

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
          <h2 className="text-3xl font-bold tracking-tight text-pharmacy-800">Inventario</h2>
          <div className="flex items-center space-x-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-pharmacy-500 hover:bg-pharmacy-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-pharmacy-200">
                <DialogHeader>
                  <DialogTitle className="text-pharmacy-700">Agregar Nuevo Producto</DialogTitle>
                  <DialogDescription className="text-pharmacy-600">
                    Complete la información del nuevo producto para agregarlo al inventario.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productId" className="text-right text-pharmacy-700">
                      Código
                    </Label>
                    <Input
                      id="productId"
                      value={newProduct.id}
                      onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                      className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productName" className="text-right text-pharmacy-700">
                      Nombre
                    </Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productCategory" className="text-right text-pharmacy-700">
                      Categoría
                    </Label>
                    <Input
                      id="productCategory"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productLaboratory" className="text-right text-pharmacy-700">
                      Laboratorio
                    </Label>
                    <Input
                      id="productLaboratory"
                      value={newProduct.laboratory}
                      onChange={(e) => setNewProduct({ ...newProduct, laboratory: e.target.value })}
                      className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productStock" className="text-right text-pharmacy-700">
                      Stock
                    </Label>
                    <Input
                      id="productStock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productPrice" className="text-right text-pharmacy-700">
                      Precio
                    </Label>
                    <Input
                      id="productPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-pharmacy-300 text-pharmacy-700"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button className="bg-pharmacy-500 hover:bg-pharmacy-600" onClick={handleAddProduct}>
                    Guardar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Buscar productos..."
              className="w-[300px] border-pharmacy-200 focus-visible:ring-pharmacy-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] border-pharmacy-200 text-pharmacy-700">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white border-pharmacy-200">
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="analgesicos">Analgésicos</SelectItem>
                <SelectItem value="antibioticos">Antibióticos</SelectItem>
                <SelectItem value="antialergicos">Antialérgicos</SelectItem>
                <SelectItem value="vitaminas">Vitaminas</SelectItem>
                <SelectItem value="dermatologicos">Dermatológicos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-pharmacy-200 text-pharmacy-700">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-white border-pharmacy-200">
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="bajo">Stock Bajo</SelectItem>
                <SelectItem value="agotado">Agotado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border border-pharmacy-200 pharmacy-shadow bg-white">
          <Table>
            <TableHeader className="bg-pharmacy-100">
              <TableRow>
                <TableHead className="w-[100px] text-pharmacy-700">Código</TableHead>
                <TableHead className="text-pharmacy-700">Nombre</TableHead>
                <TableHead className="text-pharmacy-700">Categoría</TableHead>
                <TableHead className="text-pharmacy-700">Laboratorio</TableHead>
                <TableHead className="text-right text-pharmacy-700">Stock</TableHead>
                <TableHead className="text-right text-pharmacy-700">Precio</TableHead>
                <TableHead className="text-pharmacy-700">Estado</TableHead>
                <TableHead className="text-right text-pharmacy-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-pharmacy-400">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-pharmacy-700">{product.id}</TableCell>
                    <TableCell className="text-pharmacy-700">{product.name}</TableCell>
                    <TableCell className="text-pharmacy-700">{product.category}</TableCell>
                    <TableCell className="text-pharmacy-700">{product.laboratory}</TableCell>
                    <TableCell className="text-right text-pharmacy-700">{product.stock}</TableCell>
                    <TableCell className="text-right text-pharmacy-700">S/. {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "disponible"
                            ? "bg-health-600 hover:bg-health-700"
                            : product.status === "bajo"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {product.status === "disponible"
                          ? "Disponible"
                          : product.status === "bajo"
                            ? "Stock Bajo"
                            : "Agotado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pharmacy-700 hover:text-pharmacy-500"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-pharmacy-600">
            Mostrando {filteredProducts.length} de {products.length} productos
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-pharmacy-300 text-pharmacy-700">
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="border-pharmacy-300 text-pharmacy-700">
              Siguiente
            </Button>
          </div>
        </div>

        {/* Productos con stock bajo */}
        <div className="rounded-md border border-pharmacy-200 p-4 mt-4 bg-white pharmacy-shadow">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-medium text-pharmacy-700">Productos con stock bajo</h3>
          </div>
          <p className="text-sm text-pharmacy-600 mt-2">
            Los siguientes productos necesitan reposición pronto. Contacte a los proveedores para realizar pedidos.
          </p>
          <div className="mt-4 space-y-2">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-pharmacy-400">No hay productos con stock bajo.</p>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-md border border-pharmacy-200 p-2 bg-pharmacy-50"
                >
                  <div>
                    <p className="font-medium text-pharmacy-700">{product.name}</p>
                    <p className="text-sm text-pharmacy-600">Quedan {product.stock} unidades</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-pharmacy-500 hover:bg-pharmacy-600"
                    onClick={() => handleOrderProduct(product.name)}
                    disabled={orderingProducts.includes(product.name)}
                  >
                    {orderingProducts.includes(product.name) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ordenando...
                      </>
                    ) : (
                      "Ordenar"
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Productos agotados */}
        <div className="rounded-md border border-pharmacy-200 p-4 mt-4 bg-white pharmacy-shadow">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium text-pharmacy-700">Productos agotados</h3>
          </div>
          <p className="text-sm text-pharmacy-600 mt-2">
            Los siguientes productos están agotados. Realice pedidos urgentes para reponer el stock.
          </p>
          <div className="mt-4 space-y-2">
            {outOfStockProducts.length === 0 ? (
              <p className="text-sm text-pharmacy-400">No hay productos agotados.</p>
            ) : (
              outOfStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-md border border-pharmacy-200 p-2 bg-red-50"
                >
                  <div>
                    <p className="font-medium text-pharmacy-700">{product.name}</p>
                    <p className="text-sm text-red-500">Sin stock</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleOrderProduct(product.name)}
                    disabled={orderingProducts.includes(product.name)}
                  >
                    {orderingProducts.includes(product.name) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ordenando...
                      </>
                    ) : (
                      "Ordenar"
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Diálogo para editar producto */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white border-pharmacy-200">
          <DialogHeader>
            <DialogTitle className="text-pharmacy-700">Editar Producto</DialogTitle>
            <DialogDescription className="text-pharmacy-600">Modifique la información del producto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editProductId" className="text-right text-pharmacy-700">
                Código
              </Label>
              <Input
                id="editProductId"
                value={editProduct.id}
                disabled
                className="col-span-3 border-pharmacy-200 bg-pharmacy-50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editProductName" className="text-right text-pharmacy-700">
                Nombre
              </Label>
              <Input
                id="editProductName"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editProductCategory" className="text-right text-pharmacy-700">
                Categoría
              </Label>
              <Input
                id="editProductCategory"
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editProductLaboratory" className="text-right text-pharmacy-700">
                Laboratorio
              </Label>
              <Input
                id="editProductLaboratory"
                value={editProduct.laboratory}
                onChange={(e) => setEditProduct({ ...editProduct, laboratory: e.target.value })}
                className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editProductStock" className="text-right text-pharmacy-700">
                Stock
              </Label>
              <Input
                id="editProductStock"
                type="number"
                value={editProduct.stock}
                onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editProductPrice" className="text-right text-pharmacy-700">
                Precio
              </Label>
              <Input
                id="editProductPrice"
                type="number"
                step="0.01"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                className="col-span-3 border-pharmacy-200 focus-visible:ring-pharmacy-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-pharmacy-300 text-pharmacy-700"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="bg-pharmacy-500 hover:bg-pharmacy-600" onClick={handleSaveEdit}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar producto */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-pharmacy-700">¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription className="text-pharmacy-600">
              Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-pharmacy-300 text-pharmacy-700">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleConfirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </div>
  )
}
