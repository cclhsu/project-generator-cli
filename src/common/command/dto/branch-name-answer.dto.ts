import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class BranchNameAnswerDto {
  constructor(branchName: string) {
    this.branchName = branchName;
  }
  @ApiProperty()
  @IsString()
  branchName: string;
}
