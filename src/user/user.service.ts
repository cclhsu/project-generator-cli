import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserEntity } from './entity/user.entity';
import { UserLocalRepository as UserRepository } from './repository/user-local.repository';
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
    const { username } = createUserRequestDTO;

    try {
      // Check if user already exists
      const userExists = await this.getUserByUsername(username);
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
    updateUserRequestDTO: UpdateUserRequestDTO,
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

  async getUserByUsername(username: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  // Other methods...

  convertToUserResponse(user: UserEntity): UserResponseDTO {
    const userResponse: UserResponseDTO = {
      UUID: user.UUID,
      email: user.Email,
      phone: user.Phone,
      username: user.Username,
      // password: user.Password,
      // hash: user.Hash,
      createTimestamp: user.CreateTimestamp,
      updateTimestamp: user.UpdateTimestamp,
    };
    return userResponse;
  }

  convertToUserResponseList(users: UserEntity[]): UserResponseDTO[] {
    const userResponseList: UserResponseDTO[] = users.map((user) => {
      const userResponse: UserResponseDTO = {
        UUID: user.UUID,
        email: user.Email,
        phone: user.Phone,
        username: user.Username,
        // password: user.Password,
        // hash: user.Hash,
        createTimestamp: user.CreateTimestamp,
        updateTimestamp: user.UpdateTimestamp,
      };
      return userResponse;
    });

    return userResponseList;
  }
}
