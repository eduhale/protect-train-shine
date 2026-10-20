<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep the training catalog browser-safe and shared across preparation, presentation, assessments and support materials to use one consistent lesson definition.
- Persist classes, slide progress and participant outcomes through the generated browser client under the managed authenticated layout; existing row-level policies scope these records to the instructor.
- Keep account provisioning outside public app endpoints; an unauthenticated bootstrap must never create privileged accounts.
- Use a scaled fixed-format presentation canvas and suppress instructor notes in fullscreen to keep projection geometry stable and audience content separate.
- Reuse the shared certificate eligibility helper for issuance controls; printing does not imply official regulatory certification.
