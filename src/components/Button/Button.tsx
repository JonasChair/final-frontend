import React from "react";

type ButtonType = {
    onClick: () => void;
    text: string;
    className?: string;
}

const Button: React.FC<ButtonType> = ({
    onClick,
    text,
    className,
}) => {
    return (
        <button className={className} onClick={onClick}>
            {`${text}`}
        </button>
    )
}

export default Button;