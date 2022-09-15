import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Box,
  Heading,
  Center,
  VStack,
  ScrollView,
  Pressable,
  Spacer,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Summary } from "../../Redux/Summary/Selector";
import { SummaryAction } from "../../Redux/Summary/reducer";
import { LOADING_STATUS } from "../../Common/status_code";
import LoadingSpinner from "../../sharedComponent/Loading";

const Summary_container = (props) => {
  const dispatch = useDispatch();
  const SummaryState = useSelector(Summary());

  const [PreviewOptions, setPreviewOption] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(SummaryAction.Preview());
  }, []);

  useEffect(() => {
    const { data, loading } = SummaryState;
    if (loading === LOADING_STATUS.FULFILLED) {
      setPreviewOption(data);
      setLoading(false);
    }
  }, [SummaryState]);

  const DisplayOption = (option) => {
    console.log(`press ${option}`);
  };

  return (
    <Box safeArea>
      {Loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Center>
            <Heading>Summary</Heading>
          </Center>
          <Spacer />
          <ScrollView contentContainerStyle={{ paddingBottom: 60 }} my="3">
            <Box alignItems="center">
              {PreviewOptions.map((option) => {
                return (
                  <Pressable w="80%" onPress={() => DisplayOption(option)}>
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <Box
                          p="5"
                          m="2"
                          shadow="1"
                          borderRadius="md"
                          bg={isPressed ? "coolGray.200" : "coolGray.100"}
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.96 : 1,
                              },
                            ],
                          }}
                        >
                          <Text>{option}</Text>
                        </Box>
                      );
                    }}
                  </Pressable>
                );
              })}
            </Box>
          </ScrollView>
        </>
      )}
    </Box>
  );
};

export default Summary_container;
