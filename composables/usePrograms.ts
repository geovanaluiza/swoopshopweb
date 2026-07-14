/* =============================================================
   usePrograms — program data + tab state
   TODO: replace `desc` and `image` with real copy and licensed
   photography from the official NU media library.
   ============================================================= */
export type ProgramModality = 'On Campus' | 'Graduate' | 'Online'

export interface Program {
  title: string
  modality: ProgramModality
  meta: string
  desc: string
  image: string
}

export const PROGRAMS: Program[] = [
  { title: 'Nursing (BSN)',                modality: 'On Campus', meta: 'Bachelor of Science · 4 yrs',     desc: 'Start clinicals in your first semester. Graduate ready for the NCLEX with hundreds of hours of real patient care.',                 image: '/student-1.jpg' },
  { title: 'Computer Science',            modality: 'On Campus', meta: 'BS · 4 yrs',                      desc: 'Software, data, and AI coursework paired with internships at Seattle-area tech companies.',                                       image: '/student-2.jpg' },
  { title: 'Business',                    modality: 'On Campus', meta: 'BS · 4 yrs',                      desc: 'Marketing, finance, and management — taught by executives who still consult in the Seattle market.',                              image: '/student-3.jpg' },
  { title: 'Music Production',            modality: 'On Campus', meta: 'BS · 4 yrs',                      desc: 'Record in Creatio — our studio led by a Grammy-winning producer. Leave with credits, not just a degree.',                       image: '/student-4.jpg' },
  { title: 'Psychology',                  modality: 'On Campus', meta: 'BS · 4 yrs',                      desc: 'Research from year one. Faculty mentoring on real studies — many students present at regional conferences.',                    image: '/student-5.jpg' },
  { title: 'Physician Assistant Studies', modality: 'Graduate',  meta: 'MS · 24 months',                  desc: 'A focused medical curriculum with rotations across hospitals, clinics, and underserved communities.',                             image: '/student-6.jpg' },
  { title: 'MBA',                         modality: 'Graduate',  meta: 'Master of Business · 18–24 mo',   desc: 'Online or evening cohorts built for working professionals. Faith-integrated leadership curriculum.',                            image: '/campus-1.jpg' },
  { title: 'Education (M.A.T.)',          modality: 'Graduate',  meta: 'Master of Arts in Teaching',      desc: 'Become a licensed teacher in one year. STEM, ELL, and special education endorsements available.',                               image: '/life-3.jpg' },
  { title: 'Online — General Studies',    modality: 'Online',    meta: 'BS · Fully online',               desc: 'An asynchronous, accredited degree designed for working adults. Same faculty, same diploma.',                                    image: '/life-2.jpg' },
  { title: 'Online — RN to BSN',          modality: 'Online',    meta: 'BSN · Fully online',              desc: 'For licensed RNs. Finish in as few as 12 months while you keep working.',                                                        image: '/life-1.jpg' },
  { title: 'Online — Ministry & Theology',modality: 'Online',    meta: 'BA · Fully online',               desc: 'A flexible pathway for those called to vocational ministry or further seminary study.',                                          image: '/chapel-1.jpg' },
]

export const usePrograms = () => {
  const activeTab = useState<ProgramModality>('program-tab', () => 'On Campus')
  const list = computed(() => PROGRAMS.filter((p) => p.modality === activeTab.value))
  return { activeTab, list, all: PROGRAMS }
}
