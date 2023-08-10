import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { COMPLEXITY_LEVELS_ENUM } from '../../common/constant/complexity-level.constant';
import { UNCERTAINTY_LEVEL_ENUM } from '../../common/constant/uncertainty-level.constant';
import { DEPENDENCY_LEVELS_ENUM } from '../../common/constant/dependency-level.constant';
import { EFFORT_LEVEL_ENUM } from '../../common/constant/effort-level.constant';

export class TaskStoryPointsEntity {
  constructor(
    complexity: COMPLEXITY_LEVELS_ENUM,
    uncertainty: UNCERTAINTY_LEVEL_ENUM,
    dependency: DEPENDENCY_LEVELS_ENUM,
    effort: EFFORT_LEVEL_ENUM,
    total: number,
  ) {
    this.complexity = complexity;
    this.uncertainty = uncertainty;
    this.dependency = dependency;
    this.effort = effort;
    this.total = total;
  }

  @ApiProperty()
  @Expose({ name: 'complexity', toPlainOnly: true })
  @IsString()
  complexity: COMPLEXITY_LEVELS_ENUM;

  @ApiProperty()
  @Expose({ name: 'uncertainty', toPlainOnly: true })
  @IsString()
  uncertainty: UNCERTAINTY_LEVEL_ENUM;

  @ApiProperty()
  @Expose({ name: 'dependency', toPlainOnly: true })
  @IsString()
  dependency: DEPENDENCY_LEVELS_ENUM;

  @ApiProperty()
  @Expose({ name: 'effort', toPlainOnly: true })
  @IsString()
  effort: EFFORT_LEVEL_ENUM;

  @ApiProperty()
  @Expose({ name: 'total', toPlainOnly: true })
  @IsString()
  total: number;
}
