export const TEST_IDS = {
  loader: {
    message: 'loader-message',
  },
  panel: {
    title: 'panel-title',
    icon: 'panel-icon',
    content: 'panel-content',
  },
  searchBox: {
    input: 'search-box-input',
    clear: 'search-box-clear',
  },
  sortBar: {
    label: 'sort-bar-label',
    items: 'sort-bar-items',
    item: (selector: string) => `sort-bar-${selector}-button`,
    order: (selector: string) => `sort-bar-${selector}-order`,
  },
  transactionItem: {
    category: 'transaction-item-category',
    date: 'transaction-item-date',
    beneficiary: 'transaction-item-beneficiary',
    beneficiaryLogo: 'transaction-item-beneficiary-logo',
    amount: 'transaction-item-amount',
    type: 'transaction-item-type',
  },
  transferForm: {
    toAccount: 'transfer-form-to-account',
    fromAccount: 'transfer-form-from-account',
    amount: 'transfer-form-amount',
    error: 'transfer-form-error',
    transfer: 'transfer-form-transfer',
    submit: 'transfer-form-submit',
  },
};
