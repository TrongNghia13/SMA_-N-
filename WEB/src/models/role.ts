interface role {
    roleID: number,
    roleName: string,
    // erp: number,
    roleComment: string,
    roleType: string
}
export interface role_VM extends role {
    erpName: string
}
export default role;
