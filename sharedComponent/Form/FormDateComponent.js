import React from 'react'
import { HStack, FormControl, Input } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker'

const FormDateComponent = (props) => {
  var {
    Label="",
    rightElement = null,
    show = false,
    date = new Date(),
    mode = "date",
    onChangeTime = () => {}
  } = props
  return (
    <HStack space={2} alignItems="center">
        <FormControl.Label w="30%">{Label}</FormControl.Label>
        <Input 
            placeholder={Label}
            w="70%"
            isDisabled={true}
            _disabled={{opacity: 1}}
            InputRightElement={rightElement}
            value={date.toISOString().split('T')[0]}
        />
        {show && 
            <DateTimePicker 
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChangeTime}
            />
        } 
    </HStack>
  )
}

export default FormDateComponent