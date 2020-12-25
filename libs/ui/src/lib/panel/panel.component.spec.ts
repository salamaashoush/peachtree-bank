import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestIdPipe } from '../test-id.pipe';
import { getTestIdSelector, runOnPushChangeDetection } from '../test-utils';
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
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector(getTestIdSelector('panel.title'));
    const icon = element.querySelector<HTMLElement>(
      getTestIdSelector('panel.icon')
    );
    expect(title.textContent).toContain(component.title);
    expect(icon.dataset.icon).toBe(component.icon);
  });

  it('should render the correct title and icon', async () => {
    const element: HTMLElement = fixture.nativeElement;
    component.title = 'Recent Transactions';
    component.icon = '/assets/icon.png';
    await runOnPushChangeDetection(fixture);
    const title = element.querySelector(getTestIdSelector('panel.title'));
    const icon = element.querySelector<HTMLElement>(
      getTestIdSelector('panel.icon')
    );
    expect(title.textContent).toContain(component.title);
    expect(icon.dataset.icon).toBe(component.icon);
  });
});
