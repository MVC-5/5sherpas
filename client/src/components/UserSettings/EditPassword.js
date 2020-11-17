import React from 'react'
import { Form, Grid } from 'semantic-ui-react'
import Input from "./input"

import './style.css';

function EditPassword(props) {

  return (
    <>
      <div>
        <Form.Group>
          <Input label={"Enter Current Password"} field={"CurrentPass"} readOnly={false} onChange={props.onChange} />
        </Form.Group>
        <Form.Group>
          <Input label={"Enter New Password"} field={"NewPass"} readOnly={false} onChange={props.onChange} />
        </Form.Group>
        <Form.Group>
          <Input label={"Confirm New Password"} field={"ConfirmPass"} readOnly={false} onChange={props.onChange} />
        </Form.Group>
        <h5>{props.message}</h5>
        <Grid className='buttons'>
          <Grid.Column width={6}>
            <Form.Button id='button-style' size='large' onClick={props.onSubmit}>Change Password</Form.Button>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Button
              id='button-style' size='large' onClick={props.onCancel}>Cancel</Form.Button>
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default EditPassword