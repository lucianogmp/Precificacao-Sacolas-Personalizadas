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
    <main className="container mx-auto max-w-7xl px-4 py-10">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-col items-center text-center animate-slide-up">
        <div className="mb-5 flex items-center gap-4">
          {/* Icon with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl animate-pulse-soft" />
            <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 p-3.5">
              <Package className="h-10 w-10 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text-animated">
            Precificador de Sacolas
          </h1>
        </div>
        <p className="max-w-xl text-lg text-gray-400 font-light">
          Cálculo de preço baseado nos mesmos campos da planilha de custos e
          produção.
        </p>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <Tabs defaultValue="calculadora" className="w-full">
        <TabsList className="mx-auto mb-8 grid w-full max-w-lg grid-cols-2">
          <TabsTrigger
            value="calculadora"
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Preço final
          </TabsTrigger>
          <TabsTrigger
            value="configuracoes"
            className="flex items-center gap-2"
          >
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
