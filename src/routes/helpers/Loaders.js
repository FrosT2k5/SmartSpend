import { getAllExpenses, getAllInvestments, getAllTransactions, getUser } from '../../api/apiutils';

export async function dashboardLoader() {
    const userData  = await getUser();
    let investments, transactions, expenses;

    if (userData?.username){    
        investments = await getAllInvestments();
        transactions = await getAllTransactions();
        expenses = await getAllExpenses();
    }

    const returnData = { userData, investments, transactions, expenses };
    console.log(returnData); //TODO: Remove this after debugging done
    return returnData;
}

export async function expenseLoader() {
    const userData  = await getUser();
    let expenses;

    if (userData?.username){    
        expenses = await getAllExpenses();
    }

    const returnData = { userData, expenses };
    return returnData;
}

export async function investmentLoader() {
    const userData  = await getUser();
    let investments;

    if (userData?.username){    
        investments = await getAllInvestments();
    }

    const returnData = { userData, investments };
    return returnData;
}