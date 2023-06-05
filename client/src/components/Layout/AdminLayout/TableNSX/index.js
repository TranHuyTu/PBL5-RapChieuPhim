import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableNSX.module.scss';
import Container from 'react-bootstrap/Container';
import EditNSXComponent from '../EditNSX';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableNSXDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [NSX, setNSX] = useState([]);
    const [EditNSX, setEditNSX] = useState([]);
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
        fetchData('http://localhost:8080/nsx');
        setLabel(['ID', 'Tên', 'Quốc Gia', 'Logo']);
        setKey(['ID', 'Name', 'QuocGia', 'Logo']);
    }, []);
    const HandlerShow = async function (value) {
        localStorage.setItem('NSX', JSON.stringify(value));
        setNSX(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('NSX', JSON.stringify(value));
        localStorage.setItem('EditNSX', '0');
        setNSX(value);
        setEditNSX('0');
    };
    if (localStorage.getItem('NSX') && localStorage.getItem('EditNSX')) {
        return (
            <div className={cx('')}>
                <EditNSXComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('NSX');
                        localStorage.removeItem('EditNSX');
                        setNSX([]);
                        setEditNSX('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('NSX')) {
        let NSX = JSON.parse(localStorage.getItem('NSX'));
        return (
            <div className={cx('wrapper_detail')}>
                <h1>Hãng sản xuất : {NSX.Name}</h1>
                <h3>Quốc tịch : {NSX.QuocGia}</h3>
                <img className={cx('Avatar')} src={NSX.Logo} alt={NSX.Name} />
                <p>{NSX.GioiThieu}</p>
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('NSX');
                        setNSX([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else {
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
                                            <a className={cx('btn', 'show')} onClick={() => HandlerShow(value)}>
                                                Xem
                                            </a>
                                        </td>
                                        <td>
                                            <a className={cx('btn', 'edit')} onClick={() => HandlerEdit(value)}>
                                                Sửa
                                            </a>
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
}
function TableNSX(props) {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableNSXDetail />
                <a className={cx('AddNew')}></a>
            </Container>
        </div>
    );
}

export default TableNSX;
