/* Optional server route to receive lead submissions.
   When the real CRM endpoint is ready, replace the body of this
   handler with a `fetch()` to it. Keep the contract:

     POST /api/lead
     body: LeadPayload  (see composables/useLeadForm.ts)
     returns: { ok: true } | { ok: false, error: string }
*/
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    firstName: string
    lastName: string
    email: string
    phone?: string
    program: string
    modality: string
    consent: boolean
  }>(event)

  if (!body?.email || !body?.consent) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid lead payload' })
  }

  // TODO: forward to CRM / ESP (HubSpot, Slate, Mailchimp, etc.)
  console.log('[lead]', body.email, body.program, body.modality)

  return { ok: true }
})
