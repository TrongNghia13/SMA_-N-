interface cateCounterpartyGroup {
    counterpartyGroupID: string,
    counterpartyGroupName: string,
    counterpartyType: string,
    length: number,
    isAutoPutID: boolean,
    isPrefix: boolean,
    isChild: boolean
}
export interface cateCounterpartyGroupVmTreeTable extends cateCounterpartyGroup {
    key: string,
    children: Array<cateCounterpartyGroupVmTreeTable>
}

export default cateCounterpartyGroup;