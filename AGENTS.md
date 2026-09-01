# Knowledge 360 — Codex Instructions

Read `docs/CODEX_HANDOFF.md` before making changes.

1. Inspect the existing repository/auth implementation before coding.
2. Supabase/Postgres + Supabase Auth is the current backend/auth direction.
3. Preserve existing working features; do not rewrite from scratch.
4. Role hierarchy: Admin → BR → Teacher → Student.
5. Use Supabase Auth for authentication and Postgres RLS for authorization.
6. Never expose service-role keys/secrets to client code.
7. Never weaken RLS merely to make a UI feature work.
8. Inspect exact live schemas, foreign keys, triggers and policies before migrations.
9. Prefer safe, incremental changes and read-only inspection before destructive SQL.
10. Immediate goal: secure real Student and Teacher login integration and role-based data access.
