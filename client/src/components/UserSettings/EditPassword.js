import React from 'react'
import { Form, Grid } from 'semantic-ui-react'
import Input from "./input"

import './style.css';

function EditPassword(props) {

  return (
    <>
      <div>
        <Form>
          <Form.Group>
            <Input label={"Enter Current Password"} readOnly={false} />
          </Form.Group>
          <Form.Group>
            <Input label={"Enter New Password"} readOnly={false} />
          </Form.Group>
          <Form.Group>
            <Input label={"Confirm New Password"} readOnly={false} />
          </Form.Group>

          <Grid className='buttons'>
            <Grid.Column width={6}>
              <Form.Button id='button-style' size='large' onClick={props.onClick}>Change Password</Form.Button>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Button
                id='button-style' size='large' onClick={props.onClick}>Cancel</Form.Button>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    </>
  )
}

export default EditPassword