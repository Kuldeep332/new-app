import { nanoid } from "nanoid";
import React, { useState } from "react";

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [validationMessage, setValidationMessage] = useState("");

    const SubmitHandler = (e) => {
        e.preventDefault();

        if (!name || !email || !contact) {
            setValidationMessage("Please fill in all details.");
            return;
        }

        const newFormData = { id: nanoid(), name, email, contact };

        setSubmissions([...submissions, newFormData]);
        setName("");
        setEmail("");
        setContact("");
        setValidationMessage("");  // Clear validation message on successful submission

        localStorage.setItem("submissions", JSON.stringify([...submissions, newFormData]));
    };

    const deleteSubmission = (id) => {
        const updatedSubmissions = submissions.filter((submission) => submission.id !== id);
        setSubmissions(updatedSubmissions);
        localStorage.setItem("submissions", JSON.stringify(updatedSubmissions));
    };

    return (
        <div className="w-[35%] mx-auto my-[2%]">
            <form
                onSubmit={SubmitHandler}
                className="flex flex-col justify-between px-5 space-y-3">
                
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded">
                    Submit
                </button>
            </form>
            
            {validationMessage && (
                <p className="text-orange-500 mt-2">{validationMessage}</p>
            )}
            
            <ul className="mt-5">
                {submissions.map((submission) => (
                    <li key={submission.id} className="flex justify-between items-center p-2 border border-gray-300 rounded mb-2">
                        <div>
                            <p><strong>Name:</strong> {submission.name}</p>
                            <p><strong>Email:</strong> {submission.email}</p>
                            <p><strong>Contact:</strong> {submission.contact}</p>
                        </div>
                        <button
                            onClick={() => deleteSubmission(submission.id)}
                            className="p-1 bg-red-500 text-white rounded">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Create;
