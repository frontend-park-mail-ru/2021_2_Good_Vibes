import { Connection } from '../../types';
import * as denied from './callbacks';

const connections: Connection[] = [
  {
    event: 'signIn state denied',
    callback: denied.signIn,
  },
  {
    event: 'signUp state denied',
    callback: denied.signUp,
  },
  {
    event: 'profile state denied',
    callback: denied.profile,
  },
  {
    event: 'product request denied',
    callback: denied.product,
  },
  {
    event: 'address state denied',
    callback: [
      denied.saveState,
      denied.address,
    ],
  },
  {
    event: 'payment state denied',
    callback: [
      denied.saveState,
      denied.payment,
    ],
  },
  {
    event: 'confirmation state denied',
    callback: [
      denied.saveState,
      denied.confirmation,
    ],
  },
  {
    event: 'search state denied',
    callback: denied.search,
  },
  {
    event: 'ajax recommendations denied',
    callback: denied.handleAjaxRecommendationDenied,
  },
  {
    event: 'ajax favorite denied',
    callback: denied.handleAjaxFavoriteDenied,
  },
];

export default connections;
