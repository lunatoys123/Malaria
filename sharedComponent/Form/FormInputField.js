import React from 'react'
import { HStack, FormControl, Input, TextArea, VStack } from 'native-base'
import _ from 'lodash'

const FormInputField = (props) => {
    var {
        Label = "",
        isTextArea = false,
        formik,
        id = "",
        keyboardType = "text",
        isRequired = false
    } = props
    return (
        <FormControl isRequired={isRequired} isInvalid={id in formik.errors}>
            
            <HStack space={2}
                alignItems="center">
                <FormControl.Label w="30%">
                    {Label}</FormControl.Label>
                <VStack w="70%">
                {
                    isTextArea ?
                        <TextArea
                            h={20}
                            placeholder={Label} 
                            // w="70%"
                        /> :
                        <Input
                            placeholder={Label}
                            // w="70%"
                            onChangeText={(text) => {
                                formik.setFieldValue(id, text);
                            }}
                            keyboardType={keyboardType}
                        />
                }
                 <FormControl.ErrorMessage>{_.get(formik.errors, id)}</FormControl.ErrorMessage>
                </VStack>
            </HStack>
           
        </FormControl>
    )
}

export default FormInputField
