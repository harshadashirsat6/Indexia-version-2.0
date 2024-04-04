const personalDetails = {
  dateOfBirth: "",
  panCardNum: "",
  residenceState: "",
  residenceCity: "",
  residencePincode: "",
  residenceType: "",
};
const incomeDetails = {
  employmentType: "",
  //general fields
  companyType: "",
  otherCompanyType: "",
  companyName: "",
  primaryBankAccount: "",
  otherPrimaryBankAccount: "",
  multipleBankAccounts: [],
  //salaried
  monthlyIncome: 0,
  salaryRecievedAs: "",
  //business
  gstNo: "",
  yearsInCurrentBusiness: "",
  businessState: "",
  businessCity: "",
  businessPincode: "",
  businessPlaceType: "",
  otherBusinessPlaceType: "",
  businessNature: "",
  otherBusinessNature: "",
  industryType: "",
  otherIndustryType: "",
  subIndustryType: "",
  previousYearTurnOver: 0,
  previous2yearTurnover: 0,
  previousYearNetProfit: 0,
  previous2yearNetIncome: 0,
  //profession
  profession: "",
  otherProfession: "",
};
const loanRequirements = {
  requiredLoanAmount: "",
  requiredLoanTenure: "",
};
const exisitingLoanRequirements = {
  existingEMI: 0,
  existingLoanAmount: "",
  existingLoanTenure: "",
  existingLoanExposure: [],
  existingLoanBankNames: [],
};
const collatoralPropertyInputs = {
  collateralOption: "",
  otherCollateralOptionType: "",
  collatoralPropertyState: "",
  collatoralPropertyCity: "",
  collatoralPropertyPincode: "",
  collatoralPropertyAge: 0,
  collatoralPropertyValue: 0,
};

// personal loan
export const personalLoanFormInputs = {
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//business loan
export const businessLoanFormInputs = {
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//home loan
export const homeLoanFormInputs = {
  newPropertyType: "",
  otherNewPropertyType: "",
  newPropertyAge: "",
  newPropertyState: "",
  newPropertyCity: "",
  newPropertyPincode: "",
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//loan against property
export const lapFormInputs = {
  ...collatoralPropertyInputs,
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

// balance transfer
export const balanceTransferFormInputs = {
  homeLoanTenure: "",
  homeLoanROI: "",
  lapTenure: "",
  lapROI: "",
  hlapTenure: "",
  hlapROI: "",
  topupAmount: "",
  //////
  typeOfBalanceTransfer: "",
  balanceTransferLoanTenure: "",
  transferPropertyValue: "",
  balanceTransferLoanAmount: "",
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//project loan
export const projectLoanFormInputs = {
  //project details
  projectObjective: "",
  projectDescription: "",
  scopeOfWorkandDeliverables: "",
  projectCost: "",
  projectType: "",
  otherProjectType: "",
  projectStartDate: "",
  expectedDateOfComletion: "",
  projectCompletionTime: "",
  ownInvestmentOnProject: "",
  projectState: "",
  projectCity: "",
  projectPincode: "",
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//car loan
export const carLoanFormInputs = {
  //vehicle details
  transmission: "",
  carManufacturer: "",
  carModel: "",
  buyCarType: "",
  //old car
  oldVehicleRegistrationYear: "",
  oldVehicleNumber: "",
  valueOfOldCar: "",
  carInsuranceNumber: "",
  //new car
  carOnroadPrice: "",
  carShowroomPrice: "",
  carInsuranceType: "",
  newCarRegistrationState: "",
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//education loan
export const educationLoanFormInputs = {
  //education details
  country: "",
  fieldOfStudy: "",
  universityName: "",
  instituteName: "",
  courseDuration: "", //in years
  educationCost: "",
  ...loanRequirements,
  ...collatoralPropertyInputs,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  //parent details
  parentRelation: "",
  parentName: "",
  parentEmail: "",
  parentConact: "",
  parentDob: "",
  parentPanCardNum: "",
  parentResidenceState: personalDetails.residenceState,
  parentResidenceCity: personalDetails.residenceCity,
  parentResidencePincode: personalDetails.residencePincode,
  parentResidenceStatus: personalDetails.residenceType,
  // personal details-student
  ...personalDetails,
};

//credit card
export const creditCardFromInputs = {
  anyActiveCreditCardStatus: "",
  existingCreditCardBankName: "",
  otherExistingCreditCardBankName: "",
  exisitingCreditCardLimit: "",
  newCreditCardBankName: "",
  otherNewCreditCardBankName: "",
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//commercial purchase
export const commercialPurchaseFormInputs = {
  newPropertyState: "",
  newPropertyCity: "",
  newPropertyPincode: "",
  propertyType: "",
  otherPropertyType: "",
  propertyValue: "",
  propertyAge: "",
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//working capital
export const workingCapitalFormInputs = {
  ...collatoralPropertyInputs,
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//lease rent discounting
export const lrdFormInputs = {
  leasePropertyValue: 0,
  leasePropertyDuration: "",
  monthlyIncomeThroughLease: "",
  totalAmountToBeReceivedFromLease: "",
  totalAnnualIncome: 0,
  leasePropertyAge: "",
  leasePropertyState: "",
  leasePropertyCity: "",
  leasePropertyPincode: "",
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//od-cc
export const odccLimitInputs = {
  ...collatoralPropertyInputs,
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

//loan against share
export const lasFormInputs = {
  companyShareName: "",
  valueOfOneShare: 1,
  shareQuantity: 1,
  totalSharePrice: 1,
  marektValue: "",
  ...loanRequirements,
  ...exisitingLoanRequirements,
  // income details
  ...incomeDetails,
  // personal details
  ...personalDetails,
};

export const inputs = {
  category: "",
  contact: "",
  employmentType: "Self-employed business",
  yearlyIncome: 0,
  monthlyIncome: 0,
  bank: "",
  employerName: "",
  employerType: "",
  loanAmount: "",
  loanTenure: "",
  name: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  panCardNum: "",
  state: "",
  city: "",
  pincode: "",
  residencyType: "Owned by self/spouse",
  incomeReceivedAs: "",
  primaryBankAccount: "",
  otherPrimaryBankAccount: "",
  multipleBankAccounts: [],
  existingEmi: 0,

  loanStartDate: "",
  existingLoanTenure: "",
  existingLoanAmount: "",
  // business
  compnayName: "",
  profession: "",
  otherProfession: "",
  registrationNumber: "",
  businessPlaceOwnershipType: "",
  currentBusinessState: "",
  currentBusinessCity: "",
  currentBusinessPincode: "",
  yearsInCurrentBusiness: "",
  YearsInBusinessOver5: 6,
  compnayType: "",
  businessNature: "",
  subIndustryType: "",
  industryType: "",
  otherIndustryType: "",
  companyStartDate: "",
  currentYearTurnOver: 0,
  previousYearTurnOver: 0,
  currentYearNetProfit: 0,
  previousYearNetProfit: 0,
  collateralOption: "",
  otherCollateralOptionType: "",
  otherBusinessPlaceType: "",
  collateralPropertyValue: "",
  // property
  newPropertyType: "",
  newHouseNumber: "",
  newPropertyLocality: "",
  newPropertyCity: "",
  newPropertyState: "",
  newPropertyPincode: "",
  propertyAge: "",
  propertyValue: "",
  // vehicle
  carManufacturer: "",
  carModel: "",
  manufacturingYear: "",
  vehicleVIN: "",
  transmission: "",
  buyCarType: "", //o, new
  oldCarRegistartionYear: "",
  oldCarVehicleNumber: "",
  carInsuranceNumber: "",
  valueOfOldCar: "",
  carOnroadPrice: "",
  carShowroomPrice: "",
  carInsuranceType: "",
  // education
  studentPancard: "",
  parentRelation: "",
  parentName: "",
  parentDob: "",
  country: "",
  fieldOfStudy: "",
  countryName: "",
  universityName: "",
  instituteName: "",
  enrollmentStatus: "",
  courseDuration: "",
  educationCost: "",
  // project loan
  projectType: "",
  otherProjectType: "",
  projectDescription: "",
  projectObjective: "",
  scopeOfWorkandDeliverables: "",
  projectBudget: "",
  projectStartDate: "",
  expectedDateOfComletion: "",
  projectState: "",
  projectCity: "",
  projectPincode: "",
  projectCost: "",
  ownInvestmentOnProject: "",
  projectCompletionTime: "",
  //credit card
  existingCreditCardStatus: "",
  existingCreditCardBankName: "",
  otherExistingCreditCardBankName: "",
  exisitingCreditCardLimit: "",
  newCreditCardBankName: "",
  otherNewCreditCardBankName: "",
  //BALANCE TRANSFER
  typeOfBalanceTransfer: "HL",
  homeLoanTenure: "",
  homeLoanROI: "",
  lapTenure: "",
  lapROI: "",
  topupAmount: "",
  transferPropertyValue: "",
  //working capital
  //LRD
  leasePropertyValue: "",
  leasePropertyDuration: "",
  monthlyIncomeThroughLease: 0,
  totalIncome: 0,
  totalAmountToBeReceivedFromLease: "",
  //loan against share
  companyShareName: "",
  valueOfOneShare: 0,
  shareQuantity: 0,
  totalSharePrice: 0,
  marektValue: "",
  //od-cc
  collatoralPropertyState: "",
  collatoralPropertyCity: "",
  collatoralPropertyPincode: "",
};
