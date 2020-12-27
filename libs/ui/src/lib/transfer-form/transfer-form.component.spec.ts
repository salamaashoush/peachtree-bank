import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IAccount } from '@backbase/api-client';
import { TestIdPipe } from '../test-id.pipe';
import { getElementByTestId, runOnPushChangeDetection } from '../test-utils';
import { TransferFormComponent } from './transfer-form.component';

describe('TransferFormComponent', () => {
  let component: TransferFormComponent;
  let fixture: ComponentFixture<TransferFormComponent>;
  const account: IAccount = {
    name: 'Free Checking',
    number: '4692',
    currentBalance: 5824.76,
    currencyCode: 'EUR',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferFormComponent, TestIdPipe],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    component.account = account;
    component.ngOnInit();
    await runOnPushChangeDetection(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled submit button', () => {
    const button = getElementByTestId<HTMLButtonElement>(
      fixture,
      'transferForm.submit'
    );
    expect(button.disabled).toBeTruthy();
  });

  it('should be able to submit after filling amount and to account', async () => {
    const button = getElementByTestId<HTMLButtonElement>(
      fixture,
      'transferForm.submit'
    );
    const amount = getElementByTestId<HTMLInputElement>(
      fixture,
      'transferForm.amount'
    );
    const toAccount = getElementByTestId<HTMLInputElement>(
      fixture,
      'transferForm.toAccount'
    );

    amount.value = '500';
    amount.dispatchEvent(new Event('input'));
    toAccount.value = 'H&M store';
    toAccount.dispatchEvent(new Event('input'));
    await runOnPushChangeDetection(fixture);
    expect(button.disabled).toBe(false);
    expect(component.transferForm.value.amount).toBe(500);
    expect(component.transferForm.value.toAccount).toBe('H&M store');
  });
});
