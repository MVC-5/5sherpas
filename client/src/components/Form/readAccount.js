import React from 'react'
import { Form } from 'semantic-ui-react'
import FormButton from './formButton'

const ReadOnlyAccount = () => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Input fluid label='Name' placeholder='Read only' readOnly />
      <FormButton color='blue' icon='pencil alternate' text='Edit' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Input fluid label='Email' placeholder='Read only' readOnly />
      <FormButton color='blue' icon='pencil alternate' text='Edit' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Input fluid label='Password' placeholder='Read only' readOnly />
      <FormButton color='blue' icon='pencil alternate' text='Edit' />
    </Form.Group>
  </Form>
)

export default ReadOnlyAccount