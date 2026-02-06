document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("h1, p, ul, button");

    elements.forEach((el, index) => {
        el.classList.add("fade-in");
        el.style.animationDelay = `${index * 0.2}s`;
    });
});
