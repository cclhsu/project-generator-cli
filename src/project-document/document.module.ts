import { Module } from '@nestjs/common';
// import { DocumentController } from './document.controller';
import { ConfigModule } from '../config/config.module';
import { DocumentCommand } from './command/document.command';
import { DocumentFileNameQuestions } from './command/question/document-file-name.question';
import { DocumentFilePathQuestions } from './command/question/document-file-path.question';
import { DocumentService } from './document.service';
import { DocumentTypeQuestions } from './command/question/document-type.question';
import { DocumentVariablesFileNameQuestions } from './command/question/document-variables-file-name.question';
import { DocumentVariablesFilePathQuestions } from './command/question/document-variables-file-path.question';
import { GenerateDocumentCommand } from './command/generate-document.command';
import { GetDocumentVariablesTemplateCommand } from './command/get-document-variables-template.command';

@Module({
  imports: [ConfigModule],
  // controllers: [
  //   DocumentController,
  // ],
  providers: [
    DocumentService,
    DocumentCommand,
    DocumentFileNameQuestions,
    DocumentFilePathQuestions,
    DocumentTypeQuestions,
    DocumentVariablesFileNameQuestions,
    DocumentVariablesFilePathQuestions,
    GenerateDocumentCommand,
    GetDocumentVariablesTemplateCommand,
  ],
  exports: [DocumentService],
})
export class DocumentModule {}
