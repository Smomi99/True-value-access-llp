import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UsersTable from './components/UsersTable/UsersTable';
import ShowSingleUserDetails from './components/ShowSingleUserDetails/ShowSingleUserDetails';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='mt-4'>
      <BrowserRouter>

        <Routes>
          <Route path="/users" element={<UsersTable />} />
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/users/:userId" element={<ShowSingleUserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
