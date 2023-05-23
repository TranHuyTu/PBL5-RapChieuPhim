import classNames from 'classnames/bind';
import styles from './Controller.module.scss';
import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const pages = ['Mua Vé', 'Phim', 'Góc Điện Ảnh', 'Sự Kiện', 'Rap/Giá Vé', 'Hỗ Trợ', 'Thành Viên'];
const cx = classNames.bind(styles);

function Controller(props) {
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
        return datetime;
    }
    const currentDate = new Date();
    const numberPlaying = [];
    const numberComing = [];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('sub-menu')}>
                    <a href="./lichchieu">{pages[0]}</a>
                    <span>|</span>
                </div>
                <div className={cx('sub-menu', 'no01')}>
                    <a href="">
                        {pages[1]}
                        <KeyboardArrowDownIcon fontSize="inherit"></KeyboardArrowDownIcon>
                    </a>
                    <span>|</span>
                    <div className={cx('sub-item-wrapper')}>
                        <div className={cx('submenu-row')}>
                            <div className={cx('sub-title')}>
                                <a href="./DSPhim">Phim đang chiếu</a>
                            </div>
                            <div className={cx('sub-movies')}>
                                <div className={cx('movies-item')}>
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
                                                if (numberPlaying.length < 5) {
                                                    return (
                                                        <Col xs={2} sm={2} md={2} lg={2} xl={3} xxl={2} key={index}>
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
                                                                            localStorage.setItem(
                                                                                'movie',
                                                                                JSON.stringify(item),
                                                                            );
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
                                    </Row>
                                </div>
                            </div>
                            <div className={cx('sub-title')}>
                                <a href="./DSPhim">Phim sắp chiếu</a>
                            </div>
                            <div className={cx('sub-movies')}>
                                <div className={cx('movies-item')}>
                                    <Row className={cx('row-movie')}>
                                        {props.movies.map((item, index) => {
                                            const dateString = ConverTime(item.ReleaseYear)[2];
                                            const parts = dateString.split('/');
                                            const day = parseInt(parts[1], 10);
                                            const month = parseInt(parts[0], 10) - 1; // do tháng trong đối tượng Date bắt đầu từ 0
                                            const year = parseInt(parts[2], 10);
                                            const dateObject = new Date(year, month, day);
                                            if (currentDate < dateObject) {
                                                numberComing.push(index);
                                                if (numberComing.length < 5) {
                                                    return (
                                                        <Col xs={2} sm={2} md={2} lg={2} xl={3} xxl={2} key={index}>
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
                                                                            localStorage.setItem(
                                                                                'movie',
                                                                                JSON.stringify(item),
                                                                            );
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
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('sub-menu', 'no02')}>
                    <a href="">
                        {pages[2]}
                        <KeyboardArrowDownIcon fontSize="inherit"></KeyboardArrowDownIcon>
                    </a>
                    <span>|</span>
                    <div className={cx('sub-menu-wrapper')}>
                        <List sx={{}} component="nav" aria-label="mailbox folders">
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="./DienAnh">
                                    THỂ LOẠI PHIM
                                </a>
                            </ListItem>
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="./DienVien">
                                    DIỄN VIÊN
                                </a>
                            </ListItem>
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="./DaoDien">
                                    ĐẠO DIỄN
                                </a>
                            </ListItem>
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="./BinhLuanPhim">
                                    BÌNH LUẬN PHIM
                                </a>
                            </ListItem>
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="./MovieBlog">
                                    BLOG ĐIỆN ẢNH
                                </a>
                            </ListItem>
                        </List>
                    </div>
                </div>
                <div className={cx('sub-menu', 'no02')}>
                    <a href="">
                        {pages[3]}
                        <KeyboardArrowDownIcon fontSize="inherit"></KeyboardArrowDownIcon>
                    </a>
                    <span>|</span>
                    <div className={cx('sub-menu-wrapper')}>
                        <List sx={{}} component="nav" aria-label="mailbox folders">
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="">
                                    ƯU ĐÃI
                                </a>
                            </ListItem>
                            <ListItem className={cx('sub-menu-hover')}>
                                <a className={cx('sub-menu-item')} href="">
                                    PHIM HAY THÁNG
                                </a>
                            </ListItem>
                        </List>
                    </div>
                </div>
                <div className={cx('sub-menu')}>
                    <a href="/Cinema">{pages[4]}</a>
                    <span>|</span>
                </div>
                <div className={cx('sub-menu')}>
                    <a href="">{pages[5]}</a>
                    <span>|</span>
                </div>
                <div className={cx('sub-menu')}>
                    <a href="/Profile">{pages[6]}</a>
                </div>
            </div>
        </div>
    );
}

export default Controller;
