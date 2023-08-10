import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';
export class CommonDateEntity {
  constructor(
    createdDate: Date,
    createdBy: string,
    updatedDate: Date,
    updatedBy: string,
    startedDate: Date | undefined,
    startedBy: string | undefined,
    startDate: Date | undefined,
    endDate: Date | undefined,
    completedDate: Date | undefined,
    completedBy: string | undefined,
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

  @ApiProperty()
  @Expose({ name: 'createdDate', toPlainOnly: true })
  @IsDateString()
  createdDate: Date; // Date when the task was created

  @ApiProperty()
  @Expose({ name: 'createdBy', toPlainOnly: true })
  @IsString()
  createdBy: string; // ID of the user who created

  @ApiProperty()
  @Expose({ name: 'updatedDate', toPlainOnly: true })
  @IsDateString()
  updatedDate: Date; // Date when the task was last updated

  @ApiProperty()
  @Expose({ name: 'updatedBy', toPlainOnly: true })
  @IsString()
  updatedBy: string; // ID of the user who last updated

  @ApiProperty()
  @Expose({ name: 'startedDate', toPlainOnly: true })
  @IsDateString()
  startedDate?: Date; // Start date of the task (optional)

  @ApiProperty()
  @Expose({ name: 'startedBy', toPlainOnly: true })
  @IsString()
  startedBy?: string; // ID of the user who started (optional)

  @ApiProperty()
  @Expose({ name: 'startDate', toPlainOnly: true })
  @IsDateString()
  startDate?: Date; // Start date of the task (optional)

  @ApiProperty()
  @Expose({ name: 'endDate', toPlainOnly: true })
  @IsDateString()
  endDate?: Date; // End/Due date of the task (optional)

  @ApiProperty()
  @Expose({ name: 'completedDate', toPlainOnly: true })
  @IsDateString()
  completedDate?: Date; // Date when the task was completed (optional)

  @ApiProperty()
  @Expose({ name: 'completedBy', toPlainOnly: true })
  @IsString()
  completedBy?: string; // ID of the user who completed (optional)
}
