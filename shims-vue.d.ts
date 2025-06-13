declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // ใช้ DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, EmitsOptions, PublicProps>
  // {} สำหรับ props หมายถึงไม่มี props (ในกรณีที่ Component ไม่มี props)
  // หรือ Record<string, unknown> สำหรับ props เพื่อบอกว่ามี props แต่ไม่ระบุเจาะจงใน declaration file
  // แต่ defineProps() ใน script setup จะจัดการ type ของ props ให้เอง

  // สำหรับ SFCs ทั่วไปที่ใช้ defineProps/defineEmits/defineExpose
  // Type ที่ง่ายที่สุดคือ DefineComponent<any, any, any> หรือ DefineComponent<{}, {}, any>
  // เพราะ Vue compiler จะ infer type ที่ถูกต้องจาก script setup
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

