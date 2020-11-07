import React from 'react'
import { Form } from 'semantic-ui-react'
import FormButton from './formButton'
import FormInput from './input'

const EditGroup = (props) => {
  return (
    <Form.Group>
      <FormInput label={props.field} value='Jeff' readOnly={false} />
      <FormButton name={props.field} color='red' icon='times' text='Cancel' onClick={props.onClick} />
      <FormButton name={props.field} color='green' icon='check' text='Save' onClick={props.onClick} />
    </Form.Group>
  )
}

export default EditGroup