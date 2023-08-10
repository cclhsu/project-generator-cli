import { IterationResponseDTO } from './iteration-response.dto';

export class ListIterationResponseDTO {
  constructor(iterations: IterationResponseDTO[]) {
    this.iterations = iterations;
  }
  iterations: IterationResponseDTO[];
}
