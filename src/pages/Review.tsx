import '../styles/Review.css';
import ReviewItem from '../components/Review/ReviewItem';
import ReviewEdit from '../components/Review/ReviewEdit';
import { ReviewContent } from '../types';
import React, { useContext, useEffect, useReducer } from 'react';

interface Props extends ReviewContent {}

type Action =
    | {
          type: 'CREATE';
          data: Props;
      }
    | { type: 'DELETE'; id: number };

const reducer = (state: Props[], action: Action) => {
    switch (action.type) {
        case 'CREATE': {
            return [...state, action.data];
        }
        case 'DELETE': {
            return state.filter((it) => it.id !== action.id);
        }
    }
};

export const ReviewStateContext = React.createContext<Props[] | null>(null); // datas 공급
export const ReviewDispatchContext = React.createContext<{
    onCreate: (
        nick: string,
        password: string,
        grade: number,
        content: string
    ) => void;
    //onDelete: (id: number) => void;
} | null>(null); // 함수 공급
export function useReviewDispatch() {
    const dispatch = useContext(ReviewDispatchContext);
    if (!dispatch) throw new Error('ReviewDispatchContext에 문제가 있다'); // null 타입일 때 대비
    return dispatch;
}

const Review = () => {
    const [datas, dispatch] = useReducer(reducer, []);

    const onCreate = (
        nick: string,
        password: string,
        grade: number,
        content: string
    ) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: 1,
                nick,
                password,
                grade,
                content,
                date: new Date().getTime(),
            },
        });
    };

    useEffect(() => {}, [datas]);

    return (
        <div className='Review'>
            <div className='info'>
                <h1>전주를 다녀오셨나요?</h1>
                <h2>어땠는지 한줄로 평가를 남겨주세요</h2>
                닉네임, 비밀번호, 수정, 삭제, 별점, 페이지 형식
            </div>
            <ReviewStateContext.Provider value={datas}>
                <ReviewDispatchContext.Provider value={{ onCreate }}>
                    <ReviewEdit />
                    <ReviewItem {...datas} />
                </ReviewDispatchContext.Provider>
            </ReviewStateContext.Provider>
        </div>
    );
};

export default Review;
