import React, { useState } from "react";
import { ChallengeOptions } from "../components/Form/ChallengeDropdown";
import { Grid, Image, Form } from 'semantic-ui-react';
import ReadGroup from "../components/Form/readAccount"
import EditGroup from "../components/Form/editAccount"

function Settings() {

  const [nameState, setNameState] = useState("Read");
  const [emailState, setEmailState] = useState("Read");
  const [passState, setPassState] = useState("Read");

  const handleButton = event => {
    console.log(event.target);
    const field = event.target.getAttribute('data-name');
    const btnType = event.target.textContent;
    let newState = "Read"
    console.log(btnType);
    if (btnType === "Cancel" || btnType === "Save") {
      newState = "Read"
    } else {
      newState = "Edit"
    }
    switch (field) {
      case "Name":
        setNameState(newState);
        break;
      case "Email":
        setEmailState(newState);
        break;
      case "Password":
        setPassState(newState);
        break;
      default:
        return
    }
  }

  const getFields = (condition, fieldName) => {
    switch (condition) {
      case "Read":
        return <ReadGroup field={fieldName} onClick={handleButton} />
      case "Edit":
        return <EditGroup field={fieldName} onClick={handleButton} />
      default:
        return (
          <div>Error loading identifiers form</div>
        )
    }
  }

  const renderNameField = () => {
    return getFields(nameState, "Name")
  }

  const renderEmailField = () => {
    return getFields(emailState, "Email")
  }

  const renderPassField = () => {
    return getFields(passState, "Password")
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column width={9}>
          <Form>
            {renderNameField()}
            {renderEmailField()}
            {renderPassField()}
          </Form>
        </Grid.Column>
        <Grid.Column width={3}>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ChallengeOptions></ChallengeOptions>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Settings