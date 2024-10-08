import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [form, setForm] = useState({ question: "", answer: "", id: null });

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/flashcards`)
            .then((res) => setFlashcards(res.data))
            .catch((err) => {
                console.error(err);
                console.log(` Route :  ${process.env.REACT_APP_API_URL}/flashcards`);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.id) {
            axios
                .put(`${process.env.REACT_APP_API_URL}/flashcards/${form.id}`, form)
                .then(() => setForm({ question: "", answer: "", id: null }))
                .then(() => fetchFlashcards());
        } else {
            axios
                .post(`${process.env.REACT_APP_API_URL}/flashcards`, form)
                .then(() => setForm({ question: "", answer: "" }))
                .then(() => fetchFlashcards());
        }
    };

    const handleEdit = (flashcard) => {
        setForm(flashcard);
    };

    const handleDelete = (id) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/flashcards/${id}`)
            .then(() => fetchFlashcards());
    };

    const fetchFlashcards = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/flashcards`)
            .then((res) => setFlashcards(res.data))
            .catch((err) => console.error(err));
    };

    return (
        <div className="admin-dashboard">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Question"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    required
                />
                <button type="submit">{form.id ? "Update" : "Add"} Flashcard</button>
            </form>

            <ul>
                {flashcards && flashcards.map((flashcard) => (
                    <li key={flashcard.id}>
                        <p>
                            {flashcard.question} - {flashcard.answer}
                        </p>
                        <button onClick={() => handleEdit(flashcard)}>Edit</button>
                        <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
