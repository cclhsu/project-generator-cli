import { ProjectResponseDTO } from './project-response.dto';

export class ListProjectResponseDTO {
  constructor(projects: ProjectResponseDTO[]) {
    this.projects = projects;
  }
  projects: ProjectResponseDTO[];
}
