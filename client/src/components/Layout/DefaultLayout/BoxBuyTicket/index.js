import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './BoxBuyTicket.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '~/api/axiosClient';
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
    const [Movie, setMovie] = useState([]);
    const [Showtime, setShowtime] = useState([]);
    const navigate = useNavigate();
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };
    useLayoutEffect(() => {
        setDSTimKiem(props.TimKiem);
        try {
            axios.post('/movie').then((response) => {
                setMovie(response.result);
            });
            axios.post('/showtime').then((response) => {
                setShowtime(response.result);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);
    const handleChange = (e) => {
        const { value, name } = e.target;
        setTicketDetail({ ...TicketDetail, [name]: value });
        let elementSelect = document.querySelectorAll('select');
        const ListSearchNew = [];

        if (name == 'chonphim') {
            props.TimKiem.map((val, index) => {
                if (val.MovieID == Movie[value].ID) {
                    ListSearchNew.push(val);
                }
            });
            setListSearch(ListSearchNew);
            console.log(ListSearchNew);
            let ChiTietVe = {
                IDMovie: Movie[value].ID,
                IDCinema: '',
                IDShowtime: '',
            };
            localStorage.setItem('ChiTietVe', JSON.stringify(ChiTietVe));
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
            let ChiTietVe = JSON.parse(localStorage.getItem('ChiTietVe'));
            ChiTietVe.IDCinema = ListSearchNew[0].CinemaID;
            localStorage.setItem('ChiTietVe', JSON.stringify(ChiTietVe));
            console.log(ListSearchNew);
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
            console.log(ListSearchNew);
            let ChiTietVe = JSON.parse(localStorage.getItem('ChiTietVe'));
            ChiTietVe.IDShowtime = ListSearchNew[0].ShowtimeID;
            localStorage.setItem('ChiTietVe', JSON.stringify(ChiTietVe));
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

    const handleChangeTN = (e) => {
        const { value, name } = e.target;
        setTicketDetail({ ...TicketDetail, [name]: value });
        let elementSelect = document.querySelectorAll('select');
        const ListSearchNew = [];
        console.log(props.TimKiem[value].MovieID);
        let ChiTietVe = {
            IDMovie: '',
            IDCinema: '',
            IDShowtime: '',
        };
        ChiTietVe.IDMovie = props.TimKiem[value].MovieID;
        ChiTietVe.IDCinema = props.TimKiem[value].CinemaID;
        ChiTietVe.IDShowtime = props.TimKiem[value].ShowtimeID;
        localStorage.setItem('ChiTietVe', JSON.stringify(ChiTietVe));
        if (name == 'chonngay') {
            props.TimKiem.map((val, index) => {
                if (val.MovieID == props.TimKiem[value].MovieID) {
                    ListSearchNew.push(val);
                }
            });
            setListSearch(ListSearchNew);
            elementSelect[5].innerHTML = "<option aria-label='None' value='' selected=''></option>";
            ListSearchNew.map((val, index) => {
                let elementNew = document.createElement('option');
                elementNew.classList.add(cx('sub-option'));
                elementNew.value = index;
                elementNew.innerText = val.MovieName;
                elementSelect[5].appendChild(elementNew);
            });
        } else if (name == 'chonphim') {
            if (ListSearch) {
                ListSearch.map((val, index) => {
                    if (val.CinemaID == ListSearch[value].CinemaID) {
                        ListSearchNew.push(val);
                    }
                });
            }
            setListSearch(ListSearchNew);
            elementSelect[6].innerHTML = "<option aria-label='None' value='' selected=''></option>";
            ListSearchNew.map((val, index) => {
                let elementNew = document.createElement('option');
                elementNew.classList.add(cx('sub-option'));
                elementNew.value = index;
                elementNew.innerText = val.CinemaName;
                elementSelect[6].appendChild(elementNew);
            });
        } else if (name == 'chonrap') {
            if (ListSearch) {
                ListSearch.map((val, index) => {
                    if (val.CinemaID == ListSearch[value].CinemaID) {
                        ListSearchNew.push(val);
                    }
                });
            }
            setListSearch(ListSearchNew);
            elementSelect[7].innerHTML = "<option aria-label='None' value='' selected=''></option>";
            ListSearchNew.map((val, index) => {
                let elementNew = document.createElement('option');
                elementNew.classList.add(cx('sub-option'));
                elementNew.value = index;
                elementNew.innerText = val.Address;
                elementSelect[7].appendChild(elementNew);
            });
        } else {
            console.log(TicketDetail);
        }
    };

    let ListTic = [];

    const handleBuy = function (Ticket) {
        const ChiTietVe = JSON.parse(localStorage.getItem('ChiTietVe'));
        localStorage.removeItem('ChiTietVe');
        if (localStorage.getItem('token-login')) {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            try {
                axios
                    .postForm(
                        '/login/check_token',
                        { x: 1 },
                        {
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                authorization: _token,
                            },
                        },
                    )
                    .then((response) => {
                        if (response.data.data) {
                            try {
                                axios.post('/TrangChu/Movie/' + ChiTietVe.IDMovie).then((response) => {
                                    if (response.result) {
                                        console.log('Movie', response.result);
                                        localStorage.setItem('movie', JSON.stringify(response.result[0]));
                                    }
                                });
                                let ShowtimeDetail = {
                                    ShowtimeID: ChiTietVe.IDShowtime,
                                    CinemaID: ChiTietVe.IDCinema,
                                };
                                axios
                                    .post('/showtime/detail', ShowtimeDetail, {
                                        headers: {
                                            'content-type': 'application/x-www-form-urlencoded',
                                        },
                                    })
                                    .then((response) => {
                                        if (response.result) {
                                            console.log(response.result);
                                            localStorage.setItem('showtime', JSON.stringify(response.result[0]));
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
    };
    if (DSTimKiem && Movie) {
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
                                    {Movie.map((item, index) => (
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
                                    onChange={handleChangeTN}
                                >
                                    <option aria-label="None" value="" />
                                    {props.TimKiem.map((item, index) => (
                                        <option className={cx('sub-option')} key={index} value={index}>
                                            {ConverTime(item.ShowtimeDateTime)[0]}:
                                            {ConverTime(item.ShowtimeDateTime)[1]}
                                            {'   '}
                                            {ConverTime(item.ShowtimeDateTime)[2]}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
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
                                    onChange={handleChangeTN}
                                >
                                    <option aria-label="None" value="" />
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
                                    onChange={handleChangeTN}
                                >
                                    <option aria-label="None" value="" />
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
                                >
                                    <option aria-label="None" value="" />
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
