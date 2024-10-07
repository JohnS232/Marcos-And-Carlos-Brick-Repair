// Select DOM elements for the mobile menu and logo
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#logo');

// Function to display the mobile menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

// Add event listener to toggle the mobile menu on click
menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#Home');
    const aboutMenu = document.querySelector('#About');
    const servicesMenu = document.querySelector('#Services');
    const contactMenu = document.querySelector('#Contact');
    const galleryMenu = document.querySelector('#Gallery'); 
    let scrollPos = window.scrollY;

    if (window.innerWidth > 960) {
        if (scrollPos < 600) {
            homeMenu.classList.add('highlight');
            aboutMenu.classList.remove('highlight');
            servicesMenu.classList.remove('highlight');
            galleryMenu.classList.remove('highlight');
            contactMenu.classList.remove('highlight');
        } else if (scrollPos >= 600 && scrollPos < 1400) {
            aboutMenu.classList.add('highlight');
            homeMenu.classList.remove('highlight');
            servicesMenu.classList.remove('highlight');
            galleryMenu.classList.remove('highlight');
            contactMenu.classList.remove('highlight');
        } else if (scrollPos >= 1400 && scrollPos < 2345) {
            servicesMenu.classList.add('highlight');
            aboutMenu.classList.remove('highlight');
            galleryMenu.classList.remove('highlight');
            contactMenu.classList.remove('highlight');
        } else if (scrollPos >= 2345 && scrollPos < 3000) { 
            galleryMenu.classList.add('highlight');
            servicesMenu.classList.remove('highlight');
            contactMenu.classList.remove('highlight');
        } else if (scrollPos >= 3000) { 
            contactMenu.classList.add('highlight');
            galleryMenu.classList.remove('highlight');
            servicesMenu.classList.remove('highlight');
        }
    }

    if (elem && (window.innerWidth < 960 || scrollPos < 600)) {
        elem.classList.remove('highlight');
    }
};

// Add event listeners for scroll and click to trigger highlightMenu
window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close mobile menu when clicking on a link
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

// Add event listeners to hide mobile menu on link click or logo click
menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// EmailJS form submission integration
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    
    emailjs.sendForm('service_ud7g4vt', 'template_qw69fcc', this)
        .then(function() {
            alert('SUCCESS! Your appointment request has been sent.');
        }, function(error) {
            alert('FAILED... Please try again.' + JSON.stringify(error));
        });
});

// Initialize Google Maps
function initMap() {
    var businessLocation = {lat: 42.1382114, lng: -83.4712585}; // Replace with the actual coordinates of your business
    
    // Map Options
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: businessLocation
    });
    
    // Marker for Business Location
    var marker = new google.maps.Marker({
        position: businessLocation,
        map: map
    });
}

// Calculate distance
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var address = document.getElementById('address').value;
    if (address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status === 'OK') {
                var userLocation = results[0].geometry.location;

                var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix({
                    origins: [userLocation],
                    destinations: [businessLocation],
                    travelMode: 'DRIVING',
                }, function(response, status) {
                    if (status === 'OK') {
                        var distance = response.rows[0].elements[0].distance.text;
                        var duration = response.rows[0].elements[0].duration.text;

                        // Display the distance and duration
                        document.getElementById('distance').innerText = 'Distance: ' + distance;
                        document.getElementById('duration').innerText = 'Estimated Time: ' + duration;
                        document.getElementById('distance-result').style.display = 'block';
                    } else {
                        alert('Error calculating distance: ' + status);
                    }
                });
            } else {
                alert('Geocode was not successful: ' + status);
            }
        });
    } else {
        alert('Please enter your address.');
    }
});
