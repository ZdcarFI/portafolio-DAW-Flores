"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Target} from "lucide-react"
import {ejemplo_3} from "@/data/semanas"

export function Semana3Examples() {
    const [selectedExample, setSelectedExample] = useState<number | null>(null)

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                {ejemplo_3.map((ejemplo) => (
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
                                    <CardTitle className="text-lg">{ejemplo.titulo}</CardTitle>
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
                            {ejemplo_3.find((e) => e.id === selectedExample)?.titulo}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="reflexion" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="reflexion">Reflexion</TabsTrigger>
                                <TabsTrigger value="codigo">Código</TabsTrigger>
                            </TabsList>

                            <TabsContent value="reflexion" className="mt-4">
                                <div className="prose prose-sm max-w-none">
                                    <p>{ejemplo_3.find((e) => e.id === selectedExample)?.reflexion}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="codigo" className="mt-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{ejemplo_3.find((e) => e.id === selectedExample)?.codigo}</code>
                </pre>
                            </TabsContent>


                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
