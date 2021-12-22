import { Connection, Product } from '../../types';
import * as brands from './callbacks';

const connections: Connection[] = [
    {
        event: 'brands array parsed',
        callback: brands.addProductBrandNew,
    },
];

export default connections;
