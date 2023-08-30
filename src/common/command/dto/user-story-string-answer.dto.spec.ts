import { Test, TestingModule } from '@nestjs/testing';
import { UserStoryStringAnswerDTO } from './user-story-string-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UserStoryStringAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserStoryStringAnswerDTO],
    }).compile();
  });

  describe('Story', () => {
    it('should validate a valid user story', async () => {
      const dto = new UserStoryStringAnswerDTO(
        'As a user, I want to login, so that I can access my account.',
      );
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UserStoryStringAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid user story', async () => {
      const dto = new UserStoryStringAnswerDTO('invalid-user-story');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UserStoryStringAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'User Story should follow the format "As a <some-user>, I want to <some-action>, so that <some-reason>.".',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
