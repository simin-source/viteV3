declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.json'
declare module '*.png'
declare module '*.jpg'
declare module '*.css'
declare module '*.scss'

interface ImportMetaEnv {
  VITE_APP_TITLE: string
  // 更多环境变量...
}