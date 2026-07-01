import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Favorites from "./Pages/Favorites";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
