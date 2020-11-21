import React from "react";
import { Form } from "semantic-ui-react";

const FormInput = (props) => (
  <Form.Input
    fluid
    label={props.label}
    data-name={props.field}
    defaultValue={props.value}
    width={12}
    onChange={props.onChange}
    readOnly={props.readOnly}
  />
);

export default FormInput;
