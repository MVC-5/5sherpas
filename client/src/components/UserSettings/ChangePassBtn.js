import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

import './style.css';

const ChangePassBtn = (props) => {
  return (
    <>
      <div id='align'>
        <Form.Button animated basic color="blue" onClick={props.onClick} data-name="changePass">
          <Button.Content visible>
            Change Password
          </Button.Content>
          <Button.Content hidden data-name="changePass"><Icon name="chevron down" /></Button.Content>
        </Form.Button>
      </div>
    </>
  )
}

export default ChangePassBtn;