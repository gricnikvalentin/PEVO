document.addEventListener("DOMContentLoaded", () => {
    // Select all navbar buttons with anchor links
    const navButtons = document.querySelectorAll('.nav-button');

    // Add click event listener to each button
    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent the default anchor link behavior
            event.preventDefault();

            // Get the target section's ID from the href attribute
            const targetId = button.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Scroll to the target section smoothly
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});



var i = 0;
var images =[];
var time = 10000;

images[0] = 'slike/meltSpinnerets.png'
images[1] = 'slike/meltSpinnerets2.png'
images[2] = 'slike/migrationNozzle.png'
images[3] = 'slike/oilingNozzle.png'
images[4] = 'slike/guideAndFriscionDisck.png'


function changeImg(){
    document.slide.src = images[i]
    console.log(i);
    if(i < images.length - 1){
        i++;
    }
    else {
        i = 0;
    }
    setTimeout("changeImg()", time);
}
window.onload = changeImg;