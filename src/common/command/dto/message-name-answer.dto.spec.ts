import { Test, TestingModule } from '@nestjs/testing';
import { CommentNameAnswerDTO } from './comment-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('CommentNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [CommentNameAnswerDTO],
    }).compile();
  });

  describe('comment name', () => {
    it('should validate a valid comment name', async () => {
      const dto = new CommentNameAnswerDTO('XYZ Comment');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: CommentNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid comment name', async () => {
      const dto = new CommentNameAnswerDTO('invalid-comment-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: CommentNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid comment name format (e.g. XYZ Comment)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
