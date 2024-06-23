import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MainToggle() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isAddress, setIsAddress] = useState(false)
  const [data, setData] = useState([])

  const add = ()=> {
    setIsAddress(false)
    setData([{name:"summit",age:23}])
  }
  const continueData =()=> {
    setOpen(false)
  }

  const addAddress =()=>{
    setIsAddress(true)
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add Address</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {data.length === 0 || isAddress ? <Box sx={style}>
          <h1>
            Add Address
          </h1>
          <button onClick={add}>Add</button>
        </Box>:
        <Box sx={style}>
            <button onClick={addAddress}>Add address</button>
          <h1>
            My Address
          </h1>
          <button onClick={continueData}>Continue</button>
        </Box>}

      </Modal>
    </div>
  );
}
