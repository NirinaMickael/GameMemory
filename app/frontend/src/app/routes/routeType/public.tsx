
import type { RouteObject } from "react-router-dom";
import { NotFound } from "../../pages/not-found";
import { HomePage } from "@/app/pages/home";
import { LeaderBoardPage } from "@/app/pages/leaderboard";
import { ResultPage } from "@/app/pages/results";
import { StatPage } from "@/app/pages/stats";
export const publicRoutes :RouteObject[] =  [

  {
    path:"home",
    index:true,
    element:<HomePage/>
  },
  {
    path:"leaderboard",
    element:<LeaderBoardPage/>
  },
    {
    path:"stats",
    element:<StatPage/>
  },
    {
    path:"results",
    element:<ResultPage/>
  },
    {
    path:"*",
    element:<NotFound/>
  },
];