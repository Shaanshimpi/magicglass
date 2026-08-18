# Magic Glass Agent Guidelines

This project is configured with an automated **Skill Routing and Triggering System** mapped to all **1,006 global Antigravity skills** on this machine (`C:\Users\shaan\.gemini\config\skills`).

## Mandatory Skill Evaluation Protocol
After receiving ANY user prompt, before generating code or taking action, you MUST:
1. **Analyze Prompt Intent**: Classify the prompt into domain(s) (e.g. UI/Design, 3D/Motion, Backend, AI/LLM, Testing, DevOps).
2. **Select Skill**: Lookup the single best matching skill in [docs/SKILLS_CATALOG.md](file:///d:/Work/X13%20Yoga/Projects/Magicglass/new-site/docs/SKILLS_CATALOG.md) or [.agents/skills_index.json](file:///d:/Work/X13%20Yoga/Projects/Magicglass/new-site/.agents/skills_index.json).
3. **Load Skill (`view_file`)**: Call `view_file` on `C:\Users\shaan\.gemini\config\skills\<skill_name>\SKILL.md`.
4. **Execute**: Implement the solution following the loaded skill's exact rules, design principles, and guidelines.

## Local Project Context
This project also uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

