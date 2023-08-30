import { Test, TestingModule } from '@nestjs/testing';
import { ProjectNameAnswerDTO } from './project-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('ProjectNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectNameAnswerDTO],
    }).compile();
  });

  describe('project name', () => {
    it('should validate a valid project name', async () => {
      const dto = new ProjectNameAnswerDTO('XYZ Project');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project name', async () => {
      const dto = new ProjectNameAnswerDTO('invalid-project-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid project name format (e.g. XYZ Project)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
