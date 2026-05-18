import { ConfiguracaoPrecificacao, ResultadoSacola, TamanhoSacola } from './types';

export const tamanhosSacolas: TamanhoSacola[] = ['P', 'M', 'G', 'GG'];

export const configPadrao: ConfiguracaoPrecificacao = {
  margem: { P: 50, M: 50, G: 50, GG: 50 },
  equipamentos: {
    facaP: { nome: 'Faca de Corte - Sacola P', valorAquisicao: 280, vidaUtilHoras: 2000 },
    facaM: { nome: 'Faca de Corte - Sacola M', valorAquisicao: 350, vidaUtilHoras: 2000 },
    facaG: { nome: 'Faca de Corte - Sacola G', valorAquisicao: 0, vidaUtilHoras: 2000 },
    facaGG: { nome: 'Faca de Corte - Sacola GG', valorAquisicao: 0, vidaUtilHoras: 2000 },
    maquinaCorte: { nome: 'Maquina Corte e Vinco', valorAquisicao: 1448.08, vidaUtilHoras: 8760 },
    impressora: { nome: 'Impressora', valorAquisicao: 5600, vidaUtilHoras: 4380 },
  },
  tintas: {
    preta: { valorKit: 0, rendimentoSacolas: 500 },
    colorida: { valorKit: 0, rendimentoSacolas: 400 },
  },
  papeis: {
    offset180: {
      valorPacote: 60,
      quantidadeFolhas: 250,
      folhasPorSacola: { P: 1, M: 1, G: 1, GG: 2 },
    },
    offset240: {
      valorPacote: 0,
      quantidadeFolhas: 100,
      folhasPorSacola: { P: 1, M: 1, G: 1, GG: 2 },
    },
    kraft200: {
      valorPacote: 0,
      quantidadeFolhas: 100,
      folhasPorSacola: { P: 1, M: 1, G: 1, GG: 2 },
    },
  },
  papelPorTamanho: { P: 'offset180', M: 'offset240', G: 'kraft200', GG: 'kraft200' },
  alcas: {
    nylon: { custoUnitario: 0.11, quantidadePorSacola: 2 },
    cetim: { custoUnitario: 0, quantidadePorSacola: 2 },
    papelTorcido: { custoUnitario: 0, quantidadePorSacola: 2 },
    vazada: { custoUnitario: 0, quantidadePorSacola: 0 },
  },
  alcaPorTamanho: { P: 'nylon', M: 'nylon', G: 'cetim', GG: 'cetim' },
  insumos: {
    cola: { valorProduto: 0, rendimentoSacolas: 200 },
    fitaDuplaFace: { valorProduto: 0, rendimentoSacolas: 150 },
    ilhos: { valorProduto: 0, rendimentoSacolas: 100 },
  },
  custosFixos: {
    aluguel: 700,
    energia: 150,
    maoDeObra: 1500,
    internetTelefone: 90,
    outros: 200,
    horasMes: 247,
  },
  tempos: {
    P: { impressao: 1, corteVinco: 1, montagemColagem: 10 },
    M: { impressao: 4, corteVinco: 3, montagemColagem: 6 },
    G: { impressao: 5, corteVinco: 4, montagemColagem: 8 },
    GG: { impressao: 6, corteVinco: 5, montagemColagem: 10 },
  },
};

const round = (value: number, decimals = 4) => Number(value.toFixed(decimals));
const safeDivide = (value: number, divisor: number) => (divisor > 0 ? value / divisor : 0);

export function depreciacaoHora(valorAquisicao: number, vidaUtilHoras: number) {
  return safeDivide(valorAquisicao, vidaUtilHoras);
}

export function custoFixoHora(config: ConfiguracaoPrecificacao) {
  const custos = config.custosFixos;
  const totalMensal = custos.aluguel + custos.energia + custos.maoDeObra + custos.internetTelefone + custos.outros;
  return safeDivide(totalMensal, custos.horasMes);
}

export function calcularSacola(tamanho: TamanhoSacola, config: ConfiguracaoPrecificacao): ResultadoSacola {
  const tempo = config.tempos[tamanho];
  const tempoTotalMin = tempo.impressao + tempo.corteVinco + tempo.montagemColagem;
  const horasPorUnidade = tempoTotalMin / 60;
  const custoHora = custoFixoHora(config);

  const papel = config.papeis[config.papelPorTamanho[tamanho]];
  const custoPapel = safeDivide(papel.valorPacote, papel.quantidadeFolhas) * papel.folhasPorSacola[tamanho];

  const alca = config.alcas[config.alcaPorTamanho[tamanho]];
  const custoAlca = alca.custoUnitario * alca.quantidadePorSacola;

  const tinta = tamanho === 'P' || tamanho === 'M' ? config.tintas.preta : config.tintas.colorida;
  const custoTinta = safeDivide(tinta.valorKit, tinta.rendimentoSacolas);

  const custoColaOutros =
    safeDivide(config.insumos.cola.valorProduto, config.insumos.cola.rendimentoSacolas) +
    safeDivide(config.insumos.fitaDuplaFace.valorProduto, config.insumos.fitaDuplaFace.rendimentoSacolas) +
    safeDivide(config.insumos.ilhos.valorProduto, config.insumos.ilhos.rendimentoSacolas);

  const facaPorTamanho = {
    P: config.equipamentos.facaP,
    M: config.equipamentos.facaM,
    G: config.equipamentos.facaG,
    GG: config.equipamentos.facaGG,
  }[tamanho];

  const custoMO = horasPorUnidade * custoHora;
  const depreciacaoEquipamentosHora =
    depreciacaoHora(facaPorTamanho.valorAquisicao, facaPorTamanho.vidaUtilHoras) +
    depreciacaoHora(config.equipamentos.maquinaCorte.valorAquisicao, config.equipamentos.maquinaCorte.vidaUtilHoras) +
    depreciacaoHora(config.equipamentos.impressora.valorAquisicao, config.equipamentos.impressora.vidaUtilHoras);
  const custoEquipamentos = depreciacaoEquipamentosHora * horasPorUnidade;

  const custoTotal = custoPapel + custoAlca + custoTinta + custoColaOutros + custoMO + custoEquipamentos;
  const margem = config.margem[tamanho];
  const lucro = custoTotal * (margem / 100);
  const precoSugerido = custoTotal + lucro;
  const precoMinimo = custoTotal * 1.2;
  const unidadesPorHora = tempoTotalMin > 0 ? 60 / tempoTotalMin : 0;
  const receitaPorHora = unidadesPorHora * precoSugerido;
  const lucroPorHora = receitaPorHora - unidadesPorHora * custoTotal;
  const rentabilidade = receitaPorHora > 0 ? lucroPorHora / receitaPorHora : 0;

  return {
    tamanho,
    tempoTotalMin: round(tempoTotalMin, 2),
    custoPapel: round(custoPapel),
    custoAlca: round(custoAlca),
    custoTinta: round(custoTinta),
    custoColaOutros: round(custoColaOutros),
    custoMO: round(custoMO),
    custoEquipamentos: round(custoEquipamentos),
    custoTotal: round(custoTotal),
    margem,
    lucro: round(lucro, 2),
    precoSugerido: round(precoSugerido, 2),
    precoMinimo: round(precoMinimo, 2),
    markup: custoTotal > 0 ? round(((precoSugerido / custoTotal) - 1) * 100, 2) : 0,
    unidadesPorHora: round(unidadesPorHora, 2),
    receitaPorHora: round(receitaPorHora, 2),
    lucroPorHora: round(lucroPorHora, 2),
    rentabilidade: round(rentabilidade * 100, 2),
  };
}

export function calcularTodas(config: ConfiguracaoPrecificacao) {
  return tamanhosSacolas.map((tamanho) => calcularSacola(tamanho, config));
}
