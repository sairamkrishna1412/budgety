var budgetController = (function (){
    var Expense=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    }
    Expense.prototype.calculatePercentage=function(){
        if(data.totals.inc>0){
            this.percentage=Math.round((this.value/data.totals.inc)*100);
        }else{
            this.percentage=-1;
        }
    }
    Expense.prototype.returnPercentage=function(){
        return this.percentage;
    }

    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    }

    var calculateTotal=function(type){
        var sum=0;
        data.allItems[type].forEach(function(current){
            sum+=current.value;
        });
        data.totals[type]=sum;
    }

    var data={
        allItems:{
            inc:[],
            exp:[]
        },
        totals:{
            inc:0,
            exp:0
        },
        budget:0,
        percentage:-1
    }

   return{
        addItem:function(type,description,value){
           var ID,newItem;
           if(data.allItems[type].length===0){
            ID=0;
           }else{
            ID=data.allItems[type][data.allItems[type].length-1].id+1;
           }

           if(type==="inc"){
                newItem=new Income(ID,description,value);
           }else if(type==="exp"){
                newItem=new Expense(ID,description,value);
           }
           data.allItems[type].push(newItem);
           return newItem;
       },
       removeItem:function(type,id){
            var ids,index;
            ids=data.allItems[type].map(function(current){
                return current.id;
            })
            index=ids.indexOf(id);
            if(index!==-1){
            data.allItems[type].splice(index,1);
            }
       },
       caluculateBudget:function(){
           //1.calculate totals
            calculateTotal('inc');
            calculateTotal('exp');
           //2.calculate budget
            data.budget=data.totals['inc'] - data.totals['exp'];
           //3.calculate percentages
           if(data.totals.inc>0){
            data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
           }else{
               data.percentage=0;
           }
           
       },
       returnBudget:function(){
            return{
                budget:data.budget,
                percentage:data.percentage,
                totalInc:data.totals.inc,
                totalEXp:data.totals.exp
            };
       },
       calculatePercentages:function(){
           data.allItems.exp.forEach(function(cur){
               cur.calculatePercentage();
           })
       },
       returnPercentages:function(){
            var expPercentages=data.allItems.exp.map(function(cur){
                return cur.returnPercentage();
            })
            return expPercentages;
       },
       testing:function(){
           console.log(data);
       }
   }
})();

var UIController=(function(){
    var DOMStrings={
        input_type: ".add__type",
        inputDescription: ".add__description",
        inputValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetValue:'.budget__value',
        budgetIncomeValue:'.budget__income--value',
        budgetExpenseValue:'.budget__expenses--value',
        budgetExpensePercentage:'.budget__expenses--percentage',
        container:'.container',
        expPercentageLabel:'.item__percentage',
        dateLabel:'.budget__title--month'
    }
    var formatNumber=function(num,type){
        var int,numSplit,dec;
        num=Math.abs(num);
        num=num.toFixed(2);

        numSplit=num.split('.');
        int=numSplit[0];
        dec=numSplit[1];
        
        if(int.length>3){              
            int=int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3); 
        }

        return (type ==='exp'? '-' : '+') +" "+ int+"."+dec;
    }
    var forEachNodeList=function(list,callback){
        for(var i=0;i<list.length;i++){
            callback(list[i],i);
        }
    }
    return{
        getInput:function(){
            return{
                type:document.querySelector(DOMStrings.input_type).value,
                description:document.querySelector(DOMStrings.inputDescription).value,
                value:parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        getDOMStrings:function(){
            return DOMStrings;
        },
        addListItem:function(item,type){
             var html,newHtml,element;
             if(type==='inc'){
                 element=DOMStrings.incomeContainer;

                 html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }
             else if(type==='exp'){
                element=DOMStrings.expensesContainer;

                html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }

             newHtml=html.replace("%id%",item.id);
             newHtml=newHtml.replace("%description%",item.description);
             newHtml=newHtml.replace("%value%",formatNumber(item.value,type));

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        removeListitem:function(itemId){
            var element=document.getElementById(itemId)
            element.parentNode.removeChild(element);
        },
        clearInput:function(){
            var inputFields,inputFieldsArray;

            inputFields=document.querySelectorAll(DOMStrings.inputDescription+','+DOMStrings.inputValue);
            inputFieldsArray=Array.prototype.slice.call(inputFields);
            inputFieldsArray.forEach(function(current,index,array){
                current.value='';
            });
            inputFieldsArray[0].focus();
        },
        updateBudgetUI:function(obj){
            obj.budget>0?type='inc':type='exp';
            document.querySelector(DOMStrings.budgetValue).textContent=formatNumber(obj.budget,type)
            document.querySelector(DOMStrings.budgetIncomeValue).textContent=formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMStrings.budgetExpenseValue).textContent=formatNumber(obj.totalEXp,'exp')
            if(obj.percentage>0){
                document.querySelector(DOMStrings.budgetExpensePercentage).textContent=obj.percentage+" %";
            }else{
                document.querySelector(DOMStrings.budgetExpensePercentage).textContent="---";
            }
        },
        updatePercentagesUI:function(percentages){
            var percentLabels=document.querySelectorAll(DOMStrings.expPercentageLabel);

            forEachNodeList(percentLabels,function(current,index){
                if(percentages[index]>=0){
                    current.textContent=percentages[index] + " %";
                }else{
                    current.textContent="---";
                }
            });

        },
        displayDateUI:function(){
            var now,month,year,months;
            months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            now=new Date();
            month=months[now.getMonth()];
            year=now.getFullYear();

            document.querySelector(DOMStrings.dateLabel).textContent=month + ' ' +year;
        },
        changedType:function(){
            var fields;
            fields=document.querySelectorAll(
                DOMStrings.input_type + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );
            forEachNodeList(fields,function(current){
                current.classList.toggle('red-focus');
            });
            document.querySelector(DOMStrings.addButton).classList.toggle('red');
        }
    }
})();

var controller=(function(budgetCtrl,uiCtrl){

    var setupEventListeners=function(){
        var DOM=UIController.getDOMStrings();
        document.querySelector(DOM.addButton).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(e){
                if(e.keyCode===13 || e.which===13){
                ctrlAddItem();
            }
        });
        //delete list item
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        //changed type
        document.querySelector(DOM.input_type).addEventListener('change',uiCtrl.changedType);
    }

    var updateBudget=function(){
        //1.calculate budget
        budgetCtrl.caluculateBudget();
        //2.return budget
        var budget=budgetCtrl.returnBudget();
        //3.update ui
        uiCtrl.updateBudgetUI(budget);
    }
    var updatePercentages=function(){

        //1.calculate percentages
        budgetController.calculatePercentages();
        //2.get percentages from budget controller
        var expPercentages=budgetCtrl.returnPercentages();
        //3.update ui with percentages
        uiCtrl.updatePercentagesUI(expPercentages);
    }

    var ctrlAddItem=function(){
        // 1.get the field data entered
        var input=UIController.getInput();
        // console.log(input);
 
        if(input.description!='' && !isNaN(input.value) && input.value>0){
            //2.send to budget controller
            var newItem=budgetCtrl.addItem(input.type,input.description,input.value);
            // console.log(newItem);
            //3.add new listItem
            uiCtrl.addListItem(newItem,input.type);
            //4.remove input fields from ui 
            uiCtrl.clearInput();
            //5.update budget
            updateBudget();
            //6.update percentages
            updatePercentages();
        }
    }

    var ctrlDeleteItem=function(event){
        var itemId,SplitId,type,id;
        itemId=event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId){
            SplitId=itemId.split("-");
            type=SplitId[0];
            id=parseInt(SplitId[1]);

            //1.delete item from data object
            budgetCtrl.removeItem(type,id);
            //2.delete item from ui
            uiCtrl.removeListitem(itemId);
            //3.update budget 
            updateBudget();
            //4.update percentages
            updatePercentages();
        }
    }

    return {
        init:function(){
            console.log("start");
            uiCtrl.displayDateUI();
            uiCtrl.updateBudgetUI({
                budget:0,
                percentage:-1,
                totalInc:0,
                totalEXp:0 
            });
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();