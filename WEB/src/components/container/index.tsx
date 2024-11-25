import React from 'react';
import { Spin } from 'antd';
import './container.scss';

interface PropsContainer {
    isLoading: boolean,
    children: React.ReactNode
}

const Container: React.FC<PropsContainer> = (props: PropsContainer) => {
    const { isLoading = false, children } = props;
    return (
        <div className="contentInner">
            { isLoading ? <div className="spin-loading"><Spin tip="Loading..." /> </div> : '' }
            { children }
        </div>
    )
}
export default Container;