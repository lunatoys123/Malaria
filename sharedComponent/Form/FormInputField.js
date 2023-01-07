import React from "react";
import { HStack, FormControl, Input, TextArea, VStack } from "native-base";
import _ from "lodash";

const FormInputField = props => {
	var {
		Label = "",
		isTextArea = false,
		formik,
		id = "",
		keyboardType = "text",
		isRequired = false,
		type = "text",
		rightElement = null
	} = props;
	return (
		<FormControl isRequired={isRequired} isInvalid={_.get(formik.errors, id) !== null}>
			<VStack>
				<FormControl.Label>{Label}</FormControl.Label>

				{isTextArea ? (
					<TextArea
						h={20}
						placeholder={Label}
						value={_.get(formik.values, id) != null ? _.get(formik.values, id) : ""}
						onChangeText={text => {
							formik.setFieldValue(id, text);
						}}
						// w="70%"
					/>
				) : (
					<Input
						placeholder={Label}
						// w="70%"
						onChangeText={text => {
							formik.setFieldValue(id, text);
						}}
						value={_.get(formik.values, id) != null ? _.get(formik.values, id) : ""}
						keyboardType={keyboardType}
						type={type}
						rightElement={rightElement}
						
					/>
				)}
				<FormControl.ErrorMessage>{_.get(formik.errors, id)}</FormControl.ErrorMessage>
			</VStack>
		</FormControl>
	);
};

export default FormInputField;
