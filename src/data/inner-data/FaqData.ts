interface DataType {
   id: number;
   id_name: string;
   title: string;
   md_pt?:boolean;
   faq: {
      id: number;
      question: string;
      answer: string;
   }[];
}

const inner_faq_data:DataType[] = [
   {
      id: 1,
      id_name: "Selling",
      title: "SELLING",
      md_pt: true,
      faq: [
        {
          id: 1,
          question: "Main apne property ko kaise list kar sakta hoon?",
          answer: "Aap apne account mein login karke 'Sell' section mein details fill karke property list kar sakte hain.",
        },
        {
          id: 2,
          question: "Property listing ke liye kya charges hain?",
          answer: "Hamari basic listing free hai, lekin premium features ke liye nominal fees hai.",
        },
        {
          id: 3,
          question: "Mujhe apni property ke buyers kaise milenge?",
          answer: "Buyers aapki listing dekh kar aapse website ke through directly contact karenge.",
        },
        {
          id: 4,
          question: "Main apne property ki price kaise set karoon?",
          answer: "Market trends aur professional advice ke base par price set kar sakte hain.",
        },
        {
          id: 5,
          question: "Kya main apni listing kabhi bhi edit kar sakta hoon?",
          answer: "Haan, aap apne dashboard mein jaakar listing edit kar sakte hain.",
        },
        {
          id: 6,
          question: "Property ka status kaise update karoon (Sold/Available)?",
          answer: "Dashboard se status update karna possible hai.",
        },
        {
          id: 7,
          question: "Kya mujhe buyer se deal finalize karne ke baad platform ko inform karna hoga?",
          answer: "Haan, isse platform par aapka record updated rahega.",
        },
        {
          id: 8,
          question: "Platform par listed property ka visibility kaise badhaun?",
          answer: "Premium listing ya featured ads ka use karke visibility badha sakte hain.",
        },
        {
          id: 9,
          question: "Property ke liye images upload karne ka kya criteria hai?",
          answer: "High-quality images hona zaroori hai jo clear aur relevant ho.",
        },
        {
          id: 10,
          question: "Kya platform meri property ki authenticity verify karega?",
          answer: "Haan, verification process listing ke part ke roop mein shamil hai.",
        },
      ],
    },
    {
      id: 2,
      id_name: "Renting",
      title: "RENTING",
      md_pt: true,
      faq: [
        {
          id: 1,
          question: "Main rental property kaise list kar sakta hoon?",
          answer: "Rental section mein jaakar property details aur rent amount enter karein.",
        },
        {
          id: 2,
          question: "Rental listing ke liye charges kya hain?",
          answer: "Basic listing free hai; advanced options ke liye charges alag hain.",
        },
        {
          id: 3,
          question: "Kya platform rental agreement provide karega?",
          answer: "Haan, aapko customizable rental agreement templates milenge.",
        },
        {
          id: 4,
          question: "Renters kaise contact karenge?",
          answer: "Renters aapke profile ke through directly contact karenge.",
        },
        {
          id: 5,
          question: "Kya tenants ka background check platform karega?",
          answer: "Haan, tenants verification service available hai.",
        },
        {
          id: 6,
          question: "Main rent amount kab aur kaise update kar sakta hoon?",
          answer: "Dashboard mein login karke rent amount kabhi bhi update kar sakte hain.",
        },
        {
          id: 7,
          question: "Platform par property rent karne mein kitna samay lagta hai?",
          answer: "Ye demand aur property ke location par depend karta hai.",
        },
        {
          id: 8,
          question: "Kya main furnished aur unfurnished dono properties list kar sakta hoon?",
          answer: "Haan, dono options available hain.",
        },
        {
          id: 9,
          question: "Platform ka customer support rental-related issues mein help karega?",
          answer: "Haan, hamara support team aapke saath hai.",
        },
        {
          id: 10,
          question: "Rental property ke reviews aur ratings kaise manage karoon?",
          answer: "Dashboard mein reviews aur ratings ka access diya jata hai.",
        },
      ],
    },
    {
      "id": 1,
      "id_name": "Buying",
      "title": "BUYING",
      "md_pt": true,
      faq: [
        {
          "id": 1,
          "question": "Main properties kaise search kar sakta hoon?",
          "answer": "Filters aur search bar ka use karke properties dekh sakte hain."
        },
        {
          "id": 2,
          "question": "Platform par available properties kaise reliable hain?",
          "answer": "Hamari team properties ki verification karti hai."
        },
        {
          "id": 3,
          "question": "Main specific location ki properties kaise dekh sakta hoon?",
          "answer": "Location filter ka use karke specific area ki properties search karein."
        },
        {
          "id": 4,
          "question": "Kya platform par negotiable prices hoti hain?",
          "answer": "Negotiation ka option seller ke discretion par hai."
        },
        {
          "id": 5,
          "question": "Main property ki details kaise verify karoon?",
          "answer": "Verified tag aur property documents check karein."
        },
        {
          "id": 6,
          "question": "Kya platform EMI options provide karta hai?",
          "answer": "Haan, hamare payment partners ke through EMI facilities available hain."
        },
        {
          "id": 7,
          "question": "Platform par listed properties ki latest updates kaise milengi?",
          "answer": "Notification settings on karke updates le sakte hain."
        },
        {
          "id": 8,
          "question": "Kya main broker-free properties find kar sakta hoon?",
          "answer": "Haan, aapko no-broker properties ke liye alag filter milega."
        },
        {
          "id": 9,
          "question": "Main property ka virtual tour kaise dekh sakta hoon?",
          "answer": "Listings mein virtual tour option diya gaya hai."
        },
        {
          "id": 10,
          "question": "Kya platform mere liye site visit arrange karega?",
          "answer": "Haan, ham site visits arrange karte hain."
        }
      ]
    },
    {
      "id": 2,
      "id_name": "Payments",
      "title": "PAYMENTS",
      "md_pt": true,
      faq: [
        {
          "id": 1,
          "question": "Platform par payments secure hain?",
          "answer": "Haan, hamara platform SSL encryption use karta hai."
        },
        {
          "id": 2,
          "question": "Kya main partial payment kar sakta hoon?",
          "answer": "Ye seller aur buyer ke agreement par depend karta hai."
        },
        {
          "id": 3,
          "question": "Refund policy kya hai?",
          "answer": "Refund policy terms & conditions section mein di gayi hai."
        },
        {
          "id": 4,
          "question": "Main kaunse payment modes use kar sakta hoon?",
          "answer": "Credit card, debit card, UPI, aur net banking options available hain."
        },
        {
          "id": 5,
          "question": "Payment confirmation kaise milega?",
          "answer": "Payment ke baad confirmation email aur SMS bheja jata hai."
        },
        {
          "id": 6,
          "question": "Kya EMI ka option available hai?",
          "answer": "Haan, selected properties ke liye EMI options available hain."
        },
        {
          "id": 7,
          "question": "Platform par transaction fee kitni hai?",
          "answer": "Transaction fee details payment page par di gayi hoti hai."
        },
        {
          "id": 8,
          "question": "Payment fail hone par kya karna hoga?",
          "answer": "Customer support se sampark karein ya retry karein."
        },
        {
          "id": 9,
          "question": "Kya mere transactions ka record safe rahega?",
          "answer": "Haan, dashboard mein sabhi transactions safe aur accessible hain."
        },
        {
          "id": 10,
          "question": "Platform ka payment gateway kaunsa hai?",
          "answer": "Hamara payment gateway highly secure aur reliable hai."
        }
      ]
    },    
    {
      "id": 3,
      "id_name": "TermsAndConditions",
      "title": "TERMS & CONDITIONS",
      "md_pt": true,
      faq: [
        {
          "id": 1,
          "question": "Platform ke terms & conditions kahan available hain?",
          "answer": "Footer mein 'Terms & Conditions' link par click karein."
        },
        {
          "id": 2,
          "question": "Kya terms & conditions regularly update ki jaati hain?",
          "answer": "Haan, policies ke hisaab se updates hote hain."
        },
        {
          "id": 3,
          "question": "Agar terms & conditions violate ho jayein to kya hoga?",
          "answer": "Account suspension ya penalties lagayi ja sakti hain."
        },
        {
          "id": 4,
          "question": "Privacy policy kahan available hai?",
          "answer": "Privacy policy 'Terms & Conditions' section ke sath hoti hai."
        },
        {
          "id": 5,
          "question": "Kya mujhe legal obligations ka samajhna zaroori hai?",
          "answer": "Haan, website use karte waqt terms ka follow karna zaroori hai."
        },
        {
          "id": 6,
          "question": "Kya platform buyer-seller disputes handle karega?",
          "answer": "Haan, disputes resolve karne ke liye special support team hai."
        },
        {
          "id": 7,
          "question": "Refund policy ka breakdown kahan milega?",
          "answer": "Terms & Conditions mein refund policy ki details di gayi hain."
        },
        {
          "id": 8,
          "question": "Platform par banned content kya hai?",
          "answer": "Illegal, fake, aur misleading content allowed nahi hai."
        },
        {
          "id": 9,
          "question": "Main kaise ensure karoon ki mera data safe hai?",
          "answer": "Hamari data protection policy ke guidelines follow karein."
        },
        {
          "id": 10,
          "question": "Kya terms platform ke use par restriction lagate hain?",
          "answer": "Haan, unpermitted use par restrictions hoti hain."
        }
      ]
    },    
    {
      "id": 4,
      "id_name": "Account",
      "title": "ACCOUNT",
      "md_pt": true,
      faq: [
        {
          "id": 1,
          "question": "Main apna account kaise create karoon?",
          "answer": "Sign-up page par apne details fill karke account banayein."
        },
        {
          "id": 2,
          "question": "Account creation free hai?",
          "answer": "Haan, account creation bilkul free hai."
        },
        {
          "id": 3,
          "question": "Agar main apna password bhool jaun to kya karoon?",
          "answer": "“Forgot Password” option ka use karein aur email reset karein."
        },
        {
          "id": 4,
          "question": "Main apne profile details kaise update karoon?",
          "answer": "Dashboard mein jaake details edit karein."
        },
        {
          "id": 5,
          "question": "Mera account deactivate hone par kya hoga?",
          "answer": "Aapka data safe rahega, lekin access restricted hoga."
        },
        {
          "id": 6,
          "question": "Main multiple accounts bana sakta hoon?",
          "answer": "Ek user ke liye ek account allowed hai."
        },
        {
          "id": 7,
          "question": "Kya mere account ka data secure rahega?",
          "answer": "Haan, hamare platform par data encryption use hoti hai."
        },
        {
          "id": 8,
          "question": "Main apne account ke notifications kaise manage karoon?",
          "answer": "Settings mein jaake notification preferences set karein."
        },
        {
          "id": 9,
          "question": "Kya mujhe account verification ke liye koi documents submit karne padenge?",
          "answer": "Haan, identity verification ke liye documents zaroori hote hain."
        },
        {
          "id": 10,
          "question": "Kya account deletion ke baad mera data permanently delete ho jata hai?",
          "answer": "Haan, account delete karne ke baad data permanently remove hota hai."
        }
      ]
    }
    
]

export default inner_faq_data;