'use client';

import { useState } from 'react';
import { Package, Settings, TrendingUp } from 'lucide-react';
import { CalculadoraSacolas } from '@/components/CalculadoraSacolas';
import { TabsConfiguracao } from '@/components/TabsConfiguracao';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { configPadrao } from '@/lib/calculos';
import { ConfiguracaoPrecificacao } from '@/lib/types';

export default function Home() {
  const [config, setConfig] = useState<ConfiguracaoPrecificacao>(configPadrao);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex items-center gap-3">
          <Package className="h-12 w-12 text-emerald-600" />
          <h1 className="text-4xl font-bold text-gray-900">Precificador de Sacolas</h1>
        </div>
        <p className="max-w-2xl text-xl text-gray-600">
          Calculo de preco baseado nos mesmos campos da planilha de custos e producao.
        </p>
      </div>

      <Tabs defaultValue="calculadora" className="w-full">
        <TabsList className="mx-auto mb-8 grid w-full max-w-lg grid-cols-2">
          <TabsTrigger value="calculadora" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Preco final
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Dados da planilha
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
