window.addEventListener('load', function() {
    setTimeout (function(){
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
},2000);

});


document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Form validation before submission
    document.querySelector("form").addEventListener("submit", function (e) {
        const name = document.querySelector("input[name='name']").value.trim();
        const email = document.querySelector("input[name='email']").value.trim();
        const phone = document.querySelector("input[name='phone']").value.trim();
        const subject = document.querySelector("input[name='subject']").value.trim();
        const message = document.querySelector("textarea[name='message']").value.trim();

        if (name === "" || email === "" || phone === "" || subject === "" || message === "") {
            e.preventDefault();
            alert("Please fill out all fields before submitting.");
            return;
        }

        // Send form data to Web3Forms API
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: new FormData(e.target),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Message sent successfully! We will get back to you soon.");
                e.target.reset(); // Clear the form
                window.location.href = "https://yourwebsite.com/thank-you.html"; // Redirect to Thank You page
            } else {
                alert("Error sending message. Please try again later.");
            }
        })
        .catch(error => {
            alert("Network error. Please check your internet connection.");
        });

        e.preventDefault(); // Prevent default form submission
    });
});
