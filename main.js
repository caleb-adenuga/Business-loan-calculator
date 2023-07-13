const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanDurationInput = document.querySelector(".loan-duration");

const loanEMIValue= document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");
var startClaimContainer = document.getElementById("startClaimContainer");
var startClaimButtonGenerated = false;

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      generateStartClaimButton();
    }});

   


    function generateStartClaimButton() {
        if (!startClaimButtonGenerated) {
          var startClaimButton = document.createElement("button");
          startClaimButton.id = "startClaimButton";
          startClaimButton.innerText = "Start Your Application";
          startClaimContainer.appendChild(startClaimButton);
          startClaimButtonGenerated = true;
        }
      }

calculateBtn.addEventListener("click", function() {
    if (!startClaimButtonGenerated) {
        var startClaimButton = document.createElement("button");
        startClaimButton.id = "startClaimButton";
        startClaimButton.innerText = "Start Your Application";
        startClaimContainer.appendChild(startClaimButton);
        startClaimButtonGenerated = true;}
  });

 
  claimForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // Perform form submission or validation
    // You can access the form field values using the element IDs
    var yourName = document.getElementById("yourName").value;
    var companyName = document.getElementById("companyName").value;
    var companyEmail = document.getElementById("companyEmail").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    console.log("Your Name:", yourName);
    console.log("Company Name:", companyName);
    console.log("Company Email:", companyEmail);
    console.log("Phone Number:", phoneNumber);
    // You can perform further actions or submit the form data here
  });




let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanDuration = parseFloat(loanDurationInput.value);

let interest = interestRate / 12/100;
let myChart;


const displayChart = (totalInterestPayableValue) =>{
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Total Interest', 'Loan Amount'],
      datasets:[
        {
        data: [totalInterestPayableValue, loanAmount],
        backgroundColor: ["#e63946", "#14213d"],
        borderWidth: 0,
      },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
 myChart.data.datasets[0].data[0] = totalInterestPayableValue;
 myChart.data.datasets[0].data[1] = loanAmount;
 myChart.update();

};

//this is the formula to calculate the EMI/Loan amount
const calculateEMI = () => {
    let emi = loanAmount * interest * (Math.pow(1 + interest, loanDuration) /
     
    (Math.pow(1 + interest, loanDuration) -1));

    return emi;
}

function updateData(emi) {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanDuration * emi);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestValue.innerHTML = totalInterestPayable;

    if (myChart){
        updateChart(totalInterestPayable);
    } else {
    displayChart(totalInterestPayable);
}}

const generate = () => {
    let emi = calculateEMI();
    updateData(emi);

   
};
//causes my css to dissapear
generate();

const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
interestRate = parseFloat(interestRateInput.value);
loanDuration = parseFloat(loanDurationInput.value);

interest = interestRate / 12/100;
}

calculateBtn.addEventListener("click",() => {
    refreshInputValues();
    let emi = calculateEMI();
    updateData(emi);
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        refreshInputValues();
    let emi = calculateEMI();
    updateData(emi);
    }
});
