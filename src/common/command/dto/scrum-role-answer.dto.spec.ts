import { Test, TestingModule } from '@nestjs/testing';
import { ScrumRoleAnswerDTO } from './scrum-role-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_SCRUM_ROLE } from '../../constant';

describe('ScrumRoleAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ScrumRoleAnswerDTO],
    }).compile();
  });

  describe('Scrum Role', () => {
    it('should validate a valid scrum role', async () => {
      const dto = new ScrumRoleAnswerDTO(DEFAULT_SCRUM_ROLE);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ScrumRoleAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid scrum role', async () => {
      const dto = new ScrumRoleAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ScrumRoleAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid scrum role in the type of PO, SM, MEMBER, I',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
