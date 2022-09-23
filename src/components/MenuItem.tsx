import React from "react";
import { Link } from "react-router-dom";

export const MenuItem: React.FC<{ title: string; content?: JSX.Element; to: string; active?: boolean }> = ({
    title,
    content,
    to,
    active,
}) => {
    return (
        <Link to={to}>
            <span
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-50 ${
                    active ? "bg-gray-100" : "hover:bg-yellow-600"
                } dark:hover:bg-gray-70 hover:font-bold hover:text-black`}
            >
                {title}
                {content}
            </span>
        </Link>
    );
};
