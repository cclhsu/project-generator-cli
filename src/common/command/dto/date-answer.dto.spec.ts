import { Test, TestingModule } from '@nestjs/testing';
import { DateAnswerDTO } from './date-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('DateAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [DateAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    // it('should validate a valid Date String date', async () => {
    //   const dto = new DateAnswerDTO(new Date('12/12/2020').toDateString());
    //   const validationPipe = new ValidationPipe();
    //   const validatedDto = await validationPipe.transform(dto, {
    //     metatype: DateAnswerDTO,
    //     type: 'body',
    //     data: '',
    //   });

    //   expect(validatedDto).toEqual(dto);
    // });

    it('should validate a valid ISO date', async () => {
      const dto = new DateAnswerDTO(new Date('12/12/2020').toISOString());
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: DateAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    // it('should validate a valid date', async () => {
    //   const dto = new DateAnswerDTO(
    //     new Date('12/12/2020').toLocaleDateString(),
    //   );
    //   const validationPipe = new ValidationPipe();
    //   const validatedDto = await validationPipe.transform(dto, {
    //     metatype: DateAnswerDTO,
    //     type: 'body',
    //     data: '',
    //   });

    //   expect(validatedDto).toEqual(dto);
    // });

    // it('should validate a valid UTC date', async () => {
    //   const dto = new DateAnswerDTO(new Date('12/12/2020').toUTCString());
    //   const validationPipe = new ValidationPipe();
    //   const validatedDto = await validationPipe.transform(dto, {
    //     metatype: DateAnswerDTO,
    //     type: 'body',
    //     data: '',
    //   });

    //   expect(validatedDto).toEqual(dto);
    // });

    // it('should throw an error for an invalid Locale date', async () => {
    //   const dto = new DateAnswerDTO(undefined);
    //   const validationPipe = new ValidationPipe();

    //   try {
    //     await validationPipe.transform(dto, {
    //       metatype: DateAnswerDTO,
    //       type: 'body',
    //       data: '',
    //     });
    //   } catch (error: any) {
    //     // console.log(error.getResponse());
    //     expect(error.getResponse()).toEqual({
    //       statusCode: 400,
    //       message: [
    //         'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
    //       ],
    //       error: 'Bad Request',
    //     });
    //   }
    // });
  });
});
