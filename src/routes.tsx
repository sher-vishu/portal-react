import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/index";
import Teams from "./pages/Teams/index";
import GameSummary from "./pages/GameSummary/index";
import TeamSummary from "./pages/TeamSummary/index";
import PlayerRanking from "./pages/PlayerRanking/index";
import PlayerSummary from "./pages/PlayerSummary/index";
import TeamRanking from "./pages/TeamRanking/index";
import Error from "./pages/NoPage/index";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/gamesummary",
        element: <GameSummary />,
        errorElement: <Error />,
    },
    {
        path: "/teams",
        element: <Teams />,
        errorElement: <Error />,
    },
    {
        path: "/teamsummary",
        element: <TeamSummary />,
        errorElement: <Error />,
    },
    {
        path: "/playerranking",
        element: <PlayerRanking />,
        errorElement: <Error />,
    },
    {
        path: "/playersummary",
        element: <PlayerSummary />,
        errorElement: <Error />,
    },
    {
        path: "/teamranking",
        element: <TeamRanking />,
        errorElement: <Error />,
    }
])