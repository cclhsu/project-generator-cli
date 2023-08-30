import {
  CommandRunner,
  InquirerService,
  SubCommand,
  Option,
} from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { DocumentService } from '../document.service';
import { DocumentCommandOptionsDTO } from './dto/document-command-options.dto';
import { getDocumentCommandOptionsDTO } from './document-command.utils';
import {
  DOCUMENT_TEMPLATE_TYPES,
  DEFAULT_VARIABLE_FILE_PATH,
} from '../../common/constant';

@Injectable()
@SubCommand({
  name: 'generate',
  description: 'A command to generate a document project',
  options: { isDefault: true },
})
export class GenerateDocumentCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateDocumentCommand.name);
  constructor(
    private readonly inquirer: InquirerService,
    private readonly configService: ConfigService,
    private readonly documentService: DocumentService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {
    this.logger.debug('>>> generating document');
    // this.logger.debug(passedParams);
    // this.logger.debug(options);

    // check if config file not exists
    const documentCommandOptionsDTO: DocumentCommandOptionsDTO =
      await getDocumentCommandOptionsDTO(
        this.configService,
        this.inquirer,
        options,
      );

    try {
      await this.documentService.generateDocument(documentCommandOptionsDTO);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // @Option({
  //   flags: '-c, --config-path [configPath]',
  //   defaultValue: '${HOME}/.config/project-suite-cli',
  //   description: 'Your config path',
  // })
  // parseConfigPath(val: string): string {
  //   return val;
  // }

  @Option({
    flags: '-t, --template-root [templateRoot]',
    defaultValue: 'template',
    description: 'Your template root',
  })
  parseTemplateRoot(val: string): string {
    return val;
  }

  @Option({
    flags: '-v, --variables-file-path [documentVariablesFilePath]',
    defaultValue: DEFAULT_VARIABLE_FILE_PATH,
    description: 'Your variables file path',
  })
  parseDocumentVariablesFilePath(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --variables-file-name [documentVariablesFileName]',
    defaultValue: 'document-variables.json',
    description: 'Your variables file name',
  })
  parseDocumentVariablesFileName(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --document-type [documentType]',
    // defaultValue: DOCUMENT_TEMPLATE_TYPES[0],
    description: 'Your document type',
    choices: DOCUMENT_TEMPLATE_TYPES,
  })
  parseDocumentType(val: string): string {
    if (DOCUMENT_TEMPLATE_TYPES.includes(val)) {
      return val;
    } else {
      throw new Error('Document type is not valid');
    }
  }

  @Option({
    flags: '-f, --document-file-path [documentFilePath]',
    defaultValue: '.',
    description: 'Your document file path',
  })
  parseDocumentFilePath(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --document-file-name [documentFileName]',
    // defaultValue: 'document.md',
    description: 'Your document file name',
  })
  parseDocumentFileName(val: string): string {
    return val;
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main document generate --help
// node ./dist/cmd.main document generate -s src -g github -l document -t library -e team -u user -n project -m module
