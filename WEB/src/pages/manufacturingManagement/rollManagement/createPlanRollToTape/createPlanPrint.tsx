import React from 'react';
import moment from 'moment';
import cateBranch from '../../../../models/cateBranch';
import createPlanRollVm, { createPlanRollVmPrintVm } from '../../../../models/productions/createPlanRollVm';
import {NumericFormat} from 'react-number-format';

interface PropsPrintLapKeHoach {
    branchInfo: cateBranch,
    userName: string,
    lapKeHoachCuonVM: createPlanRollVm,
    lapKeHoachCuonPrintVM: Array<createPlanRollVmPrintVm>
}
class CreatePlanPrint extends React.Component<PropsPrintLapKeHoach>  {
    constructor(props: PropsPrintLapKeHoach) {
        super(props);
        this.uuidv4 = this.uuidv4.bind(this);
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    render() {
        const { branchInfo, userName, lapKeHoachCuonVM, lapKeHoachCuonPrintVM } = this.props;
        var tongkgc = 0;
        var tongkgB = 0;
        var tongsokgPL = 0;
        lapKeHoachCuonPrintVM.forEach((d) => {
            if (d.ShowInfo) {
                tongkgc += d.weightRoll;
                tongkgB += d.weightTape;
                tongsokgPL += d.weightScrap;
            }
        })
        return (
            <div className="print-container">
                <div className="inline-bolck w-75 text-left">
                    <h2 className="company-name-print"><b>{branchInfo.branchName}</b></h2>
                    <h3 className="company-address-print">{branchInfo.branchAddress}</h3>
                    <h3 className="company-phone-print">{branchInfo.branchTel}</h3>
                </div>
                <div className="inline-bolck w-25 vertical-align-top text-right">
                    <p style={{ marginBottom: 0 }}>{userName}</p>
                    <p>{moment(new Date()).format("HH:mm")}</p>
                </div>
                <div className="clearfix h-10"></div>
                <div className="inline-bolck w-100 text-center">
                    <h2 className="title-print">BẢNG CHI TIẾT KẾ HOẠCH SẢN XUẤT THÉP - B1</h2>
                </div>
                <div className="clearfix h-10"></div>
                <div className="w-100 text-left">
                    <p><b>Kế hoạch sản xuất: {lapKeHoachCuonVM.productionPlanID}</b></p>
                </div>
                <div className="clearfix"></div>
                <table className="table-detail-print">
                    <tbody>
                        <tr>
                            <td className="text-center" rowSpan={2}><b>STT</b></td>
                            <td className="text-center" colSpan={2} rowSpan={2}>
                                <b>NGUYÊN LIỆU CUỘN (kg)</b>
                            </td>
                            <td className="text-center" colSpan={3}>
                                <b> QUY CÁCH XẢ BĂNG</b>
                            </td>
                            <td className="text-center" colSpan={3}>
                                <b>DÃY BIÊN</b>
                            </td>
                            <td className="text-center" rowSpan={2} style={{ width: '100px' }}><b>LỖI SP</b></td>
                            <td className="text-center" colSpan={3}>
                                <b>THỰC TẾ SẢN XUẤT (kg)</b>
                            </td>
                            <td className="text-center" rowSpan={2}><b>NV SX</b></td>
                            <td className="text-center" rowSpan={2}><b>KCS</b></td>
                        </tr>
                        <tr>
                            <td className="text-center"><b>Bia</b></td>
                            <td className="text-center" colSpan={2}><b>Băng thành phẩm (kg)</b></td>
                            <td className="text-center"><b>T (mm)</b></td>
                            <td className="text-center"><b>P (mm)</b></td>
                            <td className="text-center"><b>kg</b></td>
                            <td className="text-center"><b>Băng</b></td>
                            <td className="text-center"><b>Dãy biên</b></td>
                            <td className="text-center"><b>Hao hụt</b></td>
                        </tr>
                        {
                            lapKeHoachCuonPrintVM && lapKeHoachCuonPrintVM.map((d, index) => (
                                <tr key={index + this.uuidv4()}>
                                    <td className="text-center">{d.ShowInfo == true ? d.indexCol : ''}</td>
                                    <td className="text-center">{d.ShowInfo == true ? d.specification : ''}</td>
                                    <td className="text-center">{d.ShowInfo == true ? d.weightRoll : ''}</td>
                                    <td className="text-center"></td>
                                    <td className="text-center">{d.imei}</td>
                                    <td className="text-center">{d.weightTape}</td>
                                    <td className="text-center">{d.ShowInfo == true ? d.widthLeft : ''}</td>
                                    <td className="text-center">{d.ShowInfo == true ? d.widgetRight : ''}</td>
                                    <td className="text-center">{d.ShowInfo == true ? d.weightScrap : ''}</td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td></td>
                            <td className="text-center">
                                <b>TỔNG CỘNG</b></td>
                            <td className="text-right">
                                <b>
                                    <NumericFormat value={tongkgc} displayType={'text'} thousandSeparator={true} prefix={''} />
                                </b>
                            </td>
                            <td></td>
                            <td></td>
                            <td className="text-right">
                                <b>
                                    <NumericFormat value={tongkgB} displayType={'text'} thousandSeparator={true} prefix={''} />
                                </b>
                            </td>
                            <td></td>
                            <td></td>
                            <td className="text-right">
                                <b>
                                    <NumericFormat value={tongsokgPL} displayType={'text'} thousandSeparator={true} prefix={''} />
                                </b>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="h-10"></div>
                <div className="inline-bolck w-50 text-left">
                </div>
                <div className="inline-bolck w-50 text-center">
                    <span className="font-italic">
                        Cần Thơ, ngày {moment(new Date()).format("DD")} tháng {moment(new Date()).format("MM")} năm {moment(new Date()).format("YYYY")}
                    </span>
                </div>
                <div className="clearfix"></div>
                <div className="inline-bolck w-50 text-center">
                    <h2 className="emp-name-print"><b>Người lập bảng</b></h2>
                </div>
                <div className="inline-bolck w-50 text-center">
                    <h2 className="emp-name-print"><b>Quản đốc</b></h2>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}
export default CreatePlanPrint;