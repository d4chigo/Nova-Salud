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
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-pharmacy-600",
          pathname === "/dashboard" ? "text-pharmacy-600 font-semibold" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/inventario"
        className={cn(
          "text-sm font-medium transition-colors hover:text-pharmacy-600",
          pathname === "/inventario" ? "text-pharmacy-600 font-semibold" : "text-muted-foreground",
        )}
      >
        Inventario
      </Link>
      <Link
        href="/ventas"
        className={cn(
          "text-sm font-medium transition-colors hover:text-pharmacy-600",
          pathname === "/ventas" ? "text-pharmacy-600 font-semibold" : "text-muted-foreground",
        )}
      >
        Ventas
      </Link>
    </nav>
  )
}
