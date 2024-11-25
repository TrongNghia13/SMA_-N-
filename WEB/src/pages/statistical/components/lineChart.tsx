import React from 'react';
import ReactApexChart from "react-apexcharts";
import { DatePicker, Typography } from "antd";

function LineChart() {
    const { Title, Paragraph } = Typography;
    return (
        <>
            <div className="linechart">
                <div>
                    <Title level={3}>Báo cáo doanh số</Title>
                    <DatePicker></DatePicker>
                    <Paragraph className="lastweek">
                        {/* so với tuần trước <span className="bnb2">+30%</span> */}
                    </Paragraph>
                </div>
                <div className="sales">
                    <ul>
                    </ul>
                </div>
            </div>

            <ReactApexChart
                className="full-width"
                options={{
                    chart: {
                        width: "100%",
                        height: 350,
                        type: "area",
                        toolbar: {
                            show: false,
                        },
                    },

                    legend: {
                        show: true,
                    },

                    dataLabels: {
                        enabled: true,
                    },
                    stroke: {
                        curve: "smooth",
                    },

                    yaxis: {
                        labels: {
                            style: {
                                fontSize: "14px",
                                fontWeight: 600,
                                colors: ["#8c8c8c"],
                            },
                        },
                    },

                    xaxis: {
                        labels: {
                            style: {
                                fontSize: "14px",
                                fontWeight: 600,
                                colors: [
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",
                                    "#8c8c8c",

                                ],
                            },
                        },
                        categories: [
                            "Tháng 1",
                            "Tháng 2",
                            "Tháng 3",
                            "Tháng 4",
                            "Tháng 5",
                            "Tháng 6",
                            "Tháng 7",
                            "Tháng 8",
                            "Tháng 9",
                            "Tháng 10",
                            "Tháng 11",
                            "Tháng 12",
                        ],
                    },
                }}
                series={[
                    {
                        name: "Mobile apps",
                        data: [350, 40, 300, 220, 500, 250, 400, 230, 500,300,111,12],
                    },
                    {
                        name: "Websites",
                        data: [30, 90, 40, 140, 290, 290, 340, 230, 400,300,111,12],
                    },
                ]}
                type="area"
                height={350}
                width={"100%"}
            />
        </>
    );
}

export default LineChart;