import React from "react";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/Auth/user/userAuth";
import { doctorLogout } from "../../redux/Auth/doctor/doctorAuth";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { doctorToken } = useSelector((state) => state.doctorAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userLogoutHandler = () => {
    dispatch(userLogout());
    alert("Logout Successfully");
    navigate("/");
  };
  
  const doctorLogoutHandler = () => {
    dispatch(doctorLogout());
    alert("Logout Successfully");
    navigate("/");
  };
  
  return (
    <div>
      <Flex m={5} justify="space-between">
        <Link to="/">
          <Button colorScheme="teal" size="sm">
            Home
          </Button>
        </Link>
        <Link to="/user_profile">
          <Button colorScheme="teal" size="sm">
            profile
          </Button>
        </Link>
        {!userInfo && (
          <Flex gap={5}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Login
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/user_login">User</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/doctor_login">Doctor</Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Register
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/user_register">user</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/doctor_register">Doctor</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
        {userInfo && <Button onClick={userLogoutHandler}>Logout</Button>}
        {doctorToken && <Button onClick={doctorLogoutHandler}>Logout</Button>}
      </Flex>
    </div>
  );
};

export default Navbar;
