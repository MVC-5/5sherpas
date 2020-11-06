import React from 'react'
import { Form } from 'semantic-ui-react'
import FormButton from './formButton'

const EditAccount = () => (
  <Form>
    <Form.Group>
      <Form.Input fluid label='Name' defaultValue='John Jacob Jingleheimer-Smith' width={8} />
      <FormButton color='red' icon='times' text='Cancel' />
      <FormButton color='green' icon='check' text='Save' />
    </Form.Group>
    <Form.Group>
      <Form.Input fluid label='Email' defaultValue='hisnameismynametoo@gmail.com' width={8} />
      <FormButton color='red' icon='times' text='Cancel' />
      <FormButton color='green' icon='check' text='Save' />
    </Form.Group>
    <Form.Group>
      <Form.Input fluid label='Password' defaultValue='NANANANANANANA' width={8} />
      <FormButton color='red' icon='times' text='Cancel' />
      <FormButton color='green' icon='check' text='Save' />
    </Form.Group>
  </Form>
)

export default EditAccount