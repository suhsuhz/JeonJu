import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import '../styles/Home.css';
interface itemsProps {
    src: string;
    name: string;
    link: {
        externalLink: boolean;
        src: string;
    };
}

const items: itemsProps[] = [
    {
        src: '/assets/images/home/food.png',
        name: '먹거리',
        link: {
            externalLink: false,
            src: '/Food',
        },
    },
    {
        src: '/assets/images/home/play.png',
        name: '놀거리',
        link: {
            externalLink: false,
            src: '',
        },
    },
    {
        src: '/assets/images/home/review.png',
        name: '전주한줄',
        link: {
            externalLink: false,
            src: '/Review',
        },
    },
    {
        src: '/assets/images/home/public.png',
        name: '전주공식사이트',
        link: {
            externalLink: true,
            src: 'https://www.jeonju.go.kr/main/index.jsp',
        },
    },
];

const Home = () => {
    const swiperCoreRef = useRef<Swiper>(null);

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
    const settings = useMemo(
        () => ({
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            slidesPerGroup: 1,
            spaceBetween: 30,
            grabCursor: true,
            autoplay: {
                delay: 2000,
            },
            breakpoints: {
                970: {
                    slidesPerView: 3,
                },
            },
        }),
        []
    );

    return (
        <main>
            <section className='Home'>
                <SwiperReact {...settings}>
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            {item.link.externalLink ? (
                                <a href={item.link.src} target='_blank'>
                                    <div className='home_slide'>
                                        <img src={item.src} alt={item.name} />
                                        <div className='home_slide_text'>
                                            {item.name}
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <Link to={item.link.src}>
                                    <div className='home_slide'>
                                        <img src={item.src} alt={item.name} />
                                        <div className='home_slide_text'>
                                            {item.name}
                                        </div>
                                    </div>
                                </Link>
                            )}
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
