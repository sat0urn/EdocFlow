import ServicePic1 from "../assets/service_pics/service1.png"
import ServicePic2 from "../assets/service_pics/service2.png"
import ServicePic3 from "../assets/service_pics/service3.png"
import ServicePic4 from "../assets/service_pics/service4.png"

import EmplContract from "../assets/pdfs/Employment_Contract.pdf"
import LeaseAgree from "../assets/pdfs/Lease_Agreement.pdf"
import LoanAgree from "../assets/pdfs/Loan_Agreement.pdf"
import NonDiscAgree from "../assets/pdfs/Non_Disclosure_Agreement.pdf"
import SalesContract from "../assets/pdfs/Sales_Contract.pdf"
import ServiceAgree from "../assets/pdfs/Service_Agreement.pdf"

export const advantageData = [{
    id: 0,
    bgColor: '#151516',
    textColor: 'white',
    title: 'Searchability',
    text: 'You can easily find your document by using keywords or metadata.',
    icon: 'fa-magnifying-glass',
    borderOn: true
  },
  {
    id: 1,
    bgColor: 'white',
    textColor: 'black',
    title: 'Efficiency',
    text: 'Say goodbye to paperwork hassles and hello to streamlined processes.',
    icon: 'fa-rocket',
    borderOn: false
  },
  {
    id: 2,
    bgColor: '#407BFF',
    textColor: 'white',
    title: 'Scalability',
    text: 'Grow confidently knowing our system adapts to your changing needs.',
    icon: 'fa-chart-simple',
    borderOn: false
  },
  {
    id: 3,
    bgColor: 'white',
    textColor: 'black',
    title: 'Automated Workflows',
    text: 'Automate document routing and approval processes for increased efficiency.',
    icon: 'fa-gear',
    borderOn: false
  },
  {
    id: 4,
    bgColor: 'white',
    textColor: 'black',
    title: 'Version Control',
    text: 'Ensure everyone has the latest document version, enhancing collaboration.',
    icon: 'fa-clock-rotate-left',
    borderOn: false
  },
  {
    id: 5,
    bgColor: '#151516',
    textColor: 'white',
    title: 'Collaboration',
    text: 'Foster teamwork with real-time editing and commenting features.',
    icon: 'fa-people-arrows',
    borderOn: true
  }
]

export const serviceData = [{
    id: 0,
    img: ServicePic1,
    title: "Creating Electronic Documents",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius",
    btnText: "create a document"
  },
  {
    id: 1,
    img: ServicePic2,
    title: "Signing Electronic Documents",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius",
    btnText: "sign documents"
  },
  {
    id: 2,
    img: ServicePic3,
    title: "Storing Electronic Documents",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius",
    btnText: "store documents"
  },
  {
    id: 3,
    img: ServicePic4,
    title: "Managing Electronic Documents",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur placerat posuere. Vestibulum tempor venenatis mauris vel pellentesque. Mauris blandit eros non orci mattis sodales. Donec eleifend arcu sit amet commodo varius",
    btnText: "manage documents"
  }
]

export const templates = [{
    id: 0,
    pdf: EmplContract,
    title: 'Employment_Contract'
  },
  {
    id: 1,
    pdf: LeaseAgree,
    title: 'Lease_Agreement'
  },
  {
    id: 2,
    pdf: LoanAgree,
    title: 'Loan_Agreement'
  },
  {
    id: 3,
    pdf: NonDiscAgree,
    title: 'Non_Disclosure_Agreement'
  },
  {
    id: 4,
    pdf: SalesContract,
    title: 'Sales_Contract'
  },
  {
    id: 5,
    pdf: ServiceAgree,
    title: 'Service_Agreement'
  }
]