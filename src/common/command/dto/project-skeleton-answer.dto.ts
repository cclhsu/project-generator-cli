import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ProjectSkeletonAnswerDto {
  constructor(projectSkeleton: string) {
    this.projectSkeleton = projectSkeleton;
  }
  @ApiProperty()
  @IsString()
  projectSkeleton: string;
}
