import React from 'react'
import {VStack, FormControl} from 'native-base'
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
        <FormControl isInvalid={_.get(formik.errors, id)!=null}>
            <VStack space={2}>
                <FormControl.Label>{Label}</FormControl.Label>
                <SelectBox
                    options={options}
                    value={_.get(formik.values,id)!=null? _.get(formik.values,id) :{}}
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
                <FormControl.ErrorMessage>{_.get(formik.errors, id)}</FormControl.ErrorMessage>
            </VStack>
        </FormControl>
    )
}

export default FormSigleSelect
