import { Connection } from '../../types';
import * as orders from "./callbacks";

const connections: Connection[] = [
    {
        event: "orders shown",
        callback: [
            orders.cleanOrderContainer,
            orders.ordersListRequest,
            orders.fieldsFill,
            orders.showAvatar,
        ],
    },
    {
        event: "orders list confirmed",
        callback: orders.parseResponse,
    },
    {
        event: "show orders list",
        callback: orders.showOrderList,
    }, 
    {
        event: "details button click",
        callback: orders.controlDetails,
    },
];

export default connections;