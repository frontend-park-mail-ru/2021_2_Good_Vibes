import { Connection } from '../types';
import requestConnections from './request/connections';
import confirmedConnections from './confirmed/connections';
import deniedConnections from './denied/connections';

let res: Connection[] = [];

res = res.concat(requestConnections);
res = res.concat(confirmedConnections);
res = res.concat(deniedConnections);

const connections = res;

export default connections;
