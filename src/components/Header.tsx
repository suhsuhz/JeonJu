import { useNavigate } from 'react-router-dom';

const Header = () => {
    const goPage = (page: string) => {
        navigate(`/${page}`);
    };

    const navigate = useNavigate();

    return (
        <header>
            <h1
                className='logo'
                onClick={() => {
                    goPage('Home');
                }}
            >
                Hi JeonJU
            </h1>
            <ul className='navigation'>
                <li
                    className='item'
                    onClick={() => {
                        goPage('Food');
                    }}
                >
                    먹을거리
                </li>
                <li className='item'>놀거리</li>
                <li
                    className='item'
                    onClick={() => {
                        goPage('Review');
                    }}
                >
                    전주한줄
                </li>
            </ul>
        </header>
    );
};

export default Header;
