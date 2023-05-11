import React, {useEffect} from "react";
import { Center, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { loginUser } from './../../../redux/Auth/user/userAuthAction';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Userlogin = () => {
  
  // pasword hide button
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  
  // form object
  const { register, handleSubmit } = useForm();
  
  const dispatch = useDispatch();
  const submitForm = (data) => {
    dispatch(loginUser(data))
  };
  const {error, success, userToken} = useSelector((state) => state.userAuth)
  const navigate = useNavigate()
    useEffect(() => {
      if (error) {
        alert(error);
      }
      if (success) navigate('/')
      // redirect authenticated user to profile screen
      if (userToken) navigate('/')
    }, [dispatch, error, success, userToken, navigate]);

    return (
    <Center>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormControl m={4} isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" w="70vw" {...register("email")}/>
            
        </FormControl>
        <FormControl m={4} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              w="70vw"
              {...register("password")}
            />
            <InputRightElement width="4.5rem" mr={8}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button  m={4}
          colorScheme="teal"
          // isLoading={props.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Center>
  );
};

export default Userlogin;
