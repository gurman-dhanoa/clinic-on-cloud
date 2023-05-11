// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { getUser } from "../../redux/Auth/user/userAuthAction";
const UserProfile = () => {
  const userDetails = useSelector((state) => state.userAuth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUser());
  // },[dispatch])
  const user = userDetails.userInfo;
  
  return (
    <div>Name : {user.name}</div>
  )
}

export default UserProfile