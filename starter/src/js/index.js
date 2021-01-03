import {
    Transaction,
    dataOperations,
    data,
    Expense,
    Income,
} from "./models/Transaction";
import * as transactionView from "./views/transactionView";
import { elements } from "./views/base";

/**
 * ------ON START-------------
 */
window.onload = () => {
    console.log("start ra bujji");
    //update date  
    transactionView.updateDate();
    //make budget total Income & expense 0
    transactionView.updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
    });
};
// const init = () =>{
//     console.log('start ra bujji');
//     //update date
//     transactionView.updateDate();
//     //make budget total Income & expense 0
// }
// init();

/* 
-------NEW TRANSACTION--------------
*/
const state = {};

const newTransaction = () => {
    //get input from user
    const input = transactionView.getInput();
    //if input not empty create new transaction object
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        state.transaction = new Transaction(
            input.type,
            input.description,
            input.value
        );
        const newItem = state.transaction.addItem();
        //add to corresponding list
        transactionView.addTransaction(newItem, input.type);

        //clear input fields
        transactionView.clearInput();

        //updating budget
        updateBudget();

        //update percentages
        updatePercentages();
    }
};
const updateBudget = () => {
    state.transaction.updateBudget();
    const budget = state.transaction.returnBudget();
    transactionView.updateBudget(budget);
};
const updatePercentages = () => {
    //calculate percentages
    dataOperations.calculatePercentages();
    //return percentages
    const percentages = dataOperations.returnPercentages();
    //update ui percentages
    transactionView.updatePercentages(percentages);
};

elements.submitButton.addEventListener("click", () => {
    newTransaction();
});
document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 || e.which === 13) {
        newTransaction();
    }
});

const deleteTransaction = (e) => {
    //get item type and id
    let fullItemId, splitItem, itemId, itemType;
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);
    fullItemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (fullItemId) {
        //delete item from data
        splitItem = fullItemId.split("-");
        itemType = splitItem[0];
        itemId = parseFloat(splitItem[1]);
        dataOperations.deleteItem(itemType, itemId);

        //delete item from ui
        transactionView.deleteTransaction(fullItemId);

        //update budget
        updateBudget();

        //update percentages
        updatePercentages();
    }
};

elements.container.addEventListener("click", (e) => {
    deleteTransaction(e);
});

// const newTrans = new Transaction('inc','stock',1000);
// newTrans.addItem();
// console.log(newTrans);
// const newTrans = new Transaction('inc','stock',1000);
// newTrans.addItem();
// console.log(newTrans);

// const newTrans2 = new Transaction('exp','water',10);
// newTrans2.addItem();
// console.log(newTrans2);

// console.log(data);
// elements.submitButton.addEventListener('click',e => {
//     controlAddItem();
// })
