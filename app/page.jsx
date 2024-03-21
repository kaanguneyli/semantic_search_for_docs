'use client';

import { useState } from 'react';
import { parseMarkdowns } from '@/components/ParseRepo';
import { Document } from "langchain/document";

const Home = () => {

  const [submitting, setSubmitting] = useState(false);
  const [inputText, setInputText] = useState({owner: '', repo: ''});
  const [contents, setContents] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputText((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await parseMarkdowns(inputText.owner, inputText.repo);
    setContents(res);
    setSubmitting(false);
  };

  // TODO line 71: <pre>{content.pageContent}</pre>
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
      <div>
        <ul>
          {contents.map((content, index) => (
            <li key={index}>
              <pre>{content.pageContent}</pre>
            </li>
          ))} 
        </ul>
      </div>
    </div>
  );
}

export default Home;
