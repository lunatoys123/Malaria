import React from 'react'
import {HStack, FormControl} from 'native-base'
import SelectBox from 'react-native-multi-selectbox'
import _ from 'lodash'

const FormSigleSelect = (props) => {
    var {
        options = [],
        Label = "",
        formik,
        id = "",
        formik,
        onChange = () => {},
        placeholder = "",
        hideInputFilter = false

    } = props
    return (
        <HStack space={2} alignItems="center">
            <FormControl.Label w="30%">{Label}</FormControl.Label>
            <SelectBox width='70%'
                options={options}
                value={_.get(formik.values,id)}
                onChange={
                    onChange(id)
                }
                inputPlaceholder={placeholder}
                hideInputFilter={hideInputFilter}
                labelStyle={{
                    display:'none'
                }}
                listOptionProps={
                    {nestedScrollEnabled: true}
                }
                containerStyle={
                    {
                        borderWidth: 1,
                        borderColor: 'rgba(169,169,169,0.5)',
                        borderOpacity: 0.5,
                        padding: 3
                    }
                }
            />
        </HStack>
    )
}

export default FormSigleSelect
