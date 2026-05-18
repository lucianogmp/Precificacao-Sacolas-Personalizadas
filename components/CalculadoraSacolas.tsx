'use client';

import { useMemo } from 'react';
import { calcularTodas, custoFixoHora } from '@/lib/calculos';
import { ConfiguracaoPrecificacao, ResultadoSacola } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  config: ConfiguracaoPrecificacao;
}

const moeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const numero = (valor: number, casas = 2) =>
  valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });

export function CalculadoraSacolas({ config }: Props) {
  const resultados = useMemo(() => calcularTodas(config), [config]);
  const custoHora = useMemo(() => custoFixoHora(config), [config]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Custo fixo por hora</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-emerald-700">{moeda(custoHora)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Menor preco sugerido</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-emerald-700">
            {moeda(Math.min(...resultados.map((item) => item.precoSugerido)))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Maior lucro por hora</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-emerald-700">
            {moeda(Math.max(...resultados.map((item) => item.lucroPorHora)))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Composicao do custo por sacola</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Alca</TableHead>
                <TableHead>Tinta</TableHead>
                <TableHead>Cola/outros</TableHead>
                <TableHead>Mao de obra</TableHead>
                <TableHead>Equipamentos</TableHead>
                <TableHead>Custo total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola: ResultadoSacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-bold">Sacola {sacola.tamanho}</TableCell>
                  <TableCell>{moeda(sacola.custoPapel)}</TableCell>
                  <TableCell>{moeda(sacola.custoAlca)}</TableCell>
                  <TableCell>{moeda(sacola.custoTinta)}</TableCell>
                  <TableCell>{moeda(sacola.custoColaOutros)}</TableCell>
                  <TableCell>{moeda(sacola.custoMO)}</TableCell>
                  <TableCell>{moeda(sacola.custoEquipamentos)}</TableCell>
                  <TableCell className="font-semibold">{moeda(sacola.custoTotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Margem e preco sugerido</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Custo total</TableHead>
                <TableHead>Margem</TableHead>
                <TableHead>Lucro</TableHead>
                <TableHead>Preco venda</TableHead>
                <TableHead>Preco minimo</TableHead>
                <TableHead>Markup</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-bold">Sacola {sacola.tamanho}</TableCell>
                  <TableCell>{moeda(sacola.custoTotal)}</TableCell>
                  <TableCell>{numero(sacola.margem, 0)}%</TableCell>
                  <TableCell>{moeda(sacola.lucro)}</TableCell>
                  <TableCell className="font-semibold text-emerald-700">{moeda(sacola.precoSugerido)}</TableCell>
                  <TableCell>{moeda(sacola.precoMinimo)}</TableCell>
                  <TableCell>{numero(sacola.markup)}%</TableCell>
                  <TableCell><Badge variant="secondary">Sugerido</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo de producao por hora</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Tempo/unidade</TableHead>
                <TableHead>Unid./hora</TableHead>
                <TableHead>Custo total</TableHead>
                <TableHead>Preco venda</TableHead>
                <TableHead>Receita/hora</TableHead>
                <TableHead>Lucro/hora</TableHead>
                <TableHead>Rentabilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-bold">Sacola {sacola.tamanho}</TableCell>
                  <TableCell>{numero(sacola.tempoTotalMin)} min</TableCell>
                  <TableCell>{numero(sacola.unidadesPorHora)}</TableCell>
                  <TableCell>{moeda(sacola.custoTotal)}</TableCell>
                  <TableCell>{moeda(sacola.precoSugerido)}</TableCell>
                  <TableCell>{moeda(sacola.receitaPorHora)}</TableCell>
                  <TableCell className="font-semibold text-emerald-700">{moeda(sacola.lucroPorHora)}</TableCell>
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
