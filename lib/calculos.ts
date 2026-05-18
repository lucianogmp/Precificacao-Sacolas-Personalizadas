import { TamanhoSacola, Sacola } from './types';

const tempoProducao: Record<TamanhoSacola, number> = {
  P: 12, M: 13, G: 17, GG: 21
};

const alcaCusto = 0.22; // padrão

export function calcularSacola(
  tamanho: TamanhoSacola,
  custoHora: number,
  depreciacaoHora: number,
  margem: number = 50
): Sacola {
  const tempoMin = tempoProducao[tamanho];
  const custoMO = (tempoMin / 60) * custoHora;
  const custoEquip = (tempoMin / 60) * depreciacaoHora;

  const custoTotal = custoMO + custoEquip + alcaCusto;

  const precoSugerido = custoTotal * (1 + margem / 100);
  const precoMinimo = custoTotal * 1.2; // 20% margem mínima

  const unidadesPorHora = 60 / tempoMin;

  return {
    tamanho,
    custoPapel: 0, // futuro
    custoAlca: alcaCusto,
    custoMO: Number(custoMO.toFixed(4)),
    custoEquipamentos: Number(custoEquip.toFixed(4)),
    custoTotal: Number(custoTotal.toFixed(4)),
    precoSugerido: Number(precoSugerido.toFixed(2)),
    precoMinimo: Number(precoMinimo.toFixed(2)),
    unidadesPorHora: Number(unidadesPorHora.toFixed(2)),
    lucroPorHora: Number((unidadesPorHora * (precoSugerido - custoTotal)).toFixed(2))
  };
}

export function calcularTodas(custoHora: number, depreciacaoHora: number, margem: number) {
  const tamanhos: TamanhoSacola[] = ['P', 'M', 'G', 'GG'];
  return tamanhos.map(t => calcularSacola(t, custoHora, depreciacaoHora, margem));
}
