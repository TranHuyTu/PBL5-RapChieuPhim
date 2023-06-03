import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import History from '../History';

import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

const ProfileChang = {
    ID: '',
    Username: '',
    Password: '',
    Name: '',
    Email: '',
    CheckAdmin: '',
    Money: '',
    SDT: '',
    SEX: '',
    DateOfBirth: '',
    Avatar: '',
};

function ProfileLayout({ chilren }) {
    const [Profile, setProfile] = useState([]);
    const [changPass, setChangPass] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [onClickType, setOnClickType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .postForm(
                        'http://localhost:8080/login/check_token',
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setProfile(response.data.data.data);
                        setPreviewImage(response.data.data.data.Avatar);
                        ProfileChang.ID = response.data.data.data.ID;
                        ProfileChang.Username = response.data.data.data.Username;
                        ProfileChang.Money = response.data.data.data.Money;
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const NotAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqt6ww0fR2ENknaKd8Xy_bStSsKcVXfdoIzA&usqp=CAU';
    function ConverTime(DATETIME) {
        let datetime = [];
        if (DATETIME) {
            let DT = DATETIME.split('T');
            let time = DT[1].split(':');
            datetime.push(time[0], time[1], moment(DATETIME).format('DD-MM-YYYY'));
        } else {
            datetime = ['01', '90', '20-11-2023'];
        }
        return datetime;
    }
    function ConverTimeData(DATETIME) {
        let datetime = [];
        if (DATETIME) {
            let DT = DATETIME.split('T');
            let time;
            if (DT[1]) {
                time = DT[1].split(':');
            } else {
                time = ['00', '00'];
            }
            datetime.push(time[0], time[1], moment(DATETIME).format('YYYY-MM-DD'));
        } else {
            datetime = ['01', '90', '20-11-2023'];
        }
        return datetime;
    }
    const SEX = (value) => {
        if (value === 1) {
            return 'Nam';
        } else if (value === 2) {
            return 'Nữ';
        } else return 'Khác';
    };
    const ReloadLogin = function (account) {
        try {
            axios
                .post('http://localhost:8080/login', account, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                })
                .then((response) => {
                    localStorage.setItem('token-login', JSON.stringify(response.data.result));
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const onClick = async function () {
        if (selectedFile != null) {
            try {
                await axios
                    .post(
                        'http://localhost:8080/upload',
                        { image: selectedFile },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        },
                    )
                    .then((response) => {
                        setPreviewImage(response.data);
                        ProfileChang.Avatar = response.data;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.log(error);
            }
            let ListChange = document.querySelectorAll('.Change');
            ListChange[0].value ? (ProfileChang.Name = ListChange[0].value) : (ProfileChang.Name = Profile.Name);
            ListChange[1].value ? (ProfileChang.Email = ListChange[1].value) : (ProfileChang.Email = Profile.Email);
            ListChange[2].value ? (ProfileChang.SDT = ListChange[2].value) : (ProfileChang.SDT = Profile.SDT);
            ListChange[3].value ? (ProfileChang.SEX = ListChange[3].value) : (ProfileChang.SEX = Profile.SEX);
            ListChange[4].value
                ? (ProfileChang.DateOfBirth = ListChange[4].value + 'T00:00:00.000Z')
                : (ProfileChang.DateOfBirth = ConverTimeData(Profile.DateOfBirth)[2] + 'T00:00:00.000Z');
            ProfileChang.CheckAdmin = 0;
            if (document.querySelector('.BtnChangPassword input').checked) {
                if (document.querySelector('#MKHT').value === Profile.Password) {
                    if (document.querySelector('#MKM').value === document.querySelector('#XNMK').value) {
                        ProfileChang.Password = document.querySelector('#MKM').value;
                    } else {
                        ProfileChang.Password = Profile.Password;
                    }
                } else {
                    ProfileChang.Password = Profile.Password;
                }
            } else {
                ProfileChang.Password = Profile.Password;
            }
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                axios
                    .put('http://localhost:8080/account/update', ProfileChang, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    })
                    .then((response) => {
                        console.log('Thanh cong');
                        console.log(response.data.result);
                        const account = {
                            user: response.data.result.Username,
                            password: response.data.result.Password,
                        };
                        ReloadLogin(account);
                        setProfile(response.data.result);
                        window.location.reload();
                    });
            } catch (error) {
                console.error(error);
            }
        } else {
            ProfileChang.Avatar = Profile.Avatar;
            let ListChange = document.querySelectorAll('.Change');
            ListChange[0].value ? (ProfileChang.Name = ListChange[0].value) : (ProfileChang.Name = Profile.Name);
            ListChange[1].value ? (ProfileChang.Email = ListChange[1].value) : (ProfileChang.Email = Profile.Email);
            ListChange[2].value ? (ProfileChang.SDT = ListChange[2].value) : (ProfileChang.SDT = Profile.SDT);
            ListChange[3].value ? (ProfileChang.SEX = ListChange[3].value) : (ProfileChang.SEX = Profile.SEX);
            ListChange[4].value
                ? (ProfileChang.DateOfBirth = ListChange[4].value + 'T00:00:00.000Z')
                : (ProfileChang.DateOfBirth = ConverTimeData(Profile.DateOfBirth)[2] + 'T00:00:00.000Z');
            ProfileChang.CheckAdmin = 0;
            if (document.querySelector('.BtnChangPassword input').checked) {
                if (document.querySelector('#MKHT').value === Profile.Password) {
                    if (document.querySelector('#MKM').value === document.querySelector('#XNMK').value) {
                        ProfileChang.Password = document.querySelector('#MKM').value;
                    } else {
                        ProfileChang.Password = Profile.Password;
                    }
                } else {
                    ProfileChang.Password = Profile.Password;
                }
            } else {
                ProfileChang.Password = Profile.Password;
            }
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                axios
                    .put('http://localhost:8080/account/update', ProfileChang, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    })
                    .then((response) => {
                        console.log('Thanh cong');
                        console.log(response.data.result);
                        const account = {
                            user: response.data.result.Username,
                            password: response.data.result.Password,
                        };
                        ReloadLogin(account);
                        setProfile(response.data.result);
                        window.location.reload();
                    });
            } catch (error) {
                console.error(error);
            }
        }
    };
    if (onClickType === '1') {
        document.querySelectorAll('.btn').forEach((value, index) => {
            value.disabled = false;
            if (index === 0) {
                value.addEventListener('click', () => {
                    window.location.reload();
                });
            } else {
                value.addEventListener('click', () => onClick());
            }
        });
    }
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));

        if (onClickType === '') {
            setOnClickType('1');
        }
    };

    const onChange = function (e) {
        if (onClickType === '') {
            setOnClickType('1');
        }
    };
    if (Profile) {
        return (
            <Container fluid="xxl" className={cx('wrapper')}>
                <Tabs defaultActiveKey="Profile" id="fill-tab-example" className="mb-3" fill>
                    <Tab eventKey="Profile" title="Profile">
                        <Form>
                            <Form.Group>
                                <div className={cx('Bgr-Avatar')}>
                                    <img className={cx('Avatar')} src={previewImage ? previewImage : NotAvatar} />
                                    <input
                                        className={cx('custom-file-input')}
                                        type="file"
                                        title=""
                                        onChange={(e) => onChangeFile(e)}
                                    />
                                </div>
                                <div className={cx('group-title')}>
                                    <h1 className={cx('title')}>Profile</h1>
                                    <div className={cx('group-btn')}>
                                        <Button className={cx('btn')} variant="light" disabled={true}>
                                            Cancel
                                        </Button>
                                        <Button className={cx('btn')} variant="primary" disabled={true}>
                                            Save
                                        </Button>{' '}
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>User Name</Form.Label>
                                <Form.Label className={cx('label-title', 'value')}>{Profile.Username}</Form.Label>
                            </Form.Group>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>Name</Form.Label>
                                <Form.Control
                                    className={cx('output', 'Change')}
                                    placeholder={Profile.Name}
                                    onChange={(e) => onChange(e)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>Email address</Form.Label>
                                <Form.Control
                                    className={cx('output', 'Change')}
                                    type="email"
                                    placeholder={Profile.Email}
                                    onChange={(e) => onChange(e)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('row', 'password')}>
                                <Form.Label className={cx('label-title')}>Password</Form.Label>
                                <Form.Control
                                    id="password"
                                    className={cx('output')}
                                    type="password"
                                    placeholder="password"
                                    value={Profile.Password}
                                />
                                <img
                                    className={cx('show-password')}
                                    src="https://www.clipartmax.com/png/full/217-2178237_open-eye-vector-show-hide-password-icon.png"
                                    onClick={() => {
                                        if (document.querySelector('#password').type === 'password') {
                                            document.querySelector('#password').type = 'text';
                                        } else {
                                            document.querySelector('#password').type = 'password';
                                        }
                                    }}
                                />
                            </Form.Group>
                            <div className={cx('ChangPassword')}>
                                <Form.Check
                                    className={cx('BtnChangPassword')}
                                    type="switch"
                                    id="custom-switch"
                                    label="ĐỔI MẬT KHẨU"
                                    onChange={(e) => {
                                        if (onClickType === '') {
                                            setOnClickType('1');
                                        }
                                        if (e.target.checked) {
                                            setChangPass('show');
                                        } else {
                                            setChangPass('');
                                        }
                                    }}
                                />
                                <div className={cx('Chang-Password', changPass)}>
                                    <Form.Control
                                        id="MKHT"
                                        type="password"
                                        className={cx('output', 'Matkhauhientai')}
                                        placeholder="Mật khẩu hiện tại"
                                    />
                                    <Form.Control
                                        id="MKM"
                                        type="password"
                                        className={cx('output', 'Matkhaumoi')}
                                        placeholder="Mật khẩu mới"
                                    />
                                    <Form.Control
                                        id="XNMK"
                                        type="password"
                                        className={cx('output', 'Xacnhanmatkhau')}
                                        placeholder="Nhập lại mật khẩu mới"
                                    />
                                </div>
                            </div>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>Money</Form.Label>
                                <Form.Label className={cx('label-title', 'value')}>{Profile.Money} Đ</Form.Label>
                            </Form.Group>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>SDT</Form.Label>
                                <Form.Control
                                    className={cx('output', 'Change')}
                                    placeholder={Profile.SDT}
                                    onChange={(e) => onChange(e)}
                                />
                            </Form.Group>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>SEX</Form.Label>
                                <Form.Select
                                    aria-label="SEX"
                                    className={cx('output', 'Change')}
                                    onChange={(e) => onChange(e)}
                                >
                                    <option value={Profile.SEX}>{SEX(Profile.SEX)}</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                    <option value="3">Khác</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={cx('row')}>
                                <Form.Label className={cx('label-title')}>Date Of Birth</Form.Label>
                                <Form.Label className={cx('label-title')}>
                                    {ConverTime(Profile.DateOfBirth)[2]}
                                </Form.Label>
                                <Form.Label className={cx('label-title')}>Change Date:</Form.Label>
                                <Form.Control
                                    className={cx('outputDate', 'Change')}
                                    type="date"
                                    onChange={(e) => onChange(e)}
                                />
                            </Form.Group>
                        </Form>
                    </Tab>
                    <Tab eventKey="History" title="History">
                        <History />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default ProfileLayout;
