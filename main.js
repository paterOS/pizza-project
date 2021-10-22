const orderBtn = document.querySelector('#order-btn');

let order = {
    pizza: '',
    sauses: [],
    drinks: [],
    name: '',
    adress: '',
    email: '',
    phone: '',
    message: ''
}

let prices = {
    pizza: [0, 45, 30, 29, 32, 28, 35, 35],
    sauses: 1,
    drinks: 6
}

let sausesPrice = 0
let drinkPrice = 0
let pizzaPrice = 0
let sum = 0

//wybór sosów
function chooseSauses() {
    const allSauses = document.getElementsByClassName('sause')
    for (let i = 0; i < allSauses.length; i++) {
        if (allSauses[i].checked) {
            order.sauses.push(' ' + allSauses[i].id);
            sausesPrice += prices.sauses
        }
    }
}

//wybór napoju
function chooseDrink() {
    const allDrinks = document.getElementsByClassName('drink')
    for (let i = 0; i < allDrinks.length; i++) {
        if (allDrinks[i].checked) {
            order.drinks.push(allDrinks[i].id)
            drinkPrice = prices.drinks
        }
    }
}

// wybór pizzy
const selectPizza = document.getElementById('choose-pizza');
function getPizza() {
    if (selectPizza.value > "0") {
        order.pizza = selectPizza.value;
        pizzaPrice = prices.pizza[selectPizza.value]
    }
}

//dane użytkownika

function getUserData() {
    const userName = document.getElementById('name');
    const userMail = document.getElementById('mail');
    const userPhone = document.getElementById('phone');
    const userAdress = document.getElementById('adress');
    const userMessage = document.getElementById('message');

    order.name = userName.value
    order.email = userMail.value
    order.phone = userPhone.value
    order.adress = userAdress.value
    order.message = userMessage.value
}

//rachunek
const bill = document.querySelector('.bill');
function showBill() {
    const yourPizza = document.querySelector('.your-pizza')
    const pizzasPrice = document.querySelector('.pizza-price')
    const yourSauses = document.querySelector('.your-sauses')
    const yourDrink = document.querySelector('.your-drink')
    const sausePrice = document.querySelector('.sause-price')
    const drinksPrice = document.querySelector('.drink-price')
    const pizzaName = document.getElementsByTagName('option')[selectPizza.value]

    yourPizza.textContent = `Pizza: ${pizzaName.textContent}`
    pizzasPrice.innerHTML = `<span class="bold">Cena: </span>${pizzaPrice} zł`
    yourSauses.textContent = `Sosy:${order.sauses}`
    yourDrink.textContent = `Napój: ${order.drinks}`
    sausePrice.innerHTML = `<span class="bold">Cena: </span>${sausesPrice} zł`
    drinksPrice.innerHTML = `<span class="bold">Cena: </span>${drinkPrice} zł`

    const nameTarget = document.querySelector('.name-target')
    const mailTarget = document.querySelector('.mail-target')
    const nrTarget = document.querySelector('.nr-target')
    const adressTarget = document.querySelector('.adress-target')
    const msgTarget = document.querySelector('.msg-target')

    nameTarget.textContent = order.name
    mailTarget.textContent = order.email
    nrTarget.textContent = order.phone
    adressTarget.textContent = order.adress
    msgTarget.textContent = order.message

    const sumBill = document.querySelector('.price-sum')
    sumBill.textContent = `Razem do zapłacenia: ${sum} zł`

    bill.style.display = "flex";
}


// złóż zamówienie
const getOrder = (e) => {
    e.preventDefault();
    getUserData();

    if (order.name == '') {
        alert('Podaj imię i nazwisko')
        return
    } else if (order.phone == '') {
        alert('Podaj numer kontaktowy')
        return
    } else if (order.adress == '') {
        alert('Podaj adres dostawy')
        return
    }
    getPizza();
    if (selectPizza.value == 0) {
        alert('Wybierz pizzę')
        return
    }

    if (order.name == "" || order.adress == "" || order.phone == "") {
        return
    } else {

        chooseSauses();
        chooseDrink();
        sum += pizzaPrice + drinkPrice + sausesPrice
        // function priceSum() {
        //     sum += pizzaPrice + drinkPrice + sausesPrice
        // }
        // priceSum()
        showBill()

        order = {
            pizza: '',
            sauses: [],
            drinks: [],
            name: '',
            adress: '',
            email: '',
            phone: '',
            message: ''
        }
        pizzaPrice = 0
        sausesPrice = 0
        drinkPrice = 0
        sum = 0
    }
}

orderBtn.addEventListener('click', getOrder);


const backBtn = document.querySelector('.back-btn')
const confirmBtn = document.querySelector('.confirm-btn')

backBtn.addEventListener('click', () => {

    order = {
        pizza: '',
        sauses: [],
        drinks: [],
        name: '',
        adress: '',
        email: '',
        phone: '',
        message: ''
    }

    bill.style.display = "none";
})

confirmBtn.addEventListener('click', () => {
    bill.style.display = "none";
    alert('Twoje zamówienie zostało złożone. Dziękujemy za zaufanie!')
})