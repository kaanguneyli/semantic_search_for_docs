'use client';

import React, { useState } from 'react';
const Home = () => {
  const [submitting, setSubmitting] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Write here: </span>
          <textarea
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder='Put the link here'
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
            <div>You submitted: {inputText}</div>
          )}
        </div> 
      </form>
    </div>
  );
}

export default Home
