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
import { IterationEntity } from '../../iteration/entity/iteration.entity';
import { TaskEntity } from '../../task/entity/task.entity';
import { TeamEntity } from '../../team/entity/team.entity';
import { IdUuidStatusEntity } from '../../../common/entity';

export class ProjectContentEntity {
  constructor(
    description: string,
    iterations: IdUuidStatusEntity[],
    backlog: IdUuidStatusEntity[],
    team?: IdUuidStatusEntity,
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
    description: 'An array of iteration Entities.',
    type: () => IdUuidStatusEntity,
    isArray: true,
  })
  @Expose({ name: 'iterations', toPlainOnly: true })
  @IsArray({ message: 'Iterations must be an array' })
  @ValidateNested({ each: true })
  iterations: IdUuidStatusEntity[];

  @ApiProperty({
    description: 'An array of task Entities.',
    type: () => IdUuidStatusEntity,
    isArray: true,
  })
  @Expose({ name: 'backlog', toPlainOnly: true })
  @IsArray({ message: 'Backlog must be an array' })
  @ValidateNested({ each: true })
  backlog: IdUuidStatusEntity[];

  @ApiProperty()
  @Expose({ name: 'team', toPlainOnly: true })
  @IsOptional()
  @IsObject({ message: 'Team must be an object' })
  @Type(() => TeamEntity)
  @ValidateNested({ each: true })
  team?: IdUuidStatusEntity;
}
