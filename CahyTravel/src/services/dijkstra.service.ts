import { Injectable, Injector } from '@angular/core';
import { AdjacencyMatrix } from 'src/data-structures/adjacency-matrix.class';
import { CityEnum } from 'src/enums/city.enum';
import { CITY_GRAPH_TOKEN } from 'src/providables/city-set-token';

export type CityRelation = Map<
  CityEnum,
  { distance: number; path?: CityEnum[] }
>;

@Injectable({
  providedIn: 'root',
})
export class DijkstraService {
  constructor(injector: Injector) {
    this.graph = injector.get(CITY_GRAPH_TOKEN);
    this.composeMap();
  }

  private graph: AdjacencyMatrix;
  public map: Map<CityEnum, CityRelation> = new Map();

  private composeMap(): void {
    for (const key in this.graph) {
      this.map.set(key as CityEnum, this.dijkstra(key as CityEnum));
    }
    console.log(this.map);
  }

  private dijkstra(start: CityEnum): CityRelation {
    const distances: CityRelation = new Map();
    const visited: Map<CityEnum, boolean> = new Map();
    const queue: CityEnum[] = [];

    for (const key in this.graph) {
      distances.set(key as CityEnum, { distance: Infinity, path: [] });
      visited.set(key as CityEnum, false);
    }

    distances.set(start, { distance: 0, path: [] });
    queue.push(start);

    while (queue.length) {
      let current: CityEnum = queue.shift() as CityEnum;
      visited.set(current, true);

      for (const neighbor in this.graph[current]) {
        const distanceCurrentToNeighbor: number | null =
          this.graph[current][neighbor];

        // if (start == 'tupandi') console.log(start, current);

        if (distanceCurrentToNeighbor) {
          const distanceStartToCurrentToNeighbor =
            distances.get(current).distance + this.graph[current][neighbor]!;
          if (
            distanceStartToCurrentToNeighbor <
            distances.get(neighbor as CityEnum).distance
          ) {
            console.log(distances.get(neighbor).path);
            distances.set(neighbor as CityEnum, {
              distance: distanceStartToCurrentToNeighbor,
              path: [
                ...distances.get(current).path,
                ...(current == start ? [] : [current]),
              ],
            });
            if (!visited.get(neighbor as CityEnum)) {
              queue.push(neighbor as CityEnum);
            }
          }
        }
      }
    }

    return distances;
  }
}
