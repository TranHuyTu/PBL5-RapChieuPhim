import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TablePromotion.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import EditPromotionComponent from '../EditPromotion';
import axiosClient from '~/api/axiosClient';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TablePromotionDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Promotion, setPromotion] = useState([]);
    const [EditPromotion, setEditPromotion] = useState([]);
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const fetchData = async (API) => {
        try {
            await axiosClient.post(API).then((response) => {
                setData(response.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('/promotion');
        setLabel(['ID', 'Tên Khuyến mãi', 'Ngày bắt đầu', 'Ngày kết thúc', 'Hình ảnh']);
        setKey(['ID', 'Title', 'Start_time', 'End_time', 'AvatarLink']);
    }, []);
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    const HandlerShow = async function (value) {
        localStorage.setItem('Promotion', JSON.stringify(value));
        setPromotion(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Promotion', JSON.stringify(value));
        localStorage.setItem('EditPromotion', '0');
        setPromotion(value);
        setEditPromotion('0');
    };
    if (localStorage.getItem('Promotion') && localStorage.getItem('EditPromotion')) {
        return (
            <div className={cx('')}>
                <EditPromotionComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Promotion');
                        localStorage.removeItem('EditPromotion');
                        setPromotion([]);
                        setEditPromotion('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Promotion')) {
        let Promotion = JSON.parse(localStorage.getItem('Promotion'));
        return (
            <div className={cx('wrapper_detail')}>
                <h1>{Promotion.Title}</h1>
                <h3>
                    {ConverTime(Promotion.Start_time)[0]}:{ConverTime(Promotion.Start_time)[1]}{' '}
                    {ConverTime(Promotion.Start_time)[2]} Đến {ConverTime(Promotion.End_time)[0]}:
                    {ConverTime(Promotion.End_time)[1]} {ConverTime(Promotion.End_time)[2]}
                </h3>
                <div className={cx('Content')}>
                    <img className={cx('Image')} src={Promotion.AvatarLink} alt={Promotion.Title} />
                    <p>{Promotion.Content}</p>
                </div>

                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Promotion');
                        setPromotion([]);
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

                                    <th>Xem</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value[Key[0]]}</td>
                                        <td>{value[Key[1]]}</td>
                                        <td>{ConverTime(value[Key[2]])[2]}</td>
                                        <td>{ConverTime(value[Key[3]])[2]}</td>
                                        <td>
                                            <img
                                                className={cx('avatar')}
                                                src={value[Key[4]] ? value[Key[4]] : AvatarError}
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
                                            <a className={cx('btn', 'delete')}>Xóa</a>
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

function TablePromotion(props) {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TablePromotionDetail />
                <a className={cx('AddNew')}></a>
            </Container>
        </div>
    );
}

export default TablePromotion;
