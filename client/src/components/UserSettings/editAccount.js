import React from "react";
import { Form } from "semantic-ui-react";
import FormButton from "./formButton";
import FormInput from "./input";
import "./style.css";

const EditGroup = (props) => {
  return (
    <Form.Group id="edit-account">
      <FormInput
        label={props.field}
        field={props.field}
        value={props.value}
        onChange={props.onChange}
        readOnly={false}
      />
      <FormButton
        name={props.field}
        color="red"
        icon="times"
        text="Cancel"
        onClick={props.onClick}
      />
      <FormButton
        name={props.field}
        color="green"
        icon="check"
        text="Save"
        onClick={props.onClick}
      />
    </Form.Group>
  );
};

export default EditGroup;
