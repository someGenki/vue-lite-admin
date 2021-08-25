import { createPinia } from 'pinia'

const store = createPinia()

// from vben-admin
export function setupStore(app) {
  app.use(store)
}

export { store }
