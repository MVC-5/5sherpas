import React, { useState, useEffect } from "react";
import { ChallengeOptions } from "../components/Form/ChallengeDropdown";
import { Grid, Image, Form } from "semantic-ui-react";
import ReadGroup from "../components/Form/readAccount";
import EditGroup from "../components/Form/editAccount";
import API from "../utils/API";

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

  const [placeholder1, setPlaceholder1] = useState("");
  const [placeholder2, setPlaceholder2] = useState("");
  const [placeholder3, setPlaceholder3] = useState("");

  const [challenges, setChallenges] = useState("")

  const [challCat1, setChallCat1] = useState(challenges[0]);
  const [challCat2, setChallCat2] = useState(challenges[1]);
  const [challCat3, setChallCat3] = useState(challenges[2]);

  const id = "5fa74a6f9d0fcaeb93ac934e"

  const getUserSettings = () => {
    API.getUserSettings(id)
      .then((res) => {
        const c1 = res.data[0].challengeCategories[0]
        const c2 = res.data[0].challengeCategories[1]
        const c3 = res.data[0].challengeCategories[2]
        console.log(res);
        setUserName(res.data[0].name);
        setUserEmail(res.data[0].email);
        setUserPass(res.data[0].password);
        setChallenges(res.data[0].challengeCategories)
        if (!c1) {
          setPlaceholder1("Choose Category");
        } else {
          setPlaceholder1(c1)
        }

        if (!c2) {
          setPlaceholder2("Choose Category");
        } else {
          setPlaceholder2(c2)
        }

        if (!c3) {
          setPlaceholder3("Choose Category");
        } else {
          setPlaceholder3(c3)
        }

      })
  }

  useEffect(() => {
    getUserSettings()
    console.log("ran")
  }, [])

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

  const handleSave = (btnType, update) => {
    if (btnType === "Save") {
      switch (update.field) {
        case "Name":
          setUserName(update.value)
          break;
        case "Email":
          setUserEmail(update.value)
          break;
        case "Password":
          setUserPass(update.value)
          break;
        default:
          return;
      }
      const updateBody = {
        field: update.field.toLowerCase(),
        value: update.value
      }
      console.log(updateBody);
      API.updateUserSettings("5fa6f735bf8912e0c05af875", updateBody)
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
        handleSave(btnType, { field: field, value: nameInput })
        setNameState(newState);
        break;
      case "Email":
        handleSave(btnType, { field: field, value: emailInput })
        setEmailState(newState);
        break;
      case "Password":
        handleSave(btnType, { field: field, value: passInput })
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

  const handleFieldChange = (event, data) => {
    event.preventDefault()
    switch (data.name) {
      case "cat1":
        if (data.value === "None") {
          setChallCat1(null)
        } else {
          setChallCat1(data.value);
          console.log(data.value)
        }
        break;
      case "cat2":
        if (data.value === "None") {
          setChallCat2(null)
        } else {
          setChallCat2(data.value);
          console.log(data.value)
        }
        break;
      case "cat3":
        if (data.value === "None") {
          setChallCat3(null)
        } else {
          setChallCat3(data.value);
          console.log(data.value)
        }
        break;
      default:
        return
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const challengeCategories = {
      id: id,
      choice1: challCat1,
      choice2: challCat2,
      choice3: challCat3
    }
    console.log(challengeCategories)
    API.updateUserChallengeCategories(challengeCategories)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const options1 = [
    { key: '1', text: 'Placeholder 1', value: 'Placeholder 1' },
    { key: '2', text: 'Placeholder 2', value: 'Placeholder 2' },
    { key: '3', text: 'Placeholder 3', value: 'Placeholder 3' }
  ]

  const options2 = [
    { key: '0', text: 'None', value: 'None' },
    { key: '1', text: 'Placeholder 1', value: 'Placeholder 1' },
    { key: '2', text: 'Placeholder 2', value: 'Placeholder 2' },
    { key: '3', text: 'Placeholder 3', value: 'Placeholder 3' }
  ]

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
          <ChallengeOptions placeholder1={placeholder1} placeholder2={placeholder2} placeholder3={placeholder3} options1={options1} options2={options2} onSubmit={handleSubmit} onChange={handleFieldChange}></ChallengeOptions>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Settings