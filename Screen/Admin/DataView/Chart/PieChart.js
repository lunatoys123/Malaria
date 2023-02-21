import { Heading, Box } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const AdminPieChart = props => {
	var { data = [], width = Dimensions.get("window").width, height = 300 } = props;
	return (
		<Box>
			{data.length > 0 &&
				data.map((d, index) => (
					<>
						<Heading size="sm" alignSelf="center">
							{d.label}
						</Heading>
						<PieChart
							width={width}
							height={height}
							data={d.data}
							chartConfig={{
								backgroundColor: "#e26a00",
								backgroundGradientFrom: "#fb8c00",
								backgroundGradientTo: "#ffa726",
								color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							}}
							accessor={"data"}
							paddingLeft="30"
						/>
					</>
				))}
		</Box>
	);
};

export default AdminPieChart;
