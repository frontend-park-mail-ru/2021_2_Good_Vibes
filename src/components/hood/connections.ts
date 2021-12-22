import bus from '../../modules/bus/bus';
import user from '../../services/user/user';
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
      (...args) => {
        if (!user.isAutorize()) {
          bus.emit('signIn state request', undefined);
          return;
        }
        hood.showProfileMenu(args);
      }
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
    event: 'favorite button click',
    callback: hood.favoriteStateRequest,
  },
  {
    event: 'newest button click',
    callback: hood.newestStateRequest,
  },
  {
    event: 'sales button click',
    callback: hood.salesStateRequest,
  },
  {
    event: 'orders button click',
    callback: hood.ordersStateRequest,
  },
  {
    event: 'reviews button click',
    callback: hood.reviewsStateRequest,
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
  },

  {
    event: 'brands button click',
    callback: hood.brandsStateRequest,
  },
  {
    event: "signOut button click",
    callback: hood.signOutRequest,
  },
];

export default connections;
