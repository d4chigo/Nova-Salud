import type { Metadata } from "next"
import VentasClientPage from "./VentasClientPage"

export const metadata: Metadata = {
  title: "Ventas - Nova Salud",
  description: "Sistema de ventas para la botica Nova Salud",
}

export default function VentasPage() {
  return <VentasClientPage />
}
