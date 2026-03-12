import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched data:', json);
        setData(json.results ? json.results : json);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary">Leaderboard</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Score</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.user || '-'}</td>
                  <td>{item.score || '-'}</td>
                  <td>{JSON.stringify(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
