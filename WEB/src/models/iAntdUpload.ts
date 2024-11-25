import { RcFile } from 'antd/lib/upload';
interface IAntdUpload {
    file: RcFile,
    onError: void,
    onProgress: void,
    onSuccess: void
}
export default IAntdUpload;