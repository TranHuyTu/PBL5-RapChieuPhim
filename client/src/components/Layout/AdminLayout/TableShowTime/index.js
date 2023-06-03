import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableShowTime.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableShowTime(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
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
        fetchData('http://localhost:8080/showtime');
        setLabel(['ID', 'Tên Phim', 'Phòng', 'Loại Phòng', 'Thời Gian']);
        setKey(['ShowtimeID', 'MovieName', 'HallID', 'Class', 'ShowtimeDateTime']);
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
                                    <td>{value[Key[3]]}</td>
                                    <td>
                                        {ConverTime(value[Key[4]])[0]} : {ConverTime(value[Key[4]])[1]} --{' '}
                                        {ConverTime(value[Key[4]])[2]}
                                    </td>
                                    <td>
                                        <a className={cx('btn', 'show')} onClick={() => HandlerShow(value)}>
                                            Xem
                                        </a>
                                    </td>
                                    <td>
                                        <a className={cx('btn', 'edit')}>Sửa</a>
                                    </td>
                                    <td>
                                        <a className={cx('btn', 'delete')}>Xóa</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <a className={cx('AddNew')}></a>
                </Container>
            </div>
        );
    }
}

export default TableShowTime;
