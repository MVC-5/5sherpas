import React from "react";
import { Form, Grid } from "semantic-ui-react";
import API from "../../utils/API";

//import './style.css';

export function MovieOptions(props) {
  return (
    <>
      <div>
        <Form onSubmit={API.getMovieSugg(props)} id="dropdown-form">
          <Form.Group widths="equal">
            <Form.Select
              required
              fluid
              label="Action"
              options={props.options1}
              name="action"
              placeholder={props.placeholder1}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Adventure"
              options={props.options2}
              name="adventure"
              placeholder={props.placeholder2}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Documentary"
              options={props.options2}
              name="documentary"
              placeholder={props.placeholder3}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Comedy"
              options={props.options2}
              name="comedy"
              placeholder={props.placeholder3}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Horror"
              options={props.options2}
              name="horror"
              placeholder={props.placeholder3}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Family"
              options={props.options2}
              name="family"
              placeholder={props.placeholder3}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Science Fiction"
              options={props.options2}
              name="sciencefiction"
              placeholder={props.placeholder3}
              onChange={props.onChange}
            />
          </Form.Group>

          <div className="buttons">
            <Grid>
              <Grid.Column width={5}></Grid.Column>
              <Grid.Column width={3}>
                <Form.Button id="button-style" size="large">
                  Submit
                </Form.Button>
              </Grid.Column>
            </Grid>
          </div>
        </Form>
      </div>
    </>
  );
}
