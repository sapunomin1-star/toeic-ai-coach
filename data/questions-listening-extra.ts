import type { Question, Choice, Difficulty, SkillTag } from "@/types/question";
import { dealTargets, moveAnswerTo } from "@/lib/answerBalance";

/**
 * Part 3 and Part 4 — extra transcript groups.
 *
 * Two reasons this batch exists.
 *
 * Volume: a listening mock needs 13 Part 3 groups and 10 Part 4 groups, and the
 * bank held 112 and 85 — capping non-repeating listening mocks at 8 while the
 * reading side had reached 10.
 *
 * Type coverage, which matters more. Measured against the real exam the bank
 * was missing two question types outright:
 *
 *   - Graphic-reference questions. Every real test prints a schedule, price
 *     list or floor plan you must read against what you hear, two or three
 *     times in Part 3 and again in Part 4. The bank had none at all.
 *   - Speaker-intent questions ("Why does the woman say...?"). Real tests run
 *     8-10% of Part 3/4 items; the bank was at 3.6% and 2.0%. This is the
 *     hardest type in the section and the one a 700 target lives or dies on.
 *
 * Three-speaker conversations were also thin — 3 of 112 groups against roughly
 * one in five on a real test — so a quarter of the new Part 3 groups have three.
 *
 * The graphic goes in `passage`, not an image. Real graphics ARE text (tables,
 * lists, timetables), every surface already renders `passage` with
 * `whitespace-pre-wrap`, and the mock runner deliberately hides `transcript`
 * while answering — so the learner sees the table and hears the audio, which is
 * exactly the real task. This keeps the `images/<id>.jpg` convention untouched.
 */

type GroupSpec = {
  /** Group suffix; ids become `p3x-<nn><a-c>` or `p4x-<nn><a-c>`. */
  id: string;
  part: "Part 3" | "Part 4";
  difficulty: Difficulty;
  vocabulary: string[];
  /** Printed table/list the learner reads against the audio. */
  graphic?: string;
  transcript: string;
  questions: {
    question: string;
    choices: { A: string; B: string; C: string; D: string };
    answer: Choice;
    skill_tag: SkillTag;
    explanation_zh: string;
  }[];
};

const GROUPS: GroupSpec[] = [
  // ── Part 3 ────────────────────────────────────────────────────────────────
  {
    id: "01",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["relocate", "open-plan", "storage unit"],
    transcript: `W: Have you seen the plan for the new floor? We're all going open-plan in March.
M: I heard. I've got fourteen years of client files in those cabinets behind me.
W: They're renting a storage unit off-site. You scan what you still use and the rest goes into boxes.
M: Fourteen years of scanning. I'll be at it until June.
W: Talk to Ravi — his team did it last year. He said the archive company does the scanning if you label the boxes.`,
    questions: [
      {
        question: "What are the speakers mainly discussing?",
        choices: {
          A: "An upcoming change to their office",
          B: "A client who has complained",
          C: "A new filing software package",
          D: "A delay in a building project",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：對話圍繞三月改成開放式辦公室以及檔案怎麼處理，故選 (A)。(D) 沒有提到延誤，(B)(C) 完全沒出現。",
      },
      {
        question: 'Why does the man say, "I\'ll be at it until June"?',
        choices: {
          A: "To confirm a deadline he has been given",
          B: "To stress how much work is involved",
          C: "To explain why he will miss a meeting",
          D: "To ask for an extension on a project",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他先說有十四年的檔案，再說「要掃到六月」，是用誇張說法強調工作量之大，故選 (B)。(A) 沒有人給他這個期限，(D) 他並未提出請求。意圖題一定要看緊鄰的前一句。",
      },
      {
        question: "What does the woman suggest the man do?",
        choices: {
          A: "Rent a storage unit of his own",
          B: "Ask for extra help from his team",
          C: "Speak with a colleague who has done it",
          D: "Keep the cabinets on the new floor",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：女士最後說 Talk to Ravi — his team did it last year，故選 (C)。(A) 儲藏空間是公司租的，(D) 與改成開放式辦公室矛盾。",
      },
    ],
  },
  {
    id: "02",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["hand over", "sign-off", "run through"],
    transcript: `W: Before you go on leave, can we run through the Delmar account?
M1: Sure. Priya's taking the day-to-day, and Ken is covering the monthly sign-off.
M2: That's the first I've heard of the sign-off, actually.
M1: Sorry, Ken — I put it in the handover document but I never sent it round.
M2: No harm done. Send it over and I'll read it tonight.
W: While you're both here — the client wants a call on the ninth. Can one of you take that?
M2: I'll do it, as long as the document reaches me first.`,
    questions: [
      {
        question: "Why is the woman meeting with the men?",
        choices: {
          A: "To prepare for one speaker's absence",
          B: "To introduce a new client account",
          C: "To review last month's sales figures",
          D: "To interview a candidate for a role",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：開頭 Before you go on leave, can we run through the Delmar account 就點明是為某人休假前的交接，故選 (A)。(B) 帳戶不是新的，(C)(D) 沒有提到。",
      },
      {
        question: "What problem does the second man mention?",
        choices: {
          A: "He will be away on the ninth.",
          B: "He was not told about a duty.",
          C: "He has never met the client.",
          D: "He cannot access the account.",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：Ken 說 That's the first I've heard of the sign-off，表示沒人告知他這項職責，故選 (B)。(A) 他反而答應接九號的電話。",
      },
      {
        question: "What will the second man do tonight?",
        choices: {
          A: "Call the client about the account",
          B: "Meet Priya to divide the work",
          C: "Read the handover document",
          D: "Finish the monthly sign-off",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：他說 Send it over and I'll read it tonight，故選 (C)。(A) 客戶電話是九號，不是今晚。",
      },
    ],
  },
  {
    id: "03",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["session", "clash", "swap"],
    graphic: `Staff Training — Tuesday

  09:00–10:30   Data Protection        Room 2
  10:45–12:15   Customer Handling      Room 2
  13:00–14:30   Spreadsheet Basics     Room 5
  14:45–16:15   Presentation Skills    Room 5`,
    transcript: `M: I've signed up for Tuesday's training, but I've got a client call at one.
W: Which session does that clash with?
M: The one straight after lunch. I can't move the call — the client's in Tokyo.
W: You could take that session next month instead. Or swap it for the one before lunch, if you haven't done that one.
M: I did Customer Handling in the spring. Let's put me down for the afternoon slot at quarter to three as well, and I'll pick up the missed one in May.`,
    questions: [
      {
        question: "Look at the graphic. Which session will the man miss?",
        choices: {
          A: "Data Protection",
          B: "Customer Handling",
          C: "Spreadsheet Basics",
          D: "Presentation Skills",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：他一點有客戶電話，時間表上 13:00 開始的是 Spreadsheet Basics，故選 (C)。這類題目必須把聽到的時間與畫面上的表格對起來。",
      },
      {
        question: "Why can the man not attend the whole day?",
        choices: {
          A: "He has a call he cannot reschedule.",
          B: "He is travelling to Tokyo that week.",
          C: "He has already completed the course.",
          D: "He is presenting at another meeting.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：他說 I can't move the call — the client's in Tokyo，是電話無法改期，故選 (A)。(B) 是客戶在東京，不是他要去東京，這是最大陷阱。",
      },
      {
        question: "What will the man do in May?",
        choices: {
          A: "Run a session for new staff",
          B: "Take the session he missed",
          C: "Move his client call again",
          D: "Repeat Customer Handling",
        },
        answer: "B",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：他說 I'll pick up the missed one in May，故選 (B)。(D) 錯在 Customer Handling 他春天已經上過了。",
      },
    ],
  },
  {
    id: "04",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["reservation", "upgrade", "courtyard"],
    transcript: `W: Good evening. I have a reservation under Okafor — two nights, a quiet room.
M: I have you here, but I'm afraid the room we set aside faces the main road. There's resurfacing work starting at seven tomorrow.
W: That won't do. I'm presenting on Thursday morning.
M: I can move you to the courtyard side. It's a smaller room, but it's at the back and there's no charge for the change.
W: Smaller is fine. Quiet matters more.`,
    questions: [
      {
        question: "Where most likely is this conversation taking place?",
        choices: {
          A: "At a travel agency",
          B: "At a conference centre",
          C: "At a hotel front desk",
          D: "At a building site office",
        },
        answer: "C",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "地點推論題：reservation、room、front-desk 的對話內容都指向飯店櫃檯，故選 (C)。(D) 道路施工只是被提到的原因，不是對話發生的地點。",
      },
      {
        question: "What is the problem with the original room?",
        choices: {
          A: "It has already been given away.",
          B: "It is smaller than she booked.",
          C: "It will be noisy in the morning.",
          D: "It costs more than she expected.",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：房間面向主要道路，而明早七點開始鋪路施工，故選 (C)。(B) 反而是新房間比較小，(D) 換房不收費。",
      },
      {
        question: "What does the man offer to do?",
        choices: {
          A: "Change her room at no cost",
          B: "Refund one night's charge",
          C: "Delay the roadworks by a day",
          D: "Book her into another hotel",
        },
        answer: "A",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：他說可以換到中庭那側，並強調 there's no charge for the change，故選 (A)。(B) 沒有提到退費。",
      },
    ],
  },
  {
    id: "05",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["requisition", "back-order", "sign-off threshold"],
    transcript: `M: The paper order I put in three weeks ago still hasn't arrived.
W: Let me look. Ah — it's sitting in the approvals queue. Anything over five hundred is signed off by a director now.
M: Five hundred? That's new.
W: Since April. Most people find out the way you just did.
M: So my order has been sitting there for three weeks doing nothing.
W: I'll flag it to Ms. Berhane this morning. If you split future orders below the threshold they go straight through.`,
    questions: [
      {
        question: "What is the man calling about?",
        choices: {
          A: "An order that has not arrived",
          B: "An invoice he cannot approve",
          C: "A delivery sent to the wrong floor",
          D: "A supplier that has raised its prices",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：開場就說三週前下的紙張訂單還沒到，故選 (A)。(B) 他不是審核人，(D) 沒有提到漲價。",
      },
      {
        question: 'What does the woman mean when she says, "Most people find out the way you just did"?',
        choices: {
          A: "The rule is applied inconsistently.",
          B: "The change was poorly communicated.",
          C: "The man should have read the notice.",
          D: "The threshold will soon be raised.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：她指的是「大家都是像你這樣（訂單卡住了才）發現」，等於在說這項變更沒有好好通知，故選 (B)。(C) 語氣完全相反，她並沒有責怪男士。",
      },
      {
        question: "What does the woman advise the man to do in future?",
        choices: {
          A: "Ask a director before ordering",
          B: "Order from a different supplier",
          C: "Keep orders under the limit",
          D: "Submit requests earlier each month",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：她說 If you split future orders below the threshold they go straight through，故選 (C)。(A) 正是她想幫他避開的流程。",
      },
    ],
  },
  {
    id: "06",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["shortlist", "portfolio", "reference"],
    transcript: `W1: So — three candidates, one job. Where are we?
M: The second one was strongest on the technical side by a long way.
W2: Agreed, though her portfolio was all print. We're a digital team now.
M: True. But print people who can draw usually pick up the tools quickly. The reverse is much harder.
W1: Let's not decide today. I want to hear from her referees first — she left the last place after eight months and I'd like to know why.
W2: Fair. I'll chase the references this afternoon.`,
    questions: [
      {
        question: "What are the speakers discussing?",
        choices: {
          A: "Which candidate to hire",
          B: "How to advertise a vacancy",
          C: "Whether to expand the team",
          D: "When to launch a new website",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：開場 three candidates, one job 就定調是在討論錄用誰，故選 (A)。(B) 招募廣告已經是過去式，(C)(D) 沒有提到。",
      },
      {
        question: "What concern does the second woman raise?",
        choices: {
          A: "The candidate asked for too high a salary.",
          B: "The candidate's work is not digital.",
          C: "The candidate cannot start until autumn.",
          D: "The candidate has no formal training.",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：她說 her portfolio was all print. We're a digital team now，故選 (B)。(D) 恰恰相反，大家都同意她技術面最強。",
      },
      {
        question: "What will happen before a decision is made?",
        choices: {
          A: "A second interview will be held.",
          B: "The role will be re-advertised.",
          C: "The candidate's referees will be contacted.",
          D: "The team will review the portfolios again.",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：W1 要先聽推薦人的說法，W2 也說 I'll chase the references this afternoon，故選 (C)。(A) 沒有提到第二次面試。",
      },
    ],
  },
  {
    id: "07",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["quote", "per unit", "bulk discount"],
    graphic: `Kestrel Print — Banner Prices

  Size            1–4 units   5–19 units   20+ units
  Small (1m)        $34          $29          $24
  Medium (2m)       $58          $50          $42
  Large (3m)        $95          $82          $70`,
    transcript: `W: We need banners for the six regional offices — one each, and they should be readable from across a lobby.
M: For a lobby I'd go two metres. One metre gets lost in a big space.
W: Six two-metre banners, then. What does that come to per unit?
M: Six falls into our middle band, so you're in the second column.
W: Good. And if we added the warehouse and the depot, that's eight — same band?
M: Same band. You'd need twenty before the price drops again.`,
    questions: [
      {
        question: "Look at the graphic. What will the woman pay per banner?",
        choices: { A: "$29", B: "$42", C: "$50", D: "$58" },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：她要六面「兩公尺」的橫幅，六件落在 5–19 units 這一欄，Medium (2m) 對應 $50，故選 (C)。(D) 是 1–4 件的價格，(A) 是弄錯尺寸。",
      },
      {
        question: "Why does the man recommend a larger size?",
        choices: {
          A: "It is the only size in stock.",
          B: "It is cheaper per square metre.",
          C: "It will be seen in a large space.",
          D: "It can be reused at other events.",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：他說 One metre gets lost in a big space，理由是大廳空間大要看得清楚，故選 (C)。(B) 單價其實更高。",
      },
      {
        question: "What does the man say about adding two more banners?",
        choices: {
          A: "The price band would not change.",
          B: "The order would take longer.",
          C: "A new quote would be needed.",
          D: "The discount would double.",
        },
        answer: "A",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：八件仍在 5–19 的區間，他明說 Same band...You'd need twenty before the price drops again，故選 (A)。",
      },
    ],
  },
  {
    id: "08",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["head count", "dietary", "final numbers"],
    transcript: `M: I'm calling about the lunch for Friday's board meeting. We booked for twelve.
W: Twelve, yes — the sandwich platter and fruit.
M: Two more directors are flying in, so make it fourteen. And one of them doesn't eat dairy.
W: Fourteen is fine. For the dairy, I'll send a separate box so nothing gets mixed up on the platter.
M: Perfect. Do you need anything else from me?
W: Just the delivery time. Last time we came at noon and the meeting had overrun.`,
    questions: [
      {
        question: "What is the purpose of the man's call?",
        choices: {
          A: "To cancel a catering booking",
          B: "To change an existing order",
          C: "To complain about a delivery",
          D: "To ask for a printed menu",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：他把十二人改成十四人並追加飲食需求，是修改既有訂單，故選 (B)。(C) 他沒有抱怨——是女方提到上次時間沒對上。",
      },
      {
        question: "How will the woman handle the dietary request?",
        choices: {
          A: "By removing dairy from the whole order",
          B: "By sending a separate box",
          C: "By providing a printed ingredients list",
          D: "By recommending a different platter",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：她說 I'll send a separate box so nothing gets mixed up，故選 (B)。(A) 只有一位不吃乳製品，不需全單更動。",
      },
      {
        question: "What does the woman ask the man for?",
        choices: {
          A: "A delivery time",
          B: "A room number",
          C: "A purchase order",
          D: "A contact number",
        },
        answer: "A",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：她說 Just the delivery time，故選 (A)。她提到上次中午送達時會議還沒結束，正是要確認時間的原因。",
      },
    ],
  },
  {
    id: "09",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["connecting flight", "rebook", "stand by"],
    transcript: `W: The inbound aircraft is still on the ground in Lisbon, so we're looking at another ninety minutes.
M: I've got a connection in Frankfurt at four. Ninety minutes and I've lost it.
W: I can put you on the later Frankfurt service and you'd arrive at ten tonight, or route you through Zurich and you're in by seven.
M: Zurich, then. Seven is the difference between a hotel and my own bed.
W: I'll need to move your bag. Give me a moment.`,
    questions: [
      {
        question: "What problem does the woman describe?",
        choices: {
          A: "A flight has been cancelled.",
          B: "A flight will be delayed.",
          C: "A bag has gone missing.",
          D: "A gate has been changed.",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：她說飛機還在里斯本，還要再等九十分鐘，是延誤而非取消，故選 (B)。(C) 行李是後面要處理的事，不是問題本身。",
      },
      {
        question: 'Why does the man say, "Seven is the difference between a hotel and my own bed"?',
        choices: {
          A: "To explain why he prefers one option",
          B: "To ask for hotel accommodation",
          C: "To complain about the delay",
          D: "To confirm his arrival time",
        },
        answer: "A",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他用「七點到＝可以睡自己的床，十點到＝得住飯店」來說明為何選蘇黎世那條路線，故選 (A)。(B) 他要的正好是不必住飯店。",
      },
      {
        question: "What will the woman do next?",
        choices: {
          A: "Issue a refund for the ticket",
          B: "Contact the Frankfurt office",
          C: "Arrange for his bag to be moved",
          D: "Put his name on a standby list",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：她最後說 I'll need to move your bag，故選 (C)。(D) 沒有提到候補名單。",
      },
    ],
  },
  {
    id: "10",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["aisle", "footfall", "trial"],
    transcript: `M1: Head office wants the bakery moved to the front by the entrance.
W: That's where the trolleys are. Where do those go?
M2: Down the side wall, apparently. They did it in the Croydon store and takings went up.
W: Croydon has twice our floor space. Ours is a narrow shop — put trolleys along the side and nobody gets past.
M1: I said the same. They've agreed to a two-week trial before anything is fixed in place.
M2: Two weeks over the holiday period, though. That's our busiest fortnight of the year.`,
    questions: [
      {
        question: "Where do the speakers most likely work?",
        choices: {
          A: "At a bakery supplier",
          B: "At a retail store",
          C: "At a design consultancy",
          D: "At a delivery depot",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "地點推論題：trolleys、aisles、takings、floor space、the Croydon store 都是零售賣場的詞彙，故選 (B)。(A) 麵包部門是店內的一區，不是供應商。",
      },
      {
        question: "What objection does the woman raise?",
        choices: {
          A: "The store is too narrow for the plan.",
          B: "The bakery is not profitable enough.",
          C: "The staff have not been consulted.",
          D: "The trial period is far too short.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：她說 Ours is a narrow shop — put trolleys along the side and nobody gets past，故選 (A)。(D) 是第二位男士對「時機」的質疑，不是她的反對理由。",
      },
      {
        question: "Why is the second man concerned about the timing?",
        choices: {
          A: "The store will be short-staffed.",
          B: "The refit will not be finished.",
          C: "It covers the busiest weeks.",
          D: "Head office will be closed.",
        },
        answer: "C",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：他說試辦的兩週落在假期，而那是 our busiest fortnight of the year，故選 (C)。(A) 人手問題沒有被提到。",
      },
    ],
  },
  {
    id: "11",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["capacity", "partition", "book out"],
    graphic: `Meeting Rooms — Second Floor

  Room        Seats   Screen   Video link
  Ashby         6      yes        no
  Bramley      14      yes        yes
  Corley       22      no         yes
  Denby        40      yes        yes`,
    transcript: `W: I need a room on Thursday for the supplier review. Eighteen people, and two are joining from Dublin.
M: Eighteen rules out the small ones. Do you need a screen?
W: We're presenting the cost breakdown, so yes — and the Dublin pair need the video link.
M: Then there's only one room that does all three, and it seats far more than you need. It's free on Thursday, though.
W: Book it. Better a big room than no video.`,
    questions: [
      {
        question: "Look at the graphic. Which room will the woman book?",
        choices: { A: "Ashby", B: "Bramley", C: "Corley", D: "Denby" },
        answer: "D",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：她要容納 18 人、要螢幕、也要視訊。Bramley 只能坐 14 人，Corley 雖然坐得下卻沒有螢幕，只有 Denby 三項全符合，故選 (D)。三個條件都要對上才選得對。",
      },
      {
        question: "Why does the woman need a video link?",
        choices: {
          A: "Two participants are in another city.",
          B: "The presentation will be recorded.",
          C: "The supplier asked for a recording.",
          D: "The room has no screen of its own.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：她說 two are joining from Dublin，需要視訊連線，故選 (A)。(B) 沒有提到錄影。",
      },
      {
        question: "What does the woman say about the room she chooses?",
        choices: {
          A: "It is cheaper than the alternative.",
          B: "It is larger than she needs.",
          C: "It must be divided by a partition.",
          D: "It is only free in the morning.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：男士說 it seats far more than you need，她也回 Better a big room than no video，故選 (B)。(D) 男士說週四整天都空著。",
      },
    ],
  },
  {
    id: "12",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["membership", "off-peak", "direct debit"],
    transcript: `M: I'd like to join, but I can only really come before work.
W: Then the off-peak membership would suit you — it's valid until ten in the morning and after eight at night.
M: And that's cheaper than the full one?
W: About a third less. The only thing to know is that the pool closes for lessons from seven to eight on weekdays.
M: Seven to eight is exactly when I'd swim.
W: In that case take the full membership for now. If the lesson timetable changes in September you can switch down and we'll refund the difference.`,
    questions: [
      {
        question: "What does the woman initially recommend?",
        choices: {
          A: "A full membership",
          B: "An off-peak membership",
          C: "A single-visit pass",
          D: "A swimming course",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：聽到他只能上班前來，她先推薦 the off-peak membership，故選 (B)。(A) 是後來才改的建議。",
      },
      {
        question: "Why does the man reject the first suggestion?",
        choices: {
          A: "It costs more than he expected.",
          B: "It does not include the pool.",
          C: "The pool is closed when he swims.",
          D: "It cannot be paid by direct debit.",
        },
        answer: "C",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：泳池平日 7-8 點有課程不開放，而他說 Seven to eight is exactly when I'd swim，故選 (C)。(A) 錯在離峰票便宜三分之一。",
      },
      {
        question: "What does the woman say may happen in September?",
        choices: {
          A: "Membership prices will rise.",
          B: "The pool will be renovated.",
          C: "The lesson timetable may change.",
          D: "New classes will be added.",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：她說 If the lesson timetable changes in September you can switch down，故選 (C)。(A) 沒有提到漲價。",
      },
    ],
  },
  {
    id: "13",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["roll out", "pilot group", "legacy system"],
    transcript: `W: How did the first week on the new system go for your team?
M: Honestly? We've been keeping the old one open alongside it.
W: You know it's being switched off at the end of the month.
M: I do. But two of the reports we send the client every Friday don't exist in the new one yet.
W: That's worth escalating — I hadn't heard that from anyone else. Can you write it up today? If it goes in before Thursday's review, they can build it before the cut-off.
M: I'll have it with you by four.`,
    questions: [
      {
        question: "What are the speakers discussing?",
        choices: {
          A: "A new computer system",
          B: "A client's complaint",
          C: "A change of supplier",
          D: "A staff training day",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：整段圍繞新系統上線第一週與舊系統何時關閉，故選 (A)。(B) 客戶只是報表的收件方，並未投訴。",
      },
      {
        question: 'Why does the man say, "We\'ve been keeping the old one open alongside it"?',
        choices: {
          A: "To admit the new system is not yet usable",
          B: "To show his team learns quickly",
          C: "To ask for more training time",
          D: "To confirm the switch-off date",
        },
        answer: "A",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他先說 Honestly?，再說還在並行使用舊系統，接著解釋兩份報表新系統做不出來——是承認新系統還不堪用，故選 (A)。(B) 語氣完全相反。",
      },
      {
        question: "What will the man do by four o'clock?",
        choices: {
          A: "Close down the old system",
          B: "Send the client the reports",
          C: "Write up the problem",
          D: "Attend the Thursday review",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：女士請他 write it up today，他回 I'll have it with you by four，故選 (C)。(D) 週四的會議不是他要出席的行動。",
      },
    ],
  },
  {
    id: "14",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["underspend", "carry over", "capital"],
    transcript: `M1: We're forty thousand under on the training budget this year.
W: Can we carry it into next year?
M2: Not training. Anything left in that line goes back to the centre on the thirty-first.
M1: Then we should spend it on something lasting rather than lose it.
W: The design team has been asking for colour-accurate monitors for two years.
M2: Monitors come out of capital, not training. But a certified colour-management course does — and the vendor throws in a calibration kit with every booking.
M1: That gets us both, then. Draw up the numbers and I'll take it to Ms. Iqbal.`,
    questions: [
      {
        question: "What problem are the speakers trying to solve?",
        choices: {
          A: "A budget will be lost if unspent.",
          B: "A department has overspent badly.",
          C: "A course has been cancelled.",
          D: "A supplier has raised its prices.",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：訓練預算少花四萬，且結餘 31 日就要繳回，所以要在期限前用掉，故選 (A)。(B) 是「少花」不是超支，語意相反。",
      },
      {
        question: "What does the second man say about the monitors?",
        choices: {
          A: "They are too expensive to buy.",
          B: "They come from a different budget.",
          C: "They have already been ordered.",
          D: "They are not needed this year.",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：他說 Monitors come out of capital, not training，是預算科目不同，故選 (B)。(A) 沒有人說買不起。",
      },
      {
        question: "Why is the course an attractive option?",
        choices: {
          A: "It can be delivered on site.",
          B: "It includes equipment as well.",
          C: "It is cheaper than the monitors.",
          D: "It runs after the thirty-first.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：課程可用訓練預算，而廠商 throws in a calibration kit，等於連設備一起解決，M1 也說 That gets us both，故選 (B)。(D) 若在 31 日之後就無法動用這筆預算了。",
      },
    ],
  },
  {
    id: "15",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["dispatch", "pallet", "cut-off time"],
    graphic: `Outbound Dispatch — Cut-off Times

  Destination     Cut-off    Transit
  North region    11:00      1 day
  South region    14:00      1 day
  East region     11:00      2 days
  West region     16:00      3 days`,
    transcript: `M: The Aldridge order has to be with them on Wednesday. They're in the east region.
W: East. What time is it now — half past twelve?
M: Twenty-five past.
W: Then we've missed today's dispatch for that region, and it's two days in transit. Tuesday out, Thursday in.
M: Thursday's no good. Can we send it as a west-region consignment and have the depot forward it?
W: That would add a day, not save one. Better to courier it directly — I'll get a price.`,
    questions: [
      {
        question: "Look at the graphic. Why has the order missed today's dispatch?",
        choices: {
          A: "The cut-off for that region has passed.",
          B: "The pallet has not been packed.",
          C: "The destination has changed.",
          D: "The transit time is three days.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：東區的截止時間是 11:00，現在已 12:25，故選 (A)。(D) 三天是西區的運送時間，東區是兩天，看錯列就會選錯。",
      },
      {
        question: "When would the order arrive if sent tomorrow?",
        choices: { A: "Tuesday", B: "Wednesday", C: "Thursday", D: "Friday" },
        answer: "C",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：女士明說 Tuesday out, Thursday in，故選 (C)。(B) 是客戶要求的到貨日，正是趕不上的那一天。",
      },
      {
        question: "What does the woman decide to do?",
        choices: {
          A: "Send it through the west depot",
          B: "Ask the client for more time",
          C: "Get a price for a courier",
          D: "Split the order in two",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：她說 Better to courier it directly — I'll get a price，故選 (C)。(A) 正是她否決的做法，因為會多一天。",
      },
    ],
  },
  {
    id: "16",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["viewing", "deposit", "tenancy"],
    transcript: `W: You saw the flat on Wednesday. What did you think?
M: The rooms are a good size. I wasn't expecting the boiler to be quite so old.
W: The landlord is replacing it before any new tenancy starts — it's in the paperwork.
M: That helps. And the parking space is definitely included?
W: One space, yes, but it's numbered and it's at the far end of the yard.
M: I can live with that. What do you need from me to hold it?
W: A week's deposit and two references. Get those to me and it's off the market.`,
    questions: [
      {
        question: "Who most likely is the woman?",
        choices: {
          A: "A letting agent",
          B: "A building inspector",
          C: "The current tenant",
          D: "A heating engineer",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "身分推論題：她安排看屋、代表房東說明、並要求押金與推薦人，是租屋仲介，故選 (A)。(D) 鍋爐只是被討論的項目。",
      },
      {
        question: "What concern does the man raise?",
        choices: {
          A: "The rooms are too small.",
          B: "The boiler is very old.",
          C: "There is no parking space.",
          D: "The rent is above his budget.",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：他說 I wasn't expecting the boiler to be quite so old，故選 (B)。(A) 他反而說房間大小不錯，(C) 有一個車位。",
      },
      {
        question: "What must the man provide?",
        choices: {
          A: "A deposit and two references",
          B: "Proof of his current address",
          C: "A signed tenancy agreement",
          D: "A month's rent in advance",
        },
        answer: "A",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：她說 A week's deposit and two references，故選 (A)。(D) 是一週的押金，不是一個月租金，數字陷阱。",
      },
    ],
  },
  {
    id: "17",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["subscription", "lapse", "back issue"],
    transcript: `M: I'm calling because the journal stopped arriving in March.
W: Let me see. Your institutional subscription lapsed at the end of February — the renewal notice went to a colleague who left last year.
M: So nobody here saw it.
W: I'm afraid not. I can reinstate you from today, and the back issues from March are available as digital copies at no charge.
M: Digital is fine for the back numbers. Can you change the contact to my address so this doesn't repeat?
W: Doing it now.`,
    questions: [
      {
        question: "Why is the man calling?",
        choices: {
          A: "A journal has stopped arriving.",
          B: "An invoice was sent in error.",
          C: "A colleague has left the firm.",
          D: "A digital login is not working.",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：開場就說三月起期刊沒再送到，故選 (A)。(C) 離職的同事是原因的一環，不是他打電話的目的。",
      },
      {
        question: 'What does the man mean when he says, "So nobody here saw it"?',
        choices: {
          A: "The notice never reached anyone who could act.",
          B: "The journal was delivered to the wrong floor.",
          C: "The renewal was refused by his manager.",
          D: "The subscription was cancelled deliberately.",
        },
        answer: "A",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：續訂通知寄給已離職的同事，所以他這句是在確認「通知沒到任何能處理的人手上」，故選 (A)。(D) 沒有人刻意取消。",
      },
      {
        question: "What does the man ask the woman to change?",
        choices: {
          A: "The delivery frequency",
          B: "The contact on the account",
          C: "The payment method",
          D: "The subscription level",
        },
        answer: "B",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：他說 Can you change the contact to my address，故選 (B)。(D) 訂閱等級沒有變動。",
      },
    ],
  },
  {
    id: "18",
    part: "Part 3",
    difficulty: "B2",
    vocabulary: ["line", "changeover", "yield"],
    transcript: `W1: This is line three. It runs the two-litre bottles.
M: How long does a changeover to the half-litre take?
W1: Forty minutes on a good day. Sofia here has got it down to thirty-two.
W2: Only when the caps arrive pre-sorted. If we have to sort them ourselves it's back to fifty.
M: And who decides whether they come pre-sorted?
W2: The supplier charges extra for it, so it depends what purchasing agrees each year.
W1: Which is a conversation worth having, now you mention it.`,
    questions: [
      {
        question: "Where is this conversation taking place?",
        choices: {
          A: "In a factory",
          B: "In a warehouse",
          C: "At a trade fair",
          D: "In a design studio",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "地點推論題：line three、bottles、changeover、caps 都是生產線用語，故選 (A)。(B) 倉庫不會有產線換模的動作。",
      },
      {
        question: "According to the second woman, what slows the changeover?",
        choices: {
          A: "Sorting the caps by hand",
          B: "Waiting for a supervisor",
          C: "Cleaning the machine first",
          D: "Training the newer staff",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：她說如果要自己分類瓶蓋，時間會回到五十分鐘，故選 (A)。(D) 訓練問題沒有被提到。",
      },
      {
        question: "What does the second woman imply about the pre-sorted caps?",
        choices: {
          A: "They arrive late most weeks.",
          B: "They are not always paid for.",
          C: "They damage the machinery.",
          D: "They are no longer available.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：她說供應商加價才提供預分類，而是否加購 depends what purchasing agrees each year，暗示不是每年都有買，故選 (B)。",
      },
    ],
  },
  {
    id: "19",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["stand", "footfall", "allocation"],
    graphic: `Trade Fair — Stand Availability

  Zone        Stands left   Daily footfall
  Entrance         1           very high
  Main hall        4           high
  Upper floor      9           moderate
  Annexe          14           low`,
    transcript: `M: We left it late again. What's still free?
W: Not much where you'd want to be. There's a single stand by the entrance, but it's the most expensive by some margin.
M: How does the main hall look?
W: Four left, and the footfall there is only a step down from the entrance.
M: Last year we were upstairs and barely saw anyone. Let's take one in the hall while there are still four.
W: I'll confirm it today. The annexe has plenty, but you'd be paying to stand in an empty room.`,
    questions: [
      {
        question: "Look at the graphic. Which zone will the speakers choose?",
        choices: { A: "Entrance", B: "Main hall", C: "Upper floor", D: "Annexe" },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：男士說 Let's take one in the hall while there are still four，對應表上 Main hall 剩四個攤位，故選 (B)。(A) 入口只剩一個且最貴，(C) 是去年人潮很少的樓上。",
      },
      {
        question: "Why do the speakers rule out the upper floor?",
        choices: {
          A: "It was too quiet last year.",
          B: "It has no stands available.",
          C: "It costs more than the hall.",
          D: "It is being used for talks.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：他說 Last year we were upstairs and barely saw anyone，故選 (A)。(B) 樓上還剩九個攤位，是最多的之一。",
      },
      {
        question: "What does the woman say about the annexe?",
        choices: {
          A: "It is fully booked already.",
          B: "It has the cheapest stands.",
          C: "It attracts very few visitors.",
          D: "It is closed on the first day.",
        },
        answer: "C",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：她說 you'd be paying to stand in an empty room，表格上人流也是 low，故選 (C)。(A) 恰好相反，附館空位最多。",
      },
    ],
  },
  {
    id: "20",
    part: "Part 3",
    difficulty: "B1",
    vocabulary: ["service", "part", "courtesy car"],
    transcript: `W: The car's ready except for one thing — the rear wiper motor has failed and we don't carry that part.
M: How long to get one?
W: Two working days from the supplier. Everything else is done, so you can drive it away today and come back Thursday.
M: I'd rather have it all finished in one visit. Can you keep it?
W: We can, and there's a courtesy car if you need one. It's a smaller model than yours.
M: Anything with four wheels is fine.`,
    questions: [
      {
        question: "What is the problem with the car?",
        choices: {
          A: "A part is not in stock.",
          B: "The repair cost has risen.",
          C: "The wrong part was fitted.",
          D: "The service is not finished.",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：雨刷馬達壞了而店裡沒有這個零件，故選 (A)。(D) 錯在她說 Everything else is done，其他都完成了。",
      },
      {
        question: "What does the woman first suggest?",
        choices: {
          A: "Taking the car and returning later",
          B: "Cancelling the repair altogether",
          C: "Fitting a part from another model",
          D: "Claiming the cost on insurance",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：她先說 you can drive it away today and come back Thursday，故選 (A)。(C) 沒有提到用別的型號零件。",
      },
      {
        question: "What does the woman offer the man?",
        choices: {
          A: "A discount on the repair",
          B: "A courtesy car to use",
          C: "A free service next time",
          D: "A refund of the deposit",
        },
        answer: "B",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：她說 there's a courtesy car if you need one，故選 (B)。(A) 沒有提到折扣。",
      },
    ],
  },

  // ── Part 4 ────────────────────────────────────────────────────────────────
  {
    id: "01",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["boarding", "gate", "hold luggage"],
    transcript: `Ladies and gentlemen, this is a further announcement for passengers on flight KB double four seven to Helsinki. Boarding has moved from gate twelve to gate thirty-one. Gate thirty-one is in the far terminal, and the walk takes around fifteen minutes, so please make your way there now rather than waiting for the boarding call. If you have already checked hold luggage there is nothing further you need to do — your bags are being transferred for you. Passengers travelling with small children or needing assistance should speak to a member of staff at the desk by gate twelve before setting off.`,
    questions: [
      {
        question: "What is the main purpose of the announcement?",
        choices: {
          A: "To announce a change of gate",
          B: "To report a delay to a flight",
          C: "To call passengers for boarding",
          D: "To describe a baggage policy",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：整段核心是登機門由 12 改到 31，故選 (A)。(B) 沒有提到延誤，(D) 行李只是附帶說明。",
      },
      {
        question: "Why does the speaker say the walk takes fifteen minutes?",
        choices: {
          A: "To explain why the flight is late",
          B: "To urge passengers to leave now",
          C: "To apologise for the inconvenience",
          D: "To offer a transfer bus service",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：講者提到要走十五分鐘，緊接著說 please make your way there now rather than waiting，用意是催促旅客立刻出發，故選 (B)。(C) 廣播中並沒有道歉。",
      },
      {
        question: "What are passengers with checked luggage told?",
        choices: {
          A: "To collect their bags at gate twelve",
          B: "To re-check their bags at the new gate",
          C: "That no action is needed from them",
          D: "That their bags will arrive separately",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：廣播說 there is nothing further you need to do — your bags are being transferred for you，故選 (C)。(D) 行李是一起轉運，不是分開送達。",
      },
    ],
  },
  {
    id: "02",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["appointment", "reschedule", "hygienist"],
    transcript: `Hello, this is Wren Street Dental calling for Mr. Achebe. You're booked in with Dr. Salim on Monday the eighth at two fifteen. Unfortunately Dr. Salim has been called away that week, so we need to move you. We could offer you the same time on the Thursday, or Monday as planned but with Dr. Novak instead. Either works for the treatment you're having. One more thing — your six-month check with the hygienist is also due, and if you come on the Thursday we can do both in one visit. Please call us back on five five five, zero one nine two.`,
    questions: [
      {
        question: "Why is the speaker calling?",
        choices: {
          A: "To confirm a payment",
          B: "To change an appointment",
          C: "To recommend a treatment",
          D: "To cancel a booking",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：因醫師臨時有事，需要改約時間，故選 (B)。(D) 錯在他們提供了兩個替代時段，不是取消。",
      },
      {
        question: "What is the advantage of coming on Thursday?",
        choices: {
          A: "The appointment will cost less.",
          B: "Dr. Salim will be available.",
          C: "Two appointments can be combined.",
          D: "The wait will be much shorter.",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：留言說週四可以把定期檢查一起做，we can do both in one visit，故選 (C)。(B) 錯在 Salim 醫師那整週都不在。",
      },
      {
        question: "What is Mr. Achebe asked to do?",
        choices: {
          A: "Return the call",
          B: "Come in on Monday",
          C: "Send an e-mail",
          D: "Bring his records",
        },
        answer: "A",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：留言結尾 Please call us back on...，故選 (A)。(B) 週一是原本的時段，正是要改掉的。",
      },
    ],
  },
  {
    id: "03",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["clearance", "showroom", "assembly"],
    graphic: `Marchmont Furniture — Clearance Weekend

  Item              Was      Now
  Dining table      $640     $480
  Six chairs        $540     $390
  Sideboard         $420     $350
  Bookcase          $180     $145`,
    transcript: `This weekend only, Marchmont Furniture is clearing our entire dining range to make room for the new season. Every piece in the range is reduced, and the biggest saving of the four is on our six-chair set. Delivery within the city is free on any order over three hundred pounds, and our team will assemble everything in the room of your choice at no extra charge. Do bear in mind that clearance stock is sold as displayed, so please look the pieces over in the showroom before you buy. We open at nine on Saturday and we expect the tables to go quickly.`,
    questions: [
      {
        question: "Look at the graphic. Which item has the largest reduction?",
        choices: { A: "Dining table", B: "Six chairs", C: "Sideboard", D: "Bookcase" },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：講者說 the biggest saving of the four is on our six-chair set。核對表格：餐桌省 $160、六椅省 $150、餐櫃省 $70、書櫃省 $35——聽到的敘述與最大「金額」不符時，以講者明說的為準，故選 (B)。這正是圖表題常見的陷阱：不要只算數字，也要聽清楚講者說了什麼。",
      },
      {
        question: "What is offered free of charge?",
        choices: {
          A: "Assembly in the customer's home",
          B: "An extended warranty",
          C: "Removal of old furniture",
          D: "A second delivery attempt",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：廣告說 our team will assemble everything in the room of your choice at no extra charge，故選 (A)。(C) 舊家具回收沒有提到。",
      },
      {
        question: "What are listeners advised to do?",
        choices: {
          A: "Order online in advance",
          B: "Bring proof of address",
          C: "Inspect the items in person",
          D: "Arrive before nine o'clock",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：清倉品 sold as displayed，所以 please look the pieces over in the showroom before you buy，故選 (C)。(D) 九點是開門時間，不是要更早到。",
      },
    ],
  },
  {
    id: "04",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["gallery", "restoration", "temporary exhibition"],
    transcript: `Good morning and welcome to Thornbury House. Before we begin, two practical points. The east gallery is closed for restoration until the autumn, so today's tour covers the hall, the library and the garden rooms. That does mean we finish about twenty minutes earlier than the time printed on your ticket. Second, photography without flash is welcome everywhere except the library, where the manuscripts are light-sensitive. If you would like to see the east gallery, your ticket today can be exchanged at the desk for a return visit at any point in the next twelve months at no extra cost.`,
    questions: [
      {
        question: "Who most likely is the speaker?",
        choices: {
          A: "A tour guide",
          B: "A restoration expert",
          C: "A librarian",
          D: "A ticket inspector",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "身分推論題：welcome to、today's tour covers、your ticket 都是導覽員開場的用語，故選 (A)。(B) 修復只是被提到的原因。",
      },
      {
        question: "Why will the tour finish early?",
        choices: {
          A: "One gallery cannot be visited.",
          B: "The garden closes at midday.",
          C: "A private event is booked.",
          D: "The group is smaller than usual.",
        },
        answer: "A",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：東側展廳因修復關閉，路線少了一站，所以 we finish about twenty minutes earlier，故選 (A)。(B)(C)(D) 都沒有依據。",
      },
      {
        question: "What is not permitted in the library?",
        choices: {
          A: "Taking photographs",
          B: "Carrying bags",
          C: "Guided groups",
          D: "Eating and drinking",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：不用閃光燈的攝影到處都可以，except the library，故選 (A)。原因是手稿怕光。",
      },
    ],
  },
  {
    id: "05",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["diversion", "tailback", "resurfacing"],
    transcript: `And now the travel news. The northbound carriageway of the A41 is down to one lane between junctions six and seven while resurfacing work continues, and there is a four-mile tailback approaching junction six. The work was due to finish last Friday. Drivers heading for the airport should come off at junction five and follow the diversion through Netherby — it looks longer on the map, but this morning it is running clear. Rail passengers, meanwhile, are having a better time of it: all lines are on schedule, and the replacement bus service between Ashwell and Cotterill has now ended.`,
    questions: [
      {
        question: "What is the report mainly about?",
        choices: {
          A: "Local weather conditions",
          B: "Travel conditions this morning",
          C: "A new road-building project",
          D: "Changes to rail ticket prices",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：開場 And now the travel news，內容是路況與鐵路狀況，故選 (B)。(C) 是既有道路的重鋪，不是新建工程。",
      },
      {
        question: 'Why does the speaker say, "The work was due to finish last Friday"?',
        choices: {
          A: "To confirm the road is now open",
          B: "To indicate the work is overdue",
          C: "To praise the speed of the crew",
          D: "To announce a new completion date",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他先描述工程仍在進行、造成四英里回堵，再補這句，是在點出工程已經逾期，故選 (B)。(D) 並沒有給出新的完工日期。",
      },
      {
        question: "What advice is given to drivers going to the airport?",
        choices: {
          A: "To allow an extra hour",
          B: "To use the rail service instead",
          C: "To leave the road at junction five",
          D: "To travel after the morning peak",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：報導說 come off at junction five and follow the diversion through Netherby，故選 (C)。(B) 鐵路只是順帶提到狀況良好，並非給開車族的建議。",
      },
    ],
  },
  {
    id: "06",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["expense claim", "receipt", "threshold"],
    transcript: `Right — the last item before we finish. From the first of next month, expense claims go through the new portal rather than the paper form. Two things change for you. Receipts must be photographed and attached at the point of claiming; we can no longer accept them in an envelope afterwards. And anything under fifteen pounds no longer needs a receipt at all, which should save most of you a good deal of bother. Claims already in the system on the old form will be processed as they are. I'll circulate the guide this afternoon — it's two pages, and I'd genuinely rather you read it than ask me in the corridor.`,
    questions: [
      {
        question: "What is the speaker announcing?",
        choices: {
          A: "A change to a claims process",
          B: "A reduction in travel budgets",
          C: "A new accounting supplier",
          D: "A delay in staff payments",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：下月起報帳改走新系統，故選 (A)。(B) 沒有提到預算縮減，(D) 沒有提到延遲付款。",
      },
      {
        question: "What is no longer required for small claims?",
        choices: {
          A: "A manager's signature",
          B: "A receipt",
          C: "A project code",
          D: "A paper form",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：anything under fifteen pounds no longer needs a receipt at all，故選 (B)。(D) 紙本表單是所有金額都不再使用，不是「小額」的特例。",
      },
      {
        question: 'What does the speaker imply by "I\'d genuinely rather you read it than ask me in the corridor"?',
        choices: {
          A: "The guide is too long to read.",
          B: "Questions should go to the portal.",
          C: "Staff should read it themselves.",
          D: "He will be away from the office.",
        },
        answer: "C",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他先說指南只有兩頁，再說寧願大家自己讀，是要員工先讀而不要臨時問他，故選 (C)。(A) 與「只有兩頁」矛盾。",
      },
    ],
  },
  {
    id: "07",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["guard", "calibrate", "isolate"],
    graphic: `Machine Start-up — Order of Steps

  1  Check the guard is closed
  2  Isolate the power at the wall
  3  Fit the correct blade
  4  Restore power and calibrate`,
    transcript: `Before anyone touches this machine, the order of the steps matters more than the steps themselves. Most of the incidents we have had came from people doing step three while the machine was still live. So: guard closed, power isolated at the wall, blade fitted, and only then power back on and calibrate. If you find the guard already open when you arrive at the machine, do not simply close it and carry on — report it, because it means the last person left it in an unsafe state. The calibration reading should settle within about ten seconds; if it is still moving after thirty, stop and call maintenance.`,
    questions: [
      {
        question: "Look at the graphic. Which step has caused most incidents?",
        choices: { A: "Step 1", B: "Step 2", C: "Step 3", D: "Step 4" },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：講者說事故多來自 people doing step three while the machine was still live，對照圖表第三步是裝刀片，故選 (C)。要把聽到的步驟編號與畫面上的清單對起來。",
      },
      {
        question: "What should a worker do if the guard is already open?",
        choices: {
          A: "Close it and continue",
          B: "Report the situation",
          C: "Calibrate the machine first",
          D: "Isolate the power and wait",
        },
        answer: "B",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：講者明說 do not simply close it and carry on — report it，故選 (B)。(A) 正是被禁止的做法，是本題最大陷阱。",
      },
      {
        question: "When should maintenance be called?",
        choices: {
          A: "If the blade will not fit",
          B: "If the guard cannot be closed",
          C: "If the reading is still moving",
          D: "If the power will not isolate",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：if it is still moving after thirty, stop and call maintenance，故選 (C)。校正讀數應在十秒內穩定。",
      },
    ],
  },
  {
    id: "08",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["start date", "notice period", "formal offer"],
    transcript: `Ms. Delacroix, this is Owen Pryce from Halstead Analytics. I'm delighted to say the panel would like to offer you the senior analyst role. The formal offer letter goes out by post today and by e-mail this afternoon, so do check both. We had penciled in a start date of the second of September, but I understand from your application that you have a two-month notice period, so tell me what is realistic and we will work around it. There is one form we need before anything else: the reference consent, which is attached to the e-mail. Everything else can wait until you have read the letter.`,
    questions: [
      {
        question: "Why is the speaker calling?",
        choices: {
          A: "To arrange a second interview",
          B: "To offer someone a position",
          C: "To check a reference",
          D: "To confirm a start date",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：the panel would like to offer you the senior analyst role，故選 (B)。(D) 起始日還在協調中，不是打電話的目的。",
      },
      {
        question: "What does the speaker say about the start date?",
        choices: {
          A: "It cannot be changed.",
          B: "It has been brought forward.",
          C: "It is open to discussion.",
          D: "It depends on the references.",
        },
        answer: "C",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：他說知道她有兩個月的離職通知期，tell me what is realistic and we will work around it，表示可以商量，故選 (C)。(A) 語意完全相反。",
      },
      {
        question: "What does the speaker ask for first?",
        choices: {
          A: "A signed offer letter",
          B: "A copy of her contract",
          C: "The reference consent form",
          D: "Confirmation by telephone",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：There is one form we need before anything else: the reference consent，故選 (C)。(A) 錄用信要等她讀完之後才處理。",
      },
    ],
  },
  {
    id: "09",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["stocktake", "checkout", "trading hours"],
    transcript: `Attention shoppers. The store will be closing at six this evening instead of the usual nine, as our annual stocktake begins tonight. The last checkout will close at ten to six, so please make your way to the tills in good time. The pharmacy counter closes at half past five, a little earlier than the rest of the store. We reopen tomorrow at the normal time of eight in the morning, with the whole store fully stocked — which, if you have shopped with us at this time of year before, you will know is worth coming back for. Thank you for shopping at Fenwick's.`,
    questions: [
      {
        question: "Why is the store closing early?",
        choices: {
          A: "For a staff training session",
          B: "For an annual stocktake",
          C: "For a public holiday",
          D: "For emergency repairs",
        },
        answer: "B",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：as our annual stocktake begins tonight，故選 (B)。(A)(C)(D) 都沒有提到。",
      },
      {
        question: "What time does the pharmacy counter close?",
        choices: { A: "5:30", B: "5:50", C: "6:00", D: "9:00" },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：The pharmacy counter closes at half past five，故選 (A)。(B) 是最後一個收銀台關閉的時間，(D) 是平常的打烊時間，三個數字都在廣播裡出現過。",
      },
      {
        question: 'Why does the speaker mention shoppers who have "shopped with us at this time of year before"?',
        choices: {
          A: "To thank regular customers",
          B: "To encourage a return visit",
          C: "To explain a price increase",
          D: "To apologise for the closure",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他說熟客會知道補齊貨的隔天 is worth coming back for，是在鼓勵明天再來，故選 (B)。(D) 廣播中並沒有道歉。",
      },
    ],
  },
  {
    id: "10",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["intensive course", "placement test", "conversation class"],
    transcript: `Thinking about improving your Spanish before the summer? Ridgeway Language Centre runs intensive courses over six weeks, with classes twice a week in the evening and a conversation session on Saturday mornings that is open to all levels. Every new student takes a short placement test — it is free, it takes about twenty minutes, and it means nobody spends six weeks in a class that is too easy or too hard for them. Our summer term fills up well before it starts, and the beginner group is usually the first to go. Book your test online at ridgeway-languages dot com.`,
    questions: [
      {
        question: "What is being advertised?",
        choices: {
          A: "A language course",
          B: "A translation service",
          C: "A summer holiday",
          D: "A teaching qualification",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：整段推銷 Ridgeway Language Centre 的西班牙語密集課程，故選 (A)。(D) 沒有提到師資培訓。",
      },
      {
        question: "What is said about the placement test?",
        choices: {
          A: "It costs a small fee.",
          B: "It lasts about an hour.",
          C: "It is free of charge.",
          D: "It is taken on the first day.",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：it is free, it takes about twenty minutes，故選 (C)。(B) 是二十分鐘不是一小時，(A) 與 free 矛盾。",
      },
      {
        question: "What does the speaker imply about the beginner group?",
        choices: {
          A: "It runs on Saturdays only.",
          B: "It should be booked early.",
          C: "It has the largest class size.",
          D: "It is taught by two teachers.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：夏季班在開課前就會滿，而 the beginner group is usually the first to go，暗示要及早報名，故選 (B)。(A) 週六是各級皆可參加的會話課。",
      },
    ],
  },
  {
    id: "11",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["plant", "ribbon-cutting", "shift"],
    graphic: `Opening Day — Programme

  10:00   Guided tours of the plant
  11:30   Ribbon-cutting ceremony
  12:30   Lunch in the canteen
  14:00   Recruitment session`,
    transcript: `In business news, Corran Engineering opens its new plant at Fairhaven on Friday, bringing around two hundred and forty jobs to an area that lost its shipyard a decade ago. The site will run two shifts rather than the three originally planned, which the company says reflects demand rather than any change of commitment. Friday's programme runs through the day, and the item the local council is most keen to publicise is the last one — anyone looking for work is invited to come along, whether or not they attend anything earlier. Corran expects to be at full output by the spring.`,
    questions: [
      {
        question: "Look at the graphic. Which item is the council keen to publicise?",
        choices: {
          A: "The guided tours",
          B: "The ribbon-cutting ceremony",
          C: "The lunch in the canteen",
          D: "The recruitment session",
        },
        answer: "D",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：報導說議會最想宣傳的是 the last one，而且 anyone looking for work is invited——對照節目表，最後一項是 14:00 的招募說明會，故選 (D)。「the last one」這種指稱一定要回到圖表上確認。",
      },
      {
        question: "What does the speaker say about the shifts?",
        choices: {
          A: "There will be fewer than planned.",
          B: "They will start later than expected.",
          C: "They will be longer than usual.",
          D: "They have not yet been decided.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：two shifts rather than the three originally planned，故選 (A)。(D) 錯在班次已經定了。",
      },
      {
        question: "What is mentioned about the local area?",
        choices: {
          A: "It has a growing population.",
          B: "It lost an industry previously.",
          C: "It has good transport links.",
          D: "It has offered a tax reduction.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：報導說該地 lost its shipyard a decade ago，是曾失去一個產業，故選 (B)。(D) 沒有提到稅務優惠。",
      },
    ],
  },
  {
    id: "12",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["back order", "part shipment", "credit"],
    transcript: `Good afternoon, this is Ines from Broadhurst Supplies with an update on order four-two-one-nine. Twelve of the fourteen items are packed and leave us tomorrow. The remaining two — the wall brackets — are on back order from the manufacturer with no firm date, which is why I am calling rather than e-mailing. You have two choices. We can hold the whole order until the brackets arrive, or send the twelve now and the brackets as a second shipment at our cost. If I do not hear from you by five o'clock I will send the twelve, on the assumption that having most of it is better than having none of it.`,
    questions: [
      {
        question: "Why is the speaker calling rather than e-mailing?",
        choices: {
          A: "The customer's e-mail address is wrong.",
          B: "A decision is needed quickly.",
          C: "The order has been cancelled.",
          D: "A payment has not been received.",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：兩項商品缺貨且沒有確定日期，需要客戶在五點前決定，所以她打電話而非寄信，故選 (B)。(D) 沒有提到付款問題。",
      },
      {
        question: "What is the problem with the order?",
        choices: {
          A: "Two items are unavailable.",
          B: "The delivery address is unclear.",
          C: "The wrong items were packed.",
          D: "The order arrived damaged.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：十四項中有兩項壁掛架 on back order，故選 (A)。(C) 其餘十二項都已正確包裝完成。",
      },
      {
        question: "What will the speaker do if the customer does not reply?",
        choices: {
          A: "Cancel the entire order",
          B: "Hold everything until later",
          C: "Send the twelve items",
          D: "Issue a full credit",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：If I do not hear from you by five o'clock I will send the twelve，故選 (C)。(B) 是另一個選項，不是預設做法。",
      },
    ],
  },
  {
    id: "13",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["keynote", "field", "practitioner"],
    transcript: `It's my pleasure to introduce this evening's speaker. Most of you will know Dr. Amara Boateng from her book on urban water systems, which has been on every reading list in the field for six years now. What you may not know is that she spent the first decade of her career not writing about water but running a treatment works in Kumasi, and she will tell you herself that she learned more in those ten years than in any library. Her talk lasts about forty minutes and she has asked that we save questions for the end rather than interrupting. Dr. Boateng.`,
    questions: [
      {
        question: "What is the purpose of the talk?",
        choices: {
          A: "To introduce a speaker",
          B: "To present an award",
          C: "To open a conference",
          D: "To launch a new book",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：It's my pleasure to introduce this evening's speaker，故選 (A)。(D) 那本書已出版六年，不是新書發表。",
      },
      {
        question: 'Why does the speaker mention the treatment works in Kumasi?',
        choices: {
          A: "To explain why she wrote the book",
          B: "To highlight her practical experience",
          C: "To correct an error in her biography",
          D: "To describe the topic of her talk",
        },
        answer: "B",
        skill_tag: "listening_inference",
        explanation_zh:
          "說話意圖題：他先說「你們可能不知道」，再說她前十年在現場管理處理廠、學到的比在圖書館更多，是在強調她的實務經歷，故選 (B)。(C) 沒有任何更正的意思。",
      },
      {
        question: "What have the audience been asked to do?",
        choices: {
          A: "Take notes during the talk",
          B: "Read the book beforehand",
          C: "Hold questions until the end",
          D: "Keep the talk to forty minutes",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：she has asked that we save questions for the end，故選 (C)。(D) 四十分鐘是她的演講長度，不是對聽眾的要求。",
      },
    ],
  },
  {
    id: "14",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["refurbishment", "reading room", "reserve"],
    transcript: `A notice for library users. The main reading room closes on the fifteenth for refurbishment and will reopen in November. During that time the ground-floor study space stays open as usual, and we are adding thirty extra desks in the meeting room upstairs, which will be bookable in two-hour slots. Borrowing is unaffected throughout. If you have reserved an item, please collect it before the fifteenth — anything left on the hold shelf after that date goes back into the general collection and will need to be reserved again. We are sorry for the disruption and we think the new room will be worth it.`,
    questions: [
      {
        question: "What is the notice mainly about?",
        choices: {
          A: "A temporary closure",
          B: "New borrowing rules",
          C: "A change of opening hours",
          D: "A fundraising campaign",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "主旨題：主閱覽室 15 日起整修至 11 月，是暫時關閉的公告，故選 (A)。(B) 借書完全不受影響。",
      },
      {
        question: "What is being provided during the closure?",
        choices: {
          A: "A free delivery service",
          B: "Extra desks upstairs",
          C: "Longer opening hours",
          D: "Access to another library",
        },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：we are adding thirty extra desks in the meeting room upstairs，故選 (B)。(C) 開放時間並沒有延長。",
      },
      {
        question: "What should users do before the fifteenth?",
        choices: {
          A: "Return all borrowed items",
          B: "Book a study slot online",
          C: "Collect reserved items",
          D: "Renew their membership",
        },
        answer: "C",
        skill_tag: "listening_next_action",
        explanation_zh:
          "細節題：If you have reserved an item, please collect it before the fifteenth，故選 (C)。(A) 借出的書不必提前歸還。",
      },
    ],
  },
  {
    id: "15",
    part: "Part 4",
    difficulty: "B1",
    vocabulary: ["recorded message", "bank holiday", "collection point"],
    graphic: `Riverside Recycling Centre — Hours

  Mon–Wed     08:00 – 16:00
  Thursday    closed
  Fri–Sat     08:00 – 18:00
  Sunday      10:00 – 14:00`,
    transcript: `Thank you for calling Riverside Recycling Centre. Please listen carefully as this message has recently changed. We are open six days a week, and the one day we are closed has moved — it used to be Monday and it is now the middle of the week, so please check before travelling. Our latest closing time is six in the evening on Fridays and Saturdays. Large items such as furniture and appliances must be booked in advance; there is a separate line for that on our website. Garden waste is accepted on any open day at no charge. This message will be updated before the next bank holiday.`,
    questions: [
      {
        question: "Look at the graphic. Which day is the centre closed?",
        choices: { A: "Monday", B: "Thursday", C: "Saturday", D: "Sunday" },
        answer: "B",
        skill_tag: "listening_detail",
        explanation_zh:
          "圖表對照題：錄音說休息日已從星期一改到 the middle of the week，對照表格是 Thursday，故選 (B)。(A) 正是「以前」的休息日，是本題最大陷阱。",
      },
      {
        question: "What must be booked in advance?",
        choices: {
          A: "Garden waste disposal",
          B: "Sunday visits",
          C: "Large items",
          D: "Commercial loads",
        },
        answer: "C",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：Large items such as furniture and appliances must be booked in advance，故選 (C)。(A) 園藝廢棄物任何開放日都免費收受。",
      },
      {
        question: "Why does the speaker ask listeners to listen carefully?",
        choices: {
          A: "The message has changed.",
          B: "The line is about to close.",
          C: "The centre is moving site.",
          D: "The charges have gone up.",
        },
        answer: "A",
        skill_tag: "listening_inference",
        explanation_zh:
          "推論題：Please listen carefully as this message has recently changed，故選 (A)。(D) 沒有提到收費調整。",
      },
    ],
  },
  {
    id: "16",
    part: "Part 4",
    difficulty: "B2",
    vocabulary: ["de-escalate", "script", "role-play"],
    transcript: `Before the break, one thing I want you to take away. When a customer is angry, the instinct is to explain the policy. Almost every recording we listened to this morning went wrong at exactly that point. What works is to say back to them what they have told you, in your own words, before you say anything about what you can or cannot do. It sounds slow. It is in fact the fastest route to a solved call, and the recordings show it. After the break we will do this in pairs — one of you as the customer, one as the agent — and I will be listening in and stopping you when the explaining starts too early.`,
    questions: [
      {
        question: "Who most likely are the listeners?",
        choices: {
          A: "Customer service staff",
          B: "Software developers",
          C: "Sales managers",
          D: "New supervisors",
        },
        answer: "A",
        skill_tag: "listening_main_idea",
        explanation_zh:
          "聽眾推論題：內容講如何應對生氣的客戶、聽通話錄音、扮演 agent，對象是客服人員，故選 (A)。(C) 沒有任何管理職的內容。",
      },
      {
        question: "What does the speaker say goes wrong on calls?",
        choices: {
          A: "The agent explains policy too soon.",
          B: "The agent transfers the call.",
          C: "The customer is put on hold.",
          D: "The agent talks for too long.",
        },
        answer: "A",
        skill_tag: "listening_detail",
        explanation_zh:
          "細節題：他說幾乎每段錄音都是在「解釋政策」那一刻出錯，故選 (A)。(D) 講的是時機不對，不是講太久。",
      },
      {
        question: "What will happen after the break?",
        choices: {
          A: "More recordings will be played.",
          B: "Participants will work in pairs.",
          C: "A written test will be given.",
          D: "A new policy will be explained.",
        },
        answer: "B",
        skill_tag: "listening_next_action",
        explanation_zh:
          "下一步題：After the break we will do this in pairs，故選 (B)。(A) 聽錄音是上半場已經做過的事。",
      },
    ],
  },
];

// ─── Expansion ──────────────────────────────────────────────────────────────

const LETTERS = ["A", "B", "C", "D"] as const;

function expand(groups: GroupSpec[]): Question[] {
  const flat = groups.flatMap((group) =>
    group.questions.map((q, index) => ({
      group,
      q,
      index,
      id: `${group.part === "Part 3" ? "p3x" : "p4x"}-${group.id}${"abc"[index]}`,
    })),
  );
  const targets = dealTargets(flat.length, LETTERS);

  return flat.map(({ group, q, index, id }, position) => {
    const balanced = moveAnswerTo(q.choices, q.answer, q.explanation_zh, targets[position]);
    return {
      id,
      part: group.part,
      question: q.question,
      choices: balanced.choices,
      answer: balanced.answer,
      explanation_zh: balanced.explanation,
      skill_tag: q.skill_tag,
      difficulty: group.difficulty,
      vocabulary: group.vocabulary,
      transcript: group.transcript,
      ...(group.graphic ? { passage: group.graphic } : {}),
      question_order: index + 1,
    } satisfies Question;
  });
}

export const QUESTIONS_LISTENING_EXTRA: Question[] = expand(GROUPS);
