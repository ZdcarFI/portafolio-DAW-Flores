"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Target, ExternalLink, Cpu, Play, Zap, TestTube} from "lucide-react"
import {ejemplo_7} from "@/data/semanas"

export function Semana7Examples() {
    const [selectedExample, setSelectedExample] = useState<number | null>(null)

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                {ejemplo_7.map((ejemplo) => (
                    <Card
                        key={ejemplo.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedExample === ejemplo.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedExample(selectedExample === ejemplo.id ? null : ejemplo.id)}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        {ejemplo.id === 1 && <Zap className="h-5 w-5 text-yellow-500"/>}
                                        {ejemplo.id === 2 && <Play className="h-5 w-5 text-blue-500"/>}
                                        {ejemplo.id === 3 && <Cpu className="h-5 w-5 text-green-500"/>}
                                        {ejemplo.id === 4 && <TestTube className="h-5 w-5 text-purple-500"/>}
                                        {ejemplo.titulo}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">{ejemplo.descripcion}</p>
                                </div>

                            </div>

                        </CardHeader>
                    </Card>
                ))}
            </div>

            {selectedExample && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary"/>
                            {ejemplo_7.find((e) => e.id === selectedExample)?.titulo}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="objetivo" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="objetivo">Objetivo</TabsTrigger>
                                <TabsTrigger value="codigo">Código</TabsTrigger>

                            </TabsList>

                            <TabsContent value="objetivo" className="mt-4">
                                <div className="prose prose-sm max-w-none">
                                    <p>{ejemplo_7.find((e) => e.id === selectedExample)?.objetivo}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="codigo" className="mt-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{ejemplo_7.find((e) => e.id === selectedExample)?.codigo}</code>
                </pre>
                            </TabsContent>


                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
