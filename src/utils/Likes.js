import React from "react";

const Likes = ({ numberOfLikes, threadId }) => {
    const Likes = ({ numberOfLikes, threadId }) => {
        const handleLikeFunction = () => {
            fetch("https://bookmatebb-react-backend.onrender.com/api/thread/like", {
                method: "POST",
                body: JSON.stringify({
                    threadId,
                    userId: localStorage.getItem("_id"),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error_message) {
                        alert(data.error_message);
                    } else {
                        alert(data.message);
                    }
                })
                .catch((err) => console.error(err));
        };
    
        return (
            <div className='likes__container'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4 likesBtn'
                    onClick={handleLikeFunction}
                >
                    {/*--other UI elements*/}
                </svg>
            </div>
        );
    };

    
    return (
        <div className="likes__container">
        <span className="likesBtn">👍</span>
        <p style={{ color: "#434242" }}>
            {numberOfLikes === 0 ? "" : numberOfLikes}
        </p>
        </div>
    );
};

export default Likes;