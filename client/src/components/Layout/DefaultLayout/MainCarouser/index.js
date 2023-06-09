import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './MainCarouser.module.scss';
import BoxBuyTicket from '../BoxBuyTicket';

const cx = classNames.bind(styles);

class CitiesSlider extends React.Component {
    constructor(props) {
        super(props);

        this.IMAGE_PARTS = 4;

        this.changeTO = null;
        this.AUTOCHANGE_TIME = 4000;

        this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }

    componentWillUnmount() {
        window.clearTimeout(this.changeTO);
    }

    componentDidMount() {
        this.runAutochangeTO();
        setTimeout(() => {
            this.setState({ activeSlide: 0, sliderReady: true });
        }, 0);
    }

    runAutochangeTO() {
        this.changeTO = setTimeout(() => {
            this.changeSlides(1);
            this.runAutochangeTO();
        }, this.AUTOCHANGE_TIME);
    }

    changeSlides(change) {
        window.clearTimeout(this.changeTO);
        const { length } = this.props.slides;
        const prevSlide = this.state.activeSlide;
        let activeSlide = prevSlide + change;
        if (activeSlide < 0) activeSlide = length - 1;
        if (activeSlide >= length) activeSlide = 0;
        this.setState({ activeSlide, prevSlide });
    }

    render() {
        const { activeSlide, prevSlide, sliderReady } = this.state;

        return (
            <div className={cx('slider', { 's--ready': sliderReady })}>
                <a href="">
                    <div className={cx('slider__slides')}>
                        {this.props.slides.map((slide, index) => (
                            <div
                                className={cx('slider__slide', {
                                    's--active': activeSlide === index,
                                    's--prev': prevSlide === index,
                                })}
                                key={slide.city}
                            >
                                <div className={cx('slider__slide-content')}>
                                    <h3 className={cx('slider__slide-subheading')}>{slide.country || slide.city}</h3>
                                    <h2 className={cx('slider__slide-heading')}>
                                        {slide.city.split('').map((l, index) => (
                                            <span key={index}>{l}</span>
                                        ))}
                                    </h2>
                                    <p className={cx('slider__slide-readmore')}>read more</p>
                                </div>
                                <div className={cx('slider__slide-parts')}>
                                    {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                                        <div className={cx('slider__slide-part')} key={i}>
                                            <div
                                                className={cx('slider__slide-part-inner')}
                                                style={{ backgroundImage: `url(${slide.img})` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="slider__control" onClick={() => this.changeSlides(-1)} />
                    <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
                </a>
            </div>
        );
    }
}

const slides = [
    {
        ID: '0',
        city: 'Hà Nội',
        country: 'Hiện đại',
        img: 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1686338065/learn_nodejs/2048wx682h1_1685953509006_vbpvtg.jpg',
    },
    {
        ID: '1',
        city: 'Hải Phòng',
        country: 'Sầm uất',
        img: 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1686338066/learn_nodejs/2048x682_1684396421946_hgwayf.jpg',
    },
    {
        ID: '2',
        city: 'Đà Nẵng',
        country: 'Trẻ trung',
        img: 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1686338063/learn_nodejs/2048wx682h_1684824878382_qdandy.jpg',
    },
    {
        ID: '3',
        city: 'Hồ Chí Minh',
        country: 'Năng động',
        img: 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1686338063/learn_nodejs/combo-u22-digital-2048x682_1667285637091_jv7os4.jpg',
    },
    {
        ID: '4',
        city: 'Nghệ An',
        country: 'Nhiệt huyết',
        img: 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1686338062/learn_nodejs/optimus_1686018879187_bltszy.jpg',
    },
    {
        ID: '5',
        city: 'Hà Tĩnh',
        country: 'Thanh bình',
        img: 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1686338061/learn_nodejs/galaxy-2048x682_1685609404286_w8yqny.jpg',
    },
];

function MainCarouser(props) {
    return (
        <div className={cx('wrapper')}>
            <CitiesSlider slides={slides} />
            <div className={cx('BoxBuyTicket')}>
                <BoxBuyTicket TimKiem={props.TimKiem} />
            </div>
        </div>
    );
}
export default MainCarouser;
