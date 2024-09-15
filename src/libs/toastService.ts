import { toastController } from '@ionic/core';  // If you're not using hooks, you can directly use toastController from Ionic

class ToastService {
  async showErrorToast(message: string) {
    const toast = await toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
    toast.present();
  }
}

export default new ToastService();
