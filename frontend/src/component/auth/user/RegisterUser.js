import { Center, Input, Box, Heading, Button, Select } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../../redux/Auth/user/userAuthAction'

const RegisterUser = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    // check if passwords match
    var height = `${data.heightFt} ft ${data.heightInch} in`;
    delete data.heightFt;
    delete data.heightInch;
    data.height = height;
    data.images = [{
              "public_id":"image_public_id",
              "url":"image_url"
          }]
    dispatch(registerUser(data))
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
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Register User</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(submitForm)}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                placeholder="abc@abc.com"
                {...register("name")}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                placeholder="abc@abc.com"
                {...register("email")}
              />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                {...register("password")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Height</FormLabel>
              <Box display="flex" gap={2}>
                <FormControl mt={6}>
                  <FormLabel htmlFor="heightFt">ft</FormLabel>
                  <Input
                    type="number"
                    placeholder="5"
                    {...register("heightFt")}
                  />
                </FormControl>
                <FormControl mt={6}>
                  <FormLabel htmlFor="heightInch">in</FormLabel>
                  <Input
                    type="number"
                    placeholder="10"
                    {...register("heightInch")}
                  />
                </FormControl>
              </Box>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Select placeholder="Select option" {...register("gender")}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel htmlFor="age">Age</FormLabel>
              <Input
                    type="number"
                    placeholder="10"
                    {...register("age")}
                  />
            </FormControl>
            
            <FormControl mt={6}>
              <FormLabel htmlFor="weight">Weight</FormLabel>
              <Input
                    type="number"
                    placeholder="60"
                    {...register("weight")}
                  />
            </FormControl>
            
            <FormControl mt={6}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                    type="string"
                    placeholder="Dhuri, Sangrur"
                    {...register("location")}
                  />
            </FormControl>
            
            <FormControl mt={6}>
              <FormLabel htmlFor="Number">Contact Number</FormLabel>
              <Input
                    type="number"
                    placeholder="1234567980"
                    {...register("contactNumber")}
                  />
            </FormControl>
            
            <FormControl mt={6}>
              <FormLabel htmlFor="adharCard_number">AdharCard Number</FormLabel>
              <Input
                    type="number"
                    placeholder="1234567980"
                    {...register("adharCard_number")}
                  />
            </FormControl>

            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default RegisterUser;