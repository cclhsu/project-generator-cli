import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTeamRequestDTO } from './dto/create-team-request.dto';
import { UpdateTeamRequestDTO } from './dto/update-team-request.dto';
import { TeamResponseDTO } from './dto/team-response.dto';
import { TeamEntity } from './entity/team.entity';
import { TeamLocalRepository as TeamRepository } from './repository/team-local.repository';
import { TeamMetadataDTO } from './dto/team-metadata.dto';
import { TeamContentDTO } from './dto/team-content.dto';
import {
  UpdateTeamContentRequestDTO,
  UpdateTeamMetadataRequestDTO,
  TeamContentResponseDTO,
  TeamMetadataResponseDTO,
  TeamIdUuidDTO,
} from './dto';
import { validateDtoMetadataContent } from '../../utils/validation/validation.utils';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/command/utils';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(private readonly teamRepository: TeamRepository) {}

  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    return this.teamRepository.listTeamIdsAndUUIDs();
  }

  async listTeams(): Promise<TeamResponseDTO[]> {
    const teams = await this.teamRepository.listTeams();
    this.logger.log(`Teams: ${JSON.stringify(teams, null, 2)}`);
    return this.convertToTeamResponseList(teams);
  }

  async getTeam(uuid: string): Promise<TeamResponseDTO> {
    const team = await this.teamRepository.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  async createTeam(
    createTeamRequestDTO: CreateTeamRequestDTO,
  ): Promise<TeamResponseDTO> {
    const {
      ID,
      UUID,
      metadata: { name },
    } = createTeamRequestDTO;

    if (await this.isTeamExist(name, ID, UUID)) {
      throw new Error('Team with the same name, ID, or UUID already exists');
    }

    const error = await validateDtoMetadataContent<CreateTeamRequestDTO>(
      createTeamRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Create the team
    const team = await this.teamRepository.createTeam(createTeamRequestDTO);
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  async updateTeam(
    uuid: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamResponseDTO> {
    // Check if team exists
    const team = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      team.metadata.dates,
      updateTeamRequestDTO.metadata.dates,
    );
    updateTeamRequestDTO.metadata.dates = dates;

    const error = await validateDtoMetadataContent<UpdateTeamRequestDTO>(
      updateTeamRequestDTO,
    );
    if (error) {
      throw new Error(error);
    }

    // Update the team
    const updatedTeam = await this.teamRepository.updateTeam(
      uuid,
      updateTeamRequestDTO,
    );

    if (!updatedTeam) {
      throw new Error('Failed to update team');
    }

    this.logger.log(`Team: ${JSON.stringify(updatedTeam, null, 2)}`);
    return this.convertToTeamResponse(updatedTeam);
  }

  async deleteTeam(uuid: string): Promise<TeamResponseDTO> {
    // Check if team exists
    const team = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Delete the team
    const deleteTeam = await this.teamRepository.deleteTeam(uuid);
    if (!deleteTeam) {
      throw new Error('Failed to delete team');
    }

    this.logger.log(`Team: ${JSON.stringify(deleteTeam, null, 2)}`);
    return this.convertToTeamResponse(deleteTeam);
  }

  async getTeamByID(ID: string): Promise<TeamResponseDTO> {
    const team = await this.teamRepository.getTeamByID(ID);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  async getTeamByName(name: string): Promise<TeamResponseDTO> {
    const team = await this.teamRepository.getTeamByName(name);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  async listTeamsWithMetadata(): Promise<TeamMetadataResponseDTO[]> {
    const teams = await this.teamRepository.listTeams();
    return teams.map((team) => this.convertToTeamMetadataResponse(team));
  }

  async updateTeamMetadata(
    uuid: string,
    updateTeamMetadataRequestDTO: UpdateTeamMetadataRequestDTO,
  ): Promise<TeamMetadataResponseDTO> {
    // Check if team exists
    const team = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const dates: CommonDateDTO = updateCommonDates(
      team.metadata.dates,
      updateTeamMetadataRequestDTO.metadata.dates,
    );
    updateTeamMetadataRequestDTO.metadata.dates = dates;

    // Update the team
    const updatedTeamMetadata: TeamMetadataDTO =
      await this.teamRepository.updateTeamMetadata(
        uuid,
        updateTeamMetadataRequestDTO.metadata,
      );

    if (!updatedTeamMetadata) {
      throw new Error('Failed to update team');
    }

    this.logger.log(`Team: ${JSON.stringify(updatedTeamMetadata, null, 2)}`);
    return new TeamMetadataResponseDTO(team.ID, uuid, updatedTeamMetadata);
  }

  async updateTeamContent(
    uuid: string,
    updateTeamContentRequestDTO: UpdateTeamContentRequestDTO,
  ): Promise<TeamContentResponseDTO> {
    // Check if team exists
    const team = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   team.metadata.dates,
    //   updateTeamContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateTeamContentRequestDTO.metadata.dates = dates;

    // Update the team
    const updatedTeamContent: TeamContentDTO =
      await this.teamRepository.updateTeamContent(
        uuid,
        updateTeamContentRequestDTO.content,
      );

    if (!updatedTeamContent) {
      throw new Error('Failed to update team');
    }

    this.logger.log(`Team: ${JSON.stringify(updatedTeamContent, null, 2)}`);
    return new TeamContentResponseDTO(team.ID, uuid, updatedTeamContent);
  }

  async getTeamMetadata(uuid: string): Promise<TeamMetadataResponseDTO> {
    const team = await this.teamRepository.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return new TeamMetadataResponseDTO(team.ID, uuid, team.metadata);
  }

  async getTeamContent(uuid: string): Promise<TeamContentResponseDTO> {
    const team = await this.teamRepository.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return new TeamContentResponseDTO(team.ID, uuid, team.content);
  }

  // Other methods...

  async isTeamExist(name: string, ID: string, UUID: string): Promise<boolean> {
    this.logger.debug(`Checking if team exists: ${name}, ${ID}, ${UUID}`);
    try {
      const teamByName = await this.teamRepository.getTeamByName(name);
      if (teamByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by name: ${name}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const teamByID = await this.teamRepository.getTeamByID(ID);
      if (teamByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by ID: ${ID}`);
      } else {
        this.logger.error(error);
      }
    }

    try {
      const teamByUUID = await this.teamRepository.getTeam(UUID);
      if (teamByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by UUID: ${UUID}`);
      } else {
        this.logger.error(error);
      }
    }
    return false;
  }

  async isNoTeamsExist(): Promise<boolean> {
    const teams = await this.teamRepository.listTeams();
    return teams.length === 0;
  }

  async isExactlyOneTeamExist(): Promise<boolean> {
    const teams = await this.teamRepository.listTeams();
    return teams.length === 1;
  }

  async isAtLeastOneTeamExist(): Promise<boolean> {
    const teams = await this.teamRepository.listTeams();
    return teams.length >= 1;
  }

  convertToTeamResponse(team: TeamEntity): TeamResponseDTO {
    this.logger.verbose(`Converting Team: ${JSON.stringify(team, null, 2)}`);
    const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
      team.metadata.name,
      team.metadata.dates,
    );
    const teamContent: TeamContentDTO = new TeamContentDTO(
      team.content.members,
      team.content.productOwner,
      team.content.scrumMaster,
    );
    const teamResponse: TeamResponseDTO = new TeamResponseDTO(
      team.ID,
      team.UUID,
      teamMetadata,
      teamContent,
    );
    return teamResponse;
  }

  convertToTeamResponseList(teams: TeamEntity[]): TeamResponseDTO[] {
    this.logger.verbose(`Converting Teams: ${JSON.stringify(teams, null, 2)}`);
    const teamResponseList: TeamResponseDTO[] = teams.map((team) => {
      const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
        team.metadata.name,
        team.metadata.dates,
      );
      const teamContent: TeamContentDTO = new TeamContentDTO(
        team.content.members,
        team.content.productOwner,
        team.content.scrumMaster,
      );
      const teamResponse: TeamResponseDTO = new TeamResponseDTO(
        team.ID,
        team.UUID,
        teamMetadata,
        teamContent,
      );
      return teamResponse;
    });

    return teamResponseList;
  }

  private convertToTeamMetadataResponse(
    team: TeamEntity,
  ): TeamMetadataResponseDTO {
    const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
      team.metadata.name,
      team.metadata.dates,
    );
    return new TeamMetadataResponseDTO(team.ID, team.UUID, teamMetadata);
  }
}
