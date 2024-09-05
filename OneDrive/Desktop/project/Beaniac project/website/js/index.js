const startButton = document.getElementById('startButton');

// Add a click event listener to the document
document.addEventListener('click', function (event) {
  // Check if the clicked element is the "Start Now" button
  if (event.target === startButton) {
    // Change the background image
    const backgroundSection = document.querySelector('.background');
    //backgroundSection.style.backgroundImage = 'url("../media/APress.jpg")';


    // Change the text in the <p> element
    const paragraph = document.getElementById('shortDis');
    paragraph.textContent = 'Would you like your coffee to be Hot or Cold?';

    const resault = document.getElementById("coname");

    // Remove the "Start Now" button
    startButton.remove();

    // Create a new button element for COLD
    const newButton1 = document.createElement('button');
    newButton1.textContent = 'COLD';
    newButton1.id = 'cold';

    // Create a new button element for HOT
    const newButton2 = document.createElement('button');
    newButton2.textContent = 'HOT';
    newButton2.id = 'hot';

    // Append the new buttons to the document
    const introSection = document.querySelector('.name');
    introSection.appendChild(newButton1);
    introSection.appendChild(newButton2);



    // Add event listeners to the new buttons
    newButton1.addEventListener('click', function () {
      // Change the text in the <p> element
      paragraph.textContent = 'Would you like your coffee to be espresso or drip?';

      // Remove the existing buttons
      newButton1.remove();
      newButton2.remove();

      // Create a new button element for ESPRESSO
      const newButton3 = document.createElement('button');
      newButton3.textContent = 'ESPRESSO';
      newButton3.id = 'espresso';

      // Create a new button element for DRIP
      const newButton4 = document.createElement('button');
      newButton4.textContent = 'DRIP';
      newButton4.id = 'drip';

      // Append the new buttons to the document
      introSection.appendChild(newButton3);
      introSection.appendChild(newButton4);

      newButton3.addEventListener('click', function () {
        // Change the text in the <p> element
        paragraph.textContent = 'Would you like some milk in your coffee?';

        // Remove the existing buttons
        newButton3.remove();
        newButton4.remove();

        // Create a new button element for YES
        const newButton5 = document.createElement('button');
        newButton5.textContent = 'YES';
        newButton5.id = 'yes';

        // Create a new button element for NO
        const newButton6 = document.createElement('button');
        newButton6.textContent = 'NO';
        newButton6.id = 'no';

        // Append the new buttons to the document
        introSection.appendChild(newButton5);
        introSection.appendChild(newButton6);
        // Add event listeners to the new buttons
        //no
        newButton6.addEventListener('click', function () {
          // Handle the no Milk option if needed
          // iced amrecano
          newButton5.remove();
          newButton6.remove();
          backgroundSection.style.backgroundImage = 'url("/media/res1.jpg")';

          resault.textContent = "We Suggest For You To Order:"
          paragraph.textContent = "Iced Americano."
          const backButton = document.createElement('button');
          backButton.textContent = 'Back';
          backButton.id = 'back';

          // Append the back button to the document
          introSection.appendChild(backButton);

          // Add event listener to the back button
          backButton.addEventListener('click', function () {
            // Reload the page to go back to the initial state
            location.reload();
            
          });
        });
        //yes
        newButton5.addEventListener('click', function () {
          // Remove the existing buttons
          newButton5.remove();
          newButton6.remove();

          // Change the text in the <p> element
          paragraph.textContent = 'Choose the amount of milk:';

          // Create a new button element for A LOT OF MILK
          const newButton7 = document.createElement('button');
          newButton7.innerHTML = 'a lot Of Milk';
          newButton7.id = 'lotOfMilk';

          // Create a new button element for HALF AMOUNT OF MILK
          const newButton8 = document.createElement('button');
          newButton8.innerHTML = 'Mediem Amount';
          newButton8.id = 'halfAmountMilk';

          // Create a new button element for ICE CREAM
          const newButton9 = document.createElement('button');
          newButton9.innerHTML = 'IceCream';
          newButton9.id = 'iceCream';

          // Append the new buttons to the document
          introSection.appendChild(newButton7);
          introSection.appendChild(newButton8);
          introSection.appendChild(newButton9);

          // Add event listeners to the new buttons
          newButton7.addEventListener('click', function () {
            // Handle the A LOT OF MILK option if needed
            // ice caramel latte, ice latte, spansh latte
            newButton7.remove();
            newButton8.remove();
            newButton9.remove();
            backgroundSection.style.backgroundImage = 'url("/media/res2.jpg")';
            resault.textContent = "We Suggest For You To Order:"
            paragraph.textContent = "Iced Latte, or for more sweetness Iced Caramel Latte, or Spanish Latte."
            const backButton = document.createElement('button');
          backButton.textContent = 'Back';
          backButton.id = 'back';

          // Append the back button to the document
          introSection.appendChild(backButton);

          // Add event listener to the back button
          backButton.addEventListener('click', function () {
            // Reload the page to go back to the initial state
            location.reload();
            
          });

          });

          newButton8.addEventListener('click', function () {
            // Handle the HALF AMOUNT OF MILK option if needed
            // iced flat white, iced white mocha
            newButton7.remove();
            newButton8.remove();
            newButton9.remove();
            backgroundSection.style.backgroundImage = 'url("/media/res2.jpg")';
            resault.textContent = "We Suggest For You To Order:"
            paragraph.textContent = "Iced Flat White, or for more sweetness ICed White Mocha."
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.id = 'back';
  
            // Append the back button to the document
            introSection.appendChild(backButton);
  
            // Add event listener to the back button
            backButton.addEventListener('click', function () {
              // Reload the page to go back to the initial state
              location.reload();
              
            });

          });

          newButton9.addEventListener('click', function () {
            // Handle the ICE CREAM option if needed
            newButton7.remove();
            newButton8.remove();
            newButton9.remove();
            backgroundSection.style.backgroundImage = 'url("/media/res3.jpg")';
            resault.textContent = "We Suggest For You To Order:"
            paragraph.textContent = "Affogato."
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.id = 'back';
  
            // Append the back button to the document
            introSection.appendChild(backButton);
  
            // Add event listener to the back button
            backButton.addEventListener('click', function () {
              // Reload the page to go back to the initial state
              location.reload();
              
            });
          });

        });




      });
      newButton4.addEventListener('click', function () {
        // Handle the drip option if needed
        // cold brow, iced v60, 
        newButton3.remove();
        newButton4.remove();
        backgroundSection.style.backgroundImage = 'url("/media/res4.jpg")';
        resault.textContent = "We Suggest For You To Order:"
        paragraph.textContent = "Cold Brow, or Iced V60"
        const backButton = document.createElement('button');
          backButton.textContent = 'Back';
          backButton.id = 'back';

          // Append the back button to the document
          introSection.appendChild(backButton);

          // Add event listener to the back button
          backButton.addEventListener('click', function () {
            // Reload the page to go back to the initial state
            location.reload();
            
          });


      });
    });
    newButton2.addEventListener('click', function () {
      paragraph.textContent = 'Would you like your coffee to be espresso or drip?';

      // Remove the existing buttons
      newButton1.remove();
      newButton2.remove();

      // Create a new button element for ESPRESSO
      const newButton3 = document.createElement('button');
      newButton3.textContent = 'ESPRESSO';
      newButton3.id = 'espresso';

      // Create a new button element for DRIP
      const newButton4 = document.createElement('button');
      newButton4.textContent = 'DRIP';
      newButton4.id = 'drip';

      // Append the new buttons to the document
      introSection.appendChild(newButton3);
      introSection.appendChild(newButton4);

      newButton3.addEventListener('click', function () {
        // Change the text in the <p> element
        paragraph.textContent = 'Would you like some milk in your coffee?';

        // Remove the existing buttons
        newButton3.remove();
        newButton4.remove();

        // Create a new button element for YES
        const newButton5 = document.createElement('button');
        newButton5.textContent = 'YES';
        newButton5.id = 'yes';

        // Create a new button element for NO
        const newButton6 = document.createElement('button');
        newButton6.textContent = 'NO';
        newButton6.id = 'no';

        // Append the new buttons to the document
        introSection.appendChild(newButton5);
        introSection.appendChild(newButton6);
        // Add event listeners to the new buttons
        //no
        newButton6.addEventListener('click', function () {
          // Handle the no Milk option if needed
          // double shot esspresso
          //hot amricano
          backgroundSection.style.backgroundImage = 'url("/media/res5.jpg")';
          newButton5.remove();
          newButton6.remove();
          resault.textContent = "We Suggest For You To Order:"
          paragraph.textContent = "Hot Americano, or for stronger taste Double Shots Espresso."
          const backButton = document.createElement('button');
          backButton.textContent = 'Back';
          backButton.id = 'back';

          // Append the back button to the document
          introSection.appendChild(backButton);

          // Add event listener to the back button
          backButton.addEventListener('click', function () {
            // Reload the page to go back to the initial state
            location.reload();
            
          });
        });
        //yes
        newButton5.addEventListener('click', function () {
          // Remove the existing buttons
          newButton5.remove();
          newButton6.remove();


          // Change the text in the <p> element
          paragraph.textContent = 'Choose the amount of milk:';

          // Create a new button element for A LOT OF MILK
          const newButton7 = document.createElement('button');
          newButton7.innerHTML = 'a lot Of Milk';
          newButton7.id = 'lotOfMilk';

          // Create a new button element for HALF AMOUNT OF MILK
          const newButton8 = document.createElement('button');
          newButton8.innerHTML = 'Mediem Amount';
          newButton8.id = 'halfAmountMilk';

          // Create a new button element for ICE CREAM
          const newButton9 = document.createElement('button');
          newButton9.innerHTML = 'Small Amount';
          newButton9.id = 'smallAmount';

          // Append the new buttons to the document
          introSection.appendChild(newButton7);
          introSection.appendChild(newButton8);
          introSection.appendChild(newButton9);

          // Add event listeners to the new buttons
          newButton7.addEventListener('click', function () {
            // Handle the A LOT OF MILK option if needed
            // latte
            newButton7.remove();
            newButton8.remove();
            newButton9.remove();
            backgroundSection.style.backgroundImage = 'url("/media/res6.jpg")';
            resault.textContent = "We Suggest For You To Order:"
            paragraph.textContent = "Hot Latte."
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.id = 'back';
  
            // Append the back button to the document
            introSection.appendChild(backButton);
  
            // Add event listener to the back button
            backButton.addEventListener('click', function () {
              // Reload the page to go back to the initial state
              location.reload();
              
            });
          });

          newButton8.addEventListener('click', function () {
            // Handle the HALF AMOUNT OF MILK option if needed
            // capptcheno, flatwhite
            newButton7.remove();
            newButton8.remove();
            newButton9.remove();
            backgroundSection.style.backgroundImage = 'url("/media/res6.jpg")';
            resault.textContent = "We Suggest For You To Order:"
            paragraph.textContent = "Cappuccino"
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.id = 'back';
  
            // Append the back button to the document
            introSection.appendChild(backButton);
  
            // Add event listener to the back button
            backButton.addEventListener('click', function () {
              // Reload the page to go back to the initial state
              location.reload();
              
            });
          });

          newButton9.addEventListener('click', function () {
            // Handle the smallAmount option if needed
            // cortado
            newButton7.remove();
            newButton8.remove();
            newButton9.remove();
            backgroundSection.style.backgroundImage = 'url("/media/res7.jpg")';
            resault.textContent = "We Suggest For You To Order:"
            paragraph.textContent = "Cortado."
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.id = 'back';
  
            // Append the back button to the document
            introSection.appendChild(backButton);
  
            // Add event listener to the back button
            backButton.addEventListener('click', function () {
              // Reload the page to go back to the initial state
              location.reload();
              
            });
          });

        });




      });
      newButton4.addEventListener('click', function () {
        // Handle the drip option if needed
        //v60, chemex
        newButton3.remove();
        newButton4.remove();
        backgroundSection.style.backgroundImage = 'url("/media/res8.jpg")';

        resault.textContent = "We Suggest For You To Order:";
        paragraph.textContent = "For light taste, tea-like texture: Chemex";
        const ex = document.createElement('p');
        ex.textContent = "For havey texture, strong taste: V60";
        introSection.appendChild(ex);
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.id = 'back';

        // Append the back button to the document
        introSection.appendChild(backButton);

        // Add event listener to the back button
        backButton.addEventListener('click', function () {
          // Reload the page to go back to the initial state
          location.reload();
          
        });

      });




    });
  }
});