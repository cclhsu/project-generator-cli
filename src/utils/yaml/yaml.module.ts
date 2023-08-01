import { Module } from '@nestjs/common';
import {
  readArrayFromYAML,
  writeArrayToYAML,
  readSingleFromYAML,
  writeSingleToYAML,
} from './yaml.utils';

@Module({
  providers: [
    {
      provide: 'ReadArrayFromYAML',
      useValue: readArrayFromYAML,
    },
    {
      provide: 'WriteArrayToYAML',
      useValue: writeArrayToYAML,
    },
    {
      provide: 'ReadSingleFromYAML',
      useValue: readSingleFromYAML,
    },
    {
      provide: 'WriteSingleToYAML',
      useValue: writeSingleToYAML,
    },
  ],
  exports: [
    'ReadArrayFromYAML',
    'WriteArrayToYAML',
    'ReadSingleFromYAML',
    'WriteSingleToYAML',
  ],
})
export class YamlModule {}
