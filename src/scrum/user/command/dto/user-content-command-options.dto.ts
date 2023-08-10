import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { UserContentDTO } from 'src/scrum/user/dto/user-content.dto';
import e from 'express';
// import { Transform, Type } from 'class-transformer';

export class UserContentCommandOptionsDTO extends UserContentDTO {
  constructor(
    email: string,
    phone: string,
    lastName: string,
    firstName: string,
    projectRoles: string[],
    scrumRoles: string[],
    password: string,
  ) {
    super(
      email,
      phone,
      lastName,
      firstName,
      projectRoles,
      scrumRoles,
      password,
    );
  }
}
