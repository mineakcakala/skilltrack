import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkillsProvider } from "./context/SkillsContext";
import { ToastProvider } from "./context/ToastContext";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Skills } from "./pages/Skills";
import { About } from "./pages/About";

export default function App() {
  return (
    <SkillsProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="skills" element={<Skills />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </SkillsProvider>
  );
}
