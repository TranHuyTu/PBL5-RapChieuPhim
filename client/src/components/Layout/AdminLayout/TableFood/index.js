import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableFood.module.scss';
import Container from 'react-bootstrap/Container';
import EditFoodComponent from '../EditFood';
import AddFoodComponent from '../AddFood';
import { useState, useEffect } from 'react';
import axios from '~/api/axiosClient';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableFoodDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Food, setFood] = useState([]);
    const [EditFood, setEditFood] = useState([]);
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const navigate = useNavigate();
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
                    setData(response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('/foods');
        setLabel(['ID', 'Tên món ăn', 'Giá', 'Hình ảnh']);
        setKey(['ID', 'ItemName', 'Price', 'AvatarLink']);
    }, []);
    const HandlerShow = async function (value) {
        localStorage.setItem('Food', JSON.stringify(value));
        setFood(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Food', JSON.stringify(value));
        localStorage.setItem('EditFood', '0');
        setFood(value);
        setEditFood('0');
    };
    const HandlerRemove = async function (values) {
        console.log('Remove', values);
        try {
            if (values.AvatarLink != '') {
                let Url = values.AvatarLink.split('learn_nodejs/')[1];
                const UrlDelete = { imageUrl: 'learn_nodejs/' + Url.split('.')[0] };
                await axios
                    .post('/pathImg', UrlDelete, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);

            await axios
                .delete(
                    '/foods/remove/' + values.ID,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.error(error);
        }
        navigate('/');
    };
    if (localStorage.getItem('Food') && localStorage.getItem('EditFood')) {
        return (
            <div className={cx('')}>
                <EditFoodComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Food');
                        localStorage.removeItem('EditFood');
                        setFood([]);
                        setEditFood('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Food')) {
        let Food = JSON.parse(localStorage.getItem('Food'));
        return (
            <div className={cx('wrapper_detail')}>
                <h1>Tên Combo : {Food.ItemName}</h1>
                <h3>Chi tiết : {Food.Description}</h3>
                <img className={cx('Avatar')} src={Food.AvatarLink} alt={Food.ItemName} />
                <h3>Giá : {Food.Price} Đ</h3>
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Food');
                        setFood([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (JSON.parse(localStorage.getItem('AddFood')) === 0) {
        return (
            <div>
                <AddFoodComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('AddFood');
                        setFood([]);
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
                                            <a className={cx('btn', 'delete')} onClick={() => HandlerRemove(value)}>
                                                Xóa
                                            </a>
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
function TableFood(props) {
    const [BtnAddFood, setBtnAddFood] = useState('');
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableFoodDetail />
                <a
                    className={cx('AddNew')}
                    onClick={(e) => {
                        localStorage.setItem('AddFood', '0');
                        setBtnAddFood(0);
                        navigate('/Admin');
                    }}
                ></a>
            </Container>
        </div>
    );
}

export default TableFood;
