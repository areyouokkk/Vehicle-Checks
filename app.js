document.addEventListener('DOMContentLoaded', () => {
  console.log("JS Loaded");

  // Handle navigation to category pages
  const featureContainers = document.querySelectorAll('.feature-cont');
  featureContainers.forEach(container => {
    container.addEventListener('click', () => {
      const category = container.getAttribute('data-page');
      console.log(`Category clicked: ${category}`);
      
      // Check if category is marked as completed
      const isCompleted = localStorage.getItem(`${category}Completed`) === 'true';
      
      if (isCompleted) {
        console.log(`${category} is already completed. No action taken.`);
        return; // If completed, do nothing
      }
      
      // Navigate to the corresponding page if not completed
      window.location.href = `${category}.html`; // Redirect to the category page
    });
  });

  // Only run category completion check if on the home page
  const isHomePage = window.location.pathname.includes("index.html"); // Adjust if your home page URL differs

  if (isHomePage) {
    // Check if the category is marked as completed on the home page
    const checkCategoryCompletion = (category) => {
      const isCompleted = localStorage.getItem(`${category}Completed`) === 'true';
      console.log(`${category} completed? ${isCompleted}`);

      // Try to find the category element by its ID
      const categoryElement = document.querySelector(`#${category}`);
      if (categoryElement) {
        if (isCompleted) {
          categoryElement.style.backgroundColor = 'green'; // Change background color to green
          // Disable access to completed category by adding a class or style
          const categoryButton = categoryElement.querySelector('.feature-cont');
          if (categoryButton) {
            categoryButton.disabled = true; // Disable category button for completed category
            categoryButton.style.cursor = 'not-allowed'; // Change cursor to indicate no access
          }
        }
      } else {
        console.warn(`Element with ID ${category} not found`);
      }
    };

    // Loop through all categories to check if they are completed
    const categories = ['exterior', 'tyres', 'lights', 'fluids', 'interior', 'report'];
    categories.forEach(checkCategoryCompletion);
  }

  // Handle button click for Yes/No answers on category pages
  const buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const checkType = event.target.getAttribute('data-check');
      const answer = event.target.getAttribute('data-value');
      console.log(`${checkType}: ${answer}`);

      // Store answer in localStorage for the specific question
      localStorage.setItem(`${checkType}_answer`, answer);  // Store answers without timestamps

      // Disable the clicked button to prevent re-answering
      event.target.disabled = true;

      // Hide the parent container after answering
      const container = event.target.closest('.container-checks'); // Get the parent container
      container.style.display = 'none'; // Hide the container

      // Check if it's the last question on the current page
      const allQuestionsAnswered = document.querySelectorAll('.container-checks').length === document.querySelectorAll('.container-checks button:disabled').length;

      if (allQuestionsAnswered) {
        const category = window.location.pathname.split('/').pop().split('.html')[0]; // Extract category name from URL
        localStorage.setItem(`${category}Completed`, 'true'); // Mark category as completed
        console.log(`${category} marked as completed in localStorage`);

        // Redirect back to home page after completion
        setTimeout(() => {
          window.location.href = 'index.html'; // Redirect to home page
        }, 1000); // Delay for better UX
      }
    });
  });
});




// Make sure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners to buttons
  document.querySelectorAll('.yes-btn, .no-btn').forEach(button => {
      button.addEventListener('click', function() {
          const checkName = this.getAttribute('data-check'); // Get the category (e.g., "windscreen")
          const value = this.getAttribute('data-value'); // Get "yes" or "no"

          // Save the result to localStorage
          localStorage.setItem(`${checkName}_answer`, value);
      });
  });
});


document.getElementById('reset-btn').addEventListener('click', function() {
  // Clear all items from localStorage
  localStorage.clear();

  // Optionally reload the page after resetting
  window.location.reload(); // Optional: reload the page after reset
});


