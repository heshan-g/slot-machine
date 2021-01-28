import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Label } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';

import Play from '../Components/Play';

const Game = () => {
  //Initialise game state
  const [prizePoints, setPrizePoints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const { user } = useContext(AuthContext);

  //Get user data from GQL query
  const { data: gameData } = useQuery(GET_GAME_STATE, {
    variables: { uid: user.id },
  });

  //Set the initial state of game
  useEffect(() => {
    if (gameData) {
      const gameState = gameData.getUser;
      setPrizePoints(gameState.prizePoints);
      setAttempts(gameState.attempts);
      setVouchers(gameState.vouchers);
      setIsActive(gameState.isActive);
    }
  }, [gameData]);

  console.log(vouchers);
  console.log('Active: ' + isActive);

  //Call the GQL play(points) mutation
  const play = (points) => {
    //Call the play(points) GQL mutation
    console.log(points);
    setPrizePoints(prizePoints + points);
    setAttempts(attempts - 1);
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
