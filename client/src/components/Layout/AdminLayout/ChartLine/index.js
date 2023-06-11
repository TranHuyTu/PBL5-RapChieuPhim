import React from 'react';
import classNames from 'classnames/bind';
import styles from './ChartLine.module.scss';
import axiosClient from '~/api/axiosClient';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
const cx = classNames.bind(styles);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartLine() {
    const [RawData, setRawData] = useState([]);
    const [RawDataFood, setRawDataFood] = useState([]);
    const [numMonth, setNumMonth] = useState(6);
    useEffect(() => {
        const FetchAPI = async function () {
            try {
                await axiosClient
                    .post('/thongke')
                    .then((response) => {
                        setRawData(response.result);
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
                await axiosClient
                    .post('/thongke/food')
                    .then((response) => {
                        setRawDataFood(response.result);
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        FetchAPI();
    }, []);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ doanh thu bán vé của website',
            },
        },
    };
    const ListMonth = function getRecentSixMonths() {
        const months = [];
        const today = new Date();

        for (let i = numMonth - 1; i >= 0; i--) {
            const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthName = month.toLocaleString('default', { month: 'long' });
            months.push(monthName);
        }

        return months;
    };
    const getMonth = function getMonthFromDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // Vì phương thức getMonth() trả về giá trị từ 0 đến 11

        return month;
    };
    const labels = ListMonth();
    const LoadData = function (rawData, numMonth) {
        console.log(rawData);
        let Revenue = [];
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        console.log(currentMonth);
        for (let i = numMonth; i > 0; i--) {
            let data = 0;
            let monthnew = currentMonth - (i - 1);
            switch (monthnew) {
                case -1:
                    monthnew = 12;
                    break;
                case -2:
                    monthnew = 11;
                    break;
                case -3:
                    monthnew = 10;
                    break;
                case -4:
                    monthnew = 9;
                    break;
                case -5:
                    monthnew = 8;
                    break;
                case -6:
                    monthnew = 7;
                    break;
                case -7:
                    monthnew = 6;
                    break;
                case -8:
                    monthnew = 5;
                    break;
                case -9:
                    monthnew = 4;
                    break;
                case -10:
                    monthnew = 3;
                    break;
                case -11:
                    monthnew = 2;
                    break;
                case -12:
                    monthnew = 1;
                    break;
                default:
                    break;
            }
            rawData.map((value, index) => {
                const month = getMonth(value.BillTime);
                if (month == monthnew) {
                    data += value.Price;
                }
            });
            Revenue.push(data);
        }
        return Revenue;
    };
    const LoadDataFoos = function (rawData, numMonth) {
        console.log(rawData);
        let Revenue = [];
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        console.log(currentMonth);
        for (let i = numMonth; i > 0; i--) {
            let data = 0;
            let monthnew = currentMonth - (i - 1);
            switch (monthnew) {
                case -1:
                    monthnew = 12;
                    break;
                case -2:
                    monthnew = 11;
                    break;
                case -3:
                    monthnew = 10;
                    break;
                case -4:
                    monthnew = 9;
                    break;
                case -5:
                    monthnew = 8;
                    break;
                case -6:
                    monthnew = 7;
                    break;
                case -7:
                    monthnew = 6;
                    break;
                case -8:
                    monthnew = 5;
                    break;
                case -9:
                    monthnew = 4;
                    break;
                case -10:
                    monthnew = 3;
                    break;
                case -11:
                    monthnew = 2;
                    break;
                case -12:
                    monthnew = 1;
                    break;
                default:
                    break;
            }
            rawData.map((value, index) => {
                const month = getMonth(value.BillTime);
                if (month == monthnew) {
                    data += value.Price * value.sl;
                }
            });
            Revenue.push(data);
        }
        return Revenue;
    };
    if (RawData && RawDataFood) {
        const ListData = LoadData(RawData, numMonth);
        const ListDataFood = LoadDataFoos(RawDataFood, numMonth);
        const data = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels.map((value, index) => ListData[index]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };
        const data2 = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels.map((value, index) => ListDataFood[index]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };
        return (
            <div className={cx('wrapper')}>
                <Line options={options} data={data} />
                <div className={cx('wrapper-btn')}>
                    <button
                        className={cx('btn')}
                        onClick={() => {
                            setNumMonth(12);
                        }}
                    >
                        Theo năm
                    </button>
                    <button
                        className={cx('btn')}
                        onClick={() => {
                            setNumMonth(6);
                        }}
                    >
                        Theo quý
                    </button>
                </div>
                <Line options={options} data={data2} />
            </div>
        );
    }
}

export default ChartLine;
