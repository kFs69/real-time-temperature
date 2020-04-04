import React, { useState, useEffect } from 'react';
import socketIo from 'socket.io-client';
import './App.css';

const App = () => {
  const [response, setResponse] = useState(null);
  let baseUrl = 'http://localhost:8080';

  useEffect(() => {
    const socket = socketIo(baseUrl);
    socket.on('temperature', data => setResponse(data));
  }, []);

  return (
    <div className="App">
      {response ? <p>The temperature in Belo Horizonte is: <p>{response} °C</p></p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
