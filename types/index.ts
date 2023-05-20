import { ReactElement } from "react"

export type FormStep = {
    title: string
    subtitle?: string
    form: ReactElement
}
export type FormStepState = {
    next: () => void
    back: () => void
    goTo: (n: number) => void
    currentIndex: number
    isFirst: boolean
    isLast: boolean
    currentStep: FormStep
}

export type PreviewableFile = File & {
    preview: string
}

export type Demand = {
    id?: string
    email: string
    lastName: string
    firstName: string
    gender: string
    birthDate: string
    cniNumber?: string
    entryNumber?: string
    birthPlace: string
    birthCountry: string
    nationality: string
    profession: string
    phone1: string
    phone2?: string
    homeAddress: string
    kindVisa?: string
    visaCategory?: string
    fromEmbassy: Boolean
    price: number
    previousStayDate: string
    entryDate: string
    residence: string
    duration: number
    depCountry: string
    destination: string
    subsistenceMean: string
    returnGuarantee: string
    tripReason: string

    numDocument: string
    passportIssueCountry: string
    passportIssueDate: string
    passportExpireDate: string

    token?: string
    expireLink?: Date
    statut?: string
    createdAt?: Date
    updatedAt?: Date

    passportProof?: any
    returnFlightTicketProof?: any
    yellowFeverVaccinationProof?: any
    invitationLetter?: any
    hotelBookingProof?: any
    passportSizePhoto?: any
}

export type DemandFiles = {
    passportProof?: PreviewableFile
    returnFlightTicketProof?: PreviewableFile
    yellowFeverVaccinationProof?: PreviewableFile
    invitationLetter?: PreviewableFile
    hotelBookingProof?: PreviewableFile
    passportSizePhoto?: PreviewableFile
}
export type DemandFilesErrors = {
    passportProof?: string
    returnFlightTicketProof?: string
    yellowFeverVaccinationProof?: string
    invitationLetter?: string
    hotelBookingProof?: string
    passportSizePhoto?: string
}
