interface CateProductType {
    productTypeID: string,
    productTypeName: string,
    parentID: string,
    length: number,
    isAutoPutId: boolean,
    isPrefix: boolean
  }
  export interface cateProductTypeTreeTable extends CateProductType {
    key: string,
    children: Array<cateProductTypeTreeTable>
}
  export default CateProductType;