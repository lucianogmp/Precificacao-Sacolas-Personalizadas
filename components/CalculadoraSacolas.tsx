'use client';

import { useMemo } from 'react';
import {
  Clock,
  DollarSign,
  TrendingUp,
  Wallet,
  Gauge,
  BarChart3,
} from 'lucide-react';
import { calcularTodas, custoFixoHora } from '@/lib/calculos';
import { ConfiguracaoPrecificacao, ResultadoSacola } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Props {
  config: ConfiguracaoPrecificacao;
}

const moeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const numero = (valor: number, casas = 2) =>
  valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });

/* ── Stat Card ──────────────────────────────────────────────── */

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: string;
}

function StatCard({
  title,
  value,
  icon,
  gradient,
  delay = '0ms',
}: StatCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] p-5 transition-all duration-500 hover:border-white/10 hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: delay }}
    >
      {/* Background gradient tint */}
      <div
        className={`absolute inset-0 opacity-[0.07] bg-gradient-to-br ${gradient}`}
      />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">{title}</span>
          <div
            className={`rounded-lg bg-gradient-to-br ${gradient} p-2 text-white shadow-lg`}
          >
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-100">{value}</div>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export function CalculadoraSacolas({ config }: Props) {
  const resultados = useMemo(() => calcularTodas(config), [config]);
  const custoHora = useMemo(() => custoFixoHora(config), [config]);

  return (
    <div className="grid gap-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Custo fixo por hora"
          value={moeda(custoHora)}
          icon={<Clock className="h-5 w-5" />}
          gradient="from-blue-500 to-cyan-500"
          delay="0ms"
        />
        <StatCard
          title="Menor preço sugerido"
          value={moeda(
            Math.min(...resultados.map((item) => item.precoSugerido))
          )}
          icon={<DollarSign className="h-5 w-5" />}
          gradient="from-emerald-500 to-teal-500"
          delay="100ms"
        />
        <StatCard
          title="Maior lucro por hora"
          value={moeda(
            Math.max(...resultados.map((item) => item.lucroPorHora))
          )}
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-violet-500 to-purple-500"
          delay="200ms"
        />
      </div>

      {/* Composição do custo */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-emerald-400" />
            <CardTitle>Composição do custo por sacola</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Alça</TableHead>
                <TableHead>Tinta</TableHead>
                <TableHead>Cola/outros</TableHead>
                <TableHead>Mão de obra</TableHead>
                <TableHead>Equipamentos</TableHead>
                <TableHead>Custo total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola: ResultadoSacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-semibold text-gray-100">
                    Sacola {sacola.tamanho}
                  </TableCell>
                  <TableCell>{moeda(sacola.custoPapel)}</TableCell>
                  <TableCell>{moeda(sacola.custoAlca)}</TableCell>
                  <TableCell>{moeda(sacola.custoTinta)}</TableCell>
                  <TableCell>{moeda(sacola.custoColaOutros)}</TableCell>
                  <TableCell>{moeda(sacola.custoMO)}</TableCell>
                  <TableCell>{moeda(sacola.custoEquipamentos)}</TableCell>
                  <TableCell className="font-semibold text-emerald-400">
                    {moeda(sacola.custoTotal)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Margem e preço */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <CardTitle>Margem e preço sugerido</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Custo total</TableHead>
                <TableHead>Margem</TableHead>
                <TableHead>Lucro</TableHead>
                <TableHead>Preço venda</TableHead>
                <TableHead>Preço mínimo</TableHead>
                <TableHead>Markup</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-semibold text-gray-100">
                    Sacola {sacola.tamanho}
                  </TableCell>
                  <TableCell>{moeda(sacola.custoTotal)}</TableCell>
                  <TableCell>{numero(sacola.margem, 0)}%</TableCell>
                  <TableCell>{moeda(sacola.lucro)}</TableCell>
                  <TableCell className="font-semibold text-emerald-400">
                    {moeda(sacola.precoSugerido)}
                  </TableCell>
                  <TableCell>{moeda(sacola.precoMinimo)}</TableCell>
                  <TableCell>{numero(sacola.markup)}%</TableCell>
                  <TableCell>
                    <Badge variant="success">Sugerido</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Produção por hora */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-emerald-400" />
            <CardTitle>Resumo de produção por hora</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Tempo/unidade</TableHead>
                <TableHead>Unid./hora</TableHead>
                <TableHead>Custo total</TableHead>
                <TableHead>Preço venda</TableHead>
                <TableHead>Receita/hora</TableHead>
                <TableHead>Lucro/hora</TableHead>
                <TableHead>Rentabilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-semibold text-gray-100">
                    Sacola {sacola.tamanho}
                  </TableCell>
                  <TableCell>{numero(sacola.tempoTotalMin)} min</TableCell>
                  <TableCell>{numero(sacola.unidadesPorHora)}</TableCell>
                  <TableCell>{moeda(sacola.custoTotal)}</TableCell>
                  <TableCell>{moeda(sacola.precoSugerido)}</TableCell>
                  <TableCell>{moeda(sacola.receitaPorHora)}</TableCell>
                  <TableCell className="font-semibold text-emerald-400">
                    {moeda(sacola.lucroPorHora)}
                  </TableCell>
                  <TableCell>{numero(sacola.rentabilidade)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
