import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Form, Button, message, Col, Upload, Input, Modal, Checkbox, Select, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Container from '../../components/container';
import CateBranchController from '../../services/cateBranchService';
import MediaController from '../../services/mediaUploadService';
import CateBranch from '../../models/cateBranch';
import { APIStatus } from '../../configs/APIConfig';
import IAntdUpload from '../../models/interfaceAntdUpload';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const cateBranchController = new CateBranchController();
const mediaController = new MediaController();
const { confirm } = Modal;
const { Option } = Select;
const CateBranchPage: React.FC = () => {

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [model, setModel] = useState({ lst: Array<CateBranch>(), loading: true });
    const dataModelManagerInit = {
        branchID: '',
        branchName: '',
        branchAddress: '',
        branchTel: '',
        branchWebsite: '',
        branchTaxCode: '',
        branchBankAccount: '',
        branchBankName:'',
        directorName: '',
        chiefOfAccountingName: '',
        storeKeeperName: '',
        reporterDate: '',
        directorTitle: '',
        branchCity: '',
        branchLogo: '',
        isVisibleLogo: false,
    };
    const [modelManager, setModelManager] = useState((() => {
        let dataInit: CateBranch = dataModelManagerInit
        return dataInit;
    }));
    const [dataSelectCateBranch, setDataSelectCateBranch] = useState((() => {
        let dataInit = { model: dataModelManagerInit, branchID: "" }
        return dataInit;
    }));
    const [optionCateBranch, setOptionCateBranch] = useState((() => {
        let dataInit = { branchID: '', isEditing: false, isSubmit: false, isCreate: false  };
        return dataInit;
    }));
    const [selectStandard, setSelectStandard] = useState((() => {
        let dataInit: CateBranch = {} as any;
        return dataInit;
    })); 
    useEffect(() => {
        LoadCateBranch();
    }, []);

    const LoadCateBranch = async (callback?: any) => {
        var dataCateBranch = await cateBranchController.GetList();
        setModel({
            ...model,
            lst: dataCateBranch.data,
            loading: false
        });
        setTimeout(() => {
            if (callback) callback(dataCateBranch.data);
        }, 300);
    }
    const onSelectCateBranch = (selection: CateBranch, dataInit?: Array<CateBranch>) => {
        if (optionCateBranch.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectCateBranch({ ...dataSelectCateBranch, model: dataModelManagerInit, branchID: "" });
        }
        else {

            var cateBranchItem: CateBranch = dataModelManagerInit;
            if (dataInit) {
                cateBranchItem = dataInit.find((element) => {
                    return element.branchID === selection.branchID;
                }) || dataModelManagerInit;
            }
            else {
                cateBranchItem = model.lst.find((element) => {
                    return element.branchID === selection.branchID;
                }) || dataModelManagerInit;
            }
            setModelManager(cateBranchItem);
            setDataSelectCateBranch({ ...dataSelectCateBranch, model: cateBranchItem });

            setOptionCateBranch(prevState => ({
                ...prevState,
                branchID: cateBranchItem.branchID,
                isEditing: false,
                isSubmit: false,
            }));

        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Logo</div>
        </div>
    )

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt1M = (file.size / 1024 / 1024) < 1;
        if (!isLt1M) {
            message.error('Kích thước Logo phải nhỏ hơn 1MB');
        }
        return isJpgOrPng && isLt1M;
    }

    const handleChangeUpload = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoadingUpload(true)
            return;
        }
    };

    const handleUplaod = async (option: object) => {
        const ops = option as IAntdUpload;
        var formData = new FormData();
        formData.append("file", ops.file);
        var data = await mediaController.Upload(formData);
        setLoadingUpload(true);
        if (data.status === APIStatus.ERROR) {
            message.error('Can not upload file');
        }
        else {
            const filePath = data.data;
            setModelManager({ ...modelManager, branchLogo: filePath });
        }
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelManager({ ...modelManager, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const handleChangeCheckBox = (e: CheckboxChangeEvent) => {
        e.preventDefault();
        let { name, checked } = e.target;
        setModelManager({ ...modelManager, [name || '']: checked });
    }
    const AddDonviUD = (e: any) => {
        setOptionCateBranch(prevState => ({
            ...prevState,
            branchID:"",
            isEditing: true,
            isCreate : true
        }));
        setDataSelectCateBranch({ ...dataSelectCateBranch, model: dataModelManagerInit, branchID: '' });
        setModelManager(dataModelManagerInit);
    }

    const EditCateBranch = (e: any) => {
        if (optionCateBranch.branchID.length <= 0) {
            message.error('Vui lòng chọn đơn vị để sửa');
            return false;
        }
        setOptionCateBranch(prevState => ({ ...prevState, isEditing: true, isCreate:false }));
    }

    const DeleteCateBranch = (e: any) => {
        if (optionCateBranch.branchID.length <= 0) {
            message.error('Vui lòng chọn đơn vị để xóa');
            return false;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa đơn vị: ' + optionCateBranch.branchID + '?',
            onOk() {
                OnDeletedDonviUD(e);
            },
            onCancel() { },
        });
    }

    const OnDeletedDonviUD = async (e: any) => {
        var reDelete = await cateBranchController.Delete(optionCateBranch.branchID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error(reDelete.message);
        }
        else {
            await LoadCateBranch();
            await CancelCateBranch(e);
        }
    }

    const SaveCateBranch = async (e: any) => {
        // e.preventDefault();
        var data : any ;
        if (modelManager.branchID === '') {
            message.error('Vui lòng nhập mã đơn vị');
            return false;
        }
        if (modelManager.branchName === '') {
            message.error('Vui lòng nhập tên đơn vị');
            return false;
        }
        if (modelManager.branchAddress === '') {
            message.error('Vui lòng nhập địa chỉ đơn vị');
            return false;
        }
        if (modelManager.branchTel === '') {
            message.error('Vui lòng nhập liên hệ đơn vị');
            return false;
        }
        const existingBranch = model.lst.find(item => item.branchID === modelManager.branchID);
        if (existingBranch && (optionCateBranch.isCreate || existingBranch.branchID !== optionCateBranch.branchID)) {
            message.error('Mã đã tồn tại trong danh sách');
            setOptionCateBranch({ ...optionCateBranch, isSubmit: false });
            return;
        }
        setOptionCateBranch({ ...optionCateBranch, isSubmit: true });
        if(optionCateBranch.isCreate){
            data = await cateBranchController.Create(modelManager);
        } else {
            data = await cateBranchController.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setOptionCateBranch({ ...optionCateBranch, isSubmit: false });
        }
        else {
            message.success('Cập nhật đơn vị thành công');
            CancelCateBranch(e);
            await LoadCateBranch(function (datas: Array<CateBranch>) {
                var CateBranchItem = datas.find((element) => {
                    return element.branchID === data.data;
                });
                if (CateBranchItem) {
                    onSelectCateBranch(CateBranchItem, datas);
                }
            });
        }
    }

    const CancelCateBranch = async (e: any) => {
        setOptionCateBranch(prevState => ({
            ...prevState,
            branchID:"",
            isEditing: false
        }));
        setDataSelectCateBranch({ ...dataSelectCateBranch, model: dataModelManagerInit, branchID: '' });
        setModelManager(dataModelManagerInit);
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-full">
                    <div className="pannel-full-header">
                        ĐƠN VỊ ỨNG DỤNG
                    </div>
                    <div className="pannel-full-body">
                        <Container isLoading={model.loading}>
                            <DataGrid
                                filterable
                                data={model.lst}
                                style={{ height: (window.innerHeight - 400) }}
                                selectionMode="single"
                                selection={dataSelectCateBranch.model}
                                onSelectionChange={onSelectCateBranch}>
                                <GridColumn title="Mã" field="branchID" width="5%" />
                                <GridColumn title="Tên" field="branchName" width="30%" />
                                <GridColumn title="Địa chỉ" field="branchAddress" width="35%" />
                                <GridColumn title="Liên hệ" field="branchTel" width="30%" />
                                {/* <GridColumn title="Website" field="website" width="20%" /> */}
                            </DataGrid>
                            <div className="form">
                                <section className="code-box-meta markdown">
                                    <div className="code-box-title">Chi tiết đơn vị</div>
                                    <div className="code-box-description">
                                        <Row>
                                            <Col span={3}>
                                                <Row>
                                                    <Col span={24}>
                                                        <Upload
                                                            disabled={!optionCateBranch.isEditing}
                                                            name="file"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            customRequest={handleUplaod}
                                                            onChange={handleChangeUpload}
                                                            beforeUpload={beforeUpload}
                                                        >
                                                            {modelManager.branchLogo && modelManager.branchLogo !== '' ? <img src={mediaController.GetFile(modelManager.branchLogo)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                                        </Upload>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Checkbox name="isVisibleLogo" checked={modelManager.isVisibleLogo} onChange={handleChangeCheckBox}>Hiển thị logo</Checkbox>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={21}>
                                                <Row gutter={2}>
                                                    <Col span={6} >
                                                        <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Mã">
                                                            <Input disabled={!optionCateBranch.isCreate || !optionCateBranch.isEditing } className="input-text-upercase" maxLength={2} placeholder="mã đơn vị" name="branchID" value={modelManager.branchID} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6} >
                                                        <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Tên">
                                                            <Input placeholder="Tên" name="branchName" value={modelManager.branchName} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <div className="clearfix"></div>
                                                <Row gutter={6}>
                                                    <Col span={12} >
                                                        <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="Địa chỉ">
                                                            <Input placeholder="Địa chỉ" name="branchAddress" value={modelManager.branchAddress} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Liên hệ">
                                                            <Input placeholder="Liên hệ" name="branchTel" value={modelManager.branchTel} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <div className="clearfix"></div>
                                                <Row gutter={2}>
                                                    <Col span={4} >
                                                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="MST">
                                                            <Input placeholder="mã số thuế" name="branchTaxCode" value={modelManager.branchTaxCode} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={4} >
                                                        <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Website">
                                                            <Input placeholder="Website" name="branchWebsite" value={modelManager.branchWebsite} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8} >
                                                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Số TK">
                                                            <Input placeholder="Số TK" name="branchBankAccount" value={modelManager.branchBankAccount} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={8} >
                                                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Ngân Hàng">
                                                            <Input placeholder="Ngân hàng" name="branchBankName" value={modelManager.branchBankName} onChange={handleChangeInput} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                
                                            </Col>
                                        </Row>
                                        <div className="clearfix"></div>
                                        <Row gutter={2}>
                                            <Col span={8} >
                                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Thứ trưởng">
                                                    <Input placeholder="Thứ trưởng" name="directorName" value={modelManager.directorName} onChange={handleChangeInput} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8} >
                                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Kế toán">
                                                    <Input placeholder="Kế toán" name="chiefOfAccountingName" value={modelManager.chiefOfAccountingName} onChange={handleChangeInput} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8} >
                                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Thủ quỷ">
                                                    <Input placeholder="Thủ quỷ" name="storeKeeperName" value={modelManager.storeKeeperName} onChange={handleChangeInput} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <div className="clearfix"></div>
                                        <Row gutter={2}>
                                            <Col span={8} >
                                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Ngày BC">
                                                    <Input placeholder="Ngày BC" name="reporterDate" value={modelManager.reporterDate} onChange={handleChangeInput} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8} >
                                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Chức danh BC">
                                                    <Input placeholder="Chức danh BC" name="directorTitle" value={modelManager.directorTitle} onChange={handleChangeInput} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8} >
                                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Tỉnh thành">
                                                    <Input placeholder="Tỉnh thành" name="branchCity" value={modelManager.branchCity} onChange={handleChangeInput} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <div className="clearfix"></div>
                                    </div>
                                </section>
                            </div>
                        </Container>
                    </div>
                    <div className="pannel-full-footer">
                        {optionCateBranch.isEditing ?
                            <div>
                                <Button className="button" shape="default" loading={optionCateBranch.isSubmit} type="primary" icon={<SaveOutlined />} onClick={e => SaveCateBranch(e)}>Lưu</Button>
                                <Button className="button" shape="default" disabled={optionCateBranch.isSubmit} type="dashed" icon={<CloseOutlined />} onClick={e => CancelCateBranch(e)} danger>Hủy</Button>
                            </div>
                            :
                            <div>
                                <Button className="button" type="primary" icon={<PlusOutlined />} onClick={e => AddDonviUD(e)}>Thêm</Button>
                                <Button className="button" type="primary" icon={<EditOutlined />} onClick={e => EditCateBranch(e)} >Sửa</Button>
                                <Button className="button" type="primary" icon={<DeleteOutlined />} onClick={e => DeleteCateBranch(e)} danger>Xóa</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateBranchPage;