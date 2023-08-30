import { Test, TestingModule } from '@nestjs/testing';
import { ProjectStatusAnswerDTO } from './project-status-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_PROJECT_STATUS } from '../../../common/constant';

describe('ProjectStatusAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectStatusAnswerDTO],
    }).compile();
  });

  describe('Project Status', () => {
    it('should validate a valid project status', async () => {
      const dto = new ProjectStatusAnswerDTO(DEFAULT_PROJECT_STATUS);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectStatusAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project status', async () => {
      const dto = new ProjectStatusAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectStatusAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid project status in the type of PLANNED, IN_PROGRESS, COMPLETED',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
