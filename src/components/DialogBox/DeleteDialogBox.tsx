import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomButton } from '../components';

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  text: string;
  buttonText: string;
}

export default function DeleteDialogBox({ open, handleClose, title, text, buttonText }: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            width="100px"
            fontSize="16px"
            buttonColor="white"
            textColor="#2B2B2B"
            border="1px solid #844704"
            hoverColor="#C2C2C2"
            onClick={handleClose}
          >
            Cancel
          </CustomButton>
          <CustomButton width="100px" fontSize="16px" onClick={handleClose}>
            {buttonText}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
