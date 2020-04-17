import React, { useState, useEffect } from "react";

import "./Quote.css";

const Quote = () => {
    const [quotes, setQuotes] = useState({});
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#4500ff");

    const getQuotes = async () => {
        setLoading(true);
        return await fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
            .then(response => response.json())
            .then(res => {
                const randomColor = Math.floor(
                    Math.random() * 16777215,
                ).toString(16);
                setLoading(false);
                setColor(`#${randomColor}`);
                setQuotes(res[0]);
            });
    };
    useEffect(() => {
        getQuotes();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading" style={{ borderColor: color }}></div>
            </div>
        );
    }
    return (
        <div
            className="Quote"
            style={{ color: color, background: color }}
            id="quote-box"
        >
            <div className="quote-content">
                <img src={quotes.image} alt="Avatar" />
                <h2 id="text">
                    <span>
                        <i className="fa fa-quote-left"></i>{" "}
                    </span>
                    {quotes.quote}
                </h2>
                <p id="author">- {quotes.character}</p>
                <div className="buttons">
                    <a
                        href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quotes.quote}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: color }}
                        id="tweet-quote"
                    >
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer.php?u=${quotes.quote}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: color }}
                        id="fb-quote"
                    >
                        <i className="fa fa-facebook"></i>
                    </a>
                    <button
                        onClick={() => getQuotes()}
                        style={{ background: color }}
                        id="new-quote"
                    >
                        New Quotes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quote;
