import bus from '../../../init/bus';
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
];

export default connections;
