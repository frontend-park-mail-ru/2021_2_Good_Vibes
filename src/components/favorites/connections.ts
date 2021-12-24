import { Connection, Product } from '../../types';
import * as favorites from './callbacks';

const connections: Connection[] = [
    {
        event: 'favorite product array parsed',
        callback: [
            favorites.addProductArrayFavorite,
            favorites.fieldsFill,

        ]
    },
    {
        event: 'favorite shown',
        callback: [
            favorites.showAvatar,
            () => {
                // justify-content: flex-start;
                const a = <HTMLElement>document.getElementsByClassName('product-table-body')[0];
                a.style.justifyContent = 'flex-start';
            }
        ]

    }
];

export default connections;
