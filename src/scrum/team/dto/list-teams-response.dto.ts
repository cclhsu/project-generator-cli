import { TeamResponseDTO } from './team-response.dto';

export class ListTeamResponseDTO {
  constructor(teams: TeamResponseDTO[]) {
    this.teams = teams;
  }
  teams: TeamResponseDTO[];
}
