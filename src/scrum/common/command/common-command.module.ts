import { AssigneeAnswerDTO } from './dto/assignee-answer.dto';
import { AssigneeQuestions } from './question/assignee.question';
import { BlockedTasksAnswerDTO } from './dto/blocked-tasks-answer.dto';
import { BlockedTasksQuestions } from './question/blocked-tasks.question';
import { CompletedByAnswerDTO } from './dto/completed-by-answer.dto';
import { CompletedByQuestions } from './question/completed-by.question';
import { CompletedDateAnswerDTO } from './dto/completed-date-answer.dto';
import { CompletedDateQuestions } from './question/completed-date.question';
import { ContentAnswerDTO } from './dto/content-answer.dto';
import { ContentQuestions } from './question/content.question';
import { CreatedByAnswerDTO } from './dto/created-by-answer.dto';
import { CreatedByQuestions } from './question/created-by.question';
import { CreatedDateAnswerDTO } from './dto/created-date-answer.dto';
import { CreatedDateQuestions } from './question/created-date.question';
import { DescriptionAnswerDTO } from './dto/description-answer.dto';
import { DescriptionQuestions } from './question/description.question';
import { EmailAnswerDTO } from 'src/user/command/dto/email-answer.dto';
import { EmailQuestions } from './question/email.question';
import { EndDateAnswerDTO } from './dto/end-date-answer.dto';
import { EndDateQuestions } from './question/end-date.question';
import { GoalAnswerDTO } from './dto/goal-answer.dto';
import { GoalQuestions } from './question/goal.question';
import { IdAnswerDTO } from './dto/id-answer.dto';
import { IdQuestions } from './question/id.question';
import { MembersAnswerDTO } from './dto/members-answer.dto';
import { MembersQuestions } from './question/members.question';
import { Module } from '@nestjs/common';
import { NameAnswerDTO } from './dto/name-answer.dto';
import { NameQuestions } from './question/name.question';
import { ParentAnswerDTO } from './dto/parent-answer.dto';
import { ParentQuestions } from './question/parent.question';
import { PasswordAnswerDTO } from './dto/password-answer.dto';
import { PasswordQuestions } from './question/password.question';
import { PhoneAnswerDTO } from './dto/phone-answer.dto';
import { PhoneQuestions } from './question/phone.question';
import { PredecessorsAnswerDTO } from './dto/predecessors-answer.dto';
import { PredecessorsQuestions } from './question/predecessors.question';
import { ProductOwnerAnswerDTO } from './dto/product-owner-answer.dto';
import { ProductOwnerQuestions } from './question/product-owner.question';
import { ProjectStatusAnswerDTO } from './dto/project-status-answer.dto';
import { ProjectStatusQuestions } from './question/project-status.question';
import { RelatedTasksAnswerDTO } from './dto/related-tasks-answer.dto';
import { RelatedTasksQuestions } from './question/related-tasks.question';
import { ScrumMasterAnswerDTO } from './dto/scrum-master-answer.dto';
import { ScrumMasterQuestions } from './question/scrum-master.question';
import { StartDateAnswerDTO } from './dto/start-date-answer.dto';
import { StartDateQuestions } from './question/start-date.question';
import { StartedByAnswerDTO } from './dto/started-by-answer.dto';
import { StartedByQuestions } from './question/started-by.question';
import { StartedDateAnswerDTO } from './dto/started-date-answer.dto';
import { StartedDateQuestions } from './question/started-date.question';
import { SubtasksAnswerDTO } from './dto/subtasks-answer.dto';
import { SubtasksQuestions } from './question/subtasks.question';
import { SuccessorsAnswerDTO } from './dto/successors-answer.dto';
import { TagsAnswerDTO } from './dto/tags-answer.dto';
import { TagsQuestions } from './question/tags.question';
import { TaskComplexityAnswerDTO } from './dto/task-complexity-answer.dto';
import { TaskComplexityQuestions } from './question/task-complexity.question';
import { TaskDependencyAnswerDTO } from './dto/task-dependency-answer.dto';
import { TaskDependencyQuestions } from './question/task-dependency.question';
import { TaskEffortAnswerDTO } from './dto/task-effort-answer.dto';
import { TaskEffortQuestions } from './question/task-effort.question';
import { TaskPriorityAnswerDTO } from './dto/task-priority-answer.dto';
import { TaskPriorityQuestions } from './question/task-priority.question';
import { TaskRiskAnswerDTO } from './dto/task-risk-answer.dto';
import { TaskRiskQuestions } from './question/task-risk.question.';
import { TaskStatusAnswerDTO } from './dto/task-status-answer.dto';
import { TaskStatusQuestions } from './question/task-status.question';
import { TaskTypeAnswerDTO } from './dto/task-type-answer.dto';
import { TaskTypeQuestions } from './question/task-type.question';
import { TaskUncertaintyAnswerDTO } from './dto/task-uncertainty-answer.dto';
import { TaskUncertaintyQuestions } from './question/task-uncertainty.question';
import { UpdatedByAnswerDTO } from './dto/updated-by-answer.dto';
import { UpdatedByQuestions } from './question/updated-by.question';
import { UpdatedDateAnswerDTO } from './dto/updated-date-answer.dto';
import { UpdatedDateQuestions } from './question/updated-date.question';
import { UrlAnswerDTO } from './dto/url-answer.dto';
import { UrlQuestions } from './question/url.question';
import { UserNameAnswerDTO } from './dto/username-answer.dto';
import { UserNameQuestions } from './question/username.question';
import { UuidAnswerDTO } from '../../common/command/dto/uuid-answer.dto';
import { UuidQuestions } from './question/uuid.question';

@Module({
  providers: [
    AssigneeAnswerDTO,
    AssigneeQuestions,
    BlockedTasksAnswerDTO,
    BlockedTasksQuestions,
    CompletedByAnswerDTO,
    CompletedByQuestions,
    CompletedDateAnswerDTO,
    CompletedDateQuestions,
    ContentAnswerDTO,
    ContentQuestions,
    CreatedByAnswerDTO,
    CreatedByQuestions,
    CreatedDateAnswerDTO,
    CreatedDateQuestions,
    DescriptionAnswerDTO,
    DescriptionQuestions,
    EmailAnswerDTO,
    EmailQuestions,
    EndDateAnswerDTO,
    EndDateQuestions,
    GoalAnswerDTO,
    GoalQuestions,
    IdAnswerDTO,
    IdQuestions,
    MembersAnswerDTO,
    MembersQuestions,
    NameAnswerDTO,
    NameQuestions,
    ParentAnswerDTO,
    ParentQuestions,
    PasswordAnswerDTO,
    PasswordQuestions,
    PhoneAnswerDTO,
    PhoneQuestions,
    PredecessorsAnswerDTO,
    PredecessorsQuestions,
    ProductOwnerAnswerDTO,
    ProductOwnerQuestions,
    ProjectStatusAnswerDTO,
    ProjectStatusQuestions,
    RelatedTasksAnswerDTO,
    RelatedTasksQuestions,
    ScrumMasterAnswerDTO,
    ScrumMasterQuestions,
    StartDateAnswerDTO,
    StartDateQuestions,
    StartedByAnswerDTO,
    StartedByQuestions,
    StartedDateAnswerDTO,
    StartedDateQuestions,
    SubtasksAnswerDTO,
    SubtasksQuestions,
    SubtasksQuestions,
    SuccessorsAnswerDTO,
    TagsAnswerDTO,
    TagsQuestions,
    TaskComplexityAnswerDTO,
    TaskComplexityQuestions,
    TaskDependencyAnswerDTO,
    TaskDependencyQuestions,
    TaskEffortAnswerDTO,
    TaskEffortQuestions,
    TaskPriorityAnswerDTO,
    TaskPriorityQuestions,
    TaskRiskAnswerDTO,
    TaskRiskQuestions,
    TaskStatusAnswerDTO,
    TaskStatusQuestions,
    TaskTypeAnswerDTO,
    TaskTypeQuestions,
    TaskUncertaintyAnswerDTO,
    TaskUncertaintyQuestions,
    UpdatedByAnswerDTO,
    UpdatedByQuestions,
    UpdatedDateAnswerDTO,
    UpdatedDateQuestions,
    UrlAnswerDTO,
    UrlQuestions,
    UserNameAnswerDTO,
    UserNameQuestions,
    UuidAnswerDTO,
    UuidQuestions,
  ],
  exports: [
    AssigneeAnswerDTO,
    AssigneeQuestions,
    BlockedTasksAnswerDTO,
    BlockedTasksQuestions,
    CompletedByAnswerDTO,
    CompletedByQuestions,
    CompletedDateAnswerDTO,
    CompletedDateQuestions,
    ContentAnswerDTO,
    ContentQuestions,
    CreatedByAnswerDTO,
    CreatedByQuestions,
    CreatedDateAnswerDTO,
    CreatedDateQuestions,
    DescriptionAnswerDTO,
    DescriptionQuestions,
    EmailAnswerDTO,
    EmailQuestions,
    EndDateAnswerDTO,
    EndDateQuestions,
    GoalAnswerDTO,
    GoalQuestions,
    IdAnswerDTO,
    IdQuestions,
    MembersAnswerDTO,
    MembersQuestions,
    NameAnswerDTO,
    NameQuestions,
    ParentAnswerDTO,
    ParentQuestions,
    PasswordAnswerDTO,
    PasswordQuestions,
    PhoneAnswerDTO,
    PhoneQuestions,
    PredecessorsAnswerDTO,
    PredecessorsQuestions,
    ProductOwnerAnswerDTO,
    ProductOwnerQuestions,
    ProjectStatusAnswerDTO,
    ProjectStatusQuestions,
    RelatedTasksAnswerDTO,
    RelatedTasksQuestions,
    ScrumMasterAnswerDTO,
    ScrumMasterQuestions,
    StartDateAnswerDTO,
    StartDateQuestions,
    StartedByAnswerDTO,
    StartedByQuestions,
    StartedDateAnswerDTO,
    StartedDateQuestions,
    SubtasksAnswerDTO,
    SubtasksQuestions,
    SubtasksQuestions,
    SuccessorsAnswerDTO,
    TagsAnswerDTO,
    TagsQuestions,
    TaskComplexityAnswerDTO,
    TaskComplexityQuestions,
    TaskDependencyAnswerDTO,
    TaskDependencyQuestions,
    TaskEffortAnswerDTO,
    TaskEffortQuestions,
    TaskPriorityAnswerDTO,
    TaskPriorityQuestions,
    TaskRiskAnswerDTO,
    TaskRiskQuestions,
    TaskStatusAnswerDTO,
    TaskStatusQuestions,
    TaskTypeAnswerDTO,
    TaskTypeQuestions,
    TaskUncertaintyAnswerDTO,
    TaskUncertaintyQuestions,
    UpdatedByAnswerDTO,
    UpdatedByQuestions,
    UpdatedDateAnswerDTO,
    UpdatedDateQuestions,
    UrlAnswerDTO,
    UrlQuestions,
    UserNameAnswerDTO,
    UserNameQuestions,
    UuidAnswerDTO,
    UuidQuestions,
  ],
})
export class CommonCommandModule {}
