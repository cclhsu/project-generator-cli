export type PROJECT_FRAMEWORK_TYPES =
  | 'nest'
  | 'react'
  | 'electron'
  | 'next'
  | 'gin';
export const PROJECT_FRAMEWORK_TYPE_ARRAY = [
  'nest',
  'react',
  'electron',
  'next',
  'gin',
];
export const DEFAULT_PROJECT_FRAMEWORK = 'nest';
export enum PROJECT_FRAMEWORK_ENUM {
  NEST = 'nest',
  REACT = 'react',
  ELECTRON = 'electron',
  NEXT = 'next',
  GIN = 'gin',
}
export const ProjectFrameworkMap = {
  [PROJECT_FRAMEWORK_ENUM.NEST]: PROJECT_FRAMEWORK_ENUM.NEST,
  [PROJECT_FRAMEWORK_ENUM.REACT]: PROJECT_FRAMEWORK_ENUM.REACT,
  [PROJECT_FRAMEWORK_ENUM.ELECTRON]: PROJECT_FRAMEWORK_ENUM.ELECTRON,
  [PROJECT_FRAMEWORK_ENUM.NEXT]: PROJECT_FRAMEWORK_ENUM.NEXT,
  [PROJECT_FRAMEWORK_ENUM.GIN]: PROJECT_FRAMEWORK_ENUM.GIN,
};

export type PROJECT_LANGUAGE_TYPES = 'go' | 'python3' | 'rust' | 'typescript';
export const PROJECT_LANGUAGE_TYPE_ARRAY = [
  'go',
  'python3',
  'rust',
  'typescript',
];
export const DEFAULT_PROJECT_LANGUAGE = 'typescript';
export enum PROJECT_LANGUAGE_ENUM {
  GO = 'go',
  PYTHON3 = 'python3',
  RUST = 'rust',
  TYPESCRIPT = 'typescript',
}
export const ProjectLanguageMap = {
  [PROJECT_LANGUAGE_ENUM.GO]: PROJECT_LANGUAGE_ENUM.GO,
  [PROJECT_LANGUAGE_ENUM.PYTHON3]: PROJECT_LANGUAGE_ENUM.PYTHON3,
  [PROJECT_LANGUAGE_ENUM.RUST]: PROJECT_LANGUAGE_ENUM.RUST,
  [PROJECT_LANGUAGE_ENUM.TYPESCRIPT]: PROJECT_LANGUAGE_ENUM.TYPESCRIPT,
};

export type PROJECT_SUITE_TYPES = 'simple' | 'minimal' | 'full';
export const PROJECT_SUITE_TYPE_ARRAY = ['simple', 'minimal', 'full'];
export const DEFAULT_PROJECT_SUITE_TYPE = 'simple';
export enum PROJECT_SUITE_ENUM {
  SIMPLE = 'simple',
  MINIMAL = 'minimal',
  FULL = 'full',
}
export const ProjectSuiteMap = {
  [PROJECT_SUITE_ENUM.SIMPLE]: PROJECT_SUITE_ENUM.SIMPLE,
  [PROJECT_SUITE_ENUM.MINIMAL]: PROJECT_SUITE_ENUM.MINIMAL,
  [PROJECT_SUITE_ENUM.FULL]: PROJECT_SUITE_ENUM.FULL,
};

export type PROJECT_TEMPLATE_TYPES =
  | 'browser-extension'
  | 'cli'
  | 'common'
  | 'desktop-app'
  | 'document'
  | 'library'
  | 'mobile-app'
  | 'service'
  | 'vscode-extension'
  | 'web-app';
export const PROJECT_TEMPLATE_TYPE_ARRAY = [
  'browser-extension',
  'cli',
  'common',
  'desktop-app',
  'document',
  'library',
  'mobile-app',
  'service',
  'vscode-extension',
  'web-app',
  // 'algorithms',
  // 'hello-world',
  // 'sandbox',
  // 'coding-test',
];
export const DEFAULT_PROJECT_TEMPLATE_TYPE = 'common';
export enum PROJECT_TEMPLATE_ENUM {
  BROWSER_EXTENSION = 'browser-extension',
  CLI = 'cli',
  COMMON = 'common',
  DESKTOP_APP = 'desktop-app',
  DOCUMENT = 'document',
  LIBRARY = 'library',
  MOBILE_APP = 'mobile-app',
  SERVICE = 'service',
  VSCODE_EXTENSION = 'vscode-extension',
  WEB_APP = 'web-app',
  // ALGORITHMS = 'algorithms',
  // HELLO_WORLD = 'hello-world',
  // SANDBOX = 'sandbox',
  // CODING_TEST = 'coding-test',
}
export const ProjectTemplateMap = {
  [PROJECT_TEMPLATE_ENUM.BROWSER_EXTENSION]:
    PROJECT_TEMPLATE_ENUM.BROWSER_EXTENSION,
  [PROJECT_TEMPLATE_ENUM.CLI]: PROJECT_TEMPLATE_ENUM.CLI,
  [PROJECT_TEMPLATE_ENUM.COMMON]: PROJECT_TEMPLATE_ENUM.COMMON,
  [PROJECT_TEMPLATE_ENUM.DESKTOP_APP]: PROJECT_TEMPLATE_ENUM.DESKTOP_APP,
  [PROJECT_TEMPLATE_ENUM.DOCUMENT]: PROJECT_TEMPLATE_ENUM.DOCUMENT,
  [PROJECT_TEMPLATE_ENUM.LIBRARY]: PROJECT_TEMPLATE_ENUM.LIBRARY,
  [PROJECT_TEMPLATE_ENUM.MOBILE_APP]: PROJECT_TEMPLATE_ENUM.MOBILE_APP,
  [PROJECT_TEMPLATE_ENUM.SERVICE]: PROJECT_TEMPLATE_ENUM.SERVICE,
  [PROJECT_TEMPLATE_ENUM.VSCODE_EXTENSION]:
    PROJECT_TEMPLATE_ENUM.VSCODE_EXTENSION,
  [PROJECT_TEMPLATE_ENUM.WEB_APP]: PROJECT_TEMPLATE_ENUM.WEB_APP,
  // [PROJECT_TEMPLATE_ENUM.ALGORITHMS]: PROJECT_TEMPLATE_ENUM.ALGORITHMS,
  // [PROJECT_TEMPLATE_ENUM.HELLO_WORLD]: PROJECT_TEMPLATE_ENUM.HELLO_WORLD,
  // [PROJECT_TEMPLATE_ENUM.SANDBOX]: PROJECT_TEMPLATE_ENUM.SANDBOX,
  // [PROJECT_TEMPLATE_ENUM.CODING_TEST]: PROJECT_TEMPLATE_ENUM.CODING_TEST,
};

export const DEFAULT_SRC_ROOT_PATH = '.'; // ${HOME}/src
export const DEFAULT_PROJECT_SUITE_ROOT_PATH = '${HOME}/src';
export const DEFAULT_PROJECT_SUITE_NAME = 'project-suite';
