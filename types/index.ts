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

export type Demand = {
    id?: string
    email: string
    lastName: string
    firstName: string
    gender: string
    birthDate: string
    birthPlace: string
    birthCountry: string
    nationality: string
    profession: string
    phone1: string
    phone2?: string
    homeAddress: string
    kindVisa?: string
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
}
