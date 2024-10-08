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