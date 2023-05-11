import React, {useEffect} from "react";
import { Center, Input, Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from "../../redux/appointment/appointmnetAction";


const CreateNewAppointment = () => {

    // form object
  const { register, handleSubmit } = useForm();
//   const { id } = useParams();
  const dispatch = useDispatch();
  const submitForm = (data) => {
    dispatch(createAppointment(data))
  };
  const {error, success} = useSelector((state) => state.appointment)
  const navigate = useNavigate()
    useEffect(() => {
      if (error) {
        alert(error);
      }
      if (success) navigate('/')
      // redirect authenticated user to profile screen
    }, [dispatch, error, success, navigate]);

  return (
    <Center>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormControl m={4} isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" w="70vw" {...register("date")}/>
            
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
  )
}

export default CreateNewAppointment