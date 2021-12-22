import { Connection } from '../../../types';
import SearchInput from '../searchInput/view';
import * as searchInput from './callbacks';

const connections: Connection[] = [
  {
    event: 'suggest request confirmed',
    // callback: searchInput.showSuggests,
    callback: [
      searchInput.parseResponse,
      searchInput.hideHandle,
    ]
  },
  {
    event: 'show suggests',
    callback: [
      searchInput.showSuggests,
    ]
  },
  {
    event: 'delete suggests list',
    callback: [
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
  {
    event: 'close button click',
    callback: searchInput.closeInput,
  },
];

export default connections;