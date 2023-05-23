import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableDetail.module.scss';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableDetail(props) {
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Table striped bordered hover>
                    <thead>
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
                            <tr>
                                <td>{value.ID}</td>
                                <td>{value.MovieName}</td>
                                <td>{value.TimeMovie} Phút</td>
                                <td>{ConverTime(value.ReleaseYear)[2]}</td>
                                <td>
                                    <a href={value.LinkReview} target="_blank">
                                        {value.LinkReview}
                                    </a>
                                </td>
                                <td>
                                    <a className={cx('btn', 'show')}>Xem</a>
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
            </Container>
        </div>
    );
}

export default TableDetail;
