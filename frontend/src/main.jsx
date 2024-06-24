import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./redux/store.js";
import { ThemeProvider } from "@material-tailwind/react";

// Import your components here
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/User/Login.jsx";
import Register from "./pages/Admin/Register.jsx";
import Events from "./pages/User/Events";
import Schedule from "./pages/User/Schedule.jsx";
import Point from "./pages/User/Point.jsx";
import DepartmentPoints from "./pages/User/DepartmentPoints.jsx";
import CreateParticipant from "./pages/Admin/CreateParticipant.jsx";
import AdminRoute from "./pages/Admin/AdminRoute";
import Profile from "./pages/User/Profile";
import UserList from "./pages/Admin/UserLIst.jsx";
import DepartmentList from "./pages/Admin/DepartmentList.jsx";
import ParticipantsByEvent from "./pages/Admin/ParticipantsByEventSelector.jsx";
import ParticipantsByEventId from "./pages/Admin/Participants.jsx";
import ParticipantsByDepartment from "./pages/Admin/ParticipantsByDepartment.jsx";
import ParticipantsByDepartmentStdRep from "./pages/Stdrep/ParticipantsByDepartmentStdRep.jsx";
import ParticipantsByDepartmentFaculty from "./pages/Faculty/ParticipantsByDepartmentFaculty.jsx";
import ManagePoint from "./pages/Admin/ManagePoint.jsx";
import ParticipantsForAdmin from "./pages/Admin/ParticipantsForAdmin.jsx";
import ParticipantsForFaculty from "./pages/Faculty/ParticipantsForFaculty.jsx";
import ParticipantsForStdRep from "./pages/Stdrep/ParticipantsForStdRep.jsx";
import EventList from "./pages/Admin/EventList";
import AllEvents from "./pages/Admin/AllEvents";
import EventUpdate from "./pages/Admin/EventUpdate";
import Home from "./pages/User/Home.jsx";
import FacultyRoute from "./pages/Faculty/FacultyRoute.jsx";
import StdRepRoute from "./pages/Stdrep/StdRepRoute.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="events" element={<Events />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="point" element={<Point />} />
      <Route path="point/department/:departmentName/points" element={<DepartmentPoints />} />
      <Route path="createparticipant" element={<CreateParticipant />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="stdrep" element={<StdRepRoute />}>
        <Route path="createparticipant" element={<CreateParticipant />} />
        <Route path="participants/department/:departmentId/" element={<ParticipantsForStdRep />} />
        <Route path="participants/department/" element={<ParticipantsByDepartmentStdRep />} />
      </Route>
      <Route path="faculty" element={<FacultyRoute />}>
        <Route path="createparticipant" element={<CreateParticipant />} />
        <Route path="participants/department/:departmentId/" element={<ParticipantsForFaculty />} />
        <Route path="participants/department/" element={<ParticipantsByDepartmentFaculty />} />
      </Route>
      <Route path="admin" element={<AdminRoute />}>
        <Route path="createparticipant" element={<CreateParticipant />} />
        <Route path="userlist/register" element={<Register />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="departmentlist" element={<DepartmentList />} />
        <Route path="pointlist" element={<ManagePoint />} />
        <Route path="eventlist" element={<EventList />} />
        <Route path="allEvents" element={<AllEvents />} />
        <Route path="event/update/:_id" element={<EventUpdate />} />
        <Route path="participants/events" element={<ParticipantsByEvent />} />
        <Route path="participants/events/:eventId/participants" element={<ParticipantsByEventId />} />
        <Route path="participants/department/:departmentId/" element={<ParticipantsForAdmin />} />
        <Route path="participants/department/" element={<ParticipantsByDepartment />} />
      </Route>
    </Route>
  </Routes>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);
