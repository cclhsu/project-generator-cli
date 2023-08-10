import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTeamRequestDTO } from './dto/create-team-request.dto';
import { UpdateTeamRequestDTO } from './dto/update-team-request.dto';
import { TeamResponseDTO } from './dto/team-response.dto';
import { TeamEntity } from './entity/team.entity';
import { TeamLocalRepository as TeamRepository } from './repository/team-local.repository';
import { TeamMetadataDTO } from './dto/team-metadata.dto';
import { TeamContentDTO } from './dto/team-content.dto';
// import { TeamPrismaRepository as TeamRepository } from './repositories/team-prisma.repository';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(private readonly teamRepository: TeamRepository) {}

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
    const name: string = createTeamRequestDTO.metadata.name;

    try {
      // Check if team already exists
      const teamExists = await this.getTeamByName(name);
      if (teamExists) {
        throw new Error('Team already exists');
      }
    } catch (NotFoundException) {}

    // Create the team
    const team = await this.teamRepository.createTeam(createTeamRequestDTO);
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  async updateTeam(
    uuid: string,
    updateTeamRequestDTO: TeamResponseDTO,
  ): Promise<TeamResponseDTO> {
    // Check if team exists
    const team = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
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

  async getTeamByName(name: string): Promise<TeamResponseDTO> {
    const team = await this.teamRepository.getTeamByName(name);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  // Other methods...

  convertToTeamResponse(team: TeamEntity): TeamResponseDTO {
    const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
      team.metadata.ID,
      team.metadata.name,
      team.metadata.dates,
    );
    const teamContent: TeamContentDTO = new TeamContentDTO(
      team.content.members,
      team.content.productOwner,
      team.content.scrumMaster,
    );
    const teamResponse: TeamResponseDTO = new TeamResponseDTO(
      team.UUID,
      teamMetadata,
      teamContent,
    );
    return teamResponse;
  }

  convertToTeamResponseList(teams: TeamEntity[]): TeamResponseDTO[] {
    const teamResponseList: TeamResponseDTO[] = teams.map((team) => {
      const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
        team.metadata.ID,
        team.metadata.name,
        team.metadata.dates,
      );
      const teamContent: TeamContentDTO = new TeamContentDTO(
        team.content.members,
        team.content.productOwner,
        team.content.scrumMaster,
      );
      const teamResponse: TeamResponseDTO = new TeamResponseDTO(
        team.UUID,
        teamMetadata,
        teamContent,
      );
      return teamResponse;
    });

    return teamResponseList;
  }
}
