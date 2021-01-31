import React, { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import randomString from 'randomstring';

import './playStyles.css';

const Redeem = (props) => {
  const [voucher, setVoucher] = useState('');

  //Modal state
  const [open, setOpen] = useState(false);

  //GQL redeemPoints(voucherID) mutation
  const [redeemPointsMutation] = useMutation(REDEEM, {
    update(_, result) {
      console.log(result.data.redeemPoints.prizePoints);
      props.refetchQuery();
    },
    onError(err) {
      throw new Error(err);
    },
    variables: {
      voucherID: voucher,
    },
  });

  //Generate random string
  const generateVoucher = () => {
    setVoucher(randomString.generate(5));
  };

  //Add voucher to list in DB
  const addVoucher = () => {
    console.log(voucher);
    redeemPointsMutation();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          className='ui right floated redeemBtn'
          onClick={() => {
            generateVoucher();
          }}
        >
          Redeem
        </Button>
      }
    >
      <Modal.Header>Congratulation! Here is your voucher</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{voucher}</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          content='Add Voucher'
          labelPosition='left'
          icon='plus'
          onClick={() => {
            setOpen(false);
            addVoucher();
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default Redeem;

const REDEEM = gql`
  mutation($voucherID: String!) {
    redeemPoints(voucherID: $voucherID) {
      prizePoints
      vouchers {
        voucherID
        value
      }
    }
  }
`;
