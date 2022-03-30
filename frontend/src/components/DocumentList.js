import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Error } from './Error';


function DocumentList({ documents, error }) {

    if (error) {
        return <Error errorMsg={error} />
    }

    if (documents === undefined) {
        return <>
            Loading...
        </>
    }

    return <>
        <ul>
            {documents.map(doc => <li key={doc.id}><Link to={'/document/' + doc.id}>{doc.title}</Link></li>)}
        </ul>
    </>
}

export { DocumentList }