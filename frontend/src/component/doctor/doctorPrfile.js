import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorDetails } from "./../../redux/without login/doctorDetails";
import { useParams, Link } from "react-router-dom";
import { Flex, Heading, Image, Text, Stack, Button } from "@chakra-ui/react";

const DoctorPrfile = ({ match }) => {
  const doctordetails = useSelector((state) => state.doctorDetails);
  const doctor = doctordetails.doctor;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDoctorDetails(id));
  }, [dispatch, id]);
  // console.log(doctor.images[0].url);

  return (
    <div>
      {!doctordetails.loading && doctor ? (
        <div>
          <Heading as="h2" align="center">
            Doctor Details
          </Heading>
          <Flex m={5} justify="center" gap={10} wrap="wrap">
            <Stack>
              <Text fontSize="2xl" as="b">
                Name : {doctor.name}
              </Text>
              <Text fontSize="1xl">Qualification : {doctor.qualification}</Text>
              <Text fontSize="1xl">Gender : {doctor.gender}</Text>
              <Text fontSize="1xl">Age : {doctor.age}</Text>
              <Text fontSize="1xl">Experience : {doctor.experience}</Text>
              <Text fontSize="1xl">Location : {doctor.location}</Text>
              <Text fontSize="1xl">Fees : {doctor.fees}</Text>
              <Text fontSize="1xl">Rating : {doctor.rating}</Text>
              <Text fontSize="1xl">Current Status : {doctor.current_status}</Text>
              <Text fontSize="1xl">Adhar Number : {doctor.adharCard_number}</Text>
            </Stack>
            <Flex direction="column">
              <Image
                boxSize="250px"
                objectFit="cover"
                borderRadius='full'
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
              <Link to={`/${id}/create_appointment`}><Button colorScheme="blue" size="md" m={4}>
                Book Appointment
              </Button></Link>
            </Flex>
          </Flex>

          <Heading as="h2" align="center">
            Doctor Reviews
          </Heading>
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
};

export default DoctorPrfile;
