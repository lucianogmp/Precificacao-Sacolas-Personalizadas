'use client';

import { useState } from 'react';
import { CalculadoraSacolas } from '@/components/CalculadoraSacolas';
import { TabsConfiguracao } from '@/components/TabsConfiguracao';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Settings, TrendingUp } from 'lucide-react';

export default function Home() {
  const [config, setConfig] = useState({
    custoHora: 10.69,
    depreciacaoHora: 1.65, // média aproximada
    margem: 50,
  });

  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-12 h-12 text-emerald-600" />
          <h1 className="text-4xl font-bold text-gray-900">
            Precificador de Sacolas
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl">
          Calcule o preço ideal das suas sacolas personalizadas com transparência e inteligência
        </p>
      </div>

      <Tabs defaultValue="calculadora" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="calculadora" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Calculadora
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculadora">
          <CalculadoraSacolas config={config} />
        </TabsContent>

        <TabsContent value="configuracoes">
          <TabsConfiguracao config={config} setConfig={setConfig} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
