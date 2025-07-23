"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Database, ShieldCheck } from "lucide-react"
import { ejemplo_13 } from "@/data/semanas"

export function Semana13Examples() {
    const [selectedExample, setSelectedExample] = useState<number | null>(null)

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                {ejemplo_13.map((ejemplo) => (
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
                                        {ejemplo.id === 1 && <Database className="h-5 w-5 text-orange-500" />}
                                        {ejemplo.id === 2 && <ShieldCheck className="h-5 w-5 text-yellow-500" />}
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
                            <Target className="h-5 w-5 text-primary" />
                            {ejemplo_13.find((e) => e.id === selectedExample)?.titulo}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="reflexion" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="reflexion">Reflexión</TabsTrigger>
                                <TabsTrigger value="codigo">Código</TabsTrigger>
                            </TabsList>

                            <TabsContent value="reflexion" className="mt-4">
                                <div className="prose prose-sm max-w-none">
                                    <p>{ejemplo_13.find((e) => e.id === selectedExample)?.reflexion}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="codigo" className="mt-4">
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                    <code>{ejemplo_13.find((e) => e.id === selectedExample)?.codigo}</code>
                                </pre>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}