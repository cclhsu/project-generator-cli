export type GIT_PROVIDER_TYPES =
  | 'github.com'
  | 'gitlab.com'
  | 'bitbucket.org'
  | 'local'
  | 'mypProject';
export const GIT_PROVIDER_TYPE_ARRAY = [
  'github.com',
  'gitlab.com',
  'bitbucket.org',
  'local',
  'mypProject',
];
export const DEFAULT_GIT_PROVIDER = 'local'; // 'github.com' | 'myProject' | 'local'
export enum GIT_PROVIDER_ENUM {
  GITHUB = 'GitHub',
  GITLAB = 'GitLab',
  BITBUCKET = 'Bitbucket',
  LOCAL = 'Local',
  MYPROJECT = 'MyProject',
}
export const GIT_PROVIDER_MAP = {
  [GIT_PROVIDER_ENUM.GITHUB]: 'github.com',
  [GIT_PROVIDER_ENUM.GITLAB]: 'gitlab.com',
  [GIT_PROVIDER_ENUM.BITBUCKET]: 'bitbucket.org',
  [GIT_PROVIDER_ENUM.LOCAL]: 'local',
  [GIT_PROVIDER_ENUM.MYPROJECT]: 'mypProject',
};

export const GIT_PROVIDER_URLS = {
  'github.com': 'https://github.com',
  'gitlab.com': 'https://gitlab.com',
  'bitbucket.com': 'https://bitbucket.org',
  mypProject: 'http://localhost:3000',
  local: 'http://localhost:3000',
};
export const DEFAULT_GIT_PROVIDER_URL = GIT_PROVIDER_URLS[DEFAULT_GIT_PROVIDER];

export const GIT_PROVIDER_API_URLS = {
  'github.com': 'https://api.github.com',
  'gitlab.com': 'https://gitlab.com/api/v4',
  'bitbucket.org': 'https://api.bitbucket.org/2.0',
  mypProject: 'http://localhost:3000/api/v1',
  local: 'http://localhost:3000/api/v1',
};
export const DEFAULT_GIT_PROVIDER_API_URL =
  GIT_PROVIDER_API_URLS[DEFAULT_GIT_PROVIDER];

export const DEFAULT_INIT_BRANCH = 'main';
export const DEFAULT_INIT_COMMIT_MSG = '[PPP-XXXX] chore: Initial commit';
export const DEFAULT_DEVELOP_BRANCH = 'develop';
export const DEFAULT_FEATURE_BRANCH_PREFIX = 'feature';
export const DEFAULT_RELEASE_BRANCH_PREFIX = 'release';
export const DEFAULT_HOTFIX_BRANCH_PREFIX = 'hotfix';
export const DEFAULT_BUGFIX_BRANCH_PREFIX = 'bugfix';
export const DEFAULT_SUPPORT_BRANCH_PREFIX = 'support';
export const DEFAULT_GO_BRANCH = 'go';
export const DEFAULT_PYTHON3_BRANCH = 'python3';
export const DEFAULT_RUST_BRANCH = 'rust';
export const DEFAULT_TYPESCRIPT_BRANCH = 'typescript';
export const DEFAULT_BRANCHES = [
  // DEFAULT_INIT_BRANCH,
  // DEFAULT_DEVELOP_BRANCH,
  // DEFAULT_FEATURE_BRANCH_PREFIX,
  // DEFAULT_RELEASE_BRANCH_PREFIX,
  // DEFAULT_HOTFIX_BRANCH_PREFIX,
  // DEFAULT_BUGFIX_BRANCH_PREFIX,
  // DEFAULT_SUPPORT_BRANCH_PREFIX,
  DEFAULT_GO_BRANCH,
  DEFAULT_PYTHON3_BRANCH,
  DEFAULT_RUST_BRANCH,
  DEFAULT_TYPESCRIPT_BRANCH,
];
