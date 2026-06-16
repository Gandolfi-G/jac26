import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroupLayout from "./pages/GroupLayout";
import PuzzlePage from "./pages/PuzzlePage";
import FinalPage from "./pages/FinalPage";
import MorseHelpPage from "./pages/MorseHelpPage";
import { installRuneFont } from "./utils/runeFont";

export default function App() {
  useEffect(() => {
    installRuneFont();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/groupe/:groupId" element={<GroupLayout />}>
        <Route index element={<Navigate to="enigme" replace />} />
        <Route path="enigme" element={<PuzzlePage />} />
        <Route path="aide-morse" element={<MorseHelpPage />} />
        <Route path="fin" element={<FinalPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
