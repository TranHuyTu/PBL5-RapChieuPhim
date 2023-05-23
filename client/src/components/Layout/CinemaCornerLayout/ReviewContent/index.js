import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewSelect.module.scss';

import { useState } from 'react';

const cx = classNames.bind(styles);

const SelectOption = [
    {
        name: 'Thể Loại',
        option: ['Phim Hài', ' Phim khoa học viễn tưởng', 'Phim kinh dị', 'Phim Viễn Tây', 'Phim Chiến tranh'],
    },
    {
        name: 'Quốc Gia',
        option: ['Anh', 'Pháp', 'Đức', 'Mỹ', 'Việt Nam'],
    },
    {
        name: 'Năm',
        option: ['2023', ' 2022', '2021', '2020', '2019'],
    },
    {
        name: 'Đang Chiếu/Sắp Chiếu',
        option: ['Đang Chiếu', 'Sắp Chiếu'],
    },
    {
        name: 'Mới Nhất',
        option: ['Xem Nhiều Nhất', 'Đánh Giá Tốt Nhất'],
    },
];

function ReviewSelect({ chilren }) {
    const [selectedOption, setSelectedOption] = useState('Thể Loại');
    const [selectedOption1, setSelectedOption1] = useState('Quốc Gia');
    const [selectedOption2, setSelectedOption2] = useState('Năm');
    const [selectedOption3, setSelectedOption3] = useState('Đang Chiếu/Sắp Chiếu');
    const [selectedOption4, setSelectedOption4] = useState('Mới Nhất');

    const select = [selectedOption, selectedOption1, selectedOption2, selectedOption3, selectedOption4];

    const handle = [
        function handleChange(event) {
            setSelectedOption(event.target.value);
            console.log(event.target.value);
        },
        function handleChange1(event) {
            setSelectedOption1(event.target.value);
            console.log(event.target.value);
        },
        function handleChange2(event) {
            setSelectedOption2(event.target.value);
            console.log(event.target.value);
        },
        function handleChange3(event) {
            setSelectedOption3(event.target.value);
            console.log(event.target.value);
        },
        function handleChange4(event) {
            setSelectedOption4(event.target.value);
            console.log(event.target.value);
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-select')}>
                {SelectOption.map((value, index) => (
                    <select
                        className={cx('select-option', 'input')}
                        value={select[index]}
                        onChange={handle[index]}
                        key={index}
                    >
                        <option value={value.name}>{value.name}</option>
                        {value.option.map((value, index) => (
                            <option value={value} key={index}>
                                {value}
                            </option>
                        ))}
                    </select>
                ))}
            </div>
        </div>
    );
}

export default ReviewSelect;
