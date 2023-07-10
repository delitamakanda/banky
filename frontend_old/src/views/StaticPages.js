import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";
import { useHistory, useParams } from 'react-router';

import  { marked } from 'marked';

export const createMarkUp = (val) => {
    return { __html: marked(val) }
}

const Errors = () => {
  const history = useHistory();
  const { page } = useParams();
  const [terms, setTerms] = useState('');
  useEffect(() => {
    async function fetchData() {
        const termsPath = require(`../assets/${page}.md`);
        const response = await fetch(termsPath);
        const terms = await response.text();
        setTerms(terms);
    }
    fetchData();
  }, [page, terms]); // Or [] if effect doesn't need props or state
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="container">
        <div className="page__content">
          <div dangerouslySetInnerHTML={createMarkUp(terms)}></div>
          <Button onClick={() => history.goBack()} pill>&larr; Go Back</Button>
        </div>
      </div>
    </Container>
  )
}

export default Errors;
