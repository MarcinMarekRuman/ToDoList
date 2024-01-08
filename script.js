let todoInput
let errorInfo
let addBtn
let ulList
let newTODO

let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn


const main = () =>{
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if(todoInput.value !== ''){
		newTODO = document.createElement('li')
		newTODO.textContent = todoInput.value
		createTollArea()

		ulList.append(newTODO)

		todoInput.value = ''
		errorInfo.textContent = ''
	}else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const createTollArea = () => {
	const div = document.createElement('div')
	div.classList.add('tools')
	newTODO.append(div)

	const okBtn = document.createElement('button')
	okBtn.classList.add('complete')
	okBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const delBtn = document.createElement('button')
	delBtn.classList.add('delete')
	delBtn.innerHTML = '<i class="fas fa-times"></i>'

	div.append(okBtn, editBtn, delBtn)

}

const checkClick = e => {
	if(e.target.matches('.complete')){
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	}	else if(e.target.matches('.edit')){
		editTodo(e)
	}else if(e.target.matches('.delete')){
		deleteTodo(e)
	}
}

const editTodo = (e) => {
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}


const changeTodoText = () => {
	if(popupInput.value !== ''){
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	}else{
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = (e) => {
	e.target.closest('li').remove()
	const allTodos = document.querySelectorAll('li')

	if(allTodos.length === 0){
		errorInfo.textContent = 'Brak zadań na liście'
	}
}

const enterKeyCheck = (e) => {
	if(e.key === 'Enter'){
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)