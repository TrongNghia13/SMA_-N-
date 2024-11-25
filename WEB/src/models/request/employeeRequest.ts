import RequestBase from './requestBase';
interface employeeRequest extends RequestBase {
    organizationUnitID?: number,
     employeeCode?: string,
     fullName?: string
}
export default employeeRequest;