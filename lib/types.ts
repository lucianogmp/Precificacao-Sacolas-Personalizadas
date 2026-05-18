export type TamanhoSacola = 'P' | 'M' | 'G' | 'GG';

export interface EquipamentoDepreciavel {
  nome: string;
  valorAquisicao: number;
  vidaUtilHoras: number;
}

export interface TintaConfig {
  valorKit: number;
  rendimentoSacolas: number;
}

export interface PapelConfig {
  valorPacote: number;
  quantidadeFolhas: number;
  folhasPorSacola: Record<TamanhoSacola, number>;
}

export interface AlcaConfig {
  custoUnitario: number;
  quantidadePorSacola: number;
}

export interface InsumoConfig {
  valorProduto: number;
  rendimentoSacolas: number;
}

export interface TempoProducao {
  impressao: number;
  corteVinco: number;
  montagemColagem: number;
}

export interface CustosFixos {
  aluguel: number;
  energia: number;
  maoDeObra: number;
  internetTelefone: number;
  outros: number;
  horasMes: number;
}

export interface ConfiguracaoPrecificacao {
  margem: Record<TamanhoSacola, number>;
  equipamentos: {
    facaP: EquipamentoDepreciavel;
    facaM: EquipamentoDepreciavel;
    facaG: EquipamentoDepreciavel;
    facaGG: EquipamentoDepreciavel;
    maquinaCorte: EquipamentoDepreciavel;
    impressora: EquipamentoDepreciavel;
  };
  tintas: {
    preta: TintaConfig;
    colorida: TintaConfig;
  };
  papeis: {
    offset180: PapelConfig;
    offset240: PapelConfig;
    kraft200: PapelConfig;
  };
  papelPorTamanho: Record<TamanhoSacola, keyof ConfiguracaoPrecificacao['papeis']>;
  alcas: {
    nylon: AlcaConfig;
    cetim: AlcaConfig;
    papelTorcido: AlcaConfig;
    vazada: AlcaConfig;
  };
  alcaPorTamanho: Record<TamanhoSacola, keyof ConfiguracaoPrecificacao['alcas']>;
  insumos: {
    cola: InsumoConfig;
    fitaDuplaFace: InsumoConfig;
    ilhos: InsumoConfig;
  };
  custosFixos: CustosFixos;
  tempos: Record<TamanhoSacola, TempoProducao>;
}

export interface ResultadoSacola {
  tamanho: TamanhoSacola;
  tempoTotalMin: number;
  custoPapel: number;
  custoAlca: number;
  custoTinta: number;
  custoColaOutros: number;
  custoMO: number;
  custoEquipamentos: number;
  custoTotal: number;
  margem: number;
  lucro: number;
  precoSugerido: number;
  precoMinimo: number;
  markup: number;
  unidadesPorHora: number;
  receitaPorHora: number;
  lucroPorHora: number;
  rentabilidade: number;
}
