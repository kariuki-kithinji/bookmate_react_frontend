import React from "react";
import { useNavigate } from "react-router-dom";

const Comments = ({ numberOfComments, threadId }) => {
    const navigate = useNavigate();

    const handleAddComment = () => {
        navigate(`/${threadId}/replies`);
    };

    return (
        <div className="likes__container">
        <span className="likesBtn" onClick={handleAddComment}>
            Add Comment
        </span>
        <p style={{ color: "#434242" }}>
            {numberOfComments === 0 ? "" : numberOfComments}
        </p>
        </div>
    );
};

export default Comments;