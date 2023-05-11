import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Flex,Avatar,Box,Heading,Text,IconButton,Button,Icon } from '@chakra-ui/react'
import {ViewIcon,CalendarIcon} from '@chakra-ui/icons'
const DoctorCard = (props) => {
    const {name,location,_id,current_status} = props.doctor;
  return (
      <Card maxW='md'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap={4} alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

              <Box>
                <Heading size='sm'>{name}</Heading>
                <Text>{location}</Text>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={current_status?<Icon viewBox='0 0 200 200' color='green.500'>
              <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
              />
            </Icon>:<Icon viewBox='0 0 200 200' color='red.500'>
  <path
    fill='currentColor'
    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
  />
</Icon>}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the speed
            of design. I wanted the developer to be just as excited as the designer to
            create a screen.
          </Text>
        </CardBody>

        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='ghost' leftIcon={<ViewIcon />}>
            <Link to={`/doctor/${_id}`}>Details</Link>
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<CalendarIcon />}>
            Appointment
          </Button>
        </CardFooter>
      </Card>
  );
};

export default DoctorCard;
