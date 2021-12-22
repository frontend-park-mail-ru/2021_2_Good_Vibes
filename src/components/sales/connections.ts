import { Connection, Product } from '../../types';
import * as sales from './callback';

const connections: Connection[] = [
    {
        event: 'sales product array parsed',
        callback: sales.addProductArraySales,
    },
];

export default connections;
