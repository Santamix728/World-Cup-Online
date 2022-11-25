// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import Login from "@material-ui/icons/LockOpen";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import CreateMatch from "views/CreateMatch/CreateMatch.js";
import CreateTournament from "views/CreateTournament/CreateTournament.js";
import ViewTournament from "views/ViewTournament/ViewTournament.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignUp from "views/SignUp/Signup.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    dashboard: true,
    user: true,
    admin: true,
  },
  {
    path: "/creatematch",
    name: "Create Match",
    icon: SportsSoccerIcon,
    component: CreateMatch,
    layout: "/admin",
    dashboard: true,
    user: false,
    admin: true,
  },
  {
    path: "/createtournament",
    name: "Create Tournament",
    icon: EmojiEventsIcon,
    component: CreateTournament,
    layout: "/admin",
    dashboard: true,
    user: false,
    admin: true,
  },
  {
    path: "/viewtournament",
    name: "View Tournament",
    icon: EmojiEventsIcon,
    component: ViewTournament,
    layout: "/admin",
    dashboard: false,
  },
  {
    path: "/login-page",
    name: "Log in",
    icon: Login,
    component: LoginPage,
    layout: "/auth",
    dashboard: false,
  },
  {
    path: "/signup-page",
    name: "Sign up",
    icon: Login,
    component: SignUp,
    layout: "/auth",
    dashboard: false,
  },
];

export default dashboardRoutes;
