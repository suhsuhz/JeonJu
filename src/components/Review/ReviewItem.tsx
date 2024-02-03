import React, {
    useState,
    memo,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { ReviewContent } from '../../types';
import { setDateToLocalDate } from '../../util/date';
import ReviewEdit from './ReviewEdit';
import Button from '../Button';
import { useReviewDispatch } from '../../pages/Review';
import { STAR_IMAGE } from '../../util/constants';

interface Props extends ReviewContent {
    isEditable?: boolean;
}

// 정렬 option interface
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
                <option key={idx} value={item.value}>
                    {item.name}
                </option>
            ))}
        </select>
    );
});

const ReviewItem = (props: Props[]) => {
    const [sortType, setSortType] = useState('latest');
    const dispatch = useReviewDispatch();

    const copyList = Array.from(Object.values(props)); // 배열 복사
    const [items, setItems] = useState(copyList);

    useEffect(() => {
        // mount
        GetProcessedReviewList();
    }, []);

    useEffect(() => {
        // update
        GetProcessedReviewList();
    }, [props, sortType]);

    // 리뷰 리스트 정렬
    const GetProcessedReviewList = () => {
        const compare = (a: Props, b: Props) => {
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

        /* const newProps = items.map((item) => ({ ...item, isEditable: false }));
        console.log(newProps);
        setItems(newProps.sort(compare)); */
        setItems(copyList.sort(compare));
    };

    // 추천 점수 별점으로 보여주기
    const setGradeToStar = (grade: number | undefined) => {
        if (!grade) return [];
        const array = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= grade) {
                array.push(STAR_IMAGE.on);
            } else {
                array.push(STAR_IMAGE.off);
            }
        }
        return array;
    };

    // 삭제
    const handleDelete = (id: number, password: string) => {
        const inputPassword = prompt('비밀번호를 입력해주세요', '');
        if (password !== inputPassword) {
            alert('틀린 비밀번호입니다.');
            return;
        }

        dispatch.onDelete(id);
    };

    // 수정
    const handleFormChange = (id: number) => {
        const inputPassword = prompt('비밀번호를 입력해주세요', '');

        //const isEditable = inputPassword === props[].password;
        const editItem = items.filter(
            (item) => item.id === id && inputPassword === item.password
        );
        if (editItem.length < 1) {
            alert('틀린 비밀번호입니다.');
            return;
        }

        const newProps = items.map((item) =>
            item.id === id
                ? { ...item, isEditable: true }
                : { ...item, isEditable: false }
        );
        setItems(newProps);
    };

    return (
        <section className='ReviewItem'>
            {Object.keys(props).length !== 0 ? ( // 값이 있을때만항목이 보임
                <div className='container'>
                    <div className='control_menu'>
                        <ControlMenu value={sortType} onChange={setSortType} />
                    </div>
                    <div className='list'>
                        {items.map((review, index) => (
                            <div key={index} className='item'>
                                {!review.isEditable ? (
                                    <>
                                        <div className='top'>
                                            <span className='nick'>
                                                {review.nick}
                                            </span>
                                            <span className='date'>
                                                {setDateToLocalDate(
                                                    review.date
                                                )}
                                            </span>
                                        </div>
                                        <div className='middle'>
                                            <span>
                                                {setGradeToStar(
                                                    review.grade
                                                )?.map((item, index) => (
                                                    <img
                                                        key={index}
                                                        src={item}
                                                        alt='별'
                                                    />
                                                ))}
                                            </span>
                                            <span>
                                                <Button
                                                    type={'positive'}
                                                    text={'수정하기'}
                                                    onClick={() =>
                                                        handleFormChange(
                                                            review.id
                                                        )
                                                    }
                                                />
                                                <Button
                                                    type={'negative'}
                                                    text={'삭제하기'}
                                                    onClick={() =>
                                                        handleDelete(
                                                            review.id,
                                                            review.password
                                                        )
                                                    }
                                                />
                                            </span>
                                        </div>
                                        <div className='bottom'>
                                            <p>{review.content}</p>
                                        </div>
                                    </>
                                ) : (
                                    <ReviewEdit
                                        isEdit={true}
                                        originalData={review}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </section>
    );
};

export default ReviewItem;
