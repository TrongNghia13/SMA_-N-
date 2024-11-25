import React from 'react';
import { Input } from 'antd';
interface PropsInputText {
    thamsobc: any,
    onchange?: ((value: any, name: string) => void)
}
class InputTextRP extends React.Component<PropsInputText>  {
    constructor(props: PropsInputText) {
        super(props);
    }
    render() {
        const { thamsobc } = this.props;
        return (
            <div>
                <Input id={thamsobc.paramname} style={{ width: '100%' }} />
            </div>
        )
    }
};
export default InputTextRP;