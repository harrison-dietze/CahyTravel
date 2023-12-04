import { AdjacencyMatrix } from './../data-structures/adjacency-matrix.class';
import { InjectionToken } from '@angular/core';

export const CITY_GRAPH_TOKEN: InjectionToken<AdjacencyMatrix> =
  new InjectionToken<AdjacencyMatrix>('CITY_GRAPH_TOKEN');
