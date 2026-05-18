export type TamanhoSacola = 'P' | 'M' | 'G' | 'GG';

export interface Depreciacao {
  facaP: number;
  facaM: number;
  facaG: number;
  maquinaCorte: number;
  impressora: number;
}

export interface Configuracoes {
  depreciacao: Depreciacao;
  custoHora: number;
  margemDesejada: number;
  horasTrabalhadasMes: number;
}

export interface Sacola {
  tamanho: TamanhoSacola;
  custoPapel: number;
  custoAlca: number;
  custoMO: number;
  custoEquipamentos: number;
  custoTotal: number;
  precoSugerido: number;
  precoMinimo: number;
  unidadesPorHora: number;
  lucroPorHora: number;
}
