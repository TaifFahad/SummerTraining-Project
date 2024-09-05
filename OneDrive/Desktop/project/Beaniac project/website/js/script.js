// Description: This file contains the javascript code for the website.
// It contains the code for sending the form data to the server.
// It also contains the code for displaying the response from the server.


document.getElementById('insertForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get the form values
  let name = document.getElementById('name').value;
  let getSelectedGender = () => document.querySelector('input[name="Gender"]:checked')?.value || null;
  let gender = getSelectedGender();
  let phonenum = document.getElementById('phonenum').value;
  let dateofbirth = document.getElementById('dateofbirth').value;
  let email = document.getElementById('email').value;
  let communicationlang = document.getElementById('communicationlang').value;
  let comment = document.getElementById('comment').value;
  document.getElementById('insertForm').reset(); // Reset the form

  // Validate the form fields
  const lettersRegex = /^[A-Za-z\s]+$/;

  if (name === '') {
    alert('Please enter your name.');
    return;
  }

  if (!lettersRegex.test(name)) {
    alert('Name should contain only letters.');
    return;
  }
   
  // Send the form data to the server
  fetch('/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      gender: gender,
      phonenum: phonenum,
      dateofbirth: dateofbirth,
      email: email,
      communicationlang: communicationlang,
      comment: comment
    })
  })
    .then(function (response) {
      if (response.ok && response.status !== 409) {
        alert('Data inserted successfully');
      } else if (response.status === 409) {
        alert('Duplicate entry');
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function (error) {
      console.error(error);
    });

});

/**
 * Displays the data from the 'contactus' table in the database.
 * @param {Object} res - The response object.
 */
async function displayContactUsData(res) {
  try {
    // Fetch data from the "/showdata" endpoint
    const response = await fetch("/showdata");
    // Prompt the user to enter a code
    const enteredCode = prompt("Enter the code:");

    // Check if the entered code matches
    if (enteredCode === "I'm The Website Owner") {
      // Fetch data from the "/showdata" endpoint
      const response = await fetch("/showdata");


    if (response.ok) {
      // Parse the JSON data
      const data = await response.json();

      // Manipulate the DOM with the retrieved data
      // Example: Update a div with the data
      
      const dataplace = document.getElementById("closure");
      showData.remove();

      dataplace.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      dataplace.style.height = "350px";
      dataplace.style.overflow = "auto";

      dataplace.appendChild(document.createElement("br"));
      dataplace.appendChild(document.createElement("br"));
      // Recursively iterate through the data and display name and value
      function displayData(obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const currentKey = key;

            if (typeof obj[key] === "object") {
              displayData(obj[key], currentKey);
            } else {
              const info = document.createElement("p");
              console.log(`${currentKey}: ${obj[key]}`);
              info.innerHTML = `<b>${currentKey}: </b>${obj[key]}`;
              dataplace.appendChild(info);
            }
          }
        }
        dataplace.appendChild(document.createElement("br"));
      }

      // Start displaying data
      displayData(data);
    } else {
      console.error("Failed to fetch data");
    }
  } else {
    window.alert("Invalid code. Data cannot be displayed.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}