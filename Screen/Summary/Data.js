import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  Center,
  Select,
  Box,
  CheckIcon,
  HStack,
  Button,
  useToast,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Summary } from "../../Redux/Summary/Selector";
import { SummaryAction } from "../../Redux/Summary/reducer";
import { LOADING_STATUS } from "../../Common/status_code";
import LoadingSpinner from "../../sharedComponent/Loading";
import { LineChart } from "react-native-chart-kit";

const Data = (props) => {
  const toast = useToast();
  const option = props.route.params.option;
  const SummaryState = useSelector(Summary());
  const dispatch = useDispatch();
  const [country, setCountries] = useState([]);
  const [selectcountry, setSelectCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [WHO_DATA, setWHO_DATA] = useState([]);

  useEffect(() => {
    // dispatch(SummaryAction.WHO_Data({ option: option }));
    setLoading(true);
    dispatch(SummaryAction.GetCountries());
  }, []);

  useEffect(() => {
    const { countries, loading, WHO_Data } = SummaryState;
    if (loading === LOADING_STATUS.FULFILLED) {
      setCountries(countries);
      setLoading(false);
      setWHO_DATA(WHO_Data);
    }
  }, [SummaryState]);

  const selectCountries = () => {
    if (selectcountry == null) {
      toast.show({
        title: "Error",
        description: "Please select a country",
        placement: "top",
        duration: 500,
      });
    } else {
      setLoading(true);
      dispatch(SummaryAction.WHO_Data({ option, selectcountry }));
    }
  };

  const ConstructLabel = () => {
    if (WHO_DATA) {
      var labels = WHO_DATA.map((w) => {
        return w.Year;
      });

      return labels;
    }
    return [];
  };

  const ConstructDataSet = () => {
    if (WHO_DATA) {
      var dataset = WHO_DATA.map((w) => {
        return Number(w.value);
      });
      return dataset;
    }
    return [];
  };

  return (
    <Center>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box maxW="300" mt={10}>
            <HStack space={2}>
              <Select
                selectedValue={selectcountry}
                minW="200"
                placeholder="Select Country"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={(itemValue) => setSelectCountry(itemValue)}
              >
                {country &&
                  country.map((c) => {
                    return (
                      <Select.Item
                        label={c.Options}
                        value={c.code}
                        key={c.code}
                      />
                    );
                  })}
                @
              </Select>
              <Button onPress={selectCountries}>Select country</Button>
            </HStack>
          </Box>
          <Box>
            {WHO_DATA && WHO_DATA.length > 0 && (
              <LineChart
                data={{
                  labels: ConstructLabel(),
                  datasets: [
                    {
                      data: ConstructDataSet(),
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 0.9}
                height={220}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            )}
          </Box>
        </>
      )}
    </Center>
  );
};

export default Data;
