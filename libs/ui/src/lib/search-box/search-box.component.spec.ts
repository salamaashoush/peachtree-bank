import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TestIdPipe } from '../test-id.pipe';
import { getElementByTestId, runOnPushChangeDetection } from '../test-utils';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent, TestIdPipe],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    await runOnPushChangeDetection(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit on user input', async () => {
    const searchInput = getElementByTestId<HTMLInputElement>(
      fixture,
      'searchBox.input'
    );
    spyOn(component.searchChange, 'emit');
    component.ngOnInit();
    const value = 'h&m';
    component.searchControl.setValue(value);
    await runOnPushChangeDetection(fixture);
    expect(searchInput.value).toBe(value);
    expect(component.searchControl.value).toBe(value);
    expect(component.searchChange.emit).toHaveBeenCalledWith(value);
  });

  it('should update form control on user input', async () => {
    const searchInput = getElementByTestId<HTMLInputElement>(
      fixture,
      'searchBox.input'
    );
    component.ngOnInit();
    const value = 'h&m';
    searchInput.value = value;
    searchInput.dispatchEvent(new Event('input'));
    await runOnPushChangeDetection(fixture);
    expect(component.searchControl.value).toBe(value);
  });
});
