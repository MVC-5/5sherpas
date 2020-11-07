import React from 'react'
import { Form } from 'semantic-ui-react'

const FormInput = (props) => (

  <Form.Input fluid label={props.label} defaultValue={props.value} width={8} readOnly={props.readOnly} />

)

export default FormInput