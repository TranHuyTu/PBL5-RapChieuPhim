import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableDetail.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableMovie(props) {
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    return (
        <tbody>
            {props.data.map((value, index) => (
                <tr key={index}>
                    <td>{value[props.Key[0]]}</td>
                    <td>{value[props.Key[1]]}</td>
                    <td>{value[props.Key[2]]} Phút</td>
                    <td>{ConverTime(value[props.Key[3]])[2]}</td>
                    <td>
                        <a href={value[props.Key[4]]} target="_blank">
                            {value[props.Key[4]]}
                        </a>
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
    );
}

function TableDetail(props) {
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
        fetchData('http://localhost:8080/TrangChu');
        setLabel(['ID', 'Tên Phim', 'Thời lượng', 'Ngày khởi chiếu', 'LinkReview']);
        setKey(['ID', 'MovieName', 'TimeMovie', 'ReleaseYear', 'LinkReview']);
    }, []);
    if (data && Label && Key) {
        if (props.typeTable == 'TrangChu' || props.typeTable == '') {
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
                            <TableMovie Key={Key} data={data} />,
                        </Table>
                    </Container>
                </div>
            );
        } else if (props.typeTable == 'Phim') {
            return (
                <div className={cx('wrapper-movie')}>
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
                            <TableMovie Key={Key} data={data} />,
                        </Table>
                    </Container>
                </div>
            );
        }
    }
}

export default TableDetail;
