import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { resolveHomePath } from 'src/utils/path/path.utils';
import { ProjectCommonCommandOptionsDto } from 'src/common/command/dto/project-common-command-options.dto';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  //   onModuleInit() {
  //     throw new Error('Method not implemented.');
  //   }

  configTypes = ['json', 'yaml', 'csv'];
  configType = this.configTypes[1];

  constructor(
    @Inject('ReadSingleFromJSON')
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToJSON')
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromYAML')
    private readonly readFromYAML: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToYAML')
    private readonly writeToYAML: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromCSV')
    private readonly readFromCSV: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToCSV')
    private readonly writeToCSV: <T>(filePath: string, data: T) => void,
  ) {}

  isConfigFileExists(projectName: string): boolean {
    if (this.configType === this.configTypes[0]) {
      const jsonConfigFile: string = this.getJsonConfigFile(projectName);
      return fs.existsSync(jsonConfigFile);
    }
    if (this.configType === this.configTypes[1]) {
      const yamlConfigFile: string = this.getYamlConfigFile(projectName);
      return fs.existsSync(yamlConfigFile);
    }
    if (this.configType === this.configTypes[2]) {
      const csvConfigFile: string = this.getCsvConfigFile(projectName);
      return fs.existsSync(csvConfigFile);
    }
    return false;
  }

  async listConfigs(): Promise<ProjectCommonCommandOptionsDto> {
    this.logger.log('>>> Listing configs');
    throw new Error('Method not implemented.');
  }

  async getConfig(
    projectName: string,
  ): Promise<ProjectCommonCommandOptionsDto> {
    this.logger.log('>>> Getting config');

    if (this.configType === this.configTypes[0]) {
      const jsonConfigFile = await this.getJsonConfigFile(projectName);
      return await this.readConfigFromJSON(jsonConfigFile);
    }

    if (this.configType === this.configTypes[1]) {
      const yamlConfigFile = await this.getYamlConfigFile(projectName);
      return await this.readConfigFromYAML(yamlConfigFile);
    }

    if (this.configType === this.configTypes[2]) {
      const csvConfigFile = await this.getCsvConfigFile(projectName);
      return await this.readConfigFromCSV(csvConfigFile);
    }

    return {} as ProjectCommonCommandOptionsDto;
  }

  async createConfig(
    projectName: string,
    projectCommonCommandOptionsDto: ProjectCommonCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> Creating config');

    if (!this.isConfigFileExists(projectName)) {
      if (this.configType === this.configTypes[0]) {
        const jsonConfigFile = await this.getJsonConfigFile(projectName);
        await this.writeConfigToJSON(
          jsonConfigFile,
          projectCommonCommandOptionsDto,
        );
      }

      if (this.configType === this.configTypes[1]) {
        const yamlConfigFile = await this.getYamlConfigFile(projectName);
        await this.writeConfigToYAML(
          yamlConfigFile,
          projectCommonCommandOptionsDto,
        );
      }

      if (this.configType === this.configTypes[2]) {
        const csvConfigFile = await this.getCsvConfigFile(projectName);
        await this.writeConfigToCSV(
          csvConfigFile,
          projectCommonCommandOptionsDto,
        );
      }
    }
  }

  async updateConfig(
    projectName: string,
    projectCommonCommandOptionsDto: ProjectCommonCommandOptionsDto,
  ): Promise<void> {
    this.logger.log('>>> Updating config');

    if (this.isConfigFileExists(projectName)) {
      if (this.configType === this.configTypes[0]) {
        const jsonConfigFile = await this.getJsonConfigFile(projectName);
        await this.writeConfigToJSON(
          jsonConfigFile,
          projectCommonCommandOptionsDto,
        );
      }

      if (this.configType === this.configTypes[1]) {
        const yamlConfigFile = await this.getYamlConfigFile(projectName);
        await this.writeConfigToYAML(
          yamlConfigFile,
          projectCommonCommandOptionsDto,
        );
      }

      if (this.configType === this.configTypes[2]) {
        const csvConfigFile = await this.getCsvConfigFile(projectName);
        await this.writeConfigToCSV(
          csvConfigFile,
          projectCommonCommandOptionsDto,
        );
      }
    }
  }

  async deleteConfig(projectName: string): Promise<void> {
    this.logger.log('>>> Deleting config');

    if (this.isConfigFileExists(projectName)) {
      if (this.configType === this.configTypes[0]) {
        const jsonConfigFile = await this.getJsonConfigFile(projectName);
        await this.deleteFile(jsonConfigFile);
      }

      if (this.configType === this.configTypes[1]) {
        const yamlConfigFile = await this.getYamlConfigFile(projectName);
        await this.deleteFile(yamlConfigFile);
      }

      if (this.configType === this.configTypes[2]) {
        const csvConfigFile = await this.getCsvConfigFile(projectName);
        await this.deleteFile(csvConfigFile);
      }
    }
  }

  getJsonConfigFile(projectName: string): string {
    const jsonConfigFile: string = resolveHomePath(
      ['${HOME}', '.config', projectName, 'project-command-options.json'].join(
        '/',
      ),
    );
    return jsonConfigFile;
  }

  getYamlConfigFile(projectName: string): string {
    const yamlConfigFile: string = resolveHomePath(
      ['${HOME}', '.config', projectName, 'project-command-options.yaml'].join(
        '/',
      ),
    );
    return yamlConfigFile;
  }

  getCsvConfigFile(projectName: string): string {
    const csvConfigFile: string = resolveHomePath(
      ['${HOME}', '.config', projectName, 'project-command-options.csv'].join(
        '/',
      ),
    );
    return csvConfigFile;
  }

  async readConfigFromJSON(
    filePath: string,
  ): Promise<ProjectCommonCommandOptionsDto> {
    return this.readFromJSON<ProjectCommonCommandOptionsDto>(filePath);
  }

  async writeConfigToJSON(
    filePath: string,
    config: ProjectCommonCommandOptionsDto,
  ): Promise<void> {
    this.writeToJSON<ProjectCommonCommandOptionsDto>(filePath, config);
  }

  async readConfigFromYAML(
    filePath: string,
  ): Promise<ProjectCommonCommandOptionsDto> {
    return this.readFromYAML<ProjectCommonCommandOptionsDto>(filePath);
  }

  async writeConfigToYAML(
    filePath: string,
    config: ProjectCommonCommandOptionsDto,
  ): Promise<void> {
    this.writeToYAML<ProjectCommonCommandOptionsDto>(filePath, config);
  }

  async readConfigFromCSV(
    filePath: string,
  ): Promise<ProjectCommonCommandOptionsDto> {
    return this.readFromCSV<ProjectCommonCommandOptionsDto>(filePath);
  }

  async writeConfigToCSV(
    filePath: string,
    config: ProjectCommonCommandOptionsDto,
  ): Promise<void> {
    this.writeToCSV<ProjectCommonCommandOptionsDto>(filePath, config);
  }

  async deleteFile(filePath: string): Promise<void> {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully.');
      }
    });
  }
}
