import '../styles/Review.css';
import ReviewItem from '../components/Review/ReviewItem';
import ReviewEdit from '../components/Review/ReviewEdit';
import { ReviewContent } from '../types';
import React, { useContext, useEffect, useReducer, useRef } from 'react';

interface Props extends ReviewContent {}

type Action =
    | {
          type: 'CREATE';
          data: Props;
      }
    | {
          type: 'EDIT';
          id: number;
          data: Props;
      }
    | { type: 'DELETE'; id: number };

const reducer = (state: Props[], action: Action) => {
    switch (action.type) {
        case 'CREATE': {
            return [...state, action.data];
        }
        case 'EDIT': {
            return state.map((it) =>
                it.id === action.id ? { ...action.data } : it
            );
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
    onDelete: (id: number) => void;
    onEdit: (
        id: number,
        nick: string,
        password: string,
        grade: number,
        content: string,
        date: number
    ) => void;
} | null>(null); // 함수 공급

export function useReviewDispatch() {
    const dispatch = useContext(ReviewDispatchContext);
    if (!dispatch) throw new Error('ReviewDispatchContext error'); // null 타입일 때 대비
    return dispatch;
}

const Review = () => {
    const [datas, dispatch] = useReducer(reducer, []);
    const dataId = useRef(0);

    const onCreate = (
        nick: string,
        password: string,
        grade: number,
        content: string
    ) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: dataId.current,
                nick,
                password,
                grade,
                content,
                date: new Date().getTime(),
            },
        });
        dataId.current++;
    };

    const onEdit = (
        id: number,
        nick: string,
        password: string,
        grade: number,
        content: string,
        date: number
    ) => {
        dispatch({
            type: 'EDIT',
            data: {
                id: id,
                nick,
                password,
                grade,
                content,
                date: date,
            },
            id: id,
        });
        console.log(id);
    };

    const onDelete = (id: number) => {
        dispatch({ type: 'DELETE', id: id });
    };

    useEffect(() => {
        if (datas && datas.length > 0) {
            dataId.current = datas[datas.length - 1].id + 1;
        }
    }, [datas]);

    return (
        <div className='Review'>
            <div className='info'>
                <h1>전주를 다녀오셨나요?</h1>
                <h2>어땠는지 한줄로 평가를 남겨주세요</h2>
                (데이터는 저장되지 않으며, 페이지 이동시 사라집니다)
            </div>
            <ReviewStateContext.Provider value={datas}>
                <ReviewDispatchContext.Provider
                    value={{ onCreate, onDelete, onEdit }}
                >
                    <ReviewEdit />
                    <ReviewItem {...datas} />
                </ReviewDispatchContext.Provider>
            </ReviewStateContext.Provider>
        </div>
    );
};

export default Review;
