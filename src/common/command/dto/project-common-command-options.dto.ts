import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import {
  GIT_PROVIDER_TYPE_ARRAY,
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPES,
  DEFAULT_PROJECT_LANGUAGE,
  PROJECT_LANGUAGE_TYPES,
  PROJECT_LANGUAGE_TYPE_ARRAY,
  DEFAULT_PROJECT_TEMPLATE_TYPE,
  PROJECT_TEMPLATE_TYPES,
  PROJECT_TEMPLATE_TYPE_ARRAY,
} from '../../../common/constant';

export class ProjectCommonCommandOptionsDTO {
  constructor(
    configPath: string,
    templateRoot: string,
    srcRoot: string,
    gitProvider: GIT_PROVIDER_TYPES = DEFAULT_GIT_PROVIDER,
  ) {
    this.configPath = configPath;
    this.templateRoot = templateRoot;
    this.srcRoot = srcRoot;
    this.gitProvider = gitProvider;
  }

  @ApiProperty({
    description: 'The path to the configuration file.',
    example: '/path/to/config.json',
  })
  @IsString()
  @IsOptional()
  configPath?: string;

  @ApiProperty({
    description: 'The path to the template file.',
    example: '/path/to/config.json',
  })
  @IsString()
  @IsOptional()
  templateRoot?: string;

  @ApiProperty({
    description: 'Root directory path for the source code.',
    example: '/path/to/src',
  })
  @IsString({ message: 'Source root must be a string.' })
  @IsOptional()
  srcRoot?: string;

  @ApiProperty({
    description: 'Git provider',
    example: GIT_PROVIDER_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_GIT_PROVIDER,
  })
  @Expose({ name: 'gitProvider', toPlainOnly: true })
  @IsEnum(GIT_PROVIDER_TYPE_ARRAY, {
    message:
      'Invalid git provider type. Allowed values: ' +
      GIT_PROVIDER_TYPE_ARRAY.join(', '),
    context: {
      reason: 'gitProvider',
    },
  })
  @IsOptional()
  gitProvider?: GIT_PROVIDER_TYPES;

  // @ApiProperty({
  //   description: 'Project Language',
  //   example: PROJECT_LANGUAGE_TYPE_ARRAY,
  //   type: [String],
  //   default: DEFAULT_PROJECT_LANGUAGE,
  // })
  // @Expose({ name: 'projectLanguage', toPlainOnly: true })
  // @IsEnum(PROJECT_LANGUAGE_TYPE_ARRAY, {
  //   message:
  //     'Invalid project language type. Allowed values: ' +
  //     PROJECT_LANGUAGE_TYPE_ARRAY.join(', '),
  //   context: {
  //     reason: 'projectLanguage',
  //   },
  // })
  // projectLanguage?: PROJECT_LANGUAGE_TYPES;

  // @ApiProperty({
  //   description: 'Project Type',
  //   example: PROJECT_TEMPLATE_TYPE_ARRAY,
  //   type: [String],
  //   default: DEFAULT_PROJECT_TEMPLATE_TYPE,
  // })
  // @Expose({ name: 'projectType', toPlainOnly: true })
  // @IsEnum(PROJECT_TEMPLATE_TYPE_ARRAY, {
  //   message:
  //     'Invalid project type type. Allowed values: ' +
  //     PROJECT_TEMPLATE_TYPE_ARRAY.join(', '),
  //   context: {
  //     reason: 'projectType',
  //   },
  // })
  // projectType?: PROJECT_TEMPLATE_TYPES;

  @ApiProperty({
    description: 'Name or identifier of the project skeleton.',
    example: 'basic-template',
  })
  @IsString({ message: 'Project skeleton must be a string.' })
  @IsOptional()
  projectSkeleton?: string;

  @ApiProperty({
    description: 'Name or identifier of the project team.',
    example: 'frontend-team',
  })
  @IsString({ message: 'Project team must be a string.' })
  @IsOptional()
  projectTeam?: string;

  @ApiProperty({
    description: 'Username or identifier of the project user.',
    example: 'john.doe',
  })
  @IsString({ message: 'Project user must be a string.' })
  @IsOptional()
  projectUser?: string;

  // @ApiProperty({
  //   description: 'Ticket number in the format "PPP-XXXX".',
  //   example: 'ABC-1234',
  // })
  // @IsString({ message: 'Ticket number must be a string.' })
  // @Matches(/^[A-Z]{3}-\d{4}$/, {
  //   message: 'Ticket number should follow the format "PPP-XXXX".',
  // })
  // @IsOptional()
  // ticketNumber?: string;

  // @ApiProperty({
  //   description: 'Name of the project.',
  //   example: 'My Awesome Project',
  // })
  // @IsString({ message: 'Project name must be a string.' })
  // projectName?: string;

  // @ApiProperty({
  //   description: 'Name of the module',
  //   example: 'user-management',
  // })
  // @Expose({ name: 'moduleName', toPlainOnly: true })
  // @IsString({ message: 'Module name must be a string' })
  // @MinLength(3, { message: 'Module name must have at least 3 characters' })
  // @MaxLength(50, { message: 'Module name cannot exceed 50 characters' })
  // moduleName?: string;

  // @ApiProperty()
  // @IsBoolean()
  // gitEnable?: boolean;
}
