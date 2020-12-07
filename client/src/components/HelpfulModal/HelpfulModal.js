/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import yakIcon from "../../assets/yak1.png";

import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./style.css";

function HelpfulModal({ headerMsg, modalContent, buttonText }) {
  const { isNewUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(isNewUser);

  if (isNewUser) {
    console.log("New user!");
  }

  // TODO: Set new user in LS so it persists if page is reloaded. Make the yak a button in the settings page too
  // Create modal for user settings
  // right now isNewUser defaults to true in the App.js
  // set isNewUser to false after button click on dashboard (not on settings page)

  return (
    <>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        closeOnDimmerClick={false}
        dimmer="blurring"
      >
        <Header icon>
          <Image id="helpful-yak" src={yakIcon} size="tiny" />
          <h2>{headerMsg}</h2>
        </Header>
        <Modal.Content>
          <div className="modal-content">{modalContent}</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" inverted onClick={() => setOpen(false)}>
            {buttonText}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default HelpfulModal;
