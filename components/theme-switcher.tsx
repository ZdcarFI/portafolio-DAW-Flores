"use client"

import {DropdownMenuTrigger} from "@/components/ui/dropdown-menu"

import {useState, useEffect, useRef} from "react"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Palette, Pause, Play} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"

const themes = [
    {name: "Claro", value: "light", color: "#ffffff"},
    {name: "Oscuro", value: "dark", color: "#1e293b"},
    {name: "Azul", value: "blue", color: "#3b82f6"},
    {name: "Verde", value: "green", color: "#10b981"},
    {name: "Naranja", value: "orange", color: "#f97316"},
]

// Variable global para controlar el intervalo (solo una instancia activa)
let globalThemeInterval: any = null

export function ThemeSwitcher() {
    const {setTheme, theme: currentTheme} = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [autoChangeTheme, setAutoChangeTheme] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [mounted, setMounted] = useState(false)
    const intervalRef = useRef(null)

    // Marcar como montado
    useEffect(() => {
        setMounted(true)
    }, [])

    // Configuración inicial - solo una vez
    useEffect(() => {
        if (!mounted) return

        // Leer el estado global del localStorage
        const savedAutoChange = localStorage.getItem("autoChangeTheme")
        const savedTheme = localStorage.getItem("theme") || currentTheme

        // Establecer valores iniciales
        if (!savedTheme || savedTheme === "system") {
            setTheme("light")
        }

        // Configurar autoChangeTheme basado en localStorage
        const shouldAutoChange = savedAutoChange === "true"
        setAutoChangeTheme(shouldAutoChange)

        // Si no existe la preferencia, establecerla como false
        if (savedAutoChange === null) {
            localStorage.setItem("autoChangeTheme", "false")
        }

    }, [mounted, setTheme])

    // Manejar el cambio automático de tema
    useEffect(() => {
        // Limpiar cualquier intervalo previo
        if (globalThemeInterval) {
            clearInterval(globalThemeInterval)
            globalThemeInterval = null
        }

        if (!mounted || !autoChangeTheme || !currentTheme) {
            return
        }

        // Encontrar índice inicial
        const initialIndex = themes.findIndex((t) => t.value === currentTheme)
        if (initialIndex !== -1) {
            setCurrentIndex(initialIndex)
        }

        // Crear nuevo intervalo global
        globalThemeInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % themes.length
                const nextTheme = themes[nextIndex].value

                // Aplicar el tema
                document.documentElement.className = nextTheme
                setTheme(nextTheme)

                return nextIndex
            })
        }, 5000)

        // Cleanup function
        return () => {
            if (globalThemeInterval) {
                clearInterval(globalThemeInterval)
                globalThemeInterval = null
            }
        }
    }, [autoChangeTheme, currentTheme, mounted, setTheme])

    // Guardar preferencia cuando cambia
    useEffect(() => {
        if (!mounted) return
        localStorage.setItem("autoChangeTheme", autoChangeTheme.toString())
    }, [autoChangeTheme, mounted])

    const toggleAutoChange = () => {
        setAutoChangeTheme(prev => !prev)
    }

    const handleThemeSelect = (themeValue: any) => {
        // Limpiar intervalo al seleccionar tema manualmente
        if (globalThemeInterval) {
            clearInterval(globalThemeInterval)
            globalThemeInterval = null
        }

        document.documentElement.className = themeValue
        setTheme(themeValue)
        setIsOpen(false)

        // Actualizar índice
        const selectedIndex = themes.findIndex((t) => t.value === themeValue)
        if (selectedIndex !== -1) {
            setCurrentIndex(selectedIndex)
        }

        // Reiniciar intervalo si está activo
        if (autoChangeTheme) {
            setTimeout(() => {
                if (autoChangeTheme) {
                    // Recrear el efecto del useEffect
                    globalThemeInterval = setInterval(() => {
                        setCurrentIndex((prevIndex) => {
                            const nextIndex = (prevIndex + 1) % themes.length
                            const nextTheme = themes[nextIndex].value
                            document.documentElement.className = nextTheme
                            setTheme(nextTheme)
                            return nextIndex
                        })
                    }, 5000)
                }
            }, 100)
        }
    }

    // Cleanup al desmontar
    useEffect(() => {
        return () => {
            if (globalThemeInterval) {
                clearInterval(globalThemeInterval)
                globalThemeInterval = null
            }
        }
    }, [])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="relative">
                <Palette className="h-[1.2rem] w-[1.2rem]"/>
                <span className="sr-only">Cambiar tema</span>
            </Button>
        )
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    {autoChangeTheme ? (
                        <Play className="h-[1.2rem] w-[1.2rem] animate-pulse"/>
                    ) : (
                        <Palette className="h-[1.2rem] w-[1.2rem]"/>
                    )}
                    <span className="sr-only">Cambiar tema</span>
                    {autoChangeTheme && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse"/>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-2">
                        {autoChangeTheme ? <Play className="h-4 w-4"/> : <Pause className="h-4 w-4"/>}
                        <Label htmlFor="auto-theme" className="text-sm font-medium">
                            Cambio automático
                        </Label>
                    </div>
                    <Switch
                        id="auto-theme"
                        checked={autoChangeTheme}
                        onCheckedChange={toggleAutoChange}
                    />
                </div>
                <DropdownMenuSeparator/>
                <div className="grid grid-cols-3 gap-1 p-2">
                    {themes.map((theme) => (
                        <DropdownMenuItem
                            key={theme.value}
                            onClick={() => handleThemeSelect(theme.value)}
                            className={`flex flex-col items-center justify-center p-2 gap-1 h-20 hover:bg-muted rounded-md transition-colors cursor-pointer ${
                                currentTheme === theme.value ? "border-2 border-primary bg-muted/50" : "border border-transparent"
                            }`}
                        >
                            <div
                                className="w-10 h-10 rounded-full border-2 border-border shadow-sm"
                                style={{backgroundColor: theme.color}}
                            />
                            <span className="text-xs font-medium">{theme.name}</span>
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}