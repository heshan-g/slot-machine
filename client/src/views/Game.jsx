import React, { useState, useEffect, useContext } from 'react';
import { Grid, Label } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';

import Play from '../Components/Play';
import Redeem from '../Components/Redeem';
import MyCoupons from '../Components/MyCoupons';

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

  //Callback function being called from <Redeem />
  const updateVouchers = (newVoucherList) => {
    setVouchers(newVoucherList);
  };
  //Callback function being called from <Redeem />
  const updatePoints = (newPoints) => {
    setPrizePoints(newPoints);
  };

  useEffect(() => {
    if (attempts <= 0) {
      setIsActive(false);
    }
  }, [attempts]);

  return (
    <React.Fragment>
      {/* Points area */}
      <Grid>
        <Grid.Row className='two column'>
          <Grid.Column>
            <MyCoupons vouchers={vouchers} />
          </Grid.Column>

          <Grid.Column>
            <Label>You have {prizePoints} prize points</Label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className='one column'>
          <Grid.Column className='right floated column'>
            {/* Show REDEEM button if points >= 1000 */}
            {prizePoints >= 1000 ? (
              <Redeem
                updateVouchers={updateVouchers}
                updatePoints={updatePoints}
                currentPoints={prizePoints}
              />
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* Play area */}
      <Play
        playGame={play}
        currentAttempts={attempts}
        currentPrizePoints={prizePoints}
        activeStatus={isActive}
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
