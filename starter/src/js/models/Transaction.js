import { elements } from "../views/base";

export class Transaction{
    constructor(type,description,value){
        this.type=type;
        this.description=description;
        this.value=value
    }
    addItem (){
        let newItem,ID;
        if(data.allItems[this.type].length === 0){
            ID=0;
        }else{
            ID=data.allItems[this.type][data.allItems[this.type].length - 1].id + 1;
        }

        if(this.type === 'inc'){
            newItem = new Income(ID, this.description,this.value);
        }
        else if(this.type === 'exp'){
            newItem = new Expense(ID, this.description,this.value)
            
        }
        data.allItems[this.type].push(newItem);
        return newItem;
    }
    updateBudget(){
        dataOperations.calculateTotal('inc');
        dataOperations.calculateTotal('exp');
        data.budget = data.totals['inc'] - data.totals['exp'];
        if(data.totals.inc > 0){
            data.percentage = Math.round(((data.totals.exp/data.totals.inc)*100)*10)/10;
        }else{
            data.percentage=-1;
        }
    }
    returnBudget(){
        return{
            budget : data.budget,
            totalInc : data.totals.inc,
            totalExp : data.totals.exp,
            percentage : data.percentage
        }
    }
 
};

export class Income{
    constructor(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }
};
export class Expense{
    constructor(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }
    calculatePercentage(){
        if(data.totals.inc > 0){
            this.percentage = Math.round((this.value/data.totals.inc)*100);
        }else{
            this.percentage=-1;
        }
    }
    returnPercentage(){
        return this.percentage;
    }
};
export let data= {
    allItems : {
        inc : [],
        exp : []
    },
    totals:{
        inc : 0,
        exp : 0
    },
    budget:0,
    percentage:-1
}
export const dataOperations = {
    deleteItem:(type,id) => {
        data.allItems[type].forEach((element,index) => {
            if(element.id === id){
                data.allItems[type].splice(index,1);
            }
        });
    },
    calculatePercentages : () => {
        data.allItems.exp.forEach((element)=>{
            element.calculatePercentage();
        })
    },
    returnPercentages :() => {
        let percentages = data.allItems.exp.map(ele => ele.returnPercentage());
        return percentages;
    },
    calculateTotal:(type)=>{
        let sum=0;
        data.allItems[type].forEach(element => {
            sum+=element.value;
        });
        data.totals[type] = sum;
    }
}