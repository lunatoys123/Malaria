import React from 'react'
import {HStack, FormControl, Switch, VStack} from 'native-base';
import _ from 'lodash'

const FormSwitch = (props) => {
    var {
        Label = "",
        formik,
        id = ""
    } = props
    return (
        <FormControl>
            <VStack>
                <HStack space={2}
                    alignItems="center">
                    <FormControl.Label w="30%">
                        {Label}</FormControl.Label>
                    <Switch size="sm"
                        onValueChange={
                            (value) => {
                                formik.setFieldValue(id, value)
                            }
                        }
                        defaultIsChecked={
                            _.get(formik.values, id)
                        }/>
                </HStack>
        </VStack>
    </FormControl>

    )
}

export default FormSwitch
