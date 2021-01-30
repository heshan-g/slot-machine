import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

const UseCoupon = (props) => {
  //Input field value
  const [voucherInput, setVoucherInput] = useState('');

  //Modal state from Play (parent) component
  const { setModalState } = props;

  //Handle input for voucherID
  const handleVoucherChange = (e) => {
    setVoucherInput(e.target.value);
  };

  //Handle submit of voucherID
  const useVoucher = () => {
    console.log(voucherInput);
    setVoucherInput('');
  };

  return (
    <Modal
      size='tiny'
      open={props.modalState}
      onClose={() => setModalState(false)}
      onOpen={() => setModalState(true)}
    >
      <Modal.Header>
        You have exhausted all your attempts. Please enter a coupon code to
        continue.
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form onSubmit={useVoucher}>
            <Form.Field>
              <input
                placeholder='Voucher ID'
                onChange={handleVoucherChange}
                value={voucherInput}
              />
            </Form.Field>
            <Button type='submit'>Activate</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setModalState(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default UseCoupon;
