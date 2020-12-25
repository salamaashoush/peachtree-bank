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
};
