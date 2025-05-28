"use client"

import {useState, useEffect} from "react"
import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiExpress,
    SiNestjs,
    SiPhp,
    SiBootstrap,
    SiTailwindcss,
    SiGithub,
    SiDocker,
    SiPostgresql,
    SiMysql,
} from "react-icons/si"

const skills = [
    // Frontend
    {name: "HTML", icon: SiHtml5, color: "#E34F26", category: "frontend", level: 95},
    {name: "CSS", icon: SiCss3, color: "#1572B6", category: "frontend", level: 90},
    {name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend", level: 85},
    {name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend", level: 70},
    {name: "React", icon: SiReact, color: "#61DAFB", category: "frontend", level: 80},
    {name: "Next.js", icon: SiNextdotjs, color: "#000000", category: "frontend", level: 77},
    {name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "frontend", level: 60},
    {name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend", level: 80},

    // Backend
    {name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "backend", level: 80},
    {name: "Express", icon: SiExpress, color: "#000000", category: "backend", level: 70},
    {name: "NestJS", icon: SiNestjs, color: "#E0234E", category: "backend", level: 75},
    {name: "PHP", icon: SiPhp, color: "#777BB4", category: "backend", level: 65},

    // Tools & Databases
    {name: "GitHub", icon: SiGithub, color: "#181717", category: "tool", level: 85},
    {name: "Docker", icon: SiDocker, color: "#2496ED", category: "tool", level: 70},
    {name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "database", level: 75},
    {name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database", level: 70},
]

export default function SkillsSection() {
    const [progressValues, setProgressValues] = useState<number[]>(skills.map(() => 0))
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
            setProgressValues(skills.map(skill => skill.level))
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    const frontendSkills = skills.filter(skill => skill.category === "frontend")
    const backendSkills = skills.filter(skill => skill.category === "backend")
    const toolsAndDatabases = skills.filter(skill => skill.category === "tool" || skill.category === "database")

    return (
        <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold  mb-4">
                    Mis Habilidades
                </h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Tecnologías y herramientas con las que trabajo día a día
                </p>
            </div>

            <div className="space-y-12 lg:space-y-16">
                {/* Frontend Skills */}
                <div className="animate-fade-in-up">
                    <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left ">
                        Frontend
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {frontendSkills.map((skill, index) => (
                            <SkillItem
                                key={skill.name}
                                skill={skill}
                                progress={isVisible ? progressValues[skills.indexOf(skill)] : 0}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>

                {/* Backend Skills */}
                <div className="animate-fade-in-up">
                    <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left ">
                        Backend
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {backendSkills.map((skill, index) => (
                            <SkillItem
                                key={skill.name}
                                skill={skill}
                                progress={isVisible ? progressValues[skills.indexOf(skill)] : 0}
                                delay={(frontendSkills.length + index) * 100}
                            />
                        ))}
                    </div>
                </div>

                {/* Tools & Databases */}
                <div className="animate-fade-in-up">
                    <h2 className="text-primary text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left ">
                        Herramientas y Bases de Datos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {toolsAndDatabases.map((skill, index) => (
                            <SkillItem
                                key={skill.name}
                                skill={skill}
                                progress={isVisible ? progressValues[skills.indexOf(skill)] : 0}
                                delay={(frontendSkills.length + backendSkills.length + index) * 100}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function SkillItem({skill, progress, delay}: {
    skill: typeof skills[0],
    progress: number,
    delay: number
}) {
    const Icon = skill.icon
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative p-4 sm:p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105      cursor-pointer"
            style={{
                animationDelay: `${delay}ms`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                style={{
                    backgroundColor: skill.color,
                }}
            />

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                    <div
                        className={`p-3 rounded-xl transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}
                        style={{
                            backgroundColor: `${skill.color}15`,
                            color: skill.color,
                            boxShadow: isHovered ? `0 8px 25px ${skill.color}30` : 'none'
                        }}
                    >
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8"/>
                    </div>
                    <div className="flex-1 text-center sm:text-left min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="font-semibold text-sm sm:text-base truncate">
                                {skill.name}
                            </span>
                            <span
                                className={`text-xs sm:text-sm font-bold transition-all duration-300 ${
                                    isHovered ? 'scale-110' : ''
                                }`}
                                style={{color: skill.color}}
                            >
                                {progress}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2.5 sm:h-3 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: skill.color,
                            boxShadow: isHovered ? `0 0 10px ${skill.color}80` : 'none'
                        }}
                    >
                        {/* Animated shine effect */}
                        <div
                            className={`absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 transition-transform duration-700 ${
                                isHovered ? 'translate-x-full' : '-translate-x-full'
                            }`}
                        />
                    </div>
                </div>


            </div>
        </div>
    )
}