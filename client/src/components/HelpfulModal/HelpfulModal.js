/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import yakIcon from "../../assets/yak1.png";

import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./style.css";

function HelpfulModal({ headerMsg, modalContent, buttonText }) {
  const lsUser = localStorage.getItem("newUser");

  const { isNewUser, setIsNewUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(isNewUser || lsUser === "true");

  const location = useLocation();

  const handleModalClose = () => {
    setOpen(false);
    if (location.pathname === "/dashboard") {
      localStorage.setItem("newUser", "false");
      setIsNewUser(false);
    }
  };

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
          <Button color="blue" inverted onClick={() => handleModalClose()}>
            {buttonText}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default HelpfulModal;
