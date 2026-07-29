import type { Question, Choice, Difficulty } from "@/types/question";

/**
 * Part 2 — indirect responses.
 *
 * The bank had 233 Part 2 items and only 8 of them (3.4%) answered indirectly;
 * the AI-generated batch was 2%. Almost every key was a direct, literal answer,
 * which trains the easy half of the part. Real Part 2 leans hard on indirect
 * responses at the upper end — "When does the shipment arrive?" answered with
 * "I'll check with the warehouse" — and that is exactly what separates a 450
 * listener from a 700 one. This is a gap in question TYPE, not in volume.
 *
 * Each item names its indirect pattern in the explanation, so the learner
 * builds a schema ("this is a deferral") rather than memorising single items.
 * Distractors use the two traps the real exam relies on: repeating a word from
 * the prompt, and answering a different question word.
 *
 * `audioScript` is DERIVED from `choices` at expansion time rather than stored
 * alongside them. In Part 1 and 2 the options are spoken, so a hand-maintained
 * script can drift out of step with the options and the recording ends up
 * saying something the screen does not show — a desync no gate catches, since
 * both fields stay individually well-formed. Deriving it makes that impossible.
 */

type Kind =
  | "deflect"
  | "refer"
  | "counter"
  | "conditional"
  | "premise"
  | "defer"
  | "pointer"
  | "decline"
  | "neither";

const KIND_LABEL: Record<Kind, string> = {
  deflect: "不知道型",
  refer: "轉介他人型",
  counter: "反問型",
  conditional: "條件型",
  premise: "推翻前提型",
  defer: "稍後查證型",
  pointer: "指向資料型",
  decline: "婉拒型",
  neither: "兩者皆非型",
};

type Item = {
  prompt: string;
  kind: Kind;
  difficulty: Difficulty;
  vocabulary: string[];
  /** The key, plus why it answers the prompt. */
  correct: { text: string; why: string };
  /** Exactly two wrong options, each with the trap it represents. */
  traps: [{ text: string; why: string }, { text: string; why: string }];
};

const ITEMS: Item[] = [
  // ── 不知道型 ────────────────────────────────────────────────────────────
  {
    prompt: "When will the new sales figures be released?",
    kind: "deflect",
    difficulty: "B1",
    vocabulary: ["sales figures", "release"],
    correct: { text: "Nobody has told me anything about them.", why: "不直接給時間，而是表示「沒人告訴我」——這就是最典型的迴避式回應" },
    traps: [
      { text: "The sales team is on the third floor.", why: "重複 sales，但回答的是地點" },
      { text: "Yes, they were quite good last quarter.", why: "用 Yes 回答 When 開頭的疑問句，文法上就不成立" },
    ],
  },
  {
    prompt: "Who designed the cover for the annual report?",
    kind: "deflect",
    difficulty: "B1",
    vocabulary: ["annual report", "cover"],
    correct: { text: "I wasn't here when it was chosen.", why: "以「當時我不在」暗示自己不知道，等於回答了 Who" },
    traps: [
      { text: "It's due at the end of the month.", why: "回答的是 When，不是 Who" },
      { text: "The design studio is on Fifth Avenue.", why: "重複 design，但回答地點" },
    ],
  },
  {
    prompt: "How much did the new conference table cost?",
    kind: "deflect",
    difficulty: "B1",
    vocabulary: ["invoice", "come through"],
    correct: { text: "The invoice hasn't come through yet.", why: "帳單還沒到＝還不知道金額，間接回答 How much" },
    traps: [
      { text: "It seats about twelve people.", why: "談的是桌子的容納人數，不是價格" },
      { text: "In the small meeting room.", why: "回答的是 Where" },
    ],
  },
  {
    prompt: "Where is the training being held this year?",
    kind: "deflect",
    difficulty: "B1",
    vocabulary: ["venue", "announce"],
    correct: { text: "They haven't announced the venue.", why: "場地尚未公布＝無法回答 Where" },
    traps: [
      { text: "It lasts three full days.", why: "回答的是持續多久" },
      { text: "I trained the new hires myself.", why: "重複 train，但完全沒回應問題" },
    ],
  },
  {
    prompt: "Why was the product launch postponed?",
    kind: "deflect",
    difficulty: "B1",
    vocabulary: ["postpone", "launch"],
    correct: { text: "No one has explained that to us.", why: "「沒有人解釋」＝不知道原因，回應了 Why" },
    traps: [
      { text: "It launched in April last year.", why: "重複 launch，但講的是過去的時間" },
      { text: "About two weeks from now.", why: "回答的是 When" },
    ],
  },
  {
    prompt: "Which supplier are we using for the packaging?",
    kind: "deflect",
    difficulty: "B2",
    vocabulary: ["supplier", "packaging"],
    correct: { text: "That decision is still being made.", why: "尚未決定＝說不出是哪一家，回應了 Which" },
    traps: [
      { text: "The package arrived this morning.", why: "package 與 packaging 近音，是聲音陷阱" },
      { text: "Because their prices are lower.", why: "Because 是回答 Why 的" },
    ],
  },
  {
    prompt: "How many people applied for the position?",
    kind: "deflect",
    difficulty: "B1",
    vocabulary: ["applicant", "human resources"],
    correct: { text: "Human Resources keeps those numbers.", why: "把數字的掌握者指出來，暗示自己手上沒有" },
    traps: [
      { text: "She was hired in September of last year.", why: "回答的是 When" },
      { text: "It's a full-time position.", why: "重複 position，但講的是職務性質" },
    ],
  },
  {
    prompt: "What did the client say about the proposal?",
    kind: "deflect",
    difficulty: "B2",
    vocabulary: ["proposal", "run late"],
    correct: { text: "The meeting ran late, so I left early.", why: "說明自己提早離開，暗示沒聽到客戶的回應" },
    traps: [
      { text: "I proposed a completely different date for that.", why: "propose 與 proposal 同字根，是字彙陷阱" },
      { text: "They're arriving at nine.", why: "回答的是 When" },
    ],
  },

  // ── 轉介他人型 ──────────────────────────────────────────────────────────
  {
    prompt: "Can you tell me the code for the storage room?",
    kind: "refer",
    difficulty: "B1",
    vocabulary: ["storage room", "access code"],
    correct: { text: "Priya changes it every month.", why: "點出負責的人，暗示要去問她——轉介是 Part 2 最常見的間接回應" },
    traps: [
      { text: "It's stored in the cabinet.", why: "stored 與 storage 同字根的聲音陷阱" },
      { text: "Yes, the room is quite large.", why: "重複 room，而且答非所問" },
    ],
  },
  {
    prompt: "Who should I send the signed contract to?",
    kind: "refer",
    difficulty: "B1",
    vocabulary: ["signed contract", "legal department"],
    correct: { text: "Legal handles everything after signing.", why: "指出負責的部門，正面回應了 Who" },
    traps: [
      { text: "I signed it yesterday afternoon before lunch.", why: "重複 sign，但講的是自己的動作" },
      { text: "By courier, if it's urgent.", why: "回答的是 How" },
    ],
  },
  {
    prompt: "Do you know how to reset the alarm system?",
    kind: "refer",
    difficulty: "B1",
    vocabulary: ["reset", "security desk"],
    correct: { text: "Security does it from the front desk.", why: "把事情交給誰做講清楚，等於回答了「怎麼處理」" },
    traps: [
      { text: "The alarm went off twice last night.", why: "重複 alarm，但講的是昨晚的事" },
      { text: "It's set for six in the morning.", why: "set 與 reset 近音陷阱" },
    ],
  },
  {
    prompt: "Where do I get a parking permit?",
    kind: "refer",
    difficulty: "B1",
    vocabulary: ["parking permit", "facilities"],
    correct: { text: "Facilities issues those on Mondays.", why: "指出核發單位，回應了 Where" },
    traps: [
      { text: "I parked on the second level.", why: "重複 park，但講的是自己停哪裡" },
      { text: "It costs about forty dollars a month.", why: "回答的是 How much" },
    ],
  },
  {
    prompt: "What's the deadline for the grant application?",
    kind: "refer",
    difficulty: "B2",
    vocabulary: ["grant", "submission"],
    correct: { text: "Dr. Osei is managing that submission.", why: "把提問轉給實際負責的人，是標準的轉介回應" },
    traps: [
      { text: "I applied for one of those last spring.", why: "apply 與 application 同字根陷阱" },
      { text: "In the research building.", why: "回答的是 Where" },
    ],
  },
  {
    prompt: "Could someone show me how the new phone system works?",
    kind: "refer",
    difficulty: "B1",
    vocabulary: ["phone system", "set up"],
    correct: { text: "Tomas is the one who set it up.", why: "指出安裝者，暗示他最清楚，回應了請求" },
    traps: [
      { text: "I called the client this morning.", why: "與 phone 語意相關，但沒回應請求" },
      { text: "The phones are working fine now.", why: "重複 phone，但講的是運作狀況" },
    ],
  },
  {
    prompt: "Who's covering the front desk during lunch?",
    kind: "refer",
    difficulty: "B1",
    vocabulary: ["cover a shift", "rota"],
    correct: { text: "Check the rota by the staff room.", why: "指向班表，等於告訴對方去哪裡找答案" },
    traps: [
      { text: "I usually eat at half past twelve.", why: "與 lunch 語意相關，但沒回答 Who" },
      { text: "The desk was delivered on Friday.", why: "重複 desk，但講的是家具送達" },
    ],
  },
  {
    prompt: "Is there someone who can translate this document?",
    kind: "refer",
    difficulty: "B2",
    vocabulary: ["translate", "agency"],
    correct: { text: "The agency we used last time could.", why: "指出可委託的對象，正面回應了問題" },
    traps: [
      { text: "I documented all the changes.", why: "document 當動詞用的同字根陷阱" },
      { text: "It's about eight or nine pages long.", why: "講的是文件長度，不是誰能翻譯" },
    ],
  },

  // ── 反問型 ──────────────────────────────────────────────────────────────
  {
    prompt: "Have you finished the report?",
    kind: "counter",
    difficulty: "B1",
    vocabulary: ["report", "prioritise"],
    correct: { text: "Which one do you need first?", why: "以反問澄清對方指的是哪一份——反問在 Part 2 幾乎一定是正解" },
    traps: [
      { text: "I reported it to my manager.", why: "report 當動詞的同字根陷阱" },
      { text: "It finished around four.", why: "重複 finish，但講的是某件事結束的時間" },
    ],
  },
  {
    prompt: "Should I book the larger meeting room?",
    kind: "counter",
    difficulty: "B1",
    vocabulary: ["book a room", "capacity"],
    correct: { text: "How many are coming?", why: "反問人數，因為那才是決定要不要訂大會議室的關鍵" },
    traps: [
      { text: "I booked a flight for Tuesday.", why: "重複 book，但講的是訂機票" },
      { text: "The room is on the ground floor.", why: "重複 room，但回答的是位置" },
    ],
  },
  {
    prompt: "Can we move the presentation to Thursday?",
    kind: "counter",
    difficulty: "B1",
    vocabulary: ["reschedule", "notify"],
    correct: { text: "Has everyone been told?", why: "反問是否已通知眾人，是同意改期前的合理確認" },
    traps: [
      { text: "I moved into the new office.", why: "move 的另一個意思，是語意陷阱" },
      { text: "She presented the results well.", why: "present 與 presentation 同字根陷阱" },
    ],
  },
  {
    prompt: "I'd like to order more toner for the printer.",
    kind: "counter",
    difficulty: "B2",
    vocabulary: ["toner", "budget code"],
    correct: { text: "Do we have a budget code for that?", why: "反問預算代碼，是處理採購請求時的自然回應" },
    traps: [
      { text: "The printer is right by the far window.", why: "重複 printer，但回答位置" },
      { text: "I ordered lunch already.", why: "重複 order，但講的是訂午餐" },
    ],
  },
  {
    prompt: "The client wants the samples by Friday.",
    kind: "counter",
    difficulty: "B2",
    vocabulary: ["samples", "turnaround"],
    correct: { text: "Is that even possible with our schedule?", why: "以反問表達質疑，回應了對方陳述的難處" },
    traps: [
      { text: "The samples were all quite good, actually.", why: "重複 sample，但評論的是品質" },
      { text: "He's a very old client.", why: "重複 client，但講的是交情" },
    ],
  },
  {
    prompt: "We should update the company handbook.",
    kind: "counter",
    difficulty: "B1",
    vocabulary: ["handbook", "revise"],
    correct: { text: "When was it last revised?", why: "反問上次修訂時間，是判斷該不該更新的前提" },
    traps: [
      { text: "The company moved last year.", why: "重複 company，但講的是搬遷" },
      { text: "I handed it to her myself.", why: "handed 與 handbook 的聲音陷阱" },
    ],
  },
  {
    prompt: "Would you rather present first or last?",
    kind: "counter",
    difficulty: "B2",
    vocabulary: ["present", "running order"],
    correct: { text: "Does it make a difference to you?", why: "把選擇丟回給對方，是選擇疑問句常見的間接回應" },
    traps: [
      { text: "The first floor, I think.", why: "重複 first，但回答的是樓層" },
      { text: "She presented very clearly.", why: "重複 present，但評論的是別人的表現" },
    ],
  },
  {
    prompt: "How long will the renovation take?",
    kind: "counter",
    difficulty: "B2",
    vocabulary: ["renovation", "phase"],
    correct: { text: "Which part of the building do you mean?", why: "反問範圍，因為不同區域工期不同——澄清型反問" },
    traps: [
      { text: "They renovated the lobby downstairs, too.", why: "renovate 同字根陷阱" },
      { text: "It took about an hour.", why: "take 的過去式，但回答的是別件事的耗時" },
    ],
  },

  // ── 條件型 ──────────────────────────────────────────────────────────────
  {
    prompt: "Will the shipment arrive before the weekend?",
    kind: "conditional",
    difficulty: "B2",
    vocabulary: ["shipment", "clear customs"],
    correct: { text: "Only if it clears customs today.", why: "用 Only if 附加條件，等於「不一定」——條件型回應" },
    traps: [
      { text: "It shipped from the warehouse.", why: "ship 同字根陷阱" },
      { text: "I work weekends this month.", why: "重複 weekend，但講的是自己的班表" },
    ],
  },
  {
    prompt: "Can you cover my shift on Saturday?",
    kind: "conditional",
    difficulty: "B1",
    vocabulary: ["cover a shift", "as long as"],
    correct: { text: "As long as I'm back from Leeds.", why: "以 As long as 設條件，是有保留的答應" },
    traps: [
      { text: "The cover was torn.", why: "cover 當名詞「封面」的語意陷阱" },
      { text: "Saturday's shift starts at eight.", why: "重複 Saturday 與 shift，但回答的是時間" },
    ],
  },
  {
    prompt: "Are we still meeting the quarterly target?",
    kind: "conditional",
    difficulty: "B2",
    vocabulary: ["quarterly target", "depend on"],
    correct: { text: "That depends on the December numbers.", why: "It depends 是條件型回應最直接的標記" },
    traps: [
      { text: "We met in the boardroom.", why: "meet 的另一個意思，語意陷阱" },
      { text: "It's a very ambitious target, isn't it?", why: "重複 target，但評論的是難度" },
    ],
  },
  {
    prompt: "Should we hire another designer?",
    kind: "conditional",
    difficulty: "B2",
    vocabulary: ["workload", "unless"],
    correct: { text: "Not unless the workload keeps growing.", why: "Not unless 是「除非……否則不要」的條件式否定" },
    traps: [
      { text: "She was hired back in March of this year.", why: "hire 同字根陷阱" },
      { text: "The design was approved.", why: "design 與 designer 同字根陷阱" },
    ],
  },
  {
    prompt: "Is the new software ready to install?",
    kind: "conditional",
    difficulty: "B1",
    vocabulary: ["install", "licence"],
    correct: { text: "Once the licences come through.", why: "Once 引導條件，說明要等授權下來才行" },
    traps: [
      { text: "I installed it on my laptop.", why: "重複 install，但講的是自己的電腦" },
      { text: "It's a very soft material.", why: "soft 與 software 的聲音陷阱" },
    ],
  },
  {
    prompt: "Do you think we'll finish on schedule?",
    kind: "conditional",
    difficulty: "B2",
    vocabulary: ["on schedule", "provided that"],
    correct: { text: "Provided nothing else goes wrong.", why: "Provided 引導條件，是保留式的肯定" },
    traps: [
      { text: "The schedule is on the wall.", why: "重複 schedule，但回答的是位置" },
      { text: "I finished mine already.", why: "重複 finish，但講的是自己的部分" },
    ],
  },

  // ── 推翻前提型 ──────────────────────────────────────────────────────────
  {
    prompt: "What time does the workshop start on Monday?",
    kind: "premise",
    difficulty: "B2",
    vocabulary: ["workshop", "cancel"],
    correct: { text: "It was cancelled last week.", why: "直接推翻「有這場工作坊」的前提，時間問題就不存在了" },
    traps: [
      { text: "I worked through the weekend.", why: "work 與 workshop 的聲音陷阱" },
      { text: "In the east conference room.", why: "回答的是 Where" },
    ],
  },
  {
    prompt: "Did Mr. Alvarez sign off on the budget?",
    kind: "premise",
    difficulty: "B2",
    vocabulary: ["sign off", "away on leave"],
    correct: { text: "He's been away since Tuesday.", why: "人不在＝不可能簽核，用事實暗示否定" },
    traps: [
      { text: "The sign is above the door.", why: "sign 當名詞「招牌」的語意陷阱" },
      { text: "It's a fairly large budget.", why: "重複 budget，但評論的是規模" },
    ],
  },
  {
    prompt: "Where should I put the boxes of brochures?",
    kind: "premise",
    difficulty: "B1",
    vocabulary: ["brochure", "recycle"],
    correct: { text: "They're being recycled this afternoon.", why: "東西下午就要回收，「放哪裡」的前提不成立" },
    traps: [
      { text: "I put mine down somewhere yesterday.", why: "重複 put，但講的是自己昨天隨手放的東西" },
      { text: "About two hundred copies.", why: "回答的是 How many" },
    ],
  },
  {
    prompt: "Is Ms. Nakamura joining the call?",
    kind: "premise",
    difficulty: "B2",
    vocabulary: ["conference call", "land"],
    correct: { text: "Her flight lands at four.", why: "用班機時間暗示她可能趕不上，是典型的間接否定" },
    traps: [
      { text: "She called me yesterday.", why: "call 當動詞的同字根陷阱" },
      { text: "It's a very long call.", why: "重複 call，但講的是會議長度" },
    ],
  },
  {
    prompt: "Could you print twenty copies of the agenda?",
    kind: "premise",
    difficulty: "B1",
    vocabulary: ["agenda", "out of paper"],
    correct: { text: "The machine is out of paper.", why: "說明客觀障礙，等於暫時做不到——推翻請求的可行性" },
    traps: [
      { text: "I printed the photos already.", why: "重複 print，但講的是照片" },
      { text: "The agenda has six items.", why: "重複 agenda，但講的是內容" },
    ],
  },
  {
    prompt: "Have the new uniforms been ordered?",
    kind: "premise",
    difficulty: "B2",
    vocabulary: ["uniform", "go out of business"],
    correct: { text: "The supplier went out of business.", why: "供應商倒了，等於訂不成——用原因暗示否定" },
    traps: [
      { text: "I ordered a coffee on my way in today.", why: "重複 order，但講的是點咖啡" },
      { text: "They're navy blue.", why: "與制服相關，但沒回答有沒有訂" },
    ],
  },
  {
    prompt: "Are you taking the train to the conference?",
    kind: "premise",
    difficulty: "B1",
    vocabulary: ["line closure", "repairs"],
    correct: { text: "The line is closed for repairs.", why: "路線停駛，等於不可能搭火車——間接否定" },
    traps: [
      { text: "I trained for six months.", why: "train 當動詞「受訓」的語意陷阱" },
      { text: "The conference is in Leeds.", why: "重複 conference，但回答的是地點" },
    ],
  },
  {
    prompt: "Shall we discuss this at the staff meeting?",
    kind: "premise",
    difficulty: "B1",
    vocabulary: ["staff meeting", "agenda item"],
    correct: { text: "There isn't one this week.", why: "本週根本沒有會議，提議的前提不成立" },
    traps: [
      { text: "The staff are very experienced.", why: "重複 staff，但評論的是能力" },
      { text: "We discussed it at length.", why: "重複 discuss，但講的是過去已談過" },
    ],
  },

  // ── 稍後查證型 ──────────────────────────────────────────────────────────
  {
    prompt: "How many chairs do we need for the seminar?",
    kind: "defer",
    difficulty: "B1",
    vocabulary: ["seminar", "registration"],
    correct: { text: "Let me count the registrations.", why: "先去查報名人數再回覆——延後回答型" },
    traps: [
      { text: "The chairs are all stackable ones.", why: "重複 chair，但講的是規格" },
      { text: "It's on the twelfth.", why: "回答的是 When" },
    ],
  },
  {
    prompt: "Is the projector booked for Wednesday?",
    kind: "defer",
    difficulty: "B1",
    vocabulary: ["projector", "calendar"],
    correct: { text: "I'll look at the calendar now.", why: "答應立刻查行事曆，是延後回答的標準說法" },
    traps: [
      { text: "The project went well.", why: "project 與 projector 的聲音陷阱" },
      { text: "Wednesday is quite busy.", why: "重複 Wednesday，但沒回答預約狀況" },
    ],
  },
  {
    prompt: "What's our current stock of packaging tape?",
    kind: "defer",
    difficulty: "B2",
    vocabulary: ["stock level", "supply cupboard"],
    correct: { text: "I'll go and check the cupboard.", why: "去清點庫存再回覆——延後回答" },
    traps: [
      { text: "I taped the box shut.", why: "tape 當動詞的同字根陷阱" },
      { text: "The stock price rose again today.", why: "stock 當「股價」的語意陷阱，是本題最刁的干擾" },
    ],
  },
  {
    prompt: "When does the insurance policy expire?",
    kind: "defer",
    difficulty: "B2",
    vocabulary: ["insurance policy", "expire"],
    correct: { text: "I'll pull up the paperwork.", why: "要調出文件才知道，屬延後回答" },
    traps: [
      { text: "The policy was very clear.", why: "重複 policy，但評論的是內容" },
      { text: "It expired quite quickly.", why: "重複 expire，但講的是別件事" },
    ],
  },
  {
    prompt: "Does the hotel offer airport transfers?",
    kind: "defer",
    difficulty: "B1",
    vocabulary: ["airport transfer", "website"],
    correct: { text: "Their website should say.", why: "把查證的方法指出來，等於「我得去查」" },
    traps: [
      { text: "I transferred the money.", why: "transfer 當「匯款」的語意陷阱" },
      { text: "The hotel was fully booked.", why: "重複 hotel，但講的是訂房狀況" },
    ],
  },
  {
    prompt: "How much is left in the travel budget?",
    kind: "defer",
    difficulty: "B2",
    vocabulary: ["travel budget", "figures"],
    correct: { text: "Finance sends the figures on Fridays.", why: "數字要等財務部提供，暗示現在答不出來" },
    traps: [
      { text: "I travelled all the way there by coach.", why: "travel 同字根陷阱" },
      { text: "It was left on your desk.", why: "left 當「留下」的語意陷阱，與題目的「剩餘」不同義" },
    ],
  },

  // ── 指向資料型 ──────────────────────────────────────────────────────────
  {
    prompt: "What are the opening hours on public holidays?",
    kind: "pointer",
    difficulty: "B1",
    vocabulary: ["opening hours", "public holiday"],
    correct: { text: "They're posted on the front door.", why: "指向公告位置，讓對方自己去看" },
    traps: [
      { text: "We first opened back in 2019, I believe.", why: "open 同字根陷阱，但講的是開幕年份" },
      { text: "It's a paid holiday.", why: "重複 holiday，但講的是給不給薪" },
    ],
  },
  {
    prompt: "Do you know the extension for the warehouse?",
    kind: "pointer",
    difficulty: "B1",
    vocabulary: ["extension", "directory"],
    correct: { text: "It's in the directory by the phone.", why: "指向分機表，是「去那裡查」型的回應" },
    traps: [
      { text: "They extended the deadline by a week.", why: "extend 同字根陷阱" },
      { text: "The warehouse is in Derby.", why: "重複 warehouse，但回答的是地點" },
    ],
  },
  {
    prompt: "Where can I find the expense claim form?",
    kind: "pointer",
    difficulty: "B1",
    vocabulary: ["expense claim", "intranet"],
    correct: { text: "There's a link on the intranet.", why: "指出取得管道，正面回應了 Where" },
    traps: [
      { text: "I claimed mine in March.", why: "claim 同字根陷阱" },
      { text: "It was quite an expense.", why: "expense 當「一筆開銷」的語意陷阱" },
    ],
  },
  {
    prompt: "Which train goes to the industrial park?",
    kind: "pointer",
    difficulty: "B2",
    vocabulary: ["industrial park", "route map"],
    correct: { text: "The map at the entrance shows them all.", why: "指向路線圖，讓對方自行查詢" },
    traps: [
      { text: "I parked near the station.", why: "park 當「停車」的語意陷阱" },
      { text: "It leaves roughly every twenty minutes or so.", why: "回答的是班距，不是哪一班" },
    ],
  },
  {
    prompt: "What's the dress code for the awards dinner?",
    kind: "pointer",
    difficulty: "B1",
    vocabulary: ["dress code", "invitation"],
    correct: { text: "The invitation explains everything.", why: "指向邀請函，等於「上面寫得很清楚」" },
    traps: [
      { text: "She wore a blue dress.", why: "dress 當名詞「洋裝」的語意陷阱" },
      { text: "Dinner is served at seven o'clock sharp.", why: "重複 dinner，但回答的是時間" },
    ],
  },
  {
    prompt: "How do I claim the mileage allowance?",
    kind: "pointer",
    difficulty: "B2",
    vocabulary: ["mileage allowance", "staff handbook"],
    correct: { text: "The staff handbook has a section on it.", why: "指向手冊的相關章節，回應了 How" },
    traps: [
      { text: "I drove about forty miles to get there today.", why: "mile 與 mileage 的同字根陷阱" },
      { text: "They allowed us extra time.", why: "allow 與 allowance 同字根陷阱" },
    ],
  },

  // ── 婉拒型 ──────────────────────────────────────────────────────────────
  {
    prompt: "Could you join us for the site visit tomorrow?",
    kind: "decline",
    difficulty: "B1",
    vocabulary: ["site visit", "prior commitment"],
    correct: { text: "I'm in court all day.", why: "說明既有行程，等於婉拒——不說 No 而說理由" },
    traps: [
      { text: "The site looks impressive.", why: "重複 site，但評論的是外觀" },
      { text: "I visited them in June.", why: "visit 同字根陷阱" },
    ],
  },
  {
    prompt: "Would you mind staying late tonight?",
    kind: "decline",
    difficulty: "B1",
    vocabulary: ["stay late", "pick up"],
    correct: { text: "I have to collect my daughter.", why: "提出私人義務作為婉拒的理由" },
    traps: [
      { text: "I stayed at the Grand Hotel.", why: "stay 當「住宿」的語意陷阱" },
      { text: "It gets dark quite late.", why: "重複 late，但講的是天色" },
    ],
  },
  {
    prompt: "Can you review the draft before lunch?",
    kind: "decline",
    difficulty: "B2",
    vocabulary: ["draft", "inbox"],
    correct: { text: "My inbox is completely full.", why: "以工作量爆滿暗示做不到，是委婉的拒絕" },
    traps: [
      { text: "The draft was well written.", why: "重複 draft，但評論的是品質" },
      { text: "I had lunch at my desk.", why: "重複 lunch，但講的是自己的午餐" },
    ],
  },
  {
    prompt: "Would you like to lead the training session?",
    kind: "decline",
    difficulty: "B2",
    vocabulary: ["lead a session", "experience"],
    correct: { text: "I've never done anything like that.", why: "以缺乏經驗婉拒，沒有說 No 但意思很清楚" },
    traps: [
      { text: "The lead at the back was disconnected.", why: "lead 當名詞「電線」的語意陷阱，是本題最刁的干擾" },
      { text: "It trains new starters.", why: "train 同字根陷阱" },
    ],
  },
  {
    prompt: "Are you free to take notes in the meeting?",
    kind: "decline",
    difficulty: "B1",
    vocabulary: ["take notes", "present"],
    correct: { text: "I'm presenting the first half.", why: "自己要上台報告，暗示無法兼顧記錄" },
    traps: [
      { text: "The notes were very detailed.", why: "重複 note，但評論的是別人的記錄" },
      { text: "It's free to attend.", why: "free 當「免費」的語意陷阱" },
    ],
  },
  {
    prompt: "Can we push the deadline back a week?",
    kind: "decline",
    difficulty: "B2",
    vocabulary: ["push back", "commit to"],
    correct: { text: "The client has already been told.", why: "客戶已被告知原期限，等於不能改——用事實婉拒" },
    traps: [
      { text: "I pushed the door open.", why: "push 的字面意義，是語意陷阱" },
      { text: "It's a weekly deadline.", why: "week 與 deadline 都重複，但講的是頻率" },
    ],
  },

  // ── 兩者皆非型 ──────────────────────────────────────────────────────────
  {
    prompt: "Should we fly or take the train to Manchester?",
    kind: "neither",
    difficulty: "B1",
    vocabulary: ["whichever", "fare"],
    correct: { text: "Whichever is cheaper this week.", why: "用 Whichever 迴避二選一，改以條件決定" },
    traps: [
      { text: "The flight was delayed by an hour.", why: "fly 與 flight 同字根陷阱" },
      { text: "Manchester is quite far.", why: "重複 Manchester，但講的是距離" },
    ],
  },
  {
    prompt: "Do you want the report by e-mail or on paper?",
    kind: "neither",
    difficulty: "B1",
    vocabulary: ["hard copy", "either"],
    correct: { text: "Either is fine with me.", why: "Either 表示兩個都可以，是選擇疑問句的標準間接回應" },
    traps: [
      { text: "I e-mailed her this morning.", why: "重複 e-mail，但講的是自己寄信" },
      { text: "The paper jammed again.", why: "paper 當「印表紙」的語意陷阱" },
    ],
  },
  {
    prompt: "Would you prefer the morning or the afternoon slot?",
    kind: "neither",
    difficulty: "B2",
    vocabulary: ["slot", "make no difference"],
    correct: { text: "It makes no difference to my schedule.", why: "表示兩者皆可，等於不選擇——迴避型回應" },
    traps: [
      { text: "I much prefer to drink tea in the morning.", why: "prefer 與 morning 都重複，但講的是喝什麼" },
      { text: "The slot lasts an hour.", why: "重複 slot，但回答的是長度" },
    ],
  },
  {
    prompt: "Are we meeting in your office or mine?",
    kind: "neither",
    difficulty: "B1",
    vocabulary: ["boardroom", "neither"],
    correct: { text: "Neither — the boardroom is free.", why: "明確否定兩個選項並提出第三方案" },
    traps: [
      { text: "The office was painted last summer.", why: "重複 office，但講的是去年夏天的裝修，與地點選擇無關" },
      { text: "We met last Thursday.", why: "meet 同字根陷阱，但講的是過去" },
    ],
  },
];

// ─── Expansion ──────────────────────────────────────────────────────────────

const LETTERS = ["A", "B", "C"] as const;

/**
 * Deal key positions evenly across A/B/C without letting three of the same
 * letter fall in a row. Deterministic: same input, same output.
 */
function dealTargets(count: number): Choice[] {
  const need: Record<string, number> = {
    A: Math.ceil(count / 3),
    B: Math.ceil((count - 1) / 3),
    C: count - Math.ceil(count / 3) - Math.ceil((count - 1) / 3),
  };
  const out: Choice[] = [];
  while (out.length < count) {
    const available = LETTERS.filter((l) => need[l] > 0);
    let letter: (typeof LETTERS)[number] = available.reduce((a, b) => (need[a] >= need[b] ? a : b));
    const tail = out.slice(-2);
    if (tail.length === 2 && tail[0] === letter && tail[1] === letter) {
      letter = available.find((l) => l !== letter) ?? letter;
    }
    need[letter]--;
    out.push(letter as Choice);
  }
  return out;
}

function expand(items: Item[]): Question[] {
  const targets = dealTargets(items.length);

  return items.map((item, index) => {
    const answer = targets[index];
    const others = LETTERS.filter((l) => l !== answer);
    const texts: Record<string, string> = { [answer]: item.correct.text };
    const reasons: Record<string, string> = {};
    others.forEach((letter, i) => {
      texts[letter] = item.traps[i].text;
      reasons[letter] = item.traps[i].why;
    });

    const choices = { A: texts.A, B: texts.B, C: texts.C };
    // Derived, never stored by hand — see the file header.
    const audioScript = [
      `Q: ${item.prompt}`,
      ...LETTERS.map((letter) => `(${letter}) ${choices[letter]}`),
    ].join("\n");

    const explanation_zh =
      `【間接回應・${KIND_LABEL[item.kind]}】正解 (${answer})：${item.correct.why}。` +
      others.map((letter) => `(${letter}) ${reasons[letter]}`).join("；") +
      "。";

    return {
      id: `p2-ind-${String(index + 1).padStart(3, "0")}`,
      part: "Part 2",
      question: item.prompt,
      choices,
      answer,
      explanation_zh,
      skill_tag: "listening_response",
      difficulty: item.difficulty,
      vocabulary: item.vocabulary,
      audioScript,
    } satisfies Question;
  });
}

export const QUESTIONS_PART2_INDIRECT: Question[] = expand(ITEMS);
