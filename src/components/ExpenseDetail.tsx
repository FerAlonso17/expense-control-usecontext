import { useMemo } from "react"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { formatDate } from "../helpers"
import 'react-swipeable-list/dist/styles.css'
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    spent: Expense
}
export default function ExpenseDetail({ spent }: ExpenseDetailProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === spent.category)[0], [spent])

    const leadingActions=()=>(
        <LeadingActions>
            <SwipeAction
                onClick={()=>dispatch({type:'get-expense-by-id',payload:{id:spent.id}})}
            >
                Update
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions=()=>(
        <TrailingActions>
            <SwipeAction
                onClick={()=>dispatch({type:'remove-expense',payload:{id:spent.id}})}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-zinc-300 border-4 border-double border-zinc-400 mb-2 p-10 w-full border-black-700 flex gap-5 items-center">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icon spent"
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p >{spent.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(spent.date!.toString())}</p>
                        {/* el signo de exclamación es para garantizar que el valor sí existe */}
                    </div>
                    <AmountDisplay amount={spent.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
