import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { CustomButton } from '../components';

interface Props {
  open: boolean;
  onClick: () => void;
  title: string;
  text: string;
  buttonText: string;
}

export default function DeleteDialogBox({ open, onClick, title, text, buttonText }: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="text-[18px] font-medium text-font_secondary p-4" id="alert-dialog-title">
          {title}
        </div>

        <div className="font-normal text-[12px] text-gray-500 px-4 pb-4">{text}</div>
        <DialogActions>
          <CustomButton
            width="80px"
            height="30px"
            fontSize="16px"
            buttonColor="white"
            textColor="#2B2B2B"
            border="1px solid #844704"
            hoverColor="#C2C2C2"
            onClick={onClick}
          >
            Cancel
          </CustomButton>
          <CustomButton width="80px" fontSize="16px" height="30px" onClick={onClick}>
            {buttonText}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
