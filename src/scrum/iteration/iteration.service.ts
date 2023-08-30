import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateIterationRequestDTO } from './dto/create-iteration-request.dto';
import { UpdateIterationRequestDTO } from './dto/update-iteration-request.dto';
import { IterationResponseDTO } from './dto/iteration-response.dto';
import { IterationEntity } from './entity/iteration.entity';
import { IterationLocalRepository as IterationRepository } from './repository/iteration-local.repository';
import { IterationMetadataDTO } from './dto/iteration-metadata.dto';
import { IterationContentDTO } from './dto/iteration-content.dto';
import {
  UpdateIterationContentRequestDTO,
  UpdateIterationMetadataRequestDTO,
  IterationContentResponseDTO,
  IterationMetadataResponseDTO,
  IterationIdUuidDTO,
  IterationIdUuidStatusDTO,
} from './dto';
import { validate } from 'class-validator';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class IterationService {
  private readonly logger = new Logger(IterationService.name);

  constructor(private readonly iterationRepository: IterationRepository) {}

  async listIterationIdsUUIDsStatuses(): Promise<IterationIdUuidStatusDTO[]> {
    return this.iterationRepository.listIterationIdsUUIDsStatuses();
  }

  async listIterationIdsAndUUIDs(): Promise<IterationIdUuidDTO[]> {
    return this.iterationRepository.listIterationIdsAndUUIDs();
  }

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
    const {
      ID,
      UUID,
      metadata: { name },
    } = createIterationRequestDTO;

    if (await this.isIterationExist(name, ID, UUID)) {
      throw new Error(
        'Iteration with the same name, ID, or UUID already exists',
      );
    }

    const error = await validateDtoMetadataContent<CreateIterationRequestDTO>(
      createIterationRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Create the iteration
    const iteration = await this.iterationRepository.createIteration(
      createIterationRequestDTO,
    );
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return this.convertToIterationResponse(iteration);
  }

  async updateIteration(
    uuid: string,
    updateIterationRequestDTO: UpdateIterationRequestDTO,
  ): Promise<IterationResponseDTO> {
    // Check if iteration exists
    const iteration = await this.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      iteration.metadata.dates,
      updateIterationRequestDTO.metadata.dates,
    );
    updateIterationRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateIterationRequestDTO>(
      updateIterationRequestDTO,
    );
    if (error) {
      throw new Error(error);
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

  async getIterationByID(ID: string): Promise<IterationResponseDTO> {
    const iteration = await this.iterationRepository.getIterationByID(ID);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return this.convertToIterationResponse(iteration);
  }

  async getIterationByName(name: string): Promise<IterationResponseDTO> {
    const iteration = await this.iterationRepository.getIterationByName(name);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return this.convertToIterationResponse(iteration);
  }

  async listIterationsWithMetadata(): Promise<IterationMetadataResponseDTO[]> {
    const iterations = await this.iterationRepository.listIterations();
    return iterations.map((iteration) =>
      this.convertToIterationMetadataResponse(iteration),
    );
  }

  async updateIterationMetadata(
    uuid: string,
    updateIterationMetadataRequestDTO: UpdateIterationMetadataRequestDTO,
  ): Promise<IterationMetadataResponseDTO> {
    // Check if iteration exists
    const iteration = await this.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      iteration.metadata.dates,
      updateIterationMetadataRequestDTO.metadata.dates,
    );
    updateIterationMetadataRequestDTO.metadata.dates = dates;

    // Update the iteration
    const updatedIterationMetadata: IterationMetadataDTO =
      await this.iterationRepository.updateIterationMetadata(
        uuid,
        updateIterationMetadataRequestDTO.metadata,
      );

    if (!updatedIterationMetadata) {
      throw new Error('Failed to update iteration');
    }

    this.logger.log(
      `Iteration: ${JSON.stringify(updatedIterationMetadata, null, 2)}`,
    );
    return new IterationMetadataResponseDTO(
      iteration.ID,
      uuid,
      updatedIterationMetadata,
    );
  }

  async updateIterationContent(
    uuid: string,
    updateIterationContentRequestDTO: UpdateIterationContentRequestDTO,
  ): Promise<IterationContentResponseDTO> {
    // Check if iteration exists
    const iteration = await this.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   iteration.metadata.dates,
    //   updateIterationContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateIterationContentRequestDTO.metadata.dates = dates;

    // Update the iteration
    const updatedIterationContent: IterationContentDTO =
      await this.iterationRepository.updateIterationContent(
        uuid,
        updateIterationContentRequestDTO.content,
      );

    if (!updatedIterationContent) {
      throw new Error('Failed to update iteration');
    }

    this.logger.log(
      `Iteration: ${JSON.stringify(updatedIterationContent, null, 2)}`,
    );
    return new IterationContentResponseDTO(
      iteration.ID,
      uuid,
      updatedIterationContent,
    );
  }

  async getIterationMetadata(
    uuid: string,
  ): Promise<IterationMetadataResponseDTO> {
    const iteration = await this.iterationRepository.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return new IterationMetadataResponseDTO(
      iteration.ID,
      uuid,
      iteration.metadata,
    );
  }

  async getIterationContent(
    uuid: string,
  ): Promise<IterationContentResponseDTO> {
    const iteration = await this.iterationRepository.getIteration(uuid);
    if (!iteration) {
      throw new NotFoundException('Iteration not found');
    }
    this.logger.log(`Iteration: ${JSON.stringify(iteration, null, 2)}`);
    return new IterationContentResponseDTO(
      iteration.ID,
      uuid,
      iteration.content,
    );
  }

  // Other methods...

  async isIterationExist(
    name: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const iterationByName = await this.iterationRepository.getIterationByName(
        name,
      );
      if (iterationByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Iteration not found by name: ${name}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const iterationByID = await this.iterationRepository.getIterationByID(ID);
      if (iterationByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Iteration not found by ID: ${ID}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const iterationByUUID = await this.iterationRepository.getIteration(UUID);
      if (iterationByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Iteration not found by UUID: ${UUID}`);
      } else {
        this.logger.error(error);
      }
    }
    return false;
  }

  async isNoIterationsExist(): Promise<boolean> {
    const iterations = await this.iterationRepository.listIterations();
    return iterations.length === 0;
  }

  async isExactlyOneIterationExist(): Promise<boolean> {
    const iterations = await this.iterationRepository.listIterations();
    return iterations.length === 1;
  }

  async isAtLeastOneIterationExist(): Promise<boolean> {
    const iterations = await this.iterationRepository.listIterations();
    return iterations.length >= 1;
  }

  convertToIterationResponse(iteration: IterationEntity): IterationResponseDTO {
    this.logger.verbose(
      `Converting Iteration: ${JSON.stringify(iteration, null, 2)}`,
    );
    const iterationMetadata: IterationMetadataDTO = new IterationMetadataDTO(
      iteration.metadata.name,
      iteration.metadata.status,
      iteration.metadata.priority,
      iteration.metadata.risk,
      iteration.metadata.tags,
      iteration.metadata.dates,
      iteration.metadata.iterationType,
    );
    const iterationContent: IterationContentDTO = new IterationContentDTO(
      iteration.content.description,
      iteration.content.goal,
      iteration.content.tasks,
      iteration.content.columns,
    );
    const iterationResponse: IterationResponseDTO = new IterationResponseDTO(
      iteration.ID,
      iteration.UUID,
      iterationMetadata,
      iterationContent,
    );
    return iterationResponse;
  }

  convertToIterationResponseList(
    iterations: IterationEntity[],
  ): IterationResponseDTO[] {
    this.logger.verbose(
      `Converting Iterations: ${JSON.stringify(iterations, null, 2)}`,
    );
    const iterationResponseList: IterationResponseDTO[] = iterations.map(
      (iteration) => {
        const iterationMetadata: IterationMetadataDTO =
          new IterationMetadataDTO(
            iteration.metadata.name,
            iteration.metadata.status,
            iteration.metadata.priority,
            iteration.metadata.risk,
            iteration.metadata.tags,
            iteration.metadata.dates,
            iteration.metadata.iterationType,
          );
        const iterationContent: IterationContentDTO = new IterationContentDTO(
          iteration.content.description,
          iteration.content.goal,
          iteration.content.tasks,
          iteration.content.columns,
        );
        const iterationResponse: IterationResponseDTO =
          new IterationResponseDTO(
            iteration.ID,
            iteration.UUID,
            iterationMetadata,
            iterationContent,
          );
        return iterationResponse;
      },
    );

    return iterationResponseList;
  }

  private convertToIterationMetadataResponse(
    iteration: IterationEntity,
  ): IterationMetadataResponseDTO {
    const iterationMetadata: IterationMetadataDTO = new IterationMetadataDTO(
      iteration.metadata.name,
      iteration.metadata.status,
      iteration.metadata.priority,
      iteration.metadata.risk,
      iteration.metadata.tags,
      iteration.metadata.dates,
      iteration.metadata.iterationType,
    );
    return new IterationMetadataResponseDTO(
      iteration.ID,
      iteration.UUID,
      iterationMetadata,
    );
  }
}
