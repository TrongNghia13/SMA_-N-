interface taskDeliverApp{
    taskDeliverAppID : number,
    receiptNo : string,
    taskDate : string,
    userName : string,
    productionPlanID : string,
    storeID : string,
    materialType : string,
    vendor : string,
    width : string,
    thickness : string,
    productionBatchNo : string,
    quantity : number,
    isFinish : boolean,
    createdBy : string,
    createdDate : string,
}
export default taskDeliverApp;