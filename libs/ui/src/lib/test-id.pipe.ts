import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash-es';
import { TEST_IDS } from './test-ids';

@Pipe({
  name: 'testId',
})
export class TestIdPipe implements PipeTransform {
  transform(value: string, ...params: string[]): string {
    const testId = get(TEST_IDS, value);
    return typeof testId === 'function' ? testId(...params) : testId;
  }
}
