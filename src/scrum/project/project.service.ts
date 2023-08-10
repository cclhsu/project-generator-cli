import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectRequestDTO } from './dto/create-project-request.dto';
import { UpdateProjectRequestDTO } from './dto/update-project-request.dto';
import { ProjectResponseDTO } from './dto/project-response.dto';
import { ProjectEntity } from './entity/project.entity';
import { ProjectLocalRepository as ProjectRepository } from './repository/project-local.repository';
import { ProjectMetadataDTO } from './dto/project-metadata.dto';
import { ProjectContentDTO } from './dto/project-content.dto';
import { TeamMetadataDTO } from '../team/dto/team-metadata.dto';
import { CommonDateDTO } from '../common/dto/common-date.dto';
import { TeamDTO } from '../team/dto/team.dto';
import { TeamContentDTO } from '../team/dto/team-content.dto';
// import { ProjectPrismaRepository as ProjectRepository } from './repositories/project-prisma.repository';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly projectRepository: ProjectRepository) {}

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
    const name: string = createProjectRequestDTO.metadata.name;

    try {
      // Check if project already exists
      const projectExists = await this.getProjectByName(name);
      if (projectExists) {
        throw new Error('Project already exists');
      }
    } catch (NotFoundException) {}

    // Create the project
    const project = await this.projectRepository.createProject(
      createProjectRequestDTO,
    );
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return this.convertToProjectResponse(project);
  }

  async updateProject(
    uuid: string,
    updateProjectRequestDTO: ProjectResponseDTO,
  ): Promise<ProjectResponseDTO> {
    // Check if project exists
    const project = await this.getProject(uuid);
    if (!project) {
      throw new NotFoundException('Project not found');
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

  async getProjectByName(name: string): Promise<ProjectResponseDTO> {
    const project = await this.projectRepository.getProjectByName(name);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    this.logger.log(`Project: ${JSON.stringify(project, null, 2)}`);
    return this.convertToProjectResponse(project);
  }

  // Other methods...

  convertToProjectResponse(project: ProjectEntity): ProjectResponseDTO {
    const projectMetadata: ProjectMetadataDTO = new ProjectMetadataDTO(
      project.metadata.ID,
      project.metadata.name,
      project.metadata.status,
      new CommonDateDTO(
        project.metadata.dates.createdDate,
        project.metadata.dates.createdBy,
        project.metadata.dates.updatedDate,
        project.metadata.dates.updatedBy,
        project.metadata.dates.startedDate,
        project.metadata.dates.startedBy,
        project.metadata.dates.startDate,
        project.metadata.dates.endDate,
        project.metadata.dates.completedDate,
        project.metadata.dates.completedBy,
      ),
    );
    const projectContent: ProjectContentDTO = new ProjectContentDTO(
      project.content.description,
      project.content.sprints,
      project.content.backlog,
      project.content.iterations,
      new TeamDTO(
        project.content.team.UUID,
        new TeamMetadataDTO(
          project.content.team.metadata.ID,
          project.content.team.metadata.name,
          new CommonDateDTO(
            project.content.team.metadata.dates.createdDate,
            project.content.team.metadata.dates.createdBy,
            project.content.team.metadata.dates.updatedDate,
            project.content.team.metadata.dates.updatedBy,
            project.content.team.metadata.dates.startedDate,
            project.content.team.metadata.dates.startedBy,
            project.content.team.metadata.dates.startDate,
            project.content.team.metadata.dates.endDate,
            project.content.team.metadata.dates.completedDate,
            project.content.team.metadata.dates.completedBy,
          ),
        ),
        new TeamContentDTO(
          project.content.team.content.members,
          project.content.team.content.productOwner,
          project.content.team.content.scrumMaster,
        ),
      ),
    );
    const projectResponse: ProjectResponseDTO = new ProjectResponseDTO(
      project.UUID,
      projectMetadata,
      projectContent,
    );
    return projectResponse;
  }

  convertToProjectResponseList(
    projects: ProjectEntity[],
  ): ProjectResponseDTO[] {
    const projectResponseList: ProjectResponseDTO[] = projects.map(
      (project) => {
        const projectMetadata: ProjectMetadataDTO = new ProjectMetadataDTO(
          project.metadata.ID,
          project.metadata.name,
          project.metadata.status,
          project.metadata.dates,
        );
        const projectContent: ProjectContentDTO = new ProjectContentDTO(
          project.content.description,
          project.content.sprints,
          project.content.backlog,
          project.content.iterations,
          project.content.team,
        );
        const projectResponse: ProjectResponseDTO = new ProjectResponseDTO(
          project.UUID,
          projectMetadata,
          projectContent,
        );
        return projectResponse;
      },
    );

    return projectResponseList;
  }
}
