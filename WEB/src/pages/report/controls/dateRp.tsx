import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

interface PropsDateRP {
    thamsobc: any,
    onchange?: ((value: any, name: string) => void)
}
class DateRP extends React.Component<PropsDateRP>  {
    constructor(props: PropsDateRP) {
        super(props);
        this.onChangeNgayDateRP = this.onChangeNgayDateRP.bind(this);
    }

    onChangeNgayDateRP (date: any, dateString: any) {
        if(this.props.onchange) {
            this.props.onchange(dateString, this.props.thamsobc);
        }
    }

    render() {
        const dateFormat = 'DD/MM/YYYY';
        const { thamsobc } = this.props;
        return (
            <div>
                <DatePicker defaultValue={dayjs(new Date())} onChange={this.onChangeNgayDateRP} id={thamsobc.paramname} format={dateFormat} />
            </div>
        )
    };
}
export default DateRP;