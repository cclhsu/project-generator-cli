export class UserStoryDTO {
  constructor(role: string, goal: string, benefit: string) {
    this.role = role;
    this.goal = goal;
    this.benefit = benefit;
  }
  role: string;
  goal: string;
  benefit: string;
}

// Function to print UserStory as a sentence
export function printUserStory(userStory: UserStoryDTO): string {
  return `As a ${userStory.role}, I want to ${userStory.goal}, so that I can ${userStory.benefit}.`;
}

// Example usage:
// const userStory: UserStoryDTO = {
//   role: "registered user",
//   goal: "log in to my account",
//   benefit: "access personalized content and features"
// };
