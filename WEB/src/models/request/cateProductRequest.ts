import RequestBase from './requestBase';
interface cateProductRequest extends RequestBase {
     productID: string,
     productName: string,
     productTypeID: string,
     menukey?: string
}
export default cateProductRequest;