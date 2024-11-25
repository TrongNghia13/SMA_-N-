interface CateStore{
    storeID : string,
    storeName : string,
    storeTypeID : string,
    branchID : string,
    storeAddress : string,
    storeKeeperName : string,
    sign? : string,
    description : string
    productionPlanID? : string,

}
export default CateStore;