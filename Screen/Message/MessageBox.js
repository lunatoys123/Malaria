import React, { useCallback, useContext, useState } from "react";
import {
	VStack,
	Box,
	HStack,
	Heading,
	Divider,
	Button,
	Input,
	ScrollView,
	Text,
	Pressable,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Auth_Global from "../../Context/store/Auth_Global";
import { useDispatch, useSelector } from "react-redux";
import { MessageAction } from "../../Redux/Message/reducer";
import { Message } from "../../Redux/Message/Selector";
import { LOADING_STATUS, Message_status } from "../../Common/status_code";
import { SetMessageStateToRead } from "../../Common/User_Functions";

const MessageBox = props => {
	const context = useContext(Auth_Global);
	const dispatch = useDispatch();
	const MessageState = useSelector(Message());
	const [MessageStack, setMessageStack] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	useFocusEffect(
		useCallback(() => {
			const { Loading, Message_Stack } = MessageState;
			if (Loading === LOADING_STATUS.FULFILLED) {
				setMessageStack(Message_Stack);
			}
		}, [MessageState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(MessageAction.GetMessageForUser({ Doctor_Id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	const ReadMessage = async Message => {
		if (Message.status == Message_status.unread) {
			const response = await SetMessageStateToRead(Message._id);
			dispatch(MessageAction.GetUnreadCount({ Doctor_Id: context.user.userInfo.Doctor_id }));
		}
		props.navigation.navigate("SendMessage", { mode: "view", Message: Message });
	};

	const SearchMessage = async () => {
		dispatch(
			MessageAction.SearchMessage({
				Doctor_Id: context.user.userInfo.Doctor_id,
				query: searchQuery,
			})
		);
	};
	return (
		<VStack divider={<Divider />} space={2}>
			<Box safeArea mt="4">
				<HStack alignItems="center">
					<Heading ml="4" w="65%">
						Message Box
					</Heading>
					<Button
						leftIcon={<FontAwesome name="send" size={24} color="white" />}
						size="sm"
						onPress={() => props.navigation.navigate("SendMessage", { mode: "send" })}
					>
						Send
					</Button>
				</HStack>
			</Box>
			<VStack space={2} w="90%" alignSelf="center">
				<Input
					placeholder="Search For Message"
					backgroundColor="white"
					borderRadius="4"
					fontSize="14"
					value={searchQuery}
					onChangeText={text => setSearchQuery(text)}
				/>
				<Button
					leftIcon={<Ionicons name="search" size={20} color="white" />}
					onPress={() => SearchMessage()}
				>
					Search
				</Button>
			</VStack>
			<ScrollView
				nestedScrollEnabled={true}
				contentContainerStyle={{
					paddingBottom: 60,
				}}
				width="100%"
			>
				{MessageStack.length > 0 &&
					MessageStack.map((d, index) => (
						<Box
							border="1"
							borderRadius="lg"
							w="90%"
							bg="white"
							alignSelf="center"
							mt="3"
							borderWidth="1"
							borderColor={d.status === Message_status.read ? "muted.500" : "indigo.400"}
							key={index}
						>
							<Pressable onPress={() => ReadMessage(d)}>
								<VStack space={2} divider={<Divider />}>
									<Box px="4" py="2">
										<VStack>
											<HStack space={2}>
												<Heading
													size="sm"
													w="70%"
													color={d.status === Message_status.read ? "muted.500" : "black"}
												>
													{d.createdBy}
												</Heading>
												<Text>{d.dtCreated.substring(0, 10)}</Text>
											</HStack>
											<Text bold color={d.status === Message_status.read ? "muted.500" : "black"}>
												{d.Message_title}
											</Text>
											<Text>
												{d.Message_Content.length > 15
													? d.Message_Content.substring(0, 15) + "..."
													: d.Message_Content}
											</Text>
										</VStack>
									</Box>
								</VStack>
							</Pressable>
						</Box>
					))}
			</ScrollView>
		</VStack>
	);
};

export default MessageBox;
