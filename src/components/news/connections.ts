import { Connection, Product } from '../../types';
import * as newest from './callbacks';

const connections: Connection[] = [
    {
        event: 'newest product array parsed',
        callback: newest.addProductArrayNew,
    },
];

export default connections;
