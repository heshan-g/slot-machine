import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const MyCoupons = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      size='mini'
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>My Coupons</Button>}
    >
      <Modal.Header>My Coupons</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          {props.vouchers.map((voucher) => {
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
