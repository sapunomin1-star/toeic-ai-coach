import type { Question } from "@/types/question";

export const QUESTIONS_PART7: Question[] = [
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
];
