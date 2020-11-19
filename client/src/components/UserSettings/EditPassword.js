import React from "react";
import { Form, Grid, Popup } from "semantic-ui-react";
import Input from "./input";

import "./style.css";

function EditPassword(props) {
  return (
    <>
      <div id="edit-pass">
        <Form.Group>
          <Input
            label={"Enter Current Password"}
            field={"CurrentPass"}
            readOnly={false}
            onChange={props.onChange}
          />
        </Form.Group>
        <Popup
          trigger={
            <Form.Group>
              <Input
                label={"Enter New Password"}
                field={"NewPass"}
                readOnly={false}
                onChange={props.onChange}
              />
            </Form.Group>
          }
          header="Password Requirements"
          content={
            <ul>
              <li>1 lowercase letter</li>
              <li>1 uppercase letter</li>
              <li>1 number</li>
              <li>at least 8 characters</li>
            </ul>
          }
          on="focus"
        />
        <Form.Group>
          <Input
            label={"Confirm New Password"}
            field={"ConfirmPass"}
            readOnly={false}
            onChange={props.onChange}
          />
        </Form.Group>
        <h5>{props.message}</h5>
        <Grid className="buttons">
          <Grid.Column width={6}>
            <Form.Button
              id="button-style"
              size="large"
              onClick={props.onSubmit}
            >
              Change Password
            </Form.Button>
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Button
              id="button-style"
              size="large"
              onClick={props.onCancel}
            >
              Cancel
            </Form.Button>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}

export default EditPassword;
