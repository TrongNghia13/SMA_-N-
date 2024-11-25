// import QUYCACH_HH from './QUYCACH_HH';

interface cateProduct {
    productID: string;
    productName: string;
    productTypeID: string;
    productUnit: string;
    specification: string;
    stockMin: number;
    stockMax: number;
    description: string;
    isUse: boolean;
}

export interface cateProductVm extends cateProduct {
    productTypeName: string
}

// export interface DM_HANGHOA_MANAGER {
//     hanghoa: DM_HANGHOA_VM,
//     quycachhhs: Array<QUYCACH_HH>
// }

export default cateProduct;