import React, { useState, memo, Dispatch, SetStateAction } from 'react';
import { ReviewContent } from '../../types';

interface Props extends ReviewContent {}

// 정렬
interface sortProps {
    value: string;
    name: string;
}
const sortOptionList: sortProps[] = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된순' },
    { value: 'goodest', name: '별점높은순' },
    { value: 'baddest', name: '별점낮은순' },
];

interface controlMenuProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const ControlMenu: React.FC<controlMenuProps> = memo((controlMenuProp) => {
    return (
        <select
            className='controlMenu'
            value={controlMenuProp.value}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                controlMenuProp.onChange(e.target.value)
            }
        >
            {sortOptionList.map((item, idx) => (
                <option value={item.value}>{item.name}</option>
            ))}
        </select>
    );
});

const ReviewItem = (props: Props[]) => {
    const [sortType, setSortType] = useState('latest');

    const copyList = Array.from(Object.values(props)); // 배열 복사

    const GetProcessedReviewList = () => {
        const compare = (a: Props, b: Props) => {
            console.log(a, b);
            if (!a.date || !b.date || !a.grade || !b.grade) return 0;
            switch (sortType) {
                case 'oldest':
                    return a.date - b.date; // 오름차순
                case 'latest':
                    return b.date - a.date; // 내림차순
                case 'baddest':
                    return a.grade - b.grade;
                case 'goodest':
                    return b.grade - a.grade;
                default:
                    return 0;
            }
        };

        return copyList.sort(compare);
    };

    const setDateToLocalDate = (date: number) => {
        return `${new Date(date).toLocaleDateString()} ${new Date(
            date
        ).toLocaleTimeString()}`;
    };
    return (
        <section className='ReviewItem'>
            {Object.keys(props).length !== 0 ? ( // 값이 있을때만항목이 보임
                <React.Fragment>
                    <div className='control_menu'>
                        <ControlMenu value={sortType} onChange={setSortType} />
                    </div>
                    <div className='list'>
                        {GetProcessedReviewList().map((review: Props) => (
                            <div className='container'>
                                <div className='info'>
                                    <span className='nick'>{review.nick}</span>
                                    <span className='date'>
                                        {setDateToLocalDate(review.date)}
                                    </span>
                                </div>
                                <div className='star'>
                                    <span>{review.grade}</span>
                                </div>
                                <div className='content'>
                                    <p>{review.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ) : (
                <div></div>
            )}
        </section>
    );
};

export default ReviewItem;
