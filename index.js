// AJAX call from json file to fetch user's review
fetch("testimonials.json")
    .then(response => response.json())
    .then(data => {
        const testimonialContainer1 = document.querySelector("#testimonial-container-1");
        const testimonialContainer2 = document.querySelector("#testimonial-container-2");

        data.forEach((testimonial, index) => {
            const testimonialHtml = `
            <div class="col-lg-4">
                <div class="card">
                    <div class="box front">
                        <img src="${testimonial.img}" class="card-img-top" alt="">
                        <h4 class="card-text">${testimonial.testimonial}</h4>
                        <h4>${testimonial.occupation || ""}</h4>
                        <p class="card-title">${testimonial.name}</p>
                    </div>
                </div>
            </div>`;
            if (index % 2 === 0) {
                testimonialContainer1.insertAdjacentHTML("beforeend", testimonialHtml);
            } else {
                testimonialContainer2.insertAdjacentHTML("beforeend", testimonialHtml);
            }
        });
    })
    .catch(error => console.log(error));

// Contact form interaction
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent the form from submitting

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const query = form.querySelector('textarea[name="query"]').value;
    const terms = form.querySelector('input[name="terms"]').checked;

    if (name.trim() === '') {
        alert('Please enter your full name.');
        return;
    }
    if (email.trim() === '') {
        alert('Please enter your email address.');
        return;
    }
    if (phone.trim() === '') {
        alert('Please enter your phone number.');
        return;
    }
    if (query.trim() === '') {
        alert('Please enter your query.');
        return;
    }
    if (!terms) {
        alert('Please agree to the terms and conditions.');
        return;
    }

    // Submit form data via AJAX
    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: query,
                terms: terms
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('An error occurred while submitting the form. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while submitting the form. Please try again.');
    }

    form.reset();
});

// Scroll to the top button
const scrollTopButton = document.querySelector("#scroll-top-button");

const onScroll = (event) => {
    const scrollPosition = event.target.scrollingElement.scrollTop;
    scrollTopButton.classList.toggle("visible", scrollPosition > 0);
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

document.addEventListener("scroll", onScroll);
