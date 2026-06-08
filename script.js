// মোবাইল মেনু টগল করার ফাংশন
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-links li a');

// হ্যামবার্গার মেনুতে ক্লিক করলে মেনু ওপেন/ক্লোজ হবে
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// মেনুর যেকোনো লিংকে ক্লিক করলে মেনু অটোমেটিক বন্ধ হয়ে যাবে
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// মেনু থেকে ক্লিক করলে নির্দিষ্ট সেকশনে স্মুথ স্ক্রলিং 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        if (this.classList.contains('nav-links a')) {
            this.classList.add('active');
        }

        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } 
        else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = window.innerWidth <= 768 ? 60 : 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset, 
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Gallery Lightbox Functionality
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-img');
const closeLightbox = document.querySelector('.close-lightbox');

// প্রতিটি ছবিতে ক্লিক করার ইভেন্ট
galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.display = 'flex'; // লাইটবক্স শো করবে
        lightboxImg.src = this.src; // যে ছবিতে ক্লিক করা হয়েছে সেটা দেখাবে
    });
});

// ক্রস (X) বাটনে ক্লিক করলে লাইটবক্স বন্ধ হবে
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// ছবির বাইরের কালো অংশে ক্লিক করলেও লাইটবক্স বন্ধ হবে
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
