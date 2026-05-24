import type { Question } from "@/types/question";

export const QUESTIONS_LISTENING: Question[] = [
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
];
