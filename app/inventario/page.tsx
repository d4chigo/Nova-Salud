import type { Metadata } from "next"
import InventarioClientPage from "./InventarioClientPage"

export const metadata: Metadata = {
  title: "Inventario - Nova Salud",
  description: "Gestión de inventario para la botica Nova Salud",
}

export default function InventarioPage() {
  return <InventarioClientPage />
}
