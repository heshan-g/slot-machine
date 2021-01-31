import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Modal, Form } from 'semantic-ui-react';

const UseCoupon = (props) => {
  //Input field value
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherList, setVoucherList] = useState(props.vouchers);

  //Modal state from Play (parent) component
  const { setModalState } = props;

  //GQL useCoupon(voucherID) mutation
  const [useCouponMutation] = useMutation(USE_COUPON, {
    update(_, result) {
      //   console.log(result.data.useCoupon.vouchers);
      setVoucherList(result.data.useCoupon.vouchers);
    },
    onError(err) {
      throw new Error(err);
    },
    variables: {
      voucherID: voucherInput,
    },
  });

  //Handle input for voucherID
  const handleVoucherChange = (e) => {
    setVoucherInput(e.target.value);
  };

  //Handle submit of voucherID
  const useVoucher = () => {
    useCouponMutation();
    // props.updateVouchers(voucherList);
    props.updateGameState();
    setVoucherInput('');
    setModalState(false);
  };

  //Update vouchers in the Game (parent's parent) component
  //   const { updateVouchers } = props;
  //   useEffect(() => {
  //     updateVouchers(voucherList);
  //   }, [voucherList, updateVouchers]);

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

const USE_COUPON = gql`
  mutation($voucherID: String!) {
    useCoupon(voucherID: $voucherID) {
      attempts
      vouchers {
        voucherID
        value
      }
    }
  }
`;
