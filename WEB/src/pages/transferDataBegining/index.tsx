import React, { Fragment, useState, useEffect } from 'react';
import { GridColumn, DataGrid } from 'rc-easyui';
import { Button, message, DatePicker, Select, Modal } from 'antd';
import {NumericFormat} from 'react-number-format';

import moment from 'moment';
import dayjs from 'dayjs';

import Container from '../../components/container/index';

import cateBranch from '../../models/cateBranch';
import cateStore from '../../models/cateStore';

import { APIStatus } from '../../configs/APIConfig';
import CateStoreService from '../../services/cateStoreService';
import CateBranchService from '../../services/cateBranchService';
import ReceiptService from '../../services/receiptService';
import { PlusOutlined } from '@ant-design/icons';

const cateStoreService = new CateStoreService();
const cateBranchService = new CateBranchService();
const receiptService = new ReceiptService();

const { MonthPicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

const TransferDataBegining: React.FC = () => {

    const [modelRequest, setModelRequest] = useState({
        branchID: '',
        storeID: '',
        thang: moment(new Date()).format("YYYYMM"),
        nextMonth: moment(new Date()).add(1, 'M').format("YYYYMM"),
        nextMonthStr: moment(new Date()).add(1, 'M').format("MM/YYYY"),
    });

    const [mosoInfo, setMoSoInfo] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dataKiemKho, setDataKiemKho] = useState({ lst: Array<any>(), totalSL: 0, totalThanhTien: 0 });

    const [dataDonviUD, setDataDonviUD] = useState((() => {
        let dataInit: Array<cateBranch> = [] as any;
        return dataInit;
    }));

    const [dataKho, setDataKho] = useState((() => {
        let dataInit: Array<cateStore> = [] as any;
        return dataInit;
    }));

    const [dataKhoSearch, setDataKhoSearch] = useState((() => {
        let dataInit: Array<cateStore> = [] as any;
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {
            await CheckMoSo(moment(new Date()).add(1, 'M').format("YYYYMM"));
            await GetDonviUD();
            await GetDataKho();
        };
        GetData();
    }, []);

    const CheckMoSo = async (thang: string) => {
        var getDdata = await receiptService.CheckMonthIsOpen(thang);
        setMoSoInfo(getDdata.data);
    }

    const GetDonviUD = async () => {
        var getDdata = await cateBranchService.GetList();
        setDataDonviUD(getDdata.data);
    }

    const GetDataKho = async () => {
        var getDdata = await cateStoreService.GetListStore();
        setDataKho(getDdata.data);
    }

    const onChangeDonviUD = async (value: any) => {
        setModelRequest({ ...modelRequest, branchID: value, storeID: '' });
        setDataKhoSearch(dataKho.filter(p => {
            return p.branchID === value;
        }));
    }

    const onChangeKho = async (value: any) => {
        setModelRequest({ ...modelRequest, storeID: value });
    }

    const onChangeMonth = async (date: any, dateString: any) => {
        await CheckMoSo(moment(date).add(1, 'M').format("YYYYMM"));
        setModelRequest({
            ...modelRequest,
            thang: moment(date).format("YYYYMM"),
            nextMonth: moment(date).add(1, 'M').format("YYYYMM"),
            nextMonthStr: moment(date).add(1, 'M').format("MM/YYYY"),
        });
    }

    const KiemKhoHang = async (e: any) => {
        e.preventDefault();
        if (modelRequest.branchID === '') {
            message.error('Vui lòng chọn đơn vị');
            return false;
        }
        if (modelRequest.storeID === '') {
            message.error('Vui lòng chọn kho');
            return false;
        }
        // setLoading(true);
        // const data = await dataService.SP_KIEMKHO_HH(modelRequest.branchID, modelRequest.storeID, modelRequest.thang);
        // if (data.status === APIStatus.ERROR) {
        //     message.error(data.message);
        //     setDataKiemKho({ ...dataKiemKho, lst: [], totalSL: 0, totalThanhTien: 0 });
        //     setLoading(false);
        // }
        // else {
        //     var _sl = 0, _tt = 0;
        //     if (data.data) {
        //         data.data.forEach(ele => {
        //             _sl += ele.soluong;
        //             _tt += ele.thanhtien;
        //         });
        //         setDataKiemKho({ ...dataKiemKho, lst: data.data, totalSL: _sl, totalThanhTien: _tt });
        //     }
        //     else {
        //         setDataKiemKho({ ...dataKiemKho, lst: [], totalSL: 0, totalThanhTien: 0 });
        //     }

        //     setLoading(false);
        // }
    }

    const KetChuyenKhoHang = async (e: any) => {
        e.preventDefault();
        if (dataKiemKho.lst.length <= 0) {
            message.error('Vui lòng bấm kiểm kho để lấy dữ liệu kho hàng');
            return false;
        }

        if (mosoInfo === false) {
            message.error('Tháng ' + modelRequest.nextMonthStr + ' chưa được mở sổ');
            return false;
        }

        confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn chuyển kho ' + modelRequest.storeID + ' qua tháng mới ' + modelRequest.nextMonthStr + ' không?',
            onOk() {
                confirmKetChuyenKhoHang(e);
            },
            onCancel() { },
        });

    }

    const confirmKetChuyenKhoHang = async (e: any) => {

        // setLoading(true);
        // const data = await dataService.SP_CHUYENKHO_HH(modelRequest.branchID, modelRequest.storeID, modelRequest.thang);
        // if (data.status === APIStatus.ERROR) {
        //     message.error(data.message);
        //     setLoading(false);
        // }
        // else {
        //     message.success('Kết chuyển kho hàng thành công');
        //     setLoading(false);
        // }

    }


    return (
        <Fragment>
            <div className="page-pannel">
                <div className="w-100">
                    <Container isLoading={loading}>
                        <div className="tool-bar-header w-100 bg-e6e6e6" style={{ padding: 6 }}>
                            <div className="inline-bolck w-30">
                                <div className="lable-cotrol inline-bolck mr-right-5 ">
                                    Đơn vị
                                </div>
                                <div className="inline-bolck mr-right-5 input-control input-select-width-300">
                                    <Select
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        filterOption={false}
                                        allowClear={true}
                                        onChange={onChangeDonviUD}
                                        optionLabelProp="title"
                                        getPopupContainer={(trigger: any) => trigger.parentNode}
                                    >
                                        {dataDonviUD && dataDonviUD.map(d => (
                                            <Option data-name={d.branchName} title={d.branchName} value={d.branchID} key={d.branchID}>
                                                <div style={{ width: 200 }}>
                                                    <span>{d.branchID} - {d.branchName}</span>
                                                </div>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="inline-bolck w-25">
                                <div className="lable-cotrol inline-bolck mr-right-5 ">
                                    Kho
                                </div>
                                <div className="inline-bolck mr-right-5 input-control input-select-width-300">
                                    <Select
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        filterOption={false}
                                        allowClear={true}
                                        onChange={onChangeKho}
                                        optionLabelProp="title"
                                        getPopupContainer={(trigger: any) => trigger.parentNode}
                                    >
                                        {dataKhoSearch && dataKhoSearch.map(d => (
                                            <Option data-name={d.storeName} title={d.storeName} value={d.storeID} key={d.storeID}>
                                                <div style={{ width: 200 }}>
                                                    <span>{d.storeID} - {d.storeName}</span>
                                                </div>
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="inline-bolck w-20">
                                <div className="lable-cotrol inline-bolck mr-right-5 ">
                                    Tháng
                                </div>
                                <div className="inline-bolck mr-right-5 input-control">
                                    <MonthPicker defaultValue={dayjs(new Date())}
                                        onChange={onChangeMonth} format="MM/YYYY"
                                        style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="inline-bolck w-10">
                                <Button loading={loading} className="button" type="primary" icon={<PlusOutlined/>} onClick={(e) => KiemKhoHang(e)}>Kiểm kho</Button>
                            </div>
                        </div>
                        <div>
                            <DataGrid
                                filterable
                                filterRules={[]}
                                data={dataKiemKho.lst}
                                style={{ height: (window.innerHeight - 170) }}
                                virtualScroll
                                pageSize={50}
                                showFooter
                                footerData={[
                                    { ten: "", soluong: dataKiemKho.totalSL, thanhtien: dataKiemKho.totalThanhTien }
                                ]}
                                selectionMode="single">
                                <GridColumn title="Mã Hàng" field="mahh" width="15%" />
                                <GridColumn title="Tên Hàng" field="ten" width="25%" />
                                <GridColumn title="Đvt" field="dvt" width="10%" />
                                <GridColumn field="soluong" width="10%" align="right"
                                    header={() => <span>Số Lượng</span>}
                                    footer={() =>
                                        <span className="text-red"><NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={dataKiemKho.totalSL} /></span>
                                    }
                                    render={({ row }: any) => (
                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.soluong} />
                                    )}
                                />
                                <GridColumn field="dongia" width="10%" align="right"
                                    header={() => <span>Đơn Giá</span>}
                                    render={({ row }: any) => (
                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.dongia} />
                                    )}
                                />
                                <GridColumn field="thanhtien" width="10%" align="right"
                                    header={() => <span>Thành Tiền</span>}
                                    footer={() =>
                                        <span className="text-red"><NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={dataKiemKho.totalThanhTien} /></span>
                                    }
                                    render={({ row }: any) => (
                                        <NumericFormat readOnly className="ant-input-number-input input-text-right-grid" thousandSeparator={true} value={row.thanhtien} />
                                    )}
                                />
                                <GridColumn title="Ghi chú" field="ghichu" width="20%" />
                            </DataGrid>
                        </div>
                        <div className="text-center" style={{ marginTop: 10 }}>
                            <Button loading={loading} className="button" type="primary" icon={<PlusOutlined/>} size="small" onClick={(e) => KetChuyenKhoHang(e)}>Kết Chuyển</Button>
                        </div>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}
export default TransferDataBegining;