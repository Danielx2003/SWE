import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AdminUserGroupsModal({ row, id=1 }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className='admin-table-btn'>
        <div>
          <span>{row.username}</span>
        </div>
        <div>
          
        </div>
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal-box'>
          <Typography className='modal-header' variant="h6" component="h2">
            {row.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Text
          </Typography>

          <div>
            <Checkbox {...label} />
            <Checkbox {...label} />
            <Checkbox {...label} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}