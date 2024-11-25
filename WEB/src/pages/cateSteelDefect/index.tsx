import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Modal, Button, message } from 'antd';
import Container from '../../components/container/index';
import LoiSPController from '../../services/steelDefectService';
import { APIStatus } from '../../configs/APIConfig';
import { ShowModal } from '../../components/common/index';
import AddUpLoiSP from './AddUpdate';
import DM_LOISP, { cateSteelDefectList } from '../../models/cateSteelDefect';
import { PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

const loiSPController = new LoiSPController();
const { confirm } = Modal;
const LoiSPPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [stateLoiSP, setStateLoiSP] = useState({ lstLoiSP: Array<cateSteelDefectList>(), loading: true });
    const [stateOptionLoiSP, setStateOptionLoiSP] = useState((() => {
        let dataInit = { steelDefectID: 0, defectName: '', isSubmit: false };
        return dataInit;
    }));

    useEffect(() => {
        (async () => {
            await LoadLoiSP();
        })();
    }, []);

    const LoadLoiSP = async () => {
        let dataSP = await loiSPController.GetList({ });
        setStateLoiSP({
            ...stateLoiSP,
            lstLoiSP: dataSP.data,
            loading: false
        });
    }

    const editLoiSP = (e: any, type: string) => {
        e.preventDefault();
        if (type === 'edit') {
            if (stateOptionLoiSP.steelDefectID == 0) {
                message.error('Vui lòng chọn lỗi để chỉnh sửa', 3);
                return;
            }
        }
        ShowModal({
            dvId: 'dgAddUpLoiSP',
            component: AddUpLoiSP,
            dataProps: { id: type === 'add' ? 0 : stateOptionLoiSP.steelDefectID, callBackSubmit: LoadLoiSP }
        });

    }

    const deleteLoiSP = async (e: any) => {
        e.preventDefault();
        if (stateOptionLoiSP.steelDefectID == 0) {
            message.error('Vui lòng chọn lỗi để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa lỗi: ' + stateOptionLoiSP.defectName + '?',
            onOk() {
                OnDeletedLoi();
            },
            onCancel() { },
        });
    }

    const OnDeletedLoi = async () => {
        var reDelete = await loiSPController.Delete(stateOptionLoiSP.steelDefectID);
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            await LoadLoiSP();
            setStateOptionLoiSP(prevState => ({ ...prevState, steelDefectID: 0, defectName: '', isSubmit: false }));
        }
    }

    const onSelectLoiSP = (selection: DM_LOISP) => {
        setStateOptionLoiSP(preSate => ({ ...preSate, steelDefectID: selection.steelDefectID, defectName: selection.defectName }));
    }

    const onRowDblClick = (row: any) => {
        ShowModal({
            dvId: 'dgAddUpLoiSP',
            component: AddUpLoiSP,
            dataProps: { id: row.idLoi, callBackSubmit: LoadLoiSP }
        });
    }

    const renderOptionRow = (options: Array<{ defectName: string }> | null) => {
        if (options) {
            return options.map(p => p.defectName).toString();
        }
        return '';
    }
    

    return (
        <>
            <div className="page-pannel">
                <div className="page-pannel-full">
                    <div className="pannel-full-header">
                        Lỗi SP
                    </div>
                    <div className="pannel-full-body">
                        <Container isLoading={false}>
                            <DataGrid
                                style={{ height: (window.innerHeight - 150) }}
                                filterable
                                data={stateLoiSP.lstLoiSP}
                                selectionMode="single"
                                onSelectionChange={onSelectLoiSP}
                                onRowDblClick={onRowDblClick}
                            >
                                <GridColumn title="Loại" field="material" width="3%" />
                                <GridColumn title="Tên" field="defectName" width="10%" />
                                <GridColumn title="Option 1" field="option1" width="20%" render={({ row }: any) => (
                                    <span>{renderOptionRow(row.option1)}</span>
                                )} />
                                <GridColumn title="Option 2" field="option2" width="20%" render={({ row }: any) => (
                                    <span>{renderOptionRow(row.option2)}</span>
                                )} />
                                <GridColumn title="Option 3" field="option3" width="10%" render={({ row }: any) => (
                                    <span>{renderOptionRow(row.option3)}</span>
                                )} />
                                <GridColumn title="Option 4" field="option3" width="20%" render={({ row }: any) => (
                                    <span>{renderOptionRow(row.option4)}</span>
                                )} />
                            </DataGrid>
                        </Container>
                    </div>
                    <div className="pannel-full-footer">
                        <Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => editLoiSP(e, 'add')}>Thêm</Button>
                        <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => editLoiSP(e, 'edit')}>Sửa</Button>
                        <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => deleteLoiSP(e)} danger>Xóa</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoiSPPage;