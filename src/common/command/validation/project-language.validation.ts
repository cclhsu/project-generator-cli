import { Answers } from 'inquirer';
import { PROJECT_LANGUAGE_TYPE_ARRAY } from '../../../common/constant';

const projectLanguageMessage: Answers = {
  requiredMessage: 'Please enter an project language',
  invalidMessage: 'Please enter a valid project language',
  errorMessage:
    'Please enter a valid project language in the type of go, python3, rust, typescript',
};

// Validation function for ProjectLanguage
export function isValidProjectLanguage(projectLanguage: string): boolean {
  return (
    PROJECT_LANGUAGE_TYPE_ARRAY.includes(projectLanguage) &&
    projectLanguage !== 'n/a'
  );
}

export function validateProjectLanguage(
  val: string,
  answers?: Answers,
): boolean | string {
  if (val.trim() !== '' && val.trim() !== 'n/a') {
    if (isValidProjectLanguage(val)) {
      return true;
    } else {
      return projectLanguageMessage.errorMessage;
    }
  } else {
    return projectLanguageMessage.requiredMessage;
  }
}
