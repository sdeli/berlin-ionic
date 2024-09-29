import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

class ToastService {
  private toastId: HTMLElement | null;

  constructor() {
    this.toastId = document.getElementById('toast-root');
    if (!this.toastId) {
      this.toastId = document.createElement('div');
      this.toastId.id = 'toast-root';
      document.body.appendChild(this.toastId);
    }

    this.unmountToast = this.unmountToast.bind(this);
  }

  showSuccessToast(message: string) {
    this.showToast(message, 'success');
  }

  showErrorToast(message: string) {
    this.showToast(message, 'error');
  }

  private showToast(message: string, severity: 'success' | 'error' | 'info' | 'warning') {
    const handleClose = () => this.unmountToast();

    const toast = (
      <Snackbar
        open={true}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        sx={{
          // Using a function to get the theme for responsive design
          bottom: (theme) => ({
            xs: '100px', // 100px for mobile
            md: '60px',  // 60px for desktop
          }),
        }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Snackbar>
    );

    ReactDOM.render(toast, this.toastId);
  }

  private unmountToast() {
    if (this.toastId) {
      ReactDOM.unmountComponentAtNode(this.toastId);
    }
  }
}

export default new ToastService();
