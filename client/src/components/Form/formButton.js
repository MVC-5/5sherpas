import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

const FormButton = (props) => {
  return (
    <Form.Button animated basic color={props.color} onClick={props.onClick} data-name={props.name}>
      <Button.Content visible>
        <Icon name={props.icon} />
      </Button.Content>
      <Button.Content hidden data-name={props.name}>{props.text}</Button.Content>
    </Form.Button>
  )
}

export default FormButton;