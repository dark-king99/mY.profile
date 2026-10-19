{
  "brand": {
    "name": "Enoch Derek Doeblah",
    "tagline": "Full-Stack Software Engineer & DevOps Enthusiast",
    "attributes": [
      "credible",
      "systems-minded",
      "calm confidence",
      "high-signal",
      "remote-ready",
      "detail-oriented"
    ],
    "visual_personality": {
      "direction": "Operations Console Minimalism",
      "notes": [
        "Feels like a polished engineering dashboard, not a flashy agency site.",
        "Bento-grid sections + subtle blueprint grid + restrained accent color.",
        "Dark mode first for DevOps credibility, but with high readability and soft surfaces (no neon overload)."
      ]
    }
  },
  "information_architecture": {
    "routes": {
      "/": {
        "sections": [
          "Sticky Nav",
          "Hero",
          "About",
          "Skills",
          "Projects",
          "Certifications",
          "Experience",
          "Contact",
          "Footer"
        ],
        "success_actions": [
          "Click View Resume",
          "Download PDF",
          "Submit Contact Form",
          "Open Project Details",
          "Copy email / open LinkedIn/GitHub"
        ]
      },
      "/resume": {
        "sections": [
          "Resume Header",
          "Summary",
          "Skills",
          "Experience",
          "Projects",
          "Certifications",
          "Education (optional)",
          "Footer micro"
        ],
        "success_actions": [
          "Print",
          "Download PDF",
          "Copy contact links"
        ]
      },
      "/messages": {
        "sections": [
          "Messages Table",
          "Message Detail Drawer/Dialog",
          "Empty/Loading/Error states"
        ]
      }
    },
    "navigation": {
      "desktop": "Sticky top nav with section anchors + right-side CTAs",
      "mobile": "Sheet (hamburger) with anchors + primary CTA pinned"
    }
  },
  "design_tokens": {
    "typography": {
      "font_pairing": {
        "display": {
          "name": "Space Grotesk",
          "fallback": "ui-sans-serif, system-ui",
          "usage": "Hero name, section titles, card titles"
        },
        "body": {
          "name": "IBM Plex Sans",
          "fallback": "ui-sans-serif, system-ui",
          "usage": "Body copy, labels, form text"
        },
        "mono": {
          "name": "IBM Plex Mono",
          "fallback": "ui-monospace, SFMono-Regular",
          "usage": "Skill chips, metadata, code-like accents"
        }
      },
      "tailwind_font_setup": {
        "instructions": [
          "Use Google Fonts import in index.html OR @import in index.css (preferred: index.html for performance).",
          "Set CSS variables: --font-display, --font-body, --font-mono.",
          "Apply in Tailwind via font-[var(--font-display)] pattern or extend theme.fontFamily if configured."
        ],
        "google_fonts": [
          "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        ]
      },
      "type_scale": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
        "h2": "text-base md:text-lg text-muted-foreground",
        "section_title": "text-xl sm:text-2xl font-semibold tracking-tight",
        "card_title": "text-base font-semibold",
        "body": "text-sm sm:text-base leading-relaxed",
        "small": "text-xs sm:text-sm text-muted-foreground",
        "mono_meta": "font-[var(--font-mono)] text-xs tracking-wide"
      }
    },
    "color_system": {
      "mode": "dark-first with light fallback",
      "palette_intent": {
        "background": "near-black with blue-green undertone",
        "accent": "ocean-teal (trustworthy, modern, non-purple)",
        "support": "slate neutrals + warm sand for subtle highlights"
      },
      "css_custom_properties": {
        "notes": [
          "Use HSL tokens to match shadcn conventions.",
          "Keep gradients mild and only in hero/section backdrops (<=20% viewport)."
        ],
        "root_light": {
          "--background": "210 40% 98%",
          "--foreground": "222 47% 11%",
          "--card": "0 0% 100%",
          "--card-foreground": "222 47% 11%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "222 47% 11%",
          "--primary": "188 78% 34%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "210 40% 96%",
          "--secondary-foreground": "222 47% 11%",
          "--muted": "210 40% 96%",
          "--muted-foreground": "215 16% 40%",
          "--accent": "188 78% 34%",
          "--accent-foreground": "0 0% 100%",
          "--destructive": "0 84% 60%",
          "--destructive-foreground": "0 0% 100%",
          "--border": "214 32% 91%",
          "--input": "214 32% 91%",
          "--ring": "188 78% 34%",
          "--radius": "0.75rem"
        },
        "root_dark": {
          "--background": "222 47% 6%",
          "--foreground": "210 40% 98%",
          "--card": "222 47% 8%",
          "--card-foreground": "210 40% 98%",
          "--popover": "222 47% 8%",
          "--popover-foreground": "210 40% 98%",
          "--primary": "188 78% 42%",
          "--primary-foreground": "222 47% 8%",
          "--secondary": "222 30% 14%",
          "--secondary-foreground": "210 40% 98%",
          "--muted": "222 30% 14%",
          "--muted-foreground": "215 20% 70%",
          "--accent": "188 78% 42%",
          "--accent-foreground": "222 47% 8%",
          "--destructive": "0 62% 40%",
          "--destructive-foreground": "210 40% 98%",
          "--border": "222 30% 18%",
          "--input": "222 30% 18%",
          "--ring": "188 78% 42%",
          "--radius": "0.75rem",
          "--surface-1": "222 47% 9%",
          "--surface-2": "222 30% 12%",
          "--surface-3": "222 25% 16%",
          "--shadow-color": "188 78% 20%"
        },
        "semantic_states": {
          "success": {
            "bg": "hsl(160 60% 12%)",
            "fg": "hsl(160 70% 70%)",
            "border": "hsl(160 60% 22%)"
          },
          "warning": {
            "bg": "hsl(38 70% 12%)",
            "fg": "hsl(38 90% 70%)",
            "border": "hsl(38 70% 22%)"
          },
          "info": {
            "bg": "hsl(200 70% 12%)",
            "fg": "hsl(200 90% 70%)",
            "border": "hsl(200 70% 22%)"
          }
        }
      },
      "gradients_and_texture": {
        "allowed_gradients": [
          {
            "name": "hero-wash",
            "css": "radial-gradient(900px circle at 20% 10%, rgba(45,212,191,0.18), transparent 55%), radial-gradient(700px circle at 80% 20%, rgba(56,189,248,0.12), transparent 50%)",
            "usage": "Hero background only (decorative overlay)"
          },
          {
            "name": "section-glow",
            "css": "radial-gradient(700px circle at 30% 0%, rgba(45,212,191,0.10), transparent 60%)",
            "usage": "Top of sections like Projects/Contact (<=20% viewport)"
          }
        ],
        "noise_overlay": {
          "css": "background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.08%22/%3E%3C/svg%3E')",
          "usage": "Apply to body pseudo-element for subtle grain (opacity 0.06–0.10)"
        },
        "blueprint_grid": {
          "css": "background-image: linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px); background-size: 48px 48px;",
          "usage": "Hero + Resume header only (very subtle)"
        }
      }
    },
    "spacing_and_layout": {
      "container": {
        "class": "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        "notes": "Use generous vertical rhythm: section py-16 sm:py-20"
      },
      "grid": {
        "bento": {
          "class": "grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6",
          "patterns": [
            "Hero: left 7 cols content, right 5 cols profile/metrics",
            "Projects: mix md:col-span-7 + md:col-span-5 cards",
            "Skills: md:col-span-4 cards repeated"
          ]
        }
      },
      "radius": {
        "card": "rounded-xl",
        "button": "rounded-lg",
        "chip": "rounded-full"
      },
      "shadow": {
        "card": "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_12px_30px_rgba(0,0,0,0.35)]",
        "hover": "hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_50px_rgba(0,0,0,0.45)]"
      }
    }
  },
  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use_components": [
        "button.jsx",
        "card.jsx",
        "badge.jsx",
        "separator.jsx",
        "tabs.jsx",
        "accordion.jsx",
        "navigation-menu.jsx",
        "sheet.jsx",
        "dialog.jsx",
        "drawer.jsx",
        "tooltip.jsx",
        "hover-card.jsx",
        "form.jsx",
        "input.jsx",
        "textarea.jsx",
        "table.jsx",
        "scroll-area.jsx",
        "skeleton.jsx",
        "sonner.jsx"
      ]
    },
    "nav": {
      "sticky_nav": {
        "layout": "Left: wordmark + role. Center: anchor links. Right: primary CTA + theme toggle.",
        "classes": [
          "sticky top-0 z-50",
          "backdrop-blur supports-[backdrop-filter]:bg-background/70",
          "border-b border-border"
        ],
        "micro_interactions": [
          "On scroll > 12px: add shadow + slightly stronger bg opacity.",
          "Active section link: underline indicator (2px) in accent color.",
          "Mobile: Sheet slides from right; anchors close sheet on click."
        ],
        "data_testids": {
          "nav": "site-sticky-nav",
          "resume_link": "nav-resume-link",
          "messages_link": "nav-messages-link",
          "contact_anchor": "nav-contact-anchor",
          "download_pdf": "nav-download-pdf-button"
        }
      }
    },
    "buttons": {
      "variants": {
        "primary": {
          "use": "<Button> default variant",
          "classes": "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring",
          "motion": "transition-colors duration-200"
        },
        "secondary": {
          "use": "variant=secondary",
          "classes": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          "motion": "transition-colors duration-200"
        },
        "ghost": {
          "use": "variant=ghost",
          "classes": "hover:bg-accent/10 hover:text-foreground",
          "motion": "transition-colors duration-200"
        },
        "outline": {
          "use": "variant=outline",
          "classes": "border-border bg-transparent hover:bg-accent/10",
          "motion": "transition-colors duration-200"
        }
      },
      "sizes": {
        "sm": "h-9 px-3 text-sm",
        "md": "h-10 px-4",
        "lg": "h-11 px-5 text-base"
      },
      "press_feedback": "active:scale-[0.98] transition-transform duration-150 (apply only to buttons, not globally)",
      "data_testids": {
        "hero_view_resume": "hero-view-resume-button",
        "hero_download_pdf": "hero-download-pdf-button",
        "hero_contact": "hero-contact-button",
        "resume_print": "resume-print-button",
        "resume_download": "resume-download-button"
      }
    },
    "cards_and_sections": {
      "card_style": {
        "base": "rounded-xl border border-border bg-card text-card-foreground",
        "surface": "bg-[hsl(var(--surface-1))]",
        "hover": "hover:border-primary/30 hover:bg-[hsl(var(--surface-2))]",
        "motion": "transition-colors duration-200",
        "accent_bar": "optional left border: border-l-2 border-l-primary/60"
      },
      "section_header": {
        "pattern": "Title + short supporting line + right-side quick filter (Tabs) when needed",
        "classes": "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      }
    },
    "badges": {
      "skill_chip": {
        "use": "badge.jsx",
        "classes": "rounded-full bg-accent/10 text-foreground border border-border font-[var(--font-mono)]",
        "states": {
          "in_progress": "bg-warning/10 text-[hsl(38_90%_70%)] border-[hsl(38_70%_22%)]",
          "completed": "bg-[hsl(160_60%_12%)] text-[hsl(160_70%_70%)] border-[hsl(160_60%_22%)]"
        }
      }
    },
    "forms": {
      "contact_form": {
        "use": ["form.jsx", "input.jsx", "textarea.jsx", "label.jsx", "button.jsx"],
        "layout": "Two-column on md (name/email), then subject full, message full.",
        "field_classes": "bg-[hsl(var(--surface-1))] border-border focus-visible:ring-2 focus-visible:ring-ring",
        "states": {
          "idle": "Submit enabled",
          "loading": "Disable inputs + show inline spinner + sonner toast 'Sending…'",
          "success": "Reset form + sonner success + show confirmation text block",
          "error": "Inline error Alert + sonner error"
        },
        "data_testids": {
          "form": "contact-form",
          "name": "contact-form-name-input",
          "email": "contact-form-email-input",
          "subject": "contact-form-subject-input",
          "message": "contact-form-message-textarea",
          "submit": "contact-form-submit-button",
          "status": "contact-form-status"
        }
      }
    },
    "projects": {
      "project_cards": {
        "layout": "Bento grid with 2 featured projects (wide) + 2 supporting (tall).",
        "card_content": [
          "Project name",
          "1-line outcome",
          "Tech chips",
          "Links: Live / Repo",
          "Expandable details (Dialog)"
        ],
        "use": ["card.jsx", "badge.jsx", "dialog.jsx", "carousel.jsx (optional screenshots)", "tooltip.jsx"],
        "data_testids": {
          "grid": "projects-grid",
          "card": "project-card",
          "open": "project-open-details-button",
          "repo": "project-repo-link",
          "live": "project-live-link"
        }
      }
    },
    "resume": {
      "resume_layout": {
        "screen": "Two-column on lg: left main content, right sidebar for skills/certs.",
        "print": "Single column A4/Letter friendly; remove nav/footer; ensure black text on white.",
        "use": ["separator.jsx", "badge.jsx", "button.jsx", "table.jsx"],
        "print_css_guidance": [
          "@media print { body { background: white; color: black; } }",
          "Hide sticky nav + interactive buttons: .no-print { display:none !important; }",
          "Avoid breaking entries: .avoid-break { break-inside: avoid; page-break-inside: avoid; }",
          "Ensure links show URL: a[href]:after { content: ' (' attr(href) ')'; font-size: 10px; } (optional)"
        ]
      }
    },
    "messages_viewer": {
      "table": {
        "use": ["table.jsx", "scroll-area.jsx", "skeleton.jsx", "drawer.jsx"],
        "states": [
          "Loading skeleton rows",
          "Empty state card with CTA to go back",
          "Error alert with retry"
        ],
        "data_testids": {
          "page": "messages-page",
          "table": "messages-table",
          "row": "messages-table-row",
          "open": "messages-open-button",
          "empty": "messages-empty-state",
          "retry": "messages-retry-button"
        }
      }
    }
  },
  "motion_and_microinteractions": {
    "library": {
      "recommended": "framer-motion",
      "install": "npm i framer-motion",
      "usage_notes": [
        "Use for section reveal, hover lift, and nav scroll shadow transitions.",
        "Respect prefers-reduced-motion: reduce durations to 0 and disable parallax."
      ]
    },
    "principles": [
      "Entrance: fade + slight y (8–12px) on section in-view.",
      "Hover: cards lift 2px + border accent; buttons color shift only.",
      "Scroll: subtle parallax on hero background glow (very low amplitude).",
      "No universal transitions; only transition-colors/opacity/shadow on interactive elements."
    ],
    "snippets": {
      "card_hover": "hover:-translate-y-0.5 transition-transform duration-200 will-change-transform",
      "section_reveal": "initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.2}} transition={{duration:0.5,ease:'easeOut'}}"
    }
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast for text on surfaces.",
      "Visible focus rings using ring token.",
      "Keyboard navigable nav + dialogs + sheet.",
      "Form errors announced (aria-live region for status).",
      "Respect prefers-reduced-motion."
    ]
  },
  "image_urls": {
    "hero_background_texture": [
      {
        "url": "https://images.unsplash.com/photo-1657215374010-786fefd1dbbc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjB0ZWNoJTIwdGV4dHVyZSUyMHRlYWx8ZW58MHx8fHRlYWx8MTc4OTgxMzkzMHww&ixlib=rb-4.1.0&q=85",
        "category": "background",
        "description": "Soft teal abstract sheets; use as low-opacity hero backdrop (blur + 10–15% opacity)."
      },
      {
        "url": "https://images.pexels.com/photos/4549831/pexels-photo-4549831.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "category": "background",
        "description": "Circuit-board texture; use sparingly in Projects header as masked overlay (<=10% opacity)."
      }
    ],
    "profile_placeholder": [
      {
        "url": "https://images.pexels.com/photos/15946547/pexels-photo-15946547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "category": "avatar",
        "description": "Neutral professional headshot placeholder (replace with Enoch’s real photo)."
      }
    ],
    "project_visuals": [
      {
        "url": "https://images.unsplash.com/photo-1652120268427-9ba66e870467?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwyfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwYWJzdHJhY3QlMjBsaW5lcyUyMGRhcmt8ZW58MHx8fGJsYWNrfDE3ODk4MTM5MzB8MA&ixlib=rb-4.1.0&q=85",
        "category": "project",
        "description": "Dark abstract topography; use as project card cover image with gradient scrim for legibility."
      }
    ]
  },
  "instructions_to_main_agent": {
    "global_css_updates": [
      "Replace CRA default App.css styles; do not center align .App.",
      "Update index.css tokens: set :root and .dark to the provided HSL values.",
      "Add body background grain via body:before pseudo-element (position fixed; pointer-events none).",
      "Add blueprint grid only to hero wrapper via utility class or custom class (not global)."
    ],
    "page_build_notes": [
      "Use a single data file (e.g., src/data/portfolio.js) for skills/projects/certs/experience to keep UI clean.",
      "Hero: left content + right ‘Ops panel’ card with quick stats (Years exp, Focus: DevOps/Cloud, Location: Remote).",
      "Skills: grouped chips inside cards (Backend, Frontend, DevOps, Cloud).",
      "Certifications: show status badges (Completed/In progress) with subtle color states.",
      "Resume page: add .no-print class to nav + buttons; implement window.print() for Print.",
      "Messages viewer: Table with Drawer for message detail; include loading skeleton and empty state."
    ],
    "testing_attributes": [
      "Add data-testid to every CTA, nav link, form field, project link, and key status text.",
      "Use kebab-case describing role (not appearance)."
    ],
    "recommended_libraries": [
      {
        "name": "framer-motion",
        "why": "section reveals + hover lift + smooth micro-interactions",
        "install": "npm i framer-motion"
      }
    ]
  }
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
