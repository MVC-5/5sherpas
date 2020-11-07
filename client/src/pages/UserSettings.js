import React, { useState, useEffect } from "react";
import { ChallengeOptions } from "../components/Form/ChallengeDropdown";
import { Grid, Image, Form } from 'semantic-ui-react';
import ReadGroup from "../components/Form/readAccount"
import EditGroup from "../components/Form/editAccount"
import API from "../utils/API";
// import API from "../utils/API";

function Settings() {

  const [nameState, setNameState] = useState("Read");
  const [emailState, setEmailState] = useState("Read");
  const [passState, setPassState] = useState("Read");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [passInput, setPassInput] = useState("")

  // const getUserSettings = () => {
  //   API.getUserSettings()
  //     .then((res) => {
  //       setUserName(res.name);
  //       setUserEmail(res.email);
  //       setUserPass(res.passsword);
  //     })
  // }

  // getUserSettings();

  useEffect(() => {
    console.log(nameInput);
  }, [nameInput])

  useEffect(() => {
    console.log(emailInput);
  }, [emailInput])

  useEffect(() => {
    console.log(passInput);
  }, [passInput])

  const handleInputChange = event => {
    const { value } = event.target
    const fieldName = event.target.parentElement.getAttribute('data-name')
    switch (fieldName) {
      case "Name":
        setNameInput(value)
        break;
      case "Email":
        setEmailInput(value)
        break;
      case "Password":
        setPassInput(value)
        break;
      default:
        return
    }
  }

  const handleSave = (btnType, update, field) => {
    let updateBody = {};
    if (btnType === "Cancel") {
      // run cancel function
    } else if (btnType === "Save") {
      switch (field) {
        case "Name":
          setUserName(update.name)
          break;
        case "Email":
          setUserEmail(update.email)
          break;
        case "Password":
          setUserPass(update.password)
          break;
        default:
          return;
      }
      updateBody = update
      API.updateUserSettings(updateBody)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const handleButton = event => {
    console.log(event.target);
    const field = event.target.getAttribute('data-name');
    const btnType = event.target.textContent;
    let newState = "Read"
    if (btnType === "Edit") {
      newState = "Edit"
    }
    switch (field) {
      case "Name":
        handleSave(btnType, { name: nameInput }, field)
        setNameState(newState);
        break;
      case "Email":
        handleSave(btnType, { email: emailInput }, field)
        setEmailState(newState);
        break;
      case "Password":
        handleSave(btnType, { password: passInput }, field)
        setPassState(newState);
        break;
      default:
        return
    }
  }

  const getFields = (condition, fieldName, inputValue) => {
    switch (condition) {
      case "Read":
        return <ReadGroup field={fieldName} value={inputValue} onChange={handleInputChange} onClick={handleButton} />
      case "Edit":
        return <EditGroup field={fieldName} value={inputValue} onChange={handleInputChange} onClick={handleButton} />
      default:
        return (
          <div>Error loading identifiers form</div>
        )
    }
  }

  const renderNameField = () => {
    return getFields(nameState, "Name", userName)
  }

  const renderEmailField = () => {
    return getFields(emailState, "Email", userEmail)
  }

  const renderPassField = () => {
    return getFields(passState, "Password", userPass)
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