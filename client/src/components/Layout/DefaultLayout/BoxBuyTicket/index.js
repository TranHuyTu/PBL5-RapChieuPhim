import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './BoxBuyTicket.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';

const cx = classNames.bind(styles);

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function ConverTime(DATETIME) {
    let datetime = [];
    let DT = DATETIME.split('T');
    let time = DT[1].split(':');
    datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
    return datetime;
}
const Ticket = {
    chonphim: '',
    chonrap: '',
    chonngay: '',
    chondiachi: '',
};
function BoxBuyTicket(props) {
    const [value, setValue] = useState(0);
    const [DSTimKiem, setDSTimKiem] = useState(props.TimKiem);
    const [TicketDetail, setTicketDetail] = useState(Ticket);
    const [ListSearch, setListSearch] = useState([]);
    const [activeTP, setActiveTP] = useState('activeSearch');
    const [activeTN, setActiveTN] = useState('');
    const [activeTR, setActiveTR] = useState('');
    const navigate = useNavigate();
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };
    const DeleteRepetition = (Array, val) => {
        let checkRepetition = false;
        if (Array) {
            Array.map((value, index) => {
                if (value == val) {
                    checkRepetition = true;
                }
            });
            if (!checkRepetition) {
                Array.push(val);
            }
        } else {
            Array.push(val);
        }
        return Array;
    };
    useLayoutEffect(() => {
        setDSTimKiem(props.TimKiem);
    }, []);
    const handleChange = (e) => {
        const { value, name } = e.target;
        setTicketDetail({ ...TicketDetail, [name]: value });
        let elementSelect = document.querySelectorAll('select');
        const ListSearchNew = [];
        if (name == 'chonphim') {
            props.TimKiem.map((val, index) => {
                if (val.MovieName == props.TimKiem[value].MovieName) {
                    ListSearchNew.push(val);
                }
            });
            setListSearch(ListSearchNew);
            elementSelect[1].innerHTML = "<option aria-label='None' value='' selected=''></option>";
            ListSearchNew.map((val, index) => {
                let elementNew = document.createElement('option');
                elementNew.classList.add(cx('sub-option'));
                elementNew.value = index;
                elementNew.innerText = val.CinemaName;
                elementSelect[1].appendChild(elementNew);
            });
        } else if (name == 'chonrap') {
            if (ListSearch) {
                ListSearch.map((val, index) => {
                    if (val.CinemaName == ListSearch[value].CinemaName) {
                        ListSearchNew.push(val);
                    }
                });
            }
            setListSearch(ListSearchNew);
            elementSelect[2].innerHTML = "<option aria-label='None' value='' selected=''></option>";
            ListSearchNew.map((val, index) => {
                let elementNew = document.createElement('option');
                elementNew.classList.add(cx('sub-option'));
                elementNew.value = index;
                elementNew.innerText =
                    ConverTime(val.ShowtimeDateTime)[0] +
                    ' : ' +
                    ConverTime(val.ShowtimeDateTime)[1] +
                    '   ' +
                    ConverTime(val.ShowtimeDateTime)[2];
                elementSelect[2].appendChild(elementNew);
            });
        } else if (name == 'chonngay') {
            if (ListSearch) {
                ListSearch.map((val, index) => {
                    if (val.ShowtimeDateTime == ListSearch[value].ShowtimeDateTime) {
                        ListSearchNew.push(val);
                    }
                });
            }
            setListSearch(ListSearchNew);
            elementSelect[3].innerHTML = "<option aria-label='None' value='' selected=''></option>";
            ListSearchNew.map((val, index) => {
                let elementNew = document.createElement('option');
                elementNew.classList.add(cx('sub-option'));
                elementNew.value = index;
                elementNew.innerText = val.Address;
                elementSelect[3].appendChild(elementNew);
            });
        } else {
            console.log(TicketDetail);
        }
    };
    let ListTic = [];
    let ChiTietVe = {
        IDMovie: '',
        IDCinema: '',
        IDShowtime: '',
    };
    const handleBuy = function (Ticket) {
        let Ve = [];
        if (props.TimKiem[Ticket.chonphim]) {
            ChiTietVe.IDMovie = props.TimKiem[Ticket.chonphim].ID;
        }

        props.TimKiem.map((value, index) => {
            if (ChiTietVe.IDMovie && ChiTietVe.IDMovie == value.ID) {
                Ve.push(value);
            }
        });
        ListTic = Ve;
        Ve = [];
        ListTic.map((value, index) => {
            if (index == Ticket.chonrap) {
                ChiTietVe.IDCinema = value.CinemaID;
            }
            if (ChiTietVe.IDCinema && ChiTietVe.IDCinema == value.CinemaID) {
                Ve.push(value);
            }
        });
        ListTic = Ve;
        Ve = [];
        ListTic.map((value, index) => {
            if (index == Ticket.chonngay) {
                ChiTietVe.IDShowtime = value.ShowtimeID;
            }
            if (ChiTietVe.IDShowtime && ChiTietVe.IDShowtime == value.ShowtimeID) {
                Ve.push(value);
            }
        });
        if (localStorage.getItem('token-login')) {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            try {
                axios
                    .postForm(
                        'http://localhost:8080/login/check_token',
                        { x: 1 },
                        {
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                authorization: _token,
                            },
                        },
                    )
                    .then((response) => {
                        if (response.data.data.data) {
                            try {
                                axios
                                    .post('http://localhost:8080/TrangChu/Movie/' + ChiTietVe.IDMovie)
                                    .then((response) => {
                                        if (response.data.result) {
                                            localStorage.setItem('movie', JSON.stringify(response.data.result[0]));
                                        }
                                    });
                                let ShowtimeDetail = {
                                    ShowtimeID: ChiTietVe.IDShowtime,
                                    CinemaID: ChiTietVe.IDCinema,
                                };
                                axios
                                    .post('http://localhost:8080/showtime/detail', ShowtimeDetail, {
                                        headers: {
                                            'content-type': 'application/x-www-form-urlencoded',
                                        },
                                    })
                                    .then((response) => {
                                        if (response.data.result) {
                                            localStorage.setItem('showtime', JSON.stringify(response.data.result[0]));
                                        }
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Bạn chưa đăng nhập vui lòng đằng nhập rồi thực hiện lại',
                                icon: 'error',
                                confirmButtonText: 'Cool',
                            });
                            navigate('../login');
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        }
        // else {
        //     Swal.fire({
        //         title: 'Error!',
        //         text: 'Vui lòng đăng nhập để thực hiện bước tiếp theo',
        //         icon: 'error',
        //         confirmButtonText: 'OK',
        //     });
        //     navigate('../login');
        // }
    };
    if (DSTimKiem) {
        return (
            <div className={cx('box-buy-ticket')}>
                <div className={cx('wrapper')}>
                    <div className={cx('box-title')}>
                        <h3>MUA VE NHANH</h3>
                    </div>
                    <Box className={cx('')} sx={{ width: '100%' }}>
                        <Box className={cx('menu-Select')} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                className={cx('')}
                                value={value}
                                onChange={handleChange1}
                                aria-label="basic tabs example"
                            >
                                <Tab
                                    className={cx('optionTP')}
                                    label="Theo Phim"
                                    {...a11yProps(0)}
                                    onClick={() => {
                                        setActiveTP('activeSearch');
                                        setActiveTN('');
                                        setActiveTR('');
                                    }}
                                    sx={{ color: 'white', fontSize: '14px' }}
                                />
                                <Tab
                                    className={cx('optionTN')}
                                    label="Theo Ngày"
                                    {...a11yProps(1)}
                                    onClick={() => {
                                        setActiveTN('activeSearch');
                                        setActiveTP('');
                                        setActiveTR('');
                                    }}
                                    sx={{ color: 'white', fontSize: '14px' }}
                                />
                                <Tab
                                    className={cx('optionTR')}
                                    label="Theo Rạp"
                                    {...a11yProps(2)}
                                    onClick={() => {
                                        setActiveTR('activeSearch');
                                        setActiveTP('');
                                        setActiveTN('');
                                    }}
                                    sx={{ color: 'white', fontSize: '14px' }}
                                />
                            </Tabs>
                        </Box>
                        <Box className={cx('search', activeTP)} sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#333', fontSize: '1.2rem' }} id="demo-simple-select-label">
                                    Chọn Phim
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: 'white', fontSize: '1.2rem' }}
                                    id="demo-simple-select"
                                    label="ChonPhim"
                                    name="chonphim"
                                    onChange={handleChange}
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.MovieName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#333', fontSize: '1.2rem' }} id="demo-simple-select-label">
                                    Chọn Rạp
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: 'white', fontSize: '1.2rem' }}
                                    id="demo-simple-select"
                                    label="ChonRap"
                                    name="chonrap"
                                    onChange={handleChange}
                                >
                                    {/* <option aria-label="None" value="" /> */}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#333', fontSize: '1.2rem' }} id="demo-simple-select-label">
                                    Chọn Ngày
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: 'white', fontSize: '1.2rem' }}
                                    id="demo-simple-select"
                                    label="ChonNgay"
                                    name="chonngay"
                                    onChange={handleChange}
                                >
                                    {/* <option aria-label="None" value="" /> */}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#333', fontSize: '1.2rem' }} id="demo-simple-select-label">
                                    Chọn Theo Địa Chỉ
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: 'white', fontSize: '1.2rem' }}
                                    id="demo-simple-select"
                                    label="ChonDiaChi"
                                    name="chondiachi"
                                    onChange={handleChange}
                                >
                                    {/* <option aria-label="None" value="" /> */}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className={cx('search', activeTN)} sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Ngày
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonNgay"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.ShowtimeDateTime}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Rạp
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonRap"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.CinemaName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Phim
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonPhim"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.MovieName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Theo Địa Chỉ
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonDiaChi"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.Address}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className={cx('search', activeTR)} sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Rạp
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonRap"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.CinemaName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Ngày
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonNgay"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.ShowtimeDateTime}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Phim
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonPhim"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.MovieName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">
                                    Chọn Theo Địa Chỉ
                                </InputLabel>
                                <Select
                                    className={cx('radio-select')}
                                    native
                                    defaultValue=""
                                    sx={{ background: '#999' }}
                                    id="demo-simple-select"
                                    label="ChonDiaChi"
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {item.Address}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <div className={cx('btn-Buy')}>
                        <a href="/DatDoAn" className={cx('btn-muave')} onClick={() => handleBuy(TicketDetail)}>
                            MUA VE
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        setDSTimKiem(props.TimKiem);
    }
}

export default BoxBuyTicket;
