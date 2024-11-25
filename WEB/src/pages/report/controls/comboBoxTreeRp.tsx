import React from 'react';
import { TreeSelect } from 'antd';
interface PropsComboBoxTreeRP {
    thamsobc: any,
    data: Array<any>,
    onchange?: ((value: any, name: string) => void)
}
class ComboBoxTreeRP extends React.Component<PropsComboBoxTreeRP>  {
    constructor(props: PropsComboBoxTreeRP) {
        super(props);
        this.onChangeComboBoxTreeRP = this.onChangeComboBoxTreeRP.bind(this);
    }

    onChangeComboBoxTreeRP (value: any, node: any, extra: any) {
        if(this.props.onchange) {
            this.props.onchange(value, this.props.thamsobc);
        }
    }
    
    render() {
        const { thamsobc, data } = this.props;
        return (
            <div>
                <TreeSelect
                    id={thamsobc.paramname}
                    style={{ width: '100%' }}
                    treeData={data}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder={thamsobc.tentso}
                    treeDefaultExpandAll
                    onChange={this.onChangeComboBoxTreeRP}
                />
            </div >
        )
    }
}
export default ComboBoxTreeRP;