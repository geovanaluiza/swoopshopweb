/* =============================================================
   useScholarships — interactive scholarship explorer
   Manages: status (first-year/transfer), category filter,
   scholarship selection with stacking rules, and the running
   total. All values are USD/year.

   Stacking rules (per NU financial aid):
     · 1 Academic Merit (pick ONE)
     · 1 Affiliation/Partnership
     · up to 2 Talent Awards
     · up to 2 Ministry Support
     · 1 Need-Based
     · unlimited Stackable Extras (with caps encoded per card)
   ============================================================= */

export type StudentStatus = 'first-year' | 'transfer' | null
export type Category =
  | 'academic'
  | 'stackable'
  | 'affiliation'
  | 'talent'
  | 'ministry'
  | 'need'

export interface Scholarship {
  id: string
  title: string
  amount: number
  category: Category
  blurb: string
  renewable: string
  flag?: 'FULL RIDE'
  cap?: number /* for stackable extras — max times selectable */
  variable?: { min: number; max: number; defaultValue: number; unit: string }
}

export const TUITION = 36000

export const SCHOLARSHIPS: Scholarship[] = [
  /* ---- Academic Merit (1) ---- */
  { id: 'presidential', title: 'Presidential Scholarship', amount: 36000, category: 'academic', blurb: '100% of tuition covered — our most prestigious scholarship!', renewable: 'Renewable 4 yrs', flag: 'FULL RIDE' },
  { id: 'provost',     title: 'Provost Scholarship',     amount: 18000, category: 'academic', blurb: '$18,000 per year for outstanding academic achievement.',          renewable: 'Renewable 4 yrs' },
  { id: 'dean',        title: 'Dean Scholarship',        amount: 16000, category: 'academic', blurb: '$16,000 per year recognizing strong academic performance.',        renewable: 'Renewable 4 yrs' },
  { id: 'faculty',     title: 'Faculty Scholarship',     amount: 14000, category: 'academic', blurb: '$14,000 per year for academic excellence.',                        renewable: 'Renewable 4 yrs' },
  { id: 'northwest',   title: 'Northwest Scholarship',   amount: 11000, category: 'academic', blurb: '$11,000 per year for solid academic performance.',                renewable: 'Renewable 4 yrs' },

  /* ---- Stackable Extras (unlimited, but cap encoded) ---- */
  { id: 'visit',        title: 'Campus Visit Grant',          amount: 1000,  category: 'stackable', blurb: 'Awarded for visiting campus and completing an admissions interview.', renewable: 'Year 1', cap: 1 },
  { id: 'early-app',    title: 'Early Application Award',     amount: 2000,  category: 'stackable', blurb: 'Submit your application by the priority deadline.',                 renewable: 'Year 1', cap: 1 },
  { id: 'dual-credit',  title: 'Dual Credit Scholarship',     amount: 1500,  category: 'stackable', blurb: 'For students who earned college credit in high school.',             renewable: 'Year 1', cap: 1 },
  { id: 'church-match', title: 'Church Matching Scholarship', amount: 2500,  category: 'stackable', blurb: 'Your church matches up to this amount annually.',                    renewable: 'Renewable 4 yrs', cap: 1 },

  /* ---- Affiliations & Partnerships (1) ---- */
  { id: 'alumni',     title: 'Alumni Family Award',         amount: 3000, category: 'affiliation', blurb: 'For students with an immediate family member who is an NU alum.', renewable: 'Renewable 4 yrs' },
  { id: 'church-partner', title: 'Partner Church Award',    amount: 2000, category: 'affiliation', blurb: 'For students actively attending an NU partner church.',           renewable: 'Renewable 4 yrs' },
  { id: 'cccu',       title: 'CCCU Member Institution Award', amount: 2000, category: 'affiliation', blurb: 'For transferring students from CCCU member institutions.',        renewable: 'Renewable 4 yrs' },

  /* ---- Talent Awards (up to 2) ---- */
  { id: 'music',     title: 'Music Performance Award', amount: 5000,  category: 'talent', blurb: 'Audition-based. For Music Production and Performance majors.',     renewable: 'Renewable 4 yrs', variable: { min: 1000, max: 8000, defaultValue: 5000, unit: '$/yr' } },
  { id: 'theatre',   title: 'Theatre Talent Award',    amount: 3000,  category: 'talent', blurb: 'Audition-based. For Theatre and Musical Theatre students.',         renewable: 'Renewable 4 yrs', variable: { min: 500,  max: 5000, defaultValue: 3000, unit: '$/yr' } },
  { id: 'art',       title: 'Visual Art Award',        amount: 2000,  category: 'talent', blurb: 'Portfolio-based. For Studio Art and Design students.',             renewable: 'Renewable 4 yrs', variable: { min: 500,  max: 4000, defaultValue: 2000, unit: '$/yr' } },
  { id: 'athletic',  title: 'Athletic Scholarship',    amount: 6000,  category: 'talent', blurb: 'For recruited student-athletes across all NCAA sports.',          renewable: 'Renewable 4 yrs', variable: { min: 1000, max: 12000, defaultValue: 6000, unit: '$/yr' } },

  /* ---- NU & Ministry Support (up to 2) ---- */
  { id: 'ministry',  title: 'Ministry Leadership Award',   amount: 4000, category: 'ministry', blurb: 'For students in vocational ministry or church planting track.', renewable: 'Renewable 4 yrs' },
  { id: 'pastor',    title: 'Pastor\'s Kid Scholarship',  amount: 2000, category: 'ministry', blurb: 'For dependents of full-time pastors or missionaries.',            renewable: 'Renewable 4 yrs' },
  { id: 'mission',   title: 'Missions Scholarship',        amount: 3000, category: 'ministry', blurb: 'For students pursuing short-term or career missions.',           renewable: 'Renewable 4 yrs' },
  { id: 'seminary',  title: 'Seminary Track Award',        amount: 3500, category: 'ministry', blurb: 'For students on a pathway to seminary or graduate theology.',      renewable: 'Renewable 4 yrs' },

  /* ---- Need-Based (1) ---- */
  { id: 'pell',     title: 'Pell Grant Match',      amount: 5000, category: 'need', blurb: 'NU matches a portion of the federal Pell Grant for qualified students.', renewable: 'Renewable 4 yrs', variable: { min: 0, max: 7500, defaultValue: 5000, unit: '$/yr' } },
  { id: 'nu-need',  title: 'NU Need-Based Award',   amount: 4000, category: 'need', blurb: 'Institutionally funded, based on demonstrated financial need.',         renewable: 'Renewable 4 yrs', variable: { min: 500, max: 8000, defaultValue: 4000, unit: '$/yr' } },
]

const STACK_LIMITS: Record<Category, number> = {
  academic: 1,
  stackable: Infinity, /* capped per card */
  affiliation: 1,
  talent: 2,
  ministry: 2,
  need: 1,
}

export const useScholarships = () => {
  const status = useState<StudentStatus>('sch-status', () => null)
  const selectedIds = useState<string[]>('sch-selected', () => [])
  const activeCategory = useState<Category | 'all'>('sch-cat', () => 'all')
  const variableAmounts = useState<Record<string, number>>('sch-vars', () => ({}))

  const categoryCount = (cat: Category) =>
    selectedIds.value.filter((id) => SCHOLARSHIPS.find((s) => s.id === id)?.category === cat).length

  const canAdd = (s: Scholarship): boolean => {
    if (selectedIds.value.includes(s.id)) return true /* toggle off path */
    const limit = STACK_LIMITS[s.category]
    if (limit === 1) return categoryCount(s.category) === 0
    if (s.cap !== undefined) {
      const used = selectedIds.value.filter((id) => id === s.id).length
      return used < s.cap && categoryCount(s.category) < limit
    }
    return categoryCount(s.category) < limit
  }

  const toggle = (s: Scholarship) => {
    if (selectedIds.value.includes(s.id)) {
      selectedIds.value = selectedIds.value.filter((id) => id !== s.id)
      return
    }
    if (!canAdd(s)) return
    if (s.category === 'academic' || s.category === 'affiliation' || s.category === 'need') {
      /* replace existing of same category */
      selectedIds.value = selectedIds.value.filter((id) => {
        const x = SCHOLARSHIPS.find((ss) => ss.id === id)
        return x?.category !== s.category
      })
    }
    selectedIds.value = [...selectedIds.value, s.id]
    if (s.variable && !(s.id in variableAmounts.value)) {
      variableAmounts.value = { ...variableAmounts.value, [s.id]: s.variable.defaultValue }
    }
  }

  const setVariable = (id: string, value: number) => {
    variableAmounts.value = { ...variableAmounts.value, [id]: value }
  }

  const amountOf = (s: Scholarship): number => {
    if (s.variable && id_in_state(s.id)) return variableAmounts.value[s.id]
    return s.amount
  }

  const id_in_state = (id: string): boolean => id in variableAmounts.value

  const total = computed(() =>
    selectedIds.value.reduce((sum, id) => {
      const s = SCHOLARSHIPS.find((ss) => ss.id === id)
      if (!s) return sum
      const v = variableAmounts.value[id] !== undefined ? variableAmounts.value[id] : s.amount
      return sum + v
    }, 0)
  )

  const coverage = computed(() => Math.min(100, Math.round((total.value / TUITION) * 100)))

  const remaining = computed(() => Math.max(0, TUITION - total.value))

  const byCategory = computed(() => {
    const groups: Record<Category, Scholarship[]> = {
      academic: [], stackable: [], affiliation: [], talent: [], ministry: [], need: [],
    }
    SCHOLARSHIPS.forEach((s) => groups[s.category].push(s))
    return groups
  })

  const categories: Array<{ id: Category | 'all'; label: string }> = [
    { id: 'all',         label: 'All' },
    { id: 'academic',    label: 'Academic Merit' },
    { id: 'stackable',   label: 'Stackable Extras' },
    { id: 'affiliation', label: 'Affiliations' },
    { id: 'talent',      label: 'Talent Awards' },
    { id: 'ministry',    label: 'Ministry Support' },
    { id: 'need',        label: 'Need-Based' },
  ]

  const reset = () => {
    selectedIds.value = []
    variableAmounts.value = {}
  }

  return {
    status, selectedIds, activeCategory, variableAmounts,
    canAdd, toggle, setVariable, amountOf,
    total, coverage, remaining, byCategory, categories,
    reset,
  }
}
