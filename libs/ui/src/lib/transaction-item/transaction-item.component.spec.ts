import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getDefaultTransactionItem } from '@backbase/api-client';
import { Transaction } from '@backbase/data';
import { TestIdPipe } from '../test-id.pipe';
import { getElementByTestId, runOnPushChangeDetection } from '../test-utils';
import { TransactionItemComponent } from './transaction-item.component';

describe('TransactionItemComponent', () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;
  const transaction = new Transaction(getDefaultTransactionItem());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TransactionItemComponent, TestIdPipe],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;
    component.transaction = transaction;
    await runOnPushChangeDetection(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct date', () => {
    const dateElement = getElementByTestId(fixture, 'transactionItem.date');
    expect(dateElement.textContent).toContain(transaction.dateFormatted);
  });

  it('should render the correct logo', () => {
    const element = getElementByTestId<HTMLImageElement>(
      fixture,
      'transactionItem.beneficiaryLogo'
    );
    expect(element.src).toContain(transaction.beneficiaryLogo);
  });

  it('should render the correct beneficiary', () => {
    const element = getElementByTestId(fixture, 'transactionItem.beneficiary');
    expect(element.textContent).toContain(transaction.beneficiary);
  });
  it('should render the correct type', () => {
    const element = getElementByTestId(fixture, 'transactionItem.type');
    expect(element.textContent).toContain(transaction.type);
  });

  it('should render the correct amount', () => {
    const element = getElementByTestId(fixture, 'transactionItem.amount');
    expect(element.textContent).toContain(
      `${transaction.indicator}${transaction.amountFormatted}`
    );
  });
});
