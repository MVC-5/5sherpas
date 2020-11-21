import React from "react";
import { Form, Grid, Button, Icon } from "semantic-ui-react";

import "./style.css";

export function ChallengeOptions(props) {
  return (
    <>
      <div id="challenge-container">
        <Form onSubmit={props.onSubmit} id="dropdown-form">
          <h5>{props.message}</h5>
          <Form.Group widths="equal">
            <Form.Select
              required
              fluid
              label="Challenge Category 1"
              options={props.options1}
              name="cat1"
              placeholder={props.placeholder1}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Challenge Category 2"
              options={props.options2}
              name="cat2"
              placeholder={props.placeholder2}
              onChange={props.onChange}
            />
            <Form.Select
              fluid
              label="Challenge Category 3"
              options={props.options2}
              name="cat3"
              placeholder={props.placeholder3}
              onChange={props.onChange}
            />
          </Form.Group>

          <div className="buttons">
            <Grid columns="equal" id="buttons-container" stackable>
              <Grid.Column className="btn-col">
                <Form.Button id="user-button-style" size="large">
                  Submit
                </Form.Button>
              </Grid.Column>
              <Grid.Column className="btn-col">
                <Form.Button
                  onClick={props.onCancel}
                  id="user-button-style"
                  size="large"
                >
                  Cancel
                </Form.Button>
              </Grid.Column>
              <Grid.Row centered>
                <Grid.Column id="logout-col">
                  <Form.Button
                    centered
                    animated
                    basic
                    color="blue"
                    onClick={props.onLogout}
                    id="logout-button-style"
                    size="large"
                  >
                    <Button.Content visible>Logout</Button.Content>
                    <Button.Content hidden>
                      <Icon name="hand peace" />
                    </Button.Content>
                  </Form.Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Form>
      </div>
    </>
  );
}
