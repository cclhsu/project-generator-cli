import { Test, TestingModule } from '@nestjs/testing';
import { DefinitionOfDoneStringAnswerDTO } from './definition-of-done-string-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('DefinitionOfDoneStringAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [DefinitionOfDoneStringAnswerDTO],
    }).compile();
  });

  describe('Story', () => {
    it('should validate a valid definition of done', async () => {
      const dto = new DefinitionOfDoneStringAnswerDTO(
        'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.',
      );
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: DefinitionOfDoneStringAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid definition of done', async () => {
      const dto = new DefinitionOfDoneStringAnswerDTO('invalid-definition-of-done');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: DefinitionOfDoneStringAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Definition of done should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
