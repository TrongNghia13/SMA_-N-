import React from 'react';
import { Modal } from 'antd';

interface PropsDialogPage {
    children: React.ReactNode,
    title: string,
    confirmLoading: boolean,
    visible: boolean,
    destroyOnClose: boolean,
    width?: string,
    onOk: (event: React.MouseEvent<HTMLElement>) => void,
    onCancel: (event: React.MouseEvent<HTMLElement>) => void
}


const DialogPage: React.FC<PropsDialogPage> = (props: PropsDialogPage) => {
    const { title, visible = false, confirmLoading = false, children, onOk, onCancel, destroyOnClose = false, width = '50%' } = props;
    const afterClose = () => {
    }
    return (
        <div>
            <Modal
                style={{ top: 20 }}
                width={width}
                title={title}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                onOk={onOk}
                destroyOnClose={destroyOnClose}
                afterClose={afterClose}>
                {children}
            </Modal>
        </div>
    )
}
export default DialogPage;