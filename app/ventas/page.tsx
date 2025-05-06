import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/dashboard/main-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "@/components/dashboard/search"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, CreditCard, Printer, SearchIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Ventas - Nova Salud",
  description: "Sistema de ventas para la botica Nova Salud",
}

export default function VentasPage() {
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
                <Input type="search" placeholder="Buscar productos por nombre o código..." className="pl-8 w-full" />
              </div>
              <Button>
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
                    <TableRow>
                      <TableCell>Paracetamol 500mg</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            -
                          </Button>
                          <span className="w-12 text-center">3</span>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">S/. 0.80</TableCell>
                      <TableCell className="text-right">S/. 2.40</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Loratadina 10mg</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            -
                          </Button>
                          <span className="w-12 text-center">2</span>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">S/. 1.50</TableCell>
                      <TableCell className="text-right">S/. 3.00</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ibuprofeno 400mg</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            -
                          </Button>
                          <span className="w-12 text-center">1</span>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">S/. 0.90</TableCell>
                      <TableCell className="text-right">S/. 0.90</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
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
                      <TableCell>Tarjeta</TableCell>
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
                    <span>S/. 6.30</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IGV (18%):</span>
                    <span>S/. 1.13</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span>Total:</span>
                    <span>S/. 7.43</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cliente</label>
                  <Input placeholder="Nombre del cliente (opcional)" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">DNI/RUC</label>
                  <Input placeholder="Documento de identidad (opcional)" />
                </div>

                <Tabs defaultValue="efectivo">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="efectivo">Efectivo</TabsTrigger>
                    <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
                  </TabsList>
                  <TabsContent value="efectivo" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Monto recibido</label>
                      <Input placeholder="0.00" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cambio:</span>
                      <span>S/. 0.00</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="tarjeta" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Número de tarjeta</label>
                      <Input placeholder="**** **** **** ****" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Fecha de expiración</label>
                        <Input placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input placeholder="***" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Procesar Pago
                </Button>
                <Button variant="outline" className="w-full">
                  Cancelar Venta
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
