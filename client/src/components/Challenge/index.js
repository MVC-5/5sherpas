import React from 'react'
import { Segment, Button } from 'semantic-ui-react'

import "./style.css";

const Challenge = () => (
    <>
        <div>
            <Segment.Group id='challenge-holder'>
                <Segment.Group>
                    <Segment id='challenge-description'>Challenge</Segment>
                </Segment.Group>
                <Button.Group id='button-group'>
                    <Button id='button-style' size='large'>Done</Button>
                    <Button id='button-style' size='large'>Try Again</Button>
                    <Button id='button-style' size='large'>Swap</Button>
                </Button.Group>
            </Segment.Group>
        </div>
    </>
)

export default Challenge