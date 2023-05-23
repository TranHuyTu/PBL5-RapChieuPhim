import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Promotion.module.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cx = classNames.bind(styles);

let img_link = [
    {
        ID: '0',
        link: 'https://cdn.galaxycine.vn/media/2023/1/17/bangqltv-2023-digital-1200x1800_1673940943642.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '1',
        link: 'https://cdn.galaxycine.vn/media/2023/2/16/glx-q1-1200x1800_1676516168305.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '2',
        link: 'https://cdn.galaxycine.vn/media/2022/12/10/combo-u22-digital-300x450-1667285239633_1670637604853.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '3',
        link: 'https://cdn.galaxycine.vn/media/2023/3/1/nta-t3-digital-300x450_1677659306345.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '4',
        link: 'https://cdn.galaxycine.vn/media/2022/1/17/300x450-1642060360230_1642391019890.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '5',
        link: 'https://cdn.galaxycine.vn/media/2022/12/10/combo-u22-digital-300x450-1667285239633_1670637604853.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '6',
        link: 'https://cdn.galaxycine.vn/media/2023/3/1/nta-t3-digital-300x450_1677659306345.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '7',
        link: 'https://cdn.galaxycine.vn/media/2022/12/10/combo-u22-digital-300x450-1667285239633_1670637604853.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
    {
        ID: '8',
        link: 'https://cdn.galaxycine.vn/media/2023/3/1/nta-t3-digital-300x450_1677659306345.jpg',
        title: 'Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ Galaxy Cinema',
        sub_title:
            'Chỉ cần là thành viên Galaxy Cinema, nhận ngay 1 bắp 2 nước! Từ 22.01.2023, Galaxy Cinema mang đến cho các Stars chính sách quà tặng tối ưu nhất từ trước đến nay! Tích lũy điểm thưởng và sử dụng thanh toán vé/ bắp nước. Khách hàng thành viên có sinh nhật trong tháng sẽ được tặng combo 2 - 01 bắp ngọt -2 nước. Đặc biệt hơn nữa, G-Star và X-Star vừa nhận combo vừa có thêm vé mừng sinh nhật.',
    },
];

function Promotion(props) {
    if (props.promotions) {
        return (
            <div className={cx('wrapper')}>
                <a className={cx('wrapper_title')}>TIN KHUYẾN MÃI</a>
                <Row className={cx('row')}>
                    {props.promotions.map((value, index) => {
                        if (index < 9) {
                            return (
                                <Col
                                    xs={10}
                                    sm={6}
                                    md={5}
                                    lg={4}
                                    xl={3}
                                    className={cx('col_img_promption')}
                                    key={index}
                                >
                                    <div className={cx('img_promption')}>
                                        <img src={value.AvatarLink} alt="" />
                                    </div>
                                    <div className={cx('img_hover')}>
                                        <div className={cx('info')}>
                                            <div className={cx('title')}>
                                                <a href="">
                                                    <h2>{value.Title}</h2>
                                                </a>
                                            </div>
                                            <div className={cx('title')}>
                                                <p>{value.Content}</p>
                                            </div>
                                            <a
                                                className={cx('btn_detail')}
                                                href="/PromotionDetail"
                                                onClick={() => {
                                                    localStorage.setItem('promotion', JSON.stringify(value));
                                                }}
                                            >
                                                CHI TIẾT
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            );
                        }
                    })}
                    ;
                </Row>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <a className={cx('wrapper_title')}>TIN KHUYẾN MÃI</a>
                <div className={cx('row')}>
                    {img_link.map((link) => (
                        <div className={cx('col_img_promption')} key={link.ID}>
                            <div className={cx('img_promption')}>
                                <img src={link.link} alt="" />
                            </div>
                            <div className={cx('img_hover')}>
                                <div className={cx('info')}>
                                    <div className={cx('title')}>
                                        <a href="">
                                            <h2>{link.title}</h2>
                                        </a>
                                    </div>
                                    <div className={cx('title')}>
                                        <p>{link.sub_title}</p>
                                    </div>
                                    <a className={cx('btn_detail')} href="">
                                        CHI TIẾT
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    ;
                </div>
            </div>
        );
    }
}
export default Promotion;
