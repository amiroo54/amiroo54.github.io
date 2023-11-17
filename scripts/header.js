var headerDiv = document.querySelector(".header");

const xhr = new XMLHttpRequest();
xhr.open('GET', '/htmlTemplates/Header.html', false); 
xhr.send();

if (xhr.status == 200)
{
  loadHeader(xhr.responseText);
}

function loadHeader(HeaderString)
{
  const parser = new DOMParser();
  const hDoc = parser.parseFromString(HeaderString, "text/html"); //getting a DOM object from the string.
  

  var navs = hDoc.querySelectorAll(".nav a");
  var currentPage = window.location.href.split("/").pop().replace("#", ""); //getting current page url.
  for (var i = 0; i < navs.length; i++) 
  {
    if (navs[i].getAttribute("href") === "/" + currentPage || (navs[i].getAttribute("href") == "/index.html" && currentPage==""))
    { 
      navs[i].classList.add("current");
      navs[i].setAttribute("href", "#");
    }
  }

  const serializer = new XMLSerializer();
  
  HeaderString = serializer.serializeToString(hDoc);
  headerDiv.innerHTML = HeaderString; 
}


const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = document.getElementById("header").clientHeight;

window.addEventListener('resize', () => 
{
  console.log("changes size");
  console.log(canvas);
  document.getElementById('canvas').height = document.getElementById("header").clientHeight;
});

const context = canvas.getContext("2d");


const deceleration = .01;
const minimumSpeed = .4;
const color = "#003554";

let dots = [];

class Dot 
{
 constructor(x, y) 
 {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 10 + 5;
  this.speedX = (Math.random() - 0.5) * 2;
  this.speedY = (Math.random() - 0.5) * 2;
  this.connections = [];
 }

 draw() 
 {
  context.fillStyle = color;
  context.strokeStyle = color;
  context.beginPath();
  context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  for (let dot of this.connections)
  {
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(this.x, this.y);
    context.lineTo(dot.x, dot.y);
    context.closePath();
    context.stroke();
  }
 }

 update() 
 {
  this.x += this.speedX;
  this.y += this.speedY;

  this.speedX = (minimumSpeed > this.speedX && this.speedX > -minimumSpeed)? this.speedX : this.speedX - (deceleration * Math.sign(this.speedX));
  this.speedY = (minimumSpeed > this.speedY && this.speedY > -minimumSpeed)? this.speedY : this.speedY - (deceleration * Math.sign(this.speedY));

  if (this.x < 0 && this.speedX < 0) 
  {
    this.speedX = -this.speedX;
  }
  if (this.x > canvas.width && this.speedX > 0) 
  {
    this.speedX = -this.speedX;
  }
  

  if (this.y < 0 && this.speedY < 0) 
  {
    this.speedY = -this.speedY;
  }
  if (this.y > canvas.height && this.speedY > 0) 
  {
    this.speedY = -this.speedY;
  }
 }
}

for (let i = 0; i < 30; i++) 
{
 let x = Math.random() * canvas.width;
 let y = Math.random() * canvas.height;
 let dot = new Dot(x, y);
 dots.push(dot);
}

function animate() 
{
 requestAnimationFrame(animate);
 context.clearRect(0, 0, canvas.width, canvas.height);

 for (let dot of dots) 
 {
  dot.draw();
  dot.update();
 }
}

animate();

canvas.addEventListener("mousemove", (event) => 
{
 for (let dot of dots) 
 {
  dot.connections = [];
  let dx = event.clientX - dot.x;
  let dy = event.clientY - dot.y;
  let distance = Math.sqrt(dx*dx + dy*dy);

  if (distance < 300) 
  {
   dot.speedX = -(dx / distance) * 2;
   dot.speedY = -(dy / distance) * 2; // use a vector2 (or something similar) and normilize it.
  }

  for (let d of dots)
  {
    if (d == this)
    {
      continue;
    }
    let cx = d.x - dot.x;
    let cy = d.y - dot.y;
    let cdistance = Math.sqrt(cx*cx + cy*cy);

    if (cdistance < 300)
    {
      dot.connections.push(d);
    }
  }
 }
});