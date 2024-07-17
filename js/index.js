const dataJson='https://gehadahmedcs.github.io/host_api/data.json'
console.log(dataJson)




// fetch(dataJson)
//   .then(response => response.json())
//   .then(data => {
//     const customers = data.customers;
//     const transactions = data.transactions;

//     const customerTransactions = {};

//     transactions.forEach(transaction => {
//       const customerId = transaction.customer_id;
//       if (!customerTransactions[customerId]) {
//         customerTransactions[customerId] = {
//           totalAmount: 0,
//           transactions: []
//         };
//       }
//       customerTransactions[customerId].totalAmount += transaction.amount;
//       customerTransactions[customerId].transactions.push(transaction);
//     });

//     const tableBody = document.querySelector('#customer-table tbody');

//     function populateTable(filteredCustomers) {
//       tableBody.innerHTML = ''; // Clear existing rows

//       filteredCustomers.forEach(customer => {
//         const customerData = customerTransactions[customer.id] || { totalAmount: 0, transactions: [] };
//         const totalAmount = customerData.totalAmount;

//         if (customerData.transactions.length > 0) {
//           customerData.transactions.forEach(transaction => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//               <td>${customer.id}</td>
//               <td>${customer.name}</td>
//               <td>${transaction.id}</td>
//               <td>${transaction.date}</td>
//               <td>$${totalAmount}</td>
//             `;
//             tableBody.appendChild(row);
//           });
//         } else {
//           const row = document.createElement('tr');
//           row.innerHTML = `
//             <td>${customer.id}</td>
//             <td>${customer.name}</td>
//             <td colspan="2">No transactions</td>
//             <td>$${totalAmount}</td>
//           `;
//           tableBody.appendChild(row);
//         }
//       });
//     }

//     function updateChart(filteredCustomers) {
//       const labels = filteredCustomers.map(customer => customer.name);
//       const data = filteredCustomers.map(customer => customerTransactions[customer.id]?.totalAmount || 0);

//       transactionChart.data.labels = labels;
//       transactionChart.data.datasets[0].data = data;
//       transactionChart.update();
//     }

//     const ctx = document.getElementById('transactionChart').getContext('2d');
//     const transactionChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: [],
//         datasets: [{
//           label: 'Total Amount',
//           data: [],
//           backgroundColor: 'rgba(75, 192, 192, 0.5)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

//     function searchAndPopulate() {
//       let searchNameValue = searchByName.value.toLowerCase();
//       let searchAmountValue = parseFloat(searchByAmount.value);

//       const filteredCustomers = customers.filter(customer => {
//         const customerData = customerTransactions[customer.id] || { totalAmount: 0, transactions: [] };
//         const totalAmount = customerData.totalAmount;

//         const nameMatch = customer.name.toLowerCase().includes(searchNameValue);
//         const amountMatch = isNaN(searchAmountValue) || totalAmount >= searchAmountValue;

//         return nameMatch && amountMatch;
//       });

//       populateTable(filteredCustomers);
//       updateChart(filteredCustomers);

//       localStorage.setItem('filteredCustomers', JSON.stringify(filteredCustomers));
//     }

//     var searchByName = document.getElementById('searchInputByName');
//     var searchByAmount = document.getElementById('searchInputByAmount');

//     searchByName.addEventListener('input', searchAndPopulate);
//     searchByAmount.addEventListener('input', searchAndPopulate);

//     const savedFilteredCustomers = JSON.parse(localStorage.getItem('filteredCustomers'));
//     if (savedFilteredCustomers) {
//       populateTable(savedFilteredCustomers);
//       updateChart(savedFilteredCustomers);
//     } else {
//       populateTable(customers);
//       updateChart(customers);
//     }
//   })
//   .catch(error => {
//     const errMsg = document.querySelector('.er-container');
//     errMsg.classList.remove('d-none');
//     document.getElementById('er-alert').innerHTML = `Error: something is wrong`;
//   });

fetch(dataJson)
.then(response => response.json())
.then(data => {
  const customers = data.customers;
  const transactions = data.transactions;

  const customerTransactions = {};

  transactions.forEach(transaction => {
    const customerId = transaction.customer_id;
    if (!customerTransactions[customerId]) {
      customerTransactions[customerId] = {
        totalAmount: 0,
        transactions: []
      };
    }
    customerTransactions[customerId].totalAmount += transaction.amount;
    customerTransactions[customerId].transactions.push(transaction);
  });

  const tableBody = document.querySelector('#customer-table tbody');

  function populateTable(filteredCustomers) {
    tableBody.innerHTML = ''; // Clear existing rows

    filteredCustomers.forEach(customer => {
      const customerData = customerTransactions[customer.id] || { totalAmount: 0, transactions: [] };
      const totalAmount = customerData.totalAmount;

      if (customerData.transactions.length > 0) {
        customerData.transactions.forEach(transaction => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>$${totalAmount}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td colspan="2">No transactions</td>
          <td>$${totalAmount}</td>
        `;
        tableBody.appendChild(row);
      }
    });
  }

  function updateChart(filteredCustomers) {
    const labels = filteredCustomers.map(customer => customer.name);
    const data = filteredCustomers.map(customer => customerTransactions[customer.id]?.totalAmount || 0);

    transactionChart.data.labels = labels;
    transactionChart.data.datasets[0].data = data;
    transactionChart.update();
  }

  const ctx = document.getElementById('transactionChart').getContext('2d');
  const transactionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Total Amount',
        data: [],
        backgroundColor: 'rgb(5, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  function searchAndPopulate() {
    let searchNameValue = searchByName.value.toLowerCase();
    let searchAmountValue = parseFloat(searchByAmount.value);



    
    const filteredCustomers = customers.filter(customer => {
      const customerData = customerTransactions[customer.id] || { totalAmount: 0, transactions: [] };
      const totalAmount = customerData.totalAmount;

      const nameMatch = customer.name.toLowerCase().includes(searchNameValue);
      const amountMatch = isNaN(searchAmountValue) || totalAmount === searchAmountValue;

      return nameMatch && amountMatch;
    });

    populateTable(filteredCustomers);
    updateChart(filteredCustomers);

    localStorage.setItem('filteredCustomers', JSON.stringify(filteredCustomers));
  }




  var searchByName = document.getElementById('searchInputByName');
  var searchByAmount = document.getElementById('searchInputByAmount');

  searchByName.addEventListener('input', searchAndPopulate);
  searchByAmount.addEventListener('input', searchAndPopulate);



  const savedFilteredCustomers = JSON.parse(localStorage.getItem('filteredCustomers'));
  if (savedFilteredCustomers) {
    populateTable(savedFilteredCustomers);
    updateChart(savedFilteredCustomers);
  } else {
    populateTable(customers);
    updateChart(customers);
  }
})
.catch(error => {
  const errMsg = document.querySelector('.er-container');
  errMsg.classList.remove('d-none');
  document.getElementById('er-alert').innerHTML = `Error: something is wrong`;
});


   

