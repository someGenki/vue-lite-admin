import { createPinia } from 'pinia'

const store = createPinia()

// from vben-admin 210
export function setupStore(app) {
  app.use(store)
}

export { store }
