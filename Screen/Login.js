import React, { useContext } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import Auth_Global from "../Context/store/Auth_Global";
import { loginUser } from "../Context/action/Auth_action";

const Login = () => {
  const context = useContext(Auth_Global);

  const onSubmit = (user) => {
    loginUser(user, context.dispatch);
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
