import { useRef, useEffect, useMemo } from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, SwiperOptions } from 'swiper';
import 'swiper/css';
import '../styles/Home.css';

SwiperCore.use([Autoplay]);

interface itemsProps {
    src: string;
    name: string;
}

const items: itemsProps[] = [
    {
        src: '/assets/images/home/food.png',
        name: '먹거리',
    },
    {
        src: '/assets/images/home/play.png',
        name: '놀거리',
    },
    {
        src: '/assets/images/home/review.png',
        name: '전주한줄',
    },
];

const Home = () => {
    const swiperCoreRef = useRef<SwiperCore>(null);

    useEffect(() => {
        const swiper = swiperCoreRef.current;
        return () => {
            // unmount
            if (swiper) {
                swiper.destroy(true, true);
            }
        };
    }, []);

    // swiper 옵션 세팅
    const settings = useMemo<SwiperOptions>(
        () => ({
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            slidesPerGroup: 1,
            spaceBetween: 30,
            grabCursor: true,
            autoplay: {
                delay: 4000,
            },
            breakpoints: {
                970: {
                    slidesPerView: 3,
                },
            },
            modules: [Autoplay],
        }),
        []
    );

    return (
        <main>
            <section className='Home'>
                <SwiperReact {...settings}>
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='home_slide'>
                                <img src={item.src} alt={item.name} />
                                <div className='home_slide_text'>
                                    {item.name}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </SwiperReact>
                <div className='notice_container'>
                    <div className='item'>
                        <div className='image'>
                            <img src='/assets/images/home/jeya.jpg' />
                        </div>
                        <div className='desc'>
                            <span className='title'>전주 제야축제</span>
                            <span className='date'>12.31 19:~00:30</span>
                            <span className='place'>전주시청 앞 노송광장</span>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image'>
                            <img src='/assets/images/home/yahang.jpg' />
                        </div>
                        <div className='desc'>
                            <span className='title'>전주 문화재야행</span>
                            <span className='date'>09.23 ~ 09.24</span>
                            <span className='place'>
                                전주 한옥마을 / 경기전
                            </span>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image'>
                            <img src='/assets/images/home/bibim.jpg' />
                        </div>
                        <div className='desc'>
                            <span className='title'>전주 비빔밥축제</span>
                            <span className='date'>10.23 ~ 10.26</span>
                            <span className='place'>전주 한옥마을 일대</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
