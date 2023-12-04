import { AdjacencyMatrix } from 'src/data-structures/adjacency-matrix.class';

export type CityEnum = keyof AdjacencyMatrix;

export const CITIES = {
  feliz: 'Feliz',
  valeReal: 'Vale Real',
  saoSebastiaoDoCai: 'S. S. do Caí',
  altoFeliz: 'Alto Feliz',
  bomPrincipio: 'Bom Princípio',
  tupandi: 'Tupandi',
  saoVendelino: 'São Vendelino',
};
