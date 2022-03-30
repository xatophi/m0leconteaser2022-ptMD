import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import SimpleMDE from "easymde";

import { Error } from './Error';

import "easymde/dist/easymde.min.css";


function Document({ CSRFToken }) {
    const [document, setDocument] = useState(undefined);
    const [documentData, setDocumentData] = useState(undefined);
    const [error, setError] = useState(undefined);

    const { id } = useParams()

    useEffect(() => {
        async function fetchDocument(id) {
            setError(undefined)
            const r = await fetch('/api/document/' + id)
            const doc = await r.json()
            if (r.status !== 200) {
                setError(doc.error)
            }
            console.log(doc)
            setDocument(doc)

            setDocumentData(doc.data)
        }
        fetchDocument(id)
    }, [id]);

    const saveChanges = async () => {
        const r = await fetch('/api/document/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: documentData, _csrf: CSRFToken })
        })

        if (r.status !== 200) {
            const j = await r.json()
            console.log(j)
            setError(j.error || 'failed')
        }
    }

    const mdeoptions = useMemo(() => {
        return {
            sideBySideFullscreen: false
        }
    }, []);


    const onChange = useCallback((value) => {
        setDocumentData(value);
    }, []);

    const getMdeInstanceCallback = useCallback((simpleMde) => {
        console.log('side')
        SimpleMDE.toggleSideBySide(simpleMde)
    }, []);


    if (error) {
    }

    if (documentData === undefined) {
        if (error) {
            return <Error errorMsg={error} />
        }
        return <>
            Loading...
        </>
    }

    return <>
        <Error errorMsg={error} />
        <h1>{document?.title}</h1>
        <button onClick={saveChanges}>save changes</button>
        <SimpleMdeReact value={documentData} onChange={onChange} options={mdeoptions} getMdeInstance={getMdeInstanceCallback} />
    </>
}

export { Document }