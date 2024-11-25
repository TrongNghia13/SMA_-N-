import React, { Fragment } from 'react';
import moment from 'moment';
import {NumericFormat} from 'react-number-format';
import cateBranch from '../../../models/cateBranch';
import cateStore from '../../../models/cateStore';
import reportLeftHeadline from '../../../models/reportLeftHeadline';

interface Props_SP_RP_THNX {
    option: any,
    userName: string,
    branchInfo: cateBranch,
    kho: cateStore,
    tdtBaoCao: reportLeftHeadline,
    data: Array<any>
}
class _SP_RP_THNX extends React.Component<Props_SP_RP_THNX>  {
    constructor(props: Props_SP_RP_THNX) {
        super(props);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(month: string, format: string) {
        if (month) {
            const myDate = moment(month, 'YYYYMM').toDate();
            return moment(myDate).format(format);
        }
        else {
            return '';
        }
    }
    render() {
        var indexCount = 0;
        var DataModel = Array<any>();
        var ttlgdk = 0, tttiendk = 0, ttlgnhap = 0, tttiennhap = 0,
            ttlgxuat = 0, tttienxuat = 0, ttlgton = 0, tttienton = 0;
        const { option, data, tdtBaoCao, kho, userName } = this.props;
        if (data) {
            if (data.length > 0) {
                var groupData = [
                    ...data.reduce(
                        (result, item) => (
                            result.get(item.nhomhh)
                                ? result.get(item.nhomhh).push(item.tennhom)
                                : result.set(item.nhomhh, [item.tennhom]),
                            result
                        ),
                        new Map(),
                    ),
                ].map(([label, value]) => ({ label, value }));

                if (groupData) {
                    if (groupData.length > 0) {
                        groupData.forEach((itemGr) => {
                            var _ttlgdk = 0, _tttiendk = 0, _ttlgnhap = 0, _tttiennhap = 0,
                                _ttlgxuat = 0, _tttienxuat = 0, _ttlgton = 0, _tttienton = 0;
                            var dataChild = data.filter(itemfi => itemfi.nhomhh == itemGr.label);
                            dataChild.forEach((item) => {

                                ttlgdk += item.lgdk;
                                tttiendk += item.tiendk;
                                ttlgnhap += item.lgnhap;
                                tttiennhap += item.tiennhap;
                                ttlgxuat += item.lgxuat;
                                tttienxuat += item.tienxuat;
                                ttlgton += item.lgton;
                                tttienton += item.tienton;

                                _ttlgdk += item.lgdk;
                                _tttiendk += item.tiendk;
                                _ttlgnhap += item.lgnhap;
                                _tttiennhap += item.tiennhap;
                                _ttlgxuat += item.lgxuat;
                                _tttienxuat += item.tienxuat;
                                _ttlgton += item.lgton;
                                _tttienton += item.tienton;

                            });
                            DataModel.push({
                                dutrumin: 0,
                                dvt: "",
                                lech: "",
                                lgdk: _ttlgdk,
                                lgnhap: _ttlgnhap,
                                lgton: _ttlgton,
                                lgxuat: _ttlgxuat,
                                mahh: "",
                                nhomhh: itemGr.label,
                                quycach: "",
                                slgDkL: 0,
                                slgDkN: 0,
                                slgNhapL: 0,
                                slgNhapN: 0,
                                slgTonL: 0,
                                slgTonN: 0,
                                slgXuatL: 0,
                                slgXuatN: 0,
                                tenhh: "0",
                                tennhom: itemGr.value[0],
                                tiendk: _tttiendk,
                                tiennhap: _tttiennhap,
                                tienton: _tttienton,
                                tienxuat: _tttienxuat,
                                childrens: dataChild
                            });
                        });
                    }
                }
            }
        }
        return (
            <div className="report_area">
                <div className="h-10"></div>
                <div className="inline-bolck w-70 text-left">
                    {tdtBaoCao && tdtBaoCao.leftHeadlineId > 0 ?
                        <div>
                            <h2 className="company-name-print"><b>{tdtBaoCao.leftHeadlineName}</b></h2>
                            <h3 className="company-address-print">{tdtBaoCao.line1}</h3>
                            <h3 className="company-address-print">{tdtBaoCao.line2}</h3>
                            <h3 className="company-address-print">{tdtBaoCao.line3}</h3>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div className="inline-bolck w-30 vertical-align-top text-right">
                </div>
                <div className="clearfix"></div>
                <hr />
                <div className="w-100 text-center">
                    <h2 className="title-print" style={{ marginBottom: 0 }}>TỔNG HỢP NHẬP XUẤT</h2>
                </div>
                <div className="w-100 text-center">
                    <p className="date-print font-italic">Tháng {this.formatDate(option.thang, 'MM')} - Năm {this.formatDate(option.thang, 'YYYY')}</p>
                </div>
                <div className="clearfix"></div>
                <div className="w-100 text-left">
                    <h2 className="title-print">Kho: {option.storeID} - {kho.storeName}</h2>
                </div>
                <table className="table-detail-print">
                    <tbody>
                        <tr>
                            <td className="text-center" rowSpan={2}><b>TT</b></td>
                            <td style={{ width: "10%" }} className="text-center" rowSpan={2}><b>MÃ HÀNG</b></td>
                            <td style={{ width: "25%" }} className="text-center" rowSpan={2}><b>TÊN HÀNG</b></td>
                            {/* <td className="text-center" rowSpan={2}><b>QC</b></td> */}
                            <td className="text-center" colSpan={2}><b>TỒN ĐK</b></td>
                            <td className="text-center" colSpan={2}><b>NHẬP TK</b></td>
                            <td className="text-center" colSpan={2}><b>XUẤT TK</b></td>
                            <td className="text-center" colSpan={2}><b>TỒN CK</b></td>
                        </tr>
                        <tr>
                            <td className="text-center"><b>SLG</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                            <td className="text-center"><b>SLG</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                            <td className="text-center"><b>SLG</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                            <td className="text-center"><b>SLG</b></td>
                            <td className="text-center"><b>T. TIỀN</b></td>

                        </tr>
                        {
                            DataModel && DataModel.map((dgr, indexgr) => {
                                return (
                                    <Fragment key={'_SP_RP_THNX' + indexgr + new Date().toLocaleTimeString()}>
                                        <tr key={dgr.nhomhh + new Date().toLocaleTimeString()}>
                                            <td className="text-center font-bold" colSpan={11}>{dgr.nhomhh} - {dgr.tennhom}</td>
                                        </tr>
                                        {
                                            dgr.childrens && dgr.childrens.map((d: any, index: any) => {
                                                indexCount = indexCount + 1;
                                                return (
                                                    <tr key={'_SP_RP_THNX' + d.mahh + index + new Date().toLocaleTimeString()}>

                                                        <td className="text-center">{indexCount}</td>
                                                        <td className="text-left">{d.mahh}</td>
                                                        <td className="text-left">{d.tenhh}</td>
                                                        {/* <td className="text-center">{d.quycach}</td> */}
                                                        <td className="text-right">
                                                            <NumericFormat value={d.lgdk} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>
                                                        <td className="text-right">
                                                            <NumericFormat value={d.tiendk} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>

                                                        <td className="text-right">
                                                            <NumericFormat value={d.lgnhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>
                                                        <td className="text-right">
                                                            <NumericFormat value={d.tiennhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>

                                                        <td className="text-right">
                                                            <NumericFormat value={d.lgxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>
                                                        <td className="text-right">
                                                            <NumericFormat value={d.tienxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>

                                                        <td className="text-right">
                                                            <NumericFormat value={d.lgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>
                                                        <td className="text-right">
                                                            <NumericFormat value={d.tienton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr key={'_SP_RP_THNX' + dgr.mahh + '_total_' + new Date().toLocaleTimeString()}>

                                            <td className="text-center font-bold" colSpan={3}>CỘNG THEO NHÓM HÀNG</td>

                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.lgdk} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>
                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.tiendk} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>

                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.lgnhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>
                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.tiennhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>

                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.lgxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>
                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.tienxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>

                                            <td className="text-right font-bold">
                                                <NumericFormat value={dgr.lgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>
                                            <td className="text-right">
                                                <NumericFormat value={dgr.tienton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={3} className="text-center">
                                <b>TỔNG CỘNG</b>
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={ttlgdk} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={tttiendk} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={ttlgnhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={tttiennhap} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={ttlgxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={tttienxuat} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={ttlgton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                            <td className="text-right font-bold">
                                <NumericFormat value={tttienton} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="h-10"></div>
                <div className="text-right">
                    <div style={{ paddingRight: 40 }}>
                        <span className="font-italic">
                            Cần Thơ, ngày {moment(new Date()).format("DD")} tháng {moment(new Date()).format("MM")} năm {moment(new Date()).format("YYYY")}
                        </span>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="inline-bolck w-40 text-center">
                    <h2 className="emp-name-print"><b>Người lập</b></h2>
                </div>
                <div className="inline-bolck w-60 text-right">
                    <h2 className="emp-name-print" style={{ paddingRight: 100 }}><b>Thứ trưởng đơn vị</b></h2>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}
export default _SP_RP_THNX;