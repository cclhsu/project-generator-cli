import { Module } from '@nestjs/common';
import { BranchNameAnswerDTO } from './dto/branch-name-answer.dto';
import { BranchNameQuestions } from './question/branch-name';
import { CommitMessageAnswerDTO } from './dto/commit-message-answer.dto';
import { CommitMessageQuestions } from './question/commit-message';
import { ConfigPathAnswerDTO } from './dto/config-path-answer.dto';
import { ConfigPathQuestions } from './question/config-path.question';
import { ConfirmDeleteAnswerDTO } from './dto/confirm-delete-answer.dto';
import { ConfirmDeleteQuestions } from './question/confirm-delete.question';
import { ConfirmUpdateAnswerDTO } from './dto/confirm-update-answer.dto';
import { ConfirmUpdateQuestions } from './question/confirm-update.question';
import { GitEnableAnswerDTO } from './dto/git-enable-answer.dto';
import { GitEnableQuestions } from './question/git-enable.question';
import { GitProviderAnswerDTO } from './dto/git-provider-answer.dto';
import { GitProviderQuestions } from './question/git-provider.question';
import { ModuleNameAnswerDTO } from './dto/module-name-answer.dto';
import { ModuleNameQuestions } from './question/module-user.question';
import { ProjectCommandOptionsDTO } from './dto/project-command-options.dto';
import { ProjectLanguageAnswerDTO } from './dto/project-language-answer.dto';
import { ProjectLanguageQuestions } from './question/project-language.question';
import { ProjectNameAnswerDTO } from './dto/project-name-answer.dto';
import { ProjectNameQuestions } from './question/project-name.question';
import { ProjectSkeletonAnswerDTO } from './dto/project-skeleton-answer.dto';
import { ProjectSkeletonQuestions } from './question/project-skeleton.question';
import { ProjectTeamAnswerDTO } from './dto/project-team-answer.dto';
import { ProjectTeamQuestions } from './question/project-team.question';
import { ProjectTypeAnswerDTO } from './dto/project-type-answer.dto';
import { ProjectTypeQuestions } from './question/project-type.question';
import { ProjectUserAnswerDTO } from './dto/project-user-answer.dto';
import { ProjectUserQuestions } from './question/project-user.question';
import { SrcRootAnswerDTO } from './dto/src-root-answer.dto';
import { SrcRootQuestions } from './question/src-root.question';
import { TemplateRootAnswerDTO } from './dto/template-root-answer.dto';
import { TemplateRootQuestions } from './question/template-root.question';
import { TicketNumberAnswerDTO } from './dto/ticket-number-answer.dto';
import { TicketNumberQuestions } from './question/ticket-number';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { UuidQuestions } from './question/uuid.question';

@Module({
  providers: [
    BranchNameAnswerDTO,
    BranchNameQuestions,
    CommitMessageAnswerDTO,
    CommitMessageQuestions,
    ConfigPathAnswerDTO,
    ConfigPathQuestions,
    ConfirmDeleteAnswerDTO,
    ConfirmDeleteQuestions,
    ConfirmUpdateAnswerDTO,
    ConfirmUpdateQuestions,
    GitEnableAnswerDTO,
    GitEnableQuestions,
    GitProviderAnswerDTO,
    GitProviderQuestions,
    ModuleNameAnswerDTO,
    ModuleNameQuestions,
    ProjectCommandOptionsDTO,
    ProjectLanguageAnswerDTO,
    ProjectLanguageQuestions,
    ProjectNameAnswerDTO,
    ProjectNameQuestions,
    ProjectSkeletonAnswerDTO,
    ProjectSkeletonQuestions,
    ProjectTeamAnswerDTO,
    ProjectTeamQuestions,
    ProjectTypeAnswerDTO,
    ProjectTypeQuestions,
    ProjectUserAnswerDTO,
    ProjectUserQuestions,
    SrcRootAnswerDTO,
    SrcRootQuestions,
    TemplateRootAnswerDTO,
    TemplateRootQuestions,
    TicketNumberAnswerDTO,
    TicketNumberQuestions,
    UuidAnswerDTO,
    UuidQuestions,
  ],
  exports: [
    BranchNameAnswerDTO,
    BranchNameQuestions,
    CommitMessageAnswerDTO,
    CommitMessageQuestions,
    ConfigPathAnswerDTO,
    ConfigPathQuestions,
    ConfirmDeleteAnswerDTO,
    ConfirmDeleteQuestions,
    ConfirmUpdateAnswerDTO,
    ConfirmUpdateQuestions,
    GitEnableAnswerDTO,
    GitEnableQuestions,
    GitProviderAnswerDTO,
    GitProviderQuestions,
    ModuleNameAnswerDTO,
    ModuleNameQuestions,
    ProjectCommandOptionsDTO,
    ProjectLanguageAnswerDTO,
    ProjectLanguageQuestions,
    ProjectNameAnswerDTO,
    ProjectNameQuestions,
    ProjectSkeletonAnswerDTO,
    ProjectSkeletonQuestions,
    ProjectTeamAnswerDTO,
    ProjectTeamQuestions,
    ProjectTypeAnswerDTO,
    ProjectTypeQuestions,
    ProjectUserAnswerDTO,
    ProjectUserQuestions,
    SrcRootAnswerDTO,
    SrcRootQuestions,
    TemplateRootAnswerDTO,
    TemplateRootQuestions,
    TicketNumberAnswerDTO,
    TicketNumberQuestions,
    UuidAnswerDTO,
    UuidQuestions,
  ],
})
export class CommonCommandModule {}
