import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { DocumentService } from '../document.service';
import { GetDocumentVariablesTemplateCommand } from './get-document-variables-template.command';
import { GenerateDocumentCommand } from './generate-document.command';

@Injectable()
@Command({
  name: 'document',
  description: 'A set of commands for managing document project',
  arguments: '<action> [options]',
  subCommands: [GetDocumentVariablesTemplateCommand, GenerateDocumentCommand],
})
export class DocumentCommand extends CommandRunner {
  private readonly logger = new Logger(DocumentCommand.name);
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
    // throw new Error('Method not implemented.');
    this.logger.debug('>>> Running document command');
  }
}

// npm run build
// nestjs build
// node ./dist/cmd.main document --help
// node ./dist/cmd.main document

// node ./dist/cmd.main document -s src -g github -l document -t library -e team -u user -n project -m module
