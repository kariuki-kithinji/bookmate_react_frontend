import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";

const Home = () => {
    const [threadList, setThreadList] = useState([]);
    const [thread, setThread] = useState("");
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        createThread();
        setThread(""); // Clearing thread input after submission
    };

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                fetch("https://bookmatebb-react-backend.onrender.com/api/all/threads")
                    .then((res) => res.json())
                    .then((data) => setThreadList(data.threads))
                    .catch((err) => console.error(err));
            }
        };
        checkUser();
    }, [navigate]);

    const createThread = () => {
        fetch("https://bookmatebb-react-backend.onrender.com/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setThreadList(data.threads);
            })
            .catch((err) => console.error(err));
    };

    // Function to search for books
    const searchBooks = (query) => {
        console.log('searching for ', query)
        fetch(`https://bookmatebb-react-backend.onrender.com/api/books/${query}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.books.results)
                setBooks(data.books.results);
            })
            .catch((error) => console.error("Error fetching books:", error));
    };

    // Function to handle book search form submission
    const handleBookSearch = (e) => {
        e.preventDefault();
        searchBooks(query)
    };

    return (
            <>
            <Nav/>
              <main className="container">
                <div className="main-content">
                  <div className="header">
                    <h1>Discover and Discuss Books</h1>
                    <p>Search for your next great read and join discussions with fellow book lovers.</p>
                  </div>
                  <form className="search-form" onSubmit={handleBookSearch}>
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Search for a book..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      required
                    />
                    <button className="search-button" type="submit">Search</button>
                  </form>
                  <div className="book-grid">
                    {books && books.map((book) => (
                      <div className="book-card" key={book.id}>
                        <div className="book-content">
                          <h3>{book.title}</h3>
                          <p>{book.authors[0].name}</p>
                          <div className="book-stats">
                            <span>{book.download_count} downloads</span>
                          </div>
                        </div>
                        <div className="book-footer">
                          <span>{book.copyright ? 'Yes' : 'No'}</span>
                          <button className="view-button">
                            <a href={book.formats['text/html']} target='_blank'>View Book</a>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pagination">
                    <a href="#" className="pagination-previous">Previous</a>
                    <a href="#" className="pagination-link">1</a>
                    <a href="#" className="pagination-link active">2</a>
                    <a href="#" className="pagination-link">3</a>
                    <span className="pagination-ellipsis">...</span>
                    <a href="#" className="pagination-next">Next</a>
                  </div>
                </div>
                <div className="sidebar">
                  <div className="create-thread">
                    <h2>Create Thread</h2>
                    <p>Start a new discussion about your favorite books.</p>
                    <form className="thread-form" onSubmit={handleSubmit}>
                      <label htmlFor="thread-title">Thread Title</label>
                      <input
                        id="thread-title"
                        type="text"
                        placeholder="Enter thread title"
                        value={thread}
                        onChange={(e) => setThread(e.target.value)}
                        required
                      />
                      <button type="submit">Create Thread</button>
                    </form>
                  </div>
                  <div className="recent-threads">
                    <h2>Recent Threads</h2>
                    <div className="threads-list">
                      {threadList.map((thread) => (
                        <div className="thread-card" key={thread.id}>
                          <a href="#">{thread.title}</a>
                          <div className="thread-stats">
                          <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                                <Comments
                                    numberOfComments={thread.replies.length}
                                    threadId={thread.id}
                                    title={thread.title}
                                />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </>
    );
};

export default Home;
