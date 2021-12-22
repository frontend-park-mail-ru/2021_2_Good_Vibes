import { Connection } from '../../../../types';
import * as item from "./callbacks";

const connections: Connection[] = [
    {
        event: 'item click',
        callback: item.productPageStateRequest,
    },
];

export default connections;