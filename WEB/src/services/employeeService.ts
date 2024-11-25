
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import employee, { employeeVm } from '../models/employee';
import employeeRequest from '../models/request/employeeRequest';

class employeeService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetListEmployee = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.EMPLOYEE_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<employee>(optionRequest);
        return data;
    }
    public GetByID = async (employeeId: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.EMPLOYEE_GETBYID + employeeId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<employeeVm>(optionRequest);
        return data;
    }
    public CreateEmployee = async (req: employee) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.EMPLOYEE_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<employeeVm>(optionRequest);
        return data;
    }
    public UpdateEmployee = async (req: employee) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.EMPLOYEE_UPDATE + req.employeeID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<employeeVm>(optionRequest);
        return data;
    }
    public GetAllListEmployee = async (req : employeeRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.EMPLOYEE_LISTALL;
        optionRequest.data = req == null ? {} : req;
        var data = await this.aAxiosCommon.requestListObject<employeeVm>(optionRequest);
        return data;
    }
    public DeleteEmployee = async (id : number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.EMPLOYEE_DELETE + id;
        optionRequest.data = "";
        var data = await this.aAxiosCommon.requestSingle<employeeVm>(optionRequest);
        return data;
    }
};
export default employeeService;