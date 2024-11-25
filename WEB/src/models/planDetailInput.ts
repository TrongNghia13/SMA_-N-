interface planDetailInput {
    planDetailInputID: number,
    planManufacturingID?: number| null,
    receiptImeiID?: number| null,
    receiptDate? : Date| null,
    receiptNo: string,
    productID: string,
    quantity?: number | null,
    standard: string,
    productionBatchNo: string,
    galvanizedOrganization: string,
    steelPrice: string,
    vendor: string,
    steelType: string,
    width: string,
    thickness: string,
    weight: number,
    weightActual: number,
    imei: string,
    specification: string,
    description: string,
    sortOrder?: number| null,
    listPlanDetailOutput?: any,
    [x: string] : any


}

export default planDetailInput;