!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const a={transactionType:document.querySelector(".add__type"),description:document.querySelector(".add__description"),value:document.querySelector(".add__value"),submitButton:document.querySelector(".add__btn"),incomeList:document.querySelector(".income__list"),expenseList:document.querySelector(".expenses__list"),monthText:document.querySelector(".budget__title--month"),availableBudget:document.querySelector(".budget__value"),totalIncome:document.querySelector(".budget__income--value"),totalExpense:document.querySelector(".budget__expenses--value"),expTotalPercentage:document.querySelector(".budget__expenses--percentage"),container:document.querySelector(".container")};class i{constructor(e,t,n){this.type=e,this.description=t,this.value=n}addItem(){let e,t;return t=0===o.allItems[this.type].length?0:o.allItems[this.type][o.allItems[this.type].length-1].id+1,"inc"===this.type?e=new l(t,this.description,this.value):"exp"===this.type&&(e=new r(t,this.description,this.value)),o.allItems[this.type].push(e),e}updateBudget(){c.calculateTotal("inc"),c.calculateTotal("exp"),o.budget=o.totals.inc-o.totals.exp,o.totals.inc>0?o.percentage=Math.round(o.totals.exp/o.totals.inc*100*10)/10:o.percentage=-1}returnBudget(){return{budget:o.budget,totalInc:o.totals.inc,totalExp:o.totals.exp,percentage:o.percentage}}}class l{constructor(e,t,n){this.id=e,this.description=t,this.value=n}}class r{constructor(e,t,n){this.id=e,this.description=t,this.value=n}calculatePercentage(){o.totals.inc>0?this.percentage=Math.round(this.value/o.totals.inc*100):this.percentage=-1}returnPercentage(){return this.percentage}}let o={allItems:{inc:[],exp:[]},totals:{inc:0,exp:0},budget:0,percentage:-1};const c={deleteItem:(e,t)=>{o.allItems[e].forEach((n,a)=>{n.id===t&&o.allItems[e].splice(a,1)})},calculatePercentages:()=>{o.allItems.exp.forEach(e=>{e.calculatePercentage()})},returnPercentages:()=>o.allItems.exp.map(e=>e.returnPercentage()),calculateTotal:e=>{let t=0;o.allItems[e].forEach(e=>{t+=e.value}),o.totals[e]=t}},s=(e,t)=>{let n,a,i;return n=(e=(e=Math.abs(e)).toFixed(2)).split("."),a=n[0],i=n[1],a=(e=>{let t=e.length;if(t>3){let n,a="",i=[],l=0;for(let a=t;a>0;a--)0==l&&a==t-3||l>0&&a==n-3?(i.unshift(","),i.unshift(e[a-1]),l++,n=a):i.unshift(e[a-1]);return a=i.join(""),a}return e})(a),("inc"===t?"+":"-")+" "+a+"."+i},u=e=>{const t=e.budget>0?"inc":"exp";a.availableBudget.textContent=s(e.budget,t),a.totalIncome.textContent=s(e.totalInc,"inc"),a.totalExpense.textContent=s(e.totalExp,"exp"),e.totalInc>0?a.expTotalPercentage.textContent=e.percentage+" %":a.expTotalPercentage.textContent="---"};window.onload=()=>{console.log("start ra bujji"),(()=>{let e;e=["January","February","March","April","May","June","July","August","September","October","November","December"];const t=new Date,n=e[t.getMonth()],i=t.getFullYear();a.monthText.textContent=n+" "+i})(),u({budget:0,totalInc:0,totalExp:0,percentage:-1})};const d={},p=()=>{const e={type:a.transactionType.value,description:a.description.value,value:parseFloat(a.value.value)};if(""!==e.description&&!isNaN(e.value)&&e.value>0){d.transaction=new i(e.type,e.description,e.value);((e,t)=>{let n,i;"inc"===t?(n=a.incomeList,i=`\n            <div class="item clearfix" id="inc-${e.id}">\n                <div class="item__description">${e.description}</div>\n                    <div class="right clearfix">\n                        <div class="item__value">${s(e.value,t)}</div>\n                            <div class="item__delete">\n                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n                            </div>\n                    </div>\n            </div>\n        `):"exp"===t&&(n=a.expenseList,i=`\n            <div class="item clearfix" id="exp-${e.id}">\n                <div class="item__description">${e.description}</div>\n                <div class="right clearfix">\n                    <div class="item__value">${s(e.value,t)}</div>\n                    <div class="item__percentage">21%</div> \n                    <div class="item__delete">\n                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n                    </div>\n                </div>\n            </div>\n        `),n.insertAdjacentHTML("beforeend",i)})(d.transaction.addItem(),e.type),a.description.value="",a.value.value="",a.description.focus(),m(),v()}},m=()=>{d.transaction.updateBudget();const e=d.transaction.returnBudget();u(e)},v=()=>{c.calculatePercentages();(e=>{!function(e,t){for(var n=0;n<e.length;n++)t(e[n],n)}(document.querySelectorAll(".item__percentage"),(function(t,n){e[n]>=0?t.textContent=e[n]+" %":t.textContent="---"}))})(c.returnPercentages())};a.submitButton.addEventListener("click",()=>{p()}),document.addEventListener("keypress",e=>{13!==e.keyCode&&13!==e.which||p()});const g=e=>{let t,n,a,i;t=e.target.parentNode.parentNode.parentNode.parentNode.id,t&&(n=t.split("-"),i=n[0],a=parseFloat(n[1]),c.deleteItem(i,a),(e=>{let t=document.getElementById(e);t.parentElement.removeChild(t)})(t),m(),v())};a.container.addEventListener("click",e=>{g(e)})}]);