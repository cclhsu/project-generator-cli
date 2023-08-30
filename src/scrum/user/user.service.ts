import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserEntity } from './entity/user.entity';
import { UserLocalRepository as UserRepository } from './repository/user-local.repository';
import { UserMetadataDTO } from './dto/user-metadata.dto';
import { UserContentDTO } from './dto/user-content.dto';
import {
  UpdateUserContentRequestDTO,
  UpdateUserMetadataRequestDTO,
  UserContentResponseDTO,
  UserIdUuidDTO,
  UserMetadataResponseDTO,
} from './dto';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    return this.userRepository.listUserIdsAndUUIDs();
  }

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
    const {
      ID,
      UUID,
      metadata: { name },
      content: { email },
    } = createUserRequestDTO;

    if (await this.isUserExist(name, email, ID, UUID)) {
      throw new Error(
        'User with the same name, email, ID, or UUID already exists',
      );
    }

    const error = await validateDtoMetadataContent<CreateUserRequestDTO>(
      createUserRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

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

    const dates: CommonDateDTO = updateCommonDates(
      user.metadata.dates,
      updateUserRequestDTO.metadata.dates,
    );
    updateUserRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateUserRequestDTO>(
      updateUserRequestDTO,
    );
    if (error) {
      throw new Error(error);
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

  async getUserByID(ID: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.getUserByID(ID);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  async getUserByName(name: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.getUserByName(name);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  async listUsersWithMetadata(): Promise<UserMetadataResponseDTO[]> {
    const users = await this.userRepository.listUsers();
    return users.map((user) => this.convertToUserMetadataResponse(user));
  }

  async updateUserMetadata(
    uuid: string,
    updateUserMetadataRequestDTO: UpdateUserMetadataRequestDTO,
  ): Promise<UserMetadataResponseDTO> {
    // Check if user exists
    const user = await this.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      user.metadata.dates,
      updateUserMetadataRequestDTO.metadata.dates,
    );
    updateUserMetadataRequestDTO.metadata.dates = dates;

    // Update the user
    const updatedUserMetadata: UserMetadataDTO =
      await this.userRepository.updateUserMetadata(
        uuid,
        updateUserMetadataRequestDTO.metadata,
      );

    if (!updatedUserMetadata) {
      throw new Error('Failed to update user');
    }

    this.logger.log(`User: ${JSON.stringify(updatedUserMetadata, null, 2)}`);
    return new UserMetadataResponseDTO(user.ID, uuid, updatedUserMetadata);
  }

  async updateUserContent(
    uuid: string,
    updateUserContentRequestDTO: UpdateUserContentRequestDTO,
  ): Promise<UserContentResponseDTO> {
    // Check if user exists
    const user = await this.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   user.metadata.dates,
    //   updateUserContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateUserContentRequestDTO.metadata.dates = dates;

    // Update the user
    const updatedUserContent: UserContentDTO =
      await this.userRepository.updateUserContent(
        uuid,
        updateUserContentRequestDTO.content,
      );

    if (!updatedUserContent) {
      throw new Error('Failed to update user');
    }

    this.logger.log(`User: ${JSON.stringify(updatedUserContent, null, 2)}`);
    return new UserContentResponseDTO(user.ID, uuid, updatedUserContent);
  }

  async getUserMetadata(uuid: string): Promise<UserMetadataResponseDTO> {
    const user = await this.userRepository.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return new UserMetadataResponseDTO(user.ID, uuid, user.metadata);
  }

  async getUserContent(uuid: string): Promise<UserContentResponseDTO> {
    const user = await this.userRepository.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return new UserContentResponseDTO(user.ID, uuid, user.content);
  }

  // Other methods...

  async isUserExist(
    name: string,
    email: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const userByName = await this.userRepository.getUserByName(name);
      if (userByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by name: ${name}`);
      }
    }

    try {
      const userByEmail = await this.userRepository.getUserByEmail(email);
      if (userByEmail) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by email: ${email}`);
      }
    }

    try {
      const userByID = await this.userRepository.getUserByID(ID);
      if (userByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by ID: ${ID}`);
      }
    }

    try {
      const userByUUID = await this.userRepository.getUser(UUID);
      if (userByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by UUID: ${UUID}`);
      }
    }
    return false;
  }

  async isNoUsersExist(): Promise<boolean> {
    const users = await this.userRepository.listUsers();
    return users.length === 0;
  }

  async isExactlyOneUserExist(): Promise<boolean> {
    const users = await this.userRepository.listUsers();
    return users.length === 1;
  }

  async isAtLeastOneUserExist(): Promise<boolean> {
    const users = await this.userRepository.listUsers();
    return users.length >= 1;
  }

  convertToUserResponse(user: UserEntity): UserResponseDTO {
    this.logger.verbose(`Converting user: ${JSON.stringify(user, null, 2)}`);
    const userMetadata: UserMetadataDTO = new UserMetadataDTO(
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
      user.ID,
      user.UUID,
      userMetadata,
      userContent,
    );
    return userResponse;
  }

  convertToUserResponseList(users: UserEntity[]): UserResponseDTO[] {
    this.logger.verbose(`Converting users: ${JSON.stringify(users, null, 2)}`);
    const userResponseList: UserResponseDTO[] = users.map((user) => {
      const userMetadata: UserMetadataDTO = new UserMetadataDTO(
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
        user.ID,
        user.UUID,
        userMetadata,
        userContent,
      );
      return userResponse;
    });

    return userResponseList;
  }

  private convertToUserMetadataResponse(
    user: UserEntity,
  ): UserMetadataResponseDTO {
    const userMetadata: UserMetadataDTO = new UserMetadataDTO(
      user.metadata.name,
      user.metadata.dates,
    );
    return new UserMetadataResponseDTO(user.ID, user.UUID, userMetadata);
  }
}
