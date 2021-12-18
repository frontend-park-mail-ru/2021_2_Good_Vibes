import { Connection } from '../../types';
import * as orders from "./callbacks";

const connections: Connection[] = [
    {
        event: "orders shown",
        callback: orders.ordersListRequest,
    },
    {
        event: "orders list confirmed",
        callback: orders.parseResponse,
    },
    {
        event: "show orders list",
        callback: orders.showOrderList,
    },
];

export default connections;