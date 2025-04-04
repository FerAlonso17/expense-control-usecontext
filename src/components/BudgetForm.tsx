import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget,setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setBudget(+e.target.value)
    }

    const isValid=useMemo(()=>{
        return isNaN(budget) || budget<=0
    },[budget])

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'add-budget',payload:{budget}})
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-5 md:w-1/2 md:mx-10 p-7 backdrop-brightness-75 rounded-3xl">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl font-bold text-blue-800 text-center">
                    Enter an amount of money
                </label>
                <input 
                    type="number"
                    id="budget"
                    placeholder="Define your budget"
                    value={budget}
                    onChange={handleChange}
                    name="budget"
                    className="w-full bg-white border border-gray-200 p-2 rounded-xl text-center"
                />
            </div>
            <input 
                type="submit"
                value='Define budget'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full text-white font-black p-2 disabled:opacity-35"
                disabled={isValid}
            />
        </form>
    )
}
