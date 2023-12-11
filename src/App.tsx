import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeamPage from "./pages/Teams";
import PlayerRank from "./pages/PlayerRank";
import TeamRank from "./pages/TeamRank";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/playerranking" element={<PlayerRank />} />
          <Route path="/teamranking" element={<TeamRank />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
