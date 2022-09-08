import React from "react";
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

const onSubmit = (data) => {
  console.log(data);
};

const validationSchema = Yup.object().shape({
  Email: Yup.string().email().required("Email is Required"),
  Password: Yup.string().required("Password is Required"),
});

const Login = () => {
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
