let url = 'https://script.google.com/macros/s/AKfycbyCiM5cJpCKDoRfkhOWVKanAwnY2YXPWaZW4gjQX3pxcskCzUsCS4lhe18wGxUSGq8f/exec';

let form = document.querySelector('form');
let messageParagraph = document.querySelector('p');
let overlay = document.getElementById('overlay');
let overlayMessage = document.getElementById('overlay-message');
let submitButton = document.querySelector('button[name="btn"]');

// Function to hide overlay when clicking anywhere on the page
document.addEventListener('click', (e) => {
    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
        messageParagraph.textContent = ''; // Clear any message
    }
});
document.querySelector('input').addEventListener('click', () => {
    messageParagraph.textContent = "";
})
document.getElementById('phone').addEventListener('input', function () {
    // Replace any non-numeric characters with an empty string
    this.value = this.value.replace(/\D/g, '');
    // Ensure the input value is at most 10 characters long
    if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
}
});

document.querySelector('#password').addEventListener('input', function (e) {
    const inputLength = e.target.value.length;

    // Example: Display a warning message
    if (inputLength > 4 && inputLength <= 8) {
        document.querySelector('p').textContent = 'Password is between 5 and 8 characters!';
    } else {
        document.querySelector('p').textContent = '';
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    // Get input values
    let name = document.getElementById('fname').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();

    // Check if all inputs are filled
    if (name === '' || phone === '' || email === '' || password === '') {
        messageParagraph.textContent = 'Please fill in all fields.';
        messageParagraph.style.color = 'red'; // Error message color
    } else {
        messageParagraph.textContent = ''; // Clear any previous message

        // Show overlay with submitting message
        overlay.style.display = 'flex';
        overlayMessage.textContent = 'Submitting...';

        let fData = new FormData(form);
        fetch(url, {
            method: 'POST',
            body: fData
        })
        .then(res => res.text())
        .then(finalResult => {
            submitButton.innerText = 'Sign-up';
            overlayMessage.textContent = finalResult;
            overlay.style.display = 'flex'; // Keep overlay visible
            messageParagraph.style.color = 'green'; // Success message color
            form.reset(); // Clear the form inputs

            // Hide overlay and message after 5 seconds
            setTimeout(() => {
                overlay.style.display = 'none';
                messageParagraph.textContent = '';
            }, 3000);
        })
        .catch(error => {
            overlayMessage.textContent = 'There was an error submitting the form.';
            overlay.style.display = 'flex';
            messageParagraph.style.color = 'red';
            submitButton.innerText = 'Sign-up';
        });
    }
});
