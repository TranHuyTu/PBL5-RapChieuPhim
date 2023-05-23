import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableFood.module.scss';

import Table from 'react-bootstrap/Table';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Tablefood(props) {
    const [foods, setFoods] = useState([]);
    const [SL, SetStateSL] = useState([]);
    let Tong = useRef(0);
    let len = useRef();
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .postForm(
                        'http://localhost:8080/foods',
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setFoods(response.data.result);
                        len.current = response.data.result.length;
                        if (len.current) {
                            SetStateSL(Array(len.current).fill(0));
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        localStorage.setItem('TongFoods', 0);
    }, []);
    if (foods && len.current) {
        localStorage.setItem('SLFood', JSON.stringify(SL));
        localStorage.setItem('Foods', JSON.stringify(foods));
        return (
            <div className={cx('wrapper')}>
                <Table striped bordered hover className={cx('table-food')}>
                    <thead className={cx('head-table')}>
                        <tr>
                            <th className={cx('header-table', 'title-header')}>Combo</th>
                            <th className={cx('header-table')}>Số Lượng</th>
                            <th className={cx('header-table')}>Giá(VND)</th>
                            <th className={cx('header-table')}>Tông Tiền (VND)</th>
                        </tr>
                    </thead>
                    <tbody className={cx('body-table')}>
                        {foods.map((value, index) => (
                            <tr key={index} className={cx('body-row')}>
                                <td className={cx('row-table')}>
                                    <div className={cx('main-food')}>
                                        <img src={value.AvatarLink} className={cx('img-food')} />
                                        <div className={cx('title-food')}>
                                            <h5 className={cx('title')}>{value.ItemName}</h5>
                                            <p className={cx('desc-food')}>{value.Description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('row-table')}>
                                    <div className={cx('icon')}>
                                        <a
                                            onClick={() => {
                                                if (SL[index] > 0) {
                                                    SL[index] = SL[index] - 1;
                                                    SetStateSL(SL);
                                                    localStorage.setItem('SLFood', JSON.stringify(SL));
                                                    let ElementSL =
                                                        document.querySelectorAll('.TableFood_SLFood__qzMw2');
                                                    let SumElementDetail = document.querySelectorAll('.SumDetail');
                                                    let SumElement = document.querySelector('.Sum');
                                                    SL.map((value, index) => {
                                                        ElementSL[index].innerHTML = value;
                                                        SumElementDetail[index].innerHTML = value * foods[index].Price;
                                                    });
                                                    Tong.current = 0;
                                                    SL.map((value, index) => {
                                                        Tong.current = Tong.current + value * foods[index].Price;
                                                    });
                                                    SumElement.innerHTML = Tong.current;
                                                    {
                                                        localStorage.setItem('TongFoods', Tong.current);
                                                    }
                                                }
                                            }}
                                        >
                                            <DoNotDisturbOnIcon fontSize="large" />
                                        </a>
                                        <p className={cx('SLFood')}>{SL[index]}</p>
                                        <a
                                            onClick={() => {
                                                SL[index] = SL[index] + 1;
                                                SetStateSL(SL);
                                                localStorage.setItem('SLFood', JSON.stringify(SL));
                                                let ElementSL = document.querySelectorAll('.TableFood_SLFood__qzMw2');
                                                console.log(ElementSL);
                                                let SumElementDetail = document.querySelectorAll('.SumDetail');
                                                let SumElement = document.querySelector('.Sum');
                                                SL.map((value, index) => {
                                                    ElementSL[index].innerHTML = value;
                                                    SumElementDetail[index].innerHTML = value * foods[index].Price;
                                                });
                                                Tong.current = 0;
                                                SL.map((value, index) => {
                                                    Tong.current = Tong.current + value * foods[index].Price;
                                                });
                                                SumElement.innerHTML = Tong.current;
                                                {
                                                    localStorage.setItem('TongFoods', Tong.current);
                                                }
                                            }}
                                        >
                                            <AddCircleIcon fontSize="large" />
                                        </a>
                                    </div>
                                </td>
                                <td className={cx('row-table', 'desc')}>{value.Price}</td>
                                <td className={cx('row-table', 'desc', 'SumDetail')}>{value.Price * SL[index]}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className={cx('row-table')}>
                                <h5>Tổng</h5>
                            </td>
                            <td className={cx('row-table')}></td>
                            <td className={cx('row-table')}></td>
                            <td className={cx('row-table', 'desc', 'Sum')}>{Tong.current}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Tablefood;
