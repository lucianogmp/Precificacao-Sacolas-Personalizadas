'use client';

import { useMemo } from 'react';
import { calcularTodas } from '@/lib/calculos';
import { Sacola } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  config: { custoHora: number; depreciacaoHora: number; margem: number };
}

export function CalculadoraSacolas({ config }: Props) {
  const resultados = useMemo(() => {
    return calcularTodas(config.custoHora, config.depreciacaoHora, config.margem);
  }, [config]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Resultado de Precificação</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tamanho</TableHead>
                <TableHead>Custo Total</TableHead>
                <TableHead>Preço Sugerido</TableHead>
                <TableHead>Preço Mínimo</TableHead>
                <TableHead>Unid./Hora</TableHead>
                <TableHead>Lucro/Hora</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultados.map((sacola: Sacola) => (
                <TableRow key={sacola.tamanho}>
                  <TableCell className="font-bold">Sacola {sacola.tamanho}</TableCell>
                  <TableCell>R$ {sacola.custoTotal.toFixed(2)}</TableCell>
                  <TableCell className="font-semibold text-emerald-600">
                    R$ {sacola.precoSugerido.toFixed(2)}
                  </TableCell>
                  <TableCell>R$ {sacola.precoMinimo.toFixed(2)}</TableCell>
                  <TableCell>{sacola.unidadesPorHora}</TableCell>
                  <TableCell className="text-emerald-600 font-medium">
                    R$ {sacola.lucroPorHora.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Recomendado</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
