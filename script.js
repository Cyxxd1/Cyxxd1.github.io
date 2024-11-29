const text = [
    "Hi there, I'm Yi Xun.",
    "Welcome to my website!"
];

const typingSpeed = 10; // Speed of typing (in milliseconds)
const delayBetweenLines = 500; // Delay between lines
let currentIndex = 0; // Tracks which line is being typed

const typeText = (textArray, elementId, callback) => {
    const element = document.getElementById(elementId);
    const typeLine = () => {
        if (currentIndex < textArray.length) {
            const lineText = textArray[currentIndex];
            let charIndex = 0;

            const typeChar = () => {
                if (charIndex < lineText.length) {
                    // Add the current character to the line
                    element.innerHTML += lineText[charIndex];
                    charIndex++;
                    setTimeout(typeChar, typingSpeed);
                } else {
                    // When the current line is finished, move to the next line
                    currentIndex++;
                    if (currentIndex < textArray.length) {
                        setTimeout(() => {
                            // Add a line break for the next line
                            element.innerHTML += "<br>";
                            typeLine(); // Start typing the next line
                        }, delayBetweenLines);
                    } else {
                        // Typing complete, invoke the callback
                        setTimeout(callback, delayBetweenLines);
                    }
                }
            };

            typeChar(); // Start typing the current line
        }
    };

    typeLine(); // Start the typing process
};

// Show main content after typing
const showContent = () => {
    const typingElement = document.querySelector('.typing');
    const contentElement = document.querySelector('.content');

    // Hide the typing splash
    typingElement.style.display = 'none';

    // Show the main content
    contentElement.classList.remove('hidden');
    contentElement.classList.add('show');
};

// Start typing animation on page load
window.onload = () => {
    typeText(text, "typed-text", showContent);
};
