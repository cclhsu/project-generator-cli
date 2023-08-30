import { Test, TestingModule } from '@nestjs/testing';
import { AcceptanceCriterionStringAnswerDTO } from './acceptance-criterion-string-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('AcceptanceCriterionStringAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AcceptanceCriterionStringAnswerDTO],
    }).compile();
  });

  describe('Story', () => {
    it('should validate a valid acceptance criterion', async () => {
      const dto = new AcceptanceCriterionStringAnswerDTO(
        'Given a user is logged in, when the user clicks on the logout button, then the user is logged out.',
      );
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: AcceptanceCriterionStringAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid acceptance criterion', async () => {
      const dto = new AcceptanceCriterionStringAnswerDTO(
        'invalid-acceptance-criterion',
      );
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: AcceptanceCriterionStringAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Acceptance Criterion should follow the format "Given <some-context>, When <some-event>, then <some-outcome>".',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
