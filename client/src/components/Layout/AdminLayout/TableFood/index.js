import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableFood.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableFood(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const fetchData = async (API) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .post(
                    API,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setData(response.data.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('http://localhost:8080/foods');
        setLabel(['ID', 'Tên món ăn', 'Giá', 'Hình ảnh']);
        setKey(['ID', 'ItemName', 'Price', 'AvatarLink']);
    }, []);
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
                                    <td>
                                        <img
                                            className={cx('avatar')}
                                            src={value[Key[3]] ? value[Key[3]] : AvatarError}
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

export default TableFood;
