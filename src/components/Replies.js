import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Replies = () => {
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    //👇🏻 This function when triggered when we add a new reply
    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        addReply()
        setReply("");
    };

    useEffect(() => {
        const fetchReplies = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else
            {
                fetch("https://bookmatebb-react-backend.onrender.com/api/thread/replies", {
                    method: "POST",
                    body: JSON.stringify({
                        id,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setReplyList(data.replies);
                        setTitle(data.title);
                    })
                    .catch((err) => console.error(err));
            }
           
        };
        fetchReplies();
    }, [id] );

    

    const addReply = () => {
        if (!localStorage.getItem("_id")) {
            navigate("/");
        } else
        {
            fetch("https://bookmatebb-react-backend.onrender.com/api/create/reply", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    userId: localStorage.getItem("_id"),
                    reply,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    navigate("/dashboard");
                })
                .catch((err) => console.error(err));
        }
    };
    

    return (

        <main className="thread-container">
        <h1>{title}</h1>
        <form className="reply-form" onSubmit={handleSubmitReply}>
          <div className="form-group">
            <label htmlFor="reply" className="form-label">Reply to the thread</label>
            <textarea
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              type="text"
              name="reply"
              className="form-textarea"
              required
            />
          </div>
          <button className="form-button" type="submit">SEND</button>
        </form>
        <div className="replies-container">
          {replyList.map((reply, index) => (
            <div key={index} className="reply-item">
              <p>{reply.text}</p>
              <div>
                <p className="reply-author">by {reply.name}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
};

export default Replies;