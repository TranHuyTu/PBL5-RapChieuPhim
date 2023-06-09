import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableDirector.module.scss';
import Container from 'react-bootstrap/Container';
import EditDirectorComponent from '../EditDirector';
import AddDirectorComponent from '../AddDirector';
import AddActorComponent from '../AddActor';

import { useState, useEffect } from 'react';
import axios from '~/api/axiosClient';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function TableDirectorDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Director, setDirector] = useState([]);
    const [EditDirector, setEditDirector] = useState([]);
    const navigate = useNavigate();
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const fetchData = async (API) => {
        try {
            await axios.post(API).then((response) => {
                setData(response.result);
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (props.TypeActor == 'Director') {
            fetchData('/directors');
        } else if (props.TypeActor == 'Actor') {
            fetchData('/actors');
        }
        setLabel(['ID', 'Tên', 'Quốc tịch', 'Avatar']);
        setKey(['ID', 'Name', 'Country', 'AvatarLink']);
    }, []);
    const HandlerShow = async function (value) {
        localStorage.setItem('Director', JSON.stringify(value));
        setDirector(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Director', JSON.stringify(value));
        localStorage.setItem('EditDirector', '0');
        setDirector(value);
        setEditDirector('0');
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
            if (localStorage.getItem('Actor')) {
                await axios
                    .delete(
                        '/actors/remove/' + values.ID,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        console.log(values.HallID, response);
                    });
            } else {
                await axios
                    .delete(
                        '/directors/remove/' + values.ID,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        console.log(values.HallID, response);
                    });
            }
        } catch (error) {
            console.error(error);
        }
        navigate('/');
    };
    if (localStorage.getItem('Director') && localStorage.getItem('EditDirector')) {
        return (
            <div className={cx('')}>
                <EditDirectorComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Director');
                        localStorage.removeItem('EditDirector');
                        setDirector([]);
                        setEditDirector('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Director')) {
        let Director = JSON.parse(localStorage.getItem('Director'));
        return (
            <div className={cx('wrapper_detail')}>
                <h1>Tên diễn viên : {Director.Name}</h1>
                <h3>Quốc tịch : {Director.Country}</h3>
                <img className={cx('Avatar')} src={Director.AvatarLink} alt={Director.Name} />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Director');
                        setDirector([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (JSON.parse(localStorage.getItem('AddActor')) === 0 && JSON.parse(localStorage.getItem('Actor')) === 0) {
        return (
            <div>
                <AddActorComponent />
                {() => {
                    localStorage.removeItem('AddDirector');
                    localStorage.removeItem('Actor');
                }}
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('AddActor');
                        localStorage.removeItem('Actor');
                        setDirector([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (JSON.parse(localStorage.getItem('AddDirector')) === 0) {
        return (
            <div>
                <AddDirectorComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('AddDirector');
                        setDirector([]);
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
function TableDirector(props) {
    const [BtnAddDirector, setBtnAddDirector] = useState('');
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableDirectorDetail TypeActor={props.TypeActor} />
                <a
                    className={cx('AddNew')}
                    onClick={(e) => {
                        localStorage.setItem('AddDirector', '0');
                        setBtnAddDirector(0);
                        if (localStorage.getItem('Actor')) {
                            localStorage.setItem('AddActor', '0');
                        }
                        navigate('/Admin');
                        // if (localStorage.getItem('AddShowtime')) {
                        //     e.target.style.display = 'none';
                        // } else {
                        //     e.target.style.display = 'block';
                        // }
                    }}
                ></a>
            </Container>
        </div>
    );
}

export default TableDirector;
