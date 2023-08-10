import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { COMPLEXITY_LEVEL_TYPES } from '../../common/constant/complexity-level.constant';
import { UNCERTAINTY_LEVEL_TYPES } from '../../common/constant/uncertainty-level.constant';
import { DEPENDENCY_LEVELS_TYPES } from '../../common/constant/dependency-level.constant';
import { EFFORT_LEVELS_TYPES } from '../../common/constant/effort-level.constant';
// import { Transform, Type } from 'class-transformer';

// Use a DTO class
export class CreateStoryPointDTO {
  constructor(
    complexity: COMPLEXITY_LEVEL_TYPES,
    uncertainty: UNCERTAINTY_LEVEL_TYPES,
    dependency: DEPENDENCY_LEVELS_TYPES,
    effort: EFFORT_LEVELS_TYPES,
  ) {
    this.complexity = complexity;
    this.uncertainty = uncertainty;
    this.dependency = dependency;
    this.effort = effort;
  }

  complexity: COMPLEXITY_LEVEL_TYPES;
  uncertainty: UNCERTAINTY_LEVEL_TYPES;
  dependency: DEPENDENCY_LEVELS_TYPES;
  effort: EFFORT_LEVELS_TYPES;
}
