interface branch {
    branchID:          string;
    branchAddress:      string;
    branchName:         string;
    branchTel:      string;
    branchWebsite:     string;
    branchTaxCode:         string;
    branchBankAccount:        string;
    branchBankName:    string;
    directorName:   string;
    chiefOfAccountingName:      string;
    storeKeeperName:      string;
    reporterDate:      string;
    directorTitle:  string;
    branchCity:   string;
    branchLogo:        string;
    isVisibleLogo: boolean;
}
// export interface branch_VM  extends branch {
//     tenerp: string
// }
export default branch;
