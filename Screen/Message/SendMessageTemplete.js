import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, VStack, Button } from "native-base";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { MessageAction } from "../../Redux/Message/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { Message } from "../../Redux/Message/Selector";
import FormMultiSelect from "../../sharedComponent/Form/FormMultiSelect";
import { LOADING_STATUS } from "../../Common/status_code";
import _, { xorBy } from "lodash";
import * as Yup from "yup";

const SendMessageTemplete = () => {
	const context = useContext(Auth_Global);
	const MessageState = useSelector(Message());
	const dispatch = useDispatch();

	const [Receipents, setReceipents] = useState([]);
	const formik = useFormik({
		initialValues: {
			Message_title: "",
			Receipents: [],
			Message_Content: "",
		},
		validationSchema: Yup.object().shape({
			Receipents: Yup.array().required().min(1, "Need to have at least one Receipents"),
		}),
		onSubmit: values => {
			const Message = _.cloneDeep(values);
			const login_name = context.user.userInfo.login_name;

			Message.Receipents = Message.Receipents.map(d => d.id);

			dispatch(MessageAction.SendMessageToUsers({ Message: Message, login_name: login_name }));
		},
	});

	useFocusEffect(
		useCallback(() => {
			dispatch(MessageAction.GetAllUserInHospital({ Doctor_Id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	useEffect(
		useCallback(() => {
			const { Receipents, Loading } = MessageState;
			if (Loading === LOADING_STATUS.FULFILLED) {
				setReceipents(Receipents);
			}
		}, [MessageState])
	);

	const onMultiChange = targetField => {
		return item => {
			formik.setFieldValue(targetField, xorBy(_.get(formik.values, targetField), [item], "id"));
		};
	};
	return (
		<VStack space={2}>
			<Box
				border="1"
				borderRadius="md"
				bg="white"
				mt="3"
				w="90%"
				p="3"
				shadow="3"
				alignSelf="center"
			>
				<FormMultiSelect
					formik={formik}
					options={Receipents}
					Label="Send To"
					placeholder="Send To"
					id="Receipents"
					MultiChange={onMultiChange}
				/>
				<FormInputField formik={formik} Label="Message Title" id="Message_title" />
				<FormInputField
					formik={formik}
					Label="Content"
					id="Message_Content"
					isTextArea={true}
					height={200}
				/>
			</Box>
			<Button w="90%" alignSelf="center" onPress={() => formik.handleSubmit()}>
				Send Message
			</Button>
		</VStack>
	);
};

export default SendMessageTemplete;
