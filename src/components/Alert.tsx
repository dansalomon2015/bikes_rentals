import React from "react";

export const Alert: React.FC<{ message?: string; type?: "error" | "success" | "warning" }> = ({
    message,
    type = "error",
}) => {
    if (!message) return null;

    return (
        <div
            className={`${
                type === `error` ? `bg-red-500` : type === `warning` ? `bg-orange-500` : `bg-green-500`
            } px-5 py-2 text-center my-2`}
        >
            <p className="text-white">{message}</p>
        </div>
    );
};
