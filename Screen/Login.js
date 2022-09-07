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

const Login = () => {
  return (
    <Center w="100%">
      <Box safeArea py="8" w="90%">
        <Center>
          <Heading>Malaria Tracker</Heading>
        </Center>
        <VStack mt={5} space={3}>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
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
          <Button colorScheme="indigo">Login</Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
