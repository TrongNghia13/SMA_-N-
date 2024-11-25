interface cateProductionPlan{
    productionPlanID : string,
    branchID : string,
    planTypeID : string, //lct
    planNo : string, //soct
    planName : string,
    planDate : Date,
    planDescription : string,
    isFinish : boolean
}
export interface GetMAKH {
    soct: string,
    makh: string
}

export default cateProductionPlan;