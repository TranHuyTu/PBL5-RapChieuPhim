import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ChiTietHoaDon.module.scss';
import moment from 'moment';

import Btn from '~/components/Layout/Btn';

const cx = classNames.bind(styles);

function ChiTietHoaDon(props) {
    let Movie = JSON.parse(localStorage.getItem('movie'));
    let ShowTime = JSON.parse(localStorage.getItem('showtime'));
    let Time = ConverTime(ShowTime.ShowtimeDateTime);
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
        return datetime;
    }
    function ShowFoodFocus() {
        let StrFood = '';
        props.ListFoods.map((value) => {
            StrFood += value + ',';
        });
        return StrFood;
    }
    function ConverArray(array) {
        let result = '';
        if (array != []) {
            array.map((value, index) => {
                result += value;
                if (array.length - 1 != index) {
                    result += ' , ';
                }
            });
        }
        return result;
    }
    return (
        <div className={cx('wrapper')}>
            <img className={cx('img-movie')} src={Movie.AvatarMovie} />
            <h3 className={cx('name-movie')}>{Movie.MovieName}</h3>
            <p className={cx('desc-movie')}>{Movie.TomTat}</p>
            <div className={cx('rap', 'info')}>
                <h5 className={cx('title')}>Rạp :&nbsp;</h5>
                <p className={cx('desc')}>{ShowTime.CinemaName}</p>
            </div>
            <div className={cx('suat-chieu', 'info')}>
                <h5 className={cx('title')}>Suất Chiếu :&nbsp;</h5>
                <p className={cx('desc')}>
                    {Time[0]} : {Time[1]}
                </p>
            </div>
            <div className={cx('combo', 'info')}>
                <h5 className={cx('title')}>Combo :&nbsp;</h5>
                <p className={cx('desc')}>{ShowFoodFocus()}</p>
            </div>
            <div className={cx('seats', 'info')}>
                <h5 className={cx('title')}>Ghế :&nbsp;</h5>
                <p className={cx('desc')}>{ConverArray(props.listSeat)}</p>
            </div>
            <div className={cx('TongTien', 'info')}>
                <h5 className={cx('title')}>Tổng Tiền :&nbsp;</h5>
                <p className={cx('desc')}>{props.Tong}</p>
            </div>
            <Btn ListFoods={props.ListFoods} TypeDetail={props.TypeDetail} />
        </div>
    );
}
export default ChiTietHoaDon;
