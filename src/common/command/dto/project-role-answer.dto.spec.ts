import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRoleAnswerDTO } from './project-role-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_PROJECT_ROLE } from '../../constant';

describe('ProjectRoleAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectRoleAnswerDTO],
    }).compile();
  });

  describe('Project Role', () => {
    it('should validate a valid project role', async () => {
      const dto = new ProjectRoleAnswerDTO(DEFAULT_PROJECT_ROLE);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectRoleAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project role', async () => {
      const dto = new ProjectRoleAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectRoleAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid project role in the type of PM, EM, DEV, QA, BA, UX, I',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
