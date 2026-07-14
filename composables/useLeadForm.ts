/* =============================================================
   useLeadForm — form state, validation, and simulated submit
   Replace `submit` body with a real fetch() to your CRM / ESP
   when the endpoint is available. Until then this just resolves
   after a short delay so the UX is fully exercisable.
   ============================================================= */

export interface LeadPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  program: string
  modality: 'On Campus' | 'Online' | 'Both'
  consent: boolean
}

export const useLeadForm = () => {
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

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validate = (): boolean => {
    Object.keys(errors).forEach((k) => delete errors[k])
    if (!state.firstName.trim()) errors.firstName = 'Required'
    if (!state.lastName.trim())  errors.lastName  = 'Required'
    if (!state.email.trim())     errors.email     = 'Required'
    else if (!emailRe.test(state.email)) errors.email = 'Enter a valid email'
    if (!state.program)          errors.program   = 'Choose a program'
    if (!state.consent)          errors.consent   = 'Please agree to be contacted'
    return Object.keys(errors).length === 0
  }

  const submit = async () => {
    if (!validate()) return false
    status.value = 'loading'
    try {
      /* TODO: replace with real endpoint.
         await $fetch('/api/lead', { method: 'POST', body: { ...state } }) */
      await new Promise((r) => setTimeout(r, 900))
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
  }

  const setProgram = (title: string) => {
    state.program = title
  }

  return { state, errors, status, validate, submit, reset, setProgram }
}
