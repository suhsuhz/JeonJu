import { useNavigate } from 'react-router-dom';

const Header = () => {
    const goReview = () => {
        navigate(`/Review`);
    };
    const goHome = () => {
        navigate(`/Home`);
    };

    const navigate = useNavigate();

    return (
        <header>
            <h1 className='logo' onClick={goHome}>
                Hi JeonJU
            </h1>
            <ul className='navigation'>
                <li className='item'>먹을거리</li>
                <li className='item'>놀거리</li>
                <li className='item' onClick={goReview}>
                    전주한줄
                </li>
            </ul>
        </header>
    );
};

export default Header;
