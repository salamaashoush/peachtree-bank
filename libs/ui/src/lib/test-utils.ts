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

export function getTestId(path: string, ...params: string[]): string {
  const testId = get(TEST_IDS, path);
  return typeof testId === 'function'
    ? testId(...params)
    : testId ?? `unassigned-${Date.now()}`;
}

export function getTestIdSelector(path: string, ...params: string[]): string {
  return `[data-test-id='${getTestId(path, ...params)}']`;
}

export function queryElement<T extends Element = HTMLElement>(
  selector: string,
  fixture: ComponentFixture<any>
): T {
  const element: HTMLElement = fixture.nativeElement;
  return element.querySelector<T>(selector);
}

export function queryAllElements<T extends Element = HTMLElement>(
  selector: string,
  fixture: ComponentFixture<any>
): NodeListOf<T> {
  const element: HTMLElement = fixture.nativeElement;
  return element.querySelectorAll<T>(selector);
}

export function getElementByTestId<T extends Element = HTMLElement>(
  fixture: ComponentFixture<any>,
  path: string,
  ...params: string[]
): T {
  return queryElement<T>(getTestIdSelector(path, ...params), fixture);
}
