import type { Question } from "@/types/question";

export const GENERATED_QUESTIONS: Question[] = [
  {
    "id": "p5-gen-001",
    "part": "Part 5",
    "question": "All employees are reminded that the new dress code policy _______ implemented starting next Monday.",
    "choices": {
      "A": "has",
      "B": "was",
      "C": "is being",
      "D": "will be"
    },
    "answer": "D",
    "explanation_zh": "正確答案是D，因為句子表示將來實施的政策，需用將來被動語態will be implemented。A和B缺少被動結構，C雖為被動但表示正在進行，與時間狀語next Monday矛盾。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "employees",
      "dress code",
      "policy",
      "implemented",
      "reminded"
    ]
  },
  {
    "id": "p5-gen-002",
    "part": "Part 5",
    "question": "The annual audit report _______ reviewed by the finance team at the moment.",
    "choices": {
      "A": "was",
      "B": "will be",
      "C": "is being",
      "D": "has been"
    },
    "answer": "C",
    "explanation_zh": "正確答案是C，at the moment表示動作正在進行，需用現在進行被動語態is being reviewed。D為完成被動，B為將來被動，A為過去被動，均與時間狀語不符。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "annual",
      "audit",
      "report",
      "reviewed",
      "finance"
    ]
  },
  {
    "id": "p5-gen-003",
    "part": "Part 5",
    "question": "Please note that the meeting agenda _______ already distributed to all department heads.",
    "choices": {
      "A": "is being",
      "B": "will be",
      "C": "was being",
      "D": "has been"
    },
    "answer": "D",
    "explanation_zh": "正確答案是D，already表示已完成動作，需用現在完成被動語態has been distributed。A表示正在進行，B表示將來，C為過去進行被動，均與already矛盾。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "meeting",
      "agenda",
      "distributed",
      "department",
      "heads"
    ]
  },
  {
    "id": "p7-gen-001",
    "part": "Part 7",
    "question": "What is the main purpose of this email?",
    "choices": {
      "A": "To announce a change in the meeting schedule and location",
      "B": "To request feedback on the Q1 sales results",
      "C": "To introduce a new project coordinator to the team",
      "D": "To cancel the quarterly review meeting permanently"
    },
    "answer": "A",
    "explanation_zh": "郵件的主要目的是通知團隊季度評審會議改期並更換地點。選項A正確概括了這一信息。選項C錯誤，因為郵件中Sarah Jenkins已是項目協調員，並非新介紹。選項D錯誤，會議並未取消而是改期。選項B錯誤，郵件要求確認出席，而非反饋銷售結果。",
    "skill_tag": "reading_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "reschedule",
      "quarterly",
      "auditorium",
      "accommodate"
    ],
    "passage": "Subject: Rescheduling of Quarterly Review Meeting\n\nDear Team,\n\nThis is to inform you that the quarterly review meeting originally scheduled for Friday, March 15th at 10:00 AM has been moved. The new date is Tuesday, March 19th at 2:00 PM. The location has also been changed from Conference Room B to the Main Auditorium to accommodate more attendees. We will discuss the Q1 sales results and the upcoming marketing campaign. Remote attendance via video link is available. Please confirm your attendance by replying to this email by March 12th.\n\nBest regards,\nSarah Jenkins\nProject Coordinator",
    "passage_group_id": "p7-single-022",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-002",
    "part": "Part 7",
    "question": "What is the new time for the meeting?",
    "choices": {
      "A": "10:00 AM on Friday, March 15th",
      "B": "2:00 PM on Friday, March 15th",
      "C": "10:00 AM on Tuesday, March 19th",
      "D": "2:00 PM on Tuesday, March 19th"
    },
    "answer": "D",
    "explanation_zh": "郵件明確指出新會議時間為3月19日（星期二）下午2點。選項A是原定時間。選項B將原定日期與新時間混合。選項C將原定時間與新日期混合。因此只有D正確。",
    "skill_tag": "reading_detail",
    "difficulty": "A2",
    "vocabulary": [
      "originally",
      "moved",
      "attendees",
      "confirm"
    ],
    "passage": "Subject: Rescheduling of Quarterly Review Meeting\n\nDear Team,\n\nThis is to inform you that the quarterly review meeting originally scheduled for Friday, March 15th at 10:00 AM has been moved. The new date is Tuesday, March 19th at 2:00 PM. The location has also been changed from Conference Room B to the Main Auditorium to accommodate more attendees. We will discuss the Q1 sales results and the upcoming marketing campaign. Remote attendance via video link is available. Please confirm your attendance by replying to this email by March 12th.\n\nBest regards,\nSarah Jenkins\nProject Coordinator",
    "passage_group_id": "p7-single-022",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-003",
    "part": "Part 7",
    "question": "What can be inferred about the meeting?",
    "choices": {
      "A": "The meeting will likely have more participants than originally planned.",
      "B": "The original time was inconvenient for the project coordinator.",
      "C": "Only in-person attendees will receive the sales results.",
      "D": "Attendance is mandatory for all team members."
    },
    "answer": "A",
    "explanation_zh": "郵件提到會議地點從A會議室改為大禮堂，以容納更多參會者，這暗示參會人數可能增加。選項D錯誤，因為未提及強制出席。選項B錯誤，改期原因未說明。選項C錯誤，遠程參會者也可通過視頻鏈接參與討論。因此A最合理。",
    "skill_tag": "reading_inference",
    "difficulty": "A2",
    "vocabulary": [
      "inference",
      "participants",
      "inconvenient",
      "in-person"
    ],
    "passage": "Subject: Rescheduling of Quarterly Review Meeting\n\nDear Team,\n\nThis is to inform you that the quarterly review meeting originally scheduled for Friday, March 15th at 10:00 AM has been moved. The new date is Tuesday, March 19th at 2:00 PM. The location has also been changed from Conference Room B to the Main Auditorium to accommodate more attendees. We will discuss the Q1 sales results and the upcoming marketing campaign. Remote attendance via video link is available. Please confirm your attendance by replying to this email by March 12th.\n\nBest regards,\nSarah Jenkins\nProject Coordinator",
    "passage_group_id": "p7-single-022",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-004",
    "part": "Part 7",
    "question": "What is the main purpose of this memo?",
    "choices": {
      "A": "To remind staff about remote work tools",
      "B": "To inform staff about a temporary office closure",
      "C": "To schedule a meeting with IT support",
      "D": "To announce a new parking policy"
    },
    "answer": "B",
    "explanation_zh": "備忘錄的主要目的是通知員工辦公室因緊急電力維護而臨時關閉。",
    "skill_tag": "reading_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "closure",
      "maintenance",
      "temporary",
      "remote"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: June 10, 2024\nSubject: Temporary Closure of Main Office\n\nDue to urgent electrical maintenance, the main office will be closed from June 15 to June 17. During this period, all employees must work from home. The cafeteria and parking lot will also be unavailable. Please ensure you have access to remote work tools. For urgent matters, contact IT support via email. The office will reopen on June 18 at 9:00 AM.",
    "passage_group_id": "p7-single-023",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-005",
    "part": "Part 7",
    "question": "How long will the office be closed?",
    "choices": {
      "A": "Three days",
      "B": "One day",
      "C": "Four days",
      "D": "Two days"
    },
    "answer": "A",
    "explanation_zh": "備忘錄明確指出辦公室將從6月15日關閉到6月17日，共計三天。",
    "skill_tag": "reading_detail",
    "difficulty": "A2",
    "vocabulary": [
      "closure",
      "maintenance",
      "temporary",
      "remote"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: June 10, 2024\nSubject: Temporary Closure of Main Office\n\nDue to urgent electrical maintenance, the main office will be closed from June 15 to June 17. During this period, all employees must work from home. The cafeteria and parking lot will also be unavailable. Please ensure you have access to remote work tools. For urgent matters, contact IT support via email. The office will reopen on June 18 at 9:00 AM.",
    "passage_group_id": "p7-single-023",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-006",
    "part": "Part 7",
    "question": "What can be inferred about employees during the closure?",
    "choices": {
      "A": "They are required to work from home",
      "B": "They can use the parking lot as usual",
      "C": "They will need to bring their own lunch",
      "D": "They must visit the office for IT support"
    },
    "answer": "A",
    "explanation_zh": "備忘錄說所有員工必須在家辦公，因此可以推斷員工在關閉期間需要遠程工作。",
    "skill_tag": "reading_inference",
    "difficulty": "A2",
    "vocabulary": [
      "closure",
      "maintenance",
      "temporary",
      "remote"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: June 10, 2024\nSubject: Temporary Closure of Main Office\n\nDue to urgent electrical maintenance, the main office will be closed from June 15 to June 17. During this period, all employees must work from home. The cafeteria and parking lot will also be unavailable. Please ensure you have access to remote work tools. For urgent matters, contact IT support via email. The office will reopen on June 18 at 9:00 AM.",
    "passage_group_id": "p7-single-023",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-007",
    "part": "Part 7",
    "question": "What is the main purpose of this advertisement?",
    "choices": {
      "A": "To sell a used laptop",
      "B": "To offer laptop repair services",
      "C": "To compare different laptop brands",
      "D": "To promote a new laptop model"
    },
    "answer": "A",
    "explanation_zh": "廣告標題為'For Sale'，內容描述了一臺使用僅6個月的筆記本電腦以折扣價出售，並提供了聯繫方式，因此主要目的是出售二手筆記本電腦。選項D（推廣新機型）、B（提供維修服務）和C（比較品牌）均不符合文章主旨。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "high-performance",
      "nearly new",
      "unbeatable price",
      "protective case"
    ],
    "passage": "For Sale: High-Performance Laptop\n\nNearly new, only 6 months old! This powerful laptop features a 15.6-inch Full HD display, an Intel Core i7 processor, 16GB RAM, and a 512GB SSD. Perfect for professionals, gamers, and creative users. Battery life up to 10 hours. Originally purchased for $1,800, now available at the unbeatable price of $1,200. Includes original charger and protective case. 6-month warranty remains valid. Contact Alex at 555-0192 or email alex.tech@example.com. Serious inquiries only, please.",
    "passage_group_id": "p7-single-024",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-008",
    "part": "Part 7",
    "question": "What is the discounted price of the laptop?",
    "choices": {
      "A": "$1,200",
      "B": "$1,000",
      "C": "$1,800",
      "D": "$600"
    },
    "answer": "A",
    "explanation_zh": "文中明確提到'Originally purchased for $1,800, now available at the unbeatable price of $1,200'，因此折扣價為$1,200。選項C是原價，選項B和D未在文中出現。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "originally purchased",
      "discounted price",
      "unbeatable",
      "warranty"
    ],
    "passage": "For Sale: High-Performance Laptop\n\nNearly new, only 6 months old! This powerful laptop features a 15.6-inch Full HD display, an Intel Core i7 processor, 16GB RAM, and a 512GB SSD. Perfect for professionals, gamers, and creative users. Battery life up to 10 hours. Originally purchased for $1,800, now available at the unbeatable price of $1,200. Includes original charger and protective case. 6-month warranty remains valid. Contact Alex at 555-0192 or email alex.tech@example.com. Serious inquiries only, please.",
    "passage_group_id": "p7-single-024",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-009",
    "part": "Part 7",
    "question": "What can be inferred about the seller, Alex?",
    "choices": {
      "A": "Alex is offering a free accessory with the laptop.",
      "B": "Alex likely needs to sell the laptop quickly.",
      "C": "Alex is a professional laptop dealer.",
      "D": "Alex has no knowledge of the laptop's condition."
    },
    "answer": "B",
    "explanation_zh": "賣家提供了大幅折扣（從$1,800降至$1,200），並強調'Serious inquiries only'，暗示賣家希望儘快完成交易。文中未說Alex是專業經銷商（A錯誤），充電器和保護套已包含在內但非免費贈品（C錯誤），且描述詳盡表明瞭解產品狀況（D錯誤）。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "serious inquiries",
      "quickly",
      "condition"
    ],
    "passage": "For Sale: High-Performance Laptop\n\nNearly new, only 6 months old! This powerful laptop features a 15.6-inch Full HD display, an Intel Core i7 processor, 16GB RAM, and a 512GB SSD. Perfect for professionals, gamers, and creative users. Battery life up to 10 hours. Originally purchased for $1,800, now available at the unbeatable price of $1,200. Includes original charger and protective case. 6-month warranty remains valid. Contact Alex at 555-0192 or email alex.tech@example.com. Serious inquiries only, please.",
    "passage_group_id": "p7-single-024",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-010",
    "part": "Part 7",
    "question": "What is the main purpose of this notice?",
    "choices": {
      "A": "To advertise a workshop for professional artists",
      "B": "To inform residents about a new facility and its requirements",
      "C": "To announce a new class on 3D printing",
      "D": "To announce a change in the community center's hours"
    },
    "answer": "B",
    "explanation_zh": "通知的主要目的是向橡樹谷居民介紹新推出的創客空間及其使用要求，包括安全培訓、註冊方式和年齡限制等。選項B最準確地概括了這一主旨。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "Makerspace",
      "orientation",
      "accompanied",
      "prohibit"
    ],
    "passage": "The Oakwood Community Center is pleased to announce the opening of its new Makerspace, a creative workshop area available to all residents of Oakwood. The Makerspace is equipped with 3D printers, sewing machines, and woodworking tools. Access is free, but users must complete a safety orientation session before using any equipment. Orientation sessions are held every Tuesday and Thursday at 6:00 PM and last approximately one hour. To register for an orientation, visit our website at www.oakwoodcommunity.org/makerspace or call (555) 123-4567. Please note that the Makerspace is for personal projects only; commercial use is strictly prohibited. Children under the age of 16 must be accompanied by an adult at all times.",
    "passage_group_id": "p7-single-025",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-011",
    "part": "Part 7",
    "question": "What must a person do before using the Makerspace equipment?",
    "choices": {
      "A": "Submit a project proposal",
      "B": "Pay a usage fee",
      "C": "Attend a safety orientation",
      "D": "Become a member of the community center"
    },
    "answer": "C",
    "explanation_zh": "通知明確指出：'Access is free, but users must complete a safety orientation session before using any equipment.' 因此，使用設備前必須參加安全培訓。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "Makerspace",
      "orientation",
      "accompanied",
      "prohibit"
    ],
    "passage": "The Oakwood Community Center is pleased to announce the opening of its new Makerspace, a creative workshop area available to all residents of Oakwood. The Makerspace is equipped with 3D printers, sewing machines, and woodworking tools. Access is free, but users must complete a safety orientation session before using any equipment. Orientation sessions are held every Tuesday and Thursday at 6:00 PM and last approximately one hour. To register for an orientation, visit our website at www.oakwoodcommunity.org/makerspace or call (555) 123-4567. Please note that the Makerspace is for personal projects only; commercial use is strictly prohibited. Children under the age of 16 must be accompanied by an adult at all times.",
    "passage_group_id": "p7-single-025",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-012",
    "part": "Part 7",
    "question": "What can be inferred about the intended audience for this notice?",
    "choices": {
      "A": "The notice is intended for local residents of all ages",
      "B": "The notice targets only adults over 18",
      "C": "The notice is for people who already own their own equipment",
      "D": "The notice is aimed at professional woodworkers"
    },
    "answer": "A",
    "explanation_zh": "通知提到該空間面向橡樹谷的所有居民（all residents），並對16歲以下兒童有成人陪同的要求，暗示適用人群包括不同年齡段的居民。選項A最符合這一推斷。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "Makerspace",
      "orientation",
      "accompanied",
      "prohibit"
    ],
    "passage": "The Oakwood Community Center is pleased to announce the opening of its new Makerspace, a creative workshop area available to all residents of Oakwood. The Makerspace is equipped with 3D printers, sewing machines, and woodworking tools. Access is free, but users must complete a safety orientation session before using any equipment. Orientation sessions are held every Tuesday and Thursday at 6:00 PM and last approximately one hour. To register for an orientation, visit our website at www.oakwoodcommunity.org/makerspace or call (555) 123-4567. Please note that the Makerspace is for personal projects only; commercial use is strictly prohibited. Children under the age of 16 must be accompanied by an adult at all times.",
    "passage_group_id": "p7-single-025",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-not-005",
    "part": "Part 7",
    "question": "What equipment is NOT mentioned as available in the Makerspace?",
    "choices": {
      "A": "3D printers",
      "B": "Sewing machines",
      "C": "Woodworking tools",
      "D": "Laser cutters"
    },
    "answer": "D",
    "explanation_zh": "公告列出 3D 印表機、縫紉機與木工工具；雷射切割機未被提及。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "equipment",
      "available",
      "workshop"
    ],
    "passage": "The Oakwood Community Center is pleased to announce the opening of its new Makerspace, a creative workshop area available to all residents of Oakwood. The Makerspace is equipped with 3D printers, sewing machines, and woodworking tools. Access is free, but users must complete a safety orientation session before using any equipment. Orientation sessions are held every Tuesday and Thursday at 6:00 PM and last approximately one hour. To register for an orientation, visit our website at www.oakwoodcommunity.org/makerspace or call (555) 123-4567. Please note that the Makerspace is for personal projects only; commercial use is strictly prohibited. Children under the age of 16 must be accompanied by an adult at all times.",
    "passage_group_id": "p7-single-025",
    "passage_group_type": "single",
    "question_order": 4
  },
  {
    "id": "p7-gen-013",
    "part": "Part 7",
    "question": "What is the main topic of the article?",
    "choices": {
      "A": "The leadership style of GreenTech's CEO Sarah Chen",
      "B": "GreenTech Solutions' acquisition of EcoGrid Systems",
      "C": "The growth of the solar energy market in the western US",
      "D": "The financial performance of renewable energy companies"
    },
    "answer": "B",
    "explanation_zh": "文章主要報道了GreenTech Solutions收購EcoGrid Systems這一事件，包括交易金額、時間、目的和預期影響。選項C太寬泛，D和A偏離主題。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "acquisition",
      "renewable",
      "proprietary",
      "integrated"
    ],
    "passage": "On January 15, 2024, GreenTech Solutions, a renewable energy firm based in Austin, Texas, announced its acquisition of EcoGrid Systems, a smaller competitor headquartered in Denver, Colorado. The deal, valued at $120 million, is expected to close by March 2024 pending regulatory approval. GreenTech's CEO, Sarah Chen, stated that the acquisition would strengthen the company's position in the solar energy storage market. EcoGrid's proprietary battery technology, which has been used in over 500 installations across the western United States, will be integrated into GreenTech's existing product line. Industry analysts predict that this move could increase GreenTech's annual revenue by approximately 15% within the next two years. The combined company will have a workforce of nearly 3,000 employees.",
    "passage_group_id": "p7-single-026",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-014",
    "part": "Part 7",
    "question": "Where is EcoGrid Systems located?",
    "choices": {
      "A": "Denver, Colorado",
      "B": "The western United States",
      "C": "Austin, Texas",
      "D": "A city with over 500 installations"
    },
    "answer": "A",
    "explanation_zh": "文章明確提到EcoGrid Systems的總部位於科羅拉多州丹佛市。選項C是GreenTech的所在地，B是EcoGrid技術應用的區域，D錯誤地將安裝數量與地點混淆。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "headquartered",
      "pending",
      "regulatory",
      "workforce"
    ],
    "passage": "On January 15, 2024, GreenTech Solutions, a renewable energy firm based in Austin, Texas, announced its acquisition of EcoGrid Systems, a smaller competitor headquartered in Denver, Colorado. The deal, valued at $120 million, is expected to close by March 2024 pending regulatory approval. GreenTech's CEO, Sarah Chen, stated that the acquisition would strengthen the company's position in the solar energy storage market. EcoGrid's proprietary battery technology, which has been used in over 500 installations across the western United States, will be integrated into GreenTech's existing product line. Industry analysts predict that this move could increase GreenTech's annual revenue by approximately 15% within the next two years. The combined company will have a workforce of nearly 3,000 employees.",
    "passage_group_id": "p7-single-026",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-015",
    "part": "Part 7",
    "question": "What is most likely to happen after the acquisition is completed?",
    "choices": {
      "A": "GreenTech will incorporate EcoGrid's battery technology into its products.",
      "B": "GreenTech's revenue will drop due to the cost of the acquisition.",
      "C": "EcoGrid will change its name to GreenTech Solutions.",
      "D": "GreenTech will immediately close all of EcoGrid's facilities."
    },
    "answer": "A",
    "explanation_zh": "文章指出EcoGrid的專有電池技術將被整合到GreenTech的現有產品線中。選項D和C沒有依據，B與分析師預測的15%收入增長相反。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "analysts",
      "integrated",
      "proprietary",
      "revenue"
    ],
    "passage": "On January 15, 2024, GreenTech Solutions, a renewable energy firm based in Austin, Texas, announced its acquisition of EcoGrid Systems, a smaller competitor headquartered in Denver, Colorado. The deal, valued at $120 million, is expected to close by March 2024 pending regulatory approval. GreenTech's CEO, Sarah Chen, stated that the acquisition would strengthen the company's position in the solar energy storage market. EcoGrid's proprietary battery technology, which has been used in over 500 installations across the western United States, will be integrated into GreenTech's existing product line. Industry analysts predict that this move could increase GreenTech's annual revenue by approximately 15% within the next two years. The combined company will have a workforce of nearly 3,000 employees.",
    "passage_group_id": "p7-single-026",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-vc-011",
    "part": "Part 7",
    "question": "In the text, the word \"pending\" is closest in meaning to",
    "choices": {
      "A": "avoiding",
      "B": "replacing",
      "C": "awaiting",
      "D": "granting"
    },
    "answer": "C",
    "explanation_zh": "pending 意為「等待…期間、尚待」。'expected to close by March 2024 pending regulatory approval' = 預計於 2024 年 3 月完成交易，但仍待主管機關核准。",
    "skill_tag": "reading_vocab",
    "difficulty": "B2",
    "vocabulary": [
      "pending"
    ],
    "passage": "On January 15, 2024, GreenTech Solutions, a renewable energy firm based in Austin, Texas, announced its acquisition of EcoGrid Systems, a smaller competitor headquartered in Denver, Colorado. The deal, valued at $120 million, is expected to close by March 2024 pending regulatory approval. GreenTech's CEO, Sarah Chen, stated that the acquisition would strengthen the company's position in the solar energy storage market. EcoGrid's proprietary battery technology, which has been used in over 500 installations across the western United States, will be integrated into GreenTech's existing product line. Industry analysts predict that this move could increase GreenTech's annual revenue by approximately 15% within the next two years. The combined company will have a workforce of nearly 3,000 employees.",
    "passage_group_id": "p7-single-026",
    "passage_group_type": "single",
    "question_order": 4
  },
  {
    "id": "p6-gen-001",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "update",
      "B": "updating",
      "C": "updated",
      "D": "updates"
    },
    "answer": "A",
    "explanation_zh": "空白 (A) 需要一個名詞作賓語，'update' 是名詞，意為'更新'，符合語境。'updating' 是動名詞，'updated' 是過去分詞或形容詞，'updates' 是動詞第三人稱單數或名詞複數，均不符合語法要求。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "effective",
      "employees",
      "flexibility",
      "collaboration"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important ____(A)____ to our company's remote work policy, effective March 1st. All employees are now required to work from the office at least three days per week. ____(B)____, we understand that flexibility is important, so you may choose which days you come in. ____(C)____\n\nPlease note that this change applies to all full-time staff in the Marketing and Sales departments. If you have any concerns about this new arrangement, please speak with your direct supervisor. We believe this policy will improve collaboration and team communication. We thank you ____(D)____ your cooperation.",
    "passage_group_id": "p6-001",
    "question_order": 1
  },
  {
    "id": "p6-gen-002",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "Therefore",
      "B": "However",
      "C": "Moreover",
      "D": "Consequently"
    },
    "answer": "B",
    "explanation_zh": "空白 (B) 需要一個表示轉折的邏輯連接詞。前句提到新規定要求每週至少三天到辦公室，後句說'理解靈活性很重要，你可以選擇哪幾天來'，這是對前句的讓步和轉折，因此'However'最合適。'Therefore'和'Consequently'表示因果關係，'Moreover'表示遞進，均不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "effective",
      "employees",
      "flexibility",
      "collaboration"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important ____(A)____ to our company's remote work policy, effective March 1st. All employees are now required to work from the office at least three days per week. ____(B)____, we understand that flexibility is important, so you may choose which days you come in. ____(C)____\n\nPlease note that this change applies to all full-time staff in the Marketing and Sales departments. If you have any concerns about this new arrangement, please speak with your direct supervisor. We believe this policy will improve collaboration and team communication. We thank you ____(D)____ your cooperation.",
    "passage_group_id": "p6-001",
    "question_order": 2
  },
  {
    "id": "p6-gen-004",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "for",
      "B": "with",
      "C": "to",
      "D": "by"
    },
    "answer": "A",
    "explanation_zh": "空白 (D) 需要一個介詞構成固定搭配。'thank you for'是標準用法，意為'感謝你的...'，符合'感謝你的合作'的語境。'thank you with'、'thank you to'、'thank you by'都不是正確的搭配。",
    "skill_tag": "preposition",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "effective",
      "employees",
      "flexibility",
      "collaboration"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important ____(A)____ to our company's remote work policy, effective March 1st. All employees are now required to work from the office at least three days per week. ____(B)____, we understand that flexibility is important, so you may choose which days you come in. ____(C)____\n\nPlease note that this change applies to all full-time staff in the Marketing and Sales departments. If you have any concerns about this new arrangement, please speak with your direct supervisor. We believe this policy will improve collaboration and team communication. We thank you ____(D)____ your cooperation.",
    "passage_group_id": "p6-001",
    "question_order": 4
  },
  {
    "id": "p6-si-001",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "A scheduling template for selecting your office days will be shared by the end of this week.",
      "B": "Our company was founded more than twenty years ago.",
      "C": "The cafeteria menu will also be updated next month.",
      "D": "Several employees have already resigned this quarter."
    },
    "answer": "A",
    "explanation_zh": "空格前一句說明員工可自行選擇進辦公室的日子，正解承接此脈絡，說明「如何安排這些日子」的後續工具。其餘選項與遠距政策的主題無關，或文中沒有任何根據。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "scheduling template",
      "office days",
      "share"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important ____(A)____ to our company's remote work policy, effective March 1st. All employees are now required to work from the office at least three days per week. ____(B)____, we understand that flexibility is important, so you may choose which days you come in. ____(C)____\n\nPlease note that this change applies to all full-time staff in the Marketing and Sales departments. If you have any concerns about this new arrangement, please speak with your direct supervisor. We believe this policy will improve collaboration and team communication. We thank you ____(D)____ your cooperation.",
    "passage_group_id": "p6-001",
    "question_order": 3
  },
  {
    "id": "p6-gen-005",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "adjustment",
      "B": "confusion",
      "C": "complaint",
      "D": "delay"
    },
    "answer": "A",
    "explanation_zh": "空白A需要填寫一個名詞，表示對營業時間的改變。'adjustment'（調整）是中性且禮貌的詞彙，適合客戶通知語境。'confusion'（困惑）不合邏輯，'complaint'（投訴）語氣負面，'delay'（延遲）不表示整體時間的改變。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "renovation",
      "extend",
      "apologize",
      "inconvenience",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, we will open one hour later than usual. This change is necessary due to ongoing renovation work. ____(B)____ ____(C)____, we will extend our closing time to ensure you still have enough time to shop. The new hours will be in effect from December 15th to January 5th. We apologize for any inconvenience this may cause. If you ____(D)____ have any questions, please do not hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-002",
    "question_order": 1
  },
  {
    "id": "p6-gen-006",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "Because",
      "B": "However",
      "C": "Therefore",
      "D": "Meanwhile"
    },
    "answer": "B",
    "explanation_zh": "空白B需要一個表示轉折或對比的連接詞。前文說開門時間變晚（不利），後文說延長關門時間（補償），因此'However'（然而）最合適。'Because'（因為）表原因，'Therefore'（因此）表結果，'Meanwhile'（同時）表時間，邏輯都不符。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "renovation",
      "extend",
      "apologize",
      "inconvenience",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, we will open one hour later than usual. This change is necessary due to ongoing renovation work. ____(B)____ ____(C)____, we will extend our closing time to ensure you still have enough time to shop. The new hours will be in effect from December 15th to January 5th. We apologize for any inconvenience this may cause. If you ____(D)____ have any questions, please do not hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-002",
    "question_order": 3
  },
  {
    "id": "p6-gen-008",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "do",
      "B": "did",
      "C": "will",
      "D": "would"
    },
    "answer": "A",
    "explanation_zh": "空白D需要正確的助動詞。句子是條件句'If you have any questions'，這裡使用一般現在時，所以助動詞應為'do'，構成'do have'表示強調。'did'是過去式，'will'表示將來，'would'表示虛擬語氣，均不符合語境。",
    "skill_tag": "tense",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "renovation",
      "extend",
      "apologize",
      "inconvenience",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, we will open one hour later than usual. This change is necessary due to ongoing renovation work. ____(B)____ ____(C)____, we will extend our closing time to ensure you still have enough time to shop. The new hours will be in effect from December 15th to January 5th. We apologize for any inconvenience this may cause. If you ____(D)____ have any questions, please do not hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-002",
    "question_order": 4
  },
  {
    "id": "p6-si-002",
    "part": "Part 6",
    "question": "____(B)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Our online store will be closed permanently.",
      "B": "The renovation will give the store a more spacious, modern layout.",
      "C": "We thank you for attending last year's grand opening.",
      "D": "All employees must submit timesheets by Friday."
    },
    "answer": "B",
    "explanation_zh": "空格前一句提到「裝修工程」，正解進一步說明裝修帶來的好處，語意連貫。(A) 與信件安撫顧客的語氣矛盾，(C)(D) 與營業時間調整無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "renovation",
      "spacious",
      "layout"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, we will open one hour later than usual. This change is necessary due to ongoing renovation work. ____(B)____ ____(C)____, we will extend our closing time to ensure you still have enough time to shop. The new hours will be in effect from December 15th to January 5th. We apologize for any inconvenience this may cause. If you ____(D)____ have any questions, please do not hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-002",
    "question_order": 2
  },
  {
    "id": "p6-gen-009",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "update",
      "B": "updates",
      "C": "updated",
      "D": "updating"
    },
    "answer": "A",
    "explanation_zh": "此處需要一個名詞，與 'an important' 搭配。'update' 作為名詞表示'更新'，符合語境。'updates' 是複數形式，與 'an' 不搭配；'updated' 是形容詞或過去分詞；'updating' 是動名詞，均不合適。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "remote",
      "supervisor",
      "compliance",
      "productivity"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you about an important ____(A)____ to our company’s remote work policy, effective from March 1, 2024. ____(B)____, all employees working from home must submit a weekly progress report to their direct supervisor. This report should include a summary of completed tasks and any challenges encountered. ____(C)____ In addition, we are requiring everyone to attend a brief training session on the new reporting system on February 25. Please note that failure to comply with these new guidelines may result in a review of your remote work arrangement. We believe these changes will improve communication and productivity. Thank you for your cooperation ____(D)____ this transition.\n\nBest regards,\nJane Smith\nHR Department",
    "passage_group_id": "p6-003",
    "question_order": 1
  },
  {
    "id": "p6-gen-010",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Specifically",
      "C": "Therefore",
      "D": "Furthermore"
    },
    "answer": "B",
    "explanation_zh": "前文提到政策更新，後文具體說明新要求。'Specifically' 表示'具體來說'，用於引出細節，符合邏輯關係。'However' 表轉折，'Therefore' 表結果，'Furthermore' 表遞進，均不符合此處上下文。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "remote",
      "supervisor",
      "compliance",
      "productivity"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you about an important ____(A)____ to our company’s remote work policy, effective from March 1, 2024. ____(B)____, all employees working from home must submit a weekly progress report to their direct supervisor. This report should include a summary of completed tasks and any challenges encountered. ____(C)____ In addition, we are requiring everyone to attend a brief training session on the new reporting system on February 25. Please note that failure to comply with these new guidelines may result in a review of your remote work arrangement. We believe these changes will improve communication and productivity. Thank you for your cooperation ____(D)____ this transition.\n\nBest regards,\nJane Smith\nHR Department",
    "passage_group_id": "p6-003",
    "question_order": 2
  },
  {
    "id": "p6-gen-012",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "during",
      "B": "while",
      "C": "through",
      "D": "throughout"
    },
    "answer": "A",
    "explanation_zh": "'cooperation during this transition' 表示'在此過渡期間的合作'。'during' 表示在某個時間段內，符合語境。'while' 是連詞，後面需接從句；'through' 強調從頭到尾；'throughout' 強調整個期間，但不如 'during' 常見於此類表達。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "remote",
      "supervisor",
      "compliance",
      "productivity"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you about an important ____(A)____ to our company’s remote work policy, effective from March 1, 2024. ____(B)____, all employees working from home must submit a weekly progress report to their direct supervisor. This report should include a summary of completed tasks and any challenges encountered. ____(C)____ In addition, we are requiring everyone to attend a brief training session on the new reporting system on February 25. Please note that failure to comply with these new guidelines may result in a review of your remote work arrangement. We believe these changes will improve communication and productivity. Thank you for your cooperation ____(D)____ this transition.\n\nBest regards,\nJane Smith\nHR Department",
    "passage_group_id": "p6-003",
    "question_order": 4
  },
  {
    "id": "p6-si-003",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The company picnic has been moved to September.",
      "B": "Supervisors will be hired from outside agencies.",
      "C": "Reports must be submitted no later than 5 P.M. every Friday.",
      "D": "Our clients have praised the new website design."
    },
    "answer": "C",
    "explanation_zh": "前文要求遠距員工每週繳交進度報告並說明內容，正解補上「繳交期限」，是同一規範的自然延伸。其他選項都偏離報告制度的主題。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "submit",
      "no later than",
      "deadline"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you about an important ____(A)____ to our company’s remote work policy, effective from March 1, 2024. ____(B)____, all employees working from home must submit a weekly progress report to their direct supervisor. This report should include a summary of completed tasks and any challenges encountered. ____(C)____ In addition, we are requiring everyone to attend a brief training session on the new reporting system on February 25. Please note that failure to comply with these new guidelines may result in a review of your remote work arrangement. We believe these changes will improve communication and productivity. Thank you for your cooperation ____(D)____ this transition.\n\nBest regards,\nJane Smith\nHR Department",
    "passage_group_id": "p6-003",
    "question_order": 3
  },
  {
    "id": "p6-gen-013",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "requirement",
      "B": "suggestion",
      "C": "option",
      "D": "recommendation"
    },
    "answer": "A",
    "explanation_zh": "根據上下文，這是一項新政策，因此必須使用'requirement'（要求）來表示強制性規定。'Suggestion'（建議）、'option'（選擇）和'recommendation'（推薦）都表示非強制性，與政策更新的語境不符。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "expense",
      "streamline",
      "reimbursement",
      "transition",
      "portal"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important change to our expense reporting policy. Starting July 1st, all travel-related expenses must be submitted within 14 days of the trip's completion. This new ____(A)____ is designed to streamline our accounting processes and reduce delays in reimbursements. ____(B)____\n\n____(C)____, we are introducing a digital submission system for all requests. You will no longer need to print and sign paper forms. Please ensure you are familiar with the new online portal, which will be available starting next Monday.\n\nWe understand that adjustments may take some time. To ease the transition, training sessions have ____(D)____ scheduled for the last week of June. Your department manager will provide the specific time and location.\n\nThank you for your cooperation.\n\nBest regards,\nSarah Mitchell\nFinance Director",
    "passage_group_id": "p6-004",
    "question_order": 1
  },
  {
    "id": "p6-gen-014",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "However",
      "B": "Furthermore",
      "C": "Therefore",
      "D": "Nevertheless"
    },
    "answer": "B",
    "explanation_zh": "這裡需要表示遞進關係的連接詞。前面提到新政策，後面介紹另一個相關變更（引入數字系統），'Furthermore'（此外）表示添加更多信息。'However'和'Nevertheless'表示轉折，'Therefore'表示因果，均不符合邏輯關係。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "expense",
      "streamline",
      "reimbursement",
      "transition",
      "portal"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important change to our expense reporting policy. Starting July 1st, all travel-related expenses must be submitted within 14 days of the trip's completion. This new ____(A)____ is designed to streamline our accounting processes and reduce delays in reimbursements. ____(B)____\n\n____(C)____, we are introducing a digital submission system for all requests. You will no longer need to print and sign paper forms. Please ensure you are familiar with the new online portal, which will be available starting next Monday.\n\nWe understand that adjustments may take some time. To ease the transition, training sessions have ____(D)____ scheduled for the last week of June. Your department manager will provide the specific time and location.\n\nThank you for your cooperation.\n\nBest regards,\nSarah Mitchell\nFinance Director",
    "passage_group_id": "p6-004",
    "question_order": 3
  },
  {
    "id": "p6-gen-016",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "be",
      "B": "being",
      "C": "been",
      "D": "to be"
    },
    "answer": "C",
    "explanation_zh": "這裡需要完成時態的被動語態。'have been scheduled'是現在完成時的被動形式，表示'已經被安排'。'Be'是原形，'being'是現在分詞，'to be'是不定式，均不能與'have'構成正確的完成時態。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "expense",
      "streamline",
      "reimbursement",
      "transition",
      "portal"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important change to our expense reporting policy. Starting July 1st, all travel-related expenses must be submitted within 14 days of the trip's completion. This new ____(A)____ is designed to streamline our accounting processes and reduce delays in reimbursements. ____(B)____\n\n____(C)____, we are introducing a digital submission system for all requests. You will no longer need to print and sign paper forms. Please ensure you are familiar with the new online portal, which will be available starting next Monday.\n\nWe understand that adjustments may take some time. To ease the transition, training sessions have ____(D)____ scheduled for the last week of June. Your department manager will provide the specific time and location.\n\nThank you for your cooperation.\n\nBest regards,\nSarah Mitchell\nFinance Director",
    "passage_group_id": "p6-004",
    "question_order": 4
  },
  {
    "id": "p6-si-004",
    "part": "Part 6",
    "question": "____(B)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The company will relocate its headquarters next year.",
      "B": "Travel to overseas branches is no longer permitted.",
      "C": "Receipts older than five years may be discarded.",
      "D": "Late submissions will require written approval from a department head."
    },
    "answer": "D",
    "explanation_zh": "前文規定差旅費須在 14 天內申報，正解說明「逾期申報的後果」，直接延續新規定。其餘選項與費用申報流程無關或無文中依據。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "late submission",
      "written approval",
      "department head"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of an important change to our expense reporting policy. Starting July 1st, all travel-related expenses must be submitted within 14 days of the trip's completion. This new ____(A)____ is designed to streamline our accounting processes and reduce delays in reimbursements. ____(B)____\n\n____(C)____, we are introducing a digital submission system for all requests. You will no longer need to print and sign paper forms. Please ensure you are familiar with the new online portal, which will be available starting next Monday.\n\nWe understand that adjustments may take some time. To ease the transition, training sessions have ____(D)____ scheduled for the last week of June. Your department manager will provide the specific time and location.\n\nThank you for your cooperation.\n\nBest regards,\nSarah Mitchell\nFinance Director",
    "passage_group_id": "p6-004",
    "question_order": 2
  },
  {
    "id": "p7-gen-016",
    "part": "Part 7",
    "question": "What is the main purpose of this email?",
    "choices": {
      "A": "To request budget estimates from departments",
      "B": "To inform about a change in meeting schedule",
      "C": "To introduce a new project timeline",
      "D": "To announce the executive team's quarterly review"
    },
    "answer": "B",
    "explanation_zh": "這封郵件的主要目的是通知團隊會議時間已更改。郵件開頭即說明原定於3月10日週一的會議已重新安排，並提供了新的日期和時間。選項C（介紹新項目時間表）、A（要求提供預算估算）和D（宣佈高管團隊季度回顧）都是郵件中提到但並非主旨的細節。",
    "skill_tag": "reading_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "rescheduled",
      "quarterly",
      "preliminary",
      "attendance"
    ],
    "passage": "Subject: Project Kickoff Meeting Rescheduled\n\nDear Team,\n\nPlease be advised that our project kickoff meeting, originally scheduled for 10:00 AM on Monday, March 10th, has been rescheduled. The new meeting will take place at 2:00 PM on Wednesday, March 12th, in Conference Room B. The change is due to a scheduling conflict with the executive team's quarterly review.\n\nWe will finalize the project timeline and assign initial tasks. Please bring your department's preliminary budget estimates. For those unable to attend in person, a video conference link will be provided. Please confirm your attendance by Tuesday, March 11th.\n\nBest regards,\n\nSarah Jenkins\nProject Coordinator",
    "passage_group_id": "p7-single-027",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-017",
    "part": "Part 7",
    "question": "What is the new time and location for the meeting?",
    "choices": {
      "A": "10:00 AM on Wednesday, March 12th in Conference Room B",
      "B": "10:00 AM on Monday, March 10th in Conference Room A",
      "C": "2:00 PM on Tuesday, March 11th via video conference",
      "D": "2:00 PM on Wednesday, March 12th in Conference Room B"
    },
    "answer": "D",
    "explanation_zh": "郵件中明確指出新會議時間為3月12日週三下午2:00，地點在D會議室。選項B是原會議時間和地點，選項C中的日期（3月11日週二）是確認出席的截止日期，選項A的時間（上午10:00）不正確。",
    "skill_tag": "reading_detail",
    "difficulty": "A2",
    "vocabulary": [
      "rescheduled",
      "quarterly",
      "preliminary",
      "attendance"
    ],
    "passage": "Subject: Project Kickoff Meeting Rescheduled\n\nDear Team,\n\nPlease be advised that our project kickoff meeting, originally scheduled for 10:00 AM on Monday, March 10th, has been rescheduled. The new meeting will take place at 2:00 PM on Wednesday, March 12th, in Conference Room B. The change is due to a scheduling conflict with the executive team's quarterly review.\n\nWe will finalize the project timeline and assign initial tasks. Please bring your department's preliminary budget estimates. For those unable to attend in person, a video conference link will be provided. Please confirm your attendance by Tuesday, March 11th.\n\nBest regards,\n\nSarah Jenkins\nProject Coordinator",
    "passage_group_id": "p7-single-027",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-018",
    "part": "Part 7",
    "question": "What can be inferred about the recipients of this email?",
    "choices": {
      "A": "They are responsible for providing budget estimates.",
      "B": "They are all able to attend the meeting in person.",
      "C": "They are members of the executive team.",
      "D": "They have already confirmed their attendance."
    },
    "answer": "A",
    "explanation_zh": "郵件要求收件人攜帶部門初步預算估算，因此可以推斷他們負責提供這些信息。選項B錯誤，因為郵件提到遠程參會選項，暗示並非所有人都能現場出席。選項D錯誤，因為郵件要求收件人確認出席，說明尚未確認。選項C錯誤，因為高管團隊是導致會議改期的原因，收件人並非高管團隊成員。",
    "skill_tag": "reading_inference",
    "difficulty": "A2",
    "vocabulary": [
      "rescheduled",
      "quarterly",
      "preliminary",
      "attendance"
    ],
    "passage": "Subject: Project Kickoff Meeting Rescheduled\n\nDear Team,\n\nPlease be advised that our project kickoff meeting, originally scheduled for 10:00 AM on Monday, March 10th, has been rescheduled. The new meeting will take place at 2:00 PM on Wednesday, March 12th, in Conference Room B. The change is due to a scheduling conflict with the executive team's quarterly review.\n\nWe will finalize the project timeline and assign initial tasks. Please bring your department's preliminary budget estimates. For those unable to attend in person, a video conference link will be provided. Please confirm your attendance by Tuesday, March 11th.\n\nBest regards,\n\nSarah Jenkins\nProject Coordinator",
    "passage_group_id": "p7-single-027",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-019",
    "part": "Part 7",
    "question": "What is the main purpose of this memo?",
    "choices": {
      "A": "To report an elevator malfunction",
      "B": "To announce a new office policy",
      "C": "To schedule a staff meeting",
      "D": "To inform staff about a temporary office closure"
    },
    "answer": "D",
    "explanation_zh": "這封備忘錄的主要目的是通知所有員工辦公室將在6月22日臨時關閉，以進行電梯維護。選項B、C和A均與備忘錄內容無關，因此正確答案是D。",
    "skill_tag": "reading_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "closure",
      "maintenance",
      "inaccessible"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: June 15, 2024\nSubject: Temporary Office Closure – Elevator Maintenance\n\nPlease be advised that the office building will be closed on Saturday, June 22, 2024, from 8:00 AM to 6:00 PM. This closure is necessary to perform scheduled maintenance on the elevator system. During this time, all office areas, including the lobby and the second floor meeting rooms, will be inaccessible. Staff are asked to work from home on this day. Access to the building will be restricted to maintenance personnel only. Any urgent deliveries should be rescheduled for the following Monday. We apologize for any inconvenience this may cause.",
    "passage_group_id": "p7-single-028",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-020",
    "part": "Part 7",
    "question": "When will the office be closed?",
    "choices": {
      "A": "On Saturday, June 22, 2024",
      "B": "On Friday, June 21, 2024",
      "C": "On Monday, June 24, 2024",
      "D": "On Sunday, June 23, 2024"
    },
    "answer": "A",
    "explanation_zh": "備忘錄明確提到辦公室關閉日期是2024年6月22日星期六。選項D、C和B的日期與原文不符，因此正確答案是A。",
    "skill_tag": "reading_detail",
    "difficulty": "A2",
    "vocabulary": [
      "scheduled",
      "restricted",
      "rescheduled",
      "inconvenience"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: June 15, 2024\nSubject: Temporary Office Closure – Elevator Maintenance\n\nPlease be advised that the office building will be closed on Saturday, June 22, 2024, from 8:00 AM to 6:00 PM. This closure is necessary to perform scheduled maintenance on the elevator system. During this time, all office areas, including the lobby and the second floor meeting rooms, will be inaccessible. Staff are asked to work from home on this day. Access to the building will be restricted to maintenance personnel only. Any urgent deliveries should be rescheduled for the following Monday. We apologize for any inconvenience this may cause.",
    "passage_group_id": "p7-single-028",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-021",
    "part": "Part 7",
    "question": "What can be inferred about the staff's work schedule on June 22?",
    "choices": {
      "A": "They will have a day off without pay",
      "B": "They are expected to work remotely",
      "C": "They need to handle urgent deliveries personally",
      "D": "They must report to the second floor meeting rooms"
    },
    "answer": "B",
    "explanation_zh": "備忘錄要求員工當天在家工作，因此可以推斷他們被期望遠程辦公。選項A與原文不符，D和C與內容矛盾，因此正確答案是B。",
    "skill_tag": "reading_inference",
    "difficulty": "A2",
    "vocabulary": [
      "infer",
      "remote",
      "inaccessible",
      "restricted"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: June 15, 2024\nSubject: Temporary Office Closure – Elevator Maintenance\n\nPlease be advised that the office building will be closed on Saturday, June 22, 2024, from 8:00 AM to 6:00 PM. This closure is necessary to perform scheduled maintenance on the elevator system. During this time, all office areas, including the lobby and the second floor meeting rooms, will be inaccessible. Staff are asked to work from home on this day. Access to the building will be restricted to maintenance personnel only. Any urgent deliveries should be rescheduled for the following Monday. We apologize for any inconvenience this may cause.",
    "passage_group_id": "p7-single-028",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-022",
    "part": "Part 7",
    "question": "What is the main purpose of this advertisement?",
    "choices": {
      "A": "To provide instructions on setting up a projector",
      "B": "To promote the sale of a 4K projector at a discount",
      "C": "To compare different projector models",
      "D": "To announce a new technology for streaming services"
    },
    "answer": "B",
    "explanation_zh": "廣告的主要目的是宣傳VisionMax 4K投影儀的促銷活動，強調其特價$299（原價$499），並提供購買信息。選項D過於寬泛，C和A與廣告內容不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "upgrade",
      "introductory",
      "resolution",
      "warranty"
    ],
    "passage": "Upgrade your home entertainment with the VisionMax 4K Ultra HD Projector, now available at a special introductory price of $299 (regularly $499). This compact projector delivers stunning 4K resolution with built-in Wi-Fi and Bluetooth connectivity, allowing you to stream directly from your favorite apps. The included 100-inch screen and adjustable stand make setup effortless. Enjoy a 2-year warranty and free shipping. Offer valid until March 31st. Contact sales@visionmax.com or call 1-800-555-0199. Limited stock available—order now!",
    "passage_group_id": "p7-single-029",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-023",
    "part": "Part 7",
    "question": "What is included with the purchase of the projector?",
    "choices": {
      "A": "A 100-inch screen and adjustable stand",
      "B": "A Bluetooth speaker",
      "C": "A free streaming subscription",
      "D": "A 3-year warranty"
    },
    "answer": "A",
    "explanation_zh": "廣告中提到'The included 100-inch screen and adjustable stand make setup effortless'，因此A項正確。C、D、B項在文中未提及或與事實不符。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "included",
      "setup",
      "effortless",
      "warranty"
    ],
    "passage": "Upgrade your home entertainment with the VisionMax 4K Ultra HD Projector, now available at a special introductory price of $299 (regularly $499). This compact projector delivers stunning 4K resolution with built-in Wi-Fi and Bluetooth connectivity, allowing you to stream directly from your favorite apps. The included 100-inch screen and adjustable stand make setup effortless. Enjoy a 2-year warranty and free shipping. Offer valid until March 31st. Contact sales@visionmax.com or call 1-800-555-0199. Limited stock available—order now!",
    "passage_group_id": "p7-single-029",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-024",
    "part": "Part 7",
    "question": "What can be inferred about the seller?",
    "choices": {
      "A": "They are trying to clear out old inventory",
      "B": "They expect high demand due to limited stock",
      "C": "They have been selling projectors for many years",
      "D": "They offer installation services for an extra fee"
    },
    "answer": "B",
    "explanation_zh": "廣告末尾提到'Limited stock available—order now!'，暗示庫存有限，預計需求較高，因此B項正確。A項文中未提及舊庫存；D項未提安裝費；C項無公司歷史信息。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "limited",
      "stock",
      "demand",
      "inventory"
    ],
    "passage": "Upgrade your home entertainment with the VisionMax 4K Ultra HD Projector, now available at a special introductory price of $299 (regularly $499). This compact projector delivers stunning 4K resolution with built-in Wi-Fi and Bluetooth connectivity, allowing you to stream directly from your favorite apps. The included 100-inch screen and adjustable stand make setup effortless. Enjoy a 2-year warranty and free shipping. Offer valid until March 31st. Contact sales@visionmax.com or call 1-800-555-0199. Limited stock available—order now!",
    "passage_group_id": "p7-single-029",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-vc-012",
    "part": "Part 7",
    "question": "In the text, the word \"introductory\" is closest in meaning to",
    "choices": {
      "A": "negotiable",
      "B": "refundable",
      "C": "wholesale",
      "D": "initial"
    },
    "answer": "D",
    "explanation_zh": "introductory price 意為「上市初期的優惠價格」，與 initial（最初的）最接近。指產品剛推出時的限時特價，與可退費或批發價無關。",
    "skill_tag": "reading_vocab",
    "difficulty": "B2",
    "vocabulary": [
      "introductory"
    ],
    "passage": "Upgrade your home entertainment with the VisionMax 4K Ultra HD Projector, now available at a special introductory price of $299 (regularly $499). This compact projector delivers stunning 4K resolution with built-in Wi-Fi and Bluetooth connectivity, allowing you to stream directly from your favorite apps. The included 100-inch screen and adjustable stand make setup effortless. Enjoy a 2-year warranty and free shipping. Offer valid until March 31st. Contact sales@visionmax.com or call 1-800-555-0199. Limited stock available—order now!",
    "passage_group_id": "p7-single-029",
    "passage_group_type": "single",
    "question_order": 4
  },
  {
    "id": "p7-gen-025",
    "part": "Part 7",
    "question": "What is the main purpose of this notice?",
    "choices": {
      "A": "To advertise a catering service",
      "B": "To announce a new community event",
      "C": "To request donations for the community center",
      "D": "To inform the public about a room for rent"
    },
    "answer": "D",
    "explanation_zh": "這則通知的主要目的是告知公眾社區中心的新多功能廳可供公眾使用，並詳細說明了如何預訂、使用條件及聯繫方式，因此選項D“告知公眾一個可租用的房間”最符合。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "multipurpose",
      "accommodate",
      "refundable",
      "deposit"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the availability of its new Multipurpose Room for public use. This room, which can accommodate up to 50 people, is ideal for meetings, workshops, and small social gatherings. It is equipped with a projector, a whiteboard, and free Wi-Fi. To reserve the room, individuals or groups must submit an application form at least two weeks in advance. A refundable deposit of $100 is required to secure the booking. The room is available Monday through Saturday from 8:00 AM to 9:00 PM. Please note that no food or drinks are allowed inside the room. For more information or to obtain an application form, please visit the community center's front desk or call (555) 123-4567.",
    "passage_group_id": "p7-single-030",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-026",
    "part": "Part 7",
    "question": "What is required to reserve the room?",
    "choices": {
      "A": "A completed application form and a deposit",
      "B": "Proof of membership at the community center",
      "C": "A reservation made at least one week in advance",
      "D": "A non-refundable fee of $100"
    },
    "answer": "A",
    "explanation_zh": "通知中明確說明“To reserve the room, individuals or groups must submit an application form at least two weeks in advance. A refundable deposit of $100 is required”，因此預訂房間需要提交申請表和押金，選項A正確。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "submit",
      "application",
      "secure",
      "booking"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the availability of its new Multipurpose Room for public use. This room, which can accommodate up to 50 people, is ideal for meetings, workshops, and small social gatherings. It is equipped with a projector, a whiteboard, and free Wi-Fi. To reserve the room, individuals or groups must submit an application form at least two weeks in advance. A refundable deposit of $100 is required to secure the booking. The room is available Monday through Saturday from 8:00 AM to 9:00 PM. Please note that no food or drinks are allowed inside the room. For more information or to obtain an application form, please visit the community center's front desk or call (555) 123-4567.",
    "passage_group_id": "p7-single-030",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-027",
    "part": "Part 7",
    "question": "Which of the following can be inferred about the intended audience of this notice?",
    "choices": {
      "A": "The notice is for students who need a quiet study room",
      "B": "The notice is aimed at professional event planners only",
      "C": "The notice is intended for local residents and community groups",
      "D": "The notice is for businesses looking to rent office space"
    },
    "answer": "C",
    "explanation_zh": "通知提到房間適合“meetings, workshops, and small social gatherings”，並且來自社區中心，面向公眾開放，因此可以推斷目標受眾是當地居民和社區團體，選項C最合理。其他選項範圍過窄或與通知內容不符。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "intended",
      "audience",
      "gatherings"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the availability of its new Multipurpose Room for public use. This room, which can accommodate up to 50 people, is ideal for meetings, workshops, and small social gatherings. It is equipped with a projector, a whiteboard, and free Wi-Fi. To reserve the room, individuals or groups must submit an application form at least two weeks in advance. A refundable deposit of $100 is required to secure the booking. The room is available Monday through Saturday from 8:00 AM to 9:00 PM. Please note that no food or drinks are allowed inside the room. For more information or to obtain an application form, please visit the community center's front desk or call (555) 123-4567.",
    "passage_group_id": "p7-single-030",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-not-006",
    "part": "Part 7",
    "question": "What is NOT mentioned as being provided in the Multipurpose Room?",
    "choices": {
      "A": "A sound system",
      "B": "A projector",
      "C": "Free Wi-Fi",
      "D": "A whiteboard"
    },
    "answer": "A",
    "explanation_zh": "房間配備投影機、白板與免費 Wi-Fi；音響系統未被提及。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "multipurpose",
      "equipped",
      "provide"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the availability of its new Multipurpose Room for public use. This room, which can accommodate up to 50 people, is ideal for meetings, workshops, and small social gatherings. It is equipped with a projector, a whiteboard, and free Wi-Fi. To reserve the room, individuals or groups must submit an application form at least two weeks in advance. A refundable deposit of $100 is required to secure the booking. The room is available Monday through Saturday from 8:00 AM to 9:00 PM. Please note that no food or drinks are allowed inside the room. For more information or to obtain an application form, please visit the community center's front desk or call (555) 123-4567.",
    "passage_group_id": "p7-single-030",
    "passage_group_type": "single",
    "question_order": 4
  },
  {
    "id": "p7-gen-028",
    "part": "Part 7",
    "question": "What is the main topic of the article?",
    "choices": {
      "A": "The acquisition of DataStream Analytics by Apex Digital Solutions",
      "B": "The launch of a new product by CloudSphere",
      "C": "A decline in Apex Digital Solutions' stock price",
      "D": "The expansion of DataStream Analytics in the healthcare sector"
    },
    "answer": "A",
    "explanation_zh": "文章主要報道了Apex Digital Solutions收購DataStream Analytics的事件，包括交易金額、預期完成時間和戰略意義。選項C與文中股價上漲相悖，選項B未提及CloudSphere的新產品，選項D混淆了DataStream的業務範圍。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "acquisition",
      "analytics",
      "proprietary",
      "consolidation"
    ],
    "passage": "Apex Digital Solutions, a software firm based in Austin, Texas, announced on March 15th its acquisition of DataStream Analytics, a smaller data processing company headquartered in Seattle. The deal, valued at $450 million, is expected to close by the end of the second quarter, pending regulatory approval. Apex CEO Linda Park stated that the acquisition will enhance Apex’s cloud analytics capabilities and expand its client base in the healthcare sector. DataStream’s proprietary technology, which specializes in real-time data integration, will be integrated into Apex’s existing platform. Industry analysts note that this move positions Apex to compete more directly with larger rivals like CloudSphere. The acquisition is part of a broader trend of consolidation in the tech industry, as companies seek to strengthen their data offerings amid growing demand for artificial intelligence applications. Apex’s stock rose 3% following the announcement.",
    "passage_group_id": "p7-single-031",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-029",
    "part": "Part 7",
    "question": "Where is DataStream Analytics located?",
    "choices": {
      "A": "Seattle",
      "B": "New York City",
      "C": "San Francisco",
      "D": "Austin, Texas"
    },
    "answer": "A",
    "explanation_zh": "文章明確提到DataStream Analytics的總部位於西雅圖（headquartered in Seattle）。選項D是Apex Digital Solutions的所在地，選項B和C未在文中出現。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "headquartered",
      "integration",
      "platform",
      "regulatory"
    ],
    "passage": "Apex Digital Solutions, a software firm based in Austin, Texas, announced on March 15th its acquisition of DataStream Analytics, a smaller data processing company headquartered in Seattle. The deal, valued at $450 million, is expected to close by the end of the second quarter, pending regulatory approval. Apex CEO Linda Park stated that the acquisition will enhance Apex’s cloud analytics capabilities and expand its client base in the healthcare sector. DataStream’s proprietary technology, which specializes in real-time data integration, will be integrated into Apex’s existing platform. Industry analysts note that this move positions Apex to compete more directly with larger rivals like CloudSphere. The acquisition is part of a broader trend of consolidation in the tech industry, as companies seek to strengthen their data offerings amid growing demand for artificial intelligence applications. Apex’s stock rose 3% following the announcement.",
    "passage_group_id": "p7-single-031",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-030",
    "part": "Part 7",
    "question": "What is likely to happen as a result of this acquisition?",
    "choices": {
      "A": "CloudSphere will acquire another company in response.",
      "B": "Apex will strengthen its position in the cloud analytics market.",
      "C": "Apex will reduce its workforce in the healthcare sector.",
      "D": "DataStream will stop developing its real-time data technology."
    },
    "answer": "B",
    "explanation_zh": "文章指出收購將增強Apex的雲分析能力並擴大其客戶群，這表明Apex在雲分析市場的地位將得到加強。選項C和D與文中內容相反，選項A未被提及，屬於過度推斷。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "positions",
      "rivals",
      "trend",
      "demand"
    ],
    "passage": "Apex Digital Solutions, a software firm based in Austin, Texas, announced on March 15th its acquisition of DataStream Analytics, a smaller data processing company headquartered in Seattle. The deal, valued at $450 million, is expected to close by the end of the second quarter, pending regulatory approval. Apex CEO Linda Park stated that the acquisition will enhance Apex’s cloud analytics capabilities and expand its client base in the healthcare sector. DataStream’s proprietary technology, which specializes in real-time data integration, will be integrated into Apex’s existing platform. Industry analysts note that this move positions Apex to compete more directly with larger rivals like CloudSphere. The acquisition is part of a broader trend of consolidation in the tech industry, as companies seek to strengthen their data offerings amid growing demand for artificial intelligence applications. Apex’s stock rose 3% following the announcement.",
    "passage_group_id": "p7-single-031",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-031",
    "part": "Part 7",
    "question": "What is the main purpose of this email?",
    "choices": {
      "A": "To introduce a new project coordinator.",
      "B": "To provide details about the quarterly financial review.",
      "C": "To announce a change in the meeting schedule.",
      "D": "To request confirmation for the original meeting date."
    },
    "answer": "C",
    "explanation_zh": "電子郵件的第一句明確指出，由於季度財務審查的時間衝突，項目狀態會議已被重新安排。因此，主要目的是通知會議日程的變更。",
    "skill_tag": "reading_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "rescheduled",
      "quarterly",
      "timeline",
      "confirm"
    ],
    "passage": "Dear Team,\n\nDue to a scheduling conflict with the quarterly financial review, our project status meeting has been rescheduled from Friday, March 15, at 10:00 AM to Monday, March 18, at 2:00 PM. The meeting will now take place in Conference Room B instead of Conference Room A. We will review the Q1 marketing campaign results and discuss the upcoming product launch timeline. Remote attendance is available via the link sent separately. Please confirm your availability by the end of today.\n\nBest regards,\nAlex Chen\nProject Coordinator",
    "passage_group_id": "p7-single-032",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-032",
    "part": "Part 7",
    "question": "What is the new date and time for the meeting?",
    "choices": {
      "A": "Friday, March 15, at 2:00 PM.",
      "B": "Monday, March 18, at 10:00 AM.",
      "C": "Monday, March 18, at 2:00 PM.",
      "D": "Friday, March 15, at 10:00 AM."
    },
    "answer": "C",
    "explanation_zh": "郵件中明確寫道會議已從3月15日星期五上午10點改期至3月18日星期一下午2點。選項C與此信息完全一致。",
    "skill_tag": "reading_detail",
    "difficulty": "A2",
    "vocabulary": [
      "rescheduled",
      "quarterly",
      "timeline",
      "confirm"
    ],
    "passage": "Dear Team,\n\nDue to a scheduling conflict with the quarterly financial review, our project status meeting has been rescheduled from Friday, March 15, at 10:00 AM to Monday, March 18, at 2:00 PM. The meeting will now take place in Conference Room B instead of Conference Room A. We will review the Q1 marketing campaign results and discuss the upcoming product launch timeline. Remote attendance is available via the link sent separately. Please confirm your availability by the end of today.\n\nBest regards,\nAlex Chen\nProject Coordinator",
    "passage_group_id": "p7-single-032",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-033",
    "part": "Part 7",
    "question": "What can be inferred about the meeting attendees?",
    "choices": {
      "A": "Attendees do not need to confirm their availability.",
      "B": "All attendees must attend in person.",
      "C": "The meeting will be canceled if not enough people confirm.",
      "D": "Some attendees may join the meeting online."
    },
    "answer": "D",
    "explanation_zh": "郵件中提到'Remote attendance is available via the link sent separately'，這意味著可以遠程參加，因此推斷一些參會者可能會在線加入會議。選項B與事實相反，選項A與'請確認出席'的要求矛盾，選項C未在郵件中提及。",
    "skill_tag": "reading_inference",
    "difficulty": "A2",
    "vocabulary": [
      "rescheduled",
      "quarterly",
      "timeline",
      "confirm"
    ],
    "passage": "Dear Team,\n\nDue to a scheduling conflict with the quarterly financial review, our project status meeting has been rescheduled from Friday, March 15, at 10:00 AM to Monday, March 18, at 2:00 PM. The meeting will now take place in Conference Room B instead of Conference Room A. We will review the Q1 marketing campaign results and discuss the upcoming product launch timeline. Remote attendance is available via the link sent separately. Please confirm your availability by the end of today.\n\nBest regards,\nAlex Chen\nProject Coordinator",
    "passage_group_id": "p7-single-032",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-034",
    "part": "Part 7",
    "question": "What is the main purpose of this memo?",
    "choices": {
      "A": "To schedule an emergency meeting on November 2",
      "B": "To announce a permanent closure of the office building",
      "C": "To inform staff about a one-day office closure for maintenance",
      "D": "To request feedback on the maintenance schedule"
    },
    "answer": "C",
    "explanation_zh": "備忘錄的主要目的是通知全體員工，辦公樓將於2024年11月2日（週六）因必要的電氣維護工作臨時關閉一天。選項B錯誤，因為關閉是臨時的，而非永久。選項A和D與內容無關。",
    "skill_tag": "reading_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "advised",
      "essential",
      "restricted",
      "alternative"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2024\nSubject: Temporary Office Closure for Maintenance\n\nPlease be advised that the main office building will be closed on Saturday, November 2, 2024, for essential electrical maintenance work. This closure affects all floors except the ground floor lobby, which will remain accessible for deliveries. All employees are required to work remotely on that day. Access to the office will be restricted from 7:00 AM to 7:00 PM. If you have urgent in-person needs, please contact your manager to arrange alternative access after 7:00 PM.",
    "passage_group_id": "p7-single-033",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-035",
    "part": "Part 7",
    "question": "Until what time is the office building closed on November 2?",
    "choices": {
      "A": "All day until midnight",
      "B": "The memo does not specify an end time",
      "C": "7:00 AM",
      "D": "7:00 PM"
    },
    "answer": "D",
    "explanation_zh": "備忘錄明確指出，辦公樓的進入權限將從早上7:00到晚上7:00受限，因此關閉持續到晚上7:00。選項C是開始時間，選項A未提及，選項B錯誤因為時間已明確。",
    "skill_tag": "reading_detail",
    "difficulty": "A2",
    "vocabulary": [
      "accessible",
      "deliveries",
      "remotely",
      "urgent"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2024\nSubject: Temporary Office Closure for Maintenance\n\nPlease be advised that the main office building will be closed on Saturday, November 2, 2024, for essential electrical maintenance work. This closure affects all floors except the ground floor lobby, which will remain accessible for deliveries. All employees are required to work remotely on that day. Access to the office will be restricted from 7:00 AM to 7:00 PM. If you have urgent in-person needs, please contact your manager to arrange alternative access after 7:00 PM.",
    "passage_group_id": "p7-single-033",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-036",
    "part": "Part 7",
    "question": "What can be inferred about employees who need to go to the office on November 2?",
    "choices": {
      "A": "They can enter the building at any time if they have a manager's permission",
      "B": "They are allowed to use the ground floor lobby for meetings",
      "C": "They must work from home for the entire day",
      "D": "They can only access the office after 7:00 PM with prior approval"
    },
    "answer": "D",
    "explanation_zh": "備忘錄提到，如有緊急的現場需求，員工需聯繫經理安排晚上7:00後的替代訪問，因此可推斷只有在7:00後且獲得經理批准才能進入。選項A忽略了時間限制，選項C過於絕對（部分員工可能有緊急需求），選項B未提及在門廳開會。",
    "skill_tag": "reading_inference",
    "difficulty": "A2",
    "vocabulary": [
      "arrange",
      "prior",
      "approval",
      "inferred"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2024\nSubject: Temporary Office Closure for Maintenance\n\nPlease be advised that the main office building will be closed on Saturday, November 2, 2024, for essential electrical maintenance work. This closure affects all floors except the ground floor lobby, which will remain accessible for deliveries. All employees are required to work remotely on that day. Access to the office will be restricted from 7:00 AM to 7:00 PM. If you have urgent in-person needs, please contact your manager to arrange alternative access after 7:00 PM.",
    "passage_group_id": "p7-single-033",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-037",
    "part": "Part 7",
    "question": "What is the main purpose of this advertisement?",
    "choices": {
      "A": "To compare different desk organizers on the market",
      "B": "To provide tips for reducing cable clutter",
      "C": "To promote a desk organizer with special features",
      "D": "To announce a sale on office furniture"
    },
    "answer": "C",
    "explanation_zh": "文章主要介紹了SpaceSaver Pro Desk Organizer的功能、價格和優惠，目的是推廣該產品，因此選項C正確。選項D過於寬泛，未具體指出產品；B和A偏離了廣告的推銷性質。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "cluttered",
      "modular",
      "wireless charging",
      "cable management",
      "stationery"
    ],
    "passage": "Are you struggling with cluttered cables and limited desk space? The new SpaceSaver Pro Desk Organizer is here to transform your workspace. This modular unit features a built-in wireless charging pad, a cable management system with adjustable clips, and a sliding drawer for stationery. Crafted from durable bamboo, it supports monitors up to 27 inches. Priced at just $89.99, the SpaceSaver Pro comes with a 2-year warranty and free shipping on all orders placed before the end of the month. Visit our showroom at 456 Oak Avenue or order online at spacesaverpro.com to see why it's the top-rated organizer of the year. Don't let a messy desk slow you down—upgrade today!",
    "passage_group_id": "p7-single-034",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-038",
    "part": "Part 7",
    "question": "What is included with a purchase of the SpaceSaver Pro?",
    "choices": {
      "A": "A wireless charging adapter",
      "B": "A 27-inch monitor",
      "C": "Free shipping for orders within the month",
      "D": "A set of stationery items"
    },
    "answer": "C",
    "explanation_zh": "文章明確指出'free shipping on all orders placed before the end of the month'，因此選項C正確。B項是產品支持的顯示器尺寸，並非贈品；D項是抽屜的功能，但未說明包含文具；A項是內置充電板，而非適配器。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "warranty",
      "showroom",
      "top-rated",
      "transform",
      "durable"
    ],
    "passage": "Are you struggling with cluttered cables and limited desk space? The new SpaceSaver Pro Desk Organizer is here to transform your workspace. This modular unit features a built-in wireless charging pad, a cable management system with adjustable clips, and a sliding drawer for stationery. Crafted from durable bamboo, it supports monitors up to 27 inches. Priced at just $89.99, the SpaceSaver Pro comes with a 2-year warranty and free shipping on all orders placed before the end of the month. Visit our showroom at 456 Oak Avenue or order online at spacesaverpro.com to see why it's the top-rated organizer of the year. Don't let a messy desk slow you down—upgrade today!",
    "passage_group_id": "p7-single-034",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-039",
    "part": "Part 7",
    "question": "What can be inferred about the seller's situation?",
    "choices": {
      "A": "The seller is discontinuing the product soon.",
      "B": "The seller has a physical store location.",
      "C": "The seller is trying to attract buyers before a price increase.",
      "D": "The seller mainly targets large corporations."
    },
    "answer": "B",
    "explanation_zh": "文章提到'Visit our showroom at 456 Oak Avenue'，說明賣家擁有實體店址，因此選項B正確。C項雖提及月底前免運費，但未說漲價；A項無依據；D項文中未提及目標客戶類型。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "showroom",
      "cluttered",
      "modular",
      "upgrade",
      "top-rated"
    ],
    "passage": "Are you struggling with cluttered cables and limited desk space? The new SpaceSaver Pro Desk Organizer is here to transform your workspace. This modular unit features a built-in wireless charging pad, a cable management system with adjustable clips, and a sliding drawer for stationery. Crafted from durable bamboo, it supports monitors up to 27 inches. Priced at just $89.99, the SpaceSaver Pro comes with a 2-year warranty and free shipping on all orders placed before the end of the month. Visit our showroom at 456 Oak Avenue or order online at spacesaverpro.com to see why it's the top-rated organizer of the year. Don't let a messy desk slow you down—upgrade today!",
    "passage_group_id": "p7-single-034",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-040",
    "part": "Part 7",
    "question": "What is the main purpose of this notice?",
    "choices": {
      "A": "To remind residents to renew their library cards",
      "B": "To announce a change in operating hours",
      "C": "To advertise a free workshop for children",
      "D": "To introduce a new facility and its usage rules"
    },
    "answer": "D",
    "explanation_zh": "通知的主要目的是宣佈社區中心新創客空間的開放，並說明其使用規定，包括年齡限制、所需證件、安全培訓、開放時間及預約方式。選項D準確地概括了這一核心內容。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "equipped",
      "orientation",
      "reservation",
      "pending"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the opening of its new Makerspace, a creative workshop equipped with 3D printers, laser cutters, and sewing machines. The Makerspace is available to all Greenfield residents aged 16 and older. A valid library card is required to use the equipment. Users must complete a free safety orientation session before their first visit. The Makerspace is open Monday through Friday from 10:00 AM to 8:00 PM and on Saturdays from 9:00 AM to 5:00 PM. It is closed on Sundays and public holidays. To reserve a machine, please visit our website or call (555) 123-4567 at least 24 hours in advance. Walk-ins are welcome only if no reservations are pending. For more information, contact the community center at info@greenfieldcc.org.",
    "passage_group_id": "p7-single-035",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-041",
    "part": "Part 7",
    "question": "What is required to use the Makerspace equipment?",
    "choices": {
      "A": "An appointment made at least one week in advance",
      "B": "A paid membership and a reservation",
      "C": "A valid library card and completion of a safety orientation",
      "D": "Proof of residency and a signed waiver"
    },
    "answer": "C",
    "explanation_zh": "通知中提到，使用設備需要有效的借書證，並且必須在首次使用前完成免費的安全培訓。選項C準確包含了這兩項要求。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "equipped",
      "orientation",
      "reservation",
      "pending"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the opening of its new Makerspace, a creative workshop equipped with 3D printers, laser cutters, and sewing machines. The Makerspace is available to all Greenfield residents aged 16 and older. A valid library card is required to use the equipment. Users must complete a free safety orientation session before their first visit. The Makerspace is open Monday through Friday from 10:00 AM to 8:00 PM and on Saturdays from 9:00 AM to 5:00 PM. It is closed on Sundays and public holidays. To reserve a machine, please visit our website or call (555) 123-4567 at least 24 hours in advance. Walk-ins are welcome only if no reservations are pending. For more information, contact the community center at info@greenfieldcc.org.",
    "passage_group_id": "p7-single-035",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-042",
    "part": "Part 7",
    "question": "What can be inferred about the intended audience for this notice?",
    "choices": {
      "A": "It is meant for business owners seeking manufacturing services",
      "B": "It targets school-age children who enjoy crafting",
      "C": "It is primarily aimed at professional artists",
      "D": "It is intended for local residents with an interest in creative projects"
    },
    "answer": "D",
    "explanation_zh": "通知面向Greenfield居民，年齡要求16歲以上，且提供的設備（3D打印機、激光切割機、縫紉機）適合創意項目。因此，目標受眾是對創意項目感興趣的當地居民。選項D最符合推斷，而C（專業藝術家）、B（學齡兒童）、A（企業主）均未在通知中得到支持。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "equipped",
      "orientation",
      "reservation",
      "pending"
    ],
    "passage": "The Greenfield Community Center is pleased to announce the opening of its new Makerspace, a creative workshop equipped with 3D printers, laser cutters, and sewing machines. The Makerspace is available to all Greenfield residents aged 16 and older. A valid library card is required to use the equipment. Users must complete a free safety orientation session before their first visit. The Makerspace is open Monday through Friday from 10:00 AM to 8:00 PM and on Saturdays from 9:00 AM to 5:00 PM. It is closed on Sundays and public holidays. To reserve a machine, please visit our website or call (555) 123-4567 at least 24 hours in advance. Walk-ins are welcome only if no reservations are pending. For more information, contact the community center at info@greenfieldcc.org.",
    "passage_group_id": "p7-single-035",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-043",
    "part": "Part 7",
    "question": "What is the main topic of the article?",
    "choices": {
      "A": "The acquisition of SolarFuture by GreenTech",
      "B": "The financial performance of GreenTech Energy",
      "C": "The career history of Laura Chen",
      "D": "The expansion of wind energy in California"
    },
    "answer": "A",
    "explanation_zh": "文章首句明確說明GreenTech Energy收購SolarFuture Inc.，隨後圍繞收購細節展開，因此主要話題是收購事件。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "acquisition",
      "subsidiary",
      "merger",
      "redundancy"
    ],
    "passage": "On March 15, 2024, GreenTech Energy announced the acquisition of SolarFuture Inc., a California-based solar panel manufacturer, for $450 million. The deal, expected to close by June 2024, will combine GreenTech's wind energy operations with SolarFuture's solar technology. GreenTech CEO Laura Chen stated, 'This acquisition strengthens our position in the renewable energy market and allows us to offer integrated solutions.' Industry analysts predict the merger could increase GreenTech's annual revenue by 20% in the next fiscal year. However, some experts express concerns about potential workforce redundancies, as both companies have overlapping departments. SolarFuture's headquarters will remain in San Diego, with current CEO Mark Rivera staying on as a regional director. GreenTech, headquartered in Austin, Texas, plans to expand its R&D team in California following the merger.",
    "passage_group_id": "p7-single-036",
    "passage_group_type": "single",
    "question_order": 1
  },
  {
    "id": "p7-gen-044",
    "part": "Part 7",
    "question": "What is the expected completion date for the acquisition?",
    "choices": {
      "A": "The end of 2024",
      "B": "June 2024",
      "C": "March 15, 2024",
      "D": "Next fiscal year"
    },
    "answer": "B",
    "explanation_zh": "文章明確提到'expected to close by June 2024'，因此預計完成日期是2024年6月。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "acquisition",
      "disclosure",
      "fiscal",
      "integration"
    ],
    "passage": "On March 15, 2024, GreenTech Energy announced the acquisition of SolarFuture Inc., a California-based solar panel manufacturer, for $450 million. The deal, expected to close by June 2024, will combine GreenTech's wind energy operations with SolarFuture's solar technology. GreenTech CEO Laura Chen stated, 'This acquisition strengthens our position in the renewable energy market and allows us to offer integrated solutions.' Industry analysts predict the merger could increase GreenTech's annual revenue by 20% in the next fiscal year. However, some experts express concerns about potential workforce redundancies, as both companies have overlapping departments. SolarFuture's headquarters will remain in San Diego, with current CEO Mark Rivera staying on as a regional director. GreenTech, headquartered in Austin, Texas, plans to expand its R&D team in California following the merger.",
    "passage_group_id": "p7-single-036",
    "passage_group_type": "single",
    "question_order": 2
  },
  {
    "id": "p7-gen-045",
    "part": "Part 7",
    "question": "What is likely a challenge GreenTech will face after the merger?",
    "choices": {
      "A": "Integrating the two companies' technologies",
      "B": "Declining demand for renewable energy",
      "C": "Moving SolarFuture's headquarters to Austin",
      "D": "Reducing the workforce due to overlapping roles"
    },
    "answer": "D",
    "explanation_zh": "文章提到'experts express concerns about potential workforce redundancies'，表明合併後可能面臨裁員挑戰。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "redundancy",
      "integrate",
      "merge",
      "overlap"
    ],
    "passage": "On March 15, 2024, GreenTech Energy announced the acquisition of SolarFuture Inc., a California-based solar panel manufacturer, for $450 million. The deal, expected to close by June 2024, will combine GreenTech's wind energy operations with SolarFuture's solar technology. GreenTech CEO Laura Chen stated, 'This acquisition strengthens our position in the renewable energy market and allows us to offer integrated solutions.' Industry analysts predict the merger could increase GreenTech's annual revenue by 20% in the next fiscal year. However, some experts express concerns about potential workforce redundancies, as both companies have overlapping departments. SolarFuture's headquarters will remain in San Diego, with current CEO Mark Rivera staying on as a regional director. GreenTech, headquartered in Austin, Texas, plans to expand its R&D team in California following the merger.",
    "passage_group_id": "p7-single-036",
    "passage_group_type": "single",
    "question_order": 3
  },
  {
    "id": "p7-gen-046",
    "part": "Part 7",
    "question": "What position is Jane Doe applying for?",
    "choices": {
      "A": "Junior Data Analyst",
      "B": "Data Scientist",
      "C": "Senior Data Analyst",
      "D": "Business Analyst"
    },
    "answer": "C",
    "explanation_zh": "郵件主題和正文都明確提到申請的是Senior Data Analyst職位，與招聘廣告一致。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "position",
      "apply",
      "advertised",
      "resume"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\n\nLocation: Chicago, IL\n\nABC Analytics is seeking a Senior Data Analyst to join our growing team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a strong background in statistical modeling. Responsibilities include leading data projects, presenting insights to senior management, and mentoring junior analysts. We offer a competitive salary and benefits package. To apply, please send your resume and a cover letter detailing your relevant experience to careers@abc.com by August 15.\n\nText B: Application Email\n\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at ABC Analytics, as advertised on your company website. I have a Master's degree in Statistics and over 6 years of experience in data analysis, including 3 years as a team lead. In my current role at XYZ Corp, I use SQL and Python daily to analyze large datasets and have presented findings to executive leadership. I have also mentored three junior analysts. I am excited about the opportunity to contribute to ABC Analytics and have attached my resume for your review. I look forward to hearing from you.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-double-001",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-047",
    "part": "Part 7",
    "question": "Which of the following is a requirement listed in the job posting?",
    "choices": {
      "A": "A Master's degree in Statistics",
      "B": "Experience mentoring junior analysts",
      "C": "At least 5 years of experience in data analysis",
      "D": "Knowledge of cloud computing"
    },
    "answer": "C",
    "explanation_zh": "招聘廣告明確要求“at least 5 years of experience in data analysis”，這是必要條件。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "requirement",
      "experience",
      "proficiency",
      "background"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\n\nLocation: Chicago, IL\n\nABC Analytics is seeking a Senior Data Analyst to join our growing team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a strong background in statistical modeling. Responsibilities include leading data projects, presenting insights to senior management, and mentoring junior analysts. We offer a competitive salary and benefits package. To apply, please send your resume and a cover letter detailing your relevant experience to careers@abc.com by August 15.\n\nText B: Application Email\n\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at ABC Analytics, as advertised on your company website. I have a Master's degree in Statistics and over 6 years of experience in data analysis, including 3 years as a team lead. In my current role at XYZ Corp, I use SQL and Python daily to analyze large datasets and have presented findings to executive leadership. I have also mentored three junior analysts. I am excited about the opportunity to contribute to ABC Analytics and have attached my resume for your review. I look forward to hearing from you.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-double-001",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-048",
    "part": "Part 7",
    "question": "What qualification does Jane Doe mention in her application that matches a key requirement of the job?",
    "choices": {
      "A": "She is proficient in Java.",
      "B": "She has a PhD in Data Science.",
      "C": "She has worked at ABC Analytics before.",
      "D": "She has over 6 years of experience in data analysis."
    },
    "answer": "D",
    "explanation_zh": "Jane Doe在郵件中提到有6年以上數據分析經驗，符合招聘廣告中至少5年經驗的要求。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "qualification",
      "matches",
      "requirement",
      "experience"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\n\nLocation: Chicago, IL\n\nABC Analytics is seeking a Senior Data Analyst to join our growing team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a strong background in statistical modeling. Responsibilities include leading data projects, presenting insights to senior management, and mentoring junior analysts. We offer a competitive salary and benefits package. To apply, please send your resume and a cover letter detailing your relevant experience to careers@abc.com by August 15.\n\nText B: Application Email\n\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at ABC Analytics, as advertised on your company website. I have a Master's degree in Statistics and over 6 years of experience in data analysis, including 3 years as a team lead. In my current role at XYZ Corp, I use SQL and Python daily to analyze large datasets and have presented findings to executive leadership. I have also mentored three junior analysts. I am excited about the opportunity to contribute to ABC Analytics and have attached my resume for your review. I look forward to hearing from you.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-double-001",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-049",
    "part": "Part 7",
    "question": "What is the main purpose of the job posting?",
    "choices": {
      "A": "To advertise a job opening for a Senior Data Analyst",
      "B": "To describe the history of ABC Analytics",
      "C": "To provide a list of employee benefits",
      "D": "To announce a new project at ABC Analytics"
    },
    "answer": "A",
    "explanation_zh": "招聘廣告的主要目的是招聘高級數據分析師，文中詳細列出了職位、要求和申請方式。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "purpose",
      "job posting",
      "advertise",
      "opening"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\n\nLocation: Chicago, IL\n\nABC Analytics is seeking a Senior Data Analyst to join our growing team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a strong background in statistical modeling. Responsibilities include leading data projects, presenting insights to senior management, and mentoring junior analysts. We offer a competitive salary and benefits package. To apply, please send your resume and a cover letter detailing your relevant experience to careers@abc.com by August 15.\n\nText B: Application Email\n\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at ABC Analytics, as advertised on your company website. I have a Master's degree in Statistics and over 6 years of experience in data analysis, including 3 years as a team lead. In my current role at XYZ Corp, I use SQL and Python daily to analyze large datasets and have presented findings to executive leadership. I have also mentored three junior analysts. I am excited about the opportunity to contribute to ABC Analytics and have attached my resume for your review. I look forward to hearing from you.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-double-001",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-194",
    "part": "Part 7",
    "question": "By what date must candidates submit their application?",
    "choices": {
      "A": "August 1",
      "B": "August 15",
      "C": "September 1",
      "D": "August 30"
    },
    "answer": "B",
    "explanation_zh": "招聘廣告最後一句明確寫道\"by August 15\"，這是申請的截止日期。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "deadline",
      "submit",
      "application",
      "candidate"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\n\nLocation: Chicago, IL\n\nABC Analytics is seeking a Senior Data Analyst to join our growing team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a strong background in statistical modeling. Responsibilities include leading data projects, presenting insights to senior management, and mentoring junior analysts. We offer a competitive salary and benefits package. To apply, please send your resume and a cover letter detailing your relevant experience to careers@abc.com by August 15.\n\nText B: Application Email\n\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at ABC Analytics, as advertised on your company website. I have a Master's degree in Statistics and over 6 years of experience in data analysis, including 3 years as a team lead. In my current role at XYZ Corp, I use SQL and Python daily to analyze large datasets and have presented findings to executive leadership. I have also mentored three junior analysts. I am excited about the opportunity to contribute to ABC Analytics and have attached my resume for your review. I look forward to hearing from you.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-double-001",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-059",
    "part": "Part 7",
    "question": "What is the main issue in this communication?",
    "choices": {
      "A": "GreenLeaf Online delivered a damaged product to Sarah Jenkins.",
      "B": "The packaging slip was missing from Sarah Jenkins's order.",
      "C": "Sarah Jenkins ordered the wrong item from GreenLeaf Online.",
      "D": "Sarah Jenkins received a different item than what she ordered."
    },
    "answer": "D",
    "explanation_zh": "主要問題是Sarah Jenkins收到的商品與她訂購的不同。她在第一封郵件中明確說明她訂購了竹製廚房收納罐，但收到的是塑料容器。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "disappointment",
      "incorrect",
      "packaging slip",
      "warehouse",
      "goodwill"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sarah.jenkins@email.com>\nTo: Customer Service <support@greenleafonline.com>\nSubject: Incorrect item received\n\nDear GreenLeaf Customer Service,\n\nI am writing to express my disappointment with my recent order (Order #GL-8842). I ordered a set of four bamboo kitchen storage jars, but I received a set of plastic containers instead. The packaging slip inside the box lists the correct item, so I believe the warehouse made an error. I have attached photos of the items received and the packing slip for your reference. I would appreciate it if you could arrange for the correct item to be sent to me as soon as possible. Please also advise on how to return the incorrect items at your cost. I look forward to your prompt response.\n\nSincerely,\nSarah Jenkins\n\nEmail 2\nFrom: David Chen <david.chen@greenleafonline.com>\nTo: Sarah Jenkins <sarah.jenkins@email.com>\nSubject: Re: Incorrect item received\n\nDear Ms. Jenkins,\n\nThank you for contacting us regarding your order. I sincerely apologize for the error. I have reviewed your order and the photos you provided. It appears that our packing team mistakenly selected the wrong product from the shelf. I have already initiated a replacement shipment for the correct bamboo kitchen storage jars, which will arrive within 3-5 business days. Additionally, I have arranged for a prepaid return label for the plastic containers. You can drop off the package at any authorized shipping location. As a gesture of goodwill, we have also applied a 10% discount to your next purchase. Please do not hesitate to contact me if you have any further questions.\n\nBest regards,\nDavid Chen\nCustomer Service Manager\nGreenLeaf Online",
    "passage_group_id": "p7-double-002",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-060",
    "part": "Part 7",
    "question": "What evidence did Sarah Jenkins provide to support her complaint?",
    "choices": {
      "A": "A copy of her credit card statement.",
      "B": "The original order confirmation email.",
      "C": "Photos of the items received and the packing slip.",
      "D": "A video of the unboxing process."
    },
    "answer": "C",
    "explanation_zh": "Sarah Jenkins在第一封郵件中提到她附上了收到的物品和包裝單的照片作為參考。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "attached",
      "photos",
      "packing slip",
      "reference",
      "evidence"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sarah.jenkins@email.com>\nTo: Customer Service <support@greenleafonline.com>\nSubject: Incorrect item received\n\nDear GreenLeaf Customer Service,\n\nI am writing to express my disappointment with my recent order (Order #GL-8842). I ordered a set of four bamboo kitchen storage jars, but I received a set of plastic containers instead. The packaging slip inside the box lists the correct item, so I believe the warehouse made an error. I have attached photos of the items received and the packing slip for your reference. I would appreciate it if you could arrange for the correct item to be sent to me as soon as possible. Please also advise on how to return the incorrect items at your cost. I look forward to your prompt response.\n\nSincerely,\nSarah Jenkins\n\nEmail 2\nFrom: David Chen <david.chen@greenleafonline.com>\nTo: Sarah Jenkins <sarah.jenkins@email.com>\nSubject: Re: Incorrect item received\n\nDear Ms. Jenkins,\n\nThank you for contacting us regarding your order. I sincerely apologize for the error. I have reviewed your order and the photos you provided. It appears that our packing team mistakenly selected the wrong product from the shelf. I have already initiated a replacement shipment for the correct bamboo kitchen storage jars, which will arrive within 3-5 business days. Additionally, I have arranged for a prepaid return label for the plastic containers. You can drop off the package at any authorized shipping location. As a gesture of goodwill, we have also applied a 10% discount to your next purchase. Please do not hesitate to contact me if you have any further questions.\n\nBest regards,\nDavid Chen\nCustomer Service Manager\nGreenLeaf Online",
    "passage_group_id": "p7-double-002",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-061",
    "part": "Part 7",
    "question": "What does David Chen offer to do about the incorrect items?",
    "choices": {
      "A": "He provides a prepaid return label for the plastic containers.",
      "B": "He arranges for a courier to pick up the items.",
      "C": "He requests Sarah to pay for the return shipping.",
      "D": "He asks Sarah to keep the plastic containers."
    },
    "answer": "A",
    "explanation_zh": "David Chen在第二封郵件中表示他已經為塑料容器安排了預付退貨標籤，Sarah可以在任何授權地點投遞包裹。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "prepaid",
      "return label",
      "authorized",
      "shipping location",
      "arranged"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sarah.jenkins@email.com>\nTo: Customer Service <support@greenleafonline.com>\nSubject: Incorrect item received\n\nDear GreenLeaf Customer Service,\n\nI am writing to express my disappointment with my recent order (Order #GL-8842). I ordered a set of four bamboo kitchen storage jars, but I received a set of plastic containers instead. The packaging slip inside the box lists the correct item, so I believe the warehouse made an error. I have attached photos of the items received and the packing slip for your reference. I would appreciate it if you could arrange for the correct item to be sent to me as soon as possible. Please also advise on how to return the incorrect items at your cost. I look forward to your prompt response.\n\nSincerely,\nSarah Jenkins\n\nEmail 2\nFrom: David Chen <david.chen@greenleafonline.com>\nTo: Sarah Jenkins <sarah.jenkins@email.com>\nSubject: Re: Incorrect item received\n\nDear Ms. Jenkins,\n\nThank you for contacting us regarding your order. I sincerely apologize for the error. I have reviewed your order and the photos you provided. It appears that our packing team mistakenly selected the wrong product from the shelf. I have already initiated a replacement shipment for the correct bamboo kitchen storage jars, which will arrive within 3-5 business days. Additionally, I have arranged for a prepaid return label for the plastic containers. You can drop off the package at any authorized shipping location. As a gesture of goodwill, we have also applied a 10% discount to your next purchase. Please do not hesitate to contact me if you have any further questions.\n\nBest regards,\nDavid Chen\nCustomer Service Manager\nGreenLeaf Online",
    "passage_group_id": "p7-double-002",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-062",
    "part": "Part 7",
    "question": "What can be inferred about the packing team at GreenLeaf Online?",
    "choices": {
      "A": "They likely confused two similar-looking products.",
      "B": "They are not responsible for the mistake.",
      "C": "They intentionally sent a cheaper item to save costs.",
      "D": "They frequently make errors in order fulfillment."
    },
    "answer": "A",
    "explanation_zh": "從David Chen的回覆中可以推斷，包裝團隊可能混淆了兩種外觀相似的產品，因為他說‘錯誤地從貨架上選擇了錯誤的產品’，這暗示了混淆的可能性。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "packing team",
      "mistakenly",
      "selected",
      "shelf",
      "confused"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sarah.jenkins@email.com>\nTo: Customer Service <support@greenleafonline.com>\nSubject: Incorrect item received\n\nDear GreenLeaf Customer Service,\n\nI am writing to express my disappointment with my recent order (Order #GL-8842). I ordered a set of four bamboo kitchen storage jars, but I received a set of plastic containers instead. The packaging slip inside the box lists the correct item, so I believe the warehouse made an error. I have attached photos of the items received and the packing slip for your reference. I would appreciate it if you could arrange for the correct item to be sent to me as soon as possible. Please also advise on how to return the incorrect items at your cost. I look forward to your prompt response.\n\nSincerely,\nSarah Jenkins\n\nEmail 2\nFrom: David Chen <david.chen@greenleafonline.com>\nTo: Sarah Jenkins <sarah.jenkins@email.com>\nSubject: Re: Incorrect item received\n\nDear Ms. Jenkins,\n\nThank you for contacting us regarding your order. I sincerely apologize for the error. I have reviewed your order and the photos you provided. It appears that our packing team mistakenly selected the wrong product from the shelf. I have already initiated a replacement shipment for the correct bamboo kitchen storage jars, which will arrive within 3-5 business days. Additionally, I have arranged for a prepaid return label for the plastic containers. You can drop off the package at any authorized shipping location. As a gesture of goodwill, we have also applied a 10% discount to your next purchase. Please do not hesitate to contact me if you have any further questions.\n\nBest regards,\nDavid Chen\nCustomer Service Manager\nGreenLeaf Online",
    "passage_group_id": "p7-double-002",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-063",
    "part": "Part 7",
    "question": "How did David Chen's response address Sarah Jenkins's request for the correct item to be sent?",
    "choices": {
      "A": "He ignored the request and only offered a refund.",
      "B": "He asked her to place a new order for the correct item.",
      "C": "He sent the correct item but charged an additional fee.",
      "D": "He initiated a replacement shipment for the correct item."
    },
    "answer": "D",
    "explanation_zh": "Sarah Jenkins要求儘快發送正確的商品。David Chen在回覆中表示他已經啟動了正確商品的補發，這與她的請求一致。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "initiated",
      "replacement",
      "shipment",
      "request",
      "response"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sarah.jenkins@email.com>\nTo: Customer Service <support@greenleafonline.com>\nSubject: Incorrect item received\n\nDear GreenLeaf Customer Service,\n\nI am writing to express my disappointment with my recent order (Order #GL-8842). I ordered a set of four bamboo kitchen storage jars, but I received a set of plastic containers instead. The packaging slip inside the box lists the correct item, so I believe the warehouse made an error. I have attached photos of the items received and the packing slip for your reference. I would appreciate it if you could arrange for the correct item to be sent to me as soon as possible. Please also advise on how to return the incorrect items at your cost. I look forward to your prompt response.\n\nSincerely,\nSarah Jenkins\n\nEmail 2\nFrom: David Chen <david.chen@greenleafonline.com>\nTo: Sarah Jenkins <sarah.jenkins@email.com>\nSubject: Re: Incorrect item received\n\nDear Ms. Jenkins,\n\nThank you for contacting us regarding your order. I sincerely apologize for the error. I have reviewed your order and the photos you provided. It appears that our packing team mistakenly selected the wrong product from the shelf. I have already initiated a replacement shipment for the correct bamboo kitchen storage jars, which will arrive within 3-5 business days. Additionally, I have arranged for a prepaid return label for the plastic containers. You can drop off the package at any authorized shipping location. As a gesture of goodwill, we have also applied a 10% discount to your next purchase. Please do not hesitate to contact me if you have any further questions.\n\nBest regards,\nDavid Chen\nCustomer Service Manager\nGreenLeaf Online",
    "passage_group_id": "p7-double-002",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-078",
    "part": "Part 7",
    "question": "What position is Jane Doe applying for?",
    "choices": {
      "A": "Social Media Specialist",
      "B": "Product Manager",
      "C": "Sales Coordinator",
      "D": "Marketing Coordinator"
    },
    "answer": "D",
    "explanation_zh": "根據Text B第一句，Jane Doe申請的是Marketing Coordinator職位，與Text C的招聘職位一致。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "coordinator",
      "sustainability",
      "proficient",
      "campaign"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Chicago, IL\nPosition: Marketing Coordinator (Full-time)\n\nGreenLeaf Solutions, a leading provider of eco-friendly packaging, is seeking a Marketing Coordinator to join our growing team. The ideal candidate will have:\n\n- Bachelor's degree in Marketing, Business, or a related field.\n- 2+ years of experience in marketing, preferably in the sustainability sector.\n- Proven ability to manage social media campaigns and analyze performance metrics.\n- Excellent written and verbal communication skills.\n- Proficiency in Adobe Creative Suite (Photoshop, InDesign) is a plus.\n\nResponsibilities include:\n- Developing and executing marketing strategies for new product launches.\n- Coordinating with the sales team to align promotional materials.\n- Managing the company's social media presence and content calendar.\n- Preparing monthly reports on campaign effectiveness.\n\nTo apply, please send your resume and cover letter to hr@greenleafsolutions.com by October 15.\n\nText B\nApplication Email\n\nTo: hr@greenleafsolutions.com\nFrom: janedoe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With a Bachelor's degree in Marketing from the University of Illinois and three years of experience at EcoBrand Inc., where I managed social media campaigns and coordinated product launches, I believe I am a strong candidate for this role.\n\nAt EcoBrand, I increased our Instagram engagement by 40% over two years and successfully launched three new product lines. I am also proficient in Adobe Creative Suite and have used it to create promotional materials. I am passionate about sustainability and eager to contribute to GreenLeaf's mission.\n\nI have attached my resume and cover letter for your review. Thank you for considering my application.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-003",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-079",
    "part": "Part 7",
    "question": "Which of the following is a requirement mentioned in the job posting?",
    "choices": {
      "A": "Knowledge of eco-friendly packaging materials.",
      "B": "Experience in coordinating with the sales team.",
      "C": "Proficiency in Adobe Creative Suite is mandatory.",
      "D": "At least 2 years of experience in the sustainability sector."
    },
    "answer": "D",
    "explanation_zh": "Text D中明確要求'2+ years of experience in marketing, preferably in the sustainability sector'，所以D是正確選項。C選項錯誤，因為'Proficiency in Adobe Creative Suite is a plus'，不是強制要求。B選項是職責之一但不是要求。A選項未提及。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "mandatory",
      "proficiency",
      "sustainability",
      "coordinate"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Chicago, IL\nPosition: Marketing Coordinator (Full-time)\n\nGreenLeaf Solutions, a leading provider of eco-friendly packaging, is seeking a Marketing Coordinator to join our growing team. The ideal candidate will have:\n\n- Bachelor's degree in Marketing, Business, or a related field.\n- 2+ years of experience in marketing, preferably in the sustainability sector.\n- Proven ability to manage social media campaigns and analyze performance metrics.\n- Excellent written and verbal communication skills.\n- Proficiency in Adobe Creative Suite (Photoshop, InDesign) is a plus.\n\nResponsibilities include:\n- Developing and executing marketing strategies for new product launches.\n- Coordinating with the sales team to align promotional materials.\n- Managing the company's social media presence and content calendar.\n- Preparing monthly reports on campaign effectiveness.\n\nTo apply, please send your resume and cover letter to hr@greenleafsolutions.com by October 15.\n\nText B\nApplication Email\n\nTo: hr@greenleafsolutions.com\nFrom: janedoe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With a Bachelor's degree in Marketing from the University of Illinois and three years of experience at EcoBrand Inc., where I managed social media campaigns and coordinated product launches, I believe I am a strong candidate for this role.\n\nAt EcoBrand, I increased our Instagram engagement by 40% over two years and successfully launched three new product lines. I am also proficient in Adobe Creative Suite and have used it to create promotional materials. I am passionate about sustainability and eager to contribute to GreenLeaf's mission.\n\nI have attached my resume and cover letter for your review. Thank you for considering my application.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-003",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-080",
    "part": "Part 7",
    "question": "What can be inferred about Jane Doe's experience from the application email?",
    "choices": {
      "A": "She has worked in the sustainability sector for over five years.",
      "B": "She has more experience than the job requires.",
      "C": "She is not proficient in Adobe Creative Suite.",
      "D": "She has never launched a new product before."
    },
    "answer": "B",
    "explanation_zh": "Text A中Jane提到她有3年經驗，而Text B要求至少2年，所以她的經驗超過要求。A選項錯誤，因為3年少於5年。C選項錯誤，因為她明確說proficient。D選項錯誤，因為她成功推出了三條產品線。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "infer",
      "exceed",
      "proficient",
      "launch"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Chicago, IL\nPosition: Marketing Coordinator (Full-time)\n\nGreenLeaf Solutions, a leading provider of eco-friendly packaging, is seeking a Marketing Coordinator to join our growing team. The ideal candidate will have:\n\n- Bachelor's degree in Marketing, Business, or a related field.\n- 2+ years of experience in marketing, preferably in the sustainability sector.\n- Proven ability to manage social media campaigns and analyze performance metrics.\n- Excellent written and verbal communication skills.\n- Proficiency in Adobe Creative Suite (Photoshop, InDesign) is a plus.\n\nResponsibilities include:\n- Developing and executing marketing strategies for new product launches.\n- Coordinating with the sales team to align promotional materials.\n- Managing the company's social media presence and content calendar.\n- Preparing monthly reports on campaign effectiveness.\n\nTo apply, please send your resume and cover letter to hr@greenleafsolutions.com by October 15.\n\nText B\nApplication Email\n\nTo: hr@greenleafsolutions.com\nFrom: janedoe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With a Bachelor's degree in Marketing from the University of Illinois and three years of experience at EcoBrand Inc., where I managed social media campaigns and coordinated product launches, I believe I am a strong candidate for this role.\n\nAt EcoBrand, I increased our Instagram engagement by 40% over two years and successfully launched three new product lines. I am also proficient in Adobe Creative Suite and have used it to create promotional materials. I am passionate about sustainability and eager to contribute to GreenLeaf's mission.\n\nI have attached my resume and cover letter for your review. Thank you for considering my application.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-003",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-081",
    "part": "Part 7",
    "question": "What is the main purpose of Text A?",
    "choices": {
      "A": "To provide instructions for applying to a company.",
      "B": "To announce a new product launch.",
      "C": "To promote eco-friendly packaging solutions.",
      "D": "To advertise a job opening at GreenLeaf Solutions."
    },
    "answer": "D",
    "explanation_zh": "Text B是一則招聘廣告，主要目的是招聘Marketing Coordinator職位，所以D正確。B選項錯誤，因為不是產品發佈。A選項只是其中一部分。C選項不是主要目的。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "purpose",
      "advertise",
      "application",
      "promote"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Chicago, IL\nPosition: Marketing Coordinator (Full-time)\n\nGreenLeaf Solutions, a leading provider of eco-friendly packaging, is seeking a Marketing Coordinator to join our growing team. The ideal candidate will have:\n\n- Bachelor's degree in Marketing, Business, or a related field.\n- 2+ years of experience in marketing, preferably in the sustainability sector.\n- Proven ability to manage social media campaigns and analyze performance metrics.\n- Excellent written and verbal communication skills.\n- Proficiency in Adobe Creative Suite (Photoshop, InDesign) is a plus.\n\nResponsibilities include:\n- Developing and executing marketing strategies for new product launches.\n- Coordinating with the sales team to align promotional materials.\n- Managing the company's social media presence and content calendar.\n- Preparing monthly reports on campaign effectiveness.\n\nTo apply, please send your resume and cover letter to hr@greenleafsolutions.com by October 15.\n\nText B\nApplication Email\n\nTo: hr@greenleafsolutions.com\nFrom: janedoe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With a Bachelor's degree in Marketing from the University of Illinois and three years of experience at EcoBrand Inc., where I managed social media campaigns and coordinated product launches, I believe I am a strong candidate for this role.\n\nAt EcoBrand, I increased our Instagram engagement by 40% over two years and successfully launched three new product lines. I am also proficient in Adobe Creative Suite and have used it to create promotional materials. I am passionate about sustainability and eager to contribute to GreenLeaf's mission.\n\nI have attached my resume and cover letter for your review. Thank you for considering my application.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-003",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-082",
    "part": "Part 7",
    "question": "Based on both texts, which of the following is true about Jane Doe's application?",
    "choices": {
      "A": "She has no experience in managing social media campaigns.",
      "B": "She applied after the application deadline.",
      "C": "She did not attach her resume and cover letter.",
      "D": "She meets all the requirements listed in the job posting."
    },
    "answer": "D",
    "explanation_zh": "Text D要求學士學位、2年經驗、社交媒體管理能力、Adobe熟練（優先）。Text A中Jane有市場營銷學士學位、3年經驗、社交媒體管理經驗、Adobe熟練，並提到附件。因此她滿足所有要求。A錯誤，她有經驗。B錯誤，沒有提到截止日期已過。C錯誤，她明確說附上了簡歷和求職信。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "requirement",
      "deadline",
      "attachment",
      "qualification"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Chicago, IL\nPosition: Marketing Coordinator (Full-time)\n\nGreenLeaf Solutions, a leading provider of eco-friendly packaging, is seeking a Marketing Coordinator to join our growing team. The ideal candidate will have:\n\n- Bachelor's degree in Marketing, Business, or a related field.\n- 2+ years of experience in marketing, preferably in the sustainability sector.\n- Proven ability to manage social media campaigns and analyze performance metrics.\n- Excellent written and verbal communication skills.\n- Proficiency in Adobe Creative Suite (Photoshop, InDesign) is a plus.\n\nResponsibilities include:\n- Developing and executing marketing strategies for new product launches.\n- Coordinating with the sales team to align promotional materials.\n- Managing the company's social media presence and content calendar.\n- Preparing monthly reports on campaign effectiveness.\n\nTo apply, please send your resume and cover letter to hr@greenleafsolutions.com by October 15.\n\nText B\nApplication Email\n\nTo: hr@greenleafsolutions.com\nFrom: janedoe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With a Bachelor's degree in Marketing from the University of Illinois and three years of experience at EcoBrand Inc., where I managed social media campaigns and coordinated product launches, I believe I am a strong candidate for this role.\n\nAt EcoBrand, I increased our Instagram engagement by 40% over two years and successfully launched three new product lines. I am also proficient in Adobe Creative Suite and have used it to create promotional materials. I am passionate about sustainability and eager to contribute to GreenLeaf's mission.\n\nI have attached my resume and cover letter for your review. Thank you for considering my application.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-003",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-092",
    "part": "Part 7",
    "question": "What is the main issue described in the complaint?",
    "choices": {
      "A": "The customer received the wrong model of solar charger.",
      "B": "The customer received a defective solar charger that does not charge.",
      "C": "The solar charger does not charge because of a faulty LED indicator.",
      "D": "The customer is unhappy with the delivery time of the product."
    },
    "answer": "B",
    "explanation_zh": "投訴郵件中明確指出，客戶收到的太陽能充電器無法充電，LED指示燈在陽光下六小時後仍未亮起，表明產品有缺陷。選項B正確概括了主要問題。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "faulty",
      "defective",
      "unit",
      "prompt"
    ],
    "passage": "Email 1 (Customer Complaint)\nTo: support@greentechnologies.com\nFrom: robert.chen@email.com\nSubject: Faulty Solar Charger – Order #GH4821\n\nDear Customer Support,\n\nI received my order of the Model S Solar Charger (Order #GH4821) yesterday. Unfortunately, the unit does not charge at all. The LED indicator never turns on, even after being placed in direct sunlight for over six hours. I tried using different USB cables, but the problem persists. This is the second defective unit I have received from Green Technologies this year. I am extremely disappointed, as I rely on this product for my hiking trips. Please advise on a replacement or a full refund. I expect a prompt response.\n\nSincerely,\nRobert Chen\n\nEmail 2 (Customer Service Reply)\nTo: robert.chen@email.com\nFrom: sarah.johnson@greentechnologies.com\nSubject: Re: Faulty Solar Charger – Order #GH4821\n\nDear Mr. Chen,\n\nThank you for contacting us. I apologize for the inconvenience caused by the defective unit. We take quality control seriously, and your feedback helps us improve. After checking your order history, I see this is your first complaint regarding a faulty product. To resolve this, we will send you a replacement Model S Solar Charger at no additional cost, along with a prepaid return label for the defective unit. The replacement will ship within 2 business days. If you prefer a full refund, please let me know. We value your business and hope to restore your trust.\n\nBest regards,\nSarah Johnson\nCustomer Service Manager\nGreen Technologies",
    "passage_group_id": "p7-double-004",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-093",
    "part": "Part 7",
    "question": "What did Robert Chen do to troubleshoot the problem?",
    "choices": {
      "A": "He tested the charger with different USB cables.",
      "B": "He requested a replacement from a different company.",
      "C": "He called customer support before sending an email.",
      "D": "He left the charger in sunlight for two hours."
    },
    "answer": "A",
    "explanation_zh": "投訴郵件中提到，客戶嘗試了不同的USB數據線，但問題仍然存在。選項A正確描述了這一細節。選項C和B未提及，選項D的時間不準確。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "troubleshoot",
      "persists",
      "LED indicator",
      "USB cables"
    ],
    "passage": "Email 1 (Customer Complaint)\nTo: support@greentechnologies.com\nFrom: robert.chen@email.com\nSubject: Faulty Solar Charger – Order #GH4821\n\nDear Customer Support,\n\nI received my order of the Model S Solar Charger (Order #GH4821) yesterday. Unfortunately, the unit does not charge at all. The LED indicator never turns on, even after being placed in direct sunlight for over six hours. I tried using different USB cables, but the problem persists. This is the second defective unit I have received from Green Technologies this year. I am extremely disappointed, as I rely on this product for my hiking trips. Please advise on a replacement or a full refund. I expect a prompt response.\n\nSincerely,\nRobert Chen\n\nEmail 2 (Customer Service Reply)\nTo: robert.chen@email.com\nFrom: sarah.johnson@greentechnologies.com\nSubject: Re: Faulty Solar Charger – Order #GH4821\n\nDear Mr. Chen,\n\nThank you for contacting us. I apologize for the inconvenience caused by the defective unit. We take quality control seriously, and your feedback helps us improve. After checking your order history, I see this is your first complaint regarding a faulty product. To resolve this, we will send you a replacement Model S Solar Charger at no additional cost, along with a prepaid return label for the defective unit. The replacement will ship within 2 business days. If you prefer a full refund, please let me know. We value your business and hope to restore your trust.\n\nBest regards,\nSarah Johnson\nCustomer Service Manager\nGreen Technologies",
    "passage_group_id": "p7-double-004",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-094",
    "part": "Part 7",
    "question": "According to the customer service reply, what does Sarah Johnson say about Robert's order history?",
    "choices": {
      "A": "This is his first complaint about a faulty product.",
      "B": "His previous orders were all refunded.",
      "C": "He has received two defective units from the company.",
      "D": "He has ordered multiple solar chargers in the past."
    },
    "answer": "A",
    "explanation_zh": "客服回覆中寫道，檢查訂單歷史後發現，這是客戶首次對故障產品提出投訴。選項A準確反映了這一信息。選項C是客戶在投訴中提到的，但客服回覆中並未確認。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "order history",
      "complaint",
      "faulty product",
      "prepaid return label"
    ],
    "passage": "Email 1 (Customer Complaint)\nTo: support@greentechnologies.com\nFrom: robert.chen@email.com\nSubject: Faulty Solar Charger – Order #GH4821\n\nDear Customer Support,\n\nI received my order of the Model S Solar Charger (Order #GH4821) yesterday. Unfortunately, the unit does not charge at all. The LED indicator never turns on, even after being placed in direct sunlight for over six hours. I tried using different USB cables, but the problem persists. This is the second defective unit I have received from Green Technologies this year. I am extremely disappointed, as I rely on this product for my hiking trips. Please advise on a replacement or a full refund. I expect a prompt response.\n\nSincerely,\nRobert Chen\n\nEmail 2 (Customer Service Reply)\nTo: robert.chen@email.com\nFrom: sarah.johnson@greentechnologies.com\nSubject: Re: Faulty Solar Charger – Order #GH4821\n\nDear Mr. Chen,\n\nThank you for contacting us. I apologize for the inconvenience caused by the defective unit. We take quality control seriously, and your feedback helps us improve. After checking your order history, I see this is your first complaint regarding a faulty product. To resolve this, we will send you a replacement Model S Solar Charger at no additional cost, along with a prepaid return label for the defective unit. The replacement will ship within 2 business days. If you prefer a full refund, please let me know. We value your business and hope to restore your trust.\n\nBest regards,\nSarah Johnson\nCustomer Service Manager\nGreen Technologies",
    "passage_group_id": "p7-double-004",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-095",
    "part": "Part 7",
    "question": "What can be inferred about Robert Chen's experience with Green Technologies?",
    "choices": {
      "A": "He will receive a full refund immediately.",
      "B": "He has received at least one defective product from them previously.",
      "C": "He is likely to accept the replacement offer based on his tone.",
      "D": "He has never had a problem with their products before."
    },
    "answer": "B",
    "explanation_zh": "投訴郵件中提到，這是客戶今年第二次收到有缺陷的產品，表明他之前至少收到過一個有缺陷的產品。選項B正確推斷出這一點。選項D與事實相反。選項C無法從語氣中推斷，因為客戶表示失望。選項A未提及，客服提供的是更換選項。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "defective",
      "previously",
      "tone"
    ],
    "passage": "Email 1 (Customer Complaint)\nTo: support@greentechnologies.com\nFrom: robert.chen@email.com\nSubject: Faulty Solar Charger – Order #GH4821\n\nDear Customer Support,\n\nI received my order of the Model S Solar Charger (Order #GH4821) yesterday. Unfortunately, the unit does not charge at all. The LED indicator never turns on, even after being placed in direct sunlight for over six hours. I tried using different USB cables, but the problem persists. This is the second defective unit I have received from Green Technologies this year. I am extremely disappointed, as I rely on this product for my hiking trips. Please advise on a replacement or a full refund. I expect a prompt response.\n\nSincerely,\nRobert Chen\n\nEmail 2 (Customer Service Reply)\nTo: robert.chen@email.com\nFrom: sarah.johnson@greentechnologies.com\nSubject: Re: Faulty Solar Charger – Order #GH4821\n\nDear Mr. Chen,\n\nThank you for contacting us. I apologize for the inconvenience caused by the defective unit. We take quality control seriously, and your feedback helps us improve. After checking your order history, I see this is your first complaint regarding a faulty product. To resolve this, we will send you a replacement Model S Solar Charger at no additional cost, along with a prepaid return label for the defective unit. The replacement will ship within 2 business days. If you prefer a full refund, please let me know. We value your business and hope to restore your trust.\n\nBest regards,\nSarah Johnson\nCustomer Service Manager\nGreen Technologies",
    "passage_group_id": "p7-double-004",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-096",
    "part": "Part 7",
    "question": "What discrepancy exists between the customer's complaint and the customer service reply?",
    "choices": {
      "A": "The customer says the charger was left in sunlight for six hours, but the reply says it was two hours.",
      "B": "The customer ordered a different model, but the reply mentions the Model S.",
      "C": "The customer wants a refund, but the reply only offers a replacement.",
      "D": "The customer claims this is the second defective unit, but the reply says it is his first complaint."
    },
    "answer": "D",
    "explanation_zh": "投訴郵件中客戶稱這是今年第二次收到有缺陷的產品，但客服回覆中卻表示，根據訂單歷史，這是客戶首次對故障產品提出投訴。這一矛盾表明兩封郵件之間存在差異。選項D正確指出了這一點。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "discrepancy",
      "defective unit",
      "complaint",
      "order history"
    ],
    "passage": "Email 1 (Customer Complaint)\nTo: support@greentechnologies.com\nFrom: robert.chen@email.com\nSubject: Faulty Solar Charger – Order #GH4821\n\nDear Customer Support,\n\nI received my order of the Model S Solar Charger (Order #GH4821) yesterday. Unfortunately, the unit does not charge at all. The LED indicator never turns on, even after being placed in direct sunlight for over six hours. I tried using different USB cables, but the problem persists. This is the second defective unit I have received from Green Technologies this year. I am extremely disappointed, as I rely on this product for my hiking trips. Please advise on a replacement or a full refund. I expect a prompt response.\n\nSincerely,\nRobert Chen\n\nEmail 2 (Customer Service Reply)\nTo: robert.chen@email.com\nFrom: sarah.johnson@greentechnologies.com\nSubject: Re: Faulty Solar Charger – Order #GH4821\n\nDear Mr. Chen,\n\nThank you for contacting us. I apologize for the inconvenience caused by the defective unit. We take quality control seriously, and your feedback helps us improve. After checking your order history, I see this is your first complaint regarding a faulty product. To resolve this, we will send you a replacement Model S Solar Charger at no additional cost, along with a prepaid return label for the defective unit. The replacement will ship within 2 business days. If you prefer a full refund, please let me know. We value your business and hope to restore your trust.\n\nBest regards,\nSarah Johnson\nCustomer Service Manager\nGreen Technologies",
    "passage_group_id": "p7-double-004",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-097",
    "part": "Part 7",
    "question": "What position is Alex Chen applying for?",
    "choices": {
      "A": "Senior Data Analyst",
      "B": "Junior Data Analyst",
      "C": "Data Engineer",
      "D": "Data Scientist"
    },
    "answer": "A",
    "explanation_zh": "申請郵件第一句明確提到'我寫信是為了表達對BlueSky Solutions Inc.高級數據分析師職位的強烈興趣'，因此申請的是Senior Data Analyst職位。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "Senior Data Analyst",
      "application",
      "position",
      "interest"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Senior Data Analyst\nCompany: BlueSky Solutions Inc.\nLocation: Chicago, IL\n\nWe are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a proven track record of delivering actionable insights. Responsibilities include developing dashboards, performing statistical analysis, and collaborating with cross-functional teams. A bachelor’s degree in a quantitative field is required; a master’s degree is preferred. To apply, submit your resume and a cover letter detailing your relevant experience to careers@bluesky.com by March 15.\n\nText 2: Application Email\n\nTo: careers@bluesky.com\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Data Analyst position at BlueSky Solutions Inc. As a data professional with over six years of experience, I have developed expertise in SQL and Python, which I used to create predictive models that increased sales efficiency by 15% at my current company. I have also led the design of interactive dashboards that improved decision-making for management. I hold an MBA from a top university, which complements my analytical background. I am eager to bring my skills to BlueSky and contribute to your team. Please find my resume attached. Thank you for considering my application.\n\nSincerely,\nAlex Chen",
    "passage_group_id": "p7-double-005",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-098",
    "part": "Part 7",
    "question": "According to the job posting, which of the following is a required qualification?",
    "choices": {
      "A": "Experience with predictive modeling",
      "B": "Familiarity with dashboard design",
      "C": "A master’s degree in a quantitative field",
      "D": "At least 5 years of experience in data analysis"
    },
    "answer": "D",
    "explanation_zh": "招聘廣告中明確寫道'理想的候選人至少要有5年數據分析經驗'，這是必要條件。而碩士學位只是偏好，不是必須。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "required qualification",
      "experience",
      "master's degree",
      "preferred"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Senior Data Analyst\nCompany: BlueSky Solutions Inc.\nLocation: Chicago, IL\n\nWe are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a proven track record of delivering actionable insights. Responsibilities include developing dashboards, performing statistical analysis, and collaborating with cross-functional teams. A bachelor’s degree in a quantitative field is required; a master’s degree is preferred. To apply, submit your resume and a cover letter detailing your relevant experience to careers@bluesky.com by March 15.\n\nText 2: Application Email\n\nTo: careers@bluesky.com\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Data Analyst position at BlueSky Solutions Inc. As a data professional with over six years of experience, I have developed expertise in SQL and Python, which I used to create predictive models that increased sales efficiency by 15% at my current company. I have also led the design of interactive dashboards that improved decision-making for management. I hold an MBA from a top university, which complements my analytical background. I am eager to bring my skills to BlueSky and contribute to your team. Please find my resume attached. Thank you for considering my application.\n\nSincerely,\nAlex Chen",
    "passage_group_id": "p7-double-005",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-099",
    "part": "Part 7",
    "question": "What can be inferred about Alex Chen’s educational background?",
    "choices": {
      "A": "He has a master’s degree in business administration.",
      "B": "He has a bachelor’s degree in a quantitative field.",
      "C": "He studied data science at a top university.",
      "D": "He does not have any advanced degree."
    },
    "answer": "A",
    "explanation_zh": "申請郵件中提到'我擁有頂尖大學的MBA學位'，因此可以推斷他擁有工商管理碩士學位。而招聘廣告要求的是定量領域的學士學位（優先碩士），他的MBA符合碩士學歷，但並非定量領域，不過郵件未提及其他本科學位。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "inferred",
      "educational background",
      "MBA",
      "degree"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Senior Data Analyst\nCompany: BlueSky Solutions Inc.\nLocation: Chicago, IL\n\nWe are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a proven track record of delivering actionable insights. Responsibilities include developing dashboards, performing statistical analysis, and collaborating with cross-functional teams. A bachelor’s degree in a quantitative field is required; a master’s degree is preferred. To apply, submit your resume and a cover letter detailing your relevant experience to careers@bluesky.com by March 15.\n\nText 2: Application Email\n\nTo: careers@bluesky.com\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Data Analyst position at BlueSky Solutions Inc. As a data professional with over six years of experience, I have developed expertise in SQL and Python, which I used to create predictive models that increased sales efficiency by 15% at my current company. I have also led the design of interactive dashboards that improved decision-making for management. I hold an MBA from a top university, which complements my analytical background. I am eager to bring my skills to BlueSky and contribute to your team. Please find my resume attached. Thank you for considering my application.\n\nSincerely,\nAlex Chen",
    "passage_group_id": "p7-double-005",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-100",
    "part": "Part 7",
    "question": "Which of the following job responsibilities mentioned in the posting does Alex Chen’s application specifically address?",
    "choices": {
      "A": "Developing dashboards",
      "B": "Performing statistical analysis",
      "C": "Collaborating with cross-functional teams",
      "D": "Submitting a cover letter"
    },
    "answer": "A",
    "explanation_zh": "招聘廣告中提到職責包括開發儀表板，而申請郵件中明確說'我也主導設計了交互式儀表板'，因此他直接提到了開發儀表板這一職責。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "responsibilities",
      "dashboard",
      "application",
      "cross-reference"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Senior Data Analyst\nCompany: BlueSky Solutions Inc.\nLocation: Chicago, IL\n\nWe are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a proven track record of delivering actionable insights. Responsibilities include developing dashboards, performing statistical analysis, and collaborating with cross-functional teams. A bachelor’s degree in a quantitative field is required; a master’s degree is preferred. To apply, submit your resume and a cover letter detailing your relevant experience to careers@bluesky.com by March 15.\n\nText 2: Application Email\n\nTo: careers@bluesky.com\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Data Analyst position at BlueSky Solutions Inc. As a data professional with over six years of experience, I have developed expertise in SQL and Python, which I used to create predictive models that increased sales efficiency by 15% at my current company. I have also led the design of interactive dashboards that improved decision-making for management. I hold an MBA from a top university, which complements my analytical background. I am eager to bring my skills to BlueSky and contribute to your team. Please find my resume attached. Thank you for considering my application.\n\nSincerely,\nAlex Chen",
    "passage_group_id": "p7-double-005",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-101",
    "part": "Part 7",
    "question": "What is the main purpose of the job posting?",
    "choices": {
      "A": "To announce a new project",
      "B": "To describe the company’s growth",
      "C": "To advertise a job opening and attract applicants",
      "D": "To compare different data analyst roles"
    },
    "answer": "C",
    "explanation_zh": "招聘廣告的主要目的是發佈高級數據分析師的職位空缺，列出要求和申請方式，以吸引合格的候選人。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "main purpose",
      "job posting",
      "advertise",
      "attract applicants"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Senior Data Analyst\nCompany: BlueSky Solutions Inc.\nLocation: Chicago, IL\n\nWe are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will have at least 5 years of experience in data analysis, proficiency in SQL and Python, and a proven track record of delivering actionable insights. Responsibilities include developing dashboards, performing statistical analysis, and collaborating with cross-functional teams. A bachelor’s degree in a quantitative field is required; a master’s degree is preferred. To apply, submit your resume and a cover letter detailing your relevant experience to careers@bluesky.com by March 15.\n\nText 2: Application Email\n\nTo: careers@bluesky.com\nSubject: Application for Senior Data Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Data Analyst position at BlueSky Solutions Inc. As a data professional with over six years of experience, I have developed expertise in SQL and Python, which I used to create predictive models that increased sales efficiency by 15% at my current company. I have also led the design of interactive dashboards that improved decision-making for management. I hold an MBA from a top university, which complements my analytical background. I am eager to bring my skills to BlueSky and contribute to your team. Please find my resume attached. Thank you for considering my application.\n\nSincerely,\nAlex Chen",
    "passage_group_id": "p7-double-005",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-119",
    "part": "Part 7",
    "question": "What is the main issue in Mr. Smith's complaint?",
    "choices": {
      "A": "He received the wrong item.",
      "B": "The product was defective.",
      "C": "He was overcharged for his order.",
      "D": "The product was delivered late."
    },
    "answer": "A",
    "explanation_zh": "根據第一封郵件，史密斯先生明確說明他訂購了EcoCharge Pro，但收到了EcoCharge Mini，因此主要問題是收到了錯誤的商品。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "complaint",
      "incorrect",
      "refund",
      "compensation"
    ],
    "passage": "Email 1:\nTo: support@greentech.com\nFrom: j.smith@email.com\nSubject: Incorrect item received\n\nDear GreenTech Customer Service,\n\nI am writing to report an issue with my recent order (#GT-7842). I ordered the EcoCharge Pro portable battery pack, but I received the EcoCharge Mini instead. This is the second time this has happened with your company. I need the correct product for an upcoming business trip next week. Please send the right item as soon as possible or issue a full refund. I expect a prompt response.\n\nSincerely,\nJames Smith\n\nEmail 2:\nTo: j.smith@email.com\nFrom: support@greentech.com\nSubject: Re: Incorrect item received\n\nDear Mr. Smith,\n\nThank you for contacting us about your order. We sincerely apologize for the error. I have checked our inventory and we can ship the correct EcoCharge Pro to you today via express delivery, which should arrive within two business days. As compensation for your inconvenience, we would like to offer you a 20% discount on your next purchase. Please confirm your current shipping address so we can process the replacement.\n\nBest regards,\nLinda Chen\nCustomer Service Manager",
    "passage_group_id": "p7-double-006",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-120",
    "part": "Part 7",
    "question": "According to the complaint email, what did Mr. Smith request?",
    "choices": {
      "A": "Express delivery of the correct item.",
      "B": "A call from the customer service manager.",
      "C": "A replacement battery pack or a full refund.",
      "D": "A 20% discount on his next purchase."
    },
    "answer": "C",
    "explanation_zh": "在第一封郵件中，史密斯先生要求要麼儘快發送正確的商品，要麼全額退款。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "request",
      "replacement",
      "refund",
      "prompt"
    ],
    "passage": "Email 1:\nTo: support@greentech.com\nFrom: j.smith@email.com\nSubject: Incorrect item received\n\nDear GreenTech Customer Service,\n\nI am writing to report an issue with my recent order (#GT-7842). I ordered the EcoCharge Pro portable battery pack, but I received the EcoCharge Mini instead. This is the second time this has happened with your company. I need the correct product for an upcoming business trip next week. Please send the right item as soon as possible or issue a full refund. I expect a prompt response.\n\nSincerely,\nJames Smith\n\nEmail 2:\nTo: j.smith@email.com\nFrom: support@greentech.com\nSubject: Re: Incorrect item received\n\nDear Mr. Smith,\n\nThank you for contacting us about your order. We sincerely apologize for the error. I have checked our inventory and we can ship the correct EcoCharge Pro to you today via express delivery, which should arrive within two business days. As compensation for your inconvenience, we would like to offer you a 20% discount on your next purchase. Please confirm your current shipping address so we can process the replacement.\n\nBest regards,\nLinda Chen\nCustomer Service Manager",
    "passage_group_id": "p7-double-006",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-121",
    "part": "Part 7",
    "question": "What does Linda Chen offer as compensation?",
    "choices": {
      "A": "A free upgrade to a larger battery pack.",
      "B": "A full refund of the purchase price.",
      "C": "A 20% discount on a future order.",
      "D": "Free express shipping for the replacement."
    },
    "answer": "C",
    "explanation_zh": "在第二封郵件中，Linda Chen提出作為不便的補償，給予下次購買20%的折扣。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "compensation",
      "discount",
      "inconvenience",
      "express delivery"
    ],
    "passage": "Email 1:\nTo: support@greentech.com\nFrom: j.smith@email.com\nSubject: Incorrect item received\n\nDear GreenTech Customer Service,\n\nI am writing to report an issue with my recent order (#GT-7842). I ordered the EcoCharge Pro portable battery pack, but I received the EcoCharge Mini instead. This is the second time this has happened with your company. I need the correct product for an upcoming business trip next week. Please send the right item as soon as possible or issue a full refund. I expect a prompt response.\n\nSincerely,\nJames Smith\n\nEmail 2:\nTo: j.smith@email.com\nFrom: support@greentech.com\nSubject: Re: Incorrect item received\n\nDear Mr. Smith,\n\nThank you for contacting us about your order. We sincerely apologize for the error. I have checked our inventory and we can ship the correct EcoCharge Pro to you today via express delivery, which should arrive within two business days. As compensation for your inconvenience, we would like to offer you a 20% discount on your next purchase. Please confirm your current shipping address so we can process the replacement.\n\nBest regards,\nLinda Chen\nCustomer Service Manager",
    "passage_group_id": "p7-double-006",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-122",
    "part": "Part 7",
    "question": "What can be inferred about Mr. Smith's previous experience with GreenTech?",
    "choices": {
      "A": "He has never complained before.",
      "B": "He has received the wrong item from them before.",
      "C": "He was satisfied with their service previously.",
      "D": "He had requested a refund in the past."
    },
    "answer": "B",
    "explanation_zh": "從第一封郵件中“This is the second time this has happened with your company”可以推斷，史密斯先生之前也遇到過收到錯誤商品的情況。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "previous",
      "experience",
      "infer",
      "complaint"
    ],
    "passage": "Email 1:\nTo: support@greentech.com\nFrom: j.smith@email.com\nSubject: Incorrect item received\n\nDear GreenTech Customer Service,\n\nI am writing to report an issue with my recent order (#GT-7842). I ordered the EcoCharge Pro portable battery pack, but I received the EcoCharge Mini instead. This is the second time this has happened with your company. I need the correct product for an upcoming business trip next week. Please send the right item as soon as possible or issue a full refund. I expect a prompt response.\n\nSincerely,\nJames Smith\n\nEmail 2:\nTo: j.smith@email.com\nFrom: support@greentech.com\nSubject: Re: Incorrect item received\n\nDear Mr. Smith,\n\nThank you for contacting us about your order. We sincerely apologize for the error. I have checked our inventory and we can ship the correct EcoCharge Pro to you today via express delivery, which should arrive within two business days. As compensation for your inconvenience, we would like to offer you a 20% discount on your next purchase. Please confirm your current shipping address so we can process the replacement.\n\nBest regards,\nLinda Chen\nCustomer Service Manager",
    "passage_group_id": "p7-double-006",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-123",
    "part": "Part 7",
    "question": "What must Mr. Smith do to receive the replacement?",
    "choices": {
      "A": "Pay for express shipping.",
      "B": "Confirm his current shipping address.",
      "C": "Place a new order for the correct item.",
      "D": "Return the wrong item first."
    },
    "answer": "B",
    "explanation_zh": "在第二封郵件中，Linda Chen要求史密斯先生確認當前收貨地址，以便處理更換事宜。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "replacement",
      "confirm",
      "address",
      "process"
    ],
    "passage": "Email 1:\nTo: support@greentech.com\nFrom: j.smith@email.com\nSubject: Incorrect item received\n\nDear GreenTech Customer Service,\n\nI am writing to report an issue with my recent order (#GT-7842). I ordered the EcoCharge Pro portable battery pack, but I received the EcoCharge Mini instead. This is the second time this has happened with your company. I need the correct product for an upcoming business trip next week. Please send the right item as soon as possible or issue a full refund. I expect a prompt response.\n\nSincerely,\nJames Smith\n\nEmail 2:\nTo: j.smith@email.com\nFrom: support@greentech.com\nSubject: Re: Incorrect item received\n\nDear Mr. Smith,\n\nThank you for contacting us about your order. We sincerely apologize for the error. I have checked our inventory and we can ship the correct EcoCharge Pro to you today via express delivery, which should arrive within two business days. As compensation for your inconvenience, we would like to offer you a 20% discount on your next purchase. Please confirm your current shipping address so we can process the replacement.\n\nBest regards,\nLinda Chen\nCustomer Service Manager",
    "passage_group_id": "p7-double-006",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-127",
    "part": "Part 7",
    "question": "What position is Jane Smith applying for?",
    "choices": {
      "A": "Data Scientist",
      "B": "Junior Data Analyst",
      "C": "Business Analyst",
      "D": "Senior Data Analyst"
    },
    "answer": "D",
    "explanation_zh": "從短信B的標題和短信D的第一句可以看出，Jane Smith申請的是高級數據分析師（Senior Data Analyst）職位。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "position",
      "analyst",
      "submit",
      "apply",
      "resume"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\nCompany: FinCore Solutions\nLocation: New York, NY\n\nFinCore Solutions is seeking a Senior Data Analyst to join our analytics team. The ideal candidate will have a minimum of 3 years of experience in data analysis, proficiency in SQL and Python, and a strong understanding of statistical modeling. Responsibilities include developing data dashboards, presenting insights to management, and collaborating with cross-functional teams to drive business decisions. A bachelor’s degree in a related field is required; a master’s degree is preferred. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@fincore.com by March 15.\n\nText B: Cover Letter\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at FinCore Solutions, as advertised on your website. With a Master of Science in Data Science from Columbia University and over four years of experience as a data analyst at TechBridge Inc., I am confident in my ability to contribute to your team. In my current role, I have developed interactive dashboards using Tableau and SQL, and I regularly present findings to senior leadership. I also have advanced Python skills for data manipulation and statistical analysis. I am particularly drawn to FinCore’s focus on data-driven decision-making. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-double-007",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-128",
    "part": "Part 7",
    "question": "Which of the following is a requirement mentioned in the job posting?",
    "choices": {
      "A": "A master’s degree",
      "B": "Proficiency in SQL and Python",
      "C": "Experience with Tableau",
      "D": "Five years of experience"
    },
    "answer": "B",
    "explanation_zh": "招聘啟事中明確要求“proficiency in SQL and Python”，這是崗位的必要條件之一。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "requirement",
      "proficiency",
      "experience",
      "degree",
      "skill"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\nCompany: FinCore Solutions\nLocation: New York, NY\n\nFinCore Solutions is seeking a Senior Data Analyst to join our analytics team. The ideal candidate will have a minimum of 3 years of experience in data analysis, proficiency in SQL and Python, and a strong understanding of statistical modeling. Responsibilities include developing data dashboards, presenting insights to management, and collaborating with cross-functional teams to drive business decisions. A bachelor’s degree in a related field is required; a master’s degree is preferred. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@fincore.com by March 15.\n\nText B: Cover Letter\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at FinCore Solutions, as advertised on your website. With a Master of Science in Data Science from Columbia University and over four years of experience as a data analyst at TechBridge Inc., I am confident in my ability to contribute to your team. In my current role, I have developed interactive dashboards using Tableau and SQL, and I regularly present findings to senior leadership. I also have advanced Python skills for data manipulation and statistical analysis. I am particularly drawn to FinCore’s focus on data-driven decision-making. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-double-007",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-129",
    "part": "Part 7",
    "question": "What qualification does Jane Smith have that is not explicitly required in the job posting?",
    "choices": {
      "A": "Experience with Tableau",
      "B": "A master’s degree",
      "C": "Python skills",
      "D": "Ability to present to management"
    },
    "answer": "A",
    "explanation_zh": "招聘啟事中未提及Tableau技能，而求職信中提到她使用Tableau開發儀表盤，這是額外資質。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "qualification",
      "explicitly",
      "dashboard",
      "skill",
      "experience"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\nCompany: FinCore Solutions\nLocation: New York, NY\n\nFinCore Solutions is seeking a Senior Data Analyst to join our analytics team. The ideal candidate will have a minimum of 3 years of experience in data analysis, proficiency in SQL and Python, and a strong understanding of statistical modeling. Responsibilities include developing data dashboards, presenting insights to management, and collaborating with cross-functional teams to drive business decisions. A bachelor’s degree in a related field is required; a master’s degree is preferred. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@fincore.com by March 15.\n\nText B: Cover Letter\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at FinCore Solutions, as advertised on your website. With a Master of Science in Data Science from Columbia University and over four years of experience as a data analyst at TechBridge Inc., I am confident in my ability to contribute to your team. In my current role, I have developed interactive dashboards using Tableau and SQL, and I regularly present findings to senior leadership. I also have advanced Python skills for data manipulation and statistical analysis. I am particularly drawn to FinCore’s focus on data-driven decision-making. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-double-007",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-130",
    "part": "Part 7",
    "question": "How does Jane Smith’s experience match the job requirements?",
    "choices": {
      "A": "She has a bachelor’s degree but not a master’s",
      "B": "She has more than the minimum required experience",
      "C": "She has exactly three years of experience",
      "D": "She lacks experience with cross-functional teams"
    },
    "answer": "B",
    "explanation_zh": "招聘要求至少3年經驗，而Jane Smith有4年以上經驗，因此超過了最低要求。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "experience",
      "requirement",
      "match",
      "minimum",
      "exceed"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\nCompany: FinCore Solutions\nLocation: New York, NY\n\nFinCore Solutions is seeking a Senior Data Analyst to join our analytics team. The ideal candidate will have a minimum of 3 years of experience in data analysis, proficiency in SQL and Python, and a strong understanding of statistical modeling. Responsibilities include developing data dashboards, presenting insights to management, and collaborating with cross-functional teams to drive business decisions. A bachelor’s degree in a related field is required; a master’s degree is preferred. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@fincore.com by March 15.\n\nText B: Cover Letter\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at FinCore Solutions, as advertised on your website. With a Master of Science in Data Science from Columbia University and over four years of experience as a data analyst at TechBridge Inc., I am confident in my ability to contribute to your team. In my current role, I have developed interactive dashboards using Tableau and SQL, and I regularly present findings to senior leadership. I also have advanced Python skills for data manipulation and statistical analysis. I am particularly drawn to FinCore’s focus on data-driven decision-making. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-double-007",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-131",
    "part": "Part 7",
    "question": "What is the main purpose of the job posting?",
    "choices": {
      "A": "To advertise a job opening and invite applications",
      "B": "To announce a new department at the company",
      "C": "To request feedback on the hiring process",
      "D": "To describe the company's data analysis projects"
    },
    "answer": "A",
    "explanation_zh": "招聘啟事的主要目的是發佈職位空缺並邀請申請，文中包含了職位、要求、職責和申請方式。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "purpose",
      "advertise",
      "opening",
      "application",
      "process"
    ],
    "passage": "Text A: Job Advertisement\n\nPosition: Senior Data Analyst\nCompany: FinCore Solutions\nLocation: New York, NY\n\nFinCore Solutions is seeking a Senior Data Analyst to join our analytics team. The ideal candidate will have a minimum of 3 years of experience in data analysis, proficiency in SQL and Python, and a strong understanding of statistical modeling. Responsibilities include developing data dashboards, presenting insights to management, and collaborating with cross-functional teams to drive business decisions. A bachelor’s degree in a related field is required; a master’s degree is preferred. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@fincore.com by March 15.\n\nText B: Cover Letter\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Data Analyst position at FinCore Solutions, as advertised on your website. With a Master of Science in Data Science from Columbia University and over four years of experience as a data analyst at TechBridge Inc., I am confident in my ability to contribute to your team. In my current role, I have developed interactive dashboards using Tableau and SQL, and I regularly present findings to senior leadership. I also have advanced Python skills for data manipulation and statistical analysis. I am particularly drawn to FinCore’s focus on data-driven decision-making. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-double-007",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-141",
    "part": "Part 7",
    "question": "What is the main issue described in the complaint email?",
    "choices": {
      "A": "The customer was overcharged for the order",
      "B": "The customer received a damaged product",
      "C": "The customer received the wrong item and had not received a timely response",
      "D": "The customer's order was lost during shipping"
    },
    "answer": "C",
    "explanation_zh": "主要問題是客戶收到了錯誤的商品（灰色布藝椅子而非黑色皮椅），並且五天未收到客服回覆，選項C正確概括了這兩個問題。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "dissatisfaction",
      "resolution",
      "prepaid",
      "goodwill"
    ],
    "passage": "Dear Customer Service,\n\nI am writing to express my dissatisfaction with a recent order I placed on your website. On March 15, I ordered a black leather office chair (Order #12345). However, when the package arrived on March 20, the box contained a gray fabric chair instead. I immediately contacted your support team via email, but I have not received any response or resolution after five days. This delay is unacceptable as I need the correct chair for my new home office setup. I kindly request that you either send me the correct black leather chair or provide a full refund. Please confirm your action within 48 hours.\n\nSincerely,\nMichael Chen\n\n\nDear Mr. Chen,\n\nThank you for contacting us regarding Order #12345. We sincerely apologize for the incorrect item you received and for the delayed response. After reviewing your case, we have arranged for the correct black leather office chair to be shipped to your address today via express delivery, with an estimated arrival of two business days. Additionally, we have issued a prepaid return label for the gray fabric chair, which can be picked up by our courier at your convenience. As a gesture of goodwill, we have also applied a 15% discount code to your account for your next purchase. We hope this resolves the issue to your satisfaction. Please let us know if you need further assistance.\n\nBest regards,\nSarah Thompson\nCustomer Service Manager",
    "passage_group_id": "p7-double-008",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-142",
    "part": "Part 7",
    "question": "What item did Mr. Chen originally order?",
    "choices": {
      "A": "A gray leather office chair",
      "B": "A black fabric office chair",
      "C": "A gray fabric office chair",
      "D": "A black leather office chair"
    },
    "answer": "D",
    "explanation_zh": "投訴郵件明確說明客戶訂購的是黑色皮椅。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "ordered",
      "black leather",
      "office chair"
    ],
    "passage": "Dear Customer Service,\n\nI am writing to express my dissatisfaction with a recent order I placed on your website. On March 15, I ordered a black leather office chair (Order #12345). However, when the package arrived on March 20, the box contained a gray fabric chair instead. I immediately contacted your support team via email, but I have not received any response or resolution after five days. This delay is unacceptable as I need the correct chair for my new home office setup. I kindly request that you either send me the correct black leather chair or provide a full refund. Please confirm your action within 48 hours.\n\nSincerely,\nMichael Chen\n\n\nDear Mr. Chen,\n\nThank you for contacting us regarding Order #12345. We sincerely apologize for the incorrect item you received and for the delayed response. After reviewing your case, we have arranged for the correct black leather office chair to be shipped to your address today via express delivery, with an estimated arrival of two business days. Additionally, we have issued a prepaid return label for the gray fabric chair, which can be picked up by our courier at your convenience. As a gesture of goodwill, we have also applied a 15% discount code to your account for your next purchase. We hope this resolves the issue to your satisfaction. Please let us know if you need further assistance.\n\nBest regards,\nSarah Thompson\nCustomer Service Manager",
    "passage_group_id": "p7-double-008",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-143",
    "part": "Part 7",
    "question": "What compensation did the customer service offer?",
    "choices": {
      "A": "A free return label only",
      "B": "A replacement chair and a 15% discount on the next purchase",
      "C": "A full refund and a 15% discount",
      "D": "An apology but no compensation"
    },
    "answer": "B",
    "explanation_zh": "客服回覆中提供了換貨（發送正確椅子）和下次購物15%折扣的補償。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "compensation",
      "replacement",
      "discount code",
      "gesture of goodwill"
    ],
    "passage": "Dear Customer Service,\n\nI am writing to express my dissatisfaction with a recent order I placed on your website. On March 15, I ordered a black leather office chair (Order #12345). However, when the package arrived on March 20, the box contained a gray fabric chair instead. I immediately contacted your support team via email, but I have not received any response or resolution after five days. This delay is unacceptable as I need the correct chair for my new home office setup. I kindly request that you either send me the correct black leather chair or provide a full refund. Please confirm your action within 48 hours.\n\nSincerely,\nMichael Chen\n\n\nDear Mr. Chen,\n\nThank you for contacting us regarding Order #12345. We sincerely apologize for the incorrect item you received and for the delayed response. After reviewing your case, we have arranged for the correct black leather office chair to be shipped to your address today via express delivery, with an estimated arrival of two business days. Additionally, we have issued a prepaid return label for the gray fabric chair, which can be picked up by our courier at your convenience. As a gesture of goodwill, we have also applied a 15% discount code to your account for your next purchase. We hope this resolves the issue to your satisfaction. Please let us know if you need further assistance.\n\nBest regards,\nSarah Thompson\nCustomer Service Manager",
    "passage_group_id": "p7-double-008",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-144",
    "part": "Part 7",
    "question": "What can be inferred about the customer service's initial response time?",
    "choices": {
      "A": "They responded immediately after the complaint was filed",
      "B": "They responded within 48 hours",
      "C": "They responded within one day of the complaint",
      "D": "They did not respond until after receiving this email"
    },
    "answer": "D",
    "explanation_zh": "投訴郵件指出五天未收到回覆，客服回覆也承認了延遲，因此可以推斷客服是在收到這封投訴郵件後才回復的。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "initial response",
      "delayed",
      "complaint"
    ],
    "passage": "Dear Customer Service,\n\nI am writing to express my dissatisfaction with a recent order I placed on your website. On March 15, I ordered a black leather office chair (Order #12345). However, when the package arrived on March 20, the box contained a gray fabric chair instead. I immediately contacted your support team via email, but I have not received any response or resolution after five days. This delay is unacceptable as I need the correct chair for my new home office setup. I kindly request that you either send me the correct black leather chair or provide a full refund. Please confirm your action within 48 hours.\n\nSincerely,\nMichael Chen\n\n\nDear Mr. Chen,\n\nThank you for contacting us regarding Order #12345. We sincerely apologize for the incorrect item you received and for the delayed response. After reviewing your case, we have arranged for the correct black leather office chair to be shipped to your address today via express delivery, with an estimated arrival of two business days. Additionally, we have issued a prepaid return label for the gray fabric chair, which can be picked up by our courier at your convenience. As a gesture of goodwill, we have also applied a 15% discount code to your account for your next purchase. We hope this resolves the issue to your satisfaction. Please let us know if you need further assistance.\n\nBest regards,\nSarah Thompson\nCustomer Service Manager",
    "passage_group_id": "p7-double-008",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-145",
    "part": "Part 7",
    "question": "According to both emails, what action had Mr. Chen already taken before writing the complaint?",
    "choices": {
      "A": "He had contacted the support team via email",
      "B": "He had ordered a different chair",
      "C": "He had requested a refund",
      "D": "He had returned the wrong chair"
    },
    "answer": "A",
    "explanation_zh": "投訴郵件中提到客戶在寫投訴信前已通過電子郵件聯繫客服團隊，客服回覆也提到了之前的聯繫。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "contacted",
      "support team",
      "via email",
      "complaint"
    ],
    "passage": "Dear Customer Service,\n\nI am writing to express my dissatisfaction with a recent order I placed on your website. On March 15, I ordered a black leather office chair (Order #12345). However, when the package arrived on March 20, the box contained a gray fabric chair instead. I immediately contacted your support team via email, but I have not received any response or resolution after five days. This delay is unacceptable as I need the correct chair for my new home office setup. I kindly request that you either send me the correct black leather chair or provide a full refund. Please confirm your action within 48 hours.\n\nSincerely,\nMichael Chen\n\n\nDear Mr. Chen,\n\nThank you for contacting us regarding Order #12345. We sincerely apologize for the incorrect item you received and for the delayed response. After reviewing your case, we have arranged for the correct black leather office chair to be shipped to your address today via express delivery, with an estimated arrival of two business days. Additionally, we have issued a prepaid return label for the gray fabric chair, which can be picked up by our courier at your convenience. As a gesture of goodwill, we have also applied a 15% discount code to your account for your next purchase. We hope this resolves the issue to your satisfaction. Please let us know if you need further assistance.\n\nBest regards,\nSarah Thompson\nCustomer Service Manager",
    "passage_group_id": "p7-double-008",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-167",
    "part": "Part 7",
    "question": "What position is Alex Johnson applying for?",
    "choices": {
      "A": "Content Creator",
      "B": "SEO Specialist",
      "C": "Social Media Manager",
      "D": "Marketing Coordinator"
    },
    "answer": "D",
    "explanation_zh": "根據申請郵件的主題行和第一段，Alex明確表示對GreenLeaf Solutions的Marketing Coordinator職位感興趣。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "coordinator",
      "proficiency",
      "shortlisted",
      "candidate"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Marketing Coordinator\nCompany: GreenLeaf Solutions Inc.\nLocation: Toronto, ON\n\nGreenLeaf Solutions is seeking a highly motivated Marketing Coordinator to join our dynamic team. The ideal candidate will have 2+ years of experience in digital marketing, a strong understanding of SEO and social media analytics, and excellent communication skills. Responsibilities include managing social media accounts, creating content calendars, analyzing campaign performance, and coordinating with external vendors. Proficiency in Adobe Creative Suite and Google Analytics is required.\n\nTo apply, please send your resume and a cover letter to careers@greenleaf.com by March 15th. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With three years of experience in digital marketing at a mid-sized firm, I have honed my skills in SEO, social media management, and data analysis. In my current role, I successfully increased organic website traffic by 40% over 12 months through targeted SEO strategies.\n\nI am proficient in Google Analytics and have used it extensively to track campaign performance. While my experience with Adobe Creative Suite is limited, I am eager to expand my skills in this area. I have attached my resume and am available for an interview at your earliest convenience.\n\nThank you for considering my application.\n\nSincerely,\nAlex Johnson",
    "passage_group_id": "p7-double-009",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-168",
    "part": "Part 7",
    "question": "Which requirement from the job posting does Alex Johnson NOT fully meet?",
    "choices": {
      "A": "Strong understanding of SEO",
      "B": "Excellent communication skills",
      "C": "Proficiency in Adobe Creative Suite",
      "D": "2+ years of experience in digital marketing"
    },
    "answer": "C",
    "explanation_zh": "職位要求中明確要求'Proficiency in Adobe Creative Suite'，但Alex在申請郵件中承認'my experience with Adobe Creative Suite is limited'，因此未完全滿足該要求。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "proficiency",
      "requirement",
      "limited",
      "expand"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Marketing Coordinator\nCompany: GreenLeaf Solutions Inc.\nLocation: Toronto, ON\n\nGreenLeaf Solutions is seeking a highly motivated Marketing Coordinator to join our dynamic team. The ideal candidate will have 2+ years of experience in digital marketing, a strong understanding of SEO and social media analytics, and excellent communication skills. Responsibilities include managing social media accounts, creating content calendars, analyzing campaign performance, and coordinating with external vendors. Proficiency in Adobe Creative Suite and Google Analytics is required.\n\nTo apply, please send your resume and a cover letter to careers@greenleaf.com by March 15th. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With three years of experience in digital marketing at a mid-sized firm, I have honed my skills in SEO, social media management, and data analysis. In my current role, I successfully increased organic website traffic by 40% over 12 months through targeted SEO strategies.\n\nI am proficient in Google Analytics and have used it extensively to track campaign performance. While my experience with Adobe Creative Suite is limited, I am eager to expand my skills in this area. I have attached my resume and am available for an interview at your earliest convenience.\n\nThank you for considering my application.\n\nSincerely,\nAlex Johnson",
    "passage_group_id": "p7-double-009",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-169",
    "part": "Part 7",
    "question": "What achievement does Alex Johnson mention in his application?",
    "choices": {
      "A": "Created content calendars for GreenLeaf",
      "B": "Managed social media accounts for a large firm",
      "C": "Increased organic website traffic by 40%",
      "D": "Coordinated with external vendors"
    },
    "answer": "C",
    "explanation_zh": "Alex在申請郵件中明確提到'In my current role, I successfully increased organic website traffic by 40% over 12 months through targeted SEO strategies'，這是他的一個成就。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "achievement",
      "organic",
      "targeted",
      "traffic"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Marketing Coordinator\nCompany: GreenLeaf Solutions Inc.\nLocation: Toronto, ON\n\nGreenLeaf Solutions is seeking a highly motivated Marketing Coordinator to join our dynamic team. The ideal candidate will have 2+ years of experience in digital marketing, a strong understanding of SEO and social media analytics, and excellent communication skills. Responsibilities include managing social media accounts, creating content calendars, analyzing campaign performance, and coordinating with external vendors. Proficiency in Adobe Creative Suite and Google Analytics is required.\n\nTo apply, please send your resume and a cover letter to careers@greenleaf.com by March 15th. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With three years of experience in digital marketing at a mid-sized firm, I have honed my skills in SEO, social media management, and data analysis. In my current role, I successfully increased organic website traffic by 40% over 12 months through targeted SEO strategies.\n\nI am proficient in Google Analytics and have used it extensively to track campaign performance. While my experience with Adobe Creative Suite is limited, I am eager to expand my skills in this area. I have attached my resume and am available for an interview at your earliest convenience.\n\nThank you for considering my application.\n\nSincerely,\nAlex Johnson",
    "passage_group_id": "p7-double-009",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-170",
    "part": "Part 7",
    "question": "What can be inferred about Alex Johnson's experience with Adobe Creative Suite?",
    "choices": {
      "A": "He has some experience but not proficiency",
      "B": "He has no experience with Adobe Creative Suite",
      "C": "He prefers not to use Adobe Creative Suite",
      "D": "He is an expert in Adobe Creative Suite"
    },
    "answer": "A",
    "explanation_zh": "Alex在郵件中表示'my experience with Adobe Creative Suite is limited'，說明他有部分經驗但未達到熟練程度，因此推斷他有一些經驗但不精通。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "inferred",
      "limited",
      "proficiency",
      "experience"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Marketing Coordinator\nCompany: GreenLeaf Solutions Inc.\nLocation: Toronto, ON\n\nGreenLeaf Solutions is seeking a highly motivated Marketing Coordinator to join our dynamic team. The ideal candidate will have 2+ years of experience in digital marketing, a strong understanding of SEO and social media analytics, and excellent communication skills. Responsibilities include managing social media accounts, creating content calendars, analyzing campaign performance, and coordinating with external vendors. Proficiency in Adobe Creative Suite and Google Analytics is required.\n\nTo apply, please send your resume and a cover letter to careers@greenleaf.com by March 15th. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With three years of experience in digital marketing at a mid-sized firm, I have honed my skills in SEO, social media management, and data analysis. In my current role, I successfully increased organic website traffic by 40% over 12 months through targeted SEO strategies.\n\nI am proficient in Google Analytics and have used it extensively to track campaign performance. While my experience with Adobe Creative Suite is limited, I am eager to expand my skills in this area. I have attached my resume and am available for an interview at your earliest convenience.\n\nThank you for considering my application.\n\nSincerely,\nAlex Johnson",
    "passage_group_id": "p7-double-009",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-171",
    "part": "Part 7",
    "question": "What is the main purpose of the job posting?",
    "choices": {
      "A": "To advertise a new product line",
      "B": "To promote employee training programs",
      "C": "To recruit a Marketing Coordinator",
      "D": "To announce a company relocation"
    },
    "answer": "C",
    "explanation_zh": "職位公告的主要目的是招聘一名市場營銷協調員，公告中詳細說明了職位、要求、職責和申請方式。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "purpose",
      "recruit",
      "advertise",
      "position"
    ],
    "passage": "Text 1: Job Posting\n\nPosition: Marketing Coordinator\nCompany: GreenLeaf Solutions Inc.\nLocation: Toronto, ON\n\nGreenLeaf Solutions is seeking a highly motivated Marketing Coordinator to join our dynamic team. The ideal candidate will have 2+ years of experience in digital marketing, a strong understanding of SEO and social media analytics, and excellent communication skills. Responsibilities include managing social media accounts, creating content calendars, analyzing campaign performance, and coordinating with external vendors. Proficiency in Adobe Creative Suite and Google Analytics is required.\n\nTo apply, please send your resume and a cover letter to careers@greenleaf.com by March 15th. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nSubject: Application for Marketing Coordinator Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. With three years of experience in digital marketing at a mid-sized firm, I have honed my skills in SEO, social media management, and data analysis. In my current role, I successfully increased organic website traffic by 40% over 12 months through targeted SEO strategies.\n\nI am proficient in Google Analytics and have used it extensively to track campaign performance. While my experience with Adobe Creative Suite is limited, I am eager to expand my skills in this area. I have attached my resume and am available for an interview at your earliest convenience.\n\nThank you for considering my application.\n\nSincerely,\nAlex Johnson",
    "passage_group_id": "p7-double-009",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-184",
    "part": "Part 7",
    "question": "What is the main purpose of the job posting?",
    "choices": {
      "A": "To promote a new product launch",
      "B": "To advertise a job opening and invite applications",
      "C": "To provide customer feedback",
      "D": "To announce a company merger"
    },
    "answer": "B",
    "explanation_zh": "文本1是一則招聘廣告，明確列出了職位名稱、要求、職責和申請方式，目的是招聘高級市場分析師，因此選項B正確。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "advertise",
      "candidate",
      "submit",
      "shortlisted"
    ],
    "passage": "Text 1: Job Advertisement\n\nPosition: Senior Marketing Analyst\n\nLocation: Chicago, IL\n\nCompany: MarketPro Solutions\n\nWe are seeking a highly motivated Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in marketing analytics, proficiency in data visualization tools (e.g., Tableau), and a strong understanding of consumer behavior. Key responsibilities include analyzing campaign performance, generating insights for strategy optimization, and presenting findings to senior management. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@marketpro.com by March 15, 2024. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nTo: careers@marketpro.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Marketing Analyst position at MarketPro Solutions, as advertised on your website. With over 6 years of experience in marketing analytics, I have effectively used Tableau to create dashboards that improved campaign ROI by 20%. My background includes analyzing customer data to identify trends and presenting actionable insights to cross-functional teams. I am excited about the opportunity to contribute to MarketPro's growth. Please find my resume attached. I look forward to discussing my application further.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-010",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-185",
    "part": "Part 7",
    "question": "How many years of experience does the job posting require?",
    "choices": {
      "A": "10 years",
      "B": "3 years",
      "C": "6 years",
      "D": "5 years"
    },
    "answer": "D",
    "explanation_zh": "招聘廣告中明確寫道“minimum of 5 years of experience”，因此要求至少5年經驗，選項D正確。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "minimum",
      "experience",
      "requirement",
      "candidate"
    ],
    "passage": "Text 1: Job Advertisement\n\nPosition: Senior Marketing Analyst\n\nLocation: Chicago, IL\n\nCompany: MarketPro Solutions\n\nWe are seeking a highly motivated Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in marketing analytics, proficiency in data visualization tools (e.g., Tableau), and a strong understanding of consumer behavior. Key responsibilities include analyzing campaign performance, generating insights for strategy optimization, and presenting findings to senior management. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@marketpro.com by March 15, 2024. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nTo: careers@marketpro.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Marketing Analyst position at MarketPro Solutions, as advertised on your website. With over 6 years of experience in marketing analytics, I have effectively used Tableau to create dashboards that improved campaign ROI by 20%. My background includes analyzing customer data to identify trends and presenting actionable insights to cross-functional teams. I am excited about the opportunity to contribute to MarketPro's growth. Please find my resume attached. I look forward to discussing my application further.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-010",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-186",
    "part": "Part 7",
    "question": "Which of the following is a responsibility mentioned in the job posting?",
    "choices": {
      "A": "Managing social media accounts",
      "B": "Conducting employee training",
      "C": "Developing product prototypes",
      "D": "Analyzing campaign performance"
    },
    "answer": "D",
    "explanation_zh": "招聘廣告中職責部分提到“analyzing campaign performance, generating insights for strategy optimization, and presenting findings”，因此選項D正確。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "responsibility",
      "analyze",
      "campaign",
      "performance"
    ],
    "passage": "Text 1: Job Advertisement\n\nPosition: Senior Marketing Analyst\n\nLocation: Chicago, IL\n\nCompany: MarketPro Solutions\n\nWe are seeking a highly motivated Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in marketing analytics, proficiency in data visualization tools (e.g., Tableau), and a strong understanding of consumer behavior. Key responsibilities include analyzing campaign performance, generating insights for strategy optimization, and presenting findings to senior management. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@marketpro.com by March 15, 2024. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nTo: careers@marketpro.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Marketing Analyst position at MarketPro Solutions, as advertised on your website. With over 6 years of experience in marketing analytics, I have effectively used Tableau to create dashboards that improved campaign ROI by 20%. My background includes analyzing customer data to identify trends and presenting actionable insights to cross-functional teams. I am excited about the opportunity to contribute to MarketPro's growth. Please find my resume attached. I look forward to discussing my application further.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-010",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-187",
    "part": "Part 7",
    "question": "What can be inferred about Jane Doe's qualifications?",
    "choices": {
      "A": "She is applying for a different position",
      "B": "She has less experience than required",
      "C": "She has no experience with Tableau",
      "D": "She exceeds the minimum experience requirement"
    },
    "answer": "D",
    "explanation_zh": "招聘廣告要求至少5年經驗，而Jane Doe在郵件中提到自己有超過6年經驗，因此她超過了最低要求，選項D正確。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "qualification",
      "exceed",
      "requirement",
      "experience"
    ],
    "passage": "Text 1: Job Advertisement\n\nPosition: Senior Marketing Analyst\n\nLocation: Chicago, IL\n\nCompany: MarketPro Solutions\n\nWe are seeking a highly motivated Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in marketing analytics, proficiency in data visualization tools (e.g., Tableau), and a strong understanding of consumer behavior. Key responsibilities include analyzing campaign performance, generating insights for strategy optimization, and presenting findings to senior management. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@marketpro.com by March 15, 2024. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nTo: careers@marketpro.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Marketing Analyst position at MarketPro Solutions, as advertised on your website. With over 6 years of experience in marketing analytics, I have effectively used Tableau to create dashboards that improved campaign ROI by 20%. My background includes analyzing customer data to identify trends and presenting actionable insights to cross-functional teams. I am excited about the opportunity to contribute to MarketPro's growth. Please find my resume attached. I look forward to discussing my application further.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-010",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-188",
    "part": "Part 7",
    "question": "Which skill mentioned in the job posting does Jane Doe specifically address in her application?",
    "choices": {
      "A": "Knowledge of market research",
      "B": "Understanding of consumer behavior",
      "C": "Proficiency in Tableau",
      "D": "Experience in team management"
    },
    "answer": "C",
    "explanation_zh": "招聘廣告要求熟練使用Tableau等數據可視化工具，而Jane Doe在郵件中明確提到自己使用Tableau創建了儀表盤，提升了ROI，因此她專門提到了Tableau技能，選項C正確。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "proficiency",
      "specifically",
      "address",
      "skill"
    ],
    "passage": "Text 1: Job Advertisement\n\nPosition: Senior Marketing Analyst\n\nLocation: Chicago, IL\n\nCompany: MarketPro Solutions\n\nWe are seeking a highly motivated Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in marketing analytics, proficiency in data visualization tools (e.g., Tableau), and a strong understanding of consumer behavior. Key responsibilities include analyzing campaign performance, generating insights for strategy optimization, and presenting findings to senior management. To apply, please submit your resume and a cover letter detailing your relevant experience to careers@marketpro.com by March 15, 2024. Only shortlisted candidates will be contacted.\n\nText 2: Application Email\n\nTo: careers@marketpro.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst Position\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Marketing Analyst position at MarketPro Solutions, as advertised on your website. With over 6 years of experience in marketing analytics, I have effectively used Tableau to create dashboards that improved campaign ROI by 20%. My background includes analyzing customer data to identify trends and presenting actionable insights to cross-functional teams. I am excited about the opportunity to contribute to MarketPro's growth. Please find my resume attached. I look forward to discussing my application further.\n\nBest regards,\nJane Doe",
    "passage_group_id": "p7-double-010",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-073",
    "part": "Part 7",
    "question": "What is the main issue described across the three texts?",
    "choices": {
      "A": "The company refused to refund the customer.",
      "B": "The customer ordered the wrong product model.",
      "C": "The delivery was delayed by two days.",
      "D": "The shipment was short by five units of desks."
    },
    "answer": "D",
    "explanation_zh": "三篇文本的核心問題是訂單#GL-78421中缺少了5臺EcoDesk Pro辦公桌。郵件1確認了50臺的訂單，郵件2投訴只收到45臺，郵件3承認包裝錯誤並補發。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "short",
      "dispatched",
      "compensation",
      "inconvenience"
    ],
    "passage": "Text 1 - Order Confirmation\nFrom: orders@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 10, 2023\nSubject: Your Order #GL-78421 Confirmed\n\nDear Ms. Johnson,\n\nThank you for your order. Your order #GL-78421 for 50 units of EcoDesk Pro (Model EDP-200) has been confirmed. The total amount is $7,500. Expected delivery date: October 25, 2023. Shipping will be via FastTrack Logistics.\n\nPlease review the details. If you have any questions, contact us at support@greenleafsupplies.com.\n\nBest regards,\nGreenLeaf Supplies Customer Service\n\nText 2 - Customer Complaint\nFrom: sarah.johnson@techsolutions.com\nTo: support@greenleafsupplies.com\nDate: October 28, 2023\nSubject: Missing Items in Order #GL-78421\n\nDear GreenLeaf Supplies,\n\nI am writing regarding order #GL-78421, which was delivered on October 27, 2023. The shipment from FastTrack Logistics arrived on time, but we only received 45 units of the EcoDesk Pro desks. Five units are missing. Our invoice (attached) shows 50 units should have been sent.\n\nPlease investigate and arrange for the missing desks to be delivered as soon as possible. We need them for a client project.\n\nThank you,\nSarah Johnson\nTechSolutions Inc.\n\nText 3 - Company Reply\nFrom: support@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 30, 2023\nSubject: Re: Missing Items in Order #GL-78421\n\nDear Ms. Johnson,\n\nThank you for bringing this issue to our attention. We apologize for the inconvenience. After reviewing your order and our shipping records, we confirm that only 45 units were dispatched from our warehouse due to a packing error. The remaining 5 units will be shipped today via Express Delivery, arriving by November 1, 2023. We have also issued a partial refund of $375 (5 units x $75 each) to your account as compensation.\n\nWe value your business and have added a 10% discount on your next order.\n\nSincerely,\nGreenLeaf Supplies Customer Service",
    "passage_group_id": "p7-triple-001",
    "passage_group_type": "triple",
    "question_order": 1
  },
  {
    "id": "p7-gen-074",
    "part": "Part 7",
    "question": "According to Text 1, what was the expected delivery date for the order?",
    "choices": {
      "A": "October 25, 2023",
      "B": "November 1, 2023",
      "C": "October 27, 2023",
      "D": "October 30, 2023"
    },
    "answer": "A",
    "explanation_zh": "根據文本1，訂單確認郵件中明確寫明'Expected delivery date: October 25, 2023'，因此預期交貨日期是10月25日。選項C是實際交貨日期，選項D是公司回覆日期，選項B是補發貨物到達日期。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "expected",
      "delivery",
      "confirmed",
      "shipping"
    ],
    "passage": "Text 1 - Order Confirmation\nFrom: orders@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 10, 2023\nSubject: Your Order #GL-78421 Confirmed\n\nDear Ms. Johnson,\n\nThank you for your order. Your order #GL-78421 for 50 units of EcoDesk Pro (Model EDP-200) has been confirmed. The total amount is $7,500. Expected delivery date: October 25, 2023. Shipping will be via FastTrack Logistics.\n\nPlease review the details. If you have any questions, contact us at support@greenleafsupplies.com.\n\nBest regards,\nGreenLeaf Supplies Customer Service\n\nText 2 - Customer Complaint\nFrom: sarah.johnson@techsolutions.com\nTo: support@greenleafsupplies.com\nDate: October 28, 2023\nSubject: Missing Items in Order #GL-78421\n\nDear GreenLeaf Supplies,\n\nI am writing regarding order #GL-78421, which was delivered on October 27, 2023. The shipment from FastTrack Logistics arrived on time, but we only received 45 units of the EcoDesk Pro desks. Five units are missing. Our invoice (attached) shows 50 units should have been sent.\n\nPlease investigate and arrange for the missing desks to be delivered as soon as possible. We need them for a client project.\n\nThank you,\nSarah Johnson\nTechSolutions Inc.\n\nText 3 - Company Reply\nFrom: support@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 30, 2023\nSubject: Re: Missing Items in Order #GL-78421\n\nDear Ms. Johnson,\n\nThank you for bringing this issue to our attention. We apologize for the inconvenience. After reviewing your order and our shipping records, we confirm that only 45 units were dispatched from our warehouse due to a packing error. The remaining 5 units will be shipped today via Express Delivery, arriving by November 1, 2023. We have also issued a partial refund of $375 (5 units x $75 each) to your account as compensation.\n\nWe value your business and have added a 10% discount on your next order.\n\nSincerely,\nGreenLeaf Supplies Customer Service",
    "passage_group_id": "p7-triple-001",
    "passage_group_type": "triple",
    "question_order": 2
  },
  {
    "id": "p7-gen-075",
    "part": "Part 7",
    "question": "What action did GreenLeaf Supplies take to resolve the issue, according to Text 3?",
    "choices": {
      "A": "They canceled the remaining order and issued a full refund.",
      "B": "They offered a discount on the current order only.",
      "C": "They asked the customer to return the 45 units.",
      "D": "They shipped the missing units and provided a partial refund."
    },
    "answer": "D",
    "explanation_zh": "根據文本3，公司承認包裝錯誤，補發了5臺辦公桌，並退款$375（5臺x$75每臺），同時提供下次訂單10%折扣。選項D準確概括了補發和部分退款兩項措施。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "resolve",
      "partial refund",
      "compensation",
      "discount"
    ],
    "passage": "Text 1 - Order Confirmation\nFrom: orders@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 10, 2023\nSubject: Your Order #GL-78421 Confirmed\n\nDear Ms. Johnson,\n\nThank you for your order. Your order #GL-78421 for 50 units of EcoDesk Pro (Model EDP-200) has been confirmed. The total amount is $7,500. Expected delivery date: October 25, 2023. Shipping will be via FastTrack Logistics.\n\nPlease review the details. If you have any questions, contact us at support@greenleafsupplies.com.\n\nBest regards,\nGreenLeaf Supplies Customer Service\n\nText 2 - Customer Complaint\nFrom: sarah.johnson@techsolutions.com\nTo: support@greenleafsupplies.com\nDate: October 28, 2023\nSubject: Missing Items in Order #GL-78421\n\nDear GreenLeaf Supplies,\n\nI am writing regarding order #GL-78421, which was delivered on October 27, 2023. The shipment from FastTrack Logistics arrived on time, but we only received 45 units of the EcoDesk Pro desks. Five units are missing. Our invoice (attached) shows 50 units should have been sent.\n\nPlease investigate and arrange for the missing desks to be delivered as soon as possible. We need them for a client project.\n\nThank you,\nSarah Johnson\nTechSolutions Inc.\n\nText 3 - Company Reply\nFrom: support@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 30, 2023\nSubject: Re: Missing Items in Order #GL-78421\n\nDear Ms. Johnson,\n\nThank you for bringing this issue to our attention. We apologize for the inconvenience. After reviewing your order and our shipping records, we confirm that only 45 units were dispatched from our warehouse due to a packing error. The remaining 5 units will be shipped today via Express Delivery, arriving by November 1, 2023. We have also issued a partial refund of $375 (5 units x $75 each) to your account as compensation.\n\nWe value your business and have added a 10% discount on your next order.\n\nSincerely,\nGreenLeaf Supplies Customer Service",
    "passage_group_id": "p7-triple-001",
    "passage_group_type": "triple",
    "question_order": 3
  },
  {
    "id": "p7-gen-076",
    "part": "Part 7",
    "question": "What can be inferred about the customer's urgency from Text 2 and Text 3?",
    "choices": {
      "A": "The customer requested a full refund instead of replacement.",
      "B": "The customer was not in a hurry and accepted a later delivery.",
      "C": "The customer needed the desks for a client project, prompting a quick resolution.",
      "D": "The customer needed the desks for a personal project."
    },
    "answer": "C",
    "explanation_zh": "文本2中客戶明確提到'We need them for a client project'，表明急需這些辦公桌。文本3中公司在兩天內回覆並立即安排補發，顯示了緊迫性。因此可推斷客戶因客戶項目而急需，促使公司快速解決。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "urgency",
      "client project",
      "resolution",
      "prompt"
    ],
    "passage": "Text 1 - Order Confirmation\nFrom: orders@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 10, 2023\nSubject: Your Order #GL-78421 Confirmed\n\nDear Ms. Johnson,\n\nThank you for your order. Your order #GL-78421 for 50 units of EcoDesk Pro (Model EDP-200) has been confirmed. The total amount is $7,500. Expected delivery date: October 25, 2023. Shipping will be via FastTrack Logistics.\n\nPlease review the details. If you have any questions, contact us at support@greenleafsupplies.com.\n\nBest regards,\nGreenLeaf Supplies Customer Service\n\nText 2 - Customer Complaint\nFrom: sarah.johnson@techsolutions.com\nTo: support@greenleafsupplies.com\nDate: October 28, 2023\nSubject: Missing Items in Order #GL-78421\n\nDear GreenLeaf Supplies,\n\nI am writing regarding order #GL-78421, which was delivered on October 27, 2023. The shipment from FastTrack Logistics arrived on time, but we only received 45 units of the EcoDesk Pro desks. Five units are missing. Our invoice (attached) shows 50 units should have been sent.\n\nPlease investigate and arrange for the missing desks to be delivered as soon as possible. We need them for a client project.\n\nThank you,\nSarah Johnson\nTechSolutions Inc.\n\nText 3 - Company Reply\nFrom: support@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 30, 2023\nSubject: Re: Missing Items in Order #GL-78421\n\nDear Ms. Johnson,\n\nThank you for bringing this issue to our attention. We apologize for the inconvenience. After reviewing your order and our shipping records, we confirm that only 45 units were dispatched from our warehouse due to a packing error. The remaining 5 units will be shipped today via Express Delivery, arriving by November 1, 2023. We have also issued a partial refund of $375 (5 units x $75 each) to your account as compensation.\n\nWe value your business and have added a 10% discount on your next order.\n\nSincerely,\nGreenLeaf Supplies Customer Service",
    "passage_group_id": "p7-triple-001",
    "passage_group_type": "triple",
    "question_order": 4
  },
  {
    "id": "p7-gen-077",
    "part": "Part 7",
    "question": "Based on Text 1 and Text 3, what discrepancy exists between the original order and the company's shipping records?",
    "choices": {
      "A": "The shipping date was incorrect in both documents.",
      "B": "The company shipped 45 units instead of the ordered 50.",
      "C": "The order was for 45 units but the invoice showed 50.",
      "D": "The customer ordered 55 units but received 50."
    },
    "answer": "B",
    "explanation_zh": "文本1顯示訂單確認了50臺EcoDesk Pro，但文本3中公司承認'only 45 units were dispatched from our warehouse due to a packing error'，即實際只發貨45臺，與訂單不符。這是跨文本比較得出的差異。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "discrepancy",
      "shipping records",
      "dispatched",
      "packing error"
    ],
    "passage": "Text 1 - Order Confirmation\nFrom: orders@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 10, 2023\nSubject: Your Order #GL-78421 Confirmed\n\nDear Ms. Johnson,\n\nThank you for your order. Your order #GL-78421 for 50 units of EcoDesk Pro (Model EDP-200) has been confirmed. The total amount is $7,500. Expected delivery date: October 25, 2023. Shipping will be via FastTrack Logistics.\n\nPlease review the details. If you have any questions, contact us at support@greenleafsupplies.com.\n\nBest regards,\nGreenLeaf Supplies Customer Service\n\nText 2 - Customer Complaint\nFrom: sarah.johnson@techsolutions.com\nTo: support@greenleafsupplies.com\nDate: October 28, 2023\nSubject: Missing Items in Order #GL-78421\n\nDear GreenLeaf Supplies,\n\nI am writing regarding order #GL-78421, which was delivered on October 27, 2023. The shipment from FastTrack Logistics arrived on time, but we only received 45 units of the EcoDesk Pro desks. Five units are missing. Our invoice (attached) shows 50 units should have been sent.\n\nPlease investigate and arrange for the missing desks to be delivered as soon as possible. We need them for a client project.\n\nThank you,\nSarah Johnson\nTechSolutions Inc.\n\nText 3 - Company Reply\nFrom: support@greenleafsupplies.com\nTo: sarah.johnson@techsolutions.com\nDate: October 30, 2023\nSubject: Re: Missing Items in Order #GL-78421\n\nDear Ms. Johnson,\n\nThank you for bringing this issue to our attention. We apologize for the inconvenience. After reviewing your order and our shipping records, we confirm that only 45 units were dispatched from our warehouse due to a packing error. The remaining 5 units will be shipped today via Express Delivery, arriving by November 1, 2023. We have also issued a partial refund of $375 (5 units x $75 each) to your account as compensation.\n\nWe value your business and have added a 10% discount on your next order.\n\nSincerely,\nGreenLeaf Supplies Customer Service",
    "passage_group_id": "p7-triple-001",
    "passage_group_type": "triple",
    "question_order": 5
  },
  {
    "id": "p7-gen-105",
    "part": "Part 7",
    "question": "What is the main issue described in this set of texts?",
    "choices": {
      "A": "The customer's order was never shipped.",
      "B": "The customer was overcharged for the order.",
      "C": "The customer requested a refund for the order.",
      "D": "The customer received incorrect quantities of items."
    },
    "answer": "D",
    "explanation_zh": "根據文本2，客戶James Chen報告說，他收到的貨物中，太陽能電池板少了2個（8個而非10個），而逆變器多了1個（6個而非5個），即數量錯誤。文本3中公司承認了錯誤並補發缺失的電池板。因此，主要問題是數量不匹配。選項A（從未發貨）錯誤，因為貨物已收到；B（多收費）未提及；C（要求退款）未提出。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "discrepancy",
      "invoice",
      "compensation",
      "credited"
    ],
    "passage": "Text 1\nFrom: orders@greentech.com\nTo: james.chen@client.com\nSubject: Order Confirmation #GT-4521\nDate: March 1, 2024\n\nDear Mr. Chen,\n\nThank you for your order #GT-4521 placed on February 28, 2024. We are pleased to confirm the following items:\n- 10 units of EcoSolar Panel Model S200 (Item Code: ESP-200) at $150 each\n- 5 units of EcoSolar Inverter Model I75 (Item Code: ESI-075) at $200 each\n\nTotal: $2,500. Shipping address: 88 Innovation Drive, Taipei. Estimated delivery: March 15, 2024. Payment has been processed.\n\nBest regards,\nLisa Wang\nCustomer Service Manager\n\nText 2\nFrom: james.chen@client.com\nTo: support@greentech.com\nSubject: Urgent: Order #GT-4521 Discrepancy\nDate: March 18, 2024\n\nDear Greentech Support,\n\nI am writing to report an issue with order #GT-4521. I received the shipment on March 17, 2024. However, the package contained 8 units of the EcoSolar Panel Model S200 and 6 units of the EcoSolar Inverter Model I75. This is incorrect—I ordered 10 panels and 5 inverters. Additionally, the invoice in the box lists the items as ordered, but the quantities differ. Please advise on how to resolve this. I need the correct items urgently for a project.\n\nRegards,\nJames Chen\n\nText 3\nFrom: support@greentech.com\nTo: james.chen@client.com\nSubject: Re: Urgent: Order #GT-4521 Discrepancy\nDate: March 20, 2024\n\nDear Mr. Chen,\n\nWe apologize for the error in your order #GT-4521. Upon investigation, it appears that our warehouse mistakenly swapped quantities for the panels and inverters. We are shipping the missing 2 panels (Item Code: ESP-200) today via express delivery, with an estimated arrival by March 22, 2024. You may keep the extra inverter at no charge as compensation. Please disregard the invoice included; a corrected one will follow. We have also credited your account $50 for the inconvenience.\n\nSincerely,\nLisa Wang\nCustomer Service Manager",
    "passage_group_id": "p7-triple-002",
    "passage_group_type": "triple",
    "question_order": 1
  },
  {
    "id": "p7-gen-106",
    "part": "Part 7",
    "question": "According to Text 1, what was the total cost of order #GT-4521?",
    "choices": {
      "A": "$2,400",
      "B": "$3,000",
      "C": "$2,550",
      "D": "$2,500"
    },
    "answer": "D",
    "explanation_zh": "根據文本1，訂單總金額明確標註為“Total: $2,500”。計算：10塊面板×$150 = $1,500，5個逆變器×$200 = $1,000，合計$2,500。A選項$2,400是如果數量互換的錯誤計算；C和B無依據。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "total",
      "cost",
      "order",
      "confirmation"
    ],
    "passage": "Text 1\nFrom: orders@greentech.com\nTo: james.chen@client.com\nSubject: Order Confirmation #GT-4521\nDate: March 1, 2024\n\nDear Mr. Chen,\n\nThank you for your order #GT-4521 placed on February 28, 2024. We are pleased to confirm the following items:\n- 10 units of EcoSolar Panel Model S200 (Item Code: ESP-200) at $150 each\n- 5 units of EcoSolar Inverter Model I75 (Item Code: ESI-075) at $200 each\n\nTotal: $2,500. Shipping address: 88 Innovation Drive, Taipei. Estimated delivery: March 15, 2024. Payment has been processed.\n\nBest regards,\nLisa Wang\nCustomer Service Manager\n\nText 2\nFrom: james.chen@client.com\nTo: support@greentech.com\nSubject: Urgent: Order #GT-4521 Discrepancy\nDate: March 18, 2024\n\nDear Greentech Support,\n\nI am writing to report an issue with order #GT-4521. I received the shipment on March 17, 2024. However, the package contained 8 units of the EcoSolar Panel Model S200 and 6 units of the EcoSolar Inverter Model I75. This is incorrect—I ordered 10 panels and 5 inverters. Additionally, the invoice in the box lists the items as ordered, but the quantities differ. Please advise on how to resolve this. I need the correct items urgently for a project.\n\nRegards,\nJames Chen\n\nText 3\nFrom: support@greentech.com\nTo: james.chen@client.com\nSubject: Re: Urgent: Order #GT-4521 Discrepancy\nDate: March 20, 2024\n\nDear Mr. Chen,\n\nWe apologize for the error in your order #GT-4521. Upon investigation, it appears that our warehouse mistakenly swapped quantities for the panels and inverters. We are shipping the missing 2 panels (Item Code: ESP-200) today via express delivery, with an estimated arrival by March 22, 2024. You may keep the extra inverter at no charge as compensation. Please disregard the invoice included; a corrected one will follow. We have also credited your account $50 for the inconvenience.\n\nSincerely,\nLisa Wang\nCustomer Service Manager",
    "passage_group_id": "p7-triple-002",
    "passage_group_type": "triple",
    "question_order": 2
  },
  {
    "id": "p7-gen-107",
    "part": "Part 7",
    "question": "What did the company offer as compensation for the error?",
    "choices": {
      "A": "A full refund of the order.",
      "B": "An extra inverter and a $50 credit.",
      "C": "Free shipping for the next order.",
      "D": "A discount on the next order."
    },
    "answer": "B",
    "explanation_zh": "根據文本3，公司表示“you may keep the extra inverter at no charge as compensation”以及“we have also credited your account $50 for the inconvenience”。因此，補償包括免費保留多餘的逆變器和50美元賬戶信用額度。選項A（全額退款）未提及；D（下次折扣）未提供；C（免運費）未提及。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "compensation",
      "credited",
      "inconvenience",
      "extra"
    ],
    "passage": "Text 1\nFrom: orders@greentech.com\nTo: james.chen@client.com\nSubject: Order Confirmation #GT-4521\nDate: March 1, 2024\n\nDear Mr. Chen,\n\nThank you for your order #GT-4521 placed on February 28, 2024. We are pleased to confirm the following items:\n- 10 units of EcoSolar Panel Model S200 (Item Code: ESP-200) at $150 each\n- 5 units of EcoSolar Inverter Model I75 (Item Code: ESI-075) at $200 each\n\nTotal: $2,500. Shipping address: 88 Innovation Drive, Taipei. Estimated delivery: March 15, 2024. Payment has been processed.\n\nBest regards,\nLisa Wang\nCustomer Service Manager\n\nText 2\nFrom: james.chen@client.com\nTo: support@greentech.com\nSubject: Urgent: Order #GT-4521 Discrepancy\nDate: March 18, 2024\n\nDear Greentech Support,\n\nI am writing to report an issue with order #GT-4521. I received the shipment on March 17, 2024. However, the package contained 8 units of the EcoSolar Panel Model S200 and 6 units of the EcoSolar Inverter Model I75. This is incorrect—I ordered 10 panels and 5 inverters. Additionally, the invoice in the box lists the items as ordered, but the quantities differ. Please advise on how to resolve this. I need the correct items urgently for a project.\n\nRegards,\nJames Chen\n\nText 3\nFrom: support@greentech.com\nTo: james.chen@client.com\nSubject: Re: Urgent: Order #GT-4521 Discrepancy\nDate: March 20, 2024\n\nDear Mr. Chen,\n\nWe apologize for the error in your order #GT-4521. Upon investigation, it appears that our warehouse mistakenly swapped quantities for the panels and inverters. We are shipping the missing 2 panels (Item Code: ESP-200) today via express delivery, with an estimated arrival by March 22, 2024. You may keep the extra inverter at no charge as compensation. Please disregard the invoice included; a corrected one will follow. We have also credited your account $50 for the inconvenience.\n\nSincerely,\nLisa Wang\nCustomer Service Manager",
    "passage_group_id": "p7-triple-002",
    "passage_group_type": "triple",
    "question_order": 3
  },
  {
    "id": "p7-gen-108",
    "part": "Part 7",
    "question": "Why did James Chen send the email in Text 2?",
    "choices": {
      "A": "To report a discrepancy in the delivered items.",
      "B": "To request a cancellation of the order.",
      "C": "To confirm his order details.",
      "D": "To inquire about the shipping status."
    },
    "answer": "A",
    "explanation_zh": "文本2中，James Chen明確寫道“I am writing to report an issue with order #GT-4521”，並描述了收到錯誤數量的物品。因此，他發郵件是為了報告數量不一致的問題。選項C（確認訂單）已在文本1完成；B（取消訂單）未提及；D（詢問配送狀態）不準確，因為貨物已收到。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "discrepancy",
      "report",
      "issue",
      "urgent"
    ],
    "passage": "Text 1\nFrom: orders@greentech.com\nTo: james.chen@client.com\nSubject: Order Confirmation #GT-4521\nDate: March 1, 2024\n\nDear Mr. Chen,\n\nThank you for your order #GT-4521 placed on February 28, 2024. We are pleased to confirm the following items:\n- 10 units of EcoSolar Panel Model S200 (Item Code: ESP-200) at $150 each\n- 5 units of EcoSolar Inverter Model I75 (Item Code: ESI-075) at $200 each\n\nTotal: $2,500. Shipping address: 88 Innovation Drive, Taipei. Estimated delivery: March 15, 2024. Payment has been processed.\n\nBest regards,\nLisa Wang\nCustomer Service Manager\n\nText 2\nFrom: james.chen@client.com\nTo: support@greentech.com\nSubject: Urgent: Order #GT-4521 Discrepancy\nDate: March 18, 2024\n\nDear Greentech Support,\n\nI am writing to report an issue with order #GT-4521. I received the shipment on March 17, 2024. However, the package contained 8 units of the EcoSolar Panel Model S200 and 6 units of the EcoSolar Inverter Model I75. This is incorrect—I ordered 10 panels and 5 inverters. Additionally, the invoice in the box lists the items as ordered, but the quantities differ. Please advise on how to resolve this. I need the correct items urgently for a project.\n\nRegards,\nJames Chen\n\nText 3\nFrom: support@greentech.com\nTo: james.chen@client.com\nSubject: Re: Urgent: Order #GT-4521 Discrepancy\nDate: March 20, 2024\n\nDear Mr. Chen,\n\nWe apologize for the error in your order #GT-4521. Upon investigation, it appears that our warehouse mistakenly swapped quantities for the panels and inverters. We are shipping the missing 2 panels (Item Code: ESP-200) today via express delivery, with an estimated arrival by March 22, 2024. You may keep the extra inverter at no charge as compensation. Please disregard the invoice included; a corrected one will follow. We have also credited your account $50 for the inconvenience.\n\nSincerely,\nLisa Wang\nCustomer Service Manager",
    "passage_group_id": "p7-triple-002",
    "passage_group_type": "triple",
    "question_order": 4
  },
  {
    "id": "p7-gen-109",
    "part": "Part 7",
    "question": "Based on the texts, what can be inferred about the invoice mentioned in Text 2 and Text 3?",
    "choices": {
      "A": "The invoice showed the ordered quantities, not the delivered ones.",
      "B": "The invoice was missing from the package entirely.",
      "C": "The invoice was corrected before the shipment arrived.",
      "D": "The invoice was correct and matched the delivered items."
    },
    "answer": "A",
    "explanation_zh": "根據文本2，客戶提到“the invoice in the box lists the items as ordered, but the quantities differ”，意思是發票上列出的項目與訂單一致（即10塊面板和5個逆變器），但實際收到的數量不同。文本3中公司說“Please disregard the invoice included; a corrected one will follow”，進一步證實發票顯示的是訂購數量而非實際交付數量。因此，選項A正確。選項D錯誤，因為發票與實際不符；B錯誤，因為發票在包裹內；C錯誤，因為發票是隨貨發出的，後來才更正。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "invoice",
      "quantities",
      "disregard",
      "corrected"
    ],
    "passage": "Text 1\nFrom: orders@greentech.com\nTo: james.chen@client.com\nSubject: Order Confirmation #GT-4521\nDate: March 1, 2024\n\nDear Mr. Chen,\n\nThank you for your order #GT-4521 placed on February 28, 2024. We are pleased to confirm the following items:\n- 10 units of EcoSolar Panel Model S200 (Item Code: ESP-200) at $150 each\n- 5 units of EcoSolar Inverter Model I75 (Item Code: ESI-075) at $200 each\n\nTotal: $2,500. Shipping address: 88 Innovation Drive, Taipei. Estimated delivery: March 15, 2024. Payment has been processed.\n\nBest regards,\nLisa Wang\nCustomer Service Manager\n\nText 2\nFrom: james.chen@client.com\nTo: support@greentech.com\nSubject: Urgent: Order #GT-4521 Discrepancy\nDate: March 18, 2024\n\nDear Greentech Support,\n\nI am writing to report an issue with order #GT-4521. I received the shipment on March 17, 2024. However, the package contained 8 units of the EcoSolar Panel Model S200 and 6 units of the EcoSolar Inverter Model I75. This is incorrect—I ordered 10 panels and 5 inverters. Additionally, the invoice in the box lists the items as ordered, but the quantities differ. Please advise on how to resolve this. I need the correct items urgently for a project.\n\nRegards,\nJames Chen\n\nText 3\nFrom: support@greentech.com\nTo: james.chen@client.com\nSubject: Re: Urgent: Order #GT-4521 Discrepancy\nDate: March 20, 2024\n\nDear Mr. Chen,\n\nWe apologize for the error in your order #GT-4521. Upon investigation, it appears that our warehouse mistakenly swapped quantities for the panels and inverters. We are shipping the missing 2 panels (Item Code: ESP-200) today via express delivery, with an estimated arrival by March 22, 2024. You may keep the extra inverter at no charge as compensation. Please disregard the invoice included; a corrected one will follow. We have also credited your account $50 for the inconvenience.\n\nSincerely,\nLisa Wang\nCustomer Service Manager",
    "passage_group_id": "p7-triple-002",
    "passage_group_type": "triple",
    "question_order": 5
  },
  {
    "id": "p7-gen-189",
    "part": "Part 7",
    "question": "What is the main issue described across the three texts?",
    "choices": {
      "A": "The company failed to ship the order on time.",
      "B": "The customer ordered too many units and wants to return some.",
      "C": "The customer received a wrong model of headsets, and the company is resolving it.",
      "D": "The customer complained about the quality of the headsets."
    },
    "answer": "C",
    "explanation_zh": "主要問題是客戶收到了錯誤型號的耳機（Y-2000而非X-1000），而公司正在通過更換和補償來解決問題。選項B未提及，選項A不準確（訂單按時發貨），選項D未涉及質量問題。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "confirmation",
      "discrepancy",
      "gesture of goodwill",
      "inconvenience"
    ],
    "passage": "Text 1: Order Confirmation\nFrom: orders@globaltech.com\nTo: jane.smith@company.com\nDate: June 10, 2025\nSubject: Order #GT-7842 Confirmation\n\nDear Ms. Smith,\nThank you for your order of 20 units of the Model X-1000 wireless headsets (unit price: $45). Your order (GT-7842) has been processed and is scheduled for shipment on June 12, 2025, via FastShip courier. Estimated delivery is June 15, 2025. Please review the details and contact us if there are any discrepancies.\n\nSincerely,\nOrder Processing Team\nGlobalTech Inc.\n\nText 2: Complaint\nFrom: jane.smith@company.com\nTo: support@globaltech.com\nDate: June 16, 2025\nSubject: Order #GT-7842 - Incorrect Item Received\n\nDear GlobalTech Support,\nI received a shipment today (June 16) for order GT-7842. However, instead of the 20 Model X-1000 headsets I ordered, I received 20 Model Y-2000 headsets. This is incorrect and urgent as I need the X-1000 for a client event on June 20. Please arrange a replacement or refund immediately.\n\nBest regards,\nJane Smith\n\nText 3: Resolution\nFrom: support@globaltech.com\nTo: jane.smith@company.com\nDate: June 17, 2025\nSubject: Re: Order #GT-7842 - Incorrect Item Received\n\nDear Ms. Smith,\nWe sincerely apologize for the error. Our investigation shows a packing mix-up at the warehouse. We have dispatched the correct 20 Model X-1000 headsets via express delivery today (June 17), with a new tracking number: FS-9876. Estimated delivery is June 18, 2025. Please keep the Y-2000 headsets as a gesture of goodwill. We are also issuing a 10% discount on your next order. We regret the inconvenience.\n\nBest regards,\nThomas Lee\nCustomer Support Manager\nGlobalTech Inc.",
    "passage_group_id": "p7-triple-003",
    "passage_group_type": "triple",
    "question_order": 1
  },
  {
    "id": "p7-gen-190",
    "part": "Part 7",
    "question": "According to Text 1, what was the estimated delivery date for the original order?",
    "choices": {
      "A": "June 15, 2025",
      "B": "June 18, 2025",
      "C": "June 12, 2025",
      "D": "June 16, 2025"
    },
    "answer": "A",
    "explanation_zh": "文本1中明確寫道'Estimated delivery is June 15, 2025'。選項C是發貨日期，選項D是客戶收到錯誤貨物的日期，選項B是替換貨物的預計送達日期。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "processed",
      "scheduled",
      "estimated",
      "discrepancy"
    ],
    "passage": "Text 1: Order Confirmation\nFrom: orders@globaltech.com\nTo: jane.smith@company.com\nDate: June 10, 2025\nSubject: Order #GT-7842 Confirmation\n\nDear Ms. Smith,\nThank you for your order of 20 units of the Model X-1000 wireless headsets (unit price: $45). Your order (GT-7842) has been processed and is scheduled for shipment on June 12, 2025, via FastShip courier. Estimated delivery is June 15, 2025. Please review the details and contact us if there are any discrepancies.\n\nSincerely,\nOrder Processing Team\nGlobalTech Inc.\n\nText 2: Complaint\nFrom: jane.smith@company.com\nTo: support@globaltech.com\nDate: June 16, 2025\nSubject: Order #GT-7842 - Incorrect Item Received\n\nDear GlobalTech Support,\nI received a shipment today (June 16) for order GT-7842. However, instead of the 20 Model X-1000 headsets I ordered, I received 20 Model Y-2000 headsets. This is incorrect and urgent as I need the X-1000 for a client event on June 20. Please arrange a replacement or refund immediately.\n\nBest regards,\nJane Smith\n\nText 3: Resolution\nFrom: support@globaltech.com\nTo: jane.smith@company.com\nDate: June 17, 2025\nSubject: Re: Order #GT-7842 - Incorrect Item Received\n\nDear Ms. Smith,\nWe sincerely apologize for the error. Our investigation shows a packing mix-up at the warehouse. We have dispatched the correct 20 Model X-1000 headsets via express delivery today (June 17), with a new tracking number: FS-9876. Estimated delivery is June 18, 2025. Please keep the Y-2000 headsets as a gesture of goodwill. We are also issuing a 10% discount on your next order. We regret the inconvenience.\n\nBest regards,\nThomas Lee\nCustomer Support Manager\nGlobalTech Inc.",
    "passage_group_id": "p7-triple-003",
    "passage_group_type": "triple",
    "question_order": 2
  },
  {
    "id": "p7-gen-191",
    "part": "Part 7",
    "question": "What did the company ask the customer to do with the incorrect headsets?",
    "choices": {
      "A": "Return them immediately.",
      "B": "Discard them.",
      "C": "Keep them as a goodwill gesture.",
      "D": "Exchange them at a local store."
    },
    "answer": "C",
    "explanation_zh": "文本3中寫道'Please keep the Y-2000 headsets as a gesture of goodwill'，說明公司讓客戶保留錯誤商品。選項A、D、B均未提及。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "gesture of goodwill",
      "issued",
      "inconvenience",
      "apologize"
    ],
    "passage": "Text 1: Order Confirmation\nFrom: orders@globaltech.com\nTo: jane.smith@company.com\nDate: June 10, 2025\nSubject: Order #GT-7842 Confirmation\n\nDear Ms. Smith,\nThank you for your order of 20 units of the Model X-1000 wireless headsets (unit price: $45). Your order (GT-7842) has been processed and is scheduled for shipment on June 12, 2025, via FastShip courier. Estimated delivery is June 15, 2025. Please review the details and contact us if there are any discrepancies.\n\nSincerely,\nOrder Processing Team\nGlobalTech Inc.\n\nText 2: Complaint\nFrom: jane.smith@company.com\nTo: support@globaltech.com\nDate: June 16, 2025\nSubject: Order #GT-7842 - Incorrect Item Received\n\nDear GlobalTech Support,\nI received a shipment today (June 16) for order GT-7842. However, instead of the 20 Model X-1000 headsets I ordered, I received 20 Model Y-2000 headsets. This is incorrect and urgent as I need the X-1000 for a client event on June 20. Please arrange a replacement or refund immediately.\n\nBest regards,\nJane Smith\n\nText 3: Resolution\nFrom: support@globaltech.com\nTo: jane.smith@company.com\nDate: June 17, 2025\nSubject: Re: Order #GT-7842 - Incorrect Item Received\n\nDear Ms. Smith,\nWe sincerely apologize for the error. Our investigation shows a packing mix-up at the warehouse. We have dispatched the correct 20 Model X-1000 headsets via express delivery today (June 17), with a new tracking number: FS-9876. Estimated delivery is June 18, 2025. Please keep the Y-2000 headsets as a gesture of goodwill. We are also issuing a 10% discount on your next order. We regret the inconvenience.\n\nBest regards,\nThomas Lee\nCustomer Support Manager\nGlobalTech Inc.",
    "passage_group_id": "p7-triple-003",
    "passage_group_type": "triple",
    "question_order": 3
  },
  {
    "id": "p7-gen-192",
    "part": "Part 7",
    "question": "Based on the texts, how many days after the original estimated delivery did the customer receive the incorrect shipment?",
    "choices": {
      "A": "4 days",
      "B": "6 days",
      "C": "1 day",
      "D": "2 days"
    },
    "answer": "C",
    "explanation_zh": "原始預計送達日期是6月15日（文本1），客戶在6月16日收到錯誤貨物（文本2）。所以只晚了1天。選項D、A、B不正確。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "estimated",
      "incorrect",
      "shipment",
      "delivery"
    ],
    "passage": "Text 1: Order Confirmation\nFrom: orders@globaltech.com\nTo: jane.smith@company.com\nDate: June 10, 2025\nSubject: Order #GT-7842 Confirmation\n\nDear Ms. Smith,\nThank you for your order of 20 units of the Model X-1000 wireless headsets (unit price: $45). Your order (GT-7842) has been processed and is scheduled for shipment on June 12, 2025, via FastShip courier. Estimated delivery is June 15, 2025. Please review the details and contact us if there are any discrepancies.\n\nSincerely,\nOrder Processing Team\nGlobalTech Inc.\n\nText 2: Complaint\nFrom: jane.smith@company.com\nTo: support@globaltech.com\nDate: June 16, 2025\nSubject: Order #GT-7842 - Incorrect Item Received\n\nDear GlobalTech Support,\nI received a shipment today (June 16) for order GT-7842. However, instead of the 20 Model X-1000 headsets I ordered, I received 20 Model Y-2000 headsets. This is incorrect and urgent as I need the X-1000 for a client event on June 20. Please arrange a replacement or refund immediately.\n\nBest regards,\nJane Smith\n\nText 3: Resolution\nFrom: support@globaltech.com\nTo: jane.smith@company.com\nDate: June 17, 2025\nSubject: Re: Order #GT-7842 - Incorrect Item Received\n\nDear Ms. Smith,\nWe sincerely apologize for the error. Our investigation shows a packing mix-up at the warehouse. We have dispatched the correct 20 Model X-1000 headsets via express delivery today (June 17), with a new tracking number: FS-9876. Estimated delivery is June 18, 2025. Please keep the Y-2000 headsets as a gesture of goodwill. We are also issuing a 10% discount on your next order. We regret the inconvenience.\n\nBest regards,\nThomas Lee\nCustomer Support Manager\nGlobalTech Inc.",
    "passage_group_id": "p7-triple-003",
    "passage_group_type": "triple",
    "question_order": 4
  },
  {
    "id": "p7-gen-193",
    "part": "Part 7",
    "question": "Which of the following is true based on a comparison of all three texts?",
    "choices": {
      "A": "The replacement order was shipped via the same courier as the original.",
      "B": "The customer received the replacement headsets before the client event.",
      "C": "The customer's client event took place on June 18.",
      "D": "The original order was shipped on June 15."
    },
    "answer": "B",
    "explanation_zh": "客戶在文本2中提到客戶活動在6月20日，而替換貨物預計6月18日送達（文本3），所以替換貨物會在活動前到達。選項C錯誤（活動是6月20日）；選項A錯誤（原始用FastShip，替換用express delivery，未說明相同）；選項D錯誤（原始發貨是6月12日）。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "courier",
      "replacement",
      "express delivery",
      "client event"
    ],
    "passage": "Text 1: Order Confirmation\nFrom: orders@globaltech.com\nTo: jane.smith@company.com\nDate: June 10, 2025\nSubject: Order #GT-7842 Confirmation\n\nDear Ms. Smith,\nThank you for your order of 20 units of the Model X-1000 wireless headsets (unit price: $45). Your order (GT-7842) has been processed and is scheduled for shipment on June 12, 2025, via FastShip courier. Estimated delivery is June 15, 2025. Please review the details and contact us if there are any discrepancies.\n\nSincerely,\nOrder Processing Team\nGlobalTech Inc.\n\nText 2: Complaint\nFrom: jane.smith@company.com\nTo: support@globaltech.com\nDate: June 16, 2025\nSubject: Order #GT-7842 - Incorrect Item Received\n\nDear GlobalTech Support,\nI received a shipment today (June 16) for order GT-7842. However, instead of the 20 Model X-1000 headsets I ordered, I received 20 Model Y-2000 headsets. This is incorrect and urgent as I need the X-1000 for a client event on June 20. Please arrange a replacement or refund immediately.\n\nBest regards,\nJane Smith\n\nText 3: Resolution\nFrom: support@globaltech.com\nTo: jane.smith@company.com\nDate: June 17, 2025\nSubject: Re: Order #GT-7842 - Incorrect Item Received\n\nDear Ms. Smith,\nWe sincerely apologize for the error. Our investigation shows a packing mix-up at the warehouse. We have dispatched the correct 20 Model X-1000 headsets via express delivery today (June 17), with a new tracking number: FS-9876. Estimated delivery is June 18, 2025. Please keep the Y-2000 headsets as a gesture of goodwill. We are also issuing a 10% discount on your next order. We regret the inconvenience.\n\nBest regards,\nThomas Lee\nCustomer Support Manager\nGlobalTech Inc.",
    "passage_group_id": "p7-triple-003",
    "passage_group_type": "triple",
    "question_order": 5
  },
  {
    "id": "p3-gen-013",
    "part": "Part 3",
    "question": "Why is the man's lawn service being rescheduled?",
    "choices": {
      "A": "The equipment is broken.",
      "B": "The crew is too small.",
      "C": "The weather is bad.",
      "D": "The man requested a change."
    },
    "answer": "A",
    "explanation_zh": "對話中W明確說明『我們的主要割草機今早故障了』（our main mower broke down this morning），因此服務重新安排的原因是設備損壞。選項B（團隊太小）是W提出的替代方案之一，並非原因；選項C（天氣不好）未提及；選項D（顧客要求更改）不符，是W主動來電告知問題。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "mower",
      "landscaping",
      "reschedule",
      "manual",
      "crew"
    ],
    "transcript": "W: Hello, this is Sarah from Greenfield Landscaping. I'm calling about your lawn service scheduled for tomorrow afternoon.\nM: Oh, yes. Is there a problem?\nW: Unfortunately, our main mower broke down this morning. We're waiting for a replacement part, but it won't arrive until Thursday.\nM: That's inconvenient. I really need the grass cut before the weekend.\nW: I understand. I can offer you two options: we can send a smaller crew with manual tools tomorrow, or reschedule for Friday morning.\nM: I think manual tools will take too long. Let's go with Friday.\nW: Perfect. I'll confirm the time by email."
  },
  {
    "id": "p3-gen-014",
    "part": "Part 3",
    "question": "What does the man imply about the manual tools option?",
    "choices": {
      "A": "It is more expensive.",
      "B": "It would not be efficient.",
      "C": "It is the better choice.",
      "D": "It is not available."
    },
    "answer": "B",
    "explanation_zh": "男子說『我認為手動工具會花太長時間』（I think manual tools will take too long），暗示該選項效率不佳、耗時過長。選項A（更貴）未提及；選項C（較佳選擇）與男子實際拒絕該選項相反；選項D（不可用）不符，因為W確實提供了此選項。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "imply",
      "efficient",
      "option",
      "manual",
      "inconvenient"
    ],
    "transcript": "W: Hello, this is Sarah from Greenfield Landscaping. I'm calling about your lawn service scheduled for tomorrow afternoon.\nM: Oh, yes. Is there a problem?\nW: Unfortunately, our main mower broke down this morning. We're waiting for a replacement part, but it won't arrive until Thursday.\nM: That's inconvenient. I really need the grass cut before the weekend.\nW: I understand. I can offer you two options: we can send a smaller crew with manual tools tomorrow, or reschedule for Friday morning.\nM: I think manual tools will take too long. Let's go with Friday.\nW: Perfect. I'll confirm the time by email."
  },
  {
    "id": "p3-gen-015",
    "part": "Part 3",
    "question": "What will the woman most likely do next?",
    "choices": {
      "A": "Send a repair person.",
      "B": "Call another customer.",
      "C": "Email the man the details.",
      "D": "Cancel the service."
    },
    "answer": "C",
    "explanation_zh": "對話結尾W說『我會透過電子郵件確認時間』（I'll confirm the time by email），因此下一步最可能是寄送詳情給男子。選項A（派維修人員）未提及；選項B（打電話給其他客戶）不符；選項D（取消服務）相反，因為他們已重新安排至週五。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "confirm",
      "details",
      "reschedule",
      "crew",
      "email"
    ],
    "transcript": "W: Hello, this is Sarah from Greenfield Landscaping. I'm calling about your lawn service scheduled for tomorrow afternoon.\nM: Oh, yes. Is there a problem?\nW: Unfortunately, our main mower broke down this morning. We're waiting for a replacement part, but it won't arrive until Thursday.\nM: That's inconvenient. I really need the grass cut before the weekend.\nW: I understand. I can offer you two options: we can send a smaller crew with manual tools tomorrow, or reschedule for Friday morning.\nM: I think manual tools will take too long. Let's go with Friday.\nW: Perfect. I'll confirm the time by email."
  },
  {
    "id": "p3-gen-016",
    "part": "Part 3",
    "question": "What is the main reason for Tom's call?",
    "choices": {
      "A": "To confirm a delivery time",
      "B": "To report a damaged delivery",
      "C": "To offer a discount on ink",
      "D": "To schedule a repair"
    },
    "answer": "B",
    "explanation_zh": "湯姆在對話開頭明確說明『我們收到通知，表示貨物被標記為損壞』（We received a notification that the delivery was marked as damaged），因此主要原因是報告貨物損壞。選項A『確認送貨時間』未提及，選項C『提供折扣』與選項D『安排維修』在對話中均無相關內容，故不正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "delivery",
      "damaged",
      "expedite",
      "replacement",
      "notification"
    ],
    "transcript": "M: Good morning, this is Tom from Office Supplies Co. I'm calling about your order of printer cartridges. We received a notification that the delivery was marked as damaged.\nW: Oh, that's unfortunate. We were expecting that shipment today. We're almost out of ink in the main office printer.\nM: I understand. We can send a replacement shipment right away, but it won't arrive until Thursday. Would that work for you?\nW: Thursday is fine, but could you also check if there's a way to expedite it? We have an important report due Wednesday.\nM: I'll see what I can do. I'll call you back within the hour."
  },
  {
    "id": "p3-gen-017",
    "part": "Part 3",
    "question": "What problem does the woman imply?",
    "choices": {
      "A": "The replacement order was lost",
      "B": "The office printer is broken",
      "C": "They may run out of ink before the new shipment arrives",
      "D": "The report deadline has been moved up"
    },
    "answer": "C",
    "explanation_zh": "女士提到『我們主辦公室印表機的墨水快用完了』（We're almost out of ink in the main office printer）以及『我們週三有一份重要報告要交』（We have an important report due Wednesday），暗示在週四替換貨物到達前可能墨水不足。選項A『替換訂單遺失』未提及，選項B『印表機故障』與對話內容不符，選項D『報告截止日提前』無根據，因此C為正確答案。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "imply",
      "shipment",
      "deadline",
      "expedite",
      "replacement"
    ],
    "transcript": "M: Good morning, this is Tom from Office Supplies Co. I'm calling about your order of printer cartridges. We received a notification that the delivery was marked as damaged.\nW: Oh, that's unfortunate. We were expecting that shipment today. We're almost out of ink in the main office printer.\nM: I understand. We can send a replacement shipment right away, but it won't arrive until Thursday. Would that work for you?\nW: Thursday is fine, but could you also check if there's a way to expedite it? We have an important report due Wednesday.\nM: I'll see what I can do. I'll call you back within the hour."
  },
  {
    "id": "p3-gen-018",
    "part": "Part 3",
    "question": "What will Tom most likely do next?",
    "choices": {
      "A": "Place a new order for ink cartridges",
      "B": "Cancel the current shipment",
      "C": "Inform the woman about the delivery delay",
      "D": "Check on expedited shipping options and call back"
    },
    "answer": "D",
    "explanation_zh": "湯姆在對話結尾說『我看看能做什麼，我會在一小時內回電給您』（I'll see what I can do. I'll call you back within the hour），表示他接下來會檢查能否加快運送，然後回電告知結果。選項A『下新訂單』與選項B『取消當前貨運』均未提及，選項C『通知延遲』已在對話中說明，因此D為正確答案。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "expedite",
      "callback",
      "replacement",
      "shipment",
      "option"
    ],
    "transcript": "M: Good morning, this is Tom from Office Supplies Co. I'm calling about your order of printer cartridges. We received a notification that the delivery was marked as damaged.\nW: Oh, that's unfortunate. We were expecting that shipment today. We're almost out of ink in the main office printer.\nM: I understand. We can send a replacement shipment right away, but it won't arrive until Thursday. Would that work for you?\nW: Thursday is fine, but could you also check if there's a way to expedite it? We have an important report due Wednesday.\nM: I'll see what I can do. I'll call you back within the hour."
  },
  {
    "id": "p3-gen-019",
    "part": "Part 3",
    "question": "What is the main purpose of the conversation?",
    "choices": {
      "A": "To complain about a printer problem",
      "B": "To schedule a meeting for Monday",
      "C": "To discuss a printer replacement plan",
      "D": "To request a new report deadline"
    },
    "answer": "C",
    "explanation_zh": "對話主要目的是討論舊印表機更換計畫。女士首先提到更換通知，男士表達對停機時間的擔憂，隨後女士說明新機器將在週一下午準備好。選項A（抱怨印表機問題）不正確，因為對話中沒有抱怨，而是討論安排；B（安排會議）和D（要求新的報告截止日期）完全未提及。因此C正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "installation",
      "replacement",
      "operational",
      "downtime",
      "deadline"
    ],
    "transcript": "W: Have you seen the notice about the new printer installation? It says the old one on the third floor will be replaced next Monday.\nM: Yes, but I'm worried about the downtime. We have a big report due on Tuesday morning.\nW: The notice says the new printer will be fully operational by Monday afternoon. We can use the second floor printer in the meantime.\nM: That's a relief. I'll make sure to finish my printing before the installation starts."
  },
  {
    "id": "p3-gen-020",
    "part": "Part 3",
    "question": "What problem does the man express?",
    "choices": {
      "A": "He cannot find the notice",
      "B": "The report deadline has changed",
      "C": "The second floor printer is broken",
      "D": "He might not have access to printing when needed"
    },
    "answer": "D",
    "explanation_zh": "男士表達的問題是擔心更換期間無法列印，影響週二早上要交的報告。他說「worried about the downtime」，暗示可能無法及時使用印表機。選項A（找不到通知）錯誤，因為他已經看過通知；B（報告截止日更改）未提及；C（二樓印表機故障）對話中二樓印表機是可用的替代方案。因此D正確。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "installation",
      "downtime",
      "operational",
      "in the meantime"
    ],
    "transcript": "W: Have you seen the notice about the new printer installation? It says the old one on the third floor will be replaced next Monday.\nM: Yes, but I'm worried about the downtime. We have a big report due on Tuesday morning.\nW: The notice says the new printer will be fully operational by Monday afternoon. We can use the second floor printer in the meantime.\nM: That's a relief. I'll make sure to finish my printing before the installation starts."
  },
  {
    "id": "p3-gen-021",
    "part": "Part 3",
    "question": "What will the man most likely do next?",
    "choices": {
      "A": "Print his report before Monday",
      "B": "Move the printer to the second floor",
      "C": "Submit the report on Monday afternoon",
      "D": "Ask for an extension on the report"
    },
    "answer": "A",
    "explanation_zh": "男士說「I'll make sure to finish my printing before the installation starts」，表示他會在安裝開始前完成列印，也就是週一之前。選項A（在週一前列印報告）與此一致。B（將印表機搬到二樓）不合理，因為他沒有權限；C（週一下午交報告）對話中報告是週二早上截止；D（要求延期）未提及。因此A正確。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "installation",
      "downtime",
      "operational",
      "deadline",
      "extension"
    ],
    "transcript": "W: Have you seen the notice about the new printer installation? It says the old one on the third floor will be replaced next Monday.\nM: Yes, but I'm worried about the downtime. We have a big report due on Tuesday morning.\nW: The notice says the new printer will be fully operational by Monday afternoon. We can use the second floor printer in the meantime.\nM: That's a relief. I'll make sure to finish my printing before the installation starts."
  },
  {
    "id": "p3-gen-022",
    "part": "Part 3",
    "question": "What is the main purpose of the woman's call to the hotel?",
    "choices": {
      "A": "To cancel the current reservation",
      "B": "To ask about conference dates",
      "C": "To confirm the departure date",
      "D": "To add an extra night to the booking"
    },
    "answer": "D",
    "explanation_zh": "根據對話，女士最後說「我馬上打電話給飯店延長您的住宿」，因為男士需要提前一天抵達參加11日晚上的晚宴。選項A取消預訂、B詢問會議日期、C確認退房日期均與對話內容不符。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "finalized",
      "check-in",
      "check-out",
      "networking",
      "extend"
    ],
    "transcript": "W: Mr. Tanaka, I've finalized the hotel booking for the Tokyo conference next month. You're at the Grand Palace Hotel, check-in on the 12th, check-out on the 15th.\nM: That's fine, but I thought the conference started on the 11th. Did you confirm the dates with the organizer?\nW: Yes, I double-checked yesterday. The conference runs from the 12th to the 14th, with a pre-conference networking dinner on the evening of the 11th.\nM: Oh, I see. Then I'll need to arrive a day earlier. Can you adjust the hotel reservation to include the 11th as well?\nW: Of course. I'll call the hotel right away to extend your stay."
  },
  {
    "id": "p3-gen-023",
    "part": "Part 3",
    "question": "What can be inferred about the man's original understanding of the conference?",
    "choices": {
      "A": "He thought the conference started on the 11th",
      "B": "He knew about the networking dinner",
      "C": "He planned to stay until the 16th",
      "D": "He had already booked a different hotel"
    },
    "answer": "A",
    "explanation_zh": "男士說「我以為會議是11日開始的」，這表明他原來的理解是會議從11日開始，但實際上會議是12日到14日。選項B他知道晚宴、C他計畫住到16日、D他訂了不同飯店，對話中皆無證據支持。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "finalized",
      "double-checked",
      "networking",
      "adjust",
      "extend"
    ],
    "transcript": "W: Mr. Tanaka, I've finalized the hotel booking for the Tokyo conference next month. You're at the Grand Palace Hotel, check-in on the 12th, check-out on the 15th.\nM: That's fine, but I thought the conference started on the 11th. Did you confirm the dates with the organizer?\nW: Yes, I double-checked yesterday. The conference runs from the 12th to the 14th, with a pre-conference networking dinner on the evening of the 11th.\nM: Oh, I see. Then I'll need to arrive a day earlier. Can you adjust the hotel reservation to include the 11th as well?\nW: Of course. I'll call the hotel right away to extend your stay."
  },
  {
    "id": "p3-gen-024",
    "part": "Part 3",
    "question": "What will the woman most likely do next?",
    "choices": {
      "A": "Send the man a revised itinerary",
      "B": "Contact the hotel to modify the reservation",
      "C": "Cancel the networking dinner booking",
      "D": "Confirm the conference schedule again"
    },
    "answer": "B",
    "explanation_zh": "對話最後女士說「我馬上打電話給飯店延長您的住宿」，因此接下來她最有可能做的是聯繫飯店修改預訂。選項A發送修訂行程、C取消晚宴預訂、D再次確認會議日程，均非她明確表示要做的下一步行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "finalized",
      "reservation",
      "adjust",
      "extend",
      "itinerary"
    ],
    "transcript": "W: Mr. Tanaka, I've finalized the hotel booking for the Tokyo conference next month. You're at the Grand Palace Hotel, check-in on the 12th, check-out on the 15th.\nM: That's fine, but I thought the conference started on the 11th. Did you confirm the dates with the organizer?\nW: Yes, I double-checked yesterday. The conference runs from the 12th to the 14th, with a pre-conference networking dinner on the evening of the 11th.\nM: Oh, I see. Then I'll need to arrive a day earlier. Can you adjust the hotel reservation to include the 11th as well?\nW: Of course. I'll call the hotel right away to extend your stay."
  },
  {
    "id": "p3-gen-025",
    "part": "Part 3",
    "question": "Why does the customer want to return the printer?",
    "choices": {
      "A": "It has a paper jam issue.",
      "B": "It was too expensive.",
      "C": "It arrived damaged.",
      "D": "It is the wrong model."
    },
    "answer": "A",
    "explanation_zh": "顧客表示印表機在雙面列印時經常卡紙，因此想退貨。對話中顧客說「It keeps jamming when I try to print double-sided」，故答案為A。選項B（太貴）、C（送達時損壞）、D（型號錯誤）均未在對話中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "return",
      "jamming",
      "receipt",
      "packaging",
      "refund",
      "exchange"
    ],
    "transcript": "W: Good morning, I’d like to return this printer I bought last week. It keeps jamming when I try to print double-sided.\nM: I see. Do you have the receipt and the original packaging?\nW: The receipt is here, but I threw away the box. Is that a problem?\nM: Unfortunately, our return policy requires the original packaging for a full refund. Without it, I can only offer an exchange or store credit.\nW: Oh, I really need a refund. Can you make an exception?\nM: I’m sorry, but those are the store rules. Would you like to look at other printers instead?"
  },
  {
    "id": "p3-gen-026",
    "part": "Part 3",
    "question": "What does the staff imply about the return policy?",
    "choices": {
      "A": "He can make exceptions for loyal customers.",
      "B": "The policy strictly requires original packaging for a refund.",
      "C": "The policy is flexible if the receipt is available.",
      "D": "He will check with the manager later."
    },
    "answer": "B",
    "explanation_zh": "店員表示退貨政策要求「original packaging for a full refund」，沒有原包裝只能換貨或退store credit，且拒絕破例，故答案為B。選項A（忠實客戶可破例）、C（有收據即可彈性處理）、D（稍後詢問經理）均與對話內容不符。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "original",
      "exception",
      "store credit",
      "rules"
    ],
    "transcript": "W: Good morning, I’d like to return this printer I bought last week. It keeps jamming when I try to print double-sided.\nM: I see. Do you have the receipt and the original packaging?\nW: The receipt is here, but I threw away the box. Is that a problem?\nM: Unfortunately, our return policy requires the original packaging for a full refund. Without it, I can only offer an exchange or store credit.\nW: Oh, I really need a refund. Can you make an exception?\nM: I’m sorry, but those are the store rules. Would you like to look at other printers instead?"
  },
  {
    "id": "p3-gen-027",
    "part": "Part 3",
    "question": "What will the customer most likely do next?",
    "choices": {
      "A": "Leave the store without any resolution.",
      "B": "Ask for a full refund again.",
      "C": "Consider exchanging the printer.",
      "D": "Complain to the manager."
    },
    "answer": "C",
    "explanation_zh": "店員提議「Would you like to look at other printers instead?」，顧客未拒絕，且已被告知無法退款，最可能接受換貨選項，故答案為C。選項A（離開無結果）、B（再次要求退款）、D（向經理投訴）均未在對話中顯示。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "resolution",
      "consider",
      "exchange",
      "look at",
      "instead"
    ],
    "transcript": "W: Good morning, I’d like to return this printer I bought last week. It keeps jamming when I try to print double-sided.\nM: I see. Do you have the receipt and the original packaging?\nW: The receipt is here, but I threw away the box. Is that a problem?\nM: Unfortunately, our return policy requires the original packaging for a full refund. Without it, I can only offer an exchange or store credit.\nW: Oh, I really need a refund. Can you make an exception?\nM: I’m sorry, but those are the store rules. Would you like to look at other printers instead?"
  },
  {
    "id": "p3-gen-028",
    "part": "Part 3",
    "question": "Why is the man calling to reschedule?",
    "choices": {
      "A": "He has a doctor's appointment",
      "B": "He has a mandatory training session",
      "C": "The plumber is unavailable on Thursday",
      "D": "He forgot about the original appointment"
    },
    "answer": "B",
    "explanation_zh": "根據對話，男士說『I just found out I have a mandatory safety training』，因此他需要重新安排時間，答案為B。選項A（醫生預約）、C（水管工人週四沒空）、D（忘記原預約）均未在對話中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "reschedule",
      "mandatory",
      "convenient",
      "confirmation",
      "slot"
    ],
    "transcript": "W: Hello, this is Sarah from CityWide Plumbing. I'm calling to confirm your appointment for tomorrow at 10 AM. Is that still convenient?\nM: Actually, I need to reschedule. I just found out I have a mandatory safety training at the same time. Could we move it to Thursday afternoon?\nW: Let me check... I have a slot open at 2 PM on Thursday. Would that work for you?\nM: That should be fine. Please send me a confirmation email with the new time and date.\nW: Of course. I'll email you right after this call."
  },
  {
    "id": "p3-gen-029",
    "part": "Part 3",
    "question": "What does the woman imply about Thursday at 2 PM?",
    "choices": {
      "A": "It is the only time she has available all week",
      "B": "The plumber will charge extra for that slot",
      "C": "It is an open appointment she can offer",
      "D": "She needs to confirm with her manager first"
    },
    "answer": "C",
    "explanation_zh": "女士說『I have a slot open at 2 PM on Thursday』，暗示這個時段是可供預約的空檔，答案為C。選項A（本週唯一空檔）未提及、B（加收費用）無根據、D（需先確認主管）與對話中直接提供時段不符。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "slot",
      "available",
      "imply",
      "offer",
      "confirm"
    ],
    "transcript": "W: Hello, this is Sarah from CityWide Plumbing. I'm calling to confirm your appointment for tomorrow at 10 AM. Is that still convenient?\nM: Actually, I need to reschedule. I just found out I have a mandatory safety training at the same time. Could we move it to Thursday afternoon?\nW: Let me check... I have a slot open at 2 PM on Thursday. Would that work for you?\nM: That should be fine. Please send me a confirmation email with the new time and date.\nW: Of course. I'll email you right after this call."
  },
  {
    "id": "p3-gen-030",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Call the man's supervisor",
      "B": "Cancel the original appointment",
      "C": "Reschedule for Friday morning",
      "D": "Send a confirmation email"
    },
    "answer": "D",
    "explanation_zh": "對話結尾女士說『I'll email you right after this call』，因此她接下來會發送確認郵件，答案為D。選項A（打電話給男士主管）、B（取消原預約）、C（改到週五早上）均未在對話中出現。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "confirmation",
      "email",
      "immediately",
      "appointment",
      "reschedule"
    ],
    "transcript": "W: Hello, this is Sarah from CityWide Plumbing. I'm calling to confirm your appointment for tomorrow at 10 AM. Is that still convenient?\nM: Actually, I need to reschedule. I just found out I have a mandatory safety training at the same time. Could we move it to Thursday afternoon?\nW: Let me check... I have a slot open at 2 PM on Thursday. Would that work for you?\nM: That should be fine. Please send me a confirmation email with the new time and date.\nW: Of course. I'll email you right after this call."
  },
  {
    "id": "p3-gen-031",
    "part": "Part 3",
    "question": "Why is the man calling?",
    "choices": {
      "A": "To place a new order for tablet chargers",
      "B": "To complain about a defective product",
      "C": "To report an incomplete delivery",
      "D": "To cancel a promotion"
    },
    "answer": "C",
    "explanation_zh": "對話中男士明確說『我們收到貨物，但缺少一半的平板充電器』，這表示送貨不完整。選項A（下新訂單）未提及，選項B（產品瑕疵）不是問題核心，選項D（取消促銷）與內容相反。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "missing",
      "warehouse",
      "courier",
      "promotion"
    ],
    "transcript": "W: Good morning, Wilson Electronics. How can I help you?\nM: Hi, this is David Chen from City Retail. I'm calling about our order #4382. We received the shipment this morning, but we're missing half of the tablet chargers.\nW: I'm sorry to hear that. Let me check our system... I see the order was marked as complete. Could you hold for a moment while I look into the warehouse log?\nM: Sure, but we have a promotion starting tomorrow, and we really need those chargers by end of day.\nW: I understand. I can see here that the chargers were actually split into two boxes. The second box might have been delayed. Let me arrange an urgent courier to deliver it this afternoon."
  },
  {
    "id": "p3-gen-032",
    "part": "Part 3",
    "question": "What does the woman imply about the missing chargers?",
    "choices": {
      "A": "They were sent to the wrong address",
      "B": "They were damaged during shipping",
      "C": "They are no longer in stock",
      "D": "They were separated into two packages"
    },
    "answer": "D",
    "explanation_zh": "女士查詢後表示『充電器實際上分成了兩個箱子，第二箱可能延遲了』，這暗示問題是分箱寄送導致。選項A（錯誤地址）、B（運送損壞）、C（無庫存）均未在對話中被支持或提及。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "split",
      "delayed",
      "urgent",
      "courier",
      "promotion"
    ],
    "transcript": "W: Good morning, Wilson Electronics. How can I help you?\nM: Hi, this is David Chen from City Retail. I'm calling about our order #4382. We received the shipment this morning, but we're missing half of the tablet chargers.\nW: I'm sorry to hear that. Let me check our system... I see the order was marked as complete. Could you hold for a moment while I look into the warehouse log?\nM: Sure, but we have a promotion starting tomorrow, and we really need those chargers by end of day.\nW: I understand. I can see here that the chargers were actually split into two boxes. The second box might have been delayed. Let me arrange an urgent courier to deliver it this afternoon."
  },
  {
    "id": "p3-gen-033",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Send the missing chargers by express delivery",
      "B": "Check the warehouse log again",
      "C": "Cancel the promotion for the man",
      "D": "Call the shipping company for a refund"
    },
    "answer": "A",
    "explanation_zh": "對話結尾女士說『我來安排急件快遞，今天下午送到』，這等同於用快遞寄送缺少的充電器。選項B（再次檢查倉庫記錄）已做過，選項C（取消促銷）與需求相反，選項D（要求退款）未提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "express",
      "delivery",
      "arrange",
      "urgent",
      "courier"
    ],
    "transcript": "W: Good morning, Wilson Electronics. How can I help you?\nM: Hi, this is David Chen from City Retail. I'm calling about our order #4382. We received the shipment this morning, but we're missing half of the tablet chargers.\nW: I'm sorry to hear that. Let me check our system... I see the order was marked as complete. Could you hold for a moment while I look into the warehouse log?\nM: Sure, but we have a promotion starting tomorrow, and we really need those chargers by end of day.\nW: I understand. I can see here that the chargers were actually split into two boxes. The second box might have been delayed. Let me arrange an urgent courier to deliver it this afternoon."
  },
  {
    "id": "p3-gen-034",
    "part": "Part 3",
    "question": "What is the main purpose of the conversation?",
    "choices": {
      "A": "To complain about a noisy coworker",
      "B": "To schedule a printer repair appointment",
      "C": "To discuss a new office policy on phone calls",
      "D": "To address a scheduling conflict caused by equipment installation"
    },
    "answer": "D",
    "explanation_zh": "對話目的：女士提到新印表機安裝（設備更新），男士擔心下午3點客戶電話會議受噪音影響。選項D「處理設備安裝造成的日程衝突」正確。A「抱怨吵鬧同事」未提及；B「安排印表機維修」是安裝而非維修；C「討論電話政策」無關。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "memo",
      "installation",
      "cubicle",
      "conference call",
      "power tools",
      "setup"
    ],
    "transcript": "W: Have you seen the memo about the new printer installation? The IT team will be working on the third floor from 2 PM to 5 PM today.\nM: Yes, I saw it. But I'm worried about the noise. I have a client conference call scheduled at 3 PM, and the printer room is right next to my cubicle.\nW: That could be a problem. I heard they'll be using power tools for the setup. Maybe you could use the small meeting room on the fourth floor for your call. It's usually empty in the afternoon.\nM: Good idea. I'll book it right now before someone else takes it."
  },
  {
    "id": "p3-gen-035",
    "part": "Part 3",
    "question": "What problem does the man anticipate?",
    "choices": {
      "A": "The printer installation noise will disrupt his important call",
      "B": "The meeting room on the fourth floor is already booked",
      "C": "The IT team will finish the installation late",
      "D": "The memo did not provide enough details"
    },
    "answer": "A",
    "explanation_zh": "推論題：男士明確說「擔心噪音」，因為下午3點有客戶電話會議，且印表機室就在他隔間旁。選項A「安裝噪音會干擾重要電話」正確。B「四樓會議室已被預訂」是女士推測通常空著，但男士尚未確認；C「IT團隊會遲完工」未提及；D「備忘錄細節不足」與對話不符。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "anticipate",
      "disrupt",
      "installation",
      "conference call",
      "cubicle",
      "setup"
    ],
    "transcript": "W: Have you seen the memo about the new printer installation? The IT team will be working on the third floor from 2 PM to 5 PM today.\nM: Yes, I saw it. But I'm worried about the noise. I have a client conference call scheduled at 3 PM, and the printer room is right next to my cubicle.\nW: That could be a problem. I heard they'll be using power tools for the setup. Maybe you could use the small meeting room on the fourth floor for your call. It's usually empty in the afternoon.\nM: Good idea. I'll book it right now before someone else takes it."
  },
  {
    "id": "p3-gen-036",
    "part": "Part 3",
    "question": "What will the man most likely do next?",
    "choices": {
      "A": "Call the IT team to reschedule the installation",
      "B": "Reserve the fourth-floor meeting room",
      "C": "Move his cubicle to a quieter area",
      "D": "Postpone his conference call with the client"
    },
    "answer": "B",
    "explanation_zh": "下一步行動題：男士說「好主意，我現在就去預訂，免得被人搶走」，因此他會去預訂四樓會議室。選項B正確。A「打電話給IT團隊重新安排安裝」、C「搬移隔間」、D「推遲電話會議」均未在對話中支持。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "reserve",
      "book",
      "meeting room",
      "cubicle",
      "conference call",
      "installation"
    ],
    "transcript": "W: Have you seen the memo about the new printer installation? The IT team will be working on the third floor from 2 PM to 5 PM today.\nM: Yes, I saw it. But I'm worried about the noise. I have a client conference call scheduled at 3 PM, and the printer room is right next to my cubicle.\nW: That could be a problem. I heard they'll be using power tools for the setup. Maybe you could use the small meeting room on the fourth floor for your call. It's usually empty in the afternoon.\nM: Good idea. I'll book it right now before someone else takes it."
  },
  {
    "id": "p3-gen-037",
    "part": "Part 3",
    "question": "What is the main purpose of the woman's conversation with Mark?",
    "choices": {
      "A": "To check on Mark's travel arrangements for a conference",
      "B": "To remind Mark about the keynote speech time",
      "C": "To ask Mark to register for the sales conference",
      "D": "To provide Mark with the final agenda"
    },
    "answer": "A",
    "explanation_zh": "女士首先問 Mark 是否已預訂機票，並提到會議註冊，顯示主要目的是確認他的旅行安排。B 選項（提醒主題演講時間）只是對話中的細節，非主要目的；C 選項（要求註冊）與對話中 Mark 已註冊的事實不符；D 選項（提供最終議程）是女士提議的動作，但並非她打電話的主因。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "registered",
      "conference",
      "agenda",
      "keynote",
      "convention center"
    ],
    "transcript": "W: Hi Mark, I see you've registered for the annual sales conference next month. Have you booked your flight yet?\nM: Not yet. I was waiting for the final agenda to see which sessions I need to attend on the first day.\nW: The agenda was emailed yesterday. The keynote is at 9 AM, so you might want to arrive the evening before.\nM: Good idea. I'll check flights and book a hotel near the convention center. Can you send me the recommended hotel list?\nW: Sure, I'll forward it right away."
  },
  {
    "id": "p3-gen-038",
    "part": "Part 3",
    "question": "What can be inferred about Mark's current situation?",
    "choices": {
      "A": "He has already booked a hotel room",
      "B": "He has not yet made any travel reservations",
      "C": "He plans to drive to the conference",
      "D": "He is unsure about attending the conference"
    },
    "answer": "B",
    "explanation_zh": "Mark 說『Not yet』表示尚未預訂機票，並提到要查航班和訂飯店，推斷他沒有任何旅行預訂。A 選項（已訂飯店）與他要求推薦飯店列表矛盾；C 選項（開車前往）對話未提及；D 選項（不確定參加）與他已註冊及積極規劃行程的事實不符。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "booked",
      "flight",
      "reservations",
      "sessions",
      "recommended"
    ],
    "transcript": "W: Hi Mark, I see you've registered for the annual sales conference next month. Have you booked your flight yet?\nM: Not yet. I was waiting for the final agenda to see which sessions I need to attend on the first day.\nW: The agenda was emailed yesterday. The keynote is at 9 AM, so you might want to arrive the evening before.\nM: Good idea. I'll check flights and book a hotel near the convention center. Can you send me the recommended hotel list?\nW: Sure, I'll forward it right away."
  },
  {
    "id": "p3-gen-039",
    "part": "Part 3",
    "question": "What will the woman most likely do next?",
    "choices": {
      "A": "Call the hotel to make a reservation",
      "B": "Email the final agenda to Mark",
      "C": "Send Mark a list of recommended hotels",
      "D": "Book a flight for Mark"
    },
    "answer": "C",
    "explanation_zh": "對話最後女士說『I'll forward it right away』，表示她會立即轉寄推薦飯店列表。A 選項（打電話訂飯店）是 Mark 的任務；B 選項（寄送最終議程）女士已提到議程昨天用電子郵件發送，無需再寄；D 選項（幫 Mark 訂機票）對話中女士只問他是否已訂，並未說要代訂。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "forward",
      "recommended",
      "hotel list",
      "reservation",
      "convention center"
    ],
    "transcript": "W: Hi Mark, I see you've registered for the annual sales conference next month. Have you booked your flight yet?\nM: Not yet. I was waiting for the final agenda to see which sessions I need to attend on the first day.\nW: The agenda was emailed yesterday. The keynote is at 9 AM, so you might want to arrive the evening before.\nM: Good idea. I'll check flights and book a hotel near the convention center. Can you send me the recommended hotel list?\nW: Sure, I'll forward it right away."
  },
  {
    "id": "p3-gen-040",
    "part": "Part 3",
    "question": "Why does the woman want to return the laptop?",
    "choices": {
      "A": "It was too expensive.",
      "B": "The keyboard is malfunctioning.",
      "C": "She prefers a different color.",
      "D": "The screen is cracked."
    },
    "answer": "B",
    "explanation_zh": "女士想退貨，因為筆電鍵盤有幾個按鍵卡住，她認為是製造瑕疵。對話中她明確說『The keyboard has a few sticky keys』，因此答案為B。選項A（太貴）、C（偏好不同顏色）、D（螢幕破裂）均未提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "return",
      "defect",
      "receipt",
      "packaging",
      "store credit"
    ],
    "transcript": "W: Good afternoon, I’d like to return this laptop I bought last week. The keyboard has a few sticky keys, and I think it’s a manufacturing defect.\nM: I understand your concern. Do you have the receipt and the original packaging?\nW: Yes, I have the receipt here, but I threw away the box. Is that a problem?\nM: It’s not ideal, but we can still process the return. However, without the box, we can only offer a store credit instead of a full refund.\nW: That’s fine. I’ll just use the credit to buy a different model.\nM: Let me start the paperwork. Please wait a moment."
  },
  {
    "id": "p3-gen-041",
    "part": "Part 3",
    "question": "What can be inferred about the store's return policy?",
    "choices": {
      "A": "A full refund is always given.",
      "B": "The box is required for any return.",
      "C": "Store credit is offered when packaging is missing.",
      "D": "Returns are only allowed within three days."
    },
    "answer": "C",
    "explanation_zh": "從店員說『沒有盒子只能提供商店信用額度而非全額退款』可推斷，缺少包裝時會以商店信用額度處理。答案為C。選項A（總是全額退款）與對話矛盾；B（任何退貨都需要盒子）錯誤，因店員仍可處理；D（僅限三天內退貨）未提及。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "policy",
      "process",
      "refund",
      "store credit",
      "packaging"
    ],
    "transcript": "W: Good afternoon, I’d like to return this laptop I bought last week. The keyboard has a few sticky keys, and I think it’s a manufacturing defect.\nM: I understand your concern. Do you have the receipt and the original packaging?\nW: Yes, I have the receipt here, but I threw away the box. Is that a problem?\nM: It’s not ideal, but we can still process the return. However, without the box, we can only offer a store credit instead of a full refund.\nW: That’s fine. I’ll just use the credit to buy a different model.\nM: Let me start the paperwork. Please wait a moment."
  },
  {
    "id": "p3-gen-042",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Give the woman a full refund.",
      "B": "Ask for the woman's ID card.",
      "C": "Check the laptop's screen.",
      "D": "Begin the return paperwork."
    },
    "answer": "D",
    "explanation_zh": "店員最後說『Let me start the paperwork. Please wait a moment.』，表示他接下來要開始辦理退貨文件。答案為D。選項A（全額退款）與政策不符；B（要求身分證）未提及；C（檢查螢幕）非下一步動作。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "paperwork",
      "process",
      "return",
      "store credit"
    ],
    "transcript": "W: Good afternoon, I’d like to return this laptop I bought last week. The keyboard has a few sticky keys, and I think it’s a manufacturing defect.\nM: I understand your concern. Do you have the receipt and the original packaging?\nW: Yes, I have the receipt here, but I threw away the box. Is that a problem?\nM: It’s not ideal, but we can still process the return. However, without the box, we can only offer a store credit instead of a full refund.\nW: That’s fine. I’ll just use the credit to buy a different model.\nM: Let me start the paperwork. Please wait a moment."
  },
  {
    "id": "p4-gen-001",
    "part": "Part 4",
    "question": "What is the main purpose of this message?",
    "choices": {
      "A": "To announce a change in a scheduled service",
      "B": "To advertise a new water heater promotion",
      "C": "To request payment for an installation",
      "D": "To confirm a completed appointment"
    },
    "answer": "A",
    "explanation_zh": "訊息開頭明確說明「reschedule your water heater installation」，並將日期從3月15日改到3月20日，因此主要目的是通知服務時間變更。選項B、C、D分別涉及廣告、付款和確認已完成預約，均未在訊息中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "reschedule",
      "installation",
      "supplier",
      "delay",
      "appointment",
      "confirm"
    ],
    "transcript": "Hello, this is a message from GreenTech Home Services. We are calling to reschedule your water heater installation originally set for this Friday, March 15th. Due to a supplier delay, the new unit will not arrive until next Tuesday. Therefore, we need to move your appointment to Wednesday, March 20th, at 10 AM. If this time does not work for you, please call our office at 555-0199 within 24 hours to arrange an alternative. We apologize for any inconvenience this may cause and thank you for your understanding. Please confirm receipt of this message by pressing 1 now."
  },
  {
    "id": "p4-gen-002",
    "part": "Part 4",
    "question": "According to the message, why is the appointment being rescheduled?",
    "choices": {
      "A": "The customer requested a different time",
      "B": "The equipment has not yet been delivered",
      "C": "The technician is unavailable on Friday",
      "D": "The office is closed on March 15th"
    },
    "answer": "B",
    "explanation_zh": "訊息中提到「Due to a supplier delay, the new unit will not arrive until next Tuesday」，因此延期的直接原因是設備尚未送達。選項A、C、D分別為客戶要求、技術人員無法出席或辦公室關閉，均與訊息內容不符。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "reschedule",
      "installation",
      "supplier",
      "delay",
      "unit",
      "alternative"
    ],
    "transcript": "Hello, this is a message from GreenTech Home Services. We are calling to reschedule your water heater installation originally set for this Friday, March 15th. Due to a supplier delay, the new unit will not arrive until next Tuesday. Therefore, we need to move your appointment to Wednesday, March 20th, at 10 AM. If this time does not work for you, please call our office at 555-0199 within 24 hours to arrange an alternative. We apologize for any inconvenience this may cause and thank you for your understanding. Please confirm receipt of this message by pressing 1 now."
  },
  {
    "id": "p4-gen-003",
    "part": "Part 4",
    "question": "What should the listener do if the new appointment time is inconvenient?",
    "choices": {
      "A": "Send an email to the supplier",
      "B": "Ignore the message and wait for a call",
      "C": "Call the office within one day",
      "D": "Press 1 to confirm the new time"
    },
    "answer": "C",
    "explanation_zh": "訊息中明確指示「If this time does not work for you, please call our office at 555-0199 within 24 hours」，因此聽者應在24小時內致電辦公室。選項A和B未在訊息中提及，選項D是確認新時間而非表示不便。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "reschedule",
      "installation",
      "supplier",
      "delay",
      "appointment",
      "alternative"
    ],
    "transcript": "Hello, this is a message from GreenTech Home Services. We are calling to reschedule your water heater installation originally set for this Friday, March 15th. Due to a supplier delay, the new unit will not arrive until next Tuesday. Therefore, we need to move your appointment to Wednesday, March 20th, at 10 AM. If this time does not work for you, please call our office at 555-0199 within 24 hours to arrange an alternative. We apologize for any inconvenience this may cause and thank you for your understanding. Please confirm receipt of this message by pressing 1 now."
  },
  {
    "id": "p4-gen-004",
    "part": "Part 4",
    "question": "What is the main purpose of this announcement?",
    "choices": {
      "A": "To announce a new inventory tracking system",
      "B": "To instruct staff to stop shipping a specific product",
      "C": "To report a successful inventory recount",
      "D": "To request staff to update the database manually"
    },
    "answer": "B",
    "explanation_zh": "此公告的主要目的是告知倉庫員工因庫存數據錯誤，暫停處理Model X300耳機的出貨。錄音中明確提到『please do not process any shipments for the X300 until further notice』，因此正確答案為B。選項A（新系統）未提及，選項C（盤點完成）尚未發生，選項D（手動更新資料庫）並非指示。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "discrepancy",
      "inventory",
      "shipments",
      "manual recount",
      "revised"
    ],
    "transcript": "Attention, all warehouse staff. This is an important announcement from the logistics manager. Due to a system error in our inventory database, the stock levels for several popular items were incorrectly updated last night. Specifically, the quantity of Model X300 headphones was recorded as 500 units, but the actual physical count is only 200. This discrepancy will affect all outgoing orders scheduled for this afternoon. Therefore, please do not process any shipments for the X300 until further notice. The inventory team is currently conducting a manual recount and expects to resolve the issue by 4 PM. Once the recount is complete, we will send a revised pick list to each department. Please direct any urgent client inquiries to the customer service desk. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-005",
    "part": "Part 4",
    "question": "According to the announcement, what is the actual number of Model X300 headphones in the warehouse?",
    "choices": {
      "A": "500 units",
      "B": "300 units",
      "C": "200 units",
      "D": "400 units"
    },
    "answer": "C",
    "explanation_zh": "題目詢問實際庫存數量，錄音中明確指出『the actual physical count is only 200』，因此正確答案為C。選項A（500）是錯誤記錄的數字，選項B（300）和D（400）未在錄音中出現。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "discrepancy",
      "inventory",
      "shipments",
      "manual recount",
      "revised"
    ],
    "transcript": "Attention, all warehouse staff. This is an important announcement from the logistics manager. Due to a system error in our inventory database, the stock levels for several popular items were incorrectly updated last night. Specifically, the quantity of Model X300 headphones was recorded as 500 units, but the actual physical count is only 200. This discrepancy will affect all outgoing orders scheduled for this afternoon. Therefore, please do not process any shipments for the X300 until further notice. The inventory team is currently conducting a manual recount and expects to resolve the issue by 4 PM. Once the recount is complete, we will send a revised pick list to each department. Please direct any urgent client inquiries to the customer service desk. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-006",
    "part": "Part 4",
    "question": "What should staff do if a customer calls about an urgent order for the X300?",
    "choices": {
      "A": "Ask the customer to call back after 4 PM",
      "B": "Inform the logistics manager immediately",
      "C": "Check the inventory database for updates",
      "D": "Refer the customer to the customer service desk"
    },
    "answer": "D",
    "explanation_zh": "錄音最後指示：『Please direct any urgent client inquiries to the customer service desk.』因此若有客戶緊急詢問X300訂單，員工應將客戶轉接至客服櫃檯，故正確答案為D。選項A（請客戶4點後再打）未提及，選項B（通知物流經理）與C（檢查資料庫）皆非公告指示。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "discrepancy",
      "inventory",
      "shipments",
      "manual recount",
      "revised"
    ],
    "transcript": "Attention, all warehouse staff. This is an important announcement from the logistics manager. Due to a system error in our inventory database, the stock levels for several popular items were incorrectly updated last night. Specifically, the quantity of Model X300 headphones was recorded as 500 units, but the actual physical count is only 200. This discrepancy will affect all outgoing orders scheduled for this afternoon. Therefore, please do not process any shipments for the X300 until further notice. The inventory team is currently conducting a manual recount and expects to resolve the issue by 4 PM. Once the recount is complete, we will send a revised pick list to each department. Please direct any urgent client inquiries to the customer service desk. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-007",
    "part": "Part 4",
    "question": "What is the purpose of this announcement?",
    "choices": {
      "A": "To announce a change in office hours",
      "B": "To introduce a new company policy on overtime",
      "C": "To inform staff about an upcoming security system upgrade",
      "D": "To remind employees about a fire drill"
    },
    "answer": "C",
    "explanation_zh": "主旨是通知員工新的安全系統將於下週一全面啟用，並說明相關事項。選項A、B、D在錄音中均未提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "security system",
      "ID badges",
      "card readers",
      "deactivated",
      "training session"
    ],
    "transcript": "Attention all staff. This is a reminder that the new security system will be fully operational starting next Monday. All employees must use their updated ID badges to access the building. The old card readers will be deactivated at 8 AM on Monday morning. If you have not yet received your new badge, please visit the HR office on the second floor between 9 AM and 5 PM today or tomorrow. Additionally, a brief training session on the new system will be held in Conference Room B at 3 PM this Friday. Attendance is strongly recommended for everyone. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-008",
    "part": "Part 4",
    "question": "What time will the old card readers be turned off?",
    "choices": {
      "A": "3 PM on Friday",
      "B": "9 AM today",
      "C": "5 PM tomorrow",
      "D": "8 AM on Monday"
    },
    "answer": "D",
    "explanation_zh": "錄音明確指出舊讀卡機將在週一早上8點停用。選項A是訓練時間，B和C是領取新證件的時間，皆非正確答案。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "security system",
      "ID badges",
      "card readers",
      "deactivated",
      "training session"
    ],
    "transcript": "Attention all staff. This is a reminder that the new security system will be fully operational starting next Monday. All employees must use their updated ID badges to access the building. The old card readers will be deactivated at 8 AM on Monday morning. If you have not yet received your new badge, please visit the HR office on the second floor between 9 AM and 5 PM today or tomorrow. Additionally, a brief training session on the new system will be held in Conference Room B at 3 PM this Friday. Attendance is strongly recommended for everyone. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-009",
    "part": "Part 4",
    "question": "What should employees who still need a new badge do next?",
    "choices": {
      "A": "Go to the HR office to pick up their badge",
      "B": "Attend a training session on Friday",
      "C": "Wait for the badge to be delivered by mail",
      "D": "Contact their supervisor for instructions"
    },
    "answer": "A",
    "explanation_zh": "錄音指示尚未收到新證件的員工前往二樓人力資源辦公室領取。選項B是建議參加的訓練，C和D在錄音中未提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "security system",
      "ID badges",
      "card readers",
      "deactivated",
      "training session"
    ],
    "transcript": "Attention all staff. This is a reminder that the new security system will be fully operational starting next Monday. All employees must use their updated ID badges to access the building. The old card readers will be deactivated at 8 AM on Monday morning. If you have not yet received your new badge, please visit the HR office on the second floor between 9 AM and 5 PM today or tomorrow. Additionally, a brief training session on the new system will be held in Conference Room B at 3 PM this Friday. Attendance is strongly recommended for everyone. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-010",
    "part": "Part 4",
    "question": "What is the main purpose of this announcement?",
    "choices": {
      "A": "To promote a new technology product",
      "B": "To explain the conference registration process",
      "C": "To announce a schedule change",
      "D": "To welcome attendees and provide conference information"
    },
    "answer": "D",
    "explanation_zh": "音檔開頭說 'Welcome to the Global Tech Conference 2025' 並由主持人介紹當日流程，包括主題演講、分組會議、午餐及報到事項，因此主要目的是歡迎與會者並提供會議資訊。選項 A 未提及新產品，B 僅部分涵蓋報到，C 無關日程變更，故 D 最符合。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "keynote",
      "breakout sessions",
      "pre-registration",
      "networking reception",
      "information booth"
    ],
    "transcript": "Welcome to the Global Tech Conference 2025. I’m your host, Sarah Lin. Today’s keynote begins at 9:30 AM in the main hall with Dr. Mark Chen discussing AI ethics. After that, you can choose from breakout sessions on cybersecurity, cloud computing, or digital marketing. Lunch will be served in the Riverside Pavilion from 12:15 to 1:30 PM. Please note that all afternoon workshops require pre-registration at the registration desk before 11 AM. We also have a networking reception at 5 PM in the Sky Lounge. For any questions, visit the information booth near the entrance. Enjoy the conference!"
  },
  {
    "id": "p4-gen-011",
    "part": "Part 4",
    "question": "What time must attendees register for afternoon workshops?",
    "choices": {
      "A": "Before 11 AM",
      "B": "At 9:30 AM",
      "C": "Between 12:15 and 1:30 PM",
      "D": "At 5 PM"
    },
    "answer": "A",
    "explanation_zh": "音檔明確指出 'all afternoon workshops require pre-registration at the registration desk before 11 AM'，因此正確時間為上午11點前。選項 B 是主題演講時間，C 是午餐時間，D 是交流酒會時間，皆不符合。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "pre-registration",
      "registration desk",
      "workshops"
    ],
    "transcript": "Welcome to the Global Tech Conference 2025. I’m your host, Sarah Lin. Today’s keynote begins at 9:30 AM in the main hall with Dr. Mark Chen discussing AI ethics. After that, you can choose from breakout sessions on cybersecurity, cloud computing, or digital marketing. Lunch will be served in the Riverside Pavilion from 12:15 to 1:30 PM. Please note that all afternoon workshops require pre-registration at the registration desk before 11 AM. We also have a networking reception at 5 PM in the Sky Lounge. For any questions, visit the information booth near the entrance. Enjoy the conference!"
  },
  {
    "id": "p4-gen-012",
    "part": "Part 4",
    "question": "What should attendees do if they have questions?",
    "choices": {
      "A": "Call the main office",
      "B": "Visit the information booth near the entrance",
      "C": "Email the host",
      "D": "Ask the keynote speaker"
    },
    "answer": "B",
    "explanation_zh": "音檔結尾提到 'For any questions, visit the information booth near the entrance'，因此正確行動是前往入口附近的資訊臺。選項 A、C、D 均未在原文中提及，故 B 為唯一正確答案。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "information booth",
      "entrance"
    ],
    "transcript": "Welcome to the Global Tech Conference 2025. I’m your host, Sarah Lin. Today’s keynote begins at 9:30 AM in the main hall with Dr. Mark Chen discussing AI ethics. After that, you can choose from breakout sessions on cybersecurity, cloud computing, or digital marketing. Lunch will be served in the Riverside Pavilion from 12:15 to 1:30 PM. Please note that all afternoon workshops require pre-registration at the registration desk before 11 AM. We also have a networking reception at 5 PM in the Sky Lounge. For any questions, visit the information booth near the entrance. Enjoy the conference!"
  },
  {
    "id": "p4-gen-013",
    "part": "Part 4",
    "question": "What is the main purpose of this message?",
    "choices": {
      "A": "To announce a temporary closure and provide alternatives",
      "B": "To promote a new discount on office supplies",
      "C": "To request customers to place orders before December 20th",
      "D": "To explain how to use the live chat feature"
    },
    "answer": "A",
    "explanation_zh": "錄音開頭說明倉庫因盤點關閉，並提供語音信箱和網站即時聊天作為替代方案，因此主要目的是宣佈暫時關閉並提供替代選項。B選項折扣是關閉後的獎勵，非主要目的；C選項未要求提前下單；D選項僅是細節之一，非整體目的。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "warehouse",
      "inventory",
      "voicemail",
      "inconvenience",
      "discount"
    ],
    "transcript": "Thank you for calling GreenLeaf Office Supplies. This is a recorded message to inform you that our warehouse will be closed for inventory from December 20th to December 22nd. During this time, we will not process any new orders or shipments. If you have an urgent request, please press 1 to leave a voicemail for our customer service team. They will return your call within 24 hours. For general inquiries, you can also visit our website at www.greenleaf.com and use the live chat feature. We apologize for any inconvenience and appreciate your understanding. Your next order placed after December 22nd will receive a 10% discount as a thank-you for your patience."
  },
  {
    "id": "p4-gen-014",
    "part": "Part 4",
    "question": "What will happen if a customer presses 1?",
    "choices": {
      "A": "They will be transferred to a live agent immediately",
      "B": "They can leave a message and get a callback within one day",
      "C": "They will receive a 10% discount on their next order",
      "D": "They will be connected to the warehouse staff"
    },
    "answer": "B",
    "explanation_zh": "錄音明確說明按1可留下語音留言，客服團隊會在24小時內回電。A選項轉接真人客服並非立即；C選項折扣是關閉後下單才適用；D選項未提到連接到倉庫人員。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "warehouse",
      "inventory",
      "voicemail",
      "callback",
      "inquiries"
    ],
    "transcript": "Thank you for calling GreenLeaf Office Supplies. This is a recorded message to inform you that our warehouse will be closed for inventory from December 20th to December 22nd. During this time, we will not process any new orders or shipments. If you have an urgent request, please press 1 to leave a voicemail for our customer service team. They will return your call within 24 hours. For general inquiries, you can also visit our website at www.greenleaf.com and use the live chat feature. We apologize for any inconvenience and appreciate your understanding. Your next order placed after December 22nd will receive a 10% discount as a thank-you for your patience."
  },
  {
    "id": "p4-gen-015",
    "part": "Part 4",
    "question": "What should a customer do if they have a non-urgent question?",
    "choices": {
      "A": "Call back after December 22nd",
      "B": "Press 1 to leave a voicemail",
      "C": "Visit the website and use the live chat",
      "D": "Place an order immediately to get the discount"
    },
    "answer": "C",
    "explanation_zh": "錄音提到一般查詢可造訪網站使用即時聊天功能。A選項未建議回電；B選項語音信箱用於緊急請求；D選項折扣需在關閉後下單，且非回答問題的方式。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "inquiries",
      "live chat",
      "website",
      "voicemail",
      "discount"
    ],
    "transcript": "Thank you for calling GreenLeaf Office Supplies. This is a recorded message to inform you that our warehouse will be closed for inventory from December 20th to December 22nd. During this time, we will not process any new orders or shipments. If you have an urgent request, please press 1 to leave a voicemail for our customer service team. They will return your call within 24 hours. For general inquiries, you can also visit our website at www.greenleaf.com and use the live chat feature. We apologize for any inconvenience and appreciate your understanding. Your next order placed after December 22nd will receive a 10% discount as a thank-you for your patience."
  },
  {
    "id": "p4-gen-016",
    "part": "Part 4",
    "question": "What is the main purpose of this message?",
    "choices": {
      "A": "To confirm a new appointment for Friday",
      "B": "To propose an alternative time for a service",
      "C": "To cancel a scheduled oil change",
      "D": "To advertise Peak Auto Service’s special offer"
    },
    "answer": "B",
    "explanation_zh": "錄音中Amanda提到「我們週三早上10點有一個取消的空檔」，並詢問對方是否可行，因此主要目的是提出另一個服務時間。選項B正確；A「確認週五新預約」與原文「保留原週五預約」不符；C「取消預約」與原文「重新安排」不符；D「宣傳特惠」未提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "reschedule",
      "appointment",
      "cancellation",
      "confirm",
      "service"
    ],
    "transcript": "Good morning. This is a message for Mr. Chen from Amanda at Peak Auto Service. We received your request to reschedule your car’s oil change from this Friday to next Tuesday. Unfortunately, our Tuesday appointments are fully booked. However, we do have a cancellation on Wednesday morning at 10 AM. Could you please call us back by 5 PM today to confirm if that works for you? If we don’t hear from you, we will keep your original Friday appointment. Our number is 555-0198. Thank you."
  },
  {
    "id": "p4-gen-017",
    "part": "Part 4",
    "question": "According to the message, what time is the available appointment?",
    "choices": {
      "A": "Friday at 10 AM",
      "B": "Tuesday at 5 PM",
      "C": "Wednesday at 10 AM",
      "D": "Wednesday at 5 PM"
    },
    "answer": "C",
    "explanation_zh": "錄音明確指出「週三早上10點有一個取消的空檔」，因此可用時段為週三上午10點。選項C正確；A「週五上午10點」為原預約時間；B「週二下午5點」為回電截止時間；D「週三下午5點」未提及。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "available",
      "appointment",
      "cancellation",
      "confirm",
      "original"
    ],
    "transcript": "Good morning. This is a message for Mr. Chen from Amanda at Peak Auto Service. We received your request to reschedule your car’s oil change from this Friday to next Tuesday. Unfortunately, our Tuesday appointments are fully booked. However, we do have a cancellation on Wednesday morning at 10 AM. Could you please call us back by 5 PM today to confirm if that works for you? If we don’t hear from you, we will keep your original Friday appointment. Our number is 555-0198. Thank you."
  },
  {
    "id": "p4-gen-018",
    "part": "Part 4",
    "question": "What should Mr. Chen do next if he wants the Wednesday appointment?",
    "choices": {
      "A": "Visit the shop on Friday",
      "B": "Send an email to Amanda",
      "C": "Cancel his original appointment",
      "D": "Call back before 5 PM today"
    },
    "answer": "D",
    "explanation_zh": "錄音中Amanda要求「請在今天下午5點前回電確認」，因此若想預約週三，需在下午5點前回電。選項D正確；A「週五到店」為未回電時的預設安排；B「寄電子郵件」未提及；C「取消原預約」非必要步驟。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "confirm",
      "appointment",
      "cancellation",
      "original",
      "contact"
    ],
    "transcript": "Good morning. This is a message for Mr. Chen from Amanda at Peak Auto Service. We received your request to reschedule your car’s oil change from this Friday to next Tuesday. Unfortunately, our Tuesday appointments are fully booked. However, we do have a cancellation on Wednesday morning at 10 AM. Could you please call us back by 5 PM today to confirm if that works for you? If we don’t hear from you, we will keep your original Friday appointment. Our number is 555-0198. Thank you."
  },
  {
    "id": "p4-gen-019",
    "part": "Part 4",
    "question": "What is the main purpose of this announcement?",
    "choices": {
      "A": "To report a theft in the warehouse",
      "B": "To announce a new inventory system",
      "C": "To inform staff about a delayed delivery",
      "D": "To schedule a safety training session"
    },
    "answer": "C",
    "explanation_zh": "這則公告的主要目的是通知倉庫員工，來自主要經銷商的送貨卡車因機械問題延誤，新的預計到達時間為下午3點。選項C正確描述了此目的。選項A（倉庫盜竊）、B（新庫存系統）和D（安全培訓）均未在公告中提及，因此為不正確的干擾項。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "distributor",
      "mechanical issue",
      "receiving dock",
      "inventory",
      "cartridges"
    ],
    "transcript": "Attention, all warehouse staff. This is an important announcement regarding the incoming shipment of office supplies. The delivery truck from our main distributor, scheduled for this morning, has been delayed due to a mechanical issue. The new estimated arrival time is now 3:00 PM this afternoon. Please ensure that the receiving dock is cleared and ready by 2:30 PM. Also, the inventory manager has requested that all staff prioritize checking the quantity of printer toner cartridges upon arrival, as we are running low on stock. Any discrepancies should be reported immediately to the shift supervisor. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-020",
    "part": "Part 4",
    "question": "What item does the inventory manager want staff to check especially?",
    "choices": {
      "A": "Office chairs",
      "B": "Paper reams",
      "C": "Shipping labels",
      "D": "Printer toner cartridges"
    },
    "answer": "D",
    "explanation_zh": "公告中明確指出，庫存經理要求所有員工在到貨時優先檢查印表機碳粉匣的數量，因為庫存不足。選項D正確。選項A（辦公椅）、B（紙張）和C（運送標籤）均未在公告中提及，因此為不正確的干擾項。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "distributor",
      "mechanical issue",
      "receiving dock",
      "inventory",
      "cartridges"
    ],
    "transcript": "Attention, all warehouse staff. This is an important announcement regarding the incoming shipment of office supplies. The delivery truck from our main distributor, scheduled for this morning, has been delayed due to a mechanical issue. The new estimated arrival time is now 3:00 PM this afternoon. Please ensure that the receiving dock is cleared and ready by 2:30 PM. Also, the inventory manager has requested that all staff prioritize checking the quantity of printer toner cartridges upon arrival, as we are running low on stock. Any discrepancies should be reported immediately to the shift supervisor. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-021",
    "part": "Part 4",
    "question": "What should staff do if they find a problem with the shipment?",
    "choices": {
      "A": "Report it to the shift supervisor",
      "B": "Contact the main distributor",
      "C": "Put the items back on the truck",
      "D": "Wait for the inventory manager"
    },
    "answer": "A",
    "explanation_zh": "公告中提到，如果發現數量不符，應立即向輪班主管報告。選項A正確。選項B（聯繫主要經銷商）、C（將物品放回卡車）和D（等待庫存經理）均未在公告中提及，且不符合指示，因此為不正確的干擾項。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "distributor",
      "mechanical issue",
      "receiving dock",
      "inventory",
      "cartridges"
    ],
    "transcript": "Attention, all warehouse staff. This is an important announcement regarding the incoming shipment of office supplies. The delivery truck from our main distributor, scheduled for this morning, has been delayed due to a mechanical issue. The new estimated arrival time is now 3:00 PM this afternoon. Please ensure that the receiving dock is cleared and ready by 2:30 PM. Also, the inventory manager has requested that all staff prioritize checking the quantity of printer toner cartridges upon arrival, as we are running low on stock. Any discrepancies should be reported immediately to the shift supervisor. Thank you for your cooperation."
  },
  {
    "id": "p4-gen-022",
    "part": "Part 4",
    "question": "What is the main purpose of this announcement?",
    "choices": {
      "A": "To announce a new coffee machine installation",
      "B": "To inform staff about a temporary office move",
      "C": "To apologize for a broken refrigerator",
      "D": "To notify employees about a break room closure"
    },
    "answer": "D",
    "explanation_zh": "這則公告的主要目的是通知員工四樓休息室將關閉進行翻新。原文明確指出「the fourth-floor break room will be closed for renovation」，而選項A（安裝新咖啡機）只是細節之一，非主要目的；選項B（臨時辦公室搬遷）錯誤，僅是休息區移至三樓會議室；選項C（冰箱故障道歉）與內容不符。因此正確答案為D。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "renovation",
      "temporary",
      "facilities",
      "extension",
      "vending machine"
    ],
    "transcript": "Attention all staff. This is a reminder that the fourth-floor break room will be closed for renovation starting next Monday, March 15th. The renovation is expected to last two weeks. During this time, a temporary break area will be set up in conference room C on the third floor. Please note that the coffee machine and refrigerator will be moved there. However, the microwave will not be available, so please plan accordingly. Additionally, the vending machines on the first floor will remain fully stocked and operational. We apologize for any inconvenience and appreciate your cooperation. For questions, please contact Facilities Management at extension 450."
  },
  {
    "id": "p4-gen-023",
    "part": "Part 4",
    "question": "Which item will NOT be available in the temporary break area?",
    "choices": {
      "A": "The microwave",
      "B": "The coffee machine",
      "C": "The refrigerator",
      "D": "The vending machines"
    },
    "answer": "A",
    "explanation_zh": "題目問哪項物品在臨時休息區不會提供。原文明確指出「the microwave will not be available」，而咖啡機（B）和冰箱（C）都會被移至三樓會議室，自動販賣機（D）則在一樓維持運作。因此正確答案為A。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "renovation",
      "temporary",
      "facilities",
      "extension",
      "vending machine"
    ],
    "transcript": "Attention all staff. This is a reminder that the fourth-floor break room will be closed for renovation starting next Monday, March 15th. The renovation is expected to last two weeks. During this time, a temporary break area will be set up in conference room C on the third floor. Please note that the coffee machine and refrigerator will be moved there. However, the microwave will not be available, so please plan accordingly. Additionally, the vending machines on the first floor will remain fully stocked and operational. We apologize for any inconvenience and appreciate your cooperation. For questions, please contact Facilities Management at extension 450."
  },
  {
    "id": "p4-gen-024",
    "part": "Part 4",
    "question": "What should staff do if they have questions about the renovation?",
    "choices": {
      "A": "Speak to their supervisor",
      "B": "Call Facilities Management at extension 450",
      "C": "Visit the fourth-floor break room",
      "D": "Send an email to the HR department"
    },
    "answer": "B",
    "explanation_zh": "題目問若員工對翻新有疑問應如何處理。原文最後一句明確指出「For questions, please contact Facilities Management at extension 450」，因此正確答案為B。選項A（找主管）、C（去四樓休息室）及D（寄信給人事部）均未在原文提及，屬於無根據的干擾選項。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "renovation",
      "temporary",
      "facilities",
      "extension",
      "vending machine"
    ],
    "transcript": "Attention all staff. This is a reminder that the fourth-floor break room will be closed for renovation starting next Monday, March 15th. The renovation is expected to last two weeks. During this time, a temporary break area will be set up in conference room C on the third floor. Please note that the coffee machine and refrigerator will be moved there. However, the microwave will not be available, so please plan accordingly. Additionally, the vending machines on the first floor will remain fully stocked and operational. We apologize for any inconvenience and appreciate your cooperation. For questions, please contact Facilities Management at extension 450."
  },
  {
    "id": "p4-gen-025",
    "part": "Part 4",
    "question": "What is the main purpose of this announcement?",
    "choices": {
      "A": "To welcome attendees and provide conference information",
      "B": "To cancel the keynote address",
      "C": "To announce a change in the lunch menu",
      "D": "To introduce a new product line"
    },
    "answer": "A",
    "explanation_zh": "公告開頭明確說『歡迎參加年度太平洋銷售會議』，並說明接下來兩天的活動安排、場地變更、午餐時間等，整體目的是歡迎與會者並提供資訊。選項B（取消主題演講）錯誤，因為演講只是更換場地而非取消。選項C（更改午餐菜單）未提及。選項D（推出新產品線）與內容無關。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "conference",
      "keynote",
      "registration",
      "session",
      "packet"
    ],
    "transcript": "Good morning, everyone, and welcome to the annual Pacific Sales Conference. I'm your host, Sarah Chen. Over the next two days, you'll attend workshops on digital marketing, client retention, and data analytics. Please note that today's keynote address by Dr. Mark Rivera has been moved from the Grand Ballroom to the Pacific Room on the second floor due to unexpected renovations. Lunch will be served in the Garden Café at 12:30 PM. After lunch, breakout sessions begin promptly at 2:00 PM. Don't forget to pick up your conference packets at the registration desk before the first session. We look forward to a productive event."
  },
  {
    "id": "p4-gen-026",
    "part": "Part 4",
    "question": "Where will the keynote address take place?",
    "choices": {
      "A": "Grand Ballroom",
      "B": "Pacific Room on the second floor",
      "C": "Garden Café",
      "D": "Registration desk"
    },
    "answer": "B",
    "explanation_zh": "公告明確指出『keynote address... has been moved from the Grand Ballroom to the Pacific Room on the second floor』，因此正確地點是Pacific Room。選項A是原來的地點，已被更改。選項C是午餐地點。選項D是領取會議資料包的地方。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "keynote",
      "renovation",
      "ballroom",
      "second floor"
    ],
    "transcript": "Good morning, everyone, and welcome to the annual Pacific Sales Conference. I'm your host, Sarah Chen. Over the next two days, you'll attend workshops on digital marketing, client retention, and data analytics. Please note that today's keynote address by Dr. Mark Rivera has been moved from the Grand Ballroom to the Pacific Room on the second floor due to unexpected renovations. Lunch will be served in the Garden Café at 12:30 PM. After lunch, breakout sessions begin promptly at 2:00 PM. Don't forget to pick up your conference packets at the registration desk before the first session. We look forward to a productive event."
  },
  {
    "id": "p4-gen-027",
    "part": "Part 4",
    "question": "What should attendees do before the first session?",
    "choices": {
      "A": "Attend a workshop on data analytics",
      "B": "Go to the Garden Café for lunch",
      "C": "Pick up their conference packets at the registration desk",
      "D": "Meet Dr. Mark Rivera in the Grand Ballroom"
    },
    "answer": "C",
    "explanation_zh": "公告最後一句提醒：『Don't forget to pick up your conference packets at the registration desk before the first session.』因此正確行動是到報到處領取資料包。選項A（參加資料分析工作坊）是之後的活動。選項B（去花園咖啡廳吃午餐）是12:30的事。選項D（在大宴會廳見馬克里維拉博士）因場地變更而不正確。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "conference packet",
      "registration desk",
      "session",
      "attendee"
    ],
    "transcript": "Good morning, everyone, and welcome to the annual Pacific Sales Conference. I'm your host, Sarah Chen. Over the next two days, you'll attend workshops on digital marketing, client retention, and data analytics. Please note that today's keynote address by Dr. Mark Rivera has been moved from the Grand Ballroom to the Pacific Room on the second floor due to unexpected renovations. Lunch will be served in the Garden Café at 12:30 PM. After lunch, breakout sessions begin promptly at 2:00 PM. Don't forget to pick up your conference packets at the registration desk before the first session. We look forward to a productive event."
  },
  {
    "id": "p4-gen-028",
    "part": "Part 4",
    "question": "What is the main purpose of this message?",
    "choices": {
      "A": "To announce a price increase",
      "B": "To request confirmation for a service upgrade",
      "C": "To explain how to use cloud backup",
      "D": "To cancel a software license"
    },
    "answer": "B",
    "explanation_zh": "錄音中莎拉表示收到升級軟體授權的申請，並說『Could you please reply to this message with your approval?』，因此主要目的是請求客戶確認升級。選項A『宣佈漲價』、C『說明雲端備份用法』、D『取消軟體授權』皆非主旨。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "upgrade",
      "license",
      "premium",
      "confirmation",
      "approval"
    ],
    "transcript": "Good afternoon, this is Sarah from CityTech Support. I received your online request to upgrade your company’s software license to the premium plan. Before I process it, I need to confirm a few details. First, your current license expires on June 30th, so the upgrade would take effect on July 1st. Also, the premium plan includes 24/7 phone support and cloud backup. However, there is an additional fee of $500 per month. Could you please reply to this message with your approval? Once I have it, I’ll update your account within 24 hours. Thank you."
  },
  {
    "id": "p4-gen-029",
    "part": "Part 4",
    "question": "When will the new plan start if the customer approves?",
    "choices": {
      "A": "Immediately",
      "B": "On June 30th",
      "C": "On July 1st",
      "D": "Within 24 hours"
    },
    "answer": "C",
    "explanation_zh": "錄音明確指出『the upgrade would take effect on July 1st』，故新方案於7月1日生效。選項A『立即』、B『6月30日』、D『24小時內』均與原文不符。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "expires",
      "upgrade",
      "effective",
      "approval",
      "account"
    ],
    "transcript": "Good afternoon, this is Sarah from CityTech Support. I received your online request to upgrade your company’s software license to the premium plan. Before I process it, I need to confirm a few details. First, your current license expires on June 30th, so the upgrade would take effect on July 1st. Also, the premium plan includes 24/7 phone support and cloud backup. However, there is an additional fee of $500 per month. Could you please reply to this message with your approval? Once I have it, I’ll update your account within 24 hours. Thank you."
  },
  {
    "id": "p4-gen-030",
    "part": "Part 4",
    "question": "What should the customer do next?",
    "choices": {
      "A": "Call 24/7 support to negotiate the fee",
      "B": "Wait for the license to expire automatically",
      "C": "Cancel the online request",
      "D": "Send a reply agreeing to the upgrade"
    },
    "answer": "D",
    "explanation_zh": "錄音最後要求客戶『reply to this message with your approval』，因此客戶應回覆同意升級。選項A『致電協商費用』、B『等待授權自動到期』、C『取消線上申請』皆非正確下一步。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "approval",
      "process",
      "upgrade",
      "reply",
      "account"
    ],
    "transcript": "Good afternoon, this is Sarah from CityTech Support. I received your online request to upgrade your company’s software license to the premium plan. Before I process it, I need to confirm a few details. First, your current license expires on June 30th, so the upgrade would take effect on July 1st. Also, the premium plan includes 24/7 phone support and cloud backup. However, there is an additional fee of $500 per month. Could you please reply to this message with your approval? Once I have it, I’ll update your account within 24 hours. Thank you."
  },
  {
    "id": "p5-gen-004",
    "part": "Part 5",
    "question": "The new employee orientation materials _______ to all new hires by the end of this week.",
    "choices": {
      "A": "are distributing",
      "B": "will be distributed",
      "C": "have distributed",
      "D": "will distribute"
    },
    "answer": "B",
    "explanation_zh": "答案為B。本題主詞「materials」是「被分發」的對象，需用被動語態；時間副詞「by the end of this week」表示未來，故選未來被動式「will be distributed」。D為主動未來式，C為主動現在完成式，A為主動現在進行式，皆不符合被動需求。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "employee orientation",
      "materials",
      "new hires",
      "distribute"
    ]
  },
  {
    "id": "p5-gen-005",
    "part": "Part 5",
    "question": "All purchase requests _______ by the finance department before approval.",
    "choices": {
      "A": "will review",
      "B": "are being reviewed",
      "C": "are reviewing",
      "D": "have reviewed"
    },
    "answer": "B",
    "explanation_zh": "答案為B。主詞「requests」是「被審查」的對象，需用被動語態；「before approval」暗示審查正在進行中，故選現在進行被動式「are being reviewed」。C為主動現在進行式，D為主動現在完成式，A為主動未來式，皆不符合。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "purchase requests",
      "finance department",
      "approval",
      "review"
    ]
  },
  {
    "id": "p5-gen-006",
    "part": "Part 5",
    "question": "The quarterly report _______ to all department heads earlier this morning.",
    "choices": {
      "A": "has been sent",
      "B": "has sent",
      "C": "is sending",
      "D": "will send"
    },
    "answer": "A",
    "explanation_zh": "答案為A。主詞「report」是「被寄送」的對象，需用被動語態；時間副詞「earlier this morning」表示過去，故選現在完成被動式「has been sent」。C為主動現在進行式，B為主動現在完成式，D為主動未來式，皆不符合。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "quarterly report",
      "department heads",
      "sent",
      "earlier this morning"
    ]
  },
  {
    "id": "p5-gen-007",
    "part": "Part 5",
    "question": "The office renovation project _______ by the end of next month.",
    "choices": {
      "A": "will be completed",
      "B": "is completing",
      "C": "completes",
      "D": "has completed"
    },
    "answer": "A",
    "explanation_zh": "答案為A。主詞「project」是「被完成」的對象，需用被動語態；時間副詞「by the end of next month」表示未來，故選未來被動式「will be completed」。C為主動現在式，B為主動現在進行式，D為主動現在完成式，皆不符合。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "office renovation",
      "project",
      "completed",
      "by the end of next month"
    ]
  },
  {
    "id": "p5-gen-008",
    "part": "Part 5",
    "question": "The updated security policy _______ to all employees during the next staff meeting.",
    "choices": {
      "A": "will be introduced",
      "B": "will introduce",
      "C": "has introduced",
      "D": "introduces"
    },
    "answer": "A",
    "explanation_zh": "答案為A。主詞「policy」是「被介紹」的對象，需用被動語態；時間副詞「during the next staff meeting」表示未來，故選未來被動式「will be introduced」。B為主動未來式，D為主動現在式，C為主動現在完成式，皆不符合。",
    "skill_tag": "passive_voice",
    "difficulty": "B1",
    "vocabulary": [
      "security policy",
      "employees",
      "staff meeting",
      "introduce"
    ]
  },
  {
    "id": "p5-gen-009",
    "part": "Part 5",
    "question": "The quarterly report indicated a _______ increase in sales compared to the previous year.",
    "choices": {
      "A": "substantial",
      "B": "substance",
      "C": "substantially",
      "D": "substantiate"
    },
    "answer": "A",
    "explanation_zh": "答案為 A。空格前有冠詞 a，後有名詞 increase，因此需填入形容詞 substantial（顯著的）來修飾名詞。B 為名詞，C 為副詞，D 為動詞，皆不符合語法。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "quarterly report",
      "increase",
      "substantial",
      "sales",
      "previous year"
    ]
  },
  {
    "id": "p5-gen-010",
    "part": "Part 5",
    "question": "The marketing team's _______ analysis of market trends was highly praised during the meeting.",
    "choices": {
      "A": "competition",
      "B": "competitive",
      "C": "competitively",
      "D": "compete"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。空格後有名詞 analysis，需用形容詞 competitive（競爭性的）來修飾。A 為名詞，C 為副詞，D 為動詞，均不正確。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "marketing team",
      "analysis",
      "competitive",
      "market trends",
      "praised"
    ]
  },
  {
    "id": "p5-gen-011",
    "part": "Part 5",
    "question": "The company's _______ performance in the last quarter led to a revision of annual targets.",
    "choices": {
      "A": "produce",
      "B": "productively",
      "C": "productive",
      "D": "product"
    },
    "answer": "C",
    "explanation_zh": "答案為 C。空格後有名詞 performance，需用形容詞 productive（富有成效的）來修飾。D 為名詞，A 為動詞，B 為副詞，皆不合適。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "performance",
      "quarter",
      "productive",
      "annual targets",
      "revision"
    ]
  },
  {
    "id": "p5-gen-012",
    "part": "Part 5",
    "question": "The review noted that the team's _______ approach to problem-solving resulted in efficient outcomes.",
    "choices": {
      "A": "innovate",
      "B": "innovative",
      "C": "innovatively",
      "D": "innovation"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。空格後有名詞 approach，需用形容詞 innovative（創新的）來修飾。D 為名詞，C 為副詞，A 為動詞，均錯誤。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "review",
      "approach",
      "innovative",
      "problem-solving",
      "efficient outcomes"
    ]
  },
  {
    "id": "p5-gen-013",
    "part": "Part 5",
    "question": "The financial report showed a _______ improvement in cost management over the fiscal year.",
    "choices": {
      "A": "remarkably",
      "B": "remark",
      "C": "remarked",
      "D": "remarkable"
    },
    "answer": "D",
    "explanation_zh": "答案為 D。空格前有 a，後有名詞 improvement，需用形容詞 remarkable（顯著的）來修飾。B 為動詞或名詞，A 為副詞，C 為動詞過去式，皆不符合語法。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "financial report",
      "improvement",
      "remarkable",
      "cost management",
      "fiscal year"
    ]
  },
  {
    "id": "p5-gen-014",
    "part": "Part 5",
    "question": "The project team _______ the initial phase of the software upgrade already this month.",
    "choices": {
      "A": "completed",
      "B": "completes",
      "C": "has completed",
      "D": "has been completing"
    },
    "answer": "C",
    "explanation_zh": "答案為C。already this month 表示本月截至目前已完成的成果，應用現在完成式 has completed。D 的完成進行式不適合強調已完成的階段；A 的過去式未連結到目前期間；B 的現在式不表示完成結果。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "project team",
      "initial phase",
      "software upgrade",
      "completed"
    ]
  },
  {
    "id": "p5-gen-015",
    "part": "Part 5",
    "question": "We _______ the quarterly report yet, so please send it by Friday.",
    "choices": {
      "A": "hadn't received",
      "B": "don't receive",
      "C": "haven't received",
      "D": "didn't receive"
    },
    "answer": "C",
    "explanation_zh": "答案為C。yet常用於否定句的現在完成式，haven't received表示到目前為止尚未收到。A的hadn't received是過去完成式，需有過去時間點；D的didn't receive是過去式，未強調與現在的關聯；B的don't receive是現在式，不搭配yet。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "quarterly report",
      "received",
      "by Friday"
    ]
  },
  {
    "id": "p5-gen-016",
    "part": "Part 5",
    "question": "The marketing team _______ three new campaigns already this quarter.",
    "choices": {
      "A": "had launched",
      "B": "launched",
      "C": "was launching",
      "D": "has launched"
    },
    "answer": "D",
    "explanation_zh": "答案為D。already this quarter表示本季度至今，應用現在完成式has launched，強調已推出三個活動。B的launched是過去式，未連接至今；C的was launching是過去進行式，不搭配already；A的had launched是過去完成式，需有過去時間點。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "marketing team",
      "campaigns",
      "quarter",
      "launched"
    ]
  },
  {
    "id": "p5-gen-017",
    "part": "Part 5",
    "question": "Since the new manager took over, productivity _______ significantly.",
    "choices": {
      "A": "has increased",
      "B": "was increasing",
      "C": "increases",
      "D": "increased"
    },
    "answer": "A",
    "explanation_zh": "答案為A。Since the new manager took over表示從過去到現在，應用現在完成式has increased，強調生產力已顯著提升。D的increased是過去式，未強調持續影響；C的increases是現在式，與since不符；B的was increasing是過去進行式，不適合since。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "productivity",
      "increased",
      "manager",
      "took over"
    ]
  },
  {
    "id": "p5-gen-018",
    "part": "Part 5",
    "question": "I _______ the client about the delay, and they are fine with it.",
    "choices": {
      "A": "inform",
      "B": "was informing",
      "C": "have informed",
      "D": "informed"
    },
    "answer": "C",
    "explanation_zh": "答案為C。現在完成式have informed強調告知的結果與現在相關，且對方已接受。A的inform是現在式，與過去動作不符；D的informed是過去式，未強調與現在的關聯；B的was informing是過去進行式，不適合表達已完成的通知。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "client",
      "delay",
      "informed"
    ]
  },
  {
    "id": "p5-gen-019",
    "part": "Part 5",
    "question": "The shipment is scheduled to arrive _______ the warehouse receiving desk on Monday morning.",
    "choices": {
      "A": "at",
      "B": "in",
      "C": "by",
      "D": "on"
    },
    "answer": "A",
    "explanation_zh": "答案為 A。arrive at the warehouse receiving desk 表示到達明確的收貨地點，固定搭配需用 at。A in 不搭配此具體櫃臺地點，B by 表示在期限前，C on 表示日期或表面，均不合句意。",
    "skill_tag": "preposition",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "scheduled",
      "arrive",
      "warehouse"
    ]
  },
  {
    "id": "p5-gen-020",
    "part": "Part 5",
    "question": "Please submit the completed report _______ Friday so we can review it before the weekend.",
    "choices": {
      "A": "in",
      "B": "by",
      "C": "at",
      "D": "on"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。by Friday 表示「在星期五之前」，符合提交報告以便週末前審閱的語境。B on 指特定日期，C at 指時間點，D in 指一段時間內，均不正確。",
    "skill_tag": "preposition",
    "difficulty": "A2",
    "vocabulary": [
      "submit",
      "completed",
      "report",
      "review",
      "weekend"
    ]
  },
  {
    "id": "p5-gen-021",
    "part": "Part 5",
    "question": "The team meeting will be held _______ the conference room on the third floor.",
    "choices": {
      "A": "on",
      "B": "in",
      "C": "at",
      "D": "by"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。in the conference room 表示「在會議室內」，強調空間內部。A at 用於較小地點或點位，C on 用於表面，D by 表示「在…旁邊」，皆不適合。",
    "skill_tag": "preposition",
    "difficulty": "A2",
    "vocabulary": [
      "meeting",
      "held",
      "conference room",
      "floor"
    ]
  },
  {
    "id": "p5-gen-022",
    "part": "Part 5",
    "question": "The marketing campaign will begin _______ June 1st and run for two months.",
    "choices": {
      "A": "in",
      "B": "at",
      "C": "by",
      "D": "on"
    },
    "answer": "D",
    "explanation_zh": "答案為 D。on June 1st 是特定日期，需用介係詞 on。A in 用於月份或年份，B at 用於時間點，D by 表示「在…之前」，均不正確。",
    "skill_tag": "preposition",
    "difficulty": "A2",
    "vocabulary": [
      "marketing campaign",
      "begin",
      "run",
      "months"
    ]
  },
  {
    "id": "p5-gen-023",
    "part": "Part 5",
    "question": "Please keep the documents in the filing cabinet _______ the end of the month.",
    "choices": {
      "A": "in",
      "B": "until",
      "C": "by",
      "D": "during"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。until the end of the month 表示「直到月底」，強調持續到某時間點。A by 表示「在…之前」，B during 表示「在…期間」，C in 表示「在…之內」，皆不符合語境。",
    "skill_tag": "preposition",
    "difficulty": "A2",
    "vocabulary": [
      "documents",
      "filing cabinet",
      "end",
      "month"
    ]
  },
  {
    "id": "p5-gen-024",
    "part": "Part 5",
    "question": "_______ the budget cuts, the marketing department managed to launch the new campaign successfully.",
    "choices": {
      "A": "Because",
      "B": "Despite",
      "C": "Although",
      "D": "Unless"
    },
    "answer": "B",
    "explanation_zh": "答案為B。Despite 是介係詞，後接名詞片語 the budget cuts，表示「儘管預算削減」，符合句意。Although 是連接詞，需接子句；Because 表原因；Unless 表條件，均不符。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "budget cuts",
      "marketing department",
      "launch",
      "campaign",
      "successfully"
    ]
  },
  {
    "id": "p5-gen-025",
    "part": "Part 5",
    "question": "The project was delayed _______ the unexpected technical issues with the software.",
    "choices": {
      "A": "however",
      "B": "although",
      "C": "because",
      "D": "due to"
    },
    "answer": "D",
    "explanation_zh": "答案為D。due to 是介係詞，後接名詞片語 the unexpected technical issues，表示「由於意外的技術問題」，符合因果關係。because 是連接詞，需接子句；although 表轉折；however 是副詞，均不符。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "project",
      "delayed",
      "unexpected",
      "technical issues",
      "software"
    ]
  },
  {
    "id": "p5-gen-026",
    "part": "Part 5",
    "question": "We will proceed with the merger _______ the shareholders approve the proposal at the meeting.",
    "choices": {
      "A": "provided that",
      "B": "unless",
      "C": "although",
      "D": "despite"
    },
    "answer": "A",
    "explanation_zh": "答案為A。provided that 是連接詞，引導條件子句，表示「只要股東批准提案」，符合句意。unless 表「除非」；although 表轉折；despite 是介係詞，需接名詞，均不符。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "proceed",
      "merger",
      "shareholders",
      "approve",
      "proposal"
    ]
  },
  {
    "id": "p5-gen-027",
    "part": "Part 5",
    "question": "Sales figures dropped significantly last quarter; _______, the company decided to revise its marketing strategy.",
    "choices": {
      "A": "therefore",
      "B": "although",
      "C": "however",
      "D": "unless"
    },
    "answer": "A",
    "explanation_zh": "答案為A。therefore 是副詞，表示「因此」，承接前句銷售下降的結果，引出修訂策略的決定。however 表轉折；unless 表條件；although 表讓步，均不符。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "sales figures",
      "dropped",
      "significantly",
      "revise",
      "marketing strategy"
    ]
  },
  {
    "id": "p5-gen-028",
    "part": "Part 5",
    "question": "_______ the candidate had excellent qualifications, the hiring manager decided to interview other applicants.",
    "choices": {
      "A": "Although",
      "B": "Due to",
      "C": "Because",
      "D": "Despite"
    },
    "answer": "A",
    "explanation_zh": "答案為A。Although 是連接詞，引導讓步子句，表示「雖然候選人有優秀資格」，與主句的轉折相符。Despite 是介係詞，需接名詞；Because 表原因；Due to 表原因，均不符。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "candidate",
      "qualifications",
      "hiring manager",
      "interview",
      "applicants"
    ]
  },
  {
    "id": "p5-gen-029",
    "part": "Part 5",
    "question": "The marketing team completed the project by _______, without any external assistance.",
    "choices": {
      "A": "their",
      "B": "them",
      "C": "they",
      "D": "themselves"
    },
    "answer": "D",
    "explanation_zh": "答案：D。by themselves 是固定搭配，表示「靠他們自己」，反身代名詞符合「無外部協助」的語意；B 受格、A 所有格、C 主格皆不適用於介系詞後的強調用法。",
    "skill_tag": "pronoun",
    "difficulty": "B1",
    "vocabulary": [
      "marketing team",
      "project",
      "external",
      "assistance",
      "completed"
    ]
  },
  {
    "id": "p5-gen-030",
    "part": "Part 5",
    "question": "The client requested that the report be sent to _______ by Friday.",
    "choices": {
      "A": "whose",
      "B": "whoever",
      "C": "who",
      "D": "whom"
    },
    "answer": "D",
    "explanation_zh": "答案：D。介系詞 to 後需用受格 whom，指「那位客戶」；C 主格、A 所有格、B 泛指「任何人」皆不符合特定對象的語境。",
    "skill_tag": "pronoun",
    "difficulty": "B1",
    "vocabulary": [
      "client",
      "requested",
      "report",
      "Friday",
      "sent"
    ]
  },
  {
    "id": "p5-gen-031",
    "part": "Part 5",
    "question": "The manager praised the intern for _______ dedication to the project.",
    "choices": {
      "A": "he",
      "B": "him",
      "C": "his",
      "D": "himself"
    },
    "answer": "C",
    "explanation_zh": "答案：C。介系詞 for 後需接所有格 his 修飾 dedication，表示「他的奉獻」；D 反身代名詞、B 受格、A 主格均無法修飾名詞。",
    "skill_tag": "pronoun",
    "difficulty": "B1",
    "vocabulary": [
      "manager",
      "praised",
      "intern",
      "dedication",
      "project"
    ]
  },
  {
    "id": "p5-gen-032",
    "part": "Part 5",
    "question": "The team members agreed that the success was due to _______ collective effort.",
    "choices": {
      "A": "their",
      "B": "them",
      "C": "they",
      "D": "theirs"
    },
    "answer": "A",
    "explanation_zh": "答案：A。所有格 their 修飾 collective effort，表示「他們的共同努力」；B 受格、C 主格、D 獨立所有格皆不能直接置於名詞前。",
    "skill_tag": "pronoun",
    "difficulty": "B1",
    "vocabulary": [
      "team members",
      "agreed",
      "success",
      "collective",
      "effort"
    ]
  },
  {
    "id": "p5-gen-033",
    "part": "Part 5",
    "question": "The new software allows users to customize _______ interface easily.",
    "choices": {
      "A": "it's",
      "B": "itself",
      "C": "its",
      "D": "it"
    },
    "answer": "C",
    "explanation_zh": "答案：C。所有格 its 修飾 interface，表示「它的介面」；D 主/受格、B 反身代名詞、A 縮寫 it is 皆不符合所有格修飾名詞的語法。",
    "skill_tag": "pronoun",
    "difficulty": "B1",
    "vocabulary": [
      "software",
      "users",
      "customize",
      "interface",
      "easily"
    ]
  },
  {
    "id": "p5-gen-034",
    "part": "Part 5",
    "question": "Ms. Tanaka, _______ has been with the company for over a decade, will lead the new project.",
    "choices": {
      "A": "which",
      "B": "whom",
      "C": "who",
      "D": "that"
    },
    "answer": "C",
    "explanation_zh": "答案為C。關係代名詞who引導非限定形容詞子句，修飾人Ms. Tanaka，在子句中作主詞。A that不可用於非限定子句；B which用於事物；D whom為受格，不符主詞位置。",
    "skill_tag": "relative_clause",
    "difficulty": "B1",
    "vocabulary": [
      "company",
      "project",
      "lead",
      "decade",
      "Ms."
    ]
  },
  {
    "id": "p5-gen-035",
    "part": "Part 5",
    "question": "The report _______ was submitted yesterday contains the quarterly financial data.",
    "choices": {
      "A": "that",
      "B": "who",
      "C": "whose",
      "D": "whom"
    },
    "answer": "A",
    "explanation_zh": "答案為A。關係代名詞that引導限定形容詞子句，修飾事物the report，在子句中作主詞。A who用於人；B whom為受格；C whose表所有格，不符語意。",
    "skill_tag": "relative_clause",
    "difficulty": "B1",
    "vocabulary": [
      "report",
      "submitted",
      "quarterly",
      "financial",
      "data"
    ]
  },
  {
    "id": "p5-gen-036",
    "part": "Part 5",
    "question": "The manager, _______ expertise is widely recognized, will speak at the conference.",
    "choices": {
      "A": "whom",
      "B": "whose",
      "C": "which",
      "D": "who"
    },
    "answer": "B",
    "explanation_zh": "答案為B。關係代名詞whose表所有格，修飾人the manager，意為「其專業知識」。B whom為受格；C which用於事物；D who為主格，不符所有格需求。",
    "skill_tag": "relative_clause",
    "difficulty": "B1",
    "vocabulary": [
      "manager",
      "expertise",
      "recognized",
      "conference",
      "speak"
    ]
  },
  {
    "id": "p5-gen-037",
    "part": "Part 5",
    "question": "All employees _______ work in the sales department must attend the training session.",
    "choices": {
      "A": "which",
      "B": "whom",
      "C": "whose",
      "D": "who"
    },
    "answer": "D",
    "explanation_zh": "答案為D。關係代名詞who引導限定形容詞子句，修飾人employees，在子句中作主詞。A whom為受格；C which用於事物；D whose表所有格，不符主詞位置。",
    "skill_tag": "relative_clause",
    "difficulty": "B1",
    "vocabulary": [
      "employees",
      "sales",
      "department",
      "attend",
      "training"
    ]
  },
  {
    "id": "p5-gen-038",
    "part": "Part 5",
    "question": "The software update, _______ was released last week, has improved system performance.",
    "choices": {
      "A": "which",
      "B": "who",
      "C": "that",
      "D": "whom"
    },
    "answer": "A",
    "explanation_zh": "答案為A。關係代名詞which引導非限定形容詞子句，修飾事物the software update，在子句中作主詞。A who用於人；B that不可用於非限定子句；D whom為受格。",
    "skill_tag": "relative_clause",
    "difficulty": "B1",
    "vocabulary": [
      "software",
      "update",
      "released",
      "improved",
      "performance"
    ]
  },
  {
    "id": "p5-gen-039",
    "part": "Part 5",
    "question": "Before the merger can proceed, both companies must _______ with all regulatory requirements.",
    "choices": {
      "A": "comprise",
      "B": "compose",
      "C": "compile",
      "D": "comply"
    },
    "answer": "D",
    "explanation_zh": "答案為 D。comply with 是固定搭配，表示「遵守」，符合句意「遵守所有法規要求」。A compile 意為「編纂」，B compose 意為「組成」，C comprise 意為「包含」，均不與 with 搭配。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "merger",
      "comply",
      "regulatory",
      "requirements"
    ]
  },
  {
    "id": "p5-gen-040",
    "part": "Part 5",
    "question": "The finance department will _______ the necessary funds for the new project next quarter.",
    "choices": {
      "A": "alternate",
      "B": "allocate",
      "C": "alleged",
      "D": "alleviate"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。allocate 意為「分配、撥出」，與 funds 搭配表示「撥款」。B alleviate 意為「減輕」，C alternate 意為「交替」，D alleged 意為「聲稱的」，皆不符合句意。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "allocate",
      "funds",
      "project",
      "quarter"
    ]
  },
  {
    "id": "p5-gen-041",
    "part": "Part 5",
    "question": "The board of directors voted to _______ the smaller competitor to expand market share.",
    "choices": {
      "A": "require",
      "B": "acquire",
      "C": "inquire",
      "D": "enquire"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。acquire 意為「收購」，符合句意「收購較小的競爭對手以擴大市場佔有率」。A inquire 意為「詢問」，C require 意為「要求」，D enquire 為 inquire 的英式拼法，均不適用。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "acquire",
      "competitor",
      "market share",
      "board"
    ]
  },
  {
    "id": "p5-gen-042",
    "part": "Part 5",
    "question": "All employees must _______ the annual compliance training by the end of this month.",
    "choices": {
      "A": "commit",
      "B": "permit",
      "C": "submit",
      "D": "admit"
    },
    "answer": "C",
    "explanation_zh": "答案為 C。submit 意為「提交」，與 compliance training 搭配表示「提交合規訓練（的完成證明）」。A admit 意為「承認」，B commit 意為「犯（罪）或承諾」，D permit 意為「允許」，皆不符合。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "compliance",
      "training",
      "submit",
      "annual"
    ]
  },
  {
    "id": "p5-gen-043",
    "part": "Part 5",
    "question": "The CEO plans to _______ a strategic partnership with the technology firm next month.",
    "choices": {
      "A": "negotiate",
      "B": "navigate",
      "C": "negate",
      "D": "nominate"
    },
    "answer": "A",
    "explanation_zh": "答案為 A。negotiate 意為「協商」，與 partnership 搭配表示「協商策略夥伴關係」。A nominate 意為「提名」，B negate 意為「否定」，C navigate 意為「導航」，均不適用。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "negotiate",
      "strategic",
      "partnership",
      "CEO"
    ]
  },
  {
    "id": "p5-gen-044",
    "part": "Part 5",
    "question": "By the time the new CEO took over, the company _______ three consecutive quarters of losses.",
    "choices": {
      "A": "was experiencing",
      "B": "had experienced",
      "C": "experienced",
      "D": "has experienced"
    },
    "answer": "B",
    "explanation_zh": "答案為B。本句時間狀語「By the time the new CEO took over」使用過去式，表示「在新CEO上任之前」，公司已經經歷了三個季度的虧損，因此需用過去完成式「had experienced」來表達「過去的過去」。選項D「has experienced」為現在完成式，不符過去時間；C「experienced」為簡單過去式，無法強調先後順序；A「was experiencing」為過去進行式，不適用於已完成的事件。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "CEO",
      "took over",
      "consecutive",
      "quarters",
      "losses"
    ]
  },
  {
    "id": "p5-gen-045",
    "part": "Part 5",
    "question": "Before the merger was announced, the board _______ the decision in a confidential meeting.",
    "choices": {
      "A": "had made",
      "B": "has made",
      "C": "made",
      "D": "was making"
    },
    "answer": "A",
    "explanation_zh": "答案為A。時間狀語「Before the merger was announced」為過去時間，而董事會的決定發生在此時間點之前，因此需用過去完成式「had made」來表示先發生的動作。選項C「made」為簡單過去式，無法凸顯先後順序；B「has made」為現在完成式，與過去時間不符；D「was making」為過去進行式，不強調完成。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "merger",
      "announced",
      "board",
      "confidential",
      "decision"
    ]
  },
  {
    "id": "p5-gen-046",
    "part": "Part 5",
    "question": "The project manager realized that the team _______ the deadline because of unexpected delays.",
    "choices": {
      "A": "was missing",
      "B": "had missed",
      "C": "misses",
      "D": "has missed"
    },
    "answer": "B",
    "explanation_zh": "答案為B。主句「The project manager realized」為過去式，而團隊錯過截止日期發生在「realized」之前，因此需用過去完成式「had missed」來表達先後關係。選項C「misses」為現在式，不符過去時間；D「has missed」為現在完成式，無法與過去主句搭配；A「was missing」為過去進行式，不表示已完成。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "project manager",
      "realized",
      "deadline",
      "unexpected",
      "delays"
    ]
  },
  {
    "id": "p5-gen-047",
    "part": "Part 5",
    "question": "After the company _______ its first overseas office, it quickly expanded into three more countries.",
    "choices": {
      "A": "opens",
      "B": "opened",
      "C": "was opening",
      "D": "had opened"
    },
    "answer": "D",
    "explanation_zh": "答案為D。時間狀語「After the company _______ its first overseas office」中，開設海外辦事處的動作發生在「expanded into three more countries」之前，且後者為過去式，因此需用過去完成式「had opened」來強調先後順序。選項A「opens」為現在式；B「opened」為簡單過去式，無法凸顯先後；C「was opening」為過去進行式，不適用於已完成的動作。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "overseas",
      "office",
      "expanded",
      "countries",
      "quickly"
    ]
  },
  {
    "id": "p5-gen-048",
    "part": "Part 5",
    "question": "By the end of last year, the startup _______ over $10 million in funding from investors.",
    "choices": {
      "A": "had raised",
      "B": "was raising",
      "C": "has raised",
      "D": "raised"
    },
    "answer": "A",
    "explanation_zh": "答案為A。時間狀語「By the end of last year」表示「到去年年底為止」，強調在過去某時間點之前已完成，因此需用過去完成式「had raised」來表達。選項D「raised」為簡單過去式，無法強調「在該時間點之前」；C「has raised」為現在完成式，與過去時間不符；B「was raising」為過去進行式，不表示已完成。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "startup",
      "funding",
      "investors",
      "raised",
      "million"
    ]
  },
  {
    "id": "p5-gen-049",
    "part": "Part 5",
    "question": "The project manager is _______ overseeing the entire development process from start to finish.",
    "choices": {
      "A": "responsible at",
      "B": "responsible with",
      "C": "responsible for",
      "D": "responsible to"
    },
    "answer": "C",
    "explanation_zh": "答案為 C。固定搭配 be responsible for 表示「對……負責」，後面接負責的對象。D 的 responsible to 通常對人負責，B 和 A 的介係詞搭配錯誤。",
    "skill_tag": "preposition",
    "difficulty": "B1",
    "vocabulary": [
      "project manager",
      "overseeing",
      "development process"
    ]
  },
  {
    "id": "p5-gen-050",
    "part": "Part 5",
    "question": "All candidates must be _______ working under tight deadlines and managing multiple tasks simultaneously.",
    "choices": {
      "A": "capable with",
      "B": "capable for",
      "C": "capable to",
      "D": "capable of"
    },
    "answer": "D",
    "explanation_zh": "答案為 D。固定搭配 be capable of 表示「有能力做某事」，後面接動名詞。其他選項的介係詞搭配均不正確。",
    "skill_tag": "preposition",
    "difficulty": "B1",
    "vocabulary": [
      "candidates",
      "tight deadlines",
      "managing multiple tasks"
    ]
  },
  {
    "id": "p5-gen-051",
    "part": "Part 5",
    "question": "We are particularly _______ hearing your feedback on the proposed changes to the employee benefits package.",
    "choices": {
      "A": "interested on",
      "B": "interested for",
      "C": "interested in",
      "D": "interested about"
    },
    "answer": "C",
    "explanation_zh": "答案為 C。固定搭配 be interested in 表示「對……感興趣」。其他選項的介係詞搭配錯誤。",
    "skill_tag": "preposition",
    "difficulty": "B1",
    "vocabulary": [
      "particularly",
      "feedback",
      "employee benefits package"
    ]
  },
  {
    "id": "p5-gen-052",
    "part": "Part 5",
    "question": "The sales team is currently _______ charge of organizing the annual client appreciation event.",
    "choices": {
      "A": "at",
      "B": "on",
      "C": "in",
      "D": "with"
    },
    "answer": "C",
    "explanation_zh": "答案為 C。固定搭配 in charge of 表示「負責、掌管」。其他介係詞無法與 charge of 形成正確搭配。",
    "skill_tag": "preposition",
    "difficulty": "B1",
    "vocabulary": [
      "sales team",
      "organizing",
      "client appreciation event"
    ]
  },
  {
    "id": "p5-gen-053",
    "part": "Part 5",
    "question": "Please refer _______ the attached document for detailed instructions on how to complete the expense report.",
    "choices": {
      "A": "to",
      "B": "at",
      "C": "with",
      "D": "for"
    },
    "answer": "A",
    "explanation_zh": "答案為 A。固定搭配 refer to 表示「參考、查閱」。其他介係詞搭配錯誤。",
    "skill_tag": "preposition",
    "difficulty": "B1",
    "vocabulary": [
      "refer",
      "attached document",
      "expense report"
    ]
  },
  {
    "id": "p7-gen-195",
    "part": "Part 7",
    "question": "What is the main problem Maria Lopez is facing?",
    "choices": {
      "A": "Her payment was not processed.",
      "B": "Her order was lost during shipping.",
      "C": "She was charged for an extra item.",
      "D": "She received the wrong item in her order."
    },
    "answer": "D",
    "explanation_zh": "答案是 D。Maria 在 Email 1 中明確指出她訂購了一雙黑色皮手套（GL-203），但收到的卻是棕色羊毛手套（GL-107），因此她面臨的主要問題是收到錯誤的商品。選項 A（付款未處理）、B（訂單遺失）和 C（被多收費用）在信件中均未提及。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "complaint",
      "resolve",
      "prepaid",
      "compensation"
    ],
    "passage": "Email 1\nFrom: Maria Lopez <maria.lopez@email.com>\nTo: support@quickbuy.com\nSubject: Wrong item received\n\nDear QuickBuy Customer Service,\n\nI recently placed an order (Order #QB-4581) for a pair of black leather gloves (item GL-203). The package arrived yesterday, but it contained a pair of brown wool gloves (item GL-107) instead. I need the black leather gloves for a business trip next Monday. Could you please send the correct item as soon as possible? I would also like to return the wrong item. My order was placed on October 12th, and I expected delivery within 3-5 business days, but it arrived on October 18th. This delay and the wrong item are very inconvenient. Please confirm how you will resolve this.\n\nThank you,\nMaria Lopez\n\nEmail 2\nFrom: Sarah Chen <sarah.chen@quickbuy.com>\nTo: maria.lopez@email.com\nSubject: Re: Wrong item received\n\nDear Ms. Lopez,\n\nThank you for contacting us. I sincerely apologize for the mix-up with your order. I have checked our system and can confirm that due to a warehouse error, item GL-107 was shipped instead of GL-203.\n\nTo resolve this, I have arranged for the correct item (GL-203) to be shipped today via express delivery, so you should receive it by October 20th. A prepaid return label is attached for you to send back the brown wool gloves. Additionally, as compensation, we have refunded the full shipping cost of your order.\n\nWe value your business and hope this solution is satisfactory.\n\nBest regards,\nSarah Chen\nCustomer Service Manager\nQuickBuy",
    "passage_group_id": "p7-exp-001",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-196",
    "part": "Part 7",
    "question": "When did Maria originally expect to receive her order?",
    "choices": {
      "A": "October 12th",
      "B": "Between October 15th and 17th",
      "C": "October 20th",
      "D": "October 18th"
    },
    "answer": "B",
    "explanation_zh": "答案是 B。Maria 在 Email 1 中提到她的訂單於 10 月 12 日下單，並預期在 3-5 個工作天內送達，因此預期送達時間應為 10 月 15 日至 17 日之間。選項 A（10 月 12 日）是下單日期，選項 D（10 月 18 日）是實際送達日期，選項 C（10 月 20 日）是 Sarah 承諾補寄送達的日期。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "delivery",
      "business days",
      "expected",
      "inconvenient"
    ],
    "passage": "Email 1\nFrom: Maria Lopez <maria.lopez@email.com>\nTo: support@quickbuy.com\nSubject: Wrong item received\n\nDear QuickBuy Customer Service,\n\nI recently placed an order (Order #QB-4581) for a pair of black leather gloves (item GL-203). The package arrived yesterday, but it contained a pair of brown wool gloves (item GL-107) instead. I need the black leather gloves for a business trip next Monday. Could you please send the correct item as soon as possible? I would also like to return the wrong item. My order was placed on October 12th, and I expected delivery within 3-5 business days, but it arrived on October 18th. This delay and the wrong item are very inconvenient. Please confirm how you will resolve this.\n\nThank you,\nMaria Lopez\n\nEmail 2\nFrom: Sarah Chen <sarah.chen@quickbuy.com>\nTo: maria.lopez@email.com\nSubject: Re: Wrong item received\n\nDear Ms. Lopez,\n\nThank you for contacting us. I sincerely apologize for the mix-up with your order. I have checked our system and can confirm that due to a warehouse error, item GL-107 was shipped instead of GL-203.\n\nTo resolve this, I have arranged for the correct item (GL-203) to be shipped today via express delivery, so you should receive it by October 20th. A prepaid return label is attached for you to send back the brown wool gloves. Additionally, as compensation, we have refunded the full shipping cost of your order.\n\nWe value your business and hope this solution is satisfactory.\n\nBest regards,\nSarah Chen\nCustomer Service Manager\nQuickBuy",
    "passage_group_id": "p7-exp-001",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-197",
    "part": "Part 7",
    "question": "What compensation is QuickBuy offering to Maria?",
    "choices": {
      "A": "Free express shipping on her next order",
      "B": "A full refund of the item price",
      "C": "A discount on the brown wool gloves",
      "D": "A refund of the shipping cost for her current order"
    },
    "answer": "D",
    "explanation_zh": "答案是 D。Sarah 在 Email 2 中明確表示「as compensation, we have refunded the full shipping cost of your order」，即全額退還運費作為補償。選項 B（全額退還商品價格）、A（下次訂單免運費）和 C（棕色羊毛手套折扣）均未在信件中提及。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "compensation",
      "refunded",
      "shipping cost",
      "satisfactory"
    ],
    "passage": "Email 1\nFrom: Maria Lopez <maria.lopez@email.com>\nTo: support@quickbuy.com\nSubject: Wrong item received\n\nDear QuickBuy Customer Service,\n\nI recently placed an order (Order #QB-4581) for a pair of black leather gloves (item GL-203). The package arrived yesterday, but it contained a pair of brown wool gloves (item GL-107) instead. I need the black leather gloves for a business trip next Monday. Could you please send the correct item as soon as possible? I would also like to return the wrong item. My order was placed on October 12th, and I expected delivery within 3-5 business days, but it arrived on October 18th. This delay and the wrong item are very inconvenient. Please confirm how you will resolve this.\n\nThank you,\nMaria Lopez\n\nEmail 2\nFrom: Sarah Chen <sarah.chen@quickbuy.com>\nTo: maria.lopez@email.com\nSubject: Re: Wrong item received\n\nDear Ms. Lopez,\n\nThank you for contacting us. I sincerely apologize for the mix-up with your order. I have checked our system and can confirm that due to a warehouse error, item GL-107 was shipped instead of GL-203.\n\nTo resolve this, I have arranged for the correct item (GL-203) to be shipped today via express delivery, so you should receive it by October 20th. A prepaid return label is attached for you to send back the brown wool gloves. Additionally, as compensation, we have refunded the full shipping cost of your order.\n\nWe value your business and hope this solution is satisfactory.\n\nBest regards,\nSarah Chen\nCustomer Service Manager\nQuickBuy",
    "passage_group_id": "p7-exp-001",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-198",
    "part": "Part 7",
    "question": "What can be inferred about the brown wool gloves that Maria received?",
    "choices": {
      "A": "They were a free gift from QuickBuy.",
      "B": "They were sent by mistake and must be returned.",
      "C": "They are more expensive than the black leather gloves.",
      "D": "They will be delivered to Maria's business trip destination."
    },
    "answer": "B",
    "explanation_zh": "答案是 B。Sarah 在 Email 2 中說明因倉庫錯誤而寄出 GL-107，並附上預付退貨標籤讓 Maria 寄回棕色羊毛手套，因此可推斷該商品是誤寄且必須退回。選項 A（免費贈品）、C（價格較高）和 D（送至出差地點）均無根據。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "mistake",
      "prepaid",
      "return label"
    ],
    "passage": "Email 1\nFrom: Maria Lopez <maria.lopez@email.com>\nTo: support@quickbuy.com\nSubject: Wrong item received\n\nDear QuickBuy Customer Service,\n\nI recently placed an order (Order #QB-4581) for a pair of black leather gloves (item GL-203). The package arrived yesterday, but it contained a pair of brown wool gloves (item GL-107) instead. I need the black leather gloves for a business trip next Monday. Could you please send the correct item as soon as possible? I would also like to return the wrong item. My order was placed on October 12th, and I expected delivery within 3-5 business days, but it arrived on October 18th. This delay and the wrong item are very inconvenient. Please confirm how you will resolve this.\n\nThank you,\nMaria Lopez\n\nEmail 2\nFrom: Sarah Chen <sarah.chen@quickbuy.com>\nTo: maria.lopez@email.com\nSubject: Re: Wrong item received\n\nDear Ms. Lopez,\n\nThank you for contacting us. I sincerely apologize for the mix-up with your order. I have checked our system and can confirm that due to a warehouse error, item GL-107 was shipped instead of GL-203.\n\nTo resolve this, I have arranged for the correct item (GL-203) to be shipped today via express delivery, so you should receive it by October 20th. A prepaid return label is attached for you to send back the brown wool gloves. Additionally, as compensation, we have refunded the full shipping cost of your order.\n\nWe value your business and hope this solution is satisfactory.\n\nBest regards,\nSarah Chen\nCustomer Service Manager\nQuickBuy",
    "passage_group_id": "p7-exp-001",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-199",
    "part": "Part 7",
    "question": "What is the relationship between the two emails?",
    "choices": {
      "A": "Email 1 is a marketing offer, and Email 2 is a request for more details.",
      "B": "Email 1 is a feedback survey, and Email 2 is a thank-you note.",
      "C": "Email 1 is an order confirmation, and Email 2 is a shipping update.",
      "D": "Email 1 is a complaint, and Email 2 is a response offering a resolution."
    },
    "answer": "D",
    "explanation_zh": "答案是 D。Email 1 是 Maria 向 QuickBuy 客服投訴收到錯誤商品的抱怨信，Email 2 是客服經理 Sarah 的回覆，提供了解決方案（補寄正確商品、退還運費），因此兩封信的關係是投訴與回應。選項 A（行銷與詢問）、C（訂單確認與運送更新）和 B（意見調查與感謝函）均不符合內容。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "relationship",
      "complaint",
      "response",
      "resolution"
    ],
    "passage": "Email 1\nFrom: Maria Lopez <maria.lopez@email.com>\nTo: support@quickbuy.com\nSubject: Wrong item received\n\nDear QuickBuy Customer Service,\n\nI recently placed an order (Order #QB-4581) for a pair of black leather gloves (item GL-203). The package arrived yesterday, but it contained a pair of brown wool gloves (item GL-107) instead. I need the black leather gloves for a business trip next Monday. Could you please send the correct item as soon as possible? I would also like to return the wrong item. My order was placed on October 12th, and I expected delivery within 3-5 business days, but it arrived on October 18th. This delay and the wrong item are very inconvenient. Please confirm how you will resolve this.\n\nThank you,\nMaria Lopez\n\nEmail 2\nFrom: Sarah Chen <sarah.chen@quickbuy.com>\nTo: maria.lopez@email.com\nSubject: Re: Wrong item received\n\nDear Ms. Lopez,\n\nThank you for contacting us. I sincerely apologize for the mix-up with your order. I have checked our system and can confirm that due to a warehouse error, item GL-107 was shipped instead of GL-203.\n\nTo resolve this, I have arranged for the correct item (GL-203) to be shipped today via express delivery, so you should receive it by October 20th. A prepaid return label is attached for you to send back the brown wool gloves. Additionally, as compensation, we have refunded the full shipping cost of your order.\n\nWe value your business and hope this solution is satisfactory.\n\nBest regards,\nSarah Chen\nCustomer Service Manager\nQuickBuy",
    "passage_group_id": "p7-exp-001",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-200",
    "part": "Part 7",
    "question": "What position is Jane Doe applying for?",
    "choices": {
      "A": "Senior Marketing Analyst",
      "B": "Data Scientist",
      "C": "Junior Marketing Analyst",
      "D": "Campaign Manager"
    },
    "answer": "A",
    "explanation_zh": "答案是 A。求職信開頭明確寫道：「I am writing to apply for the Senior Marketing Analyst position at GreenLeaf Innovations Inc.」，因此 Jane Doe 應徵的是「Senior Marketing Analyst」。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "Senior",
      "Marketing Analyst",
      "position",
      "apply"
    ],
    "passage": "Text A\nJob Posting: Senior Marketing Analyst\n\nCompany: GreenLeaf Innovations Inc.\nLocation: Chicago, IL (Hybrid)\n\nWe are seeking a Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in data-driven marketing, proficiency in SQL and Python, and a proven track record in campaign analysis. Responsibilities include analyzing customer data, optimizing digital campaigns, and presenting insights to stakeholders. A master's degree in marketing, statistics, or a related field is preferred. To apply, please send your resume and a cover letter to careers@greenleaf.com by October 30, 2024.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Marketing Analyst position at GreenLeaf Innovations Inc. With over 6 years of experience in marketing analytics and a strong background in SQL and Python, I am confident in my ability to contribute to your team. In my current role at DataDriven Solutions, I led a campaign optimization project that increased ROI by 25%. I hold a bachelor's degree in economics and have completed a certification in data science. I am eager to bring my analytical skills to GreenLeaf.\n\nThank you for your consideration.\n\nJane Doe",
    "passage_group_id": "p7-exp-002",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-201",
    "part": "Part 7",
    "question": "Which of the following is a requirement mentioned in the job posting?",
    "choices": {
      "A": "A master's degree in any field",
      "B": "Experience in customer service",
      "C": "A certification in data science",
      "D": "Proficiency in SQL and Python"
    },
    "answer": "D",
    "explanation_zh": "答案是 D。徵才公告中明確列出條件：「proficiency in SQL and Python」，因此「Proficiency in SQL and Python」是公告中提到的要求。A 選項（任何領域的碩士學位）錯誤，因為公告要求的是「marketing, statistics, or a related field」；B 選項（客服經驗）未提及；C 選項（資料科學認證）是 Jane Doe 的資格，而非公告要求。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "proficiency",
      "SQL",
      "Python",
      "requirement"
    ],
    "passage": "Text A\nJob Posting: Senior Marketing Analyst\n\nCompany: GreenLeaf Innovations Inc.\nLocation: Chicago, IL (Hybrid)\n\nWe are seeking a Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in data-driven marketing, proficiency in SQL and Python, and a proven track record in campaign analysis. Responsibilities include analyzing customer data, optimizing digital campaigns, and presenting insights to stakeholders. A master's degree in marketing, statistics, or a related field is preferred. To apply, please send your resume and a cover letter to careers@greenleaf.com by October 30, 2024.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Marketing Analyst position at GreenLeaf Innovations Inc. With over 6 years of experience in marketing analytics and a strong background in SQL and Python, I am confident in my ability to contribute to your team. In my current role at DataDriven Solutions, I led a campaign optimization project that increased ROI by 25%. I hold a bachelor's degree in economics and have completed a certification in data science. I am eager to bring my analytical skills to GreenLeaf.\n\nThank you for your consideration.\n\nJane Doe",
    "passage_group_id": "p7-exp-002",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-202",
    "part": "Part 7",
    "question": "What can be inferred about Jane Doe's qualifications?",
    "choices": {
      "A": "She has no experience in campaign analysis.",
      "B": "She is applying for a junior position.",
      "C": "She does not have a master's degree, which might affect her application.",
      "D": "She meets all the requirements of the job posting."
    },
    "answer": "C",
    "explanation_zh": "答案是 C。徵才公告偏好碩士學位，而 Jane Doe 僅有學士學位（「I hold a bachelor's degree in economics」），因此她的申請可能因此受到影響。D 選項（她符合所有要求）錯誤，因為她缺少碩士學位；B 選項（她應徵初階職位）錯誤，她應徵的是資深職位；A 選項（她沒有活動分析經驗）錯誤，她提到曾主導活動優化專案。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "inferred",
      "qualifications",
      "master's degree",
      "bachelor's degree"
    ],
    "passage": "Text A\nJob Posting: Senior Marketing Analyst\n\nCompany: GreenLeaf Innovations Inc.\nLocation: Chicago, IL (Hybrid)\n\nWe are seeking a Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in data-driven marketing, proficiency in SQL and Python, and a proven track record in campaign analysis. Responsibilities include analyzing customer data, optimizing digital campaigns, and presenting insights to stakeholders. A master's degree in marketing, statistics, or a related field is preferred. To apply, please send your resume and a cover letter to careers@greenleaf.com by October 30, 2024.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Marketing Analyst position at GreenLeaf Innovations Inc. With over 6 years of experience in marketing analytics and a strong background in SQL and Python, I am confident in my ability to contribute to your team. In my current role at DataDriven Solutions, I led a campaign optimization project that increased ROI by 25%. I hold a bachelor's degree in economics and have completed a certification in data science. I am eager to bring my analytical skills to GreenLeaf.\n\nThank you for your consideration.\n\nJane Doe",
    "passage_group_id": "p7-exp-002",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-203",
    "part": "Part 7",
    "question": "Based on the job posting and the application, which of the following is a reason why Jane Doe might not be an ideal candidate?",
    "choices": {
      "A": "She did not include a cover letter.",
      "B": "She holds only a bachelor's degree, not a master's.",
      "C": "She lacks proficiency in SQL and Python.",
      "D": "She has less than 5 years of experience."
    },
    "answer": "B",
    "explanation_zh": "答案是 B。徵才公告中寫道：「A master's degree... is preferred」，而 Jane Doe 的求職信顯示她只有學士學位（「I hold a bachelor's degree in economics」），因此她可能不是理想人選的原因是她沒有碩士學位。D 選項（經驗少於5年）錯誤，她有6年經驗；C 選項（缺乏 SQL 和 Python 能力）錯誤，她自稱有相關背景；A 選項（未附求職信）錯誤，她確實附上了求職信。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "ideal candidate",
      "bachelor's degree",
      "master's degree",
      "preferred"
    ],
    "passage": "Text A\nJob Posting: Senior Marketing Analyst\n\nCompany: GreenLeaf Innovations Inc.\nLocation: Chicago, IL (Hybrid)\n\nWe are seeking a Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in data-driven marketing, proficiency in SQL and Python, and a proven track record in campaign analysis. Responsibilities include analyzing customer data, optimizing digital campaigns, and presenting insights to stakeholders. A master's degree in marketing, statistics, or a related field is preferred. To apply, please send your resume and a cover letter to careers@greenleaf.com by October 30, 2024.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Marketing Analyst position at GreenLeaf Innovations Inc. With over 6 years of experience in marketing analytics and a strong background in SQL and Python, I am confident in my ability to contribute to your team. In my current role at DataDriven Solutions, I led a campaign optimization project that increased ROI by 25%. I hold a bachelor's degree in economics and have completed a certification in data science. I am eager to bring my analytical skills to GreenLeaf.\n\nThank you for your consideration.\n\nJane Doe",
    "passage_group_id": "p7-exp-002",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-204",
    "part": "Part 7",
    "question": "What is the main purpose of the job posting?",
    "choices": {
      "A": "To advertise a job opening and invite applications",
      "B": "To announce a company restructuring",
      "C": "To provide details about employee benefits",
      "D": "To describe the company's history"
    },
    "answer": "A",
    "explanation_zh": "答案是 A。徵才公告的目的是招募 Senior Marketing Analyst，並邀請申請者寄送履歷和求職信至 careers@greenleaf.com，因此其主要目的是「廣告職缺並邀請申請」。B 選項（宣佈公司重組）、D 選項（描述公司歷史）、C 選項（提供員工福利細節）均未在公告中提及。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "main purpose",
      "job posting",
      "advertise",
      "applications"
    ],
    "passage": "Text A\nJob Posting: Senior Marketing Analyst\n\nCompany: GreenLeaf Innovations Inc.\nLocation: Chicago, IL (Hybrid)\n\nWe are seeking a Senior Marketing Analyst to join our dynamic team. The ideal candidate will have a minimum of 5 years of experience in data-driven marketing, proficiency in SQL and Python, and a proven track record in campaign analysis. Responsibilities include analyzing customer data, optimizing digital campaigns, and presenting insights to stakeholders. A master's degree in marketing, statistics, or a related field is preferred. To apply, please send your resume and a cover letter to careers@greenleaf.com by October 30, 2024.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Senior Marketing Analyst\n\nDear Hiring Manager,\n\nI am writing to apply for the Senior Marketing Analyst position at GreenLeaf Innovations Inc. With over 6 years of experience in marketing analytics and a strong background in SQL and Python, I am confident in my ability to contribute to your team. In my current role at DataDriven Solutions, I led a campaign optimization project that increased ROI by 25%. I hold a bachelor's degree in economics and have completed a certification in data science. I am eager to bring my analytical skills to GreenLeaf.\n\nThank you for your consideration.\n\nJane Doe",
    "passage_group_id": "p7-exp-002",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-205",
    "part": "Part 7",
    "question": "What is the main issue described in the passage?",
    "choices": {
      "A": "The delivery was delayed by several days.",
      "B": "The customer received fewer monitors than ordered.",
      "C": "The order was canceled by the customer.",
      "D": "The monitors were delivered to the wrong address."
    },
    "answer": "B",
    "explanation_zh": "問題詢問的是主要問題。根據Lisa Chen的郵件，她寫道「only 15 monitors were received instead of the 20 ordered」，因此正確答案是B：客戶收到的顯示器數量少於訂購數量。選項D（送錯地址）、C（訂單被取消）和A（延遲數天）均未在文中提及或與事實不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "confirmation",
      "packing slip",
      "shortage",
      "resolution"
    ],
    "passage": "Subject: Order Confirmation - #ORD-45678\nDear Ms. Chen,\nThank you for your order of 20 units of the ProLite X2000 monitors (Model: PL-X2000) on March 15, 2024. Your order has been processed and is scheduled for delivery on March 20, 2024. The total amount of $8,000 has been charged to your account. Please review the details below:\n- Order Number: ORD-45678\n- Items: 20 x ProLite X2000 Monitors\n- Delivery Date: March 20, 2024\n- Shipping Address: 88 Innovation Drive, Tech City\nIf you have any questions, contact us at support@techsupplies.com.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.\n\n---\n\nSubject: Missing Items in Order #ORD-45678\nDear James Miller,\nI am writing regarding order #ORD-45678 placed on March 15. The delivery arrived on March 20, but only 15 monitors were received instead of the 20 ordered. The packing slip indicates 20 units, but only 15 were in the box. Please arrange to send the missing 5 monitors or issue a refund for the shortage. I need these for our upcoming project deadline.\nThank you,\nLisa Chen\nProcurement Manager\n\n---\n\nSubject: Resolution for Order #ORD-45678\nDear Ms. Chen,\nWe apologize for the error in your order. Upon investigation, our warehouse team confirmed that 5 monitors were left out due to a packing mistake. We have shipped the missing 5 ProLite X2000 monitors today (March 22) via express delivery. They are expected to arrive on March 24. Additionally, we have applied a 10% discount on the missing items as compensation, which will be refunded to your account within 5 business days. We appreciate your understanding.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.",
    "passage_group_id": "p7-exp-003",
    "passage_group_type": "triple",
    "question_order": 1
  },
  {
    "id": "p7-gen-206",
    "part": "Part 7",
    "question": "According to the first email, what was the total amount charged for the order?",
    "choices": {
      "A": "$10,000",
      "B": "$7,200",
      "C": "$800",
      "D": "$8,000"
    },
    "answer": "D",
    "explanation_zh": "問題詢問第一次郵件中的總收費金額。根據第一封郵件，明確寫道「The total amount of $8,000 has been charged to your account」，因此正確答案是D：$8,000。選項B（$7,200）是折扣後的金額，選項A（$10,000）和C（$800）未在文中出現。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "charged",
      "total amount",
      "confirmation"
    ],
    "passage": "Subject: Order Confirmation - #ORD-45678\nDear Ms. Chen,\nThank you for your order of 20 units of the ProLite X2000 monitors (Model: PL-X2000) on March 15, 2024. Your order has been processed and is scheduled for delivery on March 20, 2024. The total amount of $8,000 has been charged to your account. Please review the details below:\n- Order Number: ORD-45678\n- Items: 20 x ProLite X2000 Monitors\n- Delivery Date: March 20, 2024\n- Shipping Address: 88 Innovation Drive, Tech City\nIf you have any questions, contact us at support@techsupplies.com.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.\n\n---\n\nSubject: Missing Items in Order #ORD-45678\nDear James Miller,\nI am writing regarding order #ORD-45678 placed on March 15. The delivery arrived on March 20, but only 15 monitors were received instead of the 20 ordered. The packing slip indicates 20 units, but only 15 were in the box. Please arrange to send the missing 5 monitors or issue a refund for the shortage. I need these for our upcoming project deadline.\nThank you,\nLisa Chen\nProcurement Manager\n\n---\n\nSubject: Resolution for Order #ORD-45678\nDear Ms. Chen,\nWe apologize for the error in your order. Upon investigation, our warehouse team confirmed that 5 monitors were left out due to a packing mistake. We have shipped the missing 5 ProLite X2000 monitors today (March 22) via express delivery. They are expected to arrive on March 24. Additionally, we have applied a 10% discount on the missing items as compensation, which will be refunded to your account within 5 business days. We appreciate your understanding.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.",
    "passage_group_id": "p7-exp-003",
    "passage_group_type": "triple",
    "question_order": 2
  },
  {
    "id": "p7-gen-207",
    "part": "Part 7",
    "question": "What compensation did TechSupplies offer for the shortage?",
    "choices": {
      "A": "A full refund for the entire order.",
      "B": "Free express shipping on the replacement.",
      "C": "An additional 5 monitors at no charge.",
      "D": "A 10% discount on the missing items."
    },
    "answer": "D",
    "explanation_zh": "問題詢問TechSupplies提供的補償。根據第三封郵件，寫道「we have applied a 10% discount on the missing items as compensation」，因此正確答案是D：對缺少的物品提供10%折扣。選項A（全額退款）、B（免費快遞）和C（額外5臺顯示器）均未在文中提及。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "compensation",
      "refunded",
      "discount",
      "shortage"
    ],
    "passage": "Subject: Order Confirmation - #ORD-45678\nDear Ms. Chen,\nThank you for your order of 20 units of the ProLite X2000 monitors (Model: PL-X2000) on March 15, 2024. Your order has been processed and is scheduled for delivery on March 20, 2024. The total amount of $8,000 has been charged to your account. Please review the details below:\n- Order Number: ORD-45678\n- Items: 20 x ProLite X2000 Monitors\n- Delivery Date: March 20, 2024\n- Shipping Address: 88 Innovation Drive, Tech City\nIf you have any questions, contact us at support@techsupplies.com.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.\n\n---\n\nSubject: Missing Items in Order #ORD-45678\nDear James Miller,\nI am writing regarding order #ORD-45678 placed on March 15. The delivery arrived on March 20, but only 15 monitors were received instead of the 20 ordered. The packing slip indicates 20 units, but only 15 were in the box. Please arrange to send the missing 5 monitors or issue a refund for the shortage. I need these for our upcoming project deadline.\nThank you,\nLisa Chen\nProcurement Manager\n\n---\n\nSubject: Resolution for Order #ORD-45678\nDear Ms. Chen,\nWe apologize for the error in your order. Upon investigation, our warehouse team confirmed that 5 monitors were left out due to a packing mistake. We have shipped the missing 5 ProLite X2000 monitors today (March 22) via express delivery. They are expected to arrive on March 24. Additionally, we have applied a 10% discount on the missing items as compensation, which will be refunded to your account within 5 business days. We appreciate your understanding.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.",
    "passage_group_id": "p7-exp-003",
    "passage_group_type": "triple",
    "question_order": 3
  },
  {
    "id": "p7-gen-208",
    "part": "Part 7",
    "question": "What can be inferred about the customer's project deadline from the emails?",
    "choices": {
      "A": "The project deadline was flexible.",
      "B": "The project was canceled due to the shortage.",
      "C": "The project deadline was after March 24.",
      "D": "The project deadline was before March 20."
    },
    "answer": "C",
    "explanation_zh": "問題推斷客戶的專案截止日期。Lisa Chen在第二封郵件中寫道「I need these for our upcoming project deadline」，而第三封郵件顯示替換品將於3月24日送達，且客戶未表示不滿，因此可推斷截止日期在3月24日之後，正確答案是C。選項D（3月20日前）與替換品送達時間矛盾，選項A（靈活）和B（取消）無證據支持。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "inferred",
      "deadline",
      "shortage",
      "project"
    ],
    "passage": "Subject: Order Confirmation - #ORD-45678\nDear Ms. Chen,\nThank you for your order of 20 units of the ProLite X2000 monitors (Model: PL-X2000) on March 15, 2024. Your order has been processed and is scheduled for delivery on March 20, 2024. The total amount of $8,000 has been charged to your account. Please review the details below:\n- Order Number: ORD-45678\n- Items: 20 x ProLite X2000 Monitors\n- Delivery Date: March 20, 2024\n- Shipping Address: 88 Innovation Drive, Tech City\nIf you have any questions, contact us at support@techsupplies.com.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.\n\n---\n\nSubject: Missing Items in Order #ORD-45678\nDear James Miller,\nI am writing regarding order #ORD-45678 placed on March 15. The delivery arrived on March 20, but only 15 monitors were received instead of the 20 ordered. The packing slip indicates 20 units, but only 15 were in the box. Please arrange to send the missing 5 monitors or issue a refund for the shortage. I need these for our upcoming project deadline.\nThank you,\nLisa Chen\nProcurement Manager\n\n---\n\nSubject: Resolution for Order #ORD-45678\nDear Ms. Chen,\nWe apologize for the error in your order. Upon investigation, our warehouse team confirmed that 5 monitors were left out due to a packing mistake. We have shipped the missing 5 ProLite X2000 monitors today (March 22) via express delivery. They are expected to arrive on March 24. Additionally, we have applied a 10% discount on the missing items as compensation, which will be refunded to your account within 5 business days. We appreciate your understanding.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.",
    "passage_group_id": "p7-exp-003",
    "passage_group_type": "triple",
    "question_order": 4
  },
  {
    "id": "p7-gen-209",
    "part": "Part 7",
    "question": "How does the delivery date of the replacement monitors compare to the original delivery date?",
    "choices": {
      "A": "The replacement arrived 2 days before the original.",
      "B": "The replacement arrived on the same day as the original.",
      "C": "The replacement arrived 4 days earlier than the original.",
      "D": "The replacement arrived 4 days after the original delivery."
    },
    "answer": "D",
    "explanation_zh": "問題比較替換品與原始送貨日期。原始送貨日期為3月20日（第一封郵件），替換品於3月22日出貨，預計3月24日送達（第三封郵件），因此替換品比原始送貨晚4天，正確答案是D。選項C（早4天）、B（同一天）和A（早2天）均與事實不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "replacement",
      "original delivery",
      "express delivery",
      "timeline"
    ],
    "passage": "Subject: Order Confirmation - #ORD-45678\nDear Ms. Chen,\nThank you for your order of 20 units of the ProLite X2000 monitors (Model: PL-X2000) on March 15, 2024. Your order has been processed and is scheduled for delivery on March 20, 2024. The total amount of $8,000 has been charged to your account. Please review the details below:\n- Order Number: ORD-45678\n- Items: 20 x ProLite X2000 Monitors\n- Delivery Date: March 20, 2024\n- Shipping Address: 88 Innovation Drive, Tech City\nIf you have any questions, contact us at support@techsupplies.com.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.\n\n---\n\nSubject: Missing Items in Order #ORD-45678\nDear James Miller,\nI am writing regarding order #ORD-45678 placed on March 15. The delivery arrived on March 20, but only 15 monitors were received instead of the 20 ordered. The packing slip indicates 20 units, but only 15 were in the box. Please arrange to send the missing 5 monitors or issue a refund for the shortage. I need these for our upcoming project deadline.\nThank you,\nLisa Chen\nProcurement Manager\n\n---\n\nSubject: Resolution for Order #ORD-45678\nDear Ms. Chen,\nWe apologize for the error in your order. Upon investigation, our warehouse team confirmed that 5 monitors were left out due to a packing mistake. We have shipped the missing 5 ProLite X2000 monitors today (March 22) via express delivery. They are expected to arrive on March 24. Additionally, we have applied a 10% discount on the missing items as compensation, which will be refunded to your account within 5 business days. We appreciate your understanding.\nBest regards,\nJames Miller\nCustomer Service\nTechSupplies Inc.",
    "passage_group_id": "p7-exp-003",
    "passage_group_type": "triple",
    "question_order": 5
  },
  {
    "id": "p7-gen-210",
    "part": "Part 7",
    "question": "What is the main issue described in the emails?",
    "choices": {
      "A": "Sarah Chen received a damaged desk lamp.",
      "B": "Sarah Chen ordered a lamp that was out of stock.",
      "C": "Sarah Chen was sent the wrong model of desk lamp.",
      "D": "The delivery of Sarah Chen's order was late."
    },
    "answer": "C",
    "explanation_zh": "答案是 C。第一封郵件中 Sarah Chen 明確寫道：「我訂購的是『Deluxe Desk Lamp Model DL-100』，但收到的卻是『Basic Desk Lamp Model BL-50』。」第二封郵件中 James Lee 也承認：「您的訂單被錯誤地以 BL-50 型號出貨。」因此，主要問題是寄錯了檯燈型號。選項 A（收到損壞的燈）、B（缺貨）、D（延遲送達）均未在郵件中被提及，故為錯誤選項。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "complaint",
      "fulfilled",
      "gesture",
      "inconvenience"
    ],
    "passage": "Email 1:\n\nFrom: Sarah Chen <sarah.chen@example.com>\nTo: support@greenleafoffice.com\nSubject: Wrong item received - Order #4872\n\nDear GreenLeaf Office Supplies,\n\nI am writing to report a problem with my recent order. On March 12, I placed order #4872 for a \"Deluxe Desk Lamp Model DL-100\" (item code: DL-100-BLK). However, when I received the package today, it contained a \"Basic Desk Lamp Model BL-50\" (item code: BL-50-WHT) instead.\n\nThe order was placed for my home office, and I needed the adjustable arm and dimmer feature of the DL-100. The BL-50 model is a simple on/off lamp without these features, which does not meet my needs.\n\nI have attached photos of the received item and the packing slip. Please advise on how to proceed with a return or exchange. I would appreciate a replacement of the correct item as soon as possible.\n\nThank you,\nSarah Chen\n\nEmail 2:\n\nFrom: James Lee <james.lee@greenleafoffice.com>\nTo: sarah.chen@example.com\nSubject: Re: Wrong item received - Order #4872\n\nDear Ms. Chen,\n\nThank you for contacting GreenLeaf Office Supplies regarding order #4872. I sincerely apologize for the error in your shipment.\n\nWe have investigated the issue and found that a packing mistake occurred in our warehouse. Your order was incorrectly fulfilled with the BL-50 model instead of the DL-100.\n\nTo resolve this, we will ship the correct Deluxe Desk Lamp (DL-100-BLK) to you today via express delivery, free of charge. You should receive it within 2-3 business days. Please keep the BL-50 lamp as a gesture of our apology, or donate it to a local charity.\n\nWe have also issued a full refund for the shipping cost of your original order. A confirmation email will follow.\n\nOnce again, we apologize for the inconvenience. Please let us know if you need any further assistance.\n\nBest regards,\nJames Lee\nCustomer Service Manager\nGreenLeaf Office Supplies",
    "passage_group_id": "p7-exp-004",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-211",
    "part": "Part 7",
    "question": "What item did Sarah Chen originally order?",
    "choices": {
      "A": "Deluxe Desk Lamp Model BL-50",
      "B": "Basic Desk Lamp Model DL-100",
      "C": "Basic Desk Lamp Model BL-50",
      "D": "Deluxe Desk Lamp Model DL-100"
    },
    "answer": "D",
    "explanation_zh": "答案是 D。第一封郵件中 Sarah Chen 寫道：「我訂購了『Deluxe Desk Lamp Model DL-100』（商品代碼：DL-100-BLK）。」因此，她原本訂購的是 Deluxe Desk Lamp Model DL-100。選項 C（Basic Desk Lamp Model BL-50）是她實際收到的錯誤商品；選項 A 和 B 的型號組合在郵件中不存在，故為錯誤選項。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "contained",
      "attached",
      "proceed",
      "replacement"
    ],
    "passage": "Email 1:\n\nFrom: Sarah Chen <sarah.chen@example.com>\nTo: support@greenleafoffice.com\nSubject: Wrong item received - Order #4872\n\nDear GreenLeaf Office Supplies,\n\nI am writing to report a problem with my recent order. On March 12, I placed order #4872 for a \"Deluxe Desk Lamp Model DL-100\" (item code: DL-100-BLK). However, when I received the package today, it contained a \"Basic Desk Lamp Model BL-50\" (item code: BL-50-WHT) instead.\n\nThe order was placed for my home office, and I needed the adjustable arm and dimmer feature of the DL-100. The BL-50 model is a simple on/off lamp without these features, which does not meet my needs.\n\nI have attached photos of the received item and the packing slip. Please advise on how to proceed with a return or exchange. I would appreciate a replacement of the correct item as soon as possible.\n\nThank you,\nSarah Chen\n\nEmail 2:\n\nFrom: James Lee <james.lee@greenleafoffice.com>\nTo: sarah.chen@example.com\nSubject: Re: Wrong item received - Order #4872\n\nDear Ms. Chen,\n\nThank you for contacting GreenLeaf Office Supplies regarding order #4872. I sincerely apologize for the error in your shipment.\n\nWe have investigated the issue and found that a packing mistake occurred in our warehouse. Your order was incorrectly fulfilled with the BL-50 model instead of the DL-100.\n\nTo resolve this, we will ship the correct Deluxe Desk Lamp (DL-100-BLK) to you today via express delivery, free of charge. You should receive it within 2-3 business days. Please keep the BL-50 lamp as a gesture of our apology, or donate it to a local charity.\n\nWe have also issued a full refund for the shipping cost of your original order. A confirmation email will follow.\n\nOnce again, we apologize for the inconvenience. Please let us know if you need any further assistance.\n\nBest regards,\nJames Lee\nCustomer Service Manager\nGreenLeaf Office Supplies",
    "passage_group_id": "p7-exp-004",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-212",
    "part": "Part 7",
    "question": "According to the reply email, what is Sarah Chen asked to do with the wrong lamp?",
    "choices": {
      "A": "Keep it or donate it to a charity.",
      "B": "Return it to the warehouse immediately.",
      "C": "Exchange it for the correct model at a store.",
      "D": "Discard it and wait for a replacement."
    },
    "answer": "A",
    "explanation_zh": "答案是 A。第二封郵件中 James Lee 寫道：「請保留 BL-50 檯燈，作為我們道歉的表示，或者將其捐贈給當地慈善機構。」因此，Sarah Chen 被要求保留或捐贈這盞錯誤的燈。選項 B（退回倉庫）、C（到店更換）、D（丟棄並等待更換）均與郵件內容不符，故為錯誤選項。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "gesture",
      "donate",
      "charity",
      "apology"
    ],
    "passage": "Email 1:\n\nFrom: Sarah Chen <sarah.chen@example.com>\nTo: support@greenleafoffice.com\nSubject: Wrong item received - Order #4872\n\nDear GreenLeaf Office Supplies,\n\nI am writing to report a problem with my recent order. On March 12, I placed order #4872 for a \"Deluxe Desk Lamp Model DL-100\" (item code: DL-100-BLK). However, when I received the package today, it contained a \"Basic Desk Lamp Model BL-50\" (item code: BL-50-WHT) instead.\n\nThe order was placed for my home office, and I needed the adjustable arm and dimmer feature of the DL-100. The BL-50 model is a simple on/off lamp without these features, which does not meet my needs.\n\nI have attached photos of the received item and the packing slip. Please advise on how to proceed with a return or exchange. I would appreciate a replacement of the correct item as soon as possible.\n\nThank you,\nSarah Chen\n\nEmail 2:\n\nFrom: James Lee <james.lee@greenleafoffice.com>\nTo: sarah.chen@example.com\nSubject: Re: Wrong item received - Order #4872\n\nDear Ms. Chen,\n\nThank you for contacting GreenLeaf Office Supplies regarding order #4872. I sincerely apologize for the error in your shipment.\n\nWe have investigated the issue and found that a packing mistake occurred in our warehouse. Your order was incorrectly fulfilled with the BL-50 model instead of the DL-100.\n\nTo resolve this, we will ship the correct Deluxe Desk Lamp (DL-100-BLK) to you today via express delivery, free of charge. You should receive it within 2-3 business days. Please keep the BL-50 lamp as a gesture of our apology, or donate it to a local charity.\n\nWe have also issued a full refund for the shipping cost of your original order. A confirmation email will follow.\n\nOnce again, we apologize for the inconvenience. Please let us know if you need any further assistance.\n\nBest regards,\nJames Lee\nCustomer Service Manager\nGreenLeaf Office Supplies",
    "passage_group_id": "p7-exp-004",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-213",
    "part": "Part 7",
    "question": "What can be inferred about Sarah Chen's original order?",
    "choices": {
      "A": "She needed the lamp for her home office and required specific features.",
      "B": "She ordered the lamp for a friend's office.",
      "C": "She had previously complained about a similar issue.",
      "D": "She paid for express delivery initially."
    },
    "answer": "A",
    "explanation_zh": "答案是 A。第一封郵件中 Sarah Chen 寫道：「這個訂單是為我的家庭辦公室下的，我需要 DL-100 的可調節臂和調光功能。」因此，可以推斷她需要這盞燈用於家庭辦公室，並且需要特定功能。選項 B（為朋友的辦公室訂購）與原文「我的家庭辦公室」矛盾；選項 D（支付了快遞費用）在郵件中未提及；選項 C（之前曾投訴過類似問題）在郵件中無相關資訊，故為錯誤選項。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "features",
      "specific",
      "initially"
    ],
    "passage": "Email 1:\n\nFrom: Sarah Chen <sarah.chen@example.com>\nTo: support@greenleafoffice.com\nSubject: Wrong item received - Order #4872\n\nDear GreenLeaf Office Supplies,\n\nI am writing to report a problem with my recent order. On March 12, I placed order #4872 for a \"Deluxe Desk Lamp Model DL-100\" (item code: DL-100-BLK). However, when I received the package today, it contained a \"Basic Desk Lamp Model BL-50\" (item code: BL-50-WHT) instead.\n\nThe order was placed for my home office, and I needed the adjustable arm and dimmer feature of the DL-100. The BL-50 model is a simple on/off lamp without these features, which does not meet my needs.\n\nI have attached photos of the received item and the packing slip. Please advise on how to proceed with a return or exchange. I would appreciate a replacement of the correct item as soon as possible.\n\nThank you,\nSarah Chen\n\nEmail 2:\n\nFrom: James Lee <james.lee@greenleafoffice.com>\nTo: sarah.chen@example.com\nSubject: Re: Wrong item received - Order #4872\n\nDear Ms. Chen,\n\nThank you for contacting GreenLeaf Office Supplies regarding order #4872. I sincerely apologize for the error in your shipment.\n\nWe have investigated the issue and found that a packing mistake occurred in our warehouse. Your order was incorrectly fulfilled with the BL-50 model instead of the DL-100.\n\nTo resolve this, we will ship the correct Deluxe Desk Lamp (DL-100-BLK) to you today via express delivery, free of charge. You should receive it within 2-3 business days. Please keep the BL-50 lamp as a gesture of our apology, or donate it to a local charity.\n\nWe have also issued a full refund for the shipping cost of your original order. A confirmation email will follow.\n\nOnce again, we apologize for the inconvenience. Please let us know if you need any further assistance.\n\nBest regards,\nJames Lee\nCustomer Service Manager\nGreenLeaf Office Supplies",
    "passage_group_id": "p7-exp-004",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-214",
    "part": "Part 7",
    "question": "Both emails indicate that the shipping cost of the original order was refunded. Which email provides this information?",
    "choices": {
      "A": "Neither email.",
      "B": "Both emails.",
      "C": "Only the reply email.",
      "D": "Only the complaint email."
    },
    "answer": "C",
    "explanation_zh": "答案是 C。第二封郵件中 James Lee 寫道：「我們也已全額退還您原始訂單的運費。」而第一封郵件中 Sarah Chen 並未提及退款事宜。因此，只有回覆郵件提供了運費退款的資訊。選項 D（只有投訴郵件）、A（兩封郵件都沒有）、B（兩封郵件都有）均與事實不符，故為錯誤選項。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "refunded",
      "provides",
      "indicate",
      "original"
    ],
    "passage": "Email 1:\n\nFrom: Sarah Chen <sarah.chen@example.com>\nTo: support@greenleafoffice.com\nSubject: Wrong item received - Order #4872\n\nDear GreenLeaf Office Supplies,\n\nI am writing to report a problem with my recent order. On March 12, I placed order #4872 for a \"Deluxe Desk Lamp Model DL-100\" (item code: DL-100-BLK). However, when I received the package today, it contained a \"Basic Desk Lamp Model BL-50\" (item code: BL-50-WHT) instead.\n\nThe order was placed for my home office, and I needed the adjustable arm and dimmer feature of the DL-100. The BL-50 model is a simple on/off lamp without these features, which does not meet my needs.\n\nI have attached photos of the received item and the packing slip. Please advise on how to proceed with a return or exchange. I would appreciate a replacement of the correct item as soon as possible.\n\nThank you,\nSarah Chen\n\nEmail 2:\n\nFrom: James Lee <james.lee@greenleafoffice.com>\nTo: sarah.chen@example.com\nSubject: Re: Wrong item received - Order #4872\n\nDear Ms. Chen,\n\nThank you for contacting GreenLeaf Office Supplies regarding order #4872. I sincerely apologize for the error in your shipment.\n\nWe have investigated the issue and found that a packing mistake occurred in our warehouse. Your order was incorrectly fulfilled with the BL-50 model instead of the DL-100.\n\nTo resolve this, we will ship the correct Deluxe Desk Lamp (DL-100-BLK) to you today via express delivery, free of charge. You should receive it within 2-3 business days. Please keep the BL-50 lamp as a gesture of our apology, or donate it to a local charity.\n\nWe have also issued a full refund for the shipping cost of your original order. A confirmation email will follow.\n\nOnce again, we apologize for the inconvenience. Please let us know if you need any further assistance.\n\nBest regards,\nJames Lee\nCustomer Service Manager\nGreenLeaf Office Supplies",
    "passage_group_id": "p7-exp-004",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-215",
    "part": "Part 7",
    "question": "What position is Jane Smith applying for?",
    "choices": {
      "A": "Senior Financial Analyst",
      "B": "Financial Advisor",
      "C": "Data Analyst",
      "D": "Junior Financial Analyst"
    },
    "answer": "D",
    "explanation_zh": "答案是D。Text B第一句明確寫道「I am writing to apply for the Junior Financial Analyst position at Horizon Financial Services」，因此她申請的職位是Junior Financial Analyst。其他選項（B財務顧問、A資深財務分析師、C數據分析師）均與文中資訊不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "motivated",
      "analyst",
      "proficiency",
      "shortlisted"
    ],
    "passage": "Text A\nPosition: Junior Financial Analyst\nCompany: Horizon Financial Services\nLocation: New York, NY\n\nHorizon Financial Services is seeking a motivated Junior Financial Analyst to join our dynamic team. The ideal candidate will have a bachelor's degree in finance, accounting, or a related field, and at least one year of experience in financial analysis or a similar role. Key responsibilities include preparing financial reports, analyzing market trends, and supporting senior analysts with data modeling. Proficiency in Microsoft Excel and familiarity with financial software (e.g., Bloomberg Terminal) are required. Strong communication skills and the ability to work in a fast-paced environment are essential. To apply, please send your resume and a cover letter to careers@horizonfinancial.com by June 30, 2025. Only shortlisted candidates will be contacted.\n\nText B\nSubject: Application for Junior Financial Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Junior Financial Analyst position at Horizon Financial Services, as advertised on your company website. I recently graduated with a Bachelor of Science in Finance from City University, where I completed coursework in financial modeling and data analysis. During my internship at ABC Investments last summer, I assisted in preparing quarterly financial reports and used Excel to create pivot tables and charts. I am eager to contribute to your team and develop my skills further. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-exp-005",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-216",
    "part": "Part 7",
    "question": "Which of the following is a requirement mentioned in the job posting?",
    "choices": {
      "A": "A master's degree in finance",
      "B": "Three years of work experience",
      "C": "Experience with Bloomberg Terminal",
      "D": "Proficiency in Microsoft Excel"
    },
    "answer": "D",
    "explanation_zh": "答案是D。Text A的職位要求中明確列出「Proficiency in Microsoft Excel」，因此這是必要條件。A項（財務碩士學位）未提及；C項（Bloomberg Terminal經驗）雖有提及「familiarity with financial software (e.g., Bloomberg Terminal)」，但並非唯一要求，且D項更直接明確；B項（三年工作經驗）與文中「at least one year of experience」不符。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "bachelor's",
      "proficiency",
      "familiarity",
      "pivot tables"
    ],
    "passage": "Text A\nPosition: Junior Financial Analyst\nCompany: Horizon Financial Services\nLocation: New York, NY\n\nHorizon Financial Services is seeking a motivated Junior Financial Analyst to join our dynamic team. The ideal candidate will have a bachelor's degree in finance, accounting, or a related field, and at least one year of experience in financial analysis or a similar role. Key responsibilities include preparing financial reports, analyzing market trends, and supporting senior analysts with data modeling. Proficiency in Microsoft Excel and familiarity with financial software (e.g., Bloomberg Terminal) are required. Strong communication skills and the ability to work in a fast-paced environment are essential. To apply, please send your resume and a cover letter to careers@horizonfinancial.com by June 30, 2025. Only shortlisted candidates will be contacted.\n\nText B\nSubject: Application for Junior Financial Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Junior Financial Analyst position at Horizon Financial Services, as advertised on your company website. I recently graduated with a Bachelor of Science in Finance from City University, where I completed coursework in financial modeling and data analysis. During my internship at ABC Investments last summer, I assisted in preparing quarterly financial reports and used Excel to create pivot tables and charts. I am eager to contribute to your team and develop my skills further. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-exp-005",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-217",
    "part": "Part 7",
    "question": "What is the main purpose of Text B?",
    "choices": {
      "A": "To inquire about job openings at Horizon Financial Services",
      "B": "To recommend a candidate for a position",
      "C": "To request an interview for a financial analyst position",
      "D": "To apply for a specific job at Horizon Financial Services"
    },
    "answer": "D",
    "explanation_zh": "答案是D。Text C是Jane Smith寫給Horizon Financial Services的求職信，主旨是申請Junior Financial Analyst職位，因此主要目的是「To apply for a specific job」。A項（詢問職缺）不正確，因為她已知道職位並直接申請；C項（要求面試）未在信中提出；B項（推薦候選人）與她本人申請的事實不符。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "purpose",
      "application",
      "cover letter",
      "candidate"
    ],
    "passage": "Text A\nPosition: Junior Financial Analyst\nCompany: Horizon Financial Services\nLocation: New York, NY\n\nHorizon Financial Services is seeking a motivated Junior Financial Analyst to join our dynamic team. The ideal candidate will have a bachelor's degree in finance, accounting, or a related field, and at least one year of experience in financial analysis or a similar role. Key responsibilities include preparing financial reports, analyzing market trends, and supporting senior analysts with data modeling. Proficiency in Microsoft Excel and familiarity with financial software (e.g., Bloomberg Terminal) are required. Strong communication skills and the ability to work in a fast-paced environment are essential. To apply, please send your resume and a cover letter to careers@horizonfinancial.com by June 30, 2025. Only shortlisted candidates will be contacted.\n\nText B\nSubject: Application for Junior Financial Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Junior Financial Analyst position at Horizon Financial Services, as advertised on your company website. I recently graduated with a Bachelor of Science in Finance from City University, where I completed coursework in financial modeling and data analysis. During my internship at ABC Investments last summer, I assisted in preparing quarterly financial reports and used Excel to create pivot tables and charts. I am eager to contribute to your team and develop my skills further. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-exp-005",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-218",
    "part": "Part 7",
    "question": "Based on the job posting, which requirement does Jane Smith most likely NOT meet?",
    "choices": {
      "A": "Having a bachelor's degree in finance",
      "B": "Being familiar with financial software",
      "C": "Being proficient in Microsoft Excel",
      "D": "Having at least one year of work experience"
    },
    "answer": "D",
    "explanation_zh": "答案是D。Text A要求「at least one year of experience in financial analysis or a similar role」，而Text B中Jane Smith僅有「internship at ABC Investments last summer」，這屬於實習經驗，通常不被視為全職工作經驗，因此她最可能不符合一年工作經驗的要求。A項（財務學士學位）她已具備；B項（熟悉財務軟體）和C項（精通Excel）均在她的經歷中有所體現。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "internship",
      "requirement",
      "proficient",
      "familiarity"
    ],
    "passage": "Text A\nPosition: Junior Financial Analyst\nCompany: Horizon Financial Services\nLocation: New York, NY\n\nHorizon Financial Services is seeking a motivated Junior Financial Analyst to join our dynamic team. The ideal candidate will have a bachelor's degree in finance, accounting, or a related field, and at least one year of experience in financial analysis or a similar role. Key responsibilities include preparing financial reports, analyzing market trends, and supporting senior analysts with data modeling. Proficiency in Microsoft Excel and familiarity with financial software (e.g., Bloomberg Terminal) are required. Strong communication skills and the ability to work in a fast-paced environment are essential. To apply, please send your resume and a cover letter to careers@horizonfinancial.com by June 30, 2025. Only shortlisted candidates will be contacted.\n\nText B\nSubject: Application for Junior Financial Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Junior Financial Analyst position at Horizon Financial Services, as advertised on your company website. I recently graduated with a Bachelor of Science in Finance from City University, where I completed coursework in financial modeling and data analysis. During my internship at ABC Investments last summer, I assisted in preparing quarterly financial reports and used Excel to create pivot tables and charts. I am eager to contribute to your team and develop my skills further. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-exp-005",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-219",
    "part": "Part 7",
    "question": "How does Jane Smith's internship experience align with the job responsibilities listed in the posting?",
    "choices": {
      "A": "She analyzed market trends using Bloomberg Terminal",
      "B": "She supported senior analysts with data modeling",
      "C": "She managed a team of junior analysts",
      "D": "She prepared financial reports, which matches one responsibility"
    },
    "answer": "D",
    "explanation_zh": "答案是D。Text D列出職責包括「preparing financial reports」，而Text A中Jane Smith提到「assisted in preparing quarterly financial reports」，因此她的實習經驗與此職責相符。A項（使用Bloomberg Terminal分析市場趨勢）未在她的經歷中提及；B項（支援資深分析師進行數據建模）未明確說明；C項（管理團隊）與她的初階角色不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "align",
      "responsibilities",
      "internship",
      "quarterly"
    ],
    "passage": "Text A\nPosition: Junior Financial Analyst\nCompany: Horizon Financial Services\nLocation: New York, NY\n\nHorizon Financial Services is seeking a motivated Junior Financial Analyst to join our dynamic team. The ideal candidate will have a bachelor's degree in finance, accounting, or a related field, and at least one year of experience in financial analysis or a similar role. Key responsibilities include preparing financial reports, analyzing market trends, and supporting senior analysts with data modeling. Proficiency in Microsoft Excel and familiarity with financial software (e.g., Bloomberg Terminal) are required. Strong communication skills and the ability to work in a fast-paced environment are essential. To apply, please send your resume and a cover letter to careers@horizonfinancial.com by June 30, 2025. Only shortlisted candidates will be contacted.\n\nText B\nSubject: Application for Junior Financial Analyst Position\n\nDear Hiring Manager,\n\nI am writing to apply for the Junior Financial Analyst position at Horizon Financial Services, as advertised on your company website. I recently graduated with a Bachelor of Science in Finance from City University, where I completed coursework in financial modeling and data analysis. During my internship at ABC Investments last summer, I assisted in preparing quarterly financial reports and used Excel to create pivot tables and charts. I am eager to contribute to your team and develop my skills further. My resume is attached for your review. Thank you for considering my application.\n\nSincerely,\nJane Smith",
    "passage_group_id": "p7-exp-005",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-220",
    "part": "Part 7",
    "question": "What is the primary issue described in the emails?",
    "choices": {
      "A": "The customer was overcharged for the order.",
      "B": "The order was delayed and partially missing.",
      "C": "The customer received the wrong product model.",
      "D": "The company refused to process a refund."
    },
    "answer": "B",
    "explanation_zh": "答案是 B。根據 Email 2，顧客 Jane Smith 指出訂單 #BX-7842 於 3 月 17 日送達，但只收到 40 臺耳機（短少 10 臺），且送貨延遲了兩天。因此主要問題是訂單延遲且部分缺貨。選項 C（收到錯誤產品型號）未提及；選項 A（被多收費）不正確，因為總金額 $2,250 已扣款但未反映多收；選項 D（公司拒絕退款）與 Email 3 中公司提供補償的事實不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "dispatched",
      "shortfall",
      "compensation",
      "logistical"
    ],
    "passage": "Email 1 — Order Confirmation\nFrom: orders@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Order #BX-7842 Confirmation\nDate: March 10, 2025\n\nDear Ms. Smith,\n\nThank you for your order placed on March 9, 2025. This email confirms your purchase of 50 units of the Model A300 wireless headphones (SKU: WH-A300) at $45.00 per unit. The total amount of $2,250.00 has been charged to your account. The order is scheduled for delivery on March 15, 2025, via Express Shipping. You will receive a tracking number once the shipment is processed.\n\nShould you have any questions, please contact our customer service team.\n\nSincerely,\nBright Electronics Customer Service\n\nEmail 2 — Follow-up Complaint\nFrom: jane.smith@company.com\nTo: support@brightelectronics.com\nSubject: Missing Items in Order #BX-7842\nDate: March 18, 2025\n\nDear Customer Service,\n\nI am writing regarding order #BX-7842, which arrived on March 17, 2025. Upon inspection, I discovered that only 40 units of the Model A300 headphones were included, instead of the 50 units ordered. The delivery was also delayed by two days. Please advise on how to resolve this issue. I expect either the missing 10 units to be shipped immediately or a refund for the shortfall.\n\nThank you for your prompt attention.\n\nJane Smith\nPurchasing Manager\n\nEmail 3 — Resolution Reply\nFrom: support@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Re: Missing Items in Order #BX-7842\nDate: March 20, 2025\n\nDear Ms. Smith,\n\nWe apologize for the inconvenience regarding your order #BX-7842. After reviewing our records, we confirm that 50 units of the Model A300 headphones were packed, but due to a logistical error, only 40 were dispatched. The remaining 10 units have been shipped today via Express Shipping, with delivery expected by March 22, 2025. As compensation for the delay, we have issued a $50 credit to your account, which can be used for future purchases. You will receive the tracking details shortly.\n\nWe value your business and hope this resolves the matter.\n\nSincerely,\nBright Electronics Support Team",
    "passage_group_id": "p7-exp-006",
    "passage_group_type": "triple",
    "question_order": 1
  },
  {
    "id": "p7-gen-221",
    "part": "Part 7",
    "question": "According to Email 1, what was the original delivery date for order #BX-7842?",
    "choices": {
      "A": "March 9, 2025",
      "B": "March 22, 2025",
      "C": "March 15, 2025",
      "D": "March 17, 2025"
    },
    "answer": "C",
    "explanation_zh": "答案是 C。Email 1 明確指出「The order is scheduled for delivery on March 15, 2025, via Express Shipping」，因此原始送貨日期為 3 月 15 日。選項 A（3 月 9 日）是訂購日期；選項 D（3 月 17 日）是實際送達日期；選項 B（3 月 22 日）是補寄貨物的預計送達日期。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "scheduled",
      "tracking",
      "processed",
      "inspection"
    ],
    "passage": "Email 1 — Order Confirmation\nFrom: orders@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Order #BX-7842 Confirmation\nDate: March 10, 2025\n\nDear Ms. Smith,\n\nThank you for your order placed on March 9, 2025. This email confirms your purchase of 50 units of the Model A300 wireless headphones (SKU: WH-A300) at $45.00 per unit. The total amount of $2,250.00 has been charged to your account. The order is scheduled for delivery on March 15, 2025, via Express Shipping. You will receive a tracking number once the shipment is processed.\n\nShould you have any questions, please contact our customer service team.\n\nSincerely,\nBright Electronics Customer Service\n\nEmail 2 — Follow-up Complaint\nFrom: jane.smith@company.com\nTo: support@brightelectronics.com\nSubject: Missing Items in Order #BX-7842\nDate: March 18, 2025\n\nDear Customer Service,\n\nI am writing regarding order #BX-7842, which arrived on March 17, 2025. Upon inspection, I discovered that only 40 units of the Model A300 headphones were included, instead of the 50 units ordered. The delivery was also delayed by two days. Please advise on how to resolve this issue. I expect either the missing 10 units to be shipped immediately or a refund for the shortfall.\n\nThank you for your prompt attention.\n\nJane Smith\nPurchasing Manager\n\nEmail 3 — Resolution Reply\nFrom: support@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Re: Missing Items in Order #BX-7842\nDate: March 20, 2025\n\nDear Ms. Smith,\n\nWe apologize for the inconvenience regarding your order #BX-7842. After reviewing our records, we confirm that 50 units of the Model A300 headphones were packed, but due to a logistical error, only 40 were dispatched. The remaining 10 units have been shipped today via Express Shipping, with delivery expected by March 22, 2025. As compensation for the delay, we have issued a $50 credit to your account, which can be used for future purchases. You will receive the tracking details shortly.\n\nWe value your business and hope this resolves the matter.\n\nSincerely,\nBright Electronics Support Team",
    "passage_group_id": "p7-exp-006",
    "passage_group_type": "triple",
    "question_order": 2
  },
  {
    "id": "p7-gen-222",
    "part": "Part 7",
    "question": "What compensation did Bright Electronics offer to Ms. Smith?",
    "choices": {
      "A": "Free shipping on the next order.",
      "B": "An additional 10 units at no charge.",
      "C": "A $50 discount on the next purchase.",
      "D": "A full refund of the order amount."
    },
    "answer": "C",
    "explanation_zh": "答案是 C。Email 3 中提到「we have issued a $50 credit to your account, which can be used for future purchases」，即提供 $50 折扣用於下次購買。選項 D（全額退款）未發生；選項 B（額外免費 10 臺）不正確，因為補寄的 10 臺是原訂單的一部分；選項 A（下次訂單免運費）未提及。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "compensation",
      "credit",
      "dispatched",
      "logistical"
    ],
    "passage": "Email 1 — Order Confirmation\nFrom: orders@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Order #BX-7842 Confirmation\nDate: March 10, 2025\n\nDear Ms. Smith,\n\nThank you for your order placed on March 9, 2025. This email confirms your purchase of 50 units of the Model A300 wireless headphones (SKU: WH-A300) at $45.00 per unit. The total amount of $2,250.00 has been charged to your account. The order is scheduled for delivery on March 15, 2025, via Express Shipping. You will receive a tracking number once the shipment is processed.\n\nShould you have any questions, please contact our customer service team.\n\nSincerely,\nBright Electronics Customer Service\n\nEmail 2 — Follow-up Complaint\nFrom: jane.smith@company.com\nTo: support@brightelectronics.com\nSubject: Missing Items in Order #BX-7842\nDate: March 18, 2025\n\nDear Customer Service,\n\nI am writing regarding order #BX-7842, which arrived on March 17, 2025. Upon inspection, I discovered that only 40 units of the Model A300 headphones were included, instead of the 50 units ordered. The delivery was also delayed by two days. Please advise on how to resolve this issue. I expect either the missing 10 units to be shipped immediately or a refund for the shortfall.\n\nThank you for your prompt attention.\n\nJane Smith\nPurchasing Manager\n\nEmail 3 — Resolution Reply\nFrom: support@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Re: Missing Items in Order #BX-7842\nDate: March 20, 2025\n\nDear Ms. Smith,\n\nWe apologize for the inconvenience regarding your order #BX-7842. After reviewing our records, we confirm that 50 units of the Model A300 headphones were packed, but due to a logistical error, only 40 were dispatched. The remaining 10 units have been shipped today via Express Shipping, with delivery expected by March 22, 2025. As compensation for the delay, we have issued a $50 credit to your account, which can be used for future purchases. You will receive the tracking details shortly.\n\nWe value your business and hope this resolves the matter.\n\nSincerely,\nBright Electronics Support Team",
    "passage_group_id": "p7-exp-006",
    "passage_group_type": "triple",
    "question_order": 3
  },
  {
    "id": "p7-gen-223",
    "part": "Part 7",
    "question": "Why did the customer send the follow-up email on March 18?",
    "choices": {
      "A": "To ask for a discount on future purchases.",
      "B": "To request a tracking number for the shipment.",
      "C": "To report that the order was incomplete and late.",
      "D": "To cancel the order due to the delay."
    },
    "answer": "C",
    "explanation_zh": "答案是 C。Email 2 中顧客寫道「I discovered that only 40 units...were included, instead of the 50 units ordered. The delivery was also delayed by two days」，因此她發送郵件是為了報告訂單不完整且延遲。選項 B（要求追蹤號碼）未在 Email 2 中提出；選項 D（取消訂單）未提及；選項 A（要求未來折扣）不是主要目的。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "inspection",
      "shortfall",
      "prompt",
      "resolution"
    ],
    "passage": "Email 1 — Order Confirmation\nFrom: orders@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Order #BX-7842 Confirmation\nDate: March 10, 2025\n\nDear Ms. Smith,\n\nThank you for your order placed on March 9, 2025. This email confirms your purchase of 50 units of the Model A300 wireless headphones (SKU: WH-A300) at $45.00 per unit. The total amount of $2,250.00 has been charged to your account. The order is scheduled for delivery on March 15, 2025, via Express Shipping. You will receive a tracking number once the shipment is processed.\n\nShould you have any questions, please contact our customer service team.\n\nSincerely,\nBright Electronics Customer Service\n\nEmail 2 — Follow-up Complaint\nFrom: jane.smith@company.com\nTo: support@brightelectronics.com\nSubject: Missing Items in Order #BX-7842\nDate: March 18, 2025\n\nDear Customer Service,\n\nI am writing regarding order #BX-7842, which arrived on March 17, 2025. Upon inspection, I discovered that only 40 units of the Model A300 headphones were included, instead of the 50 units ordered. The delivery was also delayed by two days. Please advise on how to resolve this issue. I expect either the missing 10 units to be shipped immediately or a refund for the shortfall.\n\nThank you for your prompt attention.\n\nJane Smith\nPurchasing Manager\n\nEmail 3 — Resolution Reply\nFrom: support@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Re: Missing Items in Order #BX-7842\nDate: March 20, 2025\n\nDear Ms. Smith,\n\nWe apologize for the inconvenience regarding your order #BX-7842. After reviewing our records, we confirm that 50 units of the Model A300 headphones were packed, but due to a logistical error, only 40 were dispatched. The remaining 10 units have been shipped today via Express Shipping, with delivery expected by March 22, 2025. As compensation for the delay, we have issued a $50 credit to your account, which can be used for future purchases. You will receive the tracking details shortly.\n\nWe value your business and hope this resolves the matter.\n\nSincerely,\nBright Electronics Support Team",
    "passage_group_id": "p7-exp-006",
    "passage_group_type": "triple",
    "question_order": 4
  },
  {
    "id": "p7-gen-224",
    "part": "Part 7",
    "question": "How did the delivery date in Email 1 differ from the actual arrival date reported in Email 2?",
    "choices": {
      "A": "It was the same date.",
      "B": "It was five days later.",
      "C": "It was two days later.",
      "D": "It was two days earlier."
    },
    "answer": "D",
    "explanation_zh": "答案是 D。Email 1 的原始送貨日期是 3 月 15 日，而 Email 2 報告實際送達日期是 3 月 17 日，相差兩天。因此原始日期比實際日期早兩天。選項 A（相同日期）錯誤；選項 C（晚兩天）方向相反；選項 B（晚五天）不正確，因為 3 月 15 日到 3 月 17 日僅兩天。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "scheduled",
      "arrival",
      "delay",
      "discrepancy"
    ],
    "passage": "Email 1 — Order Confirmation\nFrom: orders@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Order #BX-7842 Confirmation\nDate: March 10, 2025\n\nDear Ms. Smith,\n\nThank you for your order placed on March 9, 2025. This email confirms your purchase of 50 units of the Model A300 wireless headphones (SKU: WH-A300) at $45.00 per unit. The total amount of $2,250.00 has been charged to your account. The order is scheduled for delivery on March 15, 2025, via Express Shipping. You will receive a tracking number once the shipment is processed.\n\nShould you have any questions, please contact our customer service team.\n\nSincerely,\nBright Electronics Customer Service\n\nEmail 2 — Follow-up Complaint\nFrom: jane.smith@company.com\nTo: support@brightelectronics.com\nSubject: Missing Items in Order #BX-7842\nDate: March 18, 2025\n\nDear Customer Service,\n\nI am writing regarding order #BX-7842, which arrived on March 17, 2025. Upon inspection, I discovered that only 40 units of the Model A300 headphones were included, instead of the 50 units ordered. The delivery was also delayed by two days. Please advise on how to resolve this issue. I expect either the missing 10 units to be shipped immediately or a refund for the shortfall.\n\nThank you for your prompt attention.\n\nJane Smith\nPurchasing Manager\n\nEmail 3 — Resolution Reply\nFrom: support@brightelectronics.com\nTo: jane.smith@company.com\nSubject: Re: Missing Items in Order #BX-7842\nDate: March 20, 2025\n\nDear Ms. Smith,\n\nWe apologize for the inconvenience regarding your order #BX-7842. After reviewing our records, we confirm that 50 units of the Model A300 headphones were packed, but due to a logistical error, only 40 were dispatched. The remaining 10 units have been shipped today via Express Shipping, with delivery expected by March 22, 2025. As compensation for the delay, we have issued a $50 credit to your account, which can be used for future purchases. You will receive the tracking details shortly.\n\nWe value your business and hope this resolves the matter.\n\nSincerely,\nBright Electronics Support Team",
    "passage_group_id": "p7-exp-006",
    "passage_group_type": "triple",
    "question_order": 5
  },
  {
    "id": "p7-gen-225",
    "part": "Part 7",
    "question": "What is the main issue described in the first email?",
    "choices": {
      "A": "The customer was charged twice for the same order.",
      "B": "The customer received a different product than what was ordered.",
      "C": "The customer received a damaged product.",
      "D": "The customer's package was delivered late."
    },
    "answer": "B",
    "explanation_zh": "答案是 B。第一封郵件中，莎拉明確寫道「我訂購的是無線耳機（型號 WM-200），但收到的包裹裡是有線耳機（型號 WH-100）」，這直接對應選項 B「客戶收到的商品與訂購的不同」。選項 C「收到損壞商品」、A「被重複收費」、D「包裹延遲送達」均未在郵件中被提及。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "order",
      "wireless earbuds",
      "wired headset",
      "replacement"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sjenkins@example.com>\nTo: support@quickmart.com\nSubject: Wrong item received – order #78432\nDate: October 15, 2024 09:23 AM\n\nDear QuickMart Customer Service,\n\nI am writing to report an issue with my recent order. I placed order #78432 on October 10 for a pair of wireless earbuds (model WM-200). However, when I received the package yesterday, it contained a wired headset (model WH-100). This is not what I ordered, and I am disappointed as I needed the earbuds for my daily commute.\n\nI have attached a photo of the item received and the original order confirmation. Please arrange for a replacement of the correct item or a full refund. I would appreciate a prompt response as I rely on these for work.\n\nThank you for your attention to this matter.\n\nBest regards,\nSarah Jenkins\n\nEmail 2\nFrom: Peter Chen <peter.chen@quickmart.com>\nTo: Sarah Jenkins <sjenkins@example.com>\nSubject: RE: Wrong item received – order #78432\nDate: October 15, 2024 02:15 PM\n\nDear Ms. Jenkins,\n\nThank you for contacting us. I apologize for the error with your order #78432. I have reviewed our records and confirmed that the warehouse mistakenly picked the wrong item.\n\nTo resolve this, we will ship the correct wireless earbuds (WM-200) to you today via express delivery at no extra cost. You should receive them within 2 business days. Additionally, we have issued a full refund for the original order, and you may keep the wired headset as a gesture of apology.\n\nIf you have any further questions, please do not hesitate to reply to this email.\n\nSincerely,\nPeter Chen\nQuickMart Customer Service",
    "passage_group_id": "p7-exp-007",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-226",
    "part": "Part 7",
    "question": "According to the first email, when did Sarah receive the package?",
    "choices": {
      "A": "On October 17",
      "B": "On October 15",
      "C": "On October 14",
      "D": "On October 10"
    },
    "answer": "C",
    "explanation_zh": "答案是 C。莎拉在郵件中說「我於 10 月 10 日下單，昨天收到包裹」，而郵件發送日期是 10 月 15 日，因此「昨天」即為 10 月 14 日。選項 D「10 月 10 日」是下單日，A「10 月 17 日」和 B「10 月 15 日」均與文中「昨天」不符。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "package",
      "received",
      "order confirmation",
      "yesterday"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sjenkins@example.com>\nTo: support@quickmart.com\nSubject: Wrong item received – order #78432\nDate: October 15, 2024 09:23 AM\n\nDear QuickMart Customer Service,\n\nI am writing to report an issue with my recent order. I placed order #78432 on October 10 for a pair of wireless earbuds (model WM-200). However, when I received the package yesterday, it contained a wired headset (model WH-100). This is not what I ordered, and I am disappointed as I needed the earbuds for my daily commute.\n\nI have attached a photo of the item received and the original order confirmation. Please arrange for a replacement of the correct item or a full refund. I would appreciate a prompt response as I rely on these for work.\n\nThank you for your attention to this matter.\n\nBest regards,\nSarah Jenkins\n\nEmail 2\nFrom: Peter Chen <peter.chen@quickmart.com>\nTo: Sarah Jenkins <sjenkins@example.com>\nSubject: RE: Wrong item received – order #78432\nDate: October 15, 2024 02:15 PM\n\nDear Ms. Jenkins,\n\nThank you for contacting us. I apologize for the error with your order #78432. I have reviewed our records and confirmed that the warehouse mistakenly picked the wrong item.\n\nTo resolve this, we will ship the correct wireless earbuds (WM-200) to you today via express delivery at no extra cost. You should receive them within 2 business days. Additionally, we have issued a full refund for the original order, and you may keep the wired headset as a gesture of apology.\n\nIf you have any further questions, please do not hesitate to reply to this email.\n\nSincerely,\nPeter Chen\nQuickMart Customer Service",
    "passage_group_id": "p7-exp-007",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-227",
    "part": "Part 7",
    "question": "What resolution does Peter offer in the second email?",
    "choices": {
      "A": "He asks Sarah to return the wired headset for a refund.",
      "B": "He offers to exchange the wired headset for a different model.",
      "C": "He requests Sarah to wait for a discount on her next purchase.",
      "D": "He will send the correct earbuds and also refund the order."
    },
    "answer": "D",
    "explanation_zh": "答案是 D。彼得在第二封郵件中提出「我們將在今天以快遞寄出正確的無線耳機，且不收取額外費用」以及「我們已對原始訂單全額退款」，這完全對應選項 D「他會寄出正確的耳機並退款」。選項 B「更換不同型號」、A「要求退回有線耳機」、C「要求等待折扣」均與郵件內容不符。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "resolution",
      "express delivery",
      "full refund",
      "keep"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sjenkins@example.com>\nTo: support@quickmart.com\nSubject: Wrong item received – order #78432\nDate: October 15, 2024 09:23 AM\n\nDear QuickMart Customer Service,\n\nI am writing to report an issue with my recent order. I placed order #78432 on October 10 for a pair of wireless earbuds (model WM-200). However, when I received the package yesterday, it contained a wired headset (model WH-100). This is not what I ordered, and I am disappointed as I needed the earbuds for my daily commute.\n\nI have attached a photo of the item received and the original order confirmation. Please arrange for a replacement of the correct item or a full refund. I would appreciate a prompt response as I rely on these for work.\n\nThank you for your attention to this matter.\n\nBest regards,\nSarah Jenkins\n\nEmail 2\nFrom: Peter Chen <peter.chen@quickmart.com>\nTo: Sarah Jenkins <sjenkins@example.com>\nSubject: RE: Wrong item received – order #78432\nDate: October 15, 2024 02:15 PM\n\nDear Ms. Jenkins,\n\nThank you for contacting us. I apologize for the error with your order #78432. I have reviewed our records and confirmed that the warehouse mistakenly picked the wrong item.\n\nTo resolve this, we will ship the correct wireless earbuds (WM-200) to you today via express delivery at no extra cost. You should receive them within 2 business days. Additionally, we have issued a full refund for the original order, and you may keep the wired headset as a gesture of apology.\n\nIf you have any further questions, please do not hesitate to reply to this email.\n\nSincerely,\nPeter Chen\nQuickMart Customer Service",
    "passage_group_id": "p7-exp-007",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-228",
    "part": "Part 7",
    "question": "What can be inferred about Sarah's need for the earbuds?",
    "choices": {
      "A": "She uses them for work during her commute.",
      "B": "She plans to give them as a gift.",
      "C": "She wants to resell them for profit.",
      "D": "She needs them for leisure activities."
    },
    "answer": "A",
    "explanation_zh": "答案是 A。莎拉在第一封郵件中寫道「我需要這些耳機用於日常通勤」以及「我依賴它們工作」，這直接支持選項 A「她在通勤時用於工作」。選項 D「休閒活動」、B「作為禮物」、C「轉售獲利」均未在郵件中被提及。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "inferred",
      "commute",
      "rely on",
      "for work"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sjenkins@example.com>\nTo: support@quickmart.com\nSubject: Wrong item received – order #78432\nDate: October 15, 2024 09:23 AM\n\nDear QuickMart Customer Service,\n\nI am writing to report an issue with my recent order. I placed order #78432 on October 10 for a pair of wireless earbuds (model WM-200). However, when I received the package yesterday, it contained a wired headset (model WH-100). This is not what I ordered, and I am disappointed as I needed the earbuds for my daily commute.\n\nI have attached a photo of the item received and the original order confirmation. Please arrange for a replacement of the correct item or a full refund. I would appreciate a prompt response as I rely on these for work.\n\nThank you for your attention to this matter.\n\nBest regards,\nSarah Jenkins\n\nEmail 2\nFrom: Peter Chen <peter.chen@quickmart.com>\nTo: Sarah Jenkins <sjenkins@example.com>\nSubject: RE: Wrong item received – order #78432\nDate: October 15, 2024 02:15 PM\n\nDear Ms. Jenkins,\n\nThank you for contacting us. I apologize for the error with your order #78432. I have reviewed our records and confirmed that the warehouse mistakenly picked the wrong item.\n\nTo resolve this, we will ship the correct wireless earbuds (WM-200) to you today via express delivery at no extra cost. You should receive them within 2 business days. Additionally, we have issued a full refund for the original order, and you may keep the wired headset as a gesture of apology.\n\nIf you have any further questions, please do not hesitate to reply to this email.\n\nSincerely,\nPeter Chen\nQuickMart Customer Service",
    "passage_group_id": "p7-exp-007",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-229",
    "part": "Part 7",
    "question": "Based on both emails, what is the most likely outcome for Sarah?",
    "choices": {
      "A": "She will have to pay extra for express shipping.",
      "B": "She will get the correct earbuds and keep the refund and headset.",
      "C": "She will return the wired headset and receive a discount.",
      "D": "She will receive a store credit instead of a refund."
    },
    "answer": "B",
    "explanation_zh": "答案是 B。綜合兩封郵件，彼得承諾「寄出正確的無線耳機」、「全額退款」，並允許莎拉「保留有線耳機作為歉意」，因此最可能的結果是莎拉「獲得正確的耳機，同時保留退款和有線耳機」，對應選項 B。選項 C「退回有線耳機並獲得折扣」、A「支付額外快遞費」、D「獲得商店信用額度而非退款」均與郵件內容矛盾。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "outcome",
      "express delivery",
      "keep",
      "refund"
    ],
    "passage": "Email 1\nFrom: Sarah Jenkins <sjenkins@example.com>\nTo: support@quickmart.com\nSubject: Wrong item received – order #78432\nDate: October 15, 2024 09:23 AM\n\nDear QuickMart Customer Service,\n\nI am writing to report an issue with my recent order. I placed order #78432 on October 10 for a pair of wireless earbuds (model WM-200). However, when I received the package yesterday, it contained a wired headset (model WH-100). This is not what I ordered, and I am disappointed as I needed the earbuds for my daily commute.\n\nI have attached a photo of the item received and the original order confirmation. Please arrange for a replacement of the correct item or a full refund. I would appreciate a prompt response as I rely on these for work.\n\nThank you for your attention to this matter.\n\nBest regards,\nSarah Jenkins\n\nEmail 2\nFrom: Peter Chen <peter.chen@quickmart.com>\nTo: Sarah Jenkins <sjenkins@example.com>\nSubject: RE: Wrong item received – order #78432\nDate: October 15, 2024 02:15 PM\n\nDear Ms. Jenkins,\n\nThank you for contacting us. I apologize for the error with your order #78432. I have reviewed our records and confirmed that the warehouse mistakenly picked the wrong item.\n\nTo resolve this, we will ship the correct wireless earbuds (WM-200) to you today via express delivery at no extra cost. You should receive them within 2 business days. Additionally, we have issued a full refund for the original order, and you may keep the wired headset as a gesture of apology.\n\nIf you have any further questions, please do not hesitate to reply to this email.\n\nSincerely,\nPeter Chen\nQuickMart Customer Service",
    "passage_group_id": "p7-exp-007",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-230",
    "part": "Part 7",
    "question": "What is the main purpose of Text A?",
    "choices": {
      "A": "To announce a new product launch",
      "B": "To request employee feedback",
      "C": "To advertise a job opening",
      "D": "To describe the company's history"
    },
    "answer": "C",
    "explanation_zh": "答案為C。Text D 是一則求職廣告，開頭即標明「Job Advertisement: Marketing Coordinator」，並詳細列出職位要求與申請方式，目的在於招聘人才。選項D（描述公司歷史）、B（徵求員工回饋）、A（宣佈新產品上市）均與廣告內容不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "advertised",
      "dynamic",
      "proficiency",
      "coordinate"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Portland, OR\n\nGreenLeaf Solutions is seeking a Marketing Coordinator to join our dynamic team. The ideal candidate will have a bachelor's degree in marketing or a related field, at least two years of experience in digital marketing, and proficiency in social media management tools. Responsibilities include creating social media content, analyzing campaign performance, and coordinating with the sales team. Please submit your resume and a cover letter to careers@greenleaf.com by March 15.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. I hold a bachelor's degree in business administration with a concentration in marketing, and I have three years of experience in digital marketing, including managing social media campaigns for a mid-sized company. In my previous role, I increased engagement by 30% using tools like Hootsuite and Google Analytics. I am confident that my skills align well with your requirements.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-exp-008",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-231",
    "part": "Part 7",
    "question": "According to Text A, what is one requirement for the Marketing Coordinator position?",
    "choices": {
      "A": "At least three years of experience",
      "B": "Proficiency in social media management tools",
      "C": "A master's degree in marketing",
      "D": "Experience in sales coordination"
    },
    "answer": "B",
    "explanation_zh": "答案為B。Text B 中明確列出職位要求包括「proficiency in social media management tools」（精通社群媒體管理工具）。選項A（至少三年經驗）錯誤，廣告要求是「at least two years」；選項C（行銷碩士學位）錯誤，廣告要求是「bachelor's degree」；選項D（銷售協調經驗）錯誤，廣告中「coordinating with the sales team」是職責而非要求。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "requirement",
      "proficiency",
      "digital",
      "campaign"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Portland, OR\n\nGreenLeaf Solutions is seeking a Marketing Coordinator to join our dynamic team. The ideal candidate will have a bachelor's degree in marketing or a related field, at least two years of experience in digital marketing, and proficiency in social media management tools. Responsibilities include creating social media content, analyzing campaign performance, and coordinating with the sales team. Please submit your resume and a cover letter to careers@greenleaf.com by March 15.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. I hold a bachelor's degree in business administration with a concentration in marketing, and I have three years of experience in digital marketing, including managing social media campaigns for a mid-sized company. In my previous role, I increased engagement by 30% using tools like Hootsuite and Google Analytics. I am confident that my skills align well with your requirements.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-exp-008",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-232",
    "part": "Part 7",
    "question": "What qualification does Jane Doe mention in Text B that directly matches a requirement in Text A?",
    "choices": {
      "A": "Experience in creating social media content",
      "B": "Proficiency in graphic design software",
      "C": "Experience with sales team coordination",
      "D": "A master's degree in business"
    },
    "answer": "A",
    "explanation_zh": "答案為A。Text D 要求「creating social media content」（創作社群媒體內容），而Text A 中Jane Doe提到她「managing social media campaigns」（管理社群媒體活動），兩者直接對應。選項D（碩士學位）錯誤，Jane只有學士學位；選項B（平面設計軟體）未提及；選項C（銷售團隊協調）未在Text A中具體說明。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "qualification",
      "requirement",
      "campaigns",
      "coordination"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Portland, OR\n\nGreenLeaf Solutions is seeking a Marketing Coordinator to join our dynamic team. The ideal candidate will have a bachelor's degree in marketing or a related field, at least two years of experience in digital marketing, and proficiency in social media management tools. Responsibilities include creating social media content, analyzing campaign performance, and coordinating with the sales team. Please submit your resume and a cover letter to careers@greenleaf.com by March 15.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. I hold a bachelor's degree in business administration with a concentration in marketing, and I have three years of experience in digital marketing, including managing social media campaigns for a mid-sized company. In my previous role, I increased engagement by 30% using tools like Hootsuite and Google Analytics. I am confident that my skills align well with your requirements.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-exp-008",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-233",
    "part": "Part 7",
    "question": "What can be inferred about Jane Doe's experience from Text B?",
    "choices": {
      "A": "She has never used analytics tools before.",
      "B": "She lacks a degree in a related field.",
      "C": "She has more than the required experience.",
      "D": "She previously worked for a large corporation."
    },
    "answer": "C",
    "explanation_zh": "答案為C。Text A 要求「at least two years of experience」，而Text B中Jane Doe提到「three years of experience」，因此她的經驗超過要求。選項A（從未使用分析工具）錯誤，她提到使用Google Analytics；選項B（缺乏相關領域學位）錯誤，她擁有行銷相關學位；選項D（曾為大型企業工作）錯誤，她提到的是「a mid-sized company」。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "inferred",
      "experience",
      "required",
      "previous"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Portland, OR\n\nGreenLeaf Solutions is seeking a Marketing Coordinator to join our dynamic team. The ideal candidate will have a bachelor's degree in marketing or a related field, at least two years of experience in digital marketing, and proficiency in social media management tools. Responsibilities include creating social media content, analyzing campaign performance, and coordinating with the sales team. Please submit your resume and a cover letter to careers@greenleaf.com by March 15.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. I hold a bachelor's degree in business administration with a concentration in marketing, and I have three years of experience in digital marketing, including managing social media campaigns for a mid-sized company. In my previous role, I increased engagement by 30% using tools like Hootsuite and Google Analytics. I am confident that my skills align well with your requirements.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-exp-008",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-234",
    "part": "Part 7",
    "question": "Based on both texts, which requirement from Text A is NOT specifically addressed in Jane's application in Text B?",
    "choices": {
      "A": "Proficiency in social media management tools",
      "B": "A bachelor's degree in a related field",
      "C": "Experience in digital marketing",
      "D": "Coordination with the sales team"
    },
    "answer": "D",
    "explanation_zh": "答案為D。Text B 要求「coordinating with the sales team」（與銷售團隊協調），但Text C中Jane Doe完全未提及此項。選項B（相關領域學士學位）她在Text C中提及；選項C（數位行銷經驗）她提及；選項A（精通社群媒體管理工具）她提及使用Hootsuite。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "requirement",
      "addressed",
      "coordination",
      "specifically"
    ],
    "passage": "Text A\nJob Advertisement: Marketing Coordinator\n\nCompany: GreenLeaf Solutions\nLocation: Portland, OR\n\nGreenLeaf Solutions is seeking a Marketing Coordinator to join our dynamic team. The ideal candidate will have a bachelor's degree in marketing or a related field, at least two years of experience in digital marketing, and proficiency in social media management tools. Responsibilities include creating social media content, analyzing campaign performance, and coordinating with the sales team. Please submit your resume and a cover letter to careers@greenleaf.com by March 15.\n\nText B\nApplication Email\n\nTo: careers@greenleaf.com\nFrom: jane.doe@email.com\nSubject: Application for Marketing Coordinator\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position at GreenLeaf Solutions, as advertised on your website. I hold a bachelor's degree in business administration with a concentration in marketing, and I have three years of experience in digital marketing, including managing social media campaigns for a mid-sized company. In my previous role, I increased engagement by 30% using tools like Hootsuite and Google Analytics. I am confident that my skills align well with your requirements.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nJane Doe",
    "passage_group_id": "p7-exp-008",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p7-gen-235",
    "part": "Part 7",
    "question": "What is the main issue described in these emails?",
    "choices": {
      "A": "The payment was not processed correctly",
      "B": "The shipment was delayed by several days",
      "C": "The customer ordered the wrong product model",
      "D": "The customer received fewer items than ordered"
    },
    "answer": "D",
    "explanation_zh": "答案是 D。第一封郵件確認訂購 50 件，但第二封郵件指出僅收到 30 件，第三封郵件承認錯誤並補寄 20 件，因此主要問題是客戶收到的商品數量不足。選項 B（延遲）、C（錯誤型號）和 A（付款問題）均未在郵件中被提及為主要問題。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "confirmation",
      "complaint",
      "resolution",
      "packing slip"
    ],
    "passage": "Email 1: Order Confirmation\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 10, 2024\nSubject: Order #INV-7842 Confirmation\n\nDear Ms. Johnson, \nThank you for your order placed on June 8, 2024. We are pleased to confirm your purchase of 50 units of the Model X-2000 Processor (Part #XP-2000) at $150 each, for a total of $7,500. The items are scheduled to be shipped on June 15, 2024, via FastTrack Logistics, with an estimated delivery date of June 20, 2024. Payment of $7,500 was processed via credit card ending in 4321. Please review the details below and contact us if any adjustments are needed. We appreciate your business.\n\nSincerely,\nPremium Parts Customer Service\n\n---\n\nEmail 2: Follow-up Complaint\nFrom: sarah.johnson@brightech.com\nTo: orders@premiumparts.com\nDate: June 18, 2024\nSubject: Order #INV-7842 – Missing Items\n\nDear Premium Parts Team,\nWe received a shipment today from FastTrack Logistics, but it contained only 30 units of the Model X-2000 Processor instead of the 50 we ordered. The packing slip in the box also lists only 30 units. Could you please check your records and arrange for the remaining 20 units to be sent as soon as possible? Our production line is waiting for these parts. Thank you for your prompt attention.\n\nBest regards,\nSarah Johnson\nBrightech Manufacturing\n\n---\n\nEmail 3: Resolution Reply\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 20, 2024\nSubject: Re: Order #INV-7842 – Missing Items\n\nDear Ms. Johnson,\nWe apologize for the error with your order. Our warehouse team confirms that 50 units were packed, but due to a labeling mistake, only 30 were loaded onto the truck. The remaining 20 units were shipped separately yesterday, June 19, 2024, via Swift Courier. The new tracking number is SW-9876, and the estimated delivery is June 22, 2024. We have also issued a $75 credit to your account as compensation for the inconvenience. Please let us know if you have further questions.\n\nSincerely,\nPremium Parts Customer Service",
    "passage_group_id": "p7-exp-009",
    "passage_group_type": "triple",
    "question_order": 1
  },
  {
    "id": "p7-gen-236",
    "part": "Part 7",
    "question": "According to the first email, what was the original shipping method for the order?",
    "choices": {
      "A": "Swift Courier",
      "B": "Premium Parts Logistics",
      "C": "FastTrack Logistics",
      "D": "Brightech Manufacturing"
    },
    "answer": "C",
    "explanation_zh": "答案是 C。第一封郵件明確寫道：「The items are scheduled to be shipped on June 15, 2024, via FastTrack Logistics」，因此原始運送方式為 FastTrack Logistics。選項 A（Swift Courier）是第三封郵件中補寄時使用的快遞，選項 B 和 D 則未出現。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "shipping method",
      "tracking number",
      "logistics"
    ],
    "passage": "Email 1: Order Confirmation\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 10, 2024\nSubject: Order #INV-7842 Confirmation\n\nDear Ms. Johnson, \nThank you for your order placed on June 8, 2024. We are pleased to confirm your purchase of 50 units of the Model X-2000 Processor (Part #XP-2000) at $150 each, for a total of $7,500. The items are scheduled to be shipped on June 15, 2024, via FastTrack Logistics, with an estimated delivery date of June 20, 2024. Payment of $7,500 was processed via credit card ending in 4321. Please review the details below and contact us if any adjustments are needed. We appreciate your business.\n\nSincerely,\nPremium Parts Customer Service\n\n---\n\nEmail 2: Follow-up Complaint\nFrom: sarah.johnson@brightech.com\nTo: orders@premiumparts.com\nDate: June 18, 2024\nSubject: Order #INV-7842 – Missing Items\n\nDear Premium Parts Team,\nWe received a shipment today from FastTrack Logistics, but it contained only 30 units of the Model X-2000 Processor instead of the 50 we ordered. The packing slip in the box also lists only 30 units. Could you please check your records and arrange for the remaining 20 units to be sent as soon as possible? Our production line is waiting for these parts. Thank you for your prompt attention.\n\nBest regards,\nSarah Johnson\nBrightech Manufacturing\n\n---\n\nEmail 3: Resolution Reply\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 20, 2024\nSubject: Re: Order #INV-7842 – Missing Items\n\nDear Ms. Johnson,\nWe apologize for the error with your order. Our warehouse team confirms that 50 units were packed, but due to a labeling mistake, only 30 were loaded onto the truck. The remaining 20 units were shipped separately yesterday, June 19, 2024, via Swift Courier. The new tracking number is SW-9876, and the estimated delivery is June 22, 2024. We have also issued a $75 credit to your account as compensation for the inconvenience. Please let us know if you have further questions.\n\nSincerely,\nPremium Parts Customer Service",
    "passage_group_id": "p7-exp-009",
    "passage_group_type": "triple",
    "question_order": 2
  },
  {
    "id": "p7-gen-237",
    "part": "Part 7",
    "question": "What action did Premium Parts take to compensate for the error?",
    "choices": {
      "A": "They issued a $75 credit to the customer's account",
      "B": "They offered a free replacement for the missing units",
      "C": "They upgraded the shipping to overnight delivery",
      "D": "They refunded the full order amount"
    },
    "answer": "A",
    "explanation_zh": "答案是 A。第三封郵件指出：「We have also issued a $75 credit to your account as compensation for the inconvenience」，因此補償方式是提供 75 美元帳戶折抵。選項 B（免費更換）、D（全額退款）和 C（升級為隔夜運送）均未在郵件中提及。",
    "skill_tag": "reading_inference",
    "difficulty": "B2",
    "vocabulary": [
      "compensation",
      "credit",
      "account"
    ],
    "passage": "Email 1: Order Confirmation\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 10, 2024\nSubject: Order #INV-7842 Confirmation\n\nDear Ms. Johnson, \nThank you for your order placed on June 8, 2024. We are pleased to confirm your purchase of 50 units of the Model X-2000 Processor (Part #XP-2000) at $150 each, for a total of $7,500. The items are scheduled to be shipped on June 15, 2024, via FastTrack Logistics, with an estimated delivery date of June 20, 2024. Payment of $7,500 was processed via credit card ending in 4321. Please review the details below and contact us if any adjustments are needed. We appreciate your business.\n\nSincerely,\nPremium Parts Customer Service\n\n---\n\nEmail 2: Follow-up Complaint\nFrom: sarah.johnson@brightech.com\nTo: orders@premiumparts.com\nDate: June 18, 2024\nSubject: Order #INV-7842 – Missing Items\n\nDear Premium Parts Team,\nWe received a shipment today from FastTrack Logistics, but it contained only 30 units of the Model X-2000 Processor instead of the 50 we ordered. The packing slip in the box also lists only 30 units. Could you please check your records and arrange for the remaining 20 units to be sent as soon as possible? Our production line is waiting for these parts. Thank you for your prompt attention.\n\nBest regards,\nSarah Johnson\nBrightech Manufacturing\n\n---\n\nEmail 3: Resolution Reply\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 20, 2024\nSubject: Re: Order #INV-7842 – Missing Items\n\nDear Ms. Johnson,\nWe apologize for the error with your order. Our warehouse team confirms that 50 units were packed, but due to a labeling mistake, only 30 were loaded onto the truck. The remaining 20 units were shipped separately yesterday, June 19, 2024, via Swift Courier. The new tracking number is SW-9876, and the estimated delivery is June 22, 2024. We have also issued a $75 credit to your account as compensation for the inconvenience. Please let us know if you have further questions.\n\nSincerely,\nPremium Parts Customer Service",
    "passage_group_id": "p7-exp-009",
    "passage_group_type": "triple",
    "question_order": 3
  },
  {
    "id": "p7-gen-238",
    "part": "Part 7",
    "question": "What can be inferred about the initial shipment received by Sarah Johnson?",
    "choices": {
      "A": "It included all 50 units but some were damaged",
      "B": "It arrived with a packing slip that matched the actual contents",
      "C": "It was delivered earlier than the estimated date",
      "D": "It was sent via Swift Courier instead of FastTrack Logistics"
    },
    "answer": "B",
    "explanation_zh": "答案是 B。第二封郵件提到：「The packing slip in the box also lists only 30 units」，表示送貨單上的數量與實際收到的 30 件相符。選項 C（早於預估日期送達）無法推斷，選項 D（使用 Swift Courier）錯誤，選項 A（50 件但部分損壞）與郵件內容不符。",
    "skill_tag": "reading_detail",
    "difficulty": "B2",
    "vocabulary": [
      "inferred",
      "packing slip",
      "contents"
    ],
    "passage": "Email 1: Order Confirmation\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 10, 2024\nSubject: Order #INV-7842 Confirmation\n\nDear Ms. Johnson, \nThank you for your order placed on June 8, 2024. We are pleased to confirm your purchase of 50 units of the Model X-2000 Processor (Part #XP-2000) at $150 each, for a total of $7,500. The items are scheduled to be shipped on June 15, 2024, via FastTrack Logistics, with an estimated delivery date of June 20, 2024. Payment of $7,500 was processed via credit card ending in 4321. Please review the details below and contact us if any adjustments are needed. We appreciate your business.\n\nSincerely,\nPremium Parts Customer Service\n\n---\n\nEmail 2: Follow-up Complaint\nFrom: sarah.johnson@brightech.com\nTo: orders@premiumparts.com\nDate: June 18, 2024\nSubject: Order #INV-7842 – Missing Items\n\nDear Premium Parts Team,\nWe received a shipment today from FastTrack Logistics, but it contained only 30 units of the Model X-2000 Processor instead of the 50 we ordered. The packing slip in the box also lists only 30 units. Could you please check your records and arrange for the remaining 20 units to be sent as soon as possible? Our production line is waiting for these parts. Thank you for your prompt attention.\n\nBest regards,\nSarah Johnson\nBrightech Manufacturing\n\n---\n\nEmail 3: Resolution Reply\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 20, 2024\nSubject: Re: Order #INV-7842 – Missing Items\n\nDear Ms. Johnson,\nWe apologize for the error with your order. Our warehouse team confirms that 50 units were packed, but due to a labeling mistake, only 30 were loaded onto the truck. The remaining 20 units were shipped separately yesterday, June 19, 2024, via Swift Courier. The new tracking number is SW-9876, and the estimated delivery is June 22, 2024. We have also issued a $75 credit to your account as compensation for the inconvenience. Please let us know if you have further questions.\n\nSincerely,\nPremium Parts Customer Service",
    "passage_group_id": "p7-exp-009",
    "passage_group_type": "triple",
    "question_order": 4
  },
  {
    "id": "p7-gen-239",
    "part": "Part 7",
    "question": "Based on the three emails, what is the difference between the original shipping date and the date the missing items were sent?",
    "choices": {
      "A": "The missing items were sent before the original shipment",
      "B": "The original shipment was sent on June 15; the missing items were sent on June 19",
      "C": "The original shipment was sent on June 10; the missing items were sent on June 18",
      "D": "Both shipments were sent on the same date"
    },
    "answer": "B",
    "explanation_zh": "答案是 B。第一封郵件指出原始貨物於 6 月 15 日出貨，第三封郵件則說明補寄的 20 件於 6 月 19 日出貨，因此兩者相差 4 天。選項 C（6 月 10 日與 6 月 18 日）日期錯誤，選項 D（同一天）和 A（補寄更早）均不正確。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B2",
    "vocabulary": [
      "original shipment",
      "missing items",
      "shipped separately"
    ],
    "passage": "Email 1: Order Confirmation\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 10, 2024\nSubject: Order #INV-7842 Confirmation\n\nDear Ms. Johnson, \nThank you for your order placed on June 8, 2024. We are pleased to confirm your purchase of 50 units of the Model X-2000 Processor (Part #XP-2000) at $150 each, for a total of $7,500. The items are scheduled to be shipped on June 15, 2024, via FastTrack Logistics, with an estimated delivery date of June 20, 2024. Payment of $7,500 was processed via credit card ending in 4321. Please review the details below and contact us if any adjustments are needed. We appreciate your business.\n\nSincerely,\nPremium Parts Customer Service\n\n---\n\nEmail 2: Follow-up Complaint\nFrom: sarah.johnson@brightech.com\nTo: orders@premiumparts.com\nDate: June 18, 2024\nSubject: Order #INV-7842 – Missing Items\n\nDear Premium Parts Team,\nWe received a shipment today from FastTrack Logistics, but it contained only 30 units of the Model X-2000 Processor instead of the 50 we ordered. The packing slip in the box also lists only 30 units. Could you please check your records and arrange for the remaining 20 units to be sent as soon as possible? Our production line is waiting for these parts. Thank you for your prompt attention.\n\nBest regards,\nSarah Johnson\nBrightech Manufacturing\n\n---\n\nEmail 3: Resolution Reply\nFrom: orders@premiumparts.com\nTo: sarah.johnson@brightech.com\nDate: June 20, 2024\nSubject: Re: Order #INV-7842 – Missing Items\n\nDear Ms. Johnson,\nWe apologize for the error with your order. Our warehouse team confirms that 50 units were packed, but due to a labeling mistake, only 30 were loaded onto the truck. The remaining 20 units were shipped separately yesterday, June 19, 2024, via Swift Courier. The new tracking number is SW-9876, and the estimated delivery is June 22, 2024. We have also issued a $75 credit to your account as compensation for the inconvenience. Please let us know if you have further questions.\n\nSincerely,\nPremium Parts Customer Service",
    "passage_group_id": "p7-exp-009",
    "passage_group_type": "triple",
    "question_order": 5
  },
  {
    "id": "p7-gen-240",
    "part": "Part 7",
    "question": "What is the main issue in Jennifer's complaint?",
    "choices": {
      "A": "The book arrived damaged and late.",
      "B": "She did not receive the order at all.",
      "C": "The book was not the one she ordered.",
      "D": "The book was missing some pages."
    },
    "answer": "A",
    "explanation_zh": "答案是A。Jennifer在Email 1中明確指出書本有破損（torn cover and water stains）且延遲三天送達（came three days late），因此主要問題是書本受損且遲到。選項C（書本非訂購品）、B（未收到訂單）、D（缺頁）均未在文中提及。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "torn",
      "water stains",
      "disappointed",
      "expedited"
    ],
    "passage": "Email 1\nTo: support@greenleafbooks.com\nFrom: jennifer.ross@email.com\nSubject: Damaged book order #47392\nDear Customer Service,\nI received my order #47392 today, but the book \"The Art of Stillness\" arrived with a torn cover and water stains on several pages. This was meant to be a gift for my friend's birthday next week, so I am very disappointed. I placed the order on May 10th, and it was supposed to arrive by May 20th, but it came three days late. I would like a replacement sent as soon as possible, or a full refund. Please let me know how you can resolve this.\nThank you,\nJennifer Ross\n\nEmail 2\nTo: jennifer.ross@email.com\nFrom: support@greenleafbooks.com\nSubject: Re: Damaged book order #47392\nDear Ms. Ross,\nThank you for reaching out to us. We sincerely apologize for the damaged book and the delay in delivery. We understand your frustration, especially as it was intended as a gift. We have issued a replacement copy of \"The Art of Stillness\" with expedited shipping at no extra cost, which should arrive within two business days. You may keep the damaged book or discard it. If you prefer a refund instead, please let us know within 48 hours. We have also applied a 10% discount code (WELCOME10) to your account for your next purchase. We value your business and hope to restore your trust.\nBest regards,\nCustomer Service Team",
    "passage_group_id": "p7-exp-010",
    "passage_group_type": "double",
    "question_order": 1
  },
  {
    "id": "p7-gen-241",
    "part": "Part 7",
    "question": "When did Jennifer's order actually arrive?",
    "choices": {
      "A": "May 23rd",
      "B": "May 10th",
      "C": "May 20th",
      "D": "May 17th"
    },
    "answer": "A",
    "explanation_zh": "答案是A。Jennifer在Email 1中說訂單應在5月20日送達（supposed to arrive by May 20th），但遲到三天（came three days late），因此實際送達日為5月23日。選項B（5月10日）為下單日，選項C（5月20日）為預定送達日，選項D（5月17日）未出現。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "placed",
      "supposed to",
      "arrive",
      "late"
    ],
    "passage": "Email 1\nTo: support@greenleafbooks.com\nFrom: jennifer.ross@email.com\nSubject: Damaged book order #47392\nDear Customer Service,\nI received my order #47392 today, but the book \"The Art of Stillness\" arrived with a torn cover and water stains on several pages. This was meant to be a gift for my friend's birthday next week, so I am very disappointed. I placed the order on May 10th, and it was supposed to arrive by May 20th, but it came three days late. I would like a replacement sent as soon as possible, or a full refund. Please let me know how you can resolve this.\nThank you,\nJennifer Ross\n\nEmail 2\nTo: jennifer.ross@email.com\nFrom: support@greenleafbooks.com\nSubject: Re: Damaged book order #47392\nDear Ms. Ross,\nThank you for reaching out to us. We sincerely apologize for the damaged book and the delay in delivery. We understand your frustration, especially as it was intended as a gift. We have issued a replacement copy of \"The Art of Stillness\" with expedited shipping at no extra cost, which should arrive within two business days. You may keep the damaged book or discard it. If you prefer a refund instead, please let us know within 48 hours. We have also applied a 10% discount code (WELCOME10) to your account for your next purchase. We value your business and hope to restore your trust.\nBest regards,\nCustomer Service Team",
    "passage_group_id": "p7-exp-010",
    "passage_group_type": "double",
    "question_order": 2
  },
  {
    "id": "p7-gen-242",
    "part": "Part 7",
    "question": "What resolution does the customer service team offer for the damaged book?",
    "choices": {
      "A": "A full refund without returning the book",
      "B": "A 10% discount on the next purchase only",
      "C": "A replacement with expedited shipping at no charge",
      "D": "A credit for a future purchase worth the book's price"
    },
    "answer": "C",
    "explanation_zh": "答案是C。客服在Email 2中提出以加急運送免費寄送替換書（issued a replacement copy with expedited shipping at no extra cost）。選項A（全額退款但無需退書）是替代方案，非針對受損書的主要解決方式；選項D（未來購物抵用金）未提及；選項B（僅下次購物10%折扣）是額外補償，非針對受損書的解決方案。",
    "skill_tag": "reading_inference",
    "difficulty": "B1",
    "vocabulary": [
      "replacement",
      "expedited shipping",
      "no extra cost",
      "discount code"
    ],
    "passage": "Email 1\nTo: support@greenleafbooks.com\nFrom: jennifer.ross@email.com\nSubject: Damaged book order #47392\nDear Customer Service,\nI received my order #47392 today, but the book \"The Art of Stillness\" arrived with a torn cover and water stains on several pages. This was meant to be a gift for my friend's birthday next week, so I am very disappointed. I placed the order on May 10th, and it was supposed to arrive by May 20th, but it came three days late. I would like a replacement sent as soon as possible, or a full refund. Please let me know how you can resolve this.\nThank you,\nJennifer Ross\n\nEmail 2\nTo: jennifer.ross@email.com\nFrom: support@greenleafbooks.com\nSubject: Re: Damaged book order #47392\nDear Ms. Ross,\nThank you for reaching out to us. We sincerely apologize for the damaged book and the delay in delivery. We understand your frustration, especially as it was intended as a gift. We have issued a replacement copy of \"The Art of Stillness\" with expedited shipping at no extra cost, which should arrive within two business days. You may keep the damaged book or discard it. If you prefer a refund instead, please let us know within 48 hours. We have also applied a 10% discount code (WELCOME10) to your account for your next purchase. We value your business and hope to restore your trust.\nBest regards,\nCustomer Service Team",
    "passage_group_id": "p7-exp-010",
    "passage_group_type": "double",
    "question_order": 3
  },
  {
    "id": "p7-gen-243",
    "part": "Part 7",
    "question": "What can be inferred about Jennifer's reason for ordering the book?",
    "choices": {
      "A": "She intended it as a birthday present for a friend.",
      "B": "She ordered it for herself to read on vacation.",
      "C": "She needed it for a work-related project.",
      "D": "She bought it as a replacement for a lost copy."
    },
    "answer": "A",
    "explanation_zh": "答案是A。Jennifer在Email 1中說明這本書是朋友下週生日的禮物（meant to be a gift for my friend's birthday next week）。選項C（工作項目）、B（自己度假閱讀）、D（替代遺失書本）均未在文中提及。",
    "skill_tag": "reading_detail",
    "difficulty": "B1",
    "vocabulary": [
      "intended as a gift",
      "birthday",
      "frustration",
      "trust"
    ],
    "passage": "Email 1\nTo: support@greenleafbooks.com\nFrom: jennifer.ross@email.com\nSubject: Damaged book order #47392\nDear Customer Service,\nI received my order #47392 today, but the book \"The Art of Stillness\" arrived with a torn cover and water stains on several pages. This was meant to be a gift for my friend's birthday next week, so I am very disappointed. I placed the order on May 10th, and it was supposed to arrive by May 20th, but it came three days late. I would like a replacement sent as soon as possible, or a full refund. Please let me know how you can resolve this.\nThank you,\nJennifer Ross\n\nEmail 2\nTo: jennifer.ross@email.com\nFrom: support@greenleafbooks.com\nSubject: Re: Damaged book order #47392\nDear Ms. Ross,\nThank you for reaching out to us. We sincerely apologize for the damaged book and the delay in delivery. We understand your frustration, especially as it was intended as a gift. We have issued a replacement copy of \"The Art of Stillness\" with expedited shipping at no extra cost, which should arrive within two business days. You may keep the damaged book or discard it. If you prefer a refund instead, please let us know within 48 hours. We have also applied a 10% discount code (WELCOME10) to your account for your next purchase. We value your business and hope to restore your trust.\nBest regards,\nCustomer Service Team",
    "passage_group_id": "p7-exp-010",
    "passage_group_type": "double",
    "question_order": 4
  },
  {
    "id": "p7-gen-244",
    "part": "Part 7",
    "question": "According to both emails, what action must Jennifer take if she wants a refund instead of a replacement?",
    "choices": {
      "A": "Wait for the replacement to arrive before deciding.",
      "B": "Return the damaged book to the company.",
      "C": "Reply to the customer service within 48 hours.",
      "D": "Use the discount code WELCOME10 first."
    },
    "answer": "C",
    "explanation_zh": "答案是C。客服在Email 2中明確表示如果Jennifer偏好退款，需在48小時內告知（if you prefer a refund instead, please let us know within 48 hours）。選項B（退回受損書）未要求；選項D（先使用折扣碼）是額外優惠，非退款條件；選項A（等待替換書送達再決定）與客服要求不符。",
    "skill_tag": "reading_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "refund",
      "replacement",
      "within 48 hours",
      "discount code"
    ],
    "passage": "Email 1\nTo: support@greenleafbooks.com\nFrom: jennifer.ross@email.com\nSubject: Damaged book order #47392\nDear Customer Service,\nI received my order #47392 today, but the book \"The Art of Stillness\" arrived with a torn cover and water stains on several pages. This was meant to be a gift for my friend's birthday next week, so I am very disappointed. I placed the order on May 10th, and it was supposed to arrive by May 20th, but it came three days late. I would like a replacement sent as soon as possible, or a full refund. Please let me know how you can resolve this.\nThank you,\nJennifer Ross\n\nEmail 2\nTo: jennifer.ross@email.com\nFrom: support@greenleafbooks.com\nSubject: Re: Damaged book order #47392\nDear Ms. Ross,\nThank you for reaching out to us. We sincerely apologize for the damaged book and the delay in delivery. We understand your frustration, especially as it was intended as a gift. We have issued a replacement copy of \"The Art of Stillness\" with expedited shipping at no extra cost, which should arrive within two business days. You may keep the damaged book or discard it. If you prefer a refund instead, please let us know within 48 hours. We have also applied a 10% discount code (WELCOME10) to your account for your next purchase. We value your business and hope to restore your trust.\nBest regards,\nCustomer Service Team",
    "passage_group_id": "p7-exp-010",
    "passage_group_type": "double",
    "question_order": 5
  },
  {
    "id": "p1-gen-031",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "Some people are looking at a presentation on a screen.",
      "B": "The woman is writing on a whiteboard.",
      "C": "The colleagues are shaking hands with each other.",
      "D": "The woman is handing out printed documents."
    },
    "answer": "A",
    "explanation_zh": "正確答案是 A。照片中顯示一位女士正在會議室裡對一群同事進行簡報，螢幕上顯示圖表，因此「有些人正在看螢幕上的簡報」與畫面完全相符。B 選項「女士正在白板上寫字」錯誤，因為她並未使用白板。C 選項「同事們正在互相握手」錯誤，畫面中沒有握手的動作。D 選項「女士正在分發印刷文件」錯誤，她沒有分發任何文件。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "presentation",
      "screen",
      "colleagues",
      "meeting room"
    ],
    "imageAlt": "A woman in a business suit is presenting charts on a screen to a small group of colleagues in a modern meeting room.",
    "audioScript": "(A) Some people are looking at a presentation on a screen.\n(B) The woman is writing on a whiteboard.\n(C) The colleagues are shaking hands with each other.\n(D) The woman is handing out printed documents."
  },
  {
    "id": "p1-gen-032",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The worker is wearing a helmet and operating a forklift.",
      "B": "A person in protective gear is examining equipment.",
      "C": "Machinery is being repaired by two technicians.",
      "D": "Several boxes are stacked near the factory entrance."
    },
    "answer": "B",
    "explanation_zh": "正確答案是 B。照片中一位戴安全帽、穿安全背心的工人正在檢查大型機械，因此「穿著防護裝備的人正在檢查設備」與畫面相符。A 選項「工人戴頭盔並操作堆高機」錯誤，他並未操作堆高機。C 選項「機械正由兩名技術人員修理」錯誤，畫面中只有一人且未進行修理。D 選項「幾個箱子堆疊在工廠入口附近」錯誤，畫面中沒有箱子或入口。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "protective gear",
      "inspecting",
      "equipment",
      "factory floor"
    ],
    "imageAlt": "A worker in a hard hat and safety vest is inspecting a large piece of machinery on a factory floor.",
    "audioScript": "(A) The worker is wearing a helmet and operating a forklift.\n(B) A person in protective gear is examining equipment.\n(C) Machinery is being repaired by two technicians.\n(D) Several boxes are stacked near the factory entrance."
  },
  {
    "id": "p1-gen-033",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The chef is washing vegetables in the sink.",
      "B": "The chef is taking a break and drinking coffee.",
      "C": "A meal is being prepared by a cook.",
      "D": "Several waiters are carrying plates to tables."
    },
    "answer": "C",
    "explanation_zh": "正確答案是 C。照片中一位穿白色制服的廚師正在商業廚房裡將彩色蔬菜擺盤，因此「廚師正在準備餐點」與畫面相符。A 選項「廚師正在水槽洗蔬菜」錯誤，他正在擺盤而非清洗。B 選項「廚師正在休息喝咖啡」錯誤，他正在工作。D 選項「幾名服務生正端著盤子走向餐桌」錯誤，畫面中沒有服務生。",
    "skill_tag": "listening_photo",
    "difficulty": "A2",
    "vocabulary": [
      "chef",
      "plating",
      "commercial kitchen",
      "vegetables"
    ],
    "imageAlt": "A chef in a white uniform is plating a dish with colorful vegetables in a commercial kitchen.",
    "audioScript": "(A) The chef is washing vegetables in the sink.\n(B) The chef is taking a break and drinking coffee.\n(C) A meal is being prepared by a cook.\n(D) Several waiters are carrying plates to tables."
  },
  {
    "id": "p1-gen-034",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "A passenger is checking in at the counter.",
      "B": "A woman is sitting on a bench reading a book.",
      "C": "Several people are boarding an airplane.",
      "D": "The man is pushing a luggage cart and using his phone."
    },
    "answer": "D",
    "explanation_zh": "正確答案是 D。照片中一位穿西裝的男子在機場航站樓推著裝滿行李的推車，同時看著手機，因此「男子正在推行李車並使用手機」與畫面相符。A 選項「乘客正在櫃檯辦理登機」錯誤，他不在櫃檯。B 選項「一位女士坐在長椅上讀書」錯誤，畫面中沒有女士。C 選項「幾個人正在登機」錯誤，畫面中沒有登機動作。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "luggage cart",
      "airport terminal",
      "passenger",
      "phone"
    ],
    "imageAlt": "A man in a suit is pushing a cart full of luggage through an airport terminal while looking at his phone.",
    "audioScript": "(A) A passenger is checking in at the counter.\n(B) A woman is sitting on a bench reading a book.\n(C) Several people are boarding an airplane.\n(D) The man is pushing a luggage cart and using his phone."
  },
  {
    "id": "p1-gen-035",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The employees are stocking shelves with merchandise.",
      "B": "A customer is paying at the cash register.",
      "C": "The store is completely empty of shoppers.",
      "D": "Two workers are cleaning the store windows."
    },
    "answer": "A",
    "explanation_zh": "正確答案是 A。照片中三名零售員工正在貨架上擺放商品，背景中有一位顧客在看展示，因此「員工正在貨架上補充商品」與畫面相符。B 選項「顧客正在收銀機前付款」錯誤，沒有付款動作。C 選項「商店完全沒有顧客」錯誤，背景中有一位顧客。D 選項「兩名工人正在清潔商店窗戶」錯誤，他們在整理貨架而非清潔窗戶。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "stocking shelves",
      "merchandise",
      "employees",
      "display"
    ],
    "imageAlt": "Three retail employees are arranging products on shelves while a customer looks at a display in the background.",
    "audioScript": "(A) The employees are stocking shelves with merchandise.\n(B) A customer is paying at the cash register.\n(C) The store is completely empty of shoppers.\n(D) Two workers are cleaning the store windows."
  },
  {
    "id": "p1-gen-036",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are discussing a contract at a desk.",
      "B": "They are shaking hands in a lobby.",
      "C": "They are walking through the office corridor.",
      "D": "They are standing in an elevator."
    },
    "answer": "B",
    "explanation_zh": "正確答案是 B。照片中一位穿西裝的男士與一位穿套裝的女士在現代化辦公大廳握手，與選項 B「他們在大廳握手」完全吻合。選項 A「他們在桌前討論合約」錯誤，因為照片中沒有桌子；選項 C「他們正走過辦公室走廊」錯誤，因為他們靜止站立而非行走；選項 D「他們站在電梯裡」錯誤，因為背景是大廳而非電梯內部。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "shaking hands",
      "lobby",
      "suit",
      "modern",
      "office"
    ],
    "imageAlt": "A man in a suit is shaking hands with a woman in a business suit in a modern office lobby.",
    "audioScript": "(A) They are discussing a contract at a desk.\n(B) They are shaking hands in a lobby.\n(C) They are walking through the office corridor.\n(D) They are standing in an elevator."
  },
  {
    "id": "p1-gen-037",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The worker is repairing a broken machine.",
      "B": "The worker is painting the equipment.",
      "C": "The worker is inspecting machinery on the floor.",
      "D": "The worker is operating a computer terminal."
    },
    "answer": "C",
    "explanation_zh": "正確答案是 C。照片中一位戴安全帽的工廠工人正在生產車間檢查大型機械，與選項 C「工人正在檢查車間裡的機器」完全吻合。選項 A「工人正在修理故障機器」錯誤，因為沒有修理動作；選項 B「工人正在為設備噴漆」錯誤，因為沒有噴漆跡象；選項 D「工人正在操作電腦終端」錯誤，因為照片中沒有電腦。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "hard hat",
      "inspecting",
      "machinery",
      "production",
      "floor"
    ],
    "imageAlt": "A factory worker wearing a hard hat is inspecting a large piece of machinery on the production floor.",
    "audioScript": "(A) The worker is repairing a broken machine.\n(B) The worker is painting the equipment.\n(C) The worker is inspecting machinery on the floor.\n(D) The worker is operating a computer terminal."
  },
  {
    "id": "p1-gen-038",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are having lunch in the cafeteria.",
      "B": "They are cleaning the conference table.",
      "C": "They are waiting for a bus at a station.",
      "D": "They are collaborating on a project using a laptop."
    },
    "answer": "D",
    "explanation_zh": "正確答案是 D。照片中三人圍坐在會議室的桌子旁，看著一臺筆記型電腦螢幕，與選項 D「他們正在使用筆記型電腦合作一個專案」完全吻合。選項 A「他們在自助餐廳吃午餐」錯誤，因為背景是會議室而非餐廳；選項 B「他們正在清潔會議桌」錯誤，因為沒有清潔動作；選項 C「他們在車站等公車」錯誤，因為場景是室內會議室而非車站。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "conference room",
      "laptop",
      "collaborating",
      "project",
      "table"
    ],
    "imageAlt": "A group of three people are sitting around a table in a conference room, looking at a laptop screen.",
    "audioScript": "(A) They are having lunch in the cafeteria.\n(B) They are cleaning the conference table.\n(C) They are waiting for a bus at a station.\n(D) They are collaborating on a project using a laptop."
  },
  {
    "id": "p1-gen-039",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The delivery person is carrying boxes into a store.",
      "B": "The delivery person is unloading boxes from a truck.",
      "C": "The store employee is stacking boxes on the shelf.",
      "D": "The customer is picking up a package from the counter."
    },
    "answer": "A",
    "explanation_zh": "正確答案是 A。照片中一位穿制服的送貨員正抱著一疊紙箱走進一家玻璃門面的零售店，與選項 A「送貨員正抱著箱子走進商店」完全吻合。選項 B「送貨員正從卡車上卸貨」錯誤，因為照片中沒有卡車；選項 C「商店員工正在貨架上堆放箱子」錯誤，因為人物是送貨員而非員工，且未在貨架前；選項 D「顧客正在櫃檯領取包裹」錯誤，因為人物是送貨員而非顧客。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "delivery person",
      "uniform",
      "cardboard boxes",
      "retail store",
      "carrying"
    ],
    "imageAlt": "A delivery person in uniform is carrying a stack of cardboard boxes into a retail store with a glass front.",
    "audioScript": "(A) The delivery person is carrying boxes into a store.\n(B) The delivery person is unloading boxes from a truck.\n(C) The store employee is stacking boxes on the shelf.\n(D) The customer is picking up a package from the counter."
  },
  {
    "id": "p1-gen-040",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The chef is serving food to customers at a table.",
      "B": "The chef is arranging plates on a counter.",
      "C": "The chef is washing dishes in the sink.",
      "D": "The chef is chopping vegetables on a cutting board."
    },
    "answer": "B",
    "explanation_zh": "正確答案是 B。照片中一位穿廚師圍裙的女性正在餐廳廚房的鋼製檯面上擺放餐盤，與選項 B「廚師正在檯面上擺放餐盤」完全吻合。選項 A「廚師正在餐桌上為顧客上菜」錯誤，因為背景是廚房而非餐桌；選項 C「廚師正在水槽裡洗碗」錯誤，因為沒有水槽或洗碗動作；選項 D「廚師正在砧板上切蔬菜」錯誤，因為沒有切菜動作或砧板。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "chef",
      "apron",
      "arranging",
      "plates",
      "stainless steel",
      "counter"
    ],
    "imageAlt": "A woman in a chef's apron is arranging plates of food on a stainless steel counter in a restaurant kitchen.",
    "audioScript": "(A) The chef is serving food to customers at a table.\n(B) The chef is arranging plates on a counter.\n(C) The chef is washing dishes in the sink.\n(D) The chef is chopping vegetables on a cutting board."
  },
  {
    "id": "p1-gen-041",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "Some people are standing near the window.",
      "B": "All participants are reading papers.",
      "C": "A woman is pointing at the laptop.",
      "D": "The room is empty."
    },
    "answer": "C",
    "explanation_zh": "正確答案為 C。照片中顯示一群專業人士圍坐在會議桌旁，看著筆記型電腦螢幕。選項 C「一位女士正指著筆記型電腦」與照片相符，因為有人正在指向電腦。選項 A「有些人站在窗邊」不正確，因為照片中無人站立。選項 B「所有與會者都在閱讀文件」不正確，因為他們在看電腦而非文件。選項 D「房間是空的」明顯錯誤，因為房間裡有人。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "conference table",
      "laptop",
      "pointing",
      "participants",
      "reading",
      "empty"
    ],
    "imageAlt": "A woman points at a laptop screen while business professionals sit around a conference table and look at it.",
    "audioScript": "(A) Some people are standing near the window.\n(B) All participants are reading papers.\n(C) A woman is pointing at the laptop.\n(D) The room is empty."
  },
  {
    "id": "p1-gen-042",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The worker is driving a truck.",
      "B": "Boxes are being stacked on the floor.",
      "C": "Several people are resting near the shelves.",
      "D": "A forklift is lifting a pallet of boxes."
    },
    "answer": "D",
    "explanation_zh": "正確答案為 D。照片中顯示一名倉庫工人使用堆高機將箱子堆疊到棧板上。選項 D「堆高機正在舉起一棧板的箱子」與照片相符。選項 A「工人正在駕駛卡車」不正確，因為他操作的是堆高機而非卡車。選項 B「箱子正被堆疊在地板上」不正確，因為箱子是堆在棧板上。選項 C「有幾個人正在架子附近休息」不正確，因為照片中只有一名工人。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "stacking",
      "pallet",
      "forklift",
      "lifting",
      "warehouse",
      "storage facility"
    ],
    "imageAlt": "A warehouse worker is stacking boxes onto a pallet using a forklift in a large storage facility.",
    "audioScript": "(A) The worker is driving a truck.\n(B) Boxes are being stacked on the floor.\n(C) Several people are resting near the shelves.\n(D) A forklift is lifting a pallet of boxes."
  },
  {
    "id": "p1-gen-043",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "A cup of coffee is being prepared.",
      "B": "The customer is paying with cash.",
      "C": "The barista is cleaning the counter.",
      "D": "Two people are sitting at a table."
    },
    "answer": "A",
    "explanation_zh": "正確答案為 A。照片中顯示一名咖啡師正在將蒸奶倒入咖啡杯中。選項 A「一杯咖啡正在被準備」與照片相符。選項 B「顧客正在用現金付款」不正確，因為照片中沒有顧客。選項 C「咖啡師正在清潔櫃檯」不正確，因為他在倒牛奶而非清潔。選項 D「兩個人正坐在桌子旁」不正確，因為照片中無人坐下。",
    "skill_tag": "listening_photo",
    "difficulty": "A2",
    "vocabulary": [
      "barista",
      "pouring",
      "steamed milk",
      "coffee cup",
      "counter",
      "prepared"
    ],
    "imageAlt": "A barista is pouring steamed milk into a coffee cup at a busy coffee shop counter.",
    "audioScript": "(A) A cup of coffee is being prepared.\n(B) The customer is paying with cash.\n(C) The barista is cleaning the counter.\n(D) Two people are sitting at a table."
  },
  {
    "id": "p1-gen-044",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "Passengers are getting off the train.",
      "B": "A ticket is being inspected near the train door.",
      "C": "The conductor is talking on the phone.",
      "D": "The platform is completely empty."
    },
    "answer": "B",
    "explanation_zh": "正確答案為 B。照片中顯示一名列車長在月臺上檢查乘客的車票。選項 B「一張車票正在車門附近被檢查」與照片相符。選項 A「乘客正在下車」不正確，因為他們正在上車。選項 C「列車長正在講電話」不正確，因為他在檢查車票。選項 D「月臺完全空無一人」不正確，因為月臺上有乘客。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "conductor",
      "checking",
      "tickets",
      "boarding",
      "commuter train",
      "platform"
    ],
    "imageAlt": "A train conductor is checking tickets as passengers board a commuter train at a station platform.",
    "audioScript": "(A) Passengers are getting off the train.\n(B) A ticket is being inspected near the train door.\n(C) The conductor is talking on the phone.\n(D) The platform is completely empty."
  },
  {
    "id": "p1-gen-045",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The chef is washing dishes in the sink.",
      "B": "The kitchen is dark and empty.",
      "C": "A meal is being arranged on a plate.",
      "D": "Several waiters are serving customers."
    },
    "answer": "C",
    "explanation_zh": "正確答案為 C。照片中顯示一名廚師正在盤子上擺放精緻菜餚，配有蔬菜和醬汁。選項 C「一頓餐點正在被擺放在盤子上」與照片相符。選項 A「廚師正在水槽裡洗碗」不正確，因為他在擺盤而非洗碗。選項 B「廚房又暗又空」不正確，因為廚房光線充足且有廚師在。選項 D「幾名服務生正在服務顧客」不正確，因為照片中沒有服務生或顧客。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "chef",
      "plating",
      "gourmet dish",
      "vegetables",
      "sauce",
      "professional kitchen"
    ],
    "imageAlt": "A chef is plating a gourmet dish with vegetables and sauce in a well-lit professional kitchen.",
    "audioScript": "(A) The chef is washing dishes in the sink.\n(B) The kitchen is dark and empty.\n(C) A meal is being arranged on a plate.\n(D) Several waiters are serving customers."
  },
  {
    "id": "p1-gen-046",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "He is writing on the whiteboard.",
      "B": "He is leaving the room.",
      "C": "He is sitting at the table.",
      "D": "He is pointing at the graph."
    },
    "answer": "D",
    "explanation_zh": "正確答案是 D。照片中一位穿西裝的男子站在白板前，手指指向圖表，因此「他正在指向圖表」與畫面完全相符。A 選項「他正在白板上寫字」不正確，因為他的手是比劃而非握筆書寫。B 選項「他正要離開房間」不正確，因為他面向白板和同事，沒有離開的動作。C 選項「他坐在桌子旁」不正確，因為他是站立姿勢。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "whiteboard",
      "graph",
      "pointing",
      "colleagues",
      "presentation"
    ],
    "imageAlt": "A man in a suit is standing at a whiteboard, pointing at a graph, while two colleagues sit at a table.",
    "audioScript": "(A) He is writing on the whiteboard.\n(B) He is leaving the room.\n(C) He is sitting at the table.\n(D) He is pointing at the graph."
  },
  {
    "id": "p1-gen-047",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are wearing safety equipment.",
      "B": "They are repairing the machine.",
      "C": "They are operating a forklift.",
      "D": "They are eating lunch."
    },
    "answer": "A",
    "explanation_zh": "正確答案是 A。照片中兩名工人戴著安全帽和穿著安全背心，因此「他們穿著安全裝備」與畫面完全相符。B 選項「他們正在修理機器」不正確，因為他們只是在檢查，沒有修理工具或動作。C 選項「他們正在操作堆高機」不正確，因為畫面中沒有堆高機。D 選項「他們正在吃午餐」不正確，因為他們站在機器旁，沒有進食動作。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "hard hats",
      "safety vests",
      "inspecting",
      "machinery",
      "factory"
    ],
    "imageAlt": "Two workers in hard hats and safety vests are inspecting a large piece of machinery on a factory floor.",
    "audioScript": "(A) They are wearing safety equipment.\n(B) They are repairing the machine.\n(C) They are operating a forklift.\n(D) They are eating lunch."
  },
  {
    "id": "p1-gen-048",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "She is cleaning the table.",
      "B": "She is carrying a tray.",
      "C": "She is reading a menu.",
      "D": "She is paying the bill."
    },
    "answer": "B",
    "explanation_zh": "正確答案是 B。照片中女服務生穿著圍裙，端著託盤，上面有兩杯咖啡和一盤三明治，因此「她正端著託盤」與畫面完全相符。A 選項「她正在清理桌子」不正確，因為她沒有擦拭或收拾的動作。C 選項「她正在看菜單」不正確，因為她手中是託盤而非菜單。D 選項「她正在付帳」不正確，因為她沒有拿錢或帳單。",
    "skill_tag": "listening_photo",
    "difficulty": "A2",
    "vocabulary": [
      "waitress",
      "apron",
      "tray",
      "coffee",
      "sandwiches"
    ],
    "imageAlt": "A waitress in an apron is carrying a tray with two cups of coffee and a plate of sandwiches.",
    "audioScript": "(A) She is cleaning the table.\n(B) She is carrying a tray.\n(C) She is reading a menu.\n(D) She is paying the bill."
  },
  {
    "id": "p1-gen-049",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The truck is driving away.",
      "B": "The worker is loading boxes onto the truck.",
      "C": "The boxes are being unloaded from the truck.",
      "D": "The loading dock is empty."
    },
    "answer": "C",
    "explanation_zh": "正確答案是 C。照片中一輛送貨卡車停在裝卸碼頭旁，工人正在從卡車上卸下紙箱，因此「箱子正從卡車上卸下」與畫面完全相符。A 選項「卡車正在開走」不正確，因為卡車是靜止的。B 選項「工人正在將箱子裝上卡車」不正確，因為動作是卸下而非裝載。D 選項「裝卸碼頭是空的」不正確，因為有卡車和工人在場。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "delivery truck",
      "loading dock",
      "unloading",
      "cardboard boxes",
      "worker"
    ],
    "imageAlt": "A delivery truck is parked next to a loading dock, and a worker is unloading cardboard boxes.",
    "audioScript": "(A) The truck is driving away.\n(B) The worker is loading boxes onto the truck.\n(C) The boxes are being unloaded from the truck.\n(D) The loading dock is empty."
  },
  {
    "id": "p1-gen-050",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are typing on their laptops.",
      "B": "They are drinking coffee.",
      "C": "They are standing by the window.",
      "D": "They are having a meeting."
    },
    "answer": "D",
    "explanation_zh": "正確答案是 D。照片中三人圍坐在會議桌旁，面前有筆記型電腦和筆記本，看起來正在討論文件，因此「他們正在開會」與畫面完全相符。A 選項「他們正在筆記型電腦上打字」不正確，因為他們沒有打字動作，而是專注於討論。B 選項「他們正在喝咖啡」不正確，因為畫面中沒有咖啡杯。C 選項「他們正站在窗邊」不正確，因為他們是坐著的。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "conference table",
      "laptops",
      "notebooks",
      "discussing",
      "meeting"
    ],
    "imageAlt": "Three people are sitting around a conference table with laptops and notebooks, appearing to discuss a document.",
    "audioScript": "(A) They are typing on their laptops.\n(B) They are drinking coffee.\n(C) They are standing by the window.\n(D) They are having a meeting."
  },
  {
    "id": "p1-gen-051",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are looking at a laptop.",
      "B": "They are shaking hands.",
      "C": "They are writing on a whiteboard.",
      "D": "They are leaving the room."
    },
    "answer": "A",
    "explanation_zh": "答案是A。照片中一群商務人士圍坐在會議桌旁，看著一臺筆記型電腦螢幕，因此A選項「他們正在看筆電」與畫面完全吻合。B選項「他們正在握手」不正確，因為照片中沒有握手動作。C選項「他們正在白板上寫字」不正確，因為照片中沒有白板。D選項「他們正要離開房間」不正確，因為所有人都坐著，沒有離開的跡象。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "professionals",
      "conference table",
      "laptop",
      "looking at"
    ],
    "imageAlt": "A group of business professionals are sitting around a conference table, looking at a laptop screen.",
    "audioScript": "(A) They are looking at a laptop.\n(B) They are shaking hands.\n(C) They are writing on a whiteboard.\n(D) They are leaving the room."
  },
  {
    "id": "p1-gen-052",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The worker is repairing the machine.",
      "B": "The worker is operating the machine.",
      "C": "The worker is cleaning the floor.",
      "D": "The worker is talking on the phone."
    },
    "answer": "B",
    "explanation_zh": "答案是B。照片中一名工廠工人戴著安全帽，正在操作一臺有控制面板的大型機器，因此B選項「工人正在操作機器」與畫面完全吻合。A選項「工人正在修理機器」不正確，因為沒有修理工具或維修動作。C選項「工人正在清潔地板」不正確，因為工人站在機器前，沒有清潔行為。D選項「工人正在講電話」不正確，因為工人沒有手持電話。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "worker",
      "hard hat",
      "operating",
      "machine",
      "control panels"
    ],
    "imageAlt": "A worker in a factory is wearing a hard hat and operating a large machine with control panels.",
    "audioScript": "(A) The worker is repairing the machine.\n(B) The worker is operating the machine.\n(C) The worker is cleaning the floor.\n(D) The worker is talking on the phone."
  },
  {
    "id": "p1-gen-053",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are eating lunch.",
      "B": "They are shaking hands.",
      "C": "One person is handing a document to the other.",
      "D": "They are sitting on chairs."
    },
    "answer": "C",
    "explanation_zh": "答案是C。照片中兩個人站在接待櫃檯前，其中一人正在遞交文件給另一人，因此C選項「一個人正在遞交文件給另一個人」與畫面完全吻合。A選項「他們正在吃午餐」不正確，因為沒有食物或用餐動作。B選項「他們正在握手」不正確，因為沒有握手動作。D選項「他們正坐在椅子上」不正確，因為兩人都站著。",
    "skill_tag": "listening_photo",
    "difficulty": "A2",
    "vocabulary": [
      "reception desk",
      "handing",
      "document",
      "standing"
    ],
    "imageAlt": "Two people are standing at a reception desk, one is handing a document to the other.",
    "audioScript": "(A) They are eating lunch.\n(B) They are shaking hands.\n(C) One person is handing a document to the other.\n(D) They are sitting on chairs."
  },
  {
    "id": "p1-gen-054",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The man is erasing the whiteboard.",
      "B": "The man is drinking coffee.",
      "C": "The man is sitting at a desk.",
      "D": "The man is pointing at the charts."
    },
    "answer": "D",
    "explanation_zh": "答案是D。照片中一名穿西裝的男子站在白板旁，白板上有彩色圖表和圖形，男子手指指向圖表，因此D選項「男子正在指向圖表」與畫面完全吻合。A選項「男子正在擦拭白板」不正確，因為他沒有拿板擦或做擦拭動作。B選項「男子正在喝咖啡」不正確，因為他沒有拿杯子。C選項「男子正坐在桌前」不正確，因為他是站著的。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "suit",
      "whiteboard",
      "charts",
      "pointing at"
    ],
    "imageAlt": "A man in a suit is standing next to a whiteboard with colorful charts and graphs drawn on it.",
    "audioScript": "(A) The man is erasing the whiteboard.\n(B) The man is drinking coffee.\n(C) The man is sitting at a desk.\n(D) The man is pointing at the charts."
  },
  {
    "id": "p1-gen-055",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The workers are unloading boxes from the truck.",
      "B": "The truck is being loaded with boxes.",
      "C": "The workers are painting the warehouse.",
      "D": "The truck is driving away."
    },
    "answer": "A",
    "explanation_zh": "答案是A。照片中一輛送貨卡車停在倉庫前，兩名工人正在從車後卸下箱子，因此A選項「工人們正在從卡車上卸下箱子」與畫面完全吻合。B選項「卡車正在裝載箱子」不正確，因為箱子是從車上搬下來，而非裝上去。C選項「工人們正在粉刷倉庫」不正確，因為沒有油漆工具或粉刷動作。D選項「卡車正在開走」不正確，因為卡車是停著的，且工人正在卸貨。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "delivery truck",
      "warehouse",
      "unloading",
      "boxes",
      "workers"
    ],
    "imageAlt": "A delivery truck is parked in front of a warehouse, and two workers are unloading boxes from the back.",
    "audioScript": "(A) The workers are unloading boxes from the truck.\n(B) The truck is being loaded with boxes.\n(C) The workers are painting the warehouse.\n(D) The truck is driving away."
  },
  {
    "id": "p1-gen-056",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "They are shaking hands at the end of the meeting.",
      "B": "They are sitting around a table with notebooks and pens.",
      "C": "All participants are looking at a laptop on the table.",
      "D": "Some people are standing and giving a presentation."
    },
    "answer": "B",
    "explanation_zh": "答案是B。照片顯示一群商務人士圍坐在一張大木桌旁，桌上放有筆記本和筆，這與選項B的描述完全一致。選項A（會議結束時握手）不正確，因為照片中沒有人握手。選項C（所有參與者都在看筆記型電腦）不正確，因為並非所有人都看著筆記型電腦。選項D（有些人站著做簡報）不正確，因為照片中每個人都坐著。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "meeting",
      "conference room",
      "notebooks",
      "pen",
      "table"
    ],
    "imageAlt": "Business professionals sit around a large wooden conference table with notebooks and pens placed in front of them.",
    "audioScript": "(A) They are shaking hands at the end of the meeting.\n(B) They are sitting around a table with notebooks and pens.\n(C) All participants are looking at a laptop on the table.\n(D) Some people are standing and giving a presentation."
  },
  {
    "id": "p1-gen-057",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The worker is repairing the machine with tools.",
      "B": "Two workers are checking the equipment together.",
      "C": "The worker is inspecting the machine while holding a clipboard.",
      "D": "The machine is being operated by a worker in a uniform."
    },
    "answer": "C",
    "explanation_zh": "答案是C。照片中一名工人在工廠戴著安全帽，手持夾板檢查大型機器，這與選項C的描述完全一致。選項A（工人用工具修理機器）不正確，因為他沒有在修理。選項B（兩名工人一起檢查設備）不正確，因為只有一名工人。選項D（機器由穿制服的工人操作）不正確，因為他是在檢查而非操作。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "inspect",
      "clipboard",
      "hard hat",
      "machine",
      "factory"
    ],
    "imageAlt": "A worker in a factory is wearing a hard hat and inspecting a large machine with a clipboard in hand.",
    "audioScript": "(A) The worker is repairing the machine with tools.\n(B) Two workers are checking the equipment together.\n(C) The worker is inspecting the machine while holding a clipboard.\n(D) The machine is being operated by a worker in a uniform."
  },
  {
    "id": "p1-gen-058",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The woman is taking an order from a customer.",
      "B": "She is clearing empty dishes from a table.",
      "C": "She is arranging flowers on the tables.",
      "D": "The woman is carrying a tray with food to a table."
    },
    "answer": "D",
    "explanation_zh": "答案是D。照片中一名女子在餐廳端著託盤，託盤上有食物盤子，並在桌子間行走，這與選項D的描述完全一致。選項A（女子正在接受顧客點餐）不正確，因為她沒有在點餐。選項B（她正在清理桌子上的空盤子）不正確，因為託盤上有食物。選項C（她正在桌上擺放花朵）不正確，因為沒有花朵。",
    "skill_tag": "listening_photo",
    "difficulty": "B1",
    "vocabulary": [
      "tray",
      "plates",
      "restaurant",
      "carrying",
      "tables"
    ],
    "imageAlt": "A woman in a restaurant is carrying a tray with plates of food while walking between tables.",
    "audioScript": "(A) The woman is taking an order from a customer.\n(B) She is clearing empty dishes from a table.\n(C) She is arranging flowers on the tables.\n(D) The woman is carrying a tray with food to a table."
  },
  {
    "id": "p1-gen-059",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "He is speaking on the phone while walking through the office.",
      "B": "The man is typing on a computer at his desk.",
      "C": "The man is reading a document in a meeting room.",
      "D": "He is sitting in a cubicle and making a phone call."
    },
    "answer": "A",
    "explanation_zh": "答案是A。照片中一名穿西裝的男子在現代辦公室裡邊走邊用手機通話，這與選項A的描述完全一致。選項B（男子在辦公桌前打字）不正確，因為他正在走路。選項C（男子在會議室閱讀文件）不正確，因為他不在會議室。選項D（他坐在隔間裡打電話）不正確，因為他正在走路。",
    "skill_tag": "listening_photo",
    "difficulty": "B2",
    "vocabulary": [
      "smartphone",
      "suit",
      "office",
      "cubicles",
      "walking"
    ],
    "imageAlt": "A man in a suit is talking on a smartphone while walking through a modern office with cubicles.",
    "audioScript": "(A) He is speaking on the phone while walking through the office.\n(B) The man is typing on a computer at his desk.\n(C) The man is reading a document in a meeting room.\n(D) He is sitting in a cubicle and making a phone call."
  },
  {
    "id": "p1-gen-060",
    "part": "Part 1",
    "question": "Look at the photo and choose the statement that best describes it.",
    "choices": {
      "A": "The truck is driving away from the warehouse.",
      "B": "The men are unloading boxes from the truck.",
      "C": "Two men are loading boxes onto the truck.",
      "D": "One man is closing the back door of the truck."
    },
    "answer": "B",
    "explanation_zh": "答案是B。照片中一輛送貨卡車停在倉庫前，兩名男子正在從車後卸下箱子，這與選項B的描述完全一致。選項A（卡車正駛離倉庫）不正確，因為卡車是停著的。選項C（兩名男子正在將箱子裝上卡車）不正確，因為他們是在卸貨。選項D（一名男子正在關卡車後門）不正確，因為門是開著的，且他們在卸貨。",
    "skill_tag": "listening_photo",
    "difficulty": "A2",
    "vocabulary": [
      "delivery truck",
      "warehouse",
      "unloading",
      "boxes",
      "men"
    ],
    "imageAlt": "A delivery truck is parked in front of a warehouse, and two men are unloading boxes from the back.",
    "audioScript": "(A) The truck is driving away from the warehouse.\n(B) The men are unloading boxes from the truck.\n(C) Two men are loading boxes onto the truck.\n(D) One man is closing the back door of the truck."
  },
  {
    "id": "p6-gen-017",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "initiative",
      "B": "initiation",
      "C": "initial",
      "D": "initiate"
    },
    "answer": "A",
    "explanation_zh": "空白(A)的正確答案是A「initiative」。此處需要一個名詞作為主詞，指代前文提到的「新的數位資產管理政策」；initiative（措施/倡議）符合語境，表示這項措施旨在簡化流程。B「initiation」（開始/發起）雖是名詞，但強調動作的起始，不適合描述政策本身；C「initial」（最初的）是形容詞，無法擔任主詞；D「initiate」（發起）是動詞，語法上不正確。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "implement",
      "streamline",
      "brand consistency",
      "migrated",
      "familiarize"
    ],
    "passage": "Dear Team,\n\nEffective January 15, 2025, the Marketing Department will implement a new digital asset management policy. This ____(A)____ is designed to streamline our workflow and ensure brand consistency across all channels.\n\nAll team members are required to use the approved DAM platform for storing and sharing files. ____(B)____, any assets currently saved on personal drives or external devices must be migrated to the platform by January 31. ____(C)____ Please note that access to the system will be provided by your department head.\n\nWe strongly encourage everyone ____(D)____ the training session scheduled for January 10 to familiarize themselves with the new procedures. Thank you for your cooperation.\n\nBest regards,\nSarah Chen\nDirector of Marketing",
    "passage_group_id": "p6-005",
    "question_order": 1
  },
  {
    "id": "p6-gen-018",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Furthermore",
      "C": "Therefore",
      "D": "Nevertheless"
    },
    "answer": "B",
    "explanation_zh": "空白(B)的正確答案是B「Furthermore」（此外）。前句說明所有團隊成員必須使用核准的DAM平臺，後句進一步要求將個人硬碟或外部裝置中的資產遷移至平臺，兩者為並列補充關係。A「However」（然而）和D「Nevertheless」（儘管如此）表轉折，不符合邏輯；C「Therefore」（因此）表因果，但前後句無直接因果關係。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "implement",
      "streamline",
      "brand consistency",
      "migrated",
      "familiarize"
    ],
    "passage": "Dear Team,\n\nEffective January 15, 2025, the Marketing Department will implement a new digital asset management policy. This ____(A)____ is designed to streamline our workflow and ensure brand consistency across all channels.\n\nAll team members are required to use the approved DAM platform for storing and sharing files. ____(B)____, any assets currently saved on personal drives or external devices must be migrated to the platform by January 31. ____(C)____ Please note that access to the system will be provided by your department head.\n\nWe strongly encourage everyone ____(D)____ the training session scheduled for January 10 to familiarize themselves with the new procedures. Thank you for your cooperation.\n\nBest regards,\nSarah Chen\nDirector of Marketing",
    "passage_group_id": "p6-005",
    "question_order": 2
  },
  {
    "id": "p6-gen-020",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "attending",
      "B": "attend",
      "C": "attended",
      "D": "to attend"
    },
    "answer": "D",
    "explanation_zh": "空白(D)的正確答案是D「to attend」。動詞encourage的常見句型為encourage someone to do something（鼓勵某人做某事），因此不定詞to attend（參加）符合語法。A「attending」是動名詞，不適用於encourage後接受詞的結構；B「attend」是原形動詞，需搭配助動詞；C「attended」是過去分詞，無法與encourage連用。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "implement",
      "streamline",
      "brand consistency",
      "migrated",
      "familiarize"
    ],
    "passage": "Dear Team,\n\nEffective January 15, 2025, the Marketing Department will implement a new digital asset management policy. This ____(A)____ is designed to streamline our workflow and ensure brand consistency across all channels.\n\nAll team members are required to use the approved DAM platform for storing and sharing files. ____(B)____, any assets currently saved on personal drives or external devices must be migrated to the platform by January 31. ____(C)____ Please note that access to the system will be provided by your department head.\n\nWe strongly encourage everyone ____(D)____ the training session scheduled for January 10 to familiarize themselves with the new procedures. Thank you for your cooperation.\n\nBest regards,\nSarah Chen\nDirector of Marketing",
    "passage_group_id": "p6-005",
    "question_order": 4
  },
  {
    "id": "p6-si-005",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Files that are not transferred by that date will no longer be accessible.",
      "B": "The marketing budget will be reduced accordingly.",
      "C": "Personal devices may be purchased at a discount.",
      "D": "Our brand logo was redesigned last spring."
    },
    "answer": "A",
    "explanation_zh": "前句設定了 1 月 31 日的搬遷期限，正解說明「未在期限內搬遷的後果」，與期限句緊密呼應。其他選項與檔案管理政策無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "transfer",
      "accessible",
      "deadline"
    ],
    "passage": "Dear Team,\n\nEffective January 15, 2025, the Marketing Department will implement a new digital asset management policy. This ____(A)____ is designed to streamline our workflow and ensure brand consistency across all channels.\n\nAll team members are required to use the approved DAM platform for storing and sharing files. ____(B)____, any assets currently saved on personal drives or external devices must be migrated to the platform by January 31. ____(C)____ Please note that access to the system will be provided by your department head.\n\nWe strongly encourage everyone ____(D)____ the training session scheduled for January 10 to familiarize themselves with the new procedures. Thank you for your cooperation.\n\nBest regards,\nSarah Chen\nDirector of Marketing",
    "passage_group_id": "p6-005",
    "question_order": 3
  },
  {
    "id": "p6-gen-021",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "Compliance",
      "B": "Noncompliance",
      "C": "Disagreement",
      "D": "Accordance"
    },
    "answer": "B",
    "explanation_zh": "答案為B。空格前提到員工必須完成訓練，後文說會導致紀律處分，因此需要一個表示「不遵守」的詞。Noncompliance（不遵守）符合語境，而Compliance（遵守）、Disagreement（不同意）、Accordance（一致）均不符合。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "protocols",
      "evacuation",
      "extinguishers",
      "disciplinary",
      "warden"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: March 15, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the company will implement new fire safety protocols starting April 1. All employees must complete a mandatory training session by March 25. The training will cover proper evacuation routes and the use of fire extinguishers. ____(A)____ to these procedures will result in disciplinary action. ____(B)____, we have installed new smoke detectors on every floor. These devices should be tested weekly by the floor warden. ____(C)____ Please ensure that all exits remain clear of obstructions. In the event of an alarm, proceed calmly toward the nearest marked exit. Do not use elevators under any circumstances. The safety team ____(D)____ conducting random drills throughout the month to ensure readiness.",
    "passage_group_id": "p6-006",
    "question_order": 1
  },
  {
    "id": "p6-gen-022",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Additionally",
      "D": "Nonetheless"
    },
    "answer": "C",
    "explanation_zh": "答案為C。前句講不遵守的後果，後句提到安裝新煙霧偵測器，這是附加資訊，因此用Additionally（此外）表示補充。However（然而）和Nonetheless（儘管如此）表示轉折，Therefore（因此）表示因果，均不適用。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "protocols",
      "evacuation",
      "extinguishers",
      "disciplinary",
      "warden"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: March 15, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the company will implement new fire safety protocols starting April 1. All employees must complete a mandatory training session by March 25. The training will cover proper evacuation routes and the use of fire extinguishers. ____(A)____ to these procedures will result in disciplinary action. ____(B)____, we have installed new smoke detectors on every floor. These devices should be tested weekly by the floor warden. ____(C)____ Please ensure that all exits remain clear of obstructions. In the event of an alarm, proceed calmly toward the nearest marked exit. Do not use elevators under any circumstances. The safety team ____(D)____ conducting random drills throughout the month to ensure readiness.",
    "passage_group_id": "p6-006",
    "question_order": 2
  },
  {
    "id": "p6-gen-024",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "is",
      "B": "are",
      "C": "have been",
      "D": "were"
    },
    "answer": "A",
    "explanation_zh": "答案為A。主詞The safety team是單數集合名詞，且後文有throughout the month表示現在進行，因此用is conducting（正在進行）。are用於複數主詞，have been是現在完成式，were是過去式，均不符合時態與主詞一致性。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "protocols",
      "evacuation",
      "extinguishers",
      "disciplinary",
      "warden"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: March 15, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the company will implement new fire safety protocols starting April 1. All employees must complete a mandatory training session by March 25. The training will cover proper evacuation routes and the use of fire extinguishers. ____(A)____ to these procedures will result in disciplinary action. ____(B)____, we have installed new smoke detectors on every floor. These devices should be tested weekly by the floor warden. ____(C)____ Please ensure that all exits remain clear of obstructions. In the event of an alarm, proceed calmly toward the nearest marked exit. Do not use elevators under any circumstances. The safety team ____(D)____ conducting random drills throughout the month to ensure readiness.",
    "passage_group_id": "p6-006",
    "question_order": 4
  },
  {
    "id": "p6-si-006",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Smoking is permitted on the rooftop terrace.",
      "B": "Any detector that fails a test should be reported to Facilities immediately.",
      "C": "The cafeteria will serve a new lunch menu.",
      "D": "Fire drills were abolished several years ago."
    },
    "answer": "B",
    "explanation_zh": "前句要求樓層管理員每週測試煙霧偵測器，正解說明「測試失敗時的通報程序」，是同一流程的下一步。(D) 與文末提到的隨機演練矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "detector",
      "report",
      "facilities"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: March 15, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the company will implement new fire safety protocols starting April 1. All employees must complete a mandatory training session by March 25. The training will cover proper evacuation routes and the use of fire extinguishers. ____(A)____ to these procedures will result in disciplinary action. ____(B)____, we have installed new smoke detectors on every floor. These devices should be tested weekly by the floor warden. ____(C)____ Please ensure that all exits remain clear of obstructions. In the event of an alarm, proceed calmly toward the nearest marked exit. Do not use elevators under any circumstances. The safety team ____(D)____ conducting random drills throughout the month to ensure readiness.",
    "passage_group_id": "p6-006",
    "question_order": 3
  },
  {
    "id": "p6-gen-025",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "variation",
      "B": "replacement",
      "C": "adjustment",
      "D": "conversion"
    },
    "answer": "C",
    "explanation_zh": "空白A處需要填寫一個名詞，表示對營業時間的臨時‘調整’。'adjustment'（調整）最符合上下文，指對營業時間的修改。'variation'（變化）強調多樣性，'replacement'（替換）指完全替代，'conversion'（轉換）指徹底轉變，均不適用。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "adjustment",
      "inventory",
      "extend",
      "customer service",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary to allow our staff more time for morning inventory. ____(B)____, we will extend our closing time by one hour. ____(C)____ The new schedule will be in effect until December 1st. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-007",
    "question_order": 1
  },
  {
    "id": "p6-gen-026",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Furthermore",
      "D": "In addition"
    },
    "answer": "D",
    "explanation_zh": "空白B處需要表示‘此外’的遞進連接詞。前句說開門時間推遲，後句說關門時間延長，兩者是並列的補充信息。'In addition'（此外）最合適。'However'（然而）表轉折，'Therefore'（因此）表因果，'Furthermore'（而且）雖也表遞進，但比'In addition'更正式，此處選用'In addition'更符合A2難度的語境。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "adjustment",
      "inventory",
      "extend",
      "customer service",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary to allow our staff more time for morning inventory. ____(B)____, we will extend our closing time by one hour. ____(C)____ The new schedule will be in effect until December 1st. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-007",
    "question_order": 2
  },
  {
    "id": "p6-gen-028",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "not",
      "B": "do not",
      "C": "don't",
      "D": "no"
    },
    "answer": "B",
    "explanation_zh": "空白D處是祈使句，需要否定形式‘不要猶豫’。'Do not hesitate'是標準正式祈使句否定式。'Not'不能單獨構成祈使句；'Don't'雖正確但較非正式，不符合本通知的禮貌正式語氣；'No'後需接名詞或動名詞。因此'do not'最合適。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "adjustment",
      "inventory",
      "extend",
      "customer service",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary to allow our staff more time for morning inventory. ____(B)____, we will extend our closing time by one hour. ____(C)____ The new schedule will be in effect until December 1st. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-007",
    "question_order": 4
  },
  {
    "id": "p6-si-007",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "All seasonal items are final sale.",
      "B": "Job applications are available at the front desk.",
      "C": "We hope the longer evening hours will make your visits more convenient.",
      "D": "Parking fees will double next month."
    },
    "answer": "C",
    "explanation_zh": "前句宣布延長打烊時間，正解以「延長營業帶來的便利」收束，符合公告安撫顧客的語氣。其餘選項與營業時間調整無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "evening hours",
      "convenient",
      "extend"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary to allow our staff more time for morning inventory. ____(B)____, we will extend our closing time by one hour. ____(C)____ The new schedule will be in effect until December 1st. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. We appreciate your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-007",
    "question_order": 3
  },
  {
    "id": "p6-gen-029",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "expert",
      "B": "expertness",
      "C": "expertly",
      "D": "expertise"
    },
    "answer": "D",
    "explanation_zh": "答案為D「expertise」。空格前為形容詞性物主代詞「your」，後接名詞，需填入名詞。expertise（專業知識）符合語意，表示對永續包裝的專業知識。A「expert」可作名詞（專家），但語意上「admire your expert」不如「admire your expertise」自然；B「expertness」雖為名詞但罕用；C「expertly」為副詞，無法修飾。",
    "skill_tag": "word_form",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "sustainable",
      "collaboration",
      "proprietary",
      "framework",
      "preliminary"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenLeaf Solutions to express our keen interest in exploring a strategic partnership with your company, EcoPack Industries. We have long admired your ____(A)____ in sustainable packaging and believe that a collaboration between our firms could yield significant mutual benefits.\n\nGreenLeaf specializes in renewable energy consulting for manufacturing facilities. ____(B)____, we have recently developed a proprietary system that helps factories reduce their carbon footprint by up to 40%. ____(C)____ We are confident that integrating our energy solutions with your eco-friendly packaging products would create a compelling, unified offering for environmentally conscious clients.\n\nWe would be delighted to schedule a meeting to discuss this proposal in greater detail. Our team is prepared to present a preliminary framework for collaboration during the first week of December.\n\nShould you find this opportunity promising, we kindly request that you ____(D)____ a brief introductory call with our senior partnership manager at your earliest convenience. We look forward to the possibility of working together.\n\nSincerely,\n\nElena Vargas\nDirector of Business Development",
    "passage_group_id": "p6-008",
    "question_order": 1
  },
  {
    "id": "p6-gen-030",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "Furthermore",
      "B": "However",
      "C": "Therefore",
      "D": "Nevertheless"
    },
    "answer": "A",
    "explanation_zh": "答案為A「Furthermore」。前句說明公司專長，後句進一步補充近期開發的系統，兩句為遞進關係。Furthermore（此外）符合邏輯。B「However」表轉折；C「Therefore」表因果；D「Nevertheless」表讓步，均不適用。",
    "skill_tag": "conjunction",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "sustainable",
      "collaboration",
      "proprietary",
      "framework",
      "preliminary"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenLeaf Solutions to express our keen interest in exploring a strategic partnership with your company, EcoPack Industries. We have long admired your ____(A)____ in sustainable packaging and believe that a collaboration between our firms could yield significant mutual benefits.\n\nGreenLeaf specializes in renewable energy consulting for manufacturing facilities. ____(B)____, we have recently developed a proprietary system that helps factories reduce their carbon footprint by up to 40%. ____(C)____ We are confident that integrating our energy solutions with your eco-friendly packaging products would create a compelling, unified offering for environmentally conscious clients.\n\nWe would be delighted to schedule a meeting to discuss this proposal in greater detail. Our team is prepared to present a preliminary framework for collaboration during the first week of December.\n\nShould you find this opportunity promising, we kindly request that you ____(D)____ a brief introductory call with our senior partnership manager at your earliest convenience. We look forward to the possibility of working together.\n\nSincerely,\n\nElena Vargas\nDirector of Business Development",
    "passage_group_id": "p6-008",
    "question_order": 2
  },
  {
    "id": "p6-gen-032",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "will schedule",
      "B": "scheduled",
      "C": "schedule",
      "D": "would schedule"
    },
    "answer": "C",
    "explanation_zh": "答案為C「schedule」。動詞「request」後接that子句時，需使用原形動詞（虛擬語氣），故「schedule」正確。A「will schedule」為未來式；B「scheduled」為過去式；D「would schedule」為條件式，均不符合語法要求。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "sustainable",
      "collaboration",
      "proprietary",
      "framework",
      "preliminary"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenLeaf Solutions to express our keen interest in exploring a strategic partnership with your company, EcoPack Industries. We have long admired your ____(A)____ in sustainable packaging and believe that a collaboration between our firms could yield significant mutual benefits.\n\nGreenLeaf specializes in renewable energy consulting for manufacturing facilities. ____(B)____, we have recently developed a proprietary system that helps factories reduce their carbon footprint by up to 40%. ____(C)____ We are confident that integrating our energy solutions with your eco-friendly packaging products would create a compelling, unified offering for environmentally conscious clients.\n\nWe would be delighted to schedule a meeting to discuss this proposal in greater detail. Our team is prepared to present a preliminary framework for collaboration during the first week of December.\n\nShould you find this opportunity promising, we kindly request that you ____(D)____ a brief introductory call with our senior partnership manager at your earliest convenience. We look forward to the possibility of working together.\n\nSincerely,\n\nElena Vargas\nDirector of Business Development",
    "passage_group_id": "p6-008",
    "question_order": 4
  },
  {
    "id": "p6-si-008",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Our office furniture is also made of recycled wood.",
      "B": "EcoPack Industries was recently sold to a competitor.",
      "C": "We regret that the project has been discontinued.",
      "D": "Several leading manufacturers have already adopted the system with measurable results."
    },
    "answer": "D",
    "explanation_zh": "前句介紹自家系統可減碳 40%，正解以「已有大廠採用且成效可量化」補強說服力，符合提案信的論證邏輯。(C) 與全信積極爭取合作的語氣矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "adopt",
      "measurable",
      "manufacturer"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenLeaf Solutions to express our keen interest in exploring a strategic partnership with your company, EcoPack Industries. We have long admired your ____(A)____ in sustainable packaging and believe that a collaboration between our firms could yield significant mutual benefits.\n\nGreenLeaf specializes in renewable energy consulting for manufacturing facilities. ____(B)____, we have recently developed a proprietary system that helps factories reduce their carbon footprint by up to 40%. ____(C)____ We are confident that integrating our energy solutions with your eco-friendly packaging products would create a compelling, unified offering for environmentally conscious clients.\n\nWe would be delighted to schedule a meeting to discuss this proposal in greater detail. Our team is prepared to present a preliminary framework for collaboration during the first week of December.\n\nShould you find this opportunity promising, we kindly request that you ____(D)____ a brief introductory call with our senior partnership manager at your earliest convenience. We look forward to the possibility of working together.\n\nSincerely,\n\nElena Vargas\nDirector of Business Development",
    "passage_group_id": "p6-008",
    "question_order": 3
  },
  {
    "id": "p6-gen-033",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "pre-approval",
      "B": "pre-approving",
      "C": "pre-approve",
      "D": "pre-approved"
    },
    "answer": "A",
    "explanation_zh": "空白(A)處需要一個名詞來修飾'system'，'pre-approval'是名詞形式，表示'預先批准'，符合語境。'pre-approving'是動名詞，'pre-approve'是動詞原形，'pre-approved'是過去分詞，都不適合直接修飾'system'。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "implement",
      "approval",
      "compliance",
      "submit",
      "streamline"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company is implementing a new ____(A)____ approval system for all travel expenses exceeding $500. This change is necessary to improve cost control and ensure compliance with our budget guidelines. ____(B)____, starting next Monday, all such requests must be submitted through the updated online portal. ____(C)____\n\nWe encourage you to familiarize yourself with the new procedure by reviewing the attached document. Your department manager will provide further details during the next staff meeting. If you have any questions, please do not hesitate to contact the finance office.\n\nWe appreciate your cooperation as we work to streamline our operations. This adjustment ____(D)____ our commitment to financial responsibility.",
    "passage_group_id": "p6-009",
    "question_order": 1
  },
  {
    "id": "p6-gen-034",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Furthermore",
      "D": "Nevertheless"
    },
    "answer": "B",
    "explanation_zh": "空白(B)處需要一個表示因果關係的邏輯連接詞。前一句說明了實施新系統的必要性，後一句說明了因此採取的具體行動（從下週一開始實行）。'Therefore'（因此）最合適。'However'和'Nevertheless'表示轉折，'Furthermore'表示遞進，均不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "implement",
      "approval",
      "compliance",
      "submit",
      "streamline"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company is implementing a new ____(A)____ approval system for all travel expenses exceeding $500. This change is necessary to improve cost control and ensure compliance with our budget guidelines. ____(B)____, starting next Monday, all such requests must be submitted through the updated online portal. ____(C)____\n\nWe encourage you to familiarize yourself with the new procedure by reviewing the attached document. Your department manager will provide further details during the next staff meeting. If you have any questions, please do not hesitate to contact the finance office.\n\nWe appreciate your cooperation as we work to streamline our operations. This adjustment ____(D)____ our commitment to financial responsibility.",
    "passage_group_id": "p6-009",
    "question_order": 2
  },
  {
    "id": "p6-gen-036",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "reflect",
      "B": "reflected",
      "C": "is reflecting",
      "D": "reflects"
    },
    "answer": "D",
    "explanation_zh": "空白(D)處需要正確的動詞形式。主語'This adjustment'是單數第三人稱，且描述的是一般事實或狀態，所以應該用一般現在時的第三人稱單數形式'reflects'。'reflect'是原形不匹配主語，'reflected'是過去式或過去分詞，'is reflecting'是現在進行時，均不符合語境。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "implement",
      "approval",
      "compliance",
      "submit",
      "streamline"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company is implementing a new ____(A)____ approval system for all travel expenses exceeding $500. This change is necessary to improve cost control and ensure compliance with our budget guidelines. ____(B)____, starting next Monday, all such requests must be submitted through the updated online portal. ____(C)____\n\nWe encourage you to familiarize yourself with the new procedure by reviewing the attached document. Your department manager will provide further details during the next staff meeting. If you have any questions, please do not hesitate to contact the finance office.\n\nWe appreciate your cooperation as we work to streamline our operations. This adjustment ____(D)____ our commitment to financial responsibility.",
    "passage_group_id": "p6-009",
    "question_order": 4
  },
  {
    "id": "p6-si-009",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Requests under that amount will continue to follow the current process.",
      "B": "The finance office will be closed for renovations.",
      "C": "Travel to conferences is now unlimited.",
      "D": "Receipts are no longer necessary for any purchase."
    },
    "answer": "A",
    "explanation_zh": "前文規定超過 $500 的差旅費須走新簽核系統，正解補充「未達門檻的申請維持原流程」，劃清新制適用範圍。其他選項與簽核制度無關或違背常理。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "threshold",
      "process",
      "request"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company is implementing a new ____(A)____ approval system for all travel expenses exceeding $500. This change is necessary to improve cost control and ensure compliance with our budget guidelines. ____(B)____, starting next Monday, all such requests must be submitted through the updated online portal. ____(C)____\n\nWe encourage you to familiarize yourself with the new procedure by reviewing the attached document. Your department manager will provide further details during the next staff meeting. If you have any questions, please do not hesitate to contact the finance office.\n\nWe appreciate your cooperation as we work to streamline our operations. This adjustment ____(D)____ our commitment to financial responsibility.",
    "passage_group_id": "p6-009",
    "question_order": 3
  },
  {
    "id": "p6-gen-037",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "exiting",
      "B": "evacuation",
      "C": "evicting",
      "D": "excavation"
    },
    "answer": "B",
    "explanation_zh": "答案為B「evacuation」。空格前為形容詞「new」，後為名詞「routes」，因此需填入形容詞修飾「routes」；「evacuation routes」是固定搭配，意為「疏散路線」，符合主題。A「exiting」雖可作形容詞，但意為「出口的」，與「routes」搭配不自然；C「evicting」意為「驅逐」，與語境無關；D「excavation」意為「挖掘」，完全不符。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "evacuation",
      "designated",
      "assembly point",
      "comply",
      "disciplinary action"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 15, 2024\nSubject: Updated Fire Evacuation Procedure\n\nPlease be advised that the fire evacuation procedure for the West Wing office has been updated. All employees must familiarize themselves with the new ____(A)____ routes posted near each stairwell. ____(B)____, the designated assembly point has been relocated from the parking lot to the south lawn. ____(C)____ During an evacuation, please proceed calmly toward the nearest marked exit and do not use the elevators. Each department head ____(D)____ responsible for conducting a head count of their team members at the assembly point. Failure to comply with these procedures may result in disciplinary action. Thank you for your cooperation.",
    "passage_group_id": "p6-010",
    "question_order": 1
  },
  {
    "id": "p6-gen-038",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "For instance",
      "C": "Additionally",
      "D": "Nevertheless"
    },
    "answer": "C",
    "explanation_zh": "答案為C「Additionally」。前句說明新疏散路線，後句補充集合點變更，兩者為並列關係，需用表示附加的連接副詞。A「However」表轉折，B「For instance」表舉例，D「Nevertheless」表讓步，均不符合前後邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "evacuation",
      "designated",
      "assembly point",
      "comply",
      "disciplinary action"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 15, 2024\nSubject: Updated Fire Evacuation Procedure\n\nPlease be advised that the fire evacuation procedure for the West Wing office has been updated. All employees must familiarize themselves with the new ____(A)____ routes posted near each stairwell. ____(B)____, the designated assembly point has been relocated from the parking lot to the south lawn. ____(C)____ During an evacuation, please proceed calmly toward the nearest marked exit and do not use the elevators. Each department head ____(D)____ responsible for conducting a head count of their team members at the assembly point. Failure to comply with these procedures may result in disciplinary action. Thank you for your cooperation.",
    "passage_group_id": "p6-010",
    "question_order": 2
  },
  {
    "id": "p6-gen-040",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "is",
      "B": "are",
      "C": "have been",
      "D": "were"
    },
    "answer": "A",
    "explanation_zh": "答案為A「is」。主詞「Each department head」為單數，需搭配單數動詞；且描述一般責任，應用現在式。B「are」用於複數主詞，C「have been」為現在完成式，D「were」為過去式，均與主詞單數及現在時態不符。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "evacuation",
      "designated",
      "assembly point",
      "comply",
      "disciplinary action"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 15, 2024\nSubject: Updated Fire Evacuation Procedure\n\nPlease be advised that the fire evacuation procedure for the West Wing office has been updated. All employees must familiarize themselves with the new ____(A)____ routes posted near each stairwell. ____(B)____, the designated assembly point has been relocated from the parking lot to the south lawn. ____(C)____ During an evacuation, please proceed calmly toward the nearest marked exit and do not use the elevators. Each department head ____(D)____ responsible for conducting a head count of their team members at the assembly point. Failure to comply with these procedures may result in disciplinary action. Thank you for your cooperation.",
    "passage_group_id": "p6-010",
    "question_order": 4
  },
  {
    "id": "p6-si-010",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The west wing will be demolished next year.",
      "B": "Signs marking the new route will be installed by the end of this week.",
      "C": "Parking permits can be renewed online.",
      "D": "The south lawn will host the company picnic."
    },
    "answer": "B",
    "explanation_zh": "前句宣布集合點改至南草坪，正解說明「新路線指標即將設置」，幫助員工因應變更。其他選項偏離疏散程序主題。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "sign",
      "route",
      "install"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 15, 2024\nSubject: Updated Fire Evacuation Procedure\n\nPlease be advised that the fire evacuation procedure for the West Wing office has been updated. All employees must familiarize themselves with the new ____(A)____ routes posted near each stairwell. ____(B)____, the designated assembly point has been relocated from the parking lot to the south lawn. ____(C)____ During an evacuation, please proceed calmly toward the nearest marked exit and do not use the elevators. Each department head ____(D)____ responsible for conducting a head count of their team members at the assembly point. Failure to comply with these procedures may result in disciplinary action. Thank you for your cooperation.",
    "passage_group_id": "p6-010",
    "question_order": 3
  },
  {
    "id": "p6-gen-041",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "revision",
      "B": "variation",
      "C": "adjustment",
      "D": "alternation"
    },
    "answer": "C",
    "explanation_zh": "空白A處需要填入一個表示‘改變’的名詞，且要符合顧客通知的語境。'Adjustment'（調整）是最合適的選擇，因為它通常用於服務或時間表的微小變化，語氣禮貌且正式。'Revision' 多用於文件或計劃的修改；'Variation' 指差異或變動，不常用於營業時間；'Alternation' 指交替，不符合上下文。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "adjustment",
      "upgrading",
      "inventory",
      "inconvenience"
    ],
    "passage": "Dear Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. This change is necessary ____(B)____ we are upgrading our inventory system. During the upgrade period, some products may be unavailable for purchase. ____(C)____ We apologize for any inconvenience this may cause. ____(D)____ you have any questions, please contact our customer service team.\n\nThank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-011",
    "question_order": 1
  },
  {
    "id": "p6-gen-042",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "although",
      "B": "however",
      "C": "unless",
      "D": "because"
    },
    "answer": "D",
    "explanation_zh": "空白B處需要填入一個表示因果關係的連接詞。'Because'（因為）正確連接了‘改變是必要的’和‘我們正在升級庫存系統’之間的因果關係。'Although' 表示讓步；'However' 表示轉折，但此處不需要逗號；'Unless' 表示條件，不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "adjustment",
      "upgrading",
      "inventory",
      "inconvenience"
    ],
    "passage": "Dear Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. This change is necessary ____(B)____ we are upgrading our inventory system. During the upgrade period, some products may be unavailable for purchase. ____(C)____ We apologize for any inconvenience this may cause. ____(D)____ you have any questions, please contact our customer service team.\n\nThank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-011",
    "question_order": 2
  },
  {
    "id": "p6-gen-044",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "Would",
      "B": "Should",
      "C": "Could",
      "D": "Might"
    },
    "answer": "B",
    "explanation_zh": "空白D處需要填入一個表示‘如果’的禮貌條件情態動詞。'Should'（如果）在此處用於條件句，表示‘如果您有任何問題’，語氣正式且禮貌。'Would' 常用於虛擬語氣或請求；'Could' 表示可能性或能力；'Might' 表示可能性，但不如'Should'符合條件句的正式用法。",
    "skill_tag": "tense",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "adjustment",
      "upgrading",
      "inventory",
      "inconvenience"
    ],
    "passage": "Dear Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. This change is necessary ____(B)____ we are upgrading our inventory system. During the upgrade period, some products may be unavailable for purchase. ____(C)____ We apologize for any inconvenience this may cause. ____(D)____ you have any questions, please contact our customer service team.\n\nThank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-011",
    "question_order": 4
  },
  {
    "id": "p6-si-011",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Our store will also launch a new clothing line.",
      "B": "All purchases made last year are eligible for refunds.",
      "C": "We recommend calling ahead to confirm that the items you need are in stock.",
      "D": "The inventory system was installed a decade ago."
    },
    "answer": "C",
    "explanation_zh": "前句提醒升級期間部分商品可能缺貨，正解給出顧客的因應建議（先電話確認庫存），語意直接相承。其他選項與缺貨情境無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "call ahead",
      "in stock",
      "confirm"
    ],
    "passage": "Dear Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. This change is necessary ____(B)____ we are upgrading our inventory system. During the upgrade period, some products may be unavailable for purchase. ____(C)____ We apologize for any inconvenience this may cause. ____(D)____ you have any questions, please contact our customer service team.\n\nThank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-011",
    "question_order": 3
  },
  {
    "id": "p6-gen-045",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "reliability",
      "B": "reputation",
      "C": "performance",
      "D": "expertise"
    },
    "answer": "D",
    "explanation_zh": "正確答案為 D。空格前 'your company's ____ in international supply chain management' 需搭配名詞，而 'expertise'（專業知識）最符合上下文，表示對 Pacific Trade Group 在國際供應鏈管理領域的專業能力表示讚賞。其他選項：A 'reliability'（可靠性）雖合理但不如 'expertise' 精準；B 'reputation'（聲譽）偏重名聲而非能力；C 'performance'（表現）則較籠統，無法凸顯專業性。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "collaboration",
      "synergy",
      "cold-chain",
      "amenable"
    ],
    "passage": "Dear Ms. Chen, I am writing on behalf of Apex Logistics to express our keen interest in exploring a strategic partnership with Pacific Trade Group. We have long admired your company's ____(A)____ in international supply chain management, and we believe a collaboration could yield mutual benefits. Our firm specializes in last-mile delivery solutions in Southeast Asia, an area where we have achieved a 98% on-time delivery rate. ____(B)____ ____(C)____, we are currently expanding our cold-chain capabilities and see significant synergy with your temperature-sensitive freight operations. To move forward, we would like to propose an initial meeting to discuss potential areas of cooperation. We are particularly interested in learning more about your distribution network in Europe. If you are amenable, our team could visit your headquarters next month. We hope that this inquiry ____(D)____ the foundation for a productive long-term relationship. We look forward to your favorable response. Sincerely, Thomas Lee Director of Business Development Apex Logistics",
    "passage_group_id": "p6-012",
    "question_order": 1
  },
  {
    "id": "p6-gen-046",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "Furthermore",
      "B": "However",
      "C": "Therefore",
      "D": "Nevertheless"
    },
    "answer": "A",
    "explanation_zh": "正確答案為 A。前句提到公司專精於最後一哩配送，後句則補充正在擴展冷鏈能力，兩者為並列關係，因此 'Furthermore'（此外）最恰當。其他選項：B 'However'（然而）表轉折；C 'Therefore'（因此）表因果；D 'Nevertheless'（儘管如此）表讓步，均不符合前後句的順接邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "collaboration",
      "synergy",
      "cold-chain",
      "amenable"
    ],
    "passage": "Dear Ms. Chen, I am writing on behalf of Apex Logistics to express our keen interest in exploring a strategic partnership with Pacific Trade Group. We have long admired your company's ____(A)____ in international supply chain management, and we believe a collaboration could yield mutual benefits. Our firm specializes in last-mile delivery solutions in Southeast Asia, an area where we have achieved a 98% on-time delivery rate. ____(B)____ ____(C)____, we are currently expanding our cold-chain capabilities and see significant synergy with your temperature-sensitive freight operations. To move forward, we would like to propose an initial meeting to discuss potential areas of cooperation. We are particularly interested in learning more about your distribution network in Europe. If you are amenable, our team could visit your headquarters next month. We hope that this inquiry ____(D)____ the foundation for a productive long-term relationship. We look forward to your favorable response. Sincerely, Thomas Lee Director of Business Development Apex Logistics",
    "passage_group_id": "p6-012",
    "question_order": 3
  },
  {
    "id": "p6-gen-048",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "lays",
      "B": "laid",
      "C": "will lay",
      "D": "would lay"
    },
    "answer": "C",
    "explanation_zh": "正確答案為 C。主句 'We hope that this inquiry ____ the foundation' 表達對未來的期望，需使用未來式 'will lay'（將奠定）。其他選項：A 'lays'（現在式）與 'hope that' 引導的未來語境不符；B 'laid'（過去式）時態錯誤；D 'would lay'（過去未來式）用於假設語氣，不適用於此陳述句。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "collaboration",
      "synergy",
      "cold-chain",
      "amenable"
    ],
    "passage": "Dear Ms. Chen, I am writing on behalf of Apex Logistics to express our keen interest in exploring a strategic partnership with Pacific Trade Group. We have long admired your company's ____(A)____ in international supply chain management, and we believe a collaboration could yield mutual benefits. Our firm specializes in last-mile delivery solutions in Southeast Asia, an area where we have achieved a 98% on-time delivery rate. ____(B)____ ____(C)____, we are currently expanding our cold-chain capabilities and see significant synergy with your temperature-sensitive freight operations. To move forward, we would like to propose an initial meeting to discuss potential areas of cooperation. We are particularly interested in learning more about your distribution network in Europe. If you are amenable, our team could visit your headquarters next month. We hope that this inquiry ____(D)____ the foundation for a productive long-term relationship. We look forward to your favorable response. Sincerely, Thomas Lee Director of Business Development Apex Logistics",
    "passage_group_id": "p6-012",
    "question_order": 4
  },
  {
    "id": "p6-si-012",
    "part": "Part 6",
    "question": "____(B)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Unfortunately, our delivery volumes have been declining.",
      "B": "Pacific Trade Group was founded in 1985.",
      "C": "We plan to exit the logistics industry next year.",
      "D": "This performance has earned us long-term contracts with several major retailers."
    },
    "answer": "D",
    "explanation_zh": "前句列出 98% 準時送達率，正解以「此成績帶來長期合約」延伸佐證實力，符合提案信邏輯。(A)(C) 與爭取合作的語氣矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "performance",
      "long-term contract",
      "retailer"
    ],
    "passage": "Dear Ms. Chen, I am writing on behalf of Apex Logistics to express our keen interest in exploring a strategic partnership with Pacific Trade Group. We have long admired your company's ____(A)____ in international supply chain management, and we believe a collaboration could yield mutual benefits. Our firm specializes in last-mile delivery solutions in Southeast Asia, an area where we have achieved a 98% on-time delivery rate. ____(B)____ ____(C)____, we are currently expanding our cold-chain capabilities and see significant synergy with your temperature-sensitive freight operations. To move forward, we would like to propose an initial meeting to discuss potential areas of cooperation. We are particularly interested in learning more about your distribution network in Europe. If you are amenable, our team could visit your headquarters next month. We hope that this inquiry ____(D)____ the foundation for a productive long-term relationship. We look forward to your favorable response. Sincerely, Thomas Lee Director of Business Development Apex Logistics",
    "passage_group_id": "p6-012",
    "question_order": 2
  },
  {
    "id": "p6-gen-049",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "update",
      "B": "revision",
      "C": "notification",
      "D": "instruction"
    },
    "answer": "A",
    "explanation_zh": "答案為A。空白處需填入名詞，表示對現行政策的改變。'update'（更新）最符合語境，因為郵件主旨已說明是'Updated Remote Work Policy'，且後文提到實施更有結構的方法。其他選項：B'revision'（修訂）雖合理，但不如'update'直接對應主旨；C'notification'（通知）和D'instruction'（指示）均不表示政策本身的變更。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "productivity",
      "implement",
      "transparency",
      "documentation",
      "compliance"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nDate: November 15, 2024\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of an important ____(A)____ to our Remote Work Policy. After a thorough review of current practices and productivity data, we have decided to implement a more structured approach.\n\nEffective January 1, 2025, all employees must submit a formal remote work request form. This form will require you to specify your intended work location and schedule. ____(B)____, you will need to have your request approved by your direct supervisor before the start of each month. ____(C)____\n\nWe believe this change will increase transparency and help us comply with our new data security guidelines. Please note that failure to submit a request will result in your remote work status being ____(D)____ until proper documentation is received.\n\nThank you for your cooperation.\n\nBest regards,\nHuman Resources Department",
    "passage_group_id": "p6-013",
    "question_order": 1
  },
  {
    "id": "p6-gen-050",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Additionally",
      "C": "Therefore",
      "D": "Consequently"
    },
    "answer": "B",
    "explanation_zh": "答案為B。空白處需連接前後句，前句說明提交表格的要求，後句補充需主管批准，兩者為並列關係。'Additionally'（此外）正確表示附加資訊。A'However'（然而）表轉折，不符；C'Therefore'（因此）和D'Consequently'（結果）表因果，但前後無因果邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "productivity",
      "implement",
      "transparency",
      "documentation",
      "compliance"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nDate: November 15, 2024\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of an important ____(A)____ to our Remote Work Policy. After a thorough review of current practices and productivity data, we have decided to implement a more structured approach.\n\nEffective January 1, 2025, all employees must submit a formal remote work request form. This form will require you to specify your intended work location and schedule. ____(B)____, you will need to have your request approved by your direct supervisor before the start of each month. ____(C)____\n\nWe believe this change will increase transparency and help us comply with our new data security guidelines. Please note that failure to submit a request will result in your remote work status being ____(D)____ until proper documentation is received.\n\nThank you for your cooperation.\n\nBest regards,\nHuman Resources Department",
    "passage_group_id": "p6-013",
    "question_order": 2
  },
  {
    "id": "p6-gen-052",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "suspends",
      "B": "suspending",
      "C": "suspend",
      "D": "suspended"
    },
    "answer": "D",
    "explanation_zh": "答案為D。空白處在'being'之後，需用過去分詞形成被動語態，表示遠端工作狀態被暫停。'suspended'（被暫停）正確。A'suspends'（第三人稱單數動詞）、B'suspending'（現在分詞）、C'suspend'（原形動詞）均不符合被動結構。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "productivity",
      "implement",
      "transparency",
      "documentation",
      "compliance"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nDate: November 15, 2024\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of an important ____(A)____ to our Remote Work Policy. After a thorough review of current practices and productivity data, we have decided to implement a more structured approach.\n\nEffective January 1, 2025, all employees must submit a formal remote work request form. This form will require you to specify your intended work location and schedule. ____(B)____, you will need to have your request approved by your direct supervisor before the start of each month. ____(C)____\n\nWe believe this change will increase transparency and help us comply with our new data security guidelines. Please note that failure to submit a request will result in your remote work status being ____(D)____ until proper documentation is received.\n\nThank you for your cooperation.\n\nBest regards,\nHuman Resources Department",
    "passage_group_id": "p6-013",
    "question_order": 4
  },
  {
    "id": "p6-si-013",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Requests submitted after the monthly deadline will not be processed until the following cycle.",
      "B": "Office attendance is no longer recorded.",
      "C": "Supervisors may work remotely without restriction.",
      "D": "The company cafeteria now offers vegetarian options."
    },
    "answer": "A",
    "explanation_zh": "前句規定每月開始前須取得主管核准，正解說明「逾期申請的處理方式」，補完申請時程規範。其他選項與遠距申請流程無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "deadline",
      "process",
      "cycle"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nDate: November 15, 2024\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of an important ____(A)____ to our Remote Work Policy. After a thorough review of current practices and productivity data, we have decided to implement a more structured approach.\n\nEffective January 1, 2025, all employees must submit a formal remote work request form. This form will require you to specify your intended work location and schedule. ____(B)____, you will need to have your request approved by your direct supervisor before the start of each month. ____(C)____\n\nWe believe this change will increase transparency and help us comply with our new data security guidelines. Please note that failure to submit a request will result in your remote work status being ____(D)____ until proper documentation is received.\n\nThank you for your cooperation.\n\nBest regards,\nHuman Resources Department",
    "passage_group_id": "p6-013",
    "question_order": 3
  },
  {
    "id": "p6-gen-053",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "for instance",
      "B": "however",
      "C": "moreover",
      "D": "consequently"
    },
    "answer": "B",
    "explanation_zh": "答案為 B「however」。空格前提到員工先前在前停車場集合，空格後說明該區域現在保留給緊急車輛使用，前後語意有轉折對比，因此需要表示「然而」的轉折副詞。A「for instance」用於舉例，C「moreover」表示遞進，D「consequently」表示結果，皆不符合前後邏輯關係。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "evacuation",
      "designated",
      "assembly",
      "mandatory",
      "supervisors"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 10, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the emergency evacuation plan for the main office building has been revised. All employees must review the new procedures posted on the company intranet. The most significant change involves the designated assembly points. Previously, staff gathered in the front parking lot; ____(A)____, this area is now reserved for emergency vehicles. Therefore, everyone must proceed to the secondary assembly area located near the rear gate of the property. Additionally, all fire extinguishers have been replaced with a newer model. ____(B)____ To ensure proper usage, a mandatory training session ____(C)____ scheduled for the first week of December. Supervisors are responsible for confirming their team's attendance. ____(D)____, the fire alarm system will be tested next Thursday at 10:00 AM. Please remain calm during the test and continue with your normal duties unless an actual emergency is announced.",
    "passage_group_id": "p6-014",
    "question_order": 1
  },
  {
    "id": "p6-gen-055",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "are",
      "B": "have been",
      "C": "were",
      "D": "is"
    },
    "answer": "D",
    "explanation_zh": "答案為 D「is」。主詞「a mandatory training session」為單數名詞，且句子描述未來已排定的活動，應使用現在式被動語態「is scheduled」。A「are」主詞不一致，B「have been」與未來時間不符，C「were」為過去式，皆不正確。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "evacuation",
      "designated",
      "assembly",
      "mandatory",
      "supervisors"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 10, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the emergency evacuation plan for the main office building has been revised. All employees must review the new procedures posted on the company intranet. The most significant change involves the designated assembly points. Previously, staff gathered in the front parking lot; ____(A)____, this area is now reserved for emergency vehicles. Therefore, everyone must proceed to the secondary assembly area located near the rear gate of the property. Additionally, all fire extinguishers have been replaced with a newer model. ____(B)____ To ensure proper usage, a mandatory training session ____(C)____ scheduled for the first week of December. Supervisors are responsible for confirming their team's attendance. ____(D)____, the fire alarm system will be tested next Thursday at 10:00 AM. Please remain calm during the test and continue with your normal duties unless an actual emergency is announced.",
    "passage_group_id": "p6-014",
    "question_order": 3
  },
  {
    "id": "p6-gen-056",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "Furthermore",
      "B": "In contrast",
      "C": "For example",
      "D": "Nevertheless"
    },
    "answer": "A",
    "explanation_zh": "答案為 A「Furthermore」。前句提到訓練課程，後句補充說明消防警報測試，兩者皆為新程序的相關事項，屬於遞進關係。B「In contrast」表對比，C「For example」表舉例，D「Nevertheless」表轉折，皆不符合上下文邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "evacuation",
      "designated",
      "assembly",
      "mandatory",
      "supervisors"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 10, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the emergency evacuation plan for the main office building has been revised. All employees must review the new procedures posted on the company intranet. The most significant change involves the designated assembly points. Previously, staff gathered in the front parking lot; ____(A)____, this area is now reserved for emergency vehicles. Therefore, everyone must proceed to the secondary assembly area located near the rear gate of the property. Additionally, all fire extinguishers have been replaced with a newer model. ____(B)____ To ensure proper usage, a mandatory training session ____(C)____ scheduled for the first week of December. Supervisors are responsible for confirming their team's attendance. ____(D)____, the fire alarm system will be tested next Thursday at 10:00 AM. Please remain calm during the test and continue with your normal duties unless an actual emergency is announced.",
    "passage_group_id": "p6-014",
    "question_order": 4
  },
  {
    "id": "p6-si-014",
    "part": "Part 6",
    "question": "____(B)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The old extinguishers are available for purchase.",
      "B": "Instructions for operating the new units are printed on each cabinet.",
      "C": "Parking in the front lot is now permitted.",
      "D": "Annual bonuses will be announced in December."
    },
    "answer": "B",
    "explanation_zh": "前句說明滅火器已更換新型號，正解補充「新型號的操作說明位置」，與後文的操作訓練相互呼應。(C) 與前文「前停車場保留給消防車」矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "instructions",
      "operate",
      "cabinet"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: November 10, 2024\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the emergency evacuation plan for the main office building has been revised. All employees must review the new procedures posted on the company intranet. The most significant change involves the designated assembly points. Previously, staff gathered in the front parking lot; ____(A)____, this area is now reserved for emergency vehicles. Therefore, everyone must proceed to the secondary assembly area located near the rear gate of the property. Additionally, all fire extinguishers have been replaced with a newer model. ____(B)____ To ensure proper usage, a mandatory training session ____(C)____ scheduled for the first week of December. Supervisors are responsible for confirming their team's attendance. ____(D)____, the fire alarm system will be tested next Thursday at 10:00 AM. Please remain calm during the test and continue with your normal duties unless an actual emergency is announced.",
    "passage_group_id": "p6-014",
    "question_order": 2
  },
  {
    "id": "p6-gen-057",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "problem",
      "B": "delay",
      "C": "adjustment",
      "D": "warning"
    },
    "answer": "C",
    "explanation_zh": "此處需要表示‘變更’的正面詞彙。'adjustment'意為調整，符合通知服務變更的禮貌語氣；'problem'（問題）和'warning'（警告）語氣負面，'delay'（延誤）不合適。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "valued",
      "inform",
      "schedule",
      "apologize",
      "inconvenience",
      "customer service"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. ____(B)____, we will now close at 8:00 PM instead of 7:00 PM. ____(C)____ This change allows our staff to prepare better before opening. We understand this may affect your schedule, and we apologize for any inconvenience. ____(D)____ you have any questions, please contact our customer service team. Thank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-015",
    "question_order": 1
  },
  {
    "id": "p6-gen-058",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "For example",
      "D": "Additionally"
    },
    "answer": "D",
    "explanation_zh": "此處需要表示附加信息的連接詞。前句提到開門時間變化，後句補充關門時間變化，'Additionally'（此外）符合並列關係；'However'表轉折，'Therefore'表因果，'For example'表舉例，均不合適。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "valued",
      "inform",
      "schedule",
      "apologize",
      "inconvenience",
      "customer service"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. ____(B)____, we will now close at 8:00 PM instead of 7:00 PM. ____(C)____ This change allows our staff to prepare better before opening. We understand this may affect your schedule, and we apologize for any inconvenience. ____(D)____ you have any questions, please contact our customer service team. Thank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-015",
    "question_order": 2
  },
  {
    "id": "p6-gen-060",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "Must",
      "B": "Should",
      "C": "Would",
      "D": "Could"
    },
    "answer": "B",
    "explanation_zh": "此處需要表示條件的情態動詞。'Should you have any questions'是正式條件句，相當於‘如果您有任何問題’，符合禮貌通知語氣；'Must'表必須，'Would'和'Could'不用於條件句引導。",
    "skill_tag": "tense",
    "difficulty": "A2",
    "vocabulary": [
      "valued",
      "inform",
      "schedule",
      "apologize",
      "inconvenience",
      "customer service"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. ____(B)____, we will now close at 8:00 PM instead of 7:00 PM. ____(C)____ This change allows our staff to prepare better before opening. We understand this may affect your schedule, and we apologize for any inconvenience. ____(D)____ you have any questions, please contact our customer service team. Thank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-015",
    "question_order": 4
  },
  {
    "id": "p6-si-015",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The morning staff meeting has been canceled.",
      "B": "Prices will increase slightly next quarter.",
      "C": "In other words, you will have a full extra hour to shop in the evening.",
      "D": "Our store first opened twenty years ago."
    },
    "answer": "C",
    "explanation_zh": "前句宣布打烊時間延後一小時，正解用 In other words 重述此變更對顧客的意義，銜接自然。其他選項與時間調整無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "in other words",
      "extra hour",
      "evening"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:00 AM instead of 8:00 AM. ____(B)____, we will now close at 8:00 PM instead of 7:00 PM. ____(C)____ This change allows our staff to prepare better before opening. We understand this may affect your schedule, and we apologize for any inconvenience. ____(D)____ you have any questions, please contact our customer service team. Thank you for your understanding.\n\nBest regards,\nStore Management",
    "passage_group_id": "p6-015",
    "question_order": 3
  },
  {
    "id": "p6-gen-061",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "reputation",
      "B": "reputedly",
      "C": "reputable",
      "D": "expertise"
    },
    "answer": "D",
    "explanation_zh": "空白(A)需要一名詞，與後文的'in sustainable packaging'搭配，表示公司在可持續包裝領域的專業能力。'expertise'（專業知識/專長）符合正式商務語境，且與介詞'in'形成固定搭配。'reputation'（聲譽）雖可搭配'in'，但語義上強調名聲而非能力，與後文描述公司項目的語境不完全匹配；'reputedly'是副詞，不能用作主語；'reputable'是形容詞，不能用作主語。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "sustainable",
      "biodegradable",
      "collaboration",
      "expertise"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Corp. Your company's ____(A)____ in sustainable packaging aligns perfectly with our mission to promote eco-friendly industrial practices. We have been following your recent projects, particularly the development of biodegradable materials, and we believe that a collaboration would be highly beneficial for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential areas of cooperation, such as joint research initiatives or co-branded product lines. We are confident that combining our expertise in manufacturing with your innovative designs could lead to significant market advantages. ____(C)____\n\nPlease feel free to contact us at your earliest convenience to arrange a conference call. We look forward to the possibility of working together and ____(D)____ forward to your positive response.\n\nSincerely,\n\nDr. Lisa Chen\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-016",
    "question_order": 1
  },
  {
    "id": "p6-gen-062",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "To this end",
      "B": "However",
      "C": "In contrast",
      "D": "For example"
    },
    "answer": "A",
    "explanation_zh": "空白(B)需要一個邏輯連接詞，引出基於前述合作意向的具體建議。'To this end'（為此目的）表示為了實現前面提到的目標而採取的行動，符合提議召開初次會議的語境。'However'和'In contrast'表示轉折或對比，但此處邏輯是順承推進而非轉折；'For example'表示舉例，但提出會議是具體行動而非例子，邏輯上不如'To this end'貼切。",
    "skill_tag": "conjunction",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "sustainable",
      "biodegradable",
      "collaboration",
      "expertise"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Corp. Your company's ____(A)____ in sustainable packaging aligns perfectly with our mission to promote eco-friendly industrial practices. We have been following your recent projects, particularly the development of biodegradable materials, and we believe that a collaboration would be highly beneficial for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential areas of cooperation, such as joint research initiatives or co-branded product lines. We are confident that combining our expertise in manufacturing with your innovative designs could lead to significant market advantages. ____(C)____\n\nPlease feel free to contact us at your earliest convenience to arrange a conference call. We look forward to the possibility of working together and ____(D)____ forward to your positive response.\n\nSincerely,\n\nDr. Lisa Chen\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-016",
    "question_order": 2
  },
  {
    "id": "p6-gen-064",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "looked",
      "B": "are looking",
      "C": "look",
      "D": "will look"
    },
    "answer": "C",
    "explanation_zh": "空白(D)需要與'forward to'搭配的動詞形式，且與前面'We look forward to'保持平行結構。'look'是現在時，與'we'主語一致，且與並列結構中的'look forward to'保持一致，表達當前對回應的期待。'looked'是過去時，與語境不符；'are looking'雖語法正確，但破壞了與前面'look forward to'的平行結構；'will look'表示將來，不如現在時自然用於表達當前的態度。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "sustainable",
      "biodegradable",
      "collaboration",
      "expertise"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Corp. Your company's ____(A)____ in sustainable packaging aligns perfectly with our mission to promote eco-friendly industrial practices. We have been following your recent projects, particularly the development of biodegradable materials, and we believe that a collaboration would be highly beneficial for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential areas of cooperation, such as joint research initiatives or co-branded product lines. We are confident that combining our expertise in manufacturing with your innovative designs could lead to significant market advantages. ____(C)____\n\nPlease feel free to contact us at your earliest convenience to arrange a conference call. We look forward to the possibility of working together and ____(D)____ forward to your positive response.\n\nSincerely,\n\nDr. Lisa Chen\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-016",
    "question_order": 4
  },
  {
    "id": "p6-si-016",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Our company is currently downsizing its research division.",
      "B": "EcoInnovate Corp.'s stock price fell sharply last week.",
      "C": "We have decided to postpone all new partnerships.",
      "D": "A summary of our most recent joint-venture results is enclosed for your reference."
    },
    "answer": "D",
    "explanation_zh": "前句主張合作能帶來市場優勢，正解隨即附上「過往合資成果摘要」作為佐證，是商業提案的慣用寫法。(A)(C) 與積極提案的語氣矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "summary",
      "joint venture",
      "enclosed"
    ],
    "passage": "Dear Mr. Harrison,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Corp. Your company's ____(A)____ in sustainable packaging aligns perfectly with our mission to promote eco-friendly industrial practices. We have been following your recent projects, particularly the development of biodegradable materials, and we believe that a collaboration would be highly beneficial for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential areas of cooperation, such as joint research initiatives or co-branded product lines. We are confident that combining our expertise in manufacturing with your innovative designs could lead to significant market advantages. ____(C)____\n\nPlease feel free to contact us at your earliest convenience to arrange a conference call. We look forward to the possibility of working together and ____(D)____ forward to your positive response.\n\nSincerely,\n\nDr. Lisa Chen\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-016",
    "question_order": 3
  },
  {
    "id": "p6-gen-065",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "requirement",
      "B": "request",
      "C": "require",
      "D": "requiring"
    },
    "answer": "A",
    "explanation_zh": "答案為A。空格前有形容詞「new」，因此需要一個名詞。選項A「requirement」（要求）是名詞，符合語法，且與後文「改善團隊協調」的語意一致。選項B「request」（請求）雖是名詞，但與「new」搭配後無法準確表達政策更新的強制性；選項C「require」（要求）是動詞，選項D「requiring」是動詞現在分詞，均不符合名詞需求。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "policy update",
      "remote work",
      "coordination",
      "standardized",
      "procedure"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of a policy update regarding our remote work arrangement. Starting June 1, all employees must submit a formal request for any day they plan to work from home. This new ____(A)____ is designed to improve team coordination and ensure adequate office coverage.\n\n____(B)____, the previous system allowed for informal approval by team leads, which often led to scheduling conflicts. ____(C)____ To avoid confusion, we have created a standardized online form that must be filled out at least 48 hours in advance.\n\nPlease note that managers will review each request and may ask you to adjust your schedule if necessary. All employees are expected ____(D)____ to this procedure immediately. Your cooperation is greatly appreciated.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-017",
    "question_order": 1
  },
  {
    "id": "p6-gen-066",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "Therefore",
      "B": "Previously",
      "C": "Moreover",
      "D": "However"
    },
    "answer": "B",
    "explanation_zh": "答案為B。空格後提到「之前的系統允許非正式批准」，與前文「新政策」形成時間對比。選項B「Previously」（先前地）作為副詞，正確引出過去情況的說明。選項A「Therefore」（因此）表因果，但前後無因果關係；選項C「Moreover」（此外）表遞進，但此處是對比；選項D「However」（然而）表轉折，但語意上並非直接對立。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "policy update",
      "remote work",
      "coordination",
      "standardized",
      "procedure"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of a policy update regarding our remote work arrangement. Starting June 1, all employees must submit a formal request for any day they plan to work from home. This new ____(A)____ is designed to improve team coordination and ensure adequate office coverage.\n\n____(B)____, the previous system allowed for informal approval by team leads, which often led to scheduling conflicts. ____(C)____ To avoid confusion, we have created a standardized online form that must be filled out at least 48 hours in advance.\n\nPlease note that managers will review each request and may ask you to adjust your schedule if necessary. All employees are expected ____(D)____ to this procedure immediately. Your cooperation is greatly appreciated.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-017",
    "question_order": 2
  },
  {
    "id": "p6-gen-068",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "adhering",
      "B": "adhere",
      "C": "adhered",
      "D": "to adhere"
    },
    "answer": "D",
    "explanation_zh": "答案為D。空格前為「are expected」，此結構需接不定詞「to + 動詞原形」。選項D「to adhere」符合語法，構成「be expected to do something」（被期望做某事）。選項A「adhering」是動名詞，選項B「adhere」是動詞原形，選項C「adhered」是過去分詞，均無法與「are expected」正確搭配。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "policy update",
      "remote work",
      "coordination",
      "standardized",
      "procedure"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of a policy update regarding our remote work arrangement. Starting June 1, all employees must submit a formal request for any day they plan to work from home. This new ____(A)____ is designed to improve team coordination and ensure adequate office coverage.\n\n____(B)____, the previous system allowed for informal approval by team leads, which often led to scheduling conflicts. ____(C)____ To avoid confusion, we have created a standardized online form that must be filled out at least 48 hours in advance.\n\nPlease note that managers will review each request and may ask you to adjust your schedule if necessary. All employees are expected ____(D)____ to this procedure immediately. Your cooperation is greatly appreciated.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-017",
    "question_order": 4
  },
  {
    "id": "p6-si-017",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The new form eliminates this problem by recording every request in a shared calendar.",
      "B": "Team leads will no longer hold weekly meetings.",
      "C": "Most employees prefer working on weekends.",
      "D": "The HR department has moved to the third floor."
    },
    "answer": "A",
    "explanation_zh": "前句指出舊制度常造成排程衝突，正解說明「新表單如何解決此問題」，this problem 直接回指前句。其他選項無法銜接因果。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "eliminate",
      "shared calendar",
      "request"
    ],
    "passage": "Dear Team,\n\nI am writing to inform you of a policy update regarding our remote work arrangement. Starting June 1, all employees must submit a formal request for any day they plan to work from home. This new ____(A)____ is designed to improve team coordination and ensure adequate office coverage.\n\n____(B)____, the previous system allowed for informal approval by team leads, which often led to scheduling conflicts. ____(C)____ To avoid confusion, we have created a standardized online form that must be filled out at least 48 hours in advance.\n\nPlease note that managers will review each request and may ask you to adjust your schedule if necessary. All employees are expected ____(D)____ to this procedure immediately. Your cooperation is greatly appreciated.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-017",
    "question_order": 3
  },
  {
    "id": "p6-gen-069",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "equipment",
      "B": "extinguishers",
      "C": "exits",
      "D": "alarms"
    },
    "answer": "B",
    "explanation_zh": "空白(A)的正確答案是B。句子提到「緊急____的位置」，根據上下文，訓練涵蓋疏散路線和緊急設備的位置，而「extinguishers」（滅火器）是常見的緊急設備，且與消防程序相關。其他選項：A「equipment」太籠統，不具體；C「exits」雖與疏散相關，但前文已提「evacuation routes」，此處應指設備；D「alarms」是警報器，但通常不強調「位置」，且與後文滅火器更匹配。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "mandatory",
      "evacuation",
      "designated",
      "assembly",
      "formal warning"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2023\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the fire safety procedures for the West Wing office have been updated effective immediately. All employees must complete the mandatory online training module by November 1. ____(A)____ This training covers proper evacuation routes and the location of emergency ____(B)____. ____(C)____, a new fire drill will be conducted on November 15 at 10:00 AM. During the drill, please proceed calmly to the nearest stairwell exit and gather at the designated assembly point in the parking lot. Failure to attend the training or participate in the drill may result in a formal warning. The management team ____(D)____ committed to ensuring a safe work environment for everyone.",
    "passage_group_id": "p6-018",
    "question_order": 2
  },
  {
    "id": "p6-gen-070",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Additionally",
      "D": "Nevertheless"
    },
    "answer": "C",
    "explanation_zh": "空白(B)的正確答案是C。前句說明訓練涵蓋內容，後句提到將進行新的消防演習，兩者為並列關係，需用「Additionally」（此外）來添加資訊。其他選項：A「However」和D「Nevertheless」表轉折，不符邏輯；B「Therefore」表因果，但訓練和演習無直接因果關係。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "mandatory",
      "evacuation",
      "designated",
      "assembly",
      "formal warning"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2023\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the fire safety procedures for the West Wing office have been updated effective immediately. All employees must complete the mandatory online training module by November 1. ____(A)____ This training covers proper evacuation routes and the location of emergency ____(B)____. ____(C)____, a new fire drill will be conducted on November 15 at 10:00 AM. During the drill, please proceed calmly to the nearest stairwell exit and gather at the designated assembly point in the parking lot. Failure to attend the training or participate in the drill may result in a formal warning. The management team ____(D)____ committed to ensuring a safe work environment for everyone.",
    "passage_group_id": "p6-018",
    "question_order": 3
  },
  {
    "id": "p6-gen-072",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "is",
      "B": "are",
      "C": "has been",
      "D": "have been"
    },
    "answer": "A",
    "explanation_zh": "空白(D)的正確答案是A。主詞「The management team」是單數集合名詞，在美式英語中通常視為單數，需用單數動詞「is committed」。其他選項：B「are」是複數，不符；C「has been」和D「have been」是完成式，但句子描述一般狀態，不需完成時態。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "mandatory",
      "evacuation",
      "designated",
      "assembly",
      "formal warning"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2023\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the fire safety procedures for the West Wing office have been updated effective immediately. All employees must complete the mandatory online training module by November 1. ____(A)____ This training covers proper evacuation routes and the location of emergency ____(B)____. ____(C)____, a new fire drill will be conducted on November 15 at 10:00 AM. During the drill, please proceed calmly to the nearest stairwell exit and gather at the designated assembly point in the parking lot. Failure to attend the training or participate in the drill may result in a formal warning. The management team ____(D)____ committed to ensuring a safe work environment for everyone.",
    "passage_group_id": "p6-018",
    "question_order": 4
  },
  {
    "id": "p6-si-018",
    "part": "Part 6",
    "question": "____(A)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The West Wing cafeteria is closed for repairs.",
      "B": "A confirmation certificate will be emailed to you once the module is finished.",
      "C": "Training is optional for senior managers.",
      "D": "Visitors must sign in at the security desk."
    },
    "answer": "B",
    "explanation_zh": "前句要求 11 月 1 日前完成線上訓練，正解說明「完成後會寄發證明」，延續訓練流程。(C) 與「所有員工皆須完成」矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "confirmation",
      "certificate",
      "module"
    ],
    "passage": "To: All Staff\nFrom: Facilities Management\nDate: October 15, 2023\nSubject: Updated Fire Safety Procedures\n\nPlease be advised that the fire safety procedures for the West Wing office have been updated effective immediately. All employees must complete the mandatory online training module by November 1. ____(A)____ This training covers proper evacuation routes and the location of emergency ____(B)____. ____(C)____, a new fire drill will be conducted on November 15 at 10:00 AM. During the drill, please proceed calmly to the nearest stairwell exit and gather at the designated assembly point in the parking lot. Failure to attend the training or participate in the drill may result in a formal warning. The management team ____(D)____ committed to ensuring a safe work environment for everyone.",
    "passage_group_id": "p6-018",
    "question_order": 1
  },
  {
    "id": "p6-gen-073",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "increase",
      "B": "decrease",
      "C": "adjustment",
      "D": "removal"
    },
    "answer": "C",
    "explanation_zh": "選項C 'adjustment'（調整）最符合語境，因為通知是關於營業時間的臨時變更，'adjustment' 表示溫和的修改，適合客戶通知。A 'increase'（增加）和B 'decrease'（減少）通常用於數量或程度，不用於時間表。D 'removal'（移除）太強烈，不匹配'臨時'的語境。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "adjustment",
      "appreciate",
      "cooperation",
      "inquiries"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary for staff training. ____(B)____, we will extend our evening hours until 8:00 PM to better serve you. ____(C)____ We appreciate your understanding and cooperation during this adjustment period. For any urgent inquiries, please contact our customer service team. We ____(D)____ you to visit us during our new hours.\n\nThank you for your continued support.\n\nBest regards,\nThe Management",
    "passage_group_id": "p6-019",
    "question_order": 1
  },
  {
    "id": "p6-gen-074",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Meanwhile",
      "D": "Furthermore"
    },
    "answer": "D",
    "explanation_zh": "選項D 'Furthermore'（此外）是合適的，因為它添加了另一個信息（延長晚間時間），與前面提到的開門時間變化並列。A 'However'（然而）表示對比，但這裡沒有對比關係。B 'Therefore'（因此）表示因果，但延長晚間時間不是開門時間變化的直接結果。C 'Meanwhile'（與此同時）表示同時發生，但這裡邏輯上是補充信息。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "adjustment",
      "appreciate",
      "cooperation",
      "inquiries"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary for staff training. ____(B)____, we will extend our evening hours until 8:00 PM to better serve you. ____(C)____ We appreciate your understanding and cooperation during this adjustment period. For any urgent inquiries, please contact our customer service team. We ____(D)____ you to visit us during our new hours.\n\nThank you for your continued support.\n\nBest regards,\nThe Management",
    "passage_group_id": "p6-019",
    "question_order": 2
  },
  {
    "id": "p6-gen-076",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "must",
      "B": "encourage",
      "C": "require",
      "D": "allow"
    },
    "answer": "B",
    "explanation_zh": "選項B 'encourage'（鼓勵）是正確答案，因為通知語氣禮貌，旨在邀請客戶在新時間光顧，而非強制或允許。A 'must'（必須）語氣太強硬，不適合客戶通知。C 'require'（要求）太正式且強制。D 'allow'（允許）暗示客戶需要許可，不合邏輯。'encourage' 符合禮貌邀請的語境。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "adjustment",
      "appreciate",
      "cooperation",
      "inquiries"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary for staff training. ____(B)____, we will extend our evening hours until 8:00 PM to better serve you. ____(C)____ We appreciate your understanding and cooperation during this adjustment period. For any urgent inquiries, please contact our customer service team. We ____(D)____ you to visit us during our new hours.\n\nThank you for your continued support.\n\nBest regards,\nThe Management",
    "passage_group_id": "p6-019",
    "question_order": 4
  },
  {
    "id": "p6-si-019",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The training program has been canceled.",
      "B": "Our store is relocating to a new city.",
      "C": "Additional staff will be on duty each evening to keep checkout lines short.",
      "D": "Gift cards may not be used on weekends."
    },
    "answer": "C",
    "explanation_zh": "前句宣布延長晚間營業，正解補充「晚間將加派人手縮短結帳等候」，延續「更好地服務顧客」的承諾。(A) 與前文員工訓練的理由矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "on duty",
      "checkout",
      "staff"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. This change is necessary for staff training. ____(B)____, we will extend our evening hours until 8:00 PM to better serve you. ____(C)____ We appreciate your understanding and cooperation during this adjustment period. For any urgent inquiries, please contact our customer service team. We ____(D)____ you to visit us during our new hours.\n\nThank you for your continued support.\n\nBest regards,\nThe Management",
    "passage_group_id": "p6-019",
    "question_order": 3
  },
  {
    "id": "p6-gen-077",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "destructive",
      "B": "trivial",
      "C": "ambiguous",
      "D": "beneficial"
    },
    "answer": "D",
    "explanation_zh": "空白(A)需要一個描述合作對雙方影響的正面形容詞。'beneficial'（有益的）符合正式商業信件中表達合作優勢的語境，且與'highly'搭配自然。'destructive'（破壞性的）和'trivial'（瑣碎的）均為負面或貶義詞，不符合合作邀請的積極語氣。'ambiguous'（模糊的）雖中性，但不適用於描述合作價值。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "collaboration",
      "sustainable",
      "biodegradable",
      "initiative",
      "proposal"
    ],
    "passage": "Dear Ms. Chen,\n\nI am writing on behalf of GreenTech Solutions to express our strong interest in exploring a potential partnership with EcoInnovate Inc. We have been following your company's remarkable progress in sustainable packaging, and we believe a collaboration could be highly ____(A)____ to both organizations.\n\nOur firm specializes in biodegradable materials, and we have developed several patented technologies that align with your recent product lines. ____(B)____, we would like to propose a joint research initiative focusing on compostable containers for the food industry. ____(C)____\n\nWe are confident that this partnership would allow us to leverage each other's expertise and accelerate market entry. We would be grateful for the opportunity to discuss this proposal in more detail at your earliest convenience.\n\nShould you be interested, we ____(D)____ a formal proposal outlining the scope, timeline, and resource allocation for your review by the end of next week.\n\nWe look forward to your positive response.\n\nSincerely,\nMark Thompson\nDirector of Business Development",
    "passage_group_id": "p6-020",
    "question_order": 1
  },
  {
    "id": "p6-gen-078",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "Therefore",
      "B": "However",
      "C": "Meanwhile",
      "D": "Nevertheless"
    },
    "answer": "A",
    "explanation_zh": "空白(B)需要一個表示因果或邏輯遞進的過渡詞。前文陳述了公司擁有相關技術，後文提出合作建議，'Therefore'（因此）自然連接了原因（有技術）和結果（提議合作）。'However'和'Nevertheless'表示轉折，但前後文並無對立關係。'Meanwhile'表示同時發生，不體現因果邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "collaboration",
      "sustainable",
      "biodegradable",
      "initiative",
      "proposal"
    ],
    "passage": "Dear Ms. Chen,\n\nI am writing on behalf of GreenTech Solutions to express our strong interest in exploring a potential partnership with EcoInnovate Inc. We have been following your company's remarkable progress in sustainable packaging, and we believe a collaboration could be highly ____(A)____ to both organizations.\n\nOur firm specializes in biodegradable materials, and we have developed several patented technologies that align with your recent product lines. ____(B)____, we would like to propose a joint research initiative focusing on compostable containers for the food industry. ____(C)____\n\nWe are confident that this partnership would allow us to leverage each other's expertise and accelerate market entry. We would be grateful for the opportunity to discuss this proposal in more detail at your earliest convenience.\n\nShould you be interested, we ____(D)____ a formal proposal outlining the scope, timeline, and resource allocation for your review by the end of next week.\n\nWe look forward to your positive response.\n\nSincerely,\nMark Thompson\nDirector of Business Development",
    "passage_group_id": "p6-020",
    "question_order": 2
  },
  {
    "id": "p6-gen-080",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "submitted",
      "B": "have submitted",
      "C": "will submit",
      "D": "would submit"
    },
    "answer": "C",
    "explanation_zh": "空白(D)位於條件句'Should you be interested'（= If you are interested）的主句中，表示未來動作。'will submit'（將提交）是主句將來的標準用法，承諾在對方感興趣後採取行動。'submitted'（過去時）和'have submitted'（現在完成時）不符合條件句的時間邏輯。'would submit'常用於虛擬語氣，但此處是真實條件，故不適用。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "collaboration",
      "sustainable",
      "biodegradable",
      "initiative",
      "proposal"
    ],
    "passage": "Dear Ms. Chen,\n\nI am writing on behalf of GreenTech Solutions to express our strong interest in exploring a potential partnership with EcoInnovate Inc. We have been following your company's remarkable progress in sustainable packaging, and we believe a collaboration could be highly ____(A)____ to both organizations.\n\nOur firm specializes in biodegradable materials, and we have developed several patented technologies that align with your recent product lines. ____(B)____, we would like to propose a joint research initiative focusing on compostable containers for the food industry. ____(C)____\n\nWe are confident that this partnership would allow us to leverage each other's expertise and accelerate market entry. We would be grateful for the opportunity to discuss this proposal in more detail at your earliest convenience.\n\nShould you be interested, we ____(D)____ a formal proposal outlining the scope, timeline, and resource allocation for your review by the end of next week.\n\nWe look forward to your positive response.\n\nSincerely,\nMark Thompson\nDirector of Business Development",
    "passage_group_id": "p6-020",
    "question_order": 4
  },
  {
    "id": "p6-si-020",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Our company has decided to focus on plastic products instead.",
      "B": "The food industry rarely uses packaging.",
      "C": "EcoInnovate Inc. recently changed its company name.",
      "D": "Initial laboratory tests suggest that such containers could decompose within ninety days."
    },
    "answer": "D",
    "explanation_zh": "前句提出可堆肥容器的共同研究計畫，正解以「初步實驗數據」支撐提案可行性。(A) 與全信推動環保合作的方向矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "laboratory test",
      "decompose",
      "container"
    ],
    "passage": "Dear Ms. Chen,\n\nI am writing on behalf of GreenTech Solutions to express our strong interest in exploring a potential partnership with EcoInnovate Inc. We have been following your company's remarkable progress in sustainable packaging, and we believe a collaboration could be highly ____(A)____ to both organizations.\n\nOur firm specializes in biodegradable materials, and we have developed several patented technologies that align with your recent product lines. ____(B)____, we would like to propose a joint research initiative focusing on compostable containers for the food industry. ____(C)____\n\nWe are confident that this partnership would allow us to leverage each other's expertise and accelerate market entry. We would be grateful for the opportunity to discuss this proposal in more detail at your earliest convenience.\n\nShould you be interested, we ____(D)____ a formal proposal outlining the scope, timeline, and resource allocation for your review by the end of next week.\n\nWe look forward to your positive response.\n\nSincerely,\nMark Thompson\nDirector of Business Development",
    "passage_group_id": "p6-020",
    "question_order": 3
  },
  {
    "id": "p6-gen-081",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "significant",
      "B": "significantly",
      "C": "significance",
      "D": "signify"
    },
    "answer": "A",
    "explanation_zh": "答案為A。空格前有不定冠詞「a」，後有名詞「update」，因此需要形容詞來修飾名詞。選項A「significant」是形容詞，意為「重大的」，符合語法與語意；B「significantly」是副詞，不能修飾名詞；C「significance」是名詞，不能放在冠詞後修飾另一名詞；D「signify」是動詞，語法不符。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "update",
      "flexibility",
      "productivity",
      "portal",
      "guidelines"
    ],
    "passage": "To: All Staff\nFrom: Human Resources\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of a ____(A)____ update to our remote work policy, effective May 1st. After reviewing employee feedback, we have decided to increase the number of allowed remote work days per month from four to six. ____(B)____ This change reflects our commitment to flexibility. ____(C)____, employees must still obtain prior approval from their immediate supervisor for each remote work day. We believe this balance will support both productivity and work-life harmony. Please refer to the detailed policy document attached to this email for the full guidelines. All requests for remote work ____(D)____ through the new online portal starting next week. Thank you for your continued cooperation.\n\nBest regards,\nHuman Resources Team",
    "passage_group_id": "p6-021",
    "question_order": 1
  },
  {
    "id": "p6-gen-082",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "Furthermore",
      "B": "However",
      "C": "Therefore",
      "D": "Otherwise"
    },
    "answer": "B",
    "explanation_zh": "答案為B。前句提到增加遠距工作天數，後句說仍需主管批准，兩者之間有轉折關係。選項B「However」表示「然而」，正確表達對比；A「Furthermore」表示「此外」，是遞進關係；C「Therefore」表示「因此」，是因果關係；D「Otherwise」表示「否則」，不符合上下文邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "update",
      "flexibility",
      "productivity",
      "portal",
      "guidelines"
    ],
    "passage": "To: All Staff\nFrom: Human Resources\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of a ____(A)____ update to our remote work policy, effective May 1st. After reviewing employee feedback, we have decided to increase the number of allowed remote work days per month from four to six. ____(B)____ This change reflects our commitment to flexibility. ____(C)____, employees must still obtain prior approval from their immediate supervisor for each remote work day. We believe this balance will support both productivity and work-life harmony. Please refer to the detailed policy document attached to this email for the full guidelines. All requests for remote work ____(D)____ through the new online portal starting next week. Thank you for your continued cooperation.\n\nBest regards,\nHuman Resources Team",
    "passage_group_id": "p6-021",
    "question_order": 3
  },
  {
    "id": "p6-gen-084",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "will submit",
      "B": "submitted",
      "C": "are submitting",
      "D": "will be submitted"
    },
    "answer": "D",
    "explanation_zh": "答案為D。主詞「requests」是動作「submit」的承受者，需用被動語態；時間狀語「starting next week」表示未來，因此用未來被動式。選項D「will be submitted」正確；A「will submit」是主動語態；B「submitted」是過去分詞，缺少助動詞；C「are submitting」是現在進行式主動，語態與時態皆不符。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "update",
      "flexibility",
      "productivity",
      "portal",
      "guidelines"
    ],
    "passage": "To: All Staff\nFrom: Human Resources\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of a ____(A)____ update to our remote work policy, effective May 1st. After reviewing employee feedback, we have decided to increase the number of allowed remote work days per month from four to six. ____(B)____ This change reflects our commitment to flexibility. ____(C)____, employees must still obtain prior approval from their immediate supervisor for each remote work day. We believe this balance will support both productivity and work-life harmony. Please refer to the detailed policy document attached to this email for the full guidelines. All requests for remote work ____(D)____ through the new online portal starting next week. Thank you for your continued cooperation.\n\nBest regards,\nHuman Resources Team",
    "passage_group_id": "p6-021",
    "question_order": 4
  },
  {
    "id": "p6-si-021",
    "part": "Part 6",
    "question": "____(B)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "This makes our policy one of the most flexible in the industry.",
      "B": "As a result, the office will close every Friday.",
      "C": "Remote work will be eliminated entirely next year.",
      "D": "Salaries will be adjusted to reflect commuting costs."
    },
    "answer": "A",
    "explanation_zh": "前句宣布遠距日數由四天增為六天，正解以 This 回指該變更並強調政策彈性，銜接最自然。(C) 與放寬遠距的方向完全矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "flexible",
      "policy",
      "industry"
    ],
    "passage": "To: All Staff\nFrom: Human Resources\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to inform you of a ____(A)____ update to our remote work policy, effective May 1st. After reviewing employee feedback, we have decided to increase the number of allowed remote work days per month from four to six. ____(B)____ This change reflects our commitment to flexibility. ____(C)____, employees must still obtain prior approval from their immediate supervisor for each remote work day. We believe this balance will support both productivity and work-life harmony. Please refer to the detailed policy document attached to this email for the full guidelines. All requests for remote work ____(D)____ through the new online portal starting next week. Thank you for your continued cooperation.\n\nBest regards,\nHuman Resources Team",
    "passage_group_id": "p6-021",
    "question_order": 2
  },
  {
    "id": "p6-gen-085",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "obstructions",
      "B": "obstacles",
      "C": "objections",
      "D": "barriers"
    },
    "answer": "B",
    "explanation_zh": "正確答案是B（obstacles）。空格處需要名詞，意為‘可能阻擋緊急出口的障礙物’。‘obstacles’指具體的物理障礙，符合上下文。A（obstructions）雖然意思相近，但更常用於抽象阻擋或法律阻礙；C（objections）意為‘反對’，與語境無關；D（obstacles）重複出現，但原選項B已正確。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "inspection",
      "evacuation",
      "defective",
      "extinguisher",
      "designated"
    ],
    "passage": "To all staff: Please be advised that the annual fire safety inspection will take place on March 15th. All employees must ensure that their workspaces are free of ____(A)____ that could block emergency exits. ____(B)____, the inspection team will check the functionality of all fire extinguishers and smoke detectors. Any equipment found to be defective will be replaced immediately. ____(C)____ Do not store personal items outside the designated storage area located in the basement. For your safety, please review the attached evacuation plan. ____(D)____ that all employees complete the online safety quiz by March 10th.",
    "passage_group_id": "p6-022",
    "question_order": 1
  },
  {
    "id": "p6-gen-086",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Moreover",
      "D": "Nevertheless"
    },
    "answer": "C",
    "explanation_zh": "正確答案是C（Moreover）。前句要求清除障礙物，後句提到檢查滅火器，兩者是並列的檢查步驟，用‘此外’表示追加信息。A（However）表轉折，不適用；B（Therefore）表因果，但這裡不是結果；D（Nevertheless）表讓步，不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "inspection",
      "evacuation",
      "defective",
      "extinguisher",
      "designated"
    ],
    "passage": "To all staff: Please be advised that the annual fire safety inspection will take place on March 15th. All employees must ensure that their workspaces are free of ____(A)____ that could block emergency exits. ____(B)____, the inspection team will check the functionality of all fire extinguishers and smoke detectors. Any equipment found to be defective will be replaced immediately. ____(C)____ Do not store personal items outside the designated storage area located in the basement. For your safety, please review the attached evacuation plan. ____(D)____ that all employees complete the online safety quiz by March 10th.",
    "passage_group_id": "p6-022",
    "question_order": 2
  },
  {
    "id": "p6-gen-088",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "It is required",
      "B": "They require",
      "C": "Requiring",
      "D": "Require"
    },
    "answer": "A",
    "explanation_zh": "正確答案是A（It is required）。句子需要主語和謂語，‘It is required that...’是常用句型，意為‘要求……’。B（They require）缺少明確主語；C（Requiring）是分詞形式，不能作完整謂語；D（Require）缺少主語。因此只有A符合語法。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "inspection",
      "evacuation",
      "defective",
      "extinguisher",
      "designated"
    ],
    "passage": "To all staff: Please be advised that the annual fire safety inspection will take place on March 15th. All employees must ensure that their workspaces are free of ____(A)____ that could block emergency exits. ____(B)____, the inspection team will check the functionality of all fire extinguishers and smoke detectors. Any equipment found to be defective will be replaced immediately. ____(C)____ Do not store personal items outside the designated storage area located in the basement. For your safety, please review the attached evacuation plan. ____(D)____ that all employees complete the online safety quiz by March 10th.",
    "passage_group_id": "p6-022",
    "question_order": 4
  },
  {
    "id": "p6-si-022",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Employees should purchase their own fire extinguishers.",
      "B": "Replacement costs will be covered entirely by the company.",
      "C": "The basement will be converted into a gym.",
      "D": "Inspections of this kind happen only once a decade."
    },
    "answer": "B",
    "explanation_zh": "前句承諾汰換故障設備，正解說明「汰換費用由公司負擔」，補完同一安排。(A) 與公司統一汰換的做法矛盾，(D) 與「年度檢查」矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "replacement",
      "cover",
      "cost"
    ],
    "passage": "To all staff: Please be advised that the annual fire safety inspection will take place on March 15th. All employees must ensure that their workspaces are free of ____(A)____ that could block emergency exits. ____(B)____, the inspection team will check the functionality of all fire extinguishers and smoke detectors. Any equipment found to be defective will be replaced immediately. ____(C)____ Do not store personal items outside the designated storage area located in the basement. For your safety, please review the attached evacuation plan. ____(D)____ that all employees complete the online safety quiz by March 10th.",
    "passage_group_id": "p6-022",
    "question_order": 3
  },
  {
    "id": "p6-gen-089",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "postponement",
      "B": "delay",
      "C": "adjustment",
      "D": "cancellation"
    },
    "answer": "C",
    "explanation_zh": "空白A需要填入一個表示營業時間臨時變動的名詞。'adjustment'（調整）最合適，因為後文具體說明了開門時間從9:00改為9:30，這是一種調整，而非推遲（postponement）、延誤（delay）或取消（cancellation）。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "renovation",
      "inconvenience",
      "hesitate",
      "customer service",
      "weekdays"
    ],
    "passage": "Dear Valued Customer,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our doors will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will remain open until 8:00 PM on weekdays to better serve you. ____(C)____ This change is necessary due to the ongoing renovation of our main entrance. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. Thank you for your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-023",
    "question_order": 1
  },
  {
    "id": "p6-gen-090",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "Therefore",
      "B": "However",
      "C": "Meanwhile",
      "D": "Furthermore"
    },
    "answer": "D",
    "explanation_zh": "空白B需要一個表示遞進關係的連接詞。前句說開門時間推遲30分鐘，後句說工作日會延長營業到晚上8點，這是對顧客有利的額外信息，所以'Furthermore'（此外）最恰當。'Therefore'表示因果關係，'However'表示轉折，'Meanwhile'表示同時，均不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "renovation",
      "inconvenience",
      "hesitate",
      "customer service",
      "weekdays"
    ],
    "passage": "Dear Valued Customer,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our doors will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will remain open until 8:00 PM on weekdays to better serve you. ____(C)____ This change is necessary due to the ongoing renovation of our main entrance. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. Thank you for your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-023",
    "question_order": 2
  },
  {
    "id": "p6-gen-092",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "don't",
      "B": "do not",
      "C": "not",
      "D": "no"
    },
    "answer": "B",
    "explanation_zh": "空白D需要一個與'please'搭配表示禮貌請求的否定結構。'please do not hesitate'是標準商務用語，意為'請隨時'。'don't'過於口語化，不適合正式通知；'not'和'no'在語法上無法與'please'直接搭配形成祈使句。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "temporary",
      "renovation",
      "inconvenience",
      "hesitate",
      "customer service",
      "weekdays"
    ],
    "passage": "Dear Valued Customer,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our doors will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will remain open until 8:00 PM on weekdays to better serve you. ____(C)____ This change is necessary due to the ongoing renovation of our main entrance. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. Thank you for your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-023",
    "question_order": 4
  },
  {
    "id": "p6-si-023",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The renovation has been postponed indefinitely.",
      "B": "A new branch will open downtown next month.",
      "C": "Weekend hours will remain unchanged throughout this period.",
      "D": "Our loyalty program has been discontinued."
    },
    "answer": "C",
    "explanation_zh": "前文交代平日開店與打烊時間的調整，正解補充「週末時間不變」，讓營業資訊完整。(A) 與「因裝修而調整」的理由矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "weekend hours",
      "unchanged",
      "period"
    ],
    "passage": "Dear Valued Customer,\n\nWe are writing to inform you of a temporary ____(A)____ to our store hours. Starting next Monday, our doors will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will remain open until 8:00 PM on weekdays to better serve you. ____(C)____ This change is necessary due to the ongoing renovation of our main entrance. We apologize for any inconvenience this may cause. If you have any questions, please ____(D)____ hesitate to contact our customer service team. Thank you for your understanding.\n\nSincerely,\nStore Management",
    "passage_group_id": "p6-023",
    "question_order": 3
  },
  {
    "id": "p6-gen-093",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "attraction",
      "B": "curiosity",
      "C": "interest",
      "D": "attention"
    },
    "answer": "D",
    "explanation_zh": "空白(A)處需要與動詞'garnered'搭配的名詞，表示引起關注。'Garnered attention'是正式商業語境中的固定搭配，意為'引起廣泛關注'。'Attraction'雖相關但通常不與'garnered'搭配；'curiosity'語氣不夠正式；'interest'雖可接受但'attention'更強調行業內的普遍關注，且與'significant'搭配更自然。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "advancements",
      "garnered",
      "collaboration",
      "prototypes",
      "accelerate"
    ],
    "passage": "Dear Ms. Nakamura,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Ltd. Your company’s recent advancements in sustainable packaging have garnered significant ____(A)____ in the industry. We believe that combining our expertise in biodegradable materials with your distribution network could yield substantial benefits for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential collaboration opportunities. Our team has developed several innovative prototypes that align closely with your product line, and we are confident that a joint venture would accelerate time-to-market for these solutions. ____(C)____\n\nWe are committed to transparent communication and mutual growth. To facilitate further discussion, we have attached a brief overview of our current projects. We hope this information provides a clear picture of our capabilities.\n\nIf this proposal aligns with your strategic goals, we ____(D)____ forward to scheduling a conference call next month. Please let us know your availability at your earliest convenience.\n\nSincerely,\nJames Carter\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-024",
    "question_order": 1
  },
  {
    "id": "p6-gen-094",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "To this end",
      "B": "Nevertheless",
      "C": "In contrast",
      "D": "Otherwise"
    },
    "answer": "A",
    "explanation_zh": "空白(B)處需要一個邏輯連接詞，表示'為此目的'或'為了實現上述目標'。'To this end'是正式商務信函中的常用表達，用於連接前文提到的合作興趣與後文的具體提議。'Nevertheless'表轉折，不符合此處承接關係；'In contrast'表對比，邏輯錯誤；'Otherwise'表否則，與提議的積極語氣不符。",
    "skill_tag": "conjunction",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "advancements",
      "garnered",
      "collaboration",
      "prototypes",
      "accelerate"
    ],
    "passage": "Dear Ms. Nakamura,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Ltd. Your company’s recent advancements in sustainable packaging have garnered significant ____(A)____ in the industry. We believe that combining our expertise in biodegradable materials with your distribution network could yield substantial benefits for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential collaboration opportunities. Our team has developed several innovative prototypes that align closely with your product line, and we are confident that a joint venture would accelerate time-to-market for these solutions. ____(C)____\n\nWe are committed to transparent communication and mutual growth. To facilitate further discussion, we have attached a brief overview of our current projects. We hope this information provides a clear picture of our capabilities.\n\nIf this proposal aligns with your strategic goals, we ____(D)____ forward to scheduling a conference call next month. Please let us know your availability at your earliest convenience.\n\nSincerely,\nJames Carter\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-024",
    "question_order": 2
  },
  {
    "id": "p6-gen-096",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "looked",
      "B": "are looking",
      "C": "will look",
      "D": "look"
    },
    "answer": "C",
    "explanation_zh": "空白(D)處需要正確的動詞時態。主句為條件句'If this proposal aligns...'，表示未來的可能性，主句應使用將來時態'will look forward to'，意為'將期待'。'Looked'是過去時，與條件句的未來語境不符；'are looking'是現在進行時，雖可表示計劃但不如將來時準確；'look'是一般現在時，在條件句中不表示未來。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "advancements",
      "garnered",
      "collaboration",
      "prototypes",
      "accelerate"
    ],
    "passage": "Dear Ms. Nakamura,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Ltd. Your company’s recent advancements in sustainable packaging have garnered significant ____(A)____ in the industry. We believe that combining our expertise in biodegradable materials with your distribution network could yield substantial benefits for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential collaboration opportunities. Our team has developed several innovative prototypes that align closely with your product line, and we are confident that a joint venture would accelerate time-to-market for these solutions. ____(C)____\n\nWe are committed to transparent communication and mutual growth. To facilitate further discussion, we have attached a brief overview of our current projects. We hope this information provides a clear picture of our capabilities.\n\nIf this proposal aligns with your strategic goals, we ____(D)____ forward to scheduling a conference call next month. Please let us know your availability at your earliest convenience.\n\nSincerely,\nJames Carter\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-024",
    "question_order": 4
  },
  {
    "id": "p6-si-024",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Our company has no experience in packaging.",
      "B": "EcoInnovate Ltd. should lower its prices.",
      "C": "The industry conference was canceled this year.",
      "D": "Two of these prototypes are already undergoing third-party certification."
    },
    "answer": "D",
    "explanation_zh": "前句提到已開發多項原型品，正解以「其中兩項已送第三方認證」強化可信度，these prototypes 回指前句。(A) 與自家專長的敘述矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "prototype",
      "certification",
      "third-party"
    ],
    "passage": "Dear Ms. Nakamura,\n\nI am writing on behalf of GreenTech Solutions to express our keen interest in exploring a strategic partnership with EcoInnovate Ltd. Your company’s recent advancements in sustainable packaging have garnered significant ____(A)____ in the industry. We believe that combining our expertise in biodegradable materials with your distribution network could yield substantial benefits for both organizations.\n\n____(B)____, we would like to propose an initial meeting to discuss potential collaboration opportunities. Our team has developed several innovative prototypes that align closely with your product line, and we are confident that a joint venture would accelerate time-to-market for these solutions. ____(C)____\n\nWe are committed to transparent communication and mutual growth. To facilitate further discussion, we have attached a brief overview of our current projects. We hope this information provides a clear picture of our capabilities.\n\nIf this proposal aligns with your strategic goals, we ____(D)____ forward to scheduling a conference call next month. Please let us know your availability at your earliest convenience.\n\nSincerely,\nJames Carter\nDirector of Business Development\nGreenTech Solutions",
    "passage_group_id": "p6-024",
    "question_order": 3
  },
  {
    "id": "p6-gen-097",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "component",
      "B": "composition",
      "C": "compose",
      "D": "composite"
    },
    "answer": "A",
    "explanation_zh": "答案為 A。空白處需要一個名詞，且前面有形容詞「key」修飾，表示「這個改變的一個關鍵組成部分」。選項 A「component」是名詞，意為「組成部分」，符合語境。B「composition」是名詞，但指「構成、組成方式」，不適合指具體的單一項目。C「compose」是動詞，不能放在此處。D「composite」是形容詞或名詞，意為「複合材料」，與文意不符。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "policy",
      "requirement",
      "compliance",
      "transition",
      "mandatory"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company's remote work policy will be updated effective June 1st. A key ____(A)____ of this change is the requirement for all employees to complete a new time-tracking form. This new procedure will help us better monitor project hours and resource allocation. ____(B)____, it will ensure compliance with recent labor regulations. ____(C)____ To prepare for this transition, please attend a mandatory training session scheduled on May 25th. During this session, you will learn how to submit the form correctly. All team leads ____(D)____ to verify that their members have completed the training by May 30th. Thank you for your cooperation.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-025",
    "question_order": 1
  },
  {
    "id": "p6-gen-098",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Additionally",
      "C": "Therefore",
      "D": "Nevertheless"
    },
    "answer": "B",
    "explanation_zh": "答案為 B。前一句提到新程序有助於監控工時，此句進一步說明它還能確保符合法規，兩者為並列關係。選項 B「Additionally」意為「此外」，表示補充說明，符合邏輯。A「However」和 D「Nevertheless」都表示轉折，與文意不符。C「Therefore」表示因果，但此處並非因果關係。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "procedure",
      "monitor",
      "allocation",
      "compliance",
      "regulations"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company's remote work policy will be updated effective June 1st. A key ____(A)____ of this change is the requirement for all employees to complete a new time-tracking form. This new procedure will help us better monitor project hours and resource allocation. ____(B)____, it will ensure compliance with recent labor regulations. ____(C)____ To prepare for this transition, please attend a mandatory training session scheduled on May 25th. During this session, you will learn how to submit the form correctly. All team leads ____(D)____ to verify that their members have completed the training by May 30th. Thank you for your cooperation.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-025",
    "question_order": 2
  },
  {
    "id": "p6-gen-100",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "expected",
      "B": "are expecting",
      "C": "have expected",
      "D": "are expected"
    },
    "answer": "D",
    "explanation_zh": "答案為 D。主詞「All team leads」是動作「expect」的受詞，需用被動語態。選項 D「are expected」為被動現在式，意為「被期望」，符合語法。A「expected」缺少助動詞，B「are expecting」和 C「have expected」均為主動語態，與語意不符。",
    "skill_tag": "tense",
    "difficulty": "B1",
    "vocabulary": [
      "verify",
      "completed",
      "training",
      "effective",
      "required"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company's remote work policy will be updated effective June 1st. A key ____(A)____ of this change is the requirement for all employees to complete a new time-tracking form. This new procedure will help us better monitor project hours and resource allocation. ____(B)____, it will ensure compliance with recent labor regulations. ____(C)____ To prepare for this transition, please attend a mandatory training session scheduled on May 25th. During this session, you will learn how to submit the form correctly. All team leads ____(D)____ to verify that their members have completed the training by May 30th. Thank you for your cooperation.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-025",
    "question_order": 4
  },
  {
    "id": "p6-si-025",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Accurate records will also simplify client billing at the end of each project.",
      "B": "The time-tracking form is optional for managers.",
      "C": "Labor regulations no longer apply to our industry.",
      "D": "Project budgets will be announced at the holiday party."
    },
    "answer": "A",
    "explanation_zh": "前文說明工時表能監控工時並符合法規，正解再補一項好處（簡化請款），與前句並列。(B) 與「全體員工皆須填寫」矛盾，(C) 與前句直接矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "accurate records",
      "billing",
      "simplify"
    ],
    "passage": "Dear Team,\n\nPlease be advised that the company's remote work policy will be updated effective June 1st. A key ____(A)____ of this change is the requirement for all employees to complete a new time-tracking form. This new procedure will help us better monitor project hours and resource allocation. ____(B)____, it will ensure compliance with recent labor regulations. ____(C)____ To prepare for this transition, please attend a mandatory training session scheduled on May 25th. During this session, you will learn how to submit the form correctly. All team leads ____(D)____ to verify that their members have completed the training by May 30th. Thank you for your cooperation.\n\nBest regards,\nSarah Jenkins\nHR Department",
    "passage_group_id": "p6-025",
    "question_order": 3
  },
  {
    "id": "p6-gen-101",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "ware",
      "B": "wear",
      "C": "wary",
      "D": "wears"
    },
    "answer": "B",
    "explanation_zh": "答案為 B「wear」。空格前有情態助動詞 must，後接原形動詞，wear 表示「穿戴」，符合句子要求員工穿戴安全背心與安全帽；A ware（商品）為名詞、C wary（謹慎的）為形容詞、D wears 為第三人稱單數動詞，皆不正確。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "memo",
      "mandatory",
      "procedure",
      "hazards",
      "suspension"
    ],
    "passage": "To all warehouse staff,\n\nThis memo serves as a formal reminder regarding the updated safety procedure for the loading dock area. All employees must ____(A)____ the mandatory safety vest and hard hat before entering the zone. ____(B)____, any loose items such as boxes or tools must be secured to prevent tripping hazards. ____(C)____ Please store all equipment in the designated yellow cabinets located near the east entrance. Failure to comply with these rules ____(D)____ in immediate suspension from duty pending a full review.\n\nThank you for your cooperation.\n\nFacilities Management",
    "passage_group_id": "p6-026",
    "question_order": 1
  },
  {
    "id": "p6-gen-102",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "Additionally",
      "D": "Nevertheless"
    },
    "answer": "C",
    "explanation_zh": "答案為 C「Additionally」。前句要求穿戴裝備，後句補充說明要固定鬆散物品，兩者為並列關係，Additionally 表示「此外」；A However（然而）表轉折、B Therefore（因此）表因果、D Nevertheless（儘管如此）表讓步，皆不符合上下文邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "memo",
      "mandatory",
      "procedure",
      "hazards",
      "suspension"
    ],
    "passage": "To all warehouse staff,\n\nThis memo serves as a formal reminder regarding the updated safety procedure for the loading dock area. All employees must ____(A)____ the mandatory safety vest and hard hat before entering the zone. ____(B)____, any loose items such as boxes or tools must be secured to prevent tripping hazards. ____(C)____ Please store all equipment in the designated yellow cabinets located near the east entrance. Failure to comply with these rules ____(D)____ in immediate suspension from duty pending a full review.\n\nThank you for your cooperation.\n\nFacilities Management",
    "passage_group_id": "p6-026",
    "question_order": 2
  },
  {
    "id": "p6-gen-104",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "results",
      "B": "result",
      "C": "resulting",
      "D": "resulted"
    },
    "answer": "A",
    "explanation_zh": "答案為 A「results」。主詞 Failure 為單數，且句子描述一般規則（未遵守導致停職），需用現在式第三人稱單數 results；B result 為原形、C resulting 為分詞、D resulted 為過去式，皆與主詞及時態不符。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "memo",
      "mandatory",
      "procedure",
      "hazards",
      "suspension"
    ],
    "passage": "To all warehouse staff,\n\nThis memo serves as a formal reminder regarding the updated safety procedure for the loading dock area. All employees must ____(A)____ the mandatory safety vest and hard hat before entering the zone. ____(B)____, any loose items such as boxes or tools must be secured to prevent tripping hazards. ____(C)____ Please store all equipment in the designated yellow cabinets located near the east entrance. Failure to comply with these rules ____(D)____ in immediate suspension from duty pending a full review.\n\nThank you for your cooperation.\n\nFacilities Management",
    "passage_group_id": "p6-026",
    "question_order": 4
  },
  {
    "id": "p6-si-026",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "The loading dock will be painted blue next week.",
      "B": "Safety officers will patrol the area twice per shift to verify compliance.",
      "C": "Hard hats are available in the gift shop.",
      "D": "Forklift licenses expire after ten years."
    },
    "answer": "B",
    "explanation_zh": "前文列出裝卸區的安全規定，正解說明「安全人員將巡查確保落實」，與文末的違規處分相呼應。其他選項與安全規範無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "patrol",
      "shift",
      "compliance"
    ],
    "passage": "To all warehouse staff,\n\nThis memo serves as a formal reminder regarding the updated safety procedure for the loading dock area. All employees must ____(A)____ the mandatory safety vest and hard hat before entering the zone. ____(B)____, any loose items such as boxes or tools must be secured to prevent tripping hazards. ____(C)____ Please store all equipment in the designated yellow cabinets located near the east entrance. Failure to comply with these rules ____(D)____ in immediate suspension from duty pending a full review.\n\nThank you for your cooperation.\n\nFacilities Management",
    "passage_group_id": "p6-026",
    "question_order": 3
  },
  {
    "id": "p6-gen-105",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "result",
      "B": "decision",
      "C": "adjustment",
      "D": "problem"
    },
    "answer": "C",
    "explanation_zh": "此處需要表示‘調整’的名詞，‘adjustment’符合語境，表示對營業時間的調整。‘result’是結果，‘decision’是決定，‘problem’是問題，均不恰當。",
    "skill_tag": "business_vocabulary",
    "difficulty": "A2",
    "vocabulary": [
      "informed",
      "effective",
      "extend",
      "hesitate",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will extend our closing time from 6:00 PM to 7:00 PM. ____(C)____ This change is effective from November 15th. We believe this new schedule will better serve your needs. If you have any questions, please ____(D)____ not hesitate to contact our customer service team. We appreciate your understanding and continued support.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-027",
    "question_order": 1
  },
  {
    "id": "p6-gen-106",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "However",
      "B": "Therefore",
      "C": "For example",
      "D": "In addition"
    },
    "answer": "D",
    "explanation_zh": "此處需要表示‘此外’的遞進連接詞，‘In addition’最恰當，因為後面補充了關門時間也延長。‘However’表示轉折，‘Therefore’表示因果，‘For example’表示舉例，均不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "A2",
    "vocabulary": [
      "informed",
      "effective",
      "extend",
      "hesitate",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will extend our closing time from 6:00 PM to 7:00 PM. ____(C)____ This change is effective from November 15th. We believe this new schedule will better serve your needs. If you have any questions, please ____(D)____ not hesitate to contact our customer service team. We appreciate your understanding and continued support.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-027",
    "question_order": 2
  },
  {
    "id": "p6-gen-108",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "must",
      "B": "should",
      "C": "will",
      "D": "do"
    },
    "answer": "B",
    "explanation_zh": "此處需要情態動詞‘should’表示‘請不必猶豫’，構成禮貌建議。‘must’太強硬，‘will’表示將來，‘do’用於強調或否定，均不符合禮貌請求的語境。",
    "skill_tag": "tense",
    "difficulty": "A2",
    "vocabulary": [
      "informed",
      "effective",
      "extend",
      "hesitate",
      "appreciate"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will extend our closing time from 6:00 PM to 7:00 PM. ____(C)____ This change is effective from November 15th. We believe this new schedule will better serve your needs. If you have any questions, please ____(D)____ not hesitate to contact our customer service team. We appreciate your understanding and continued support.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-027",
    "question_order": 4
  },
  {
    "id": "p6-si-027",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Morning deliveries will be discontinued.",
      "B": "The store will be closed on all weekends.",
      "C": "Customers who prefer evening shopping will find this especially convenient.",
      "D": "Our founder retired earlier this year."
    },
    "answer": "C",
    "explanation_zh": "前句宣布延後打烊一小時，正解說明此調整對「偏好晚間購物的顧客」的好處，this 回指前句變更。其他選項與營業時間無關。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "evening shopping",
      "convenient",
      "prefer"
    ],
    "passage": "Dear Valued Customers,\n\nWe are writing to inform you of an important ____(A)____ to our store hours. Starting next Monday, our store will open at 9:30 AM instead of 9:00 AM. ____(B)____, we will extend our closing time from 6:00 PM to 7:00 PM. ____(C)____ This change is effective from November 15th. We believe this new schedule will better serve your needs. If you have any questions, please ____(D)____ not hesitate to contact our customer service team. We appreciate your understanding and continued support.\n\nSincerely,\nThe Management",
    "passage_group_id": "p6-027",
    "question_order": 3
  },
  {
    "id": "p6-gen-109",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "breakthroughs",
      "B": "innovations",
      "C": "achievements",
      "D": "prowess"
    },
    "answer": "D",
    "explanation_zh": "此處需要表示'卓越能力'或'傑出專長'的名詞。'prowess'意為卓越的技能或能力，與'admired your firm's prowess in sustainable urban development'搭配最為正式和恰當。'breakthroughs'指突破性進展，'innovations'指創新，'achievements'指成就，雖然均可接受，但不如'prowess'精準表達公司在該領域的整體傑出能力。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "synergy",
      "joint venture",
      "accelerate",
      "collaborative"
    ],
    "passage": "Dear Mr. Chen, I am writing to express our company's keen interest in exploring a potential strategic partnership with GreenTech Solutions. As a leading provider of renewable energy components, we have long admired your firm's ____(A)____ in sustainable urban development. Our recent market analysis indicates a strong synergy between your expertise in smart grid technology and our advanced solar panel manufacturing capabilities. ____(B)____ ____(C)____, we believe a joint venture could significantly accelerate our entry into the Southeast Asian market. We would be delighted to invite your team to our headquarters for a preliminary discussion during the second week of May. Should this timeframe be inconvenient, please let us know your availability. We are confident that a collaborative effort ____(D)____ substantial benefits for both organizations. We look forward to your favorable response. Sincerely, Maria Santos, CEO, SunVolt Industries.",
    "passage_group_id": "p6-028",
    "question_order": 1
  },
  {
    "id": "p6-gen-110",
    "part": "Part 6",
    "question": "____(C)____",
    "choices": {
      "A": "Therefore",
      "B": "However",
      "C": "Furthermore",
      "D": "Nevertheless"
    },
    "answer": "A",
    "explanation_zh": "空白處需要表示因果關係的邏輯連接詞。前文描述了雙方能力的互補性（synergy），後文提出了合作建議（joint venture），因此'Therefore'（因此）最符合邏輯。'However'和'Nevertheless'表示轉折，'Furthermore'表示遞進，均不符合上下文因果關係。",
    "skill_tag": "conjunction",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "synergy",
      "joint venture",
      "accelerate",
      "collaborative"
    ],
    "passage": "Dear Mr. Chen, I am writing to express our company's keen interest in exploring a potential strategic partnership with GreenTech Solutions. As a leading provider of renewable energy components, we have long admired your firm's ____(A)____ in sustainable urban development. Our recent market analysis indicates a strong synergy between your expertise in smart grid technology and our advanced solar panel manufacturing capabilities. ____(B)____ ____(C)____, we believe a joint venture could significantly accelerate our entry into the Southeast Asian market. We would be delighted to invite your team to our headquarters for a preliminary discussion during the second week of May. Should this timeframe be inconvenient, please let us know your availability. We are confident that a collaborative effort ____(D)____ substantial benefits for both organizations. We look forward to your favorable response. Sincerely, Maria Santos, CEO, SunVolt Industries.",
    "passage_group_id": "p6-028",
    "question_order": 3
  },
  {
    "id": "p6-gen-112",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "has yielded",
      "B": "yields",
      "C": "will yield",
      "D": "would yield"
    },
    "answer": "C",
    "explanation_zh": "主句'We are confident that'後接賓語從句，表達對未來的確信。'will yield'表示將來肯定會帶來好處，語氣堅定且符合正式信函的自信態度。'has yielded'是現在完成時，與未來語境不符；'yields'是一般現在時，缺乏未來指向；'would yield'是虛擬語氣，暗示不確定性，與'confident'矛盾。",
    "skill_tag": "tense",
    "difficulty": "B2",
    "vocabulary": [
      "partnership",
      "synergy",
      "joint venture",
      "accelerate",
      "collaborative"
    ],
    "passage": "Dear Mr. Chen, I am writing to express our company's keen interest in exploring a potential strategic partnership with GreenTech Solutions. As a leading provider of renewable energy components, we have long admired your firm's ____(A)____ in sustainable urban development. Our recent market analysis indicates a strong synergy between your expertise in smart grid technology and our advanced solar panel manufacturing capabilities. ____(B)____ ____(C)____, we believe a joint venture could significantly accelerate our entry into the Southeast Asian market. We would be delighted to invite your team to our headquarters for a preliminary discussion during the second week of May. Should this timeframe be inconvenient, please let us know your availability. We are confident that a collaborative effort ____(D)____ substantial benefits for both organizations. We look forward to your favorable response. Sincerely, Maria Santos, CEO, SunVolt Industries.",
    "passage_group_id": "p6-028",
    "question_order": 4
  },
  {
    "id": "p6-si-028",
    "part": "Part 6",
    "question": "____(B)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "Unfortunately, our production line is currently shut down.",
      "B": "GreenTech Solutions was fined by regulators last year.",
      "C": "We intend to compete directly against your firm.",
      "D": "Together, these strengths could form a complete clean-energy solution for city planners."
    },
    "answer": "D",
    "explanation_zh": "前句並列雙方的智慧電網與太陽能板優勢，正解以 these strengths 統整兩者並指出合作願景，銜接最緊密。(C) 與提案合作的目的相反。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "strength",
      "clean energy",
      "city planner"
    ],
    "passage": "Dear Mr. Chen, I am writing to express our company's keen interest in exploring a potential strategic partnership with GreenTech Solutions. As a leading provider of renewable energy components, we have long admired your firm's ____(A)____ in sustainable urban development. Our recent market analysis indicates a strong synergy between your expertise in smart grid technology and our advanced solar panel manufacturing capabilities. ____(B)____ ____(C)____, we believe a joint venture could significantly accelerate our entry into the Southeast Asian market. We would be delighted to invite your team to our headquarters for a preliminary discussion during the second week of May. Should this timeframe be inconvenient, please let us know your availability. We are confident that a collaborative effort ____(D)____ substantial benefits for both organizations. We look forward to your favorable response. Sincerely, Maria Santos, CEO, SunVolt Industries.",
    "passage_group_id": "p6-028",
    "question_order": 2
  },
  {
    "id": "p6-gen-113",
    "part": "Part 6",
    "question": "____(A)____",
    "choices": {
      "A": "update",
      "B": "updates",
      "C": "updated",
      "D": "updating"
    },
    "answer": "A",
    "explanation_zh": "答案為(A) update。空格前有不定冠詞 an 和形容詞 important，因此需要一個可數名詞單數形式。update 表示「更新」，符合句子語意；updates 是複數，與 an 衝突；updated 是形容詞或過去分詞，不能直接放在 an 後；updating 是動名詞，不適合此結構。",
    "skill_tag": "word_form",
    "difficulty": "B1",
    "vocabulary": [
      "announce",
      "policy",
      "flexibility",
      "productivity",
      "remote",
      "guidelines"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to announce an important ____(A)____ to our remote work policy, effective May 1, 2024. This change is part of our ongoing effort to improve workplace flexibility while maintaining productivity.\n\nUnder the new policy, employees may work remotely up to three days per week. ____(B)____, those in client-facing roles must obtain manager approval before scheduling remote days. ____(C)____ We believe this adjustment will better support both individual and team needs.\n\nPlease review the full policy document attached to this email. All employees are required ____(D)____ an online training module on the new guidelines by April 25, 2024.\n\nThank you for your cooperation.\n\nBest regards,\nHR Department",
    "passage_group_id": "p6-029",
    "question_order": 1
  },
  {
    "id": "p6-gen-114",
    "part": "Part 6",
    "question": "____(B)____",
    "choices": {
      "A": "Therefore",
      "B": "However",
      "C": "Moreover",
      "D": "Consequently"
    },
    "answer": "B",
    "explanation_zh": "答案為(B) However。前句說明新政策允許每週最多三天遠距工作，後句提到客戶面向角色需經理批准，兩者之間存在轉折關係。However 表示「然而」，正確表達對比；Therefore 和 Consequently 表示因果，Moreover 表示遞進，均不符合邏輯。",
    "skill_tag": "conjunction",
    "difficulty": "B1",
    "vocabulary": [
      "announce",
      "policy",
      "flexibility",
      "productivity",
      "remote",
      "guidelines"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to announce an important ____(A)____ to our remote work policy, effective May 1, 2024. This change is part of our ongoing effort to improve workplace flexibility while maintaining productivity.\n\nUnder the new policy, employees may work remotely up to three days per week. ____(B)____, those in client-facing roles must obtain manager approval before scheduling remote days. ____(C)____ We believe this adjustment will better support both individual and team needs.\n\nPlease review the full policy document attached to this email. All employees are required ____(D)____ an online training module on the new guidelines by April 25, 2024.\n\nThank you for your cooperation.\n\nBest regards,\nHR Department",
    "passage_group_id": "p6-029",
    "question_order": 2
  },
  {
    "id": "p6-gen-116",
    "part": "Part 6",
    "question": "____(D)____",
    "choices": {
      "A": "complete",
      "B": "completing",
      "C": "completed",
      "D": "to complete"
    },
    "answer": "D",
    "explanation_zh": "答案為(D) to complete。片語 be required to do something 是固定用法，表示「被要求做某事」，因此需用不定詞 to complete；complete 是原形動詞，completing 是動名詞，completed 是過去分詞，皆不符合語法結構。",
    "skill_tag": "business_vocabulary",
    "difficulty": "B1",
    "vocabulary": [
      "announce",
      "policy",
      "flexibility",
      "productivity",
      "remote",
      "guidelines"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to announce an important ____(A)____ to our remote work policy, effective May 1, 2024. This change is part of our ongoing effort to improve workplace flexibility while maintaining productivity.\n\nUnder the new policy, employees may work remotely up to three days per week. ____(B)____, those in client-facing roles must obtain manager approval before scheduling remote days. ____(C)____ We believe this adjustment will better support both individual and team needs.\n\nPlease review the full policy document attached to this email. All employees are required ____(D)____ an online training module on the new guidelines by April 25, 2024.\n\nThank you for your cooperation.\n\nBest regards,\nHR Department",
    "passage_group_id": "p6-029",
    "question_order": 4
  },
  {
    "id": "p6-si-029",
    "part": "Part 6",
    "question": "____(C)____ — 選出最適合填入空格的句子",
    "choices": {
      "A": "This exception ensures that client meetings remain fully staffed at all times.",
      "B": "Client-facing roles will be eliminated in May.",
      "C": "All employees must now work from home full-time.",
      "D": "The HR portal will be offline permanently."
    },
    "answer": "A",
    "explanation_zh": "前句規定客戶導向職位須先取得核准，正解以 This exception 回指該特殊規定並說明其目的。(B)(C) 都與政策內容直接矛盾。",
    "skill_tag": "sentence_insertion",
    "difficulty": "B2",
    "vocabulary": [
      "exception",
      "fully staffed",
      "client meeting"
    ],
    "passage": "To: All Staff\nFrom: Human Resources Department\nSubject: Updated Remote Work Policy\n\nDear Team,\n\nWe are writing to announce an important ____(A)____ to our remote work policy, effective May 1, 2024. This change is part of our ongoing effort to improve workplace flexibility while maintaining productivity.\n\nUnder the new policy, employees may work remotely up to three days per week. ____(B)____, those in client-facing roles must obtain manager approval before scheduling remote days. ____(C)____ We believe this adjustment will better support both individual and team needs.\n\nPlease review the full policy document attached to this email. All employees are required ____(D)____ an online training module on the new guidelines by April 25, 2024.\n\nThank you for your cooperation.\n\nBest regards,\nHR Department",
    "passage_group_id": "p6-029",
    "question_order": 3
  },
  {
    "id": "p2-gen-051",
    "part": "Part 2",
    "question": "When will the next training session be held?",
    "choices": {
      "A": "It's scheduled for next Tuesday.",
      "B": "The training materials are on your desk.",
      "C": "I attended the last session."
    },
    "answer": "A",
    "explanation_zh": "這個問題詢問的是訓練會議的具體時間，正確回答是 \"It's scheduled for next Tuesday.\"。選項 B 提到 \"training materials\"（訓練材料），但是並沒有回答時間問題。選項 C 談到上次的會議，但沒有提供下次會議的時間資訊。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "training",
      "session",
      "scheduled"
    ],
    "audioScript": "Q: When will the next training session be held?\n(A) It's scheduled for next Tuesday.\n(B) The training materials are on your desk.\n(C) I attended the last session."
  },
  {
    "id": "p2-gen-052",
    "part": "Part 2",
    "question": "Where is the new office supply store?",
    "choices": {
      "A": "We received the supplies yesterday.",
      "B": "It's on Main Street, next to the bank.",
      "C": "They deliver supplies every Tuesday."
    },
    "answer": "B",
    "explanation_zh": "問題尋找的是新辦公用品店的位置，選項B提供了具體位置：“在主街，靠近銀行”。選項A重複了“supplies”這個詞，但回答的是什麼時候收到供應品，並沒有給出位置。選項C談論的是供應品的送達時間，而不是店的位置。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "office supply",
      "store",
      "deliver"
    ],
    "audioScript": "Q: Where is the new office supply store?\n(A) We received the supplies yesterday.\n(B) It's on Main Street, next to the bank.\n(C) They deliver supplies every Tuesday."
  },
  {
    "id": "p2-gen-053",
    "part": "Part 2",
    "question": "Who is responsible for handling customer service inquiries?",
    "choices": {
      "A": "The meeting is scheduled for 3 PM.",
      "B": "Customer inquiries are important.",
      "C": "That would be Janet in the support department."
    },
    "answer": "C",
    "explanation_zh": "這是一個詢問誰負責客戶服務詢問的問題。選項A提到會議時間，與問題無關。選項B提到客戶詢問的重要性，但沒有回答誰負責。選項C提供了具體的人名和部門，因此是正確答案。選項B重複了'customer inquiries'這個詞，但沒有回答誰負責。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "responsible",
      "customer service",
      "inquiries"
    ],
    "audioScript": "Q: Who is responsible for handling customer service inquiries?\n(A) The meeting is scheduled for 3 PM.\n(B) Customer inquiries are important.\n(C) That would be Janet in the support department."
  },
  {
    "id": "p2-gen-054",
    "part": "Part 2",
    "question": "Why is the training session postponed?",
    "choices": {
      "A": "The instructor is unavailable today.",
      "B": "We will discuss the session in the meeting.",
      "C": "The session will cover new software."
    },
    "answer": "A",
    "explanation_zh": "問題詢問為什麼訓練課程被延後。選項A提到“講師今天無法出席”，這給出了課程被延後的原因。因此選項A是正確的。選項B中的“會議”沒有回答為什麼訓練課程被延後；選項C提到“課程將涵蓋新軟體”，但沒有解釋為什麼課程被延後。選項C以“session”這個詞作為陷阱，雖然提到同樣的“session”，但它沒有回答為什麼課程被推遲。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "training",
      "postponed",
      "instructor"
    ],
    "audioScript": "Q: Why is the training session postponed?\n(A) The instructor is unavailable today.\n(B) We will discuss the session in the meeting.\n(C) The session will cover new software."
  },
  {
    "id": "p2-gen-055",
    "part": "Part 2",
    "question": "How should we handle the invoice discrepancy?",
    "choices": {
      "A": "The invoice was sent last week.",
      "B": "Let's double-check all the charges first.",
      "C": "It was for a large amount."
    },
    "answer": "B",
    "explanation_zh": "問題詢問如何處理發票差異，要求方法。選項B建議先檢查所有收費，直接回答了如何處理的問題。選項A重複了“invoice”一詞，但只說明了發票什麼時候寄出，並未提供處理方法。選項C則提到金額大小，回答了不同的問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "handle",
      "invoice",
      "discrepancy"
    ],
    "audioScript": "Q: How should we handle the invoice discrepancy?\n(A) The invoice was sent last week.\n(B) Let's double-check all the charges first.\n(C) It was for a large amount."
  },
  {
    "id": "p2-gen-056",
    "part": "Part 2",
    "question": "Did you confirm the reservation for the team dinner on Thursday?",
    "choices": {
      "A": "I checked the restaurant menu.",
      "B": "The invoice was sent yesterday.",
      "C": "Yes, I spoke with the restaurant this morning."
    },
    "answer": "C",
    "explanation_zh": "問題是詢問是否確認了週四的團隊晚餐預訂。選項A提到檢查了餐廳菜單，但這並不是確認預訂。選項B提到發票，這與預訂無關。選項C表示已經與餐廳確認，正確回答了問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "confirm",
      "reservation",
      "team dinner",
      "restaurant",
      "invoice"
    ],
    "audioScript": "Q: Did you confirm the reservation for the team dinner on Thursday?\n(A) I checked the restaurant menu.\n(B) The invoice was sent yesterday.\n(C) Yes, I spoke with the restaurant this morning."
  },
  {
    "id": "p2-gen-057",
    "part": "Part 2",
    "question": "Should we reserve the conference room for Thursday or Friday?",
    "choices": {
      "A": "Thursday would be better.",
      "B": "The room is on the second floor.",
      "C": "I think we can hold a meeting next week."
    },
    "answer": "A",
    "explanation_zh": "這個問題是詢問應該何時預訂會議室，星期四還是星期五。選項A直接回應了問題，選擇星期四。選項B提到的\"room\"是陷阱詞，因為問題關心的是預訂時間而不是會議室的位置。選項C回應的是另一種問題類型，與時間選擇無關。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "reserve",
      "conference",
      "meeting"
    ],
    "audioScript": "Q: Should we reserve the conference room for Thursday or Friday?\n(A) Thursday would be better.\n(B) The room is on the second floor.\n(C) I think we can hold a meeting next week."
  },
  {
    "id": "p2-gen-058",
    "part": "Part 2",
    "question": "Could you confirm the reservation for the team dinner on Thursday?",
    "choices": {
      "A": "Yes, the meeting will be on Friday.",
      "B": "I'll check with the restaurant and let you know.",
      "C": "The reservation is at the restaurant."
    },
    "answer": "B",
    "explanation_zh": "選項 B 是唯一正確的答案，因為它直接回應了確認預訂的要求。選項 A 提到的是會議，而非晚餐預訂，因此不相關。選項 C 雖然提到 'reservation'，但語意上錯誤，因為它只是重申預訂地點而未確認。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "reservation",
      "confirm",
      "team dinner"
    ],
    "audioScript": "Q: Could you confirm the reservation for the team dinner on Thursday?\n(A) Yes, the meeting will be on Friday.\n(B) I'll check with the restaurant and let you know.\n(C) The reservation is at the restaurant."
  },
  {
    "id": "p2-gen-059",
    "part": "Part 2",
    "question": "Could you tell me when the meeting room will be available?",
    "choices": {
      "A": "The meeting is about quarterly results.",
      "B": "The room is on the second floor.",
      "C": "It should be free after 3 PM."
    },
    "answer": "C",
    "explanation_zh": "問題詢問何時會議室可用，答案C正確地提供了時間資訊。選項A提到會議內容，但未回答會議室何時可用。選項B提到會議室的位置，沒有回答時間問題。選項A的\"meeting\"是陷阱字，未能回答\"何時可用\"這個問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "available",
      "meeting",
      "room",
      "schedule"
    ],
    "audioScript": "Q: Could you tell me when the meeting room will be available?\n(A) The meeting is about quarterly results.\n(B) The room is on the second floor.\n(C) It should be free after 3 PM."
  },
  {
    "id": "p2-gen-060",
    "part": "Part 2",
    "question": "What item do we need to order for the training session?",
    "choices": {
      "A": "We need more projectors.",
      "B": "It's scheduled for next Monday.",
      "C": "The training is in room 204."
    },
    "answer": "A",
    "explanation_zh": "問題問的是需要訂購什麼物品來準備培訓。選項A提到“projectors”，正確回答了問題。選項B提到了培訓的日程，但沒有回答需要訂購的物品。選項C提到了培訓的地點，但沒有回答問題。選項C使用了“training”這個詞，雖然與問題有關，但沒有提供所需的資訊，因此是錯誤的。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "order",
      "training",
      "session"
    ],
    "audioScript": "Q: What item do we need to order for the training session?\n(A) We need more projectors.\n(B) It's scheduled for next Monday.\n(C) The training is in room 204."
  },
  {
    "id": "p2-gen-061",
    "part": "Part 2",
    "question": "When will the office supplies be delivered?",
    "choices": {
      "A": "I ordered them yesterday.",
      "B": "They'll arrive on Friday.",
      "C": "The supplies are in the closet."
    },
    "answer": "B",
    "explanation_zh": "問題詢問辦公用品何時送達。選項B提供了具體的日期“星期五”，所以是正確的答案。選項A提供的是下訂單的時間，而非送達的時間。選項C提到“supplies”（用品）這個字，但指出用品的位置，並未回答什麼時候送達的問題。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "delivered",
      "supplies",
      "arrive"
    ],
    "audioScript": "Q: When will the office supplies be delivered?\n(A) I ordered them yesterday.\n(B) They'll arrive on Friday.\n(C) The supplies are in the closet."
  },
  {
    "id": "p2-gen-062",
    "part": "Part 2",
    "question": "Where is the meeting scheduled to take place?",
    "choices": {
      "A": "It's about the budget proposal.",
      "B": "The meeting was productive.",
      "C": "In the main conference room."
    },
    "answer": "C",
    "explanation_zh": "問題詢問會議安排在哪裡舉行。選項A提到“會議內容”，但沒有回答地點問題，而選項B提到“會議的效果”，也沒有回答地點問題。只有選項C具體回答問題，指出是在主要會議室舉行。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "meeting",
      "scheduled",
      "conference"
    ],
    "audioScript": "Q: Where is the meeting scheduled to take place?\n(A) It's about the budget proposal.\n(B) The meeting was productive.\n(C) In the main conference room."
  },
  {
    "id": "p2-gen-063",
    "part": "Part 2",
    "question": "Who is responsible for organizing the quarterly training session?",
    "choices": {
      "A": "The HR department handles that.",
      "B": "It's scheduled for next month.",
      "C": "The training materials are ready."
    },
    "answer": "A",
    "explanation_zh": "問題詢問誰負責組織季度培訓會，正確答案是A：由人力資源部負責。選項B提供的是時間資訊，不能回答誰負責。選項C提到“training materials”，但問題問的是誰負責整個培訓會，僅提供材料準備資訊無法回答此問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "responsible",
      "organizing",
      "quarterly",
      "training",
      "department"
    ],
    "audioScript": "Q: Who is responsible for organizing the quarterly training session?\n(A) The HR department handles that.\n(B) It's scheduled for next month.\n(C) The training materials are ready."
  },
  {
    "id": "p2-gen-064",
    "part": "Part 2",
    "question": "Why was the meeting rescheduled?",
    "choices": {
      "A": "The meeting room is booked.",
      "B": "Because the presenter is out of town.",
      "C": "The agenda is on the table."
    },
    "answer": "B",
    "explanation_zh": "問題問的是會議為什麼重新安排。選項A提到會議室已被預訂，但這並不是重新安排會議的原因。選項C提到議程在桌上，雖然議程和會議有關，但無法回答為什麼重新安排會議的問題。正確答案是B，因為這提供了具體的原因：演講者不在城裡。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "meeting",
      "rescheduled",
      "presenter",
      "agenda"
    ],
    "audioScript": "Q: Why was the meeting rescheduled?\n(A) The meeting room is booked.\n(B) Because the presenter is out of town.\n(C) The agenda is on the table."
  },
  {
    "id": "p2-gen-065",
    "part": "Part 2",
    "question": "How should we handle the shipping delays with our supplier?",
    "choices": {
      "A": "The shipping department is on the second floor.",
      "B": "We should address it in the next meeting.",
      "C": "By contacting the supplier directly to expedite the process."
    },
    "answer": "C",
    "explanation_zh": "問題是問“我們應該如何處理供應商的運輸延遲？”，其中關鍵字是“shipping”。選項A提到“shipping department”，但並未回答“如何處理運輸延遲”的問題，因此不正確。選項B是關於會議的討論，並未提供具體的處理方法。選項C提供了具體的處理方法，即“直接聯繫供應商以加快流程”，因此是正確的回答。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "handle",
      "shipping",
      "supplier",
      "expedite",
      "process"
    ],
    "audioScript": "Q: How should we handle the shipping delays with our supplier?\n(A) The shipping department is on the second floor.\n(B) We should address it in the next meeting.\n(C) By contacting the supplier directly to expedite the process."
  },
  {
    "id": "p2-gen-066",
    "part": "Part 2",
    "question": "Is the meeting room booked for Friday?",
    "choices": {
      "A": "Yes, it’s reserved all day.",
      "B": "The room is on the second floor.",
      "C": "I’ll book the conference."
    },
    "answer": "A",
    "explanation_zh": "問題詢問會議室是否已預訂在星期五。選項A回答“是的，預訂了一整天”直接回答此問題。選項B重複了問題中的單詞“room”，但只說明了會議室的位置，並未回答是否預訂。選項C回答會議預訂的行為，而非確認已預訂狀態。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "meeting room",
      "booked",
      "reserved"
    ],
    "audioScript": "Q: Is the meeting room booked for Friday?\n(A) Yes, it’s reserved all day.\n(B) The room is on the second floor.\n(C) I’ll book the conference."
  },
  {
    "id": "p2-gen-067",
    "part": "Part 2",
    "question": "Should we book the meeting room for Wednesday or Friday?",
    "choices": {
      "A": "Yes, we need the projector for that.",
      "B": "Friday works better for most of us.",
      "C": "The meeting room is on the second floor."
    },
    "answer": "B",
    "explanation_zh": "問題問我們應該將會議室預訂在星期三還是星期五。選項B直接回答了這個選擇性問題，指出星期五更適合大多數人。選項A雖然提到投影機，但並沒有回答會議應該訂在什麼時候。選項C提到 'meeting room' 但只是描述其位置，並沒有回答問題中的時間選擇。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "book",
      "meeting",
      "projector"
    ],
    "audioScript": "Q: Should we book the meeting room for Wednesday or Friday?\n(A) Yes, we need the projector for that.\n(B) Friday works better for most of us.\n(C) The meeting room is on the second floor."
  },
  {
    "id": "p2-gen-068",
    "part": "Part 2",
    "question": "Could you send the updated invoice by tomorrow?",
    "choices": {
      "A": "The invoice was sent last week.",
      "B": "I will check with the team.",
      "C": "Sure, I'll email it to you by then."
    },
    "answer": "C",
    "explanation_zh": "C 是正確答案，因為它直接答應了請求，表示會在明天之前發送更新的發票。A 選項提到發票，但沒有回答時間要求，因此不正確。B 選項是另一個問題的答案，與發票無關。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "invoice",
      "updated",
      "email"
    ],
    "audioScript": "Q: Could you send the updated invoice by tomorrow?\n(A) The invoice was sent last week.\n(B) I will check with the team.\n(C) Sure, I'll email it to you by then."
  },
  {
    "id": "p2-gen-069",
    "part": "Part 2",
    "question": "Could you tell me what time the meeting starts tomorrow?",
    "choices": {
      "A": "It's at 10 a.m.",
      "B": "The meeting is in Room 201.",
      "C": "Yes, I sent the email yesterday."
    },
    "answer": "A",
    "explanation_zh": "問題詢問會議何時開始，正確答案是 A ，因為提供了具體時間“10 a.m.”。選項 B 提到會議地點“Room 201”，但沒有回答時間問題。選項 C 提到發送了電子郵件，與詢問的會議開始時間無關。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "meeting",
      "time",
      "starts",
      "tomorrow",
      "email"
    ],
    "audioScript": "Q: Could you tell me what time the meeting starts tomorrow?\n(A) It's at 10 a.m.\n(B) The meeting is in Room 201.\n(C) Yes, I sent the email yesterday."
  },
  {
    "id": "p2-gen-070",
    "part": "Part 2",
    "question": "What time is the meeting scheduled for this afternoon?",
    "choices": {
      "A": "I have the meeting agenda right here.",
      "B": "It's set for 3:00 PM.",
      "C": "We discussed the meeting yesterday."
    },
    "answer": "B",
    "explanation_zh": "問題詢問的是會議的時間，選項B提供了具體的時間3:00 PM，符合問題需求。選項A提到 'agenda'，但並未給出時間，因此不符合問題要求。選項C提到 'meeting'，但僅描述了過去的事件，也未回答會議時間，故不合適。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "schedule",
      "meeting",
      "agenda"
    ],
    "audioScript": "Q: What time is the meeting scheduled for this afternoon?\n(A) I have the meeting agenda right here.\n(B) It's set for 3:00 PM.\n(C) We discussed the meeting yesterday."
  },
  {
    "id": "p2-gen-071",
    "part": "Part 2",
    "question": "When will the new office supplies arrive?",
    "choices": {
      "A": "They include pens and notebooks.",
      "B": "We ordered them last week.",
      "C": "They should arrive by Friday."
    },
    "answer": "C",
    "explanation_zh": "問題是詢問新辦公用品何時到達。選項C提供具體時間 \"星期五\"，因此是正確的回答。選項A提到 \"用品\"，但沒有給出時間，所以無法回答何時到達。選項B說明了訂購時間，但也無法回答實際到達時間。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "arrive",
      "supplies",
      "ordered"
    ],
    "audioScript": "Q: When will the new office supplies arrive?\n(A) They include pens and notebooks.\n(B) We ordered them last week.\n(C) They should arrive by Friday."
  },
  {
    "id": "p2-gen-072",
    "part": "Part 2",
    "question": "Where will the training session be held?",
    "choices": {
      "A": "In Conference Room B.",
      "B": "The training starts at 10 AM.",
      "C": "The session is about new software."
    },
    "answer": "A",
    "explanation_zh": "問題詢問訓練課程會在哪裡舉行。選項A提供了具體地點“在會議室B”，因此是正確答案。選項B提供的是時間信息，並沒有回答“在哪裡”的問題。選項C重複了問題中的關鍵詞“session”但僅描述了主題，無法回答地點問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "training",
      "session",
      "conference"
    ],
    "audioScript": "Q: Where will the training session be held?\n(A) In Conference Room B.\n(B) The training starts at 10 AM.\n(C) The session is about new software."
  },
  {
    "id": "p2-gen-073",
    "part": "Part 2",
    "question": "Who is responsible for handling customer service inquiries?",
    "choices": {
      "A": "The meeting is scheduled for 3 PM.",
      "B": "The customer service department.",
      "C": "We need more supplies for the office."
    },
    "answer": "B",
    "explanation_zh": "問題詢問誰負責處理客戶服務詢問。選項A提到會議時間，但沒有回答誰負責客戶服務；選項C提到辦公室用品，但無法回答問題。選項B指出了「客戶服務部門」是正確負責單位。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "responsible",
      "handling",
      "customer",
      "service",
      "inquiries"
    ],
    "audioScript": "Q: Who is responsible for handling customer service inquiries?\n(A) The meeting is scheduled for 3 PM.\n(B) The customer service department.\n(C) We need more supplies for the office."
  },
  {
    "id": "p2-gen-074",
    "part": "Part 2",
    "question": "Why was the meeting postponed?",
    "choices": {
      "A": "We can discuss the report then.",
      "B": "The meeting was about the new project.",
      "C": "Because the manager is out of town."
    },
    "answer": "C",
    "explanation_zh": "問題問會議為何延期。選項A提及“報告”，這與“會議延期的原因”無關。選項B提到“會議關於新項目”，同樣不解釋延期原因。選項C正確，因為它解釋了延期的原因：經理不在城裡。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "meeting",
      "postponed",
      "manager",
      "report"
    ],
    "audioScript": "Q: Why was the meeting postponed?\n(A) We can discuss the report then.\n(B) The meeting was about the new project.\n(C) Because the manager is out of town."
  },
  {
    "id": "p2-gen-075",
    "part": "Part 2",
    "question": "How should we send out the customer invoices?",
    "choices": {
      "A": "By email, to ensure they're received quickly.",
      "B": "The invoices were printed yesterday.",
      "C": "Yes, they're ready for dispatch now."
    },
    "answer": "A",
    "explanation_zh": "問題詢問發送客戶發票的方法，選項A提到透過電子郵件發送，以確保快速收到，符合問題要求。選項B雖然提到發票，但只說明發票已經打印，並沒有回答如何發送。選項C回答了發票準備好的狀態，但沒有提供發送方法。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "send",
      "invoices",
      "email"
    ],
    "audioScript": "Q: How should we send out the customer invoices?\n(A) By email, to ensure they're received quickly.\n(B) The invoices were printed yesterday.\n(C) Yes, they're ready for dispatch now."
  },
  {
    "id": "p2-gen-076",
    "part": "Part 2",
    "question": "Is the invoice ready for the client?",
    "choices": {
      "A": "The client will be visiting tomorrow.",
      "B": "It was sent out this morning.",
      "C": "The invoice is due next week."
    },
    "answer": "B",
    "explanation_zh": "這個問題是詢問發票是否已經準備好。選項B（It was sent out this morning）意指發票已經發出，是唯一正確的回答。選項A提到客戶何時拜訪，與問題無關。選項C重複提到“invoice”一詞，但回答是關於發票的到期日而不是準備狀況，因此不適合。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "invoice",
      "client",
      "ready"
    ],
    "audioScript": "Q: Is the invoice ready for the client?\n(A) The client will be visiting tomorrow.\n(B) It was sent out this morning.\n(C) The invoice is due next week."
  },
  {
    "id": "p2-gen-077",
    "part": "Part 2",
    "question": "Do you want to schedule the meeting for Monday or Wednesday?",
    "choices": {
      "A": "I think the meeting is about the new project.",
      "B": "We already have a team lunch on Wednesday.",
      "C": "Let's go with Wednesday."
    },
    "answer": "C",
    "explanation_zh": "問題是詢問何時安排會議，選項C「Let's go with Wednesday」直接回答選擇星期三。選項A重複了問題中的 \"meeting\"，但並沒有回答何時安排會議。選項B提到星期三的午餐，但沒有直接回答何時安排會議。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "schedule",
      "meeting",
      "Wednesday"
    ],
    "audioScript": "Q: Do you want to schedule the meeting for Monday or Wednesday?\n(A) I think the meeting is about the new project.\n(B) We already have a team lunch on Wednesday.\n(C) Let's go with Wednesday."
  },
  {
    "id": "p2-gen-078",
    "part": "Part 2",
    "question": "Could you send me the updated invoice by tomorrow?",
    "choices": {
      "A": "Sure, I'll have it sent over today.",
      "B": "The meeting was yesterday afternoon.",
      "C": "The invoice is for the purchase order."
    },
    "answer": "A",
    "explanation_zh": "問題要求對方明天前送出更新的發票。選項A表示可以今天就發送，符合要求。選項B提到的是會議，與發票無關。選項C提到發票，但沒有回應何時能發送，不符合問題要求。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "invoice",
      "updated",
      "send"
    ],
    "audioScript": "Q: Could you send me the updated invoice by tomorrow?\n(A) Sure, I'll have it sent over today.\n(B) The meeting was yesterday afternoon.\n(C) The invoice is for the purchase order."
  },
  {
    "id": "p2-gen-079",
    "part": "Part 2",
    "question": "Could you tell me when the meeting is scheduled for next week?",
    "choices": {
      "A": "The meeting room is on the third floor.",
      "B": "It's scheduled for Tuesday at 10 AM.",
      "C": "We need more chairs for the meeting."
    },
    "answer": "B",
    "explanation_zh": "問題是詢問\"會議\"什麼時候安排在下週。選項B提供了正確的時間資訊：\"下週二上午10點\"。選項A提到\"會議\"這個詞，但回答的是會議室的位置，沒有回答時間問題。選項C說會議需要更多椅子，這完全沒有回答時間相關的問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "scheduled",
      "meeting",
      "next week"
    ],
    "audioScript": "Q: Could you tell me when the meeting is scheduled for next week?\n(A) The meeting room is on the third floor.\n(B) It's scheduled for Tuesday at 10 AM.\n(C) We need more chairs for the meeting."
  },
  {
    "id": "p2-gen-080",
    "part": "Part 2",
    "question": "What is the new deadline for the project report?",
    "choices": {
      "A": "The meeting is scheduled for tomorrow.",
      "B": "You can find the report on your desk.",
      "C": "It's due by Friday."
    },
    "answer": "C",
    "explanation_zh": "問題問的是專案報告的新截止日期，而選項A提到的是會議的時間，並不是詢問的報告截止日期。選項B提到“報告”這個詞，但它只說報告在哪裡，並不是指出截止日期，因此不能回答問題。正確答案是C，因為它直接回答了報告的截止日期是星期五。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "deadline",
      "project",
      "report"
    ],
    "audioScript": "Q: What is the new deadline for the project report?\n(A) The meeting is scheduled for tomorrow.\n(B) You can find the report on your desk.\n(C) It's due by Friday."
  },
  {
    "id": "p2-gen-081",
    "part": "Part 2",
    "question": "When will the office supplies be delivered?",
    "choices": {
      "A": "They should arrive by Thursday afternoon.",
      "B": "The supplies include paper and pens.",
      "C": "I ordered them last week."
    },
    "answer": "A",
    "explanation_zh": "問題問的是辦公用品什麼時候會送達。選項A「它們應該在星期四下午到達」明確回答了這個時間問題。選項B提到的 \"supplies\" 只是重複了問題中的 \"supplies\"，但並沒有提供任何時間相關的資訊。選項C \"I ordered them last week\" 是在回答一個何時下訂單的問題，而不是何時送達。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "supplies",
      "delivered",
      "arrive"
    ],
    "audioScript": "Q: When will the office supplies be delivered?\n(A) They should arrive by Thursday afternoon.\n(B) The supplies include paper and pens.\n(C) I ordered them last week."
  },
  {
    "id": "p2-gen-082",
    "part": "Part 2",
    "question": "Where should I deliver the office supplies?",
    "choices": {
      "A": "They're in the supply room.",
      "B": "To the reception desk, please.",
      "C": "We ordered them yesterday."
    },
    "answer": "B",
    "explanation_zh": "問題問的是應該把辦公用品送到哪裡，而不是在哪裡找到它們。選項A提到供應室中的辦公用品，但這無法回答應該送到哪裡的問題，所以是錯誤的。選項B的答案明確指出應送達的地點是接待處，因此正確。選項C談論的是訂購時間，而不是交付地點。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "deliver",
      "office supplies",
      "reception desk"
    ],
    "audioScript": "Q: Where should I deliver the office supplies?\n(A) They're in the supply room.\n(B) To the reception desk, please.\n(C) We ordered them yesterday."
  },
  {
    "id": "p2-gen-083",
    "part": "Part 2",
    "question": "Who is responsible for ordering office supplies?",
    "choices": {
      "A": "The supplies are in the storage room.",
      "B": "Yes, they were ordered last week.",
      "C": "That's handled by the purchasing department."
    },
    "answer": "C",
    "explanation_zh": "這個問題問的是『誰負責訂購辦公用品？』，正確答案是 C：『這是由採購部門負責的。』選項 A 重複了『supplies』這個字，但提供的是物品存放地點，並沒有回答誰負責訂購。選項 B 提到了『訂購』的過去時，但並沒有回答問題中要求的負責人或部門。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "responsible",
      "ordering",
      "supplies",
      "purchasing",
      "department"
    ],
    "audioScript": "Q: Who is responsible for ordering office supplies?\n(A) The supplies are in the storage room.\n(B) Yes, they were ordered last week.\n(C) That's handled by the purchasing department."
  },
  {
    "id": "p2-gen-084",
    "part": "Part 2",
    "question": "Why was the meeting rescheduled to next week?",
    "choices": {
      "A": "The project timeline was extended.",
      "B": "The meeting room is on the second floor.",
      "C": "The agenda was emailed yesterday."
    },
    "answer": "A",
    "explanation_zh": "問題詢問為什麼會議改期到下週。選項A提到專案時間表延長，提供了改期的原因。選項B重複了“meeting”這個詞，但只提到會議室位置，並未回答為什麼會議改期的問題。選項C則提到議程被寄出，與原因無關。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "rescheduled",
      "project",
      "agenda"
    ],
    "audioScript": "Q: Why was the meeting rescheduled to next week?\n(A) The project timeline was extended.\n(B) The meeting room is on the second floor.\n(C) The agenda was emailed yesterday."
  },
  {
    "id": "p2-gen-085",
    "part": "Part 2",
    "question": "How should we schedule the training sessions for new employees?",
    "choices": {
      "A": "The training materials are on my desk.",
      "B": "We can use the online calendar system.",
      "C": "It starts at 9 AM tomorrow."
    },
    "answer": "B",
    "explanation_zh": "問題問的是如何安排新員工的培訓課程。選項B直接回答了使用什麼方法來安排，使用線上行事曆系統來排程。選項A提到\"training\"（培訓），但只是在說培訓材料的位置，沒有回答如何安排。選項C則提供了一個開始時間，顯然沒有說明如何進行安排。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "schedule",
      "training",
      "calendar"
    ],
    "audioScript": "Q: How should we schedule the training sessions for new employees?\n(A) The training materials are on my desk.\n(B) We can use the online calendar system.\n(C) It starts at 9 AM tomorrow."
  },
  {
    "id": "p2-gen-086",
    "part": "Part 2",
    "question": "Has the conference room been reserved for this afternoon?",
    "choices": {
      "A": "The conference starts at 2 PM.",
      "B": "The room is on the third floor.",
      "C": "Yes, I booked it yesterday."
    },
    "answer": "C",
    "explanation_zh": "問題詢問會議室是否已預訂。選項C表示「是的，我昨天已經預訂了」，這直接回答了問題。選項A說「會議下午2點開始」並沒有回答預訂的問題。選項B提到「房間在三樓」，重複了關鍵字“room”但沒有涉及是否預訂，無法回答問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "reserved",
      "conference room",
      "booked"
    ],
    "audioScript": "Q: Has the conference room been reserved for this afternoon?\n(A) The conference starts at 2 PM.\n(B) The room is on the third floor.\n(C) Yes, I booked it yesterday."
  },
  {
    "id": "p2-gen-087",
    "part": "Part 2",
    "question": "Should we schedule the meeting for Wednesday or Friday?",
    "choices": {
      "A": "Wednesday works best for me.",
      "B": "I think the meeting is too long.",
      "C": "We need more data for the report."
    },
    "answer": "A",
    "explanation_zh": "問題詢問會議安排的時間，選項A直接回覆說明星期三適合。選項B提到會議時間長短，但沒有回答安排時間的問題。選項C提到報告，與問題無關。選項B中的“meeting”是陷阱詞，因為雖然提到會議，但沒有回答應該選哪一天。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "schedule",
      "meeting",
      "Wednesday",
      "Friday"
    ],
    "audioScript": "Q: Should we schedule the meeting for Wednesday or Friday?\n(A) Wednesday works best for me.\n(B) I think the meeting is too long.\n(C) We need more data for the report."
  },
  {
    "id": "p2-gen-088",
    "part": "Part 2",
    "question": "Could you send over a copy of the new invoice by tomorrow?",
    "choices": {
      "A": "The invoice is already paid.",
      "B": "Sure, I'll get it to you by then.",
      "C": "I can call the shipping company."
    },
    "answer": "B",
    "explanation_zh": "問題要求對方明天發送新的發票副本。選項B表示同意並在指定時間內完成。選項A中的“invoice”這個詞雖然和問題中的詞相同，但它只是說發票已支付，沒有回應發送副本的要求。選項C則完全偏離主題，談論的是運輸公司，不符合問題要求。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "invoice",
      "copy",
      "send"
    ],
    "audioScript": "Q: Could you send over a copy of the new invoice by tomorrow?\n(A) The invoice is already paid.\n(B) Sure, I'll get it to you by then.\n(C) I can call the shipping company."
  },
  {
    "id": "p2-gen-089",
    "part": "Part 2",
    "question": "Could you tell me when the meeting is scheduled to start?",
    "choices": {
      "A": "The meeting room is on the second floor.",
      "B": "Yes, the meeting notes will be sent later.",
      "C": "It's scheduled to start at 3 PM."
    },
    "answer": "C",
    "explanation_zh": "問題詢問會議何時開始，選項C提供了具體時間3 PM。選項A提到“meeting room”，但這是會議地點而非時間。選項B則答覆了關於會議筆記的問題，而非會議時間。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "scheduled",
      "meeting",
      "start"
    ],
    "audioScript": "Q: Could you tell me when the meeting is scheduled to start?\n(A) The meeting room is on the second floor.\n(B) Yes, the meeting notes will be sent later.\n(C) It's scheduled to start at 3 PM."
  },
  {
    "id": "p2-gen-090",
    "part": "Part 2",
    "question": "What time is the meeting scheduled for this Friday?",
    "choices": {
      "A": "It's at 3 PM.",
      "B": "The meeting room is on the third floor.",
      "C": "I'll resend the report after lunch."
    },
    "answer": "A",
    "explanation_zh": "問題詢問會議的時間。選項A提供了具體的時間：下午3點。選項B提到會議室在三樓，但並未回答時間問題。選項C則提到報告，與會議時間無關。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "meeting",
      "scheduled",
      "Friday"
    ],
    "audioScript": "Q: What time is the meeting scheduled for this Friday?\n(A) It's at 3 PM.\n(B) The meeting room is on the third floor.\n(C) I'll resend the report after lunch."
  },
  {
    "id": "p2-gen-091",
    "part": "Part 2",
    "question": "When will the training session take place?",
    "choices": {
      "A": "It's about the new software.",
      "B": "Next Wednesday at 2 PM.",
      "C": "The session lasts two hours."
    },
    "answer": "B",
    "explanation_zh": "問題詢問培訓何時進行，答案是下週三下午2點。選項A提到\"software\"，但與時間無關，因此不正確。選項C提到\"session\"，但只是描述了時長而不是具體時間。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "training",
      "session",
      "take place"
    ],
    "audioScript": "Q: When will the training session take place?\n(A) It's about the new software.\n(B) Next Wednesday at 2 PM.\n(C) The session lasts two hours."
  },
  {
    "id": "p2-gen-092",
    "part": "Part 2",
    "question": "Where is the client meeting being held?",
    "choices": {
      "A": "It's being held at 3 PM.",
      "B": "The meeting agenda is ready.",
      "C": "In the conference room on the second floor."
    },
    "answer": "C",
    "explanation_zh": "問題問的是客戶會議在哪裡舉行。選項C指出地點是在二樓的會議室，正確回答問題。選項A提到的是時間“3 PM”，但問題問的是地點。選項B提到“meeting agenda”，即會議議程，卻並沒有回答地點問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "client",
      "meeting",
      "held",
      "conference room",
      "agenda"
    ],
    "audioScript": "Q: Where is the client meeting being held?\n(A) It's being held at 3 PM.\n(B) The meeting agenda is ready.\n(C) In the conference room on the second floor."
  },
  {
    "id": "p2-gen-093",
    "part": "Part 2",
    "question": "Who is responsible for ordering office supplies?",
    "choices": {
      "A": "That would be Lisa in procurement.",
      "B": "The supplies are in the storage room.",
      "C": "We placed an order last week."
    },
    "answer": "A",
    "explanation_zh": "問題詢問誰負責訂購辦公用品。選項A正確回答了是由採購部的Lisa負責。選項B雖然提到了supplies（用品），但只是描述用品的位置，並未回答誰負責。選項C則是提到上週的訂單而未涉及負責人員，回答了不同的問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "responsible",
      "office supplies",
      "procurement"
    ],
    "audioScript": "Q: Who is responsible for ordering office supplies?\n(A) That would be Lisa in procurement.\n(B) The supplies are in the storage room.\n(C) We placed an order last week."
  },
  {
    "id": "p2-gen-094",
    "part": "Part 2",
    "question": "Why is the meeting postponed?",
    "choices": {
      "A": "It's in the conference room.",
      "B": "The manager is on a business trip.",
      "C": "I don't have the agenda yet."
    },
    "answer": "B",
    "explanation_zh": "問題問為什麼會議延期，答案B說明是因為經理出差的原因。選項A提到『會議』這個詞，但只是描述會議地點，無法回答為什麼延期的問題。選項C提到未收到議程，但這不是會議延期的原因。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "meeting",
      "postponed",
      "manager"
    ],
    "audioScript": "Q: Why is the meeting postponed?\n(A) It's in the conference room.\n(B) The manager is on a business trip.\n(C) I don't have the agenda yet."
  },
  {
    "id": "p2-gen-095",
    "part": "Part 2",
    "question": "How should we send the package to the client?",
    "choices": {
      "A": "The meeting is scheduled for 3 PM.",
      "B": "The package is in the mail room.",
      "C": "By express courier."
    },
    "answer": "C",
    "explanation_zh": "問題是詢問\"如何\"寄送包裹給客戶，正確答案是用特快專遞（express courier）寄送。選項B雖然提到與問題相同的關鍵字\"package\"（包裹），但僅說明包裹的位置，而非寄送方法，因此不正確。選項A回答了完全不同的問題類型，與如何寄送包裹無關。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "send",
      "package",
      "client",
      "express",
      "courier"
    ],
    "audioScript": "Q: How should we send the package to the client?\n(A) The meeting is scheduled for 3 PM.\n(B) The package is in the mail room.\n(C) By express courier."
  },
  {
    "id": "p2-gen-096",
    "part": "Part 2",
    "question": "Did you confirm the reservation for the meeting room?",
    "choices": {
      "A": "Yes, it’s booked for 3 PM.",
      "B": "The meeting room is on the second floor.",
      "C": "I’ll check with the supplier about the shipment."
    },
    "answer": "A",
    "explanation_zh": "問題是詢問有沒有確認會議室的預訂，關鍵字是“reservation”。選項A回答了確認預訂，選項B提到會議室的位置，但沒有回答是否確認預訂，選項C則完全不相關。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "confirm",
      "reservation",
      "meeting room"
    ],
    "audioScript": "Q: Did you confirm the reservation for the meeting room?\n(A) Yes, it’s booked for 3 PM.\n(B) The meeting room is on the second floor.\n(C) I’ll check with the supplier about the shipment."
  },
  {
    "id": "p2-gen-097",
    "part": "Part 2",
    "question": "Will the meeting be scheduled for Monday or Tuesday?",
    "choices": {
      "A": "We discussed the agenda already.",
      "B": "It's set for Tuesday afternoon.",
      "C": "The meeting room is available."
    },
    "answer": "B",
    "explanation_zh": "問題詢問會議安排在星期一還是星期二。選項 B 清楚指出會議安排在星期二下午，直接回答了問題。選項 A 提到討論議程，但沒有回答日期問題。選項 C 提到了會議室的可用性，但沒有回答會議的具體日期，因此是錯誤的。選項 C 的陷阱字是 \"meeting\"，它重複了問題中的關鍵字但未實際回答日期的問題。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "scheduled",
      "afternoon",
      "available"
    ],
    "audioScript": "Q: Will the meeting be scheduled for Monday or Tuesday?\n(A) We discussed the agenda already.\n(B) It's set for Tuesday afternoon.\n(C) The meeting room is available."
  },
  {
    "id": "p2-gen-098",
    "part": "Part 2",
    "question": "Could you send me the invoice by the end of today?",
    "choices": {
      "A": "The invoice was sent yesterday.",
      "B": "I can help with the payment.",
      "C": "Sure, I'll get it to you by then."
    },
    "answer": "C",
    "explanation_zh": "這段對話中，詢問者希望對方能在今天結束前發送發票。選項A中的 'invoice' 雖然提到發票，但回答與問題無關，因為它陳述的是發票已經在昨天發送，而不是今天會發送。選項B是關於付款的幫助，與發送發票的請求無關。只有選項C 'Sure, I'll get it to you by then.' 是對請求的正確回應。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "invoice",
      "send",
      "today"
    ],
    "audioScript": "Q: Could you send me the invoice by the end of today?\n(A) The invoice was sent yesterday.\n(B) I can help with the payment.\n(C) Sure, I'll get it to you by then."
  },
  {
    "id": "p2-gen-099",
    "part": "Part 2",
    "question": "Could you tell me when the training session is scheduled to begin?",
    "choices": {
      "A": "It's set for 2 PM tomorrow.",
      "B": "The training materials are ready.",
      "C": "Yes, the session is important."
    },
    "answer": "A",
    "explanation_zh": "問題問及訓練課程什麼時候開始，選項A提供了具體的時間“2 PM tomorrow”，所以是正確的答案。選項B提到“training materials”，但沒有回答時間問題，只是談論材料的準備情況。選項C提到“session”，但未提供時間信息，並且只是一般性評論。",
    "skill_tag": "listening_response",
    "difficulty": "B1",
    "vocabulary": [
      "training",
      "session",
      "scheduled",
      "begin"
    ],
    "audioScript": "Q: Could you tell me when the training session is scheduled to begin?\n(A) It's set for 2 PM tomorrow.\n(B) The training materials are ready.\n(C) Yes, the session is important."
  },
  {
    "id": "p2-gen-100",
    "part": "Part 2",
    "question": "What item do we need to order for the office meeting next week?",
    "choices": {
      "A": "The meeting starts at 10 AM.",
      "B": "We need more notepads.",
      "C": "I can check the report later."
    },
    "answer": "B",
    "explanation_zh": "問題是詢問需要為下週的辦公會議訂購什麼項目。選項B回應了這個問題，具體指出需要更多筆記本。選項A提到會議開始時間，與問題無關。選項C提到報告，但問題是關於需要訂購的物品，因此選項C不正確。",
    "skill_tag": "listening_response",
    "difficulty": "A2",
    "vocabulary": [
      "order",
      "meeting",
      "notepads"
    ],
    "audioScript": "Q: What item do we need to order for the office meeting next week?\n(A) The meeting starts at 10 AM.\n(B) We need more notepads.\n(C) I can check the report later."
  },
  {
    "id": "p3-gen-043",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A client inquiry",
      "B": "A new product launch",
      "C": "A shipment issue",
      "D": "A store opening"
    },
    "answer": "C",
    "explanation_zh": "選項 C 是正確答案。根據對話內容，主要討論的問題是貨物發貨問題。對話中提到“發貨單顯示我們訂購了50個單位的新耳機，但只交付了30個”，這明顯是一個發貨問題。選項 A、B 和 D 都無法正確描述對話的主要內容。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "invoice",
      "supplier",
      "delivery"
    ],
    "transcript": "W: I received the shipment for our store today, but there was an issue.\nM: What seems to be the problem?\nW: The invoice shows we ordered 50 units of the new headphones, yet only 30 were delivered.\nM: That's concerning. Have you contacted the supplier yet?\nW: No, I thought I'd check with you first to see if you've heard anything.\nM: I haven't, but I suggest we email them immediately.\nW: Good idea. Should we mention the missing units and request a quick delivery?\nM: Yes, let's aim for delivery by next Friday.\nW: I'll send the email right away.",
    "question_order": 1
  },
  {
    "id": "p3-gen-044",
    "part": "Part 3",
    "question": "What detail does the woman mention about the headphones?",
    "choices": {
      "A": "They were damaged.",
      "B": "They were delivered late.",
      "C": "They were overpriced.",
      "D": "They were under-delivered."
    },
    "answer": "D",
    "explanation_zh": "選項 D 是正確答案。根據對話中女士提到的“發貨單顯示我們訂購了50個單位的新耳機，但只交付了30個”，這清楚地說明耳機數量不足。選項 A、B 和 C 沒有在對話中提到或不符合對話內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "units",
      "headphones",
      "invoice",
      "supplier"
    ],
    "transcript": "W: I received the shipment for our store today, but there was an issue.\nM: What seems to be the problem?\nW: The invoice shows we ordered 50 units of the new headphones, yet only 30 were delivered.\nM: That's concerning. Have you contacted the supplier yet?\nW: No, I thought I'd check with you first to see if you've heard anything.\nM: I haven't, but I suggest we email them immediately.\nW: Good idea. Should we mention the missing units and request a quick delivery?\nM: Yes, let's aim for delivery by next Friday.\nW: I'll send the email right away.",
    "question_order": 2
  },
  {
    "id": "p3-gen-045",
    "part": "Part 3",
    "question": "What will the woman most likely do next?",
    "choices": {
      "A": "Email the supplier",
      "B": "Call the supplier",
      "C": "Visit the supplier",
      "D": "Check the warehouse"
    },
    "answer": "A",
    "explanation_zh": "選項 A 是正確答案。對話最後女士說“我會立即發送電子郵件”，這表明她接下來會做的事情是給供應商發電子郵件。選項 B、C 和 D 都不符合女士接下來的行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "contact",
      "supplier",
      "email",
      "delivery"
    ],
    "transcript": "W: I received the shipment for our store today, but there was an issue.\nM: What seems to be the problem?\nW: The invoice shows we ordered 50 units of the new headphones, yet only 30 were delivered.\nM: That's concerning. Have you contacted the supplier yet?\nW: No, I thought I'd check with you first to see if you've heard anything.\nM: I haven't, but I suggest we email them immediately.\nW: Good idea. Should we mention the missing units and request a quick delivery?\nM: Yes, let's aim for delivery by next Friday.\nW: I'll send the email right away.",
    "question_order": 3
  },
  {
    "id": "p3-gen-046",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Organizing a conference",
      "B": "Purchasing office supplies",
      "C": "Scheduling a meeting",
      "D": "Checking on a delayed shipment"
    },
    "answer": "D",
    "explanation_zh": "選項 D 是正確答案。對話主要討論辦公椅的延遲發貨問題，對話中提到“發貨計劃是昨天”。選項 A、B 和 C 並不是對話的主要內容。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delivery",
      "conference"
    ],
    "transcript": "W: I noticed that the shipment of office chairs hasn't arrived yet.\nM: Yes, the delivery was scheduled for yesterday. I’ll check the tracking details now.\nW: Thank you. We need them for the conference next Tuesday.\nM: According to the update, they should arrive by Friday.\nW: Great, that gives us enough time.\nM: I’ll email the supplier to confirm the delivery date.\nW: Could you also check if they included the ergonomic models we ordered?\nM: Sure, I'll verify the order details as well.\nW: I appreciate your help with this.\nM: No problem, I'll keep you updated.",
    "question_order": 1
  },
  {
    "id": "p3-gen-047",
    "part": "Part 3",
    "question": "What is the problem mentioned in the conversation?",
    "choices": {
      "A": "Shipment was delayed",
      "B": "Chairs won't arrive until next Tuesday",
      "C": "Supplier sent wrong items",
      "D": "Chairs were not ordered"
    },
    "answer": "A",
    "explanation_zh": "選項 A 是正確答案。對話中提到“發貨計劃是昨天”，但椅子還沒有到，說明發貨延遲。選項 B、C 和 D 與對話內容不符。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "tracking",
      "update",
      "ergonomic"
    ],
    "transcript": "W: I noticed that the shipment of office chairs hasn't arrived yet.\nM: Yes, the delivery was scheduled for yesterday. I’ll check the tracking details now.\nW: Thank you. We need them for the conference next Tuesday.\nM: According to the update, they should arrive by Friday.\nW: Great, that gives us enough time.\nM: I’ll email the supplier to confirm the delivery date.\nW: Could you also check if they included the ergonomic models we ordered?\nM: Sure, I'll verify the order details as well.\nW: I appreciate your help with this.\nM: No problem, I'll keep you updated.",
    "question_order": 2
  },
  {
    "id": "p3-gen-048",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Contact the conference organizers",
      "B": "Email the supplier",
      "C": "Place a new order",
      "D": "Check the conference date"
    },
    "answer": "B",
    "explanation_zh": "選項 B 是正確答案。對話中提到“我會立即發送電子郵件給供應商”，所以接下來男子會發電子郵件給供應商。選項 A、C 和 D 並不是男子接下來會做的事情。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "supplier",
      "confirm",
      "verify"
    ],
    "transcript": "W: I noticed that the shipment of office chairs hasn't arrived yet.\nM: Yes, the delivery was scheduled for yesterday. I’ll check the tracking details now.\nW: Thank you. We need them for the conference next Tuesday.\nM: According to the update, they should arrive by Friday.\nW: Great, that gives us enough time.\nM: I’ll email the supplier to confirm the delivery date.\nW: Could you also check if they included the ergonomic models we ordered?\nM: Sure, I'll verify the order details as well.\nW: I appreciate your help with this.\nM: No problem, I'll keep you updated.",
    "question_order": 3
  },
  {
    "id": "p3-gen-049",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A delayed shipment",
      "B": "A canceled order",
      "C": "A new product launch",
      "D": "An office renovation"
    },
    "answer": "A",
    "explanation_zh": "選項 A 是正確答案。對話中主要討論的是辦公椅的發貨延遲問題，開頭提到“但有延誤”。選項 B、C 和 D 都不是對話的主要話題。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delay",
      "supplier"
    ],
    "transcript": "W: Did you get the shipment confirmation for the office chairs?\nM: Yes, but there's a delay. They won't arrive till next Friday.\nW: That's disappointing. We needed them by this Wednesday for the new office setup.\nM: I know. The supplier said there was an issue at the warehouse.\nW: Should we consider an alternative supplier?\nM: Let’s wait and see. I'll call the supplier to request expedited delivery.\nW: Good idea. Also, check if they can offer a discount on our next order.\nM: Sure, I’ll handle it right after this meeting.\nW: Thanks, I appreciate it.",
    "question_order": 1
  },
  {
    "id": "p3-gen-050",
    "part": "Part 3",
    "question": "What problem is mentioned regarding the office chairs?",
    "choices": {
      "A": "They were damaged in transit.",
      "B": "They will arrive later than expected.",
      "C": "The order was incorrect.",
      "D": "The chairs are the wrong color."
    },
    "answer": "B",
    "explanation_zh": "選項 B 是正確答案。對話中提到“它們直到下週五才會到達”，這表示椅子將比預期晚到。選項 A、C 和 D 都沒有提到或不符合對話內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delay",
      "warehouse"
    ],
    "transcript": "W: Did you get the shipment confirmation for the office chairs?\nM: Yes, but there's a delay. They won't arrive till next Friday.\nW: That's disappointing. We needed them by this Wednesday for the new office setup.\nM: I know. The supplier said there was an issue at the warehouse.\nW: Should we consider an alternative supplier?\nM: Let’s wait and see. I'll call the supplier to request expedited delivery.\nW: Good idea. Also, check if they can offer a discount on our next order.\nM: Sure, I’ll handle it right after this meeting.\nW: Thanks, I appreciate it.",
    "question_order": 2
  },
  {
    "id": "p3-gen-051",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Call a different supplier",
      "B": "Arrange for a refund",
      "C": "Contact the current supplier",
      "D": "Cancel the order"
    },
    "answer": "C",
    "explanation_zh": "選項 C 是正確答案。對話中男子說“我會打電話給供應商以要求加急送貨”，這表明他接下來會做的事情是聯繫當前的供應商。選項 A、B 和 D 都不符合男子的計劃行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "expedited",
      "supplier",
      "discount"
    ],
    "transcript": "W: Did you get the shipment confirmation for the office chairs?\nM: Yes, but there's a delay. They won't arrive till next Friday.\nW: That's disappointing. We needed them by this Wednesday for the new office setup.\nM: I know. The supplier said there was an issue at the warehouse.\nW: Should we consider an alternative supplier?\nM: Let’s wait and see. I'll call the supplier to request expedited delivery.\nW: Good idea. Also, check if they can offer a discount on our next order.\nM: Sure, I’ll handle it right after this meeting.\nW: Thanks, I appreciate it.",
    "question_order": 3
  },
  {
    "id": "p3-gen-052",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A delayed shipment",
      "B": "A defective office chair",
      "C": "A purchase inquiry",
      "D": "A warranty renewal"
    },
    "answer": "B",
    "explanation_zh": "B: 在對話中，女士提到接收到的辦公椅中有一個出現問題，並且描述了問題為\"The armrest on one chair is loose.\"，所以主要話題是關於一張有缺陷的辦公椅。A、C和D選項未在對話中提及或不符合主要內容。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "supplier",
      "warranty",
      "replacement"
    ],
    "transcript": "W: We received the office chairs yesterday, but I noticed a problem with one of them.\nM: Oh, what seems to be the issue?\nW: The armrest on one chair is loose. Can we get a replacement?\nM: Absolutely. I’ll contact the supplier to arrange that.\nW: Thank you. Will there be any additional charges?\nM: No, replacements are covered under warranty. Just keep the faulty chair until the new one arrives.\nW: Great. Do you have an estimated delivery date?\nM: The supplier indicated it should arrive by next Wednesday.\nW: That sounds good. I’ll be sure to inform the team.",
    "question_order": 1
  },
  {
    "id": "p3-gen-053",
    "part": "Part 3",
    "question": "What specific problem was mentioned with the office chair?",
    "choices": {
      "A": "A missing wheel",
      "B": "A broken backrest",
      "C": "A loose armrest",
      "D": "A torn fabric"
    },
    "answer": "C",
    "explanation_zh": "C: 女士明確表示問題是\"The armrest on one chair is loose.\"，故選擇C。選項A、B和D皆未被提及。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "armrest",
      "loose",
      "replacement"
    ],
    "transcript": "W: We received the office chairs yesterday, but I noticed a problem with one of them.\nM: Oh, what seems to be the issue?\nW: The armrest on one chair is loose. Can we get a replacement?\nM: Absolutely. I’ll contact the supplier to arrange that.\nW: Thank you. Will there be any additional charges?\nM: No, replacements are covered under warranty. Just keep the faulty chair until the new one arrives.\nW: Great. Do you have an estimated delivery date?\nM: The supplier indicated it should arrive by next Wednesday.\nW: That sounds good. I’ll be sure to inform the team.",
    "question_order": 2
  },
  {
    "id": "p3-gen-054",
    "part": "Part 3",
    "question": "What is the next action after this conversation?",
    "choices": {
      "A": "The team will fix the chair",
      "B": "The supplier will call the woman",
      "C": "The woman will return the faulty chair",
      "D": "The supplier will send a replacement"
    },
    "answer": "D",
    "explanation_zh": "D: 對話中，男士表示\"I’ll contact the supplier to arrange that.\"並且提到供應商將發送替換品，因此下一步的行動是供應商發送替換品，即選擇D。其他選項A、B和C未在對話中被暗示。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "supplier",
      "delivery",
      "warranty"
    ],
    "transcript": "W: We received the office chairs yesterday, but I noticed a problem with one of them.\nM: Oh, what seems to be the issue?\nW: The armrest on one chair is loose. Can we get a replacement?\nM: Absolutely. I’ll contact the supplier to arrange that.\nW: Thank you. Will there be any additional charges?\nM: No, replacements are covered under warranty. Just keep the faulty chair until the new one arrives.\nW: Great. Do you have an estimated delivery date?\nM: The supplier indicated it should arrive by next Wednesday.\nW: That sounds good. I’ll be sure to inform the team.",
    "question_order": 3
  },
  {
    "id": "p3-gen-055",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Discussing a new project deadline.",
      "B": "Planning a business meeting.",
      "C": "Addressing a shipment issue.",
      "D": "Reviewing a financial report."
    },
    "answer": "C",
    "explanation_zh": "C: 女士提到\"I received the shipment notice for the office supplies, but it seems to be delayed.\"，並且整個對話圍繞著發貨問題進行，因此主要話題是解決出貨問題。選項A、B和D不符合對話內容或未被提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "delay",
      "warehouse"
    ],
    "transcript": "W: I received the shipment notice for the office supplies, but it seems to be delayed.\nM: That's odd. It was supposed to arrive yesterday.\nW: Yes, but the email says it will arrive next Monday instead.\nM: Did they mention why there's a delay?\nW: Apparently, due to some warehouse issues.\nM: Should we contact them to confirm the details?\nW: I'll call them later today to make sure everything is in order.\nM: Great, let me know what they say.\nW: Will do. In the meantime, I'll check the inventory to see if we can manage until then.",
    "question_order": 1
  },
  {
    "id": "p3-gen-056",
    "part": "Part 3",
    "question": "What is the reason for the shipment delay?",
    "choices": {
      "A": "A transportation strike.",
      "B": "A holiday closure.",
      "C": "Bad weather conditions.",
      "D": "Warehouse issues."
    },
    "answer": "D",
    "explanation_zh": "D: 女士提到\"but the email says it will arrive next Monday instead.\"以及\"Apparently, due to some warehouse issues.\"，因此延遲的原因是倉庫問題，選擇D。選項A、B和C未被提及或不符合對話內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "warehouse",
      "delay",
      "shipment"
    ],
    "transcript": "W: I received the shipment notice for the office supplies, but it seems to be delayed.\nM: That's odd. It was supposed to arrive yesterday.\nW: Yes, but the email says it will arrive next Monday instead.\nM: Did they mention why there's a delay?\nW: Apparently, due to some warehouse issues.\nM: Should we contact them to confirm the details?\nW: I'll call them later today to make sure everything is in order.\nM: Great, let me know what they say.\nW: Will do. In the meantime, I'll check the inventory to see if we can manage until then.",
    "question_order": 2
  },
  {
    "id": "p3-gen-057",
    "part": "Part 3",
    "question": "What will the woman likely do next?",
    "choices": {
      "A": "Call the supplier for confirmation.",
      "B": "Visit the warehouse.",
      "C": "Send an email to the manager.",
      "D": "Place a new order."
    },
    "answer": "A",
    "explanation_zh": "A: 女士表示\"I'll call them later today to make sure everything is in order.\"，所以她接下來可能會打電話給供應商確認情況，因此選擇A。其他選項B、C和D不符合對話內容或未被提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "confirm",
      "inventory",
      "shipment"
    ],
    "transcript": "W: I received the shipment notice for the office supplies, but it seems to be delayed.\nM: That's odd. It was supposed to arrive yesterday.\nW: Yes, but the email says it will arrive next Monday instead.\nM: Did they mention why there's a delay?\nW: Apparently, due to some warehouse issues.\nM: Should we contact them to confirm the details?\nW: I'll call them later today to make sure everything is in order.\nM: Great, let me know what they say.\nW: Will do. In the meantime, I'll check the inventory to see if we can manage until then.",
    "question_order": 3
  },
  {
    "id": "p3-gen-058",
    "part": "Part 3",
    "question": "What are the speakers mainly discussing?",
    "choices": {
      "A": "A meeting agenda",
      "B": "A conference schedule",
      "C": "A shipment of new equipment",
      "D": "A delayed shipment of supplies"
    },
    "answer": "D",
    "explanation_zh": "D: 對話中談及\"No, it didn't arrive. I checked the tracking number, and it's delayed.\"，所以主要討論的是出貨延遲問題，選擇D。選項A、B和C未在對話中被提及或不符合主要內容。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "tracking",
      "confirm"
    ],
    "transcript": "W: Did you receive the shipment of office supplies yesterday?\nM: No, it didn't arrive. I checked the tracking number, and it's delayed.\nW: That's inconvenient. We need those items for the conference on Friday.\nM: I know. The supplier said it will arrive by tomorrow.\nW: Can you call them to confirm? We can't risk another delay.\nM: Sure, I'll call them right after this meeting.\nW: Great, and let me know what they say. We might need to find an alternative.\nM: I'll update you as soon as possible.",
    "question_order": 1
  },
  {
    "id": "p3-gen-059",
    "part": "Part 3",
    "question": "What is the problem mentioned in the conversation?",
    "choices": {
      "A": "The shipment is delayed",
      "B": "The shipment was damaged",
      "C": "The meeting was canceled",
      "D": "The supplier sent the wrong items"
    },
    "answer": "A",
    "explanation_zh": "A: 男士提到\"I checked the tracking number, and it's delayed.\"，因此問題是運輸延遲，選擇A。選項B、C和D未被對話暗示。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "delayed",
      "conference",
      "tracking"
    ],
    "transcript": "W: Did you receive the shipment of office supplies yesterday?\nM: No, it didn't arrive. I checked the tracking number, and it's delayed.\nW: That's inconvenient. We need those items for the conference on Friday.\nM: I know. The supplier said it will arrive by tomorrow.\nW: Can you call them to confirm? We can't risk another delay.\nM: Sure, I'll call them right after this meeting.\nW: Great, and let me know what they say. We might need to find an alternative.\nM: I'll update you as soon as possible.",
    "question_order": 2
  },
  {
    "id": "p3-gen-060",
    "part": "Part 3",
    "question": "What will the man do after the meeting?",
    "choices": {
      "A": "Arrange an alternative supplier",
      "B": "Call the supplier to confirm the delivery",
      "C": "Prepare for the conference",
      "D": "Update the woman on the shipment status"
    },
    "answer": "B",
    "explanation_zh": "B: 男士說\"Sure, I'll call them right after this meeting.\"，所以會議後他將打電話給供應商確認交貨狀況，因此選擇B。其他選項A、C和D不符合對話內容或未被提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "confirm",
      "alternative",
      "supplier"
    ],
    "transcript": "W: Did you receive the shipment of office supplies yesterday?\nM: No, it didn't arrive. I checked the tracking number, and it's delayed.\nW: That's inconvenient. We need those items for the conference on Friday.\nM: I know. The supplier said it will arrive by tomorrow.\nW: Can you call them to confirm? We can't risk another delay.\nM: Sure, I'll call them right after this meeting.\nW: Great, and let me know what they say. We might need to find an alternative.\nM: I'll update you as soon as possible.",
    "question_order": 3
  },
  {
    "id": "p3-gen-061",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A shipment issue with office chairs.",
      "B": "A delay in product delivery.",
      "C": "A request for a new product order.",
      "D": "A discussion about office furniture pricing."
    },
    "answer": "A",
    "explanation_zh": "對話主要涉及辦公椅的運輸問題，因為他們收到了錯誤的型號。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "model",
      "invoice"
    ],
    "transcript": "M: Did you receive the shipment of office chairs we ordered last week?\nW: Yes, but we have a problem. They sent us the wrong model.\nM: Oh no, what did we get instead?\nW: We got the older model, not the ergonomic ones we requested.\nM: That's unfortunate. I'll contact the supplier immediately.\nW: Could you also confirm if the invoice amount is correct?\nM: Sure, I'll double-check that too.\nW: Thank you. When do you think we can get the correct chairs?\nM: I'll ask them to expedite the replacement and get back to you by tomorrow.",
    "question_order": 1
  },
  {
    "id": "p3-gen-062",
    "part": "Part 3",
    "question": "What problem did the woman mention?",
    "choices": {
      "A": "The chairs were damaged.",
      "B": "The wrong model was sent.",
      "C": "The chairs were delayed.",
      "D": "The chairs were too expensive."
    },
    "answer": "B",
    "explanation_zh": "她提到收到的是錯誤型號的椅子，而不是他們要求的人體工學椅。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "problem",
      "model",
      "ergonomic"
    ],
    "transcript": "M: Did you receive the shipment of office chairs we ordered last week?\nW: Yes, but we have a problem. They sent us the wrong model.\nM: Oh no, what did we get instead?\nW: We got the older model, not the ergonomic ones we requested.\nM: That's unfortunate. I'll contact the supplier immediately.\nW: Could you also confirm if the invoice amount is correct?\nM: Sure, I'll double-check that too.\nW: Thank you. When do you think we can get the correct chairs?\nM: I'll ask them to expedite the replacement and get back to you by tomorrow.",
    "question_order": 2
  },
  {
    "id": "p3-gen-063",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Request a refund for the chairs.",
      "B": "Order a different type of chair.",
      "C": "Contact the supplier about the issue.",
      "D": "Check the delivery schedule again."
    },
    "answer": "C",
    "explanation_zh": "他表示將立即與供應商聯繫，以解決錯誤型號的問題。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "supplier",
      "contact",
      "replacement"
    ],
    "transcript": "M: Did you receive the shipment of office chairs we ordered last week?\nW: Yes, but we have a problem. They sent us the wrong model.\nM: Oh no, what did we get instead?\nW: We got the older model, not the ergonomic ones we requested.\nM: That's unfortunate. I'll contact the supplier immediately.\nW: Could you also confirm if the invoice amount is correct?\nM: Sure, I'll double-check that too.\nW: Thank you. When do you think we can get the correct chairs?\nM: I'll ask them to expedite the replacement and get back to you by tomorrow.",
    "question_order": 3
  },
  {
    "id": "p3-gen-064",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Organizing a meeting",
      "B": "A delay in shipment",
      "C": "Ordering new office chairs",
      "D": "Arranging a staff training"
    },
    "answer": "B",
    "explanation_zh": "對話中，女士提到辦公椅的出貨延遲，並詢問何時會送達。因此，主要話題是運輸延遲。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "delay",
      "deliver"
    ],
    "transcript": "W: I noticed the shipment of office chairs hasn't arrived yet. It was due yesterday.\nM: Yes, I checked with the supplier, and there's been a delay due to a warehouse issue.\nW: Did they mention when the chairs will be delivered?\nM: They expect to ship them out by this Friday.\nW: Should we notify the staff about the delay?\nM: Yes, I'll draft an email to inform them of the new delivery date.\nW: Great. Is there anything else we need to do in the meantime?\nM: Just ensure we have enough seating for the meeting tomorrow.",
    "question_order": 1
  },
  {
    "id": "p3-gen-065",
    "part": "Part 3",
    "question": "What is the new expected delivery date for the office chairs?",
    "choices": {
      "A": "Tomorrow",
      "B": "Next Monday",
      "C": "This Friday",
      "D": "Yesterday"
    },
    "answer": "C",
    "explanation_zh": "男士提到供應商預計在星期五發貨，因此新的預計交貨日期是星期五。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "expected",
      "delivery",
      "date"
    ],
    "transcript": "W: I noticed the shipment of office chairs hasn't arrived yet. It was due yesterday.\nM: Yes, I checked with the supplier, and there's been a delay due to a warehouse issue.\nW: Did they mention when the chairs will be delivered?\nM: They expect to ship them out by this Friday.\nW: Should we notify the staff about the delay?\nM: Yes, I'll draft an email to inform them of the new delivery date.\nW: Great. Is there anything else we need to do in the meantime?\nM: Just ensure we have enough seating for the meeting tomorrow.",
    "question_order": 2
  },
  {
    "id": "p3-gen-066",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Contact the supplier again",
      "B": "Arrange more seating for the meeting",
      "C": "Deliver the chairs himself",
      "D": "Draft an email to the staff"
    },
    "answer": "D",
    "explanation_zh": "男士表示他將撰寫一封電子郵件通知員工新的交貨日期，因此他的下一步是撰寫電子郵件。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "draft",
      "email",
      "inform"
    ],
    "transcript": "W: I noticed the shipment of office chairs hasn't arrived yet. It was due yesterday.\nM: Yes, I checked with the supplier, and there's been a delay due to a warehouse issue.\nW: Did they mention when the chairs will be delivered?\nM: They expect to ship them out by this Friday.\nW: Should we notify the staff about the delay?\nM: Yes, I'll draft an email to inform them of the new delivery date.\nW: Great. Is there anything else we need to do in the meantime?\nM: Just ensure we have enough seating for the meeting tomorrow.",
    "question_order": 3
  },
  {
    "id": "p3-gen-067",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Reviewing a conference agenda",
      "B": "Discussing a marketing strategy",
      "C": "Addressing a shipment delay",
      "D": "Planning a team-building event"
    },
    "answer": "C",
    "explanation_zh": "這段對話主要是在討論椅子的運送延遲問題。女士提到椅子還沒到，而男士確認了延誤，因此選項C是正確的。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "conference",
      "shipment",
      "supplier"
    ],
    "transcript": "W: I noticed the chairs we ordered for the conference are not here yet. Do you know when they’ll arrive?\nM: Yes, I checked with the supplier this morning. They said the shipment is delayed.\nW: That's unfortunate. When can we expect them now?\nM: They should arrive by Friday, instead of tomorrow as originally planned.\nW: Will this affect our setup over the weekend?\nM: It shouldn’t, as long as they arrive on Friday. We’ll still have Saturday to set everything up.\nW: That’s a relief. I’ll inform the team about the new delivery date.\nM: Good idea. Let’s hope there are no further delays.",
    "question_order": 1
  },
  {
    "id": "p3-gen-068",
    "part": "Part 3",
    "question": "What is the new expected delivery date for the chairs?",
    "choices": {
      "A": "Thursday",
      "B": "Wednesday",
      "C": "Saturday",
      "D": "Friday"
    },
    "answer": "D",
    "explanation_zh": "男士提到椅子應該在星期五到，而不是原計畫的明天。選項D是正確的。選項A、B和C沒有出現在對話中。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "delivery",
      "expected",
      "supplier"
    ],
    "transcript": "W: I noticed the chairs we ordered for the conference are not here yet. Do you know when they’ll arrive?\nM: Yes, I checked with the supplier this morning. They said the shipment is delayed.\nW: That's unfortunate. When can we expect them now?\nM: They should arrive by Friday, instead of tomorrow as originally planned.\nW: Will this affect our setup over the weekend?\nM: It shouldn’t, as long as they arrive on Friday. We’ll still have Saturday to set everything up.\nW: That’s a relief. I’ll inform the team about the new delivery date.\nM: Good idea. Let’s hope there are no further delays.",
    "question_order": 2
  },
  {
    "id": "p3-gen-069",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Inform the team about the new delivery date",
      "B": "Contact the supplier immediately",
      "C": "Cancel the conference setup",
      "D": "Wait for another update"
    },
    "answer": "A",
    "explanation_zh": "女士提到要通知團隊新的交貨日期，因此選項A是正確的。她沒有提到立刻聯繫供應商或取消會議設置。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "inform",
      "delivery",
      "team"
    ],
    "transcript": "W: I noticed the chairs we ordered for the conference are not here yet. Do you know when they’ll arrive?\nM: Yes, I checked with the supplier this morning. They said the shipment is delayed.\nW: That's unfortunate. When can we expect them now?\nM: They should arrive by Friday, instead of tomorrow as originally planned.\nW: Will this affect our setup over the weekend?\nM: It shouldn’t, as long as they arrive on Friday. We’ll still have Saturday to set everything up.\nW: That’s a relief. I’ll inform the team about the new delivery date.\nM: Good idea. Let’s hope there are no further delays.",
    "question_order": 3
  },
  {
    "id": "p3-gen-070",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Booking a meeting room",
      "B": "Cancelling an appointment",
      "C": "Planning a business trip",
      "D": "Following up on a delayed shipment"
    },
    "answer": "D",
    "explanation_zh": "選擇D：對話中討論的主要話題是關於辦公室椅子的延遲交貨。女方提到貨物原定於上週五到達，但尚未到達，男方表示將在週一再次跟進確認。這與選項D『跟進延遲的貨物』相符。選項A、B和C都未在對話中提及，因此不正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "supplier",
      "delivery"
    ],
    "transcript": "W: I noticed the shipment for the new office chairs hasn’t arrived yet. It was due last Friday.\nM: Yes, I checked with the supplier, and they said it was delayed due to a supply chain issue.\nW: Do they have an estimated delivery date now?\nM: They mentioned it should arrive by next Wednesday.\nW: That’s good to know. We really needed those chairs for the meeting room setup.\nM: I understand. I’ll make sure to follow up again on Monday to confirm.\nW: Thanks, also check if we need to sign for it on arrival.\nM: Sure, I will find out and let you know.",
    "question_order": 1
  },
  {
    "id": "p3-gen-071",
    "part": "Part 3",
    "question": "Why was the shipment delayed?",
    "choices": {
      "A": "Supply chain issue",
      "B": "Payment issue",
      "C": "Weather conditions",
      "D": "Supplier's mistake"
    },
    "answer": "A",
    "explanation_zh": "選擇A：對話中，男方提到供應商表示因供應鏈問題導致延遲，這直接回答了問題。選項B、C和D都未被提及，因此不正確。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "supply chain",
      "delayed"
    ],
    "transcript": "W: I noticed the shipment for the new office chairs hasn’t arrived yet. It was due last Friday.\nM: Yes, I checked with the supplier, and they said it was delayed due to a supply chain issue.\nW: Do they have an estimated delivery date now?\nM: They mentioned it should arrive by next Wednesday.\nW: That’s good to know. We really needed those chairs for the meeting room setup.\nM: I understand. I’ll make sure to follow up again on Monday to confirm.\nW: Thanks, also check if we need to sign for it on arrival.\nM: Sure, I will find out and let you know.",
    "question_order": 2
  },
  {
    "id": "p3-gen-072",
    "part": "Part 3",
    "question": "What will the man most likely do next?",
    "choices": {
      "A": "Contact the supplier immediately",
      "B": "Follow up again on Monday",
      "C": "Cancel the shipment",
      "D": "Notify the meeting participants"
    },
    "answer": "B",
    "explanation_zh": "選擇B：男方在對話中表示，他將在週一再次跟進確認，這是他接下來的計畫。選項A、C和D都未提及，也不符合對話內容。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "follow up",
      "confirm",
      "shipment"
    ],
    "transcript": "W: I noticed the shipment for the new office chairs hasn’t arrived yet. It was due last Friday.\nM: Yes, I checked with the supplier, and they said it was delayed due to a supply chain issue.\nW: Do they have an estimated delivery date now?\nM: They mentioned it should arrive by next Wednesday.\nW: That’s good to know. We really needed those chairs for the meeting room setup.\nM: I understand. I’ll make sure to follow up again on Monday to confirm.\nW: Thanks, also check if we need to sign for it on arrival.\nM: Sure, I will find out and let you know.",
    "question_order": 3
  },
  {
    "id": "p3-gen-073",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A delayed shipment",
      "B": "A canceled order",
      "C": "A price negotiation",
      "D": "A product return"
    },
    "answer": "A",
    "explanation_zh": "選擇A：對話的核心是關於辦公椅的延遲交貨，並且在對話中多次提到遲到的問題。選項B、C和D在對話中未提及，因此不正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "delay",
      "supplier",
      "shipment"
    ],
    "transcript": "M: I’ve noticed a delay in the shipment of office chairs we ordered last week. Have you heard anything from the supplier?\nW: Yes, I spoke with them this morning. They said the chairs will arrive next Wednesday instead of this Friday.\nM: That’s unfortunate. Did they mention why there’s a delay?\nW: They apologized and said it’s due to a transportation issue.\nM: I see. We’ll need to inform the team about this change.\nW: Would you like me to send out an email to everyone?\nM: Yes, please do that as soon as possible.\nW: Sure, I’ll draft it right away and keep you copied.\nM: Thank you. Let me know if you need any help.",
    "question_order": 1
  },
  {
    "id": "p3-gen-074",
    "part": "Part 3",
    "question": "What caused the delay in the shipment?",
    "choices": {
      "A": "A scheduling conflict",
      "B": "A transportation issue",
      "C": "A lack of materials",
      "D": "A payment problem"
    },
    "answer": "B",
    "explanation_zh": "選擇B：對話中女方提到延遲是因為運輸問題，這直接回答了問題。選項A、C和D沒有提及，因此不正確。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "delay",
      "transportation",
      "apologized"
    ],
    "transcript": "M: I’ve noticed a delay in the shipment of office chairs we ordered last week. Have you heard anything from the supplier?\nW: Yes, I spoke with them this morning. They said the chairs will arrive next Wednesday instead of this Friday.\nM: That’s unfortunate. Did they mention why there’s a delay?\nW: They apologized and said it’s due to a transportation issue.\nM: I see. We’ll need to inform the team about this change.\nW: Would you like me to send out an email to everyone?\nM: Yes, please do that as soon as possible.\nW: Sure, I’ll draft it right away and keep you copied.\nM: Thank you. Let me know if you need any help.",
    "question_order": 2
  },
  {
    "id": "p3-gen-075",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Call the supplier again",
      "B": "Reschedule the delivery",
      "C": "Send out an email to the team",
      "D": "Cancel the order"
    },
    "answer": "C",
    "explanation_zh": "選擇C：女方表示她會立即起草一封電子郵件並抄送給男方。這說明她接下來的行動是發送電子郵件給團隊。選項A、B和D都不符合對話內容。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "email",
      "inform",
      "draft"
    ],
    "transcript": "M: I’ve noticed a delay in the shipment of office chairs we ordered last week. Have you heard anything from the supplier?\nW: Yes, I spoke with them this morning. They said the chairs will arrive next Wednesday instead of this Friday.\nM: That’s unfortunate. Did they mention why there’s a delay?\nW: They apologized and said it’s due to a transportation issue.\nM: I see. We’ll need to inform the team about this change.\nW: Would you like me to send out an email to everyone?\nM: Yes, please do that as soon as possible.\nW: Sure, I’ll draft it right away and keep you copied.\nM: Thank you. Let me know if you need any help.",
    "question_order": 3
  },
  {
    "id": "p3-gen-076",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Discussing a new product launch",
      "B": "Handling a shipment delay",
      "C": "Scheduling a team meeting",
      "D": "Reviewing a customer feedback"
    },
    "answer": "B",
    "explanation_zh": "選擇B：對話的主要主題是處理貨物延遲問題，女方提到客戶投訴貨物延遲，並討論如何解決此問題。選項A、C和D都未涉及主要主題。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "complaint",
      "discount"
    ],
    "transcript": "W: We've received a complaint about the shipment delay. The customer was expecting the package on September 15th.\nM: That's unfortunate. What do you suggest we do to resolve this?\nW: We should offer a discount on their next purchase.\nM: That sounds good. Should I contact the supplier to check on the delay?\nW: Yes, and also update the customer on the new delivery date, which is September 18th.\nM: I'll do that right away. Anything else you need from me?\nW: Please prepare a report on this issue for our weekly meeting.\nM: I'll have it ready by Friday.",
    "question_order": 1
  },
  {
    "id": "p3-gen-077",
    "part": "Part 3",
    "question": "What was the original expected delivery date for the shipment?",
    "choices": {
      "A": "September 12th",
      "B": "September 17th",
      "C": "September 15th",
      "D": "September 18th"
    },
    "answer": "C",
    "explanation_zh": "選擇C：對話中提到客戶原本預期的交貨日期是9月15日，這直接回答了問題。選項A、B和D都沒有被提及，因此不正確。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "expected",
      "delivery",
      "package"
    ],
    "transcript": "W: We've received a complaint about the shipment delay. The customer was expecting the package on September 15th.\nM: That's unfortunate. What do you suggest we do to resolve this?\nW: We should offer a discount on their next purchase.\nM: That sounds good. Should I contact the supplier to check on the delay?\nW: Yes, and also update the customer on the new delivery date, which is September 18th.\nM: I'll do that right away. Anything else you need from me?\nW: Please prepare a report on this issue for our weekly meeting.\nM: I'll have it ready by Friday.",
    "question_order": 2
  },
  {
    "id": "p3-gen-078",
    "part": "Part 3",
    "question": "What will the man likely do next?",
    "choices": {
      "A": "Prepare a report",
      "B": "Contact the customer",
      "C": "Offer a discount",
      "D": "Check with the supplier"
    },
    "answer": "D",
    "explanation_zh": "選擇D：男方在對話中提到他將立即與供應商聯繫檢查延遲情況，這是他接下來的行動。選項A、B和C都不符合男方的下一步行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "supplier",
      "update",
      "report"
    ],
    "transcript": "W: We've received a complaint about the shipment delay. The customer was expecting the package on September 15th.\nM: That's unfortunate. What do you suggest we do to resolve this?\nW: We should offer a discount on their next purchase.\nM: That sounds good. Should I contact the supplier to check on the delay?\nW: Yes, and also update the customer on the new delivery date, which is September 18th.\nM: I'll do that right away. Anything else you need from me?\nW: Please prepare a report on this issue for our weekly meeting.\nM: I'll have it ready by Friday.",
    "question_order": 3
  },
  {
    "id": "p3-gen-079",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Scheduling a future meeting.",
      "B": "Discussing a price increase.",
      "C": "Handling a shipment delay.",
      "D": "Planning a new project."
    },
    "answer": "C",
    "explanation_zh": "答案 C：對話中，女士提到運送貨物尚未抵達，並且應該今天到貨，而男士確認系統顯示有延遲。整個對話圍繞著如何處理這次的運送延遲問題，因此選擇 C 是正確的。選項 A、B 和 D 都沒有直接提到運送延遲的具體探討。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delivery",
      "delay"
    ],
    "transcript": "W: I noticed the shipment hasn't arrived yet. It was supposed to be delivered today.\nM: Yes, I checked the tracking system, and it shows a delay.\nW: Do we know when it will arrive?\nM: The new expected delivery date is tomorrow afternoon.\nW: That's later than we planned. This might affect our schedule for the client meeting.\nM: I suggest we inform the client about the delay.\nW: Agreed. Should we offer a discount to apologize?\nM: Let's wait until it arrives and see the condition first.\nW: All right, I'll draft an email to update them.",
    "question_order": 1
  },
  {
    "id": "p3-gen-080",
    "part": "Part 3",
    "question": "What is the new expected delivery date?",
    "choices": {
      "A": "Today afternoon.",
      "B": "Tomorrow morning.",
      "C": "Next week.",
      "D": "Tomorrow afternoon."
    },
    "answer": "D",
    "explanation_zh": "答案 D：男士明確表示新的預計交貨日期是明天下午，因此選擇 D 是正確的。選項 A、B、C 都不符實際對話內容。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "expected",
      "delivery",
      "date"
    ],
    "transcript": "W: I noticed the shipment hasn't arrived yet. It was supposed to be delivered today.\nM: Yes, I checked the tracking system, and it shows a delay.\nW: Do we know when it will arrive?\nM: The new expected delivery date is tomorrow afternoon.\nW: That's later than we planned. This might affect our schedule for the client meeting.\nM: I suggest we inform the client about the delay.\nW: Agreed. Should we offer a discount to apologize?\nM: Let's wait until it arrives and see the condition first.\nW: All right, I'll draft an email to update them.",
    "question_order": 2
  },
  {
    "id": "p3-gen-081",
    "part": "Part 3",
    "question": "What will the woman likely do next?",
    "choices": {
      "A": "Draft an email to update the client.",
      "B": "Cancel the shipment order.",
      "C": "Meet with the client immediately.",
      "D": "Call the shipping company for more details."
    },
    "answer": "A",
    "explanation_zh": "答案 A：女士在對話中表示她將會撰寫電子郵件來更新客戶，這是她下一步將要做的事情，因此選擇 A 是正確的。選項 B、C、D 都不符合女士的實際行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "inform",
      "client",
      "email"
    ],
    "transcript": "W: I noticed the shipment hasn't arrived yet. It was supposed to be delivered today.\nM: Yes, I checked the tracking system, and it shows a delay.\nW: Do we know when it will arrive?\nM: The new expected delivery date is tomorrow afternoon.\nW: That's later than we planned. This might affect our schedule for the client meeting.\nM: I suggest we inform the client about the delay.\nW: Agreed. Should we offer a discount to apologize?\nM: Let's wait until it arrives and see the condition first.\nW: All right, I'll draft an email to update them.",
    "question_order": 3
  },
  {
    "id": "p3-gen-082",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Setting up a meeting",
      "B": "Discussing a project deadline",
      "C": "Arranging a conference",
      "D": "Addressing a shipment delay"
    },
    "answer": "D",
    "explanation_zh": "答案 D：對話中，女士提到辦公椅的運送尚未到達，並且男士確認供應商提到運輸問題導致延遲。整個對話集中在如何解決這次運送延遲，因此選擇 D 是正確的。選項 A、B 和 C 沒有涉及運送延遲的具體探討。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "supplier",
      "delivery",
      "delay",
      "update"
    ],
    "transcript": "W: I noticed that the shipment of office chairs was scheduled for today, but they haven't arrived yet.\nM: Yes, I checked with the supplier this morning. They mentioned a delay due to transport issues.\nW: That's unfortunate. Do we have a new estimated delivery date?\nM: They expect the chairs to arrive by Wednesday.\nW: Alright, should we inform the team about the delay?\nM: Yes, I'll send out an email update after our meeting.\nW: Great. Is there anything else we need from the supplier?\nM: We might need to confirm the specs for the next order.\nW: Let's do that after the chairs arrive.",
    "question_order": 1
  },
  {
    "id": "p3-gen-083",
    "part": "Part 3",
    "question": "What issue did the supplier report?",
    "choices": {
      "A": "Transport issues",
      "B": "Lost shipment",
      "C": "Incorrect items shipped",
      "D": "Damaged goods"
    },
    "answer": "A",
    "explanation_zh": "答案 A：男士明確表示供應商報告是由於運輸問題導致的延遲，因此選擇 A 是正確的。選項 B、C、D 都不符實際對話內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "supplier",
      "transport",
      "issues",
      "delay",
      "delivery"
    ],
    "transcript": "W: I noticed that the shipment of office chairs was scheduled for today, but they haven't arrived yet.\nM: Yes, I checked with the supplier this morning. They mentioned a delay due to transport issues.\nW: That's unfortunate. Do we have a new estimated delivery date?\nM: They expect the chairs to arrive by Wednesday.\nW: Alright, should we inform the team about the delay?\nM: Yes, I'll send out an email update after our meeting.\nW: Great. Is there anything else we need from the supplier?\nM: We might need to confirm the specs for the next order.\nW: Let's do that after the chairs arrive.",
    "question_order": 2
  },
  {
    "id": "p3-gen-084",
    "part": "Part 3",
    "question": "What will the man do after the meeting?",
    "choices": {
      "A": "Call the supplier",
      "B": "Send an email update",
      "C": "Confirm the next order specs",
      "D": "Check the shipment status again"
    },
    "answer": "B",
    "explanation_zh": "答案 B：男士指出，會後他會發送電子郵件更新團隊，這是他會後的計劃。因此選擇 B 是正確的。選項 A、C、D 都不是男士會後的計劃。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "email",
      "meeting",
      "update",
      "inform",
      "specs"
    ],
    "transcript": "W: I noticed that the shipment of office chairs was scheduled for today, but they haven't arrived yet.\nM: Yes, I checked with the supplier this morning. They mentioned a delay due to transport issues.\nW: That's unfortunate. Do we have a new estimated delivery date?\nM: They expect the chairs to arrive by Wednesday.\nW: Alright, should we inform the team about the delay?\nM: Yes, I'll send out an email update after our meeting.\nW: Great. Is there anything else we need from the supplier?\nM: We might need to confirm the specs for the next order.\nW: Let's do that after the chairs arrive.",
    "question_order": 3
  },
  {
    "id": "p3-gen-085",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A delayed shipment.",
      "B": "A lost order.",
      "C": "A customer complaint.",
      "D": "A shipping fee increase."
    },
    "answer": "A",
    "explanation_zh": "答案 A：女士提到從意大利運送的貨物尚未抵達，而男士指出海關的延遲是原因。整個對話集中在如何解決這次運送延遲，因此選擇 A 是正確的。選項 B、C、D 沒有涉及運送延遲的具體探討。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "customs",
      "documentation"
    ],
    "transcript": "W: I noticed our shipment from Italy hasn't arrived yet. It was due yesterday.\nM: Yes, there’s been a delay at customs. They need additional documentation.\nW: That’s concerning. We promised our clients delivery by the 15th.\nM: I understand. I’ve already sent the necessary papers this morning.\nW: Can we expedite the process somehow?\nM: I’m coordinating with our shipping agent to speed it up.\nW: Great, please keep me updated. We can't afford more setbacks.\nM: Will do. I'll call you once I have more information.\nW: Thanks, I appreciate it.\nM: No problem.",
    "question_order": 1
  },
  {
    "id": "p3-gen-086",
    "part": "Part 3",
    "question": "What problem is mentioned in the conversation?",
    "choices": {
      "A": "The shipment was lost.",
      "B": "There is a delay at customs.",
      "C": "The shipping fee increased.",
      "D": "The clients canceled the order."
    },
    "answer": "B",
    "explanation_zh": "答案 B：男士明確表示海關需要額外的文件，導致延遲，因此選擇 B 是正確的。選項 A、C、D 都不符實際對話內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "delay",
      "customs",
      "documentation"
    ],
    "transcript": "W: I noticed our shipment from Italy hasn't arrived yet. It was due yesterday.\nM: Yes, there’s been a delay at customs. They need additional documentation.\nW: That’s concerning. We promised our clients delivery by the 15th.\nM: I understand. I’ve already sent the necessary papers this morning.\nW: Can we expedite the process somehow?\nM: I’m coordinating with our shipping agent to speed it up.\nW: Great, please keep me updated. We can't afford more setbacks.\nM: Will do. I'll call you once I have more information.\nW: Thanks, I appreciate it.\nM: No problem.",
    "question_order": 2
  },
  {
    "id": "p3-gen-087",
    "part": "Part 3",
    "question": "What will the man most likely do next?",
    "choices": {
      "A": "Contact the clients.",
      "B": "Send more documentation.",
      "C": "Call the woman with updates.",
      "D": "Visit the customs office."
    },
    "answer": "C",
    "explanation_zh": "答案 C：男士在對話結尾表示他將會在有更多信息後致電女士更新資訊，因此選擇 C 是正確的。選項 A、B、D 都不是男士接下來會做的事情。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "expedite",
      "coordinate",
      "shipping agent"
    ],
    "transcript": "W: I noticed our shipment from Italy hasn't arrived yet. It was due yesterday.\nM: Yes, there’s been a delay at customs. They need additional documentation.\nW: That’s concerning. We promised our clients delivery by the 15th.\nM: I understand. I’ve already sent the necessary papers this morning.\nW: Can we expedite the process somehow?\nM: I’m coordinating with our shipping agent to speed it up.\nW: Great, please keep me updated. We can't afford more setbacks.\nM: Will do. I'll call you once I have more information.\nW: Thanks, I appreciate it.\nM: No problem.",
    "question_order": 3
  },
  {
    "id": "p3-gen-088",
    "part": "Part 3",
    "question": "What are the speakers mainly discussing?",
    "choices": {
      "A": "A new project assignment.",
      "B": "A change in the project deadline.",
      "C": "A client meeting location.",
      "D": "A design issue."
    },
    "answer": "B",
    "explanation_zh": "B: 根據對話內容，主要討論的是項目截止日期的變更。對話一開始女士問男士是否看到關於項目截止日期改變的電子郵件，因此這是討論的主要話題。選項A、C和D並未在對話中具體提及或成為主要討論點，故排除。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "deadline",
      "presentation",
      "agenda"
    ],
    "transcript": "W: Have you seen the email about the project deadline change?\nM: No, I haven't checked my inbox yet today. What's the new deadline?\nW: It's been moved to October 15th instead of the 10th.\nM: That's a relief. We needed more time to finalize the designs.\nW: Yes, and the client also requested a preliminary presentation by October 5th.\nM: We should schedule a meeting to discuss that presentation.\nW: Agreed. How about tomorrow afternoon at 2 PM?\nM: That works for me. I'll book a conference room.\nW: Great, I'll prepare the agenda for our meeting then.",
    "question_order": 1
  },
  {
    "id": "p3-gen-089",
    "part": "Part 3",
    "question": "What preliminary task is requested by the client?",
    "choices": {
      "A": "Finalizing the designs.",
      "B": "Scheduling a meeting.",
      "C": "Preparing a presentation.",
      "D": "Booking a conference room."
    },
    "answer": "C",
    "explanation_zh": "C: 客戶要求的是在10月5日前進行初步報告（preliminary presentation）。女士在對話中明確提到這一要求。選項A（完成設計）和B（安排會議）以及D（預訂會議室）並不是客戶要求的初步任務，因此被排除。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "preliminary",
      "client",
      "presentation"
    ],
    "transcript": "W: Have you seen the email about the project deadline change?\nM: No, I haven't checked my inbox yet today. What's the new deadline?\nW: It's been moved to October 15th instead of the 10th.\nM: That's a relief. We needed more time to finalize the designs.\nW: Yes, and the client also requested a preliminary presentation by October 5th.\nM: We should schedule a meeting to discuss that presentation.\nW: Agreed. How about tomorrow afternoon at 2 PM?\nM: That works for me. I'll book a conference room.\nW: Great, I'll prepare the agenda for our meeting then.",
    "question_order": 2
  },
  {
    "id": "p3-gen-090",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Check her email.",
      "B": "Finalize the designs.",
      "C": "Book a conference room.",
      "D": "Prepare the meeting agenda."
    },
    "answer": "D",
    "explanation_zh": "D: 女士在對話結尾表示會準備會議議程（agenda），因此她接下來要做的事情是準備會議議程。選項A、B、C不是對話中女士提到的下一步行動，因此排除。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "agenda",
      "meeting",
      "prepare"
    ],
    "transcript": "W: Have you seen the email about the project deadline change?\nM: No, I haven't checked my inbox yet today. What's the new deadline?\nW: It's been moved to October 15th instead of the 10th.\nM: That's a relief. We needed more time to finalize the designs.\nW: Yes, and the client also requested a preliminary presentation by October 5th.\nM: We should schedule a meeting to discuss that presentation.\nW: Agreed. How about tomorrow afternoon at 2 PM?\nM: That works for me. I'll book a conference room.\nW: Great, I'll prepare the agenda for our meeting then.",
    "question_order": 3
  },
  {
    "id": "p3-gen-091",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A client complaint.",
      "B": "A missed deadline.",
      "C": "A shipping delay.",
      "D": "A product defect."
    },
    "answer": "C",
    "explanation_zh": "C: 對話主要討論的是運輸延遲問題。對話中提到運輸日期從星期四推遲到了下星期一，且原因是海關延誤。選項A、B、D並未在對話中成為主要討論點，因此排除。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delivery",
      "customs"
    ],
    "transcript": "W: We've got a problem with the shipment scheduled for this Thursday. It seems the delivery date has been pushed to next Monday.\nM: That's disappointing. We promised delivery to our client by Friday.\nW: I checked with the shipping company, and they’re experiencing delays due to customs.\nM: Is there any way to expedite the process?\nW: They suggested using express shipping, but it will cost an extra $150.\nM: I think it's worth it to maintain our client relationship. Can you arrange it?\nW: Sure, I'll contact them now and confirm the express shipping.\nM: Great, thanks for handling this so promptly.\nW: No problem, I'll update you once it's confirmed.",
    "question_order": 1
  },
  {
    "id": "p3-gen-092",
    "part": "Part 3",
    "question": "What problem is mentioned in the conversation?",
    "choices": {
      "A": "The client canceled the order.",
      "B": "There is a product defect.",
      "C": "The shipment is lost.",
      "D": "The shipment is delayed due to customs."
    },
    "answer": "D",
    "explanation_zh": "D: 問題提到的問題是“由於海關的原因導致的運輸延遲”。女士在對話中提到運輸公司因海關而延遲。選項A、B、C在對話中沒有提到，故排除。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "delay",
      "customs",
      "express"
    ],
    "transcript": "W: We've got a problem with the shipment scheduled for this Thursday. It seems the delivery date has been pushed to next Monday.\nM: That's disappointing. We promised delivery to our client by Friday.\nW: I checked with the shipping company, and they’re experiencing delays due to customs.\nM: Is there any way to expedite the process?\nW: They suggested using express shipping, but it will cost an extra $150.\nM: I think it's worth it to maintain our client relationship. Can you arrange it?\nW: Sure, I'll contact them now and confirm the express shipping.\nM: Great, thanks for handling this so promptly.\nW: No problem, I'll update you once it's confirmed.",
    "question_order": 2
  },
  {
    "id": "p3-gen-093",
    "part": "Part 3",
    "question": "What does the woman plan to do next?",
    "choices": {
      "A": "Contact the shipping company for express shipping.",
      "B": "Update the client about the delay.",
      "C": "Cancel the order.",
      "D": "Discuss alternatives with the man."
    },
    "answer": "A",
    "explanation_zh": "A: 女士表示她會立即聯繫運輸公司並確認快遞運輸（express shipping），因此她接下來的計畫是進行這項安排。選項B、C、D並非對話中女士提到的下一步行動，因此排除。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "confirm",
      "express",
      "arrange"
    ],
    "transcript": "W: We've got a problem with the shipment scheduled for this Thursday. It seems the delivery date has been pushed to next Monday.\nM: That's disappointing. We promised delivery to our client by Friday.\nW: I checked with the shipping company, and they’re experiencing delays due to customs.\nM: Is there any way to expedite the process?\nW: They suggested using express shipping, but it will cost an extra $150.\nM: I think it's worth it to maintain our client relationship. Can you arrange it?\nW: Sure, I'll contact them now and confirm the express shipping.\nM: Great, thanks for handling this so promptly.\nW: No problem, I'll update you once it's confirmed.",
    "question_order": 3
  },
  {
    "id": "p3-gen-094",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Scheduling a conference",
      "B": "Placing a new order",
      "C": "Discussing a budget issue",
      "D": "Dealing with a shipment delay"
    },
    "answer": "D",
    "explanation_zh": "D: 對話主要討論的是運輸延遲問題。女士提到椅子的運輸被推遲。選項A、B、C並未在對話中成為主要討論點，因此排除。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "supplier",
      "conference"
    ],
    "transcript": "W: Hi, I see that our shipment of office chairs is scheduled for delivery this Friday.\nM: Yes, but there’s been a delay. The supplier notified us that they’ll now arrive next Monday.\nW: Oh, that’s unfortunate. We have a conference starting this weekend.\nM: I’ll contact the supplier to see if anything can be done to expedite it.\nW: Could we possibly arrange a partial delivery by Friday?\nM: I’ll ask, but I can’t promise anything.\nW: Please keep me updated. We might need to rent some chairs.\nM: I’ll update you as soon as I hear back.",
    "question_order": 1
  },
  {
    "id": "p3-gen-095",
    "part": "Part 3",
    "question": "What problem does the woman mention regarding the shipment?",
    "choices": {
      "A": "The chairs will arrive late.",
      "B": "The chairs are damaged.",
      "C": "The shipment is missing.",
      "D": "The wrong items were sent."
    },
    "answer": "A",
    "explanation_zh": "A: 女士提到椅子的到貨時間延遲到下週一，而不是原定的星期五。這是她所提到的問題。選項B、C、D沒有在對話中提及，因此排除。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "supplier",
      "delay"
    ],
    "transcript": "W: Hi, I see that our shipment of office chairs is scheduled for delivery this Friday.\nM: Yes, but there’s been a delay. The supplier notified us that they’ll now arrive next Monday.\nW: Oh, that’s unfortunate. We have a conference starting this weekend.\nM: I’ll contact the supplier to see if anything can be done to expedite it.\nW: Could we possibly arrange a partial delivery by Friday?\nM: I’ll ask, but I can’t promise anything.\nW: Please keep me updated. We might need to rent some chairs.\nM: I’ll update you as soon as I hear back.",
    "question_order": 2
  },
  {
    "id": "p3-gen-096",
    "part": "Part 3",
    "question": "What is the man likely to do next?",
    "choices": {
      "A": "Organize a team meeting",
      "B": "Contact the supplier",
      "C": "Rent additional chairs",
      "D": "Cancel the order"
    },
    "answer": "B",
    "explanation_zh": "B: 男士表示他將聯繫供應商以查看是否可以加快進度，因此接下來他很可能會聯繫供應商。選項A、C、D不是對話中男士提到的下一步行動，因此排除。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "contact",
      "supplier",
      "expedite"
    ],
    "transcript": "W: Hi, I see that our shipment of office chairs is scheduled for delivery this Friday.\nM: Yes, but there’s been a delay. The supplier notified us that they’ll now arrive next Monday.\nW: Oh, that’s unfortunate. We have a conference starting this weekend.\nM: I’ll contact the supplier to see if anything can be done to expedite it.\nW: Could we possibly arrange a partial delivery by Friday?\nM: I’ll ask, but I can’t promise anything.\nW: Please keep me updated. We might need to rent some chairs.\nM: I’ll update you as soon as I hear back.",
    "question_order": 3
  },
  {
    "id": "p3-gen-097",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Arranging shipment details for a conference",
      "B": "Discussing a conference agenda",
      "C": "Planning a business trip",
      "D": "Negotiating a storage contract"
    },
    "answer": "A",
    "explanation_zh": "對話的主要主題是關於運送到會議的細節，特別是運送日期的變更以及儲存問題。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "conference",
      "storage",
      "venue",
      "promotional"
    ],
    "transcript": "W: Did you get the shipment details for the conference next month?\nM: Yes, but there's a change. The shipment will arrive on the 15th, not the 20th.\nW: That's earlier than expected. Can we arrange storage at the venue?\nM: I checked, and they can store it for an additional $200.\nW: We should confirm that. What about the promotional materials?\nM: Those are scheduled to arrive separately on the 18th.\nW: Okay, I'll coordinate with the venue about early access.\nM: Great, I'll handle the storage payment once you confirm.",
    "question_order": 1
  },
  {
    "id": "p3-gen-098",
    "part": "Part 3",
    "question": "What change is mentioned regarding the shipment?",
    "choices": {
      "A": "The shipment is delayed to the 20th.",
      "B": "The shipment will now arrive on the 15th.",
      "C": "The shipment is canceled.",
      "D": "The shipment is arriving with additional items."
    },
    "answer": "B",
    "explanation_zh": "對話中提到貨物將於15日抵達，而不是原定的20日。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "details",
      "arrive",
      "confirm"
    ],
    "transcript": "W: Did you get the shipment details for the conference next month?\nM: Yes, but there's a change. The shipment will arrive on the 15th, not the 20th.\nW: That's earlier than expected. Can we arrange storage at the venue?\nM: I checked, and they can store it for an additional $200.\nW: We should confirm that. What about the promotional materials?\nM: Those are scheduled to arrive separately on the 18th.\nW: Okay, I'll coordinate with the venue about early access.\nM: Great, I'll handle the storage payment once you confirm.",
    "question_order": 2
  },
  {
    "id": "p3-gen-099",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Pay for the storage immediately",
      "B": "Inform the shipping company",
      "C": "Coordinate with the venue about early access",
      "D": "Order additional promotional materials"
    },
    "answer": "C",
    "explanation_zh": "她提到她會與場地協調提前進入事宜，這是她接下來的行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "coordinate",
      "venue",
      "access",
      "confirm",
      "storage"
    ],
    "transcript": "W: Did you get the shipment details for the conference next month?\nM: Yes, but there's a change. The shipment will arrive on the 15th, not the 20th.\nW: That's earlier than expected. Can we arrange storage at the venue?\nM: I checked, and they can store it for an additional $200.\nW: We should confirm that. What about the promotional materials?\nM: Those are scheduled to arrive separately on the 18th.\nW: Okay, I'll coordinate with the venue about early access.\nM: Great, I'll handle the storage payment once you confirm.",
    "question_order": 3
  },
  {
    "id": "p3-gen-100",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Scheduling a meeting",
      "B": "Resolving a shipment issue",
      "C": "Placing a new order",
      "D": "Canceling an order"
    },
    "answer": "B",
    "explanation_zh": "談話的主要話題是解決辦公椅的運輸問題。W提到他們昨天收到了運輸，但出現問題，顯示收到的椅子數量少於發票上所寫的。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "invoice",
      "supplier"
    ],
    "transcript": "W: We received the shipment of office chairs yesterday, but there seems to be a problem.\nM: What type of problem are you experiencing?\nW: The invoice shows 25 chairs, but we only received 20.\nM: I see. I'll contact the supplier to resolve this issue.\nW: Can you also check if they can expedite the delivery for the remaining chairs?\nM: Sure, I'll ask if they can ship the rest by Thursday.\nW: Great, we need them before our client meeting next week.\nM: I'll keep you updated on their response.\nW: Thank you, I appreciate it.\nM: No problem, I'll handle it right away.",
    "question_order": 1
  },
  {
    "id": "p3-gen-101",
    "part": "Part 3",
    "question": "What problem does the woman mention with the shipment?",
    "choices": {
      "A": "Delay in delivery",
      "B": "Incorrect item received",
      "C": "Shortage of chairs",
      "D": "Damaged chairs"
    },
    "answer": "C",
    "explanation_zh": "W指出問題是收到的椅子數量少於發票上所列的25張，只收到20張。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "invoice",
      "chairs"
    ],
    "transcript": "W: We received the shipment of office chairs yesterday, but there seems to be a problem.\nM: What type of problem are you experiencing?\nW: The invoice shows 25 chairs, but we only received 20.\nM: I see. I'll contact the supplier to resolve this issue.\nW: Can you also check if they can expedite the delivery for the remaining chairs?\nM: Sure, I'll ask if they can ship the rest by Thursday.\nW: Great, we need them before our client meeting next week.\nM: I'll keep you updated on their response.\nW: Thank you, I appreciate it.\nM: No problem, I'll handle it right away.",
    "question_order": 2
  },
  {
    "id": "p3-gen-102",
    "part": "Part 3",
    "question": "What will the man likely do next?",
    "choices": {
      "A": "Cancel the order",
      "B": "Check the invoice",
      "C": "Contact the client",
      "D": "Reach out to the supplier"
    },
    "answer": "D",
    "explanation_zh": "M表示他會聯繫供應商來解決這個問題，並詢問是否可以加快剩下椅子的運輸。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "supplier",
      "expedite",
      "delivery"
    ],
    "transcript": "W: We received the shipment of office chairs yesterday, but there seems to be a problem.\nM: What type of problem are you experiencing?\nW: The invoice shows 25 chairs, but we only received 20.\nM: I see. I'll contact the supplier to resolve this issue.\nW: Can you also check if they can expedite the delivery for the remaining chairs?\nM: Sure, I'll ask if they can ship the rest by Thursday.\nW: Great, we need them before our client meeting next week.\nM: I'll keep you updated on their response.\nW: Thank you, I appreciate it.\nM: No problem, I'll handle it right away.",
    "question_order": 3
  },
  {
    "id": "p3-gen-103",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Organizing a meeting",
      "B": "Scheduling a training session",
      "C": "Checking on a shipment",
      "D": "Discussing a contract"
    },
    "answer": "C",
    "explanation_zh": "對話的主要話題是關於辦公用品的運輸狀況，因為女方提到預定的運送日期是昨天。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "warehouse",
      "presentation"
    ],
    "transcript": "W: I noticed the shipment of office supplies was due yesterday but still hasn't arrived. Can you check the status for me?\nM: Sure, let me look it up. It seems there was a delay at the warehouse. They expect to deliver by Friday instead.\nW: Oh, that's later than I anticipated. We need those materials for the client's presentation on Monday.\nM: I'll contact the warehouse to see if they can expedite the shipment.\nW: Thanks. Could you also confirm the delivery address?\nM: Certainly, it's 123 Main Street, correct?\nW: Yes, that's right.\nM: I'll get back to you once I have more information.\nW: Great, I appreciate your help.",
    "question_order": 1
  },
  {
    "id": "p3-gen-104",
    "part": "Part 3",
    "question": "What problem is mentioned in the conversation?",
    "choices": {
      "A": "The meeting location is incorrect",
      "B": "The presentation materials are incomplete",
      "C": "The delivery address is wrong",
      "D": "The shipment is delayed"
    },
    "answer": "D",
    "explanation_zh": "對話中提到貨物運送延誤，原本應在昨天送達，但因倉庫問題推遲到週五。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "delay",
      "warehouse",
      "delivery"
    ],
    "transcript": "W: I noticed the shipment of office supplies was due yesterday but still hasn't arrived. Can you check the status for me?\nM: Sure, let me look it up. It seems there was a delay at the warehouse. They expect to deliver by Friday instead.\nW: Oh, that's later than I anticipated. We need those materials for the client's presentation on Monday.\nM: I'll contact the warehouse to see if they can expedite the shipment.\nW: Thanks. Could you also confirm the delivery address?\nM: Certainly, it's 123 Main Street, correct?\nW: Yes, that's right.\nM: I'll get back to you once I have more information.\nW: Great, I appreciate your help.",
    "question_order": 2
  },
  {
    "id": "p3-gen-105",
    "part": "Part 3",
    "question": "What is the man likely to do next?",
    "choices": {
      "A": "Contact the warehouse",
      "B": "Reschedule the presentation",
      "C": "Visit the warehouse",
      "D": "Change the delivery address"
    },
    "answer": "A",
    "explanation_zh": "男方表示將聯繫倉庫以加快運送，因此最可能的下一步行動是聯繫倉庫。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "expedite",
      "contact",
      "warehouse"
    ],
    "transcript": "W: I noticed the shipment of office supplies was due yesterday but still hasn't arrived. Can you check the status for me?\nM: Sure, let me look it up. It seems there was a delay at the warehouse. They expect to deliver by Friday instead.\nW: Oh, that's later than I anticipated. We need those materials for the client's presentation on Monday.\nM: I'll contact the warehouse to see if they can expedite the shipment.\nW: Thanks. Could you also confirm the delivery address?\nM: Certainly, it's 123 Main Street, correct?\nW: Yes, that's right.\nM: I'll get back to you once I have more information.\nW: Great, I appreciate your help.",
    "question_order": 3
  },
  {
    "id": "p3-gen-106",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Scheduling a meeting",
      "B": "Planning an event",
      "C": "Requesting office supplies",
      "D": "Discussing a delayed shipment"
    },
    "answer": "D",
    "explanation_zh": "選擇D：對話的主要話題是關於延遲的貨物運送，因為女士和男士都在討論辦公用品的運送延遲及其對會議的影響。選項A、B和C都不符合對話內容。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "delivery",
      "supplies"
    ],
    "transcript": "W: I just noticed the shipment of office supplies hasn't arrived. It was scheduled for yesterday.\nM: That's right. I checked with the delivery service, and it seems there was a delay due to weather conditions.\nW: Oh, I see. Could you please contact them again and find out the new delivery date?\nM: Sure, I'll do that right away.\nW: Thanks. We need those supplies for the meeting on Thursday.\nM: Understood. I'll also email you the updated delivery schedule once I get it.\nW: Great. If it doesn't arrive by tomorrow, we might need to make other arrangements.\nM: I'll keep you posted.",
    "question_order": 1
  },
  {
    "id": "p3-gen-107",
    "part": "Part 3",
    "question": "What caused the delay in the shipment?",
    "choices": {
      "A": "Weather conditions",
      "B": "A problem with the order",
      "C": "Supplier issues",
      "D": "Incorrect address"
    },
    "answer": "A",
    "explanation_zh": "選擇A：貨物的延遲是由於天氣條件造成的，這在男士的回答中明確提到：'it seems there was a delay due to weather conditions'。選項B、C和D在對話中未被提及。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "delay",
      "weather",
      "delivery"
    ],
    "transcript": "W: I just noticed the shipment of office supplies hasn't arrived. It was scheduled for yesterday.\nM: That's right. I checked with the delivery service, and it seems there was a delay due to weather conditions.\nW: Oh, I see. Could you please contact them again and find out the new delivery date?\nM: Sure, I'll do that right away.\nW: Thanks. We need those supplies for the meeting on Thursday.\nM: Understood. I'll also email you the updated delivery schedule once I get it.\nW: Great. If it doesn't arrive by tomorrow, we might need to make other arrangements.\nM: I'll keep you posted.",
    "question_order": 2
  },
  {
    "id": "p3-gen-108",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Schedule a meeting",
      "B": "Contact the delivery service",
      "C": "Make other arrangements",
      "D": "Cancel the order"
    },
    "answer": "B",
    "explanation_zh": "選擇B：男士表示他將'contact them again and find out the new delivery date'，這是他下一步將採取的行動。選項A、C和D在對話中不符合男士的計劃。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "contact",
      "schedule",
      "arrangements"
    ],
    "transcript": "W: I just noticed the shipment of office supplies hasn't arrived. It was scheduled for yesterday.\nM: That's right. I checked with the delivery service, and it seems there was a delay due to weather conditions.\nW: Oh, I see. Could you please contact them again and find out the new delivery date?\nM: Sure, I'll do that right away.\nW: Thanks. We need those supplies for the meeting on Thursday.\nM: Understood. I'll also email you the updated delivery schedule once I get it.\nW: Great. If it doesn't arrive by tomorrow, we might need to make other arrangements.\nM: I'll keep you posted.",
    "question_order": 3
  },
  {
    "id": "p3-gen-109",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "A shipment issue.",
      "B": "A trade show schedule.",
      "C": "A product demonstration.",
      "D": "An invoice payment."
    },
    "answer": "A",
    "explanation_zh": "選擇A：對話的主題是關於貨物問題，女士提到收到的發貨單上數量不對，男士則表示會立即聯繫供應商。選項B、C和D與對話的重點不符。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "invoice",
      "exhibition"
    ],
    "transcript": "W: I received the shipment invoice, but the item count is off. We ordered 150 units, but it only lists 120.\nM: That’s odd. Let me check our system. Ah, it seems there was an error in processing.\nW: Can it be corrected quickly? We need the full order by Friday for the trade show.\nM: I’ll contact the supplier immediately and expedite the remaining 30 units.\nW: Great, thanks. Do you think they can deliver to the exhibition center directly?\nM: I’ll ask if they can ship to the venue.\nW: Please do, and let me know as soon as possible.\nM: Will do. I’ll get back to you in an hour.",
    "question_order": 1
  },
  {
    "id": "p3-gen-110",
    "part": "Part 3",
    "question": "What is the problem mentioned in the conversation?",
    "choices": {
      "A": "A delayed payment.",
      "B": "An incorrect item count.",
      "C": "A missing invoice.",
      "D": "A wrong delivery address."
    },
    "answer": "B",
    "explanation_zh": "選擇B：對話中提到的問題是物品數量不正確，女士指出'We ordered 150 units, but it only lists 120'。這明顯是個錯誤的數量問題，而不是選項A、C或D。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "invoice",
      "item count"
    ],
    "transcript": "W: I received the shipment invoice, but the item count is off. We ordered 150 units, but it only lists 120.\nM: That’s odd. Let me check our system. Ah, it seems there was an error in processing.\nW: Can it be corrected quickly? We need the full order by Friday for the trade show.\nM: I’ll contact the supplier immediately and expedite the remaining 30 units.\nW: Great, thanks. Do you think they can deliver to the exhibition center directly?\nM: I’ll ask if they can ship to the venue.\nW: Please do, and let me know as soon as possible.\nM: Will do. I’ll get back to you in an hour.",
    "question_order": 2
  },
  {
    "id": "p3-gen-111",
    "part": "Part 3",
    "question": "What is the next action the man will take?",
    "choices": {
      "A": "Check the trade show schedule.",
      "B": "Send a new invoice.",
      "C": "Contact the supplier.",
      "D": "Verify the payment details."
    },
    "answer": "C",
    "explanation_zh": "選擇C：男士表示他將'contact the supplier immediately'，這是他接下來要做的事。選項A、B和D在對話中並未提到。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "contact",
      "supplier",
      "expedite"
    ],
    "transcript": "W: I received the shipment invoice, but the item count is off. We ordered 150 units, but it only lists 120.\nM: That’s odd. Let me check our system. Ah, it seems there was an error in processing.\nW: Can it be corrected quickly? We need the full order by Friday for the trade show.\nM: I’ll contact the supplier immediately and expedite the remaining 30 units.\nW: Great, thanks. Do you think they can deliver to the exhibition center directly?\nM: I’ll ask if they can ship to the venue.\nW: Please do, and let me know as soon as possible.\nM: Will do. I’ll get back to you in an hour.",
    "question_order": 3
  },
  {
    "id": "p3-gen-112",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Discussing a new product launch.",
      "B": "Addressing a shipment delay.",
      "C": "Planning a company event.",
      "D": "Reviewing a sales report."
    },
    "answer": "B",
    "explanation_zh": "選擇B：對話的主要話題是討論運輸延遲問題，女士提到供應商告知的延遲情況。選項A、C和D與對話的焦點不符。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delay",
      "supplier"
    ],
    "transcript": "W: I just received a call from the supplier about our shipment. They said there will be a delay.\nM: Oh no, did they mention how long the delay will be?\nW: Yes, they said it would be delayed by three days due to a customs issue.\nM: That means it won't arrive until next Tuesday. What about our client meeting scheduled for Monday?\nW: We might need to reschedule or discuss the issue with them.\nM: I'll call the client and explain the situation.\nW: Good idea. Let me know if we need to reschedule the meeting.\nM: Will do. I'll handle it right away.",
    "question_order": 1
  },
  {
    "id": "p3-gen-113",
    "part": "Part 3",
    "question": "What caused the shipment delay?",
    "choices": {
      "A": "Weather conditions.",
      "B": "Supplier's mistake.",
      "C": "Customs issue.",
      "D": "Transport strike."
    },
    "answer": "C",
    "explanation_zh": "選擇C：貨物延遲的原因是海關問題，女士在對話中明確提到'due to a customs issue'。選項A、B和D在對話中未被提及。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "shipment",
      "delay",
      "customs"
    ],
    "transcript": "W: I just received a call from the supplier about our shipment. They said there will be a delay.\nM: Oh no, did they mention how long the delay will be?\nW: Yes, they said it would be delayed by three days due to a customs issue.\nM: That means it won't arrive until next Tuesday. What about our client meeting scheduled for Monday?\nW: We might need to reschedule or discuss the issue with them.\nM: I'll call the client and explain the situation.\nW: Good idea. Let me know if we need to reschedule the meeting.\nM: Will do. I'll handle it right away.",
    "question_order": 2
  },
  {
    "id": "p3-gen-114",
    "part": "Part 3",
    "question": "What will the man do next?",
    "choices": {
      "A": "Contact the supplier.",
      "B": "Reschedule the client meeting.",
      "C": "Visit the customs office.",
      "D": "Call the client to explain the situation."
    },
    "answer": "D",
    "explanation_zh": "選擇D：男士表示他將'call the client and explain the situation'，這是他下一步要做的事情。選項A、B和C與對話中的計劃不符。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "client",
      "meeting",
      "reschedule"
    ],
    "transcript": "W: I just received a call from the supplier about our shipment. They said there will be a delay.\nM: Oh no, did they mention how long the delay will be?\nW: Yes, they said it would be delayed by three days due to a customs issue.\nM: That means it won't arrive until next Tuesday. What about our client meeting scheduled for Monday?\nW: We might need to reschedule or discuss the issue with them.\nM: I'll call the client and explain the situation.\nW: Good idea. Let me know if we need to reschedule the meeting.\nM: Will do. I'll handle it right away.",
    "question_order": 3
  },
  {
    "id": "p3-gen-115",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Scheduling a meeting",
      "B": "Planning an event",
      "C": "A delayed shipment",
      "D": "A canceled order"
    },
    "answer": "C",
    "explanation_zh": "答案是C：延遲的貨物。對話中討論的主要話題是辦公椅的運送延遲，因為卡車故障造成了延遲。選項A和B提到會議和活動，但它們只是提到而非主要討論的重點。選項D提到取消訂單，但對話中並未提到訂單被取消。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "delay",
      "supplier"
    ],
    "transcript": "W: Did you receive the shipment of office chairs today? I thought they were supposed to arrive by this morning.\nM: No, they didn't arrive. I just called the supplier, and they said there's a delay due to a truck breakdown.\nW: Oh, that's unfortunate. Did they give you a new delivery date?\nM: Yes, they expect to deliver them by tomorrow afternoon.\nW: Will that delay affect our meeting room setup for Thursday's event?\nM: It might. I'll schedule a temporary setup for now.\nW: Good idea. Please keep me updated if anything changes.\nM: Sure, I’ll send an update by email once I hear back.",
    "question_order": 1
  },
  {
    "id": "p3-gen-116",
    "part": "Part 3",
    "question": "What caused the delay in the shipment?",
    "choices": {
      "A": "Supplier's mistake",
      "B": "Customs issue",
      "C": "Weather conditions",
      "D": "Truck breakdown"
    },
    "answer": "D",
    "explanation_zh": "答案是D：卡車故障。在對話中，男士提到供應商告知貨物延遲是由於卡車故障。選項A、B和C並未在對話中提到或暗示是延遲的原因。",
    "skill_tag": "listening_inference",
    "difficulty": "B2",
    "vocabulary": [
      "shipment",
      "breakdown",
      "supplier"
    ],
    "transcript": "W: Did you receive the shipment of office chairs today? I thought they were supposed to arrive by this morning.\nM: No, they didn't arrive. I just called the supplier, and they said there's a delay due to a truck breakdown.\nW: Oh, that's unfortunate. Did they give you a new delivery date?\nM: Yes, they expect to deliver them by tomorrow afternoon.\nW: Will that delay affect our meeting room setup for Thursday's event?\nM: It might. I'll schedule a temporary setup for now.\nW: Good idea. Please keep me updated if anything changes.\nM: Sure, I’ll send an update by email once I hear back.",
    "question_order": 2
  },
  {
    "id": "p3-gen-117",
    "part": "Part 3",
    "question": "What will the man most likely do next?",
    "choices": {
      "A": "Set up a temporary meeting room",
      "B": "Cancel the event",
      "C": "Order more chairs",
      "D": "Call the supplier again"
    },
    "answer": "A",
    "explanation_zh": "答案是A：設置臨時會議室。男士提到可能的延遲會影響到會議室的設置，並表示將安排臨時設置。選項B和C並未在對話中提到或暗示是男士接下來會做的事情。選項D提到再次打電話給供應商，但男士並未表示要這樣做。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "temporary",
      "setup",
      "event"
    ],
    "transcript": "W: Did you receive the shipment of office chairs today? I thought they were supposed to arrive by this morning.\nM: No, they didn't arrive. I just called the supplier, and they said there's a delay due to a truck breakdown.\nW: Oh, that's unfortunate. Did they give you a new delivery date?\nM: Yes, they expect to deliver them by tomorrow afternoon.\nW: Will that delay affect our meeting room setup for Thursday's event?\nM: It might. I'll schedule a temporary setup for now.\nW: Good idea. Please keep me updated if anything changes.\nM: Sure, I’ll send an update by email once I hear back.",
    "question_order": 3
  },
  {
    "id": "p3-gen-118",
    "part": "Part 3",
    "question": "What is the main topic of the conversation?",
    "choices": {
      "A": "Scheduling a meeting",
      "B": "Planning a company event",
      "C": "Discussing a new purchase",
      "D": "Correcting an invoice error"
    },
    "answer": "D",
    "explanation_zh": "答案是D：更正發票錯誤。對話的主要話題是有關發票上的錯誤，女士提到Tech Supplies的發票金額不正確。選項A和B提到會議和公司事件，但它們沒有在對話中被提到。選項C提到新的購買，但重點是更正發票而非購買。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "invoice",
      "incorrect",
      "contact"
    ],
    "transcript": "W: I've noticed a mistake in our latest invoice from Tech Supplies. It's dated October 12th, but the amount is incorrect.\nM: Oh, what's wrong with it?\nW: They charged us for 15 printers instead of the 10 we ordered.\nM: That's a significant error. Should we contact them directly?\nW: Yes, I'll call them this afternoon. We need it corrected before the payment deadline on the 20th.\nM: Do you have their contact details?\nW: Yes, I have them in my email. I'll handle it.\nM: Let me know if you need any help resolving it.\nW: Will do, thanks.",
    "question_order": 1
  },
  {
    "id": "p3-gen-119",
    "part": "Part 3",
    "question": "What is the specific problem with the invoice?",
    "choices": {
      "A": "Charged for too many printers",
      "B": "Missing item details",
      "C": "Incorrect payment deadline",
      "D": "Wrong invoice date"
    },
    "answer": "A",
    "explanation_zh": "答案是A：收取了過多的打印機。女士在對話中提到發票上錯誤地收取了15臺打印機，而她們只訂購了10臺。選項B、C和D都不是發票中提到的具體問題。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "invoice",
      "amount",
      "printers"
    ],
    "transcript": "W: I've noticed a mistake in our latest invoice from Tech Supplies. It's dated October 12th, but the amount is incorrect.\nM: Oh, what's wrong with it?\nW: They charged us for 15 printers instead of the 10 we ordered.\nM: That's a significant error. Should we contact them directly?\nW: Yes, I'll call them this afternoon. We need it corrected before the payment deadline on the 20th.\nM: Do you have their contact details?\nW: Yes, I have them in my email. I'll handle it.\nM: Let me know if you need any help resolving it.\nW: Will do, thanks.",
    "question_order": 2
  },
  {
    "id": "p3-gen-120",
    "part": "Part 3",
    "question": "What will the woman do next?",
    "choices": {
      "A": "Email the supplier",
      "B": "Call Tech Supplies",
      "C": "Wait for a response",
      "D": "Review the invoice again"
    },
    "answer": "B",
    "explanation_zh": "答案是B：打電話給Tech Supplies。女士表示她將在下午打電話給Tech Supplies來解決發票問題。選項A、C和D並未在對話中提到或暗示是女士接下來會做的事情。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "contact",
      "details",
      "corrected"
    ],
    "transcript": "W: I've noticed a mistake in our latest invoice from Tech Supplies. It's dated October 12th, but the amount is incorrect.\nM: Oh, what's wrong with it?\nW: They charged us for 15 printers instead of the 10 we ordered.\nM: That's a significant error. Should we contact them directly?\nW: Yes, I'll call them this afternoon. We need it corrected before the payment deadline on the 20th.\nM: Do you have their contact details?\nW: Yes, I have them in my email. I'll handle it.\nM: Let me know if you need any help resolving it.\nW: Will do, thanks.",
    "question_order": 3
  },
  {
    "id": "p3-gen-121",
    "part": "Part 3",
    "question": "What is the main topic of this conversation?",
    "choices": {
      "A": "A delayed shipment.",
      "B": "A scheduling conflict.",
      "C": "An office renovation.",
      "D": "A new product launch."
    },
    "answer": "A",
    "explanation_zh": "答案是A：延遲的貨物。對話的主要話題是辦公椅的運送延遲和其預計到達日期。選項B和C提到時間衝突和辦公室裝修，但它們並未在對話中被提到。選項D提到新產品發布，但對話的重點是貨物延遲而非產品發布。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "shipment",
      "warehouse",
      "conference"
    ],
    "transcript": "W: I'm calling about the shipment of office chairs we ordered. They were supposed to arrive last Friday.\nM: Yes, I checked the tracking information, and it seems there was a delay at the warehouse.\nW: Can you tell me when the chairs are expected to arrive now?\nM: They should arrive by Wednesday at the latest.\nW: That's a relief. We have a conference starting next Thursday.\nM: I'll make sure to prioritize the delivery.\nW: Thank you. That's appreciated.\nM: Is there anything else you need help with today?\nW: No, that's all for now. Thank you.",
    "question_order": 1
  },
  {
    "id": "p3-gen-122",
    "part": "Part 3",
    "question": "What caused the delay in the shipment?",
    "choices": {
      "A": "A shortage of office chairs.",
      "B": "A delay at the warehouse.",
      "C": "Bad weather conditions.",
      "D": "Incorrect address."
    },
    "answer": "B",
    "explanation_zh": "答案是B：倉庫的延遲。男士在對話中提到跟蹤信息顯示在倉庫有延遲。選項A、C和D並未在對話中提到或暗示是延遲的原因。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "delay",
      "tracking",
      "expected"
    ],
    "transcript": "W: I'm calling about the shipment of office chairs we ordered. They were supposed to arrive last Friday.\nM: Yes, I checked the tracking information, and it seems there was a delay at the warehouse.\nW: Can you tell me when the chairs are expected to arrive now?\nM: They should arrive by Wednesday at the latest.\nW: That's a relief. We have a conference starting next Thursday.\nM: I'll make sure to prioritize the delivery.\nW: Thank you. That's appreciated.\nM: Is there anything else you need help with today?\nW: No, that's all for now. Thank you.",
    "question_order": 2
  },
  {
    "id": "p3-gen-123",
    "part": "Part 3",
    "question": "What will happen next?",
    "choices": {
      "A": "The conference will be postponed.",
      "B": "More chairs will be ordered.",
      "C": "The delivery will be prioritized.",
      "D": "The warehouse will be visited."
    },
    "answer": "C",
    "explanation_zh": "答案是C：交貨會被優先處理。男士在對話中表示將確保交貨優先處理。選項A、B和D並未在對話中提到或暗示是接下來會發生的事情。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "prioritize",
      "delivery",
      "relief"
    ],
    "transcript": "W: I'm calling about the shipment of office chairs we ordered. They were supposed to arrive last Friday.\nM: Yes, I checked the tracking information, and it seems there was a delay at the warehouse.\nW: Can you tell me when the chairs are expected to arrive now?\nM: They should arrive by Wednesday at the latest.\nW: That's a relief. We have a conference starting next Thursday.\nM: I'll make sure to prioritize the delivery.\nW: Thank you. That's appreciated.\nM: Is there anything else you need help with today?\nW: No, that's all for now. Thank you.",
    "question_order": 3
  },
  {
    "id": "p4-gen-031",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To announce a change in work hours.",
      "B": "To advertise a new security system.",
      "C": "To inform about restricted building access.",
      "D": "To introduce a new employee badge system."
    },
    "answer": "C",
    "explanation_zh": "選擇C是正確的，因為公告的主要目的是通知員工有關主建築物訪問的限制。公告明確指出由於安全更新，訪問將受到限制。其他選項，如A（宣佈工作時間變更）、B（宣傳新安全系統）和D（介紹新員工徽章系統），在公告中未被提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "security",
      "access",
      "restricted"
    ],
    "transcript": "Attention all employees. Due to a security update, access to the main building will be restricted this Saturday, October 21st, from 7:00 AM to 1:00 PM. During this time, your regular entry cards will not function. Instead, temporary access passes will be available at the front desk starting Friday afternoon. Please ensure you pick one up before Saturday. If you need assistance or have any questions, contact our security team at extension 102. Thank you for your cooperation in maintaining a safe workplace environment.",
    "question_order": 1
  },
  {
    "id": "p4-gen-032",
    "part": "Part 4",
    "question": "When will the access restriction take place?",
    "choices": {
      "A": "This Friday afternoon.",
      "B": "This Saturday afternoon.",
      "C": "This Friday morning.",
      "D": "This Saturday morning."
    },
    "answer": "D",
    "explanation_zh": "選擇D是正確的，因為限制在星期六早上7:00到下午1:00之間進行。選項A、B和C都錯誤地提到星期五，而不是公告中明確提到的星期六。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "access",
      "restricted",
      "temporary"
    ],
    "transcript": "Attention all employees. Due to a security update, access to the main building will be restricted this Saturday, October 21st, from 7:00 AM to 1:00 PM. During this time, your regular entry cards will not function. Instead, temporary access passes will be available at the front desk starting Friday afternoon. Please ensure you pick one up before Saturday. If you need assistance or have any questions, contact our security team at extension 102. Thank you for your cooperation in maintaining a safe workplace environment.",
    "question_order": 2
  },
  {
    "id": "p4-gen-033",
    "part": "Part 4",
    "question": "What should employees do before Saturday?",
    "choices": {
      "A": "Collect a temporary access pass.",
      "B": "Upgrade their entry cards.",
      "C": "Contact the IT department.",
      "D": "Change their work schedule."
    },
    "answer": "A",
    "explanation_zh": "選擇A是正確的，因為公告指示員工在星期六之前領取臨時通行證。選項B（升級進入卡）、C（聯繫IT部門）和D（更改工作時間表）都未在公告中提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "temporary",
      "access",
      "pass"
    ],
    "transcript": "Attention all employees. Due to a security update, access to the main building will be restricted this Saturday, October 21st, from 7:00 AM to 1:00 PM. During this time, your regular entry cards will not function. Instead, temporary access passes will be available at the front desk starting Friday afternoon. Please ensure you pick one up before Saturday. If you need assistance or have any questions, contact our security team at extension 102. Thank you for your cooperation in maintaining a safe workplace environment.",
    "question_order": 3
  },
  {
    "id": "p4-gen-034",
    "part": "Part 4",
    "question": "What is the main topic of the announcement?",
    "choices": {
      "A": "Store opening hours",
      "B": "New product launch",
      "C": "Customer service policy",
      "D": "Summer sale promotion"
    },
    "answer": "D",
    "explanation_zh": "選擇D是正確的，因為公告的主要話題是SunnyMart的夏季促銷活動。公告開頭明確提到年度夏季促銷。其他選項，如A（商店開放時間）、B（新產品發布）和C（客戶服務政策），都未在公告中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "promotion",
      "discounts",
      "electronics"
    ],
    "transcript": "Welcome to SunnyMart's annual summer sale! From July 15th to July 30th, enjoy discounts of up to 50% on select items throughout the store. Please note that this promotion excludes electronics and clearance items. Additionally, all members will receive an extra 10% off their purchases. To make the most of these deals, ensure you have your membership card ready at checkout. Don't miss out on these incredible savings, but remember, the sale ends on July 30th, so plan your visit accordingly!",
    "question_order": 1
  },
  {
    "id": "p4-gen-035",
    "part": "Part 4",
    "question": "Which items are excluded from the promotion?",
    "choices": {
      "A": "Electronics",
      "B": "Furniture",
      "C": "Toys",
      "D": "Clothing"
    },
    "answer": "A",
    "explanation_zh": "選擇A是正確的，因為公告明確指出促銷活動不包括電子產品和清倉商品。選項B（傢俱）、C（玩具）和D（服裝）都未在公告中提及為被排除的項目。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "excludes",
      "electronics",
      "clearance"
    ],
    "transcript": "Welcome to SunnyMart's annual summer sale! From July 15th to July 30th, enjoy discounts of up to 50% on select items throughout the store. Please note that this promotion excludes electronics and clearance items. Additionally, all members will receive an extra 10% off their purchases. To make the most of these deals, ensure you have your membership card ready at checkout. Don't miss out on these incredible savings, but remember, the sale ends on July 30th, so plan your visit accordingly!",
    "question_order": 2
  },
  {
    "id": "p4-gen-036",
    "part": "Part 4",
    "question": "What should a customer do to receive the extra discount?",
    "choices": {
      "A": "Visit the store before July 15th",
      "B": "Bring their membership card",
      "C": "Purchase clearance items",
      "D": "Buy electronics"
    },
    "answer": "B",
    "explanation_zh": "選擇B是正確的，因為公告指示顧客在結帳時準備好會員卡以獲得額外折扣。選項A（在7月15日之前訪問商店）、C（購買清倉商品）和D（購買電子產品）都不符合公告中的指示。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "members",
      "membership card",
      "checkout"
    ],
    "transcript": "Welcome to SunnyMart's annual summer sale! From July 15th to July 30th, enjoy discounts of up to 50% on select items throughout the store. Please note that this promotion excludes electronics and clearance items. Additionally, all members will receive an extra 10% off their purchases. To make the most of these deals, ensure you have your membership card ready at checkout. Don't miss out on these incredible savings, but remember, the sale ends on July 30th, so plan your visit accordingly!",
    "question_order": 3
  },
  {
    "id": "p4-gen-037",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To inform passengers about a delay.",
      "B": "To announce a new train schedule.",
      "C": "To advertise shuttle services.",
      "D": "To welcome passengers onboard."
    },
    "answer": "A",
    "explanation_zh": "選擇A是正確的，因為公告的主要目的是通知乘客有關延誤的情況。公告開頭即表示歉意並提到延誤的原因。其他選項，如B（宣佈新列車時間表）、C（宣傳接駁服務）和D（歡迎乘客登機），都未在公告中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "delay",
      "maintenance",
      "resume"
    ],
    "transcript": "Ladies and gentlemen, we apologize for the delay in your journey today. Due to unexpected maintenance work, train service on Line 4 will be temporarily suspended. We expect service to resume by 3 PM. Passengers traveling to Central Station are advised to use the shuttle buses available at the North Exit, which will depart every 15 minutes. If you need further assistance, please visit our customer service desk located on the first floor. Thank you for your understanding and patience.",
    "question_order": 1
  },
  {
    "id": "p4-gen-038",
    "part": "Part 4",
    "question": "What is causing the train service suspension?",
    "choices": {
      "A": "A public holiday.",
      "B": "Unexpected maintenance work.",
      "C": "Severe weather conditions.",
      "D": "A technical upgrade."
    },
    "answer": "B",
    "explanation_zh": "選擇B是正確的，因為公告明確指出列車服務的暫停是由於意外維修工作引起的。選項A（公共假日）、C（惡劣天氣）和D（技術升級）都不是原因，也未在公告中提及。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "suspension",
      "maintenance",
      "unexpected"
    ],
    "transcript": "Ladies and gentlemen, we apologize for the delay in your journey today. Due to unexpected maintenance work, train service on Line 4 will be temporarily suspended. We expect service to resume by 3 PM. Passengers traveling to Central Station are advised to use the shuttle buses available at the North Exit, which will depart every 15 minutes. If you need further assistance, please visit our customer service desk located on the first floor. Thank you for your understanding and patience.",
    "question_order": 2
  },
  {
    "id": "p4-gen-039",
    "part": "Part 4",
    "question": "What should passengers heading to Central Station do next?",
    "choices": {
      "A": "Wait at the platform.",
      "B": "Take a taxi.",
      "C": "Use the shuttle buses.",
      "D": "Go to the nearest hotel."
    },
    "answer": "C",
    "explanation_zh": "選擇C是正確的，因為公告指示前往中央車站的乘客使用北出口的接駁巴士。選項A（在平臺等待）、B（乘坐出租車）和D（前往最近的酒店）都不是公告中提到的行動建議。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "shuttle",
      "passengers",
      "assistance"
    ],
    "transcript": "Ladies and gentlemen, we apologize for the delay in your journey today. Due to unexpected maintenance work, train service on Line 4 will be temporarily suspended. We expect service to resume by 3 PM. Passengers traveling to Central Station are advised to use the shuttle buses available at the North Exit, which will depart every 15 minutes. If you need further assistance, please visit our customer service desk located on the first floor. Thank you for your understanding and patience.",
    "question_order": 3
  },
  {
    "id": "p4-gen-040",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To introduce a new team member",
      "B": "To remind staff about a training session",
      "C": "To announce a change in office location",
      "D": "To request feedback on a recent meeting"
    },
    "answer": "B",
    "explanation_zh": "答案選擇B：宣佈的主要目的是提醒員工即將舉行的訓練會議。題目中的\"This is a reminder about our upcoming staff training session\"明確說明了這一點。選項A、C、D均未在文中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "reminder",
      "scheduled",
      "conference"
    ],
    "transcript": "Good morning, team. This is a reminder about our upcoming staff training session scheduled for this Thursday, the 14th of October. It will take place in the main conference room on the second floor, starting at 9 a.m. sharp. Please ensure you bring the training manuals distributed last week, as we'll be covering sections two and three. If you haven't received your manual yet, contact Sarah in HR by the end of today. Remember, attendance is mandatory for all team members. Looking forward to seeing everyone there.",
    "question_order": 1
  },
  {
    "id": "p4-gen-041",
    "part": "Part 4",
    "question": "What should employees do if they haven't received their training manual?",
    "choices": {
      "A": "Attend a meeting with the manager",
      "B": "Check their email for updates",
      "C": "Contact Sarah in HR",
      "D": "Visit the main conference room"
    },
    "answer": "C",
    "explanation_zh": "答案選擇C：員工若未收到訓練手冊，應聯繫HR的Sarah。這在文中有明確指示：\"contact Sarah in HR by the end of today\"。選項A、B、D均與未收到手冊無關。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "manual",
      "distributed",
      "mandatory"
    ],
    "transcript": "Good morning, team. This is a reminder about our upcoming staff training session scheduled for this Thursday, the 14th of October. It will take place in the main conference room on the second floor, starting at 9 a.m. sharp. Please ensure you bring the training manuals distributed last week, as we'll be covering sections two and three. If you haven't received your manual yet, contact Sarah in HR by the end of today. Remember, attendance is mandatory for all team members. Looking forward to seeing everyone there.",
    "question_order": 2
  },
  {
    "id": "p4-gen-042",
    "part": "Part 4",
    "question": "What is the next action employees are advised to take?",
    "choices": {
      "A": "Confirm their attendance",
      "B": "Submit a report",
      "C": "Prepare a presentation",
      "D": "Bring their training manuals"
    },
    "answer": "D",
    "explanation_zh": "答案選擇D：員工被建議下一步要帶上訓練手冊。文中\"Please ensure you bring the training manuals\"明確指出這是接下來應該做的。選項A、B、C則沒有在文中提到。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "session",
      "mandatory",
      "attendance"
    ],
    "transcript": "Good morning, team. This is a reminder about our upcoming staff training session scheduled for this Thursday, the 14th of October. It will take place in the main conference room on the second floor, starting at 9 a.m. sharp. Please ensure you bring the training manuals distributed last week, as we'll be covering sections two and three. If you haven't received your manual yet, contact Sarah in HR by the end of today. Remember, attendance is mandatory for all team members. Looking forward to seeing everyone there.",
    "question_order": 3
  },
  {
    "id": "p4-gen-043",
    "part": "Part 4",
    "question": "What is the main purpose of this message?",
    "choices": {
      "A": "To announce a new service",
      "B": "To introduce a new product",
      "C": "To inform about a service interruption",
      "D": "To promote customer feedback"
    },
    "answer": "C",
    "explanation_zh": "答案選擇C：訊息的主要目的是告知服務中斷。文中\"We are currently experiencing a service interruption\"直接說明了這一點。選項A、B、D則未在訊息中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "interruption",
      "maintenance",
      "technician"
    ],
    "transcript": "Thank you for calling Horizon Internet Services. We are currently experiencing a service interruption due to unexpected maintenance at our downtown data center. Our technicians are working diligently to restore full service by 3:00 PM today. We apologize for the inconvenience and appreciate your patience. For updates, you can visit our website or follow us on social media. If you have an urgent issue, press 1 to speak to a customer service representative. Please note that our call volume is higher than usual, so there might be a delay in response. Thank you for your understanding.",
    "question_order": 1
  },
  {
    "id": "p4-gen-044",
    "part": "Part 4",
    "question": "What specific detail is mentioned about the service restoration?",
    "choices": {
      "A": "It will be completed by tomorrow morning.",
      "B": "It is delayed indefinitely.",
      "C": "It will be completed by 5:00 PM today.",
      "D": "It will be completed by 3:00 PM today."
    },
    "answer": "D",
    "explanation_zh": "答案選擇D：訊息中具體提到服務將於今天下午3點恢復。文中\"restore full service by 3:00 PM today\"清楚地指出。選項A、B、C均與文中描述不符。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "restore",
      "full service",
      "data center"
    ],
    "transcript": "Thank you for calling Horizon Internet Services. We are currently experiencing a service interruption due to unexpected maintenance at our downtown data center. Our technicians are working diligently to restore full service by 3:00 PM today. We apologize for the inconvenience and appreciate your patience. For updates, you can visit our website or follow us on social media. If you have an urgent issue, press 1 to speak to a customer service representative. Please note that our call volume is higher than usual, so there might be a delay in response. Thank you for your understanding.",
    "question_order": 2
  },
  {
    "id": "p4-gen-045",
    "part": "Part 4",
    "question": "What should a customer do if they have an urgent issue?",
    "choices": {
      "A": "Press 1 to speak to a representative",
      "B": "Visit the company office",
      "C": "Wait until service is restored",
      "D": "Send an email"
    },
    "answer": "A",
    "explanation_zh": "答案選擇A：若客戶有緊急問題，應按1與客服人員交談。這在文中已明確指出：\"press 1 to speak to a customer service representative\"。選項B、C、D皆無法及時解決緊急問題。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "urgent",
      "representative",
      "volume"
    ],
    "transcript": "Thank you for calling Horizon Internet Services. We are currently experiencing a service interruption due to unexpected maintenance at our downtown data center. Our technicians are working diligently to restore full service by 3:00 PM today. We apologize for the inconvenience and appreciate your patience. For updates, you can visit our website or follow us on social media. If you have an urgent issue, press 1 to speak to a customer service representative. Please note that our call volume is higher than usual, so there might be a delay in response. Thank you for your understanding.",
    "question_order": 3
  },
  {
    "id": "p4-gen-046",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To provide a schedule for cleaning services",
      "B": "To announce a new security policy",
      "C": "To warn about potential power outages",
      "D": "To inform about changes in building access"
    },
    "answer": "D",
    "explanation_zh": "答案選擇D：公告的主要目的是告知建築物出入變更。文中\"the main entrance to the building will be closed for renovations\"表達了這一信息。選項A、B、C均未在公告中提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "entrance",
      "renovations",
      "access",
      "building",
      "cooperation"
    ],
    "transcript": "Attention all building occupants: Starting this Monday, October 16th, the main entrance to the building will be closed for renovations. Please use the side entrance located near the parking lot. This closure is expected to last for two weeks, with the main entrance reopening on October 30th. During this period, access cards will not be required at the side entrance between 8 AM and 6 PM. After hours, you'll still need your card for entry. We apologize for any inconvenience this may cause and appreciate your cooperation.",
    "question_order": 1
  },
  {
    "id": "p4-gen-047",
    "part": "Part 4",
    "question": "When will the main entrance be available again?",
    "choices": {
      "A": "October 30th",
      "B": "October 23rd",
      "C": "October 28th",
      "D": "October 16th"
    },
    "answer": "A",
    "explanation_zh": "答案選擇A：公告中提到主入口將於10月30日重新開放。文中\"with the main entrance reopening on October 30th\"明確提到。選項B、C、D不符合文中時間安排。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "entrance",
      "renovations",
      "closure",
      "access",
      "reopen"
    ],
    "transcript": "Attention all building occupants: Starting this Monday, October 16th, the main entrance to the building will be closed for renovations. Please use the side entrance located near the parking lot. This closure is expected to last for two weeks, with the main entrance reopening on October 30th. During this period, access cards will not be required at the side entrance between 8 AM and 6 PM. After hours, you'll still need your card for entry. We apologize for any inconvenience this may cause and appreciate your cooperation.",
    "question_order": 2
  },
  {
    "id": "p4-gen-048",
    "part": "Part 4",
    "question": "What should occupants do if they arrive after 6 PM?",
    "choices": {
      "A": "Use the main entrance",
      "B": "Bring their access card",
      "C": "Wait until the next day",
      "D": "Contact building security"
    },
    "answer": "B",
    "explanation_zh": "答案選擇B：若在下午6點後到達，住戶應攜帶出入卡。文中\"After hours, you'll still need your card for entry\"清楚地指出這一點。選項A、C、D均不符合文中指示。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "occupants",
      "entrance",
      "access card",
      "after hours"
    ],
    "transcript": "Attention all building occupants: Starting this Monday, October 16th, the main entrance to the building will be closed for renovations. Please use the side entrance located near the parking lot. This closure is expected to last for two weeks, with the main entrance reopening on October 30th. During this period, access cards will not be required at the side entrance between 8 AM and 6 PM. After hours, you'll still need your card for entry. We apologize for any inconvenience this may cause and appreciate your cooperation.",
    "question_order": 3
  },
  {
    "id": "p4-gen-049",
    "part": "Part 4",
    "question": "What is the main topic of the announcement?",
    "choices": {
      "A": "A store promotion.",
      "B": "A product recall.",
      "C": "A new store opening.",
      "D": "A clearance sale."
    },
    "answer": "A",
    "explanation_zh": "選擇A：公告的主要內容是關於QuickSave Mart推出的促銷活動。從3月15日至25日，所有電子產品享有20%的折扣。這個促銷活動是公告的主題。選項B、C、D均未在公告中提及，因此不正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "promotion",
      "electronics",
      "discount"
    ],
    "transcript": "Hello shoppers, thank you for visiting QuickSave Mart today! We’re thrilled to announce our special promotion starting from March 15th until March 25th. You can enjoy a 20% discount on all electronics, but remember, this offer is only valid in-store and excludes clearance items. Visit our electronics section on the second floor to take advantage of these amazing savings. For more details, feel free to ask any of our friendly staff. Don’t miss this opportunity to upgrade your gadgets at a great price!",
    "question_order": 1
  },
  {
    "id": "p4-gen-050",
    "part": "Part 4",
    "question": "What is excluded from the promotion?",
    "choices": {
      "A": "All electronics.",
      "B": "Clearance items.",
      "C": "Online purchases.",
      "D": "Third-floor merchandise."
    },
    "answer": "B",
    "explanation_zh": "選擇B：公告中特別指出促銷不包括清倉商品，這是直接的排除項。選項A不正確，因為所有電子產品是享有折扣的；選項C和D未在公告中提及，無法確定。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "excluded",
      "clearance",
      "electronics"
    ],
    "transcript": "Hello shoppers, thank you for visiting QuickSave Mart today! We’re thrilled to announce our special promotion starting from March 15th until March 25th. You can enjoy a 20% discount on all electronics, but remember, this offer is only valid in-store and excludes clearance items. Visit our electronics section on the second floor to take advantage of these amazing savings. For more details, feel free to ask any of our friendly staff. Don’t miss this opportunity to upgrade your gadgets at a great price!",
    "question_order": 2
  },
  {
    "id": "p4-gen-051",
    "part": "Part 4",
    "question": "What should shoppers do if they need more details?",
    "choices": {
      "A": "Visit the store website.",
      "B": "Check the flyers.",
      "C": "Ask the staff.",
      "D": "Call customer service."
    },
    "answer": "C",
    "explanation_zh": "選擇C：公告建議消費者若需要更多細節，可以詢問店內的友善員工。選項A、B、D在公告中均未提及提供更多詳情的方式。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "details",
      "staff",
      "ask"
    ],
    "transcript": "Hello shoppers, thank you for visiting QuickSave Mart today! We’re thrilled to announce our special promotion starting from March 15th until March 25th. You can enjoy a 20% discount on all electronics, but remember, this offer is only valid in-store and excludes clearance items. Visit our electronics section on the second floor to take advantage of these amazing savings. For more details, feel free to ask any of our friendly staff. Don’t miss this opportunity to upgrade your gadgets at a great price!",
    "question_order": 3
  },
  {
    "id": "p4-gen-052",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To provide information about a train schedule change.",
      "B": "To announce a delay in train departure.",
      "C": "To offer discounts on train tickets.",
      "D": "To inform about new train routes."
    },
    "answer": "B",
    "explanation_zh": "選擇B：公告的主要目的是告知乘客由於軌道維修，火車出發延遲30分鐘。選項A是相關資訊的一部分，但不是公告的主要目的；選項C和D在公告中未提及。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "delay",
      "maintenance",
      "departure",
      "refreshments",
      "announcement"
    ],
    "transcript": "Attention passengers on Train 472 to Boston. Due to unexpected track maintenance, our departure will be delayed by approximately 30 minutes. We apologize for the inconvenience this may cause and appreciate your patience. Passengers can spend this time in the waiting area, where there are complimentary refreshments available. The new estimated departure time is 2:15 PM instead of the original 1:45 PM. Please listen for further announcements regarding any additional updates. Thank you for your understanding.",
    "question_order": 1
  },
  {
    "id": "p4-gen-053",
    "part": "Part 4",
    "question": "What time is the train now expected to depart?",
    "choices": {
      "A": "1:45 PM",
      "B": "2:00 PM",
      "C": "2:15 PM",
      "D": "3:00 PM"
    },
    "answer": "C",
    "explanation_zh": "選擇C：公告中指出，新的預計出發時間是2點15分，而非原定的1點45分。因此，正確答案是2點15分。其他選項在公告中均不匹配。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "departure",
      "estimated",
      "refreshments",
      "maintenance",
      "update"
    ],
    "transcript": "Attention passengers on Train 472 to Boston. Due to unexpected track maintenance, our departure will be delayed by approximately 30 minutes. We apologize for the inconvenience this may cause and appreciate your patience. Passengers can spend this time in the waiting area, where there are complimentary refreshments available. The new estimated departure time is 2:15 PM instead of the original 1:45 PM. Please listen for further announcements regarding any additional updates. Thank you for your understanding.",
    "question_order": 2
  },
  {
    "id": "p4-gen-054",
    "part": "Part 4",
    "question": "What should passengers do while waiting for the train?",
    "choices": {
      "A": "Speak to the station manager.",
      "B": "Board the train immediately.",
      "C": "Check their tickets for updates.",
      "D": "Use the waiting area with refreshments."
    },
    "answer": "D",
    "explanation_zh": "選擇D：公告建議乘客在等待期間可以在候車區享用免費茶點。選項A、B、C未在公告中建議或提供相關資訊。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "waiting area",
      "refreshments",
      "patience",
      "announcement",
      "departure"
    ],
    "transcript": "Attention passengers on Train 472 to Boston. Due to unexpected track maintenance, our departure will be delayed by approximately 30 minutes. We apologize for the inconvenience this may cause and appreciate your patience. Passengers can spend this time in the waiting area, where there are complimentary refreshments available. The new estimated departure time is 2:15 PM instead of the original 1:45 PM. Please listen for further announcements regarding any additional updates. Thank you for your understanding.",
    "question_order": 3
  },
  {
    "id": "p4-gen-055",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To inform about a new policy.",
      "B": "To announce a company holiday.",
      "C": "To remind about a staff training session.",
      "D": "To introduce a new team member."
    },
    "answer": "C",
    "explanation_zh": "選擇C：公告的主要目的是提醒員工即將舉行的員工培訓會議。選項A、B、D在公告中均未提及，因此不正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "reminder",
      "upcoming",
      "scheduled"
    ],
    "transcript": "Good morning team! This is a reminder about our upcoming staff training session scheduled for next Wednesday, the 10th of March, at 9 AM. It will be held in the main conference room on the third floor. Please make sure to bring your laptops for the interactive parts of the training. Unfortunately, we had to cancel the coffee service, so plan accordingly. If you have any questions or require further information, feel free to reach out to the HR department. Thank you and see you all there!",
    "question_order": 1
  },
  {
    "id": "p4-gen-056",
    "part": "Part 4",
    "question": "What detail is mentioned about the training session?",
    "choices": {
      "A": "It includes lunch service.",
      "B": "It will be held online.",
      "C": "It starts at 10 AM.",
      "D": "It will be in the main conference room."
    },
    "answer": "D",
    "explanation_zh": "選擇D：公告提到培訓會議將在三樓的主會議室舉行。選項A、B、C不正確，因為公告中未提及午餐服務、線上舉行或上午10點開始。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "conference",
      "main",
      "training"
    ],
    "transcript": "Good morning team! This is a reminder about our upcoming staff training session scheduled for next Wednesday, the 10th of March, at 9 AM. It will be held in the main conference room on the third floor. Please make sure to bring your laptops for the interactive parts of the training. Unfortunately, we had to cancel the coffee service, so plan accordingly. If you have any questions or require further information, feel free to reach out to the HR department. Thank you and see you all there!",
    "question_order": 2
  },
  {
    "id": "p4-gen-057",
    "part": "Part 4",
    "question": "What should staff members do before attending the training?",
    "choices": {
      "A": "Bring their laptops.",
      "B": "Confirm their attendance.",
      "C": "Prepare a presentation.",
      "D": "Meet in the lobby first."
    },
    "answer": "A",
    "explanation_zh": "選擇A：公告中要求員工帶上筆記本電腦以便參加培訓的互動部分。選項B、C、D在公告中未提及是參加培訓前需要做的準備。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "interactive",
      "laptops",
      "training"
    ],
    "transcript": "Good morning team! This is a reminder about our upcoming staff training session scheduled for next Wednesday, the 10th of March, at 9 AM. It will be held in the main conference room on the third floor. Please make sure to bring your laptops for the interactive parts of the training. Unfortunately, we had to cancel the coffee service, so plan accordingly. If you have any questions or require further information, feel free to reach out to the HR department. Thank you and see you all there!",
    "question_order": 3
  },
  {
    "id": "p4-gen-058",
    "part": "Part 4",
    "question": "What is the main topic of this recorded message?",
    "choices": {
      "A": "Information about a new product launch.",
      "B": "Details on store opening hours.",
      "C": "An apology for a recent price increase.",
      "D": "Customer service wait times due to a software update."
    },
    "answer": "D",
    "explanation_zh": "選擇D - 根據錄音訊息中提到的「由於新軟體更新發布，我們目前正在經歷高呼叫量，等待時間比平常更長」，這清楚指出了主要主題是因為軟體更新導致的客戶服務等待時間。A、B和C選項未在訊息中提到或非主要焦點，因此不正確。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "wait times",
      "software update",
      "customer service"
    ],
    "transcript": "Thank you for calling the customer service line of TechnoGadgets. We are currently experiencing high call volumes due to a new software update release. As a result, wait times are longer than usual, approximately fifteen minutes. We apologize for any inconvenience this may cause. Remember, you can access troubleshooting guides and FAQs on our website at technogadgets.com. For immediate issues, please consider visiting our nearest store, open from 10 AM to 8 PM daily. Thank you for your patience.",
    "question_order": 1
  },
  {
    "id": "p4-gen-059",
    "part": "Part 4",
    "question": "What is causing longer wait times?",
    "choices": {
      "A": "A new software update release.",
      "B": "A new pricing policy.",
      "C": "Staff shortages.",
      "D": "Store renovations."
    },
    "answer": "A",
    "explanation_zh": "選擇A - 錄音中提到「由於新軟體更新發布」，這是造成等待時間較長的原因。B、C和D皆未提及，且與高呼叫量無直接關聯，因此不正確。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "cause",
      "software update",
      "wait times"
    ],
    "transcript": "Thank you for calling the customer service line of TechnoGadgets. We are currently experiencing high call volumes due to a new software update release. As a result, wait times are longer than usual, approximately fifteen minutes. We apologize for any inconvenience this may cause. Remember, you can access troubleshooting guides and FAQs on our website at technogadgets.com. For immediate issues, please consider visiting our nearest store, open from 10 AM to 8 PM daily. Thank you for your patience.",
    "question_order": 2
  },
  {
    "id": "p4-gen-060",
    "part": "Part 4",
    "question": "What should customers do for immediate issues?",
    "choices": {
      "A": "Call back later.",
      "B": "Visit the nearest store.",
      "C": "Email customer support.",
      "D": "Check the company's social media page."
    },
    "answer": "B",
    "explanation_zh": "選擇B - 訊息中建議「對於立即的問題，請考慮造訪我們最近的商店」，這意味著客戶應該去最近的商店處理緊急問題。其他選項未被提到或不符合訊息建議，因此不正確。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "immediate issues",
      "nearest store",
      "visit"
    ],
    "transcript": "Thank you for calling the customer service line of TechnoGadgets. We are currently experiencing high call volumes due to a new software update release. As a result, wait times are longer than usual, approximately fifteen minutes. We apologize for any inconvenience this may cause. Remember, you can access troubleshooting guides and FAQs on our website at technogadgets.com. For immediate issues, please consider visiting our nearest store, open from 10 AM to 8 PM daily. Thank you for your patience.",
    "question_order": 3
  },
  {
    "id": "p4-gen-061",
    "part": "Part 4",
    "question": "What is the announcement mainly about?",
    "choices": {
      "A": "New access badges for the office building.",
      "B": "A change in office hours.",
      "C": "An upcoming holiday schedule.",
      "D": "A staff meeting agenda."
    },
    "answer": "A",
    "explanation_zh": "選擇A - 公告中明確指出「自下週一開始，進入主辦公樓需使用新安全徽章」，這顯示公告主要是關於新的進入徽章。B、C和D選項未被提及，或與公告內容無關。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "access",
      "security",
      "badge"
    ],
    "transcript": "Attention all employees: Starting next Monday, access to the main office building will require a new security badge. This change is due to updates in our security protocols. Please ensure you obtain your badge from the reception desk by this Friday, October 15th. The badges can be picked up between 9 AM and 5 PM. Remember to have your employee ID ready when collecting your badge. Also, note that the old badges will no longer grant building access after Sunday. We appreciate your cooperation during this transition.",
    "question_order": 1
  },
  {
    "id": "p4-gen-062",
    "part": "Part 4",
    "question": "By what date must employees obtain their new badge?",
    "choices": {
      "A": "Monday, October 18th.",
      "B": "Friday, October 15th.",
      "C": "Sunday, October 17th.",
      "D": "Wednesday, October 13th."
    },
    "answer": "B",
    "explanation_zh": "選擇B - 公告中指出「請確保在本週五，10月15日前從接待處獲取您的徽章」，這明確說明了員工必須在10月15日之前獲得新徽章。其他選項的日期不符合公告內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "obtain",
      "badge",
      "reception"
    ],
    "transcript": "Attention all employees: Starting next Monday, access to the main office building will require a new security badge. This change is due to updates in our security protocols. Please ensure you obtain your badge from the reception desk by this Friday, October 15th. The badges can be picked up between 9 AM and 5 PM. Remember to have your employee ID ready when collecting your badge. Also, note that the old badges will no longer grant building access after Sunday. We appreciate your cooperation during this transition.",
    "question_order": 2
  },
  {
    "id": "p4-gen-063",
    "part": "Part 4",
    "question": "What should employees do next?",
    "choices": {
      "A": "Check the new office hours.",
      "B": "Attend a staff meeting.",
      "C": "Collect their new security badge.",
      "D": "Submit a request for leave."
    },
    "answer": "C",
    "explanation_zh": "選擇C - 公告中要求「請確保從接待處獲取您的徽章」，這明確指示了員工下一步應該做的事情。其他選項沒有在公告中提到或不相關。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "collect",
      "badge",
      "transition"
    ],
    "transcript": "Attention all employees: Starting next Monday, access to the main office building will require a new security badge. This change is due to updates in our security protocols. Please ensure you obtain your badge from the reception desk by this Friday, October 15th. The badges can be picked up between 9 AM and 5 PM. Remember to have your employee ID ready when collecting your badge. Also, note that the old badges will no longer grant building access after Sunday. We appreciate your cooperation during this transition.",
    "question_order": 3
  },
  {
    "id": "p4-gen-064",
    "part": "Part 4",
    "question": "What is the main topic of the announcement?",
    "choices": {
      "A": "A new store opening",
      "B": "A storewide promotion",
      "C": "A product recall",
      "D": "A staff meeting"
    },
    "answer": "B",
    "explanation_zh": "選擇B - 公告中提到「我們很高興地宣佈我們的全店促銷」，這明確指出了公告的主要話題是促銷活動。A、C和D選項未被提到，且與公告內容無關。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "promotion",
      "discount",
      "selected"
    ],
    "transcript": "Good morning, shoppers! We are excited to announce our storewide promotion running from October 15th to October 31st. Enjoy discounts of up to 50% on selected items, including our popular kitchenware and home appliances. Please note that this promotion is available only at our downtown location and cannot be combined with any other offers. Remember to check the tags for discounted items as some exclusions apply. For more details and a list of eligible products, visit our customer service desk or our website. Don't miss out on these incredible savings!",
    "question_order": 1
  },
  {
    "id": "p4-gen-065",
    "part": "Part 4",
    "question": "Where is the promotion available?",
    "choices": {
      "A": "Online",
      "B": "At all locations",
      "C": "At the downtown location",
      "D": "At the suburban location"
    },
    "answer": "C",
    "explanation_zh": "選擇C - 公告中明確提到「此促銷活動僅在我們的市中心地點提供」，這指出促銷活動的地點。A、B和D選項不符合公告內容。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "promotion",
      "location",
      "downtown"
    ],
    "transcript": "Good morning, shoppers! We are excited to announce our storewide promotion running from October 15th to October 31st. Enjoy discounts of up to 50% on selected items, including our popular kitchenware and home appliances. Please note that this promotion is available only at our downtown location and cannot be combined with any other offers. Remember to check the tags for discounted items as some exclusions apply. For more details and a list of eligible products, visit our customer service desk or our website. Don't miss out on these incredible savings!",
    "question_order": 2
  },
  {
    "id": "p4-gen-066",
    "part": "Part 4",
    "question": "What should a shopper do to find more information about the eligible products?",
    "choices": {
      "A": "Call the store manager",
      "B": "Visit a different location",
      "C": "Wait for a mail brochure",
      "D": "Check online or at customer service"
    },
    "answer": "D",
    "explanation_zh": "選擇D - 公告中提到「更多詳情和產品清單，請訪問我們的客服櫃檯或我們的網站」，這意味著購物者應該在線上或客服櫃檯查詢更多產品資訊。其他選項未被提及或不匹配公告中的建議。",
    "skill_tag": "listening_next_action",
    "difficulty": "B2",
    "vocabulary": [
      "eligible",
      "customer service",
      "website"
    ],
    "transcript": "Good morning, shoppers! We are excited to announce our storewide promotion running from October 15th to October 31st. Enjoy discounts of up to 50% on selected items, including our popular kitchenware and home appliances. Please note that this promotion is available only at our downtown location and cannot be combined with any other offers. Remember to check the tags for discounted items as some exclusions apply. For more details and a list of eligible products, visit our customer service desk or our website. Don't miss out on these incredible savings!",
    "question_order": 3
  },
  {
    "id": "p4-gen-067",
    "part": "Part 4",
    "question": "What is the main purpose of this announcement?",
    "choices": {
      "A": "To promote a new flight service",
      "B": "To announce boarding gate changes",
      "C": "To inform about a flight delay",
      "D": "To provide weather updates"
    },
    "answer": "C",
    "explanation_zh": "選擇C是正確的，因為公告的主要目的是通知乘客航班延誤，這在公告中直接說明：'there will be a delay in the departure of Flight 678 to New York due to adverse weather conditions.' A、B和D都沒有提到。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "departure",
      "delay",
      "weather"
    ],
    "transcript": "Ladies and gentlemen, we apologize for the inconvenience, but there will be a delay in the departure of Flight 678 to New York due to adverse weather conditions. The new departure time is now scheduled for 3:30 PM, instead of the original 2:00 PM. Please check the flight information screens for updates. We appreciate your patience and understanding. Refreshment vouchers will be distributed at Gate 12. Thank you for your cooperation and we hope to have you on board soon.",
    "question_order": 1
  },
  {
    "id": "p4-gen-068",
    "part": "Part 4",
    "question": "What time is the flight now scheduled to depart?",
    "choices": {
      "A": "2:00 PM",
      "B": "2:30 PM",
      "C": "3:00 PM",
      "D": "3:30 PM"
    },
    "answer": "D",
    "explanation_zh": "選擇D是正確的，公告中明確指出：'The new departure time is now scheduled for 3:30 PM'。A是原定的起飛時間，B和C根本沒有被提到。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "scheduled",
      "departure",
      "time"
    ],
    "transcript": "Ladies and gentlemen, we apologize for the inconvenience, but there will be a delay in the departure of Flight 678 to New York due to adverse weather conditions. The new departure time is now scheduled for 3:30 PM, instead of the original 2:00 PM. Please check the flight information screens for updates. We appreciate your patience and understanding. Refreshment vouchers will be distributed at Gate 12. Thank you for your cooperation and we hope to have you on board soon.",
    "question_order": 2
  },
  {
    "id": "p4-gen-069",
    "part": "Part 4",
    "question": "What should passengers do next?",
    "choices": {
      "A": "Collect refreshment vouchers at Gate 12",
      "B": "Check the weather forecast",
      "C": "Board the flight immediately",
      "D": "Change their flight tickets"
    },
    "answer": "A",
    "explanation_zh": "選擇A是正確的，因為公告提到：'Refreshment vouchers will be distributed at Gate 12.'，這就是乘客應該做的事情。B、C和D都沒有在公告中提到。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "refreshment",
      "vouchers",
      "Gate 12"
    ],
    "transcript": "Ladies and gentlemen, we apologize for the inconvenience, but there will be a delay in the departure of Flight 678 to New York due to adverse weather conditions. The new departure time is now scheduled for 3:30 PM, instead of the original 2:00 PM. Please check the flight information screens for updates. We appreciate your patience and understanding. Refreshment vouchers will be distributed at Gate 12. Thank you for your cooperation and we hope to have you on board soon.",
    "question_order": 3
  },
  {
    "id": "p4-gen-070",
    "part": "Part 4",
    "question": "What is the purpose of this announcement?",
    "choices": {
      "A": "To introduce new staff members",
      "B": "To announce a company holiday",
      "C": "To notify about a policy change",
      "D": "To remind about a training session"
    },
    "answer": "D",
    "explanation_zh": "選擇D是正確的，因為公告的目的是提醒即將舉行的訓練會議：'This is a reminder about the mandatory training session scheduled...'。A、B和C都與公告內容不符。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "mandatory",
      "session",
      "attendance"
    ],
    "transcript": "Good morning, team. This is a reminder about the mandatory training session scheduled for this Friday, October 13th, at 10 AM in the main conference room. The session will cover new company policies and procedures. Please bring your employee handbook for reference. Note that attendance is required for all staff members, and the session is expected to last approximately two hours. If you have any conflicts with this schedule, please inform your department manager as soon as possible to arrange an alternative. Thank you for your cooperation.",
    "question_order": 1
  },
  {
    "id": "p4-gen-071",
    "part": "Part 4",
    "question": "When is the training session scheduled?",
    "choices": {
      "A": "Friday, October 13th",
      "B": "Wednesday, October 11th",
      "C": "Monday, October 9th",
      "D": "Thursday, October 12th"
    },
    "answer": "A",
    "explanation_zh": "選擇A是正確的，公告中明確指出訓練會議的安排時間：'this Friday, October 13th, at 10 AM'。B、C和D的日期都不正確。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "scheduled",
      "conference",
      "reference"
    ],
    "transcript": "Good morning, team. This is a reminder about the mandatory training session scheduled for this Friday, October 13th, at 10 AM in the main conference room. The session will cover new company policies and procedures. Please bring your employee handbook for reference. Note that attendance is required for all staff members, and the session is expected to last approximately two hours. If you have any conflicts with this schedule, please inform your department manager as soon as possible to arrange an alternative. Thank you for your cooperation.",
    "question_order": 2
  },
  {
    "id": "p4-gen-072",
    "part": "Part 4",
    "question": "What should an employee do if they have a conflict with the schedule?",
    "choices": {
      "A": "Skip the session",
      "B": "Inform their department manager",
      "C": "Attend another session",
      "D": "Contact human resources"
    },
    "answer": "B",
    "explanation_zh": "選擇B是正確的，因為公告中指示：'If you have any conflicts with this schedule, please inform your department manager...'。A、C和D都不在公告中提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "conflicts",
      "inform",
      "arrange"
    ],
    "transcript": "Good morning, team. This is a reminder about the mandatory training session scheduled for this Friday, October 13th, at 10 AM in the main conference room. The session will cover new company policies and procedures. Please bring your employee handbook for reference. Note that attendance is required for all staff members, and the session is expected to last approximately two hours. If you have any conflicts with this schedule, please inform your department manager as soon as possible to arrange an alternative. Thank you for your cooperation.",
    "question_order": 3
  },
  {
    "id": "p4-gen-073",
    "part": "Part 4",
    "question": "What is the main purpose of this message?",
    "choices": {
      "A": "To address a delivery delay",
      "B": "To announce a new product",
      "C": "To offer a discount",
      "D": "To request customer feedback"
    },
    "answer": "A",
    "explanation_zh": "選擇A是正確的，因為訊息的主要目的是告知訂單延遲：'We're currently experiencing a delay in fulfilling orders due to a temporary shortage of microchips.' B、C和D都與訊息內容不符。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "delay",
      "shortage",
      "notification"
    ],
    "transcript": "Hello, this is a recorded update from Oceanic Electronics' customer service team. We're currently experiencing a delay in fulfilling orders due to a temporary shortage of microchips. This affects all orders placed after September 10th. We anticipate resuming normal delivery schedules by October 1st. If your order is affected, you will receive a notification email soon. In the meantime, please visit our website for more information or contact our support team at support@oceanicelectronics.com. We apologize for any inconvenience and appreciate your patience.",
    "question_order": 1
  },
  {
    "id": "p4-gen-074",
    "part": "Part 4",
    "question": "What is causing the delay in order fulfillment?",
    "choices": {
      "A": "Weather conditions",
      "B": "Microchip shortage",
      "C": "Staff shortage",
      "D": "Software update"
    },
    "answer": "B",
    "explanation_zh": "選擇B是正確的，因為公告中指出延遲的原因是：'due to a temporary shortage of microchips.' A、C和D都未提到。",
    "skill_tag": "listening_inference",
    "difficulty": "B1",
    "vocabulary": [
      "fulfillment",
      "shortage",
      "temporary"
    ],
    "transcript": "Hello, this is a recorded update from Oceanic Electronics' customer service team. We're currently experiencing a delay in fulfilling orders due to a temporary shortage of microchips. This affects all orders placed after September 10th. We anticipate resuming normal delivery schedules by October 1st. If your order is affected, you will receive a notification email soon. In the meantime, please visit our website for more information or contact our support team at support@oceanicelectronics.com. We apologize for any inconvenience and appreciate your patience.",
    "question_order": 2
  },
  {
    "id": "p4-gen-075",
    "part": "Part 4",
    "question": "What should affected customers do next?",
    "choices": {
      "A": "Cancel their orders",
      "B": "Visit the nearest store",
      "C": "Check their email for notifications",
      "D": "Wait for a phone call"
    },
    "answer": "C",
    "explanation_zh": "選擇C是正確的，因為公告中指示：'If your order is affected, you will receive a notification email soon.'，所以受影響的客戶應檢查電子郵件。A、B和D都不在公告中提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "notification",
      "affected",
      "contact"
    ],
    "transcript": "Hello, this is a recorded update from Oceanic Electronics' customer service team. We're currently experiencing a delay in fulfilling orders due to a temporary shortage of microchips. This affects all orders placed after September 10th. We anticipate resuming normal delivery schedules by October 1st. If your order is affected, you will receive a notification email soon. In the meantime, please visit our website for more information or contact our support team at support@oceanicelectronics.com. We apologize for any inconvenience and appreciate your patience.",
    "question_order": 3
  },
  {
    "id": "p4-gen-076",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To inform about a new security policy",
      "B": "To notify about entrance renovations",
      "C": "To announce a building evacuation",
      "D": "To introduce new building staff"
    },
    "answer": "B",
    "explanation_zh": "選擇 B：公告的主要目的是通知建築物主要入口的整修，明確指出 'the main entrance of the building will undergo renovation'。選項 A、C 和 D 都沒有提到入口整修。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "entrance",
      "renovation",
      "restricted"
    ],
    "transcript": "Attention all building occupants. Starting next Monday, October 9th, the main entrance of the building will undergo renovation. During this period, please use the side entrance located on Maple Street. The renovation is expected to last until Friday, October 20th. Access through the main entrance will be restricted, and security personnel will be available to assist with directions. We apologize for any inconvenience this may cause. Please ensure that you carry your ID badge at all times for verification purposes. Thank you for your cooperation.",
    "question_order": 1
  },
  {
    "id": "p4-gen-077",
    "part": "Part 4",
    "question": "What alternative entrance should be used during the renovation?",
    "choices": {
      "A": "The back entrance",
      "B": "The south entrance",
      "C": "The side entrance on Maple Street",
      "D": "The garage entrance"
    },
    "answer": "C",
    "explanation_zh": "選擇 C：通知中明確指示在整修期間應使用 'the side entrance located on Maple Street'。A、B 和 D 都不是提到的替代入口。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "alternative",
      "entrance",
      "Maple Street"
    ],
    "transcript": "Attention all building occupants. Starting next Monday, October 9th, the main entrance of the building will undergo renovation. During this period, please use the side entrance located on Maple Street. The renovation is expected to last until Friday, October 20th. Access through the main entrance will be restricted, and security personnel will be available to assist with directions. We apologize for any inconvenience this may cause. Please ensure that you carry your ID badge at all times for verification purposes. Thank you for your cooperation.",
    "question_order": 2
  },
  {
    "id": "p4-gen-078",
    "part": "Part 4",
    "question": "What should occupants do to ensure smooth access during the renovation?",
    "choices": {
      "A": "Schedule a meeting with security",
      "B": "Avoid using the building during renovations",
      "C": "Carry their ID badge for verification",
      "D": "Report any inconvenience to management"
    },
    "answer": "C",
    "explanation_zh": "選擇 C：公告中特別要求攜帶 'your ID badge at all times for verification'。雖然 D 是不錯的建議，但公告中沒有指示要報告不便。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "occupants",
      "verification",
      "cooperation"
    ],
    "transcript": "Attention all building occupants. Starting next Monday, October 9th, the main entrance of the building will undergo renovation. During this period, please use the side entrance located on Maple Street. The renovation is expected to last until Friday, October 20th. Access through the main entrance will be restricted, and security personnel will be available to assist with directions. We apologize for any inconvenience this may cause. Please ensure that you carry your ID badge at all times for verification purposes. Thank you for your cooperation.",
    "question_order": 3
  },
  {
    "id": "p4-gen-079",
    "part": "Part 4",
    "question": "What is the main topic of the announcement?",
    "choices": {
      "A": "A new store opening.",
      "B": "A change in store hours.",
      "C": "A store promotion event.",
      "D": "A customer service update."
    },
    "answer": "C",
    "explanation_zh": "選擇 C：公告的主題是介紹 'annual Spring Sale'，即商店促銷活動。選項 A、B 和 D 不符合公告內容。",
    "skill_tag": "listening_main_idea",
    "difficulty": "B1",
    "vocabulary": [
      "annual",
      "discounts",
      "selected",
      "exclusive",
      "customer"
    ],
    "transcript": "Hello shoppers! Welcome to the annual Spring Sale at Park Lane Mall, running from March 10th to March 20th. Enjoy discounts of up to 50% on selected items throughout our stores. Please note that the discounts do not apply to electronics and already discounted items. Also, remember to check our special offers in the clothing section, where you can find exclusive deals this weekend only. Don't miss out on these fantastic savings, and happy shopping! If you have any questions, visit our customer service desk located on the first floor.",
    "question_order": 1
  },
  {
    "id": "p4-gen-080",
    "part": "Part 4",
    "question": "What items are not eligible for a discount?",
    "choices": {
      "A": "Clothing items.",
      "B": "Home appliances.",
      "C": "Groceries.",
      "D": "Electronics."
    },
    "answer": "D",
    "explanation_zh": "選擇 D：公告明確指出折扣 'do not apply to electronics'。A、B 和 C 並沒有被提到不適用於折扣。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "eligible",
      "discount",
      "apply",
      "electronics",
      "selected"
    ],
    "transcript": "Hello shoppers! Welcome to the annual Spring Sale at Park Lane Mall, running from March 10th to March 20th. Enjoy discounts of up to 50% on selected items throughout our stores. Please note that the discounts do not apply to electronics and already discounted items. Also, remember to check our special offers in the clothing section, where you can find exclusive deals this weekend only. Don't miss out on these fantastic savings, and happy shopping! If you have any questions, visit our customer service desk located on the first floor.",
    "question_order": 2
  },
  {
    "id": "p4-gen-081",
    "part": "Part 4",
    "question": "What should shoppers do if they have questions?",
    "choices": {
      "A": "Visit the customer service desk.",
      "B": "Call the helpline number.",
      "C": "Send an email to the support team.",
      "D": "Check the store website."
    },
    "answer": "A",
    "explanation_zh": "選擇 A：公告指示如有問題，請 'visit our customer service desk located on the first floor'。B、C 和 D 並未提及。",
    "skill_tag": "listening_next_action",
    "difficulty": "A2",
    "vocabulary": [
      "shoppers",
      "service",
      "questions",
      "located",
      "desk"
    ],
    "transcript": "Hello shoppers! Welcome to the annual Spring Sale at Park Lane Mall, running from March 10th to March 20th. Enjoy discounts of up to 50% on selected items throughout our stores. Please note that the discounts do not apply to electronics and already discounted items. Also, remember to check our special offers in the clothing section, where you can find exclusive deals this weekend only. Don't miss out on these fantastic savings, and happy shopping! If you have any questions, visit our customer service desk located on the first floor.",
    "question_order": 3
  },
  {
    "id": "p4-gen-082",
    "part": "Part 4",
    "question": "What is the main purpose of the announcement?",
    "choices": {
      "A": "To inform about a gate change",
      "B": "To announce a new boarding procedure",
      "C": "To advertise an airport service",
      "D": "To announce a flight delay"
    },
    "answer": "D",
    "explanation_zh": "選擇 D：公告的主要目的是通知 'your flight has been delayed'。選項 A、B 和 C 與飛行延誤無關。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "announcement",
      "departure",
      "inconvenience"
    ],
    "transcript": "Good afternoon, passengers. This is an announcement for those traveling on Flight 472 to New York. Due to severe weather conditions, your flight has been delayed. Originally scheduled for departure at 4 PM, the new departure time is now 6 PM. We apologize for the inconvenience and appreciate your patience. Please remain in the terminal near Gate 15, where our staff will provide updates. If you have any questions, feel free to approach our customer service desk located next to the main entrance. Thank you for your understanding.",
    "question_order": 1
  },
  {
    "id": "p4-gen-083",
    "part": "Part 4",
    "question": "What time was the flight originally scheduled to depart?",
    "choices": {
      "A": "4 PM",
      "B": "3 PM",
      "C": "5 PM",
      "D": "2 PM"
    },
    "answer": "A",
    "explanation_zh": "選擇 A：公告提到航班最初計劃於 'originally scheduled for departure at 4 PM'。B、C 和 D 都不是原定時間。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "originally",
      "scheduled",
      "departure"
    ],
    "transcript": "Good afternoon, passengers. This is an announcement for those traveling on Flight 472 to New York. Due to severe weather conditions, your flight has been delayed. Originally scheduled for departure at 4 PM, the new departure time is now 6 PM. We apologize for the inconvenience and appreciate your patience. Please remain in the terminal near Gate 15, where our staff will provide updates. If you have any questions, feel free to approach our customer service desk located next to the main entrance. Thank you for your understanding.",
    "question_order": 2
  },
  {
    "id": "p4-gen-084",
    "part": "Part 4",
    "question": "What should passengers do next according to the announcement?",
    "choices": {
      "A": "Proceed to the boarding gate",
      "B": "Stay near Gate 15 for updates",
      "C": "Visit the main entrance",
      "D": "Contact the airline by phone"
    },
    "answer": "B",
    "explanation_zh": "選擇 B：公告中請乘客 'remain in the terminal near Gate 15 for updates'。A、C 和 D 並不是公告中指示的行動。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "remain",
      "terminal",
      "updates"
    ],
    "transcript": "Good afternoon, passengers. This is an announcement for those traveling on Flight 472 to New York. Due to severe weather conditions, your flight has been delayed. Originally scheduled for departure at 4 PM, the new departure time is now 6 PM. We apologize for the inconvenience and appreciate your patience. Please remain in the terminal near Gate 15, where our staff will provide updates. If you have any questions, feel free to approach our customer service desk located next to the main entrance. Thank you for your understanding.",
    "question_order": 3
  },
  {
    "id": "p4-gen-085",
    "part": "Part 4",
    "question": "What is the main topic of the announcement?",
    "choices": {
      "A": "A staff training reminder.",
      "B": "A software update release.",
      "C": "A department meeting.",
      "D": "A project deadline extension."
    },
    "answer": "A",
    "explanation_zh": "根據錄音，這是一個關於員工培訓的提醒，其中提到“mandatory staff training session”以及具體時間地點。",
    "skill_tag": "listening_main_idea",
    "difficulty": "A2",
    "vocabulary": [
      "mandatory",
      "session",
      "procedures"
    ],
    "transcript": "Hello, team. This is a reminder that our mandatory staff training session will take place this Friday, October 27th, at 10 AM in Conference Room B. Please ensure you bring your laptops and any necessary documents. The training will cover the new software updates and how they impact our daily operations. Remember, this session is crucial for staying current with company procedures. If you have any questions, contact your department head by Thursday afternoon. We look forward to seeing everyone there.",
    "question_order": 1
  },
  {
    "id": "p4-gen-086",
    "part": "Part 4",
    "question": "Where will the training session be held?",
    "choices": {
      "A": "In the main office.",
      "B": "In Conference Room B.",
      "C": "In the cafeteria.",
      "D": "In the training center."
    },
    "answer": "B",
    "explanation_zh": "錄音中明確提到培訓將在“Conference Room B”舉行，因此正確答案是B。",
    "skill_tag": "listening_inference",
    "difficulty": "A2",
    "vocabulary": [
      "conference",
      "room",
      "session"
    ],
    "transcript": "Hello, team. This is a reminder that our mandatory staff training session will take place this Friday, October 27th, at 10 AM in Conference Room B. Please ensure you bring your laptops and any necessary documents. The training will cover the new software updates and how they impact our daily operations. Remember, this session is crucial for staying current with company procedures. If you have any questions, contact your department head by Thursday afternoon. We look forward to seeing everyone there.",
    "question_order": 2
  },
  {
    "id": "p4-gen-087",
    "part": "Part 4",
    "question": "What should employees do if they have questions?",
    "choices": {
      "A": "Wait until Friday.",
      "B": "Contact IT support.",
      "C": "Reach out to their department head.",
      "D": "Check the company website."
    },
    "answer": "C",
    "explanation_zh": "錄音中說明若有問題，員工應在星期四下午前聯繫部門負責人，因此選項C為正確答案。",
    "skill_tag": "listening_next_action",
    "difficulty": "B1",
    "vocabulary": [
      "contact",
      "questions",
      "department"
    ],
    "transcript": "Hello, team. This is a reminder that our mandatory staff training session will take place this Friday, October 27th, at 10 AM in Conference Room B. Please ensure you bring your laptops and any necessary documents. The training will cover the new software updates and how they impact our daily operations. Remember, this session is crucial for staying current with company procedures. If you have any questions, contact your department head by Thursday afternoon. We look forward to seeing everyone there.",
    "question_order": 3
  },
  {
  "question": "When will the new office chairs be delivered?",
  "choices": {
    "A": "They should arrive next Tuesday.",
    "B": "The chairs are brand new and very comfortable.",
    "C": "Yes, I can check the tracking for you."
  },
  "answer": "A",
  "explanation_zh": "問題詢問新辦公室椅子的交貨時間，正確答案是A選項，指出預計交貨時間為下週二。B選項雖然提到了椅子這個詞，但它描述的是椅子的狀況而非交貨時間。C選項回答的是另一類問題，並未提供具體的交貨日期。",
  "difficulty": "B1",
  "vocabulary": [
    "delivered",
    "office chairs",
    "arrive"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-101",
  "audioScript": "Q: When will the new office chairs be delivered?\n(A) They should arrive next Tuesday.\n(B) The chairs are brand new and very comfortable.\n(C) Yes, I can check the tracking for you."
},
  {
  "question": "Where are the extra ink cartridges stored?",
  "choices": {
    "A": "They should last a few months.",
    "B": "In the supply closet next to the printer paper.",
    "C": "The printer needs servicing soon."
  },
  "answer": "B",
  "explanation_zh": "問題詢問墨水匣存放的位置。選項B提供了具體的地點“在供應櫃中，靠近打印紙旁邊”，是唯一合理的答案。選項A提到墨水匣的使用時長，並未回答存放地點。選項C提到打印機需要維修，也未回答問題。選項A中出現的“should”不符合問題的“where”。",
  "difficulty": "A2",
  "vocabulary": [
    "store",
    "supply",
    "printer"
  ],
  "id": "p2-gen-102",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Where are the extra ink cartridges stored?\n(A) They should last a few months.\n(B) In the supply closet next to the printer paper.\n(C) The printer needs servicing soon."
},
  {
  "question": "Who should I contact about ordering more office supplies?",
  "choices": {
    "A": "The office supplies are in the storage room.",
    "B": "You need to fill out a request form.",
    "C": "Speak with Karen in the procurement department."
  },
  "answer": "C",
  "explanation_zh": "問題是詢問應該聯繫誰來訂購辦公用品。選項C提到應該聯繫採購部門的Karen，是正確的答案。選項A雖然提到office supplies這個詞，但只說明了這些用品的位置，並未回答應聯繫誰。選項B提到填寫申請表，與詢問聯絡人無關。",
  "difficulty": "A2",
  "vocabulary": [
    "contact",
    "ordering",
    "supplies"
  ],
  "id": "p2-gen-103",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Who should I contact about ordering more office supplies?\n(A) The office supplies are in the storage room.\n(B) You need to fill out a request form.\n(C) Speak with Karen in the procurement department."
},
  {
  "question": "Why did the shipment get delayed?",
  "choices": {
    "A": "There was a problem with the customs paperwork.",
    "B": "The shipment contains electronics.",
    "C": "It was delivered yesterday."
  },
  "answer": "A",
  "explanation_zh": "問題問的是\"為什麼貨物延遲？\"，正確答案是A，因為提到海關文件問題是造成延遲的原因。選項B提到\"shipment\"，但只是描述貨物的內容，並未解釋延遲原因。選項C提到昨天已送達，但未回答為何延遲的問題。",
  "difficulty": "B1",
  "vocabulary": [
    "shipment",
    "delayed",
    "customs",
    "paperwork",
    "delivered"
  ],
  "id": "p2-gen-104",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Why did the shipment get delayed?\n(A) There was a problem with the customs paperwork.\n(B) The shipment contains electronics.\n(C) It was delivered yesterday."
},
  {
  "question": "What type of printer paper are we using for the new office brochures?",
  "choices": {
    "A": "The brochures will be printed next month.",
    "B": "It's the glossy type for better image quality.",
    "C": "The brochures are in the marketing department."
  },
  "answer": "B",
  "explanation_zh": "問題是詢問我們為新辦公室手冊使用哪種類型的打印紙。選項B提到使用的是光面類型，以獲得更好的圖像質量，直接回答了問題。選項A提到手冊會在下個月印刷，但沒有提到打印紙的類型，因此不正確。選項C提到手冊在市場部，雖然提到手冊（brochures），但這不是問題詢問的打印紙類型，所以仍然不正確。",
  "difficulty": "B1",
  "vocabulary": [
    "printer",
    "brochures",
    "glossy"
  ],
  "id": "p2-gen-105",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: What type of printer paper are we using for the new office brochures?\n(A) The brochures will be printed next month.\n(B) It's the glossy type for better image quality.\n(C) The brochures are in the marketing department."
},
  {
  "question": "Did we order enough brochures for the upcoming marketing event?",
  "choices": {
    "A": "The event is scheduled for next Friday.",
    "B": "Yes, the brochures are printed.",
    "C": "I confirmed they were printed and shipped already."
  },
  "answer": "C",
  "explanation_zh": "問題問的是是否訂購了足夠的宣傳冊。選項A提到活動時間，與訂購宣傳冊無關。選項B提到宣傳冊已經印刷，但未確認數量是否足夠。選項C確認宣傳冊已經印刷並發貨，因此是唯一正確的答案。",
  "difficulty": "B1",
  "vocabulary": [
    "brochures",
    "marketing",
    "event"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-106",
  "audioScript": "Q: Did we order enough brochures for the upcoming marketing event?\n(A) The event is scheduled for next Friday.\n(B) Yes, the brochures are printed.\n(C) I confirmed they were printed and shipped already."
},
  {
  "question": "You ordered new office chairs last week, didn't you?",
  "choices": {
    "A": "Yes, they should be delivered tomorrow.",
    "B": "I thought the chairs were quite comfortable.",
    "C": "The order was placed for the supplies."
  },
  "answer": "A",
  "explanation_zh": "問題詢問的是上週是否訂購了新的辦公椅子，選項A回應了訂購並指出預計的交貨時間。選項B雖然提到“chairs”這個詞，但只是在陳述椅子的舒適度，沒有回答訂購的問題。選項C提到了“order”這個詞，但指的是訂購用品，而非回應訂購椅子的確認。",
  "difficulty": "A2",
  "vocabulary": [
    "ordered",
    "office chairs",
    "delivered",
    "supplies"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-107",
  "audioScript": "Q: You ordered new office chairs last week, didn't you?\n(A) Yes, they should be delivered tomorrow.\n(B) I thought the chairs were quite comfortable.\n(C) The order was placed for the supplies."
},
  {
  "question": "Should we order more toner cartridges or continue using the ones we have?",
  "choices": {
    "A": "I haven't checked the printer today.",
    "B": "Let's order more toner cartridges.",
    "C": "The toner cartridges arrived last week."
  },
  "answer": "B",
  "explanation_zh": "問題詢問是否應該訂購更多的碳粉匣或繼續使用現有的。選項A說自己還沒檢查打印機，不回答是否訂購。選項C提到上週到貨的碳粉匣，但問題是在於要不要訂購而非是否已經到貨。碳粉匣（toner cartridges）這個詞在C選項中使用，但C選項並未回答問題。",
  "difficulty": "A2",
  "vocabulary": [
    "order",
    "toner cartridges",
    "continue"
  ],
  "id": "p2-gen-108",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Should we order more toner cartridges or continue using the ones we have?\n(A) I haven't checked the printer today.\n(B) Let's order more toner cartridges.\n(C) The toner cartridges arrived last week."
},
  {
  "question": "Our IT equipment inventory is running low.",
  "choices": {
    "A": "I can find out who ordered it.",
    "B": "Yes, I saw the equipment last week.",
    "C": "I'll place an order for more laptops today."
  },
  "answer": "C",
  "explanation_zh": "此處的關鍵詞是“equipment”，但選項B雖然提到了“equipment”，卻未能解決問題，因為問題焦點在於庫存不足，而不是看到設備。選項C提供了具體的解決方案。",
  "difficulty": "B1",
  "vocabulary": [
    "inventory",
    "running low",
    "order",
    "equipment",
    "laptops"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-109",
  "audioScript": "Q: Our IT equipment inventory is running low.\n(A) I can find out who ordered it.\n(B) Yes, I saw the equipment last week.\n(C) I'll place an order for more laptops today."
},
  {
  "question": "Could you tell me where the new office supplies are stored?",
  "choices": {
    "A": "They're in the storage room next to the kitchen.",
    "B": "We ordered office supplies last week.",
    "C": "Yes, the office is on the third floor."
  },
  "answer": "A",
  "explanation_zh": "問題詢問新辦公用品存放的地方。選項A指出它們在廚房旁邊的儲藏室，正確回答了問題。選項B雖提到\"office supplies\"（辦公用品），但只提到訂購時間，並未回答存放位置。選項C則回答了辦公室的位置，與問題無關。",
  "difficulty": "A2",
  "vocabulary": [
    "office supplies",
    "storage room",
    "kitchen"
  ],
  "id": "p2-gen-110",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Could you tell me where the new office supplies are stored?\n(A) They're in the storage room next to the kitchen.\n(B) We ordered office supplies last week.\n(C) Yes, the office is on the third floor."
},
  {
  "question": "When will the new office chairs be delivered?",
  "choices": {
    "A": "We ordered the chairs last week.",
    "B": "They should arrive by Thursday.",
    "C": "The chairs are very comfortable."
  },
  "answer": "B",
  "explanation_zh": "問題詢問新辦公椅的交貨時間。選項B提供了具體時間「週四」，正確回答問題。選項A重複「chairs」這個詞，但只是說明下訂單時間，無法回答交貨時間的問題。選項C描述椅子的舒適度，與問題無關。",
  "difficulty": "B1",
  "vocabulary": [
    "deliver",
    "office chairs",
    "arrive"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-111",
  "audioScript": "Q: When will the new office chairs be delivered?\n(A) We ordered the chairs last week.\n(B) They should arrive by Thursday.\n(C) The chairs are very comfortable."
},
  {
  "question": "Where can I find the office supply closet?",
  "choices": {
    "A": "It should arrive by next week.",
    "B": "The office supply order has been placed.",
    "C": "It's next to the conference room."
  },
  "answer": "C",
  "explanation_zh": "問題詢問辦公室物品櫃的位置。選項A提到一個預估到達時間，並未回答位置問題。選項B提到辦公室用品訂單，重複了“supply”這個字，但無法回答位置問題。選項C提供了具體位置，才是正確答案。",
  "difficulty": "A2",
  "vocabulary": [
    "office",
    "supply",
    "closet"
  ],
  "id": "p2-gen-112",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Where can I find the office supply closet?\n(A) It should arrive by next week.\n(B) The office supply order has been placed.\n(C) It's next to the conference room."
},
  {
  "question": "Who should I contact to get the broken printer fixed?",
  "choices": {
    "A": "You should speak with the IT department.",
    "B": "The printer is next to the copier.",
    "C": "I think it was fixed last month."
  },
  "answer": "A",
  "explanation_zh": "問題詢問誰能修理壞掉的印表機。選項A提到IT部門，合乎邏輯。選項B提到印表機的位置，但並未答覆誰負責修理。選項C說印表機上個月修好了，並沒有回答誰應被聯絡。重複的單詞是“printer”，但選項B未回答問題，故此為錯誤解答。",
  "difficulty": "B1",
  "vocabulary": [
    "contact",
    "fixed",
    "department"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-113",
  "audioScript": "Q: Who should I contact to get the broken printer fixed?\n(A) You should speak with the IT department.\n(B) The printer is next to the copier.\n(C) I think it was fixed last month."
},
  {
  "question": "Why did the shipment get delayed?",
  "choices": {
    "A": "The shipment includes electronics.",
    "B": "There was a problem with customs clearance.",
    "C": "We sent the shipment last week."
  },
  "answer": "B",
  "explanation_zh": "問題詢問貨物延遲的原因。選項 B 提供了明確的原因，表示海關清關出現問題。選項 A 提到貨物中包含電子產品，但這不是貨物延遲的原因。選項 C 提供了與時間有關的資訊，但並未解釋延遲的原因。選項 A 中的 'shipment' 是一個陷阱詞，因為雖然提到了貨物，但未能回答延遲的原因。",
  "difficulty": "B1",
  "vocabulary": [
    "shipment",
    "delayed",
    "customs"
  ],
  "id": "p2-gen-114",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Why did the shipment get delayed?\n(A) The shipment includes electronics.\n(B) There was a problem with customs clearance.\n(C) We sent the shipment last week."
},
  {
  "question": "What kind of paper do we need to order for the printers?",
  "choices": {
    "A": "We should check the printer settings first.",
    "B": "The new paper will be delivered tomorrow.",
    "C": "We need more A4 paper."
  },
  "answer": "C",
  "explanation_zh": "問題是詢問需要訂購哪種紙張。選項C提供了具體的紙張類型'A4 paper'，回答了問題。選項A提到檢查印表機設定，並未回答需要訂購哪種紙張。選項B提到了紙張的交付時間，即便包含了'paper'這個字，但並未說明需要訂購的紙張類型，因此不符合問題要求。",
  "difficulty": "A2",
  "vocabulary": [
    "order",
    "printers",
    "paper"
  ],
  "id": "p2-gen-115",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: What kind of paper do we need to order for the printers?\n(A) We should check the printer settings first.\n(B) The new paper will be delivered tomorrow.\n(C) We need more A4 paper."
},
  {
  "question": "Did the new office chairs arrive yet?",
  "choices": {
    "A": "Yes, they were delivered this morning.",
    "B": "The chairs are adjustable.",
    "C": "They should arrive by the end of the month."
  },
  "answer": "A",
  "explanation_zh": "問題是詢問新辦公椅是否已經到達，選項A表示椅子今天早上已經送到，是正確的回答。選項B提到椅子是可調整的，使用了共同的詞“chairs”，但沒有回答椅子是否到達的問題。選項C則回答了不同的問題類型，並非直接回答是否已經到達。",
  "difficulty": "A2",
  "vocabulary": [
    "arrive",
    "delivered",
    "adjustable"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-116",
  "audioScript": "Q: Did the new office chairs arrive yet?\n(A) Yes, they were delivered this morning.\n(B) The chairs are adjustable.\n(C) They should arrive by the end of the month."
},
  {
  "question": "You ordered new office supplies, didn't you?",
  "choices": {
    "A": "The supplies are in the storage room.",
    "B": "Yes, they should be delivered by tomorrow.",
    "C": "I called the supplier last week."
  },
  "answer": "B",
  "explanation_zh": "問題問的是對新辦公用品的訂購確認，B選項直接回應了確認並提供了相關細節。而A選項提到'supplies'這個關鍵詞，但僅告知位置，並未回答訂購的確認。C選項對應的是其他問題類型，與確認無關。",
  "difficulty": "A2",
  "vocabulary": [
    "ordered",
    "supplies",
    "delivered"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-117",
  "audioScript": "Q: You ordered new office supplies, didn't you?\n(A) The supplies are in the storage room.\n(B) Yes, they should be delivered by tomorrow.\n(C) I called the supplier last week."
},
  {
  "question": "Do you want the new computers delivered today or tomorrow?",
  "choices": {
    "A": "The computers are in the IT department.",
    "B": "Yes, they were quite expensive.",
    "C": "Please have them delivered tomorrow."
  },
  "answer": "C",
  "explanation_zh": "問題問的是希望新電腦今天還是明天送到，選項C是唯一選擇了一個時間（明天）的答案。選項A提到電腦但沒有回答時間問題；選項B完全不涉及時間。選項A中的“computers”是重複用詞陷阱，問題問時間，但A只是提到電腦的所在位置，沒有回答問題。",
  "difficulty": "B1",
  "vocabulary": [
    "delivered",
    "computers",
    "tomorrow"
  ],
  "id": "p2-gen-118",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Do you want the new computers delivered today or tomorrow?\n(A) The computers are in the IT department.\n(B) Yes, they were quite expensive.\n(C) Please have them delivered tomorrow."
},
  {
  "question": "The printer is out of ink again.",
  "choices": {
    "A": "I'll order new cartridges right away.",
    "B": "The printer has been there for years.",
    "C": "It should arrive by tomorrow."
  },
  "answer": "A",
  "explanation_zh": "這裡的問題是打印機的墨水又用完了，所以最自然的反應是趕快去訂購新的墨盒。選項 B 提到“printer（打印機）”這個詞，但它只是指出打印機的存在時間，無法回應問題。選項 C 則是在回答有關到貨時間的問題，與墨水用完無關。",
  "difficulty": "B1",
  "vocabulary": [
    "printer",
    "ink",
    "cartridges"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-119",
  "audioScript": "Q: The printer is out of ink again.\n(A) I'll order new cartridges right away.\n(B) The printer has been there for years.\n(C) It should arrive by tomorrow."
},
  {
  "question": "Could you tell me where the office supplies are stored?",
  "choices": {
    "A": "Yes, I just ordered more supplies.",
    "B": "In the cabinet next to the printer.",
    "C": "They're for the marketing team."
  },
  "answer": "B",
  "explanation_zh": "問題詢問的是辦公用品存放的地點。選項B提供了具體的位置信息。在選項A中，\"supplies\"這個詞重複出現，但該回答只是說明訂購的情況，並未提供地點資訊。選項C則回答了另一個問題，並未涉及地點。",
  "difficulty": "A2",
  "vocabulary": [
    "office supplies",
    "stored",
    "cabinet"
  ],
  "id": "p2-gen-120",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Could you tell me where the office supplies are stored?\n(A) Yes, I just ordered more supplies.\n(B) In the cabinet next to the printer.\n(C) They're for the marketing team."
},
  {
  "question": "When will the new office chairs be delivered?",
  "choices": {
    "A": "We ordered thirty chairs.",
    "B": "The chairs are very comfortable.",
    "C": "They should arrive next Tuesday."
  },
  "answer": "C",
  "explanation_zh": "問題詢問的是交付椅子的具體時間。選項C提供了具體時間“下週二”，因此是正確答案。選項A重複了“chairs”這個詞，但只是提到訂購數量，沒有回答交付時間。選項B提到椅子的舒適性，完全偏離問題焦點。",
  "difficulty": "A2",
  "vocabulary": [
    "chairs",
    "delivered",
    "arrive"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-121",
  "audioScript": "Q: When will the new office chairs be delivered?\n(A) We ordered thirty chairs.\n(B) The chairs are very comfortable.\n(C) They should arrive next Tuesday."
},
  {
  "question": "Where can I find the new office supplies catalog?",
  "choices": {
    "A": "It's on the supply manager's desk.",
    "B": "The office supplies are running low.",
    "C": "You can order it online."
  },
  "answer": "A",
  "explanation_zh": "問題詢問新辦公用品目錄的位置。選項A提到目錄在供應經理的桌子上，是正確的。選項B雖然提到\"office supplies\"（辦公用品），但並未回答目錄的位置，僅陳述一個事實，故不正確。選項C回答了一個不同的問題，並未提供實際位置，因此不合適。",
  "difficulty": "A2",
  "vocabulary": [
    "catalog",
    "supply",
    "manager"
  ],
  "id": "p2-gen-122",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Where can I find the new office supplies catalog?\n(A) It's on the supply manager's desk.\n(B) The office supplies are running low.\n(C) You can order it online."
},
  {
  "question": "Who is responsible for ordering office supplies?",
  "choices": {
    "A": "They're delivered every Tuesday.",
    "B": "That would be Emily from procurement.",
    "C": "The office supplies are in the storage room."
  },
  "answer": "B",
  "explanation_zh": "問題詢問誰負責訂購辦公用品。選項B回答了這個問題，指出是採購部門的Emily負責。選項A提到了交貨時間，但並未回答誰負責訂購。選項C提到了‘office supplies’（辦公用品），但只描述了物品的存放地點，並未回答誰負責。",
  "difficulty": "B1",
  "vocabulary": [
    "responsible",
    "ordering",
    "procurement"
  ],
  "id": "p2-gen-123",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Who is responsible for ordering office supplies?\n(A) They're delivered every Tuesday.\n(B) That would be Emily from procurement.\n(C) The office supplies are in the storage room."
},
  {
  "question": "Why did the printer stop working?",
  "choices": {
    "A": "The report isn't finished yet.",
    "B": "Because it was delivered yesterday.",
    "C": "It ran out of paper."
  },
  "answer": "C",
  "explanation_zh": "問題詢問打印機為什麼停止工作。選項A提到“報告”但並沒有回答為什麼打印機停止工作。選項B提到“交付”，但這與打印機停止工作的原因無關。正確答案是C，它解釋了打印機沒有紙張。",
  "difficulty": "A2",
  "vocabulary": [
    "printer",
    "working",
    "stop",
    "paper",
    "delivered"
  ],
  "id": "p2-gen-124",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Why did the printer stop working?\n(A) The report isn't finished yet.\n(B) Because it was delivered yesterday.\n(C) It ran out of paper."
},
  {
  "question": "What kind of office supplies do we need to order?",
  "choices": {
    "A": "We need more printer paper and pens.",
    "B": "The office is on the second floor.",
    "C": "The supplies were delivered yesterday."
  },
  "answer": "A",
  "explanation_zh": "問題問的是需要訂購哪種辦公用品。選項A回答了具體需要的用品：紙和筆。選項B提到“office”這個詞，但回答的是辦公室的位置，與問題無關。選項C提到“supplies”，但回答了什麼時候送達的，與需要訂購的用品無關。",
  "difficulty": "A2",
  "vocabulary": [
    "office supplies",
    "order",
    "printer paper",
    "pens"
  ],
  "id": "p2-gen-125",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: What kind of office supplies do we need to order?\n(A) We need more printer paper and pens.\n(B) The office is on the second floor.\n(C) The supplies were delivered yesterday."
},
  {
  "question": "Did the new office supplies arrive yet?",
  "choices": {
    "A": "The office is on the third floor.",
    "B": "They were delivered this morning.",
    "C": "We need more paper clips."
  },
  "answer": "B",
  "explanation_zh": "問題是詢問新的辦公用品是否已經到了。選項B提到「它們今天早上送到了」，直接回答了問題。選項A提到「辦公室在三樓」，不相關。選項C提到「我們需要更多的迴紋針」，雖然提到了辦公用品（supplies），但沒有回答問題。選項C是因為提到supplies這個詞而容易誤解，但它沒有說明是否到貨。",
  "difficulty": "A2",
  "vocabulary": [
    "office supplies",
    "delivered",
    "paper clips"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-126",
  "audioScript": "Q: Did the new office supplies arrive yet?\n(A) The office is on the third floor.\n(B) They were delivered this morning.\n(C) We need more paper clips."
},
  {
  "question": "You ordered more toner for the printer, didn't you?",
  "choices": {
    "A": "The printer is in the other room.",
    "B": "I think we need more paper.",
    "C": "Yes, it should arrive tomorrow."
  },
  "answer": "C",
  "explanation_zh": "此題的問題是詢問對方是否訂購了更多的印表機碳粉匣，答案 C 回應了此確認問題，表示碳粉匣應該會在明天到達。選項 A 提到印表機的位置，沒有回答訂購的問題。選項 B 提到紙張的需求，與碳粉匣無關。選項 A 的陷阱字是 'printer'，但它沒有回答到訂購的確認問題。",
  "difficulty": "B1",
  "vocabulary": [
    "toner",
    "printer",
    "order"
  ],
  "id": "p2-gen-127",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: You ordered more toner for the printer, didn't you?\n(A) The printer is in the other room.\n(B) I think we need more paper.\n(C) Yes, it should arrive tomorrow."
},
  {
  "question": "Should we order more printer paper or toner cartridges?",
  "choices": {
    "A": "We definitely need more printer paper.",
    "B": "The printer is out of order right now.",
    "C": "We should schedule a meeting about it."
  },
  "answer": "A",
  "explanation_zh": "問題詢問應該訂購更多的打印紙還是碳粉匣。選項A直接回答需要更多的打印紙，符合問題要求。選項B提到打印機，但並未回答有關訂購物品的問題，因此不相關。選項C提到安排會議，與問題無關。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "printer paper",
    "toner cartridges"
  ],
  "id": "p2-gen-128",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Should we order more printer paper or toner cartridges?\n(A) We definitely need more printer paper.\n(B) The printer is out of order right now.\n(C) We should schedule a meeting about it."
},
  {
  "question": "The new printer in the copy room is out of toner, so we'll need to order more.",
  "choices": {
    "A": "I saw it in the copy room yesterday.",
    "B": "I'll contact the supplier right away.",
    "C": "The toner is usually delivered by noon."
  },
  "answer": "B",
  "explanation_zh": "問題提到新印表機的碳粉不足，B選項\"I'll contact the supplier right away.\"意味著馬上聯繫供應商訂購，符合邏輯。A選項提到\"copy room\"（影印室），但只是描述觀察，沒有提供解決問題的方法。C選項提到\"toner\"（碳粉），但只是描述交貨時間點，不是回應訂購需求。",
  "difficulty": "B1",
  "vocabulary": [
    "printer",
    "toner",
    "supplier",
    "order",
    "deliver"
  ],
  "id": "p2-gen-129",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: The new printer in the copy room is out of toner, so we'll need to order more.\n(A) I saw it in the copy room yesterday.\n(B) I'll contact the supplier right away.\n(C) The toner is usually delivered by noon."
},
  {
  "question": "Could you tell me when the IT equipment will be delivered?",
  "choices": {
    "A": "We ordered new monitors.",
    "B": "I think it was shipped yesterday.",
    "C": "It should arrive by Friday afternoon."
  },
  "answer": "C",
  "explanation_zh": "問題詢問IT設備的交貨時間，選項C提供具體的到達時間「應該在星期五下午到達」，因此是正確答案。選項A重複了關鍵字「equipment」，但回答了設備內容而非時間，無法解答問題。選項B則提供了運送時間，而非交貨時間，不符合問題需求。",
  "difficulty": "B1",
  "vocabulary": [
    "delivered",
    "equipment",
    "shipped"
  ],
  "id": "p2-gen-130",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Could you tell me when the IT equipment will be delivered?\n(A) We ordered new monitors.\n(B) I think it was shipped yesterday.\n(C) It should arrive by Friday afternoon."
},
  {
  "question": "When will the new office chairs be delivered?",
  "choices": {
    "A": "They'll arrive on Thursday.",
    "B": "The chairs are very comfortable.",
    "C": "We ordered them last week."
  },
  "answer": "A",
  "explanation_zh": "問題是詢問新辦公椅的到貨時間，選擇B雖然提到“椅子（chairs）”，但並未回答時間問題；選擇C則回答了下訂的時間，而非到貨時間。正確答案是A：它們會在星期四到。",
  "difficulty": "A2",
  "vocabulary": [
    "delivered",
    "office chairs",
    "arrive"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-131",
  "audioScript": "Q: When will the new office chairs be delivered?\n(A) They'll arrive on Thursday.\n(B) The chairs are very comfortable.\n(C) We ordered them last week."
},
  {
  "question": "Where is the new shipment of office supplies stored?",
  "choices": {
    "A": "The shipment arrived yesterday.",
    "B": "In the storage room on the third floor.",
    "C": "We need more supplies soon."
  },
  "answer": "B",
  "explanation_zh": "問題詢問新辦公用品的存放地點。選項B清楚地回答了問題：在三樓的儲藏室。選項A是陷阱選項，重複了“shipment”這個詞，但是只說到了貨到達的時間，並沒有提到存放地點。選項C則是提到需要更多物品，但並未提及存放位置。",
  "difficulty": "A2",
  "vocabulary": [
    "shipment",
    "stored",
    "storage"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-132",
  "audioScript": "Q: Where is the new shipment of office supplies stored?\n(A) The shipment arrived yesterday.\n(B) In the storage room on the third floor.\n(C) We need more supplies soon."
},
  {
  "question": "Who should I contact to order new office supplies?",
  "choices": {
    "A": "The supplies were delivered last week.",
    "B": "You can find them in the supply room.",
    "C": "You should reach out to Carla in the procurement department."
  },
  "answer": "C",
  "explanation_zh": "問題問的是誰負責訂購辦公用品，而不是辦公用品是否已經交付或存放在哪裡。選項A重複了“supplies”這個詞，但它沒有回答應聯繫誰。選項B則告知辦公用品的位置，但未回答應聯繫的對象。只有選項C正確回答了應聯繫的部門和人。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "contact",
    "supplies"
  ],
  "id": "p2-gen-133",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Who should I contact to order new office supplies?\n(A) The supplies were delivered last week.\n(B) You can find them in the supply room.\n(C) You should reach out to Carla in the procurement department."
},
  {
  "question": "Why did the company order new IT equipment?",
  "choices": {
    "A": "To upgrade our outdated systems.",
    "B": "The equipment is in the supply room.",
    "C": "Yes, the delivery was on time."
  },
  "answer": "A",
  "explanation_zh": "問題詢問公司為何訂購新IT設備。選項A「為了升級過時的系統」提供了原因。選項B雖然提到「設備」，但並未解釋原因。選項C回答了錯誤的問題，與訂購原因無關。",
  "difficulty": "B1",
  "vocabulary": [
    "equipment",
    "order",
    "upgrade",
    "delivery",
    "outdated"
  ],
  "id": "p2-gen-134",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Why did the company order new IT equipment?\n(A) To upgrade our outdated systems.\n(B) The equipment is in the supply room.\n(C) Yes, the delivery was on time."
},
  {
  "question": "What size envelopes do we need for the marketing event invitations?",
  "choices": {
    "A": "The marketing event is next Thursday.",
    "B": "We need the A5 size envelopes.",
    "C": "We have plenty of envelopes in the storage."
  },
  "answer": "B",
  "explanation_zh": "這個問題詢問的是需要什麼尺寸的信封來裝行銷活動的邀請函。選項 B 提供了具體的尺寸 A5，直接回答了問題。選項 A 雖然提到行銷活動，但回答的是活動的日期，並未涉及信封的尺寸。選項 C 提到有很多信封，但也沒有給出所需的具體尺寸，因此無法回答問題。",
  "difficulty": "B1",
  "vocabulary": [
    "envelopes",
    "marketing",
    "size"
  ],
  "id": "p2-gen-135",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: What size envelopes do we need for the marketing event invitations?\n(A) The marketing event is next Thursday.\n(B) We need the A5 size envelopes.\n(C) We have plenty of envelopes in the storage."
},
  {
  "question": "Did you order more office supplies for the team yet?",
  "choices": {
    "A": "The supplies arrived yesterday.",
    "B": "I think the order was processed last week.",
    "C": "Yes, I've just placed the order."
  },
  "answer": "C",
  "explanation_zh": "問題詢問是否已經訂購更多的辦公用品。選項A提到“supplies”並說明用品已經到達，這並沒有回答訂購的問題，因此無法回答提問。選項B提到訂單可能在上週處理，但這不是最直接肯定的回答。選項C表示肯定，證實訂購已經完成，因此是正確答案。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "supplies",
    "team"
  ],
  "id": "p2-gen-136",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Did you order more office supplies for the team yet?\n(A) The supplies arrived yesterday.\n(B) I think the order was processed last week.\n(C) Yes, I've just placed the order."
},
  {
  "question": "You ordered the new office chairs, didn't you?",
  "choices": {
    "A": "Yes, they should arrive by next Tuesday.",
    "B": "The chairs are very comfortable.",
    "C": "I think we have enough pens for now."
  },
  "answer": "A",
  "explanation_zh": "題目詢問是否訂購了新的辦公椅，選項A表示確認椅子已訂購並指出到貨時間。選項B提到椅子很舒適，但未確認訂購，故無法回答此問題。選項C提到筆，完全不相關。",
  "difficulty": "A2",
  "vocabulary": [
    "ordered",
    "chairs",
    "arrive"
  ],
  "id": "p2-gen-137",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: You ordered the new office chairs, didn't you?\n(A) Yes, they should arrive by next Tuesday.\n(B) The chairs are very comfortable.\n(C) I think we have enough pens for now."
},
  {
  "question": "Would you like to order more printer paper or ink cartridges for the office?",
  "choices": {
    "A": "I think the printer needs to be replaced.",
    "B": "We should get more ink cartridges.",
    "C": "The delivery is scheduled for tomorrow."
  },
  "answer": "B",
  "explanation_zh": "問題是詢問是否要訂購更多的印表機紙或墨水匣，選項B（我們應該多訂購一些墨水匣）直接回答了問題。而選項A雖然提到印表機，但回答的是替換印表機，不是訂購物品的選擇。選項C提到了運送，但與訂購問題無關。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "printer",
    "cartridges"
  ],
  "id": "p2-gen-138",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Would you like to order more printer paper or ink cartridges for the office?\n(A) I think the printer needs to be replaced.\n(B) We should get more ink cartridges.\n(C) The delivery is scheduled for tomorrow."
},
  {
  "question": "The printer in the main office is out of ink.",
  "choices": {
    "A": "The main office closes at 5 PM.",
    "B": "We just ordered more ink yesterday.",
    "C": "I'll replace the cartridge right away."
  },
  "answer": "C",
  "explanation_zh": "敘述提到“printer（印表機）”沒墨水了，正確反應是C選項“我會馬上更換墨盒”。選項A提到“main office（主辦公室）”，但與印表機無關，不是合理的回應。選項B雖然提到“ink（墨水）”，但只是說昨天訂購了，並未解決當下的問題。",
  "difficulty": "B1",
  "vocabulary": [
    "printer",
    "ink",
    "cartridge",
    "main office"
  ],
  "id": "p2-gen-139",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: The printer in the main office is out of ink.\n(A) The main office closes at 5 PM.\n(B) We just ordered more ink yesterday.\n(C) I'll replace the cartridge right away."
},
  {
  "question": "Could you tell me where the new shipment is being stored?",
  "choices": {
    "A": "It's in warehouse 3.",
    "B": "The shipment arrived yesterday.",
    "C": "I think John is handling it."
  },
  "answer": "A",
  "explanation_zh": "問題問的是新貨物儲存的地點。選項A表示在3號倉庫，是唯一合理的回答。選項B提到\"shipment\"但只說明貨物何時到，未回答地點問題。選項C說可能是John負責，回答了不同的問題。",
  "difficulty": "B1",
  "vocabulary": [
    "shipment",
    "stored",
    "warehouse"
  ],
  "id": "p2-gen-140",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Could you tell me where the new shipment is being stored?\n(A) It's in warehouse 3.\n(B) The shipment arrived yesterday.\n(C) I think John is handling it."
},
  {
  "question": "When will the new IT equipment arrive?",
  "choices": {
    "A": "The equipment is in good condition.",
    "B": "It should be delivered on Friday.",
    "C": "Yes, we need new equipment."
  },
  "answer": "B",
  "explanation_zh": "問題詢問IT設備何時到達，選項B是唯一提供具體時間的回應。選項A提到“equipment”但未提供到達時間，不符合問題要求。選項C答非所問，只是肯定了需求，未回答問題。",
  "difficulty": "B1",
  "vocabulary": [
    "equipment",
    "deliver",
    "arrive"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-141",
  "audioScript": "Q: When will the new IT equipment arrive?\n(A) The equipment is in good condition.\n(B) It should be delivered on Friday.\n(C) Yes, we need new equipment."
},
  {
  "question": "Where should we store the extra office chairs?",
  "choices": {
    "A": "Those chairs are very comfortable.",
    "B": "They were ordered last week.",
    "C": "In the storage room on the second floor."
  },
  "answer": "C",
  "explanation_zh": "問題詢問我們應該將多餘的辦公椅存放在哪裡。選項A提到椅子的舒適度，但沒有回答存放地點；選項B提到椅子的訂購時間，同樣沒有回答問題。只有選項C正確回答了存放地點：二樓的儲藏室。",
  "difficulty": "A2",
  "vocabulary": [
    "store",
    "extra",
    "chairs",
    "storage room",
    "floor"
  ],
  "id": "p2-gen-142",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Where should we store the extra office chairs?\n(A) Those chairs are very comfortable.\n(B) They were ordered last week.\n(C) In the storage room on the second floor."
},
  {
  "question": "Who should I contact about ordering new office supplies?",
  "choices": {
    "A": "You should email Karen in procurement.",
    "B": "The supplies are in the storage room.",
    "C": "Yes, we need more paper too."
  },
  "answer": "A",
  "explanation_zh": "問題詢問應該聯繫誰來訂購新的辦公用品，正確答案是 A，因為 Karen 是負責採購的人。選項 B 選擇了錯誤的重複單詞 \"supplies\"，但不能回答需要聯繫誰。選項 C 提到紙張，但回答了不同的問題類型，並未提供聯繫人。",
  "difficulty": "A2",
  "vocabulary": [
    "contact",
    "ordering",
    "supplies"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-143",
  "audioScript": "Q: Who should I contact about ordering new office supplies?\n(A) You should email Karen in procurement.\n(B) The supplies are in the storage room.\n(C) Yes, we need more paper too."
},
  {
  "question": "Why did the office supply order get delayed?",
  "choices": {
    "A": "The supplies are on the desk.",
    "B": "The shipment was held up by customs.",
    "C": "We ordered extra pens."
  },
  "answer": "B",
  "explanation_zh": "正確答案是B，因為它解釋了訂單延遲的原因是因為海關的問題，而不是與辦公用品在桌上有關。選項A中的“supplies”雖然出現了同樣的詞，但它只是描述物品的位置，並未解釋延遲的原因。選項C則回答了不同的問題，與訂單延遲無關。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "delayed",
    "shipment",
    "customs",
    "supplies"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-144",
  "audioScript": "Q: Why did the office supply order get delayed?\n(A) The supplies are on the desk.\n(B) The shipment was held up by customs.\n(C) We ordered extra pens."
},
  {
  "question": "What type of printer paper should we order for the office?",
  "choices": {
    "A": "We'll need to check the current paper supply first.",
    "B": "The printer is in the copy room.",
    "C": "We should get the A4 size with a high brightness rating."
  },
  "answer": "C",
  "explanation_zh": "問題詢問應該訂購何種類型的印表紙，選項C提供了明確的答案：A4尺寸且具有高亮度等級的紙張。選項A提到需要先檢查目前的紙張供應，但並沒有回答應該訂購哪種類型的紙。選項B提到印表機在影印室，重複了印表機這個詞，但與問題無關。",
  "difficulty": "B1",
  "vocabulary": [
    "printer",
    "paper",
    "order",
    "supply",
    "brightness"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-145",
  "audioScript": "Q: What type of printer paper should we order for the office?\n(A) We'll need to check the current paper supply first.\n(B) The printer is in the copy room.\n(C) We should get the A4 size with a high brightness rating."
},
  {
  "question": "Did we order enough printer cartridges for the office?",
  "choices": {
    "A": "Yes, they should arrive by Friday.",
    "B": "The office needs more printers.",
    "C": "We ordered last week."
  },
  "answer": "A",
  "explanation_zh": "選項A「是的，應該在週五到達」直接回答了問題，表示訂購的打印機墨盒數量是足夠的。選項B提到「更多打印機」，但問題是關於墨盒的數量，不能回答問題。選項C「我們上週訂購了」只是陳述過去的動作，並沒有具體回答是否夠用。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "printer",
    "cartridges"
  ],
  "id": "p2-gen-146",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: Did we order enough printer cartridges for the office?\n(A) Yes, they should arrive by Friday.\n(B) The office needs more printers.\n(C) We ordered last week."
},
  {
  "question": "You ordered more printer paper last week, didn't you?",
  "choices": {
    "A": "The printer is in the corner.",
    "B": "Yes, it should arrive by Friday.",
    "C": "I ordered new ink cartridges."
  },
  "answer": "B",
  "explanation_zh": "問題問的是上週是否訂購了更多的印表機紙，回答 B 是唯一確認這一點的答案。選項 A 提到印表機的位置，但未回答是否訂購印表機紙。選項 C 提到訂購墨水匣，重複了關鍵詞 'order'，但未回答問題中關於印表機紙的確認。",
  "difficulty": "B1",
  "vocabulary": [
    "printer",
    "order",
    "paper",
    "arrive",
    "week"
  ],
  "id": "p2-gen-147",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: You ordered more printer paper last week, didn't you?\n(A) The printer is in the corner.\n(B) Yes, it should arrive by Friday.\n(C) I ordered new ink cartridges."
},
  {
  "question": "Should we order more printer paper or toner for the office?",
  "choices": {
    "A": "The printer is working fine.",
    "B": "Both supplies are essential.",
    "C": "We need more toner."
  },
  "answer": "C",
  "explanation_zh": "問題是詢問應該訂購哪一種辦公室用品，A選項提到的『printer（印表機）』不是問題中問的選項之一，且沒有回答是否需要紙張或碳粉。B選項回答了一個不同的問題類型，即兩個物品的必要性，而非選擇其一。只有C選項直接回答問題，指出需要更換碳粉。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "printer",
    "toner",
    "office",
    "supplies"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-148",
  "audioScript": "Q: Should we order more printer paper or toner for the office?\n(A) The printer is working fine.\n(B) Both supplies are essential.\n(C) We need more toner."
},
  {
  "question": "The printer in the office isn't working again.",
  "choices": {
    "A": "I'll call the technician right away.",
    "B": "Yes, it's a very old printer.",
    "C": "The office is on the second floor."
  },
  "answer": "A",
  "explanation_zh": "正確答案是A。這個句子陳述了辦公室的印表機再次故障，因此需要採取行動。選項A的回應表明會立即聯繫技術人員來修理印表機。選項B雖然提到印表機也用了相同的單字printer，但只是描述印表機的舊而沒有提供解決方案，因此不是合適的回應。選項C與問題無關，談論辦公室的位置。",
  "difficulty": "A2",
  "vocabulary": [
    "printer",
    "technician",
    "office"
  ],
  "id": "p2-gen-149",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "audioScript": "Q: The printer in the office isn't working again.\n(A) I'll call the technician right away.\n(B) Yes, it's a very old printer.\n(C) The office is on the second floor."
},
  {
  "question": "Could you tell me where the IT equipment is being stored?",
  "choices": {
    "A": "Yes, we need to upgrade it soon.",
    "B": "It's in the storage room on the third floor.",
    "C": "The equipment is in great condition."
  },
  "answer": "B",
  "explanation_zh": "問題詢問IT設備儲存的位置，B選項明確指出儲存位置在三樓的儲藏室，是唯一合理的回應。A選項提到需要升級設備，但沒有回答儲存位置。C選項提到設備狀況良好，重複使用了“equipment”這個詞，但沒有回答儲存位置，因此不正確。",
  "difficulty": "B1",
  "vocabulary": [
    "equipment",
    "stored",
    "storage",
    "third floor",
    "condition"
  ],
  "part": "Part 2",
  "skill_tag": "listening_response",
  "id": "p2-gen-150",
  "audioScript": "Q: Could you tell me where the IT equipment is being stored?\n(A) Yes, we need to upgrade it soon.\n(B) It's in the storage room on the third floor.\n(C) The equipment is in great condition."
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "A new shipping order",
    "B": "A delayed shipment",
    "C": "A price negotiation",
    "D": "A product return"
  },
  "answer": "B",
  "explanation_zh": "答案是 B。根據對話，女士提到 'the shipment we were expecting today is delayed'，這表明對話的主要話題是 'A delayed shipment'。其他選項如 A 'A new shipping order'、C 'A price negotiation' 和 D 'A product return' 都沒有在對話中提到。",
  "difficulty": "A2",
  "vocabulary": [
    "shipment",
    "delayed",
    "port"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-124",
  "part": "Part 3",
  "transcript": "W: I just received a notification that the shipment we were expecting today is delayed.\nM: That's unfortunate. Did they mention why it's delayed?\nW: Yes, apparently there's a problem at the port. They're saying the shipment will arrive three days later.\nM: So, it should be here by Friday then. Is there anything we can do in the meantime?\nW: I’ll contact our client to inform them of the delay.\nM: Good idea. Let me know if they need any additional updates.\nW: Will do. Hopefully, everything will be resolved by the end of the week.\nM: Let’s keep an eye on it and see if there are any further changes.",
  "question_order": 1
},
  {
  "question": "Why is the shipment delayed?",
  "choices": {
    "A": "Weather conditions",
    "B": "Customs issues",
    "C": "A problem at the port",
    "D": "Incorrect documentation"
  },
  "answer": "C",
  "explanation_zh": "答案是 C。女士提到 'apparently there's a problem at the port' 作為延誤的原因，因此選項 C 'A problem at the port' 是正確的。其他選項如 A 'Weather conditions'、B 'Customs issues' 和 D 'Incorrect documentation' 未提及。",
  "difficulty": "B1",
  "vocabulary": [
    "problem",
    "port",
    "delayed"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-125",
  "part": "Part 3",
  "transcript": "W: I just received a notification that the shipment we were expecting today is delayed.\nM: That's unfortunate. Did they mention why it's delayed?\nW: Yes, apparently there's a problem at the port. They're saying the shipment will arrive three days later.\nM: So, it should be here by Friday then. Is there anything we can do in the meantime?\nW: I’ll contact our client to inform them of the delay.\nM: Good idea. Let me know if they need any additional updates.\nW: Will do. Hopefully, everything will be resolved by the end of the week.\nM: Let’s keep an eye on it and see if there are any further changes.",
  "question_order": 2
},
  {
  "question": "What is the woman likely to do next?",
  "choices": {
    "A": "Cancel the shipment",
    "B": "Contact the shipping company",
    "C": "Request a refund",
    "D": "Inform the client"
  },
  "answer": "D",
  "explanation_zh": "答案是 D。女士說 'I’ll contact our client to inform them of the delay'，因此她接下來可能會通知客戶。選項 A 'Cancel the shipment'、B 'Contact the shipping company' 和 C 'Request a refund' 都不符合對話內容。",
  "difficulty": "B1",
  "vocabulary": [
    "contact",
    "client",
    "inform"
  ],
  "skill_tag": "listening_inference",
  "id": "p3-gen-126",
  "part": "Part 3",
  "transcript": "W: I just received a notification that the shipment we were expecting today is delayed.\nM: That's unfortunate. Did they mention why it's delayed?\nW: Yes, apparently there's a problem at the port. They're saying the shipment will arrive three days later.\nM: So, it should be here by Friday then. Is there anything we can do in the meantime?\nW: I’ll contact our client to inform them of the delay.\nM: Good idea. Let me know if they need any additional updates.\nW: Will do. Hopefully, everything will be resolved by the end of the week.\nM: Let’s keep an eye on it and see if there are any further changes.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Scheduling a presentation",
    "B": "Renting a projector",
    "C": "Repairing equipment",
    "D": "Ordering new equipment"
  },
  "answer": "C",
  "explanation_zh": "答案是 C。對話的重點在於 'the projector isn't working' 和請求 'call the repair service'，顯示主題是 'Repairing equipment'。選項 A 'Scheduling a presentation'、B 'Renting a projector' 和 D 'Ordering new equipment' 都不符合主要對話主題。",
  "difficulty": "B1",
  "vocabulary": [
    "projector",
    "presentation",
    "repair",
    "service"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-127",
  "part": "Part 3",
  "transcript": "W: I just realized the projector isn't working. We need it for the presentation tomorrow.\nM: That's not good. Do we have a backup?\nW: Unfortunately, no. Could you call the repair service?\nM: Sure, I'll contact them right away.\nW: Ask if they can come today. We can't afford to wait.\nM: I will, but they might be busy.\nW: Let's hope they can fit us in. If not, we'll have to rent one.\nM: Understood. I'll get on it now.\nW: Please update me as soon as you know.\nM: Will do. I'm on it.",
  "question_order": 1
},
  {
  "question": "What problem did the woman mention?",
  "choices": {
    "A": "The presentation is delayed.",
    "B": "The projector is missing.",
    "C": "The repair service is unavailable.",
    "D": "The projector isn't working."
  },
  "answer": "D",
  "explanation_zh": "答案是 D。女士提到 'the projector isn't working'，所以問題是投影機不能運作。選項 A 'The presentation is delayed'、B 'The projector is missing' 和 C 'The repair service is unavailable' 都沒有在對話中提到。",
  "difficulty": "A2",
  "vocabulary": [
    "projector",
    "working",
    "presentation",
    "backup"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-128",
  "part": "Part 3",
  "transcript": "W: I just realized the projector isn't working. We need it for the presentation tomorrow.\nM: That's not good. Do we have a backup?\nW: Unfortunately, no. Could you call the repair service?\nM: Sure, I'll contact them right away.\nW: Ask if they can come today. We can't afford to wait.\nM: I will, but they might be busy.\nW: Let's hope they can fit us in. If not, we'll have to rent one.\nM: Understood. I'll get on it now.\nW: Please update me as soon as you know.\nM: Will do. I'm on it.",
  "question_order": 2
},
  {
  "question": "What is the man's most likely immediate next action?",
  "choices": {
    "A": "Contact the repair service",
    "B": "Set up a backup projector",
    "C": "Prepare the presentation slides",
    "D": "Rent a projector"
  },
  "answer": "A",
  "explanation_zh": "答案是 A。男士回答 'I'll contact them right away'，表示他會立即聯繫維修服務。其他選項如 B 'Set up a backup projector'、C 'Prepare the presentation slides' 和 D 'Rent a projector' 並不是他的直接行動。",
  "difficulty": "B1",
  "vocabulary": [
    "contact",
    "repair",
    "service",
    "backup"
  ],
  "skill_tag": "listening_next_action",
  "id": "p3-gen-129",
  "part": "Part 3",
  "transcript": "W: I just realized the projector isn't working. We need it for the presentation tomorrow.\nM: That's not good. Do we have a backup?\nW: Unfortunately, no. Could you call the repair service?\nM: Sure, I'll contact them right away.\nW: Ask if they can come today. We can't afford to wait.\nM: I will, but they might be busy.\nW: Let's hope they can fit us in. If not, we'll have to rent one.\nM: Understood. I'll get on it now.\nW: Please update me as soon as you know.\nM: Will do. I'm on it.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Booking a flight.",
    "B": "Scheduling a meeting.",
    "C": "Cancelling a conference.",
    "D": "Changing a conference registration."
  },
  "answer": "D",
  "explanation_zh": "答案是 D。對話中提到女士想要 'switch to the morning session'，這表示她正在改變會議註冊細節。選項 A 'Booking a flight'、B 'Scheduling a meeting' 和 C 'Cancelling a conference' 都未在對話中提到。",
  "difficulty": "B1",
  "vocabulary": [
    "conference",
    "registration",
    "change"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-130",
  "part": "Part 3",
  "transcript": "W: Hello, I need to change the registration details for the upcoming conference on October 15th.\nM: Sure, I can help with that. What changes do you need?\nW: I originally signed up for the afternoon session, but I'd like to switch to the morning one.\nM: Unfortunately, the morning session is fully booked.\nW: Oh, that's disappointing. Is there a waitlist I can join?\nM: Yes, I can add you to the waitlist.\nW: Thank you. Will I be updated via email?\nM: Yes, you'll receive an email if a spot opens up.\nW: Great, I'll keep an eye on my inbox.",
  "question_order": 1
},
  {
  "question": "What problem does the woman encounter?",
  "choices": {
    "A": "The morning session is fully booked.",
    "B": "She missed the registration deadline.",
    "C": "The location has changed.",
    "D": "The conference is canceled."
  },
  "answer": "A",
  "explanation_zh": "答案是 A。對話中男士說 'the morning session is fully booked'，所以女士遇到的問題是早上的課程已滿。選項 B 'She missed the registration deadline'、C 'The location has changed' 和 D 'The conference is canceled' 都未提及。",
  "difficulty": "A2",
  "vocabulary": [
    "session",
    "waitlist",
    "fully booked"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-131",
  "part": "Part 3",
  "transcript": "W: Hello, I need to change the registration details for the upcoming conference on October 15th.\nM: Sure, I can help with that. What changes do you need?\nW: I originally signed up for the afternoon session, but I'd like to switch to the morning one.\nM: Unfortunately, the morning session is fully booked.\nW: Oh, that's disappointing. Is there a waitlist I can join?\nM: Yes, I can add you to the waitlist.\nW: Thank you. Will I be updated via email?\nM: Yes, you'll receive an email if a spot opens up.\nW: Great, I'll keep an eye on my inbox.",
  "question_order": 2
},
  {
  "question": "What can be inferred from the conversation?",
  "choices": {
    "A": "The woman will attend a different conference.",
    "B": "The woman will wait for an email update.",
    "C": "The man will call the woman about the schedule.",
    "D": "The waitlist is for the afternoon session."
  },
  "answer": "B",
  "explanation_zh": "答案是 B。女士說 'I'll keep an eye on my inbox'，暗示她會等待電子郵件更新。選項 A 'The woman will attend a different conference'、C 'The man will call the woman about the schedule' 和 D 'The waitlist is for the afternoon session' 都不符合對話內容。",
  "difficulty": "B1",
  "vocabulary": [
    "waitlist",
    "email",
    "update"
  ],
  "skill_tag": "listening_inference",
  "id": "p3-gen-132",
  "part": "Part 3",
  "transcript": "W: Hello, I need to change the registration details for the upcoming conference on October 15th.\nM: Sure, I can help with that. What changes do you need?\nW: I originally signed up for the afternoon session, but I'd like to switch to the morning one.\nM: Unfortunately, the morning session is fully booked.\nW: Oh, that's disappointing. Is there a waitlist I can join?\nM: Yes, I can add you to the waitlist.\nW: Thank you. Will I be updated via email?\nM: Yes, you'll receive an email if a spot opens up.\nW: Great, I'll keep an eye on my inbox.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Correcting a customer order",
    "B": "Scheduling a meeting",
    "C": "Discussing a product return",
    "D": "Requesting a refund"
  },
  "answer": "A",
  "explanation_zh": "答案：A。對話中提到\"我打電話是因為我的訂單有錯誤\"，然後確認訂單中數量錯誤，並安排補發，這表明對話主要是關於更正客戶訂單。選項B、C、D均未在對話中提及。",
  "difficulty": "B1",
  "vocabulary": [
    "order",
    "invoice",
    "units"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-133",
  "part": "Part 3",
  "transcript": "W: Hi, I'm calling about my recent order, invoice number 784596. It seems there was an error.\nM: Of course, let me check. Yes, I see here, you ordered 50 units of the printer cartridges.\nW: That's correct, but I received 30 units instead.\nM: I apologize for the mistake. We can send the additional 20 units by express delivery.\nW: That would be appreciated. How soon can I expect them?\nM: You should receive them by Friday.\nW: Great, and will there be any additional charges?\nM: No, the shipping will be complimentary, given the error.\nW: Thank you for resolving this quickly.\nM: You're welcome. Is there anything else I can assist you with today?",
  "question_order": 1
},
  {
  "question": "What was the mistake with the customer's order?",
  "choices": {
    "A": "Wrong product delivered",
    "B": "Incorrect quantity sent",
    "C": "Delayed shipment",
    "D": "Incorrect invoice number"
  },
  "answer": "B",
  "explanation_zh": "答案：B。對話中明確指出\"我訂了50個單位的墨水匣，但只收到了30個\"，這明確顯示錯誤是數量不正確。選項A、C、D都不是對話中提到的問題。",
  "difficulty": "A2",
  "vocabulary": [
    "error",
    "order",
    "units"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-134",
  "part": "Part 3",
  "transcript": "W: Hi, I'm calling about my recent order, invoice number 784596. It seems there was an error.\nM: Of course, let me check. Yes, I see here, you ordered 50 units of the printer cartridges.\nW: That's correct, but I received 30 units instead.\nM: I apologize for the mistake. We can send the additional 20 units by express delivery.\nW: That would be appreciated. How soon can I expect them?\nM: You should receive them by Friday.\nW: Great, and will there be any additional charges?\nM: No, the shipping will be complimentary, given the error.\nW: Thank you for resolving this quickly.\nM: You're welcome. Is there anything else I can assist you with today?",
  "question_order": 2
},
  {
  "question": "What will the customer most likely do next?",
  "choices": {
    "A": "Wait for the additional units to arrive",
    "B": "Call another company",
    "C": "Request a refund",
    "D": "Cancel the order"
  },
  "answer": "C",
  "explanation_zh": "答案：A。根據對話內容，客戶接受了補發的安排，且對話結束時問及是否還有其他需要幫助，顯示客戶將等待額外數量的到來。選項B、C、D都不符合對話的內容。",
  "difficulty": "B1",
  "vocabulary": [
    "expect",
    "complimentary",
    "receive"
  ],
  "skill_tag": "listening_next_action",
  "id": "p3-gen-135",
  "part": "Part 3",
  "transcript": "W: Hi, I'm calling about my recent order, invoice number 784596. It seems there was an error.\nM: Of course, let me check. Yes, I see here, you ordered 50 units of the printer cartridges.\nW: That's correct, but I received 30 units instead.\nM: I apologize for the mistake. We can send the additional 20 units by express delivery.\nW: That would be appreciated. How soon can I expect them?\nM: You should receive them by Friday.\nW: Great, and will there be any additional charges?\nM: No, the shipping will be complimentary, given the error.\nW: Thank you for resolving this quickly.\nM: You're welcome. Is there anything else I can assist you with today?",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Discussing a new project.",
    "B": "Rescheduling a client meeting.",
    "C": "Preparing a presentation.",
    "D": "Organizing a team event."
  },
  "answer": "B",
  "explanation_zh": "答案：B。整段對話圍繞著重新安排客戶會議的時間進行，從確認時間到通知團隊，顯示主要主題為重新安排會議時間。選項A、C、D並未涉及。",
  "difficulty": "A2",
  "vocabulary": [
    "reschedule",
    "client",
    "meeting"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-136",
  "part": "Part 3",
  "transcript": "W: We have a meeting with the client scheduled for Thursday at 3 PM. Can you confirm?\nM: Actually, I just received an email. They need to reschedule.\nW: Oh, I see. Did they suggest a new time?\nM: Yes, they proposed moving it to Friday at 10 AM.\nW: Friday works for me. Should I update the calendar invite?\nM: Yes, please do that. Also, can you inform the rest of the team?\nW: Sure. Is there anything else we need to prepare for the meeting?\nM: We might need to adjust the presentation slides to include the latest sales figures.\nW: I'll have those updated by tomorrow afternoon.",
  "question_order": 1
},
  {
  "question": "Why does the meeting need to be rescheduled?",
  "choices": {
    "A": "The venue is unavailable.",
    "B": "Technical issues occurred.",
    "C": "The client has a conflict.",
    "D": "The team is not ready."
  },
  "answer": "C",
  "explanation_zh": "答案：C。對話中提到\"他們需要重新安排\"，並且對話的內容全程未涉及其他原因，顯示明確是因為客戶的衝突才需要重新安排會議。選項A、B、D均未提及。",
  "difficulty": "B1",
  "vocabulary": [
    "reschedule",
    "confirm",
    "propose"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-137",
  "part": "Part 3",
  "transcript": "W: We have a meeting with the client scheduled for Thursday at 3 PM. Can you confirm?\nM: Actually, I just received an email. They need to reschedule.\nW: Oh, I see. Did they suggest a new time?\nM: Yes, they proposed moving it to Friday at 10 AM.\nW: Friday works for me. Should I update the calendar invite?\nM: Yes, please do that. Also, can you inform the rest of the team?\nW: Sure. Is there anything else we need to prepare for the meeting?\nM: We might need to adjust the presentation slides to include the latest sales figures.\nW: I'll have those updated by tomorrow afternoon.",
  "question_order": 2
},
  {
  "question": "What is most likely the woman’s next action?",
  "choices": {
    "A": "Contact the client for confirmation.",
    "B": "Notify the client about the time change.",
    "C": "Prepare additional presentation materials.",
    "D": "Update the calendar invite."
  },
  "answer": "D",
  "explanation_zh": "答案：D。對話中提到\"應該更新日曆邀請嗎？\"，並得到肯定的答覆，顯示下一步會更新日曆邀請。選項A、B、C不符合對話內容。",
  "difficulty": "B1",
  "vocabulary": [
    "update",
    "calendar",
    "inform"
  ],
  "skill_tag": "listening_inference",
  "id": "p3-gen-138",
  "part": "Part 3",
  "transcript": "W: We have a meeting with the client scheduled for Thursday at 3 PM. Can you confirm?\nM: Actually, I just received an email. They need to reschedule.\nW: Oh, I see. Did they suggest a new time?\nM: Yes, they proposed moving it to Friday at 10 AM.\nW: Friday works for me. Should I update the calendar invite?\nM: Yes, please do that. Also, can you inform the rest of the team?\nW: Sure. Is there anything else we need to prepare for the meeting?\nM: We might need to adjust the presentation slides to include the latest sales figures.\nW: I'll have those updated by tomorrow afternoon.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Scheduling a meeting",
    "B": "Ordering new supplies",
    "C": "A delayed shipment",
    "D": "Office renovations"
  },
  "answer": "C",
  "explanation_zh": "答案：C。對話中提到\"辦公椅的運輸不會如計劃今天抵達\"，提到供應問題，表明主題是延遲的運輸。選項A、B、D都不符合。",
  "difficulty": "A2",
  "vocabulary": [
    "shipment",
    "delay",
    "supplier"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-139",
  "part": "Part 3",
  "transcript": "W: I just received an update that the shipment of office chairs won't arrive today as planned.\nM: That's unfortunate. Did they mention why there's a delay?\nW: Yes, the supplier said there was a problem at the distribution center.\nM: Do we have a new delivery date?\nW: They are aiming for Thursday instead.\nM: Alright, I'll inform the office staff about the change.\nW: Could you also check if we need to adjust any meetings?\nM: Sure, I'll review the schedule and make necessary changes.\nW: Thanks, let's hope this doesn't cause too much disruption.",
  "question_order": 1
},
  {
  "question": "What was the cause of the shipment delay?",
  "choices": {
    "A": "Traffic issues",
    "B": "Weather conditions",
    "C": "Supplier's mistake",
    "D": "Problem at the distribution center"
  },
  "answer": "D",
  "explanation_zh": "答案：D。對話中提到\"供應商說發生在配銷中心的問題\"，清楚指出延遲原因是配銷中心的問題。選項A、B、C都不符合對話內容。",
  "difficulty": "B1",
  "vocabulary": [
    "delay",
    "distribution",
    "supplier"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-140",
  "part": "Part 3",
  "transcript": "W: I just received an update that the shipment of office chairs won't arrive today as planned.\nM: That's unfortunate. Did they mention why there's a delay?\nW: Yes, the supplier said there was a problem at the distribution center.\nM: Do we have a new delivery date?\nW: They are aiming for Thursday instead.\nM: Alright, I'll inform the office staff about the change.\nW: Could you also check if we need to adjust any meetings?\nM: Sure, I'll review the schedule and make necessary changes.\nW: Thanks, let's hope this doesn't cause too much disruption.",
  "question_order": 2
},
  {
  "question": "What is the most likely immediate next action?",
  "choices": {
    "A": "Informing office staff about the change",
    "B": "Ordering new office chairs",
    "C": "Adjusting the staff's work hours",
    "D": "Canceling all scheduled meetings"
  },
  "answer": "A",
  "explanation_zh": "答案：A。對話中提到\"我會通知辦公室工作人員有關變更\"，顯示最可能的下一步行動是通知員工。選項B、C、D不符合對話內容。",
  "difficulty": "B1",
  "vocabulary": [
    "inform",
    "schedule",
    "staff"
  ],
  "skill_tag": "listening_next_action",
  "id": "p3-gen-141",
  "part": "Part 3",
  "transcript": "W: I just received an update that the shipment of office chairs won't arrive today as planned.\nM: That's unfortunate. Did they mention why there's a delay?\nW: Yes, the supplier said there was a problem at the distribution center.\nM: Do we have a new delivery date?\nW: They are aiming for Thursday instead.\nM: Alright, I'll inform the office staff about the change.\nW: Could you also check if we need to adjust any meetings?\nM: Sure, I'll review the schedule and make necessary changes.\nW: Thanks, let's hope this doesn't cause too much disruption.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Scheduling a meeting",
    "B": "Planning a business trip",
    "C": "Arranging a shipment",
    "D": "Repairing equipment"
  },
  "answer": "D",
  "explanation_zh": "選擇D是正確的，因為整個對話圍繞著修理投影設備進行。對話中明確提到投影機的燈泡問題以及安排技術人員進行維修的細節。選項A、B和C與對話內容不符。",
  "difficulty": "A2",
  "vocabulary": [
    "projector",
    "presentation",
    "repair"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-142",
  "part": "Part 3",
  "transcript": "W: Hi, I urgently need the projector repaired for tomorrow's presentation. Can you help?\nM: Sure, I can send a technician this afternoon. What's the issue?\nW: The bulb seems to have burned out and the image is flickering.\nM: I understand. Our technician can replace the bulb today.\nW: That would be great. The presentation is at 9 AM at the downtown office.\nM: I'll make sure the technician fixes it by 5 PM today.\nW: Thank you. How much will the repair cost?\nM: It will be $75, and you'll receive an invoice by email.\nW: Perfect, I'll look out for the invoice.",
  "question_order": 1
},
  {
  "question": "What problem does the projector have?",
  "choices": {
    "A": "The bulb is burnt out.",
    "B": "It has a cracked lens.",
    "C": "It is overheating.",
    "D": "It won't turn on."
  },
  "answer": "A",
  "explanation_zh": "選擇A是正確的，因為對話中女士明確提到“燈泡似乎燒壞了”，這直接指出了投影機的問題。選項B、C和D都未在對話中提及，屬於誤導選項。",
  "difficulty": "A2",
  "vocabulary": [
    "burned out",
    "flickering",
    "bulb"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-143",
  "part": "Part 3",
  "transcript": "W: Hi, I urgently need the projector repaired for tomorrow's presentation. Can you help?\nM: Sure, I can send a technician this afternoon. What's the issue?\nW: The bulb seems to have burned out and the image is flickering.\nM: I understand. Our technician can replace the bulb today.\nW: That would be great. The presentation is at 9 AM at the downtown office.\nM: I'll make sure the technician fixes it by 5 PM today.\nW: Thank you. How much will the repair cost?\nM: It will be $75, and you'll receive an invoice by email.\nW: Perfect, I'll look out for the invoice.",
  "question_order": 2
},
  {
  "question": "What can be inferred about the technician's visit?",
  "choices": {
    "A": "The technician will arrive the following week.",
    "B": "The technician will complete the repair by 5 PM.",
    "C": "The repair will cost more than $100.",
    "D": "The technician will bring a replacement projector."
  },
  "answer": "B",
  "explanation_zh": "選擇B為正確答案，因為男士說“我會確保技術人員在今天下午5點之前修好它”，這表明技術人員會在今天完成修理。選項A錯誤，因為技術人員今天就會到達；選項C錯誤，因為修理費用是75美元；選項D錯誤，對話中沒有提及替換投影機。",
  "difficulty": "B1",
  "vocabulary": [
    "technician",
    "repair",
    "invoice"
  ],
  "skill_tag": "listening_inference",
  "id": "p3-gen-144",
  "part": "Part 3",
  "transcript": "W: Hi, I urgently need the projector repaired for tomorrow's presentation. Can you help?\nM: Sure, I can send a technician this afternoon. What's the issue?\nW: The bulb seems to have burned out and the image is flickering.\nM: I understand. Our technician can replace the bulb today.\nW: That would be great. The presentation is at 9 AM at the downtown office.\nM: I'll make sure the technician fixes it by 5 PM today.\nW: Thank you. How much will the repair cost?\nM: It will be $75, and you'll receive an invoice by email.\nW: Perfect, I'll look out for the invoice.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Changing a conference registration.",
    "B": "Cancelling a hotel reservation.",
    "C": "Booking a flight ticket.",
    "D": "Rescheduling a meeting."
  },
  "answer": "A",
  "explanation_zh": "選擇A是正確的，因為整個對話聚焦於更改會議註冊時間，從下午場次改到上午場次。選項B、C和D與對話內容不符，因此是誤導選項。",
  "difficulty": "B1",
  "vocabulary": [
    "registration",
    "conference",
    "session"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-145",
  "part": "Part 3",
  "transcript": "W: I need to change my registration for the upcoming conference on October 15th.\nM: Certainly. What would you like to modify?\nW: I originally registered for the afternoon session, but I need to attend the morning one instead.\nM: Let me check the availability. Yes, there are still spots open in the morning session.\nW: Great, can you switch my registration to that session?\nM: Absolutely. I'll update your registration now.\nW: Thank you. Will I get a confirmation email?\nM: Yes, it should arrive in your inbox shortly.\nW: Perfect, I appreciate your help.",
  "question_order": 1
},
  {
  "question": "What specific change does the woman want to make?",
  "choices": {
    "A": "Cancel her registration entirely.",
    "B": "Switch to the morning session.",
    "C": "Add an additional guest.",
    "D": "Change the conference date."
  },
  "answer": "B",
  "explanation_zh": "選擇B是正確的，因為女士明確提到她需要從下午場次改到上午場次，這是她希望進行的具體更改。選項A、C和D均未在對話中出現，屬於誤導選項。",
  "difficulty": "A2",
  "vocabulary": [
    "switch",
    "session",
    "availability"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-146",
  "part": "Part 3",
  "transcript": "W: I need to change my registration for the upcoming conference on October 15th.\nM: Certainly. What would you like to modify?\nW: I originally registered for the afternoon session, but I need to attend the morning one instead.\nM: Let me check the availability. Yes, there are still spots open in the morning session.\nW: Great, can you switch my registration to that session?\nM: Absolutely. I'll update your registration now.\nW: Thank you. Will I get a confirmation email?\nM: Yes, it should arrive in your inbox shortly.\nW: Perfect, I appreciate your help.",
  "question_order": 2
},
  {
  "question": "What is the most likely immediate next action?",
  "choices": {
    "A": "The man will cancel the woman's registration.",
    "B": "The woman will call the conference organizer.",
    "C": "The woman's registration will be updated.",
    "D": "The man will issue a refund."
  },
  "answer": "C",
  "explanation_zh": "選擇C是正確的，因為男士表示會“立即更新您的註冊”，這是對話中最可能的下一步行動。選項A、B和D未在對話中提及，屬於誤導選項。",
  "difficulty": "B1",
  "vocabulary": [
    "confirmation",
    "update",
    "inbox"
  ],
  "skill_tag": "listening_next_action",
  "id": "p3-gen-147",
  "part": "Part 3",
  "transcript": "W: I need to change my registration for the upcoming conference on October 15th.\nM: Certainly. What would you like to modify?\nW: I originally registered for the afternoon session, but I need to attend the morning one instead.\nM: Let me check the availability. Yes, there are still spots open in the morning session.\nW: Great, can you switch my registration to that session?\nM: Absolutely. I'll update your registration now.\nW: Thank you. Will I get a confirmation email?\nM: Yes, it should arrive in your inbox shortly.\nW: Perfect, I appreciate your help.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "A shipment delay",
    "B": "A customer order correction",
    "C": "A product inquiry",
    "D": "A billing issue"
  },
  "answer": "B",
  "explanation_zh": "選擇B是正確的，因為對話內容集中在更正客戶訂單中的錯誤，將錯誤的黑色筆更換為正確的藍色筆。選項A、C和D都未在對話中提及，屬於誤導選項。",
  "difficulty": "A2",
  "vocabulary": [
    "order",
    "pens",
    "replacement"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-148",
  "part": "Part 3",
  "transcript": "W: Hello, I received my order today, but it seems there’s a mistake. I ordered three boxes of blue pens, but I got black pens instead.\nM: I’m sorry for the inconvenience. Can you confirm the order number for me?\nW: Sure, it's 45321.\nM: Thank you. I’ll arrange for the correct items to be sent out today.\nW: Great, and should I return the black pens?\nM: Yes, please. We’ll include a prepaid shipping label with your replacement.\nW: Perfect, how long will it take to get the new pens?\nM: You should receive them by Friday.",
  "question_order": 1
},
  {
  "question": "What was the problem with the order?",
  "choices": {
    "A": "The pens were damaged",
    "B": "The pens were missing",
    "C": "The wrong color pens were sent",
    "D": "The order number was incorrect"
  },
  "answer": "C",
  "explanation_zh": "選擇C是正確的，因為女士提到她收到錯誤顏色的筆（黑色而不是藍色），這明確指出了訂單的問題。選項A、B和D未在對話中出現，屬於誤導選項。",
  "difficulty": "A2",
  "vocabulary": [
    "order",
    "mistake",
    "confirm"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-149",
  "part": "Part 3",
  "transcript": "W: Hello, I received my order today, but it seems there’s a mistake. I ordered three boxes of blue pens, but I got black pens instead.\nM: I’m sorry for the inconvenience. Can you confirm the order number for me?\nW: Sure, it's 45321.\nM: Thank you. I’ll arrange for the correct items to be sent out today.\nW: Great, and should I return the black pens?\nM: Yes, please. We’ll include a prepaid shipping label with your replacement.\nW: Perfect, how long will it take to get the new pens?\nM: You should receive them by Friday.",
  "question_order": 2
},
  {
  "question": "What can be inferred about the shipping process?",
  "choices": {
    "A": "The pens will arrive tomorrow",
    "B": "The prepaid label needs to be purchased",
    "C": "The order cannot be changed once shipped",
    "D": "The shipping process includes prepaid returns"
  },
  "answer": "D",
  "explanation_zh": "選擇D是正確的，因為對話中提到會附帶預付費的運輸標籤，這表明物流過程包括預付費的退貨選項。選項A、B和C未在對話中支持，因此是誤導選項。",
  "difficulty": "B1",
  "vocabulary": [
    "shipping",
    "prepaid",
    "replacement"
  ],
  "skill_tag": "listening_inference",
  "id": "p3-gen-150",
  "part": "Part 3",
  "transcript": "W: Hello, I received my order today, but it seems there’s a mistake. I ordered three boxes of blue pens, but I got black pens instead.\nM: I’m sorry for the inconvenience. Can you confirm the order number for me?\nW: Sure, it's 45321.\nM: Thank you. I’ll arrange for the correct items to be sent out today.\nW: Great, and should I return the black pens?\nM: Yes, please. We’ll include a prepaid shipping label with your replacement.\nW: Perfect, how long will it take to get the new pens?\nM: You should receive them by Friday.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the conversation?",
  "choices": {
    "A": "Booking a conference room.",
    "B": "Canceling a business trip.",
    "C": "Rescheduling a client meeting.",
    "D": "Discussing a project deadline."
  },
  "answer": "C",
  "explanation_zh": "選擇C：重新安排客戶會議。根據對話，男女雙方討論的是更改會議時間，因為男方有一個與會議時間衝突的電話會議。對話中提到需要更改的會議，以及確認新的會議時間和地點。選項A、B和D都未被提及，不符合對話內容。",
  "difficulty": "B1",
  "vocabulary": [
    "confirm",
    "reschedule",
    "conference",
    "invite"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p3-gen-151",
  "part": "Part 3",
  "transcript": "W: I wanted to confirm our meeting scheduled for Wednesday afternoon.\nM: Unfortunately, I need to reschedule. I have a conference call at the same time.\nW: Could we move it to Thursday instead?\nM: I'm booked that day too. How about Friday morning?\nW: Friday works for me. Should we meet at the office as usual?\nM: Actually, let's meet at the café near the office. It's quieter there.\nW: That sounds good. At 10 AM then?\nM: Perfect. I'll send you a calendar invite with the new details.",
  "question_order": 1
},
  {
  "question": "Why does the man need to reschedule the meeting?",
  "choices": {
    "A": "He has a doctor's appointment.",
    "B": "He is out of town.",
    "C": "He is attending a workshop.",
    "D": "He has a conference call."
  },
  "answer": "D",
  "explanation_zh": "選擇D：他有一個電話會議。對話中男士明確表示，他需要重新安排會議是因為與他有一個電話會議的時間衝突。這是對話中的直接訊息。選項A、B和C未被提及，與對話內容不符。",
  "difficulty": "A2",
  "vocabulary": [
    "reschedule",
    "conference call",
    "meeting",
    "confirm"
  ],
  "skill_tag": "listening_detail",
  "id": "p3-gen-152",
  "part": "Part 3",
  "transcript": "W: I wanted to confirm our meeting scheduled for Wednesday afternoon.\nM: Unfortunately, I need to reschedule. I have a conference call at the same time.\nW: Could we move it to Thursday instead?\nM: I'm booked that day too. How about Friday morning?\nW: Friday works for me. Should we meet at the office as usual?\nM: Actually, let's meet at the café near the office. It's quieter there.\nW: That sounds good. At 10 AM then?\nM: Perfect. I'll send you a calendar invite with the new details.",
  "question_order": 2
},
  {
  "question": "What will the woman most likely do next?",
  "choices": {
    "A": "Wait for a calendar invite.",
    "B": "Go to the office café.",
    "C": "Reschedule her other appointments.",
    "D": "Prepare for a conference call."
  },
  "answer": "A",
  "explanation_zh": "選擇A：等待日曆邀請。根據對話，女士最後表示新的安排聽起來不錯，男士則說他會發送一個包含新細節的日曆邀請。因此，女士接下來最可能會等待這個邀請。選項B、C和D沒有在對話中被暗示或提及，與對話情境不符。",
  "difficulty": "A2",
  "vocabulary": [
    "invite",
    "calendar",
    "meeting",
    "office"
  ],
  "skill_tag": "listening_next_action",
  "id": "p3-gen-153",
  "part": "Part 3",
  "transcript": "W: I wanted to confirm our meeting scheduled for Wednesday afternoon.\nM: Unfortunately, I need to reschedule. I have a conference call at the same time.\nW: Could we move it to Thursday instead?\nM: I'm booked that day too. How about Friday morning?\nW: Friday works for me. Should we meet at the office as usual?\nM: Actually, let's meet at the café near the office. It's quieter there.\nW: That sounds good. At 10 AM then?\nM: Perfect. I'll send you a calendar invite with the new details.",
  "question_order": 3
},
  {
  "question": "What is the purpose of this recorded message?",
  "choices": {
    "A": "To inform about a new product launch.",
    "B": "To update customers on service wait times.",
    "C": "To announce a holiday closure.",
    "D": "To advertise a special sale."
  },
  "answer": "B",
  "explanation_zh": "選擇B：錄音中提到『我們的服務線路目前正在經歷比平常更高的等待時間』，表明目的是更新服務等待時間。選項A、C和D都沒有在錄音中提到。",
  "difficulty": "B1",
  "vocabulary": [
    "customer",
    "technical",
    "website"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-088",
  "part": "Part 4",
  "transcript": "Thank you for calling Grandview Electronics Customer Service. Due to an unexpected technical issue, our service lines are currently experiencing higher than usual wait times. We apologize for any inconvenience this may cause. For immediate assistance, please visit our website, grandview-electronics.com, where you can chat live with an agent. Our offices are open Monday to Friday, from 8 AM to 6 PM. We appreciate your patience and understanding as we work to resolve this matter promptly. Thank you for choosing Grandview Electronics.",
  "question_order": 1
},
  {
  "question": "What problem is mentioned in the message?",
  "choices": {
    "A": "The website is down.",
    "B": "The office hours have changed.",
    "C": "Higher than usual wait times.",
    "D": "The phone lines are closed."
  },
  "answer": "C",
  "explanation_zh": "選擇C：錄音清楚指出『我們的服務線路目前正在經歷比平常更高的等待時間』。選項A、B和D都未被提及或不符合現實。",
  "difficulty": "B1",
  "vocabulary": [
    "technical",
    "issue",
    "wait times"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-089",
  "part": "Part 4",
  "transcript": "Thank you for calling Grandview Electronics Customer Service. Due to an unexpected technical issue, our service lines are currently experiencing higher than usual wait times. We apologize for any inconvenience this may cause. For immediate assistance, please visit our website, grandview-electronics.com, where you can chat live with an agent. Our offices are open Monday to Friday, from 8 AM to 6 PM. We appreciate your patience and understanding as we work to resolve this matter promptly. Thank you for choosing Grandview Electronics.",
  "question_order": 2
},
  {
  "question": "What can be inferred about the company's response to the issue?",
  "choices": {
    "A": "They are ignoring the technical issue.",
    "B": "They plan to close the office early.",
    "C": "They have hired more staff to handle calls.",
    "D": "They are working to resolve the issue promptly."
  },
  "answer": "D",
  "explanation_zh": "選擇D：錄音中提到『我們正在努力迅速解決這個問題』，表示公司正迅速處理技術問題。選項A不正確，選項B和C未被提及或不符合現實。",
  "difficulty": "B1",
  "vocabulary": [
    "resolve",
    "patience",
    "assistance"
  ],
  "skill_tag": "listening_inference",
  "id": "p4-gen-090",
  "part": "Part 4",
  "transcript": "Thank you for calling Grandview Electronics Customer Service. Due to an unexpected technical issue, our service lines are currently experiencing higher than usual wait times. We apologize for any inconvenience this may cause. For immediate assistance, please visit our website, grandview-electronics.com, where you can chat live with an agent. Our offices are open Monday to Friday, from 8 AM to 6 PM. We appreciate your patience and understanding as we work to resolve this matter promptly. Thank you for choosing Grandview Electronics.",
  "question_order": 3
},
  {
  "question": "What is the announcement mainly about?",
  "choices": {
    "A": "A new security system installation.",
    "B": "An upcoming company event.",
    "C": "Building access changes.",
    "D": "Office relocation."
  },
  "answer": "C",
  "explanation_zh": "選擇C：公告中提到『主入口將進行翻新』，並要求員工使用另一入口，重點在於建築物進出變更。選項A、B和D未被提及或不符合公告內容。",
  "difficulty": "B1",
  "vocabulary": [
    "renovation",
    "entrance",
    "access"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-091",
  "part": "Part 4",
  "transcript": "Attention all employees: Starting Monday, February 14th, the main entrance of our building will be undergoing renovation. During this time, please use the side entrance on Maple Street to access the building. The renovation is expected to last for two weeks, concluding on February 28th. For those with mobility issues, a temporary ramp will be installed at the side entrance. We apologize for any inconvenience this may cause and appreciate your cooperation. Please contact the facilities department if you have any questions.",
  "question_order": 1
},
  {
  "question": "What is the specified duration of the renovation?",
  "choices": {
    "A": "One week.",
    "B": "Three weeks.",
    "C": "Until March 5th.",
    "D": "Until February 28th."
  },
  "answer": "D",
  "explanation_zh": "選擇D：公告指出『預計持續兩週，於2月28日結束』，明確表示翻新持續到2月28日。選項A、B和C不符合公告內容。",
  "difficulty": "A2",
  "vocabulary": [
    "duration",
    "renovation",
    "concluding"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-092",
  "part": "Part 4",
  "transcript": "Attention all employees: Starting Monday, February 14th, the main entrance of our building will be undergoing renovation. During this time, please use the side entrance on Maple Street to access the building. The renovation is expected to last for two weeks, concluding on February 28th. For those with mobility issues, a temporary ramp will be installed at the side entrance. We apologize for any inconvenience this may cause and appreciate your cooperation. Please contact the facilities department if you have any questions.",
  "question_order": 2
},
  {
  "question": "What should employees do next?",
  "choices": {
    "A": "Use the side entrance on Maple Street.",
    "B": "Report to the facilities department.",
    "C": "Install a temporary ramp.",
    "D": "Wait for further instructions."
  },
  "answer": "A",
  "explanation_zh": "選擇A：公告中指示『請使用Maple Street的側入口進入建築物』。選項B、C和D未被提及或不符合公告內容。",
  "difficulty": "B1",
  "vocabulary": [
    "employees",
    "temporary",
    "cooperation"
  ],
  "skill_tag": "listening_next_action",
  "id": "p4-gen-093",
  "part": "Part 4",
  "transcript": "Attention all employees: Starting Monday, February 14th, the main entrance of our building will be undergoing renovation. During this time, please use the side entrance on Maple Street to access the building. The renovation is expected to last for two weeks, concluding on February 28th. For those with mobility issues, a temporary ramp will be installed at the side entrance. We apologize for any inconvenience this may cause and appreciate your cooperation. Please contact the facilities department if you have any questions.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the announcement?",
  "choices": {
    "A": "A new store opening",
    "B": "A change in store hours",
    "C": "A customer service issue",
    "D": "A store promotion"
  },
  "answer": "D",
  "explanation_zh": "選擇D：公告重點在於『我們的特別夏季促銷』，這是商店促銷活動。選項A、B和C未被提及或不符合公告內容。",
  "difficulty": "A2",
  "vocabulary": [
    "promotion",
    "summer",
    "discount"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-094",
  "part": "Part 4",
  "transcript": "Good morning, shoppers! We're excited to announce our special summer promotion at Millford Mall. Starting June 10th and running through June 20th, enjoy 25% off on all summer clothing. Please note that this offer is only valid for in-store purchases and cannot be combined with other discounts. Also, check out our new arrivals section located on the first floor near the entrance. Don't miss this opportunity to refresh your wardrobe with the latest styles. If you have any questions, our staff will be happy to assist you.",
  "question_order": 1
},
  {
  "question": "What is a restriction mentioned for the promotion?",
  "choices": {
    "A": "It cannot be combined with other discounts.",
    "B": "It starts on June 15th.",
    "C": "It includes all items.",
    "D": "It can be used online."
  },
  "answer": "A",
  "explanation_zh": "選擇A：公告明確指出『不能與其他折扣一起使用』為限制條件。選項B、C和D不符合公告或未被提及。",
  "difficulty": "B1",
  "vocabulary": [
    "restriction",
    "valid",
    "in-store"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-095",
  "part": "Part 4",
  "transcript": "Good morning, shoppers! We're excited to announce our special summer promotion at Millford Mall. Starting June 10th and running through June 20th, enjoy 25% off on all summer clothing. Please note that this offer is only valid for in-store purchases and cannot be combined with other discounts. Also, check out our new arrivals section located on the first floor near the entrance. Don't miss this opportunity to refresh your wardrobe with the latest styles. If you have any questions, our staff will be happy to assist you.",
  "question_order": 2
},
  {
  "question": "Where can customers find the new arrivals section?",
  "choices": {
    "A": "On the second floor near the elevator",
    "B": "On the first floor near the entrance",
    "C": "In the basement next to the food court",
    "D": "On the third floor next to the escalator"
  },
  "answer": "B",
  "explanation_zh": "選擇B：公告中提到『新到商品區位於一樓入口附近』，表明新到商品區的位置。選項A、C和D不符合公告或未被提及。",
  "difficulty": "B1",
  "vocabulary": [
    "arrival",
    "section",
    "entrance"
  ],
  "skill_tag": "listening_inference",
  "id": "p4-gen-096",
  "part": "Part 4",
  "transcript": "Good morning, shoppers! We're excited to announce our special summer promotion at Millford Mall. Starting June 10th and running through June 20th, enjoy 25% off on all summer clothing. Please note that this offer is only valid for in-store purchases and cannot be combined with other discounts. Also, check out our new arrivals section located on the first floor near the entrance. Don't miss this opportunity to refresh your wardrobe with the latest styles. If you have any questions, our staff will be happy to assist you.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the announcement?",
  "choices": {
    "A": "A train delay.",
    "B": "A station renovation.",
    "C": "A new train schedule.",
    "D": "A special event at the station."
  },
  "answer": "A",
  "explanation_zh": "選擇A：公告的主題是關於火車延遲，因為聲明中明確提到“the train will be delayed by approximately 45 minutes”。選項B、C和D均未提及。",
  "difficulty": "A2",
  "vocabulary": [
    "announcement",
    "express train",
    "delay",
    "maintenance",
    "departure"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-097",
  "part": "Part 4",
  "transcript": "Good afternoon, passengers. This is an announcement regarding the 3:15 PM express train to Westville. Due to unexpected maintenance work on the tracks, the train will be delayed by approximately 45 minutes. We apologize for the inconvenience. Passengers can collect complimentary refreshments at the station café while waiting. The revised departure time is now 4:00 PM. For further assistance, please contact the information desk, which is located near platform 3. Thank you for your understanding and patience.",
  "question_order": 1
},
  {
  "question": "What is the reason for the delay of the train?",
  "choices": {
    "A": "Adverse weather conditions.",
    "B": "Maintenance work on the tracks.",
    "C": "A staff shortage.",
    "D": "A power outage at the station."
  },
  "answer": "B",
  "explanation_zh": "選擇B：延遲的原因是“unexpected maintenance work on the tracks”，這在聲明中有明確提到。選項A、C和D沒有在對話中被提及。",
  "difficulty": "B1",
  "vocabulary": [
    "delay",
    "maintenance",
    "tracks",
    "inconvenience",
    "departure"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-098",
  "part": "Part 4",
  "transcript": "Good afternoon, passengers. This is an announcement regarding the 3:15 PM express train to Westville. Due to unexpected maintenance work on the tracks, the train will be delayed by approximately 45 minutes. We apologize for the inconvenience. Passengers can collect complimentary refreshments at the station café while waiting. The revised departure time is now 4:00 PM. For further assistance, please contact the information desk, which is located near platform 3. Thank you for your understanding and patience.",
  "question_order": 2
},
  {
  "question": "What should passengers probably do next?",
  "choices": {
    "A": "Board the train immediately.",
    "B": "Visit platform 3.",
    "C": "Collect refreshments at the café.",
    "D": "Leave the station."
  },
  "answer": "C",
  "explanation_zh": "選擇C：乘客應該去咖啡廳領取免費的餐點，因為聲明中提到“Passengers can collect complimentary refreshments at the station café while waiting”。選項A不正確，因為火車還沒有準備好。選項B和D都不符合公告內容。",
  "difficulty": "B2",
  "vocabulary": [
    "passengers",
    "complimentary",
    "refreshments",
    "café",
    "assistance"
  ],
  "skill_tag": "listening_next_action",
  "id": "p4-gen-099",
  "part": "Part 4",
  "transcript": "Good afternoon, passengers. This is an announcement regarding the 3:15 PM express train to Westville. Due to unexpected maintenance work on the tracks, the train will be delayed by approximately 45 minutes. We apologize for the inconvenience. Passengers can collect complimentary refreshments at the station café while waiting. The revised departure time is now 4:00 PM. For further assistance, please contact the information desk, which is located near platform 3. Thank you for your understanding and patience.",
  "question_order": 3
},
  {
  "question": "What is the purpose of the announcement?",
  "choices": {
    "A": "To introduce a new employee",
    "B": "To remind about a training session",
    "C": "To announce a company holiday",
    "D": "To schedule a team meeting"
  },
  "answer": "B",
  "explanation_zh": "選擇B：公告的目的是提醒關於即將到來的培訓會議，因為提到“This is a quick reminder about our upcoming staff training session”。選項A、C和D均不符合公告內容。",
  "difficulty": "A2",
  "vocabulary": [
    "reminder",
    "upcoming",
    "training",
    "session"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-100",
  "part": "Part 4",
  "transcript": "Good morning, team. This is a quick reminder about our upcoming staff training session scheduled for next Tuesday, October 12th, at 9 AM. We will be meeting in the main conference room on the third floor. Please remember to bring your employee ID cards for check-in. The training will focus on the new customer service protocols launched last month. Due to a scheduling conflict, the session originally planned for 11 AM has been moved up to 9 AM instead. Be sure to arrive on time, as the session will begin promptly.",
  "question_order": 1
},
  {
  "question": "When is the staff training session scheduled to start?",
  "choices": {
    "A": "11 AM",
    "B": "10 AM",
    "C": "9 AM",
    "D": "8 AM"
  },
  "answer": "C",
  "explanation_zh": "選擇C：培訓會議的開始時間是上午9點，聲明中清楚地提到“scheduled for next Tuesday, October 12th, at 9 AM”。選項A、B和D不正確。",
  "difficulty": "A2",
  "vocabulary": [
    "scheduled",
    "session",
    "conference",
    "promptly"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-101",
  "part": "Part 4",
  "transcript": "Good morning, team. This is a quick reminder about our upcoming staff training session scheduled for next Tuesday, October 12th, at 9 AM. We will be meeting in the main conference room on the third floor. Please remember to bring your employee ID cards for check-in. The training will focus on the new customer service protocols launched last month. Due to a scheduling conflict, the session originally planned for 11 AM has been moved up to 9 AM instead. Be sure to arrive on time, as the session will begin promptly.",
  "question_order": 2
},
  {
  "question": "What can be inferred about the original training session time?",
  "choices": {
    "A": "It was scheduled for the afternoon.",
    "B": "It was planned for the third floor.",
    "C": "It was held last month.",
    "D": "It was initially set for 11 AM."
  },
  "answer": "D",
  "explanation_zh": "選擇D：可以推斷出原定時間是11點，因為聲明中提到“the session originally planned for 11 AM has been moved up to 9 AM instead”。選項A、B和C未被提及。",
  "difficulty": "B1",
  "vocabulary": [
    "originally",
    "conflict",
    "moved",
    "instead"
  ],
  "skill_tag": "listening_inference",
  "id": "p4-gen-102",
  "part": "Part 4",
  "transcript": "Good morning, team. This is a quick reminder about our upcoming staff training session scheduled for next Tuesday, October 12th, at 9 AM. We will be meeting in the main conference room on the third floor. Please remember to bring your employee ID cards for check-in. The training will focus on the new customer service protocols launched last month. Due to a scheduling conflict, the session originally planned for 11 AM has been moved up to 9 AM instead. Be sure to arrive on time, as the session will begin promptly.",
  "question_order": 3
},
  {
  "question": "What is the main purpose of this message?",
  "choices": {
    "A": "To announce a new product release",
    "B": "To provide a weather update",
    "C": "To inform about shipment delays",
    "D": "To offer a discount on future purchases"
  },
  "answer": "C",
  "explanation_zh": "選擇C：消息的主要目的是通知運輸延遲，因為聲明中提到“We are currently experiencing a delay in shipping”。選項A、B和D不正確。",
  "difficulty": "A2",
  "vocabulary": [
    "shipping",
    "delay",
    "weather",
    "orders"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-103",
  "part": "Part 4",
  "transcript": "Hello, this is a message from the customer service department at TechGear. We are currently experiencing a delay in shipping due to unforeseen weather conditions in the Midwest. Orders placed on or after October 15th will be delayed by approximately three to five business days. We apologize for any inconvenience this may cause and are working diligently to resolve the issue. Please check your email for updates on your shipment. If you have any questions, feel free to contact us at our toll-free number. Thank you for your understanding and patience.",
  "question_order": 1
},
  {
  "question": "What is the cause of the shipping delay?",
  "choices": {
    "A": "Supplier issue",
    "B": "System upgrade",
    "C": "Limited staff",
    "D": "Weather conditions"
  },
  "answer": "D",
  "explanation_zh": "選擇D：運輸延遲的原因是“unforeseen weather conditions in the Midwest”。這從公告中明確可得。選項A、B和C不匹配。",
  "difficulty": "B1",
  "vocabulary": [
    "unforeseen",
    "weather",
    "conditions",
    "delay"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-104",
  "part": "Part 4",
  "transcript": "Hello, this is a message from the customer service department at TechGear. We are currently experiencing a delay in shipping due to unforeseen weather conditions in the Midwest. Orders placed on or after October 15th will be delayed by approximately three to five business days. We apologize for any inconvenience this may cause and are working diligently to resolve the issue. Please check your email for updates on your shipment. If you have any questions, feel free to contact us at our toll-free number. Thank you for your understanding and patience.",
  "question_order": 2
},
  {
  "question": "What should customers do after hearing this message?",
  "choices": {
    "A": "Check their email for updates",
    "B": "Place a new order",
    "C": "Visit the store",
    "D": "Ignore the delay"
  },
  "answer": "A",
  "explanation_zh": "選擇A：聽到這個信息後，顧客應該檢查他們的電子郵件，因為聲明中提到“Please check your email for updates on your shipment”。選項B、C和D沒有相關指示。",
  "difficulty": "B1",
  "vocabulary": [
    "email",
    "updates",
    "shipment",
    "contact"
  ],
  "skill_tag": "listening_next_action",
  "id": "p4-gen-105",
  "part": "Part 4",
  "transcript": "Hello, this is a message from the customer service department at TechGear. We are currently experiencing a delay in shipping due to unforeseen weather conditions in the Midwest. Orders placed on or after October 15th will be delayed by approximately three to five business days. We apologize for any inconvenience this may cause and are working diligently to resolve the issue. Please check your email for updates on your shipment. If you have any questions, feel free to contact us at our toll-free number. Thank you for your understanding and patience.",
  "question_order": 3
},
  {
  "question": "What is the main purpose of this announcement?",
  "choices": {
    "A": "To introduce a new security policy.",
    "B": "To announce a change in office hours.",
    "C": "To inform about a company event.",
    "D": "To notify about a building access change."
  },
  "answer": "D",
  "explanation_zh": "選擇D是正確的，因為公告的主要目的是通知員工建築物的入口變更。證據在於公告中提到由於維修，主要入口將於10月6日關閉，並要求使用側入口。選項A、B和C都與公告內容不符，無法解釋此次通知的目的。",
  "difficulty": "A2",
  "vocabulary": [
    "maintenance",
    "entrance",
    "scheduled",
    "side",
    "security"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-106",
  "part": "Part 4",
  "transcript": "Attention all employees. Due to scheduled maintenance, the main entrance of the building will be closed on Friday, October 6th. Please use the side entrance near the parking lot instead. The maintenance work is expected to start at 8:00 AM and finish by 5:00 PM. We apologize for any inconvenience this may cause. Additionally, please note that the security office will be temporarily relocated to Room 102 during this period. Thank you for your understanding and cooperation.",
  "question_order": 1
},
  {
  "question": "When will the main entrance be closed?",
  "choices": {
    "A": "On October 6th",
    "B": "On October 7th",
    "C": "On October 8th",
    "D": "On October 5th"
  },
  "answer": "A",
  "explanation_zh": "選擇A是正確的，因為公告中明確指出主要入口將於10月6日（星期五）關閉。這是直接從內容中得出的信息。選項B、C和D都與公告所述日期不符。",
  "difficulty": "A2",
  "vocabulary": [
    "entrance",
    "closed",
    "scheduled",
    "start",
    "finish"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-107",
  "part": "Part 4",
  "transcript": "Attention all employees. Due to scheduled maintenance, the main entrance of the building will be closed on Friday, October 6th. Please use the side entrance near the parking lot instead. The maintenance work is expected to start at 8:00 AM and finish by 5:00 PM. We apologize for any inconvenience this may cause. Additionally, please note that the security office will be temporarily relocated to Room 102 during this period. Thank you for your understanding and cooperation.",
  "question_order": 2
},
  {
  "question": "What can be inferred about the security office?",
  "choices": {
    "A": "It will be open 24 hours.",
    "B": "It will be in Room 102 temporarily.",
    "C": "It requires a new access code.",
    "D": "It has been permanently relocated."
  },
  "answer": "B",
  "explanation_zh": "選擇B是正確的，因為公告中提到保安辦公室在這段期間將臨時遷至102室，這表示遷移是暫時性的。選項A、C和D都不符合公告中給出的信息。",
  "difficulty": "B1",
  "vocabulary": [
    "relocated",
    "temporary",
    "maintenance",
    "entrance",
    "side"
  ],
  "skill_tag": "listening_inference",
  "id": "p4-gen-108",
  "part": "Part 4",
  "transcript": "Attention all employees. Due to scheduled maintenance, the main entrance of the building will be closed on Friday, October 6th. Please use the side entrance near the parking lot instead. The maintenance work is expected to start at 8:00 AM and finish by 5:00 PM. We apologize for any inconvenience this may cause. Additionally, please note that the security office will be temporarily relocated to Room 102 during this period. Thank you for your understanding and cooperation.",
  "question_order": 3
},
  {
  "question": "What is the main topic of the announcement?",
  "choices": {
    "A": "A store's weekend sale event.",
    "B": "A new product launch.",
    "C": "A change in store hours.",
    "D": "A customer feedback survey."
  },
  "answer": "A",
  "explanation_zh": "選擇A是正確的，因為公告的主要話題是關於店鋪的周末特賣活動，從4月15日到4月17日進行。內容中提到折扣和購物活動。選項B、C和D未在公告中提到，與主要話題無關。",
  "difficulty": "A2",
  "vocabulary": [
    "sale",
    "electronics",
    "discount",
    "event"
  ],
  "skill_tag": "listening_main_idea",
  "id": "p4-gen-109",
  "part": "Part 4",
  "transcript": "Attention shoppers! We're excited to announce our weekend sale event at Riverdale Mall, running from April 15th to April 17th. Enjoy discounts up to 50% on select electronics, including televisions and smartphones. Please note that these offers are available in-store only and cannot be combined with other promotions. Remember to check the product labels for eligible discounts. Store hours are extended during the sale, from 9 AM to 10 PM. Hurry in, as supplies are limited. We look forward to seeing you! Thank you for shopping with us.",
  "question_order": 1
},
  {
  "question": "When is the sale event taking place?",
  "choices": {
    "A": "April 10th to April 12th.",
    "B": "April 15th to April 17th.",
    "C": "April 18th to April 20th.",
    "D": "April 20th to April 22nd."
  },
  "answer": "B",
  "explanation_zh": "選擇B是正確的，因為公告中明確指出特賣活動將於4月15日至4月17日舉行。這是直接從內容中得出的信息。選項A、C和D都不符合公告所述的日期。",
  "difficulty": "A2",
  "vocabulary": [
    "sale",
    "event",
    "April"
  ],
  "skill_tag": "listening_detail",
  "id": "p4-gen-110",
  "part": "Part 4",
  "transcript": "Attention shoppers! We're excited to announce our weekend sale event at Riverdale Mall, running from April 15th to April 17th. Enjoy discounts up to 50% on select electronics, including televisions and smartphones. Please note that these offers are available in-store only and cannot be combined with other promotions. Remember to check the product labels for eligible discounts. Store hours are extended during the sale, from 9 AM to 10 PM. Hurry in, as supplies are limited. We look forward to seeing you! Thank you for shopping with us.",
  "question_order": 2
},
  {
  "question": "What is the most likely immediate next action for a shopper interested in the sale?",
  "choices": {
    "A": "Call to extend the sale period.",
    "B": "Combine discounts with another promotion.",
    "C": "Visit the store to shop during the sale.",
    "D": "Sign up for a newsletter about future sales."
  },
  "answer": "C",
  "explanation_zh": "選擇C是正確的，因為對於有興趣的購物者來說，最可能的立即行動就是在特賣期間去商店購物。公告中提到特賣活動是在店內進行，並未提及延長特賣期、合併折扣或訂閱未來銷售資訊等。選項A、B和D都不符合合理行動。",
  "difficulty": "B1",
  "vocabulary": [
    "shopper",
    "store",
    "interested",
    "immediate"
  ],
  "skill_tag": "listening_next_action",
  "id": "p4-gen-111",
  "part": "Part 4",
  "transcript": "Attention shoppers! We're excited to announce our weekend sale event at Riverdale Mall, running from April 15th to April 17th. Enjoy discounts up to 50% on select electronics, including televisions and smartphones. Please note that these offers are available in-store only and cannot be combined with other promotions. Remember to check the product labels for eligible discounts. Store hours are extended during the sale, from 9 AM to 10 PM. Hurry in, as supplies are limited. We look forward to seeing you! Thank you for shopping with us.",
  "question_order": 3
}
];
