import type { Question, SkillTag } from "@/types/question";

export const QUESTIONS: Question[] = [
  // ============ Part 5 — Passive Voice (25) ============
  {
    id: "p5-pv-001",
    part: "Part 5",
    question:
      "The new safety guidelines _______ to all employees by the end of next week.",
    choices: {
      A: "will distribute",
      B: "will be distributed",
      C: "have distributed",
      D: "are distributing",
    },
    answer: "B",
    explanation_zh:
      "guidelines（指南）是被分發的對象，動作由人執行，所以要用被動語態。時間是 next week，需要未來式，所以是 will be + p.p. → will be distributed。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-002",
    part: "Part 5",
    question:
      "All laptops _______ inspected by the IT department before being assigned to staff.",
    choices: { A: "must", B: "must be", C: "must been", D: "must being" },
    answer: "B",
    explanation_zh:
      "laptops 是「被檢查」，所以要被動。情態動詞 must 後面接原形，所以是 must be + p.p. → must be inspected。記住：助動詞後面只能接 be，不能接 been。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-003",
    part: "Part 5",
    question:
      "The quarterly report _______ already _______ to the regional manager.",
    choices: {
      A: "has / sent",
      B: "has / been sent",
      C: "have / been sent",
      D: "is / sending",
    },
    answer: "B",
    explanation_zh:
      "report 是「被寄出」，要被動。現在完成式被動是 has/have been + p.p.。主詞 The quarterly report 是單數，所以用 has been sent。",
    skill_tag: "passive_voice",
    difficulty: "B2",
  },
  {
    id: "p5-pv-004",
    part: "Part 5",
    question:
      "The conference room _______ for the board meeting at the moment.",
    choices: {
      A: "is preparing",
      B: "is being prepared",
      C: "has prepared",
      D: "prepares",
    },
    answer: "B",
    explanation_zh:
      "「at the moment」表示「現在正在發生」，會議室是被準備，所以用現在進行被動：is being + p.p. → is being prepared。",
    skill_tag: "passive_voice",
    difficulty: "B2",
  },
  {
    id: "p5-pv-005",
    part: "Part 5",
    question:
      "All applications _______ before the application deadline last Friday.",
    choices: {
      A: "must submit",
      B: "must be submitted",
      C: "had to be submitted",
      D: "should submit",
    },
    answer: "C",
    explanation_zh:
      "「last Friday」是過去時間，必須用過去式。表「過去必須」用 had to。applications 是被繳交，所以是被動 → had to be submitted。注意 must 沒有過去式，必須改成 had to。",
    skill_tag: "passive_voice",
    difficulty: "B2",
  },
  {
    id: "p5-pv-006",
    part: "Part 5",
    question: "The package _______ to your office by 5 p.m. tomorrow.",
    choices: {
      A: "will deliver",
      B: "will be delivered",
      C: "will have delivered",
      D: "is delivered",
    },
    answer: "B",
    explanation_zh:
      "package 是被送，未來式被動是 will be + p.p. → will be delivered。",
    skill_tag: "passive_voice",
    difficulty: "A2",
  },
  {
    id: "p5-pv-007",
    part: "Part 5",
    question:
      "Employees _______ that the office will be closed during the renovation.",
    choices: {
      A: "have been informed",
      B: "have informed",
      C: "are informing",
      D: "informed",
    },
    answer: "A",
    explanation_zh:
      "員工是「被告知」，要被動。have been + p.p. 表示「已經被告知」。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-008",
    part: "Part 5",
    question:
      "The proposal _______ thoroughly before it was approved by the committee.",
    choices: {
      A: "had reviewed",
      B: "had been reviewed",
      C: "was reviewing",
      D: "has reviewed",
    },
    answer: "B",
    explanation_zh:
      "The proposal 是被審查的對象，不會自己審查，因此需要被動語態。又因為審查發生在 was approved 之前，要用過去完成式被動：had been reviewed。",
    skill_tag: "passive_voice",
    difficulty: "B2",
  },
  {
    id: "p5-pv-009",
    part: "Part 5",
    question:
      "The annual meeting _______ from June to September due to scheduling conflicts.",
    choices: {
      A: "postponed",
      B: "was postponed",
      C: "has postponed",
      D: "postpones",
    },
    answer: "B",
    explanation_zh:
      "年會是被延期的，且是過去事件，用過去式被動：was postponed。postponed 單獨用是主動過去式，意思不對。",
    skill_tag: "passive_voice",
    difficulty: "A2",
  },
  {
    id: "p5-pv-010",
    part: "Part 5",
    question:
      "New employee ID cards _______ at the reception desk on the first day of work.",
    choices: {
      A: "issue",
      B: "are issued",
      C: "is issuing",
      D: "have issued",
    },
    answer: "B",
    explanation_zh:
      "ID 卡是被發放的，現在式被動（表示慣例）：are issued。主詞 ID cards 是複數，所以用 are。",
    skill_tag: "passive_voice",
    difficulty: "A2",
  },
  {
    id: "p5-pv-011",
    part: "Part 5",
    question:
      "The budget proposal _______ by the finance committee next Thursday.",
    choices: {
      A: "will review",
      B: "reviewed",
      C: "will be reviewed",
      D: "has been reviewed",
    },
    answer: "C",
    explanation_zh:
      "next Thursday 是未來，提案是被審核的，未來被動：will be reviewed。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-012",
    part: "Part 5",
    question:
      "The company's financial results _______ to investors at the quarterly briefing.",
    choices: {
      A: "will present",
      B: "will be presented",
      C: "presented",
      D: "is presenting",
    },
    answer: "B",
    explanation_zh:
      "財務結果是被呈報的，未來被動：will be presented。主詞 results 被呈報，不是自己呈報。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-013",
    part: "Part 5",
    question:
      "All visitors _______ to sign in at the front desk before entering the building.",
    choices: {
      A: "require",
      B: "requires",
      C: "are required",
      D: "have required",
    },
    answer: "C",
    explanation_zh:
      "訪客是被要求的，現在式被動：are required。be required to + 動詞原形是固定句型。",
    skill_tag: "passive_voice",
    difficulty: "A2",
  },
  {
    id: "p5-pv-014",
    part: "Part 5",
    question:
      "The factory's safety procedures _______ after the incident last month.",
    choices: {
      A: "update",
      B: "were updated",
      C: "has updated",
      D: "is updating",
    },
    answer: "B",
    explanation_zh:
      "last month 是過去時間，程序是被更新的，過去式被動：were updated。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-015",
    part: "Part 5",
    question:
      "The client's complaint _______ directly by the customer relations manager.",
    choices: {
      A: "handled",
      B: "was handled",
      C: "handles",
      D: "is handling",
    },
    answer: "B",
    explanation_zh:
      "投訴是被處理的，過去式被動：was handled。handled 單獨用是主動過去式，意思不符。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-016",
    part: "Part 5",
    question:
      "A welcome package _______ to each new employee on their first day.",
    choices: {
      A: "gives",
      B: "is given",
      C: "has given",
      D: "was giving",
    },
    answer: "B",
    explanation_zh:
      "歡迎包是被給予的，現在式被動（表慣例）：is given。主詞 A welcome package 是單數。",
    skill_tag: "passive_voice",
    difficulty: "A2",
  },
  {
    id: "p5-pv-017",
    part: "Part 5",
    question:
      "The damaged goods _______ back to the supplier for a full replacement.",
    choices: {
      A: "send",
      B: "sent",
      C: "were sent",
      D: "is sending",
    },
    answer: "C",
    explanation_zh:
      "貨物是被退回的，過去式被動：were sent。主詞 goods 是複數。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-018",
    part: "Part 5",
    question:
      "Several updates to the employee database _______ by the IT team over the weekend.",
    choices: {
      A: "made",
      B: "were made",
      C: "are making",
      D: "has made",
    },
    answer: "B",
    explanation_zh:
      "更新是被進行的，過去被動：were made。「over the weekend」確認是過去時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-019",
    part: "Part 5",
    question:
      "The new cafeteria menu _______ positively by the majority of employees.",
    choices: {
      A: "appreciated",
      B: "was appreciated",
      C: "has appreciated",
      D: "is appreciating",
    },
    answer: "B",
    explanation_zh:
      "菜單是被欣賞/好評的，過去式被動：was appreciated。appreciate 用主動時，主詞必須是人。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-020",
    part: "Part 5",
    question:
      "The invoice _______ within thirty days of receipt to avoid late payment fees.",
    choices: {
      A: "must pay",
      B: "must be paid",
      C: "should pay",
      D: "have to pay",
    },
    answer: "B",
    explanation_zh:
      "發票是被支付的，情態動詞被動：must be paid。must pay 是主動，主詞（invoice）不能自己支付。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-021",
    part: "Part 5",
    question:
      "All contracts _______ by legal counsel before they are signed by either party.",
    choices: {
      A: "should review",
      B: "should be reviewed",
      C: "review",
      D: "reviewing",
    },
    answer: "B",
    explanation_zh:
      "合約是被審查的，情態動詞被動：should be reviewed。情態動詞後接 be + p.p.。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-022",
    part: "Part 5",
    question:
      "The renovation work _______ while the office remains open to staff.",
    choices: {
      A: "will carry out",
      B: "will be carried out",
      C: "carries out",
      D: "is carrying out",
    },
    answer: "B",
    explanation_zh:
      "裝修工作是被執行的，未來式被動：will be carried out。carry out 是片語動詞「執行」。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-023",
    part: "Part 5",
    question:
      "A new accounting system _______ throughout the company since last quarter.",
    choices: {
      A: "has implemented",
      B: "has been implemented",
      C: "implemented",
      D: "is implementing",
    },
    answer: "B",
    explanation_zh:
      "since last quarter → 現在完成式；系統是被實施的，現在完成式被動：has been implemented。",
    skill_tag: "passive_voice",
    difficulty: "B2",
  },
  {
    id: "p5-pv-024",
    part: "Part 5",
    question:
      "The presentation materials _______ to all registered participants in advance.",
    choices: {
      A: "will send",
      B: "have sent",
      C: "will be sent",
      D: "sends",
    },
    answer: "C",
    explanation_zh:
      "材料是被寄出的，未來被動：will be sent。主詞 materials 是複數，不能自己寄送。",
    skill_tag: "passive_voice",
    difficulty: "B1",
  },
  {
    id: "p5-pv-025",
    part: "Part 5",
    question:
      "The terms of the agreement _______ by both parties before the project can begin.",
    choices: {
      A: "must finalize",
      B: "must be finalized",
      C: "are finalizing",
      D: "have finalized",
    },
    answer: "B",
    explanation_zh:
      "條款是被確定的，情態動詞被動：must be finalized。finalize = 敲定/最終確認。",
    skill_tag: "passive_voice",
    difficulty: "B2",
  },

  // ============ Part 5 — Word Form (30) ============
  {
    id: "p5-wf-001",
    part: "Part 5",
    question:
      "The marketing team made a _______ decision to launch the product in Asia first.",
    choices: {
      A: "strategy",
      B: "strategic",
      C: "strategically",
      D: "strategize",
    },
    answer: "B",
    explanation_zh:
      "空格在 a 和 decision 之間，要修飾名詞 decision，所以用形容詞 strategic（策略性的）。記住詞性：strategy（名）/ strategic（形）/ strategically（副）/ strategize（動）。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-002",
    part: "Part 5",
    question:
      "Our customer service team responded to the complaint _______.",
    choices: {
      A: "prompt",
      B: "promptly",
      C: "promptness",
      D: "prompted",
    },
    answer: "B",
    explanation_zh:
      "responded 是動詞，後面要用副詞修飾，所以用 promptly（迅速地）。形→副的常見變化：-ly。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-003",
    part: "Part 5",
    question:
      "The CEO emphasized the _______ of meeting the quarterly targets.",
    choices: {
      A: "important",
      B: "importantly",
      C: "importance",
      D: "imported",
    },
    answer: "C",
    explanation_zh:
      "the 後面要接名詞，所以用 importance（重要性）。-ance / -ence 通常是名詞字尾。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-004",
    part: "Part 5",
    question:
      "Mr. Lin is a highly _______ accountant with over fifteen years of experience.",
    choices: { A: "skill", B: "skilled", C: "skillfully", D: "skills" },
    answer: "B",
    explanation_zh:
      "highly 是副詞，後面要接形容詞修飾名詞 accountant。skilled（有技術的）是形容詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-005",
    part: "Part 5",
    question: "Please confirm your _______ at the workshop by Friday.",
    choices: {
      A: "attend",
      B: "attendance",
      C: "attendant",
      D: "attentive",
    },
    answer: "B",
    explanation_zh:
      "your + 名詞，且語意是「是否出席」，所以用 attendance（出席率／出席這件事）。attendant 是「服務員」（人）。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-006",
    part: "Part 5",
    question: "The company has expanded _______ over the past five years.",
    choices: { A: "rapid", B: "rapidly", C: "rapidness", D: "more rapid" },
    answer: "B",
    explanation_zh:
      "expanded 是動詞，要用副詞 rapidly 來修飾「擴張的方式」。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-007",
    part: "Part 5",
    question: "The new policy will significantly improve workplace _______.",
    choices: {
      A: "produce",
      B: "productive",
      C: "productively",
      D: "productivity",
    },
    answer: "D",
    explanation_zh:
      "improve 是及物動詞，後面接名詞當受詞。workplace productivity（工作場所生產力）才合理，productivity 是名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-008",
    part: "Part 5",
    question: "The presenter spoke _______ about the upcoming merger.",
    choices: {
      A: "confidence",
      B: "confident",
      C: "confidently",
      D: "confiding",
    },
    answer: "C",
    explanation_zh: "spoke 是動詞，後面用副詞 confidently（有自信地）。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-009",
    part: "Part 5",
    question:
      "The manager's _______ to meeting all project deadlines was recognized by senior leadership.",
    choices: {
      A: "dedicated",
      B: "dedication",
      C: "dedicating",
      D: "dedicatedly",
    },
    answer: "B",
    explanation_zh:
      "The manager's + 名詞（主詞），需要名詞。dedication（奉獻精神）是名詞字尾 -tion。dedicated 是形容詞，dedicating 是現在分詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-010",
    part: "Part 5",
    question:
      "The report provides a _______ analysis of current consumer behavior trends.",
    choices: {
      A: "comprehension",
      B: "comprehend",
      C: "comprehensive",
      D: "comprehensively",
    },
    answer: "C",
    explanation_zh:
      "a + 形容詞 + 名詞（analysis）。comprehensive（全面的）是形容詞，修飾 analysis。comprehension 是名詞，comprehend 是動詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-011",
    part: "Part 5",
    question:
      "Please submit your expense reports _______ to the accounting department.",
    choices: {
      A: "direct",
      B: "directing",
      C: "directly",
      D: "directness",
    },
    answer: "C",
    explanation_zh:
      "submit 是動詞，後面用副詞 directly 修飾（直接地提交）。direct 是形容詞或動詞，directness 是名詞。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-012",
    part: "Part 5",
    question:
      "The company demonstrated great _______ in responding to customer concerns.",
    choices: {
      A: "flexible",
      B: "flexibly",
      C: "flexed",
      D: "flexibility",
    },
    answer: "D",
    explanation_zh:
      "great + 名詞，所以用 flexibility（靈活性）。great 是形容詞，修飾名詞；flexible 是形容詞，flexibly 是副詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-013",
    part: "Part 5",
    question:
      "All team members are _______ to attend the mandatory compliance training.",
    choices: {
      A: "require",
      B: "requiring",
      C: "required",
      D: "requirement",
    },
    answer: "C",
    explanation_zh:
      "are required to + V 是「被要求做某事」的固定被動句型。required 在此作形容詞用。requirement 是名詞。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-014",
    part: "Part 5",
    question:
      "The new software will _______ simplify the monthly data entry process.",
    choices: {
      A: "significant",
      B: "significantly",
      C: "significance",
      D: "signify",
    },
    answer: "B",
    explanation_zh:
      "will simplify 是動詞片語，前面用副詞 significantly（大幅地）修飾。significant 是形容詞，significance 是名詞。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-015",
    part: "Part 5",
    question:
      "The HR manager is responsible for _______ all new employees during their first week.",
    choices: {
      A: "orientation",
      B: "oriented",
      C: "orienting",
      D: "orient",
    },
    answer: "C",
    explanation_zh:
      "for 是介系詞，後面接動名詞（gerund）。orienting 是動名詞，表示「為…辦理入職培訓」。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-016",
    part: "Part 5",
    question:
      "The sales team showed remarkable _______ despite difficult market conditions.",
    choices: {
      A: "resilient",
      B: "resiliently",
      C: "resilience",
      D: "resiliency",
    },
    answer: "C",
    explanation_zh:
      "showed + 名詞（受詞）。resilience（韌性/復原力）是名詞，常見TOEIC商務詞彙。resilient 是形容詞，resiliency 雖是名詞但不常用。",
    skill_tag: "word_form",
    difficulty: "B2",
  },
  {
    id: "p5-wf-017",
    part: "Part 5",
    question:
      "The _______ of the new product line exceeded the marketing team's expectations.",
    choices: {
      A: "popular",
      B: "popularize",
      C: "popularly",
      D: "popularity",
    },
    answer: "D",
    explanation_zh:
      "The + 名詞（主詞），需要名詞。popularity（受歡迎度）是名詞。popular 是形容詞，popularly 是副詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-018",
    part: "Part 5",
    question:
      "Staff are expected to maintain a _______ appearance when meeting with clients.",
    choices: {
      A: "profession",
      B: "professional",
      C: "professionally",
      D: "professionalism",
    },
    answer: "B",
    explanation_zh:
      "a + 形容詞 + 名詞（appearance），需要形容詞。professional（專業的）修飾 appearance。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-019",
    part: "Part 5",
    question:
      "The allocated budget was _______ distributed among the four departments.",
    choices: { A: "equal", B: "equalize", C: "equally", D: "equality" },
    answer: "C",
    explanation_zh:
      "was distributed 是動詞，前面用副詞 equally（均等地）修飾。equal 是形容詞，equality 是名詞。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-020",
    part: "Part 5",
    question:
      "The merger led to a _______ change in the company's organizational structure.",
    choices: {
      A: "drama",
      B: "dramatic",
      C: "dramatically",
      D: "dramatize",
    },
    answer: "B",
    explanation_zh:
      "a + 形容詞 + 名詞（change），需要形容詞。dramatic（巨大的）修飾 change。drama 是名詞，dramatically 是副詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-021",
    part: "Part 5",
    question:
      "Mr. Chen gave a _______ presentation on the company's five-year expansion plans.",
    choices: {
      A: "detail",
      B: "detailed",
      C: "detailing",
      D: "detailedly",
    },
    answer: "B",
    explanation_zh:
      "a + 形容詞 + 名詞（presentation），需要形容詞。detailed（詳細的）是形容詞。detail 是名詞/動詞，detailedly 不是標準詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-022",
    part: "Part 5",
    question:
      "The front desk assistant responded to all customer inquiries with great _______.",
    choices: {
      A: "efficient",
      B: "efficiency",
      C: "efficiently",
      D: "efficiencies",
    },
    answer: "B",
    explanation_zh:
      "with great + 名詞，efficiency（效率）是名詞。great 修飾名詞，所以選名詞 efficiency。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-023",
    part: "Part 5",
    question:
      "The entire team worked _______ to complete the project before the launch date.",
    choices: {
      A: "tirelessly",
      B: "tireless",
      C: "tire",
      D: "tiring",
    },
    answer: "A",
    explanation_zh:
      "worked 是動詞，後面用副詞 tirelessly（不知疲倦地）修飾工作方式。tireless 是形容詞，tiring 是「令人疲倦的」。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-024",
    part: "Part 5",
    question:
      "Employees surveyed said they were generally _______ with their current workload.",
    choices: {
      A: "satisfy",
      B: "satisfying",
      C: "satisfied",
      D: "satisfaction",
    },
    answer: "C",
    explanation_zh:
      "were + 形容詞，描述員工的感受狀態。satisfied（感到滿意的）是描述人感受的形容詞；satisfying 是「令人滿意的」，用來描述事物。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-025",
    part: "Part 5",
    question:
      "The _______ of the renovation project was delayed due to budget constraints.",
    choices: {
      A: "completing",
      B: "completed",
      C: "complete",
      D: "completion",
    },
    answer: "D",
    explanation_zh:
      "The + 名詞（主詞）。completion（完成；竣工）是名詞，字尾 -tion。completing 是現在分詞，complete 是動詞/形容詞。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-026",
    part: "Part 5",
    question:
      "Please provide a _______ description of your previous work experience on the form.",
    choices: { A: "briefly", B: "brief", C: "brevity", D: "briefing" },
    answer: "B",
    explanation_zh:
      "a + 形容詞 + 名詞（description），需要形容詞。brief（簡短的）修飾 description。brevity 是名詞（簡潔），briefing 是名詞（簡報）。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-027",
    part: "Part 5",
    question:
      "The _______ of the service agreement requires approval from both legal and finance.",
    choices: {
      A: "renew",
      B: "renewed",
      C: "renewable",
      D: "renewal",
    },
    answer: "D",
    explanation_zh:
      "The + 名詞（主詞）。renewal（更新；續約）是名詞，字尾 -al。renew 是動詞，renewable 是形容詞（可再生的）。",
    skill_tag: "word_form",
    difficulty: "B1",
  },
  {
    id: "p5-wf-028",
    part: "Part 5",
    question:
      "All staff members are _______ for submitting their timesheets by every Friday.",
    choices: {
      A: "require",
      B: "requiring",
      C: "required",
      D: "requirement",
    },
    answer: "C",
    explanation_zh:
      "are required for/to 是固定被動句型「被要求做某事」。required 在此作形容詞用，requirement 是名詞。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-029",
    part: "Part 5",
    question:
      "The revised proposal was presented _______ by the project manager at the conference.",
    choices: {
      A: "clear",
      B: "clearing",
      C: "clearly",
      D: "clearance",
    },
    answer: "C",
    explanation_zh:
      "presented 是動詞，後面用副詞 clearly（清楚地）修飾。clear 是形容詞，clearance 是名詞（許可）。",
    skill_tag: "word_form",
    difficulty: "A2",
  },
  {
    id: "p5-wf-030",
    part: "Part 5",
    question:
      "A stable internet connection is _______ for employees who work remotely.",
    choices: {
      A: "essence",
      B: "essentially",
      C: "essential",
      D: "essentials",
    },
    answer: "C",
    explanation_zh:
      "is + 形容詞（主詞補語），essential（必要的；不可缺少的）是形容詞。essence 是名詞（本質），essentially 是副詞。",
    skill_tag: "word_form",
    difficulty: "A2",
  },

  // ============ Part 5 — Tense (15) ============
  {
    id: "p5-ts-001",
    part: "Part 5",
    question:
      "By the time the inspector arrives, the staff _______ all the safety checks.",
    choices: {
      A: "complete",
      B: "will have completed",
      C: "completed",
      D: "are completing",
    },
    answer: "B",
    explanation_zh:
      "「By the time + 現在式, 主詞 + will have + p.p.」表示「在某個未來時間點之前，動作已完成」→ 未來完成式。",
    skill_tag: "tense",
    difficulty: "B2",
  },
  {
    id: "p5-ts-002",
    part: "Part 5",
    question: "Ms. Chen _______ for the company since 2018.",
    choices: {
      A: "works",
      B: "is working",
      C: "has worked",
      D: "worked",
    },
    answer: "C",
    explanation_zh:
      "「since + 過去時間點」表示「從過去到現在持續的動作」，搭配現在完成式 has worked。",
    skill_tag: "tense",
    difficulty: "A2",
  },
  {
    id: "p5-ts-003",
    part: "Part 5",
    question:
      "While the manager _______ the report yesterday, the system suddenly crashed.",
    choices: {
      A: "reviewed",
      B: "was reviewing",
      C: "has reviewed",
      D: "reviews",
    },
    answer: "B",
    explanation_zh:
      "While 引導「正在進行的背景動作」，配過去進行式 was reviewing；後面被打斷的動作用過去式（crashed）。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-004",
    part: "Part 5",
    question:
      "The project plan _______ twice before management finally approved it.",
    choices: {
      A: "revised",
      B: "was revising",
      C: "had been revised",
      D: "has revised",
    },
    answer: "C",
    explanation_zh:
      "「before management finally approved」→ 在核准之前已完成的動作，用過去完成式被動：had been revised。表示「更早發生的過去事件」。",
    skill_tag: "tense",
    difficulty: "B2",
  },
  {
    id: "p5-ts-005",
    part: "Part 5",
    question:
      "By the end of this fiscal year, the team _______ over two hundred new client accounts.",
    choices: {
      A: "manages",
      B: "is managing",
      C: "has managed",
      D: "will have managed",
    },
    answer: "D",
    explanation_zh:
      "「by the end of this fiscal year」+ 未來時間 → 未來完成式：will have managed。表示在未來某時間點前已完成的事。",
    skill_tag: "tense",
    difficulty: "B2",
  },
  {
    id: "p5-ts-006",
    part: "Part 5",
    question:
      "The accountant _______ on the annual financial report since early this morning.",
    choices: {
      A: "worked",
      B: "works",
      C: "has been working",
      D: "will work",
    },
    answer: "C",
    explanation_zh:
      "since early this morning → 從過去持續到現在的動作，用現在完成進行式：has been working。強調動作持續進行中。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-007",
    part: "Part 5",
    question:
      "When I arrived at the office this morning, my colleagues _______ the briefing.",
    choices: {
      A: "started",
      B: "have started",
      C: "had already started",
      D: "starts",
    },
    answer: "C",
    explanation_zh:
      "arrived 是過去式（我到達時），同事在此之前已開始，用過去完成式：had already started。表示「比過去更早的動作」。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-008",
    part: "Part 5",
    question:
      "The company _______ in this city for forty years before relocating to the new building.",
    choices: {
      A: "operated",
      B: "has operated",
      C: "had operated",
      D: "is operating",
    },
    answer: "C",
    explanation_zh:
      "「before relocating」是過去動作，更早持續的動作用過去完成式：had operated。表示搬家之前已運作了四十年。",
    skill_tag: "tense",
    difficulty: "B2",
  },
  {
    id: "p5-ts-009",
    part: "Part 5",
    question:
      "Sales _______ significantly ever since the new marketing campaign was launched.",
    choices: {
      A: "grow",
      B: "grew",
      C: "have grown",
      D: "were growing",
    },
    answer: "C",
    explanation_zh:
      "ever since + 過去時間，表示從過去到現在的持續結果，用現在完成式：have grown。grow 的過去分詞是 grown。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-010",
    part: "Part 5",
    question:
      "The director _______ a phone call when the important client arrived unexpectedly.",
    choices: {
      A: "takes",
      B: "has taken",
      C: "was taking",
      D: "took",
    },
    answer: "C",
    explanation_zh:
      "客戶到達（arrived，過去）時，主任正在接電話（背景動作），用過去進行式：was taking。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-011",
    part: "Part 5",
    question:
      "We _______ a new supplier unless the current one improves its delivery times.",
    choices: {
      A: "found",
      B: "will find",
      C: "are finding",
      D: "find",
    },
    answer: "B",
    explanation_zh:
      "unless 引導條件句（除非…否則），主句用未來式：will find。條件句用現在式（improves），主句用 will。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-012",
    part: "Part 5",
    question:
      "The management team _______ expanding into the Asian market since the new CEO joined.",
    choices: {
      A: "considers",
      B: "have been considering",
      C: "considered",
      D: "will consider",
    },
    answer: "B",
    explanation_zh:
      "since the new CEO joined → 從過去持續到現在，用現在完成進行式：have been considering。主詞 team 視為複數。",
    skill_tag: "tense",
    difficulty: "B2",
  },
  {
    id: "p5-ts-013",
    part: "Part 5",
    question:
      "The client representatives _______ the quarterly report when the power outage occurred.",
    choices: {
      A: "reviewed",
      B: "were reviewing",
      C: "have reviewed",
      D: "review",
    },
    answer: "B",
    explanation_zh:
      "「when the power outage occurred」是過去打斷了正在進行的動作，用過去進行式：were reviewing。",
    skill_tag: "tense",
    difficulty: "B1",
  },
  {
    id: "p5-ts-014",
    part: "Part 5",
    question:
      "By the time the contract expires next June, we _______ with this supplier for seven years.",
    choices: {
      A: "work",
      B: "worked",
      C: "have worked",
      D: "will have worked",
    },
    answer: "D",
    explanation_zh:
      "「By the time + 現在式（expires），... will have + p.p.」→ 未來完成式：will have worked。合約到期時，合作已滿七年。",
    skill_tag: "tense",
    difficulty: "B2",
  },
  {
    id: "p5-ts-015",
    part: "Part 5",
    question:
      "The client has _______ several follow-up emails but has not yet received a response.",
    choices: { A: "send", B: "sending", C: "sent", D: "sends" },
    answer: "C",
    explanation_zh:
      "has 後面要接過去分詞，send 的過去分詞是 sent，所以正確答案是 has sent。",
    skill_tag: "tense",
    difficulty: "B1",
  },

  // ============ Part 5 — Preposition (10) ============
  {
    id: "p5-pr-001",
    part: "Part 5",
    question:
      "The training session is scheduled _______ Monday at 10 a.m.",
    choices: { A: "in", B: "on", C: "at", D: "by" },
    answer: "B",
    explanation_zh:
      "星期 (Monday/Tuesday...) 前用 on；月份／年用 in；具體時間點用 at。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-002",
    part: "Part 5",
    question: "The shipment will arrive _______ three business days.",
    choices: { A: "in", B: "on", C: "at", D: "since" },
    answer: "A",
    explanation_zh:
      "「in + 一段時間」表示「再過多久之後」。on 接日期、at 接時間點、since 接起點。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-003",
    part: "Part 5",
    question:
      "The head office is located _______ the third floor of the corporate tower.",
    choices: { A: "in", B: "on", C: "at", D: "by" },
    answer: "B",
    explanation_zh:
      "樓層前用 on：on the third floor。in 接封閉空間，at 接地點（如 at the station）。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-004",
    part: "Part 5",
    question:
      "Please submit all reimbursement request forms _______ the end of the month.",
    choices: { A: "until", B: "during", C: "by", D: "along" },
    answer: "C",
    explanation_zh:
      "by 表示「不晚於...截止日」，是截止期限的固定用法。until 表「直到...為止持續」，語意不同。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-005",
    part: "Part 5",
    question:
      "The new branch manager is responsible _______ overseeing all daily operations.",
    choices: { A: "with", B: "on", C: "for", D: "of" },
    answer: "C",
    explanation_zh:
      "responsible for 是固定搭配，意思是「負責...」。be responsible for + 名詞/動名詞。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-006",
    part: "Part 5",
    question:
      "The international conference will be held _______ downtown Singapore next September.",
    choices: { A: "on", B: "at", C: "in", D: "by" },
    answer: "C",
    explanation_zh:
      "城市/地區名前用 in：in downtown Singapore。at 接具體地點（如 at the hotel）。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-007",
    part: "Part 5",
    question:
      "You can register for the upcoming seminar _______ filling out the online form.",
    choices: { A: "by", B: "with", C: "through", D: "at" },
    answer: "A",
    explanation_zh:
      "by + 動名詞表示「透過...方式」：by filling out。是固定結構，表示手段或方法。",
    skill_tag: "preposition",
    difficulty: "B1",
  },
  {
    id: "p5-pr-008",
    part: "Part 5",
    question:
      "The new procedure was officially approved _______ the safety committee after review.",
    choices: { A: "from", B: "with", C: "of", D: "by" },
    answer: "D",
    explanation_zh:
      "被動語態中，執行動作的人/機構前用 by：approved by the committee（由委員會核准）。",
    skill_tag: "preposition",
    difficulty: "A2",
  },
  {
    id: "p5-pr-009",
    part: "Part 5",
    question:
      "The new office layout is quite different _______ what we were used to before.",
    choices: { A: "to", B: "from", C: "with", D: "than" },
    answer: "B",
    explanation_zh:
      "different from 是固定搭配（美式/英式均適用）。different than 在美式英語口語中使用，但正式寫作選 from。",
    skill_tag: "preposition",
    difficulty: "B1",
  },
  {
    id: "p5-pr-010",
    part: "Part 5",
    question:
      "The department head is in charge _______ coordinating all external client meetings.",
    choices: { A: "of", B: "with", C: "for", D: "by" },
    answer: "A",
    explanation_zh:
      "in charge of 是固定搭配，意思是「負責管理/掌管...」，後接名詞或動名詞。",
    skill_tag: "preposition",
    difficulty: "A2",
  },

  // ============ Part 5 — Conjunction (10) ============
  {
    id: "p5-cj-001",
    part: "Part 5",
    question:
      "_______ the weather was poor, the outdoor event proceeded as planned.",
    choices: { A: "Despite", B: "Although", C: "Because", D: "Due to" },
    answer: "B",
    explanation_zh:
      "後面是完整子句（the weather was poor），所以要用連接詞 Although（雖然）；Despite / Due to 後面接名詞。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },
  {
    id: "p5-cj-002",
    part: "Part 5",
    question: "Please review the contract _______ you sign it.",
    choices: { A: "before", B: "during", C: "while", D: "until" },
    answer: "A",
    explanation_zh:
      "語意：簽名「之前」要先檢查合約 → before。while「當…的時候」、until「直到」、during 後面要接名詞。",
    skill_tag: "conjunction",
    difficulty: "A2",
  },
  {
    id: "p5-cj-003",
    part: "Part 5",
    question:
      "_______ the significant price increase, demand for the product remained strong.",
    choices: { A: "Although", B: "Because", C: "Despite", D: "Since" },
    answer: "C",
    explanation_zh:
      "despite 後接名詞片語（the price increase），表示「儘管」。Although 後面要接完整子句（S + V）。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },
  {
    id: "p5-cj-004",
    part: "Part 5",
    question:
      "The quarterly results exceeded expectations, _______ the board decided to increase investment.",
    choices: { A: "or", B: "so", C: "yet", D: "nor" },
    answer: "B",
    explanation_zh:
      "so 表示「因此」，前因後果。業績超出預期（因），所以董事會決定增加投資（果）。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },
  {
    id: "p5-cj-005",
    part: "Part 5",
    question:
      "_______ you experience any technical difficulties, please contact the IT helpdesk.",
    choices: { A: "While", B: "If", C: "Unless", D: "Until" },
    answer: "B",
    explanation_zh:
      "if 引導條件句「如果遇到問題的話」。unless = if not（除非），語意相反。",
    skill_tag: "conjunction",
    difficulty: "A2",
  },
  {
    id: "p5-cj-006",
    part: "Part 5",
    question:
      "The project will be put on hold _______ additional funding is approved.",
    choices: { A: "when", B: "before", C: "unless", D: "after" },
    answer: "C",
    explanation_zh:
      "unless = if not，「除非獲得更多資金，否則就會暫停」。unless 後面接子句，表達條件。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },
  {
    id: "p5-cj-007",
    part: "Part 5",
    question:
      "Employees may work from home _______ they complete all assigned tasks on time.",
    choices: { A: "although", B: "as long as", C: "in spite of", D: "due to" },
    answer: "B",
    explanation_zh:
      "as long as = provided that，「只要...就可以」，後接子句。in spite of 和 due to 後接名詞。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },
  {
    id: "p5-cj-008",
    part: "Part 5",
    question:
      "The meeting was postponed _______ the keynote speaker was unavailable that day.",
    choices: { A: "despite", B: "because", C: "although", D: "unless" },
    answer: "B",
    explanation_zh:
      "because 引導原因子句「因為主講人當天無法出席」，後接完整子句（S + V）。",
    skill_tag: "conjunction",
    difficulty: "A2",
  },
  {
    id: "p5-cj-009",
    part: "Part 5",
    question:
      "We will proceed with the order _______ we receive written confirmation from the client.",
    choices: { A: "once", B: "despite", C: "unless", D: "without" },
    answer: "A",
    explanation_zh:
      "once = as soon as，「一旦收到書面確認就立即執行」。once 後面接完整子句。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },
  {
    id: "p5-cj-010",
    part: "Part 5",
    question:
      "_______ the training session was lengthy, all participants found it highly informative.",
    choices: {
      A: "Due to",
      B: "In spite of",
      C: "Even though",
      D: "Because of",
    },
    answer: "C",
    explanation_zh:
      "even though 後接子句（the training session was lengthy），表示「即使…也」。Due to / Because of / In spite of 後面接名詞片語。",
    skill_tag: "conjunction",
    difficulty: "B1",
  },

  // ============ Part 5 — Business Vocabulary (10) ============
  {
    id: "p5-bv-001",
    part: "Part 5",
    question:
      "Our company plans to _______ a new office in Singapore next quarter.",
    choices: { A: "establish", B: "exclude", C: "exhaust", D: "explode" },
    answer: "A",
    explanation_zh:
      "establish 設立／成立。establish a new office 設立新辦公室是商務常用搭配。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["establish"],
  },
  {
    id: "p5-bv-002",
    part: "Part 5",
    question:
      "The marketing team will _______ the campaign results next Monday.",
    choices: {
      A: "evaluate",
      B: "evacuate",
      C: "elevate",
      D: "exaggerate",
    },
    answer: "A",
    explanation_zh:
      "evaluate 評估。evaluate the results 評估結果是商務常見搭配。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["evaluate"],
  },
  {
    id: "p5-bv-003",
    part: "Part 5",
    question:
      "All employees are required to _______ the new compliance policy.",
    choices: {
      A: "adhere to",
      B: "consist of",
      C: "depend on",
      D: "result in",
    },
    answer: "A",
    explanation_zh:
      "adhere to「遵守」(規則／政策)。compliance policy 是合規政策，搭配 adhere to。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["adhere to", "compliance"],
  },
  {
    id: "p5-bv-004",
    part: "Part 5",
    question:
      "The finance department will _______ the budget equally among the three regional divisions.",
    choices: {
      A: "allocate",
      B: "evacuate",
      C: "eliminate",
      D: "accumulate",
    },
    answer: "A",
    explanation_zh:
      "allocate 分配（資源/預算），是商務常用動詞。allocate the budget 分配預算是固定搭配。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["allocate"],
  },
  {
    id: "p5-bv-005",
    part: "Part 5",
    question:
      "The company agreed to _______ the service contract for another three years.",
    choices: { A: "exclude", B: "extend", C: "expand", D: "expire" },
    answer: "B",
    explanation_zh:
      "extend 延長（合約）是商務常用搭配。expand 通常指「擴大規模」，expire 是「到期」（不及物）。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["extend"],
  },
  {
    id: "p5-bv-006",
    part: "Part 5",
    question:
      "All staff members are expected to _______ with the updated workplace regulations.",
    choices: { A: "comply", B: "reply", C: "supply", D: "apply" },
    answer: "A",
    explanation_zh:
      "comply with 遵守（規定），是商務必備詞組。comply with regulations 遵守法規。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["comply with"],
  },
  {
    id: "p5-bv-007",
    part: "Part 5",
    question:
      "The two firms will _______ on the research project to share resources and expertise.",
    choices: {
      A: "compete",
      B: "collaborate",
      C: "calculate",
      D: "celebrate",
    },
    answer: "B",
    explanation_zh:
      "collaborate 合作，商務常用詞。collaborate on + 計畫＝合作進行某項目。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["collaborate"],
  },
  {
    id: "p5-bv-008",
    part: "Part 5",
    question:
      "Please _______ your original receipts to the accounting team for reimbursement.",
    choices: { A: "subscribe", B: "submit", C: "succeed", D: "support" },
    answer: "B",
    explanation_zh:
      "submit 提交（文件/單據），是商務必備動詞。submit receipts to 提交單據給...。",
    skill_tag: "business_vocabulary",
    difficulty: "A2",
    vocabulary: ["submit"],
  },
  {
    id: "p5-bv-009",
    part: "Part 5",
    question:
      "The director decided to _______ the revised policy starting from the next fiscal year.",
    choices: {
      A: "insulate",
      B: "illustrate",
      C: "implement",
      D: "indicate",
    },
    answer: "C",
    explanation_zh:
      "implement 實施/執行（政策/計畫），是商務必備動詞。implement a policy 實施政策。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["implement"],
  },
  {
    id: "p5-bv-010",
    part: "Part 5",
    question:
      "The board needs to _______ the proposed budget cuts before they take effect next month.",
    choices: { A: "appeal", B: "approve", C: "apply", D: "appoint" },
    answer: "B",
    explanation_zh:
      "approve 核准/批准（預算/計畫），是商務常用詞。approve the budget cuts 批准削減預算。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["approve"],
  },

  // ============ Part 3 — Listening (with transcripts) ============
  {
    id: "p3-mi-001",
    part: "Part 3",
    question: "What is the main topic of the conversation?",
    choices: {
      A: "Booking a hotel room",
      B: "Rescheduling a business meeting",
      C: "Hiring a new employee",
      D: "Filing a customer complaint",
    },
    answer: "B",
    explanation_zh:
      "對話開頭 W 說 'I need to push our meeting with the client to Thursday' 直接點出主題 → 改期會議。Main idea 題請聽前兩三句最關鍵的句子。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    transcript:
      "W: Hi Mark, I need to push our meeting with the client to Thursday. Something urgent came up on Tuesday morning.\nM: Thursday works for me. Should I let the client know, or will you?\nW: I'll send the email this afternoon. Could you also prepare an updated agenda?\nM: Sure. I'll have it ready by Wednesday.",
  },
  {
    id: "p3-na-001",
    part: "Part 3",
    question: "What will the man most likely do next?",
    choices: {
      A: "Send an email to the client",
      B: "Prepare an updated agenda",
      C: "Cancel Thursday's meeting",
      D: "Book a conference room",
    },
    answer: "B",
    explanation_zh:
      "Next action 題：找最後出現的 will / I'll / I'm going to。男生說 'I'll have it ready by Wednesday'，他要做的就是準備 updated agenda。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    transcript:
      "W: Hi Mark, I need to push our meeting with the client to Thursday. Something urgent came up on Tuesday morning.\nM: Thursday works for me. Should I let the client know, or will you?\nW: I'll send the email this afternoon. Could you also prepare an updated agenda?\nM: Sure. I'll have it ready by Wednesday.",
  },
  {
    id: "p3-rs-001",
    part: "Part 3",
    question: "Why is the woman calling?",
    choices: {
      A: "To request a refund",
      B: "To complain about a delivery",
      C: "To change a delivery address",
      D: "To track a missing package",
    },
    answer: "C",
    explanation_zh:
      "Reason / purpose 題：女生說 'I'd like to update the delivery address on my order'，這就是來電目的 → 改地址。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    transcript:
      "W: Hi, I'd like to update the delivery address on my order. The order number is 88421.\nM: Of course. May I have the new address, please?\nW: Yes, it's 220 Riverside Avenue, Suite 5.\nM: Got it. The change will be applied within the next hour.",
  },

  // ============ Part 4 — Listening (announcements / talks) ============
  {
    id: "p4-mi-001",
    part: "Part 4",
    question: "What is the announcement mainly about?",
    choices: {
      A: "A change in office hours",
      B: "A scheduled system maintenance",
      C: "A new vacation policy",
      D: "An employee training program",
    },
    answer: "B",
    explanation_zh:
      "前兩句直接說 'our internal systems will be temporarily unavailable due to scheduled maintenance' → 主題是系統維護。Part 4 的 main idea 通常都在開頭。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    transcript:
      "Attention all staff: this Saturday, from 10 p.m. to 2 a.m., our internal systems will be temporarily unavailable due to scheduled maintenance. During this time, you will not be able to access email, the company portal, or shared drives. Please save any important work before 9 p.m. on Saturday. If you have urgent issues, contact the IT helpdesk at extension 4500.",
  },
  {
    id: "p4-na-001",
    part: "Part 4",
    question: "What are listeners asked to do before 9 p.m. on Saturday?",
    choices: {
      A: "Submit a maintenance request",
      B: "Save any important work",
      C: "Restart their computers",
      D: "Email the helpdesk",
    },
    answer: "B",
    explanation_zh:
      "Next action / instruction 題：直接聽 'Please save any important work before 9 p.m. on Saturday'。聽到 please / make sure / be sure to 後面的動作通常就是答案。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    transcript:
      "Attention all staff: this Saturday, from 10 p.m. to 2 a.m., our internal systems will be temporarily unavailable due to scheduled maintenance. During this time, you will not be able to access email, the company portal, or shared drives. Please save any important work before 9 p.m. on Saturday. If you have urgent issues, contact the IT helpdesk at extension 4500.",
  },
  {
    id: "p4-lc-001",
    part: "Part 4",
    question: "Where is this announcement most likely being made?",
    choices: {
      A: "At an airport",
      B: "At a department store",
      C: "On a train",
      D: "At a hotel",
    },
    answer: "C",
    explanation_zh:
      "關鍵字：'arriving at Central Station in approximately ten minutes' 和 'please make sure you have all your luggage' → 是火車（train）廣播。Location 題請抓地點線索字。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    transcript:
      "Ladies and gentlemen, we will be arriving at Central Station in approximately ten minutes. Before exiting, please make sure you have all your luggage with you. The doors on the right-hand side will open at the platform. Thank you for traveling with us today.",
  },
];

export function getQuestionsByPart(part: Question["part"]): Question[] {
  return QUESTIONS.filter((q) => q.part === part);
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

export function getQuestionsBySkill(skill: SkillTag): Question[] {
  return QUESTIONS.filter((q) => q.skill_tag === skill);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const WEAK_SKILL_TAGS: SkillTag[] = ["word_form", "passive_voice"];

export function buildDailyPlan(options?: {
  weakCount?: number;
  newCount?: number;
  listeningCount?: number;
  reviewIds?: string[];
}): Question[] {
  const weakCount = options?.weakCount ?? 10;
  const newCount = options?.newCount ?? 10;
  const listeningCount = options?.listeningCount ?? 3;
  const reviewIds = options?.reviewIds ?? [];
  const reviewIdSet = new Set(reviewIds);

  const part5Pool = getQuestionsByPart("Part 5").filter(
    (q) => !reviewIdSet.has(q.id)
  );

  const weakPool = shuffle(
    part5Pool.filter((q) => WEAK_SKILL_TAGS.includes(q.skill_tag))
  );
  const weakQs = weakPool.slice(0, weakCount);

  if (weakQs.length < weakCount) {
    console.warn(
      `[buildDailyPlan] 弱點題庫不足，只有 ${weakQs.length}/${weakCount} 題`
    );
  }

  const usedIds = new Set([...reviewIds, ...weakQs.map((q) => q.id)]);
  const otherPool = shuffle(
    part5Pool.filter((q) => !usedIds.has(q.id))
  );
  const newQs = otherPool.slice(0, newCount);

  if (newQs.length < newCount) {
    console.warn(
      `[buildDailyPlan] 新題題庫不足，只有 ${newQs.length}/${newCount} 題`
    );
  }

  const listeningPool = shuffle(
    [...getQuestionsByPart("Part 3"), ...getQuestionsByPart("Part 4")].filter(
      (q) => !reviewIdSet.has(q.id)
    )
  );
  const listeningQs = listeningPool.slice(0, listeningCount);

  const reviewQs = reviewIds
    .map((id) => getQuestionById(id))
    .filter((q): q is Question => Boolean(q))
    .slice(0, 5);

  return [...weakQs, ...newQs, ...listeningQs, ...reviewQs];
}
