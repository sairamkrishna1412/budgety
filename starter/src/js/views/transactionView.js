import {elements} from './base';

export const getInput = () => {
    const type = elements.transactionType.value;
    const description = elements.description.value;
    const value = parseFloat(elements.value.value);
    return {
        type,
        description,
        value
    } 
}

export const addTransaction = (transaction,type) => {
    let targetList,html;
    if(type === 'inc'){
        targetList=elements.incomeList;
        html = `
            <div class="item clearfix" id="inc-${transaction.id}">
                <div class="item__description">${transaction.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(transaction.value,type)}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                    </div>
            </div>
        `
    }
    else if(type === 'exp'){
        targetList=elements.expenseList;
        html = `
            <div class="item clearfix" id="exp-${transaction.id}">
                <div class="item__description">${transaction.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${formatNumber(transaction.value,type)}</div>
                    <div class="item__percentage">21%</div> 
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
        `
    }
    targetList.insertAdjacentHTML("beforeend",html);
}
export const deleteTransaction = (fullItemId)=>{
    let element = document.getElementById(fullItemId);
    element.parentElement.removeChild(element);
}

export const clearInput = () => {
    elements.description.value='';
    elements.value.value='';
    elements.description.focus();
}

export const updateDate = () => {
    let months;
    months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today= new Date();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    elements.monthText.textContent = month + ' ' + year;
}
const putCommas = (num) => {
    let len=num.length;
    if(len>3){
        let str="",sArr=[],commaCount=0,currentComma;
        for(let i=len;i>0;i--){
            if(commaCount==0 && i==len-3){
                sArr.unshift(",");
                sArr.unshift(num[i-1]);
                commaCount++;
                currentComma=i;
            }else if(commaCount>0 && i==currentComma-3){
                sArr.unshift(",");
                sArr.unshift(num[i-1]);
                commaCount++;
                currentComma=i;
            }
            else{
                sArr.unshift(num[i-1]);
            }
        }
        str = sArr.join("");
        return str;
    }else{
        return num;
    }
}
const formatNumber = (num,type) => {
    let numSplit,int,dec;
    num=Math.abs(num);
    num=num.toFixed(2);
    numSplit=num.split(".");
    int=numSplit[0];
    dec=numSplit[1];
    int=putCommas(int);
    return (type === "inc" ? "+" : "-") + " " +int+"."+dec;
}
export const updateBudget = (obj) => {
    const type = (obj.budget>0)?'inc':'exp'; 
    elements.availableBudget.textContent=formatNumber(obj.budget,type);
    elements.totalIncome.textContent=formatNumber(obj.totalInc,'inc');
    elements.totalExpense.textContent=formatNumber(obj.totalExp,'exp');
    if(obj.totalInc>0){
        elements.expTotalPercentage.textContent=obj.percentage+" %";
    }else{
        elements.expTotalPercentage.textContent="---";
    }
    
}
const forEachNodeList=function(list,callback){
    for(var i=0;i<list.length;i++){
        callback(list[i],i);
    }
}
export const updatePercentages = (percentages) => {
    const percentLabels = document.querySelectorAll('.item__percentage');
    // console.log(percentLabels);
    forEachNodeList(percentLabels,function(current,index){
        if(percentages[index]>=0){
            current.textContent=percentages[index] + " %";
        }else{
            current.textContent="---";
        }
    });
}