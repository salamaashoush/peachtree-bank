import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IOrderBy } from '@backbase/data';
import { TestIdPipe } from '../test-id.pipe';
import { getElementByTestId, runOnPushChangeDetection } from '../test-utils';
import { SortBarComponent } from './sort-bar.component';

describe('SortBarComponent', () => {
  let component: SortBarComponent;
  let fixture: ComponentFixture<SortBarComponent>;
  const items = [
    {
      label: 'Birth Date',
      value: 'birthDate',
    },
    { label: 'Age', value: 'age' },
    { label: 'Salary', value: 'salary' },
  ];
  const activeSort: IOrderBy = {
    key: 'age',
    order: 'asc',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortBarComponent, TestIdPipe],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SortBarComponent);
    component = fixture.componentInstance;
    component.items = items;
    await runOnPushChangeDetection(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct label', async () => {
    const label = 'Order by';
    component.label = label;
    await runOnPushChangeDetection(fixture);
    const labelElement = getElementByTestId(fixture, 'sortBar.label');
    expect(labelElement.textContent).toContain(label);
  });

  it('should render correct items', async () => {
    await runOnPushChangeDetection(fixture);
    const itemsElement = getElementByTestId(fixture, 'sortBar.items');
    expect(itemsElement.childElementCount).toBe(3);
    expect(itemsElement.firstElementChild.textContent).toContain(
      items[0].label
    );
  });

  it('should render sort order correctly', async () => {
    component.activeSort = activeSort;
    await runOnPushChangeDetection(fixture);
    const ageItemElement = getElementByTestId(
      fixture,
      'sortBar.item',
      activeSort.key
    );
    const ageItemOrderElement = getElementByTestId(
      fixture,
      'sortBar.order',
      activeSort.key
    );
    expect(ageItemElement.textContent).toBe('Age');
    expect(ageItemOrderElement.dataset.order).toBe(activeSort.order);
  });

  it('should emit the correct clicked item', async () => {
    spyOn(component, 'handleSortChange');
    spyOn(component.sortChange, 'emit');

    const salaryItemElement = getElementByTestId(
      fixture,
      'sortBar.item',
      'salary'
    );

    expect(salaryItemElement).toBeTruthy();
    salaryItemElement.click();
    await runOnPushChangeDetection(fixture);
    expect(component.handleSortChange).toHaveBeenCalledWith('salary');
  });
});
