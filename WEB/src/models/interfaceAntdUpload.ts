import { RcFile } from 'antd/lib/upload';
interface iAntdUpload {
    file: RcFile,
    onError: void,
    onProgress: void,
    onSuccess: void
}
export default iAntdUpload;