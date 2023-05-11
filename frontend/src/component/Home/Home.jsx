import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/without login/getAllDoctors';
import DoctorCard from './DoctorCard';
import { Heading, Flex } from '@chakra-ui/react'

const Home = () => {
    const doctor = useSelector((state) => state.getAllDoctors)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchDoctors())
    }, [dispatch])
  return (
    <div>
      {doctor.loading && <div>Loading...</div> }
      {!doctor.loading && doctor.error ? <div>Error: {doctor.error}</div> : null}
      <Heading m={2}>Clinic on cloud</Heading>
      {!doctor.loading && doctor.doctors ? (
        <Flex gap='4'wrap='wrap' justify='center' m={2}>
          {
            doctor.doctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor}/>
            ))
          }
        </Flex>
      ) : null}
    </div>
  )
}

export default Home