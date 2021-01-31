import React, { useState, useEffect, useContext } from 'react';
import { Grid, Label } from 'semantic-ui-react';
import { useQuery, useMutation, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';

import Play from '../Components/Play';
import Redeem from '../Components/Redeem';
import MyCoupons from '../Components/MyCoupons';

import '.././Components/playStyles.css';

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

  console.log('Active: ', isActive);

  useEffect(() => {
    if (attempts <= 0) {
      setIsActive(false);
    }
  }, [attempts]);

  //GQL deactivateAccount mutation
  const [deactivateAccountMutation] = useMutation(DEACTIVATE_ACCOUNT, {
    update(_, result) {},
    onError(err) {
      throw new Error(err);
    },
    variables: {
      status: isActive,
    },
  });

  //Check account status and vouchers and logout
  useEffect(() => {
    const lockUser = async () => {
      if (!isActive && vouchers.length < 1) {
        await deactivateAccountMutation();
        logout();
      }
    };
    lockUser();
  }, [isActive, deactivateAccountMutation, logout, vouchers]);

  return (
    <React.Fragment>
      {/* Points area */}
      <Grid className='firstRow'>
        <Grid.Row className='two column'>
          <Grid.Column>
            {/* Render MyCoupons only if vouchers[] is defined */}
            <MyCoupons voucherList={vouchers} />
          </Grid.Column>

          <Grid.Column textAlign='right'>
            <p className='myPoints'>
              You have <Label className='points'>{prizePoints}</Label> prize
              points
            </p>
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
            <p className='attemptsLine'>
              You have <Label className='attempts'>{attempts}</Label> attempts
              remaining
            </p>
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
const DEACTIVATE_ACCOUNT = gql`
  mutation($status: Boolean!) {
    deactivateAccount(status: $status) {
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
