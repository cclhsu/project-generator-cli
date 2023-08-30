import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectRequestDTO } from './dto/create-project-request.dto';
import { UpdateProjectRequestDTO } from './dto/update-project-request.dto';
import { ProjectResponseDTO } from './dto/project-response.dto';
import { ProjectEntity } from './entity/project.entity';
import { ProjectLocalRepository as ProjectRepository } from './repository/project-local.repository';
import { ProjectMetadataDTO } from './dto/project-metadata.dto';
import { ProjectContentDTO } from './dto/project-content.dto';
import { ProjectDTO } from '../project/dto/project.dto';
import {
  UpdateProjectContentRequestDTO,
  UpdateProjectMetadataRequestDTO,
  ProjectContentResponseDTO,
  ProjectMetadataResponseDTO,
  ProjectIdUuidDTO,
} from './dto';
import { validate } from 'class-validator';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly projectRepository: ProjectRepository) {}

  async listProjectIdsAndUUIDs(): Promise<ProjectIdUuidDTO[]> {
    return this.projectRepository.listProjectIdsAndUUIDs();
  }

  async listProjects(): Promise<ProjectResponseDTO[]> {
    const projects = await this.projectRepository.listProjects();
    this.logger.log(`Projects: ${JSON.stringify(projects, null, 2)}`);
    return this.convertToProjectResponseList(projects);
  }

  async getProject(uuid: string): Promise<ProjectResponseDTO> {
    const project = await this.projectRepository.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return this.convertToProjectResponse(project);
  }

  async createProject(
    createProjectRequestDTO: CreateProjectRequestDTO,
  ): Promise<ProjectResponseDTO> {
    const existingProjects = await this.projectRepository.listProjects();
    if (existingProjects.length > 0) {
      throw new Error('Only one project is allowed.');
    }

    const {
      ID,
      UUID,
      metadata: { name },
    } = createProjectRequestDTO;

    if (await this.isProjectExist(name, ID, UUID)) {
      throw new Error('Project with the same name, ID, or UUID already exists');
    }

    const error = await validateDtoMetadataContent<CreateProjectRequestDTO>(
      createProjectRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Create the project
    const project = await this.projectRepository.createProject(
      createProjectRequestDTO,
    );
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return this.convertToProjectResponse(project);
  }

  async updateProject(
    uuid: string,
    updateProjectRequestDTO: UpdateProjectRequestDTO,
  ): Promise<ProjectResponseDTO> {
    // Check if project exists
    const project = await this.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      project.metadata.dates,
      updateProjectRequestDTO.metadata.dates,
    );
    updateProjectRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateProjectRequestDTO>(
      updateProjectRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Update the project
    const updatedProject = await this.projectRepository.updateProject(
      uuid,
      updateProjectRequestDTO,
    );

    if (!updatedProject) {
      throw new Error('Failed to update project');
    }

    this.logger.log(`Project: ${JSON.stringify(updatedProject, null, 2)}`);
    return this.convertToProjectResponse(updatedProject);
  }

  async deleteProject(uuid: string): Promise<ProjectResponseDTO> {
    // Check if project exists
    const project = await this.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Delete the project
    const deleteProject = await this.projectRepository.deleteProject(uuid);
    if (!deleteProject) {
      throw new Error('Failed to delete project');
    }

    this.logger.log(`Project: ${JSON.stringify(deleteProject, null, 2)}`);
    return this.convertToProjectResponse(deleteProject);
  }

  async getProjectByID(ID: string): Promise<ProjectResponseDTO> {
    const project = await this.projectRepository.getProjectByID(ID);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return this.convertToProjectResponse(project);
  }

  async getProjectByName(name: string): Promise<ProjectResponseDTO> {
    const project = await this.projectRepository.getProjectByName(name);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return this.convertToProjectResponse(project);
  }

  async listProjectsWithMetadata(): Promise<ProjectMetadataResponseDTO[]> {
    const projects = await this.projectRepository.listProjects();
    return projects.map((project) =>
      this.convertToProjectMetadataResponse(project),
    );
  }

  async updateProjectMetadata(
    uuid: string,
    updateProjectMetadataRequestDTO: UpdateProjectMetadataRequestDTO,
  ): Promise<ProjectMetadataResponseDTO> {
    // Check if project exists
    const project = await this.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      project.metadata.dates,
      updateProjectMetadataRequestDTO.metadata.dates,
    );
    updateProjectMetadataRequestDTO.metadata.dates = dates;

    // Update the project
    const updatedProjectMetadata: ProjectMetadataDTO =
      await this.projectRepository.updateProjectMetadata(
        uuid,
        updateProjectMetadataRequestDTO.metadata,
      );

    if (!updatedProjectMetadata) {
      throw new Error('Failed to update project');
    }

    this.logger.log(
      `Project: ${JSON.stringify(updatedProjectMetadata, null, 2)}`,
    );
    return new ProjectMetadataResponseDTO(
      project.ID,
      uuid,
      updatedProjectMetadata,
    );
  }

  async updateProjectContent(
    uuid: string,
    updateProjectContentRequestDTO: UpdateProjectContentRequestDTO,
  ): Promise<ProjectContentResponseDTO> {
    // Check if project exists
    const project = await this.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   project.metadata.dates,
    //   updateProjectContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateProjectContentRequestDTO.metadata.dates = dates;

    // Update the project
    const updatedProjectContent: ProjectContentDTO =
      await this.projectRepository.updateProjectContent(
        uuid,
        updateProjectContentRequestDTO.content,
      );

    if (!updatedProjectContent) {
      throw new Error('Failed to update project');
    }

    this.logger.log(
      `Project: ${JSON.stringify(updatedProjectContent, null, 2)}`,
    );
    return new ProjectContentResponseDTO(
      project.ID,
      uuid,
      updatedProjectContent,
    );
  }

  async getProjectMetadata(uuid: string): Promise<ProjectMetadataResponseDTO> {
    const project = await this.projectRepository.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return new ProjectMetadataResponseDTO(project.ID, uuid, project.metadata);
  }

  async getProjectContent(uuid: string): Promise<ProjectContentResponseDTO> {
    const project = await this.projectRepository.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return new ProjectContentResponseDTO(project.ID, uuid, project.content);
  }

  // Other methods...

  async isProjectExist(
    name: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const projectByName = await this.projectRepository.getProjectByName(name);
      if (projectByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Project not found by name: ${name}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const projectByID = await this.projectRepository.getProjectByID(ID);
      if (projectByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Project not found by ID: ${ID}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const projectByUUID = await this.projectRepository.getProject(UUID);
      if (projectByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Project not found by UUID: ${UUID}`);
      } else {
        this.logger.error(error);
      }
    }
    return false;
  }

  async isNoProjectsExist(): Promise<boolean> {
    const projects = await this.projectRepository.listProjects();
    return projects.length === 0;
  }

  async isExactlyOneProjectExist(): Promise<boolean> {
    const projects = await this.projectRepository.listProjects();
    return projects.length === 1;
  }

  async isAtLeastOneProjectExist(): Promise<boolean> {
    const projects = await this.projectRepository.listProjects();
    return projects.length >= 1;
  }

  convertToProjectResponse(project: ProjectEntity): ProjectResponseDTO {
    this.logger.verbose(
      `Converting Project: ${JSON.stringify(project, null, 2)}`,
    );
    const projectMetadata: ProjectMetadataDTO = new ProjectMetadataDTO(
      project.metadata.name,
      project.metadata.status,
      project.metadata.dates,
    );
    const projectContent: ProjectContentDTO = new ProjectContentDTO(
      project.content.description,
      project.content.iterations,
      project.content.backlog,
      project.content.team,
    );
    const projectResponse: ProjectResponseDTO = new ProjectResponseDTO(
      project.ID,
      project.UUID,
      projectMetadata,
      projectContent,
    );
    return projectResponse;
  }

  convertToProjectResponseList(
    projects: ProjectEntity[],
  ): ProjectResponseDTO[] {
    this.logger.verbose(
      `Converting Project: ${JSON.stringify(projects, null, 2)}`,
    );
    const projectResponseList: ProjectResponseDTO[] = projects.map(
      (project) => {
        const projectMetadata: ProjectMetadataDTO = new ProjectMetadataDTO(
          project.metadata.name,
          project.metadata.status,
          project.metadata.dates,
        );
        const projectContent: ProjectContentDTO = new ProjectContentDTO(
          project.content.description,
          project.content.iterations,
          project.content.backlog,
          project.content.team,
        );
        const projectResponse: ProjectResponseDTO = new ProjectResponseDTO(
          project.ID,
          project.UUID,
          projectMetadata,
          projectContent,
        );
        return projectResponse;
      },
    );

    return projectResponseList;
  }

  private convertToProjectMetadataResponse(
    project: ProjectEntity,
  ): ProjectMetadataResponseDTO {
    const projectMetadata: ProjectMetadataDTO = new ProjectMetadataDTO(
      project.metadata.name,
      project.metadata.status,
      project.metadata.dates,
    );
    return new ProjectMetadataResponseDTO(
      project.ID,
      project.UUID,
      projectMetadata,
    );
  }
}
