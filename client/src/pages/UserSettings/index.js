import React, { useState, useEffect, useContext } from "react";
import { ChallengeOptions } from "../../components/UserSettings/ChallengeDropdown";
import { Grid, Image, Form } from "semantic-ui-react";
import ReadGroup from "../../components/UserSettings/readAccount";
import EditGroup from "../../components/UserSettings/editAccount";
import API from "../../utils/API";
import AuthContext from "../../utils/AuthContext";
import User1 from "../../assets/user-1.png";
import { Redirect } from "react-router-dom";
import EditPass from "../../components/UserSettings/EditPassword";
import ChangePassBtn from "../../components/UserSettings/ChangePassBtn";
import "./style.css";

function Settings() {
  const [nameState, setNameState] = useState("Read");
  const [emailState, setEmailState] = useState("Read");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [placeholder1, setPlaceholder1] = useState("");
  const [placeholder2, setPlaceholder2] = useState("");
  const [placeholder3, setPlaceholder3] = useState("");

  const [challCat1, setChallCat1] = useState("");
  const [challCat2, setChallCat2] = useState("");
  const [challCat3, setChallCat3] = useState("");

  const [message, setMessage] = useState("");
  const [challMessage, setChallMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [redirectToDash, setRedirectToDash] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [redirectToLP, setRedirectToLP] = useState(false);

  const { userId, setAuth, isNewUser } = useContext(AuthContext);
  const id = userId || sessionStorage.getItem("userId");

  // retrieves json object from user schema
  const getUserSettings = () => {
    if (isNewUser) {
      console.log("New User");
    }

    API.getUserSettings(id).then((res) => {
      let c1 = "None";
      let c2 = "None";
      let c3 = "None";
      if (res.data[0].challengeCategories[0]) {
        c1 = res.data[0].challengeCategories[0].name;
        c2 = res.data[0].challengeCategories[1].name;
        c3 = res.data[0].challengeCategories[2].name;
      }
      setUserName(res.data[0].name);
      setUserEmail(res.data[0].email);
      if (c1 === "None") {
        setPlaceholder1("Choose Category");
        setChallCat1(0);
      } else {
        setPlaceholder1(c1);
      }

      if (c2 === "None") {
        setPlaceholder2("Choose Category");
        setChallCat2(0);
      } else {
        setPlaceholder2(c2);
      }

      if (c3 === "None") {
        setPlaceholder3("Choose Category");
        setChallCat3(0);
      } else {
        setPlaceholder3(c3);
      }
    });
  };

  // runs getUserSettings function only once, on page load
  useEffect(() => {
    getUserSettings();
  }, []);

  // tracks changes to name and email input fields
  const handleInputChange = (event) => {
    const { value } = event.target;
    const fieldName = event.target.parentElement.getAttribute("data-name");
    switch (fieldName) {
      case "Name":
        setNameInput(value);
        break;
      case "Email":
        setEmailInput(value);
        break;
      case "CurrentPass":
        setCurrentPass(value);
        break;
      case "NewPass":
        setNewPass(value);
        break;
      case "ConfirmPass":
        setConfirmPass(value);
        break;
      default:
        return;
    }
  };

  // saves name and email input field changes in database upon clicking save button
  const handleSave = (btnType, update) => {
    if (btnType === "Save") {
      switch (update.field) {
        case "Name":
          setUserName(update.value);
          break;
        case "Email":
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(update.value)) {
            setUserEmail(update.value);
          }
          break;
        default:
          return;
      }
      const updateBody = {
        field: update.field.toLowerCase(),
        value: update.value,
      };
      if (
        update.field === "Email" &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(update.value)
      ) {
        setEmailMessage("Email Update Failed: invalid email entered");
      } else {
        API.updateUserSettings(id, updateBody)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // handles read vs edit state of input fields and handles input field button clicks
  const handleButton = (event) => {
    const field = event.target.getAttribute("data-name");
    const btnType = event.target.textContent;
    let newState = "Read";
    if (btnType === "Edit") {
      setEmailMessage("");
      newState = "Edit";
    }
    switch (field) {
      case "Name":
        handleSave(btnType, { field: field, value: nameInput });
        setNameState(newState);
        break;
      case "Email":
        handleSave(btnType, { field: field, value: emailInput });
        setEmailState(newState);
        break;
      default:
        return;
    }
  };

  // returns editable or read only field based on button click
  const getFields = (condition, fieldName, inputValue) => {
    switch (condition) {
      case "Read":
        return (
          <ReadGroup
            field={fieldName}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleButton}
          />
        );
      case "Edit":
        return (
          <EditGroup
            field={fieldName}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleButton}
          />
        );
      default:
        return <div>Error loading identifiers form</div>;
    }
  };

  // renders name field
  const renderNameField = () => {
    return getFields(nameState, "Name", userName);
  };

  // renders email field
  const renderEmailField = () => {
    return getFields(emailState, "Email", userEmail);
  };

  // handles challenge dropdown selection
  const handleFieldChange = (event, data) => {
    event.preventDefault();
    switch (data.name) {
      case "cat1":
        setChallCat1(data.value);
        break;
      case "cat2":
        setChallCat2(data.value);
        break;
      case "cat3":
        setChallCat3(data.value);
        break;
      default:
        return;
    }
  };

  // handles challenge dropdown form submission and updates values in database
  const handleSubmit = (e) => {
    e.preventDefault();
    if (challCat1 === 0) {
      setChallMessage("Challenge Category 1 is required");
    } else {
      let category1 = challCat1;
      let category2 = challCat2;
      let category3 = challCat3;
      if (!challCat1 && challCat1 !== 0) {
        options2.map((item) => {
          if (item.text === placeholder1) {
            category1 = item.value;
          }
        });
      }
      if (!challCat2 && challCat2 !== 0) {
        options2.map((item) => {
          if (item.text === placeholder2) {
            category2 = item.value;
          }
        });
      }
      if (!challCat3 && challCat3 !== 0) {
        options2.map((item) => {
          if (item.text === placeholder3) {
            category3 = item.value;
          }
        });
      }
      const challengeCategories = {
        id: id,
        choice1: category1,
        choice2: category2,
        choice3: category3,
      };
      API.updateUserChallengeCategories(challengeCategories)
        .then(() => {
          setChallMessage("");
          setRedirectToDash(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // handles redirect to dash or requirement message on challenge category cancel click
  const handleCancel = (e) => {
    e.preventDefault();
    if (challCat1 === 0) {
      setChallMessage("Challenge Category 1 is required");
    } else {
      setRedirectToDash(true);
    }
  };

  // handles logout feature
  const handleLogout = (e) => {
    e.preventDefault();
    API.logoutUser({ name: userName })
      .then(() => {
        setRedirectToLP(true);
        sessionStorage.clear();
        setAuth(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // renders input fields and buttons for changing password
  const handleChangePass = (e) => {
    e.preventDefault();
    setChangePass(true);
    setMessage("");
  };

  // validates and saves password if passes validation
  const handlePassSave = (e) => {
    e.preventDefault();
    if (
      // must contiain uppercase, lowercase, number, and be at least 8 characters long
      /^(?=[^\s].*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\s]).{8,}$/i.test(
        newPass
      )
    ) {
      if (newPass === confirmPass) {
        const passObj = {
          username: userEmail,
          password: currentPass,
          new: newPass,
        };
        API.updatePassword(passObj).then((res) => {
          console.log(res.data);
          if (res.data === "Success") {
            setChangePass(false);
            setMessage("Password Update Succesful");
          } else {
            setMessage(
              "Password Update Failed: Current password entered does not match password on file."
            );
          }
        });
      } else {
        setMessage("New password and confirm password fields do not match.");
      }
    } else {
      setMessage(
        <div>
          <h5>New password must contain each of the following:</h5>
          <ul>
            <li>1 lowercase letter</li>
            <li>1 uppercase letter</li>
            <li>1 number</li>
            <li>at least 8 total characters</li>
          </ul>
        </div>
      );
    }
  };

  // re-renders change password button on password update cancel
  const handlePassCancel = (e) => {
    e.preventDefault();
    setChangePass(false);
    setMessage("");
  };

  // dropdown options for challenge category 1
  const options1 = [
    { key: "1", text: "Wellness", value: 1 },
    { key: "2", text: "Intelligence", value: 2 },
    { key: "3", text: "Well-Roundedness", value: 3 },
    { key: "4", text: "Organization", value: 4 },
    { key: "5", text: "Career", value: 5 },
    { key: "6", text: "Bad Habit Cessation", value: 6 },
    { key: "7", text: "Interpersonal Relationships", value: 7 },
  ];

  // dropdown options for challenge category 2 & 3
  const options2 = [
    { key: "0", text: "None", value: 0 },
    { key: "1", text: "Wellness", value: 1 },
    { key: "2", text: "Intelligence", value: 2 },
    { key: "3", text: "Well-Roundedness", value: 3 },
    { key: "4", text: "Organization", value: 4 },
    { key: "5", text: "Career", value: 5 },
    { key: "6", text: "Bad Habit Cessation", value: 6 },
    { key: "7", text: "Interpersonal Relationships", value: 7 },
  ];

  if (redirectToDash) {
    return <Redirect to="/dashboard" />;
  } else if (redirectToLP) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <div className="knot-container">
          <h1 className="header">my settings</h1>
          <Grid stackable columns="equal" id="settings-container">
            <Grid.Row>
              <Grid.Column>
                <Image src={User1} />
              </Grid.Column>
              <Grid.Column id="input-column">
                <Form>
                  {renderNameField()}
                  <h5>{emailMessage}</h5>
                  {renderEmailField()}
                  {changePass ? (
                    <EditPass
                      onSubmit={handlePassSave}
                      onCancel={handlePassCancel}
                      onChange={handleInputChange}
                      message={message}
                    />
                  ) : (
                    <ChangePassBtn
                      onClick={handleChangePass}
                      message={message}
                    />
                  )}
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <ChallengeOptions
                  message={challMessage}
                  placeholder1={placeholder1}
                  placeholder2={placeholder2}
                  placeholder3={placeholder3}
                  options1={options1}
                  options2={options2}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  onChange={handleFieldChange}
                  onLogout={handleLogout}
                ></ChallengeOptions>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    );
  }
}

export default Settings;
