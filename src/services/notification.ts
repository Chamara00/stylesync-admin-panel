import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotificationController {
  static defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  static error(message: string, options?: ToastOptions) {
    toast.error(message, {
      ...NotificationController.defaultOptions,
      ...options,
    });
  }

  static success(message: string, options?: ToastOptions) {
    toast.success(message, {
      ...NotificationController.defaultOptions,
      ...options,
    });
  }

  static warning(message: string, options?: ToastOptions) {
    toast.warning(message, {
      ...NotificationController.defaultOptions,
      ...options,
    });
  }

  static info(message: string, options?: ToastOptions) {
    toast.info(message, {
      ...NotificationController.defaultOptions,
      ...options,
    });
  }
}

export default NotificationController;
