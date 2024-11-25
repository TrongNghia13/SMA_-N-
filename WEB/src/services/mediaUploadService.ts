import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';

import APIURL from '../configs/APIConfig';

class MediaService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public Upload = async (fromData: FormData) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.Media_UPLOAD;
        optionRequest.data = fromData;
        optionRequest.headers = {
            'Content-Type': 'multipart/form-data'
        }
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public GetFile = function(file: string) {
        return APIURL.Media_UPLOAD_GET + file;
    }
}
export default MediaService;