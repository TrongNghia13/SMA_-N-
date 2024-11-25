import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
interface PropsComboBoxRP {
    dfvalue?: string,
    thamsobc: any,
    data: Array<any>,
    onchange?: ((value: any, name: string) => void)
}
interface StatesComboBoxRP {
    dataCB: Array<any>
}
class ComboBoxRP extends React.Component<PropsComboBoxRP, StatesComboBoxRP>  {
    constructor(props: PropsComboBoxRP) {
        super(props);
        this.state = {
            dataCB: this.props.data && this.props.data.filter((el, index) => {
                return index < 100;
            })
        };
        this.onChangeComboBoxRP = this.onChangeComboBoxRP.bind(this);
        this.onSearchComboBoxRP = this.onSearchComboBoxRP.bind(this);
        // if(this.props.dfvalue && this.props.dfvalue !== '') {
        //     if(this.props.onchange) {
        //         this.props.onchange(this.props.dfvalue, this.props.thamsobc);
        //     }
        // }
    }

    onChangeComboBoxRP(value: any, options: any) {
        if (this.props.onchange) {
            this.props.onchange(value, this.props.thamsobc);
        }
    }

    onSearchComboBoxRP(value: any) {
        if (value !== '' && value.length > 1) {
            const _dataSearchModel = this.props.data.filter(el => {
                return el.ten.toLowerCase().indexOf(value.toLowerCase()) >= 0
                    || el.ma.toLowerCase().indexOf(value.toLowerCase()) >= 0
            });
            this.setState({ dataCB: _dataSearchModel });
        }
    }

    render() {
        const { thamsobc, dfvalue } = this.props;
        return (
            <div>
                <Select
                    defaultValue={dfvalue || ''}
                    id={thamsobc.paramname}
                    style={{ width: '100%' }}
                    showSearch
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder={thamsobc.tentso}
                    filterOption={false}
                    allowClear={true}
                    onChange={this.onChangeComboBoxRP}
                    onSearch={this.onSearchComboBoxRP}
                >
                    {this.state.dataCB && this.state.dataCB.map(d => (
                        <Option data-name={d.ten} value={d.ma} key={d.ma}>
                            {
                                thamsobc.loaitso === 9 ||
                                    thamsobc.loaitso === 10 ||
                                    thamsobc.loaitso === 12 ||
                                    thamsobc.loaitso === 15 ?
                                    <span>{d.ten}</span>
                                    :
                                    <span>{d.ma} - {d.ten}</span>
                            }
                        </Option>
                    ))}
                </Select>
            </div >
        )
    }
}
export default ComboBoxRP;