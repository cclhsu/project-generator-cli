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
import { IterationDTO } from '../../iteration/dto/iteration.dto';
import { TaskDTO } from '../../task/dto/task.dto';
import { TeamDTO } from '../../team/dto/team.dto';
import { IdUuidStatusDTO } from '../../../common/dto';

export class ProjectContentDTO {
  constructor(
    description: string,
    iterations: IdUuidStatusDTO[],
    backlog: IdUuidStatusDTO[],
    team?: IdUuidStatusDTO,
  ) {
    this.description = description;
    this.iterations = iterations;
    this.backlog = backlog;
    this.team = team;
  }

  @ApiProperty({
    description: 'Description of the project content.',
    example: 'Develop new feature set.',
  })
  @Expose({ name: 'description', toPlainOnly: true })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'An array of iteration DTOs.',
    type: () => IdUuidStatusDTO,
    isArray: true,
  })
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsArray({ message: 'Iterations must be an array' })
  @ValidateNested({ each: true })
  iterations: IdUuidStatusDTO[];

  @ApiProperty({
    description: 'An array of task DTOs.',
    type: () => IdUuidStatusDTO,
    isArray: true,
  })
  @Expose({ name: 'backlog', toPlainOnly: true })
  @IsArray({ message: 'Backlog must be an array' })
  @ValidateNested({ each: true })
  backlog: IdUuidStatusDTO[];

  @ApiProperty()
  @Expose({ name: 'team', toPlainOnly: true })
  @IsOptional()
  @IsObject({ message: 'Team must be an object' })
  @Type(() => TeamDTO)
  @ValidateNested({ each: true })
  team?: IdUuidStatusDTO | undefined;
}
