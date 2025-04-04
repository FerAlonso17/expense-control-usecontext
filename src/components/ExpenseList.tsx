import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'

export default function ExpenseList() {

    const { state } = useBudget()

    
    const filteredExpenses = state.currentCategory ? state.expenses.filter(exp=>exp.category===state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
    
    return (
        <div className="mt-10 bg-zinc-200 shadow-lg rounded-4xl p-10">
            {isEmpty ?
                <p className="text-gray-600 text-2xl font-bold">There aren't expenses</p> :
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">
                        Expenses List
                    </p>
                    {filteredExpenses.map(spent => (
                        <ExpenseDetail
                            key={spent.id}
                            spent={spent}
                        />
                    ))}
                </>
            }
        </div>
    )
}
