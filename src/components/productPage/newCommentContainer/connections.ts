import bus from '../../../modules/bus/bus';
import { Connection } from '../../../types';
import * as newCommentContainer from './callbacks';

const connections: Connection[] = [
  // {
  //   event: 'add comment button click',
  //   callback: newCommentContainer.addCommentRequest,
  // },
  {
    event: 'add comment button click',
    callback: () => { bus.emit('add comment ajax request', undefined); },
  },

  {
    event: 'set rating',
    callback: newCommentContainer.initRatings,
  },
  {
    event: 'add comment request denied',
    callback: newCommentContainer.handleError,
  },
];

export default connections;
