import React, { useRef, useState } from 'react';
import Button from '../../components/Button';
import { useReviewDispatch } from '../../pages/Review';

const ReviewEdit = () => {
    //const dispatch = useContext(ReviewDispatchContext);
    const dispatch = useReviewDispatch();

    // handle submit
    const nickRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState<number | undefined>();
    const [content, setContent] = useState('');

    // 별 기본 이미지 경로
    const star = {
        on: '/assets/images/review/star_on.png',
        off: '/assets/images/review/star_off.png',
    };

    // 별점 기본값
    const defaultStars = [
        {
            src: star.off,
            value: 1,
        },
        {
            src: star.off,
            value: 2,
        },
        {
            src: star.off,
            value: 3,
        },
        {
            src: star.off,
            value: 4,
        },
        {
            src: star.off,
            value: 5,
        },
    ];

    const [stars, setStars] = useState(defaultStars);

    // 별이미지 클릭시 handler
    const handleSetStars = (value: number) => {
        // 사용자가 선택한 value값에 따라 별 배열에 on, off 바꿔주기
        const newStars = stars.map((item) => {
            return {
                ...item,
                src: item.value <= value ? star.on : star.off,
            };
        });
        setStars(newStars);
        setGrade(value); // 실제 데이터에 들어갈 별점값 넣어주기
    };

    // 입력값 넣어주기
    const onChangeValue = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'nick':
                setNick(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'grade':
                setGrade(parseInt(value));
                break;
            case 'content':
                setContent(value);
                break;
        }
    };

    // validate Input
    const handleSubmit = () => {
        if (nick.length <= 1) {
            alert('닉네임을 한글자 이상 입력해주세요');
            nickRef.current?.focus();
            return;
        }

        if (password.length <= 1) {
            alert('비밀번호를 한글자 이상 입력해주세요');
            nickRef.current?.focus();
            return;
        }

        if (!grade) {
            alert('여행 추천 정도를 별점으로 선택해주세요');
            nickRef.current?.focus();
            return;
        }

        if (content.length <= 1) {
            alert('후기를 한글자 이상 입력해주세요');
            nickRef.current?.focus();
            return;
        }

        dispatch.onCreate(nick, password, grade, content);
        setNick('');
        setPassword('');
        setGrade(undefined);
        setContent('');
        setStars(defaultStars);
    };

    return (
        <section className='ReviewEdit'>
            <div className='item'>
                <span className='title'>닉네임</span>
                <input
                    type='text'
                    value={nick}
                    name={'nick'}
                    ref={nickRef}
                    onChange={onChangeValue}
                />
            </div>
            <div className='item'>
                <span className='title'>비밀번호</span>
                <input
                    type='text'
                    value={password}
                    name={'password'}
                    ref={passwordRef}
                    onChange={onChangeValue}
                />
            </div>
            <div className='item'>
                <span className='title'>추천</span>
                <div className='star_area'>
                    {stars.map((item) => (
                        <span onClick={() => handleSetStars(item.value)}>
                            <img src={item.src} alt='별' />
                        </span>
                    ))}
                </div>
            </div>
            <div className='item'>
                <span className='title'>한줄후기</span>
                <textarea
                    value={content}
                    name={'content'}
                    ref={contentRef}
                    onChange={onChangeValue}
                ></textarea>
            </div>
            <div className='item button'>
                <Button
                    type={'default'}
                    text={'저장하기'}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            </div>
        </section>
    );
};

export default ReviewEdit;
