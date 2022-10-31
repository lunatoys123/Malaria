import React from 'react'
import { HStack, FormControl, VStack } from 'native-base'
import SelectBox from 'react-native-multi-selectbox'
import _ from 'lodash';
const FormMultiSelect = (props) => {
    var {
        options = [],
        Label = "",
        MultiChange = () => {},
        placeholder = "",
        hideInputFilter = false,
        id="",
        formik
    } = props
    return (
        <FormControl isInvalid={_.get(formik.errors, id)!==null}>
            <VStack>
                <FormControl.Label>{Label}</FormControl.Label>
                <SelectBox
                    options={options}
                    selectedValues={_.get(formik.values, id)}
                    onMultiSelect={
                        MultiChange(id)
                    }
                    onTapClose={
                        MultiChange(id)
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
                <FormControl.ErrorMessage>{_.get(formik.errors, id)}</FormControl.ErrorMessage>
            </VStack>
        </FormControl>
    )
}

export default FormMultiSelect
