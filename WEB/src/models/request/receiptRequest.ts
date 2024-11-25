interface receiptRequest {
    branchID: string,
    receiptNo: string,
    frdate: Date,
    todate: Date,
    counterpartyID: string,
    materialType: string,
    businessID: string,
    employeeID: string
}

export interface instockDetailRequest {
    materialType: string,
    storeTypeID : string,
    branchID: string,
    productID: string,
    monthID: string,
}

export default receiptRequest;