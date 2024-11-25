import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Row,
    Typography,
    Button,
    Timeline,
    DatePicker,
} from 'antd';
import Paragraph from "antd/lib/typography/Paragraph";
import Container from '../../components/container/index';
import PerfectScrollbar from '../../components/scrollBar/index';
import CommonService from '../../services/commonServices'
import dayjs from 'dayjs';
import receiptRequest from '../../models/request/receiptRequest';
import historyStatistical from "../../models/statistical/historyStatistical"
import './statistical.scss';
import { CheckOutlined, DownloadOutlined, RetweetOutlined, UploadOutlined } from '@ant-design/icons';
import EChart from './components/eChart';
const commonService = new CommonService();

const Statistical: React.FC = () => {


    const [reverse, setReverse] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { Title, Text } = Typography;
    const [timelineList, setTimelineList] = useState(Array<historyStatistical>());
    const [dataChart, setDataChart] = useState(Array<any>());
    const [modelRequest, setModelRequest] = useState((() => {
        let dataInit: receiptRequest = {
            branchID: '',
            receiptNo: '',
            frdate: new Date(),
            todate: new Date(),
            counterpartyID: '',
            materialType: '',
            businessID: '',
            employeeID: ''
        };
        return dataInit;
    }));

    useEffect(() => {
        async function GetData() {
            await GetStatisticalMonth();
        };
        GetData();
        const intervalId = setInterval(GetData, 3000);
        return () => clearInterval(intervalId);
    }, []);
    const GetStatisticalMonth = async () => {
        var getData = await commonService.GetHistoryStatistical();
        setTimelineList(getData.data);
    }
    const onChangeFrDate = async (value: any, dateString: any) => {
        setModelRequest({ ...modelRequest, frdate: value });
        setIsLoading(true);
    }
    const onChangeToDate = async (value: any, dateString: any) => {
        setModelRequest({ ...modelRequest, todate: value });
        setIsLoading(true);
    }
    const LoadDataChart = async () => {
        var getData = await commonService.GetStatisticalByDate(modelRequest);
        setDataChart(getData.data);
        setIsLoading(false);
    }
    return (
        <Container isLoading={false}>
            <div className='layout-dashboard'>
                <div className="layout-content" style={{ height: (window.innerHeight - 120), width: '100%' }}>
                    <PerfectScrollbar style={{ padding: '15px' }}>
                        <Row gutter={[24, 0]}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
                                <Card bordered={false} className="criclebox h-full">
                                    <div className="timeline-box">
                                        <Title level={4}>Lịch sử nhập xuất tháng {dayjs(new Date()).format("MM")}</Title>
                                        <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                                        <Button
                                        type="primary"
                                        className="width-100"
                                        onClick={() => setReverse(!reverse)}
                                        icon={<RetweetOutlined />}
                                    >
                                        Đảo thứ tự
                                    </Button>
                                        </Paragraph>
                                        <Timeline
                                            pending="Chờ đơn hàng mới..."
                                            className="timelinelist"
                                            reverse={!reverse}
                                        >
                                            {timelineList.map((t, index) => (
                                                <Timeline.Item color={t.color}>
                                                    <h5 className='ant-typography'>{t.color == "red" ? <UploadOutlined /> : <DownloadOutlined />}{t.title}</h5>
                                                    <Text>{t.time}</Text>
                                                </Timeline.Item>
                                            ))}
                                        </Timeline>

                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                                <Card>
                                    <h1>Chọn ngày và giờ để hiển thị thống kê</h1>
                                    <DatePicker
                                        name='frDate'
                                        value={dayjs(modelRequest.frdate)}
                                        allowClear={false}
                                        format={("MM/YYYY")}
                                        picker="month"
                                        onChange={onChangeFrDate}
                                    ></DatePicker>
                                    <DatePicker
                                        name='toDate'
                                        value={dayjs(modelRequest.todate)}
                                        format={("MM/YYYY")}
                                        allowClear={false}
                                        picker="month"
                                        onChange={onChangeToDate}
                                    ></DatePicker>
                                    <Button icon={<CheckOutlined />}
                                        color='green'
                                        type='primary'
                                        onClick={LoadDataChart}
                                    ></Button>
                                </Card>
                                <h5></h5>
                                <Card bordered={false} className="criclebox h-full">
                                    <EChart dataChart={dataChart} frDate={modelRequest.frdate} toDate={modelRequest.todate} isLoading={isLoading} />

                                </Card>
                            </Col>
                        </Row>
                    </PerfectScrollbar>
                </div>
            </div>
        </Container>
    )
}
export default Statistical;