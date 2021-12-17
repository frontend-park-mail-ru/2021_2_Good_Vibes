import { Connection } from '../../types';
import * as hood from './callbacks';

const connections: Connection[] = [
  {
    event: 'logo button click',
    callback: hood.homepageStateRequest,
   },
  {
    event: 'profile button click menu',
    callback: [
      // hood.saveState,
      hood.showProfileMenu,
    ],
  },
  {
    event: 'hide handle profile',
    callback: [
      // hood.saveState,
      hood.hideProfileMenu,
    ],
  },
  {
    event: 'profile button click',
    callback: [
      // hood.saveState,
      hood.profileStateRequest,
    ],
  },
  {
    event: 'cart button click',
    callback: hood.cartStateRequest,
  },
  {
    event: 'aside button click',
    callback: hood.showAside,
  },
  {
    event: 'aside button click hide',
    callback: hood.hideAsideByBtn,
  },
  {
    event: 'search button click',
    callback: hood.showSearch,
  }
];

export default connections;
