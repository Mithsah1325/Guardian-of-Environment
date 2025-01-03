import React, { useState } from 'react';
import axios from 'axios';

function CategorizeProduct() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleGenerate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/chat', { text: input });
            setOutput(response.data.reply);
            setSubmitted(true); // Mark the form as submitted
        } catch (error) {
            console.error('Error:', error);
            setOutput('Something went wrong!');
            setSubmitted(true); // Mark the form as submitted even if there is an error
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-green-100 rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-bold mb-6">Find out</h1>
            <textarea
                rows="4"
                cols="50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your text here..."
                className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <br />
            <button
                onClick={handleGenerate}
                className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
            >
                Categorize
            </button>
            {submitted && (
                <div className="mt-6 whitespace-pre-wrap">
                    <h3 className="text-lg font-semibold">Result:</h3>
                    <p className="text-gray-700">{output}</p>
                </div>
            )}
        </div>
    );
}

export default CategorizeProduct;
