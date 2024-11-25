import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateGalvanizedOrganization from '../models/cateGalvanizedOrganization';

class CateGalvanizedOrganizationController {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CateGalvanizedOrganization_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<cateGalvanizedOrganization>(optionRequest);
        return data;
    }
    public Update = async (req: cateGalvanizedOrganization) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CateGalvanizedOrganization_UPDATE+"/"+req.galvanizedOrganizationID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: cateGalvanizedOrganization) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CateGalvanizedOrganization_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetByMa = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CateGalvanizedOrganization_GETBYID + id;
        optionRequest.data = { id };
        var data = await this.aAxiosCommon.requestSingle<cateGalvanizedOrganization>(optionRequest);
        return data;
    }


    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CateGalvanizedOrganization_DELETE + id;
        optionRequest.data = {id} ;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    
}
export default CateGalvanizedOrganizationController;