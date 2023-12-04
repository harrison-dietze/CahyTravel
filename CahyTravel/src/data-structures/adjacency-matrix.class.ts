export interface AdjacencyMatrix {
  [nodeId: string]: { [nodeId: string]: number | null };
}
