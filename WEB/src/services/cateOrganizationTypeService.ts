import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import organizationUnitType from '../models/organizationUnitType';
class CateOrganizationTypeService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetListAll = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ORUNITYPE_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<organizationUnitType>(optionRequest);
        return data;
    }
}
export default CateOrganizationTypeService;