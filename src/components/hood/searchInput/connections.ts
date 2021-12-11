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
    callback: searchInput.showSuggests,
  },
  {
    event: 'delete suggests list',
    callback: searchInput.deleteSuggests,
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
    ],
  },
];

export default connections;