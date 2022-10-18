import React from 'react'
import {HStack, FormControl, Input, TextArea} from 'native-base'

const FormInputField = (props) => {
    var {
        Label = "",
        isTextArea = false,
        formik,
        id="",
        keyboardType="text"
    } = props
    return (
        <HStack space={2}
            alignItems="center">
            <FormControl.Label w="30%">
                {Label}</FormControl.Label>
            {
                isTextArea ? 
                <TextArea 
                    h={20} 
                    placeholder={Label} w="70%" 
                /> : 
                <Input 
                    placeholder={Label} 
                    w="70%" 
                    onChangeText={(text)=>{
                        formik.setFieldValue(id, text)
                    }}
                    keyboardType={keyboardType}
                />
            } 
        </HStack>
    )
}

export default FormInputField
