import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./component/navbar/Navbar";
import Home from "./component/Home/Home"
import DoctorDetails from "./component/doctor/doctorPrfile"

import RegisterUser from "./component/auth/user/RegisterUser"
import UserLogin from "./component/auth/user/userLogin"
import UserProfile from "./component/user/userProfile"

import CreateAppointment from "./component/appointment/createAppointment"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/Auth/user/userAuthAction";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);
    
    const { loading } = useSelector((state) => state.userAuth);

    return (
      <Router>
        {
            loading ? (
                <p>Loading...</p>
            ) : (
            <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/doctor/:id" element={<DoctorDetails/>} />

                <Route path="/doctor_register" element={<RegisterUser/>} />
                <Route path="/doctor_login" element={<RegisterUser/>} />

                <Route path="/user_register" element={<RegisterUser/>} />
                <Route path="/user_login" element={<UserLogin/>} />
                <Route path="/user_profile" element={<UserProfile/>} />

                <Route path="/:id/create_appointment" element={<CreateAppointment/>} />
            </Routes>
            </>
            )
        }
      </Router>
  );
}

export default App;
