import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableDetail.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import EditMovie from '../EditMovie';
import AddMovie from '../AddMovie';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
const cx = classNames.bind(styles);

function TableMovie(props) {
    const [movie, setMovie] = useState([]);
    const [ListActor, setListActor] = useState([]);
    const navigate = useNavigate();
    const fetchData = async (API, setAPI) => {
        try {
            await axios
                .post(API)
                .then((response) => {
                    setAPI(response.data.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useLayoutEffect(() => {
        fetchData('http://localhost:8080/actors/Movie/' + props.data.ID, setListActor);
    }, []);
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    const HandleCancel = function () {
        let element = document.querySelector('.container').nextElementSibling;
        element.remove();
    };
    const HandlerShow = async function (value) {
        await document
            .querySelector('.container')
            .insertAdjacentHTML(
                'afterend',
                '<div class="' +
                    cx('bgr') +
                    '"><div class="' +
                    cx('movie-detail') +
                    '"><a class="' +
                    cx('cancel') +
                    '"></a><img src="' +
                    value.AvatarMovie +
                    '" alt="' +
                    value.MovieName +
                    '" />' +
                    '<h1>' +
                    value.MovieName +
                    '</h1>' +
                    '<p><b>Thời lượng :</b>' +
                    value.TimeMovie +
                    '</p>' +
                    '<p><b>Thể loại : </b>' +
                    value.TypeMovie +
                    '</p>' +
                    '<p><b>Ngày khởi chiếu : </b>' +
                    value.ReleaseYear +
                    '</p>' +
                    '<p><b>Tóm Tắt : </b>' +
                    value.TomTat +
                    '</p>' +
                    '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
                    value.LinkReview.split('/')[3] +
                    '" frameborder="0"' +
                    'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' +
                    'allowfullscreen></iframe>' +
                    '<p><b>Giới thiệu : </b>' +
                    value.GioiThieu +
                    '</p></div></div>',
            );
        document.querySelector('.TableDetail_cancel__mYvns').addEventListener('click', HandleCancel);
    };
    const HandeleEdit = function (value) {};
    if (localStorage.getItem('movie')) {
        return <EditMovie movie={JSON.parse(localStorage.getItem('movie'))} />;
    } else if (JSON.parse(localStorage.getItem('AddMovie')) === 0) {
        return <AddMovie />;
    } else {
        return (
            <Table striped bordered hover>
                <thead className={cx('thead')}>
                    <tr>
                        {props.Label.map((value, index) => (
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
                    {props.data.map((value, index) => (
                        <tr key={index}>
                            <td>{value[props.Key[0]]}</td>
                            <td>{value[props.Key[1]]}</td>
                            <td>{value[props.Key[2]]} Phút</td>
                            <td>{ConverTime(value[props.Key[3]])[2]}</td>
                            <td>
                                <a href={value[props.Key[4]]} target="_blank">
                                    {value[props.Key[4]]}
                                </a>
                            </td>
                            <td>
                                <a className={cx('btn', 'show')} onClick={() => HandlerShow(value)}>
                                    Xem
                                </a>
                            </td>
                            <td>
                                <a
                                    className={cx('btn', 'edit')}
                                    onClick={() => {
                                        setMovie(value);
                                        localStorage.setItem('movie', JSON.stringify(value));
                                    }}
                                >
                                    Sửa
                                </a>
                            </td>
                            <td>
                                <a
                                    className={cx('btn', 'delete')}
                                    onClick={async () => {
                                        const fetchRemove = async (data) => {
                                            try {
                                                axios
                                                    .delete('http://localhost:8080/listactor/remove', {
                                                        data: data,
                                                        headers: {
                                                            'Content-Type': 'application/x-www-form-urlencoded',
                                                        },
                                                    })
                                                    .then((response) => {
                                                        console.log('Remove:', response.data.result);
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        };
                                        try {
                                            await axios
                                                .post('http://localhost:8080/actors/Movie/' + value.ID)
                                                .then((response) => {
                                                    response.data.result.map((val) => {
                                                        const RemoveActor = {
                                                            IDMovie: value.ID,
                                                            IDActor: val.ID,
                                                        };
                                                        console.log('Remove', RemoveActor);
                                                        fetchRemove(RemoveActor);
                                                    });
                                                    console.log(response.data.result);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        } catch (error) {
                                            console.error(error);
                                        }

                                        try {
                                            axios
                                                .delete('http://localhost:8080/movie/remove/' + value.ID)
                                                .then((response) => {
                                                    console.log('RemoveMovie', response.data.result);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                            axios
                                                .delete('http://localhost:8080/review/remove/' + value.IDRevew)
                                                .then((response) => {
                                                    console.log('RemoveReview', response.data.result);
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        } catch (error) {
                                            console.error(error);
                                        }
                                        navigate('/');
                                    }}
                                >
                                    Xóa
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

function TableDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [BtnAddMovie, setBtnAddMovie] = useState('');
    const fetchData = async (API) => {
        try {
            await axios.post(API).then((response) => {
                setData(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('http://localhost:8080/TrangChu');
        setLabel(['ID', 'Tên Phim', 'Thời lượng', 'Ngày khởi chiếu', 'LinkReview']);
        setKey(['ID', 'MovieName', 'TimeMovie', 'ReleaseYear', 'LinkReview']);
    }, []);
    if (data && Label && Key) {
        if (props.typeTable == 'TrangChu' || props.typeTable == '') {
            return (
                <div className={cx('wrapper')}>
                    <Container className={cx('container')}>
                        <TableMovie Key={Key} data={data} Label={Label} />
                    </Container>
                </div>
            );
        } else if (props.typeTable == 'Phim') {
            return (
                <div className={cx('wrapper-movie')}>
                    <Container className={cx('container')}>
                        <TableMovie Key={Key} data={data} Label={Label} />
                        <a
                            className={cx('AddNew')}
                            onClick={(e) => {
                                localStorage.setItem('AddMovie', '0');
                                setBtnAddMovie(0);
                                e.target.style.display = 'none';
                            }}
                        ></a>
                    </Container>
                </div>
            );
        }
    }
}

export default TableDetail;
