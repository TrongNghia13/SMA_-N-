interface planDetailOutput {
    planDetailOutputID: number ,
    planManufacturingID: number| null,
    planDetailInputID: number| null,
    productID: string,
    quantity: number| null,
    standard?: string,
    productionBatchNo?: string,
    galvanizedOrganization?: string,
    steelPrice?: string,
    vendor: string,
    steelType: string,
    width: string,
    thickness: string,
    weight: number,
    weightActual?: number,
    imei: string,
    specification: string,
    description: string,
    sortOrder?: number| null,
    parentID: number
    parentsortOrder?: number| null,

}

export default planDetailOutput;