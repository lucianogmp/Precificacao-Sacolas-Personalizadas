'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw } from 'lucide-react';

interface Props {
  config: { custoHora: number; depreciacaoHora: number; margem: number };
  setConfig: (config: any) => void;
}

export function TabsConfiguracao({ config, setConfig }: Props) {
  const [localConfig, setLocalConfig] = useState(config);

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sacolasConfig');
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalConfig(parsed);
      setConfig(parsed);
    }
  }, []);

  const handleSave = () => {
    setConfig(localConfig);
    localStorage.setItem('sacolasConfig', JSON.stringify(localConfig));
    alert('✅ Configurações salvas com sucesso!');
  };

  const resetToDefault = () => {
    const defaultConfig = {
      custoHora: 10.69,
      depreciacaoHora: 1.65,
      margem: 50,
    };
    setLocalConfig(defaultConfig);
    setConfig(defaultConfig);
    localStorage.setItem('sacolasConfig', JSON.stringify(defaultConfig));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Custos Operacionais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Custo por Hora (Mão de Obra + Fixos)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Input
                type="number"
                step="0.01"
                value={localConfig.custoHora}
                onChange={(e) => setLocalConfig({ ...localConfig, custoHora: parseFloat(e.target.value) })}
              />
              <span className="text-sm text-gray-500">R$/hora</span>
            </div>
            <Slider
              value={[localConfig.custoHora]}
              onValueChange={([val]) => setLocalConfig({ ...localConfig, custoHora: val })}
              max={30}
              min={5}
              step={0.1}
              className="mt-3"
            />
          </div>

          <div>
            <Label>Depreciação por Hora (Equipamentos)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Input
                type="number"
                step="0.01"
                value={localConfig.depreciacaoHora}
                onChange={(e) => setLocalConfig({ ...localConfig, depreciacaoHora: parseFloat(e.target.value) })}
              />
              <span className="text-sm text-gray-500">R$/hora</span>
            </div>
            <Slider
              value={[localConfig.depreciacaoHora]}
              onValueChange={([val]) => setLocalConfig({ ...localConfig, depreciacaoHora: val })}
              max={5}
              min={0.5}
              step={0.01}
              className="mt-3"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Margem de Lucro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Margem Desejada: <span className="font-bold text-emerald-600">{localConfig.margem}%</span></Label>
            <Slider
              value={[localConfig.margem]}
              onValueChange={([val]) => setLocalConfig({ ...localConfig, margem: val })}
              max={100}
              min={20}
              step={1}
              className="mt-3"
            />
          </div>

          <div className="pt-4 border-t">
            <Button onClick={handleSave} className="w-full mb-3">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
            <Button onClick={resetToDefault} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Restaurar Padrão
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
