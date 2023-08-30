import { Test, TestingModule } from '@nestjs/testing';
import { ProjectIdAnswerDTO } from './project-id-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('ProjectIdAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectIdAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid project ID', async () => {
      const dto = new ProjectIdAnswerDTO('ABC');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectIdAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project ID', async () => {
      const dto = new ProjectIdAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectIdAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid project ID format (e.g. ABC)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
