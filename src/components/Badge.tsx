import React from "react";

export const Badge: React.FC<{ count: number }> = ({ count }) => {
    return (
        <span className="inline-flex justify-center items-center ml-2 w-6 h-6 text-xs font-semibold text-white bg-black rounded-full">
            {count}
        </span>
    );
};
