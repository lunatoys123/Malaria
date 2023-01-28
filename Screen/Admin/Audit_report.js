import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Heading, Center, VStack, Divider, Box, ScrollView } from "native-base";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../Common/status_code";
import { AdminAction } from "../../Redux/Admin/reducer";
import { Admin } from "../../Redux/Admin/selector";

const Audit_report = props => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const Doctor_name = props.route.params.Doctor_name;
	const Doctor_id = props.route.params.Doctor_id;
	const [AuditLog, setAuditLog] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const { loading, Audit_Log } = AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setAuditLog(Audit_Log);
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(AdminAction.GetAuditFromDoctorId({ Doctor_id }));
		}, [dispatch])
	);
	return (
		<View>
			<Center>
				<Heading size="sm">{`Audit Report (${Doctor_name})`}</Heading>
				<ScrollView
					nestedScrollEnabled={true}
					contentContainerStyle={{
						paddingBottom: 60,
					}}
					width="100%"
				>
					{AuditLog.map((d, index) => (
						<Box
							border="1"
							borderRadius="lg"
							w="90%"
							bg="white"
							alignSelf="center"
							mt="3"
							borderWidth="1"
							borderColor="indigo.400"
							key={index}
						>
							<VStack divider={<Divider />} px="2">
								<Heading size="sm">{d.Audit_Code}</Heading>
								<Text>{d.Activity}</Text>
								<Text>{d.dtCreated}</Text>
							</VStack>
						</Box>
					))}
				</ScrollView>
			</Center>
		</View>
	);
};

export default Audit_report;
