import React, { Fragment, useState, useEffect } from 'react';
import { Button, DatePicker, Select, Form, TreeSelect, message } from 'antd';
import { GridColumn, DataGrid } from 'rc-easyui';
import {NumericFormat} from 'react-number-format';
import moment from 'moment';
import dayjs from 'dayjs';

import ReactExport from "react-data-export";

import CateStoreService from '../../services/cateStoreService';
import CateProductService from '../../services/cateProductService';
import ReportService from '../../services/reportService';

import cateBranch from '../../models/cateBranch';
import TreeData from '../../models/ui/treeData';
import { cateProductVm } from '../../models/cateProduct';
import cateProductRequest from '../../models/request/cateProductRequest';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';

const cateStoreService = new CateStoreService();
const cateProductService = new CateProductService();
const reportService = new ReportService();

const { MonthPicker } = DatePicker;
const { Option } = Select;

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const LookupProductInStock: React.FC = () => {
    const [modelRequest, setModelRequest] = useState(
        {
            month: moment(new Date()).format("YYYYMM"),
            storeID: '',
            productTypeID: '',
            productID: ''
        });

    const [dataTon, setDataTon] = useState((() => {
        let dataInit: Array<cateBranch> = [] as any;
        return dataInit;
    }));

    const [dataKho, setDataKho] = useState((() => {
        let dataInit: Array<any> = [] as any;
        return dataInit;
    }));

    const [dataNhomHH, setDataNhomHH] = useState((() => {
        let dataInit: Array<TreeData> = [] as any;
        return dataInit;
    }));

    const [dataHH, setDataHH] = useState((() => {
        let dataInit: Array<cateProductVm> = [] as any;
        return dataInit;
    }));
    const [dataHHSearch, setDataHHSearch] = useState((() => {
        let dataInit: Array<cateProductVm> = [] as any;
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {
            await GetDataKho();
            await GetTreeDataProductType();
            await LoadDMHangHoa();
        };
        GetData();
    }, []);

    const GetDataKho = async () => {
        var getDdata = await cateStoreService.GetListStore();
        setDataKho(getDdata.data);
    }

    const GetTreeDataProductType = async () => {
        var getDdata = await cateProductService.GetListProductTypeTreeGridSelect();
        setDataNhomHH(getDdata.data);
    }

    const LoadDMHangHoa = async (searchOptions?: any, filters?: any, sorter?: any) => {
        searchOptions = searchOptions == undefined ? {} : searchOptions;
        var req: cateProductRequest = {} as any;
        req.productID = searchOptions.productID || '';
        req.productName = searchOptions.productName || '';
        req.productTypeID = (searchOptions.productTypeID || '') == 'ALL' ? '' : (searchOptions.productTypeID || '');
        req.pageindex = 0;
        req.pagesize = 0;
        req.total = 0;
        var dataHangHoa = await cateProductService.GetListCateProduct(req);
        setDataHH(dataHangHoa.data);
        setDataHHSearch(dataHangHoa.data);
    }

    const onChangeProductType = async (value: any, node: any, extra: any) => {
        setModelRequest({ ...modelRequest, productTypeID: value, productID: '' });
        LoadDMHangHoa({ productTypeID: value });
    }

    const onChangeMonth = async (date: any, dateString: any) => {
        setModelRequest({ ...modelRequest, month: dateString });
    }

    const onChangeKho = async (value: any, options: any) => {
        setModelRequest({ ...modelRequest, storeID: value });
    }

    const onChangeHangHoa = async (value: any, options: any) => {
        setModelRequest({ ...modelRequest, productID: value });
    }

    const onSearchHangHoa = async (value: any) => {
        if (value !== '' && value.length > 1) {
            const _dataSearchModel = dataHH.filter(el => {
                return el.productName.toLowerCase().indexOf(value.toLowerCase()) >= 0
                    || el.productID.toLowerCase().indexOf(value.toLowerCase()) >= 0
            });
            setDataHHSearch(_dataSearchModel);
        }
    }

    const XemTonHangHoa = async (e: any) => {
        if (modelRequest.storeID === '') {
            message.error('Vui lòng chọn kho');
            return false;
        }
        // if (modelRequest.mahh === '' && modelRequest.nhomhh === '') {
        //     message.error('Vui lòng nhóm hàng hóa hoặc hàng hóa');
        //     return false;
        // }
        const datatons = await reportService.SP_TRACUU_TONHH(modelRequest.month, modelRequest.storeID, modelRequest.productTypeID, modelRequest.productID);
        setDataTon(datatons.data);
    }

    return (
        <Fragment>
            <div className="page-pannel">
                <div className="page-pannel-left page-pannel-left-25">
                    <div className="pannel-left-body-not-header bg-e6e6e6">
                        <div className="p-5">
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Tháng">
                                <MonthPicker defaultValue={dayjs(new Date())}
                                    onChange={onChangeMonth} format="MM/YYYY"
                                    style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Kho">
                                <Select
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    filterOption={false}
                                    allowClear={true}
                                    onChange={onChangeKho}
                                >
                                    {dataKho && dataKho.map(d => (
                                        <Option data-name={d.storeName} value={d.storeID} key={d.storeID}>{d.storeID} -  {d.storeName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="Nhóm HH">
                                <TreeSelect
                                    style={{ width: '100%' }}
                                    treeData={dataNhomHH}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeDefaultExpandAll
                                    allowClear
                                    onChange={onChangeProductType}
                                />
                            </Form.Item>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="HH">
                                <Select
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    showSearch
                                    allowClear
                                    filterOption={false}
                                    onChange={onChangeHangHoa}
                                    onSearch={onSearchHangHoa}
                                    getPopupContainer={(trigger: any) => trigger.parentNode}
                                    notFoundContent={null}
                                >
                                    {dataHHSearch && dataHHSearch.map(d => (
                                        <Option data-name={d.productName} value={d.productID} key={d.productID}>
                                            <div style={{ width: 200 }}>
                                                <span>{d.productID} - {d.productName}</span>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="text-center">
                            <Button className="button" type="primary" icon={<PlusOutlined/>} size="small" onClick={(e) => XemTonHangHoa(e)}>Xem Tồn</Button>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="page-pannel-right page-pannel-right-75">
                    <div className="pannel-right-body">
                        <DataGrid
                            filterable
                            filterRules={[]}
                            data={dataTon}
                            virtualScroll
                            pageSize={50}
                            style={{ height: (window.innerHeight - 123) }}
                            selectionMode="single">
                            <GridColumn title="Kho" field="kho" width="15%" />
                            <GridColumn title="Mã Hàng" field="mahh" width="15%" />
                            <GridColumn title="Tên Hàng" field="ten" width="40%" />
                            <GridColumn title="ĐVT" field="dvt" width="15%" align="center" />
                            <GridColumn field="lgton" title="Lượng Tồn" width="12%" align="right"
                                header={() => <span>Lượng Tồn</span>}
                                render={({ row }: any) => (
                                    <NumericFormat readOnly className="ant-input-number-input input-text-right-grid text-red" thousandSeparator={true} value={row.lgton} />
                                )}
                            />
                        </DataGrid>
                    </div>
                    <div style={{ position: "absolute", bottom: 10, right: 10 }}>
                        <ExcelFile filename="Hàng Tồn" element={<Button className="button" type="primary" icon={<FileExcelOutlined/>} size="small">Xuất Excel</Button>}>
                            <ExcelSheet data={dataTon} name="Hàng tồn">
                                <ExcelColumn label="KHO" value="kho" />
                                <ExcelColumn label="NHOMHH" value="nhomhh" />
                                <ExcelColumn label="MAHH" value="mahh" />
                                <ExcelColumn label="HANGHOA" value="ten" />
                                <ExcelColumn label="DVT" value="dvt" />
                                <ExcelColumn label="SL TON" value="lgton" />
                            </ExcelSheet>
                        </ExcelFile>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}
export default LookupProductInStock;