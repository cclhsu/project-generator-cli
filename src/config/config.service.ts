import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import {
  DEFAULT_CONFIG_NAME,
  CONFIG_TYPES,
  DEFAULT_CONFIG_TYPE,
} from '../common/constant';
import {
  getCsvConfigFilePath,
  getJsonConfigFilePath,
  getYamlConfigFilePath,
} from '../utils/config/config.utils';
import { ProjectCommonCommandOptionsDTO } from '..//common/command/dto/project-common-command-options.dto';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  //   onModuleInit() {
  //     throw new Error('Method not implemented.');
  //   }

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
  ) {}

  isConfigFileExists(
    projectName: string,
    configName = DEFAULT_CONFIG_NAME,
    configType = DEFAULT_CONFIG_TYPE,
  ): boolean {
    if (!CONFIG_TYPES.includes(configType)) {
      throw new Error(
        `Invalid configType. Allowed values are: ${CONFIG_TYPES.join(', ')}`,
      );
    }

    if (configName === CONFIG_TYPES[0]) {
      const jsonConfigFile: string = getJsonConfigFilePath(
        projectName,
        configName,
      );
      return fs.existsSync(jsonConfigFile);
    }
    if (configName === CONFIG_TYPES[1]) {
      const yamlConfigFile: string = getYamlConfigFilePath(
        projectName,
        configName,
      );
      return fs.existsSync(yamlConfigFile);
    }
    if (configName === CONFIG_TYPES[2]) {
      const csvConfigFile: string = getCsvConfigFilePath(
        projectName,
        configName,
      );
      return fs.existsSync(csvConfigFile);
    }
    return false;
  }

  async listConfigs(): Promise<ProjectCommonCommandOptionsDTO> {
    this.logger.debug('>>> Listing configs');
    throw new Error('Method not implemented.');
  }

  async getConfig(
    projectName: string,
    configName = DEFAULT_CONFIG_NAME,
    configType = DEFAULT_CONFIG_TYPE,
  ): Promise<ProjectCommonCommandOptionsDTO> {
    this.logger.debug('>>> Getting config');
    if (!CONFIG_TYPES.includes(configType)) {
      throw new Error(
        `Invalid configType. Allowed values are: ${CONFIG_TYPES.join(', ')}`,
      );
    }

    if (configName === CONFIG_TYPES[0]) {
      const jsonConfigFile = await getJsonConfigFilePath(
        projectName,
        configName,
      );
      return await this.readConfigFromJSON(jsonConfigFile);
    }

    if (configName === CONFIG_TYPES[1]) {
      const yamlConfigFile = await getYamlConfigFilePath(
        projectName,
        configName,
      );
      return await this.readConfigFromYAML(yamlConfigFile);
    }

    if (configName === CONFIG_TYPES[2]) {
      const csvConfigFile = await getCsvConfigFilePath(projectName, configName);
      return await this.readConfigFromCSV(csvConfigFile);
    }

    return {} as ProjectCommonCommandOptionsDTO;
  }

  async createConfig(
    projectName: string,
    projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO,
    configName = DEFAULT_CONFIG_NAME,
    configType = DEFAULT_CONFIG_TYPE,
  ): Promise<void> {
    this.logger.debug('>>> Creating config');
    if (!CONFIG_TYPES.includes(configType)) {
      throw new Error(
        `Invalid configType. Allowed values are: ${CONFIG_TYPES.join(', ')}`,
      );
    }

    if (!this.isConfigFileExists(projectName)) {
      if (configName === CONFIG_TYPES[0]) {
        const jsonConfigFile = await getJsonConfigFilePath(
          projectName,
          configName,
        );
        await this.writeConfigToJSON(
          jsonConfigFile,
          projectCommonCommandOptionsDTO,
        );
      }

      if (configName === CONFIG_TYPES[1]) {
        const yamlConfigFile = await getYamlConfigFilePath(
          projectName,
          configName,
        );
        await this.writeConfigToYAML(
          yamlConfigFile,
          projectCommonCommandOptionsDTO,
        );
      }

      if (configName === CONFIG_TYPES[2]) {
        const csvConfigFile = await getCsvConfigFilePath(
          projectName,
          configName,
        );
        await this.writeConfigToCSV(
          csvConfigFile,
          projectCommonCommandOptionsDTO,
        );
      }
    }
  }

  async updateConfig(
    projectName: string,
    projectCommonCommandOptionsDTO: ProjectCommonCommandOptionsDTO,
    configName = DEFAULT_CONFIG_NAME,
    configType = DEFAULT_CONFIG_TYPE,
  ): Promise<void> {
    this.logger.debug('>>> Updating config');
    if (!CONFIG_TYPES.includes(configType)) {
      throw new Error(
        `Invalid configType. Allowed values are: ${CONFIG_TYPES.join(', ')}`,
      );
    }

    if (this.isConfigFileExists(projectName)) {
      if (configName === CONFIG_TYPES[0]) {
        const jsonConfigFile = await getJsonConfigFilePath(
          projectName,
          configName,
        );
        await this.writeConfigToJSON(
          jsonConfigFile,
          projectCommonCommandOptionsDTO,
        );
      }

      if (configName === CONFIG_TYPES[1]) {
        const yamlConfigFile = await getYamlConfigFilePath(
          projectName,
          configName,
        );
        await this.writeConfigToYAML(
          yamlConfigFile,
          projectCommonCommandOptionsDTO,
        );
      }

      if (configName === CONFIG_TYPES[2]) {
        const csvConfigFile = await getCsvConfigFilePath(
          projectName,
          configName,
        );
        await this.writeConfigToCSV(
          csvConfigFile,
          projectCommonCommandOptionsDTO,
        );
      }
    }
  }

  async deleteConfig(
    projectName: string,
    configName = DEFAULT_CONFIG_NAME,
    configType = DEFAULT_CONFIG_TYPE,
  ): Promise<void> {
    this.logger.debug('>>> Deleting config');
    if (!CONFIG_TYPES.includes(configType)) {
      throw new Error(
        `Invalid configType. Allowed values are: ${CONFIG_TYPES.join(', ')}`,
      );
    }

    if (this.isConfigFileExists(projectName)) {
      if (configName === CONFIG_TYPES[0]) {
        const jsonConfigFile = await getJsonConfigFilePath(
          projectName,
          configName,
        );
        await this.deleteFile(jsonConfigFile);
      }

      if (configName === CONFIG_TYPES[1]) {
        const yamlConfigFile = await getYamlConfigFilePath(
          projectName,
          configName,
        );
        await this.deleteFile(yamlConfigFile);
      }

      if (configName === CONFIG_TYPES[2]) {
        const csvConfigFile = await getCsvConfigFilePath(
          projectName,
          configName,
        );
        await this.deleteFile(csvConfigFile);
      }
    }
  }

  async readConfigFromJSON(
    filePath: string,
  ): Promise<ProjectCommonCommandOptionsDTO> {
    return this.readSingleFromJSON<ProjectCommonCommandOptionsDTO>(filePath);
  }

  async writeConfigToJSON(
    filePath: string,
    config: ProjectCommonCommandOptionsDTO,
  ): Promise<void> {
    this.writeSingleToJSON<ProjectCommonCommandOptionsDTO>(filePath, config);
  }

  async readConfigFromYAML(
    filePath: string,
  ): Promise<ProjectCommonCommandOptionsDTO> {
    return this.readSingleFromYAML<ProjectCommonCommandOptionsDTO>(filePath);
  }

  async writeConfigToYAML(
    filePath: string,
    config: ProjectCommonCommandOptionsDTO,
  ): Promise<void> {
    this.writeSingleToYAML<ProjectCommonCommandOptionsDTO>(filePath, config);
  }

  async readConfigFromCSV(
    filePath: string,
  ): Promise<ProjectCommonCommandOptionsDTO> {
    return this.readSingleFromCSV<ProjectCommonCommandOptionsDTO>(filePath);
  }

  async writeConfigToCSV(
    filePath: string,
    config: ProjectCommonCommandOptionsDTO,
  ): Promise<void> {
    this.writeSingleToCSV<ProjectCommonCommandOptionsDTO>(filePath, config);
  }

  async deleteFile(filePath: string): Promise<void> {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error('Error deleting file:', error);
      } else {
        console.log('File deleted successfully.');
      }
    });
  }
}
