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
            contractNo: {name: 'Contract No.', value: '', positions: {x: 375, y: 796}},
            date: {name: 'Date', value: '', positions: {x: 250, y: 698}},
            fullName: {name: 'Full Name', value: '', positions: {x: 400, y: 698}},
            companyName: {name: 'Company Name', value: '', positions: {x: 75, y: 670}},
            position: {name: 'Position', value: '', positions: {x: 95, y: 627}},
            salary: {name: 'Salary', value: '', positions: {x: 88, y: 585}},
            responsibilites: {name: 'Responsibilities', value: '', positions: {x: 89, y: 541}},
            startDate: {name: 'Start Date', value: '', positions: {x: 318, y: 500}},
            signDateCompany: {name: 'Sign Date Company', value: '', positions: {x: 258, y: 386}},
            signDateEmployee: {name: 'Sign Date Employee', value: '', positions: {x: 319, y: 343}}
        }
    },
    {
        id: 2,
        pdf: LeaseAgree,
        title: 'Lease Agreement',
        data: {
            contractNo: {name: 'Contract No.', value: '', positions: {x: 368, y: 798}},
            date: {name: 'Date', value: '', positions: {x: 387, y: 696}},
            landlordName: {name: 'Landlord Name', value: '', positions: {x: 46, y: 668}},
            tenantName: {name: 'Tenant Name', value: '', positions: {x: 320, y: 668}},
            address: {name: 'Address', value: '', positions: {x: 150, y: 626}},
            startDate: {name: 'Start Date', value: '', positions: {x: 267, y: 581}},
            endDate: {name: 'End Date', value: '', positions: {x: 425, y: 581}},
            rentAmount: {name: 'Rent Amount', value: '', positions: {x: 135, y: 540}},
            deposit: {name: 'Rent Amount', value: '', positions: {x: 210, y: 500}},
            signDateTenant: {name: 'Sign Tenant Date', value: '', positions: {x: 311, y: 426}},
            signDateLandlord: {name: 'Sign Landlord Date', value: '', positions: {x: 326, y: 384}}
        }
    },
    {
        id: 3,
        pdf: LoanAgree,
        title: 'Loan Agreement',
        data: {
            contractNo: {name: 'Contract No.', value: '', positions: {x: 368, y: 798}},
            date: {name: 'Date', value: '', positions: {x: 388, y: 696}},
            borrowerName: {name: 'Borrower Name', value: '', positions: {x: 47, y: 668}},
            lenderName: {name: 'Lender Name', value: '', positions: {x: 262, y: 668}},
            principalAmount: {name: 'Principal Amount', value: '', positions: {x: 143, y: 625}},
            interestRate: {name: 'Interest Rate', value: '', positions: {x: 115, y: 583}},
            installmentAmount: {name: 'Installment Amount', value: '', positions: {x: 107, y: 513}},
            signDateBorrower: {name: 'Sign Borrower Date', value: '', positions: {x: 323, y: 470}},
            signDateLender: {name: 'Sign Lender Date', value: '', positions: {x: 315, y: 428}}
        }
    },
    {
        id: 4,
        pdf: NonDiscAgree,
        title: 'Non Disclosure Agreement',
        data: {
            contractNo: {name: 'Contract No.', value: '', positions: {x: 396, y: 796}},
            date: {name: 'Date', value: '', positions: {x: 401, y: 696}},
            partyOne: {name: 'Full Name', value: '', positions: {x: 47, y: 668}},
            partyTwo: {name: 'Company Name', value: '', positions: {x: 268, y: 668}},
            startDate: {name: 'Responsibilities', value: '', positions: {x: 283, y: 513}},
            endDate: {name: 'Start Date', value: '', positions: {x: 405, y: 513}},
            signDatePartyOne: {name: 'Sign Party One Date', value: '', positions: {x: 463, y: 470}},
            signDatePartyTwo: {name: 'Sign Party Two Date', value: '', positions: {x: 463, y: 428}}
        }
    },
    {
        id: 5,
        pdf: SalesContract,
        title: 'Sales Contract',
        data: {
            contractNo: {name: 'Contract No.', value: '', positions: {x: 362, y: 795}},
            date: {name: 'Date', value: '', positions: {x: 373, y: 696}},
            buyerName: {name: 'Buyer Name', value: '', positions: {x: 45, y: 668}},
            sellerName: {name: 'Seller Name', value: '', positions: {x: 257, y: 668}},
            description: {name: 'Description', value: '', positions: {x: 45, y: 598}},
            goodsName: {name: 'Goods Name', value: '', positions: {x: 243, y: 555}},
            totalPrice: {name: 'Total Price', value: '', positions: {x: 403, y: 555}},
            deliveryDate: {name: 'Delivery Date', value: '', positions: {x: 472, y: 513}},
            location: {name: 'Location', value: '', positions: {x: 42, y: 484}},
            signDateBuyer: {name: 'Sign Buyer Date', value: '', positions: {x: 305, y: 441}},
            signDateSeller: {name: 'Sign Seller Date', value: '', positions: {x: 307, y: 399}}
        }
    },
    {
        id: 6,
        pdf: ServiceAgree,
        title: 'Service Agreement',
        data: {
            contractNo: {name: 'Contract No.', value: '', positions: {x: 373, y: 796}},
            date: {name: 'Date', value: '', positions: {x: 368, y: 696}},
            clientName: {name: 'Client Name', value: '', positions: {x: 45, y: 668}},
            serviceName: {name: 'Service Name', value: '', positions: {x: 255, y: 668}},
            scope: {name: 'Scope', value: '', positions: {x: 143, y: 625}},
            paymentDetails: {name: 'Payment Details', value: '', positions: {x: 133, y: 583}},
            startDate: {name: 'Start Date', value: '', positions: {x: 337, y: 540}},
            endDate: {name: 'Start Date', value: '', positions: {x: 38, y: 513}},
            signDateClient: {name: 'Sign Client Date', value: '', positions: {x: 458, y: 470}},
            signDateProvider: {name: 'Sign Provider Date', value: '', positions: {x: 458, y: 428}}
        }
    }
]