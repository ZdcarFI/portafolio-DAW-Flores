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
    Play,
} from "lucide-react"
import Link from "next/link"
import {Semana1Examples} from "@/components/semana1";
import {Semana2Examples} from "@/components/semana2";
import {Semana3Examples} from "@/components/semana3";
import {Semana4Examples} from "@/components/semana4";
import {Semana5Examples} from "@/components/semana5";
import {Semana6Examples} from "@/components/semana6";
import {Semana7Examples} from "@/components/semana7";

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
}

const semanasData: Record<string, SemanaData> = {
    "semana-1-silabo": {
        id: 1,
        titulo: "Fundamentos y Sílabo",
        subtitulo: "Introducción al Desarrollo Web",
        icono: FileText,
        color: "from-blue-500 to-cyan-500",
        descripcionCompleta:
            "Esta primera semana establece las bases fundamentales para todo el viaje de aprendizaje. Nos enfocamos en entender la metodología, establecer objetivos claros y crear un plan de estudio estructurado que nos guiará durante las próximas 6 semanas.",
        contenido: [
            {
                nombre: "Historia y Evolución de la Web",
                temas: [
                    "Evolución desde HTML estático hasta aplicaciones web modernas",
                    "Diferencias entre sitios web estáticos y dinámicos",
                    "Arquitecturas web: Monolíticas vs Microservicios",
                    "Tendencias actuales: JAMstack, Serverless, Edge Computing",
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
            {
                nombre: "Metodología de Aprendizaje",
                temas: [
                    "Técnicas de aprendizaje efectivo",
                    "Establecimiento de objetivos SMART",
                    "Recursos de aprendizaje y comunidades",
                    "Creación de plan de estudio personalizado",
                ],
            },
        ],
        recursos: [
            {nombre: "MDN Web Docs", url: "https://developer.mozilla.org"},
            {nombre: "W3C Standards", url: "https://www.w3.org"},
            {nombre: "Can I Use", url: "https://caniuse.com"},
        ]
    },

    "semana-2-html-emmet": {
        id: 2,
        titulo: "HTML & Emmet",
        subtitulo: "Estructura y Productividad",
        icono: Code,
        color: "from-orange-500 to-red-500",
        descripcionCompleta:
            "Dominio completo de HTML5 semántico y técnicas avanzadas de Emmet para maximizar la productividad en el desarrollo.",
        contenido: [
            {
                nombre: "HTML5 Fundamentals",
                temas: [
                    "Anatomía de un documento HTML5",
                    "Elementos semánticos: header, nav, main, section, article",
                    "Meta tags esenciales y SEO básico",
                    "Validación HTML con W3C Validator",
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
                    "Workflow optimization",
                ],
            },
            {
                nombre: "Accesibilidad y SEO",
                temas: [
                    "Principios WCAG 2.1",
                    "ARIA roles y properties",
                    "SEO técnico con HTML",
                    "Open Graph y Twitter Cards"
                ],
            },
        ],
        recursos: [
            {nombre: "HTML5 Semantic Elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"},
            {nombre: "HTML5 Validator", url: "https://validator.w3.org"},
            {nombre: "Semantic HTML Guide", url: "https://web.dev/semantic-html/"},
            {nombre: "ARIA Landmarks", url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"},
            {nombre: "HTML5 Form Elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"},
            {nombre: "Form Validation", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation"},
            {nombre: "Accessible Forms", url: "https://webaim.org/techniques/forms/"},
            {nombre: "Input Types Reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"},
            {nombre: "Emmet Documentation", url: "https://docs.emmet.io"},
            {nombre: "Emmet Cheat Sheet", url: "https://docs.emmet.io/cheat-sheet/"},
            {nombre: "VS Code Emmet", url: "https://code.visualstudio.com/docs/editor/emmet"},
            {nombre: "Emmet Interactive Demo", url: "https://emmet.io"},
        ],
    },

    "semana-3-css-avanzado": {
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
            {
                nombre: "Metodologías y Optimización",
                temas: [
                    "BEM, SMACSS, ITCSS",
                    "CSS-in-JS considerations",
                    "Performance optimization",
                    "Critical CSS y purging"
                ],
            },
        ],
        recursos: [
            {nombre: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/"},
            {nombre: "Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"},
            {nombre: "CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations"},
        ]
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
        ]
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
            {nombre: "You Don't Know JS", url: "https://github.com/getify/You-Dont-Know-JS"},
        ]
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
                nombre: "Vue.js Ecosystem",
                temas: [
                    "Template syntax y directivas",
                    "Composition API",
                    "Vue Router y Pinia",
                    "Single File Components"
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
        ]
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
                nombre: "Advanced Hooks",
                temas: [
                    "useReducer y state complejo",
                    "useCallback y useMemo",
                    "useRef y DOM manipulation",
                    "Custom hooks creation",
                ],
            },
            {
                nombre: "Component Patterns",
                temas: [
                    "Higher-Order Components",
                    "Render Props pattern",
                    "Compound Components",
                    "Context API y providers"
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
            {
                nombre: "Testing y Architecture",
                temas: [
                    "React Testing Library",
                    "Custom hooks testing",
                    "Component architecture",
                    "Error boundaries"
                ],
            },
        ],
        recursos: [
            {nombre: "React Advanced Patterns", url: "https://react.dev/learn"},
            {nombre: "React Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/"},
            {nombre: "React Performance", url: "https://react.dev/learn/render-and-commit"},
        ]
    },
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
                        <Link href="/">Volver al inicio</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const toggleSection = (index: number) => {
        const newExpanded = new Set(expandedSections)
        if (newExpanded.has(index)) {
            newExpanded.delete(index)
        } else {
            newExpanded.add(index)
        }
        setExpandedSections(newExpanded)
    }

    const renderExamples = () => {
        switch (semana.id) {
            case 1:
                return <Semana1Examples/>
            case 2:
                return <Semana2Examples/>
            case 3:
                return <Semana3Examples/>
            case 4:
                return <Semana4Examples/>
            case 5:
                return <Semana5Examples/>
             case 6:
                 return <Semana6Examples />
             case 7:
                 return <Semana7Examples />
            default:
                return <div className="text-center text-muted-foreground">Ejemplos en desarrollo...</div>
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
            {/* Header */}
            <div className={`bg-gradient-to-br ${semana.color} text-white`}>
                <div className="container px-4 md:px-6 py-12">
                    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
                        <Button variant="secondary" size="sm" asChild className="mb-6">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4"/>
                                Volver al Curso
                            </Link>
                        </Button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm">
                                <semana.icono className="h-12 w-12"/>
                            </div>
                            <div>
                                <Badge variant="secondary" className="mb-2">
                                    Semana {semana.id}
                                </Badge>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{semana.titulo}</h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-6">{semana.subtitulo}</p>
                        <p className="text-lg opacity-80 max-w-4xl leading-relaxed">{semana.descripcionCompleta}</p>
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
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                >
                                    <Card>
                                        <CardHeader>
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() => toggleSection(index)}
                                            >
                                                <CardTitle className="flex items-center gap-2">
                                                    <Target className="h-5 w-5 text-primary"/>
                                                    {seccion.nombre}
                                                </CardTitle>
                                                {expandedSections.has(index) ? (
                                                    <ChevronDown className="h-5 w-5"/>
                                                ) : (
                                                    <ChevronRight className="h-5 w-5"/>
                                                )}
                                            </div>
                                        </CardHeader>
                                        {expandedSections.has(index) && (
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {seccion.temas.map((tema, temaIndex) => (
                                                        <li key={temaIndex} className="flex items-start gap-3">
                                                            <CheckCircle
                                                                className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0"/>
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
                        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6}}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5 text-primary"/>
                                        Ejemplos Prácticos - Semana {semana.id}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>{renderExamples()}</CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="recursos" className="space-y-8">
                        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6}}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary"/>
                                        Recursos de Aprendizaje
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3">
                                        {semana.recursos?.map((recurso, index) => (
                                            <div key={index}
                                                 className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                                <ExternalLink className="h-4 w-4 text-muted-foreground"/>
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
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.5}}
                >
                    {semana.id > 1 && (
                        <Button variant="outline" asChild>
                            <Link href={`/projects/semana-${semana.id - 1}-${getSlugSuffix(semana.id - 1)}`}>
                                <ArrowLeft className="mr-2 h-4 w-4"/>
                                Semana Anterior
                            </Link>
                        </Button>
                    )}

                    <Button variant="secondary" asChild className="mx-auto">
                        <Link href="/">Ver Todas las Semanas</Link>
                    </Button>

                    {semana.id < 7 && (
                        <Button asChild>
                            <Link href={`/projects/semana-${semana.id + 1}-${getSlugSuffix(semana.id + 1)}`}>
                                Siguiente Semana
                                <ArrowLeft className="ml-2 h-4 w-4 rotate-180"/>
                            </Link>
                        </Button>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

function getSlugSuffix(semanaId: number): string {
    const suffixes: Record<number, string> = {
        1: "silabo",
        2: "html-emmet",
        3: "css-avanzado",
        4: "tailwind-bootstrap",
        5: "javascript-typescript",
        6: "principios-react",
        7: "componentes-hooks",
    }
    return suffixes[semanaId] || ""
}