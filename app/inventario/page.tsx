import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "@/components/dashboard/search"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, FileDown, FileUp, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Inventario - Nova Salud",
  description: "Gestión de inventario para la botica Nova Salud",
}

export default function InventarioPage() {
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
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-1 items-center space-x-2">
            <Input placeholder="Buscar productos..." className="w-[300px]" />
            <Select defaultValue="all">
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
            <Select defaultValue="all">
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
              <TableRow>
                <TableCell className="font-medium">MED001</TableCell>
                <TableCell>Paracetamol 500mg</TableCell>
                <TableCell>Analgésicos</TableCell>
                <TableCell>Farmacorp</TableCell>
                <TableCell className="text-right">120</TableCell>
                <TableCell className="text-right">S/. 0.80</TableCell>
                <TableCell>
                  <Badge className="bg-green-500 hover:bg-green-600">Disponible</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MED002</TableCell>
                <TableCell>Amoxicilina 500mg</TableCell>
                <TableCell>Antibióticos</TableCell>
                <TableCell>Genfar</TableCell>
                <TableCell className="text-right">45</TableCell>
                <TableCell className="text-right">S/. 1.20</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Stock Bajo</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MED003</TableCell>
                <TableCell>Loratadina 10mg</TableCell>
                <TableCell>Antialérgicos</TableCell>
                <TableCell>Medifarma</TableCell>
                <TableCell className="text-right">78</TableCell>
                <TableCell className="text-right">S/. 1.50</TableCell>
                <TableCell>
                  <Badge className="bg-green-500 hover:bg-green-600">Disponible</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MED004</TableCell>
                <TableCell>Complejo B</TableCell>
                <TableCell>Vitaminas</TableCell>
                <TableCell>Naturgen</TableCell>
                <TableCell className="text-right">0</TableCell>
                <TableCell className="text-right">S/. 15.90</TableCell>
                <TableCell>
                  <Badge className="bg-red-500 hover:bg-red-600">Agotado</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MED005</TableCell>
                <TableCell>Ibuprofeno 400mg</TableCell>
                <TableCell>Analgésicos</TableCell>
                <TableCell>Farmacorp</TableCell>
                <TableCell className="text-right">89</TableCell>
                <TableCell className="text-right">S/. 0.90</TableCell>
                <TableCell>
                  <Badge className="bg-green-500 hover:bg-green-600">Disponible</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MED006</TableCell>
                <TableCell>Crema Hidratante</TableCell>
                <TableCell>Dermatológicos</TableCell>
                <TableCell>Eucerin</TableCell>
                <TableCell className="text-right">12</TableCell>
                <TableCell className="text-right">S/. 45.00</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Stock Bajo</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Mostrando 6 de 120 productos</div>
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
            <div className="flex items-center justify-between rounded-md border p-2">
              <div>
                <p className="font-medium">Amoxicilina 500mg</p>
                <p className="text-sm text-muted-foreground">Quedan 45 unidades</p>
              </div>
              <Button size="sm">Ordenar</Button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <div>
                <p className="font-medium">Crema Hidratante</p>
                <p className="text-sm text-muted-foreground">Quedan 12 unidades</p>
              </div>
              <Button size="sm">Ordenar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
