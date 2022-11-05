import React from 'react'
import { VStack, FormControl, Input } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker'
import _ from 'lodash'

const FormDateComponent = (props) => {
  var {
    Label="",
    rightElement = null,
    show = false,
    id="",
    // mode = "date",
    onChangeTime = () => {},
    callback,
    formik
  } = props
  return (
    <FormControl isInvalid={_.get(formik.values, id)!== null}>
      <VStack space={2}>
          <FormControl.Label>{Label}</FormControl.Label>
          <Input 
              placeholder={Label}
              isDisabled={true}
              _disabled={{opacity: 1}}
              InputRightElement={rightElement}
              value={_.get(formik.values, id)?_.get(formik.values, id).toISOString().split('T')[0]:new Date().toISOString().split('T')[0]}
          />
          {show && 
              <DateTimePicker 
                  testID="dateTimePicker"
                  value={_.get(formik.values, id)?_.get(formik.values, id): new Date()}
                  mode={"date"}
                  is24Hour={true}
                  onChange={(event, selectedDate)=>onChangeTime(event,selectedDate,id,callback)}
              />
          } 
          <FormControl.ErrorMessage>{_.get(formik.errors, id)}</FormControl.ErrorMessage>
      </VStack>
    </FormControl>
  )
}

export default FormDateComponent