import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'config-path-questions' })
export class ConfigPathQuestions {
  @Question({
    message: 'Enter config-path:',
    name: 'configPath',
    type: 'input',
    default: '${HOME}/.config/project-suite-cli',
  })
  parseConfigPath(val: string): string {
    return val;
  }
}
