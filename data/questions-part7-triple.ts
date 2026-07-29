import type { Question, Choice, Difficulty, SkillTag } from "@/types/question";

/**
 * Part 7 triple-passage sets.
 *
 * Written by hand rather than generated. Two reasons:
 *   1. Triple passages were the thinnest pool in the bank (15 groups), which
 *      capped non-repeating reading mocks at 5 — and three-document sets are
 *      exactly where a 450→700 learner loses the most points.
 *   2. Every generated batch in the bank leaks the key through option length
 *      (a longest-option guesser scores far above chance). These sets are
 *      written with length-matched options from the start; `npm run check`
 *      reports the batch, so a regression is visible immediately.
 *
 * Each set follows the real exam shape: three linked business documents and
 * five questions, at least one of which cannot be answered without combining
 * information from two different documents.
 *
 * Sets are declared compactly and expanded at module load. Repeating the full
 * passage text in five literal objects would both bloat the file and risk the
 * TS2590 "union too complex" error the large banks already hit.
 */

type SetSpec = {
  /** Group suffix; ids become `p7-tri-<nn><a-e>`. */
  id: string;
  difficulty: Difficulty;
  passage: string;
  vocabulary: string[];
  questions: {
    question: string;
    choices: { A: string; B: string; C: string; D: string };
    answer: Choice;
    explanation_zh: string;
    skill_tag: SkillTag;
  }[];
};

const SETS: SetSpec[] = [
  {
    id: "01",
    difficulty: "B1",
    vocabulary: ["registration fee", "early bird", "waiting list", "invoice", "reserve a place"],
    passage: `Text 1 — Notice

Northbridge Marketing Summit — Registration Information

Dates: 14–15 September
Venue: Northbridge Convention Centre, Hall C

Registration fees
  Early bird (on or before 15 August) ......... $180
  Standard (16 August – 5 September) .......... $240
  On-site registration ........................ $300

All fees include entry to the two keynote addresses, access to the exhibition floor, and lunch on both days. Members of the Northbridge Business Association receive a $40 discount on any of the rates listed above.

Optional afternoon workshops are limited to 25 participants each and must be reserved at the time of registration. Workshop places cannot be added after 5 September.

To register, e-mail summit@northbridgemc.org with your name, organisation, and workshop preference.

Text 2 — E-mail

To: summit@northbridgemc.org
From: p.oyelaran@varrowfoods.com
Date: 12 August
Subject: Registration — two attendees

Hello,

I would like to register two people from Varrow Foods for next month's summit: myself, Priya Oyelaran, and our brand manager, Danilo Ferreira. Both of us are members of the Northbridge Business Association.

We would each like a place in the "Measuring Campaign Impact" workshop on the first afternoon. Danilo is also interested in the packaging design session, but if he can take only one, the measurement workshop is the priority.

Could you confirm the total amount due and let me know how to pay?

Regards,
Priya Oyelaran
Director of Marketing, Varrow Foods

Text 3 — E-mail

To: p.oyelaran@varrowfoods.com
From: summit@northbridgemc.org
Date: 13 August
Subject: RE: Registration — two attendees

Dear Ms. Oyelaran,

Thank you. Both registrations are confirmed at the rate that applies to the date of your message, with the association discount applied to each person.

I have reserved a place for you in "Measuring Campaign Impact". Unfortunately that session reached its limit yesterday, so Mr. Ferreira has been added to the waiting list and booked into the packaging design session in the meantime. We will contact him directly if a place opens up.

An invoice will follow separately. Payment is due within fourteen days of the invoice date.

Best wishes,
Adaeze Nwosu
Summit Registrar`,
    questions: [
      {
        question: "According to the notice, what is required in order to attend a workshop?",
        choices: {
          A: "A separate payment must be made on arrival.",
          B: "A place must be reserved when registering.",
          C: "Membership in the Business Association is needed.",
          D: "Written approval from the registrar is required.",
        },
        answer: "B",
        explanation_zh:
          "細節題：通知寫 workshops「must be reserved at the time of registration」，故選 (B)。(A) 現場付費、(D) 需登記處批准都沒提到；(C) 協會會員只影響折扣，不是參加工作坊的條件。",
        skill_tag: "reading_detail",
      },
      {
        question: "How much will Varrow Foods be charged in total?",
        choices: { A: "$280", B: "$320", C: "$400", D: "$480" },
        answer: "A",
        explanation_zh:
          "跨文件計算題：Oyelaran 於 8/12 來信，落在 early bird（8/15 前）的 $180；兩人都是協會會員，各折 $40 → 每人 $140，兩人共 $280。誤選 $320 是忘了折扣只算一份，$480 是誤用 $240 標準價。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is suggested about Mr. Ferreira?",
        choices: {
          A: "He will attend only the second day.",
          B: "He was given a session he did not request first.",
          C: "He is not a member of the association.",
          D: "He registered after the early bird deadline.",
        },
        answer: "B",
        explanation_zh:
          "推論題：他原本要「Measuring Campaign Impact」，但該場額滿，被安排進 packaging design session，故選 (B)。(C) 與 Text 2 明說兩人都是會員矛盾；(D) 8/12 仍在早鳥期內；(A) 沒有依據。",
        skill_tag: "reading_inference",
      },
      {
        question: "According to the reply, when must payment be made?",
        choices: {
          A: "On the first morning of the summit.",
          B: "Within two weeks of the invoice date.",
          C: "Before the fifth of September at the latest.",
          D: "At the same time as the registration request.",
        },
        answer: "B",
        explanation_zh:
          "細節題：Text 3 說 Payment is due within fourteen days of the invoice date，十四天＝兩週，故選 (B)。(C) 的 9/5 是加購工作坊的截止日，不是付款期限，這是本題最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question:
          "What will most likely happen if a place opens in the measurement workshop?",
        choices: {
          A: "The limit on participants will be raised.",
          B: "Mr. Ferreira will be contacted directly.",
          C: "Ms. Oyelaran will be moved to that session.",
          D: "A second workshop will be added that day.",
        },
        answer: "B",
        explanation_zh:
          "推論題：Text 3 明說 We will contact him directly if a place opens up，故選 (B)。(C) 錯在 Oyelaran 早已有位子，不需要被移動；(A)(D) 文中都沒有這種安排。",
        skill_tag: "reading_inference",
      },
    ],
  },
  {
    id: "02",
    difficulty: "B1",
    vocabulary: ["quotation", "lead time", "unit price", "bulk order", "purchase order"],
    passage: `Text 1 — Web page

Halvorsen Office Interiors — Seating Price List (valid until 31 March)

  Model            Unit price   Lead time
  Corvo Task         $95        2 weeks
  Corvo Task Plus   $135        3 weeks
  Meridian Executive $210       5 weeks
  Fold-flat Visitor   $60       in stock

Orders of 40 units or more of any single model qualify for our bulk rate: 15% off the unit price shown. Delivery within the metropolitan area is free on orders above $2,000; otherwise a flat delivery charge of $150 applies.

Lead times run from the date we receive a signed purchase order, not from the date of enquiry.

Text 2 — E-mail

To: sales@halvorsen-interiors.com
From: t.brennan@fieldstonelaw.com
Date: 4 March
Subject: Seating for new floor

Good afternoon,

We are fitting out an additional floor and will need 48 task chairs. Our staff have tried both Corvo models and clearly prefer the Plus version, so that is what we would like to order.

The floor is due to open to staff on 11 April. Please confirm that this is achievable and send a quotation. Our office is in the city centre, so I assume delivery is included.

Many thanks,
Tomás Brennan
Office Manager, Fieldstone Law

Text 3 — E-mail

To: t.brennan@fieldstonelaw.com
From: sales@halvorsen-interiors.com
Date: 5 March
Subject: RE: Seating for new floor

Dear Mr. Brennan,

Thank you for your enquiry. Your quantity does qualify for the bulk rate, and your address falls inside the free delivery zone, so no delivery charge applies.

I must flag one point about your date. Even if a signed purchase order reaches us today, the Plus model would not arrive until after the eleventh. The standard Corvo Task would comfortably meet your deadline, and the two models share the same frame and adjustment range — the Plus adds a headrest and a softer seat pad.

Let me know which you would prefer and I will issue the quotation the same day.

Kind regards,
Ingrid Halvorsen`,
    questions: [
      {
        question: "What is the purpose of Mr. Brennan's e-mail?",
        choices: {
          A: "To request a price for a specific order",
          B: "To complain about a late delivery",
          C: "To arrange a showroom appointment",
          D: "To return chairs bought last year",
        },
        answer: "A",
        explanation_zh:
          "主旨題：Brennan 說明數量與型號並寫 Please...send a quotation，目的是索取報價，故選 (A)。(B) 尚未下單何來延遲；(C)(D) 全文未提。",
        skill_tag: "reading_main_idea",
      },
      {
        question: "What is the unit price Fieldstone Law would pay for each chair?",
        choices: { A: "$95", B: "$114.75", C: "$135", D: "$178.50" },
        answer: "B",
        explanation_zh:
          "跨文件計算題：他們要的是 Corvo Task Plus（$135），48 張達到 40 張以上的 bulk rate 打 85 折 → 135 × 0.85 = $114.75。(C) 是沒算折扣，(A) 是算錯型號。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why does Ms. Halvorsen mention the eleventh?",
        choices: {
          A: "To point out a scheduling problem",
          B: "To confirm the date works well",
          C: "To offer a discount for waiting",
          D: "To ask for a signature by then",
        },
        answer: "A",
        explanation_zh:
          "意圖題：她指出即使今天收到訂單，Plus 型號也趕不上 11 日，是在提醒交期有問題，故選 (A)。(B) 與她的說法相反；(C) 折扣來自數量不是等待；(D) 她沒有設簽署期限。",
        skill_tag: "reading_inference",
      },
      {
        question: "What is indicated about the two Corvo models?",
        choices: {
          A: "They are built on the same frame.",
          B: "They are sold only in bulk quantities.",
          C: "They have identical lead times.",
          D: "They are both currently in stock.",
        },
        answer: "A",
        explanation_zh:
          "細節題：Text 3 說兩款 share the same frame and adjustment range，故選 (A)。(C) 與價目表 2 週對 3 週矛盾；(D) 只有 Fold-flat Visitor 是現貨；(B) 沒有這個限制。",
        skill_tag: "reading_detail",
      },
      {
        question: "What will Ms. Halvorsen do once Mr. Brennan replies?",
        choices: {
          A: "Deliver the chairs to the new floor",
          B: "Send the quotation on the same day",
          C: "Refund the flat delivery charge",
          D: "Visit the office to measure it",
        },
        answer: "B",
        explanation_zh:
          "細節題：她寫 Let me know which you would prefer and I will issue the quotation the same day，故選 (B)。(C) 本案根本免運費；(A) 要先下單；(D) 沒提到。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "03",
    difficulty: "B2",
    vocabulary: ["tenant", "premises", "notice period", "renewal", "utilities"],
    passage: `Text 1 — Notice

To all tenants of Maple Court Business Park

Scheduled Works — Car Park Resurfacing

The main car park will be resurfaced between 6 and 24 May. During this period the following arrangements apply:

  • The east car park closes for the full three weeks.
  • The west car park stays open but loses 30 of its 90 spaces.
  • Overflow parking is available on Rowan Street, a six-minute walk away.

Tenants who hold reserved bays in the east car park will be allocated a bay in the west car park for the duration of the works. Allocation is by length of tenancy, so tenants who have been with us longest are placed first.

Questions should go to the site office, not to the contractor.

Text 2 — E-mail

To: siteoffice@maplecourtbp.com
From: r.adeyemi@lumendata.co
Date: 22 April
Subject: Reserved bays during the works

Dear Site Office,

Lumen Data occupies Unit 14 and has held three reserved bays in the east car park since we moved in eighteen months ago.

Two of our engineers carry heavy diagnostic equipment between the office and their vehicles several times a day, so the Rowan Street overflow would not be workable for them. Could you confirm how many bays we will be given in the west car park, and when we will know which ones?

I should add that our lease is up for renewal in July and reliable parking is one of the points we are weighing.

Best regards,
Rotimi Adeyemi
Operations Lead, Lumen Data

Text 3 — Memo

To: R. Adeyemi, Lumen Data (Unit 14)
From: Site Office, Maple Court Business Park
Date: 25 April

Mr. Adeyemi,

Thank you for writing. Demand for west car park bays is higher than the number available, and as you know allocation follows length of tenancy. On that basis we can guarantee Lumen Data one bay for the works period rather than three.

However, we recognise the equipment issue you raise. We have arranged for a loading bay beside the Unit 14 entrance to be kept clear between 08:00 and 10:00 and again between 16:00 and 18:00, so your engineers can load and unload directly. This is not a parking space and vehicles may not be left there outside those hours.

Bay numbers will be posted on the site office door on 1 May.

Site Office`,
    questions: [
      {
        question: "What is the main purpose of the notice?",
        choices: {
          A: "To inform tenants about upcoming works",
          B: "To announce an increase in parking fees",
          C: "To introduce a new site office manager",
          D: "To remind tenants to renew their leases",
        },
        answer: "A",
        explanation_zh:
          "主旨題：通知在說明 5/6–5/24 停車場重鋪期間的安排，故選 (A)。(B) 費用、(C) 人事、(D) 續約都不是這份通知的內容——租約是 Text 2 才出現的。",
        skill_tag: "reading_main_idea",
      },
      {
        question: "How many spaces will the west car park have during the works?",
        choices: { A: "30", B: "60", C: "90", D: "120" },
        answer: "B",
        explanation_zh:
          "細節計算題：通知說西停車場原有 90 格，施工期間 loses 30，90 − 30 = 60，故選 (B)。(A) 是減掉的數量，(C) 是施工前的總數。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why does Lumen Data receive fewer bays than it requested?",
        choices: {
          A: "It applied after the stated deadline.",
          B: "It has been a tenant for a shorter time.",
          C: "It does not hold any reserved bays.",
          D: "Its unit is too far from the west lot.",
        },
        answer: "B",
        explanation_zh:
          "跨文件推論題：通知說分配依 length of tenancy 排序，Text 2 說 Lumen Data 才進駐十八個月，資歷較淺，故只分到一格。(C) 與他們原有三格矛盾；(A)(D) 都沒有依據。",
        skill_tag: "reading_inference",
      },
      {
        question: "What does the site office arrange for the engineers?",
        choices: {
          A: "A parking bay reserved all day long",
          B: "A loading area free at certain hours",
          C: "A storage room inside the building",
          D: "A shuttle service from Rowan Street",
        },
        answer: "B",
        explanation_zh:
          "細節題：備忘錄說在 08:00–10:00 與 16:00–18:00 保留一個 loading bay 供上下貨，故選 (B)。(A) 錯在文中明說「This is not a parking space」，只有特定時段可用，是最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "When will tenants learn which bays they have been given?",
        choices: {
          A: "On the first day of the works",
          B: "On the first day of May",
          C: "By the end of April",
          D: "In July at renewal time",
        },
        answer: "B",
        explanation_zh:
          "細節題：備忘錄最後說 Bay numbers will be posted...on 1 May，故選 (B)。(A) 施工從 5/6 開始，晚於公布日；(D) 七月是租約續約，與車位公布無關。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "04",
    difficulty: "B2",
    vocabulary: ["applicant", "curriculum vitae", "job share", "shortlist", "relevant experience"],
    passage: `Text 1 — Advertisement

FENWICK MUSEUM
Assistant Curator (Decorative Arts)

Salary band 6 ($41,000–$47,000) · Full time · Closing date 30 September

The successful applicant will help catalogue the museum's ceramics and glass holdings, prepare condition reports, and support two temporary exhibitions each year.

Essential: a postgraduate qualification in museum studies OR at least four years of relevant experience in a gallery or collection.

All applicants must supply a covering letter, a curriculum vitae, and two references from previous employers. Applications that omit any of these will not be forwarded to the panel.

Interviews will be held in the week beginning 14 October.

Text 2 — E-mail

To: recruitment@fenwickmuseum.org
From: e.varga@post.net
Date: 26 September
Subject: Assistant Curator (Decorative Arts)

Dear Recruitment Team,

Please find attached my covering letter, curriculum vitae, and the details of two referees for the Assistant Curator post advertised on your website.

I do not hold a postgraduate qualification in museum studies. I have, however, spent five years at the Ashcombe Gallery, where I have been responsible for a collection of nineteenth-century glass and have written condition reports throughout that time.

One question: I have caring responsibilities on Fridays. Would the museum consider any reduction in the hours?

Yours faithfully,
Erzsébet Varga

Text 3 — E-mail

To: e.varga@post.net
From: recruitment@fenwickmuseum.org
Date: 3 October
Subject: RE: Assistant Curator (Decorative Arts)

Dear Ms. Varga,

Your application has been shortlisted and the panel would like to see you on Thursday 17 October at 11:00.

On your question: the post is funded as a full-time position and we cannot reduce the hours for a single postholder. We can, however, consider a job share. If you know another candidate who would apply jointly with you, tell us before the interview and the panel will assess you together.

Please bring examples of your previous work. There is no need to bring original certificates at this stage.

Regards,
Chidi Okonkwo
Head of Collections`,
    questions: [
      {
        question: "According to the advertisement, what must all applicants supply?",
        choices: {
          A: "Two references from previous employers",
          B: "A portfolio of recent exhibition work",
          C: "Proof of a museum studies degree",
          D: "A sample condition report for an object",
        },
        answer: "A",
        explanation_zh:
          "細節題：廣告寫 All applicants must supply a covering letter, a curriculum vitae, and two references，故選 (A)。(C) 學位只是資格二選一，不是必繳文件；(B)(D) 都沒有要求。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why is Ms. Varga eligible for the post?",
        choices: {
          A: "She holds a museum studies qualification.",
          B: "She has more than four years of experience.",
          C: "She has worked at the Fenwick Museum before.",
          D: "She was recommended by a current curator.",
        },
        answer: "B",
        explanation_zh:
          "跨文件推論題：廣告的資格是「museum studies 學位」或「四年以上相關經驗」二擇一；Text 2 說她在 Ashcombe Gallery 待了五年，符合後者。(A) 她明說自己沒有學位，是最大陷阱。",
        skill_tag: "reading_inference",
      },
      {
        question: "What does Mr. Okonkwo suggest Ms. Varga consider?",
        choices: {
          A: "Reapplying when the next round of posts opens",
          B: "Accepting a lower salary at the start",
          C: "Applying jointly with another candidate",
          D: "Taking a short-term contract instead",
        },
        answer: "C",
        explanation_zh:
          "細節題：他說無法為單一職缺減少工時，但可考慮 job share，並請她在面試前告知是否有共同申請的人選，故選 (C)。(A)(B)(D) 都不是他提出的選項。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is Ms. Varga asked to bring to the interview?",
        choices: {
          A: "A list of professional references",
          B: "Examples of her previous work",
          C: "The original of her certificates",
          D: "A written exhibition proposal",
        },
        answer: "B",
        explanation_zh:
          "細節題：Text 3 說 Please bring examples of your previous work，並明白表示 no need to bring original certificates，故選 (B) 而非 (C)。推薦人資料在申請階段已經交過了。",
        skill_tag: "reading_detail",
      },
      {
        question: "When will Ms. Varga meet the panel?",
        choices: {
          A: "On the thirtieth of September",
          B: "On the third of October",
          C: "On the seventeenth of October",
          D: "On the fourteenth of October",
        },
        answer: "C",
        explanation_zh:
          "細節題：Text 3 指定 Thursday 17 October at 11:00，故選 (C)。(A) 是申請截止日，(B) 是這封信的日期，(D) 是廣告寫的面試「該週的週一」，都是干擾用的日期。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "05",
    difficulty: "B1",
    vocabulary: ["catering", "per person", "dietary requirement", "surcharge", "final numbers"],
    passage: `Text 1 — Information

Saltmarsh Catering — Corporate Packages

  Package        Per person   Minimum guests
  Bronze buffet     $22            30
  Silver buffet     $31            50
  Gold served menu  $46            50

Every package includes soft drinks, tea and coffee. Vegetarian dishes are provided at no extra cost and do not need to be ordered separately.

Guests with a severe allergy can be catered for, but our kitchen needs ten working days' notice to prepare food in a dedicated area. A surcharge of $6 per affected guest applies.

Final numbers must reach us seven days before the event. After that point we cannot reduce the guest count, although we can still add guests.

Text 2 — E-mail

To: bookings@saltmarshcatering.com
From: h.lindqvist@brightpath.org
Date: 2 October
Subject: Staff conference, 18 October

Hello,

I would like to book the Silver buffet for our staff conference on Saturday 18 October. We expect 60 guests.

Eight of our team are vegetarian, and one colleague has a severe nut allergy, so please treat that as a firm requirement rather than a preference.

Could you confirm the booking and tell me what we owe?

Thanks,
Hanne Lindqvist
Brightpath Foundation

Text 3 — E-mail

To: h.lindqvist@brightpath.org
From: bookings@saltmarshcatering.com
Date: 3 October
Subject: RE: Staff conference, 18 October

Dear Ms. Lindqvist,

Your guest count comfortably meets the minimum for the Silver package, and the vegetarian dishes are already covered, so there is nothing extra to arrange there.

The allergy is the difficulty. Counting from today, the eighteenth does not give our kitchen the notice period it needs. I can offer you two ways round it: move the event to a date at least ten working days away, or keep the date and we will arrange a separately prepared meal for that guest from an outside supplier at the same surcharge.

Please also note the date by which we need your final numbers.

Best wishes,
Marcus Oyelowo`,
    questions: [
      {
        question: "What is included in every package?",
        choices: {
          A: "Hot drinks and soft drinks",
          B: "A served three-course menu",
          C: "Table decorations and flowers",
          D: "Transport for the catering staff",
        },
        answer: "A",
        explanation_zh:
          "細節題：資訊頁寫 Every package includes soft drinks, tea and coffee，故選 (A)。(B) 只有 Gold 是 served menu；(C)(D) 全文未提。",
        skill_tag: "reading_detail",
      },
      {
        question: "What does Mr. Oyelowo indicate about the vegetarian guests?",
        choices: {
          A: "They must be counted separately.",
          B: "They will pay a reduced rate.",
          C: "No extra arrangement is needed.",
          D: "They require ten days' notice.",
        },
        answer: "C",
        explanation_zh:
          "跨文件細節題：資訊頁說素食 at no extra cost 且不需另外訂，Text 3 也說 already covered，故選 (C)。(D) 的十天通知期是給嚴重過敏，不是素食，這是本題最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why can Saltmarsh Catering not meet the allergy requirement?",
        choices: {
          A: "The guest count is above the limit.",
          B: "There is not enough notice given.",
          C: "The chosen package excludes it.",
          D: "The venue kitchen is too small.",
        },
        answer: "B",
        explanation_zh:
          "跨文件推論題：需要十個工作天的準備期，但 10/3 到 10/18 不足，故選 (B)。(A) 60 人是超過最低人數而非上限；(C) 過敏餐與方案等級無關。",
        skill_tag: "reading_inference",
      },
      {
        question: "By when must Ms. Lindqvist confirm her final numbers?",
        choices: {
          A: "The third of October",
          B: "The eighth of October",
          C: "The eleventh of October",
          D: "The eighteenth of October",
        },
        answer: "C",
        explanation_zh:
          "跨文件計算題：最終人數須在活動前七天送達，活動是 10/18，往前七天＝10/11，故選 (C)。(D) 是活動當天，(A) 是回信日期。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is one option Mr. Oyelowo offers?",
        choices: {
          A: "Upgrading the package free of charge",
          B: "Holding the event on a later date",
          C: "Removing the surcharge entirely",
          D: "Reducing the minimum guest count",
        },
        answer: "B",
        explanation_zh:
          "細節題：他提出兩個辦法，其一是把活動改到至少十個工作天之後，故選 (B)。(C) 錯在外部供餐仍然 at the same surcharge，附加費並未取消。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "06",
    difficulty: "B2",
    vocabulary: ["serial number", "batch", "recall", "replacement unit", "affected"],
    passage: `Text 1 — Notice

SAFETY NOTICE — Voluntary Recall
Kellhorn KX-40 Electric Kettle

Kellhorn is recalling a limited number of KX-40 kettles. In a small proportion of units the base connector can overheat during repeated use.

Affected units carry a serial number beginning KX40- followed by six digits in the range 220401 to 224800. The serial number is printed on a silver label on the underside of the base, not on the kettle body.

Owners of affected units should stop using the kettle immediately and register at kellhorn.com/kx40 for a free replacement, which is dispatched within five working days. Units outside this range are unaffected and may continue to be used normally.

Retailers should remove affected stock from display but need not return it; a collection will be arranged.

Text 2 — E-mail

To: support@kellhorn.com
From: j.mbeki@wrenfield-serviced.com
Date: 19 June
Subject: KX-40 kettles in our apartments

Good morning,

We manage forty serviced apartments and each one has a KX-40 in the kitchen. After seeing your notice we checked every unit.

Thirty-one of them have serial numbers in the range you list. The remaining nine read KX40-231150 and above.

Registering thirty-one kettles one at a time through the website is going to be slow, and our guests are still using them. Is there a faster route for a business with this many units?

Regards,
Joseph Mbeki
Wrenfield Serviced Apartments

Text 3 — E-mail

To: j.mbeki@wrenfield-serviced.com
From: support@kellhorn.com
Date: 19 June
Subject: RE: KX-40 kettles in our apartments

Dear Mr. Mbeki,

Thank you for checking so thoroughly. You are right that the web form is designed for single households. For orders above twenty units we handle the exchange directly: send one list with the serial numbers and a delivery address, and we will ship the replacements as a single consignment.

Please do withdraw the affected kettles from the apartments today rather than waiting for the replacements to arrive. The nine you identified as outside the range need no action at all.

I have marked your case as a business exchange, so your consignment is scheduled to leave us on 24 June.

Kind regards,
Talia Ferreira
Product Safety Team`,
    questions: [
      {
        question: "Where is the serial number found?",
        choices: {
          A: "On a label under the base",
          B: "On the side of the kettle body",
          C: "Inside the original packaging",
          D: "On the back of the power cord",
        },
        answer: "A",
        explanation_zh:
          "細節題：通知寫序號印在底座下方的銀色標籤，並特別強調 not on the kettle body，故選 (A)。(B) 正是通知明白排除的位置，是本題最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "How many of Wrenfield's kettles need to be replaced?",
        choices: { A: "Nine", B: "Twenty", C: "Thirty-one", D: "Forty" },
        answer: "C",
        explanation_zh:
          "跨文件細節題：Mbeki 說四十台中有 31 台序號落在回收範圍內，其餘 9 台在範圍外不受影響，故選 (C)。(D) 是總數，(A) 是不受影響的數量。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why does Mr. Mbeki write to Kellhorn?",
        choices: {
          A: "To report a kettle that overheated",
          B: "To ask for a quicker way to register",
          C: "To request a refund for his purchase",
          D: "To confirm that his stock is unaffected",
        },
        answer: "B",
        explanation_zh:
          "主旨題：他說逐台上網登記太慢，問 Is there a faster route for a business with this many units，故選 (B)。(A) 他沒有回報任何過熱事件；(D) 只有九台不受影響，不是他的來信目的。",
        skill_tag: "reading_main_idea",
      },
      {
        question: "What does Ms. Ferreira ask Mr. Mbeki to do immediately?",
        choices: {
          A: "Return the kettles to the retailer",
          B: "Take the affected kettles out of use",
          C: "Send photographs of the silver labels",
          D: "Wait until the replacements arrive",
        },
        answer: "B",
        explanation_zh:
          "細節題：她寫 Please do withdraw the affected kettles from the apartments today rather than waiting，故選 (B)。(D) 正是她要求不要做的事；(A) 退回零售商是給店家的指示。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is indicated about the replacement kettles?",
        choices: {
          A: "They will be sent in one delivery.",
          B: "They must be paid for in advance.",
          C: "They will arrive within five days.",
          D: "They are a different model number.",
        },
        answer: "A",
        explanation_zh:
          "細節題：Text 3 說 we will ship the replacements as a single consignment，故選 (A)。(C) 的五個工作天是網站個人登記的時程，本案是 6/24 出貨的商業換貨，兩者不同。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "07",
    difficulty: "B1",
    vocabulary: ["prerequisite", "enrol", "cohort", "waive", "certification"],
    passage: `Text 1 — Course listing

Ardmore Institute — Spring Professional Courses

  Code   Course                        Dates          Prerequisite
  DA-1   Spreadsheet Foundations       6–7 March      none
  DA-2   Data Analysis for Managers    20–21 March    DA-1 or equivalent
  DA-3   Forecasting and Modelling     10–11 April    DA-2
  PM-1   Project Planning Basics       13–14 March    none

Each course runs from 09:30 to 16:30 on both days and is capped at eighteen participants. Employers are invoiced at the end of the month in which the course runs.

Where a participant can show equivalent workplace experience, the head of faculty may waive a prerequisite. Requests to waive must be made at least ten days before the course begins.

Text 2 — E-mail

To: courses@ardmore-inst.ac
From: n.haddad@calloway-eng.com
Date: 4 March
Subject: Enrolment for two staff

Dear Course Office,

I would like to enrol two of my team on Forecasting and Modelling in April.

Rania Haddad has completed Data Analysis for Managers with you last year. Bo Chen has not taken any of your courses, but he has built and maintained our department's demand forecasts for the past three years and does the modelling work our analysts rely on.

Please let me know whether both places can be confirmed.

Regards,
Nadia Haddad
Head of Planning, Calloway Engineering

Text 3 — E-mail

To: n.haddad@calloway-eng.com
From: courses@ardmore-inst.ac
Date: 6 March
Subject: RE: Enrolment for two staff

Dear Ms. Haddad,

Rania's place is confirmed without further steps, as her record shows the required course.

For Bo Chen I have passed your description of his forecasting work to the head of faculty, who is willing to waive the prerequisite on that basis. Your request arrived in good time, so there is no difficulty there. His place is also confirmed.

One point on billing: because the course runs in April, the invoice will not be issued until the end of that month, even though the booking is made now.

Regards,
Course Office`,
    questions: [
      {
        question: "What is the prerequisite for Forecasting and Modelling?",
        choices: {
          A: "Spreadsheet Foundations",
          B: "Data Analysis for Managers",
          C: "Project Planning Basics",
          D: "No prior course is needed",
        },
        answer: "B",
        explanation_zh:
          "細節題：課程表列 DA-3 Forecasting and Modelling 的先修為 DA-2，也就是 Data Analysis for Managers，故選 (B)。(A) 是 DA-2 的先修，不是 DA-3 的。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why is Mr. Chen able to take the course?",
        choices: {
          A: "He completed an equivalent course elsewhere.",
          B: "His workplace experience was accepted instead.",
          C: "He was placed on a waiting list for a cancellation.",
          D: "He enrolled before the published closing date.",
        },
        answer: "B",
        explanation_zh:
          "跨文件推論題：課程表允許以 equivalent workplace experience 免除先修，Text 3 說系主任據此同意 waive，故選 (B)。(A) 他明說沒上過任何課程。",
        skill_tag: "reading_inference",
      },
      {
        question: "What is indicated about the waiver request?",
        choices: {
          A: "It was submitted early enough.",
          B: "It requires an extra payment.",
          C: "It must be renewed each term.",
          D: "It was refused by the faculty.",
        },
        answer: "A",
        explanation_zh:
          "跨文件細節題：免除申請須在開課前十天提出；課程 4/10 開始，來信 3/4，Text 3 也說 arrived in good time，故選 (A)。(D) 與「已核准」矛盾。",
        skill_tag: "reading_detail",
      },
      {
        question: "When will Calloway Engineering be invoiced?",
        choices: {
          A: "At the end of March",
          B: "At the end of April",
          C: "On the day of booking",
          D: "On the first course day",
        },
        answer: "B",
        explanation_zh:
          "細節題：課程表說在開課當月月底請款，Text 3 再確認課程在四月，發票要到四月底才開，故選 (B)。(A) 是報名的月份，是本題最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "How long does each course last?",
        choices: {
          A: "One full day",
          B: "Two full days",
          C: "Three half days",
          D: "One full week",
        },
        answer: "B",
        explanation_zh:
          "細節題：課程表的日期都是兩天（如 10–11 April），且註明 runs from 09:30 to 16:30 on both days，故選 (B)。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "08",
    difficulty: "B2",
    vocabulary: ["capacity", "hire charge", "audiovisual", "provisional booking", "layout"],
    passage: `Text 1 — Web page

Cranmere Hotel — Meeting Rooms

  Room        Theatre capacity   Day rate   Audiovisual
  Aldworth          40            $350      included
  Brancaster        80            $520      included
  Chetwode         120            $700      $90 extra
  Dunmowe          200          $1,150      $90 extra

Rates cover the room from 08:00 to 18:00, still water, and one flip chart. Catering is arranged separately through our events team.

A provisional booking is held for seven days. After that the room is released unless a deposit of 25% has reached us.

Text 2 — E-mail

To: events@cranmerehotel.com
From: s.petrov@ridgemont-assoc.com
Date: 8 January
Subject: Room for 3 March

Dear Events Team,

We are looking for a room for our annual partners' meeting on Tuesday 3 March. We expect about 75 people, seated theatre style, and we will need a projector and a microphone.

Please confirm availability and the total cost. If the room we want is free, we would like to hold it while our board approves the budget, which should take two or three weeks.

Best regards,
Sofia Petrov
Ridgemont Associates

Text 3 — E-mail

To: s.petrov@ridgemont-assoc.com
From: events@cranmerehotel.com
Date: 9 January
Subject: RE: Room for 3 March

Dear Ms. Petrov,

I am sorry to say the room that matches your numbers most closely is already taken on 3 March by a long-standing client. The next room up is free that day and will seat your group comfortably, although you would be paying for capacity you do not need.

Two things to weigh. First, that larger room does not include audiovisual equipment in the rate, so the projector and microphone are charged on top. Second, our provisional holds run for one week only, which is shorter than the period you mention — you may wish to ask your board for an earlier decision, or place the deposit and reclaim it internally later.

Kind regards,
Events Team`,
    questions: [
      {
        question: "Which room does the events team offer Ms. Petrov?",
        choices: { A: "Aldworth", B: "Brancaster", C: "Chetwode", D: "Dunmowe" },
        answer: "C",
        explanation_zh:
          "跨文件推論題：75 人最接近的是 Brancaster（80 人）但當天已被訂走，the next room up 即 Chetwode（120 人），故選 (C)。(B) 是被訂走的那間，是最大陷阱。",
        skill_tag: "reading_inference",
      },
      {
        question: "What will the room hire cost before extras?",
        choices: { A: "$350", B: "$520", C: "$700", D: "$1,150" },
        answer: "C",
        explanation_zh:
          "跨文件細節題：接上題，提供的是 Chetwode，日租 $700，故選 (C)。(B) 是原本想訂但已滿的 Brancaster 價格。",
        skill_tag: "reading_detail",
      },
      {
        question: "What extra charge will Ridgemont Associates face?",
        choices: {
          A: "A fee for the audiovisual equipment",
          B: "A surcharge for a weekday booking",
          C: "A cleaning charge after the meeting",
          D: "A fee for setting out the chairs",
        },
        answer: "A",
        explanation_zh:
          "跨文件細節題：Chetwode 的 Audiovisual 欄是 $90 extra，Text 3 也提醒投影機與麥克風要另計，故選 (A)。(B)(C)(D) 全文都沒有這些費用。",
        skill_tag: "reading_detail",
      },
      {
        question: "What problem does the events team raise about timing?",
        choices: {
          A: "The meeting date has already passed.",
          B: "The hold is shorter than the wait.",
          C: "The room is only free in the morning.",
          D: "The deposit cannot be paid by card.",
        },
        answer: "B",
        explanation_zh:
          "推論題：暫訂只保留七天，但 Petrov 說董事會要兩三週才會核准，時間對不上，故選 (B)。(C) 房價已涵蓋 08:00–18:00 全天。",
        skill_tag: "reading_inference",
      },
      {
        question: "What is included in the room rate?",
        choices: {
          A: "Water and one flip chart",
          B: "A buffet lunch for guests",
          C: "Parking for all attendees",
          D: "A technician for the day",
        },
        answer: "A",
        explanation_zh:
          "細節題：網頁寫 Rates cover the room from 08:00 to 18:00, still water, and one flip chart，故選 (A)。(B) 餐飲明說要另外向 events team 安排。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "09",
    difficulty: "B1",
    vocabulary: ["itinerary", "connecting flight", "rebook", "baggage allowance", "layover"],
    passage: `Text 1 — Itinerary

TRAVEL ITINERARY — Booking reference 8QK4TM
Passenger: WHITLOCK / DANIEL MR

  Flight   Route              Depart        Arrive
  VA 218   Bergen → Munich    Tue 4 Nov 07:15   Tue 4 Nov 09:40
  VA 507   Munich → Ankara    Tue 4 Nov 11:20   Tue 4 Nov 15:05

Checked baggage: 1 piece up to 23 kg. Cabin baggage: 1 piece up to 8 kg.

Passengers on connecting itineraries booked as a single reservation are rebooked at no charge if a delay causes a missed connection. Passengers who booked their flights separately are not covered by this provision.

Text 2 — E-mail

To: care@vantageair.example
From: d.whitlock@northmoor.co.uk
Date: 4 November
Subject: Missed connection — 8QK4TM

I am writing from Munich airport.

VA 218 left Bergen almost two hours late this morning and I reached the transfer desk after VA 507 had closed. The desk has put me on the 19:45 service to Ankara, which means I will miss the opening session of the conference I am travelling to.

I would also like to check one thing. I was told at check-in in Bergen that my suitcase was 24 kg and I paid an excess fee of €60. Was that correct?

Daniel Whitlock

Text 3 — E-mail

To: d.whitlock@northmoor.co.uk
From: care@vantageair.example
Date: 5 November
Subject: RE: Missed connection — 8QK4TM

Dear Mr. Whitlock,

I am sorry your journey was disrupted. Both flights sit on one reservation, so the rebooking you were given was correctly made without charge, and no further action is needed on that.

On the second point, your allowance is 23 kg and the recorded weight was 24 kg, so an excess did apply. However, our published excess rate on this route is €40, not the €60 you were charged. I have arranged a refund of the difference, which will reach your card within ten working days.

Regards,
Customer Care`,
    questions: [
      {
        question: "How long was Mr. Whitlock's scheduled layover in Munich?",
        choices: {
          A: "One hour and forty minutes",
          B: "Two hours and twenty-five minutes",
          C: "Three hours and forty-five minutes",
          D: "Four hours and five minutes",
        },
        answer: "A",
        explanation_zh:
          "細節計算題：VA 218 於 09:40 抵達慕尼黑，VA 507 於 11:20 起飛，中間 1 小時 40 分，故選 (A)。(C) 是慕尼黑到安卡拉的飛行時間，容易看錯欄位。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why was Mr. Whitlock rebooked free of charge?",
        choices: {
          A: "He holds a frequent flyer card.",
          B: "Both flights are on one booking.",
          C: "He paid for a flexible ticket type.",
          D: "The airline cancelled his flight.",
        },
        answer: "B",
        explanation_zh:
          "跨文件推論題：行程單說同一訂位代號的轉機旅客可免費改票，Text 3 確認 Both flights sit on one reservation，故選 (B)。(D) 班機是延誤不是取消。",
        skill_tag: "reading_inference",
      },
      {
        question: "What was wrong with the fee Mr. Whitlock paid?",
        choices: {
          A: "It was charged twice by mistake.",
          B: "It should not have applied at all.",
          C: "The rate used was too high.",
          D: "It was billed in the wrong currency.",
        },
        answer: "C",
        explanation_zh:
          "細節題：客服說行李確實超重，但這條航線的公告費率是 €40 而非收取的 €60，問題出在費率，故選 (C)。(B) 錯在超重費本身是該收的，這是最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "By how much did Mr. Whitlock's suitcase exceed the allowance?",
        choices: { A: "One kilogram", B: "Eight kilograms", C: "Fifteen kilograms", D: "Twenty-three kilograms" },
        answer: "A",
        explanation_zh:
          "跨文件計算題：託運額度 23 kg，實測 24 kg，超出 1 kg，故選 (A)。(B) 是手提行李的額度，(D) 是託運額度本身。",
        skill_tag: "reading_detail",
      },
      {
        question: "What will happen within ten working days?",
        choices: {
          A: "A partial refund will be issued.",
          B: "A new itinerary will be sent out.",
          C: "A written apology will arrive.",
          D: "A travel voucher will be posted.",
        },
        answer: "A",
        explanation_zh:
          "細節題：客服說已安排退還差額，within ten working days 入帳，故選 (A)。是「差額」不是全額，也不是抵用券。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "10",
    difficulty: "B2",
    vocabulary: ["invoice", "outstanding balance", "credit note", "discrepancy", "remittance"],
    passage: `Text 1 — Invoice

TALLIS PAPER SUPPLIES
Invoice 44907 · Date: 12 May · Terms: 30 days

  Item                        Qty    Unit     Amount
  A4 copier paper, box of 5    24    $18.00    $432.00
  A3 copier paper, box of 5     6    $27.00    $162.00
  Recycled card, pack of 100   10     $9.50     $95.00
                                     Subtotal  $689.00
                                     Delivery    $0.00
                                     Total     $689.00

Accounts with a monthly spend above $500 receive free delivery. Payment by bank transfer to the details below; please quote the invoice number on your remittance.

Text 2 — E-mail

To: accounts@tallispaper.example
From: w.osei@fairbourne-clinic.org
Date: 20 May
Subject: Invoice 44907 — query

Dear Accounts,

We have received invoice 44907 and it does not match our delivery.

Our purchase order asked for six boxes of A3, and six boxes were listed on your delivery note, but only four arrived. Our storeroom log and the driver's signed sheet both record four.

We are happy to pay for what we received. Could you issue a corrected invoice so that we can process payment within your terms?

Regards,
Wendy Osei
Practice Manager, Fairbourne Clinic

Text 3 — E-mail

To: w.osei@fairbourne-clinic.org
From: accounts@tallispaper.example
Date: 21 May
Subject: RE: Invoice 44907 — query

Dear Ms. Osei,

Our warehouse has confirmed your account: two boxes of A3 were left off the pallet. I apologise for the error.

Rather than reissue the invoice I have raised a credit note for the two boxes, which reduces the amount you owe. Please settle the reduced figure by the original due date; there is no need to wait for new paperwork.

I should mention that the shortfall does not affect your delivery terms — your monthly total is still comfortably above the threshold, so no charge has been added there.

The two missing boxes can be sent with your June order at no cost if you would like them.

Regards,
Accounts, Tallis Paper Supplies`,
    questions: [
      {
        question: "What is the problem with invoice 44907?",
        choices: {
          A: "It charges for goods not received.",
          B: "It was sent to the wrong address.",
          C: "It applies an incorrect unit price.",
          D: "It omits the delivery charge due.",
        },
        answer: "A",
        explanation_zh:
          "主旨題：Osei 說帳單列六箱 A3 但只到四箱，等於被收了沒收到的貨，故選 (A)。(C) 單價沒有爭議；(D) 本案免運費，並非漏收。",
        skill_tag: "reading_main_idea",
      },
      {
        question: "How much should Fairbourne Clinic now pay?",
        choices: { A: "$527.00", B: "$635.00", C: "$662.00", D: "$689.00" },
        answer: "B",
        explanation_zh:
          "跨文件計算題：短少兩箱 A3，每箱 $27，扣除 $54；689 − 54 = $635，故選 (B)。(D) 是未更正前的原始金額。",
        skill_tag: "reading_detail",
      },
      {
        question: "What does Tallis Paper Supplies do instead of reissuing the invoice?",
        choices: {
          A: "It cancels the order completely.",
          B: "It extends the payment deadline.",
          C: "It issues a credit note.",
          D: "It refunds the full amount paid.",
        },
        answer: "C",
        explanation_zh:
          "細節題：對方說 Rather than reissue the invoice I have raised a credit note，故選 (C)。(B) 錯在明說仍要 settle by the original due date，付款期限並未延長。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is indicated about the delivery charge?",
        choices: {
          A: "It will be added to the June order.",
          B: "It remains waived for this account.",
          C: "It doubled because of the shortfall.",
          D: "It is refunded with the credit note.",
        },
        answer: "B",
        explanation_zh:
          "跨文件推論題：發票規則是月消費超過 $500 免運，Text 3 說即使短少後金額仍遠高於門檻，運費照樣是零，故選 (B)。",
        skill_tag: "reading_inference",
      },
      {
        question: "What does Tallis offer to do with the two missing boxes?",
        choices: {
          A: "Send them free with a later order",
          B: "Deliver them by courier tomorrow",
          C: "Replace them with A4 paper instead",
          D: "Hold them until payment is received",
        },
        answer: "A",
        explanation_zh:
          "細節題：信末說可隨六月訂單一起寄出且 at no cost，故選 (A)。(D) 與對方主動道歉、已開折讓單的態度矛盾。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "11",
    difficulty: "B1",
    vocabulary: ["roll-out", "log a ticket", "downtime", "migrate", "workaround"],
    passage: `Text 1 — Memo

To: All staff
From: IT Services
Subject: Move to Ferris Desk — what happens when

We are replacing our current helpdesk software with Ferris Desk. The change happens department by department:

  Week of 3 February ....... Finance and Payroll
  Week of 10 February ...... Sales and Marketing
  Week of 17 February ...... Operations
  Week of 24 February ...... Everyone else

On your department's changeover day the old system is read-only from 12:00. Tickets you raised before that time are migrated automatically. Anything you raise after 12:00 must go into Ferris Desk.

Please do not e-mail IT directly during the changeover. E-mails do not create tickets and will not be tracked.

Text 2 — E-mail

To: itservices@meridian-group.example
From: a.kowalczyk@meridian-group.example
Date: 18 February
Subject: Ticket 20881 — still open?

Hello,

I work in Operations. I raised ticket 20881 last Monday about a printer driver and it had not been resolved by the time our department changed over yesterday.

I have looked in Ferris Desk and I cannot find it there. I also cannot find it in the old system, which now seems to be read-only for us.

Should I raise it again, or is it somewhere I have not looked? I would rather not create a duplicate.

Thanks,
Aleksander Kowalczyk

Text 3 — E-mail

To: a.kowalczyk@meridian-group.example
From: itservices@meridian-group.example
Date: 18 February
Subject: RE: Ticket 20881 — still open?

Hello Aleksander,

You were right not to raise it twice. Ticket 20881 did migrate, but migrated tickets keep their old number only in the description field; Ferris Desk assigns a new reference of its own. Yours is now FD-3312, which is why a search for the old number found nothing.

I have added you as a watcher so it appears on your dashboard from now on. The driver work is still with our desktop team.

For anyone else who asks: search the description field, not the reference field, for pre-migration numbers.

IT Services`,
    questions: [
      {
        question: "When did the Operations department change over?",
        choices: {
          A: "In the week of 3 February",
          B: "In the week of 10 February",
          C: "In the week of 17 February",
          D: "In the week of 24 February",
        },
        answer: "C",
        explanation_zh:
          "細節題：備忘錄排程表列 Operations 在 2/17 那週，故選 (C)。Kowalczyk 也說 our department changed over yesterday，來信日 2/18，前一天正落在該週。",
        skill_tag: "reading_detail",
      },
      {
        question: "What does the memo tell staff not to do?",
        choices: {
          A: "Send e-mails to IT during the change",
          B: "Log in to the old system at all",
          C: "Raise any tickets before midday",
          D: "Contact the desktop team directly",
        },
        answer: "A",
        explanation_zh:
          "細節題：備忘錄說 Please do not e-mail IT directly during the changeover，因為信件不會產生工單，故選 (A)。(B) 舊系統仍可唯讀使用，並未禁止登入。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why could Mr. Kowalczyk not find his ticket?",
        choices: {
          A: "It was closed by mistake.",
          B: "It was given a new reference.",
          C: "It was never migrated over.",
          D: "It was raised after midday.",
        },
        answer: "B",
        explanation_zh:
          "細節題：IT 說搬移後的工單在 Ferris Desk 會拿到新編號 FD-3312，舊號只留在描述欄，故選 (B)。(C) 與「did migrate」直接矛盾，是最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "What does IT Services advise other staff to do?",
        choices: {
          A: "Search the description field",
          B: "Re-raise all older tickets",
          C: "Wait until the roll-out ends",
          D: "Ask their manager to search",
        },
        answer: "A",
        explanation_zh:
          "細節題：信末說 search the description field, not the reference field，故選 (A)。(B) 正是 IT 稱讚他沒有做的事（避免重複工單）。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is suggested about ticket FD-3312?",
        choices: {
          A: "It has now been resolved.",
          B: "It is still being worked on.",
          C: "It was passed to Finance.",
          D: "It will be closed tomorrow.",
        },
        answer: "B",
        explanation_zh:
          "推論題：IT 說 The driver work is still with our desktop team，表示仍在處理中，故選 (B)。(A) 與「still with」矛盾。",
        skill_tag: "reading_inference",
      },
    ],
  },
  {
    id: "12",
    difficulty: "B2",
    vocabulary: ["exhibitor", "stand", "floor plan", "footfall", "allocation"],
    passage: `Text 1 — Information sheet

HARBOURSIDE FOOD & DRINK FAIR — Exhibitor Information

  Stand type      Size        Price     Includes
  Taster bar      2m × 1m     $600      counter, one stool
  Standard        3m × 2m   $1,150      counter, two stools, sign
  Corner          3m × 3m   $1,800      as Standard, plus lighting
  Feature         6m × 3m   $3,200      as Corner, plus a demo kitchen

Stands are allocated in the order that deposits are received, not in the order that applications arrive. Exhibitors who took a stand at last year's fair may request the same position and will be given priority if their deposit arrives by 1 June.

Electricity is charged separately at $85 per stand regardless of type.

Text 2 — E-mail

To: exhibitors@harboursidefair.example
From: mira@twobellsbakery.example
Date: 28 May
Subject: Stand booking — Two Bells Bakery

Hello,

Two Bells Bakery exhibited last year on stand 42, which was on the corner by the north entrance, and we did very well there.

We would like the same position again this year. Our deposit was sent by bank transfer this morning. We would also like to run demonstrations this time, as visitors kept asking how the sourdough is made.

Could you tell me whether stand 42 can take a demonstration, and what the total will be?

Best wishes,
Mira Sandoval

Text 3 — E-mail

To: mira@twobellsbakery.example
From: exhibitors@harboursidefair.example
Date: 30 May
Subject: RE: Stand booking — Two Bells Bakery

Dear Ms. Sandoval,

Your deposit reached us in time, so your priority as a returning exhibitor stands.

Stand 42 is a corner stand, and corner stands do not come with a demo kitchen — that is only on our largest type. Stand 42 also cannot be enlarged, because the walkway behind it must stay clear.

So you have a choice: keep position 42 and demonstrate nothing, or move to stand 7, which is a feature stand near the main stage. Stand 7 has far more passing visitors, but it is not on a corner and you would be beside the live music, which some food exhibitors find loud.

Do let me know which you prefer. Electricity is added either way.

Regards,
Exhibitor Office`,
    questions: [
      {
        question: "How are stands allocated?",
        choices: {
          A: "By the order deposits are received",
          B: "By the date applications are sent",
          C: "By the size of the exhibitor",
          D: "By a draw held in early June",
        },
        answer: "A",
        explanation_zh:
          "細節題：資訊表明說 allocated in the order that deposits are received, not in the order that applications arrive，故選 (A)。(B) 正是文中特別排除的做法。",
        skill_tag: "reading_detail",
      },
      {
        question: "What would Two Bells Bakery pay for stand 7, including electricity?",
        choices: { A: "$1,885", B: "$3,200", C: "$3,285", D: "$3,800" },
        answer: "C",
        explanation_zh:
          "跨文件計算題：stand 7 是 feature stand（$3,200），電費每攤位一律 $85，合計 $3,285，故選 (C)。(B) 是漏算電費，(A) 是誤用 corner 攤位價。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why can Ms. Sandoval not demonstrate on stand 42?",
        choices: {
          A: "Corner stands have no demo kitchen.",
          B: "Her deposit arrived after the cut-off.",
          C: "The stand was taken by someone else.",
          D: "Demonstrations are banned at the fair.",
        },
        answer: "A",
        explanation_zh:
          "跨文件細節題：只有 Feature 型攤位附 demo kitchen，42 號是 corner，故選 (A)。(B) 與 Your deposit reached us in time 矛盾，是最大陷阱。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is mentioned as a drawback of stand 7?",
        choices: {
          A: "It costs more to light.",
          B: "It is far from the entrance.",
          C: "It is next to loud music.",
          D: "It has no counter space.",
        },
        answer: "C",
        explanation_zh:
          "細節題：對方說 you would be beside the live music, which some food exhibitors find loud，故選 (C)。(B) 錯在 stand 7 靠近主舞台且人流更多。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is Ms. Sandoval asked to do?",
        choices: {
          A: "Pay the balance immediately",
          B: "Choose between two stands",
          C: "Submit a new application form",
          D: "Confirm her electricity usage",
        },
        answer: "B",
        explanation_zh:
          "細節題：信末說 Do let me know which you prefer，要她在 42 號與 7 號之間選一個，故選 (B)。(D) 電費是固定加收，不需確認用量。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "13",
    difficulty: "B2",
    vocabulary: ["eligibility", "matched funding", "disburse", "milestone", "assessment panel"],
    passage: `Text 1 — Guidelines

Vellacott Community Fund — Round 12 Guidelines

Grants of $5,000 to $20,000 are available to non-profit organisations working in the Vellacott district.

Eligibility
  • The organisation must have been registered for at least two years.
  • Annual income must be below $250,000.
  • Applicants must show matched funding of at least 25% of the amount requested.

Awards are paid in two instalments: 70% on signature of the agreement and 30% once the mid-project report has been accepted.

Applications close on 15 January. The panel meets in February and decisions are sent by the end of that month.

Text 2 — Application extract

Organisation: Riverbank Youth Workshop
Registered: March 2021
Annual income (last financial year): $186,400
Amount requested: $16,000
Matched funding secured: $3,600 (local business sponsorship)

Project summary: A twelve-month programme of after-school engineering clubs for students aged 11 to 14, running in three schools in the north of the district. Funds would cover a part-time coordinator, materials, and transport between sites.

Text 3 — Letter

Riverbank Youth Workshop
14 March

Dear Ms. Oduya,

Thank you for your application to Round 12 of the Vellacott Community Fund.

The panel was enthusiastic about the programme itself, and in particular about the decision to work across three schools rather than concentrating on one. Your organisation meets our registration and income conditions without difficulty.

We were not able to make an award in this round for one reason only: the matched funding you evidenced falls short of the level our guidelines require. Had that figure been met, the panel indicated it would have funded the request in full.

Round 13 opens on 1 July. We would welcome a resubmission, and I am happy to look over your funding evidence informally before you send it.

Yours sincerely,
Nathaniel Bree
Fund Administrator`,
    questions: [
      {
        question: "What is one condition of eligibility?",
        choices: {
          A: "Annual income under $250,000",
          B: "At least five years of activity",
          C: "A minimum of ten paid staff",
          D: "A base outside the district",
        },
        answer: "A",
        explanation_zh:
          "細節題：指引列出年收入須低於 $250,000，故選 (A)。(B) 註冊年限要求是兩年不是五年；(D) 剛好相反，必須在 Vellacott 區內服務。",
        skill_tag: "reading_detail",
      },
      {
        question: "How much matched funding did the application need to show?",
        choices: { A: "$3,600", B: "$4,000", C: "$5,000", D: "$16,000" },
        answer: "B",
        explanation_zh:
          "跨文件計算題：配合款須達申請金額的 25%，申請 $16,000 × 25% = $4,000，故選 (B)。(A) 是實際只湊到的金額，正是不足之處。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why was the application unsuccessful?",
        choices: {
          A: "It arrived after the closing date.",
          B: "The organisation is too new.",
          C: "The matched funding was too low.",
          D: "The income figure was too high.",
        },
        answer: "C",
        explanation_zh:
          "跨文件推論題：信中明說唯一原因是配合款未達標準（$3,600 < $4,000），故選 (C)。(B)(D) 都被信中「meets our registration and income conditions」直接排除。",
        skill_tag: "reading_inference",
      },
      {
        question: "What did the panel particularly like?",
        choices: {
          A: "The low cost of the materials",
          B: "The work across three schools",
          C: "The experience of the coordinator",
          D: "The length of the programme",
        },
        answer: "B",
        explanation_zh:
          "細節題：信中說 in particular about the decision to work across three schools rather than concentrating on one，故選 (B)。",
        skill_tag: "reading_detail",
      },
      {
        question: "What does Mr. Bree offer to do?",
        choices: {
          A: "Review the evidence informally",
          B: "Extend the current deadline",
          C: "Award a smaller grant instead",
          D: "Introduce a new sponsor",
        },
        answer: "A",
        explanation_zh:
          "細節題：他說 I am happy to look over your funding evidence informally before you send it，故選 (A)。(C) 本輪完全沒有核給任何金額。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "14",
    difficulty: "B1",
    vocabulary: ["service contract", "call-out", "parts and labour", "expire", "response time"],
    passage: `Text 1 — Contract summary

GRENDON REFRIGERATION — Service Plans

  Plan       Annual fee   Response time   Parts    Labour
  Basic         $480        3 working days   charged  charged
  Standard      $760        next working day charged  included
  Premium     $1,240        same day         included included

All plans include two scheduled inspections per year. Call-outs outside plan hours (18:00–08:00 and weekends) carry a $95 supplement on the Basic and Standard plans only.

Plans run for twelve months from the start date and must be renewed before they expire; there is no automatic renewal.

Text 2 — Service report

GRENDON REFRIGERATION — Visit report 7719
Customer: Halewood Farm Shop
Date: 9 August, 20:15
Engineer: R. Vasquez

Fault reported: Walk-in chiller not holding temperature.
Found: Condenser fan motor failed.
Action: Motor replaced from van stock. Chiller returned to 3°C before departure.
Parts: Fan motor $210
Labour: 1.5 hours

Customer plan on file: Standard (start date 1 September last year)

Text 3 — E-mail

To: accounts@grendonrefrig.example
From: p.iqbal@halewoodfarmshop.example
Date: 15 August
Subject: Visit 7719 — charges

Hello,

I have the bill for the 9 August call-out and want to check it before I pay.

We are on the Standard plan, which I understood covers labour. The bill shows the fan motor, no labour, and a supplement. I assume the supplement is because the engineer came out in the evening.

The bigger question is renewal. Our plan started on 1 September last year, so I think we are close to the end of it. Nobody has contacted us. Could you confirm the position and tell me what a move to Premium would cost?

Regards,
Priya Iqbal`,
    questions: [
      {
        question: "What does the Standard plan include?",
        choices: {
          A: "Parts at no additional cost",
          B: "Labour at no additional cost",
          C: "Same-day response to faults",
          D: "Unlimited weekend call-outs",
        },
        answer: "B",
        explanation_zh:
          "細節題：方案表中 Standard 的 Labour 欄是 included，Parts 欄是 charged，故選 (B)。(C) 當日到場是 Premium 才有；(A) 零件仍要收費。",
        skill_tag: "reading_detail",
      },
      {
        question: "Why was a supplement added to the Halewood Farm Shop bill?",
        choices: {
          A: "The visit was outside plan hours.",
          B: "The part was not held in stock.",
          C: "The plan had already expired.",
          D: "The engineer stayed over an hour.",
        },
        answer: "A",
        explanation_zh:
          "跨文件推論題：合約說 18:00–08:00 與週末出勤加收 $95，維修報告記錄時間是 20:15，故選 (A)。(B) 報告寫 replaced from van stock，車上就有零件。",
        skill_tag: "reading_inference",
      },
      {
        question: "When does Halewood Farm Shop's plan end?",
        choices: {
          A: "At the end of August",
          B: "At the end of September",
          C: "On the first of September",
          D: "On the ninth of August",
        },
        answer: "C",
        explanation_zh:
          "跨文件計算題：方案自去年 9/1 起算十二個月，到今年 9/1 期滿，故選 (C)。合約也強調沒有自動續約，所以 Iqbal 的擔心是合理的。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is Ms. Iqbal concerned about?",
        choices: {
          A: "That the repair was not completed",
          B: "That nobody contacted her about renewal",
          C: "That the engineer arrived too late",
          D: "That the wrong part was fitted",
        },
        answer: "B",
        explanation_zh:
          "細節題：她說 The bigger question is renewal...Nobody has contacted us，故選 (B)。(A) 報告顯示冷藏庫已恢復到 3°C，維修是完成的。",
        skill_tag: "reading_detail",
      },
      {
        question: "What extra would Halewood Farm Shop pay each year to move to Premium?",
        choices: { A: "$480", B: "$760", C: "$1,240", D: "$1,720" },
        answer: "A",
        explanation_zh:
          "跨文件計算題：目前是 Standard（$760），Premium 是 $1,240，差額 1,240 − 760 = $480，故選 (A)。(C) 是 Premium 的全額而非差額，這是最大陷阱。",
        skill_tag: "reading_detail",
      },
    ],
  },
  {
    id: "15",
    difficulty: "B2",
    vocabulary: ["lease", "square metre", "fit-out", "break clause", "service charge"],
    passage: `Text 1 — Listing

AVAILABLE TO LET — Office suites, Kestrel House

  Suite   Floor    Area      Rent per year   Service charge
  2A      Second   140 m²      $42,000          $5,600
  3B      Third    210 m²      $61,000          $8,400
  4C      Fourth   210 m²      $67,000          $8,400
  5A      Fifth    285 m²      $88,000         $11,400

All suites are let unfurnished. Suites on the fourth floor and above have air conditioning and access to the roof terrace.

Standard lease term is five years with a break clause at the end of year three. Landlord contribution to fit-out is available on leases of five years, up to $200 per square metre.

Text 2 — E-mail

To: lettings@kestrelhouse.example
From: d.achterberg@northlight-design.example
Date: 11 September
Subject: Suite enquiry

Hello,

Northlight Design is moving from a 150 m² office and we need more room — around 200 m² would suit us. Our studio work means natural light matters more to us than anything else, and our team has asked repeatedly for outdoor space at lunchtime.

We would sign a five-year term. Could you tell me which suite you would recommend and what help there is with fitting out?

Regards,
Dieter Achterberg

Text 3 — E-mail

To: d.achterberg@northlight-design.example
From: lettings@kestrelhouse.example
Date: 12 September
Subject: RE: Suite enquiry

Dear Mr. Achterberg,

Two suites match your area requirement exactly, and they are the same size as each other. The cheaper of the two is on the third floor; the other is one floor up.

Given what you say about your team, I would point you to the higher of the two. The third floor has neither air conditioning nor terrace access, and the fourth floor has both. The difference in rent between them is modest set against that.

On fit-out: because you are taking the full five years, the landlord contribution applies. For a suite of that size the ceiling works out at $42,000.

I can arrange a viewing on either floor this week.

Regards,
Lettings, Kestrel House`,
    questions: [
      {
        question: "Which suite does the lettings office recommend?",
        choices: { A: "Suite 2A", B: "Suite 3B", C: "Suite 4C", D: "Suite 5A" },
        answer: "C",
        explanation_zh:
          "跨文件推論題：符合 200 m² 需求的是 3B 與 4C（皆 210 m²），對方建議樓層較高的那間，也就是有空調與屋頂平台的 4C，故選 (C)。(B) 是被排除的較便宜選項。",
        skill_tag: "reading_inference",
      },
      {
        question: "Why is the third-floor suite not recommended?",
        choices: {
          A: "It is smaller than required.",
          B: "It lacks terrace access.",
          C: "It is already under offer.",
          D: "It costs more to rent.",
        },
        answer: "B",
        explanation_zh:
          "跨文件細節題：列表註明四樓以上才有空調與屋頂平台，而 Achterberg 特別強調團隊想要戶外空間，故選 (B)。(D) 三樓其實比較便宜。",
        skill_tag: "reading_detail",
      },
      {
        question: "What is the total annual cost of the recommended suite?",
        choices: { A: "$61,000", B: "$67,000", C: "$69,400", D: "$75,400" },
        answer: "D",
        explanation_zh:
          "跨文件計算題：4C 年租 $67,000 加管理費 $8,400，合計 $75,400，故選 (D)。(B) 是漏算管理費，(C) 是把 3B 的租金配上 4C 的管理費。",
        skill_tag: "reading_detail",
      },
      {
        question: "How is the fit-out contribution calculated?",
        choices: {
          A: "As a fixed sum for every tenant",
          B: "As a percentage of the annual rent",
          C: "At a set rate per square metre",
          D: "According to the length of the lease",
        },
        answer: "C",
        explanation_zh:
          "細節題：列表寫 up to $200 per square metre；210 m² × $200 = $42,000，與 Text 3 的數字吻合，故選 (C)。租期長短只決定「有沒有資格」，不決定金額計算方式。",
        skill_tag: "reading_detail",
      },
      {
        question: "What does the lettings office offer to do?",
        choices: {
          A: "Arrange a viewing this week",
          B: "Reduce the service charge",
          C: "Shorten the lease to three years",
          D: "Furnish the suite before entry",
        },
        answer: "A",
        explanation_zh:
          "細節題：信末說 I can arrange a viewing on either floor this week，故選 (A)。(D) 列表明說 All suites are let unfurnished。",
        skill_tag: "reading_detail",
      },
    ],
  },
];

/**
 * Answer-position balancing.
 *
 * Written by a human (or a model) the keys come out lopsided — the first draft
 * of these sets was 35% A, 43% B, 21% C and a single D across 75 questions.
 * A skewed key distribution lets a student score above chance by always
 * picking one letter, which is the same defect `checkAnswerBalance` guards
 * against in the integrity report.
 *
 * Rather than hand-shuffling 75 items (and getting the explanations' letter
 * references wrong), each question is moved to a target letter by swapping the
 * key with whatever sits in the target slot. The option TEXT is untouched, so
 * the correct answer stays correct and option lengths are unaffected; only the
 * letter changes, and the `(X)` references in the Chinese explanation are
 * remapped by the same swap.
 *
 * Questions whose options are an ordered series (money, dates, sizes) are
 * exempt — see ORDERED_CHOICE_IDS — and the remaining questions absorb the
 * imbalance those leave behind. Fully deterministic: same input, same output.
 */
const LETTERS = ["A", "B", "C", "D"] as const;

/**
 * Questions whose options form a numeric, date or size series. The real exam
 * lists those in ascending order, so reordering them would look wrong and
 * would itself become a tell. They keep whatever letter the series gives them
 * and the balancer works around them.
 */
const ORDERED_CHOICE_IDS = new Set([
  "p7-tri-01b", "p7-tri-02b", "p7-tri-03b", "p7-tri-04e", "p7-tri-05d",
  "p7-tri-06b", "p7-tri-07d", "p7-tri-08a", "p7-tri-08b", "p7-tri-09a",
  "p7-tri-09d", "p7-tri-10b", "p7-tri-11a", "p7-tri-12b", "p7-tri-13b",
  "p7-tri-14c", "p7-tri-14e", "p7-tri-15a", "p7-tri-15c",
]);

/**
 * Deal target letters to the freely-reorderable questions so the whole batch
 * ends up even once the fixed-order questions above are counted. Deterministic:
 * always take the letter with the largest remaining need, which spreads the
 * letters instead of clustering them.
 */
function dealTargets(freeCount: number, fixed: Record<Choice, number>): Choice[] {
  const total = freeCount + LETTERS.reduce((sum, l) => sum + fixed[l], 0);
  const need: Record<Choice, number> = { A: 0, B: 0, C: 0, D: 0 };
  LETTERS.forEach((letter, i) => {
    const ideal = Math.floor(total / 4) + (i < total % 4 ? 1 : 0);
    need[letter] = Math.max(0, ideal - fixed[letter]);
  });
  // Clamping at zero can leave the needs short of or over the free slots;
  // reconcile on whichever letter is furthest from its share.
  let slack = freeCount - LETTERS.reduce((sum, l) => sum + need[l], 0);
  while (slack !== 0) {
    const letter = LETTERS.reduce((a, b) =>
      slack > 0 ? (need[a] <= need[b] ? a : b) : need[a] >= need[b] ? a : b,
    );
    need[letter] += slack > 0 ? 1 : -1;
    slack += slack > 0 ? -1 : 1;
  }

  const out: Choice[] = [];
  while (out.length < freeCount) {
    const available = LETTERS.filter((l) => need[l] > 0);
    let letter = available.reduce((a, b) => (need[a] >= need[b] ? a : b));
    // Never three of the same letter in a row — that reads as a pattern too.
    const tail = out.slice(-2);
    if (tail.length === 2 && tail[0] === letter && tail[1] === letter) {
      letter = available.find((l) => l !== letter) ?? letter;
    }
    need[letter]--;
    out.push(letter);
  }
  return out;
}

function moveAnswerTo(
  choices: { A: string; B: string; C: string; D: string },
  answer: Choice,
  explanation: string,
  target: Choice,
): { choices: { A: string; B: string; C: string; D: string }; answer: Choice; explanation: string } {
  if (target === answer) return { choices, answer, explanation };
  const next = { ...choices };
  next[answer] = choices[target];
  next[target] = choices[answer];
  // Swap the two letters wherever the explanation cites an option. Done in one
  // pass via a placeholder so A→B does not immediately get flipped back by B→A.
  const swapped = explanation
    .split(`(${answer})`)
    .join(" ")
    .split(`(${target})`)
    .join(`(${answer})`)
    .split(" ")
    .join(`(${target})`);
  return { choices: next, answer: target, explanation: swapped };
}

function expand(sets: SetSpec[]): Question[] {
  const flat = sets.flatMap((set) =>
    set.questions.map((q, index) => ({ set, q, index, id: `p7-tri-${set.id}${"abcde"[index]}` })),
  );

  const fixed: Record<Choice, number> = { A: 0, B: 0, C: 0, D: 0 };
  let freeCount = 0;
  for (const item of flat) {
    if (ORDERED_CHOICE_IDS.has(item.id)) fixed[item.q.answer]++;
    else freeCount++;
  }
  const targets = dealTargets(freeCount, fixed);

  let nextTarget = 0;
  return flat.map(({ set, q, index, id }) => {
    const balanced = ORDERED_CHOICE_IDS.has(id)
      ? { choices: q.choices, answer: q.answer, explanation: q.explanation_zh }
      : moveAnswerTo(q.choices, q.answer, q.explanation_zh, targets[nextTarget++]);
    return {
      id,
      part: "Part 7",
      question: q.question,
      choices: balanced.choices,
      answer: balanced.answer,
      explanation_zh: balanced.explanation,
      skill_tag: q.skill_tag,
      difficulty: set.difficulty,
      vocabulary: set.vocabulary,
      passage: set.passage,
      passage_group_id: `p7-tri-set-${set.id}`,
      passage_group_type: "triple",
      question_order: index + 1,
    } satisfies Question;
  });
}

export const QUESTIONS_PART7_TRIPLE: Question[] = expand(SETS);
