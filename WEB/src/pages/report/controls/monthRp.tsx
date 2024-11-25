import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

const { MonthPicker } = DatePicker;
interface PropsMonthRP {
    thamsobc: any,
    onchange?: ((value: any, name: string) => void)
}
class MonthRP extends React.Component<PropsMonthRP>  {
    constructor(props: PropsMonthRP) {
        super(props);
        this.onChangeMonthRP = this.onChangeMonthRP.bind(this);
    }
    
    onChangeMonthRP (date: any, dateString: any) {
        if(this.props.onchange) {
            this.props.onchange(moment(date).format("YYYYMM"), this.props.thamsobc);
        }
    }

    render() {
        const monthFormat = 'MM/YYYY';
        const { thamsobc } = this.props;
        return (
            <div>
                <MonthPicker defaultValue={dayjs(new Date())} onChange={this.onChangeMonthRP} id={thamsobc.paramname} format={monthFormat}
                    style={{ width: '100%' }} />
            </div>
        )
    }
};
export default MonthRP;