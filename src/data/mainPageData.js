import ServicePic1 from "../assets/service_pics/service1.png"
import ServicePic2 from "../assets/service_pics/service2.png"
import ServicePic3 from "../assets/service_pics/service3.png"
import ServicePic4 from "../assets/service_pics/service4.png"

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
  desc: "Efficiently create electronic documents with our streamlined tools. Our platform offers user-friendly templates, customizable fields, and a seamless interface to ensure your documents are professionally crafted and ready for any purpose. Save time and enhance productivity by generating digital documents quickly and accurately.",
  btnText: "create a document"
},
  {
    id: 1,
    img: ServicePic2,
    title: "Signing Electronic Documents",
    desc: "Securely sign your electronic documents with our advanced digital signature solutions. Our platform integrates seamlessly with NCALayer and the SIGEX.kz API, allowing multiple signatures and QR code verification. Ensure the authenticity and integrity of your documents with ease and compliance.",
    btnText: "sign documents"
  },
  {
    id: 2,
    img: ServicePic3,
    title: "Storing Electronic Documents",
    desc: "Safely store your electronic documents in our robust and encrypted digital storage system. Our platform provides reliable and secure storage solutions, ensuring your documents are easily accessible and protected against unauthorized access. Manage your document repository with confidence and peace of mind.",
    btnText: "store documents"
  },
  {
    id: 3,
    img: ServicePic4,
    title: "Managing Electronic Documents",
    desc: "Streamline your document management processes with our EDMS. Organize, track, and retrieve your documents effortlessly, while maintaining version control and ensuring regulatory compliance. Enhance your workflow efficiency and document governance with our powerful management tools.",
    btnText: "manage documents"
  }
]