import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"


function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-center font-black text-4xl text-white">
          EXPENSE PLANNER
        </h1>
      </header>
      {!isValidBudget ?
        (
          <div>
            <img src="/fondo.jpg" alt="" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-20" />

            <div className=" flex flex-col md:flex-row min-h-[400px] items-center md:w-3/4 max-w-5xl mx-auto gap-2 ">
              <h2 className="md:w-1/2 mt-10 md:mx-10 text-3xl font-extrabold text-blue-600 text-center">Don't know why you run out of money so easily?, this system will help you keep track of your expenses.</h2>
              <BudgetForm />
            </div>
          </div>
        ) :
        (
          <div className="max-w-3xl mx-auto bg-blue-200 shadow-lg rounded-4xl mt-10 p-10">
            <BudgetTracker />
          </div>
        )
      }
      {/* <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? 
          <BudgetTracker/> : 
          <BudgetForm/>}
      </div> */}
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
