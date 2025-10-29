import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@getmocha/users-service/react';
import HomePage from "@/react-app/pages/Home";
import Game from "@/react-app/pages/Game";
import AuthCallback from "@/react-app/pages/AuthCallback";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:stage" element={<Game />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
