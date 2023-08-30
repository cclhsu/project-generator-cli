import { IsIn, validateSync } from 'class-validator';
import { IdUuidStatusDTO } from './id-uuid-status.dto';
import { GENERAL_STATUS_TYPE_ARRAY } from '../constant';

describe('IdUuidStatusDTO', () => {
  it('should validate a valid DTO instance', () => {
    const dto = new IdUuidStatusDTO(
      'john.doe',
      '00000000-0000-0000-0000-000000000000',
      'ACTIVE',
    );
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

//   it('should validate invalid DTO instance', () => {
//     const dto = new IdUuidStatusDTO(
//       'john.doe',
//       'invalid-uuid',
//       'unknown-status' as GENERAL_STATUS_TYPES,
//     );
//     const errors = validateSync(dto);
//     expect(errors.length).toBeGreaterThan(0);
//   });
});
