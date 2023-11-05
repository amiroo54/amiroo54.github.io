const Heading = document.querySelector("h1");
const image = document.querySelector("img");
const button = document.getElementById("button");

Heading.textContent = "Hello world!";
button.onclick = () => {image.width=500};
