"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/inventario"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/inventario" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Inventario
      </Link>
      <Link
        href="/ventas"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/ventas" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Ventas
      </Link>
      <Link
        href="/clientes"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/clientes" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Clientes
      </Link>
      <Link
        href="/reportes"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reportes" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Reportes
      </Link>
    </nav>
  )
}
