export interface LeadPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  program: string
  modality: 'On Campus' | 'Online' | 'Both'
  consent: boolean
}

const PROGRAM_MAP: Record<string, string> = {
  nursing: 'Nursing (BSN)',
  'computer-science': 'Computer Science',
  business: 'Business',
  'music-production': 'Music Production',
  psychology: 'Psychology',
  'physician-assistant': 'Physician Assistant Studies',
  undecided: 'Undecided — help me explore',
}

export const useLeadForm = () => {
  const route = useRoute()

  const state = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    modality: 'On Campus' as LeadPayload['modality'],
    consent: false,
  })

  const errors = reactive<Record<string, string>>({})
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
  const step = ref(1)

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (route.query.program) {
    const key = String(route.query.program).toLowerCase()
    const mapped = PROGRAM_MAP[key]
    if (mapped) state.program = mapped
    else if (route.query.program) state.program = String(route.query.program)
  }

  const validateStep = (s: number): boolean => {
    Object.keys(errors).forEach((k) => delete errors[k])
    if (s === 1) {
      if (!state.firstName.trim()) errors.firstName = 'Required'
      if (!state.lastName.trim())  errors.lastName  = 'Required'
      if (!state.email.trim())     errors.email     = 'Required'
      else if (!emailRe.test(state.email)) errors.email = 'Enter a valid email'
      if (!state.program)          errors.program   = 'Choose a program'
      if (!state.consent)          errors.consent   = 'Please agree to be contacted'
    }
    if (s === 2) {
      if (!state.email.trim())     errors.email   = 'Required'
      else if (!emailRe.test(state.email)) errors.email = 'Enter a valid email'
    }
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(1)) step.value = 2
  }

  const prevStep = () => { step.value = 1 }

  const submit = async () => {
    if (!validateStep(2)) return false
    status.value = 'loading'
    try {
      await $fetch('/api/lead', { method: 'POST', body: { ...state } })
      status.value = 'success'
      return true
    } catch (e) {
      status.value = 'error'
      return false
    }
  }

  const reset = () => {
    state.firstName = ''
    state.lastName  = ''
    state.email     = ''
    state.phone     = ''
    state.program   = ''
    state.modality  = 'On Campus'
    state.consent   = false
    status.value    = 'idle'
    step.value      = 1
  }

  const setProgram = (title: string) => { state.program = title }

  return { state, errors, status, step, validateStep, nextStep, prevStep, submit, reset, setProgram }
}
