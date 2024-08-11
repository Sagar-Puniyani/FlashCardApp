import React, { useState, useEffect } from "react";
import axios from "axios";

const FlashcardView = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.FLASH_CARD_SERVER}/flashcards`)
            .then((res) => setFlashcards(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setFlipped(false);
        }
    };

    if (!flashcards.length) return <p>Loading...</p>;

    return (
        <div className="flashcard-container">
            <div
                className={`flashcard ${flipped ? "flipped" : ""}`}
                onClick={handleFlip}
            >
                <div className="front">{flashcards[currentIndex].question}</div>
                <div className="back">{flashcards[currentIndex].answer}</div>
            </div>
            <div className="navigation">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex === flashcards.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FlashcardView;
