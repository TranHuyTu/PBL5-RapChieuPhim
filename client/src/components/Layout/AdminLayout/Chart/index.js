import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.floor(Math.random() * 1000)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.floor(Math.random() * 1000)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function Chart() {
    return (
        <div className={cx('wrapper')}>
            <Bar options={options} data={data} />
        </div>
    );
}

export default Chart;
