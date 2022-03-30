import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Error } from './Error';

function NewDocument({ CSRFToken }) {

    const [error, setError] = useState(undefined);

    const navigate = useNavigate()
    const goToDocument = (id) => navigate('/document/' + id);

    const createNewDocument = async (e) => {
        e.preventDefault()
        const title = document.getElementById('title').value

        const r = await fetch('/api/document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, _csrf: CSRFToken })
        })

        if (r.status !== 200) {
            setError("Creation failed")
        } else {
            const { id } = await r.json()
            goToDocument(id)
        }
    }

    return <>
        <Error errorMsg={error} />

        <h1>Create a new document</h1>

        <form onSubmit={createNewDocument}>
            <input type="text" id="title" placeholder="title" />
            <button type="submit">Create</button>
        </form>

    </>
}

export { NewDocument }