import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Header from "./Components/Header";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Footer from "./Components/Footer";
import ArcadePage from "./Pages/ArcadePage";
import TetrisGame from "./Pages/TetrisGame";
import DinoGame from "./Pages/DinoGame";
import QuizGame from "./Pages/QuizGame";
import { AuthProvider } from "./utils/AuthProvider";
import LoginPage from "./Pages/LoginPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" title="Home" element={<App />} />
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="arcade" element={<ArcadePage />} />
          <Route path="arcade/login" element={<LoginPage />} />
          <Route path="arcade/tetris" element={<TetrisGame />} />
          <Route path="arcade/dino" element={<DinoGame />} />
          <Route path="arcade/quiz" element={<QuizGame />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
