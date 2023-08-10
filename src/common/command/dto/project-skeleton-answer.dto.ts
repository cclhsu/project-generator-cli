import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectSkeletonAnswerDTO {
  constructor(projectSkeleton: string) {
    this.projectSkeleton = projectSkeleton;
  }
  @ApiProperty()
  @IsString()
  projectSkeleton: string;
}
