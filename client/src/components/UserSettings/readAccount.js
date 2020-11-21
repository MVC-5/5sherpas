import React from "react";
import { Form } from "semantic-ui-react";
import FormButton from "./formButton";
import FormInput from "./input";

const ReadGroup = (props) => {
  return (
    <Form.Group id="account-form">
      <FormInput label={props.field} value={props.value} readOnly={true} />
      <FormButton
        name={props.field}
        color="blue"
        icon="alternate pencil"
        text="Edit"
        onClick={props.onClick}
      />
    </Form.Group>
  );
};

export default ReadGroup;
