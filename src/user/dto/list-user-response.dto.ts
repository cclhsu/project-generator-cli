import { UserResponseDTO } from './user-response.dto';

export class ListUserResponseDTO {
  constructor(users: UserResponseDTO[]) {
    this.users = users;
  }
  users: UserResponseDTO[];
}
