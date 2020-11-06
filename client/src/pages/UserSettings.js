import React from "react";
import ChallengeOptions from "../components/Form/ChallengeDropdown";
import { Grid, Image } from 'semantic-ui-react';
import ReadOnlyAccount from "../components/Form/readAccount";
// import EditAccount from "../components/Form/editAccount";

function Settings() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column width={9}>
          <ReadOnlyAccount />
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