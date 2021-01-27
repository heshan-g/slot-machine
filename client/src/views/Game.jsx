import React, { useState } from 'react';
import { Grid, Button, Label } from 'semantic-ui-react';

import Play from '../Components/Play';

const Game = () => {
  const [prizePoints, setPrizePoints] = useState(0);

  const play = (points) => {
    //Call the play(points) GQL mutation
    console.log(points);
  };

  return (
    <React.Fragment>
      {/* Points area */}
      <Grid>
        <Grid.Row className='three column'>
          <Grid.Column>
            <Button className='ui left floated'>My Coupons</Button>
          </Grid.Column>

          <Grid.Column></Grid.Column>

          <Grid.Column>
            <Label>You have {prizePoints} prize points</Label>
            <Button className='ui right floated'>Redeem</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* Play area */}
      <Play playGame={play} />
    </React.Fragment>
  );
};

export default Game;
