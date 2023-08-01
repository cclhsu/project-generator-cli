import { Module } from '@nestjs/common';
import { BranchNameAnswerDto } from './dto/branch-name-answer.dto';
import { BranchNameQuestions } from './question/branch-name';
import { CommitMessageAnswerDto } from './dto/commit-message-answer.dto';
import { CommitMessageQuestions } from './question/commit-message';
import { ConfigPathAnswerDto } from './dto/config-path-answer.dto';
import { ConfigPathQuestions } from './question/config-path.question';
import { ConfirmDeleteAnswerDto } from './dto/confirm-delete-answer.dto';
import { ConfirmDeleteQuestions } from './question/confirm-delete.question';
import { ConfirmUpdateAnswerDto } from './dto/confirm-update-answer.dto';
import { ConfirmUpdateQuestions } from './question/confirm-update.question';
import { GitEnableAnswerDto } from './dto/git-enable-answer.dto';
import { GitEnableQuestions } from './question/git-enable.question';
import { GitProviderAnswerDto } from './dto/git-provider-answer.dto';
import { GitProviderQuestions } from './question/git-provider.question';
import { ModuleNameAnswerDto } from './dto/module-name-answer.dto';
import { ModuleNameQuestions } from './question/module-user.question';
import { ProjectCommandOptionsDto } from './dto/project-command-options.dto';
import { ProjectLanguageAnswerDto } from './dto/project-language-answer.dto';
import { ProjectLanguageQuestions } from './question/project-language.question';
import { ProjectNameAnswerDto } from './dto/project-name-answer.dto';
import { ProjectNameQuestions } from './question/project-name.question';
import { ProjectSkeletonAnswerDto } from './dto/project-skeleton-answer.dto';
import { ProjectSkeletonQuestions } from './question/project-skeleton.question';
import { ProjectTeamAnswerDto } from './dto/project-team-answer.dto';
import { ProjectTeamQuestions } from './question/project-team.question';
import { ProjectTypeAnswerDto } from './dto/project-type-answer.dto';
import { ProjectTypeQuestions } from './question/project-type.question';
import { ProjectUserAnswerDto } from './dto/project-user-answer.dto';
import { ProjectUserQuestions } from './question/project-user.question';
import { SrcRootAnswerDto } from './dto/src-root-answer.dto';
import { SrcRootQuestions } from './question/src-root.question';
import { TemplateRootAnswerDto } from './dto/template-root-answer.dto';
import { TemplateRootQuestions } from './question/template-root.question';
import { TicketNumberAnswerDto } from './dto/ticket-number-answer.dto';
import { TicketNumberQuestions } from './question/ticket-number';
import { UuidAnswerDto } from './dto/uuid-answer.dto';
import { UuidQuestions } from './question/uuid.question';

@Module({
  providers: [
    BranchNameAnswerDto,
    BranchNameQuestions,
    CommitMessageAnswerDto,
    CommitMessageQuestions,
    ConfigPathAnswerDto,
    ConfigPathQuestions,
    ConfirmDeleteAnswerDto,
    ConfirmDeleteQuestions,
    ConfirmUpdateAnswerDto,
    ConfirmUpdateQuestions,
    GitEnableAnswerDto,
    GitEnableQuestions,
    GitProviderAnswerDto,
    GitProviderQuestions,
    ModuleNameAnswerDto,
    ModuleNameQuestions,
    ProjectCommandOptionsDto,
    ProjectLanguageAnswerDto,
    ProjectLanguageQuestions,
    ProjectNameAnswerDto,
    ProjectNameQuestions,
    ProjectSkeletonAnswerDto,
    ProjectSkeletonQuestions,
    ProjectTeamAnswerDto,
    ProjectTeamQuestions,
    ProjectTypeAnswerDto,
    ProjectTypeQuestions,
    ProjectUserAnswerDto,
    ProjectUserQuestions,
    SrcRootAnswerDto,
    SrcRootQuestions,
    TemplateRootAnswerDto,
    TemplateRootQuestions,
    TicketNumberAnswerDto,
    TicketNumberQuestions,
    UuidAnswerDto,
    UuidQuestions,
  ],
  exports: [
    BranchNameAnswerDto,
    BranchNameQuestions,
    CommitMessageAnswerDto,
    CommitMessageQuestions,
    ConfigPathAnswerDto,
    ConfigPathQuestions,
    ConfirmDeleteAnswerDto,
    ConfirmDeleteQuestions,
    ConfirmUpdateAnswerDto,
    ConfirmUpdateQuestions,
    GitEnableAnswerDto,
    GitEnableQuestions,
    GitProviderAnswerDto,
    GitProviderQuestions,
    ModuleNameAnswerDto,
    ModuleNameQuestions,
    ProjectCommandOptionsDto,
    ProjectLanguageAnswerDto,
    ProjectLanguageQuestions,
    ProjectNameAnswerDto,
    ProjectNameQuestions,
    ProjectSkeletonAnswerDto,
    ProjectSkeletonQuestions,
    ProjectTeamAnswerDto,
    ProjectTeamQuestions,
    ProjectTypeAnswerDto,
    ProjectTypeQuestions,
    ProjectUserAnswerDto,
    ProjectUserQuestions,
    SrcRootAnswerDto,
    SrcRootQuestions,
    TemplateRootAnswerDto,
    TemplateRootQuestions,
    TicketNumberAnswerDto,
    TicketNumberQuestions,
    UuidAnswerDto,
    UuidQuestions,
  ],
})
export class CommonCommandModule {}
