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

export class TeamContentEntity {
  constructor(members: string[], productOwner: string, scrumMaster: string) {
    this.members = members;
    this.productOwner = productOwner;
    this.scrumMaster = scrumMaster;
  }

  @ApiProperty()
  @Expose({ name: 'members', toPlainOnly: true })
  @IsArray()
  members: string[]; // IDs of team members in the Team Metadata

  @ApiProperty()
  @Expose({ name: 'productOwner', toPlainOnly: true })
  @IsString()
  productOwner: string; // ID of the user who is the Product Owner of the Scrum Team

  @ApiProperty()
  @Expose({ name: 'scrumMaster', toPlainOnly: true })
  @IsString()
  scrumMaster: string; // ID of the user who is the Scrum Master of the Scrum Team
}
