import React from 'react'
import { Form } from 'semantic-ui-react'

export function ChallengeOptions(props) {

  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group widths='equal'>
        <Form.Select
          required
          fluid
          label='Challenge Category 1'
          options={props.options1}
          name="cat1"
          placeholder={props.placeholder1}
          onChange={props.onChange}
        />
        <Form.Select
          fluid
          label='Challenge Category 2'
          options={props.options2}
          name="cat2"
          placeholder={props.placeholder2}
          onChange={props.onChange}
        />
        <Form.Select
          fluid
          label='Challenge Category 3'
          options={props.options2}
          name="cat3"
          placeholder={props.placeholder3}
          onChange={props.onChange}
        />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}