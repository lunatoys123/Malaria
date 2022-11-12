import React from 'react'
import {HStack, FormControl, Radio, VStack, Box} from 'native-base'
import _ from 'lodash'

const FormRadioGroup = (props) => {

    var {
        Label = "",
        formik,
        id = "",
        children
    } = props
    return (
        <FormControl isInvalid={_.get(formik.errors, id)!=null}>
                <VStack space={2}>
                    <FormControl.Label>{Label}</FormControl.Label>
                    <Box borderWidth="1" borderColor="muted.200" p={3} borderRadius="md">
                        <Radio.Group name={id}
                            w="70%"
                            onChange={
                                nextValue => formik.setFieldValue(id, nextValue)
                            }
                            defaultValue={_.get(formik.values, id)!=null ? _.get(formik.values,id): ""}

                        >
                            <HStack space={2}>{children}</HStack>
                        </Radio.Group>
                        <FormControl.ErrorMessage w="70%">{_.get(formik.errors, id)}</FormControl.ErrorMessage>
                    </Box>
                </VStack>
        </FormControl>
    )
}

export default FormRadioGroup
