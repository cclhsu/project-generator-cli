import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateTeamRequestDTO } from '../dto/create-team-request.dto';
import { UpdateTeamRequestDTO } from '../dto/update-team-request.dto';
import { TeamEntity } from '../entity/team.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { TeamMetadataEntity } from '../entity/team-metadata.entity';
import { TeamContentEntity } from '../entity/team-content.entity';
import { CommonDateEntity } from 'src/scrum/common/entity/common-date.entity';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import {
  DEFAULT_DATABASE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_DEVICE_TYPE,
  DEFAULT_FILE_STORAGE_EXTENSION,
  DEFAULT_STORAGE_DEVICE_TYPE,
  DEFAULT_STORAGE_FILE_TYPE,
  DEFAULT_TEAM_FILE_PATH,
  DEFAULT_TEAM_PATH,
  STORAGE_DEVICE_TYPES,
} from 'src/scrum/common/constant/repository.constant';
import { glob } from 'glob';
import { createDirectory } from 'src/utils/directory/directory.utils';
import { deleteFile } from 'src/utils/file/file.utils';

@Injectable()
export class TeamLocalRepository {
  private readonly logger = new Logger(TeamLocalRepository.name);
  private storageStrategy: StorageStrategy;

  private teams: TeamEntity[] = [];

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

  // Get all teams
  async listTeams(): Promise<TeamEntity[]> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.listTeams();
  }

  // Get a team by ID
  async getTeam(UUID: string): Promise<TeamEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTeam(UUID);
  }

  // Create a new team
  async createTeam(
    createTeamRequestDTO: CreateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.createTeam(createTeamRequestDTO);
  }

  // Update a team by ID
  async updateTeam(
    UUID: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.updateTeam(UUID, updateTeamRequestDTO);
  }

  // Delete a team by ID
  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.deleteTeam(UUID);
  }

  // Get a team by name
  async getTeamByName(name: string): Promise<TeamEntity> {
    const storage: StorageStrategy = this.getStorageStrategy();
    return storage.getTeamByName(name);
  }

  private getStorageStrategy(): StorageStrategy {
    if (DEFAULT_STORAGE_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_STORAGE_DEVICE_TYPE === 'json') {
        if (DEFAULT_STORAGE_FILE_TYPE === 'single') {
          return new SingleJsonStorage(
            DEFAULT_TEAM_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_STORAGE_FILE_TYPE === 'multiple') {
          return new MultipleJsonStorage(
            DEFAULT_TEAM_PATH,
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
    return String(this.teams.length + 1);
    // return uuidv4();
  }

  async readTeamFromJSON(filePath: string): Promise<TeamEntity> {
    return this.readSingleFromJSON<TeamEntity>(filePath);
  }

  async writeTeamToJSON(filePath: string, team: TeamEntity): Promise<void> {
    this.writeSingleToJSON<TeamEntity>(filePath, team);
  }

  async readTeamFromYAML(filePath: string): Promise<TeamEntity> {
    return this.readSingleFromYAML<TeamEntity>(filePath);
  }

  async writeTeamToYAML(filePath: string, team: TeamEntity): Promise<void> {
    this.writeSingleToYAML<TeamEntity>(filePath, team);
  }

  async readTeamFromCSV(filePath: string): Promise<TeamEntity> {
    return this.readSingleFromCSV<TeamEntity>(filePath);
  }

  async writeTeamToCSV(filePath: string, team: TeamEntity): Promise<void> {
    this.writeSingleToCSV<TeamEntity>(filePath, team);
  }

  async readTeamsFromJSON(filePath: string): Promise<TeamEntity[]> {
    return this.readArrayFromJSON<TeamEntity>(filePath);
  }

  async writeTeamsToJSON(filePath: string, teams: TeamEntity[]): Promise<void> {
    this.writeArrayToJSON<TeamEntity>(filePath, teams);
  }

  async readTeamsFromYAML(filePath: string): Promise<TeamEntity[]> {
    return this.readArrayFromYAML<TeamEntity>(filePath);
  }

  async writeTeamsToYAML(filePath: string, teams: TeamEntity[]): Promise<void> {
    this.writeArrayToYAML<TeamEntity>(filePath, teams);
  }

  async readTeamsFromCSV(filePath: string): Promise<TeamEntity[]> {
    return this.readArrayFromCSV<TeamEntity>(filePath);
  }

  async writeTeamsToCSV(filePath: string, teams: TeamEntity[]): Promise<void> {
    this.writeArrayToCSV<TeamEntity>(filePath, teams);
  }
}

interface StorageStrategy {
  listTeams(): Promise<TeamEntity[]>;
  getTeam(UUID: string): Promise<TeamEntity>;
  createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity>;
  updateTeam(
    UUID: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamEntity>;
  deleteTeam(UUID: string): Promise<TeamEntity>;
  getTeamByName(name: string): Promise<TeamEntity>;
}

class MemoryStorage implements StorageStrategy {
  private readonly logger = new Logger(MemoryStorage.name);
  private teams: TeamEntity[] = [
    new TeamEntity(
      '00000000-0000-0000-0000-000000000001',
      new TeamMetadataEntity(
        'ABC-123',
        'Team 1',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
        ),
      ),
      new TeamContentEntity(['john.doe', 'jane.doe'], 'john.doe', 'jane.doe'),
    ),
    new TeamEntity(
      '00000000-0000-0000-0000-000000000002',
      new TeamMetadataEntity(
        'XYZ-789',
        'Team 2',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
        ),
      ),
      new TeamContentEntity(['john.doe', 'jane.doe'], 'john.doe', 'jane.doe'),
    ),
  ];

  async listTeams(): Promise<TeamEntity[]> {
    return this.teams;
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const team: TeamEntity | undefined = this.teams.find(
      (team) => team.UUID === UUID,
    );
    if (!team) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    return team;
  }

  async createTeam(
    createTeamRequestDTO: CreateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const newUUID: string = uuidV4();
    const newTeamMetadata: TeamMetadataEntity = plainToInstance(
      TeamMetadataEntity,
      createTeamRequestDTO.metadata,
    );
    const newTeamContent: TeamContentEntity = plainToInstance(
      TeamContentEntity,
      createTeamRequestDTO.content,
    );
    const newTeam: TeamEntity = new TeamEntity(
      newUUID,
      newTeamMetadata,
      newTeamContent,
    );
    this.teams.push(newTeam);
    return newTeam;
  }

  async updateTeam(
    UUID: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const teamIndex = this.teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const updatedTeamMetadata: TeamMetadataEntity = {
      ...this.teams[teamIndex].metadata,
      ...instanceToPlain(updateTeamRequestDTO.metadata),
    };
    const updatedTeamContent: TeamContentEntity = {
      ...this.teams[teamIndex].content,
      ...updateTeamRequestDTO.content,
    };
    const updatedTeam = new TeamEntity(
      UUID,
      updatedTeamMetadata,
      updatedTeamContent,
    );
    this.teams[teamIndex] = updatedTeam;
    return updatedTeam;
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const teamIndex = this.teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const deletedTeam: TeamEntity = this.teams.splice(teamIndex, 1)[0];
    return deletedTeam;
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    const team: TeamEntity | undefined = this.teams.find(
      (team) => team.metadata.name === name,
    );
    if (!team) {
      throw new NotFoundException(`Team ${name} cannot be found`);
    }
    return team;
  }
}

class SingleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(SingleJsonStorage.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listTeams(): Promise<TeamEntity[]> {
    return this.readFromJSON<TeamEntity>(this.filePath);
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(
      this.filePath,
    );
    const team: TeamEntity | undefined = teams.find(
      (team) => team.UUID === UUID,
    );
    if (!team) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    return team;
  }

  async createTeam(
    createTeamRequestDTO: CreateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(
      this.filePath,
    );
    const newUUID: string = uuidV4();
    const newTeamMetadata: TeamMetadataEntity = plainToInstance(
      TeamMetadataEntity,
      createTeamRequestDTO.metadata,
    );
    const newTeamContent: TeamContentEntity = plainToInstance(
      TeamContentEntity,
      createTeamRequestDTO.content,
    );
    const newTeam: TeamEntity = new TeamEntity(
      newUUID,
      newTeamMetadata,
      newTeamContent,
    );
    teams.push(newTeam);
    this.writeToJSON(this.filePath, teams);
    return newTeam;
  }

  async updateTeam(
    UUID: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(
      this.filePath,
    );
    const teamIndex = teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const updatedTeamMetadata: TeamMetadataEntity = {
      ...teams[teamIndex].metadata,
      ...instanceToPlain(updateTeamRequestDTO.metadata),
    };
    const updatedTeamContent: TeamContentEntity = {
      ...teams[teamIndex].content,
      ...updateTeamRequestDTO.content,
    };
    const updatedTeam = new TeamEntity(
      UUID,
      updatedTeamMetadata,
      updatedTeamContent,
    );
    teams[teamIndex] = updatedTeam;
    this.writeToJSON(this.filePath, teams);
    return updatedTeam;
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(
      this.filePath,
    );
    const teamIndex = teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const deletedTeam: TeamEntity = teams.splice(teamIndex, 1)[0];
    this.writeToJSON(this.filePath, teams);
    return deletedTeam;
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(
      this.filePath,
    );
    const team: TeamEntity | undefined = teams.find(
      (team) => team.metadata.name === name,
    );
    if (!team) {
      throw new NotFoundException(`Team ${name} cannot be found`);
    }
    return team;
  }
}

class MultipleJsonStorage implements StorageStrategy {
  private readonly logger = new Logger(MultipleJsonStorage.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listTeams(): Promise<TeamEntity[]> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    const teams: TeamEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
        if (team) {
          teams.push(team);
        }
      }
    }
    return teams;
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<TeamEntity>(filePath);
    } else {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
  }

  async createTeam(
    createTeamRequestDTO: CreateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const newUUID: string = uuidV4();
    const newTeamMetadata: TeamMetadataEntity = plainToInstance(
      TeamMetadataEntity,
      createTeamRequestDTO.metadata,
    );
    const newTeamContent: TeamContentEntity = plainToInstance(
      TeamContentEntity,
      createTeamRequestDTO.content,
    );
    const newTeam: TeamEntity = new TeamEntity(
      newUUID,
      newTeamMetadata,
      newTeamContent,
    );
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.writeToJSON(filePath, newTeam);
    return newTeam;
  }

  async updateTeam(
    UUID: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    if (existsSync(filePath)) {
      const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!team) {
        throw new NotFoundException(`Team ${UUID} cannot be found`);
      }
      const updatedTeamMetadata: TeamMetadataEntity = {
        ...team.metadata,
        ...instanceToPlain(updateTeamRequestDTO.metadata),
      };
      const updatedTeamContent: TeamContentEntity = {
        ...team.content,
        ...updateTeamRequestDTO.content,
      };
      const updatedTeam = new TeamEntity(
        UUID,
        updatedTeamMetadata,
        updatedTeamContent,
      );
      this.writeToJSON(filePath, updatedTeam);
      return updatedTeam;
    } else {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_STORAGE_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedTeam: TeamEntity = await this.readFromJSON<TeamEntity>(
        filePath,
      );
      if (!deletedTeam) {
        throw new NotFoundException(`Team ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedTeam;
    } else {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    const filesPath: string[] = glob.sync(
      `${this.dirPath}/*.${DEFAULT_FILE_STORAGE_EXTENSION}`,
    );
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const teams = await this.readFromJSON<TeamEntity[]>(filePath);
        const team = teams.find((team) => team.metadata.name === name);
        if (team) {
          return team;
        }
      }
    }
    throw new NotFoundException(`Team ${name} cannot be found`);
  }
}
