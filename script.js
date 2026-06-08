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

// কন্টাক্ট ফর্ম সাবমিশনের জন্য জাভাস্ক্রিপ্ট কোড
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ফর্মের ডিফল্ট সাবমিট বন্ধ করা

    // ফর্মের ডাটা সংগ্রহ করা
    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Web3Forms API-তে ডাটা পাঠানো (সঠিক API ইউআরএল ব্যবহার করা হয়েছে)
    fetch('https://web3forms.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
            alert("ধন্যবাদ! আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। সিয়াম ভাইয়া খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।");
            this.reset(); // ফর্মটি খালি করা
        } else {
            alert("দুঃখিত! " + res.message);
        }
    })
    .catch(error => {
        console.log(error);
        alert("নেটওয়ার্ক সমস্যা! অনুগ্রহ করে আবার চেষ্টা করুন।");
    });
}); // <--- সাবমিট ইভেন্টের ব্র্যাকেট সঠিকভাবে শেষ করা হয়েছে

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
