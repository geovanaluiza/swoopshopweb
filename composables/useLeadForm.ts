/* TODO (Marketing): Replace FORMSPREE_URL with your Formspree endpoint ID.
   Sign up free at https://formspree.io, create a form, and paste your endpoint URL here.
   Example: https://formspree.io/f/xwkgpqrv

   The same endpoint handles both the hero form and the scholarship explorer gate.
   When the real CRM endpoint (TargetX/Salesforce) is available, replace the
   Formspree fetch below with a fetch() to that URL and keep the same body shape. */
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
  const config = useRuntimeConfig()
  const formspreeUrl = (config.public as { FORMSPREE_URL?: string }).FORMSPREE_URL ?? ''

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
      if (formspreeUrl) {
        await fetch(formspreeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...state }),
        })
      } else {
        // TODO: remove this fallback — set FORMSPREE_URL in .env
        await $fetch('/api/lead', { method: 'POST', body: { ...state } })
      }
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
