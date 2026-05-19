export type TamanhoSacola = 'P' | 'M' | 'G' | 'GG';
export type EquipamentoKey = 'facaP' | 'facaM' | 'facaG' | 'facaGG' | 'maquinaCorte' | 'impressora';
export type TintaKey = 'preta' | 'colorida';
export type PapelKey = 'offset180' | 'offset240' | 'kraft200';
export type AlcaKey = 'nylon' | 'cetim' | 'papelTorcido' | 'vazada';
export type InsumoKey = 'cola' | 'fitaDuplaFace' | 'ilhos';

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
  equipamentos: Record<EquipamentoKey, EquipamentoDepreciavel>;
  tintas: Record<TintaKey, TintaConfig>;
  papeis: Record<PapelKey, PapelConfig>;
  papelPorTamanho: Record<TamanhoSacola, PapelKey>;
  alcas: Record<AlcaKey, AlcaConfig>;
  alcaPorTamanho: Record<TamanhoSacola, AlcaKey>;
  insumos: Record<InsumoKey, InsumoConfig>;
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
