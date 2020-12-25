import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { get } from 'lodash-es';
import { TEST_IDS } from './test-ids';

export async function runOnPushChangeDetection(
  fixture: ComponentFixture<any>
): Promise<void> {
  const changeDetectorRef = fixture.debugElement.injector.get<
    ChangeDetectorRef
  >(ChangeDetectorRef);
  changeDetectorRef.detectChanges();
  return fixture.whenStable();
}

export function getTestIdSelector(path: string, ...params: string[]): string {
  const testIdGetter = get(TEST_IDS, path);
  const testId =
    typeof testIdGetter === 'function' ? testIdGetter(...params) : testIdGetter;
  return `[data-test-id='${testId}']`;
}
