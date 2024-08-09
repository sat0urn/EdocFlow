import EmplContract from "../assets/pdfs/Employment_Contract.pdf";
import LeaseAgree from "../assets/pdfs/Lease_Agreement.pdf";
import LoanAgree from "../assets/pdfs/Loan_Agreement.pdf";
import NonDiscAgree from "../assets/pdfs/Non_Disclosure_Agreement.pdf";
import SalesContract from "../assets/pdfs/Sales_Contract.pdf";
import ServiceAgree from "../assets/pdfs/Service_Agreement.pdf";

export const allDocFormData = [
  {
    id: 1,
    pdf: EmplContract,
    title: 'Employee Contract',
    data: {
      contractNo: {type: 'number', name: 'Contract No.', value: '', positions: {x: 375, y: 796}},
      date: {type: 'date', name: 'Date', value: '', positions: {x: 250, y: 698}},
      fullName: {type: 'text', name: 'Full Name', value: '', positions: {x: 400, y: 698}},
      companyName: {type: 'text', name: 'Company Name', value: '', positions: {x: 75, y: 670}},
      position: {type: 'text', name: 'Position', value: '', positions: {x: 95, y: 627}},
      salary: {type: 'number', name: 'Salary', value: '', positions: {x: 88, y: 585}},
      responsibilites: {type: 'text', name: 'Responsibilities', value: '', positions: {x: 89, y: 541}},
      startDate: {type: 'date', name: 'Start Date', value: '', positions: {x: 318, y: 500}},
      signDateCompany: {type: 'date', name: 'Sign Date Company', value: '', positions: {x: 258, y: 386}},
      signDateEmployee: {type: 'date', name: 'Sign Date Employee', value: '', positions: {x: 319, y: 343}}
    }
  },
  {
    id: 2,
    pdf: LeaseAgree,
    title: 'Lease Agreement',
    data: {
      contractNo: {type: 'number', name: 'Contract No.', value: '', positions: {x: 368, y: 798}},
      date: {type: 'date', name: 'Date', value: '', positions: {x: 387, y: 696}},
      landlordName: {type: 'text', name: 'Landlord Name', value: '', positions: {x: 46, y: 668}},
      tenantName: {type: 'text', name: 'Tenant Name', value: '', positions: {x: 320, y: 668}},
      address: {type: 'text', name: 'Address', value: '', positions: {x: 150, y: 626}},
      startDate: {type: 'date', name: 'Start Date', value: '', positions: {x: 267, y: 581}},
      endDate: {type: 'date', name: 'End Date', value: '', positions: {x: 425, y: 581}},
      rentAmount: {type: 'number', name: 'Rent Amount', value: '', positions: {x: 135, y: 540}},
      deposit: {type: 'number', name: 'Deposit', value: '', positions: {x: 210, y: 500}},
      signDateTenant: {type: 'date', name: 'Sign Tenant Date', value: '', positions: {x: 311, y: 426}},
      signDateLandlord: {type: 'date', name: 'Sign Landlord Date', value: '', positions: {x: 326, y: 384}}
    }
  },
  {
    id: 3,
    pdf: LoanAgree,
    title: 'Loan Agreement',
    data: {
      contractNo: {type: 'number', name: 'Contract No.', value: '', positions: {x: 368, y: 798}},
      date: {type: 'date', name: 'Date', value: '', positions: {x: 388, y: 696}},
      borrowerName: {type: 'text', name: 'Borrower Name', value: '', positions: {x: 47, y: 668}},
      lenderName: {type: 'text', name: 'Lender Name', value: '', positions: {x: 262, y: 668}},
      principalAmount: {type: 'number', name: 'Principal Amount', value: '', positions: {x: 143, y: 625}},
      interestRate: {type: 'text', name: 'Interest Rate', value: '', positions: {x: 115, y: 583}},
      installmentAmount: {type: 'number', name: 'Installment Amount', value: '', positions: {x: 107, y: 513}},
      signDateBorrower: {type: 'date', name: 'Sign Borrower Date', value: '', positions: {x: 323, y: 470}},
      signDateLender: {type: 'date', name: 'Sign Lender Date', value: '', positions: {x: 315, y: 428}}
    }
  },
  {
    id: 4,
    pdf: NonDiscAgree,
    title: 'Non Disclosure Agreement',
    data: {
      contractNo: {type: 'number', name: 'Contract No.', value: '', positions: {x: 396, y: 796}},
      date: {type: 'date', name: 'Date', value: '', positions: {x: 401, y: 696}},
      partyOne: {type: 'text', name: 'Full Name', value: '', positions: {x: 47, y: 668}},
      partyTwo: {type: 'text', name: 'Company Name', value: '', positions: {x: 268, y: 668}},
      startDate: {type: 'number', name: 'Responsibilities', value: '', positions: {x: 283, y: 513}},
      endDate: {type: 'date', name: 'Start Date', value: '', positions: {x: 405, y: 513}},
      signDatePartyOne: {type: 'date', name: 'Sign Party One Date', value: '', positions: {x: 463, y: 470}},
      signDatePartyTwo: {type: 'date', name: 'Sign Party Two Date', value: '', positions: {x: 463, y: 428}}
    }
  },
  {
    id: 5,
    pdf: SalesContract,
    title: 'Sales Contract',
    data: {
      contractNo: {type: 'number', name: 'Contract No.', value: '', positions: {x: 362, y: 795}},
      date: {type: 'date', name: 'Date', value: '', positions: {x: 373, y: 696}},
      buyerName: {type: 'text', name: 'Buyer Name', value: '', positions: {x: 45, y: 668}},
      sellerName: {type: 'text', name: 'Seller Name', value: '', positions: {x: 257, y: 668}},
      description: {type: 'text', name: 'Description', value: '', positions: {x: 45, y: 598}},
      goodsName: {type: 'text', name: 'Goods Name', value: '', positions: {x: 243, y: 555}},
      totalPrice: {type: 'number', name: 'Total Price', value: '', positions: {x: 403, y: 555}},
      deliveryDate: {type: 'date', name: 'Delivery Date', value: '', positions: {x: 472, y: 513}},
      location: {type: 'text', name: 'Location', value: '', positions: {x: 42, y: 484}},
      signDateBuyer: {type: 'date', name: 'Sign Buyer Date', value: '', positions: {x: 305, y: 441}},
      signDateSeller: {type: 'date', name: 'Sign Seller Date', value: '', positions: {x: 307, y: 399}}
    }
  },
  {
    id: 6,
    pdf: ServiceAgree,
    title: 'Service Agreement',
    data: {
      contractNo: {type: 'number', name: 'Contract No.', value: '', positions: {x: 373, y: 796}},
      date: {type: 'date', name: 'Date', value: '', positions: {x: 368, y: 696}},
      clientName: {type: 'text', name: 'Client Name', value: '', positions: {x: 45, y: 668}},
      serviceName: {type: 'text', name: 'Service Name', value: '', positions: {x: 255, y: 668}},
      scope: {type: 'text', name: 'Scope', value: '', positions: {x: 143, y: 625}},
      paymentDetails: {type: 'text', name: 'Payment Details', value: '', positions: {x: 133, y: 583}},
      startDate: {type: 'date', name: 'Start Date', value: '', positions: {x: 337, y: 540}},
      endDate: {type: 'date', name: 'End Date', value: '', positions: {x: 38, y: 513}},
      signDateClient: {type: 'date', name: 'Sign Client Date', value: '', positions: {x: 458, y: 470}},
      signDateProvider: {type: 'date', name: 'Sign Provider Date', value: '', positions: {x: 458, y: 428}}
    }
  }
]