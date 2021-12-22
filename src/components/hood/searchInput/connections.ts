import { Connection } from '../../../types';
import * as searchInput from './callbacks';

const connections: Connection[] = [
  {
    event: 'suggest request confirmed',
    // callback: searchInput.showSuggests,
    callback: searchInput.parseResponse,
  },
  {
    event: 'show suggests',
    callback: [
      searchInput.changeInputStyleOpen,
      searchInput.showSuggests,
    ]
  },
  {
    event: 'delete suggests list',
    callback: [
      searchInput.changeInputStyleDelete,
      searchInput.deleteSuggests,
    ]
  },
  // {
  //   event: 'search request confirmed',
  //   callback: searchInput.parseSearchResponse,
  // },
  {
    event: 'show search results',
    callback: [
      searchInput.changeCategoryLabel,
      searchInput.showSearchResults,
      searchInput.cleanInput,
    ],
  },
];

export default connections;