'use client';

import { useState } from 'react';
import { parseMarkdowns } from '@/components/ParseRepo';
//import { Document } from "langchain/document";

const Home = () => {

  // create variables that will be set based on the input
  const [submitting, setSubmitting] = useState(false);
  const [inputText, setInputText] = useState({owner: '', repo: ''});
  //const [contents, setContents] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputText((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

    // when the input is submitted run the parser script
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await parseMarkdowns(inputText.owner, inputText.repo);
    //setContents(res);
    setSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Owner: </span>
          <input
            type="text"
            name="owner"
            value={inputText.owner}
            onChange={handleInputChange}
            placeholder='Owner name'
            required
          />
        </label>
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Repo: </span>
          <input
            type="text"
            name="repo"
            value={inputText.repo}
            onChange={handleInputChange}
            placeholder='Repo name'
            required
          />
        </label>
        <button
          type='submit'
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        <div>
          {submitting && (
            <div>You submitted: {inputText.owner} / {inputText.repo}</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Home;
