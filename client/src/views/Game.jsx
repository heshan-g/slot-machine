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
  const { user, logout } = useContext(AuthContext);
  const { refetch, data: { getUser: gameState } = {} } = useQuery(
    GET_GAME_STATE,
    {
      variables: { uid: user.id },
    }
  );

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

  useEffect(() => {
    if (attempts <= 0) {
      setIsActive(false);
    }
  }, [attempts]);

  useEffect(() => {
    if (!isActive && vouchers.length < 1) {
      logout();
    }
  }, [isActive, logout, vouchers]);

  return (
    <React.Fragment>
      {/* Points area */}
      <Grid>
        <Grid.Row className='two column'>
          <Grid.Column>
            {/* Render MyCoupons only if vouchers[] is defined */}
            <MyCoupons voucherList={vouchers} />
          </Grid.Column>

          <Grid.Column>
            <Label>You have {prizePoints} prize points</Label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className='one column'>
          <Grid.Column className='right floated column'>
            {/* Render Redeem only if prizePoints >= 1000 */}
            {prizePoints >= 1000 ? (
              <Redeem currentPoints={prizePoints} refetchQuery={refetch} />
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* Render Play */}
      <Play activeStatus={isActive} refetchQuery={refetch} />

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
