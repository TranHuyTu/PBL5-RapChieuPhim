import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableShowTime.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableShowTime(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const fetchData = async (API) => {
        try {
            await axios.post(API).then((response) => {
                setData(response.data.result);
                console.log(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('http://localhost:8080/showtime');
        setLabel(['ID', 'Tên Phim', 'Phòng', 'Loại Phòng', 'Thời Gian']);
        setKey(['ShowtimeID', 'MovieName', 'HallID', 'Class', 'ShowtimeDateTime']);
    }, []);
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    if (data && Label && Key) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <Table striped bordered hover>
                        <thead className={cx('thead')}>
                            <tr>
                                {Label.map((value, index) => (
                                    <th key={index}>{value}</th>
                                ))}

                                <th>
                                    <p className={cx('btn')}>Xem</p>
                                </th>
                                <th>
                                    <p className={cx('btn')}>Sửa</p>
                                </th>
                                <th>
                                    <p className={cx('btn')}>Xóa</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, index) => (
                                <tr key={index}>
                                    <td>{value[Key[0]]}</td>
                                    <td>{value[Key[1]]}</td>
                                    <td>{value[Key[2]]}</td>
                                    <td>{value[Key[3]]}</td>
                                    <td>
                                        {ConverTime(value[Key[4]])[0]} : {ConverTime(value[Key[4]])[1]} --{' '}
                                        {ConverTime(value[Key[4]])[2]}
                                    </td>
                                    <td>
                                        <a className={cx('btn', 'show')}>Xem</a>
                                    </td>
                                    <td>
                                        <a className={cx('btn', 'edit')}>Sửa</a>
                                    </td>
                                    <td>
                                        <a className={cx('btn', 'delete')}>Xóa</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default TableShowTime;
