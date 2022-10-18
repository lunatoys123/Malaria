import React from 'react'
import { HStack, FormControl, Radio } from 'native-base'

const FormRadioGroup = (props) => {

    var  {
        Label="",
        formik,
        id="",
        options = [],
        children
    } = props
    return (
        <HStack space={2}>
            <FormControl.Label w="30%">{Label}</FormControl.Label>
            <Radio.Group name={id} w="70%"
                onChange={
                    nextValue => formik.setFieldValue(id, nextValue)
            }>
                <HStack space={2}>
                   {children}
                </HStack>
            </Radio.Group>
        </HStack>
    )
}

export default FormRadioGroup
