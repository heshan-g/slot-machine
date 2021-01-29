import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Label } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';

import Play from '../Components/Play';

const Game = () => {
  //Initialise game state
  const [prizePoints, setPrizePoints] = useState();
  const [attempts, setAttempts] = useState();
  const [vouchers, setVouchers] = useState([]);
  const [isActive, setIsActive] = useState(true);

  //Get user data from GQL query to initialise game state
  const { user } = useContext(AuthContext);

  const { data: { getUser: gameState } = {} } = useQuery(GET_GAME_STATE, {
    variables: { uid: user.id },
  });

  //Set the initial state of game
  useEffect(() => {
    if (gameState) {
      setPrizePoints(gameState.prizePoints);
      setAttempts(gameState.attempts);
      setVouchers(gameState.vouchers);
      setIsActive(gameState.isActive);
    }
  }, [gameState]);

  console.log('vouchers: ', vouchers);
  console.log('Active: ', isActive);

  //Callback function being called from <Play />
  const play = (points) => {
    setPrizePoints(prizePoints + points);
    setAttempts(attempts - 1);
  };

  return (
    <React.Fragment>
      {/* Points area */}
      <Grid>
        <Grid.Row className='two column'>
          <Grid.Column>
            <Button className='ui left floated'>My Coupons</Button>
          </Grid.Column>

          <Grid.Column>
            <Label>You have {prizePoints} prize points</Label>
          </Grid.Column>
        </Grid.Row>
        {prizePoints >= 1000 ? (
          //Show REDEEM button if points >= 1000
          <h3>Redeem Button</h3>
        ) : null}
      </Grid>

      {/* Play area */}
      <Play
        playGame={play}
        currentAttempts={attempts}
        currentPrizePoints={prizePoints}
      />

      <Grid columns='equal' textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Label>You have {attempts} attempts remaining</Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};
export default Game;

const GET_GAME_STATE = gql`
  query($uid: ID!) {
    getUser(userId: $uid) {
      prizePoints
      attempts
      vouchers {
        voucherID
        value
      }
      isActive
    }
  }
`;
