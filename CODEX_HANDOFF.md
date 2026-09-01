# Knowledge 360 — Codex Handoff

## Project
Knowledge 360 coaching institute website/ERP, Kanpur South.
Website: https://www.knowledge360.in
GitHub previously referenced: https://github.com/abhash2020/knowledge360/tree/main
Founder/admin: Abhash Dwivedi. Founded 2017.
Boards: CBSE, ICSE/ISC. Classes 5–12.

## Portal hierarchy
Admin → BR → Teacher → Student.

Student: profile, study material, test results, fees.
Teacher: profile, assigned students, marks feeding.
BR: branch-scoped enquiries/admissions, IDs/biometric, fees, schedules, tests, marks, homework, absentees.
Admin: full control.

Registration:
- Students/teachers submit requests.
- Admin approves teachers.
- Student approval may be by Admin or BR.
- Student form includes Board (CBSE/ICSE/ISC).
- TEC is optional.
- TEC identifies a referring teacher; referral must be tracked for teacher incentive/payout.

## Current technology direction
Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Supabase/Postgres + Supabase Auth, Next.js API routes where appropriate, Cloudinary if already implemented, Recharts where needed, Vercel deployment previously discussed.
Do not introduce/rewrite architecture unnecessarily; inspect the existing repo first.

## Supabase state verified
Public tables visible:
- branches
- classes
- profiles
- registration_requests
- students
- teacher_students
- teachers

`profiles` is already connected to Supabase Auth for the current admin: the authenticated user's UID exists as `profiles.id`, and that profile has `role = admin`. Do not recreate this relationship.

`registration_requests` has these 21 columns, in order:
1. id
2. user_id
3. full_name
4. email
5. phone
6. requested_role
7. branch_id
8. class_name
9. subject
10. qualification
11. experience_years
12. guardian_name
13. guardian_phone
14. status
15. approved_by
16. approved_at
17. rejection_reason
18. created_at
19. board
20. tec
21. referred_by_teacher_id

Do not recreate board, tec, or referred_by_teacher_id.

## Immediate goal
Connect real Supabase Authentication to real Student and Teacher logins.

Desired secure flow:
1. Registration request is pending.
2. Authorized admin/BR approves it.
3. Approved account gets the correct profile/role relationship.
4. Student login loads only that student's data.
5. Teacher login loads only that teacher's data and assigned students.
6. BR is restricted to its branch.
7. Admin has full permitted access.
8. Postgres RLS enforces authorization server-side; frontend hiding is not sufficient.

## Existing data model
Known tables include teachers, students, teacher_students. `teacher_students` represents teacher ↔ student assignment. Inspect exact columns and foreign keys before writing code.

## Safety / working rules
- Do not rewrite the project from scratch.
- Inspect repository code before changing auth.
- Inspect live Supabase schema, foreign keys, triggers and RLS policies before migrations.
- Prefer read-only SQL inspection before UPDATE/ALTER/DELETE.
- Never delete existing data/tables unless explicitly requested.
- Never expose passwords, service-role keys, JWT secrets or other credentials.
- Never weaken RLS just to make the frontend work.
- User is often working in Supabase from a mobile browser, so changes should be incremental and easy to verify.

## Product context
Knowledge 360 offers classes 5–12, CBSE/ICSE/ISC, practical Physics, board PYQs, chapter booklets, NCERT focus, Power Booster Sunday classes, regular/remedial tests and KSAT scholarships up to 90%.
Academic groups: Lower Junior 5–6, Upper Junior 7–8, Pre Foundation 9–10, Foundation 11–12.

## Next investigation sequence
A. Inspect exact schemas and relationships.
B. Inspect RLS policies.
C. Inspect auth/profile triggers.
D. Inspect existing frontend auth/login code.
E. Verify approval flow.
F. Implement secure role/session loading.
G. Implement teacher/student data loading.
H. Test Admin, Teacher and Student separately.
I. Test RLS using authenticated users.
J. Then polish UI.

Keep this document updated when architecture or database behavior changes.
