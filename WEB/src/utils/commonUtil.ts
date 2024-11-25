import moment from 'moment';
class CommonUtil {
    static FormatDate = (format: string, date: Date) => {
        return moment(date).format(format)
    }
    static uuidv4 = (index: number) => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16) + index;
        });
    }
}
export default CommonUtil;