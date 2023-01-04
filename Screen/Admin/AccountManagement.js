import React, { useContext, useCallback } from "react";
import { Center, ScrollView, Text, Box, Heading } from "native-base";
import Auth_Global from "../../Context/store/Auth_Global";
import { useFocusEffect } from "@react-navigation/native";
import { AdminAction } from "../../Redux/Admin/reducer";
import { Admin } from "../../Redux/Admin/selector";
import { useSelector, useDispatch } from "react-redux";

const AccountManagement = () => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);

	useFocusEffect(
		useCallback(() => {
			dispatch(AdminAction.GetUserFromHospital({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	return (
		<Box safeArea>
			<Center>
				<Heading>Account Management</Heading>
			</Center>
			<ScrollView
				nestedScrollEnabled={true}
				contentContainerStyle={{
					paddingBottom: 60,
				}}
				width="100%"
			></ScrollView>
		</Box>
	);
};

export default AccountManagement;
