import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Input, Button, message, Radio, Select } from 'antd';
import { TreeGrid, GridColumn, DataGrid } from 'rc-easyui';
import Container from '../../components/container/index';
import CateWidthService from '../../services/cateWidthService';
import {PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined,CloseOutlined} from '@ant-design/icons';

import cateWidth from '../../models/cateWidth';
import cateTypeWidth from '../../models/cateTypeWidth';
import { APIStatus } from '../../configs/APIConfig';
// import DM_LOAIKHO from '../../models/DM_LOAIKHO';

const khoNLController = new CateWidthService();



const { confirm } = Modal;
const { Option } = Select;

const CateWidthPage: React.FC = () => {
    const [isFetchingWidth, setIsFetchingWidth] = useState(false);
    const [stateCateWidth, setStateCateWidth] = useState({ lstKhoNL: Array<cateWidth>(), loading: false });
    const [stateCateTypeWidth, setStateCateTypeWidth] = useState({ lstCateTypeWidth: Array<cateTypeWidth>(), loading: true });
    const [stateOptionCateTypeWidth, setStateOptionCateTypeWidth] = useState((() => {
        let dataInit = { maloai: '', tenloai: '' };
        return dataInit;
    }));

    const dataModelManagerInit = {
        widthID: '',
        widthName: '',
        widthType: 'B'
    };
    const [loaiNLModel, setLoaiKNLModel] = useState((() => {
        let dataInit: Array<cateTypeWidth> = [] as any;
        return dataInit;
    }));

    const [modelManager, setModelManager] = useState((() => {
        let dataInit: cateWidth = dataModelManagerInit
        return dataInit;
    }));

    const [stateOptionCateWidth, setStateOptionCateWidth] = useState((() => {
        let dataInit = {widthID:'',  isEditing: false, isSubmit: false, isCreate:false };
        return dataInit;
    }));


    const [dataSelectCateWidth, setDataSelectCateWidth] = useState((() => {
        let dataInit = { model: dataModelManagerInit, widthID: '' }
        return dataInit;
    }));

    const [selectCateWidth, setSelectCateWidth] = useState((() => {
        let dataInit: cateWidth = {} as any;
        return dataInit;
    })); 

    const [baocaoSelectValue, setBaocaoSelectValue] = useState('');
    

    useEffect(() => {       
        LoadCateTypeWidth();
    }, []);

    const LoadCateWidth = async (searchOptions?: any, filters?: any, sorter?: any) => {
        searchOptions = searchOptions == undefined ? {} : searchOptions;
        var req = { widthType: '' };
        req.widthType = searchOptions.widthType || '';
        var dataKhoNL = await khoNLController.GetListCateWidth(req.widthType);
        setStateCateWidth({
            ...stateCateWidth,
            lstKhoNL: dataKhoNL.data,
            loading: false
        });
    }

    const list = [
        {
            maloai: 'B',
            tenloai: 'Băng'
        },
        {
            maloai: 'C',
            tenloai: 'Cuộn'
        },
    ];

    const LoadCateTypeWidth = async () => {
        var dataLoaiKNL = list;
        setStateCateTypeWidth({ ...stateCateTypeWidth, lstCateTypeWidth: dataLoaiKNL, loading: false });
        setLoaiKNLModel(dataLoaiKNL);
    }

    const onSelectCateTypeWidth = async (selection: cateTypeWidth) => {
        setIsFetchingWidth(true); 
        setStateOptionCateTypeWidth(prevState => ({ ...prevState, maloai: selection.maloai, tenloai: selection.tenloai }));
        setStateCateWidth({ ...stateCateWidth, loading: true });
        
        if (selection.maloai === 'B') {
            setBaocaoSelectValue('B');
            setModelManager(prevState => ({ ...prevState, widthType: 'B' }));   
        } else if (selection.maloai === 'C') {
            setBaocaoSelectValue('C');
            setModelManager(prevState => ({ ...prevState, widthType: 'C' }));
        }
        const widthItems = await GetWidthByType(selection.maloai);
        setStateCateWidth({
            ...stateCateWidth,
            lstKhoNL: widthItems,
            loading: false
        });
        // setModelManager({ widthID: '', widthName: '', widthType: selection.maloai });
        setIsFetchingWidth(false); 
        

       

    }

    const onSelectCateWidth = (selection: cateWidth, dataInit?: Array<cateWidth>) => {
        if (stateOptionCateWidth.isEditing && (dataInit == null || dataInit === undefined)) {
            setDataSelectCateWidth({ ...dataSelectCateWidth, model: dataModelManagerInit, widthID: '' });
        }
        else {

            var khoNLItem: cateWidth = dataModelManagerInit;
            if (dataInit) {
                khoNLItem = dataInit.find((element) => {
                    return element.widthID === selection.widthID;
                }) || dataModelManagerInit;
            }
            else {
                khoNLItem = stateCateWidth.lstKhoNL.find((element) => {
                    return element.widthID === selection.widthID;
                }) || dataModelManagerInit;
            }
            setModelManager(khoNLItem);
            setDataSelectCateWidth({ ...dataSelectCateWidth, model: khoNLItem });

            setStateOptionCateWidth(prevState => ({
                ...prevState,
                widthID: khoNLItem.widthID,
                isEditing: false,
                isSubmit: false,
            }));
            setBaocaoSelectValue(selection.widthType);
        }
    }

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let { type, name, value } = e.currentTarget;
        setModelManager({ ...modelManager, [name]: (type === 'number' ? parseFloat(value) : value) });
    }

    const GetWidthByType = async (widthType: string) => {
        
        const dataKhoNL = await khoNLController.GetListCateWidthByType(widthType);
        return dataKhoNL.data;
    }

    const onChangeLoai = async (value: any) => {
        setBaocaoSelectValue(value);
        setModelManager({ ...modelManager, widthType: value });           


    // const widthItems = await GetWidthByType(value);
    // setStateCateWidth({
    //     ...stateCateWidth,
    //     lstKhoNL: widthItems,
    //     loading: false
    // });

    }

    const radioStyle = {
        display: 'unblock',
        height: '30px',
        lineHeight: '30px',
    };

    const AddCateWidth = (e: any) => {
        setStateOptionCateWidth(prevState => ({
            ...prevState,
            isEditing: true,
            isCreate:true
        }));
        setDataSelectCateWidth({ ...dataSelectCateWidth, model: dataModelManagerInit, widthID: '' });
        setModelManager({ widthID: '', widthName: '', widthType: stateOptionCateTypeWidth.maloai });
    }

    const EditCateWidth = (e: any) => {
        if (stateOptionCateWidth.widthID.length <= 0) {
            message.error('Vui lòng chọn thông tin để sửa');
            return false;
        }
        setStateOptionCateWidth(prevState => ({ ...prevState, isEditing: true,isCreate : false }));
    }

    const DeleteCateWidth = async (e: any) => {
        e.preventDefault();
        if (stateOptionCateWidth.widthID == '') {
            message.error('Vui lòng chọn danh mục để xóa', 3);
            return;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa danh mục: ' + stateOptionCateWidth.widthID + '?',
            onOk() {
                OnDeleteCateWidth(e);
            },
            onCancel() { },
        });
    }

    const OnDeleteCateWidth = async (e: any) => {
        var reDelete = await khoNLController.Delete(stateOptionCateWidth.widthID);;
        if (reDelete.status === APIStatus.ERROR) {
            message.error("Không được phép xóa. Vui lòng kiểm tra số liệu!");
        }
        else {
            await LoadCateWidth({ loai: stateOptionCateTypeWidth.maloai });
            await CancelCateWidth(e);
        }
    }

    const SaveCateWidth = async (e: any) => {
        var data : any ;
        if (modelManager.widthID === '') {
            message.error('Vui lòng nhập WidthID');
            return false;
        }
        if (modelManager.widthName === '') {
            message.error('Vui lòng nhập WidthName');
            return false;
        }
        if (modelManager.widthType === '') {
            message.error('Vui lòng nhập WidthType');
            return false;
        }
        setStateOptionCateWidth({ ...stateOptionCateWidth, isSubmit: true });
        if(stateOptionCateWidth.isCreate){
            data = await khoNLController.Create(modelManager);
        } else {
            data = await khoNLController.Update(modelManager);
        }
        if (data.status === APIStatus.ERROR) {
            message.error(data.message);
            setStateOptionCateWidth({ ...stateOptionCateWidth, isSubmit: false });
        }
        const existingGalvanizedOrganization = stateCateWidth.lstKhoNL.find(item => item.widthID === modelManager.widthID);
        if (existingGalvanizedOrganization && (stateOptionCateWidth.isCreate || existingGalvanizedOrganization.widthID !== stateOptionCateWidth.widthID)) {
            message.error('Mã đã tồn tại trong danh sách');
            setStateOptionCateWidth({ ...stateOptionCateWidth, isSubmit: false });
            return;
        }
        else {
            message.success('Cập nhật Chiều dày thành thành công');
            CancelCateWidth(e);
            await LoadCateWidth(function (datas: Array<cateWidth>) {
                var ThicknessItem = datas.find((element) => {
                    return element.widthID === data.data;
                });
                if (ThicknessItem) {
                    onSelectCateWidth(ThicknessItem, datas);
                }
            });
        }
    }

    const CancelCateWidth = async (e: any) => {
        setStateOptionCateWidth(prevState => ({
            ...prevState,
            widthID:"",
            isEditing: false
        }));
        setDataSelectCateWidth({ ...dataSelectCateWidth, model: dataModelManagerInit, widthID: '' });
        setModelManager(dataModelManagerInit);
        setStateOptionCateTypeWidth({maloai: "", tenloai: ""});
        setBaocaoSelectValue('');
    }
    
    const hilightrow = (row:cateWidth) => {
        if (row.widthID === modelManager.widthID) {
          return { background: "#57b4bd ", color: "#fff" };
        }
        return null;
    };
    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-float-left w-20">
                    <div className="pannel-left-header">
                        LOẠI KHỔ
                    </div>
                    <div className="pannel-left-body">
                        <TreeGrid
                            data={stateCateTypeWidth.lstCateTypeWidth}
                            style={{ height: (window.innerHeight - 150) }}
                            onSelectionChange={onSelectCateTypeWidth}
                            idField="maloai"
                            treeField="tenloai"
                            selectionMode="single"                        >
                            <GridColumn title="Loại khổ" field="tenloai" width="80%" />
                            <GridColumn title="Loại" field="maloai" width="20%" />
                        </TreeGrid>
                    </div>
                </div>
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-right-header">
                        KÍCH THƯỚC KHỔ
                    </div>
                    <div className="pannel-right-body">
                        <Container isLoading={stateCateWidth.loading}>
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={stateCateWidth.lstKhoNL}
                                style={{ height: (window.innerHeight - 150) }}
                                selectionMode="single"
                                onSelectionChange={onSelectCateWidth}
                                selection={selectCateWidth}
                                rowCss={hilightrow}
                                >
                                <GridColumn title="Id" field="widthID" width="10%" />
                                <GridColumn title="Tên" field="widthName" width="20%" />
                                <GridColumn title="Loại" field="widthType" width="10%" align="center" />
                            </DataGrid>
                        </Container>
                    </div>
                </div>
                <div className="page-pannel-float-left w-40">
                    <div className="pannel-body" style={{ marginBottom: 20 }}>
                        <section className="code-box-meta markdown">
                            <div className="code-box-title">Thông tin kích thước khổ</div>
                            <div className="code-box-description">
                                <div className="text-left">
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        id
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-25">
                                        <Input size="small" disabled={!stateOptionCateWidth.isCreate || !stateOptionCateWidth.isEditing} maxLength={10} name="widthID" value={modelManager.widthID} onChange={handleChangeInput} />
                                    </div>
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Tên
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control w-25">
                                        <Input size="small" disabled={!stateOptionCateWidth.isEditing} name="widthName" value={modelManager.widthName} onChange={handleChangeInput} />
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="lable-cotrol inline-bolck mr-right-5 ">
                                        Loại
                                    </div>
                                    <div className="inline-bolck mr-right-5 input-control">
                                    <Select 
                                        disabled={!stateOptionCateWidth.isEditing}
                                        size="small"
                                        style={{ width: '100%' }}
                                        showSearch
                                        value={baocaoSelectValue}
                                        placeholder="Chọn loại khổ nguyên liệu"
                                        optionFilterProp="children"
                                        optionLabelProp="title"
                                        onChange={onChangeLoai}
                                    
                                    >
                                        {loaiNLModel && loaiNLModel.map(d => (
                                            <Option title={d.tenloai} key={d.maloai} value={d.maloai}>
                                                {/* <span>{d.maloai} - {d.tenloai}</span> */}
                                                {d.tenloai} - {d.maloai}
                                            </Option>
                                        ))}
                                       {/* <Option title="Băng" key="B" value="B">
                                            B - Băng
                                        </Option>
                                        <Option title="Cuộn" key="C" value="C">
                                            C - Cuộn
                                        </Option> */}
                                    </Select>
                                    </div>
                                   
                                </div>
                            </div>

                        </section>
                    </div>
                    <div className="pannel-footer">
                        {stateOptionCateWidth.isEditing ?
                            <div>
                            <Button className="button" shape="default" loading={stateOptionCateWidth.isSubmit} type="primary" icon={<SaveOutlined/>} onClick={e => SaveCateWidth(e)}>Lưu</Button>
                            <Button className="button" shape="default" disabled={stateOptionCateWidth.isSubmit} type="dashed" icon={<CloseOutlined/>} onClick={e => CancelCateWidth(e)} danger>Hủy</Button>
                        </div>
                        :
                        <div>
                            <Button className="button" type="primary"  icon={<PlusOutlined />}  onClick={e => AddCateWidth(e)}>Thêm</Button>
                            <Button className="button" type="primary"  icon={<EditOutlined />} onClick={e => EditCateWidth(e)} >Sửa</Button>
                            <Button className="button" type="primary"  icon={<DeleteOutlined />} onClick={e => DeleteCateWidth(e)} danger>Xóa</Button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CateWidthPage;