import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateProjectRequestDTO } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDTO } from '../dto/update-project-request.dto';
import { ProjectEntity } from '../entity/project.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ProjectMetadataEntity } from '../entity/project-metadata.entity';
import { ProjectContentEntity } from '../entity/project-content.entity';
import { CommonDateEntity } from 'src/scrum/common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_PROJECT_FILE_PATH,
  DEFAULT_PROJECT_PATH,
  STORAGE_DEVICE_TYPES,
} from 'src/scrum/common/constant/repository.constant';
import { glob } from 'glob';
import { createDirectory } from 'src/utils/directory/directory.utils';
import { deleteFile } from 'src/utils/file/file.utils';

@Injectable()
export class ProjectLocalRepository {
  private readonly logger = new Logger(ProjectLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private projects: ProjectEntity[] = [];

  constructor(
    @Inject('ReadSingleFromJSON')
    private readonly readSingleFromJSON: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToJSON')
    private readonly writeSingleToJSON: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromYAML')
    private readonly readSingleFromYAML: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToYAML')
    private readonly writeSingleToYAML: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromCSV')
    private readonly readSingleFromCSV: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToCSV')
    private readonly writeSingleToCSV: <T>(filePath: string, data: T) => void,
    // @Inject('ReadSingleFromMarkdown')
    // private readonly readSingleFromMarkdown: <T>(filePath: string) => Promise<T>,
    // @Inject('WriteSingleToMarkdown')
    // private readonly writeSingleToMarkdown: <T>(filePath: string, data: T) => void,
    @Inject('ReadArrayFromJSON')
    private readonly readArrayFromJSON: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToJSON')
    private readonly writeArrayToJSON: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromYAML')
    private readonly readArrayFromYAML: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToYAML')
    private readonly writeArrayToYAML: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromCSV')
    private readonly readArrayFromCSV: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToCSV')
    private readonly writeArrayToCSV: <T>(filePath: string, data: T[]) => void,
    // @Inject('ReadArrayFromMarkdown')
    // private readonly readArrayFromMarkdown: <T>(filePath: string) => Promise<T[]>,
    // @Inject('WriteArrayToMarkdown')
    // private readonly writeArrayToMarkdown: <T>(filePath: string, data: T[]) => void,
  ) {
    this.storageStrategy = this.getStorageStrategy();
  }

  // Get all projects
  async listProjects(): Promise<ProjectEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listProjects();
  }

  // Get a project by ID
  async getProject(UUID: string): Promise<ProjectEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getProject(UUID);
  }

  // Create a new project
  async createProject(
    createProjectRequestDTO: CreateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createProject(createProjectRequestDTO);
  }

  // Update a project by ID
  async updateProject(
    UUID: string,
    updateProjectRequestDTO: UpdateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateProject(UUID, updateProjectRequestDTO);
  }

  // Delete a project by ID
  async deleteProject(UUID: string): Promise<ProjectEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteProject(UUID);
  }

  // Get a project by name
  async getProjectByName(name: string): Promise<ProjectEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getProjectByName(name);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_PROJECT_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_PROJECT_PATH,
            this.readSingleFromJSON,
            this.writeSingleToJSON,
          );
        }
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'yaml') {
        // Implement YAML strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'csv') {
        // Implement CSV strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'md') {
        // Implement MD strategy...
        throw new Error('Unimplemented storage configuration');
      }
    } else {
      if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'memory') {
        // Implement memory strategy...
        return new MemoryStorage();
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'sqlite') {
        // Implement sqlite strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'mongo') {
        // Implement mongo strategy...
        throw new Error('Unimplemented storage configuration');
      } else if (DEFAULT_DATABASE_STORAGE_DEVICE_TYPE === 'postgres') {
        // Implement postgres strategy...
        throw new Error('Unimplemented storage configuration');
      }
    }
    throw new Error('Unsupported storage configuration');
  }

  private generateUUID(): string {
    return String(this.projects.length + 1);
    // return uuidv4();
  }

  async readProjectFromJSON(filePath: string): Promise<ProjectEntity> {
    return this.readSingleFromJSON<ProjectEntity>(filePath);
  }

  async writeProjectToJSON(
    filePath: string,
    project: ProjectEntity,
  ): Promise<void> {
    this.writeSingleToJSON<ProjectEntity>(filePath, project);
  }

  async readProjectFromYAML(filePath: string): Promise<ProjectEntity> {
    return this.readSingleFromYAML<ProjectEntity>(filePath);
  }

  async writeProjectToYAML(
    filePath: string,
    project: ProjectEntity,
  ): Promise<void> {
    this.writeSingleToYAML<ProjectEntity>(filePath, project);
  }

  async readProjectFromCSV(filePath: string): Promise<ProjectEntity> {
    return this.readSingleFromCSV<ProjectEntity>(filePath);
  }

  async writeProjectToCSV(
    filePath: string,
    project: ProjectEntity,
  ): Promise<void> {
    this.writeSingleToCSV<ProjectEntity>(filePath, project);
  }

  async readProjectsFromJSON(filePath: string): Promise<ProjectEntity[]> {
    return this.readArrayFromJSON<ProjectEntity>(filePath);
  }

  async writeProjectsToJSON(
    filePath: string,
    projects: ProjectEntity[],
  ): Promise<void> {
    this.writeArrayToJSON<ProjectEntity>(filePath, projects);
  }

  async readProjectsFromYAML(filePath: string): Promise<ProjectEntity[]> {
    return this.readArrayFromYAML<ProjectEntity>(filePath);
  }

  async writeProjectsToYAML(
    filePath: string,
    projects: ProjectEntity[],
  ): Promise<void> {
    this.writeArrayToYAML<ProjectEntity>(filePath, projects);
  }

  async readProjectsFromCSV(filePath: string): Promise<ProjectEntity[]> {
    return this.readArrayFromCSV<ProjectEntity>(filePath);
  }

  async writeProjectsToCSV(
    filePath: string,
    projects: ProjectEntity[],
  ): Promise<void> {
    this.writeArrayToCSV<ProjectEntity>(filePath, projects);
  }
}

interface StorageStrategy {
  listProjects(): Promise<ProjectEntity[]>;
  getProject(UUID: string): Promise<ProjectEntity>;
  createProject(
    createProjectRequestDTO: CreateProjectRequestDTO,
  ): Promise<ProjectEntity>;
  updateProject(
    UUID: string,
    updateProjectRequestDTO: UpdateProjectRequestDTO,
  ): Promise<ProjectEntity>;
  deleteProject(UUID: string): Promise<ProjectEntity>;
  getProjectByName(name: string): Promise<ProjectEntity>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private projects: ProjectEntity[] = [
    // new ProjectEntity(
    //   '00000000-0000-0000-0000-000000000001',
    //   new ProjectMetadataEntity(
    //     'ABC-123',
    //     'Project 1',
    //     new CommonDateEntity(
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'john.doe',
    //     ),
    //   ),
    //   new ProjectContentEntity(['john.doe', 'jane.doe'], 'john.doe', 'jane.doe'),
    // ),
    // new ProjectEntity(
    //   '00000000-0000-0000-0000-000000000002',
    //   new ProjectMetadataEntity(
    //     'XYZ-789',
    //     'Project 2',
    //     new CommonDateEntity(
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       new Date('2021-01-01T00:00:00.000Z'),
    //       'jane.doe',
    //     ),
    //   ),
    //   new ProjectContentEntity(['john.doe', 'jane.doe'], 'john.doe', 'jane.doe'),
    // ),
  ];

  async listProjects(): Promise<ProjectEntity[]> {
    return this.projects;
  }

  async getProject(UUID: string): Promise<ProjectEntity> {
    const project: ProjectEntity | undefined = this.projects.find(
      (project) => project.UUID === UUID,
    );
    if (!project) {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
    return project;
  }

  async createProject(
    createProjectRequestDTO: CreateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const newUUID: string = uuidV4();
    const newProjectMetadata: ProjectMetadataEntity = plainToInstance(
      ProjectMetadataEntity,
      createProjectRequestDTO.metadata,
    );
    const newProjectContent: ProjectContentEntity = plainToInstance(
      ProjectContentEntity,
      createProjectRequestDTO.content,
    );
    const newProject: ProjectEntity = new ProjectEntity(
      newUUID,
      newProjectMetadata,
      newProjectContent,
    );
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(
    UUID: string,
    updateProjectRequestDTO: UpdateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const projectIndex = this.projects.findIndex(
      (project) => project.UUID === UUID,
    );
    if (projectIndex === -1) {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
    const updatedProjectMetadata: ProjectMetadataEntity = {
      ...this.projects[projectIndex].metadata,
      ...instanceToPlain(updateProjectRequestDTO.metadata),
    };
    const updatedProjectContent: ProjectContentEntity = {
      ...this.projects[projectIndex].content,
      ...instanceToPlain(updateProjectRequestDTO.content),
    };
    const updatedProject = new ProjectEntity(
      UUID,
      updatedProjectMetadata,
      updatedProjectContent,
    );
    this.projects[projectIndex] = updatedProject;
    return updatedProject;
  }

  async deleteProject(UUID: string): Promise<ProjectEntity> {
    const projectIndex = this.projects.findIndex(
      (project) => project.UUID === UUID,
    );
    if (projectIndex === -1) {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
    const deletedProject: ProjectEntity = this.projects.splice(
      projectIndex,
      1,
    )[0];
    return deletedProject;
  }

  async getProjectByName(name: string): Promise<ProjectEntity> {
    const project: ProjectEntity | undefined = this.projects.find(
      (project) => project.metadata.name === name,
    );
    if (!project) {
      throw new NotFoundException(`Project ${name} cannot be found`);
    }
    return project;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listProjects(): Promise<ProjectEntity[]> {
    return this.readFromJSON<ProjectEntity>(this.filePath);
  }

  async getProject(UUID: string): Promise<ProjectEntity> {
    const projects: ProjectEntity[] = await this.readFromJSON<ProjectEntity>(
      this.filePath,
    );
    const project: ProjectEntity | undefined = projects.find(
      (project) => project.UUID === UUID,
    );
    if (!project) {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
    return project;
  }

  async createProject(
    createProjectRequestDTO: CreateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const projects: ProjectEntity[] = await this.readFromJSON<ProjectEntity>(
      this.filePath,
    );
    const newUUID: string = uuidV4();
    const newProjectMetadata: ProjectMetadataEntity = plainToInstance(
      ProjectMetadataEntity,
      createProjectRequestDTO.metadata,
    );
    const newProjectContent: ProjectContentEntity = plainToInstance(
      ProjectContentEntity,
      createProjectRequestDTO.content,
    );
    const newProject: ProjectEntity = new ProjectEntity(
      newUUID,
      newProjectMetadata,
      newProjectContent,
    );
    projects.push(newProject);
    this.writeToJSON(this.filePath, projects);
    return newProject;
  }

  async updateProject(
    UUID: string,
    updateProjectRequestDTO: UpdateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const projects: ProjectEntity[] = await this.readFromJSON<ProjectEntity>(
      this.filePath,
    );
    const projectIndex = projects.findIndex((project) => project.UUID === UUID);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
    const updatedProjectMetadata: ProjectMetadataEntity = {
      ...projects[projectIndex].metadata,
      ...instanceToPlain(updateProjectRequestDTO.metadata),
    };
    const updatedProjectContent: ProjectContentEntity = {
      ...projects[projectIndex].content,
      ...instanceToPlain(updateProjectRequestDTO.content),
    };
    const updatedProject = new ProjectEntity(
      UUID,
      updatedProjectMetadata,
      updatedProjectContent,
    );
    projects[projectIndex] = updatedProject;
    this.writeToJSON(this.filePath, projects);
    return updatedProject;
  }

  async deleteProject(UUID: string): Promise<ProjectEntity> {
    const projects: ProjectEntity[] = await this.readFromJSON<ProjectEntity>(
      this.filePath,
    );
    const projectIndex = projects.findIndex((project) => project.UUID === UUID);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
    const deletedProject: ProjectEntity = projects.splice(projectIndex, 1)[0];
    this.writeToJSON(this.filePath, projects);
    return deletedProject;
  }

  async getProjectByName(name: string): Promise<ProjectEntity> {
    const projects: ProjectEntity[] = await this.readFromJSON<ProjectEntity>(
      this.filePath,
    );
    const project: ProjectEntity | undefined = projects.find(
      (project) => project.metadata.name === name,
    );
    if (!project) {
      throw new NotFoundException(`Project ${name} cannot be found`);
    }
    return project;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listProjects(): Promise<ProjectEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const projects: ProjectEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const project: ProjectEntity = await this.readFromJSON<ProjectEntity>(
          filePath,
        );
        if (project) {
          projects.push(project);
        }
      }
    }
    return projects;
  }

  async getProject(UUID: string): Promise<ProjectEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<ProjectEntity>(filePath);
    } else {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
  }

  async createProject(
    createProjectRequestDTO: CreateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const newUUID: string = uuidV4();
    const newProjectMetadata: ProjectMetadataEntity = plainToInstance(
      ProjectMetadataEntity,
      createProjectRequestDTO.metadata,
    );
    const newProjectContent: ProjectContentEntity = plainToInstance(
      ProjectContentEntity,
      createProjectRequestDTO.content,
    );
    const newProject: ProjectEntity = new ProjectEntity(
      newUUID,
      newProjectMetadata,
      newProjectContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newProject);
    return newProject;
  }

  async updateProject(
    UUID: string,
    updateProjectRequestDTO: UpdateProjectRequestDTO,
  ): Promise<ProjectEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const project: ProjectEntity = await this.readFromJSON<ProjectEntity>(
        filePath,
      );
      if (!project) {
        throw new NotFoundException(`Project ${UUID} cannot be found`);
      }
      const updatedProjectMetadata: ProjectMetadataEntity = {
        ...project.metadata,
        ...instanceToPlain(updateProjectRequestDTO.metadata),
      };
      const updatedProjectContent: ProjectContentEntity = {
        ...project.content,
        ...instanceToPlain(updateProjectRequestDTO.content),
      };
      const updatedProject = new ProjectEntity(
        UUID,
        updatedProjectMetadata,
        updatedProjectContent,
      );
      this.writeToJSON(filePath, updatedProject);
      return updatedProject;
    } else {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
  }

  async deleteProject(UUID: string): Promise<ProjectEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedProject: ProjectEntity =
        await this.readFromJSON<ProjectEntity>(filePath);
      if (!deletedProject) {
        throw new NotFoundException(`Project ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedProject;
    } else {
      throw new NotFoundException(`Project ${UUID} cannot be found`);
    }
  }

  async getProjectByName(name: string): Promise<ProjectEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const projects = await this.readFromJSON<ProjectEntity[]>(filePath);
        const project = projects.find(
          (project) => project.metadata.name === name,
        );
        if (project) {
          return project;
        }
      }
    }
    throw new NotFoundException(`Project ${name} cannot be found`);
  }
}
