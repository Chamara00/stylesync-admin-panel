import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { CustomButton } from '../components';

interface Props {
  open: boolean;
  handleClose: () => void;
  onClick: () => Promise<void>;
  title: string;
  buttonText: string;
  children: React.ReactNode;
}

export default function UpdateDialogBox({ open, handleClose, title, children, buttonText }: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="text-[18px] font-medium text-font_secondary px-10 pt-10" id="alert-dialog-title">
          {title}
        </div>

        <div className="font-normal text-[12px] text-gray-500 px-10 pb-4">{children}</div>
        <DialogActions>
          <div className="pb-10 flex flex-row gap-4 px-10 w-full">
            <CustomButton
              width="100%"
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

            <CustomButton width="100%" fontSize="16px" height="40px" onClick={handleClose}>
              {buttonText}
            </CustomButton>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
