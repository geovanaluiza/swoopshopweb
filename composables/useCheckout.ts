interface CheckoutForm {
  name: string
  email: string
  phone: string
  slot: string
  notes: string
}

interface CheckoutState {
  form: CheckoutForm
  orderId: string | null
  pickup: { name: string; address: string; hours: string[] }
}

const STORAGE_KEY = 'swoopshop.checkout.v1'

export const PICKUP_INFO = {
  name: 'SwoopShop Pickup Window',
  address: 'Merdian Building, 5520 108th Ave NE, Kirkland WA 98033',
  hours: [
    'Mon–Fri · 9:00 AM – 5:00 PM',
    'Saturday · 10:00 AM – 2:00 PM',
    'Sunday · Closed'
  ]
}

export const PICKUP_SLOTS = [
  { id: 'mon-12', label: 'Mon', time: '12:00 PM' },
  { id: 'mon-3',  label: 'Mon', time: '3:00 PM'  },
  { id: 'mon-5',  label: 'Mon', time: '5:00 PM'  },
  { id: 'tue-12', label: 'Tue', time: '12:00 PM' },
  { id: 'tue-3',  label: 'Tue', time: '3:00 PM'  },
  { id: 'tue-5',  label: 'Tue', time: '5:00 PM'  },
  { id: 'wed-12', label: 'Wed', time: '12:00 PM' },
  { id: 'wed-3',  label: 'Wed', time: '3:00 PM'  },
  { id: 'wed-5',  label: 'Wed', time: '5:00 PM'  },
  { id: 'thu-12', label: 'Thu', time: '12:00 PM' },
  { id: 'thu-3',  label: 'Thu', time: '3:00 PM'  },
  { id: 'thu-5',  label: 'Thu', time: '5:00 PM'  },
  { id: 'fri-12', label: 'Fri', time: '12:00 PM' },
  { id: 'fri-3',  label: 'Fri', time: '3:00 PM'  },
  { id: 'fri-5',  label: 'Fri', time: '5:00 PM'  }
]

export const useCheckout = () => {
  const state = useState<CheckoutState>('swoopshop-checkout', () => ({
    form: { name: '', email: '', phone: '', slot: '', notes: '' },
    orderId: null,
    pickup: PICKUP_INFO
  }))

  if (import.meta.client) {
    onMounted(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) state.value = JSON.parse(raw)
      } catch {
        /* no-op */
      }
    })
  }

  const persist = () => {
    if (!import.meta.client) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
    } catch {
      /* no-op */
    }
  }

  const submit = () => {
    state.value.orderId = `SW-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    persist()
    return state.value.orderId
  }

  const reset = () => {
    state.value = { form: { name: '', email: '', phone: '', slot: '', notes: '' }, orderId: null, pickup: PICKUP_INFO }
    persist()
  }

  return { state: readonly(state), submit, reset }
}
