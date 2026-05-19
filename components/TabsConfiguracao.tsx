'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import { configPadrao, depreciacaoHora, tamanhosSacolas } from '@/lib/calculos';
import { ConfiguracaoPrecificacao, TamanhoSacola } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  config: ConfiguracaoPrecificacao;
  setConfig: (config: ConfiguracaoPrecificacao) => void;
}

type EquipamentoKey = keyof ConfiguracaoPrecificacao['equipamentos'];
type TintaKey = keyof ConfiguracaoPrecificacao['tintas'];
type PapelKey = keyof ConfiguracaoPrecificacao['papeis'];
type AlcaKey = keyof ConfiguracaoPrecificacao['alcas'];
type InsumoKey = keyof ConfiguracaoPrecificacao['insumos'];
type CustoFixoKey = keyof ConfiguracaoPrecificacao['custosFixos'];
type TempoKey = keyof ConfiguracaoPrecificacao['tempos'][TamanhoSacola];

const equipamentoLabels: Record<EquipamentoKey, string> = {
  facaP: 'Faca de Corte - Sacola P',
  facaM: 'Faca de Corte - Sacola M',
  facaG: 'Faca de Corte - Sacola G',
  facaGG: 'Faca de Corte - Sacola GG',
  maquinaCorte: 'Maquina Corte e Vinco',
  impressora: 'Impressora',
};

const papelLabels: Record<PapelKey, string> = {
  offset180: 'Papel Offset 180g',
  offset240: 'Papel Offset 240g',
  kraft200: 'Papel Kraft 200g',
};

const alcaLabels: Record<AlcaKey, string> = {
  nylon: 'Alca Cordao de Nylon',
  cetim: 'Alca Fita de Cetim',
  papelTorcido: 'Alca Papel Torcido',
  vazada: 'Alca Vazada no Proprio Papel',
};

const tintaLabels: Record<TintaKey, string> = {
  preta: 'Tinta Preta',
  colorida: 'Tinta Colorida',
};

const insumoLabels: Record<InsumoKey, string> = {
  cola: 'Cola Branca/PVA',
  fitaDuplaFace: 'Fita Dupla Face',
  ilhos: 'Ilhos (par)',
};

const custoLabels: Record<CustoFixoKey, string> = {
  aluguel: 'Aluguel/Instalacao',
  energia: 'Energia Eletrica',
  maoDeObra: 'Mao de Obra',
  internetTelefone: 'Internet/Telefone',
  outros: 'Outros Custos Fixos',
  horasMes: 'Horas trabalhadas/mes',
};

const moeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const numero = (valor: number) => Number.isFinite(valor) ? valor : 0;

const campoNumero = (
  value: number,
  onChange: (value: number) => void,
  step = '0.01',
  className = 'w-28'
) => (
  <Input
    type="number"
    step={step}
    value={value}
    onChange={(event) => onChange(numero(event.target.valueAsNumber))}
    className={className}
  />
);

function normalizarConfig(value: unknown): ConfiguracaoPrecificacao {
  if (value && typeof value === 'object' && 'equipamentos' in value) {
    return value as ConfiguracaoPrecificacao;
  }
  return configPadrao;
}

export function TabsConfiguracao({ config, setConfig }: Props) {
  const [localConfig, setLocalConfig] = useState<ConfiguracaoPrecificacao>(config);

  useEffect(() => {
    const saved = localStorage.getItem('sacolasConfig');
    if (saved) {
      const parsed = normalizarConfig(JSON.parse(saved));
      setLocalConfig(parsed);
      setConfig(parsed);
    }
  }, [setConfig]);

  const salvar = () => {
    setConfig(localConfig);
    localStorage.setItem('sacolasConfig', JSON.stringify(localConfig));
    alert('Configuracoes salvas com sucesso.');
  };

  const restaurar = () => {
    setLocalConfig(configPadrao);
    setConfig(configPadrao);
    localStorage.setItem('sacolasConfig', JSON.stringify(configPadrao));
  };

  const updateEquipamento = (key: EquipamentoKey, field: 'valorAquisicao' | 'vidaUtilHoras', value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      equipamentos: {
        ...prev.equipamentos,
        [key]: { ...prev.equipamentos[key], [field]: value },
      },
    }));
  };

  const updateTinta = (key: TintaKey, field: keyof ConfiguracaoPrecificacao['tintas'][TintaKey], value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      tintas: { ...prev.tintas, [key]: { ...prev.tintas[key], [field]: value } },
    }));
  };

  const updatePapel = (key: PapelKey, field: 'valorPacote' | 'quantidadeFolhas', value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      papeis: { ...prev.papeis, [key]: { ...prev.papeis[key], [field]: value } },
    }));
  };

  const updateFolhas = (key: PapelKey, tamanho: TamanhoSacola, value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      papeis: {
        ...prev.papeis,
        [key]: {
          ...prev.papeis[key],
          folhasPorSacola: { ...prev.papeis[key].folhasPorSacola, [tamanho]: value },
        },
      },
    }));
  };

  const updateAlca = (key: AlcaKey, field: keyof ConfiguracaoPrecificacao['alcas'][AlcaKey], value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      alcas: { ...prev.alcas, [key]: { ...prev.alcas[key], [field]: value } },
    }));
  };

  const updateInsumo = (key: InsumoKey, field: keyof ConfiguracaoPrecificacao['insumos'][InsumoKey], value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      insumos: { ...prev.insumos, [key]: { ...prev.insumos[key], [field]: value } },
    }));
  };

  const updateCusto = (key: CustoFixoKey, value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      custosFixos: { ...prev.custosFixos, [key]: value },
    }));
  };

  const updateTempo = (tamanho: TamanhoSacola, field: TempoKey, value: number) => {
    setLocalConfig((prev) => ({
      ...prev,
      tempos: { ...prev.tempos, [tamanho]: { ...prev.tempos[tamanho], [field]: value } },
    }));
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button onClick={salvar}>
          <Save className="mr-2 h-4 w-4" />
          Salvar configuracoes
        </Button>
        <Button onClick={restaurar} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Restaurar planilha
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Depreciacao de equipamentos</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Valor de aquisicao</TableHead>
                <TableHead>Vida util (horas)</TableHead>
                <TableHead>Depreciacao/hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(Object.keys(localConfig.equipamentos) as EquipamentoKey[]).map((key) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{equipamentoLabels[key]}</TableCell>
                  <TableCell>{campoNumero(localConfig.equipamentos[key].valorAquisicao, (value) => updateEquipamento(key, 'valorAquisicao', value))}</TableCell>
                  <TableCell>{campoNumero(localConfig.equipamentos[key].vidaUtilHoras, (value) => updateEquipamento(key, 'vidaUtilHoras', value), '1')}</TableCell>
                  <TableCell>{moeda(depreciacaoHora(localConfig.equipamentos[key].valorAquisicao, localConfig.equipamentos[key].vidaUtilHoras))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Tintas, papeis, alcas e insumos</CardTitle></CardHeader>
        <CardContent className="grid gap-8">
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Tintas</h3>
            <Table>
              <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Valor do kit</TableHead><TableHead>Rendimento</TableHead><TableHead>Custo/sacola</TableHead></TableRow></TableHeader>
              <TableBody>
                {(Object.keys(localConfig.tintas) as TintaKey[]).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{tintaLabels[key]}</TableCell>
                    <TableCell>{campoNumero(localConfig.tintas[key].valorKit, (value) => updateTinta(key, 'valorKit', value))}</TableCell>
                    <TableCell>{campoNumero(localConfig.tintas[key].rendimentoSacolas, (value) => updateTinta(key, 'rendimentoSacolas', value), '1')}</TableCell>
                    <TableCell>{moeda(localConfig.tintas[key].rendimentoSacolas > 0 ? localConfig.tintas[key].valorKit / localConfig.tintas[key].rendimentoSacolas : 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Papeis</h3>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Item</TableHead><TableHead>Valor pacote</TableHead><TableHead>Qtd. folhas</TableHead><TableHead>Custo/folha</TableHead><TableHead>P</TableHead><TableHead>M</TableHead><TableHead>G</TableHead><TableHead>GG</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {(Object.keys(localConfig.papeis) as PapelKey[]).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{papelLabels[key]}</TableCell>
                    <TableCell>{campoNumero(localConfig.papeis[key].valorPacote, (value) => updatePapel(key, 'valorPacote', value))}</TableCell>
                    <TableCell>{campoNumero(localConfig.papeis[key].quantidadeFolhas, (value) => updatePapel(key, 'quantidadeFolhas', value), '1')}</TableCell>
                    <TableCell>{moeda(localConfig.papeis[key].quantidadeFolhas > 0 ? localConfig.papeis[key].valorPacote / localConfig.papeis[key].quantidadeFolhas : 0)}</TableCell>
                    {tamanhosSacolas.map((tamanho) => (
                      <TableCell key={tamanho}>{campoNumero(localConfig.papeis[key].folhasPorSacola[tamanho], (value) => updateFolhas(key, tamanho, value), '1', 'w-20')}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Alcas e outros insumos</h3>
            <div className="grid gap-6 lg:grid-cols-2">
              <Table>
                <TableHeader><TableRow><TableHead>Alca</TableHead><TableHead>Custo unit.</TableHead><TableHead>Qtd.</TableHead><TableHead>Total</TableHead></TableRow></TableHeader>
                <TableBody>
                  {(Object.keys(localConfig.alcas) as AlcaKey[]).map((key) => (
                    <TableRow key={key}>
                      <TableCell>{alcaLabels[key]}</TableCell>
                      <TableCell>{campoNumero(localConfig.alcas[key].custoUnitario, (value) => updateAlca(key, 'custoUnitario', value), '0.01', 'w-24')}</TableCell>
                      <TableCell>{campoNumero(localConfig.alcas[key].quantidadePorSacola, (value) => updateAlca(key, 'quantidadePorSacola', value), '1', 'w-20')}</TableCell>
                      <TableCell>{moeda(localConfig.alcas[key].custoUnitario * localConfig.alcas[key].quantidadePorSacola)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Table>
                <TableHeader><TableRow><TableHead>Insumo</TableHead><TableHead>Valor</TableHead><TableHead>Rendimento</TableHead><TableHead>Custo/sacola</TableHead></TableRow></TableHeader>
                <TableBody>
                  {(Object.keys(localConfig.insumos) as InsumoKey[]).map((key) => (
                    <TableRow key={key}>
                      <TableCell>{insumoLabels[key]}</TableCell>
                      <TableCell>{campoNumero(localConfig.insumos[key].valorProduto, (value) => updateInsumo(key, 'valorProduto', value), '0.01', 'w-24')}</TableCell>
                      <TableCell>{campoNumero(localConfig.insumos[key].rendimentoSacolas, (value) => updateInsumo(key, 'rendimentoSacolas', value), '1', 'w-24')}</TableCell>
                      <TableCell>{moeda(localConfig.insumos[key].rendimentoSacolas > 0 ? localConfig.insumos[key].valorProduto / localConfig.insumos[key].rendimentoSacolas : 0)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Custo hora e tempo de producao</CardTitle></CardHeader>
        <CardContent className="grid gap-8">
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Custos operacionais fixos</h3>
            <Table>
              <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Valor</TableHead></TableRow></TableHeader>
              <TableBody>
                {(Object.keys(localConfig.custosFixos) as CustoFixoKey[]).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{custoLabels[key]}</TableCell>
                    <TableCell>{campoNumero(localConfig.custosFixos[key], (value) => updateCusto(key, value), key === 'horasMes' ? '1' : '0.01')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Tempo de producao por sacola</h3>
            <Table>
              <TableHeader><TableRow><TableHead>Tamanho</TableHead><TableHead>Impressao</TableHead><TableHead>Corte/Vinco</TableHead><TableHead>Montagem/Colagem</TableHead><TableHead>Total</TableHead></TableRow></TableHeader>
              <TableBody>
                {tamanhosSacolas.map((tamanho) => {
                  const tempo = localConfig.tempos[tamanho];
                  return (
                    <TableRow key={tamanho}>
                      <TableCell className="font-medium">Sacola {tamanho}</TableCell>
                      <TableCell>{campoNumero(tempo.impressao, (value) => updateTempo(tamanho, 'impressao', value), '1', 'w-20')}</TableCell>
                      <TableCell>{campoNumero(tempo.corteVinco, (value) => updateTempo(tamanho, 'corteVinco', value), '1', 'w-20')}</TableCell>
                      <TableCell>{campoNumero(tempo.montagemColagem, (value) => updateTempo(tamanho, 'montagemColagem', value), '1', 'w-20')}</TableCell>
                      <TableCell>{tempo.impressao + tempo.corteVinco + tempo.montagemColagem} min</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Configuracao por tamanho</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Tamanho</TableHead><TableHead>Papel usado</TableHead><TableHead>Alca usada</TableHead><TableHead>Margem</TableHead></TableRow></TableHeader>
            <TableBody>
              {tamanhosSacolas.map((tamanho) => (
                <TableRow key={tamanho}>
                  <TableCell className="font-medium">Sacola {tamanho}</TableCell>
                  <TableCell>
                    <select
                      className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm"
                      value={localConfig.papelPorTamanho[tamanho]}
                      onChange={(event) => setLocalConfig((prev) => ({ ...prev, papelPorTamanho: { ...prev.papelPorTamanho, [tamanho]: event.target.value as PapelKey } }))}
                    >
                      {(Object.keys(papelLabels) as PapelKey[]).map((key) => <option key={key} value={key}>{papelLabels[key]}</option>)}
                    </select>
                  </TableCell>
                  <TableCell>
                    <select
                      className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm"
                      value={localConfig.alcaPorTamanho[tamanho]}
                      onChange={(event) => setLocalConfig((prev) => ({ ...prev, alcaPorTamanho: { ...prev.alcaPorTamanho, [tamanho]: event.target.value as AlcaKey } }))}
                    >
                      {(Object.keys(alcaLabels) as AlcaKey[]).map((key) => <option key={key} value={key}>{alcaLabels[key]}</option>)}
                    </select>
                  </TableCell>
                  <TableCell>{campoNumero(localConfig.margem[tamanho], (value) => setLocalConfig((prev) => ({ ...prev, margem: { ...prev.margem, [tamanho]: value } })), '1', 'w-24')}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
