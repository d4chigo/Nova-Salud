"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulación de autenticación
    if (username === "admin" && password === "admin123") {
      // Iniciar sesión con el contexto de autenticación
      login({ name: "Administrador", role: "admin" })

      // Redireccionar al dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } else {
      setError("Usuario o contraseña incorrectos")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-pharmacy-50 to-pharmacy-100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      ></div>
      <Card className="w-full max-w-md pharmacy-shadow border-pharmacy-200">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl font-bold text-pharmacy-700">Farmacia Nova Salud</CardTitle>
          <CardDescription className="text-pharmacy-600">
            Ingrese sus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-pharmacy-700">
                  Usuario
                </Label>
                <Input
                  id="username"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-pharmacy-200 focus-visible:ring-pharmacy-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-pharmacy-700">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-pharmacy-200 focus-visible:ring-pharmacy-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-pharmacy-500 hover:bg-pharmacy-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">Usuario de prueba: admin / Contraseña: admin123</p>
        </CardFooter>
      </Card>
    </div>
  )
}
