import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetch('/api/polls')
      .then(res => res.json())
      .then(setPolls);
  }, []);

  return (
    <div>
      <h2>All Polls</h2>
      <ul>
        {polls.map(poll => (
          <li key={poll.id}>
            <Link to={`/polls/${poll.id}`}>{poll.question}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollList;
