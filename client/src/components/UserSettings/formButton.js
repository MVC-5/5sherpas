import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";

import "./style.css";

const FormButton = (props) => {
  return (
    <>
      <div id="align">
        <Form.Button
          animated
          basic
          id="field-btn"
          color={props.color}
          onClick={props.onClick}
          data-name={props.name}
        >
          <Button.Content visible>
            <Icon name={props.icon} />
          </Button.Content>
          <Button.Content hidden data-name={props.name}>
            {props.text}
          </Button.Content>
        </Form.Button>
      </div>
    </>
  );
};

export default FormButton;
