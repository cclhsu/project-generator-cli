import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateIterationRequestDTO } from './dto/create-iteration-request.dto';
import { UpdateIterationRequestDTO } from './dto/update-iteration-request.dto';
import { IterationResponseDTO } from './dto/iteration-response.dto';
import { IterationEntity } from './entity/iteration.entity';
import { IterationLocalRepository as IterationRepository } from './repository/iteration-local.repository';
import { IterationMetadataDTO } from './dto/iteration-metadata.dto';
import { IterationContentDTO } from './dto/iteration-content.dto';
// import { IterationPrismaRepository as IterationRepository } from './repositories/iteration-prisma.repository';

@Injectable()
export class IterationService {
  private readonly logger = new Logger(IterationService.name);

  constructor(private readonly iterationRepository: IterationRepository) {}

  async listIterations(): Promise<IterationResponseDTO[]> {
    const iterations = await this.iterationRepository.listIterations();
    this.logger.log(`Iterations: ${JSON.stringify(iterations, null, 2)}`);
    return this.convertToIterationResponseList(iterations);
  }

  async getIteration(uuid: string): Promise<IterationResponseDTO> {
    const iteration = await this.iterationRepository.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return this.convertToIterationResponse(iteration);
  }

  async createIteration(
    createIterationRequestDTO: CreateIterationRequestDTO,
  ): Promise<IterationResponseDTO> {
    const name: string = createIterationRequestDTO.metadata.name;

    try {
      // Check if iteration already exists
      const iterationExists = await this.getIterationByName(name);
      if (iterationExists) {
        throw new Error('Iteration already exists');
      }
    } catch (NotFoundException) {}

    // Create the iteration
    const iteration = await this.iterationRepository.createIteration(
      createIterationRequestDTO,
    );
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return this.convertToIterationResponse(iteration);
  }

  async updateIteration(
    uuid: string,
    updateIterationRequestDTO: IterationResponseDTO,
  ): Promise<IterationResponseDTO> {
    // Check if iteration exists
    const iteration = await this.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }

    // Update the iteration
    const updatedIteration = await this.iterationRepository.updateIteration(
      uuid,
      updateIterationRequestDTO,
    );

    if (!updatedIteration) {
      throw new Error('Failed to update iteration');
    }

    this.logger.log(`Iteration: ${JSON.stringify(updatedIteration, null, 2)}`);
    return this.convertToIterationResponse(updatedIteration);
  }

  async deleteIteration(uuid: string): Promise<IterationResponseDTO> {
    // Check if iteration exists
    const iteration = await this.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }

    // Delete the iteration
    const deleteIteration = await this.iterationRepository.deleteIteration(
      uuid,
    );
    if (!deleteIteration) {
      throw new Error('Failed to delete iteration');
    }

    this.logger.log(`Iteration: ${JSON.stringify(deleteIteration, null, 2)}`);
    return this.convertToIterationResponse(deleteIteration);
  }

  async getIterationByName(name: string): Promise<IterationResponseDTO> {
    const iteration = await this.iterationRepository.getIterationByName(name);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return this.convertToIterationResponse(iteration);
  }

  // Other methods...

  convertToIterationResponse(iteration: IterationEntity): IterationResponseDTO {
    const iterationMetadata: IterationMetadataDTO = new IterationMetadataDTO(
      iteration.metadata.ID,
      iteration.metadata.name,
      iteration.metadata.status,
      iteration.metadata.priority,
      iteration.metadata.risk,
      iteration.metadata.tags,
      iteration.metadata.dates,
    );
    const iterationContent: IterationContentDTO = new IterationContentDTO(
      iteration.content.description,
      iteration.content.goal,
      // iteration.content.tasks,
      iteration.content.columns,
    );
    const iterationResponse: IterationResponseDTO = new IterationResponseDTO(
      iteration.UUID,
      iterationMetadata,
      iterationContent,
    );
    return iterationResponse;
  }

  convertToIterationResponseList(
    iterations: IterationEntity[],
  ): IterationResponseDTO[] {
    const iterationResponseList: IterationResponseDTO[] = iterations.map(
      (iteration) => {
        const iterationMetadata: IterationMetadataDTO =
          new IterationMetadataDTO(
            iteration.metadata.ID,
            iteration.metadata.name,
            iteration.metadata.status,
            iteration.metadata.priority,
            iteration.metadata.risk,
            iteration.metadata.tags,
            iteration.metadata.dates,
          );
        const iterationContent: IterationContentDTO = new IterationContentDTO(
          iteration.content.description,
          iteration.content.goal,
          // iteration.content.tasks,
          iteration.content.columns,
        );
        const iterationResponse: IterationResponseDTO =
          new IterationResponseDTO(
            iteration.UUID,
            iterationMetadata,
            iterationContent,
          );
        return iterationResponse;
      },
    );

    return iterationResponseList;
  }
}
