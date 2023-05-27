import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TablePromotion.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TablePromotion(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
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
        fetchData('http://localhost:8080/promotion');
        setLabel(['ID', 'Tên Khuyến mãi', 'Ngày bắt đầu', 'Ngày kết thúc', 'Hình ảnh']);
        setKey(['ID', 'Title', 'Start_time', 'End_time', 'AvatarLink']);
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

                                <th>Xem</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, index) => (
                                <tr key={index}>
                                    <td>{value[Key[0]]}</td>
                                    <td>{value[Key[1]]}</td>
                                    <td>{ConverTime(value[Key[2]])[2]}</td>
                                    <td>{ConverTime(value[Key[3]])[2]}</td>
                                    <td>
                                        <img
                                            className={cx('avatar')}
                                            src={value[Key[4]] ? value[Key[4]] : AvatarError}
                                            alt={value[Key[1]]}
                                        />
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
                    <a className={cx('AddNew')}></a>
                </Container>
            </div>
        );
    }
}

export default TablePromotion;
