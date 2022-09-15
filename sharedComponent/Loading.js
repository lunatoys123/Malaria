import React from "react";
import { HStack, Spinner, Heading, Center, Box } from "native-base";

const LoadingSpinner = () => {
  return (
    <Box safeArea>
      <Center>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    </Box>
  );
};

export default LoadingSpinner;
