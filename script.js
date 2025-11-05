document.addEventListener("DOMContentLoaded", () => {
    
    // ======== 1. Mobile Hamburger Menu ========
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // ======== 2. Typing Animation ========
    const typingText = document.querySelector(".typing-text");
    const roles = ["Front-End Developer", "Cybersecurity Enthusiast", "B.Tech Student"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        const currentText = currentRole.substring(0, charIndex);

        typingText.textContent = currentText;

        if (!isDeleting) {
            // Typing forward
            charIndex++;
            if (charIndex > currentRole.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Wait 2s before deleting
            } else {
                setTimeout(type, 100); // Typing speed
            }
        } else {
            // Deleting
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500); // Wait 0.5s before typing next role
            } else {
                setTimeout(type, 50); // Deleting speed
            }
        }
    }

    // Start the typing animation
    type();

    // ======== 3. Active Nav Link on Scroll ========
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the corresponding nav link
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to the current link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ======== 4. Fade-in Animation on Scroll ========
    const hiddenElements = document.querySelectorAll(".hidden");

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } 
            // Optional: Remove 'show' to re-animate on scroll up
            // else {
            //     entry.target.classList.remove("show");
            // }
        });
    }, { threshold: 0.15 }); // Triggers when 15% of the element is visible

    hiddenElements.forEach((el) => scrollObserver.observe(el));
});