		//get the heading element
		const headingEl=document.querySelector("#headingTotal");
		//get the inputAmount
		const inputElement=document.querySelector("#inputAmount");
		//get the  inputDesc
		const inputDescEl=document.querySelector("#inputDesc");
		//ger the tableExpense
		const tableExpenseEl=document.querySelector("#tableExpense");
		//get the button
		const btn = document.querySelector("#btnAddExpense");
		//init total amount to zero
		let totalExpense=0;
		//set the heading el to total expense
		headingEl.textContent=totalExpense;
		//allExpenses at one place
		let allExpenses=[];

		let newArr=[];

		//on buttonclick add inputAmount to totalExpense
		function addExpenseTotal(){
			const expenseItem={};
			//read inputAmount
			const textAmount=inputElement.value;

			//read the inputDesc
			const textDesc=inputDescEl.value;

			//convert string to number
			const expense = parseInt(textAmount,10);

			//put it in object
			expenseItem.desc=textDesc;
			expenseItem.amount=expense;
			expenseItem.moment=new Date();

			allExpenses.push(expenseItem);
		
			//add that value to totalExpense
			totalExpense=totalExpense+expense;
			//set the heading el to total expense
			const someText = `Total Expense: ${totalExpense}`;
			headingEl.textContent=someText;

			storeData(expenseItem, totalExpense);

			renderList(allExpenses);
		}
		
		//storing into new array
		function storeData(expenseItem){
		    newArr.push(expenseItem);
		    localStorage.setItem('saved', JSON.stringify(newArr));
		    localStorage.setItem('total', totalExpense);
		}
		//getting date
		function getDateString(moment){
			return moment.toLocaleDateString('en-US',{
				year:'numeric', 
				month:'long', 
				day:'numeric',
			})
		}
		//modified sum
		function renderTotal(sumTotal){
			const someText = `Total Expense: ${sumTotal}`;
   			headingEl.textContent = someText;
		}
		//updating sum of array while deleting items
		function newSum(expenses){
			let sum=0;
			for(let i=0;i<expenses.length;i++){
				sum=sum+expenses[i].amount;
			}
			totalExpense=sum;
			localStorage.setItem('total',sum);
			renderTotal(sum);
		}

		//deleting items
		function deleteItem(dateValue){
			newArr=[];
			allExpenses=allExpenses.filter((expense)=>{
				if(expense.moment.valueOf() !== dateValue){
		        	storeData(expense);
		        	return expense;
		    }
			});
			if(newArr.length === 0){
	        localStorage.removeItem('saved');
	        localStorage.removeItem('total');
	    	}
	    	renderList(allExpenses);
	    	newSum(allExpenses);
		}
		//modified list
		function renderList(listOfArr){
			const allExpenseHTML=listOfArr.map(expense=>createListItems(expense));
			const joinedAllExpenseHTML=allExpenseHTML.join("");
			tableExpenseEl.innerHTML=joinedAllExpenseHTML;
		}

		//function for creating items

		function createListItems({ desc,amount,moment }){
			return `
				<li class="list-group-item d-flex justify-content-between">
					<div class="d-flex flex-column">
						${desc}
						<small class="text-muted">${getDateString(moment)}</small>
					</div>
					<div>
						<span class="px-5">
							${amount}
						</span>
						<button 
						type="button" 
						class="btn btn-outline-danger btn-sm"
						onclick="deleteItem(${moment.valueOf()})"
						>
							<i class="fas fa-trash-alt"></i>
						</button>
					</div>
				</li>
			`
		}
		window.onload=function() {
			if(localStorage.getItem('saved') === null){
	        console.log('original state');
	        return;
	    }
			let arr=JSON.parse(localStorage.getItem('saved'));
			arr.map(a=>{
				let dt = new Date(a.moment);
        		a.moment = dt;
        		newArr.push(a);
		});
			let totExp = parseInt(localStorage.getItem('total'));
		    allExpenses = newArr;
		    renderList(allExpenses);
		    renderTotal(totExp);
			
		}	
		function clearAll(){
			newArr.length=0;
		
		}