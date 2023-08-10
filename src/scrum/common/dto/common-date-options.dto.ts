import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
import { createGitRepository } from 'src/utils/git/git.utils';

export class CommonDateCommandOptionsDTO {
  constructor(
    createdDate: Date,
    createdBy: string,
    updatedDate: Date,
    updatedBy: string,
    startedDate?: Date,
    startedBy?: string,
    startDate?: Date,
    endDate?: Date,
    completedDate?: Date,
    completedBy?: string,
  ) {
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
    this.startedDate = startedDate;
    this.startedBy = startedBy;
    this.startDate = startDate;
    this.endDate = endDate;
    this.completedDate = completedDate;
    this.completedBy = completedBy;
  }
  createdDate: Date; // Date when the task was created
  createdBy: string; // ID of the user who created
  updatedDate: Date; // Date when the task was last updated
  updatedBy: string; // ID of the user who last updated
  startedDate?: Date; // Start date of the task (optional)
  startedBy?: string; // ID of the user who started (optional)
  startDate?: Date; // Start date of the task (optional)
  endDate?: Date; // End/Due date of the task (optional)
  completedDate?: Date; // Date when the task was completed (optional)
  completedBy?: string; // ID of the user who completed (optional)
}
