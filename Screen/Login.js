import React, { useContext, useEffect } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  useToast,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import Auth_Global from "../Context/store/Auth_Global";
import { loginUser } from "../Context/action/Auth_action";

import { status_code } from "../Common/status_code";

const Login = (props) => {
  const context = useContext(Auth_Global);
  const toast = useToast();
  // useEffect(() => {
  //   if(context.user.Authenticated){
  //     Toast.show({
  //       topOffset: 60,
  //       type: "info",
  //       text1: "This is an info message",
  //     });
  //     // props.navigation.navigate("main");
  //   }
  // }, [context.user.Authenticated]);

  const onSubmit = async (user) => {
    var token_response = await loginUser(user, context.dispatch);

    if (token_response.status === status_code.Success) {
      toast.show({
        title: token_response.status,
        description: token_response.Message,
        placement: "top",
        duration: 500,
      });
      props.navigation.navigate("main");
    } else {
      toast.show({
        title: token_response.status,
        description: token_response.Message,
        placement: "top",
        duration: 500,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    Email: Yup.string().email().required("Email is Required"),
    Password: Yup.string().required("Password is Required"),
  });
  return (
    <Center w="100%">
      <Box safeArea py="8" w="90%">
        <Center>
          <Heading>Malaria Tracker</Heading>
        </Center>
        <Formik
          initialValues={{
            Email: "",
            Password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <VStack mt={5} space={3}>
              <FormControl isInvalid={"Email" in errors} isRequired>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onChangeText={handleChange("Email")}
                  placeholder="Email"
                  value={values.Email}
                />
                <FormControl.ErrorMessage>
                  {errors.Email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={"Password" in errors} isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  placeholder="Password"
                  onChangeText={handleChange("Password")}
                  value={values.Password}
                />
                <FormControl.ErrorMessage>
                  {errors.Password}
                </FormControl.ErrorMessage>
                <Link
                  _text={{
                    fontSize: "md",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                >
                  Forget Password
                </Link>
              </FormControl>
              <Button colorScheme="indigo" onPress={handleSubmit}>
                Login
              </Button>
            </VStack>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default Login;
