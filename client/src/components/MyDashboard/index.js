import React from "react";
import { Grid, Segment } from "semantic-ui-react";

// Components
import { WeeklyChallenges } from "../WeeklyChallenges";
import { WeeklyProgress } from "../WeeklyProgress";

import "./style.css";

export function MyDashboard() {
  return (
    <>
      <h1 className="header">my dashboard</h1>
      <div>
        <Grid columns="equal">
          <Grid.Column>
            <Segment id="segment">
              <WeeklyChallenges />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment id="segment">
              <WeeklyProgress />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
