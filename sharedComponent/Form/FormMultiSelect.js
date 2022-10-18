import React from 'react'
import { HStack, FormControl } from 'native-base'
import SelectBox from 'react-native-multi-selectbox'
import _ from 'lodash';
const FormMultiSelect = (props) => {
    var {
        options = [],
        Label = "",
        MultiChange = () => {},
        SelectedArray = [],
        placeholder = "",
        hideInputFilter = false,
        targetField="",
        formik
    } = props
    return (
        <HStack space={2}
            alignItems="center">
            <FormControl.Label w="30%">{Label}</FormControl.Label>
            <SelectBox 
                width='70%'
                options={options}
                selectedValues={_.get(formik.values, targetField)}
                onMultiSelect={
                    MultiChange(targetField)
                }
                onTapClose={
                    MultiChange(targetField)
                }
               
                labelStyle = {{
                    display: 'none',
                }}
                inputPlaceholder={placeholder}
                hideInputFilter={hideInputFilter}
                listOptionProps={
                    {nestedScrollEnabled: true}
                }
                containerStyle={{
                    borderWidth: 1,
                    borderColor: 'rgba(169,169,169,0.5)',
                    borderOpacity:  0.5,
                    padding:3
                }}
                isMulti/>
        </HStack>
    )
}

export default FormMultiSelect
