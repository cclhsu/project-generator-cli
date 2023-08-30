import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRolesAnswerDTO } from './project-roles-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_PROJECT_ROLE } from '../../constant';

describe('ProjectRolesAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectRolesAnswerDTO],
    }).compile();
  });

  describe('Project Roles', () => {
    it('should validate a valid project roles', async () => {
      const dto = new ProjectRolesAnswerDTO([DEFAULT_PROJECT_ROLE]);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectRolesAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project roles', async () => {
      const dto = new ProjectRolesAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectRolesAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid project roles in the type of PM, EM, DEV, QA, BA, UX, I',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
