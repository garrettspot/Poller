import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const navigate = useNavigate();

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = idx => setOptions(options.filter((_, i) => i !== idx));

  const handleSubmit = async e => {
    e.preventDefault();
    const filteredOptions = options.filter(opt => opt.trim());
    if (!question.trim() || filteredOptions.length < 2) return;
    await fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options: filteredOptions })
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Poll</h2>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Poll question"
        required
      />
      <div>
        {options.map((opt, idx) => (
          <div key={idx}>
            <input
              value={opt}
              onChange={e => handleOptionChange(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              required
            />
            {options.length > 2 && (
              <button type="button" onClick={() => removeOption(idx)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={addOption}>Add Option</button>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreatePoll;
