import { Test, TestingModule } from '@nestjs/testing';
import { ScrumRolesAnswerDTO } from './scrum-roles-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_SCRUM_ROLE } from '../../constant';

describe('ScrumRolesAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ScrumRolesAnswerDTO],
    }).compile();
  });

  describe('Scrum Roles', () => {
    it('should validate a valid scrum roles', async () => {
      const dto = new ScrumRolesAnswerDTO([DEFAULT_SCRUM_ROLE]);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ScrumRolesAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid scrum roles', async () => {
      const dto = new ScrumRolesAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ScrumRolesAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid scrum roles in the type of PO, SM, MEMBER, I',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
