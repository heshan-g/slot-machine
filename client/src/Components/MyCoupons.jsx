import React, { useState, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Modal, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import './playStyles.css';

const MyCoupons = (props) => {
  const [open, setOpen] = useState(false);
  //   const [voucherList] = useState(props.voucherList);

  //Get user data from GQL and query vouchers from DB
  const { user } = useContext(AuthContext);

  const { data: { getUser: { vouchers } = {} } = {} } = useQuery(GET_VOUCHERS, {
    variables: { uid: user.id },
  });

  return (
    <Modal
      size='mini'
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button className='ui left floated myCoupons'>My Coupons</Button>
      }
    >
      <Modal.Header>My Coupons</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          {/* Map and render vouchers once available */}
          {vouchers &&
            vouchers.map((voucher) => {
              return (
                <React.Fragment key={voucher.voucherID}>
                  <h3>{voucher.voucherID}</h3>
                  <p>Value: {voucher.value}</p>
                </React.Fragment>
              );
            })}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MyCoupons;

const GET_VOUCHERS = gql`
  query($uid: ID!) {
    getUser(userId: $uid) {
      vouchers {
        voucherID
        value
      }
    }
  }
`;
