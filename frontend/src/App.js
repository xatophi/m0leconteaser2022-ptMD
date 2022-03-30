import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router";

import { Navbar } from './components/Navbar'
import { Document } from './components/Document'
import { DocumentList } from './components/DocumentList'
import { NewDocument } from './components/NewDocument'
import { Login } from './components/Login'
import { Signup } from './components/Signup'

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.bundle';

function App() {

  const [documents, setDocuments] = useState(undefined);
  const [CSRFToken, setCSRFToken] = useState(undefined);
  const [errorFetchDoc, setErrorFetchDoc] = useState(undefined);

  useEffect(() => {
    async function fetchCSRFToken() {
      const r = await fetch('/api/getCSRFToken')
      const j = await r.json()
      if (r.status === 200) {
        setCSRFToken(j.CSRFToken)
      }
    }
    fetchCSRFToken()
  }, [])

  let location = useLocation()
  React.useEffect(() => {
    async function fetchDocuments() {
      const r = await fetch('/api/document')
      const j = await r.json()
      if (r.status === 200) {
        setErrorFetchDoc(undefined)
        setDocuments(j)
      } else {
        setErrorFetchDoc(j.error || 'failed to fetch documents')
      }
    }
    fetchDocuments()
  }, [location])

  return <>
    <Navbar />

    <Routes>
      <Route path="/" element={<h1>home</h1>} />
      <Route path="/new" element={<NewDocument CSRFToken={CSRFToken} />} />
      <Route path="/login" element={<Login CSRFToken={CSRFToken} />} />
      <Route path="/signup" element={<Signup CSRFToken={CSRFToken} />} />
      <Route path="/document" element={<DocumentList documents={documents} error={errorFetchDoc} />} />
      <Route path="/document/last" element={<Navigate to={documents?.length >= 1 ? '/document/' + documents[documents.length - 1].id : '/new'} />} />
      <Route path="/document/:id" element={<Document CSRFToken={CSRFToken} />} />
    </Routes>
  </>
}

export default App;