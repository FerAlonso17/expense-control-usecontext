import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount,setPreviousAmount] = useState(0)

    const { dispatch,state,remainingBudget } = useBudget()

    useEffect(()=>{
        if (state.updatingId) {
            const updatingExpense = state.expenses.filter(exp=>exp.id===state.updatingId)[0]
            setExpense(updatingExpense)
            setPreviousAmount(updatingExpense.amount)
        }
    },[state.updatingId])

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)//PARA DETECTAR SI SE ESTÁ ESCRIBIENDO EN AMOUNT, DEVUELVE TRUE O FALSE
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //validar
        if (Object.values(expense).includes('')) {
            setError('All fields are required')
            return
        }

        //Validar q no me pase del limite
        if ((expense.amount-previousAmount)>remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        //agregar o actualizar gasto
        if (state.updatingId) {
            dispatch({type:'update-expense',payload:{expense:{id:state.updatingId,...expense}}})
        }else{
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        //reiniciar state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className='text-center text-2xl font-black border-b-4 border-blue-500 py-2'
            >
                {state.updatingId ? 'UPDATE SPENT' : 'NEW SPENT'}
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className='text-xl'
                >
                    Name spent:
                </label>
                <input
                    type="text"
                    id='expenseName'
                    placeholder='Add the spent name'
                    className='bg-slate-100 p-2'
                    name='expenseName'
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className='text-xl'
                >
                    Quantity:
                </label>
                <input
                    type="number"
                    id='amount'
                    placeholder='Add the quantity of spent: ex. 300'
                    className='bg-slate-100 p-2'
                    name='amount'
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className='text-xl'
                >
                    Category:
                </label>
                <select
                    id='category'
                    className='bg-slate-100 p-2'
                    name='category'
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor=""
                    className='text-xl'
                >
                    Date spent:
                </label>
                <DatePicker
                    className='bg-slate-100 p-2 border-0'
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white hover:text-blue-900 font-bold rounded-lg"
                value={state.updatingId?'Save changes':'Register spent'}
            />
        </form>
    )
}
