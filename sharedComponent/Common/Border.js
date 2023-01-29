import React from "react";
import { Box } from "native-base";
const Border = props => {
	var {
		children,
		border = 1,
		bg = "white",
		borderRadius = "md",
		borderWidth = 1,
		shadow = 3,
		my = 2,
		borderColor = "indigo.400",
		width = "100%",
	} = props;
	return (
		<Box
			border={border}
			borderRadius={borderRadius}
			bg={bg}
			shadow={shadow}
			my={my}
			borderWidth={borderWidth}
			borderColor={borderColor}
			width={width}
			alignSelf="center"
		>
			{children}
		</Box>
	);
};

export default Border;
