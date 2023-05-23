import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './MoviePlaying.module.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const cx = classNames.bind(styles);

function MoviePlaying(props) {
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
        return datetime;
    }
    const currentDate = new Date();
    const numberPlaying = [];
    if (props.movies) {
        return (
            <div className={cx('wrapper')}>
                <h3 className={cx('content')}>Phim Đang Chiếu</h3>
                <Row className={cx('row-movie')}>
                    {props.movies.map((item, index) => {
                        const dateString = ConverTime(item.ReleaseYear)[2];
                        const parts = dateString.split('/');
                        const day = parseInt(parts[1], 10);
                        const month = parseInt(parts[0], 10) - 1; // do tháng trong đối tượng Date bắt đầu từ 0
                        const year = parseInt(parts[2], 10);
                        const dateObject = new Date(year, month, day);
                        if (currentDate > dateObject) {
                            numberPlaying.push(index);
                            if (numberPlaying.length < 4) {
                                return (
                                    <Col xs={2} sm={2} md={2} lg={2} xl={10} xxl={2}>
                                        <div className={cx('image-hover')}>
                                            <img
                                                className={cx('item-image')}
                                                src={`${item.AvatarMovie}`}
                                                alt={item.MovieName}
                                            />
                                            <div className={cx('group')}>
                                                <a
                                                    href="./DatVe"
                                                    onClick={() => {
                                                        localStorage.setItem('movie', JSON.stringify(item));
                                                    }}
                                                    className={cx('btn-MuaVe')}
                                                >
                                                    Mua Ve
                                                </a>
                                            </div>
                                        </div>
                                        <p className={cx('name-movie')}>{item.MovieName}</p>
                                        <p className={cx('sub-name')}>{item.GioiThieu}</p>
                                    </Col>
                                );
                            }
                        }
                    })}
                    <Col>
                        <a className={cx('btn-continue')} href="./PhimDangChieu">
                            XEM THÊM
                        </a>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <h3 className={cx('content')}>Phim Đang Chiếu</h3>
                <Row className={cx('row-movie')}>
                    <h3>Lỗi truy suất dữ liệu</h3>
                </Row>
            </div>
        );
    }
}

export default MoviePlaying;
