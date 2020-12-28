import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestIdPipe } from '../test-id.pipe';
import { getElementByTestId, runOnPushChangeDetection } from '../test-utils';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelComponent, TestIdPipe],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    await runOnPushChangeDetection(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default title and icon', () => {
    const title = getElementByTestId(fixture, 'panel.title');
    const icon = getElementByTestId(fixture, 'panel.icon');
    expect(title.textContent).toContain(component.title);
    expect(icon.dataset.icon).toBe(component.icon);
  });

  it('should render the correct title and icon', async () => {
    component.title = 'Recent Transactions';
    component.icon = '/assets/icon.png';
    await runOnPushChangeDetection(fixture);
    const title = getElementByTestId(fixture, 'panel.title');
    const icon = getElementByTestId(fixture, 'panel.icon');
    expect(title.textContent).toContain(component.title);
    expect(icon.dataset.icon).toBe(component.icon);
  });
});
