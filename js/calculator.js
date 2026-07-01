const customers = document.getElementById("customers");
const price = document.getElementById("price");

const customersValue = document.getElementById("customersValue");
const priceValue = document.getElementById("priceValue");
const monthlyIncome = document.getElementById("monthlyIncome");

function calculateIncome() {

    customersValue.textContent = customers.value;
    priceValue.textContent = Number(price.value).toLocaleString();

    const revenue =
        customers.value *
        price.value *
        30;

    monthlyIncome.textContent =
        "UGX " + revenue.toLocaleString();

}

customers.addEventListener("input", calculateIncome);
price.addEventListener("input", calculateIncome);

calculateIncome();