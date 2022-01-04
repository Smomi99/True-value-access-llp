import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UsersTable from './components/UsersTable/UsersTable';
import ShowSingleUserDetails from './components/ShowSingleUserDetails/ShowSingleUserDetails';

function App() {
  return (
    <div className='mt-4'>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="/users/:userId" element={<ShowSingleUserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
