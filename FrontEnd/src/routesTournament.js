import viewMatches from "views/ViewTournament/ViewMatches/ViewMatches.js";
import viewRanking from "views/ViewTournament/ViewRanking/ViewRanking.js";
import matchResult from "views/ViewTournament/MatchResult/MatchResult.js";
import createPrivateLeague from "views/ViewTournament/CreatePrivateLeague/CreatePrivateLeague.js";
import joinPrivateLeague from "views/ViewTournament/JoinPrivateLeague/JoinPrivateLeague.js";
import viewPrivateLeague from "views/ViewTournament/ViewPrivateLeague/ViewPrivateLeague.js";

const tournamentRoutes = [
  {
    path: "/viewmatches",
    name: "View Matches",
    component: viewMatches,
    layout: "/admin/viewtournament",
    user: true,
    admin: true,
  },
  {
    path: "/viewranking",
    name: "View Ranking",
    component: viewRanking,
    layout: "/admin/viewtournament",
    user: true,
    admin: true,
  },
  {
    path: "/matchresult",
    name: "Match Result",
    component: matchResult,
    layout: "/admin/viewtournament",
    user: false,
    admin: true,
  },{
    path: "/createprivateleague",
    name: "Create Private League",
    component: createPrivateLeague,
    layout: "/admin/viewtournament",
    user: true,
    admin: true,
  },
  {
    path: "/viewprivateleague",
    name: "View Private League",
    component: viewPrivateLeague,
    layout: "/admin/viewtournament",
    user: true,
    admin: true,
  },
  {
    path: "/joinprivateleague",
    name: "Join Private League",
    component: joinPrivateLeague,
    layout: "/admin/viewtournament",
    user: true,
    admin: true,
  },
];

export default tournamentRoutes;