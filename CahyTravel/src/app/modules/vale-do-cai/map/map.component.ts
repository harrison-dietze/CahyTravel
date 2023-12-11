import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { cityGraph, cityPositions } from 'src/constants/cities.mock';
import { AdjacencyMatrix } from 'src/data-structures/adjacency-matrix.class';
import { CITIES, CityEnum } from 'src/enums/city.enum';
import { DijkstraService } from 'src/services/dijkstra.service';

interface Positions {
  start: Coordinate;
  end: Coordinate;
}

interface Coordinate {
  x: number;
  y: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private djikstraService: DijkstraService) {
    this.graph = cityGraph;
  }

  private lastNodeClicked: CityEnum;

  public ngOnInit() {}

  @ViewChild('myCanvas') canvasRef: ElementRef;
  private canvasContext: CanvasRenderingContext2D;

  private graph: AdjacencyMatrix;
  private cityPositions = cityPositions;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.canvasContext = canvas.getContext('2d');
    this.canvasContext.font = '20px serif';
    this.canvasContext.textAlign = 'center';
    this.drawGraph();

    canvas.addEventListener('click', (event) => this.handleCanvasClick(event));
    canvas.addEventListener('mousemove', (event) =>
      this.handleCanvasHover(event)
    );
  }

  private drawNodes(): void {
    for (let node in this.cityPositions) {
      setTimeout(() => {
        for(let divisor: number = 10; divisor> 0; divisor--) {
          this.canvasContext.beginPath();
          this.canvasContext.arc(
            this.cityPositions[node].x / divisor,
            this.cityPositions[node].y / divisor,
            15,
            0,
            2 * Math.PI
          );
          this.canvasContext.fillStyle = 'green';
          this.canvasContext.fill();

          this.canvasContext.fillStyle = 'black';
          this.canvasContext.fillText(
            CITIES[node],
            this.cityPositions[node].x / divisor,
            (this.cityPositions[node].y - 20) / divisor
          )
        }}, 20);



    }
  }

  private drawEdges(): void {
    for (let node in this.graph) {
      const startNodePos = {
        x: this.cityPositions[node].x,
        y: this.cityPositions[node].y,
      };

      for (let neighbor in this.graph[node]) {
        const endNodePos = {
          x: this.cityPositions[neighbor].x,
          y: this.cityPositions[neighbor].y,
        };

        setTimeout(() => this.drawEdge(
          { start: startNodePos, end: endNodePos },
          node,
          neighbor,
          'yellow'
        ), 20);

      }
    }
  }

  private drawEdge(
    positions: Positions,
    node: CityEnum,
    neighbor: CityEnum,
    color: string
  ): void {
    if (!this.graph[node][neighbor]) return;

    this.canvasContext.strokeStyle = color;

    const textX = (positions.start.x + positions.end.x) / 2;
    const textY = (positions.start.y + positions.end.y) / 2;

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(positions.start.x, positions.start.y);
    this.canvasContext.lineTo(positions.end.x, positions.end.y);
    this.canvasContext.stroke();

    this.canvasContext.fillText(
      this.graph[node][neighbor].toString(),
      textX,
      textY
    );
  }

  private drawGraph(): void {
    this.drawEdges();
    this.drawNodes();
  }

  private handleCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    const mouseX: number = event.clientX - rect.left;
    const mouseY: number = event.clientY - rect.top;

    this.handleNodeClick(this.getCurrentNode(mouseX, mouseY));
  }

  private handleCanvasHover(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    const mouseX: number = event.clientX - rect.left;
    const mouseY: number = event.clientY - rect.top;

    this.handleNodeHover(this.getCurrentNode(mouseX, mouseY));
  }

  private getCurrentNode(
    mouseCoordinateX: number,
    mouseCoordinateY: number
  ): CityEnum {
    for (let node in this.cityPositions) {
      const nodeX = this.cityPositions[node].x;
      const nodeY = this.cityPositions[node].y;
      const distance = Math.sqrt(
        (mouseCoordinateX - nodeX) ** 2 + (mouseCoordinateY - nodeY) ** 2
      );

      if (distance <= 10) return node;
    }
  }

  // Function to handle node click
  private handleNodeClick(node: CityEnum): void {
    if (!node) return;

    if (this.lastNodeClicked) {
      const path = this.djikstraService.map
        .get(this.lastNodeClicked)
        .get(node).path;

      let previous: CityEnum | null = this.lastNodeClicked;

      path.forEach((city) => {
        console.log(previous, city);
        this.drawEdge(
          {
            start: cityPositions[previous],
            end: cityPositions[city],
          },
          previous,
          city,
          'blue'
        );

        previous = city;
      });

      this.drawEdge(
        {
          start: cityPositions[previous],
          end: cityPositions[node],
        },
        previous,
        node,
        'blue'
      );
    }
    this.lastNodeClicked = node;
  }

  private handleNodeHover(node: CityEnum): void {
    const canvas = this.canvasRef.nativeElement;
    if (node) {
      canvas.style.cursor = 'pointer';
    } else canvas.style.cursor = 'default';
  }
}
