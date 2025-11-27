import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
