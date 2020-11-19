import React from 'react'
import { Form, Grid } from 'semantic-ui-react'

import './style.css';

export function ChallengeOptions(props) {

  return (
    <>
      <div>
        <Form onSubmit={props.onSubmit} id="dropdown-form">
          <h5>{props.message}</h5>
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

          <div className='buttons'>
            <Grid>
              <Grid.Column width={5}></Grid.Column>
              <Grid.Column width={3}>
                <Form.Button id='button-style' size='large'>Submit</Form.Button>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Button
                  onClick={props.onCancel}
                  id='button-style' size='large'>Cancel</Form.Button>
              </Grid.Column>
            </Grid>
          </div>
        </Form>
      </div>
    </>
  )
}