import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography, DatePicker, Button, Spin } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import historyStatistical from '../../../models/statistical/historyStatistical';
import dayjs from 'dayjs';
import CommonService from '../../../services/commonServices';
import Container from '../../../components/container';
const commonService = new CommonService();
interface EChartProps {
    dataChart: any[];
    frDate: Date;
    toDate: Date;
    isLoading: boolean
}
const EChart: React.FC<EChartProps> = ({isLoading, dataChart, frDate, toDate }) => {


    const { Title, Paragraph } = Typography;
    const dataChart2 = [
        {
            name: "Nhập kho cuộn",
            data: [250],
            color: "#99FF99",
        },
        {
            name: "Xuất kho cuộn",
            data: [450],
            color: "#FF9999",
        },
        {
            name: "Nhập kho băng",
            data: [150],
            color: "#99FF99",
        },
    ];

    return (
        <>
        <Spin spinning={isLoading}>
            <div className="chart-vistior">
            <h1 className='ant-typography'>Thống kê số lượng nhập xuất kho</h1>
                <Paragraph className="lastweek" >
                    {frDate.toString() == toDate.toString() ? "Tháng " + dayjs(frDate).format("MM/YYYY") + " như sau: " : "Từ tháng " + dayjs(frDate).format("MM/YYYY") + " đến tháng " + dayjs(toDate).format("MM/YYYY") + " như sau:"}
                </Paragraph>
                <Row gutter={10}>
                    {dataChart.map((v, index) => (
                        <Col xs={6} xl={6} sm={6} md={6} key={index}>
                            <div className="chart-visitor-count">
                                <Title level={4}>{v.data} sản phẩm</Title>
                                <span>{v.name}</span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <br></br>
            <div id="chart">
                <ReactApexChart
                    className="bar-chart"
                    options={{
                        chart: {
                            type: "bar",
                            width: "100%",
                            height: "auto",
                            toolbar: {
                                show: true,
                            },
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: "55%",
                                borderRadius: 5,
                            },
                        },
                        dataLabels: {
                            enabled: true,
                        },
                        stroke: {
                            show: true,
                            width: 1,
                            colors: ["transparent"],
                        },
                        grid: {
                            show: true,
                            borderColor: "#ccc",
                            strokeDashArray: 2,
                        },
                        xaxis: {
                            categories: [
                                "Số lượng"
                            ],
                            labels: {
                                show: true,
                                style: {
                                    colors: [
                                        "#fff"
                                    ],
                                },
                            },
                        },
                        yaxis: {
                            labels: {
                                show: true,
                                align: "right",
                                minWidth: 0,
                                maxWidth: 160,
                                style: {
                                    colors: [
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                        "#fff",
                                    ],
                                },
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return + val + " sản phẩm";
                                },
                            },
                        }
                    }}
                    series={dataChart}
                    type='bar'
                    height={720}
                />
            </div>
            </Spin>
        </>
    );
}

export default EChart;