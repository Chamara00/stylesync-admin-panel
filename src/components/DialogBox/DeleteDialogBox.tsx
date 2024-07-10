import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { CustomButton } from '../components';

interface Props {
  open: boolean;
  handleClose: () => void;
  onDelete: () => Promise<void>;
  title: string;
  description: string;
  buttonText: string;
}

export default function DeleteDialogBox({ open, handleClose, onDelete, title, description, buttonText }: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="text-[18px] font-medium text-font_secondary px-10 pt-6" id="alert-dialog-title">
          {title}
        </div>

        <div className="font-normal text-[16px] text-gray-500 px-10 py-4">{description}</div>
        <div className="px-10 py-6 flex flex-row justify-center items-center">
          <DialogActions>
            <CustomButton
              width="250px"
              height="40px"
              fontSize="16px"
              buttonColor="white"
              textColor="#2B2B2B"
              border="1px solid #844704"
              hoverColor="#C2C2C2"
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
            <CustomButton width="100%" fontSize="16px" height="40px" onClick={onDelete}>
              {buttonText}
            </CustomButton>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
