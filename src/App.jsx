import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Favorites from "./Pages/Admin/Favorites.jsx";
import Settings from "./Pages/Admin/Settings";
import Profile from "./Pages/Admin/Profile";
import Login from "./Pages/Login";
import Home from "./Pages/Admin/Home.jsx";
import Users from "./Pages/Admin/Users.jsx";
import ProtectedRoute from "./Router/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
