import searchParams from '../../services/search/params';
import { Connection } from '../../types';
import * as searchFiltersContainer from './callbacks';

const connections: Connection[] = [
  {
    event: 'get search filter params',
    callback: [
        searchFiltersContainer.getParams,
    ],
  },
  {
    event: 'category ajax request',
    callback: searchFiltersContainer.setFiltersParams,
  },
];

export default connections;
