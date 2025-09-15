import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  const fetchPoll = async () => {
    const res = await fetch(`/api/polls`);
    const polls = await res.json();
    const found = polls.find(p => p.id === id);
    setPoll(found);
  };

  useEffect(() => {
    fetchPoll();
    // eslint-disable-next-line
  }, []);

  const handleVote = async idx => {
    await fetch(`/api/polls/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optionIndex: idx })
    });
    setVoted(true);
    fetchPoll();
  };

  if (!poll) return <div>Loading...</div>;

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div>
      <h2>{poll.question}</h2>
      {!voted && (
        <div>
          {poll.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleVote(idx)}>
              {opt.text}
            </button>
          ))}
        </div>
      )}
      <h3>Results</h3>
      {poll.options.map((opt, idx) => (
        <div key={idx}>
          <span>{opt.text} ({opt.votes})</span>
          <div style={{
            background: '#ddd',
            width: '100%',
            height: '20px',
            margin: '4px 0'
          }}>
            <div style={{
              background: '#4caf50',
              width: totalVotes ? `${(opt.votes / totalVotes) * 100}%` : '0%',
              height: '100%'
            }} />
          </div>
        </div>
      ))}
      <div>Total votes: {totalVotes}</div>
    </div>
  );
}

export default PollDetail;
