import React from 'react';
import ReactDOM  from 'react-dom';
import { createRoot } from 'react-dom/client';
export interface ModalProps {
    dvId: string,
    component: any,
    dataProps: any
}

export const ShowModal = (props: ModalProps) => {
    let container = document.getElementById(props.dvId);
        if (typeof (container) === undefined || container === null) {
            container = document.createElement("div");
            container.id = props.dvId;
            document.body.appendChild(container);
        }
        ReactDOM.unmountComponentAtNode(container);
        const root = createRoot(container);
        root.render(<props.component {...props.dataProps} />);
        // ReactDOM.render(<props.component {...props.dataProps} />, container); react 17 dùng cái dòng này.
}