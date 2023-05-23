import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuFood.module.scss';

import Table from 'react-bootstrap/Table';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TableFood from '../TableFood';
import ChiTietHoaDon from '../ChiTietHoaDon';

import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function MenuFood({ chilren }) {
    const [tickets, setTickets] = useState([]);

    const [SlVe1, setStateVe1] = useState(0);
    const [SlVe2, setStateVe2] = useState(0);
    const [SlVe3, setStateVe3] = useState(0);
    const [Btn, setBtn] = useState(0);
    const Sl = [SlVe1, SlVe2, SlVe3];
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .postForm(
                        'http://localhost:8080/price',
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setTickets(response.data.result);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        localStorage.setItem('TongTickets', 0);
    }, []);

    const handleAdd = [
        function handleAddVe1() {
            setStateVe1(SlVe1 + 1);
        },
        function handleAddVe2() {
            setStateVe2(SlVe2 + 1);
        },
        function handleAddVe3() {
            setStateVe3(SlVe3 + 1);
        },
    ];
    const handleDis = [
        function handleDisVe1() {
            if (SlVe1 > 0) setStateVe1(SlVe1 - 1);
        },
        function handleDisVe2() {
            if (SlVe2 > 0) setStateVe2(SlVe2 - 1);
        },
        function handleDisVe3() {
            if (SlVe3 > 0) setStateVe3(SlVe3 - 1);
        },
    ];
    function FoodDetail() {
        let ListFoods = [];
        let SL = JSON.parse(localStorage.getItem('SLFood'));
        let Foods = JSON.parse(localStorage.getItem('Foods'));
        if (SL) {
            SL.map((value, index) => {
                if (value != 0) {
                    ListFoods.push(Foods[index].ItemName);
                }
            });
        }

        return ListFoods;
    }
    const [bgrError, setBgrError] = useState('');
    const [messTB, setMessTB] = useState('');
    function handleBTN() {
        const SL = JSON.parse(localStorage.getItem('SLTicket'));
        let check = false;
        SL.map((value) => {
            if (value != 0) check = true;
        });
        if (check == true) {
            setBtn(Btn + 1);
        } else {
            setBgrError('CancelError');
            setMessTB('CancelError');
        }
    }
    function HandleCancel() {
        console.log('Cancelling');
        setBgrError('');
        setMessTB('');
    }

    if (tickets) {
        localStorage.setItem('SLTicket', JSON.stringify(Sl));
        localStorage.setItem('Tickets', JSON.stringify(tickets));
        localStorage.setItem('listSeat', JSON.stringify([]));
        let Tong = 0;
        return (
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <h3 className={cx('title')}>Chọn vé /Thức Ăn</h3>
                    <Table striped bordered hover className={cx('table-ve')}>
                        <thead className={cx('head-table')}>
                            <tr>
                                <th className={cx('header-table', 'title')}>Loại Vé</th>
                                <th className={cx('header-table')}>Số Lượng</th>
                                <th className={cx('header-table')}>Giá(VND)</th>
                                <th className={cx('header-table')}>Tông Tiền (VND)</th>
                            </tr>
                        </thead>
                        <tbody className={cx('body-table')}>
                            {tickets.map((value, index) => (
                                <tr key={index} className={cx('body-row')}>
                                    <td className={cx('row-table')}>
                                        <h5>{value.TicketType}</h5>
                                    </td>
                                    <td className={cx('row-table')}>
                                        <div className={cx('icon')}>
                                            <a onClick={handleDis[index]}>
                                                <DoNotDisturbOnIcon fontSize="large" />
                                            </a>
                                            <p>{Sl[index]}</p>
                                            <a onClick={handleAdd[index]}>
                                                <AddCircleIcon fontSize="large" />
                                            </a>
                                        </div>
                                    </td>
                                    <td className={cx('row-table')}>
                                        <p className={cx('desc')}>{value.Price}</p>
                                    </td>
                                    <td className={cx('row-table')}>
                                        <p className={cx('desc')}>{value.Price * Sl[index]}</p>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className={cx('row-table')}>
                                    <h5>Tổng</h5>
                                </td>
                                <td className={cx('row-table')}></td>
                                <td className={cx('row-table')}></td>
                                <td className={cx('row-table')}>
                                    {tickets.map((value, index) => {
                                        Tong += value.Price * Sl[index];
                                    })}
                                    <p className={cx('desc')}>{Tong}</p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <TableFood Tong={Tong} />
                    <button className={cx('btnContinue')} onClick={handleBTN}>
                        Chọn đồ ăn
                    </button>
                </div>

                <ChiTietHoaDon
                    Tong={Tong + JSON.parse(localStorage.getItem('TongFoods'))}
                    ListFoods={FoodDetail()}
                    TypeDetail={1}
                    listSeat={[]}
                />
                <div className={cx('bgrError', bgrError)}></div>
                <div className={cx('messTB', messTB)}>
                    <h1 className={cx('title-notification')}>Thông Báo</h1>
                    <p className={cx('desc')}>Vui lòng chọn số lượng vé !!!</p>
                    <a className={cx('btn')} onClick={HandleCancel}>
                        OK
                    </a>
                </div>
            </div>
        );
    }
}
export default MenuFood;
