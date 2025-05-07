import type { Metadata } from "next"
import DashboardClientPage from "./DashboardClientPage"

export const metadata: Metadata = {
  title: "Dashboard - Nova Salud",
  description: "Sistema de gestión para la botica Nova Salud",
}

export default function DashboardPage() {
  return <DashboardClientPage />
}
