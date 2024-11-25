import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button, message } from 'antd';
import { TreeGrid, GridColumn, DataGrid } from 'rc-easyui';
import Container from '../../components/container/index';

import CateCounterpartyService from '../../services/cateCounterpartyService';

import { cateCounterpartyGroupVmTreeTable } from '../../models/cateCounterpartyGroup';
import cateCounterparty from '../../models/cateCounterparty';
import { APIStatus } from '../../configs/APIConfig';

import { ShowModal } from '../../components/common/index';
import addUpCounterGroup from './addUpCounterGroup';
import addUpCounter from './addUpCounter';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';


const cateCounterpartyService = new CateCounterpartyService();

const { confirm } = Modal;
const CateCounterpartyIndex: React.FC = () => {

    const [stateDoiTac, setStateDoiTac] = useState({ lstDoiTac: Array<cateCounterparty>(), loading: false });
    const [stateNhomDT, setStateNhomDT] = useState({ lstNhomDoiTac: Array<cateCounterpartyGroupVmTreeTable>(), loading: true });
    const [stateOptionNhomDT, setStateOptionNhomDT] = useState((() => {
        let dataInit = { counterpartyGroupID: '', counterpartyGroupName: '', counterpartyType: '' };
        return dataInit;
    }));
    const [stateOptionDoiTac, setStateOptionDoiTac] = useState((() => {
        let dataInit = { counterpartyID: '', counterpartyGroupName: '' };
        return dataInit;
    }));

    useEffect(() => {
        //LoadDoiTac();
        LoadNhomDT();
    }, []);

    const LoadDoiTac = async (searchOptions?: any, filters?: any, sorter?: any) => {
        searchOptions = searchOptions == undefined ? {} : searchOptions;
        var req = { counterpartyType: '', counterpartyGroup: '' };
        req.counterpartyType = searchOptions.counterpartyType || '';
        req.counterpartyGroup = searchOptions.counterpartyGroup || '';
        var dataDoiTac = await cateCounterpartyService.GetListCouterByTypeAndGroup(req.counterpartyType, req.counterpartyGroup);
        setStateDoiTac({
            ...stateDoiTac,
            lstDoiTac: dataDoiTac.data,
            loading: false
        });
    }

    const LoadNhomDT = async () => {
        var dataNhomDT = await cateCounterpartyService.GetListTreeGridCounterGroup('%20');
        setStateNhomDT({ ...stateNhomDT, lstNhomDoiTac: dataNhomDT.data, loading: false });
    }

    const onSelectNhomDT = (selection: cateCounterpartyGroupVmTreeTable) => {
        setStateOptionNhomDT(prevState => ({ ...prevState, counterpartyGroupID: selection.counterpartyGroupID, ten: selection.counterpartyGroupName, counterpartyType: selection.counterpartyType }));
        setStateDoiTac({ ...stateDoiTac, loading: true });
        LoadDoiTac({ counterpartyType: selection.counterpartyType, counterpartyGroup: selection.counterpartyGroupID });
    }


    const editNhomDT = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionNhomDT.counterpartyGroupID === '') {
                message.error('Vui lòng chọn nhóm đối tác để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgaddUpCounterGroup',
            component: addUpCounterGroup,
            dataProps: { counterpartyGroupID: type === 'add' ? '' : stateOptionNhomDT.counterpartyGroupID, counterpartyType: stateOptionNhomDT.counterpartyType, callBackSubmit: LoadNhomDT }
        });
    }

    const deleteNhomDT = async (e: any) => {

        e.preventDefault();
        if (stateOptionNhomDT.counterpartyGroupID === '') {
            message.error('Vui lòng chọn nhóm đối tác để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa nhóm đối tác: ' + stateOptionNhomDT.counterpartyGroupName + '?',
            onOk() {
                OnDeletedNhomDT();
            },
            onCancel() { },
        });
    }

    const OnDeletedNhomDT = async () => {
        var reDelete = await cateCounterpartyService.DeleteCounterGroup(stateOptionNhomDT.counterpartyGroupID);
        if (reDelete.status === APIStatus.ERROR) {
            //message.error(reDelete.message);
            message.error("Không được phép xóa. Vui lòng kiểm tra số liệu!");
        }
        else {
            setStateOptionNhomDT(prevState => ({ ...prevState, counterpartyGroupID: '', counterpartyGroupName: '', counterpartyType: '' }));
            LoadNhomDT();
        }
    }

    const onSelectDoiTac = (selection: cateCounterparty) => {
        setStateOptionDoiTac(preSate => ({ ...preSate, counterpartyID: selection.counterpartyID, ten: selection.counterpartyName }));
    }

    const editDoiTac = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionDoiTac.counterpartyID == '') {
                message.error('Vui lòng chọn đối tác để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgaddUpCounter',
            component: addUpCounter,
            dataProps: { counterpartyID: type === 'add' ? '' : stateOptionDoiTac.counterpartyID, counterpartyGroup: stateOptionNhomDT.counterpartyGroupID, counterpartyType: stateOptionNhomDT.counterpartyType, callBackSubmit: CallBackaddUpCounter }
        });
    }

    const CallBackaddUpCounter = (counterpartyGroup: string) => {
        LoadDoiTac({ counterpartyGroup: stateOptionNhomDT.counterpartyGroupID });
    }

    const deleteDoiTac = async (e: any) => {
        e.preventDefault();
        if (stateOptionDoiTac.counterpartyID == '') {
            message.error('Vui lòng chọn đối tác để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa đối tác: ' + stateOptionDoiTac.counterpartyGroupName + '?',
            onOk() {
                OnDeletedDoiTac();
            },
            onCancel() { },
        });
    }

    const OnDeletedDoiTac = async () => {
        var reDelete = await cateCounterpartyService.DeleteCounter(stateOptionDoiTac.counterpartyID);
        if (reDelete.status === APIStatus.ERROR) {
            //message.error(reDelete.message);
            message.error("Không được phép xóa. Vui lòng kiểm tra số liệu!");
        }
        else {
            setStateDoiTac(prevState => ({ ...prevState, counterpartyID: '', counterpartyName: '' }));
            LoadDoiTac({ counterpartyGroup: stateOptionNhomDT.counterpartyGroupID });
        }
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left">
                    <div className="pannel-left-header">
                        NHÓM ĐỐI TÁC
                    </div>
                    <div className="pannel-left-body">
                        <TreeGrid
                            data={stateNhomDT.lstNhomDoiTac}
                            style={{ height: (window.innerHeight - 150) }}
                            onSelectionChange={onSelectNhomDT}
                            idField="counterpartyGroupID"
                            treeField="counterpartyGroupName"
                            selectionMode="single"
                        >
                            <GridColumn title="Tên" field="counterpartyGroupName" width="65%" />
                            <GridColumn title="Mã" field="counterpartyGroupID" width="20%" />
                            <GridColumn title="Loại" field="counterpartyType" width="15%" />


                        </TreeGrid>
                    </div>
                    <div className="pannel-left-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined/>} size="small" onClick={e => editNhomDT(e, 'add')} >Thêm</Button>
                        {/* <Button className="button" type="primary" icon={<EditOutlined/>} size="small" onClick={e => editNhomDT(e, 'edit')} >Sửa</Button> */}
                        <Button className="button" type="primary" icon={<CloseOutlined/>} size="small" onClick={e => deleteNhomDT(e)}danger>Xóa</Button>
                    </div>
                </div>
                <div className="page-pannel-right">
                    <div className="pannel-right-header">
                        ĐỐI TÁC
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={stateDoiTac.loading}>
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={stateDoiTac.lstDoiTac}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectDoiTac}>
                                <GridColumn title="Mã" field="counterpartyID" width="10%" />
                                <GridColumn title="Tên" field="counterpartyName" width="20%"/>
                                <GridColumn title="Địa chỉ" field="counterpartyAddress" width="33%" align="center" />
                                <GridColumn title="Liên hệ" field="counterpartyTel" width="22%" align="center" />
                                <GridColumn title="Email" field="counterpartyEmail" width="15%" align="center" />
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-right-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined/>} size="small" onClick={e => editDoiTac(e, 'add')}>Thêm</Button>
                        {/* <Button className="button" type="primary" icon={<EditOutlined/>} size="small" onClick={e => editDoiTac(e, 'edit')}>Sửa</Button> */}
                        <Button className="button" type="primary" icon={<CloseOutlined/>}size="small" onClick={e => deleteDoiTac(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateCounterpartyIndex;