import React from 'react'
import { HStack, FormControl, Radio } from 'native-base'

const FormRadioGroup = (props) => {

    var  {
        Label="",
        formik,
        id="",
        options = []
    } = props
    return (
        <HStack space={2}>
            <FormControl.Label w="30%">{Label}</FormControl.Label>
            <Radio.Group name='Gender'
                onChange={
                    nextValue => formik.setFieldValue(id, nextValue)
            }>
                <HStack space={2}>
                    {
                        options.map((d)=>{
                            return(
                                <Radio value={d.value}>{d.Label}</Radio>
                            )
                        })
                    }
                    {/* <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio> */}
                </HStack>
            </Radio.Group>
        </HStack>
    )
}

export default FormRadioGroup
