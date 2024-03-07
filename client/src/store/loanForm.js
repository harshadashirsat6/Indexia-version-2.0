import { createSlice } from '@reduxjs/toolkit'
// form inputs=> total 14 loan forms
import { personalLoanFormInputs } from '../configs/inputs'
import { businessLoanFormInputs } from '../configs/inputs'
import { homeLoanFormInputs } from '../configs/inputs'
import { lapFormInputs } from '../configs/inputs'
import { balanceTransferFormInputs } from '../configs/inputs'
import { projectLoanFormInputs } from '../configs/inputs'
import { carLoanFormInputs } from '../configs/inputs'
import { educationLoanFormInputs } from '../configs/inputs'
import { creditCardFromInputs } from '../configs/inputs'
import { commercialPurchaseFormInputs } from '../configs/inputs'
import { workingCapitalFormInputs } from '../configs/inputs'
import { lrdFormInputs } from '../configs/inputs'
import { odccLimitInputs } from '../configs/inputs'
import { lasFormInputs } from '../configs/inputs'

const initialState = {
    plForm: personalLoanFormInputs,
    blForm: businessLoanFormInputs,
    hlForm: homeLoanFormInputs,
    lapForm: lapFormInputs,
    btfForm: balanceTransferFormInputs,
    projectlForm: projectLoanFormInputs,
    carlForm: carLoanFormInputs,
    edulForm: educationLoanFormInputs,
    ccardForm: creditCardFromInputs,
    commpurchaseForm: commercialPurchaseFormInputs,
    wcapForm: workingCapitalFormInputs,
    lrdForm: lrdFormInputs,
    odccForm: odccLimitInputs,
    lasForm: lasFormInputs,
}

const loanFormSlice = createSlice({
    name: 'loanForm',
    initialState,
    reducers: {
        setPlForm: (state, { payload }) => {
            state.plForm = payload
        },
        setBlForm: (state, { payload }) => {
            state.plForm = payload
        },
        setHlForm: (state, { payload }) => {
            state.plForm = payload
        },
        setLapForm: (state, { payload }) => {
            state.plForm = payload
        },
        setBtfForm: (state, { payload }) => {
            state.plForm = payload
        },
        setProjectlForm: (state, { payload }) => {
            state.plForm = payload
        },
        setCarlForm: (state, { payload }) => {
            state.plForm = payload
        },
        setEdulForm: (state, { payload }) => {
            state.plForm = payload
        },
        setCCardForm: (state, { payload }) => {
            state.plForm = payload
        },
        setCommpurchaseForm: (state, { payload }) => {
            state.plForm = payload
        },
        setWcapForm: (state, { payload }) => {
            state.plForm = payload
        },
        setLrdForm: (state, { payload }) => {
            state.plForm = payload
        },
        setOdccForm: (state, { payload }) => {
            state.plForm = payload
        },
        setLasForm: (state, { payload }) => {
            state.plForm = payload
        }
    }
})

export default loanFormSlice.reducer
export const { setPlForm,
    setBlForm,
    setHlForm,
    setLapForm,
    setBtfForm,
    setProjectlForm,
    setCarlForm,
    setEdulForm,
    setCCardForm,
    setCommpurchaseForm,
    setWcapForm,
    setLrdForm,
    setOdccForm,
    setLasForm } = loanFormSlice.actions














