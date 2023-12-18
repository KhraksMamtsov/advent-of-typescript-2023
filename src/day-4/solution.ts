export type Address = { address: string; city: string }

export type PresentDeliveryList<T extends Record<string, unknown>> = {
  [K in keyof T]: Address
}
