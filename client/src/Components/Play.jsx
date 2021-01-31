import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import UseCoupon from './UseCoupon';

import './playStyles.css';

const Play = (props) => {
  const [wheel, setWheel] = useState([0, 0, 0]);
  const [spinPoints, setSpinPoints] = useState(0);

  //Modal state
  const [open, setOpen] = useState(false);

  const { refetchQuery } = props;

  //GQL play(points) mutation
  const [playMutation, { loading }] = useMutation(PLAY, {
    update(_, result) {
      refetchQuery();
    },
    onError(err) {
      throw new Error(err);
    },
    variables: {
      points: spinPoints,
    },
  });

  const [isSpinning, setIsSpinning] = useState('false');

  // //Calculate prize points earned
  const calculatePoints = (wheelResult) => {
    let comboPoints = 0;
    if (
      wheelResult[0] === wheelResult[1] &&
      wheelResult[1] === wheelResult[2]
    ) {
      // Combination of 3 same numbers - Eg: 555, 111, 999 etc. User will get 500 points.
      comboPoints = 500;
    } else if (
      wheelResult[0] + 1 === wheelResult[1] &&
      wheelResult[1] + 1 === wheelResult[2]
    ) {
      // 3 consecutive numbers - Eg: 123, 456, 789 etc. User will get 200 points.
      comboPoints = 200;
    } else if (
      wheelResult[0] + 2 === wheelResult[1] &&
      wheelResult[1] + 2 === wheelResult[2]
    ) {
      // Consecutive even numbers - Eg: 246, 468 etc. User will get 200 points.
      // Consecutive odd numbers: Eg: 135, 579 etc. User will get 200 points.
      comboPoints = 200;
    } else if (
      wheelResult[0] === 1 &&
      wheelResult[1] === 5 &&
      wheelResult[2] === 9
    ) {
      // 1  5  9: This specific combination will get the user 50 points.
      comboPoints = 50;
    } else {
      // Any other number combination will get the user only 5 points.
      comboPoints = 5;
    }
    return comboPoints;
  };

  //Called when spun ("Play" button is clicked)
  const spin = () => {
    if (props.activeStatus) {
      // //Spin wheels
      // setWheel([
      //   Math.floor(Math.random() * Math.floor(9)) + 1,
      //   Math.floor(Math.random() * Math.floor(9)) + 1,
      //   Math.floor(Math.random() * Math.floor(9)) + 1,
      // ]);

      setIsSpinning('true');

      setTimeout(function () {
        setWheel([
          Math.floor(Math.random() * Math.floor(9)) + 1,
          Math.floor(Math.random() * Math.floor(9)) + 1,
          Math.floor(Math.random() * Math.floor(9)) + 1,
        ]);

        setIsSpinning('false');
      }, 3000);
    } else {
      //Show useCoupon modal
      return setOpen('true');
    }
  };

  //Update points for current spin
  useEffect(() => {
    setSpinPoints(calculatePoints(wheel));
  }, [wheel]);

  //Update DB and UI with last spin's results
  useEffect(() => {
    if (spinPoints > 0) {
      playMutation();
    }
    setSpinPoints();
  }, [spinPoints, playMutation]);

  const setCouponModalState = (state) => {
    setOpen(state);
  };

  return (
    <Grid columns='equal' textAlign='center' className='wheelGrid'>
      <Grid.Row className='wheels'>
        <Grid.Column className='wheel mwheelOne'>
          <p
            className={
              isSpinning === 'false'
                ? 'swheel wheelOne'
                : 'meduh swheel wheelOne'
            }
          >
            {wheel[0]}
          </p>
        </Grid.Column>
        <Grid.Column className='wheel mwheelTwo'>
          <p
            className={
              isSpinning === 'false'
                ? 'swheel wheelOne'
                : 'meduh swheel wheelOne'
            }
          >
            {wheel[1]}
          </p>
        </Grid.Column>
        <Grid.Column className='wheel mwheelThree'>
          <p
            className={
              isSpinning === 'false'
                ? 'swheel wheelOne'
                : 'meduh swheel wheelOne'
            }
          >
            {wheel[2]}
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className='one column playBtnG'>
        <Grid.Column className='center aligned column'>
          <Button
            className={
              loading ? 'huge loading disabled playBtn' : 'huge playBtn'
            }
            onClick={() => spin()}
          >
            Play!
          </Button>
          {/* useCoupon modal */}
          <UseCoupon
            modalState={open}
            setModalState={setCouponModalState}
            refetchQuery={refetchQuery}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Play;

const PLAY = gql`
  mutation($points: Int!) {
    play(points: $points) {
      prizePoints
      attempts
    }
  }
`;
