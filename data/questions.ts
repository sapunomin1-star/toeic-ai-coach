import type { Question } from "@/types/question";
import type { SkillTag } from "@/types/question";
import { GENERATED_QUESTIONS } from "./questions-generated";

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
    vocabulary: ["safety guidelines","employees","distribute"],
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
    vocabulary: ["laptops","IT department","assign to staff"],
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
    vocabulary: ["quarterly report","regional manager","send to"],
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
    vocabulary: ["conference room","board meeting","prepare"],
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
    vocabulary: ["applications","application deadline","submit"],
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
    vocabulary: ["package","deliver","office"],
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
    vocabulary: ["employees","informed","renovation"],
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
    vocabulary: ["proposal","review thoroughly","committee","approve"],
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
    vocabulary: ["annual meeting","postpone","scheduling conflicts"],
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
    vocabulary: ["employee ID cards","reception desk","issue"],
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
    vocabulary: ["budget proposal","finance committee","review"],
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
    vocabulary: ["financial results","investors","quarterly briefing","present"],
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
    vocabulary: ["visitors","sign in","front desk","enter the building"],
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
    vocabulary: ["safety procedures","incident","update"],
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
    vocabulary: ["client complaint","customer relations manager","handle directly"],
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
    vocabulary: ["welcome package","new employee","first day"],
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
    vocabulary: ["damaged goods","supplier","replacement","send back"],
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
    vocabulary: ["employee database","IT team","over the weekend","updates"],
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
    vocabulary: ["cafeteria menu","majority of employees","appreciate"],
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
    vocabulary: ["invoice","receipt","late payment fees","within thirty days"],
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
    vocabulary: ["contracts","legal counsel","either party","review"],
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
    vocabulary: ["renovation work","carry out","office remains open"],
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
    vocabulary: ["accounting system","throughout the company","last quarter","implement"],
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
    vocabulary: ["presentation materials","registered participants","in advance","send"],
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
    vocabulary: ["terms of the agreement","both parties","finalize","project"],
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
    vocabulary: ["marketing team","strategic decision","launch the product","Asia"],
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
    vocabulary: ["customer service team","complaint","respond promptly"],
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
    vocabulary: ["CEO","emphasize","quarterly targets","importance"],
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
    vocabulary: ["accountant","skilled","years of experience"],
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
    vocabulary: ["confirm","attendance","workshop"],
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
    vocabulary: ["expand rapidly","over the past five years","company"],
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
    vocabulary: ["new policy","workplace productivity","improve"],
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
    vocabulary: ["presenter","upcoming merger","speak confidently"],
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
    vocabulary: ["dedication","project deadlines","senior leadership","recognized"],
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
    vocabulary: ["comprehensive analysis","consumer behavior","trends","report"],
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
    vocabulary: ["expense reports","accounting department","submit directly"],
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
    vocabulary: ["demonstrate flexibility","customer concerns","responding to"],
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
    vocabulary: ["team members","mandatory compliance training","required to attend"],
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
    vocabulary: ["software","data entry process","significantly simplify"],
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
    vocabulary: ["HR manager","responsible for","orienting new employees"],
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
    vocabulary: ["sales team","market conditions","resilience"],
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
    vocabulary: ["product line","marketing team","popularity","expectations"],
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
    vocabulary: ["professional appearance","meet with clients","staff"],
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
    vocabulary: ["allocated budget","distributed equally","departments"],
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
    vocabulary: ["merger","organizational structure","dramatic change"],
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
    vocabulary: ["detailed presentation","expansion plans","five-year"],
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
    vocabulary: ["front desk assistant","customer inquiries","efficiency"],
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
    vocabulary: ["entire team","worked tirelessly","launch date","complete the project"],
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
    vocabulary: ["employees surveyed","current workload","satisfied"],
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
    vocabulary: ["renovation project","budget constraints","completion","delayed"],
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
    vocabulary: ["brief description","previous work experience","form"],
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
    vocabulary: ["service agreement","renewal","legal and finance","approval"],
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
    vocabulary: ["staff members","timesheets","responsible for submitting"],
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
    vocabulary: ["revised proposal","project manager","presented clearly","conference"],
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
    vocabulary: ["stable internet connection","work remotely","essential"],
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
    vocabulary: ["inspector","safety checks","complete"],
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
    vocabulary: ["company","since 2018","work for"],
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
    vocabulary: ["manager","review the report","system crashed"],
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
    vocabulary: ["project plan","management","approve","revise"],
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
    vocabulary: ["fiscal year","client accounts","manage"],
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
    vocabulary: ["accountant","annual financial report","early this morning"],
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
    vocabulary: ["colleagues","briefing","arrived at the office"],
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
    vocabulary: ["relocating","new building","operate in this city"],
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
    vocabulary: ["sales","marketing campaign","significantly","launched"],
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
    vocabulary: ["director","phone call","important client","unexpectedly"],
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
    vocabulary: ["supplier","delivery times","improve"],
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
    vocabulary: ["management team","Asian market","new CEO","expanding into"],
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
    vocabulary: ["client representatives","quarterly report","power outage","review"],
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
    vocabulary: ["contract expires","supplier","next June"],
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
    vocabulary: ["client","follow-up emails","receive a response"],
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
    vocabulary: ["training session","scheduled","Monday at 10 a.m."],
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
    vocabulary: ["shipment","arrive","business days"],
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
    vocabulary: ["head office","third floor","corporate tower","located"],
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
    vocabulary: ["reimbursement request forms","end of the month","submit"],
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
    vocabulary: ["branch manager","responsible for","daily operations","overseeing"],
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
    vocabulary: ["international conference","downtown Singapore","next September","held"],
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
    vocabulary: ["upcoming seminar","online form","register for","filling out"],
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
    vocabulary: ["new procedure","safety committee","approved by","after review"],
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
    vocabulary: ["office layout","different from","used to"],
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
    vocabulary: ["department head","in charge of","coordinating","client meetings"],
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
    vocabulary: ["weather was poor","outdoor event","proceeded as planned"],
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
    vocabulary: ["review the contract","sign it","before"],
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
    vocabulary: ["price increase","demand","remained strong","despite"],
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
    vocabulary: ["quarterly results","exceeded expectations","board","increase investment"],
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
    vocabulary: ["technical difficulties","IT helpdesk","contact"],
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
    vocabulary: ["put on hold","additional funding","approved"],
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
    vocabulary: ["work from home","assigned tasks","on time","as long as"],
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
    vocabulary: ["meeting postponed","keynote speaker","unavailable"],
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
    vocabulary: ["proceed with the order","written confirmation","client"],
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
    vocabulary: ["training session","lengthy","participants","informative"],
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
    vocabulary: ["establish","new office","next quarter"],
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
    vocabulary: ["evaluate","campaign results","marketing team"],
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
    vocabulary: ["adhere to","compliance policy","employees"],
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
    vocabulary: ["allocate","budget","regional divisions","finance department"],
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
    vocabulary: ["extend","service contract","another three years"],
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
    vocabulary: ["comply with","workplace regulations","staff members","updated"],
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
    vocabulary: ["collaborate","research project","resources","expertise"],
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
    vocabulary: ["submit","original receipts","accounting team","reimbursement"],
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
    vocabulary: ["implement","revised policy","fiscal year","director"],
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
    vocabulary: ["approve","proposed budget cuts","take effect","board"],
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
    vocabulary: ["push our meeting","client","urgent","updated agenda","send the email"],
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
    vocabulary: ["updated agenda","client","have it ready","reschedule a meeting","send an email"],
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
    vocabulary: ["delivery address","order number","new address","applied within the next hour","update"],
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
    vocabulary: ["scheduled maintenance","internal systems","company portal","shared drives","IT helpdesk","temporarily unavailable"],
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
    vocabulary: ["save important work","scheduled maintenance","company portal","shared drives","extension"],
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
    vocabulary: ["Central Station","luggage","right-hand side","platform","arriving","exiting"],
    skill_tag: "listening_inference",
    difficulty: "B1",
    transcript:
      "Ladies and gentlemen, we will be arriving at Central Station in approximately ten minutes. Before exiting, please make sure you have all your luggage with you. The doors on the right-hand side will open at the platform. Thank you for traveling with us today.",
  },
  // ─── Extended Part 5 Questions (p5-ext-001 ~ p5-ext-150) ──────────────────────
  // word_form (40 questions)
  {
    id: "p5-ext-001",
    part: "Part 5",
    question: "The company is looking for a _____ manager to lead the new project.",
    choices: { A: "experienced", B: "experience", C: "experiencing", D: "experiences" },
    answer: "A",
    explanation_zh: "修飾 manager 要用過去分詞 experienced（有經驗的），表示被動的狀態。experience 是名詞/動詞，experiencing 是現在分詞，experiences 是第三人稱動詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["experienced", "manager", "lead", "project"],
  },
  {
    id: "p5-ext-002",
    part: "Part 5",
    question: "All employees must complete the _____ training program before starting work.",
    choices: { A: "required", B: "require", C: "requiring", D: "requires" },
    answer: "A",
    explanation_zh: "修飾 training program 要用過去分詞 required（必需的），表示被動。require 是動詞原形，requiring 是現在分詞，requires 是第三人稱。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["required", "training", "program", "employee"],
  },
  {
    id: "p5-ext-003",
    part: "Part 5",
    question: "The _____ of the new software has been delayed until next month.",
    choices: { A: "install", B: "installed", C: "installing", D: "installation" },
    answer: "D",
    explanation_zh: "定詞後需要名詞 installation（安裝）作為主詞。install 是動詞，installed 是過去分詞，installing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["installation", "software", "delayed"],
  },
  {
    id: "p5-ext-004",
    part: "Part 5",
    question: "We are pleased to announce the _____ of Ms. Lin to Senior Manager.",
    choices: { A: "promote", B: "promoted", C: "promotion", D: "promoting" },
    answer: "C",
    explanation_zh: "定詞 the 後需要名詞 promotion（晉升）作為受詞。promote 是動詞，promoted 是過去分詞，promoting 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["promotion", "announce", "senior manager"],
  },
  {
    id: "p5-ext-005",
    part: "Part 5",
    question: "The report provides a detailed _____ of the current market situation.",
    choices: { A: "analyze", B: "analyzed", C: "analyzing", D: "analysis" },
    answer: "D",
    explanation_zh: "形容詞 detailed 後需要名詞 analysis（分析）。analyze 是動詞，analyzed 是過去分詞，analyzing 是現在分詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["analysis", "detailed", "market", "report"],
  },
  {
    id: "p5-ext-006",
    part: "Part 5",
    question: "Please submit your _____ for the new marketing plan by Friday.",
    choices: { A: "proposal", B: "propose", C: "proposed", D: "proposing" },
    answer: "A",
    explanation_zh: "your 後需要名詞 proposal（提案）。propose 是動詞，proposed 是過去分詞/形容詞，proposing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["proposal", "submit", "marketing plan"],
  },
  {
    id: "p5-ext-007",
    part: "Part 5",
    question: "The new regulation will have a significant _____ on the industry.",
    choices: { A: "affective", B: "affected", C: "effect", D: "affectively" },
    answer: "C",
    explanation_zh: "have an effect on 是固定搭配，effect 是名詞（影響）。affective 是形容詞（情感的），affected 是過去分詞，affectively 是副詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["effect", "regulation", "significant", "industry"],
  },
  {
    id: "p5-ext-008",
    part: "Part 5",
    question: "The manager asked for a thorough _____ of the current situation.",
    choices: { A: "evaluation", B: "evaluate", C: "evaluative", D: "evaluating" },
    answer: "A",
    explanation_zh: "形容詞 thorough 後需要名詞 evaluation（評估）。evaluate 是動詞，evaluative 是形容詞，evaluating 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["evaluation", "thorough", "current situation"],
  },
  {
    id: "p5-ext-009",
    part: "Part 5",
    question: "It is _____ that all passengers arrive at least two hours before departure.",
    choices: { A: "recommendation", B: "recommend", C: "recommended", D: "recommending" },
    answer: "C",
    explanation_zh: "It is + 過去分詞 + that... 是被動句型，表示「被建議」。recommendation 是名詞，recommend 是動詞原形，recommending 是現在分詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["recommended", "passenger", "departure"],
  },
  {
    id: "p5-ext-010",
    part: "Part 5",
    question: "The _____ of the merger was announced at the board meeting.",
    choices: { A: "completion", B: "complete", C: "completed", D: "completing" },
    answer: "A",
    explanation_zh: "定詞 the 後需要名詞 completion（完成）作為主詞。complete 是動詞/形容詞，completed 是過去分詞，completing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["completion", "merger", "announced", "board meeting"],
  },
  {
    id: "p5-ext-011",
    part: "Part 5",
    question: "We need to make a _____ decision by the end of this week.",
    choices: { A: "collective", B: "collect", C: "collection", D: "collected" },
    answer: "A",
    explanation_zh: "修飾 decision 需要形容詞 collective（集體的）。collect 是動詞，collection 是名詞，collected 是過去分詞。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["collective", "decision"],
  },
  {
    id: "p5-ext-012",
    part: "Part 5",
    question: "The software update will improve system _____ significantly.",
    choices: { A: "perform", B: "performed", C: "performing", D: "performance" },
    answer: "D",
    explanation_zh: "system 在此是名詞修飾 performance，需要名詞 performance（效能）。perform 是動詞，performed 是過去分詞，performing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["performance", "software update", "improve", "system"],
  },
  {
    id: "p5-ext-013",
    part: "Part 5",
    question: "Please ensure that all documents are _____ before the meeting.",
    choices: { A: "signature", B: "sign", C: "signed", D: "signing" },
    answer: "C",
    explanation_zh: "are 後需要過去分詞 signed（被簽署）構成被動語態。signature 是名詞，sign 是動詞原形，signing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["signed", "ensure", "documents"],
  },
  {
    id: "p5-ext-014",
    part: "Part 5",
    question: "The _____ of the new branch office is still under discussion.",
    choices: { A: "locate", B: "located", C: "location", D: "locating" },
    answer: "C",
    explanation_zh: "定詞 the 後需要名詞 location（位置）作為主詞。locate 是動詞，located 是過去分詞，locating 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["location", "branch office", "under discussion"],
  },
  {
    id: "p5-ext-015",
    part: "Part 5",
    question: "Candidates must have at least three years of _____ experience.",
    choices: { A: "professional", B: "profession", C: "professionally", D: "professor" },
    answer: "A",
    explanation_zh: "修飾 experience 需要形容詞 professional（專業的）。profession 是名詞，professionally 是副詞，professor 是教授。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["professional", "experience", "candidate"],
  },
  {
    id: "p5-ext-016",
    part: "Part 5",
    question: "The store offers a wide _____ of organic products.",
    choices: { A: "select", B: "selective", C: "selection", D: "selectively" },
    answer: "C",
    explanation_zh: "a wide selection of 是固定搭配，selection 是名詞（選擇範圍）。select 是動詞，selective 是形容詞（挑剔的），selectively 是副詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["selection", "organic", "products", "wide"],
  },
  {
    id: "p5-ext-017",
    part: "Part 5",
    question: "Effective _____ is essential for successful project management.",
    choices: { A: "communicate", B: "communicative", C: "communication", D: "communicated" },
    answer: "C",
    explanation_zh: "形容詞 Effective 後需要名詞 communication（溝通）作為主詞。communicate 是動詞，communicative 是形容詞，communicated 是過去分詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["communication", "effective", "essential", "project management"],
  },
  {
    id: "p5-ext-018",
    part: "Part 5",
    question: "The new employee showed great _____ to learn the company's procedures.",
    choices: { A: "willing", B: "willingly", C: "willingness", D: "will" },
    answer: "C",
    explanation_zh: "形容詞 great 後需要名詞 willingness（意願）。willing 是形容詞，willingly 是副詞，will 是名詞/助動詞但不符合此處語意。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["willingness", "employee", "procedures"],
  },
  {
    id: "p5-ext-019",
    part: "Part 5",
    question: "After hours of discussion, the board reached a _____.",
    choices: { A: "conclude", B: "conclusive", C: "conclusion", D: "concluding" },
    answer: "C",
    explanation_zh: "reach a conclusion 是固定搭配（達成結論）。conclude 是動詞，conclusive 是形容詞，concluding 是現在分詞。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["conclusion", "board", "discussion"],
  },
  {
    id: "p5-ext-020",
    part: "Part 5",
    question: "We appreciate your continued _____ in our company's success.",
    choices: { A: "investment", B: "invest", C: "invested", D: "investing" },
    answer: "A",
    explanation_zh: "形容詞 continued 後需要名詞 investment（投資）。invest 是動詞，invested 是過去分詞，investing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["investment", "appreciate", "continued", "success"],
  },
  {
    id: "p5-ext-021",
    part: "Part 5",
    question: "The _____ of the new building is scheduled for next spring.",
    choices: { A: "construct", B: "constructing", C: "constructed", D: "construction" },
    answer: "D",
    explanation_zh: "定詞 the 後需要名詞 construction（建造）作為主詞。construct 是動詞，constructed 是過去分詞，constructing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["construction", "building", "scheduled"],
  },
  {
    id: "p5-ext-022",
    part: "Part 5",
    question: "The _____ of the products will be checked by the quality control team.",
    choices: { A: "qualify", B: "qualified", C: "quality", D: "qualification" },
    answer: "C",
    explanation_zh: "定詞 the 後需要名詞 quality（品質）作為主詞。quality 也可作名詞修飾語。qualify 是動詞，qualified 是形容詞，qualification 是資格。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["quality", "quality control", "checked"],
  },
  {
    id: "p5-ext-023",
    part: "Part 5",
    question: "Our main _____ is to expand into the Asian market by 2027.",
    choices: { A: "prioritize", B: "prioritizing", C: "prioritized", D: "priority" },
    answer: "D",
    explanation_zh: "形容詞 main 後需要名詞 priority（優先事項）。prioritize 是動詞，prioritized 是過去分詞，prioritizing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["priority", "expand", "market"],
  },
  {
    id: "p5-ext-024",
    part: "Part 5",
    question: "The technician performed a thorough _____ of the equipment.",
    choices: { A: "inspect", B: "inspecting", C: "inspected", D: "inspection" },
    answer: "D",
    explanation_zh: "形容詞 thorough 後需要名詞 inspection（檢查）。inspect 是動詞，inspected 是過去分詞，inspecting 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["inspection", "technician", "equipment", "thorough"],
  },
  {
    id: "p5-ext-025",
    part: "Part 5",
    question: "Please accept our sincere _____ for the inconvenience caused.",
    choices: { A: "apologize", B: "apologizing", C: "apologetic", D: "apologies" },
    answer: "D",
    explanation_zh: "形容詞 sincere 後需要名詞 apologies（歉意）。apologize 是動詞，apologetic 是形容詞，apologizing 是動名詞。apologies 常用複數形式。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["apologies", "sincere", "inconvenience"],
  },
  {
    id: "p5-ext-026",
    part: "Part 5",
    question: "The _____ of the annual conference has been confirmed for June.",
    choices: { A: "scheduled", B: "scheduling", C: "schedule", D: "scheduler" },
    answer: "C",
    explanation_zh: "定詞 the 後需要名詞 schedule（行程表）。scheduled 是形容詞/過去分詞，scheduling 是動名詞，scheduler 是排程人員。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["schedule", "annual", "conference", "confirmed"],
  },
  {
    id: "p5-ext-027",
    part: "Part 5",
    question: "All applicants must have strong _____ skills.",
    choices: { A: "analysis", B: "analyst", C: "analyze", D: "analytical" },
    answer: "D",
    explanation_zh: "修飾 skills 需要形容詞 analytical（分析性的）。analysis 是名詞，analyze 是動詞，analyst 是分析師。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["analytical", "applicant", "skills"],
  },
  {
    id: "p5-ext-028",
    part: "Part 5",
    question: "The _____ of the factory will create over 200 new jobs.",
    choices: { A: "expand", B: "expanse", C: "expansion", D: "expansive" },
    answer: "C",
    explanation_zh: "定詞 the 後需要名詞 expansion（擴張）。expand 是動詞，expanse 是廣闊的空間，expansive 是形容詞（廣闊的）。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["expansion", "factory", "create", "jobs"],
  },
  {
    id: "p5-ext-029",
    part: "Part 5",
    question: "The sales team achieved _____ results this quarter.",
    choices: { A: "impress", B: "impression", C: "impressive", D: "impressed" },
    answer: "C",
    explanation_zh: "修飾 results 需要形容詞 impressive（令人印象深刻的）。impress 是動詞，impression 是名詞，impressed 是過去分詞（感到印象深刻的）。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["impressive", "results", "sales team", "quarter"],
  },
  {
    id: "p5-ext-030",
    part: "Part 5",
    question: "We need to consider the _____ and disadvantages of each option carefully.",
    choices: { A: "advantageous", B: "advantage", C: "advantages", D: "advantaged" },
    answer: "C",
    explanation_zh: "and disadvantages 前需要複數名詞 advantages，形成 advantages and disadvantages（優缺點）。advantageous 是形容詞，advantage 是單數，advantaged 是形容詞。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["advantages and disadvantages", "consider", "option", "carefully"],
  },
  {
    id: "p5-ext-031",
    part: "Part 5",
    question: "The _____ of customer feedback helps us improve our services.",
    choices: { A: "collective", B: "collecting", C: "collector", D: "collection" },
    answer: "D",
    explanation_zh: "定詞 the 後需要名詞 collection（收集）。collective 是形容詞（集體的），collector 是收藏家，collecting 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["collection", "customer feedback", "improve", "services"],
  },
  {
    id: "p5-ext-032",
    part: "Part 5",
    question: "Our company _____ in providing IT solutions for small businesses.",
    choices: { A: "specialization", B: "specialized", C: "specializes", D: "special" },
    answer: "C",
    explanation_zh: "主詞 company 是第三人稱單數，需要動詞 specializes（專門從事）。specialization 是名詞，specialized 是過去分詞/形容詞，special 是形容詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["specializes", "IT solutions", "small businesses"],
  },
  {
    id: "p5-ext-033",
    part: "Part 5",
    question: "The new safety training aims to improve workplace _____.",
    choices: { A: "safe", B: "safely", C: "safety", D: "safer" },
    answer: "C",
    explanation_zh: "workplace safety（工作場所安全）是固定名詞片語。safe 是形容詞，safely 是副詞，safer 是比較級形容詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["safety", "workplace", "safety training"],
  },
  {
    id: "p5-ext-034",
    part: "Part 5",
    question: "We have received _____ from several suppliers for the project.",
    choices: { A: "quote", B: "quoted", C: "quoting", D: "quotations" },
    answer: "D",
    explanation_zh: "received 後需要名詞受詞 quotations（報價）。quote 是動詞/口語名詞，quoting 是動名詞，quoted 是過去分詞。from several suppliers 暗示複數。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["quotations", "suppliers", "received"],
  },
  {
    id: "p5-ext-035",
    part: "Part 5",
    question: "The _____ of the department will be announced next week.",
    choices: { A: "restructure", B: "restructures", C: "restructured", D: "restructuring" },
    answer: "D",
    explanation_zh: "定詞 the 後需要名詞 restructuring（重組）作為主詞。restructure 是動詞，restructured 是過去分詞，restructures 是第三人稱動詞。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["restructuring", "department", "announced"],
  },
  {
    id: "p5-ext-036",
    part: "Part 5",
    question: "_____ details can be found in the attached document.",
    choices: { A: "Far", B: "Farther", C: "Further", D: "Farthest" },
    answer: "C",
    explanation_zh: "Further details（更多細節）是固定用法。far 是副詞（遠），farther 是距離上的更遠，farthest 是最高級。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["further", "details", "attached", "document"],
  },
  {
    id: "p5-ext-037",
    part: "Part 5",
    question: "The success of the event was largely due to careful _____.",
    choices: { A: "planner", B: "planned", C: "planning", D: "plans" },
    answer: "C",
    explanation_zh: "形容詞 careful 後需要名詞 planning（規劃）。planner 是規劃者，planned 是過去分詞/形容詞，plans 是名詞複數但 careful plans 語意不同。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["planning", "success", "event", "careful"],
  },
  {
    id: "p5-ext-038",
    part: "Part 5",
    question: "The hotel offers a _____ of room types to suit different needs.",
    choices: { A: "various", B: "variety", C: "vary", D: "variable" },
    answer: "B",
    explanation_zh: "a variety of（各種各樣的）是固定搭配。various 是形容詞，vary 是動詞，variable 是形容詞/名詞（可變的/變數）。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["variety", "hotel", "room types", "suit"],
  },
  {
    id: "p5-ext-039",
    part: "Part 5",
    question: "We are looking for someone with strong _____ abilities.",
    choices: { A: "leader", B: "leadership", C: "leading", D: "lead" },
    answer: "B",
    explanation_zh: "修飾 abilities 需要名詞 leadership（領導力）作名詞修飾語。leader 是領導者，leading 是形容詞/現在分詞，lead 是動詞/名詞。",
    skill_tag: "word_form",
    difficulty: "B1",
    vocabulary: ["leadership", "abilities", "looking for"],
  },
  {
    id: "p5-ext-040",
    part: "Part 5",
    question: "The _____ of the new system took longer than expected.",
    choices: { A: "implement", B: "implementation", C: "implemented", D: "implementing" },
    answer: "B",
    explanation_zh: "定詞 the 後需要名詞 implementation（實施）作為主詞。implement 是動詞，implemented 是過去分詞，implementing 是動名詞。",
    skill_tag: "word_form",
    difficulty: "B2",
    vocabulary: ["implementation", "system", "expected"],
  },
  // passive_voice (25 questions)
  {
    id: "p5-ext-041",
    part: "Part 5",
    question: "All employees _____ about the new policy at yesterday's meeting.",
    choices: { A: "were informed", B: "informed", C: "have informed", D: "are informing" },
    answer: "A",
    explanation_zh: "employees 是被通知的對象，應用被動語態 were informed。at yesterday's meeting 提示過去時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["informed", "policy", "employee"],
  },
  {
    id: "p5-ext-042",
    part: "Part 5",
    question: "The conference _____ at the Grand Hyatt Hotel next year.",
    choices: { A: "will be held", B: "will hold", C: "is holding", D: "has held" },
    answer: "A",
    explanation_zh: "conference 是被舉行的，應用被動語態 will be held。next year 提示未來時間。hold 是及物動詞，需要受詞。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["conference", "held", "next year"],
  },
  {
    id: "p5-ext-043",
    part: "Part 5",
    question: "Applications for the position must _____ by March 15th.",
    choices: { A: "be submitted", B: "submit", C: "be submitting", D: "have submitted" },
    answer: "A",
    explanation_zh: "Applications 是被提交的，情態動詞 must 後應用被動式 be submitted。submit 是主動，be submitting 是進行式，have submitted 是完成式。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["submitted", "applications", "position"],
  },
  {
    id: "p5-ext-044",
    part: "Part 5",
    question: "The contract _____ by the legal team before it was signed.",
    choices: { A: "has reviewed", B: "was reviewing", C: "was reviewed", D: "reviewed" },
    answer: "C",
    explanation_zh: "contract 是被審閱的，應用被動語態 was reviewed。before it was signed 提示過去時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["reviewed", "contract", "legal team", "signed"],
  },
  {
    id: "p5-ext-045",
    part: "Part 5",
    question: "Customers _____ that delivery may take up to two weeks.",
    choices: { A: "have been notified", B: "have notified", C: "are notifying", D: "notified" },
    answer: "A",
    explanation_zh: "Customers 是被通知的對象，應用被動語態 have been notified。that 子句是通知的內容。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["notified", "customers", "delivery"],
  },
  {
    id: "p5-ext-046",
    part: "Part 5",
    question: "The documents _____ to the head office yesterday morning.",
    choices: { A: "were sent", B: "have sent", C: "are sending", D: "sent" },
    answer: "A",
    explanation_zh: "documents 是被寄送的，應用被動語態 were sent。yesterday morning 提示過去時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["sent", "documents", "head office"],
  },
  {
    id: "p5-ext-047",
    part: "Part 5",
    question: "The annual report _____ by the accounting department right now.",
    choices: { A: "is preparing", B: "prepares", C: "has prepared", D: "is being prepared" },
    answer: "D",
    explanation_zh: "report 是被準備的，應用被動語態 is being prepared（正在被準備）。right now 提示現在進行式。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["prepared", "annual report", "accounting department"],
  },
  {
    id: "p5-ext-048",
    part: "Part 5",
    question: "The meeting _____ because of a scheduling conflict.",
    choices: { A: "postponed", B: "postpones", C: "has postponed", D: "was postponed" },
    answer: "D",
    explanation_zh: "meeting 是被延期的，應用被動語態 was postponed。because of a scheduling conflict 是原因。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["postponed", "meeting", "scheduling conflict"],
  },
  {
    id: "p5-ext-049",
    part: "Part 5",
    question: "The new software _____ by our IT team since last month.",
    choices: { A: "is testing", B: "tests", C: "tested", D: "has been tested" },
    answer: "D",
    explanation_zh: "software 是被測試的，且 since last month 表示從過去持續到現在，應用現在完成式被動語態 has been tested。",
    skill_tag: "passive_voice",
    difficulty: "B2",
    vocabulary: ["has been tested", "software", "IT team", "since last month"],
  },
  {
    id: "p5-ext-050",
    part: "Part 5",
    question: "The results of the survey _____ in next month's newsletter.",
    choices: { A: "will publish", B: "have published", C: "are publishing", D: "will be published" },
    answer: "D",
    explanation_zh: "results 是被發布的，應用被動語態 will be published。next month 提示未來時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["published", "results", "survey", "newsletter"],
  },
  {
    id: "p5-ext-051",
    part: "Part 5",
    question: "The damaged goods _____ to the manufacturer for inspection.",
    choices: { A: "have been returned", B: "have returned", C: "are returning", D: "return" },
    answer: "A",
    explanation_zh: "goods 是被退回的，應用被動語態 have been returned。for inspection 表示退回的目的。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["returned", "damaged goods", "manufacturer", "inspection"],
  },
  {
    id: "p5-ext-052",
    part: "Part 5",
    question: "All invoices must _____ within 30 days of receipt.",
    choices: { A: "be paid", B: "pay", C: "have paid", D: "be paying" },
    answer: "A",
    explanation_zh: "invoices 是被支付的，情態動詞 must 後應用被動式 be paid。within 30 days 提示期限。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["paid", "invoices", "receipt"],
  },
  {
    id: "p5-ext-053",
    part: "Part 5",
    question: "The office building _____ in 2019 and has been well maintained since.",
    choices: { A: "constructed", B: "is constructed", C: "was constructed", D: "has constructed" },
    answer: "C",
    explanation_zh: "building 是被建造的，應用被動語態 was constructed。in 2019 提示過去時間點。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["constructed", "office building", "maintained"],
  },
  {
    id: "p5-ext-054",
    part: "Part 5",
    question: "The agenda _____ before the board meeting begins.",
    choices: { A: "will distribute", B: "distributes", C: "is distributing", D: "will be distributed" },
    answer: "D",
    explanation_zh: "agenda 是被分配的，應用被動語態 will be distributed。before the board meeting 提示未來時間順序。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["distributed", "agenda", "board meeting"],
  },
  {
    id: "p5-ext-055",
    part: "Part 5",
    question: "The shipment _____ due to the port strike last week.",
    choices: { A: "delayed", B: "has delayed", C: "delays", D: "was delayed" },
    answer: "D",
    explanation_zh: "shipment 是被延誤的，應用被動語態 was delayed。last week 提示過去時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["delayed", "shipment", "port strike"],
  },
  {
    id: "p5-ext-056",
    part: "Part 5",
    question: "Passengers _____ to check in at least two hours before departure.",
    choices: { A: "require", B: "have required", C: "are requiring", D: "are required" },
    answer: "D",
    explanation_zh: "Passengers 是被要求的主體，應用被動語態 are required。to check in 是要求的内容。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["required", "passengers", "check in", "departure"],
  },
  {
    id: "p5-ext-057",
    part: "Part 5",
    question: "The proposal _____ by the committee at their next meeting.",
    choices: { A: "will consider", B: "considers", C: "is considering", D: "will be considered" },
    answer: "D",
    explanation_zh: "proposal 是被審議的，應用被動語態 will be considered。at their next meeting 提示未來時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["considered", "proposal", "committee"],
  },
  {
    id: "p5-ext-058",
    part: "Part 5",
    question: "The defective products _____ from the market last month.",
    choices: { A: "recalled", B: "are recalling", C: "have recalled", D: "were recalled" },
    answer: "D",
    explanation_zh: "products 是被回收的，應用被動語態 were recalled。last month 提示過去時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["recalled", "defective", "products", "market"],
  },
  {
    id: "p5-ext-059",
    part: "Part 5",
    question: "The office _____ every day after working hours.",
    choices: { A: "cleans", B: "is cleaned", C: "has cleaned", D: "is cleaning" },
    answer: "B",
    explanation_zh: "office 是被清潔的，應用被動語態 is cleaned。every day 提示習慣性動作。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["cleaned", "office", "working hours"],
  },
  {
    id: "p5-ext-060",
    part: "Part 5",
    question: "The keynote speaker _____ by the event organizers.",
    choices: { A: "has chosen", B: "has been chosen", C: "has been choosing", D: "chose" },
    answer: "B",
    explanation_zh: "speaker 是被選中的，應用被動語態 has been chosen。by the event organizers 提示動作執行者。",
    skill_tag: "passive_voice",
    difficulty: "B2",
    vocabulary: ["chosen", "keynote speaker", "event organizers"],
  },
  {
    id: "p5-ext-061",
    part: "Part 5",
    question: "The work schedule _____ next week to accommodate the holiday.",
    choices: { A: "will adjust", B: "will be adjusted", C: "is adjusting", D: "adjusts" },
    answer: "B",
    explanation_zh: "schedule 是被調整的，應用被動語態 will be adjusted。next week 提示未來時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["adjusted", "schedule", "accommodate", "holiday"],
  },
  {
    id: "p5-ext-062",
    part: "Part 5",
    question: "This report _____ in collaboration with our overseas partners.",
    choices: { A: "prepared", B: "was prepared", C: "has prepared", D: "prepares" },
    answer: "B",
    explanation_zh: "report 是被準備的，應用被動語態 was prepared。in collaboration with 提示合作關係。",
    skill_tag: "passive_voice",
    difficulty: "B2",
    vocabulary: ["prepared", "report", "collaboration", "overseas partners"],
  },
  {
    id: "p5-ext-063",
    part: "Part 5",
    question: "The faulty equipment _____ by the technician tomorrow morning.",
    choices: { A: "will repair", B: "will be repaired", C: "is repairing", D: "repairs" },
    answer: "B",
    explanation_zh: "equipment 是被修理的，應用被動語態 will be repaired。tomorrow morning 提示未來時間。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["repaired", "faulty", "equipment", "technician"],
  },
  {
    id: "p5-ext-064",
    part: "Part 5",
    question: "All staff members _____ of the policy changes via email.",
    choices: { A: "have been informed", B: "have informed", C: "have been informing", D: "informed" },
    answer: "A",
    explanation_zh: "staff members 是被通知的，應用被動語態 have been informed。via email 提示通知方式。",
    skill_tag: "passive_voice",
    difficulty: "B2",
    vocabulary: ["informed", "staff members", "policy changes", "via email"],
  },
  {
    id: "p5-ext-065",
    part: "Part 5",
    question: "It _____ that the merger will be finalized by the end of June.",
    choices: { A: "expects", B: "is expected", C: "is expecting", D: "has expected" },
    answer: "B",
    explanation_zh: "It is expected that...（預計...）是固定被動句型。it 是形式主詞，真正主詞是 that 子句。",
    skill_tag: "passive_voice",
    difficulty: "B1",
    vocabulary: ["expected", "merger", "finalized"],
  },
  // tense (25 questions)
  {
    id: "p5-ext-066",
    part: "Part 5",
    question: "Ms. Tanaka _____ with the company since she graduated from university.",
    choices: { A: "has been working", B: "works", C: "is working", D: "worked" },
    answer: "A",
    explanation_zh: "since 搭配完成式，表示從過去到現在持續的動作，應用現在完成進行式 has been working。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["since", "graduated", "university"],
  },
  {
    id: "p5-ext-067",
    part: "Part 5",
    question: "By the time we arrive, the meeting _____ already _____.",
    choices: { A: "will have / started", B: "will / start", C: "has / started", D: "is / starting" },
    answer: "A",
    explanation_zh: "By the time 搭配未來完成式 will have started，表示在未來某時間點之前已經完成的動作。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["by the time", "already", "started"],
  },
  {
    id: "p5-ext-068",
    part: "Part 5",
    question: "The manager _____ a report when I entered her office.",
    choices: { A: "reviews", B: "has reviewed", C: "was reviewing", D: "is reviewing" },
    answer: "C",
    explanation_zh: "when 子句用過去式 entered，主句表示在那個時間點正在進行的動作，用過去進行式 was reviewing。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["reviewing", "report", "entered"],
  },
  {
    id: "p5-ext-069",
    part: "Part 5",
    question: "I _____ Mr. Kim since he transferred to the Seoul office.",
    choices: { A: "didn't see", B: "don't see", C: "haven't seen", D: "wasn't seeing" },
    answer: "C",
    explanation_zh: "since 子句表示過去時間點，主句應用現在完成式 haven't seen，表示從過去到現在的情況。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["since", "transferred", "Seoul office"],
  },
  {
    id: "p5-ext-070",
    part: "Part 5",
    question: "The company _____ a new branch in Ho Chi Minh City next year.",
    choices: { A: "opens", B: "was opening", C: "has opened", D: "will open" },
    answer: "D",
    explanation_zh: "next year 提示未來時間，應用未來式 will open。opens 用於 scheduled event，但此處是計畫性未來。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["will open", "branch", "next year"],
  },
  {
    id: "p5-ext-071",
    part: "Part 5",
    question: "She _____ in the marketing department before joining our team.",
    choices: { A: "works", B: "has worked", C: "had worked", D: "is working" },
    answer: "C",
    explanation_zh: "before joining our team 表示過去時間點，「在加入之前已經工作過」，應用過去完成式 had worked。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["had worked", "marketing department", "joining"],
  },
  {
    id: "p5-ext-072",
    part: "Part 5",
    question: "Please wait here until the manager _____ you.",
    choices: { A: "will call", B: "is calling", C: "called", D: "calls" },
    answer: "D",
    explanation_zh: "until 引導的時間副詞子句用現在式代替未來式，所以用 calls。will call 不能用在時間子句中。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["until", "manager", "wait"],
  },
  {
    id: "p5-ext-073",
    part: "Part 5",
    question: "The new regulations _____ into effect next April.",
    choices: { A: "come", B: "are coming", C: "will come", D: "have come" },
    answer: "A",
    explanation_zh: "法令生效是既定時程表，用現在式 come 表示 scheduled future event。也可用 will come，但 come 更符合正式公告語氣。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["regulations", "come into effect"],
  },
  {
    id: "p5-ext-074",
    part: "Part 5",
    question: "I _____ the email before you called me this morning.",
    choices: { A: "already sent", B: "already send", C: "have already sent", D: "had already sent" },
    answer: "D",
    explanation_zh: "before you called 表示過去時間點，而在那之前已經寄出的 email 應用過去完成式 had already sent。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["already", "sent", "before"],
  },
  {
    id: "p5-ext-075",
    part: "Part 5",
    question: "The CEO _____ a speech at the awards ceremony right now.",
    choices: { A: "gives", B: "gave", C: "has given", D: "is giving" },
    answer: "D",
    explanation_zh: "right now 提示動作正在進行，應用現在進行式 is giving。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["giving", "speech", "awards ceremony", "right now"],
  },
  {
    id: "p5-ext-076",
    part: "Part 5",
    question: "At this time next week, we _____ in Paris for the conference.",
    choices: { A: "arrive", B: "will arrive", C: "will be arriving", D: "have arrived" },
    answer: "C",
    explanation_zh: "At this time next week 表示未來具體時間點正在進行的動作，應用未來進行式 will be arriving。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["arriving", "Paris", "conference"],
  },
  {
    id: "p5-ext-077",
    part: "Part 5",
    question: "She usually _____ the early train to work.",
    choices: { A: "is taking", B: "took", C: "has taken", D: "takes" },
    answer: "D",
    explanation_zh: "usually 表示習慣性動作，應用現在簡單式 takes。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["usually", "early train", "takes"],
  },
  {
    id: "p5-ext-078",
    part: "Part 5",
    question: "I wish I _____ more time to prepare for the presentation.",
    choices: { A: "have", B: "am having", C: "will have", D: "had" },
    answer: "D",
    explanation_zh: "wish 後接過去式表示與現在事實相反的願望（虛擬語氣），所以用 had。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["wish", "prepare", "presentation"],
  },
  {
    id: "p5-ext-079",
    part: "Part 5",
    question: "We _____ a training session when the fire alarm went off.",
    choices: { A: "conducted", B: "conduct", C: "have conducted", D: "were conducting" },
    answer: "D",
    explanation_zh: "when 子句用過去式 went off，主句表示在那時正在進行的動作，應用過去進行式 were conducting。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["conducting", "training session", "fire alarm", "went off"],
  },
  {
    id: "p5-ext-080",
    part: "Part 5",
    question: "The number of employees _____ significantly over the past five years.",
    choices: { A: "has increased", B: "have increased", C: "increase", D: "are increasing" },
    answer: "A",
    explanation_zh: "The number of 是單數主詞，搭配現在完成式 has increased。over the past five years 提示從過去到現在。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["increased", "number of", "employees"],
  },
  {
    id: "p5-ext-081",
    part: "Part 5",
    question: "I will call you as soon as I _____ to the hotel.",
    choices: { A: "will get", B: "am getting", C: "got", D: "get" },
    answer: "D",
    explanation_zh: "as soon as 引導的時間副詞子句用現在式代替未來式，所以用 get。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["as soon as", "get", "hotel"],
  },
  {
    id: "p5-ext-082",
    part: "Part 5",
    question: "By next March, the company _____ its new headquarters for one year.",
    choices: { A: "will occupy", B: "will have occupied", C: "is occupying", D: "occupies" },
    answer: "B",
    explanation_zh: "By next March 表示在未來某時間點之前，for one year 表示持續一段時間，應用未來完成式 will have occupied。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["by", "occupied", "headquarters"],
  },
  {
    id: "p5-ext-083",
    part: "Part 5",
    question: "I _____ for this position for three years before I was promoted.",
    choices: { A: "worked", B: "have worked", C: "had been working", D: "am working" },
    answer: "C",
    explanation_zh: "before I was promoted 表示過去時間點，在此之前已持續三年的動作應用過去完成進行式 had been working。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["had been working", "position", "promoted"],
  },
  {
    id: "p5-ext-084",
    part: "Part 5",
    question: "The train _____ at platform 3 right now.",
    choices: { A: "arrived", B: "is arriving", C: "has arrived", D: "arrives" },
    answer: "B",
    explanation_zh: "right now 提示動作正在進行中，應用現在進行式 is arriving。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["arriving", "platform", "right now"],
  },
  {
    id: "p5-ext-085",
    part: "Part 5",
    question: "He _____ his keys and could not enter the office.",
    choices: { A: "has lost", B: "had lost", C: "loses", D: "is losing" },
    answer: "B",
    explanation_zh: "could not enter 是過去的事實，而在此之前已經弄丟鑰匙，用過去完成式 had lost 表示更早的動作。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["had lost", "keys", "enter"],
  },
  {
    id: "p5-ext-086",
    part: "Part 5",
    question: "How long _____ you _____ for the exam results?",
    choices: { A: "are / waiting", B: "have / been waiting", C: "do / wait", D: "did / wait" },
    answer: "B",
    explanation_zh: "How long 搭配現在完成進行式 have been waiting，表示從過去到現在一直在等待。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["waiting", "exam results", "how long"],
  },
  {
    id: "p5-ext-087",
    part: "Part 5",
    question: "The exhibition _____ from Monday to Friday next week.",
    choices: { A: "runs", B: "is running", C: "has run", D: "ran" },
    answer: "A",
    explanation_zh: "展覽是既定時程表，用現在式 runs 表示 scheduled future event。next week 雖然是未來，但時程表用現在式。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["exhibition", "runs", "scheduled"],
  },
  {
    id: "p5-ext-088",
    part: "Part 5",
    question: "We _____ each other since we were colleagues five years ago.",
    choices: { A: "knew", B: "have known", C: "had known", D: "know" },
    answer: "B",
    explanation_zh: "since 搭配現在完成式 have known，表示從過去到現在持續的狀態。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["known", "since", "colleagues"],
  },
  {
    id: "p5-ext-089",
    part: "Part 5",
    question: "When I arrived, the meeting _____ for thirty minutes.",
    choices: { A: "started", B: "had been going", C: "has started", D: "is going" },
    answer: "B",
    explanation_zh: "When I arrived 是過去時間點，在此之前已經進行了30分鐘的會議，應用過去完成進行式 had been going。",
    skill_tag: "tense",
    difficulty: "B2",
    vocabulary: ["arrived", "meeting", "for thirty minutes"],
  },
  {
    id: "p5-ext-090",
    part: "Part 5",
    question: "The construction of the new bridge _____ next month.",
    choices: { A: "completes", B: "will be completed", C: "has completed", D: "is completing" },
    answer: "B",
    explanation_zh: "bridge 是被完成的，next month 提示未來時間，應用被動未來式 will be completed。注意此題同時測試時態與語態。",
    skill_tag: "tense",
    difficulty: "B1",
    vocabulary: ["completed", "construction", "bridge", "next month"],
  },
  // preposition (20 questions)
  {
    id: "p5-ext-091",
    part: "Part 5",
    question: "Please refer _____ the attached document for more information.",
    choices: { A: "to", B: "for", C: "at", D: "with" },
    answer: "A",
    explanation_zh: "refer to（參閱）是固定搭配。refer for/at/with 都不是正確用法。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["refer to", "attached", "document"],
  },
  {
    id: "p5-ext-092",
    part: "Part 5",
    question: "The success of the project depends _____ everyone's cooperation.",
    choices: { A: "to", B: "on", C: "at", D: "for" },
    answer: "B",
    explanation_zh: "depend on（取決於）是固定搭配。depend to/at/for 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["depends on", "cooperation", "project"],
  },
  {
    id: "p5-ext-093",
    part: "Part 5",
    question: "We sincerely apologize _____ the delay in processing your order.",
    choices: { A: "about", B: "for", C: "with", D: "at" },
    answer: "B",
    explanation_zh: "apologize for（為...道歉）是固定搭配。apologize about/with/at 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["apologize for", "delay", "processing", "order"],
  },
  {
    id: "p5-ext-094",
    part: "Part 5",
    question: "The report provides useful insights _____ consumer behavior in Asia.",
    choices: { A: "about", B: "into", C: "of", D: "from" },
    answer: "B",
    explanation_zh: "insights into（對...的深入見解）是固定搭配。insights about/of/from 雖然口語可見，但考試標準用法是 into。",
    skill_tag: "preposition",
    difficulty: "B2",
    vocabulary: ["insights into", "consumer behavior"],
  },
  {
    id: "p5-ext-095",
    part: "Part 5",
    question: "The company has invested heavily _____ research and development.",
    choices: { A: "on", B: "in", C: "for", D: "at" },
    answer: "B",
    explanation_zh: "invest in（投資於）是固定搭配。invest on/for/at 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["invested in", "research and development"],
  },
  {
    id: "p5-ext-096",
    part: "Part 5",
    question: "This ticket entitles you _____ a free meal at the hotel restaurant.",
    choices: { A: "for", B: "with", C: "to", D: "of" },
    answer: "C",
    explanation_zh: "entitle to（使有資格獲得）是固定搭配。entitle for/with/of 都不正確。",
    skill_tag: "preposition",
    difficulty: "B2",
    vocabulary: ["entitles to", "free meal"],
  },
  {
    id: "p5-ext-097",
    part: "Part 5",
    question: "We look forward _____ hearing from you at your earliest convenience.",
    choices: { A: "for", B: "to", C: "at", D: "of" },
    answer: "B",
    explanation_zh: "look forward to（期待）是固定搭配。look forward for/at/of 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["look forward to", "hearing from", "earliest convenience"],
  },
  {
    id: "p5-ext-098",
    part: "Part 5",
    question: "The manager congratulated the team _____ their outstanding performance.",
    choices: { A: "for", B: "about", C: "on", D: "with" },
    answer: "C",
    explanation_zh: "congratulate on（祝賀）是固定搭配。congratulate for/about/with 雖然口語可見但考試標準是 on。",
    skill_tag: "preposition",
    difficulty: "B2",
    vocabulary: ["congratulated on", "outstanding performance"],
  },
  {
    id: "p5-ext-099",
    part: "Part 5",
    question: "The final cost may vary _____ the initial estimate.",
    choices: { A: "of", B: "from", C: "than", D: "with" },
    answer: "B",
    explanation_zh: "vary from（不同於）是固定搭配。vary than 是常見錯誤（受 different than 影響），vary of/with 不正確。",
    skill_tag: "preposition",
    difficulty: "B2",
    vocabulary: ["vary from", "estimate", "initial"],
  },
  {
    id: "p5-ext-100",
    part: "Part 5",
    question: "The company is known _____ its high-quality products and services.",
    choices: { A: "for", B: "by", C: "as", D: "with" },
    answer: "A",
    explanation_zh: "be known for（以...聞名）是固定搭配。be known by 不常見，be known as 是「被稱為...」。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["known for", "high-quality", "products", "services"],
  },
  {
    id: "p5-ext-101",
    part: "Part 5",
    question: "The new policy applies _____ all employees regardless of seniority.",
    choices: { A: "for", B: "with", C: "to", D: "at" },
    answer: "C",
    explanation_zh: "apply to（適用於）是固定搭配。apply for 是「申請」，apply with/at 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["applies to", "regardless of", "seniority"],
  },
  {
    id: "p5-ext-102",
    part: "Part 5",
    question: "The customer complained _____ the poor service she received.",
    choices: { A: "for", B: "of", C: "about", D: "with" },
    answer: "C",
    explanation_zh: "complain about（抱怨）是固定搭配。complain of 是「申訴某症狀」，complain for/with 不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["complained about", "poor service"],
  },
  {
    id: "p5-ext-103",
    part: "Part 5",
    question: "The board members finally reached an agreement _____ the new budget plan.",
    choices: { A: "to", B: "with", C: "on", D: "for" },
    answer: "C",
    explanation_zh: "reach an agreement on（就某事達成協議）是固定搭配。to/with/for 不適合接在 reached an agreement 後表示議題。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["reached an agreement on", "budget plan", "board members"],
  },
  {
    id: "p5-ext-104",
    part: "Part 5",
    question: "The new system differs _____ the old one in several important ways.",
    choices: { A: "of", B: "to", C: "from", D: "with" },
    answer: "C",
    explanation_zh: "differ from（不同於）是固定搭配。differ of/to/with 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["differs from", "system"],
  },
  {
    id: "p5-ext-105",
    part: "Part 5",
    question: "Please fill _____ your name and address on this registration form before the conference begins.",
    choices: { A: "out", B: "in", C: "up", D: "over" },
    answer: "B",
    explanation_zh: "fill in your name and address（填入姓名與地址）是固定用法。fill out 後通常接整份表格，fill up 是填滿，fill over 不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["fill in", "registration form", "conference", "name and address"],
  },
  {
    id: "p5-ext-106",
    part: "Part 5",
    question: "The machine stopped working due _____ a mechanical issue.",
    choices: { A: "of", B: "for", C: "to", D: "with" },
    answer: "C",
    explanation_zh: "due to（由於）是固定介係詞片語。due of/for/with 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["due to", "mechanical issue", "stopped working"],
  },
  {
    id: "p5-ext-107",
    part: "Part 5",
    question: "The company provided us _____ all the necessary equipment.",
    choices: { A: "to", B: "for", C: "with", D: "of" },
    answer: "C",
    explanation_zh: "provide with（提供）是固定搭配。provide to 是「提供給」但需搭配被動，provide for 是「供養」，provide of 不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["provided with", "necessary equipment"],
  },
  {
    id: "p5-ext-108",
    part: "Part 5",
    question: "We need to examine the proposal _____ more detail.",
    choices: { A: "with", B: "for", C: "at", D: "in" },
    answer: "D",
    explanation_zh: "in detail（詳細地）是固定搭配。with/for/at detail 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["in detail", "examine", "proposal"],
  },
  {
    id: "p5-ext-109",
    part: "Part 5",
    question: "The total amount _____ the invoice must be paid within 30 days.",
    choices: { A: "in", B: "on", C: "at", D: "to" },
    answer: "B",
    explanation_zh: "on the invoice（在發票上）是固定用法。in the invoice 指包含在發票中的內容，但「在發票上」的金額用 on。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["on the invoice", "amount", "paid"],
  },
  {
    id: "p5-ext-110",
    part: "Part 5",
    question: "I would like to thank you _____ your kind assistance.",
    choices: { A: "about", B: "for", C: "with", D: "of" },
    answer: "B",
    explanation_zh: "thank for（感謝）是固定搭配。thank about/with/of 都不正確。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["thank for", "assistance"],
  },
  // conjunction (15 questions)
  {
    id: "p5-ext-111",
    part: "Part 5",
    question: "The candidate was hired _____ she had excellent qualifications.",
    choices: { A: "although", B: "because", C: "unless", D: "while" },
    answer: "B",
    explanation_zh: "前句（被錄取）和後句（有優秀資格）是因果關係，所以用 because。although 是轉折，unless 是條件，while 是同時。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["hired", "qualifications", "because"],
  },
  {
    id: "p5-ext-112",
    part: "Part 5",
    question: "_____ the high cost, the company decided to proceed with the project.",
    choices: { A: "Despite", B: "Because", C: "Unless", D: "Besides" },
    answer: "A",
    explanation_zh: "Despite（儘管）後接名詞片語 the high cost，表示轉折。Because 後需接子句，Unless 是條件，Besides 是「除此之外」。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["despite", "high cost", "proceed"],
  },
  {
    id: "p5-ext-113",
    part: "Part 5",
    question: "You must complete the training _____ you are allowed to use the equipment.",
    choices: { A: "although", B: "because", C: "before", D: "unless" },
    answer: "C",
    explanation_zh: "先完成訓練（complete the training），然後才能使用設備（allowed to use），時間順序用 before。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["complete", "training", "allowed", "equipment"],
  },
  {
    id: "p5-ext-114",
    part: "Part 5",
    question: "The company will reimburse your travel expenses _____ you submit the receipts.",
    choices: { A: "as long as", B: "even though", C: "in spite of", D: "while" },
    answer: "A",
    explanation_zh: "as long as（只要）引導條件子句，表示報銷的條件是提交收據。even though 是轉折，in spite of 後接名詞，while 是同時。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["reimburse", "travel expenses", "submit", "receipts"],
  },
  {
    id: "p5-ext-115",
    part: "Part 5",
    question: "The meeting was canceled _____ the manager was ill.",
    choices: { A: "despite", B: "because", C: "although", D: "unless" },
    answer: "B",
    explanation_zh: "取消會議的原因是經理生病，因果關係用 because。despite/although 是轉折，unless 是條件。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["canceled", "manager", "ill"],
  },
  {
    id: "p5-ext-116",
    part: "Part 5",
    question: "_____ the results are satisfactory, we will renew the contract.",
    choices: { A: "Unless", B: "Although", C: "Provided that", D: "While" },
    answer: "C",
    explanation_zh: "Provided that（如果/假設）引導條件子句，表示續約的條件。Unless 是「除非不」否定條件，Although/While 是轉折。",
    skill_tag: "conjunction",
    difficulty: "B2",
    vocabulary: ["provided that", "satisfactory", "renew", "contract"],
  },
  {
    id: "p5-ext-117",
    part: "Part 5",
    question: "The position requires a university degree _____ at least three years of experience.",
    choices: { A: "or", B: "nor", C: "but", D: "as well as" },
    answer: "D",
    explanation_zh: "as well as（以及）表示學位和經驗兩者都需要。or 是選擇，nor 需搭配 neither，but 是轉折。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["requires", "degree", "experience"],
  },
  {
    id: "p5-ext-118",
    part: "Part 5",
    question: "She decided to accept the offer _____ the salary was lower than expected.",
    choices: { A: "because", B: "even though", C: "provided that", D: "as long as" },
    answer: "B",
    explanation_zh: "接受 offer 和薪水較低是轉折關係，用 even though（即使）。because 表原因不符合邏輯，provided that/as long as 表條件。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["accept", "offer", "salary", "lower than expected"],
  },
  {
    id: "p5-ext-119",
    part: "Part 5",
    question: "_____ you finish the report, please email it to all department heads.",
    choices: { A: "Although", B: "Once", C: "Despite", D: "Unless" },
    answer: "B",
    explanation_zh: "Once（一旦）引導時間子句，表示報告完成後立即寄出。Although 是轉折，Despite 後接名詞，Unless 是條件。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["once", "finish", "report", "department heads"],
  },
  {
    id: "p5-ext-120",
    part: "Part 5",
    question: "The insurance will not cover the cost _____ you have prior approval.",
    choices: { A: "if", B: "unless", C: "because", D: "while" },
    answer: "B",
    explanation_zh: "unless（除非）引導否定條件子句，表示「沒有事先核准就不理賠」。if 是肯定條件語意不對，because/while 不正確。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["insurance", "cover", "prior approval"],
  },
  {
    id: "p5-ext-121",
    part: "Part 5",
    question: "_____ the contract, both parties must sign the agreement.",
    choices: { A: "According to", B: "Because of", C: "In spite of", D: "In addition to" },
    answer: "A",
    explanation_zh: "According to（根據）表示依照合約內容。Because of 是原因，In spite of 是轉折，In addition to 是附加。",
    skill_tag: "preposition",
    difficulty: "B2",
    vocabulary: ["according to", "contract", "parties", "sign"],
  },
  {
    id: "p5-ext-122",
    part: "Part 5",
    question: "The new system is both faster _____ more reliable than the old one.",
    choices: { A: "or", B: "nor", C: "and", D: "but" },
    answer: "C",
    explanation_zh: "both...and...（既...又...）是固定搭配。both or/nor/but 都不正確。",
    skill_tag: "conjunction",
    difficulty: "B1",
    vocabulary: ["both", "and", "faster", "reliable"],
  },
  {
    id: "p5-ext-123",
    part: "Part 5",
    question: "We can offer you a volume discount _____ you place an order of at least 500 units.",
    choices: { A: "otherwise", B: "provided that", C: "despite", D: "although" },
    answer: "B",
    explanation_zh: "provided that（如果）引導條件子句，表示折扣的條件。otherwise 是「否則」，despite/although 是轉折。",
    skill_tag: "conjunction",
    difficulty: "B2",
    vocabulary: ["volume discount", "place an order", "provided that"],
  },
  {
    id: "p5-ext-124",
    part: "Part 5",
    question: "The shipment was delayed _____ the severe weather conditions.",
    choices: { A: "because", B: "unless", C: "even though", D: "due to" },
    answer: "D",
    explanation_zh: "due to（由於）後接名詞片語 the severe weather conditions。because 需接子句（because the weather was severe），even though/unless 語意不對。",
    skill_tag: "preposition",
    difficulty: "B1",
    vocabulary: ["due to", "severe weather", "delayed", "shipment"],
  },
  {
    id: "p5-ext-125",
    part: "Part 5",
    question: "The position requires not only a degree _____ excellent communication skills.",
    choices: { A: "or", B: "but also", C: "as well", D: "and" },
    answer: "B",
    explanation_zh: "not only...but also...（不僅...而且...）是固定搭配。not only or/as well/and 都不正確。",
    skill_tag: "conjunction",
    difficulty: "B2",
    vocabulary: ["not only", "but also", "degree", "communication skills"],
  },
  // business_vocabulary (25 questions)
  {
    id: "p5-ext-126",
    part: "Part 5",
    question: "We need to _____ the contract before the end of the fiscal year.",
    choices: { A: "sign up", B: "sign", C: "sign off", D: "sign out" },
    answer: "B",
    explanation_zh: "sign a contract（簽署合約）是常用商務搭配。sign up 是註冊，sign off 是結束通訊，sign out 是登出。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["sign", "contract", "fiscal year"],
  },
  {
    id: "p5-ext-127",
    part: "Part 5",
    question: "The company's annual _____ increased by 15 percent this year.",
    choices: { A: "benefit", B: "profit", C: "advantage", D: "interest" },
    answer: "B",
    explanation_zh: "annual profit（年度利潤）是商務搭配。benefit 是福利，advantage 是優勢，interest 是利息/興趣。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["annual profit", "increased", "percent"],
  },
  {
    id: "p5-ext-128",
    part: "Part 5",
    question: "The company is _____ a new advertising campaign next quarter.",
    choices: { A: "landing", B: "launching", C: "leading", D: "lending" },
    answer: "B",
    explanation_zh: "launch a campaign（發起活動）是常用搭配。landing 是登陸，leading 是領導，lending 是借出。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["launching", "advertising campaign", "quarter"],
  },
  {
    id: "p5-ext-129",
    part: "Part 5",
    question: "The two companies signed a _____ venture agreement yesterday.",
    choices: { A: "mutual", B: "reciprocal", C: "joint", D: "common" },
    answer: "C",
    explanation_zh: "joint venture（合資企業）是固定商務術語。mutual 是相互的，reciprocal 是互惠的，common 是共同的。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["joint venture", "agreement", "companies"],
  },
  {
    id: "p5-ext-130",
    part: "Part 5",
    question: "Our company's main _____ is to expand into the European market.",
    choices: { A: "possibility", B: "activity", C: "priority", D: "necessity" },
    answer: "C",
    explanation_zh: "main priority（首要任務）是商務搭配。activity 是活動，possibility 是可能性，necessity 是必要性。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["priority", "expand", "European market"],
  },
  {
    id: "p5-ext-131",
    part: "Part 5",
    question: "The _____ for this position is between $50,000 and $60,000 per year.",
    choices: { A: "wage", B: "salary", C: "payment", D: "revenue" },
    answer: "B",
    explanation_zh: "salary（年薪/月薪）是專業人士的薪資用語。wage 是時薪/週薪制，payment 是付款，revenue 是收入。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["salary", "position", "per year"],
  },
  {
    id: "p5-ext-132",
    part: "Part 5",
    question: "We need to _____ production to meet the growing demand.",
    choices: { A: "slow down", B: "scale down", C: "scale up", D: "break down" },
    answer: "C",
    explanation_zh: "scale up（擴大規模）是商務片語。scale down 是縮小，slow down 是放慢，break down 是故障。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["scale up", "production", "demand"],
  },
  {
    id: "p5-ext-133",
    part: "Part 5",
    question: "The company plans to _____ its operations to Southeast Asia.",
    choices: { A: "extend", B: "expend", C: "expand", D: "expense" },
    answer: "C",
    explanation_zh: "expand operations（擴展業務）是常用搭配。expend 是花費，extend 是延長，expense 是花費（名詞）。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["expand", "operations", "Southeast Asia"],
  },
  {
    id: "p5-ext-134",
    part: "Part 5",
    question: "We offer a full _____ of financial services to our clients.",
    choices: { A: "row", B: "rank", C: "rate", D: "range" },
    answer: "D",
    explanation_zh: "a range of（一系列）是常用搭配。rank 是排名/階級，rate 是比率，row 是排。full range of services 是常見商務用語。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["range", "financial services", "clients"],
  },
  {
    id: "p5-ext-135",
    part: "Part 5",
    question: "Our company's _____ is to become the leader in renewable energy.",
    choices: { A: "admission", B: "emission", C: "permission", D: "mission" },
    answer: "D",
    explanation_zh: "company mission（公司使命）是常用商務用語。emission 是排放，permission 是許可，admission 是入場/承認。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["mission", "leader", "renewable energy"],
  },
  {
    id: "p5-ext-136",
    part: "Part 5",
    question: "The company has a(n) _____ of over 5,000 employees worldwide.",
    choices: { A: "workmanship", B: "workload", C: "workshop", D: "workforce" },
    answer: "D",
    explanation_zh: "workforce（勞動力/員工總數）是商務用語。workload 是工作負荷，workshop 是工作坊，workmanship 是工藝。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["workforce", "employees", "worldwide"],
  },
  {
    id: "p5-ext-137",
    part: "Part 5",
    question: "We are currently _____ for a new project manager.",
    choices: { A: "researching", B: "requiring", C: "requesting", D: "recruiting" },
    answer: "D",
    explanation_zh: "recruit for（招募）是人力資源用語。require 是需要，request 是請求，research 是研究。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["recruiting", "project manager"],
  },
  {
    id: "p5-ext-138",
    part: "Part 5",
    question: "The order _____ department will handle your request.",
    choices: { A: "processing", B: "proceeding", C: "producing", D: "providing" },
    answer: "A",
    explanation_zh: "order processing department（訂單處理部門）是常見部門名稱。proceeding 是進行中的，producing 是生產的，providing 是提供的。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["order processing", "department", "handle", "request"],
  },
  {
    id: "p5-ext-139",
    part: "Part 5",
    question: "Please provide a detailed breakdown of the _____ for each item.",
    choices: { A: "budget", B: "cost", C: "charge", D: "fee" },
    answer: "B",
    explanation_zh: "cost of each item（每個項目的成本）是常見用法。budget 是預算，charge 是收費，fee 是費用。breakdown of costs 是常見商務用語。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["cost", "breakdown", "item"],
  },
  {
    id: "p5-ext-140",
    part: "Part 5",
    question: "The _____ of the goods during transport is covered by the seller.",
    choices: { A: "insurance", B: "assurance", C: "guarantee", D: "warranty" },
    answer: "A",
    explanation_zh: "insurance（保險）在運輸中保障貨物。assurance 是保證（信心），guarantee 是品質保證，warranty 是保固。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["insurance", "goods", "transport", "seller"],
  },
  {
    id: "p5-ext-141",
    part: "Part 5",
    question: "We hold a _____ meeting for all employees every Monday morning at 9 a.m.",
    choices: { A: "staff", B: "customer", C: "equipment", D: "delivery" },
    answer: "A",
    explanation_zh: "staff meeting（員工會議）是固定用語，且 for all employees 明確表示員工會議。customer/equipment/delivery 不符合此語境。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["staff meeting", "employees", "every Monday"],
  },
  {
    id: "p5-ext-142",
    part: "Part 5",
    question: "The company needs to improve its supply chain _____.",
    choices: { A: "management", B: "agreement", C: "requirement", D: "commitment" },
    answer: "A",
    explanation_zh: "supply chain management（供應鏈管理）是固定商務術語。agreement 是協議，requirement 是需求，commitment 是承諾。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["supply chain", "management", "improve"],
  },
  {
    id: "p5-ext-143",
    part: "Part 5",
    question: "Customer _____ about the new product has been very positive.",
    choices: { A: "feedback", B: "input", C: "output", D: "throughput" },
    answer: "A",
    explanation_zh: "customer feedback（客戶回饋）是固定用語。input 是輸入，output 是輸出，throughput 是產能/吞吐量。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["feedback", "customer", "positive"],
  },
  {
    id: "p5-ext-144",
    part: "Part 5",
    question: "The sales team is focused on _____ new clients this quarter.",
    choices: { A: "acquiring", B: "requiring", C: "inquiring", D: "enquiring" },
    answer: "A",
    explanation_zh: "acquire clients（獲取客戶）是商務用語。require 是需要，inquire/enquire 是詢問。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["acquiring", "clients", "sales team"],
  },
  {
    id: "p5-ext-145",
    part: "Part 5",
    question: "We need to _____ the agreement by the end of this fiscal year.",
    choices: { A: "finalize", B: "finance", C: "fine", D: "find" },
    answer: "A",
    explanation_zh: "finalize the agreement（完成協議）是常用搭配。finance 是融資，fine 是罰款/好的，find 是找到。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["finalize", "agreement", "fiscal year"],
  },
  {
    id: "p5-ext-146",
    part: "Part 5",
    question: "The company has a strict _____ regarding data protection.",
    choices: { A: "policy", B: "invoice", C: "shipment", D: "reservation" },
    answer: "A",
    explanation_zh: "policy（政策）可搭配 regarding data protection，表示資料保護政策。invoice 是發票，shipment 是貨運，reservation 是預訂。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["policy", "data protection", "strict"],
  },
  {
    id: "p5-ext-147",
    part: "Part 5",
    question: "Our main _____ in the Asian market is GlobalTech Corporation.",
    choices: { A: "competitor", B: "competition", C: "competitive", D: "compete" },
    answer: "A",
    explanation_zh: "main competitor（主要競爭者）是商務用語。competition 是競爭（抽象名詞），competitive 是形容詞，compete 是動詞。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["competitor", "market"],
  },
  {
    id: "p5-ext-148",
    part: "Part 5",
    question: "The _____ of the new factory will begin in March.",
    choices: { A: "construction", B: "instruction", C: "introduction", D: "production" },
    answer: "A",
    explanation_zh: "construction of factory（工廠建造）是固定用語。instruction 是說明，introduction 是介紹，production 是生產。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["construction", "factory", "begin"],
  },
  {
    id: "p5-ext-149",
    part: "Part 5",
    question: "We are now accepting _____ for the position of Financial Analyst.",
    choices: { A: "applications", B: "appliances", C: "applicants", D: "applies" },
    answer: "A",
    explanation_zh: "accept applications（接受申請）是人力資源用語。appliances 是家電，applicants 是申請人（人），applies 是動詞。",
    skill_tag: "business_vocabulary",
    difficulty: "B1",
    vocabulary: ["applications", "position", "financial analyst"],
  },
  {
    id: "p5-ext-150",
    part: "Part 5",
    question: "Shareholders will receive an annual _____ at the end of the year.",
    choices: { A: "dividend", B: "division", C: "document", D: "discount" },
    answer: "A",
    explanation_zh: "annual dividend（年度股息）是財經用語。division 是部門/除法，document 是文件，discount 是折扣。",
    skill_tag: "business_vocabulary",
    difficulty: "B2",
    vocabulary: ["dividend", "shareholders", "annual"],
  },
  // ─── Extended Part 3 Questions (p3-ext-001 ~ p3-ext-030) ──────────────────────
  {
    id: "p3-ext-001",
    part: "Part 3",
    question: "Why is the man calling?",
    choices: {
      A: "To cancel a meeting",
      B: "To reschedule a meeting",
      C: "To confirm a meeting",
      D: "To ask about a client",
    },
    answer: "B",
    explanation_zh:
      "主旨題。男士說 'I need to reschedule'（我需要改期），所以打電話的目的是重新安排會議時間。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["reschedule", "urgent", "client", "calendar", "confirmation"],
    transcript:
      "Woman: Hello, Mr. Tanaka's office.\nMan: Hi, this is David Chen from marketing. I have a meeting scheduled with Mr. Tanaka at 2 p.m. tomorrow, but I need to reschedule. An urgent client issue has come up.\nWoman: I see. Let me check his calendar. He's available on Thursday at 10 a.m. or Friday at 3 p.m.\nMan: Thursday at 10 would be perfect.\nWoman: OK, I've updated the schedule. I'll send you a confirmation email.",
  },
  {
    id: "p3-ext-002",
    part: "Part 3",
    question: "What can be inferred about the man?",
    choices: {
      A: "He works in the marketing department",
      B: "He has never met Mr. Tanaka",
      C: "He is canceling the meeting entirely",
      D: "He is running late for the meeting",
    },
    answer: "A",
    explanation_zh:
      "細節推論題。男士自我介紹時說 'this is David Chen from marketing'，可知他在行銷部門工作。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["marketing", "schedule", "available", "updated"],
    transcript:
      "Woman: Hello, Mr. Tanaka's office.\nMan: Hi, this is David Chen from marketing. I have a meeting scheduled with Mr. Tanaka at 2 p.m. tomorrow, but I need to reschedule. An urgent client issue has come up.\nWoman: I see. Let me check his calendar. He's available on Thursday at 10 a.m. or Friday at 3 p.m.\nMan: Thursday at 10 would be perfect.\nWoman: OK, I've updated the schedule. I'll send you a confirmation email.",
  },
  {
    id: "p3-ext-003",
    part: "Part 3",
    question: "What will the woman most likely do next?",
    choices: {
      A: "Call the client",
      B: "Reschedule for Friday",
      C: "Send a confirmation email",
      D: "Inform Mr. Tanaka directly",
    },
    answer: "C",
    explanation_zh:
      "下一步行動題。女士最後說 'I'll send you a confirmation email'，所以她接下來會寄確認信。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["confirmation email", "updated", "schedule", "perfect"],
    transcript:
      "Woman: Hello, Mr. Tanaka's office.\nMan: Hi, this is David Chen from marketing. I have a meeting scheduled with Mr. Tanaka at 2 p.m. tomorrow, but I need to reschedule. An urgent client issue has come up.\nWoman: I see. Let me check his calendar. He's available on Thursday at 10 a.m. or Friday at 3 p.m.\nMan: Thursday at 10 would be perfect.\nWoman: OK, I've updated the schedule. I'll send you a confirmation email.",
  },
  {
    id: "p3-ext-004",
    part: "Part 3",
    question: "What is the purpose of the woman's call?",
    choices: {
      A: "To place a new order",
      B: "To check the delivery date",
      C: "To report missing items in a shipment",
      D: "To change the shipping address",
    },
    answer: "C",
    explanation_zh:
      "主旨題。女士說 'some items are missing'（有些物品不見了），所以她打來是要回報缺貨。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["shipment", "missing", "items", "order", "warehouse"],
    transcript:
      "Man: Hello, ABC Supplies. How can I help you?\nWoman: Hi, this is Lisa Wang from TechCorp. I'm calling about order number 4582. We received the shipment this morning, but some items are missing.\nMan: I'm sorry to hear that. Can you tell me which items are missing?\nWoman: The order was for 50 laptop stands, but only 30 arrived.\nMan: Let me check our warehouse. Please hold for a moment.",
  },
  {
    id: "p3-ext-005",
    part: "Part 3",
    question: "What can be inferred about the order?",
    choices: {
      A: "It was shipped to the wrong address",
      B: "It was only partially fulfilled",
      C: "It arrived earlier than expected",
      D: "It was canceled by the company",
    },
    answer: "B",
    explanation_zh:
      "推論題。訂了 50 個但只到了 30 個，表示訂單只有部分出貨（partially fulfilled）。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["laptop stands", "arrived", "partially", "fulfilled"],
    transcript:
      "Man: Hello, ABC Supplies. How can I help you?\nWoman: Hi, this is Lisa Wang from TechCorp. I'm calling about order number 4582. We received the shipment this morning, but some items are missing.\nMan: I'm sorry to hear that. Can you tell me which items are missing?\nWoman: The order was for 50 laptop stands, but only 30 arrived.\nMan: Let me check our warehouse. Please hold for a moment.",
  },
  {
    id: "p3-ext-006",
    part: "Part 3",
    question: "What will the man most likely do next?",
    choices: {
      A: "Send a replacement order",
      B: "Check the warehouse",
      C: "Refund the payment",
      D: "Call the delivery company",
    },
    answer: "B",
    explanation_zh:
      "下一步行動題。男士說 'Let me check our warehouse'，所以他接下來會去檢查倉庫庫存。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["warehouse", "check", "hold", "moment"],
    transcript:
      "Man: Hello, ABC Supplies. How can I help you?\nWoman: Hi, this is Lisa Wang from TechCorp. I'm calling about order number 4582. We received the shipment this morning, but some items are missing.\nMan: I'm sorry to hear that. Can you tell me which items are missing?\nWoman: The order was for 50 laptop stands, but only 30 arrived.\nMan: Let me check our warehouse. Please hold for a moment.",
  },
  {
    id: "p3-ext-007",
    part: "Part 3",
    question: "Why is the man calling customer service?",
    choices: {
      A: "To ask about store hours",
      B: "To complain about a faulty product",
      C: "To check the price of a laptop",
      D: "To extend the return period",
    },
    answer: "B",
    explanation_zh:
      "主旨題。男士說 laptop 螢幕有 flickering issue（閃爍問題），所以他是來抱怨產品故障。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["flickering", "issue", "receipt", "return period", "replacement"],
    transcript:
      "Woman: Good afternoon, customer service. This is Sarah.\nMan: Yes, I purchased a laptop from your store last week, but the screen has developed a strange flickering issue.\nWoman: I'm sorry about that, sir. Do you still have the receipt?\nMan: Yes, I do. I have it right here.\nWoman: Great. Since it's within the 14-day return period, you can bring it back for a replacement or a full refund. Which would you prefer?\nMan: I'd like a replacement, please.",
  },
  {
    id: "p3-ext-008",
    part: "Part 3",
    question: "What does the woman offer the man?",
    choices: {
      A: "A repair service",
      B: "A discount on a new laptop",
      C: "A replacement or a refund",
      D: "A store credit",
    },
    answer: "C",
    explanation_zh:
      "細節題。女士說 'you can bring it back for a replacement or a full refund'，提供換貨或全額退費。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["return period", "replacement", "refund", "receipt"],
    transcript:
      "Woman: Good afternoon, customer service. This is Sarah.\nMan: Yes, I purchased a laptop from your store last week, but the screen has developed a strange flickering issue.\nWoman: I'm sorry about that, sir. Do you still have the receipt?\nMan: Yes, I do. I have it right here.\nWoman: Great. Since it's within the 14-day return period, you can bring it back for a replacement or a full refund. Which would you prefer?\nMan: I'd like a replacement, please.",
  },
  {
    id: "p3-ext-009",
    part: "Part 3",
    question: "What will the man most likely do?",
    choices: {
      A: "Accept a full refund",
      B: "Bring the laptop back for a replacement",
      C: "Visit a different store",
      D: "Wait for a technician to visit",
    },
    answer: "B",
    explanation_zh:
      "下一步行動題。男士說 'I'd like a replacement, please'，所以他會帶 laptop 回去換貨。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["replacement", "refund", "prefer", "bring back"],
    transcript:
      "Woman: Good afternoon, customer service. This is Sarah.\nMan: Yes, I purchased a laptop from your store last week, but the screen has developed a strange flickering issue.\nWoman: I'm sorry about that, sir. Do you still have the receipt?\nMan: Yes, I do. I have it right here.\nWoman: Great. Since it's within the 14-day return period, you can bring it back for a replacement or a full refund. Which would you prefer?\nMan: I'd like a replacement, please.",
  },
  {
    id: "p3-ext-010",
    part: "Part 3",
    question: "What is the main topic of the conversation?",
    choices: {
      A: "Choosing a hotel",
      B: "Planning a business trip",
      C: "Booking a conference room",
      D: "Changing a flight reservation",
    },
    answer: "B",
    explanation_zh:
      "主旨題。兩人在討論 flight、hotel 和 airport pickup，整體是在規劃出差行程。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["trip", "flight", "hotel", "convention center", "arrange", "pick up"],
    transcript:
      "Man: Ms. Chen, about your trip to Shanghai next month — I've booked your flight for the 15th.\nWoman: Thank you. Were you able to find a hotel near the convention center?\nMan: Yes, the Riverside Hotel. It's a 10-minute walk from the venue.\nWoman: That sounds good. Could you also arrange a car to pick me up at the airport?\nMan: Of course. I'll book a driver for you. Your flight arrives at 2 p.m., correct?",
  },
  {
    id: "p3-ext-011",
    part: "Part 3",
    question: "What is true about the hotel?",
    choices: {
      A: "It is near the airport",
      B: "It is close to the convention center",
      C: "It is the most expensive in the area",
      D: "It has a free shuttle service",
    },
    answer: "B",
    explanation_zh:
      "細節題。男士說 'It's a 10-minute walk from the venue'，venue 指的是 convention center，所以飯店離會議中心很近。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["convention center", "venue", "walk", "near"],
    transcript:
      "Man: Ms. Chen, about your trip to Shanghai next month — I've booked your flight for the 15th.\nWoman: Thank you. Were you able to find a hotel near the convention center?\nMan: Yes, the Riverside Hotel. It's a 10-minute walk from the venue.\nWoman: That sounds good. Could you also arrange a car to pick me up at the airport?\nMan: Of course. I'll book a driver for you. Your flight arrives at 2 p.m., correct?",
  },
  {
    id: "p3-ext-012",
    part: "Part 3",
    question: "What will the man do next?",
    choices: {
      A: "Book a car for the airport pickup",
      B: "Send a list of hotels",
      C: "Confirm the flight time",
      D: "Cancel the hotel reservation",
    },
    answer: "A",
    explanation_zh:
      "下一步行動題。男士說 'I'll book a driver for you'，所以他接下來會預訂機場接駁車。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["book", "driver", "pick up", "airport"],
    transcript:
      "Man: Ms. Chen, about your trip to Shanghai next month — I've booked your flight for the 15th.\nWoman: Thank you. Were you able to find a hotel near the convention center?\nMan: Yes, the Riverside Hotel. It's a 10-minute walk from the venue.\nWoman: That sounds good. Could you also arrange a car to pick me up at the airport?\nMan: Of course. I'll book a driver for you. Your flight arrives at 2 p.m., correct?",
  },
  {
    id: "p3-ext-013",
    part: "Part 3",
    question: "What is the main purpose of the conversation?",
    choices: {
      A: "To plan the company picnic",
      B: "To introduce new employees",
      C: "To announce a holiday",
      D: "To organize a team meeting",
    },
    answer: "A",
    explanation_zh:
      "主旨題。女士提到 annual company picnic，並討論參加人數和報名事宜，所以是在規劃員工旅遊。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["annual", "picnic", "attendees", "registration", "barbecue"],
    transcript:
      "Woman: Hi everyone. As you know, our annual company picnic is coming up next Saturday. We need to finalize the number of attendees by tomorrow.\nMan: I'll be there, and I'll bring my wife and two kids.\nWoman: Great, please make sure you fill out the registration form online so we can order enough food.\nMan: Is there a barbecue this year?\nWoman: Yes, and there will also be games for children and a talent show.",
  },
  {
    id: "p3-ext-014",
    part: "Part 3",
    question: "How many people will attend the picnic in the man's group?",
    choices: {
      A: "One",
      B: "Two",
      C: "Three",
      D: "Four",
    },
    answer: "D",
    explanation_zh:
      "數字細節題。男士說自己會去，還會帶 wife and two kids，所以他們這一組總共 4 人（1 + 1 + 2 = 4）。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["wife", "kids", "attendees", "group"],
    transcript:
      "Woman: Hi everyone. As you know, our annual company picnic is coming up next Saturday. We need to finalize the number of attendees by tomorrow.\nMan: I'll be there, and I'll bring my wife and two kids.\nWoman: Great, please make sure you fill out the registration form online so we can order enough food.\nMan: Is there a barbecue this year?\nWoman: Yes, and there will also be games for children and a talent show.",
  },
  {
    id: "p3-ext-015",
    part: "Part 3",
    question: "What does the woman ask the man to do?",
    choices: {
      A: "Fill out the registration form",
      B: "Bring food to the picnic",
      C: "Help organize the games",
      D: "Arrive early on Saturday",
    },
    answer: "A",
    explanation_zh:
      "下一步行動題。女士說 'make sure you fill out the registration form online'，要求男士上網填報名表。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["registration form", "online", "fill out", "order"],
    transcript:
      "Woman: Hi everyone. As you know, our annual company picnic is coming up next Saturday. We need to finalize the number of attendees by tomorrow.\nMan: I'll be there, and I'll bring my wife and two kids.\nWoman: Great, please make sure you fill out the registration form online so we can order enough food.\nMan: Is there a barbecue this year?\nWoman: Yes, and there will also be games for children and a talent show.",
  },
  {
    id: "p3-ext-016",
    part: "Part 3",
    question: "Why is the woman calling the restaurant?",
    choices: {
      A: "To reserve a table for dinner",
      B: "To order food for delivery",
      C: "To complain about the service",
      D: "To ask about the menu",
    },
    answer: "A",
    explanation_zh:
      "主旨題。女士說 'I'd like to make a reservation for four people'，所以是要訂晚餐位子。",
    skill_tag: "listening_main_idea",
    difficulty: "A2",
    vocabulary: ["reservation", "available", "window", "table"],
    transcript:
      "Man: Hello, Golden Dragon Restaurant. How can I help you?\nWoman: Hi, I'd like to make a reservation for four people this Friday evening.\nMan: Certainly. We have availability at 6:30 and 8:30. Which time works better for you?\nWoman: 6:30, please. And could we have a table near the window?\nMan: I'll note that. However, window tables are subject to availability. We'll do our best.\nWoman: Thank you. I appreciate it.",
  },
  {
    id: "p3-ext-017",
    part: "Part 3",
    question: "What can be inferred about the restaurant?",
    choices: {
      A: "It is fully booked on Friday",
      B: "It does not accept reservations",
      C: "Window tables are not guaranteed",
      D: "It only serves lunch",
    },
    answer: "C",
    explanation_zh:
      "推論題。男士說 'window tables are subject to availability'，表示靠窗座位不能保證，要視當天情況而定。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["availability", "window table", "subject to", "best"],
    transcript:
      "Man: Hello, Golden Dragon Restaurant. How can I help you?\nWoman: Hi, I'd like to make a reservation for four people this Friday evening.\nMan: Certainly. We have availability at 6:30 and 8:30. Which time works better for you?\nWoman: 6:30, please. And could we have a table near the window?\nMan: I'll note that. However, window tables are subject to availability. We'll do our best.\nWoman: Thank you. I appreciate it.",
  },
  {
    id: "p3-ext-018",
    part: "Part 3",
    question: "What will the woman most likely do on Friday?",
    choices: {
      A: "Go to the restaurant at 6:30",
      B: "Order takeout",
      C: "Cancel the reservation",
      D: "Request a different time",
    },
    answer: "A",
    explanation_zh:
      "下一步行動題。女士選擇了 6:30 的時段，所以星期五她會去餐廳用餐。",
    skill_tag: "listening_next_action",
    difficulty: "A2",
    vocabulary: ["reservation", "evening", "arrive"],
    transcript:
      "Man: Hello, Golden Dragon Restaurant. How can I help you?\nWoman: Hi, I'd like to make a reservation for four people this Friday evening.\nMan: Certainly. We have availability at 6:30 and 8:30. Which time works better for you?\nWoman: 6:30, please. And could we have a table near the window?\nMan: I'll note that. However, window tables are subject to availability. We'll do our best.\nWoman: Thank you. I appreciate it.",
  },
  {
    id: "p3-ext-019",
    part: "Part 3",
    question: "Why is the woman contacting IT support?",
    choices: {
      A: "Her computer won't start",
      B: "She needs software installed",
      C: "She forgot her password",
      D: "Her printer has a problem",
    },
    answer: "D",
    explanation_zh:
      "主旨題。女士說 'having trouble with my printer' 以及 'error message'，所以印表機有問題。",
    skill_tag: "listening_main_idea",
    difficulty: "A2",
    vocabulary: ["printer", "error message", "IT support", "trouble"],
    transcript:
      "Woman: Hi, IT support? I'm having trouble with my printer. It keeps showing an error message.\nMan: Have you tried turning it off and on again?\nWoman: Yes, I did that already, but the problem is still there.\nMan: OK, I'll come to your desk and take a look. Which floor are you on?\nWoman: Third floor, room 305.\nMan: I'll be there in about 15 minutes.",
  },
  {
    id: "p3-ext-020",
    part: "Part 3",
    question: "What has the woman already done to fix the issue?",
    choices: {
      A: "Restarted the printer",
      B: "Called the manufacturer",
      C: "Checked the cable connection",
      D: "Asked a colleague for help",
    },
    answer: "A",
    explanation_zh:
      "細節題。男士問 'Have you tried turning it off and on again?' 女士回答 'I did that already'，所以她已經重開機過了。",
    skill_tag: "listening_inference",
    difficulty: "A2",
    vocabulary: ["turn off", "turn on", "problem", "floor"],
    transcript:
      "Woman: Hi, IT support? I'm having trouble with my printer. It keeps showing an error message.\nMan: Have you tried turning it off and on again?\nWoman: Yes, I did that already, but the problem is still there.\nMan: OK, I'll come to your desk and take a look. Which floor are you on?\nWoman: Third floor, room 305.\nMan: I'll be there in about 15 minutes.",
  },
  {
    id: "p3-ext-021",
    part: "Part 3",
    question: "What will the man do next?",
    choices: {
      A: "Send a new printer",
      B: "Call the woman back later",
      C: "Go to the woman's office",
      D: "Report the issue to his manager",
    },
    answer: "C",
    explanation_zh:
      "下一步行動題。男士說 'I'll come to your desk and take a look' 並問哪一樓，所以他會去女士辦公室查看。",
    skill_tag: "listening_next_action",
    difficulty: "A2",
    vocabulary: ["take a look", "desk", "minutes", "support"],
    transcript:
      "Woman: Hi, IT support? I'm having trouble with my printer. It keeps showing an error message.\nMan: Have you tried turning it off and on again?\nWoman: Yes, I did that already, but the problem is still there.\nMan: OK, I'll come to your desk and take a look. Which floor are you on?\nWoman: Third floor, room 305.\nMan: I'll be there in about 15 minutes.",
  },
  {
    id: "p3-ext-022",
    part: "Part 3",
    question: "What is happening in this conversation?",
    choices: {
      A: "A performance review",
      B: "A training session",
      C: "A project meeting",
      D: "A job interview",
    },
    answer: "D",
    explanation_zh:
      "主旨題。男士問 'why are you interested in working at our company' 並問過去專案經驗，這是一場工作面試。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["interested", "reputation", "innovation", "project management", "deadline"],
    transcript:
      "Man: Thank you for coming in today, Ms. Wu. Let me start by asking — why are you interested in working at our company?\nWoman: I've always admired your company's reputation for innovation. I believe my skills in project management would be a great fit.\nMan: Can you tell me about a time you led a difficult project?\nWoman: Certainly. At my previous job, I managed a cross-department project with a tight deadline.\nMan: Impressive. We'll be making a decision by next Friday.",
  },
  {
    id: "p3-ext-023",
    part: "Part 3",
    question: "What does the woman say about her previous experience?",
    choices: {
      A: "She worked in sales",
      B: "She trained new employees",
      C: "She developed a new product",
      D: "She managed a challenging project",
    },
    answer: "D",
    explanation_zh:
      "細節題。女士說 'managed a cross-department project with a tight deadline'，她曾管理過一個有緊迫截止日的跨部門專案。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["managed", "cross-department", "tight deadline", "previous job"],
    transcript:
      "Man: Thank you for coming in today, Ms. Wu. Let me start by asking — why are you interested in working at our company?\nWoman: I've always admired your company's reputation for innovation. I believe my skills in project management would be a great fit.\nMan: Can you tell me about a time you led a difficult project?\nWoman: Certainly. At my previous job, I managed a cross-department project with a tight deadline.\nMan: Impressive. We'll be making a decision by next Friday.",
  },
  {
    id: "p3-ext-024",
    part: "Part 3",
    question: "When will the woman likely hear about the decision?",
    choices: {
      A: "Tomorrow",
      B: "By the end of this week",
      C: "In two weeks",
      D: "By next Friday",
    },
    answer: "D",
    explanation_zh:
      "下一步行動題。男士最後說 'We'll be making a decision by next Friday'，所以下週五前會通知結果。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["decision", "by next Friday", "impressive"],
    transcript:
      "Man: Thank you for coming in today, Ms. Wu. Let me start by asking — why are you interested in working at our company?\nWoman: I've always admired your company's reputation for innovation. I believe my skills in project management would be a great fit.\nMan: Can you tell me about a time you led a difficult project?\nWoman: Certainly. At my previous job, I managed a cross-department project with a tight deadline.\nMan: Impressive. We'll be making a decision by next Friday.",
  },
  {
    id: "p3-ext-025",
    part: "Part 3",
    question: "Why is the woman calling Mr. Lee?",
    choices: {
      A: "To inquire about a late delivery",
      B: "To request a different product",
      C: "To cancel the furniture order",
      D: "To return a damaged item",
    },
    answer: "A",
    explanation_zh:
      "主旨題。女士說 'delivery was scheduled for today, but it hasn't arrived yet'，她是在詢問延誤的出貨。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["furniture", "delivery", "scheduled", "delay", "supplier", "tracking"],
    transcript:
      "Woman: Mr. Lee, I'm calling about the office furniture order. The delivery was scheduled for today, but it hasn't arrived yet.\nMan: I apologize for the delay. Our supplier had a shortage of materials, so the shipment was pushed back.\nWoman: When can we expect the delivery?\nMan: Everything should arrive by next Wednesday at the latest. I'll send you a tracking number once it's shipped.",
  },
  {
    id: "p3-ext-026",
    part: "Part 3",
    question: "What caused the delivery delay?",
    choices: {
      A: "A shipping error",
      B: "An incorrect order",
      C: "A material shortage at the supplier",
      D: "A payment problem",
    },
    answer: "C",
    explanation_zh:
      "細節題。男士說 'Our supplier had a shortage of materials'，供應商原料短缺導致出貨延誤。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["shortage", "materials", "supplier", "pushed back"],
    transcript:
      "Woman: Mr. Lee, I'm calling about the office furniture order. The delivery was scheduled for today, but it hasn't arrived yet.\nMan: I apologize for the delay. Our supplier had a shortage of materials, so the shipment was pushed back.\nWoman: When can we expect the delivery?\nMan: Everything should arrive by next Wednesday at the latest. I'll send you a tracking number once it's shipped.",
  },
  {
    id: "p3-ext-027",
    part: "Part 3",
    question: "What will Mr. Lee do after the shipment is sent?",
    choices: {
      A: "Process a refund",
      B: "Arrange a pickup",
      C: "Send a tracking number",
      D: "Call a different supplier",
    },
    answer: "C",
    explanation_zh:
      "下一步行動題。男士說 'I'll send you a tracking number once it's shipped'，出貨後會提供追蹤號碼。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["tracking number", "shipped", "arrive", "latest"],
    transcript:
      "Woman: Mr. Lee, I'm calling about the office furniture order. The delivery was scheduled for today, but it hasn't arrived yet.\nMan: I apologize for the delay. Our supplier had a shortage of materials, so the shipment was pushed back.\nWoman: When can we expect the delivery?\nMan: Everything should arrive by next Wednesday at the latest. I'll send you a tracking number once it's shipped.",
  },
  {
    id: "p3-ext-028",
    part: "Part 3",
    question: "What is the problem with the report?",
    choices: {
      A: "It is missing some pages",
      B: "It was sent to the wrong person",
      C: "Some numbers seem incorrect",
      D: "The format is wrong",
    },
    answer: "C",
    explanation_zh:
      "主旨題。男士說 'some numbers that don't seem right' 以及 Asian market 的數字有問題，所以報告中的數據有誤。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["quarterly", "sales report", "figures", "spreadsheet", "updated version"],
    transcript:
      "Man: Jessica, I've reviewed the quarterly sales report you sent me. There are a few numbers that don't seem right.\nWoman: Really? Which section?\nMan: The third quarter figures for the Asian market. They show a 30 percent drop, but I'm pretty sure our sales actually increased.\nWoman: Let me check the original data. I might have used the wrong spreadsheet. I'll correct it and send you an updated version by the end of the day.",
  },
  {
    id: "p3-ext-029",
    part: "Part 3",
    question: "What does the man say about the Asian market figures?",
    choices: {
      A: "They are the highest this year",
      B: "They are from the previous quarter",
      C: "They need more detail",
      D: "They should show an increase, not a decrease",
    },
    answer: "D",
    explanation_zh:
      "細節題。男士說 'sales actually increased'，但報表顯示下降 30%，所以數字應該是增加而非減少。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["figures", "drop", "increased", "Asian market"],
    transcript:
      "Man: Jessica, I've reviewed the quarterly sales report you sent me. There are a few numbers that don't seem right.\nWoman: Really? Which section?\nMan: The third quarter figures for the Asian market. They show a 30 percent drop, but I'm pretty sure our sales actually increased.\nWoman: Let me check the original data. I might have used the wrong spreadsheet. I'll correct it and send you an updated version by the end of the day.",
  },
  {
    id: "p3-ext-030",
    part: "Part 3",
    question: "What will the woman do next?",
    choices: {
      A: "Call a meeting to discuss the report",
      B: "Apologize to the manager",
      C: "Request help from another department",
      D: "Send a corrected version of the report",
    },
    answer: "D",
    explanation_zh:
      "下一步行動題。女士說 'I'll correct it and send you an updated version by the end of the day'，她會在今天結束前寄出修正版。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["correct", "updated version", "original data", "spreadsheet"],
    transcript:
      "Man: Jessica, I've reviewed the quarterly sales report you sent me. There are a few numbers that don't seem right.\nWoman: Really? Which section?\nMan: The third quarter figures for the Asian market. They show a 30 percent drop, but I'm pretty sure our sales actually increased.\nWoman: Let me check the original data. I might have used the wrong spreadsheet. I'll correct it and send you an updated version by the end of the day.",
  },
  // ─── Extended Part 4 Questions (p4-ext-001 ~ p4-ext-030) ──────────────────────
  {
    id: "p4-ext-001",
    part: "Part 4",
    question: "What is the main purpose of this announcement?",
    choices: {
      A: "To announce a renovation plan",
      B: "To change the work schedule",
      C: "To inform about a temporary office relocation",
      D: "To introduce new office equipment",
    },
    answer: "C",
    explanation_zh:
      "主旨題。開頭說 'regarding our office relocation' 以及 'move to a temporary office'，所以是通知暫時搬遷。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["relocation", "renovations", "temporary", "operations", "belongings"],
    transcript:
      "Good morning, everyone. This is a brief announcement regarding our office relocation. As you know, our current building is undergoing renovations starting next month. The management has decided to move our operations to a temporary office on Park Avenue. The move will take place over the weekend of June 10th. Please pack your personal belongings and label them clearly before leaving on Friday. Further details will be sent to your email by the end of this week.",
  },
  {
    id: "p4-ext-002",
    part: "Part 4",
    question: "When will the move take place?",
    choices: {
      A: "Next month",
      B: "At the end of the week",
      C: "Over the weekend of June 10th",
      D: "This Friday",
    },
    answer: "C",
    explanation_zh:
      "細節題。公告明確說 'The move will take place over the weekend of June 10th'，搬遷時間是 6 月 10 日的週末。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["move", "weekend", "June", "take place"],
    transcript:
      "Good morning, everyone. This is a brief announcement regarding our office relocation. As you know, our current building is undergoing renovations starting next month. The management has decided to move our operations to a temporary office on Park Avenue. The move will take place over the weekend of June 10th. Please pack your personal belongings and label them clearly before leaving on Friday. Further details will be sent to your email by the end of this week.",
  },
  {
    id: "p4-ext-003",
    part: "Part 4",
    question: "What does the speaker ask employees to do before Friday?",
    choices: {
      A: "Renovate their offices",
      B: "Update their email addresses",
      C: "Pack and label their belongings",
      D: "Report to the Park Avenue office",
    },
    answer: "C",
    explanation_zh:
      "下一步行動題。公告說 'Please pack your personal belongings and label them clearly before leaving on Friday'，要求打包並標示個人物品。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["pack", "label", "personal belongings", "clearly"],
    transcript:
      "Good morning, everyone. This is a brief announcement regarding our office relocation. As you know, our current building is undergoing renovations starting next month. The management has decided to move our operations to a temporary office on Park Avenue. The move will take place over the weekend of June 10th. Please pack your personal belongings and label them clearly before leaving on Friday. Further details will be sent to your email by the end of this week.",
  },
  {
    id: "p4-ext-004",
    part: "Part 4",
    question: "Where is this announcement most likely being made?",
    choices: {
      A: "In a train station",
      B: "At a hotel lobby",
      C: "At an airport gate",
      D: "On an airplane",
    },
    answer: "C",
    explanation_zh:
      "推論題。提到 boarding、Gate 15、boarding pass 和 flight number，明顯是在機場登機門的廣播。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["boarding", "passengers", "boarding pass", "gate", "luggage", "assistance"],
    transcript:
      "Attention, passengers of Flight JL 802 to Tokyo. We are now boarding Business Class passengers and passengers with priority boarding. Please have your boarding pass and passport ready. Boarding will begin at Gate 15. We remind you that hand luggage must not exceed 7 kilograms. If you need assistance, please approach one of our staff members at the gate. Thank you for choosing Japan Airlines.",
  },
  {
    id: "p4-ext-005",
    part: "Part 4",
    question: "Who is being called to board at this time?",
    choices: {
      A: "All passengers",
      B: "Passengers seated in the back",
      C: "Business Class and priority passengers",
      D: "Passengers with children",
    },
    answer: "C",
    explanation_zh:
      "細節題。廣播說 'boarding Business Class passengers and passengers with priority boarding'，目前是商務艙和優先登機乘客。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["Business Class", "priority boarding", "boarding pass"],
    transcript:
      "Attention, passengers of Flight JL 802 to Tokyo. We are now boarding Business Class passengers and passengers with priority boarding. Please have your boarding pass and passport ready. Boarding will begin at Gate 15. We remind you that hand luggage must not exceed 7 kilograms. If you need assistance, please approach one of our staff members at the gate. Thank you for choosing Japan Airlines.",
  },
  {
    id: "p4-ext-006",
    part: "Part 4",
    question: "What should passengers do if they need assistance?",
    choices: {
      A: "Show their seat number",
      B: "Call the airline office",
      C: "Wait until boarding is complete",
      D: "Approach a staff member at the gate",
    },
    answer: "D",
    explanation_zh:
      "下一步行動題。廣播說 'If you need assistance, please approach one of our staff members at the gate'，需要協助的旅客應找登機口的工作人員。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["assistance", "approach", "staff members", "gate"],
    transcript:
      "Attention, passengers of Flight JL 802 to Tokyo. We are now boarding Business Class passengers and passengers with priority boarding. Please have your boarding pass and passport ready. Boarding will begin at Gate 15. We remind you that hand luggage must not exceed 7 kilograms. If you need assistance, please approach one of our staff members at the gate. Thank you for choosing Japan Airlines.",
  },
  {
    id: "p4-ext-007",
    part: "Part 4",
    question: "What is the purpose of this announcement?",
    choices: {
      A: "To introduce a new store location",
      B: "To thank loyal customers",
      C: "To announce a store closure",
      D: "To advertise a weekend promotion",
    },
    answer: "D",
    explanation_zh:
      "主旨題。開頭說 'special promotion on all electronics' 以及 'up to 40 percent off'，是在宣傳週末促銷活動。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["promotion", "electronics", "percent off", "voucher", "department"],
    transcript:
      "Welcome to City Mart! This weekend only, we are offering a special promotion on all electronics. Enjoy up to 40 percent off on selected laptops, tablets, and headphones. Additionally, customers who spend over 500 dollars will receive a free gift voucher. Our store is open from 9 a.m. to 9 p.m. on Saturday and Sunday. Don't miss this opportunity to save big. Visit our electronics department on the second floor for more details.",
  },
  {
    id: "p4-ext-008",
    part: "Part 4",
    question: "What do customers get if they spend over 500 dollars?",
    choices: {
      A: "A discount coupon",
      B: "An extended warranty",
      C: "Free delivery",
      D: "A free gift voucher",
    },
    answer: "D",
    explanation_zh:
      "細節題。公告說 'customers who spend over 500 dollars will receive a free gift voucher'，消費超過 500 美元可獲得免費禮券。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["voucher", "spend", "customer", "gift"],
    transcript:
      "Welcome to City Mart! This weekend only, we are offering a special promotion on all electronics. Enjoy up to 40 percent off on selected laptops, tablets, and headphones. Additionally, customers who spend over 500 dollars will receive a free gift voucher. Our store is open from 9 a.m. to 9 p.m. on Saturday and Sunday. Don't miss this opportunity to save big. Visit our electronics department on the second floor for more details.",
  },
  {
    id: "p4-ext-009",
    part: "Part 4",
    question: "What does the speaker suggest listeners do?",
    choices: {
      A: "Shop online",
      B: "Arrive early on Saturday",
      C: "Call for more information",
      D: "Visit the second floor",
    },
    answer: "D",
    explanation_zh:
      "下一步行動題。最後說 'Visit our electronics department on the second floor for more details'，建議去二樓電子部門。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["electronics department", "second floor", "details"],
    transcript:
      "Welcome to City Mart! This weekend only, we are offering a special promotion on all electronics. Enjoy up to 40 percent off on selected laptops, tablets, and headphones. Additionally, customers who spend over 500 dollars will receive a free gift voucher. Our store is open from 9 a.m. to 9 p.m. on Saturday and Sunday. Don't miss this opportunity to save big. Visit our electronics department on the second floor for more details.",
  },
  {
    id: "p4-ext-010",
    part: "Part 4",
    question: "What is the message mainly about?",
    choices: {
      A: "A change to the meeting schedule",
      B: "A new meeting room booking",
      C: "A request for budget reports",
      D: "A team building event",
    },
    answer: "A",
    explanation_zh:
      "主旨題。留言說 'monthly strategy meeting has been rescheduled'，會議被改期了。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["strategy meeting", "rescheduled", "agenda", "circulated", "department heads"],
    transcript:
      "Hello, this is a message for all department heads. The monthly strategy meeting has been rescheduled from this Thursday to next Tuesday, May 16th, at 10 a.m. in Conference Room B. Please prepare a brief update on your team's progress for the past month. If you are unable to attend, please inform my assistant, Kelly, by tomorrow. The agenda will be circulated later today. Thank you.",
  },
  {
    id: "p4-ext-011",
    part: "Part 4",
    question: "What are department heads asked to prepare?",
    choices: {
      A: "A budget proposal",
      B: "A presentation for clients",
      C: "A list of new projects",
      D: "An update on their team's progress",
    },
    answer: "D",
    explanation_zh:
      "細節題。留言說 'prepare a brief update on your team's progress'，各部門主管需準備團隊進度報告。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["update", "progress", "team", "department heads"],
    transcript:
      "Hello, this is a message for all department heads. The monthly strategy meeting has been rescheduled from this Thursday to next Tuesday, May 16th, at 10 a.m. in Conference Room B. Please prepare a brief update on your team's progress for the past month. If you are unable to attend, please inform my assistant, Kelly, by tomorrow. The agenda will be circulated later today. Thank you.",
  },
  {
    id: "p4-ext-012",
    part: "Part 4",
    question: "What should attendees do if they cannot come?",
    choices: {
      A: "Send a replacement",
      B: "Call the CEO directly",
      C: "Inform Kelly by tomorrow",
      D: "Submit a report in advance",
    },
    answer: "C",
    explanation_zh:
      "下一步行動題。留言說 'If you are unable to attend, please inform my assistant, Kelly, by tomorrow'，無法參加需在明天前通知 Kelly。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["unable to attend", "inform", "assistant"],
    transcript:
      "Hello, this is a message for all department heads. The monthly strategy meeting has been rescheduled from this Thursday to next Tuesday, May 16th, at 10 a.m. in Conference Room B. Please prepare a brief update on your team's progress for the past month. If you are unable to attend, please inform my assistant, Kelly, by tomorrow. The agenda will be circulated later today. Thank you.",
  },
  {
    id: "p4-ext-013",
    part: "Part 4",
    question: "Why is Mark calling Jennifer?",
    choices: {
      A: "To offer her a job",
      B: "To reject her application",
      C: "To ask for more documents",
      D: "To invite her for an interview",
    },
    answer: "D",
    explanation_zh:
      "主旨題。Mark 說 'would like to invite you for an interview'，來電目的是邀請面試。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["application", "interview", "impressed", "resume", "confirm", "availability"],
    transcript:
      "Hi, Jennifer. This is Mark from GlobalTech. I'm calling about your application for the marketing coordinator position. We were very impressed with your resume and would like to invite you for an interview. The interview will be held this Friday at 2 p.m. at our head office. Please call me back at 555-0123 to confirm your availability. If you need to reschedule, we also have openings next Monday. I look forward to hearing from you.",
  },
  {
    id: "p4-ext-014",
    part: "Part 4",
    question: "What does Mark say about Jennifer's resume?",
    choices: {
      A: "It needs more detail",
      B: "It was missing information",
      C: "It arrived late",
      D: "It was very impressive",
    },
    answer: "D",
    explanation_zh:
      "細節題。Mark 說 'We were very impressed with your resume'，他們對履歷印象深刻。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["impressed", "resume", "marketing coordinator"],
    transcript:
      "Hi, Jennifer. This is Mark from GlobalTech. I'm calling about your application for the marketing coordinator position. We were very impressed with your resume and would like to invite you for an interview. The interview will be held this Friday at 2 p.m. at our head office. Please call me back at 555-0123 to confirm your availability. If you need to reschedule, we also have openings next Monday. I look forward to hearing from you.",
  },
  {
    id: "p4-ext-015",
    part: "Part 4",
    question: "What does Mark ask Jennifer to do?",
    choices: {
      A: "Send additional documents",
      B: "Email her portfolio",
      C: "Visit the office today",
      D: "Call him back to confirm",
    },
    answer: "D",
    explanation_zh:
      "下一步行動題。Mark 說 'Please call me back at 555-0123 to confirm your availability'，要求回電確認是否參加。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["call back", "confirm", "availability", "head office"],
    transcript:
      "Hi, Jennifer. This is Mark from GlobalTech. I'm calling about your application for the marketing coordinator position. We were very impressed with your resume and would like to invite you for an interview. The interview will be held this Friday at 2 p.m. at our head office. Please call me back at 555-0123 to confirm your availability. If you need to reschedule, we also have openings next Monday. I look forward to hearing from you.",
  },
  {
    id: "p4-ext-016",
    part: "Part 4",
    question: "What is the main purpose of this announcement?",
    choices: {
      A: "To inform guests about facility hours and services",
      B: "To welcome guests to the hotel",
      C: "To announce a special event",
      D: "To introduce hotel staff",
    },
    answer: "A",
    explanation_zh:
      "主旨題。公告提到 restaurant closing time、room service、swimming pool、fitness center 和 breakfast hours，是在說明各項設施的服務時間。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["guests", "restaurant", "room service", "swimming pool", "fitness center", "breakfast"],
    transcript:
      "Good evening, ladies and gentlemen. We would like to remind our guests that the hotel restaurant will be closing early tonight at 9 p.m. due to a private event. Room service will still be available until 11 p.m. Also, the swimming pool is open until 10 p.m. and the fitness center is open 24 hours. Tomorrow morning, breakfast will be served from 6:30 a.m. to 10 a.m. in the main dining hall. Thank you for choosing Grand Hotel.",
  },
  {
    id: "p4-ext-017",
    part: "Part 4",
    question: "Why is the restaurant closing early tonight?",
    choices: {
      A: "A private event is being held",
      B: "It is closed for renovation",
      C: "It is offering a special menu",
      D: "The kitchen is understaffed",
    },
    answer: "A",
    explanation_zh:
      "細節題。公告說 'closing early tonight at 9 p.m. due to a private event'，因為有私人活動所以提早打烊。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["private event", "closing early", "available"],
    transcript:
      "Good evening, ladies and gentlemen. We would like to remind our guests that the hotel restaurant will be closing early tonight at 9 p.m. due to a private event. Room service will still be available until 11 p.m. Also, the swimming pool is open until 10 p.m. and the fitness center is open 24 hours. Tomorrow morning, breakfast will be served from 6:30 a.m. to 10 a.m. in the main dining hall. Thank you for choosing Grand Hotel.",
  },
  {
    id: "p4-ext-018",
    part: "Part 4",
    question: "What can guests use if they want food after the restaurant closes?",
    choices: {
      A: "Room service",
      B: "The fitness center",
      C: "The swimming pool",
      D: "The main dining hall",
    },
    answer: "A",
    explanation_zh:
      "下一步行動題。餐廳晚上 9 點提早打烊，但公告說 'Room service will still be available until 11 p.m.'，所以想用餐的房客可以使用客房服務。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["room service", "restaurant closes", "available", "guests"],
    transcript:
      "Good evening, ladies and gentlemen. We would like to remind our guests that the hotel restaurant will be closing early tonight at 9 p.m. due to a private event. Room service will still be available until 11 p.m. Also, the swimming pool is open until 10 p.m. and the fitness center is open 24 hours. Tomorrow morning, breakfast will be served from 6:30 a.m. to 10 a.m. in the main dining hall. Thank you for choosing Grand Hotel.",
  },
  {
    id: "p4-ext-019",
    part: "Part 4",
    question: "What is the speaker doing?",
    choices: {
      A: "Introducing a new product",
      B: "Announcing a company event",
      C: "Giving a sales report",
      D: "Conducting a training session",
    },
    answer: "A",
    explanation_zh:
      "主旨題。開頭說 'introduce our latest product'，後面介紹 EcoSmart Water Bottle 的功能和價格，是在做產品介紹。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["product", "recycled materials", "built-in filter", "available", "discount"],
    transcript:
      "Welcome everyone. Today I'm excited to introduce our latest product, the EcoSmart Water Bottle. This bottle is made from 100 percent recycled materials and keeps your drinks cold for up to 24 hours. It also has a built-in filter system, making it perfect for travelers. The EcoSmart will be available for purchase starting next Monday at all our retail locations and on our website. The price is $29.99, and for the first week, we are offering a 15 percent discount.",
  },
  {
    id: "p4-ext-020",
    part: "Part 4",
    question: "What is a special feature of the product?",
    choices: {
      A: "It can be folded easily",
      B: "It comes in different colors",
      C: "It has a built-in filter system",
      D: "It is made of glass",
    },
    answer: "C",
    explanation_zh:
      "細節題。介紹說 'has a built-in filter system'，產品有內建過濾系統。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["built-in filter", "recycled materials", "keeps cold"],
    transcript:
      "Welcome everyone. Today I'm excited to introduce our latest product, the EcoSmart Water Bottle. This bottle is made from 100 percent recycled materials and keeps your drinks cold for up to 24 hours. It also has a built-in filter system, making it perfect for travelers. The EcoSmart will be available for purchase starting next Monday at all our retail locations and on our website. The price is $29.99, and for the first week, we are offering a 15 percent discount.",
  },
  {
    id: "p4-ext-021",
    part: "Part 4",
    question: "What can customers do during the first week of sales?",
    choices: {
      A: "Receive a 15 percent discount",
      B: "Get a free replacement filter",
      C: "Preorder next month's model",
      D: "Attend a product demonstration",
    },
    answer: "A",
    explanation_zh:
      "下一步行動題。介紹中說 'for the first week, we are offering a 15 percent discount'，所以第一週購買可享 15% 折扣。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["first week", "discount", "purchase", "retail locations"],
    transcript:
      "Welcome everyone. Today I'm excited to introduce our latest product, the EcoSmart Water Bottle. This bottle is made from 100 percent recycled materials and keeps your drinks cold for up to 24 hours. It also has a built-in filter system, making it perfect for travelers. The EcoSmart will be available for purchase starting next Monday at all our retail locations and on our website. The price is $29.99, and for the first week, we are offering a 15 percent discount.",
  },
  {
    id: "p4-ext-022",
    part: "Part 4",
    question: "What is the announcement about?",
    choices: {
      A: "A new product launch",
      B: "A mandatory training workshop",
      C: "A change in company policy",
      D: "A team building event",
    },
    answer: "B",
    explanation_zh:
      "主旨題。開頭說 'training workshop on our new customer relationship management system' 且 'Attendance is mandatory'，是強制參加的教育訓練。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["training workshop", "mandatory", "customer relationship management", "sales leads", "reports"],
    transcript:
      "Attention all sales staff. A training workshop on our new customer relationship management system will be held this Wednesday from 9 a.m. to 12 p.m. in the training center. Attendance is mandatory. The workshop will cover how to enter client data, generate reports, and track sales leads. Please bring your laptops and arrive 10 minutes early so we can start on time. If you have any questions, contact the HR department.",
  },
  {
    id: "p4-ext-023",
    part: "Part 4",
    question: "What will the workshop cover?",
    choices: {
      A: "Product pricing strategies",
      B: "Customer data entry and reporting",
      C: "Office software basics",
      D: "Communication skills",
    },
    answer: "B",
    explanation_zh:
      "細節題。說明 'cover how to enter client data, generate reports, and track sales leads'，涵蓋客戶資料輸入、報表產生和銷售線索追蹤。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["client data", "generate reports", "track sales leads"],
    transcript:
      "Attention all sales staff. A training workshop on our new customer relationship management system will be held this Wednesday from 9 a.m. to 12 p.m. in the training center. Attendance is mandatory. The workshop will cover how to enter client data, generate reports, and track sales leads. Please bring your laptops and arrive 10 minutes early so we can start on time. If you have any questions, contact the HR department.",
  },
  {
    id: "p4-ext-024",
    part: "Part 4",
    question: "What does the speaker ask staff to do?",
    choices: {
      A: "Complete a pre-training quiz",
      B: "Bring their laptops",
      C: "Prepare a sales report",
      D: "Register online in advance",
    },
    answer: "B",
    explanation_zh:
      "下一步行動題。公告說 'Please bring your laptops'，要求攜帶筆電參加。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["laptops", "arrive early", "training center"],
    transcript:
      "Attention all sales staff. A training workshop on our new customer relationship management system will be held this Wednesday from 9 a.m. to 12 p.m. in the training center. Attendance is mandatory. The workshop will cover how to enter client data, generate reports, and track sales leads. Please bring your laptops and arrive 10 minutes early so we can start on time. If you have any questions, contact the HR department.",
  },
  {
    id: "p4-ext-025",
    part: "Part 4",
    question: "What is the purpose of this announcement?",
    choices: {
      A: "To warn about road construction",
      B: "To notify drivers of a highway closure",
      C: "To advertise a new road",
      D: "To report weather conditions",
    },
    answer: "B",
    explanation_zh:
      "主旨題。開頭說 'traffic update' 以及 'northbound lanes are currently closed'，是在通知高速公路封閉。",
    skill_tag: "listening_main_idea",
    difficulty: "B1",
    vocabulary: ["traffic update", "commuters", "highway", "northbound", "alternate routes", "emergency services"],
    transcript:
      "This is a traffic update for commuters on Highway 27. Due to an accident near exit 5, the northbound lanes are currently closed. Drivers are advised to take alternate routes via Park Road or Riverside Drive. Emergency services are on the scene, and the road is expected to reopen within two hours. For real-time updates, please listen to our traffic reports every 15 minutes. We apologize for the inconvenience.",
  },
  {
    id: "p4-ext-026",
    part: "Part 4",
    question: "What caused the lane closure?",
    choices: {
      A: "Road construction",
      B: "An accident",
      C: "Bad weather",
      D: "A police inspection",
    },
    answer: "B",
    explanation_zh:
      "細節題。公告說 'Due to an accident near exit 5'，是因為事故造成車道封閉。",
    skill_tag: "listening_inference",
    difficulty: "B1",
    vocabulary: ["accident", "lane closure", "exit", "northbound"],
    transcript:
      "This is a traffic update for commuters on Highway 27. Due to an accident near exit 5, the northbound lanes are currently closed. Drivers are advised to take alternate routes via Park Road or Riverside Drive. Emergency services are on the scene, and the road is expected to reopen within two hours. For real-time updates, please listen to our traffic reports every 15 minutes. We apologize for the inconvenience.",
  },
  {
    id: "p4-ext-027",
    part: "Part 4",
    question: "What does the speaker advise drivers to do?",
    choices: {
      A: "Wait in their cars",
      B: "Use alternate routes",
      C: "Call emergency services",
      D: "Check the weather forecast",
    },
    answer: "B",
    explanation_zh:
      "下一步行動題。公告說 'Drivers are advised to take alternate routes'，建議駕駛改道行駛。",
    skill_tag: "listening_next_action",
    difficulty: "B1",
    vocabulary: ["alternate routes", "advised", "reopen", "traffic reports"],
    transcript:
      "This is a traffic update for commuters on Highway 27. Due to an accident near exit 5, the northbound lanes are currently closed. Drivers are advised to take alternate routes via Park Road or Riverside Drive. Emergency services are on the scene, and the road is expected to reopen within two hours. For real-time updates, please listen to our traffic reports every 15 minutes. We apologize for the inconvenience.",
  },
  {
    id: "p4-ext-028",
    part: "Part 4",
    question: "What event is taking place?",
    choices: {
      A: "A cooking class",
      B: "An international food festival",
      C: "A restaurant grand opening",
      D: "A farmer's market",
    },
    answer: "B",
    explanation_zh:
      "主旨題。開頭說 '10th Annual International Food Festival'，是國際美食節活動。",
    skill_tag: "listening_main_idea",
    difficulty: "A2",
    vocabulary: ["annual", "food festival", "food stalls", "cuisines", "cooking demonstration"],
    transcript:
      "Thank you all for coming to the 10th Annual International Food Festival. This year, we have over 50 food stalls representing cuisines from 20 different countries. The festival will run from 11 a.m. to 9 p.m. today and tomorrow. At 3 p.m., there will be a cooking demonstration by a famous chef in the main square. Tickets can be purchased at the entrance or online. Children under 12 enter for free. Enjoy the food!",
  },
  {
    id: "p4-ext-029",
    part: "Part 4",
    question: "What will happen at 3 p.m.?",
    choices: {
      A: "The festival will close",
      B: "A famous chef will give a cooking demonstration",
      C: "Ticket prices will be reduced",
      D: "A music performance will begin",
    },
    answer: "B",
    explanation_zh:
      "細節題。公告說 'At 3 p.m., there will be a cooking demonstration by a famous chef'，下午三點有名廚烹飪示範。",
    skill_tag: "listening_inference",
    difficulty: "A2",
    vocabulary: ["cooking demonstration", "famous chef", "main square"],
    transcript:
      "Thank you all for coming to the 10th Annual International Food Festival. This year, we have over 50 food stalls representing cuisines from 20 different countries. The festival will run from 11 a.m. to 9 p.m. today and tomorrow. At 3 p.m., there will be a cooking demonstration by a famous chef in the main square. Tickets can be purchased at the entrance or online. Children under 12 enter for free. Enjoy the food!",
  },
  {
    id: "p4-ext-030",
    part: "Part 4",
    question: "What can visitors do if they need tickets?",
    choices: {
      A: "Buy them at the entrance or online",
      B: "Get them only from food stalls",
      C: "Pick them up after 9 p.m.",
      D: "Ask children under 12 to purchase them",
    },
    answer: "A",
    explanation_zh:
      "下一步行動題。公告說 'Tickets can be purchased at the entrance or online'，需要票的訪客可以在入口或線上購買。",
    skill_tag: "listening_next_action",
    difficulty: "A2",
    vocabulary: ["tickets", "purchased", "entrance", "online"],
    transcript:
      "Thank you all for coming to the 10th Annual International Food Festival. This year, we have over 50 food stalls representing cuisines from 20 different countries. The festival will run from 11 a.m. to 9 p.m. today and tomorrow. At 3 p.m., there will be a cooking demonstration by a famous chef in the main square. Tickets can be purchased at the entrance or online. Children under 12 enter for free. Enjoy the food!",
  },

  // ============ Part 7 — Short Reading (20 passages × 3 questions = 60) ============

  // Passage 1 — Email: Meeting Reschedule
  {
    id: "p7-ext-001",
    part: "Part 7",
    passage:
      "Subject: Updated Meeting Schedule\nFrom: Sarah Kim, Senior Manager\nTo: All Department Staff\n\nDear Team,\n\nI would like to inform you that the monthly department meeting originally scheduled for Tuesday, March 12, has been rescheduled to Thursday, March 14, at 2:00 P.M. The meeting will take place in Conference Room B on the fourth floor.\n\nThe agenda will remain the same: Q1 sales review, project updates, and budget planning for Q2. Please bring your printed reports and any relevant documents.\n\nRefreshments will be provided. If you are unable to attend, please notify me by end of day Monday so we can arrange for you to join remotely.\n\nBest regards,\nSarah Kim\nSenior Manager, Sales Division",
    question: "What is the main purpose of this email?",
    choices: {
      A: "To cancel a scheduled meeting",
      B: "To announce a change in meeting date",
      C: "To introduce a new meeting agenda",
      D: "To request budget approval"
  },
    answer: "B",
    explanation_zh:
      "主旨題：Email 開頭說「the meeting has been rescheduled to Thursday, March 14」，目的是通知會議日期更改。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["reschedule", "agenda", "relevant", "refreshments", "remotely"]
,
  passage_group_id: "p7-single-001",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-002",
    part: "Part 7",
    passage:
      "Subject: Updated Meeting Schedule\nFrom: Sarah Kim, Senior Manager\nTo: All Department Staff\n\nDear Team,\n\nI would like to inform you that the monthly department meeting originally scheduled for Tuesday, March 12, has been rescheduled to Thursday, March 14, at 2:00 P.M. The meeting will take place in Conference Room B on the fourth floor.\n\nThe agenda will remain the same: Q1 sales review, project updates, and budget planning for Q2. Please bring your printed reports and any relevant documents.\n\nRefreshments will be provided. If you are unable to attend, please notify me by end of day Monday so we can arrange for you to join remotely.\n\nBest regards,\nSarah Kim\nSenior Manager, Sales Division",
    question: "Where will the rescheduled meeting take place?",
    choices: {
      A: "Conference Room A on the third floor",
      B: "The main office",
      C: "Conference Room B on the fourth floor",
      D: "Remotely via video call"
  },
    answer: "C",
    explanation_zh:
      "細節題：Email 明確說「Conference Room B on the fourth floor」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["conference room", "fourth floor", "department", "sales division"]
,
  passage_group_id: "p7-single-001",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-003",
    part: "Part 7",
    passage:
      "Subject: Updated Meeting Schedule\nFrom: Sarah Kim, Senior Manager\nTo: All Department Staff\n\nDear Team,\n\nI would like to inform you that the monthly department meeting originally scheduled for Tuesday, March 12, has been rescheduled to Thursday, March 14, at 2:00 P.M. The meeting will take place in Conference Room B on the fourth floor.\n\nThe agenda will remain the same: Q1 sales review, project updates, and budget planning for Q2. Please bring your printed reports and any relevant documents.\n\nRefreshments will be provided. If you are unable to attend, please notify me by end of day Monday so we can arrange for you to join remotely.\n\nBest regards,\nSarah Kim\nSenior Manager, Sales Division",
    question: "What can be inferred about employees who cannot attend the meeting?",
    choices: {
      A: "They must submit a written excuse",
      B: "They can join the meeting remotely",
      C: "They will receive a separate briefing",
      D: "They are excused from the agenda"
  },
    answer: "B",
    explanation_zh:
      "推論題：Email 說「we can arrange for you to join remotely」，表示不能出席的人可以遠端參加。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["unable to attend", "notify", "arrange", "join remotely"]
,
  passage_group_id: "p7-single-001",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 2 — Notice: Building Maintenance
  {
    id: "p7-ext-004",
    part: "Part 7",
    passage:
      "BUILDING MAINTENANCE NOTICE\n\nThe building management team at Parkview Office Tower would like to inform all tenants that scheduled maintenance work will be conducted from Monday, April 8, through Wednesday, April 10.\n\nDuring this period, the following services will be temporarily unavailable:\n• Passenger elevators (except emergency use)\n• Underground parking (accessible via street-level entrance only)\n• Rooftop terrace\n\nNormal operations will resume on Thursday, April 11. We apologize for any inconvenience this may cause.\n\nFor urgent inquiries, please contact the building management office at extension 100.",
    question: "What is the notice mainly about?",
    choices: {
      A: "A new parking policy",
      B: "Emergency evacuation procedures",
      C: "Temporary service interruptions during maintenance",
      D: "Changes to office operating hours"
  },
    answer: "C",
    explanation_zh:
      "主旨題：公告說明「scheduled maintenance work」期間多項服務「temporarily unavailable」。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["tenants", "maintenance", "temporarily unavailable", "resume", "inconvenience"]
,
  passage_group_id: "p7-single-002",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-005",
    part: "Part 7",
    passage:
      "BUILDING MAINTENANCE NOTICE\n\nThe building management team at Parkview Office Tower would like to inform all tenants that scheduled maintenance work will be conducted from Monday, April 8, through Wednesday, April 10.\n\nDuring this period, the following services will be temporarily unavailable:\n• Passenger elevators (except emergency use)\n• Underground parking (accessible via street-level entrance only)\n• Rooftop terrace\n\nNormal operations will resume on Thursday, April 11. We apologize for any inconvenience this may cause.\n\nFor urgent inquiries, please contact the building management office at extension 100.",
    question: "According to the notice, which service will NOT be affected by the maintenance?",
    choices: {
      A: "Rooftop terrace access",
      B: "Underground parking entrance",
      C: "Passenger elevator service",
      D: "Street-level building entrance"
  },
    answer: "D",
    explanation_zh:
      "細節題：公告列出受影響的三項服務，街道層入口（street-level entrance）不在其中，反而是地下停車的替代方案。",
    skill_tag: "reading_detail",
    difficulty: "B1",
    vocabulary: ["passenger elevator", "underground parking", "street-level", "accessible"]
,
  passage_group_id: "p7-single-002",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-006",
    part: "Part 7",
    passage:
      "BUILDING MAINTENANCE NOTICE\n\nThe building management team at Parkview Office Tower would like to inform all tenants that scheduled maintenance work will be conducted from Monday, April 8, through Wednesday, April 10.\n\nDuring this period, the following services will be temporarily unavailable:\n• Passenger elevators (except emergency use)\n• Underground parking (accessible via street-level entrance only)\n• Rooftop terrace\n\nNormal operations will resume on Thursday, April 11. We apologize for any inconvenience this may cause.\n\nFor urgent inquiries, please contact the building management office at extension 100.",
    question: "What can be inferred about the rooftop terrace during April 8–10?",
    choices: {
      A: "It will be permanently closed",
      B: "It will be unavailable to tenants",
      C: "It requires a special key card",
      D: "It will be open for emergency use only"
  },
    answer: "B",
    explanation_zh:
      "推論題：公告列出 rooftop terrace 為「temporarily unavailable」服務之一，因此 April 8–10 期間租客無法使用。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["rooftop terrace", "temporarily", "urgent inquiries", "extension"]
,
  passage_group_id: "p7-single-002",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 3 — Advertisement: Office Supply Store
  {
    id: "p7-ext-007",
    part: "Part 7",
    passage:
      "GRAND OPENING SALE\nMeridian Office Supplies – Now Open!\n\nWe are thrilled to announce the grand opening of Meridian Office Supplies, your one-stop shop for all business and stationery needs!\n\nFrom September 1–15, enjoy:\n- 20% OFF all furniture items\n- 10% OFF printer cartridges and paper\n- FREE delivery on orders over $150\n\nVisit us at 88 Commerce Street, Downtown Business District, or shop online at www.meridianoffice.com.\n\nPresent this advertisement to receive an additional 5% discount on your first purchase. Offer valid for new customers only. Cannot be combined with other promotions.\n\nOpen Monday–Saturday, 9:00 A.M. to 7:00 P.M.",
    question: "What is the main purpose of this advertisement?",
    choices: {
      A: "To announce a store closure sale",
      B: "To promote the opening of a new office supply store",
      C: "To advertise online shopping only",
      D: "To recruit store employees"
  },
    answer: "B",
    explanation_zh:
      "主旨題：廣告標題是「GRAND OPENING SALE」，目的是宣傳新店開幕優惠。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["grand opening", "stationery", "one-stop shop", "printer cartridges", "promotion"]
,
  passage_group_id: "p7-single-003",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-008",
    part: "Part 7",
    passage:
      "GRAND OPENING SALE\nMeridian Office Supplies – Now Open!\n\nWe are thrilled to announce the grand opening of Meridian Office Supplies, your one-stop shop for all business and stationery needs!\n\nFrom September 1–15, enjoy:\n- 20% OFF all furniture items\n- 10% OFF printer cartridges and paper\n- FREE delivery on orders over $150\n\nVisit us at 88 Commerce Street, Downtown Business District, or shop online at www.meridianoffice.com.\n\nPresent this advertisement to receive an additional 5% discount on your first purchase. Offer valid for new customers only. Cannot be combined with other promotions.\n\nOpen Monday–Saturday, 9:00 A.M. to 7:00 P.M.",
    question: "What discount is offered on furniture items during the sale?",
    choices: {
      A: "5%",
      B: "10%",
      C: "15%",
      D: "20%"
  },
    answer: "D",
    explanation_zh:
      "細節題：廣告明確說「20% OFF all furniture items」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["furniture", "discount", "off", "delivery", "cartridges"]
,
  passage_group_id: "p7-single-003",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-009",
    part: "Part 7",
    passage:
      "GRAND OPENING SALE\nMeridian Office Supplies – Now Open!\n\nWe are thrilled to announce the grand opening of Meridian Office Supplies, your one-stop shop for all business and stationery needs!\n\nFrom September 1–15, enjoy:\n- 20% OFF all furniture items\n- 10% OFF printer cartridges and paper\n- FREE delivery on orders over $150\n\nVisit us at 88 Commerce Street, Downtown Business District, or shop online at www.meridianoffice.com.\n\nPresent this advertisement to receive an additional 5% discount on your first purchase. Offer valid for new customers only. Cannot be combined with other promotions.\n\nPresent this advertisement to receive an additional 5% discount on your first purchase. Offer valid for new customers only. Cannot be combined with other promotions.\n\nOpen Monday–Saturday, 9:00 A.M. to 7:00 P.M.",
    question: "What can be inferred about a customer using the advertisement discount?",
    choices: {
      A: "They must be existing loyalty members",
      B: "They can combine it with the furniture discount",
      C: "They must be making their first purchase",
      D: "They need a membership card"
  },
    answer: "C",
    explanation_zh:
      "推論題：廣告說「Offer valid for new customers only」，因此使用此折扣的顧客一定是首次購物的新客戶。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["present", "additional", "valid", "combined", "promotions"]
,
  passage_group_id: "p7-single-004",
  passage_group_type: "single",
  question_order: 1,
},

  // Passage 4 — Memo: Leave Policy Update
  {
    id: "p7-ext-010",
    part: "Part 7",
    passage:
      "MEMORANDUM\n\nTO: All Staff\nFROM: Human Resources Department\nDATE: June 5\nRE: Updated Leave Policy\n\nEffective July 1, the company is implementing an updated annual leave policy. All full-time employees with more than one year of service will be entitled to 15 days of paid annual leave per year, an increase from the current 12 days.\n\nEmployees must submit leave requests at least one week in advance using the online HR portal. Last-minute requests will require direct supervisor approval.\n\nPart-time employees and those with less than one year of service will continue under the existing policy. For questions, please contact Human Resources at hr@company.com.",
    question: "What is this memo mainly about?",
    choices: {
      A: "New hiring procedures",
      B: "An update to the company's leave policy",
      C: "Changes to the HR portal system",
      D: "New overtime pay regulations"
  },
    answer: "B",
    explanation_zh:
      "主旨題：備忘錄主旨欄寫「Updated Leave Policy」，內容說明年假天數增加。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["memorandum", "entitled", "annual leave", "supervisor", "HR portal"]
,
  passage_group_id: "p7-single-005",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-011",
    part: "Part 7",
    passage:
      "MEMORANDUM\n\nTO: All Staff\nFROM: Human Resources Department\nDATE: June 5\nRE: Updated Leave Policy\n\nEffective July 1, the company is implementing an updated annual leave policy. All full-time employees with more than one year of service will be entitled to 15 days of paid annual leave per year, an increase from the current 12 days.\n\nEmployees must submit leave requests at least one week in advance using the online HR portal. Last-minute requests will require direct supervisor approval.\n\nPart-time employees and those with less than one year of service will continue under the existing policy. For questions, please contact Human Resources at hr@company.com.",
    question: "How many paid leave days will eligible full-time employees receive starting July 1?",
    choices: {
      A: "10 days",
      B: "12 days",
      C: "15 days",
      D: "20 days"
  },
    answer: "C",
    explanation_zh:
      "細節題：備忘錄說「entitled to 15 days of paid annual leave per year」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["paid leave", "entitled", "full-time", "service", "implementing"]
,
  passage_group_id: "p7-single-005",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-012",
    part: "Part 7",
    passage:
      "MEMORANDUM\n\nTO: All Staff\nFROM: Human Resources Department\nDATE: June 5\nRE: Updated Leave Policy\n\nEffective July 1, the company is implementing an updated annual leave policy. All full-time employees with more than one year of service will be entitled to 15 days of paid annual leave per year, an increase from the current 12 days.\n\nEmployees must submit leave requests at least one week in advance using the online HR portal. Last-minute requests will require direct supervisor approval.\n\nPart-time employees and those with less than one year of service will continue under the existing policy. For questions, please contact Human Resources at hr@company.com.",
    question: "What can be inferred about part-time employees under the new policy?",
    choices: {
      A: "They will now receive 15 days of annual leave",
      B: "They are not entitled to any annual leave",
      C: "The new policy will not affect them",
      D: "They must contact HR to verify their leave balance"
  },
    answer: "C",
    explanation_zh:
      "推論題：備忘錄說「Part-time employees...will continue under the existing policy」，新政策不影響兼職員工。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["part-time", "existing policy", "last-minute", "advance", "approval"]
,
  passage_group_id: "p7-single-005",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 5 — Schedule: Training Workshop
  {
    id: "p7-ext-013",
    part: "Part 7",
    passage:
      "PROFESSIONAL DEVELOPMENT WORKSHOP SCHEDULE\nGreenfield Corporation – Q3 Training Program\n\nAll employees are required to attend at least one workshop during the quarter. Registration must be completed through the company intranet portal by June 15.\n\nDate       | Workshop                  | Location     | Duration\nJune 22    | Business Communication    | Room 201     | Half day\nJuly 10    | Data Analysis Basics      | Computer Lab | Full day\nJuly 24    | Project Management        | Room 101     | Half day\nAugust 7   | Leadership and Teamwork   | Auditorium   | Full day\n\nNote: Full-day workshops include lunch. Participants will receive a certificate of completion.",
    question: "What is the purpose of this schedule?",
    choices: {
      A: "A product launch event lineup",
      B: "A quarterly employee training program",
      C: "Annual performance review sessions",
      D: "A client meeting calendar"
  },
    answer: "B",
    explanation_zh:
      "主旨題：標題明確說「Q3 Training Program」，表示這是每季一次的員工培訓計畫。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["professional development", "workshop", "intranet portal", "certificate", "quarter"]
,
  passage_group_id: "p7-single-006",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-014",
    part: "Part 7",
    passage:
      "PROFESSIONAL DEVELOPMENT WORKSHOP SCHEDULE\nGreenfield Corporation – Q3 Training Program\n\nAll employees are required to attend at least one workshop during the quarter. Registration must be completed through the company intranet portal by June 15.\n\nDate       | Workshop                  | Location     | Duration\nJune 22    | Business Communication    | Room 201     | Half day\nJuly 10    | Data Analysis Basics      | Computer Lab | Full day\nJuly 24    | Project Management        | Room 101     | Half day\nAugust 7   | Leadership and Teamwork   | Auditorium   | Full day\n\nNote: Full-day workshops include lunch. Participants will receive a certificate of completion.",
    question: "Which workshop is held in the Auditorium?",
    choices: {
      A: "Business Communication",
      B: "Data Analysis Basics",
      C: "Project Management",
      D: "Leadership and Teamwork"
  },
    answer: "D",
    explanation_zh:
      "細節題：時間表中 August 7 的「Leadership and Teamwork」在 Auditorium 舉行。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["auditorium", "data analysis", "leadership", "teamwork", "duration"]
,
  passage_group_id: "p7-single-006",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-015",
    part: "Part 7",
    passage:
      "PROFESSIONAL DEVELOPMENT WORKSHOP SCHEDULE\nGreenfield Corporation – Q3 Training Program\n\nAll employees are required to attend at least one workshop during the quarter. Registration must be completed through the company intranet portal by June 15.\n\nDate       | Workshop                  | Location     | Duration\nJune 22    | Business Communication    | Room 201     | Half day\nJuly 10    | Data Analysis Basics      | Computer Lab | Full day\nJuly 24    | Project Management        | Room 101     | Half day\nAugust 7   | Leadership and Teamwork   | Auditorium   | Full day\n\nNote: Full-day workshops include lunch. Participants will receive a certificate of completion.",
    question: "What can be inferred about participants of the July 10 workshop?",
    choices: {
      A: "They will not receive lunch",
      B: "Lunch will be provided for them",
      C: "They must bring their own laptop",
      D: "The workshop requires prior experience"
  },
    answer: "B",
    explanation_zh:
      "推論題：備注說「Full-day workshops include lunch」，July 10 是 Full day，因此午餐會被提供。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["full day", "half day", "include", "participants", "completion"]
,
  passage_group_id: "p7-single-006",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 6 — Invoice
  {
    id: "p7-ext-016",
    part: "Part 7",
    passage:
      "INVOICE\n\nBrightline Office Solutions\nInvoice No.: BOS-2024-0892\nDate: September 30\nPayment Due: October 30\n\nBill To: Apex Financial Group\nAccount Manager: James Lim\n\nItem Description          | Qty | Unit Price | Total\nOffice chairs (ergonomic) |  10 | $240.00    | $2,400.00\nStanding desks            |   5 | $480.00    | $2,400.00\nCable management kits     |  15 | $32.00     | $480.00\n\nSubtotal: $5,280.00\nTax (8%): $422.40\nTOTAL DUE: $5,702.40\n\nPayment can be made by bank transfer or company check.\nFor inquiries, contact billing@brightline.com.",
    question: "What is the purpose of this document?",
    choices: {
      A: "To confirm a delivery has been completed",
      B: "To request payment for goods supplied",
      C: "To list available office furniture for sale",
      D: "To update customer account information"
  },
    answer: "B",
    explanation_zh:
      "主旨題：這是一份發票（Invoice），用途是請客戶支付已供應商品的款項。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["invoice", "payment due", "subtotal", "tax", "bank transfer"]
,
  passage_group_id: "p7-single-007",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-017",
    part: "Part 7",
    passage:
      "INVOICE\n\nBrightline Office Solutions\nInvoice No.: BOS-2024-0892\nDate: September 30\nPayment Due: October 30\n\nBill To: Apex Financial Group\nAccount Manager: James Lim\n\nItem Description          | Qty | Unit Price | Total\nOffice chairs (ergonomic) |  10 | $240.00    | $2,400.00\nStanding desks            |   5 | $480.00    | $2,400.00\nCable management kits     |  15 | $32.00     | $480.00\n\nSubtotal: $5,280.00\nTax (8%): $422.40\nTOTAL DUE: $5,702.40\n\nPayment can be made by bank transfer or company check.\nFor inquiries, contact billing@brightline.com.",
    question: "What is the total amount due on this invoice?",
    choices: {
      A: "$5,280.00",
      B: "$422.40",
      C: "$5,702.40",
      D: "$2,400.00"
  },
    answer: "C",
    explanation_zh:
      "細節題：發票最後一行「TOTAL DUE: $5,702.40」即為含稅總金額。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["ergonomic", "standing desk", "cable management", "total due", "account manager"]
,
  passage_group_id: "p7-single-007",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-018",
    part: "Part 7",
    passage:
      "INVOICE\n\nBrightline Office Solutions\nInvoice No.: BOS-2024-0892\nDate: September 30\nPayment Due: October 30\n\nBill To: Apex Financial Group\nAccount Manager: James Lim\n\nItem Description          | Qty | Unit Price | Total\nOffice chairs (ergonomic) |  10 | $240.00    | $2,400.00\nStanding desks            |   5 | $480.00    | $2,400.00\nCable management kits     |  15 | $32.00     | $480.00\n\nSubtotal: $5,280.00\nTax (8%): $422.40\nTOTAL DUE: $5,702.40\n\nPayment can be made by bank transfer or company check.\nFor inquiries, contact billing@brightline.com.",
    question: "What can be inferred about the payment deadline?",
    choices: {
      A: "Payment has already been received",
      B: "Payment is due within 30 days of the invoice date",
      C: "Payment must be made in cash only",
      D: "A late fee applies immediately after the due date"
  },
    answer: "B",
    explanation_zh:
      "推論題：Invoice Date 是 September 30，Payment Due 是 October 30，相差 30 天，可推論付款條件為 Net 30。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["payment due", "invoice date", "bank transfer", "company check", "inquiries"]
,
  passage_group_id: "p7-single-007",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 7 — Event Announcement: Company Picnic
  {
    id: "p7-ext-019",
    part: "Part 7",
    passage:
      "ANNUAL COMPANY PICNIC – SAVE THE DATE!\n\nJoin us for the 5th Annual Hartfield Technologies Company Picnic!\n\nDate: Saturday, August 17\nTime: 11:00 A.M. – 4:00 P.M.\nLocation: Riverside Park, Pavilion Area\nDress Code: Casual\n\nThis year's event will feature a barbecue lunch, outdoor games, a raffle with exciting prizes, and live music from 2:00 P.M. to 4:00 P.M.\n\nAll employees and their immediate family members are welcome. Please register by August 10 through the company portal so we can prepare sufficient food and seating.\n\nSponsored by the Employee Engagement Committee.",
    question: "What type of event is being announced?",
    choices: {
      A: "A product launch ceremony",
      B: "An annual employee social event",
      C: "A client appreciation dinner",
      D: "A charity fundraising gala"
  },
    answer: "B",
    explanation_zh:
      "主旨題：公告標題是「Annual Company Picnic」，這是每年一次的員工社交活動。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["picnic", "raffle", "pavilion", "barbecue", "Employee Engagement Committee"]
,
  passage_group_id: "p7-single-008",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-020",
    part: "Part 7",
    passage:
      "ANNUAL COMPANY PICNIC – SAVE THE DATE!\n\nJoin us for the 5th Annual Hartfield Technologies Company Picnic!\n\nDate: Saturday, August 17\nTime: 11:00 A.M. – 4:00 P.M.\nLocation: Riverside Park, Pavilion Area\nDress Code: Casual\n\nThis year's event will feature a barbecue lunch, outdoor games, a raffle with exciting prizes, and live music from 2:00 P.M. to 4:00 P.M.\n\nAll employees and their immediate family members are welcome. Please register by August 10 through the company portal so we can prepare sufficient food and seating.\n\nSponsored by the Employee Engagement Committee.",
    question: "Until what time does the live music last?",
    choices: {
      A: "11:00 A.M.",
      B: "2:00 P.M.",
      C: "3:00 P.M.",
      D: "4:00 P.M."
  },
    answer: "D",
    explanation_zh:
      "細節題：公告說「live music from 2:00 P.M. to 4:00 P.M.」，因此現場音樂到 4:00 P.M. 結束。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["live music", "outdoor games", "raffle", "prizes", "register"]
,
  passage_group_id: "p7-single-008",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-021",
    part: "Part 7",
    passage:
      "ANNUAL COMPANY PICNIC – SAVE THE DATE!\n\nJoin us for the 5th Annual Hartfield Technologies Company Picnic!\n\nDate: Saturday, August 17\nTime: 11:00 A.M. – 4:00 P.M.\nLocation: Riverside Park, Pavilion Area\nDress Code: Casual\n\nThis year's event will feature a barbecue lunch, outdoor games, a raffle with exciting prizes, and live music from 2:00 P.M. to 4:00 P.M.\n\nAll employees and their immediate family members are welcome. Please register by August 10 through the company portal so we can prepare sufficient food and seating.\n\nSponsored by the Employee Engagement Committee.",
    question: "What can be inferred about the registration requirement?",
    choices: {
      A: "Only managers need to register in advance",
      B: "Registration helps organizers plan food and seating",
      C: "Attendees must pay a registration fee",
      D: "Walk-in attendees are not permitted"
  },
    answer: "B",
    explanation_zh:
      "推論題：公告說「register...so we can prepare sufficient food and seating」，表示登記的目的是讓主辦方知道人數，以便準備食物和座位。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["register", "sufficient", "seating", "immediate family", "portal"]
,
  passage_group_id: "p7-single-008",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 8 — Job Posting: Marketing Coordinator
  {
    id: "p7-ext-022",
    part: "Part 7",
    passage:
      "JOB POSTING\n\nPosition: Marketing Coordinator\nCompany: Nexus Global Media\nLocation: Singapore (Hybrid)\nSalary: S$3,500 – S$4,500/month\n\nWe are looking for a motivated Marketing Coordinator to join our growing team. The ideal candidate will have:\n• Bachelor's degree in Marketing, Communications, or related field\n• 1–3 years of marketing experience\n• Proficiency in social media management tools\n• Strong written and verbal communication skills\n• Ability to work both independently and as part of a team\n\nResponsibilities include managing social media accounts, assisting with campaign planning, preparing marketing reports, and coordinating with external vendors.\n\nTo apply, send your resume and cover letter to careers@nexusglobal.com by November 30.",
    question: "What position is being advertised in this posting?",
    choices: {
      A: "Senior Marketing Manager",
      B: "Marketing Coordinator",
      C: "Social Media Director",
      D: "Communications Specialist"
  },
    answer: "B",
    explanation_zh:
      "主旨題：職缺標題清楚寫明「Position: Marketing Coordinator」。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["marketing coordinator", "hybrid", "proficiency", "vendor", "campaign"]
,
  passage_group_id: "p7-single-009",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-023",
    part: "Part 7",
    passage:
      "JOB POSTING\n\nPosition: Marketing Coordinator\nCompany: Nexus Global Media\nLocation: Singapore (Hybrid)\nSalary: S$3,500 – S$4,500/month\n\nWe are looking for a motivated Marketing Coordinator to join our growing team. The ideal candidate will have:\n• Bachelor's degree in Marketing, Communications, or related field\n• 1–3 years of marketing experience\n• Proficiency in social media management tools\n• Strong written and verbal communication skills\n• Ability to work both independently and as part of a team\n\nResponsibilities include managing social media accounts, assisting with campaign planning, preparing marketing reports, and coordinating with external vendors.\n\nTo apply, send your resume and cover letter to careers@nexusglobal.com by November 30.",
    question: "What is the application deadline for this position?",
    choices: {
      A: "November 15",
      B: "November 20",
      C: "November 30",
      D: "December 1"
  },
    answer: "C",
    explanation_zh:
      "細節題：職缺最後說「send your resume...by November 30」，截止日是 November 30。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["resume", "cover letter", "deadline", "bachelor's degree", "verbal communication"]
,
  passage_group_id: "p7-single-009",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-024",
    part: "Part 7",
    passage:
      "JOB POSTING\n\nPosition: Marketing Coordinator\nCompany: Nexus Global Media\nLocation: Singapore (Hybrid)\nSalary: S$3,500 – S$4,500/month\n\nWe are looking for a motivated Marketing Coordinator to join our growing team. The ideal candidate will have:\n• Bachelor's degree in Marketing, Communications, or related field\n• 1–3 years of marketing experience\n• Proficiency in social media management tools\n• Strong written and verbal communication skills\n• Ability to work both independently and as part of a team\n\nResponsibilities include managing social media accounts, assisting with campaign planning, preparing marketing reports, and coordinating with external vendors.\n\nTo apply, send your resume and cover letter to careers@nexusglobal.com by November 30.",
    question: "What can be inferred about the work arrangement for this position?",
    choices: {
      A: "It requires working full-time in the office every day",
      B: "It is fully remote with no office visits required",
      C: "It involves both working in the office and from home",
      D: "It requires frequent international travel"
  },
    answer: "C",
    explanation_zh:
      "推論題：Location 標示為「Singapore (Hybrid)」，Hybrid 表示混合辦公模式，即部分在辦公室、部分在家工作。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["hybrid", "arrangement", "independently", "social media", "coordinating"]
,
  passage_group_id: "p7-single-009",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 9 — Reservation Confirmation: Hotel
  {
    id: "p7-ext-025",
    part: "Part 7",
    passage:
      "RESERVATION CONFIRMATION\n\nGuest Name: Robert Chen\nConfirmation No.: HTL-88742\nHotel: The Grand Meridian Hotel\nCheck-in: Friday, October 11, 3:00 P.M.\nCheck-out: Sunday, October 13, 12:00 P.M.\nRoom Type: Deluxe King Room\nRate: $180 per night (2 nights = $360)\n\nIncludes: Complimentary breakfast for two, free Wi-Fi, parking\nSpecial Request: Non-smoking room (confirmed)\n\nCancellation Policy: Free cancellation until October 8. Cancellations after October 8 will be charged one night's fee.\n\nFor any changes or inquiries, call +65-6888-0011 or email reservations@grandmeridian.com.",
    question: "What type of document is this?",
    choices: {
      A: "A hotel billing statement",
      B: "A hotel reservation confirmation",
      C: "A room service menu",
      D: "A hotel membership application"
  },
    answer: "B",
    explanation_zh:
      "主旨題：文件標題是「RESERVATION CONFIRMATION」，是訂房確認單。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["reservation", "confirmation", "check-in", "check-out", "complimentary"]
,
  passage_group_id: "p7-single-010",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-026",
    part: "Part 7",
    passage:
      "RESERVATION CONFIRMATION\n\nGuest Name: Robert Chen\nConfirmation No.: HTL-88742\nHotel: The Grand Meridian Hotel\nCheck-in: Friday, October 11, 3:00 P.M.\nCheck-out: Sunday, October 13, 12:00 P.M.\nRoom Type: Deluxe King Room\nRate: $180 per night (2 nights = $360)\n\nIncludes: Complimentary breakfast for two, free Wi-Fi, parking\nSpecial Request: Non-smoking room (confirmed)\n\nCancellation Policy: Free cancellation until October 8. Cancellations after October 8 will be charged one night's fee.\n\nFor any changes or inquiries, call +65-6888-0011 or email reservations@grandmeridian.com.",
    question: "What amenity is included in Robert Chen's reservation?",
    choices: {
      A: "Airport transportation",
      B: "Complimentary dinner",
      C: "Free parking",
      D: "Spa access"
  },
    answer: "C",
    explanation_zh:
      "細節題：Includes 欄位列出「complimentary breakfast for two, free Wi-Fi, parking」，其中包含免費停車。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["amenity", "complimentary", "non-smoking", "cancellation policy", "inquiry"]
,
  passage_group_id: "p7-single-010",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-027",
    part: "Part 7",
    passage:
      "RESERVATION CONFIRMATION\n\nGuest Name: Robert Chen\nConfirmation No.: HTL-88742\nHotel: The Grand Meridian Hotel\nCheck-in: Friday, October 11, 3:00 P.M.\nCheck-out: Sunday, October 13, 12:00 P.M.\nRoom Type: Deluxe King Room\nRate: $180 per night (2 nights = $360)\n\nIncludes: Complimentary breakfast for two, free Wi-Fi, parking\nSpecial Request: Non-smoking room (confirmed)\n\nCancellation Policy: Free cancellation until October 8. Cancellations after October 8 will be charged one night's fee.\n\nFor any changes or inquiries, call +65-6888-0011 or email reservations@grandmeridian.com.",
    question: "What can be inferred about a cancellation made on October 9?",
    choices: {
      A: "It will be free of charge",
      B: "It will result in a full refund",
      C: "It will incur a charge of one night's rate",
      D: "It requires written notice by mail"
  },
    answer: "C",
    explanation_zh:
      "推論題：取消政策說「Cancellations after October 8 will be charged one night's fee」，October 9 在期限之後，會被收取一晚費用（$180）。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["cancellation policy", "charged", "free cancellation", "incur", "fee"]
,
  passage_group_id: "p7-single-010",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 10 — Product Information: Scanner
  {
    id: "p7-ext-028",
    part: "Part 7",
    passage:
      "PRODUCT INFORMATION SHEET\n\nProduct: ProScan X200 Wireless Document Scanner\nModel: PS-X200-BK\nManufacturer: TechVision Inc.\n\nKey Features:\n• Scan speed: Up to 25 pages per minute\n• Wireless connectivity: Bluetooth and Wi-Fi\n• Compatible with Mac, Windows, iOS, and Android\n• Automatic document feeder (ADF) capacity: 50 sheets\n• Duplex scanning (both sides simultaneously)\n• Cloud integration with Google Drive and Dropbox\n\nPackage Contents: Scanner, power adapter, USB cable, quick start guide\n\nWarranty: 1-year limited warranty\nTechnical support: 1-800-TECHVIS (weekdays, 9 A.M. – 6 P.M.)",
    question: "What product is described in this document?",
    choices: {
      A: "A wireless printer",
      B: "A wireless document scanner",
      C: "A photocopier",
      D: "A laptop computer"
  },
    answer: "B",
    explanation_zh:
      "主旨題：產品名稱是「ProScan X200 Wireless Document Scanner」，是無線文件掃描器。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["scanner", "wireless", "duplex", "ADF", "cloud integration"]
,
  passage_group_id: "p7-single-011",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-029",
    part: "Part 7",
    passage:
      "PRODUCT INFORMATION SHEET\n\nProduct: ProScan X200 Wireless Document Scanner\nModel: PS-X200-BK\nManufacturer: TechVision Inc.\n\nKey Features:\n• Scan speed: Up to 25 pages per minute\n• Wireless connectivity: Bluetooth and Wi-Fi\n• Compatible with Mac, Windows, iOS, and Android\n• Automatic document feeder (ADF) capacity: 50 sheets\n• Duplex scanning (both sides simultaneously)\n• Cloud integration with Google Drive and Dropbox\n\nPackage Contents: Scanner, power adapter, USB cable, quick start guide\n\nWarranty: 1-year limited warranty\nTechnical support: 1-800-TECHVIS (weekdays, 9 A.M. – 6 P.M.)",
    question: "How many sheets can the automatic document feeder hold?",
    choices: {
      A: "10 sheets",
      B: "25 sheets",
      C: "50 sheets",
      D: "100 sheets"
  },
    answer: "C",
    explanation_zh:
      "細節題：規格說「Automatic document feeder (ADF) capacity: 50 sheets」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["automatic document feeder", "capacity", "duplex", "simultaneously", "power adapter"]
,
  passage_group_id: "p7-single-011",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-030",
    part: "Part 7",
    passage:
      "PRODUCT INFORMATION SHEET\n\nProduct: ProScan X200 Wireless Document Scanner\nModel: PS-X200-BK\nManufacturer: TechVision Inc.\n\nKey Features:\n• Scan speed: Up to 25 pages per minute\n• Wireless connectivity: Bluetooth and Wi-Fi\n• Compatible with Mac, Windows, iOS, and Android\n• Automatic document feeder (ADF) capacity: 50 sheets\n• Duplex scanning (both sides simultaneously)\n• Cloud integration with Google Drive and Dropbox\n\nPackage Contents: Scanner, power adapter, USB cable, quick start guide\n\nWarranty: 1-year limited warranty\nTechnical support: 1-800-TECHVIS (weekdays, 9 A.M. – 6 P.M.)",
    question: "What can be inferred about technical support?",
    choices: {
      A: "It is available 24 hours a day",
      B: "It is only available on weekends",
      C: "It can be reached only by email",
      D: "It is not available on weekends"
  },
    answer: "D",
    explanation_zh:
      "推論題：技術支援時間是「weekdays, 9 A.M. – 6 P.M.」，weekdays 指工作日，即週末不提供支援。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["technical support", "warranty", "weekdays", "connectivity", "compatible"]
,
  passage_group_id: "p7-single-011",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 11 — Email: Expense Report Reminder
  {
    id: "p7-ext-031",
    part: "Part 7",
    passage:
      "Subject: Expense Report Submission Reminder\nFrom: Finance Department\nTo: All Project Staff\n\nDear Team,\n\nThis is a reminder that all expense reports for October must be submitted no later than November 5. Please ensure that all receipts are attached and that expenses are categorized correctly.\n\nReports submitted without proper documentation will be returned for correction and may delay your reimbursement. Reimbursements are typically processed within 10 business days after approval.\n\nTo submit your report, log in to the Finance Portal at finance.company.com and follow the online submission instructions. If you have any questions, please contact finance@company.com.\n\nThank you for your cooperation.\nFinance Department",
    question: "What is the main purpose of this email?",
    choices: {
      A: "To announce a new reimbursement policy",
      B: "To remind staff about the expense report deadline",
      C: "To introduce the new Finance Portal",
      D: "To reduce the company travel budget"
  },
    answer: "B",
    explanation_zh:
      "主旨題：Email 是提醒員工「all expense reports for October must be submitted no later than November 5」。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["expense report", "reimbursement", "submission", "receipts", "categorized"]
,
  passage_group_id: "p7-single-012",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-032",
    part: "Part 7",
    passage:
      "Subject: Expense Report Submission Reminder\nFrom: Finance Department\nTo: All Project Staff\n\nDear Team,\n\nThis is a reminder that all expense reports for October must be submitted no later than November 5. Please ensure that all receipts are attached and that expenses are categorized correctly.\n\nReports submitted without proper documentation will be returned for correction and may delay your reimbursement. Reimbursements are typically processed within 10 business days after approval.\n\nTo submit your report, log in to the Finance Portal at finance.company.com and follow the online submission instructions. If you have any questions, please contact finance@company.com.\n\nThank you for your cooperation.\nFinance Department",
    question: "What happens if a report is submitted without proper documentation?",
    choices: {
      A: "It is automatically approved",
      B: "It is forwarded to senior management",
      C: "It is returned for correction",
      D: "The employee is charged a penalty fee"
  },
    answer: "C",
    explanation_zh:
      "細節題：Email 說「Reports submitted without proper documentation will be returned for correction」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["documentation", "returned", "correction", "delay", "approval"]
,
  passage_group_id: "p7-single-012",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-033",
    part: "Part 7",
    passage:
      "Subject: Expense Report Submission Reminder\nFrom: Finance Department\nTo: All Project Staff\n\nDear Team,\n\nThis is a reminder that all expense reports for October must be submitted no later than November 5. Please ensure that all receipts are attached and that expenses are categorized correctly.\n\nReports submitted without proper documentation will be returned for correction and may delay your reimbursement. Reimbursements are typically processed within 10 business days after approval.\n\nTo submit your report, log in to the Finance Portal at finance.company.com and follow the online submission instructions. If you have any questions, please contact finance@company.com.\n\nThank you for your cooperation.\nFinance Department",
    question: "What can be inferred about the reimbursement timeline?",
    choices: {
      A: "Reimbursements are made on the same day",
      B: "Reimbursements take about two weeks after approval",
      C: "Reimbursements are paid monthly regardless of submission date",
      D: "Employees must collect reimbursements in person"
  },
    answer: "B",
    explanation_zh:
      "推論題：「processed within 10 business days」大約是兩週，因此報銷款項在核准後約兩週發放。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["processed", "business days", "finance portal", "cooperation", "categorized"]
,
  passage_group_id: "p7-single-012",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 12 — Notice: Office Relocation
  {
    id: "p7-ext-034",
    part: "Part 7",
    passage:
      "NOTICE: OFFICE RELOCATION\n\nWe are pleased to announce that Stellar Consulting Group will be moving to a new office location on December 1. Our new address will be:\n\nStellar Consulting Group\nLevel 18, Pinnacle Tower\n100 Marina Boulevard\nDowntown Financial District\n\nThe move is part of our continued growth and commitment to providing a better working environment for our team. All phone numbers and email addresses will remain the same.\n\nClients and visitors are requested to direct all correspondence to our new address from December 1 onward. Our current office at 55 Harbor Road will close on November 30.\n\nFor any questions regarding the move, please contact admin@stellarconsulting.com.",
    question: "What is this notice mainly about?",
    choices: {
      A: "A company merger announcement",
      B: "A change of office location",
      C: "A new contact information update",
      D: "A new service offering"
  },
    answer: "B",
    explanation_zh:
      "主旨題：公告標題是「OFFICE RELOCATION」，說明公司遷移到新辦公室地址。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["relocation", "correspondence", "onward", "commitment", "financial district"]
,
  passage_group_id: "p7-single-013",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-035",
    part: "Part 7",
    passage:
      "NOTICE: OFFICE RELOCATION\n\nWe are pleased to announce that Stellar Consulting Group will be moving to a new office location on December 1. Our new address will be:\n\nStellar Consulting Group\nLevel 18, Pinnacle Tower\n100 Marina Boulevard\nDowntown Financial District\n\nThe move is part of our continued growth and commitment to providing a better working environment for our team. All phone numbers and email addresses will remain the same.\n\nClients and visitors are requested to direct all correspondence to our new address from December 1 onward. Our current office at 55 Harbor Road will close on November 30.\n\nFor any questions regarding the move, please contact admin@stellarconsulting.com.",
    question: "On what date will the current office close?",
    choices: {
      A: "December 1",
      B: "November 30",
      C: "November 15",
      D: "December 31"
  },
    answer: "B",
    explanation_zh:
      "細節題：公告說「Our current office at 55 Harbor Road will close on November 30」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["current office", "close", "Harbor Road", "Pinnacle Tower", "Marina Boulevard"]
,
  passage_group_id: "p7-single-013",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-036",
    part: "Part 7",
    passage:
      "NOTICE: OFFICE RELOCATION\n\nWe are pleased to announce that Stellar Consulting Group will be moving to a new office location on December 1. Our new address will be:\n\nStellar Consulting Group\nLevel 18, Pinnacle Tower\n100 Marina Boulevard\nDowntown Financial District\n\nThe move is part of our continued growth and commitment to providing a better working environment for our team. All phone numbers and email addresses will remain the same.\n\nClients and visitors are requested to direct all correspondence to our new address from December 1 onward. Our current office at 55 Harbor Road will close on November 30.\n\nFor any questions regarding the move, please contact admin@stellarconsulting.com.",
    question: "What can be inferred about the company's phone numbers after the move?",
    choices: {
      A: "They will change to reflect the new location",
      B: "They will stay the same as before the move",
      C: "They are listed in the notice",
      D: "Clients must call to request updated numbers"
  },
    answer: "B",
    explanation_zh:
      "推論題：公告說「All phone numbers and email addresses will remain the same」，遷移後聯絡方式不變。",
    skill_tag: "reading_inference",
    difficulty: "A2",
    vocabulary: ["remain", "phone numbers", "email addresses", "redirect", "regarding"]
,
  passage_group_id: "p7-single-013",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 13 — Advertisement: Language Training
  {
    id: "p7-ext-037",
    part: "Part 7",
    passage:
      "BUSINESS ENGLISH TRAINING PROGRAM\n\nSharpen your professional communication skills!\n\nCitywide Language Academy is now accepting enrollments for its Business English Training Program, designed for working professionals and executives.\n\nProgram Highlights:\n• 8-week intensive course\n• Small class sizes (maximum 8 participants)\n• Topics: email writing, presentations, meetings, and negotiations\n• Flexible scheduling: weekday evenings and Saturday mornings\n• Certificate upon successful completion\n\nCourse Fee: $450 per participant\n(Group discounts available for companies enrolling 3 or more staff)\n\nNext intake begins January 15. Registration closes January 8.\n\nContact us: info@citywide-language.com | Tel: 6322-4400",
    question: "What is being advertised in this notice?",
    choices: {
      A: "An online English learning app",
      B: "A Business English training program",
      C: "A university degree in communications",
      D: "A language exchange event"
  },
    answer: "B",
    explanation_zh:
      "主旨題：廣告標題是「BUSINESS ENGLISH TRAINING PROGRAM」，提供商務英語培訓課程。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["enrollment", "intensive", "negotiations", "flexible", "certificate"]
,
  passage_group_id: "p7-single-014",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-038",
    part: "Part 7",
    passage:
      "BUSINESS ENGLISH TRAINING PROGRAM\n\nSharpen your professional communication skills!\n\nCitywide Language Academy is now accepting enrollments for its Business English Training Program, designed for working professionals and executives.\n\nProgram Highlights:\n• 8-week intensive course\n• Small class sizes (maximum 8 participants)\n• Topics: email writing, presentations, meetings, and negotiations\n• Flexible scheduling: weekday evenings and Saturday mornings\n• Certificate upon successful completion\n\nCourse Fee: $450 per participant\n(Group discounts available for companies enrolling 3 or more staff)\n\nNext intake begins January 15. Registration closes January 8.\n\nContact us: info@citywide-language.com | Tel: 6322-4400",
    question: "How long does the Business English training program last?",
    choices: {
      A: "4 weeks",
      B: "6 weeks",
      C: "8 weeks",
      D: "12 weeks"
  },
    answer: "C",
    explanation_zh:
      "細節題：Program Highlights 說「8-week intensive course」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["intensive course", "maximum participants", "intake", "registration", "highlights"]
,
  passage_group_id: "p7-single-014",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-039",
    part: "Part 7",
    passage:
      "BUSINESS ENGLISH TRAINING PROGRAM\n\nSharpen your professional communication skills!\n\nCitywide Language Academy is now accepting enrollments for its Business English Training Program, designed for working professionals and executives.\n\nProgram Highlights:\n• 8-week intensive course\n• Small class sizes (maximum 8 participants)\n• Topics: email writing, presentations, meetings, and negotiations\n• Flexible scheduling: weekday evenings and Saturday mornings\n• Certificate upon successful completion\n\nCourse Fee: $450 per participant\n(Group discounts available for companies enrolling 3 or more staff)\n\nNext intake begins January 15. Registration closes January 8.\n\nContact us: info@citywide-language.com | Tel: 6322-4400",
    question: "What can be inferred about a company that sends five employees to the program?",
    choices: {
      A: "They would pay the full price of $450 per person",
      B: "They would likely qualify for a group discount",
      C: "They would receive free tuition for all five",
      D: "They would need to form a separate private class"
  },
    answer: "B",
    explanation_zh:
      "推論題：廣告說「Group discounts available for companies enrolling 3 or more staff」，5 人超過 3 人門檻，可享團體折扣。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["group discount", "enrolling", "qualify", "fee", "executives"]
,
  passage_group_id: "p7-single-014",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 14 — Memo: Customer Response Guidelines
  {
    id: "p7-ext-040",
    part: "Part 7",
    passage:
      "MEMORANDUM\n\nTO: Customer Service Team\nFROM: Operations Manager, Daniel Park\nDATE: February 14\nRE: New Customer Response Guidelines\n\nEffective March 1, all customer inquiries received via email or our website contact form must receive an initial response within 24 hours. This applies to all weekdays and does not include weekends or public holidays.\n\nFor complex issues requiring further investigation, please acknowledge receipt of the inquiry and inform the customer that a detailed response will follow within three business days.\n\nPlease update your response templates in the shared drive accordingly. Training on the new guidelines will be held on February 25 in Meeting Room 3 at 10:00 A.M.",
    question: "What is the main purpose of this memo?",
    choices: {
      A: "To announce staff promotions",
      B: "To introduce new customer response time requirements",
      C: "To remind staff of an existing policy",
      D: "To schedule a team-building event"
  },
    answer: "B",
    explanation_zh:
      "主旨題：備忘錄主旨是「New Customer Response Guidelines」，說明新的客戶回覆時限要求。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["guidelines", "initial response", "inquiries", "acknowledge", "investigate"]
,
  passage_group_id: "p7-single-015",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-041",
    part: "Part 7",
    passage:
      "MEMORANDUM\n\nTO: Customer Service Team\nFROM: Operations Manager, Daniel Park\nDATE: February 14\nRE: New Customer Response Guidelines\n\nEffective March 1, all customer inquiries received via email or our website contact form must receive an initial response within 24 hours. This applies to all weekdays and does not include weekends or public holidays.\n\nFor complex issues requiring further investigation, please acknowledge receipt of the inquiry and inform the customer that a detailed response will follow within three business days.\n\nPlease update your response templates in the shared drive accordingly. Training on the new guidelines will be held on February 25 in Meeting Room 3 at 10:00 A.M.",
    question: "Where will the training on the new guidelines be held?",
    choices: {
      A: "Meeting Room 1",
      B: "The main conference hall",
      C: "Meeting Room 3",
      D: "Via online video conference"
  },
    answer: "C",
    explanation_zh:
      "細節題：備忘錄說「Training...will be held on February 25 in Meeting Room 3 at 10:00 A.M.」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["training", "templates", "shared drive", "guidelines", "operations manager"]
,
  passage_group_id: "p7-single-015",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-042",
    part: "Part 7",
    passage:
      "MEMORANDUM\n\nTO: Customer Service Team\nFROM: Operations Manager, Daniel Park\nDATE: February 14\nRE: New Customer Response Guidelines\n\nEffective March 1, all customer inquiries received via email or our website contact form must receive an initial response within 24 hours. This applies to all weekdays and does not include weekends or public holidays.\n\nFor complex issues requiring further investigation, please acknowledge receipt of the inquiry and inform the customer that a detailed response will follow within three business days.\n\nPlease update your response templates in the shared drive accordingly. Training on the new guidelines will be held on February 25 in Meeting Room 3 at 10:00 A.M.",
    question: "What can be inferred about the 24-hour response rule on weekends?",
    choices: {
      A: "Customer service staff must work weekends to respond",
      B: "The rule does not apply on weekends",
      C: "All emails received on weekends are auto-replied",
      D: "Customers cannot contact the company on weekends"
  },
    answer: "B",
    explanation_zh:
      "推論題：備忘錄說「does not include weekends or public holidays」，週末不在 24 小時回覆規定的範圍內。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["public holidays", "initial response", "contact form", "acknowledge", "complex issues"]
,
  passage_group_id: "p7-single-015",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 15 — Schedule: Sales Conference
  {
    id: "p7-ext-043",
    part: "Part 7",
    passage:
      "REGIONAL SALES CONFERENCE PROGRAM\nDate: March 20–21 | Venue: Horizon Convention Center, Hall A\n\nDAY 1 – March 20\n9:00 A.M.  – Registration and Coffee\n9:30 A.M.  – Opening Remarks by CEO\n10:00 A.M. – Q4 Sales Performance Review\n12:00 P.M. – Lunch Break\n1:30 P.M.  – Product Roadmap Presentation\n3:00 P.M.  – Break\n3:30 P.M.  – Regional Team Breakout Sessions\n5:00 P.M.  – Day 1 Wrap-up\n\nDAY 2 – March 21\n9:00 A.M.  – Strategy Planning Workshop\n11:30 A.M. – Panel Discussion: Customer Trends\n1:00 P.M.  – Closing Lunch and Networking",
    question: "What event does this schedule describe?",
    choices: {
      A: "An employee orientation program",
      B: "A customer appreciation dinner",
      C: "A regional sales conference",
      D: "A product launch ceremony"
  },
    answer: "C",
    explanation_zh:
      "主旨題：標題清楚說明「REGIONAL SALES CONFERENCE PROGRAM」。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["conference", "breakout sessions", "roadmap", "panel discussion", "networking"]
,
  passage_group_id: "p7-single-016",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-044",
    part: "Part 7",
    passage:
      "REGIONAL SALES CONFERENCE PROGRAM\nDate: March 20–21 | Venue: Horizon Convention Center, Hall A\n\nDAY 1 – March 20\n9:00 A.M.  – Registration and Coffee\n9:30 A.M.  – Opening Remarks by CEO\n10:00 A.M. – Q4 Sales Performance Review\n12:00 P.M. – Lunch Break\n1:30 P.M.  – Product Roadmap Presentation\n3:00 P.M.  – Break\n3:30 P.M.  – Regional Team Breakout Sessions\n5:00 P.M.  – Day 1 Wrap-up\n\nDAY 2 – March 21\n9:00 A.M.  – Strategy Planning Workshop\n11:30 A.M. – Panel Discussion: Customer Trends\n1:00 P.M.  – Closing Lunch and Networking",
    question: "What time does the Product Roadmap Presentation begin on Day 1?",
    choices: {
      A: "10:00 A.M.",
      B: "12:00 P.M.",
      C: "1:30 P.M.",
      D: "3:30 P.M."
  },
    answer: "C",
    explanation_zh:
      "細節題：Day 1 時程表顯示「1:30 P.M. – Product Roadmap Presentation」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["product roadmap", "breakout", "wrap-up", "opening remarks", "registration"]
,
  passage_group_id: "p7-single-016",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-045",
    part: "Part 7",
    passage:
      "REGIONAL SALES CONFERENCE PROGRAM\nDate: March 20–21 | Venue: Horizon Convention Center, Hall A\n\nDAY 1 – March 20\n9:00 A.M.  – Registration and Coffee\n9:30 A.M.  – Opening Remarks by CEO\n10:00 A.M. – Q4 Sales Performance Review\n12:00 P.M. – Lunch Break\n1:30 P.M.  – Product Roadmap Presentation\n3:00 P.M.  – Break\n3:30 P.M.  – Regional Team Breakout Sessions\n5:00 P.M.  – Day 1 Wrap-up\n\nDAY 2 – March 21\n9:00 A.M.  – Strategy Planning Workshop\n11:30 A.M. – Panel Discussion: Customer Trends\n1:00 P.M.  – Closing Lunch and Networking",
    question: "What can be inferred about the panel discussion?",
    choices: {
      A: "It is open to the general public",
      B: "It focuses on customer-related trends",
      C: "It is led by the CEO",
      D: "It takes place on Day 1"
  },
    answer: "B",
    explanation_zh:
      "推論題：Panel Discussion 的標題是「Customer Trends」，因此討論的焦點是與客戶相關的趨勢。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["panel discussion", "strategy", "trends", "networking", "convention center"]
,
  passage_group_id: "p7-single-016",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 16 — Invoice: Printing Services
  {
    id: "p7-ext-046",
    part: "Part 7",
    passage:
      "INVOICE\n\nVendor: PrintPro Services Ltd.\nInvoice Date: May 15\nInvoice No.: PP-2024-3341\nClient: Holloway Marketing Agency\nPayment Terms: Net 30\n\nService Description           | Qty | Rate         | Amount\nBrochure printing (A4, color) | 500 | $0.85/pc     | $425.00\nBanner printing (2m × 1m)    |   4 | $120.00/pc   | $480.00\nGraphic design (hours)        |   6 | $75.00/hr    | $450.00\nDelivery fee                  |     |              | $30.00\n\nSubtotal: $1,385.00\nTax (9%): $124.65\nTOTAL DUE: $1,509.65",
    question: "Which company issued this invoice?",
    choices: {
      A: "Holloway Marketing Agency",
      B: "PrintPro Services Ltd.",
      C: "Design Solutions Inc.",
      D: "FastPrint Corp."
  },
    answer: "B",
    explanation_zh:
      "主旨題：發票上方標明「Vendor: PrintPro Services Ltd.」，為出具發票方（供應商）。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["vendor", "brochure", "banner", "graphic design", "payment terms"]
,
  passage_group_id: "p7-single-017",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-047",
    part: "Part 7",
    passage:
      "INVOICE\n\nVendor: PrintPro Services Ltd.\nInvoice Date: May 15\nInvoice No.: PP-2024-3341\nClient: Holloway Marketing Agency\nPayment Terms: Net 30\n\nService Description           | Qty | Rate         | Amount\nBrochure printing (A4, color) | 500 | $0.85/pc     | $425.00\nBanner printing (2m × 1m)    |   4 | $120.00/pc   | $480.00\nGraphic design (hours)        |   6 | $75.00/hr    | $450.00\nDelivery fee                  |     |              | $30.00\n\nSubtotal: $1,385.00\nTax (9%): $124.65\nTOTAL DUE: $1,509.65",
    question: "What was the total cost of graphic design services?",
    choices: {
      A: "$75.00",
      B: "$425.00",
      C: "$480.00",
      D: "$450.00"
  },
    answer: "D",
    explanation_zh:
      "細節題：Graphic design 6 hours × $75.00/hr = $450.00，即圖形設計服務的總費用。",
    skill_tag: "reading_detail",
    difficulty: "B1",
    vocabulary: ["graphic design", "delivery fee", "subtotal", "tax", "invoice date"]
,
  passage_group_id: "p7-single-017",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-048",
    part: "Part 7",
    passage:
      "INVOICE\n\nVendor: PrintPro Services Ltd.\nInvoice Date: May 15\nInvoice No.: PP-2024-3341\nClient: Holloway Marketing Agency\nPayment Terms: Net 30\n\nService Description           | Qty | Rate         | Amount\nBrochure printing (A4, color) | 500 | $0.85/pc     | $425.00\nBanner printing (2m × 1m)    |   4 | $120.00/pc   | $480.00\nGraphic design (hours)        |   6 | $75.00/hr    | $450.00\nDelivery fee                  |     |              | $30.00\n\nSubtotal: $1,385.00\nTax (9%): $124.65\nTOTAL DUE: $1,509.65",
    question: "What can be inferred about the payment terms on this invoice?",
    choices: {
      A: "Payment is due on the day of delivery",
      B: "Payment is due within 30 days of the invoice date",
      C: "Payment can be made in monthly installments",
      D: "Payment requires prior approval from management"
  },
    answer: "B",
    explanation_zh:
      "推論題：Payment Terms 標示為「Net 30」，商業術語 Net 30 表示在開票日後 30 天內付清。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["net 30", "payment terms", "installments", "invoice", "vendor"]
,
  passage_group_id: "p7-single-017",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 17 — Event Announcement: Charity Gala
  {
    id: "p7-ext-049",
    part: "Part 7",
    passage:
      "CHARITY GALA DINNER\n\nThe Fairview Business Association cordially invites you to its Annual Charity Gala Dinner.\n\nDate: Friday, November 22\nTime: 7:00 P.M. – 10:30 P.M.\nVenue: The Rosewood Grand Ballroom\n\nProceeds from this year's event will benefit the City Education Fund, supporting underprivileged students across the region.\n\nDress Code: Black Tie\nTicket Price: $180 per person | Table of 10: $1,600\n\nHighlights include a four-course dinner, a live auction, and a keynote address by Dr. Angela Wu, CEO of Fairview Capital.\n\nTo purchase tickets, visit www.fairviewba.org/gala or call 8855-4200. Tickets are limited.",
    question: "What is the purpose of this announcement?",
    choices: {
      A: "To announce a business award ceremony",
      B: "To invite guests to a charity gala dinner",
      C: "To promote a new restaurant opening",
      D: "To announce a corporate merger"
  },
    answer: "B",
    explanation_zh:
      "主旨題：公告標題是「CHARITY GALA DINNER」，是慈善晚宴邀請函。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["charity", "gala", "proceeds", "underprivileged", "live auction"]
,
  passage_group_id: "p7-single-018",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-050",
    part: "Part 7",
    passage:
      "CHARITY GALA DINNER\n\nThe Fairview Business Association cordially invites you to its Annual Charity Gala Dinner.\n\nDate: Friday, November 22\nTime: 7:00 P.M. – 10:30 P.M.\nVenue: The Rosewood Grand Ballroom\n\nProceeds from this year's event will benefit the City Education Fund, supporting underprivileged students across the region.\n\nDress Code: Black Tie\nTicket Price: $180 per person | Table of 10: $1,600\n\nHighlights include a four-course dinner, a live auction, and a keynote address by Dr. Angela Wu, CEO of Fairview Capital.\n\nTo purchase tickets, visit www.fairviewba.org/gala or call 8855-4200. Tickets are limited.",
    question: "What is the price of a single ticket?",
    choices: {
      A: "$100",
      B: "$160",
      C: "$180",
      D: "$1,600"
  },
    answer: "C",
    explanation_zh:
      "細節題：票價欄說「$180 per person」，單張票價為 $180。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["ticket price", "black tie", "ballroom", "keynote address", "benefit"]
,
  passage_group_id: "p7-single-018",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-051",
    part: "Part 7",
    passage:
      "CHARITY GALA DINNER\n\nThe Fairview Business Association cordially invites you to its Annual Charity Gala Dinner.\n\nDate: Friday, November 22\nTime: 7:00 P.M. – 10:30 P.M.\nVenue: The Rosewood Grand Ballroom\n\nProceeds from this year's event will benefit the City Education Fund, supporting underprivileged students across the region.\n\nDress Code: Black Tie\nTicket Price: $180 per person | Table of 10: $1,600\n\nHighlights include a four-course dinner, a live auction, and a keynote address by Dr. Angela Wu, CEO of Fairview Capital.\n\nTo purchase tickets, visit www.fairviewba.org/gala or call 8855-4200. Tickets are limited.",
    question: "What can be inferred about ticket availability?",
    choices: {
      A: "Tickets are available at the venue on the day of the event",
      B: "Tickets may sell out before the event",
      C: "Tickets are free for Business Association members",
      D: "Tickets can only be purchased over the phone"
  },
    answer: "B",
    explanation_zh:
      "推論題：公告最後說「Tickets are limited」，表示票數有限，可能在活動前售罄。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["limited", "cordially", "proceeds", "education fund", "keynote"]
,
  passage_group_id: "p7-single-018",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 18 — Job Posting: Administrative Assistant
  {
    id: "p7-ext-052",
    part: "Part 7",
    passage:
      "JOB VACANCY\n\nPosition: Administrative Assistant\nDepartment: Corporate Affairs\nCompany: Pacific Holdings Ltd.\nEmployment Type: Full-time, Permanent\n\nKey Responsibilities:\n- Manage executive schedules and travel arrangements\n- Handle correspondence and prepare meeting materials\n- Maintain filing systems and company records\n- Coordinate with internal departments and external parties\n- Provide general administrative support to the team\n\nRequirements:\n- Diploma or higher in Business Administration or related field\n- Minimum 2 years of relevant experience\n- Proficiency in MS Office (Word, Excel, PowerPoint)\n- Strong organizational and communication skills\n- Bilingual in English and Mandarin preferred\n\nSalary: Negotiable | Start Date: Immediate\nEmail applications to: hr@pacificholdings.com",
    question: "What position is being advertised?",
    choices: {
      A: "Executive Secretary",
      B: "Administrative Assistant",
      C: "Office Manager",
      D: "Corporate Affairs Director"
  },
    answer: "B",
    explanation_zh:
      "主旨題：職缺標題是「Position: Administrative Assistant」。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["administrative", "correspondence", "filing systems", "bilingual", "negotiable"]
,
  passage_group_id: "p7-single-019",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-053",
    part: "Part 7",
    passage:
      "JOB VACANCY\n\nPosition: Administrative Assistant\nDepartment: Corporate Affairs\nCompany: Pacific Holdings Ltd.\nEmployment Type: Full-time, Permanent\n\nKey Responsibilities:\n- Manage executive schedules and travel arrangements\n- Handle correspondence and prepare meeting materials\n- Maintain filing systems and company records\n- Coordinate with internal departments and external parties\n- Provide general administrative support to the team\n\nRequirements:\n- Diploma or higher in Business Administration or related field\n- Minimum 2 years of relevant experience\n- Proficiency in MS Office (Word, Excel, PowerPoint)\n- Strong organizational and communication skills\n- Bilingual in English and Mandarin preferred\n\nSalary: Negotiable | Start Date: Immediate\nEmail applications to: hr@pacificholdings.com",
    question: "How many years of experience are required for this position?",
    choices: {
      A: "At least 1 year",
      B: "At least 2 years",
      C: "At least 3 years",
      D: "At least 5 years"
  },
    answer: "B",
    explanation_zh:
      "細節題：Requirements 說「Minimum 2 years of relevant experience」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["minimum", "relevant experience", "proficiency", "diploma", "permanent"]
,
  passage_group_id: "p7-single-019",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-054",
    part: "Part 7",
    passage:
      "JOB VACANCY\n\nPosition: Administrative Assistant\nDepartment: Corporate Affairs\nCompany: Pacific Holdings Ltd.\nEmployment Type: Full-time, Permanent\n\nKey Responsibilities:\n- Manage executive schedules and travel arrangements\n- Handle correspondence and prepare meeting materials\n- Maintain filing systems and company records\n- Coordinate with internal departments and external parties\n- Provide general administrative support to the team\n\nRequirements:\n- Diploma or higher in Business Administration or related field\n- Minimum 2 years of relevant experience\n- Proficiency in MS Office (Word, Excel, PowerPoint)\n- Strong organizational and communication skills\n- Bilingual in English and Mandarin preferred\n\nSalary: Negotiable | Start Date: Immediate\nEmail applications to: hr@pacificholdings.com",
    question: "What can be inferred about candidates who speak both English and Mandarin?",
    choices: {
      A: "They are guaranteed an interview",
      B: "They will receive a higher starting salary",
      C: "They may have an advantage over other applicants",
      D: "They are the only candidates who will be considered"
  },
    answer: "C",
    explanation_zh:
      "推論題：職缺說「Bilingual in English and Mandarin preferred」，preferred 表示優先考慮，因此雙語能力是加分項，具備此能力的應徵者較有優勢。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["bilingual", "preferred", "organizational", "coordinate", "immediate"]
,
  passage_group_id: "p7-single-019",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 19 — Reservation Confirmation: Flight
  {
    id: "p7-ext-055",
    part: "Part 7",
    passage:
      "RESERVATION CONFIRMED\n\nBooking Reference: LBT-54221\nPassenger: Ms. Jennifer Tan\nRoute: Singapore (SIN) → Tokyo (NRT)\nFlight: SQ637\nDeparture: April 3, 10:45 A.M.\nArrival: April 3, 6:30 P.M. (local time)\nClass: Business\nSeat: 8A (Window)\nMeal: Vegetarian selected\n\nBaggage Allowance: 30 kg checked, 10 kg carry-on\nLoyalty Points: 2,500 points will be credited upon completion of travel\n\nTo make changes or request special assistance, contact Langford Business Travels at +65-6300-7788 at least 48 hours before departure.",
    question: "What type of document is this?",
    choices: {
      A: "A boarding pass",
      B: "A flight booking confirmation",
      C: "A hotel reservation",
      D: "A travel insurance certificate"
  },
    answer: "B",
    explanation_zh:
      "主旨題：文件標題是「RESERVATION CONFIRMED」，記錄的是航班訂位確認資訊。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["booking reference", "departure", "baggage allowance", "carry-on", "loyalty points"]
,
  passage_group_id: "p7-single-020",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-056",
    part: "Part 7",
    passage:
      "RESERVATION CONFIRMED\n\nBooking Reference: LBT-54221\nPassenger: Ms. Jennifer Tan\nRoute: Singapore (SIN) → Tokyo (NRT)\nFlight: SQ637\nDeparture: April 3, 10:45 A.M.\nArrival: April 3, 6:30 P.M. (local time)\nClass: Business\nSeat: 8A (Window)\nMeal: Vegetarian selected\n\nBaggage Allowance: 30 kg checked, 10 kg carry-on\nLoyalty Points: 2,500 points will be credited upon completion of travel\n\nTo make changes or request special assistance, contact Langford Business Travels at +65-6300-7788 at least 48 hours before departure.",
    question: "What seat has Ms. Tan been assigned?",
    choices: {
      A: "8B",
      B: "5A",
      C: "10C",
      D: "8A"
  },
    answer: "D",
    explanation_zh:
      "細節題：確認單上明確寫「Seat: 8A (Window)」，Ms. Tan 的座位是 8A。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["seat", "window", "vegetarian", "business class", "credited"]
,
  passage_group_id: "p7-single-020",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-057",
    part: "Part 7",
    passage:
      "RESERVATION CONFIRMED\n\nBooking Reference: LBT-54221\nPassenger: Ms. Jennifer Tan\nRoute: Singapore (SIN) → Tokyo (NRT)\nFlight: SQ637\nDeparture: April 3, 10:45 A.M.\nArrival: April 3, 6:30 P.M. (local time)\nClass: Business\nSeat: 8A (Window)\nMeal: Vegetarian selected\n\nBaggage Allowance: 30 kg checked, 10 kg carry-on\nLoyalty Points: 2,500 points will be credited upon completion of travel\n\nTo make changes or request special assistance, contact Langford Business Travels at +65-6300-7788 at least 48 hours before departure.",
    question: "What can be inferred about changing the booking details?",
    choices: {
      A: "Changes can be made at any time without restriction",
      B: "Changes must be requested at least 48 hours before departure",
      C: "Changes are handled directly with the airline",
      D: "No changes are permitted once the booking is confirmed"
  },
    answer: "B",
    explanation_zh:
      "推論題：確認單說「contact...at least 48 hours before departure」，因此更改訂位需提前至少 48 小時。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["changes", "special assistance", "departure", "baggage allowance", "credited"]
,
  passage_group_id: "p7-single-020",
  passage_group_type: "single",
  question_order: 3,
},

  // Passage 20 — Product Information: Smart Water Dispenser
  {
    id: "p7-ext-058",
    part: "Part 7",
    passage:
      "PRODUCT OVERVIEW\n\nAquaCool Pro – Smart Water Dispenser\nModel: AC-Pro-300\nManufacturer: PureHome Solutions\n\nProduct Features:\n• Instant hot and cold water dispensing\n• Smart touchscreen temperature control (4°C – 95°C)\n• UV sterilization system for clean, hygienic water\n• Built-in filtration: removes chlorine, heavy metals, and sediment\n• Energy-saving mode: automatically reduces power when idle\n• Water capacity: 12 liters\n\nSafety Features: Child lock, auto shutoff, leak detection alert\n\nWarranty: 2 years on parts; 1 year on labor\nCustomer Service: 1800-PUREHOM | Mon–Fri, 8 A.M. – 8 P.M.",
    question: "What type of product is described in this document?",
    choices: {
      A: "A coffee maker",
      B: "An air purifier",
      C: "A smart water dispenser",
      D: "A refrigerator"
  },
    answer: "C",
    explanation_zh:
      "主旨題：產品名稱是「AquaCool Pro – Smart Water Dispenser」，是智慧飲水機。",
    skill_tag: "reading_main_idea",
    difficulty: "A2",
    vocabulary: ["dispenser", "sterilization", "filtration", "hygienic", "sediment"]
,
  passage_group_id: "p7-single-021",
  passage_group_type: "single",
  question_order: 1,
},
  {
    id: "p7-ext-059",
    part: "Part 7",
    passage:
      "PRODUCT OVERVIEW\n\nAquaCool Pro – Smart Water Dispenser\nModel: AC-Pro-300\nManufacturer: PureHome Solutions\n\nProduct Features:\n• Instant hot and cold water dispensing\n• Smart touchscreen temperature control (4°C – 95°C)\n• UV sterilization system for clean, hygienic water\n• Built-in filtration: removes chlorine, heavy metals, and sediment\n• Energy-saving mode: automatically reduces power when idle\n• Water capacity: 12 liters\n\nSafety Features: Child lock, auto shutoff, leak detection alert\n\nWarranty: 2 years on parts; 1 year on labor\nCustomer Service: 1800-PUREHOM | Mon–Fri, 8 A.M. – 8 P.M.",
    question: "What temperature range does the smart touchscreen control support?",
    choices: {
      A: "0°C – 80°C",
      B: "4°C – 95°C",
      C: "10°C – 100°C",
      D: "5°C – 90°C"
  },
    answer: "B",
    explanation_zh:
      "細節題：規格說「Smart touchscreen temperature control (4°C – 95°C)」。",
    skill_tag: "reading_detail",
    difficulty: "A2",
    vocabulary: ["touchscreen", "temperature control", "UV sterilization", "chlorine", "heavy metals"]
,
  passage_group_id: "p7-single-021",
  passage_group_type: "single",
  question_order: 2,
},
  {
    id: "p7-ext-060",
    part: "Part 7",
    passage:
      "PRODUCT OVERVIEW\n\nAquaCool Pro – Smart Water Dispenser\nModel: AC-Pro-300\nManufacturer: PureHome Solutions\n\nProduct Features:\n• Instant hot and cold water dispensing\n• Smart touchscreen temperature control (4°C – 95°C)\n• UV sterilization system for clean, hygienic water\n• Built-in filtration: removes chlorine, heavy metals, and sediment\n• Energy-saving mode: automatically reduces power when idle\n• Water capacity: 12 liters\n\nSafety Features: Child lock, auto shutoff, leak detection alert\n\nWarranty: 2 years on parts; 1 year on labor\nCustomer Service: 1800-PUREHOM | Mon–Fri, 8 A.M. – 8 P.M.",
    question: "What can be inferred about the energy-saving mode?",
    choices: {
      A: "It must be manually turned on each time",
      B: "It increases the water heating temperature",
      C: "It activates automatically when the machine is not in use",
      D: "It slows down the water filtration process"
  },
    answer: "C",
    explanation_zh:
      "推論題：功能說「Energy-saving mode: automatically reduces power when idle」，idle 表示閒置，因此節能模式在機器不使用時會自動啟動。",
    skill_tag: "reading_inference",
    difficulty: "B1",
    vocabulary: ["energy-saving", "idle", "auto shutoff", "child lock", "warranty"]
,
  passage_group_id: "p7-single-021",
  passage_group_type: "single",
  question_order: 3,
},

  // ============ Part 5 — Pronoun (25) ============
  {
    id: "p5-pron-001",
    part: "Part 5",
    question: "The manager and _______ will represent the company at the international summit.",
    choices: { A: "me", B: "I", C: "myself", D: "my" },
    answer: "B",
    explanation_zh: "「The manager and I」是複合主詞，要用主格 I。技巧：去掉「The manager and」，句子變成「_______ will represent」，填 I 才正確，me 是受格不能當主詞。",
    vocabulary: ["represent", "international summit"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-002",
    part: "Part 5",
    question: "Please send the revised contract to Mr. Yamamoto and _______.",
    choices: { A: "I", B: "we", C: "me", D: "myself" },
    answer: "C",
    explanation_zh: "介係詞 to 後面要接受格，所以用 me，不用主格 I。技巧：去掉「Mr. Yamamoto and」，句子變成「send ... to _______」，填 me 才正確。",
    vocabulary: ["revised contract", "send to"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-003",
    part: "Part 5",
    question: "The accounting department submitted _______ annual report ahead of schedule.",
    choices: { A: "their", B: "they", C: "them", D: "theirs" },
    answer: "A",
    explanation_zh: "空格後面有名詞 annual report，所以要用形容詞性物主代詞 their（他們的）。theirs 是獨立所有格代名詞，後面不接名詞。",
    vocabulary: ["accounting department", "annual report", "ahead of schedule"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-004",
    part: "Part 5",
    question: "Our branch finished the audit on time, but the other office did not complete _______.",
    choices: { A: "their", B: "theirs", C: "them", D: "they" },
    answer: "B",
    explanation_zh: "空格後面沒有名詞，所以用獨立所有格代名詞 theirs。their 後面必須接名詞，這裡省略了 audit，要用 theirs 代替整個「their audit」。",
    vocabulary: ["audit", "complete", "branch"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-005",
    part: "Part 5",
    question: "The CEO _______ delivered the keynote speech at the annual shareholders' meeting.",
    choices: { A: "him", B: "his", C: "himself", D: "he" },
    answer: "C",
    explanation_zh: "himself 用來強調主詞「親自」做了某事，表示 CEO 不假他人之手。him 是受格、he 是主格，兩者都不能放在動詞前作強調語。",
    vocabulary: ["keynote speech", "shareholders' meeting", "deliver"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-006",
    part: "Part 5",
    question: "The new employee familiarized _______ with the company's internal procedures during orientation.",
    choices: { A: "him", B: "himself", C: "his", D: "he" },
    answer: "B",
    explanation_zh: "「familiarize oneself with」是固定搭配，主詞 The new employee 是男性，反身代名詞用 himself。這是反身動詞用法，主詞和受詞是同一人。",
    vocabulary: ["familiarize", "internal procedures", "orientation"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-007",
    part: "Part 5",
    question: "_______ on the project team is required to submit a weekly progress report.",
    choices: { A: "All", B: "Every", C: "Everyone", D: "Each ones" },
    answer: "C",
    explanation_zh: "Everyone 是不定代名詞，後面直接接動詞 is。Every 後面必須接名詞（every member）。All 後面也需接名詞（all members）。Each ones 不是正確用法。",
    vocabulary: ["project team", "weekly progress report", "submit"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-008",
    part: "Part 5",
    question: "If _______ has concerns about the new policy, please contact the HR department directly.",
    choices: { A: "someone", B: "anyone", C: "no one", D: "everyone" },
    answer: "B",
    explanation_zh: "if 條件句中表示「任何人」用 anyone，語氣是開放性的。someone 通常用於肯定句（我知道有某人）。no one 是否定意思，everyone 表示所有人。",
    vocabulary: ["concern", "policy", "HR department"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-009",
    part: "Part 5",
    question: "After the managers reviewed the proposals, _______ decided to approve the additional funding.",
    choices: { A: "he", B: "it", C: "they", D: "we" },
    answer: "C",
    explanation_zh: "先行詞是 the managers（複數），代名詞要對應用 they。he 是單數，it 指事物，we 包含說話者，這裡只是描述第三方。",
    vocabulary: ["proposal", "approve", "funding"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-010",
    part: "Part 5",
    question: "The company updated _______ employee handbook to reflect the latest labor regulations.",
    choices: { A: "it's", B: "its'", C: "its", D: "their" },
    answer: "C",
    explanation_zh: "its 是所有格（它的），空格後有名詞 employee handbook，所以用所有格 its。it's 是 it is 的縮寫，its' 根本不存在，their 用於複數主詞。",
    vocabulary: ["employee handbook", "labor regulations", "update"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-011",
    part: "Part 5",
    question: "The employees submitted the expense reports _______ without any assistance from the finance team.",
    choices: { A: "itself", B: "yourselves", C: "themselves", D: "himself" },
    answer: "C",
    explanation_zh: "主詞是 The employees（複數第三人稱），反身代名詞要對應用 themselves。itself 指事物，yourselves 是第二人稱複數，himself 是男性單數。",
    vocabulary: ["expense report", "finance team", "assistance"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-012",
    part: "Part 5",
    question: "Between you and _______, I have serious doubts about the feasibility of this proposal.",
    choices: { A: "I", B: "me", C: "myself", D: "mine" },
    answer: "B",
    explanation_zh: "介係詞 between 後面要接受格，所以是 me，不是 I。「Between you and me」是固定說法，意思是「說句私下的話」。雖然口語常誤用 I，正確是 me。",
    vocabulary: ["feasibility", "proposal", "doubt"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-013",
    part: "Part 5",
    question: "The new regional director works more efficiently than _______.",
    choices: { A: "him", B: "he", C: "his", D: "himself" },
    answer: "B",
    explanation_zh: "than 在比較句中是連接詞，後面省略了動詞（than he [works]），所以用主格 he。完整句是「than he works」，受格 him 不能當主詞。",
    vocabulary: ["regional director", "efficiently"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-014",
    part: "Part 5",
    question: "These conference rooms are too small; we need to book larger _______.",
    choices: { A: "one", B: "ones", C: "those", D: "them" },
    answer: "B",
    explanation_zh: "ones 代替複數名詞 conference rooms，用來避免重複。one 代替單數名詞，those 是指示代名詞（那些），them 是人稱代名詞受格。",
    vocabulary: ["conference room", "book"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-015",
    part: "Part 5",
    question: "After the merger, the two divisions agreed to share resources with _______.",
    choices: { A: "themselves", B: "each other", C: "one another", D: "either" },
    answer: "B",
    explanation_zh: "兩者之間互相用 each other，三者以上互相用 one another。這裡是兩個部門（two divisions），所以用 each other。themselves 是反身代名詞，語意不符。",
    vocabulary: ["merger", "division", "share resources"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-016",
    part: "Part 5",
    question: "Please forward this email to _______ is responsible for handling customer complaints.",
    choices: { A: "whomever", B: "whoever", C: "whom", D: "who" },
    answer: "B",
    explanation_zh: "whoever 引導名詞子句作 to 的受詞。在子句內部，whoever 是 is responsible 的主詞，所以用主格 whoever，不用受格 whomever。判斷方式：看子句內的語法角色。",
    vocabulary: ["forward", "customer complaints", "responsible for"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-017",
    part: "Part 5",
    question: "The sales figures from this quarter were significantly higher than _______ of the same period last year.",
    choices: { A: "ones", B: "that", C: "those", D: "these" },
    answer: "C",
    explanation_zh: "those 代替複數名詞 sales figures（銷售數字），用來避免重複。that 代替單數名詞，ones 後面通常接形容詞修飾，these 表示「這些（近的）」而非比較中的「那些」。",
    vocabulary: ["sales figures", "significantly", "period"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-018",
    part: "Part 5",
    question: "_______ of the two candidates met all the requirements for the senior analyst position.",
    choices: { A: "Both", B: "Either", C: "Neither", D: "None" },
    answer: "C",
    explanation_zh: "兩者都不，用否定的 neither，動詞用單數 met。either 是「任一個（其中一個）」肯定意思，both 是「兩者都」，none 通常用於三個以上或不可數。",
    vocabulary: ["candidate", "requirement", "senior analyst"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-019",
    part: "Part 5",
    question: "All team members should respect _______ regardless of seniority or title.",
    choices: { A: "each other", B: "one another", C: "themselves", D: "yourselves" },
    answer: "B",
    explanation_zh: "全體團隊成員（超過兩人）互相尊重，用 one another。each other 嚴格來說用於兩人之間，one another 用於三人以上的群體互動。",
    vocabulary: ["seniority", "regardless of", "respect"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-020",
    part: "Part 5",
    question: "The consultant _______ the company hired has extensive experience in financial restructuring.",
    choices: { A: "who", B: "whom", C: "whose", D: "which" },
    answer: "B",
    explanation_zh: "關係代名詞在子句中作受詞（the company hired him → whom），所以用受格 whom。技巧：用 him/whom 代入，填 him 通順就用 whom。whose 表示所有格，which 用於事物。",
    vocabulary: ["consultant", "financial restructuring", "extensive experience"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-021",
    part: "Part 5",
    question: "_______ of the information in the preliminary report was found to be inaccurate.",
    choices: { A: "Many", B: "Several", C: "Much", D: "Few" },
    answer: "C",
    explanation_zh: "information 是不可數名詞，要用 much（大量的）修飾，不能用 many/several/few（這些用於可數名詞複數）。",
    vocabulary: ["preliminary report", "inaccurate", "information"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-022",
    part: "Part 5",
    question: "_______ the outcome of the negotiations, the company will honor its commitment to all stakeholders.",
    choices: { A: "However", B: "Whenever", C: "Whatever", D: "Wherever" },
    answer: "C",
    explanation_zh: "whatever 引導讓步副詞子句，意思是「不管結果如何」。後面接名詞（the outcome），表示「不管是什麼結果」。however 後接形容詞或副詞，whenever 是「無論何時」，wherever 是「無論何地」。",
    vocabulary: ["outcome", "negotiation", "honor a commitment", "stakeholder"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },
  {
    id: "p5-pron-023",
    part: "Part 5",
    question: "The revised budget proposal was submitted on time, and _______ will be reviewed at Friday's board meeting.",
    choices: { A: "it", B: "they", C: "this one", D: "those" },
    answer: "A",
    explanation_zh: "代替單數名詞 budget proposal（預算提案），用 it。they 代替複數，this one 語氣過於口語且不必要，those 是複數指示代名詞。",
    vocabulary: ["budget proposal", "board meeting", "review"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-024",
    part: "Part 5",
    question: "The regional managers are responsible for motivating _______ respective teams to achieve quarterly targets.",
    choices: { A: "its", B: "his", C: "her", D: "their" },
    answer: "D",
    explanation_zh: "先行詞是 The regional managers（複數），所有格代名詞用 their（他們各自的）。its 用於單數事物，his/her 是單數人稱所有格。respective 表示「各自的」，搭配 their 強調每人對應自己的團隊。",
    vocabulary: ["regional manager", "respective", "quarterly target", "motivate"],
    skill_tag: "pronoun",
    difficulty: "B1",
  },
  {
    id: "p5-pron-025",
    part: "Part 5",
    question: "The client expressed satisfaction with the service, saying _______ exceeded _______ expectations.",
    choices: { A: "it / their", B: "they / its", C: "it / its", D: "they / their" },
    answer: "A",
    explanation_zh: "第一個空格代替 the service（服務，單數事物）用 it；第二個空格代替 the client（客戶，可視為複數泛指）的預期，用 their。「exceed one's expectations」超出預期，是常見商務表達。",
    vocabulary: ["express satisfaction", "exceed expectations", "client"],
    skill_tag: "pronoun",
    difficulty: "B2",
  },

  // ============ Part 5 — Relative Clause (25) ============
  {
    id: "p5-rc-001",
    part: "Part 5",
    question: "The employee _______ received the highest performance review will be promoted next quarter.",
    choices: { A: "which", B: "whom", C: "who", D: "whose" },
    answer: "C",
    explanation_zh: "先行詞是 the employee（人），在子句中作主詞（_______ received），所以用主格關係代名詞 who。which 用於事物，whom 是受格，whose 表示所有格。",
    vocabulary: ["performance review", "promote", "quarter"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-002",
    part: "Part 5",
    question: "The report _______ was submitted last Friday contains several calculation errors.",
    choices: { A: "who", B: "whom", C: "whose", D: "that" },
    answer: "D",
    explanation_zh: "先行詞是 the report（事物），在子句中作主詞，用 that 或 which。that 是最常見的選擇，who/whom 用於人，whose 表示所有格。",
    vocabulary: ["submit", "calculation error", "contain"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-003",
    part: "Part 5",
    question: "The candidate _______ résumé impressed the hiring committee was invited for a second interview.",
    choices: { A: "who", B: "whom", C: "whose", D: "which" },
    answer: "C",
    explanation_zh: "空格後接名詞 résumé（履歷），表示所有關係，要用 whose（他的）。whose 後面直接接名詞。whose résumé = his/her résumé。",
    vocabulary: ["résumé", "hiring committee", "impress"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-004",
    part: "Part 5",
    question: "The consultant _______ the board hired has over twenty years of experience in mergers and acquisitions.",
    choices: { A: "who", B: "whom", C: "whose", D: "which" },
    answer: "B",
    explanation_zh: "關係代名詞在子句中作受詞（the board hired him → whom），所以用受格 whom。技巧：把子句還原成完整句，填 him 通順就用 whom。",
    vocabulary: ["consultant", "mergers and acquisitions", "experience"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-005",
    part: "Part 5",
    question: "The software _______ the IT department installed last week has significantly improved productivity.",
    choices: { A: "who", B: "whom", C: "which", D: "whose" },
    answer: "C",
    explanation_zh: "先行詞是 the software（事物），在子句中作受詞（the IT department installed it → which），用 which 或 that。which 用於事物，who/whom 用於人。",
    vocabulary: ["IT department", "install", "productivity"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-006",
    part: "Part 5",
    question: "The conference center _______ the annual meeting will be held can accommodate up to 500 guests.",
    choices: { A: "which", B: "that", C: "where", D: "when" },
    answer: "C",
    explanation_zh: "先行詞是 the conference center（地點），後面描述在那裡發生的事，用關係副詞 where。where = in which（在那裡）。which/that 後面需要完整子句，但子句已有主詞 the annual meeting。",
    vocabulary: ["conference center", "accommodate", "annual meeting"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-007",
    part: "Part 5",
    question: "The fiscal year _______ the company achieved record profits was also marked by several challenges.",
    choices: { A: "which", B: "that", C: "where", D: "when" },
    answer: "D",
    explanation_zh: "先行詞是 the fiscal year（時間），後面描述在那個時間發生的事，用關係副詞 when。when = in which（在那時）。which/that 後面需要不完整子句（缺主詞或受詞），但這裡子句完整。",
    vocabulary: ["fiscal year", "record profits", "challenge"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-008",
    part: "Part 5",
    question: "The main reason _______ the project was delayed was a shortage of qualified engineers.",
    choices: { A: "which", B: "that", C: "why", D: "when" },
    answer: "C",
    explanation_zh: "先行詞是 the reason（原因），後面解釋原因，用關係副詞 why。why = for which（因為那個原因）。這是固定搭配：the reason why...。",
    vocabulary: ["delay", "shortage", "qualified"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-009",
    part: "Part 5",
    question: "The new policy, _______ was approved by the board last month, will take effect in January.",
    choices: { A: "that", B: "which", C: "who", D: "what" },
    answer: "B",
    explanation_zh: "逗號後的非限定性關係子句只能用 which，不能用 that。非限定性子句是補充說明，可以去掉不影響主要意思。that 只用於限定性子句（無逗號）。",
    vocabulary: ["approve", "take effect", "policy"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-010",
    part: "Part 5",
    question: "Mr. Park, _______ has led the Asia-Pacific division for five years, announced his retirement.",
    choices: { A: "that", B: "which", C: "who", D: "whom" },
    answer: "C",
    explanation_zh: "逗號後的非限定性關係子句，先行詞是人（Mr. Park），且在子句中作主詞（_______ has led），所以用 who。that 不能用於非限定性子句，whom 是受格。",
    vocabulary: ["Asia-Pacific division", "announce", "retirement"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-011",
    part: "Part 5",
    question: "All employees _______ have completed the mandatory training will receive a certificate.",
    choices: { A: "which", B: "whose", C: "whom", D: "who" },
    answer: "D",
    explanation_zh: "先行詞是 All employees（人，複數），在子句中作主詞（_______ have completed），用 who。which 用於事物，whose 是所有格，whom 是受格。",
    vocabulary: ["mandatory training", "certificate", "complete"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-012",
    part: "Part 5",
    question: "The budget proposal _______ the finance team submitted was significantly over the approved limit.",
    choices: { A: "who", B: "when", C: "that", D: "where" },
    answer: "C",
    explanation_zh: "先行詞是 The budget proposal（事物），在子句中作受詞（the finance team submitted it → that），用 that 或 which。who 用於人，when 表示時間，where 表示地點。",
    vocabulary: ["budget proposal", "finance team", "approved limit"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-013",
    part: "Part 5",
    question: "Employees _______ performance ratings fall below expectations will be required to attend a development workshop.",
    choices: { A: "who", B: "whom", C: "whose", D: "which" },
    answer: "C",
    explanation_zh: "空格後接名詞 performance ratings，表示所有關係「員工的績效評分」，用 whose。whose + 名詞是固定搭配，whose performance ratings = their performance ratings。",
    vocabulary: ["performance rating", "fall below expectations", "development workshop"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-014",
    part: "Part 5",
    question: "The overseas office _______ our largest clients are based will be upgraded next year.",
    choices: { A: "that", B: "which", C: "where", D: "when" },
    answer: "C",
    explanation_zh: "先行詞是 The overseas office（地點），後面子句有完整的主詞（our largest clients）和動詞（are based），用關係副詞 where 表示「在那裡」。若用 which/that，子句就需要一個受詞缺口。",
    vocabulary: ["overseas office", "be based", "upgrade"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-015",
    part: "Part 5",
    question: "The quarterly results, _______ exceeded all forecasts, boosted investor confidence significantly.",
    choices: { A: "that", B: "which", C: "what", D: "who" },
    answer: "B",
    explanation_zh: "逗號後的非限定性關係子句只能用 which，不用 that。先行詞是 The quarterly results（事物），在子句中作主詞，用 which。what 不能引導關係子句。",
    vocabulary: ["quarterly results", "forecast", "investor confidence"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-016",
    part: "Part 5",
    question: "The vendor _______ we have partnered with for over a decade offers the most competitive pricing.",
    choices: { A: "who", B: "whom", C: "which", D: "whose" },
    answer: "A",
    explanation_zh: "先行詞是 the vendor（廠商，可指人或公司）。在口語和商業英語中，vendor 指公司時可用 which，指人時用 who。這裡「partnered with」後缺受詞（partnered with whom），但 who 是 that 的口語化替代，TOEIC 接受 who 在此用法。",
    vocabulary: ["vendor", "partner with", "competitive pricing"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-017",
    part: "Part 5",
    question: "Any proposal _______ requires additional funding must be submitted to the finance committee for approval.",
    choices: { A: "who", B: "whom", C: "whose", D: "that" },
    answer: "D",
    explanation_zh: "先行詞是 Any proposal（事物），在子句中作主詞，用 that 或 which。Any、all、every 等詞修飾的先行詞後，通常偏好用 that 而非 which。",
    vocabulary: ["proposal", "finance committee", "approval"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-018",
    part: "Part 5",
    question: "The period _______ the store experiences the highest sales volume is between November and January.",
    choices: { A: "which", B: "that", C: "where", D: "when" },
    answer: "D",
    explanation_zh: "先行詞是 The period（時間段），後面子句的主詞（the store）和動詞（experiences）都完整，用關係副詞 when 表示「在那段期間」。",
    vocabulary: ["sales volume", "experience", "period"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-019",
    part: "Part 5",
    question: "The new headquarters, _______ construction was completed ahead of schedule, opened last month.",
    choices: { A: "which", B: "that", C: "whose", D: "where" },
    answer: "C",
    explanation_zh: "空格後接名詞 construction，表示所有關係「總部的建設工程」，用 whose。whose + 名詞：whose construction = its construction。非限定性子句中 whose 可用於事物。",
    vocabulary: ["headquarters", "construction", "ahead of schedule"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-020",
    part: "Part 5",
    question: "The training program _______ participants rate most highly focuses on leadership and communication.",
    choices: { A: "who", B: "whom", C: "which", D: "whose" },
    answer: "C",
    explanation_zh: "先行詞是 The training program（事物），在子句中作受詞（participants rate it most highly → which），用 which 或 that。who/whom 用於人，whose 表示所有格。",
    vocabulary: ["training program", "rate", "leadership"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-021",
    part: "Part 5",
    question: "The law firm _______ drafted our corporate bylaws has been our legal counsel for over thirty years.",
    choices: { A: "who", B: "whom", C: "which", D: "whose" },
    answer: "C",
    explanation_zh: "先行詞是 The law firm（事物—公司），在子句中作主詞，用 which 或 that。公司是法律實體，用 which；若視為一群人也可用 who，但 TOEIC 標準答案偏向 which。",
    vocabulary: ["law firm", "corporate bylaws", "legal counsel"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-022",
    part: "Part 5",
    question: "The city _______ the new distribution center will be located has excellent transportation infrastructure.",
    choices: { A: "that", B: "which", C: "where", D: "when" },
    answer: "C",
    explanation_zh: "先行詞是 The city（地點），後面子句的主詞（the new distribution center）和動詞（will be located）都完整，用關係副詞 where 表示「在那個城市」。若用 which/that，子句缺受詞才行。",
    vocabulary: ["distribution center", "transportation infrastructure", "locate"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-023",
    part: "Part 5",
    question: "The sales manager presented a strategy _______ the team found both innovative and practical.",
    choices: { A: "who", B: "whom", C: "which", D: "whose" },
    answer: "C",
    explanation_zh: "先行詞是 a strategy（事物），在子句中作受詞（the team found it innovative → which），用 which 或 that。此處 that 也正確，但 which 是選項中唯一適合事物受格的。",
    vocabulary: ["strategy", "innovative", "practical"],
    skill_tag: "relative_clause",
    difficulty: "B1",
  },
  {
    id: "p5-rc-024",
    part: "Part 5",
    question: "All applicants _______ résumés were shortlisted will be contacted within five business days.",
    choices: { A: "who", B: "whom", C: "whose", D: "which" },
    answer: "C",
    explanation_zh: "空格後接名詞 résumés，表示所有關係「申請者的履歷」，用 whose。whose résumés = their résumés。whose 後面直接接名詞，此為固定結構。",
    vocabulary: ["applicant", "shortlist", "business days"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  {
    id: "p5-rc-025",
    part: "Part 5",
    question: "The division _______ revenues have grown by 40% this year will receive additional investment.",
    choices: { A: "that", B: "which", C: "whose", D: "where" },
    answer: "C",
    explanation_zh: "空格後接名詞 revenues，表示所有關係「部門的營收」，用 whose。whose revenues = its revenues。雖然先行詞是事物（division），whose 仍可用於事物表示所有格。",
    vocabulary: ["division", "revenues", "investment"],
    skill_tag: "relative_clause",
    difficulty: "B2",
  },
  ...GENERATED_QUESTIONS,
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

export type PlanCounts = {
  weak: number;
  new: number;
  part6: number;
  listening: number;
  reading: number;
  review: number;
};

export function buildDailyPlan(options?: {
  weakCount?: number;
  newCount?: number;
  part6Count?: number;
  listeningCount?: number;
  readingCount?: number;
  reviewIds?: string[];
  weakSkillTags?: SkillTag[];
}): { questions: Question[]; counts: PlanCounts } {
  const weakCount = options?.weakCount ?? 8;
  const newCount = options?.newCount ?? 7;
  const part6Count = options?.part6Count ?? 2;
  const listeningCount = options?.listeningCount ?? 6;
  const readingCount = options?.readingCount ?? 3;
  const reviewIds = options?.reviewIds ?? [];
  const weakSkillTags = options?.weakSkillTags ?? ["word_form", "passive_voice"];
  const reviewIdSet = new Set(reviewIds);

  const part5Pool = getQuestionsByPart("Part 5").filter(
    (q) => !reviewIdSet.has(q.id)
  );

  const weakPool = shuffle(
    part5Pool.filter((q) => weakSkillTags.includes(q.skill_tag))
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

  const part6Pool = shuffle(
    getQuestionsByPart("Part 6").filter((q) => !reviewIdSet.has(q.id))
  );
  const part6Qs = part6Pool.slice(0, part6Count);

  const readingPool = shuffle(
    getQuestionsByPart("Part 7").filter((q) => !reviewIdSet.has(q.id))
  );
  const readingQs = readingPool.slice(0, readingCount);

  if (readingQs.length < readingCount) {
    console.warn(
      `[buildDailyPlan] Part 7 題庫不足，只有 ${readingQs.length}/${readingCount} 題`
    );
  }

  const reviewQs = reviewIds
    .map((id) => getQuestionById(id))
    .filter((q): q is Question => Boolean(q))
    .slice(0, 5);

  return {
    questions: [...weakQs, ...newQs, ...part6Qs, ...listeningQs, ...readingQs, ...reviewQs],
    counts: {
      weak: weakQs.length,
      new: newQs.length,
      part6: part6Qs.length,
      listening: listeningQs.length,
      reading: readingQs.length,
      review: reviewQs.length,
    },
  };
}

// ─── Mock Test Plan ─────────────────────────────────────────────────────────

type PassageGroupType = NonNullable<Question["passage_group_type"]>;

function getPassageGroupKey(q: Question): string | null {
  if (!q.passage) return null;
  return q.passage_group_id
    ? `${q.part}:${q.passage_group_id}:${q.passage}`
    : `${q.part}:passage:${q.passage}`;
}

function groupByPassage(questions: Question[]): Question[][] {
  const groups = new Map<string, Question[]>();

  for (const q of questions) {
    const key = getPassageGroupKey(q);
    if (!key) continue;
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }

  return [...groups.values()].map((group) =>
    [...group].sort(
      (a, b) =>
        (a.question_order ?? Number.MAX_SAFE_INTEGER) -
        (b.question_order ?? Number.MAX_SAFE_INTEGER)
    )
  );
}

function selectGroupsForTotal(groups: Question[][], target: number): Question[][] | null {
  const shuffled = shuffle(groups);
  const sums = new Map<number, Question[][]>();
  sums.set(0, []);

  for (const group of shuffled) {
    const snapshots = [...sums.entries()];
    for (const [sum, selected] of snapshots) {
      const nextSum = sum + group.length;
      if (nextSum > target || sums.has(nextSum)) continue;
      const nextSelected = [...selected, group];
      if (nextSum === target) return nextSelected;
      sums.set(nextSum, nextSelected);
    }
  }

  return sums.get(target) ?? null;
}

function countPart(questions: Question[], part: Question["part"]): number {
  return questions.filter((q) => q.part === part).length;
}

function assertMockPlan(plan: Question[]): void {
  const part5 = countPart(plan, "Part 5");
  const part6 = countPart(plan, "Part 6");
  const part7 = countPart(plan, "Part 7");
  const errors: string[] = [];

  if (plan.length !== 100) errors.push(`總題數 ${plan.length}/100`);
  if (part5 !== 30) errors.push(`Part 5 ${part5}/30`);
  if (part6 !== 16) errors.push(`Part 6 ${part6}/16`);
  if (part7 !== 54) errors.push(`Part 7 ${part7}/54`);

  if (errors.length > 0) {
    throw new Error(`Mock test plan invalid:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  }
}

/**
 * Build a 100-question mock test plan with strict part distribution:
 * Part 5 = 30, Part 6 = 16, Part 7 = 54 (single=29, double=10, triple=15).
 */
export function buildMockTestPlan(): Question[] {
  const errors: string[] = [];

  const part5Qs = shuffle(getQuestionsByPart("Part 5")).slice(0, 30);
  if (part5Qs.length < 30) {
    errors.push(`Part 5 只有 ${part5Qs.length}/30 題`);
  }

  const p6Groups = groupByPassage(getQuestionsByPart("Part 6")).filter(
    (group) => group.length === 4
  );
  const selectedP6 = shuffle(p6Groups).slice(0, 4);
  if (selectedP6.length < 4) {
    errors.push(`Part 6 只有 ${selectedP6.length}/4 valid groups`);
  }

  const p7Groups = groupByPassage(getQuestionsByPart("Part 7"));
  const getType = (group: Question[]): PassageGroupType =>
    group[0]?.passage_group_type ?? "single";
  const singleGroups = p7Groups.filter((group) => getType(group) === "single");
  const doubleGroups = p7Groups.filter(
    (group) => getType(group) === "double" && group.length === 5
  );
  const tripleGroups = p7Groups.filter(
    (group) => getType(group) === "triple" && group.length === 5
  );

  const selectedSingles = selectGroupsForTotal(singleGroups, 29);
  if (!selectedSingles) {
    const available = singleGroups.reduce((sum, group) => sum + group.length, 0);
    errors.push(`Part 7 single 無法剛好組成 29 題 (available ${available})`);
  }

  const selectedDoubles = shuffle(doubleGroups).slice(0, 2);
  if (selectedDoubles.length < 2) {
    errors.push(`Part 7 double 只有 ${selectedDoubles.length}/2 valid groups`);
  }

  const selectedTriples = shuffle(tripleGroups).slice(0, 3);
  if (selectedTriples.length < 3) {
    errors.push(`Part 7 triple 只有 ${selectedTriples.length}/3 valid groups`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Mock test plan incomplete:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  const plan = [
    ...part5Qs,
    ...selectedP6.flat(),
    ...(selectedSingles ?? []).flat(),
    ...selectedDoubles.flat(),
    ...selectedTriples.flat(),
  ];
  assertMockPlan(plan);
  return plan;
}
