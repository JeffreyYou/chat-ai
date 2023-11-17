import React from 'react';
import PromptTester from './page/prompt';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
            <Routes>
              <Route path="*" element={<PromptTester/>} />
            </Routes>
    </BrowserRouter>
            
  );
}

export default App;
