import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserEntity } from './entity/user.entity';
import { UserLocalRepository as UserRepository } from './repository/user-local.repository';
import { UserMetadataDTO } from './dto/user-metadata.dto';
import { UserContentDTO } from './dto/user-content.dto';
// import { UserPrismaRepository as UserRepository } from './repositories/user-prisma.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async listUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.listUsers();
    this.logger.log(`Users: ${JSON.stringify(users, null, 2)}`);
    return this.convertToUserResponseList(users);
  }

  async getUser(uuid: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserResponseDTO> {
    const name: string = createUserRequestDTO.metadata.name;

    try {
      // Check if user already exists
      const userExists = await this.getUserByName(name);
      if (userExists) {
        throw new Error('User already exists');
      }
    } catch (NotFoundException) {}

    // Create the user
    const user = await this.userRepository.createUser(createUserRequestDTO);
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  async updateUser(
    uuid: string,
    updateUserRequestDTO: UserResponseDTO,
  ): Promise<UserResponseDTO> {
    // Check if user exists
    const user = await this.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user
    const updatedUser = await this.userRepository.updateUser(
      uuid,
      updateUserRequestDTO,
    );

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    this.logger.log(`User: ${JSON.stringify(updatedUser, null, 2)}`);
    return this.convertToUserResponse(updatedUser);
  }

  async deleteUser(uuid: string): Promise<UserResponseDTO> {
    // Check if user exists
    const user = await this.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete the user
    const deleteUser = await this.userRepository.deleteUser(uuid);
    if (!deleteUser) {
      throw new Error('Failed to delete user');
    }

    this.logger.log(`User: ${JSON.stringify(deleteUser, null, 2)}`);
    return this.convertToUserResponse(deleteUser);
  }

  async getUserByName(name: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.getUserByName(name);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  // Other methods...

  convertToUserResponse(user: UserEntity): UserResponseDTO {
    const userMetadata: UserMetadataDTO = new UserMetadataDTO(
      user.metadata.ID,
      user.metadata.name,
      user.metadata.dates,
    );
    const userContent: UserContentDTO = new UserContentDTO(
      user.content.email,
      user.content.phone,
      user.content.lastName,
      user.content.firstName,
      user.content.projectRoles,
      user.content.scrumRoles,
      user.content.password,
    );
    const userResponse: UserResponseDTO = new UserResponseDTO(
      user.UUID,
      userMetadata,
      userContent,
    );
    return userResponse;
  }

  convertToUserResponseList(users: UserEntity[]): UserResponseDTO[] {
    const userResponseList: UserResponseDTO[] = users.map((user) => {
      const userMetadata: UserMetadataDTO = new UserMetadataDTO(
        user.metadata.ID,
        user.metadata.name,
        user.metadata.dates,
      );
      const userContent: UserContentDTO = new UserContentDTO(
        user.content.email,
        user.content.phone,
        user.content.lastName,
        user.content.firstName,
        user.content.projectRoles,
        user.content.scrumRoles,
        user.content.password,
      );
      const userResponse: UserResponseDTO = new UserResponseDTO(
        user.UUID,
        userMetadata,
        userContent,
      );
      return userResponse;
    });

    return userResponseList;
  }
}
