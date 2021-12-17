import { Connection } from '../../types';
import * as aside from './callbacks';

const connections: Connection[] = [
    {
     event: 'hide aside',
     callback: aside.hide,
   }, 
  {
    event: 'hide aside by button',
    callback: aside.hideByBtn,
  },
  {
    event: 'show aside',
    callback: aside.show,
  },
  {
    event: 'category get confirmed',
    callback: [
      aside.parse,
      aside.hideHandle,

     /*  aside.hideByBtn, */
    ],
  },


  // {
  //   event: 'category state request',
  //   callback: aside.hideByBtn,
  // },

];

export default connections;
