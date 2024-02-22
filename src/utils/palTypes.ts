import {SelectOption} from "../components/Select/types";

export const palActive: SelectOption[] = [
    {label: 'Brak treningów / jeden lekki', value: 1.2},
    {label: 'Pojedyncze treningi', value: 1.4},
    {label: '2-3 treningi w tygodniu', value: 1.6},
    {label: '4-6 trenigów w tygodniu', value: 1.8},
    {label: 'Codzienne treningi', value: 2.0},
]
export const palPassive: SelectOption[] = [
    {label: 'Bardzo niska', value: 1.2},
    {label: 'Niska aktywność / praca biurowa', value: 1.4},
    {label: 'Średnia aktywność / praca mieszana', value: 1.6},
    {label: 'Wysoka aktywność / praca fizyczna', value: 1.8},
    {label: 'Bardzo wysoka aktywność / ciężka praca fizyczna', value: 2.0},
]
export const userGoals: SelectOption[] = [
    {label: 'Chcę schudnąć 🔥', value: 'burn'},
    {label: 'Chcę zdrowo jeść ❤', value: 'balance'},
    {label: 'Chcę budować mięśnie 💪', value: 'surplus'}
]