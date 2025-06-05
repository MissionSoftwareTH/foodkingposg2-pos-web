import { abilitiesPlugin } from '@casl/vue';
import { ability } from './permissions';
import type { App } from 'vue';

export default {
  install(app: App) {
    // ทำให้ $ability สามารถเข้าถึงได้ทั่วทั้งแอปพลิเคชัน
    app.use(abilitiesPlugin, ability);
  }
};