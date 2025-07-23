"use client"

import {use, useState} from "react"
import {motion} from "framer-motion"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    ArrowLeft,
    Target,
    BookOpen,
    Code,
    CheckCircle,
    FileText,
    Palette,
    Zap,
    ExternalLink,
    Lightbulb,
    ChevronDown,
    ChevronRight,
    Cpu,
    Component,
    Play, Server, Shield, Database, Globe,
} from "lucide-react"
import Link from "next/link"
import {Semana1Examples} from "@/components/semana1";
import {Semana2Examples} from "@/components/semana2";
import {Semana3Examples} from "@/components/semana3";
import {Semana4Examples} from "@/components/semana4";
import {Semana5Examples} from "@/components/semana5";
import {Semana6Examples} from "@/components/semana6";
import {Semana7Examples} from "@/components/semana7";
import Image from "next/image";
import {Semana9Examples} from "@/components/semana9";
import {Semana10Examples} from "@/components/semana10";
import {Semana11Examples} from "@/components/semana11";
import {Semana12Examples} from "@/components/semana12";
import {Semana14Examples} from "@/components/semana14";
import {Semana13Examples} from "@/components/semana13";
import {Semana15Examples} from "@/components/semana15";
import {Semanas} from "@/data/semanas";

interface SemanaData {
    id: number;
    titulo: string;
    subtitulo: string;
    icono: React.ComponentType<any>;
    color: string;
    descripcionCompleta: string;
    contenido: {
        nombre: string;
        temas: string[];
    }[];
    recursos?: {
        nombre: string;
        url: string;
    }[];
    imagen?: string;
}

const semanasData: Record<string, SemanaData> = {
    "semana-1-silabo": {
        id: 1,
        titulo: "Fundamentos y Sílabo",
        subtitulo: "Introducción al Desarrollo Web",
        icono: FileText,
        color: "from-blue-500 to-cyan-500",
        descripcionCompleta:
            "Esta primera semana establece las bases fundamentales para todo el viaje de aprendizaje. ",
        contenido: [
            {
                nombre: "Historia y Evolución de la Web",
                temas: [
                    "Evolución desde HTML estático hasta aplicaciones web modernas",
                    "Diferencias entre sitios web estáticos y dinámicos",
                    "Arquitecturas web: Monolíticas vs Microservicios",

                ],
            },
            {
                nombre: "Configuración del Entorno de Desarrollo",
                temas: [
                    "Instalación y configuración inicial de VS Code",
                    "Extensiones esenciales: Prettier, ESLint, Live Server",
                    "Control de versiones con Git y GitHub",
                    "Node.js y gestión de paquetes con npm",
                ],
            },

        ],
        recursos: [
            {nombre: "MDN Web Docs", url: "https://developer.mozilla.org"},
            {nombre: "Visual Studio Code", url: "https://code.visualstudio.com/"},
            {nombre: "GitHub Docs", url: "https://docs.github.com/"},
        ],
        imagen: '/Fundamentos.png'
    },

    "semana-2-html-emmet": {
        id: 2,
        titulo: "HTML & Emmet",
        subtitulo: "Estructura y Productividad",
        icono: Code,
        color: "from-orange-500 to-red-500",
        descripcionCompleta:
            "Dominio  de HTML5 semántico y técnicas avanzadas de Emmet para maximizar la productividad en el desarrollo.",
        contenido: [
            {
                nombre: "HTML5 Fundamentals",
                temas: [
                    "Anatomía de un documento HTML5",
                    "Elementos semánticos: header, nav, main, section, article",
                    "Meta tags esenciales y SEO básico",

                ],
            },
            {
                nombre: "Multimedia y Formularios",
                temas: [
                    "Imágenes responsivas con srcset y sizes",
                    "Audio y video HTML5",
                    "Formularios avanzados con validación",
                    "Tablas y datos estructurados",
                ],
            },
            {
                nombre: "Emmet y Productividad",
                temas: [
                    "Sintaxis básica de Emmet",
                    "Abreviaciones complejas para layouts",
                    "Snippets personalizados",

                ],
            },
        ],
        recursos: [
            {nombre: "HTML5 Semantic Elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"},
            {nombre: "Semantic HTML Guide", url: "https://web.dev/semantic-html/"},
            {nombre: "HTML5 Form Elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"},
            {nombre: "VS Code Emmet", url: "https://code.visualstudio.com/docs/editor/emmet"},
            {nombre: "Emmet Interactive Demo", url: "https://emmet.io"},
        ],
        imagen: "/Html-emmet.webp"
    },

    "semana-3-css-basico-avanzado": {
        id: 3,
        titulo: "CSS Completo",
        subtitulo: "De Básico a Avanzado",
        icono: Palette,
        color: "from-purple-500 to-pink-500",
        descripcionCompleta:
            "Exploración exhaustiva de CSS desde fundamentos hasta técnicas avanzadas, incluyendo Flexbox, Grid, animaciones y metodologías.",
        contenido: [
            {
                nombre: "CSS Fundamentals",
                temas: [
                    "Anatomía de CSS y cascada",
                    "Selectores avanzados y pseudo-clases",
                    "Box model y box-sizing",
                    "Tipografía y colores modernos",
                ],
            },
            {
                nombre: "Layouts Modernos",
                temas: [
                    "Flexbox mastery",
                    "CSS Grid Layout",
                    "Layouts híbridos y patrones",
                    "Posicionamiento avanzado"
                ],
            },
            {
                nombre: "Responsive y Animaciones",
                temas: [
                    "Responsive design avanzado",
                    "CSS transforms y transitions",
                    "Keyframes y animaciones complejas",
                    "Efectos visuales con filters y clip-path",
                ],
            },

        ],
        recursos: [
            {nombre: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/"},
            {nombre: "Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"},
            {nombre: "CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations"},
            {nombre: "Ejercicios práctica en clase", url: "https://github.com/MorrisJesus/PRACTICA-HTML-Y-CSS"},
        ],
        imagen: "/css.png"
    },

    "semana-4-tailwind-bootstrap": {
        id: 4,
        titulo: "Frameworks CSS",
        subtitulo: "Tailwind & Bootstrap",
        icono: Zap,
        color: "from-green-500 to-teal-500",
        descripcionCompleta:
            "Comparación y dominio de los frameworks CSS más populares: Tailwind CSS y Bootstrap, sus filosofías y casos de uso.",
        contenido: [
            {
                nombre: "Tailwind CSS",
                temas: [
                    "Filosofía utility-first",
                    "Instalación y configuración",
                    "Sistema de utilidades core",
                    "Responsive design y theming",
                ],
            },
            {
                nombre: "Bootstrap Framework",
                temas: [
                    "Component-first approach",
                    "Grid system y layout",
                    "Componentes predefinidos",
                    "JavaScript components",
                ],
            },
            {
                nombre: "Customización Avanzada",
                temas: [
                    "Tailwind plugins y JIT",
                    "Bootstrap Sass customization",
                    "Framework comparison",
                    "Integration strategies",
                ],
            },
            {
                nombre: "Optimización",
                temas: [
                    "Bundle size optimization",
                    "CSS purging strategies",
                    "Performance considerations",
                    "Production deployment",
                ],
            },
        ],
        recursos: [
            {nombre: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs"},
            {nombre: "Bootstrap Docs", url: "https://getbootstrap.com/docs"},
            {nombre: "Tailwind UI", url: "https://tailwindui.com"},
        ],
        imagen: "/t-b.avif"
    },

    "semana-5-javascript-typescript": {
        id: 5,
        titulo: "JavaScript & TypeScript",
        subtitulo: "Programación Moderna",
        icono: Cpu,
        color: "from-yellow-500 to-orange-500",
        descripcionCompleta:
            "Fundamentos sólidos de JavaScript moderno (ES6+) y transición gradual a TypeScript para desarrollo tipado y escalable.",
        contenido: [
            {
                nombre: "JavaScript ES6+ Fundamentals",
                temas: [
                    "Variables modernas: let, const vs var",
                    "Arrow functions y destructuring",
                    "Promises y async/await",
                    "Módulos ES6 y import/export",
                ],
            },
            {
                nombre: "Programación Asíncrona",
                temas: [
                    "Event loop y call stack",
                    "Fetch API y HTTP requests",
                    "Error handling con try/catch",
                    "Trabajando con APIs REST",
                ],
            },
            {
                nombre: "TypeScript Fundamentals",
                temas: [
                    "Tipos básicos y anotaciones",
                    "Interfaces y types",
                    "Generics y utility types",
                    "Configuración de tsconfig.json",
                ],
            },
            {
                nombre: "DOM Manipulation",
                temas: [
                    "Selección y manipulación de elementos",
                    "Event handling moderno",
                    "Local storage y session storage",
                    "Performance optimization",
                ],
            },
        ],
        recursos: [
            {nombre: "JavaScript MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"},
            {nombre: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/"},
            {
                nombre: "Practica en clase",
                url: "https://github.com/MorrisJesus/PRACTICA-CALIFICADA-3ATENCIOFLORESVARGAS"
            },
        ],
        imagen: "/js.webp"
    },

    "semana-6-principios-react": {
        id: 6,
        titulo: "Principios React",
        subtitulo: "React, Next.js & Vue",
        icono: Component,
        color: "from-cyan-500 to-blue-500",
        descripcionCompleta: "Introducción comprehensiva a los frameworks modernos de JavaScript: React, Next.js y Vue.js.",
        contenido: [
            {
                nombre: "React Fundamentals",
                temas: [
                    "Componentes y JSX",
                    "Props y state con hooks",
                    "Event handling en React",
                    "Conditional rendering y listas",
                ],
            },
            {
                nombre: "Next.js Full-Stack",
                temas: [
                    "File-based routing",
                    "Server-side rendering (SSR)",
                    "API routes y backend",
                    "Deployment en Vercel"
                ],
            },

            {
                nombre: "Framework Comparison",
                temas: [
                    "Sintaxis y learning curve",
                    "Performance y bundle size",
                    "Ecosystem y community",
                    "Casos de uso ideales",
                ],
            },
        ],
        recursos: [
            {nombre: "React Docs", url: "https://react.dev"},
            {nombre: "Next.js Docs", url: "https://nextjs.org/docs"},
            {nombre: "Vue.js Guide", url: "https://vuejs.org/guide/"},
        ],
        imagen: "/r-v.png"
    },

    "semana-7-componentes-hooks": {
        id: 7,
        titulo: "React Avanzado",
        subtitulo: "Componentes & Hooks",
        icono: Play,
        color: "from-indigo-500 to-purple-500",
        descripcionCompleta:
            "Profundización completa en React con componentes avanzados, hooks personalizados .",
        contenido: [
            {
                nombre: "Hooks",
                temas: [
                    "useState, useEffect",
                    "useReducer y state complejo",
                    "useCallback y useMemo",
                    "useRef y DOM manipulation",
                    "Custom hooks creation",
                ],
            },

            {
                nombre: "Performance Optimization",
                temas: [
                    "React.memo y memoization",
                    "Code splitting con Suspense",
                    "Virtual scrolling",
                    "Bundle optimization"
                ],
            },

        ],
        recursos: [
            {nombre: "React ", url: "https://react.dev/learn"},


        ],
        imagen: "/re-h.webp"
    },
    "semana-9-desarrollo-backend-spring": {
        id: 9,
        titulo: "Desarrollo Backend con Java Spring",
        subtitulo: "Spring Core & MVC",
        icono: Server,
        color: "from-green-500 to-teal-500",
        descripcionCompleta: "Esta semana introduce los fundamentos del desarrollo backend utilizando Spring, un framework de Java ampliamente utilizado. Se exploran los conceptos de Spring Core, incluyendo la inyección de dependencias, y Spring MVC para construir aplicaciones web robustas y escalables.",
        contenido: [
            {
                nombre: "Spring Core",
                temas: [
                    "Inyección de dependencias",
                    "Configuración de beans",
                    "Ciclo de vida de los componentes",
                    "Anotaciones de Spring",
                ],
            },
            {
                nombre: "Spring MVC",
                temas: [
                    "Controladores REST",
                    "Mapeo de solicitudes HTTP",
                    "Manejo de formularios",
                    "Validación de datos",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Spring Documentation",
                url: "https://docs.spring.io/spring-framework/docs/current/reference/html/",
            },
            {
                nombre: "Baeldung Spring Tutorials",
                url: "https://www.baeldung.com/spring-tutorial",
            },
        ],
        imagen: "/spring.png",
    },
    "semana-10-autenticacion-spring-boot": {
        id: 10,
        titulo: "Autenticación con Java Spring Boot",
        subtitulo: "Spring Security & JWT",
        icono: Shield,
        color: "from-blue-500 to-indigo-500",
        descripcionCompleta: "Esta semana se centra en la implementación de autenticación y autorización en aplicaciones Spring Boot utilizando Spring Security y JSON Web Tokens (JWT). Aprenderás a securizar endpoints y manejar sesiones de usuario de manera eficiente.",
        contenido: [
            {
                nombre: "Spring Security",
                temas: [
                    "Configuración de seguridad",
                    "Autenticación basada en roles",
                    "Protección CSRF",
                    "Manejo de sesiones",
                ],
            },
            {
                nombre: "JWT",
                temas: [
                    "Generación de tokens",
                    "Validación de tokens",
                    "Integración con Spring Security",
                    "Autenticación sin estado",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Spring Security Documentation",
                url: "https://docs.spring.io/spring-security/site/docs/current/reference/html5/",
            },
            {
                nombre: "JWT Official Site",
                url: "https://jwt.io/introduction",
            },
        ],
        imagen: "/spring-security.png",
    },
    "semana-11-jsp-jakarta-spring": {
        id: 11,
        titulo: "JSP con Jakarta y Spring",
        subtitulo: "Java Server Pages & Jakarta EE",
        icono: Code,
        color: "from-purple-500 to-pink-500",
        descripcionCompleta: "Explora el desarrollo de aplicaciones web dinámicas utilizando Java Server Pages (JSP) y Jakarta EE, integrados con Spring. Esta semana cubre cómo crear interfaces de usuario dinámicas y conectarlas con lógica de backend.",
        contenido: [
            {
                nombre: "JSP",
                temas: [
                    "Sintaxis de JSP",
                    "Directivas y acciones",
                    "JSTL (JavaServer Pages Standard Tag Library)",
                    "Integración con Spring MVC",
                ],
            },
            {
                nombre: "Jakarta EE",
                temas: [
                    "Servlets",
                    "Configuración de aplicaciones web",
                    "Manejo de sesiones",
                    "Despliegue en servidores Jakarta",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Jakarta EE Documentation",
                url: "https://jakarta.ee/specifications/",
            },
            {
                nombre: "Oracle JSP Tutorial",
                url: "https://docs.oracle.com/javaee/7/tutorial/java-server-pages.htm",
            },
        ],
        imagen: "/jsp.png",
    },
    "semana-12-desarrollo-web-laravel": {
        id: 12,
        titulo: "Desarrollo Web con PHP y Laravel",
        subtitulo: "PHP & Laravel Fundamentals",
        icono: Globe,
        color: "from-red-500 to-orange-500",
        descripcionCompleta: "Esta semana introduce el desarrollo web con PHP y el framework Laravel, destacando su facilidad para construir aplicaciones modernas con una arquitectura limpia y elegante.",
        contenido: [
            {
                nombre: "PHP",
                temas: [
                    "Sintaxis básica",
                    "Manejo de formularios",
                    "Conexión con bases de datos",
                    "Seguridad básica",
                ],
            },
            {
                nombre: "Laravel",
                temas: [
                    "Estructura de la aplicación",
                    "Rutas y controladores",
                    "Blade templating",
                    "Migraciones de base de datos",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Laravel Documentation",
                url: "https://laravel.com/docs",
            },
            {
                nombre: "PHP Official Documentation",
                url: "https://www.php.net/docs.php",
            },
        ],
        imagen: "/laravel.webp",
    },
    "semana-13-laravel-intermedio": {
        id: 13,
        titulo: "Laravel Intermedio: Eloquent, Middleware y API REST",
        subtitulo: "Avanzando en Laravel",
        icono: Database,
        color: "from-orange-500 to-yellow-500",
        descripcionCompleta: "Profundiza en Laravel con Eloquent ORM para manejar bases de datos, middleware para control de acceso y la creación de APIs RESTful para aplicaciones modernas.",
        contenido: [
            {
                nombre: "Eloquent ORM",
                temas: [
                    "Modelos y relaciones",
                    "Consultas avanzadas",
                    "Mutadores y accesores",
                    "Scopes",
                ],
            },
            {
                nombre: "Middleware y API REST",
                temas: [
                    "Creación de middleware",
                    "Autenticación en APIs",
                    "Rutas API",
                    "Respuestas JSON",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Laravel Eloquent Documentation",
                url: "https://laravel.com/docs/eloquent",
            },
            {
                nombre: "Laravel API Documentation",
                url: "https://laravel.com/docs/api-authentication",
            },
        ],
        imagen: "/laravel-rest.webp",
    },
    "semana-14-backend-python": {
        id: 14,
        titulo: "Backend con Python: Django, Flask, y FastAPI",
        subtitulo: "Frameworks Python para Backend",
        icono: Code,
        color: "from-blue-600 to-cyan-600",
        descripcionCompleta: "Explora los frameworks de Python más populares para desarrollo backend: Django, Flask y FastAPI, cada uno con sus fortalezas para diferentes casos de uso.",
        contenido: [
            {
                nombre: "Django",
                temas: [
                    "Modelos y ORM",
                    "Vistas y URLs",
                    "Admin interface",
                    "Django REST Framework",
                ],
            },
            {
                nombre: "Flask y FastAPI",
                temas: [
                    "Rutas en Flask",
                    "FastAPI y tipado",
                    "Documentación automática",
                    "Manejo de solicitudes asíncronas",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Django Documentation",
                url: "https://docs.djangoproject.com/",
            },
            {
                nombre: "FastAPI Documentation",
                url: "https://fastapi.tiangolo.com/",
            },
            {
                nombre: "Flask Documentation",
                url: "https://flask.palletsprojects.com/",
            },
        ],
        imagen: "/python.png",
    },
    "semana-15-flask-introduccion": {
        id: 15,
        titulo: "Flask: Introducción, Rutas y Plantillas",
        subtitulo: "Fundamentos de Flask",
        icono: Server,
        color: "from-teal-500 to-green-500",
        descripcionCompleta: "Introducción al desarrollo web con Flask, un framework ligero de Python, con enfoque en la creación de rutas, plantillas Jinja2 y aplicaciones web básicas.",
        contenido: [
            {
                nombre: "Flask Basics",
                temas: [
                    "Configuración de la aplicación",
                    "Definición de rutas",
                    "Manejo de solicitudes",
                    "Respuestas dinámicas",
                ],
            },
            {
                nombre: "Jinja2 Templates",
                temas: [
                    "Sintaxis de Jinja2",
                    "Herencia de plantillas",
                    "Filtros y macros",
                    "Integración con Flask",
                ],
            },
        ],
        recursos: [
            {
                nombre: "Flask Documentation",
                url: "https://flask.palletsprojects.com/",
            },
            {
                nombre: "Jinja2 Documentation",
                url: "https://jinja.palletsprojects.com/",
            },
        ],
        imagen: "/flask.webp",
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export default function SemanaPage({params}: PageProps) {
    const {slug} = use(params)
    const semana = semanasData[slug as keyof typeof semanasData]
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

    if (!semana) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Semana no encontrada</h1>
                    <Button asChild>
                        <Link href="/">Volver</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const toggleSection = (index: number) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedSections(newExpanded);
    };

    const renderExamples = () => {
        switch (semana.id) {
            case 1:
                return <Semana1Examples />;
            case 2:
                return <Semana2Examples />;
            case 3:
                return <Semana3Examples />;
            case 4:
                return <Semana4Examples />;
            case 5:
                return <Semana5Examples />;
            case 6:
                return <Semana6Examples />;
            case 7:
                return <Semana7Examples />;
            case 9:
                return <Semana9Examples />;
            case 10:
                return <Semana10Examples />;
            case 11:
                return <Semana11Examples />;
            case 12:
                return <Semana12Examples />;
            case 13:
                return <Semana13Examples />;
            case 14:
                return <Semana14Examples />;
            case 15:
                return <Semana15Examples />;
            default:
                return <div className="text-center text-muted-foreground">Ejemplos en desarrollo...</div>;
        }
    };

    // Helper function to find the previous and next weeks
    const findAdjacentWeeks = (currentId: number) => {
        const weekIds = Semanas.map((s) => s.id).sort((a, b) => a - b);
        const currentIndex = weekIds.indexOf(currentId);
        const prevId = weekIds[currentIndex - 1] || null;
        const nextId = weekIds[currentIndex + 1] || null;
        return { prevId, nextId };
    };

    const { prevId, nextId } = findAdjacentWeeks(semana.id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
            {/* Header */}
            <div className={`bg-gradient-to-br ${semana.color} text-white`}>
                <div className="container px-4 md:px-6 py-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Button variant="secondary" size="sm" asChild className="mb-6">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver
                            </Link>
                        </Button>

                        {/* Grid Layout: Contenido + Imagen */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                                        <semana.icono className="h-12 w-12" />
                                    </div>
                                    <div>
                                        <Badge variant="secondary" className="mb-2">
                                            Semana {semana.id}
                                        </Badge>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{semana.titulo}</h1>
                                <p className="text-xl md:text-2xl opacity-90">{semana.subtitulo}</p>
                                <p className="text-lg opacity-80 leading-relaxed">{semana.descripcionCompleta}</p>
                            </div>

                            {semana.imagen && (
                                <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm">
                                    <Image src={semana.imagen} alt={semana.titulo} fill className="object-cover" priority />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container px-4 md:px-6 py-12">
                <Tabs defaultValue="contenido" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="contenido">Contenido</TabsTrigger>
                        <TabsTrigger value="ejemplos">Ejemplos Prácticos</TabsTrigger>
                        <TabsTrigger value="recursos">Recursos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="contenido" className="space-y-8">
                        <div className="space-y-6">
                            {semana.contenido.map((seccion, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() => toggleSection(index)}
                                            >
                                                <CardTitle className="flex items-center gap-2">
                                                    <Target className="h-5 w-5 text-primary" />
                                                    {seccion.nombre}
                                                </CardTitle>
                                                {expandedSections.has(index) ? (
                                                    <ChevronDown className="h-5 w-5" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5" />
                                                )}
                                            </div>
                                        </CardHeader>
                                        {expandedSections.has(index) && (
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {seccion.temas.map((tema, temaIndex) => (
                                                        <li key={temaIndex} className="flex items-start gap-3">
                                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm">{tema}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="ejemplos" className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5 text-primary" />
                                        Ejemplos Prácticos - Semana {semana.id}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>{renderExamples()}</CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="recursos" className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        Recursos de Aprendizaje
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3">
                                        {semana.recursos?.map((recurso, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={recurso.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline flex-1"
                                                >
                                                    {recurso.nombre}
                                                </a>
                                            </div>
                                        )) || (
                                            <p className="text-center text-muted-foreground">
                                                Recursos en desarrollo para esta semana...
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* Navigation */}
                <motion.div
                    className="mt-12 flex justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {prevId && (
                        <Button variant="outline" asChild>
                            <Link href={`/projects/semana-${prevId}-${getSlugSuffix(prevId)}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Semana Anterior
                            </Link>
                        </Button>
                    )}

                    <Button variant="secondary" asChild className="mx-auto">
                        <Link href="/#projects">Ver Todas las Semanas</Link>
                    </Button>

                    {nextId && (
                        <Button asChild>
                            <Link href={`/projects/semana-${nextId}-${getSlugSuffix(nextId)}`}>
                                Siguiente Semana
                                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                            </Link>
                        </Button>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

function getSlugSuffix(semanaId: number): string {
    const suffixes: Record<number, string> = {
        1: "silabo",
        2: "html-emmet",
        3: "css-basico-avanzado",
        4: "tailwind-bootstrap",
        5: "javascript-typescript",
        6: "principios-react",
        7: "componentes-hooks",
        9: "desarrollo-backend-spring",
        10: "autenticacion-spring-boot",
        11: "jsp-jakarta-spring",
        12: "desarrollo-web-laravel",
        13: "laravel-intermedio",
        14: "backend-python",
        15: "flask-introduccion",
    };
    return suffixes[semanaId] || "";
}