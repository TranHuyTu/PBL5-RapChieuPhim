import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Link.module.scss';

const cx = classNames.bind(styles);

function Link(props) {
    return (
        <div>
            <div className={cx('wrapper')}>
                <a href="../">Trang Chủ </a>
                <a href="/"> Đặt Vé </a>
                <h5 className={cx('title')}>{JSON.parse(localStorage.getItem('movie')).MovieName}</h5>
            </div>
        </div>
    );
}

export default Link;
