import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, Modal, Input } from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';
import { ShowModal } from '../../components/common';
import Container from '../../components/container';


import CateJobTittleService from '../../services/cateJobTittleService';
import cateJobTitle from '../../models/cateJobTitle';
import { APIStatus } from '../../configs/APIConfig';
import AddUpChucDanh from './addJobTittle';




const cateJobTittleService = new CateJobTittleService();
const { confirm } = Modal;
const CateJobTitle: React.FC = () => {

    const [stateChucDanhs, setStateChucDanhs] = useState({ lstChucDanhs: Array<cateJobTitle>(), loading: true });
    const [optionChucDanh, setOptionChucDanh] = useState((() => {
        return { chucdanhid: 0, chucdanh: '' };
    }));
    useEffect(() => {
        LoadChucDanhs();
    }, []);

    const LoadChucDanhs = async () => {
        var dataChucDanh = await cateJobTittleService.GetList();
        setStateChucDanhs({
            ...stateChucDanhs,
            lstChucDanhs: dataChucDanh.data,
            loading: false
        });
        
    }

    const onSelectChucDanh = (selection: cateJobTitle) => {
        setOptionChucDanh({...optionChucDanh, chucdanhid: selection.jobTitleID, chucdanh: selection.jobTitleName})
    }

    const editChucDanh = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (optionChucDanh.chucdanhid == 0) {
                message.error('Vui lòng chọn chức danh để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dbAddUpChucDanh',
            component: AddUpChucDanh,
            dataProps: { id: type === 'add' ? 0 : optionChucDanh.chucdanhid, callBackSubmit: LoadChucDanhs }
        });
    }

    const deleteChucDanh = async (e: any) => {
        e.preventDefault();
        if (optionChucDanh.chucdanhid == 0) {
            message.error('Vui lòng chọn chức danh để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa chức danh: ' + optionChucDanh.chucdanh + '?',
            onOk() {
                OnDeletedChucDanh();
            },
            onCancel() { },
        });
    }

    const OnDeletedChucDanh = async () => {
        var reDelete = await cateJobTittleService.Delete(optionChucDanh.chucdanhid);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            setOptionChucDanh(prevState => ({ ...prevState, chucdanhid: 0, chucdanh: '' }));
            LoadChucDanhs();
        }
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-full">
                    <div className="pannel-full-header">
                        CHỨC DANH
                    </div>
                    <div className="pannel-full-body">
                        <Container isLoading={stateChucDanhs.loading}>
                            <DataGrid
                                //filterable
                                data={stateChucDanhs.lstChucDanhs}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectChucDanh}>
                                <GridColumn title="Id" field="jobTitleID" width="20%" />
                                <GridColumn title="Chức Danh" field="jobTitleName" width="80%" />
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-full-footer">
                    <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => editChucDanh(e, 'add')}>Thêm</Button>
                    <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => editChucDanh(e,'edit')} >Sửa</Button>
                    <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => deleteChucDanh(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateJobTitle;