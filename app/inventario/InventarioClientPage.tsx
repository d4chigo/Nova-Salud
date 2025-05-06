"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "@/components/dashboard/search"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, FileDown, FileUp, AlertTriangle } from "lucide-react"
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
  const [newProduct, setNewProduct] = useState({
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

  const handleExportInventory = () => {
    toast({
      title: "Exportación iniciada",
      description: "El inventario se está exportando",
    })
  }

  const handleImportInventory = () => {
    toast({
      title: "Importación",
      description: "Seleccione un archivo para importar",
    })
  }

  const handleEditProduct = (id: string) => {
    toast({
      title: "Editar producto",
      description: `Editando producto con código ${id}`,
    })
  }

  const handleOrderProduct = (name: string) => {
    toast({
      title: "Pedido iniciado",
      description: `Se ha iniciado un pedido para ${name}`,
    })
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

  // Productos con stock bajo
  const lowStockProducts = products.filter((product) => product.status === "bajo")

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
          <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportInventory}>
              <FileDown className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" onClick={handleImportInventory}>
              <FileUp className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                  <DialogDescription>
                    Complete la información del nuevo producto para agregarlo al inventario.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productId" className="text-right">
                      Código
                    </Label>
                    <Input
                      id="productId"
                      value={newProduct.id}
                      onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productName" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productCategory" className="text-right">
                      Categoría
                    </Label>
                    <Input
                      id="productCategory"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productLaboratory" className="text-right">
                      Laboratorio
                    </Label>
                    <Input
                      id="productLaboratory"
                      value={newProduct.laboratory}
                      onChange={(e) => setNewProduct({ ...newProduct, laboratory: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productStock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="productStock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productPrice" className="text-right">
                      Precio
                    </Label>
                    <Input
                      id="productPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddProduct}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Buscar productos..."
              className="w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="analgesicos">Analgésicos</SelectItem>
                <SelectItem value="antibioticos">Antibióticos</SelectItem>
                <SelectItem value="antialergicos">Antialérgicos</SelectItem>
                <SelectItem value="vitaminas">Vitaminas</SelectItem>
                <SelectItem value="dermatologicos">Dermatológicos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="bajo">Stock Bajo</SelectItem>
                <SelectItem value="agotado">Agotado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Laboratorio</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.laboratory}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">S/. {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "disponible"
                            ? "bg-green-500 hover:bg-green-600"
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
                      <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product.id)}>
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {products.length} productos
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>

        <div className="rounded-md border p-4 mt-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-medium">Productos con stock bajo</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Los siguientes productos necesitan reposición pronto. Contacte a los proveedores para realizar pedidos.
          </p>
          <div className="mt-4 space-y-2">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-md border p-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">Quedan {product.stock} unidades</p>
                </div>
                <Button size="sm" onClick={() => handleOrderProduct(product.name)}>
                  Ordenar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
