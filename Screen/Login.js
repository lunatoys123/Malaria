import React, { useContext, useEffect, useState } from "react";
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
import LoadingSpinner from "../sharedComponent/Loading";
import { Admin_Role } from "../Common/role";

const Login = props => {
	const context = useContext(Auth_Global);
	const toast = useToast();
	const [Loading, setLoading] = useState(false);

	const onSubmit = async user => {
		setLoading(true);
		var token_response = await loginUser(user, context.dispatch);
		setLoading(false);

		if (token_response.status === status_code.Success) {
			// toast.show({
			//   title: token_response.status,
			//   description: token_response.Message,
			//   placement: "top",
			//   duration: 100,
			// });
			if (token_response.user_role === Admin_Role) {
				props.navigation.navigate("Admin");
			} else {
				props.navigation.navigate("User");
			}
		} else {
			// toast.show({
			//   title: token_response.status,
			//   description: token_response.Message,
			//   placement: "top",
			//   duration: 100,
			// });
		}
	};

	const validationSchema = Yup.object().shape({
		Email: Yup.string().email().required("Email is Required"),
		Password: Yup.string().required("Password is Required"),
	});
	return (
		<>
			{Loading ? (
				<LoadingSpinner />
			) : (
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
										<FormControl.ErrorMessage>{errors.Email}</FormControl.ErrorMessage>
									</FormControl>
									<FormControl isInvalid={"Password" in errors} isRequired>
										<FormControl.Label>Password</FormControl.Label>
										<Input
											type="password"
											placeholder="Password"
											onChangeText={handleChange("Password")}
											value={values.Password}
										/>
										<FormControl.ErrorMessage>{errors.Password}</FormControl.ErrorMessage>
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
			)}
		</>
	);
};

export default Login;
