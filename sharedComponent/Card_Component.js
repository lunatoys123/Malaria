import React from 'react'
import {Box, VStack, Divider, Heading} from 'native-base'


const Card_Component = (props) => {
    const {
        heading = "",
        children
    } = props
    return (
        <Box border="1" borderRadius="md" bg="white" mt="3" w="90%" p="3" shadow="3">
            <VStack space="4"
                divider={<Divider/>}>
                <Box px="4" pt="4">
                    <Heading size="md">{heading}</Heading>
                </Box>
                <Box px="4">
                    {children} 
                </Box>
            </VStack>
        </Box>
    )
}

export default Card_Component
