import '../styles/Button.css';

interface buttonProps {
    text: string;
    type: string;
    onClick: () => void;
}

const Button = (props: buttonProps) => {
    const btnType = ['positive', 'negative'].includes(props.type)
        ? props.type
        : 'default';

    return (
        <button
            className={['button', `button_${props.type}`].join(' ')}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

export default Button;
