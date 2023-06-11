import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Btn.module.scss';

import { useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { useState, useLayoutEffect } from 'react';
import axios from '~/api/axiosClient';

const cx = classNames.bind(styles);

function Btn(props) {
    const [CheckError, setCheckError] = useState('');
    const [SdkReady, setSdkReady] = useState(false);
    function ShowFoodFocus() {
        let StrFood = '';
        props.ListFoods.map((value) => {
            StrFood += value + ',';
        });
        return StrFood;
    }
    const navigate = useNavigate();
    const HandleComtinue = (ShowFood, Tong) => {
        let Bill = { FoodBill: ShowFood, TongBill: Tong };
        localStorage.setItem('Bill', JSON.stringify(Bill));
        const SL = JSON.parse(localStorage.getItem('SLTicket'));
        let check = false;
        SL.map((value) => {
            if (value != 0) check = true;
        });
        if (check) {
            navigate('/ListSeat');
        } else {
            setCheckError('CheckError');
        }
    };

    const handleGoBack = () => {
        localStorage.removeItem('Bill');
        navigate(-1); // Quay lại trang cũ
    };
    const handleContinue = () => {
        const sum = JSON.parse(localStorage.getItem('SLTicket')).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        if (JSON.parse(localStorage.getItem('listSeat')).length == sum) {
            navigate('/ThanhToan');
        } else {
            setCheckError('CheckError');
        }
    };
    const addBoodFoods = (newBoodFoods) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            axios
                .post('/bookedfoods/add', newBoodFoods, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const addBoodTickets = async (newBoodTickets) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .post('/ticket/add', newBoodTickets, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const addBill = async (newBill) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .post('/Bill/add', newBill, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    localStorage.setItem('IDBill', response.result.bill.insertId);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const UpdateSeat = async (seat) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .put('/Seat/update', seat, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const UpdateMoney = async (token, monney) => {
        let User = [];
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .postForm(
                    '/login/check_token',
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    User.push(response.data.data);
                });
        } catch (error) {
            console.error(error);
        }
        let NewDetailAccount = {
            ID: User[0].ID,
            Username: User[0].Username,
            Password: User[0].Password,
            Name: User[0].Name,
            Email: User[0].Email,
            CheckAdmin: User[0].CheckAdmin,
            Money: monney,
            SDT: User[0].SDT,
            SEX: User[0].SEX,
            DateOfBirth: User[0].DateOfBirth,
            Avatar: User[0].Avatar,
        };
        try {
            await axios
                .put('/account/update', NewDetailAccount, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response.result);
                });
        } catch (error) {
            console.error(error);
        }
        // const user = User[0].Username;
        // const password = User[0].Password;
        // let item = { user, password };
        // let result = fetch('http://localhost:8080/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(item),
        // });
        // result = result.json();
        // localStorage.setItem('token-login', JSON.stringify(result['result']));
        console.log(User);
    };
    const getIDBill = async () => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .post('/Bill', 1, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleThanhToan = async () => {
        if (localStorage.getItem('monney') >= 0) {
            const currentDate = new Date().toISOString();
            console.log(currentDate);
            const newBill = {
                BillTime: currentDate,
                IDKH: JSON.parse(localStorage.getItem('IDKH')),
            };
            await addBill(newBill);
            const IDBill = JSON.parse(localStorage.getItem('IDBill'));

            const SLTicket = JSON.parse(localStorage.getItem('SLTicket'));
            const Tickets = JSON.parse(localStorage.getItem('Tickets'));
            const listSeat = JSON.parse(localStorage.getItem('listSeat'));
            SLTicket.map((value, index) => {
                if (value != 0) {
                    for (let i = 0; i < value; i++) {
                        const IDSeat = listSeat.shift();
                        const newBoodTicket = {
                            ShowtimeID: JSON.parse(localStorage.getItem('showtime')).ShowtimeID,
                            SeatNumber: IDSeat,
                            IDPrice: Tickets[index].PriceID,
                            IDBillAll: IDBill,
                        };
                        console.log(newBoodTicket);
                        addBoodTickets(newBoodTicket);
                        const seat = {
                            ID: IDSeat,
                            CheckSeat: 1,
                            IDHalls: JSON.parse(localStorage.getItem('showtime')).HallID,
                        };
                        UpdateSeat(seat);
                    }
                }
            });
            const SLFood = JSON.parse(localStorage.getItem('SLFood'));
            const Foods = JSON.parse(localStorage.getItem('Foods'));
            SLFood.map((value, index) => {
                if (value != 0) {
                    const newBoodFood = {
                        IDFood: Foods[index].ID,
                        sl: value,
                        IDBillAll: IDBill,
                    };
                    console.log(newBoodFood);
                    addBoodFoods(newBoodFood);
                }
            });

            const token = localStorage.getItem('token-login');
            UpdateMoney(token, JSON.parse(localStorage.getItem('monney')));
            console.log('Thanh toán thành công');
            localStorage.clear();
            // localStorage.setItem('token-login', token);
            navigate('/');
        } else {
            setCheckError('CheckError');
        }
    };
    const handleThanhToanPayPal = async () => {
        if (localStorage.getItem('monney') >= 0) {
            const currentDate = new Date().toISOString();
            console.log(currentDate);
            const newBill = {
                BillTime: currentDate,
                IDKH: JSON.parse(localStorage.getItem('IDKH')),
            };
            await addBill(newBill);
            const IDBill = JSON.parse(localStorage.getItem('IDBill'));

            const SLTicket = JSON.parse(localStorage.getItem('SLTicket'));
            const Tickets = JSON.parse(localStorage.getItem('Tickets'));
            const listSeat = JSON.parse(localStorage.getItem('listSeat'));
            SLTicket.map((value, index) => {
                if (value != 0) {
                    for (let i = 0; i < value; i++) {
                        const IDSeat = listSeat.shift();
                        const newBoodTicket = {
                            ShowtimeID: JSON.parse(localStorage.getItem('showtime')).ShowtimeID,
                            SeatNumber: IDSeat,
                            IDPrice: Tickets[index].PriceID,
                            IDBillAll: IDBill,
                        };
                        console.log(newBoodTicket);
                        addBoodTickets(newBoodTicket);
                        const seat = {
                            ID: IDSeat,
                            CheckSeat: 1,
                            IDHalls: JSON.parse(localStorage.getItem('showtime')).HallID,
                        };
                        UpdateSeat(seat);
                    }
                }
            });
            const SLFood = JSON.parse(localStorage.getItem('SLFood'));
            const Foods = JSON.parse(localStorage.getItem('Foods'));
            SLFood.map((value, index) => {
                if (value != 0) {
                    const newBoodFood = {
                        IDFood: Foods[index].ID,
                        sl: value,
                        IDBillAll: IDBill,
                    };
                    console.log(newBoodFood);
                    addBoodFoods(newBoodFood);
                }
            });
            if (localStorage.getItem('token-login')) {
                try {
                    const token = localStorage.getItem('token-login');
                    const _token = token.substring(1, token.length - 1);
                    await axios
                        .postForm(
                            '/login/check_token',
                            { x: 1 },
                            {
                                headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                            },
                        )
                        .then((response) => {
                            let email = {
                                to: response.data.data.Email,
                                subject: 'Quý khách vừa thanh toán thành công.',
                                text: 'Số tiền bạn đã thanh toán là : ' + JSON.parse(localStorage.getItem('monney')),
                            };
                            axios
                                .post('/send-email', email, {
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded',
                                    },
                                })
                                .then((response) => {
                                    if (response.result) {
                                        console.log(response);
                                    }
                                });
                            console.log(response.data.data);
                            // if (response.data.data.CheckAdmin !== 0) {
                            //     navigate('/Admin');
                            // }
                        });
                } catch (error) {
                    console.error(error);
                }
            }
            console.log('Thanh toán thành công');
            localStorage.clear();
            // localStorage.setItem('token-login', token);
            navigate('/');
        } else {
            setCheckError('CheckError');
        }
    };
    const paypalOptions = {
        clientId: 'ASabVjlNdPz1SpnhxCghsmxfeDwIMtfVCS4I3KPmaQyqZFw8iUXS8YFhpGTSVPCabzLm-A3RMl8Ei4eA',
        currency: 'USD',
    };
    const onPaymentCancel = (data) => {
        console.log('Payment cancelled by user:', data);
    };
    if (props.TypeDetail == 1) {
        return (
            <div className={cx('wrapper')}>
                <span className={cx('Error', CheckError)}>*Vui lòng chọn số lượng vé</span>
                <div className={cx('btn-wrapper')}>
                    <a
                        className={cx('btn')}
                        onClick={() => {
                            HandleComtinue(ShowFoodFocus(), props.Tong);
                        }}
                    >
                        TIẾP TỤC
                    </a>
                </div>
            </div>
        );
    } else if (props.TypeDetail == 2) {
        return (
            <div className={cx('wrapper')}>
                <span className={cx('Error', CheckError)}>*Vui lòng chọn số lượng vé</span>
                <div className={cx('btn-wrapper')}>
                    <a className={cx('btn')} onClick={handleGoBack}>
                        QUAY LẠI
                    </a>
                    <a className={cx('btn')} onClick={handleContinue}>
                        TIẾP TỤC
                    </a>
                </div>
            </div>
        );
    } else if (props.TypeDetail == 3) {
        //Thanh Toan
        if (props.TypeThanhToan == 'paypal') {
            return (
                <div className={cx('wrapper')}>
                    <PayPalButton
                        amount={JSON.stringify(props.Money / 25000)}
                        options={paypalOptions}
                        onCancel={onPaymentCancel}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            handleThanhToanPayPal();
                            // localStorage.clear();
                            // localStorage.setItem('token-login', token);
                            // navigate('/');
                            // OPTIONAL: Call your server to save the transaction
                            return fetch('/paypal-transaction-complete', {
                                method: 'post',
                                body: JSON.stringify({
                                    orderID: data.orderID,
                                }),
                            });
                        }}
                        onError={() => {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Do you want to continue',
                                icon: 'error',
                                confirmButtonText: 'Cool',
                            });
                        }}
                    />
                </div>
            );
        } else {
            return (
                <div className={cx('wrapper')}>
                    <span className={cx('Error', CheckError)}>*Số tiền trong tài khoản không đủ để thanh toán</span>
                    <div className={cx('btn-wrapper')}>
                        <a className={cx('btn')} onClick={handleGoBack}>
                            QUAY LẠI
                        </a>
                        <a className={cx('btn')} onClick={handleThanhToan}>
                            THANH TOÁN
                        </a>
                    </div>
                </div>
            );
        }
    }
}
export default Btn;
