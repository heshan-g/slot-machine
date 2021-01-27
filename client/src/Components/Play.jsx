import React, { useState } from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';

const Play = (props) => {
  const [wheel, setWheel] = useState([]);

  const spin = async () => {
    await setWheel([
      Math.floor(Math.random() * Math.floor(9)) + 1,
      Math.floor(Math.random() * Math.floor(9)) + 1,
      Math.floor(Math.random() * Math.floor(9)) + 1,
    ]);

    props.playGame(100);
  };

  return (
    <Grid columns='equal' textAlign='center'>
      <Grid.Row>
        <Grid.Column>
          <Segment>{wheel[0]}</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>{wheel[1]}</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>{wheel[2]}</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className='one column'>
        <Grid.Column className='center aligned column'>
          <Button className='ui huge button' onClick={() => spin()}>
            Play!
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Play;
