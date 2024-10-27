import React, { useState } from 'react';

import './Assistant.css';
// const token = process.env.REACT_APP_GITHUB_TOKEN;
// //import OpenAI from 'openai';
// const endpoint = "http://localhost:3000"//"https://models.inference.ai.azure.com";
// const modelName = "gpt-4o";
const endpointBackend = process.env.BACKEND_URL;

const AssistantView = (title, description) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!endpointBackend) {
        return <></>
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    // const handleBrowserSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     const client = new OpenAI({ baseURL: endpoint, apiKey: token, dangerouslyAllowBrowser: true }); // apiKey: token, dangerouslyAllowBrowser: true 

    //     let userMessage = input;
    //     if (!title) {
    //         userMessage = `I need help writing a story. Can you suggest some topics or ask questions to help me get started?`;
    //     } else {
    //         userMessage = `Chapter Title: ${title}\nChapter Description: ${description}\n${input}`;
    //     }

    //     try {
    //         const stream = await client.chat.completions.create({
    //             messages: [
    //                 { role: "system", content: "You are a helpful assistant that wants to know the story of a person by presenting questions." },
    //                 { role: "user", content: userMessage },
    //             ],
    //             model: modelName,
    //             stream: true
    //         });

    //         let result = '';
    //         for await (const part of stream) {
    //             result += part.choices[0]?.delta?.content || '';
    //         }
    //         setResponse(result);
    //     } catch (err) {
    //         console.error("The sample encountered an error:", err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleSubmit  = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const xhr = new XMLHttpRequest();
            const url = endpointBackend + '/my-story/api/assistant';
            const data = JSON.stringify({
                input: input,
                title: title,
                description: description,
            });

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText)
                        const jsonResponse = JSON.parse(xhr.responseText)
                        setResponse(jsonResponse.result)
                    } else {
                        console.error('Error:', xhr.statusText); // Handle error
                    }
                }
            };

            xhr.send(data);
        } catch(err) {
            console.error("The sample encountered an error:", err);
        } finally {
            setIsLoading(false);
        }
    
    }

    console.log(title, description)
    return (
        <div className="assistant-container">
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Message ChatGTP"
                    className="story-input"
                />
                <button disabled={isLoading} type="submit" className={`${isLoading ? 'disabled-button' : 'submit-button'}`}>Ask</button>
            </form>
            <p className="response-text">{response}</p>
        </div>
    )

}

export default AssistantView;