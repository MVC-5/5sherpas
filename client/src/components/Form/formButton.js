import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

const FormButton = (props) => {
  return (
    <Form.Button animated basic color={props.color}>
      <Button.Content visible>
        <Icon name={props.icon} />
      </Button.Content>
      <Button.Content hidden>{props.text}</Button.Content>
    </Form.Button>
  )
}

export default FormButton;