import '../styles/Food.css';
import { useState } from 'react';
import { FoodItemsProp } from '../types';
import FoodItem from '../components/Food/FoodItem';

const Food = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(2);
    //const;

    const items: FoodItemsProp[] = [
        {
            name: '카페 올드브릭',
            content: {
                tel: '010-1234-1234',
                desc: '스페셜 로스팅으로 맛있는 커피. \n달콤함이 팡팡 터지는 디저트. \n감성 가득 예쁜 포토존. \n오래 앉아있어도 편안한 자리. \n전북 관광 유니크 베뉴로 선정된 전주 한옥마을 대형 카페 올드브릭과 함께라면 이 모든 것을 완벽하게 즐길 수 있어요.',
            },
            image: {
                src: '/assets/images/Food/oldbrick.jpg',
                alt: '빵',
            },
            address: '전북 전주시 완산구 황학6길 1 올드브릭',
        },
        {
            name: '두이모 비빔밥와플',
            content: {
                tel: '010-1234-1234',
                desc: '비빔밥의 새로운 변신! 비빔밥와플 수제음료 전문점 입니다. \n비빔밥와플&음료포장가능(미리 연락주세요 ^^) 사전예약시 단체포장주문도 가능합니다',
            },
            image: {
                src: '/assets/images/Food/dueimo.jpg',
                alt: '와플',
            },
            address: '전북 전주시 완산구 자만동2길 21 두이모 카페',
        },
        {
            name: '교동다원',
            content: {
                tel: '010-1234-1234',
                desc: '25년 전통의 차(茶) 전문점입니다. \n대표 메뉴는 황차(黃茶)이며 이외에 찻잎을 주재료로 하는 다양한 차(茶)들을 경험하실 수 있습니다. \n\n*입장 가능 연령은 중학생 이상입니다. 양해 부탁드립니다.',
            },
            image: {
                src: '/assets/images/Food/kyodong.jpg',
                alt: '차',
            },
            address: '전북 전주시 완산구 은행로 65-5',
        },
    ];

    return (
        <div className='Food'>
            <FoodItem {...items[activeItemIndex]} />
        </div>
    );
};
export default Food;
