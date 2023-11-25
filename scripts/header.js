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

var dots = [];


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
window.addEventListener('resize', resizeCanvas);


function resizeCanvas()
{
  canvas.width = window.innerWidth;
  document.getElementById('canvas').height = document.getElementById("header").clientHeight;
  lineDistance = window.innerWidth / 15;
}


const deceleration = .01;
const minimumSpeed = .4;
const color = "#003554";
var lineDistance = window.innerWidth / 50;

resizeCanvas();

class vector2
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  distance(a)
  {
    let d = vector2.subtract(a, this);
    return Math.sqrt(d.x * d.x + d.y * d.y);
  }
  normilized()
  {
    let distance = this.distance(vector2.zero);
    return new vector2(this.x / distance, this.y / distance);
  }
  setValue(v)
  {
    this.x = v.x;
    this.y = v.y;
  }

  static add(a, b)
  {
    return new vector2(a.x + b.x, a.y + b.y);
  }
  static subtract(a, b)
  {
    return new vector2(a.x - b.x, a.y - b.y);
  }
  static multiply(a, b)
  {
    if (typeof(b) == 'vector2')
    {
      return new vector2(a.x * b.x, a.y * b.y);
    }
    else if(typeof(b) == 'number')
    {
      return new vector2(a.x * b, a.y * b);
    }
  }
  static isEqual(a, b)
  {
    return a.x == b.x && a.y == b.y? true : false;
  }


  static zero = new vector2(0, 0);
}

class Dot 
{
 constructor(x, y) 
 {
  this.pos = new vector2(x, y);
  this.size = Math.random() * 5 + 5;
  this.speed = new vector2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
  this.connections = [];
 }

 draw() 
 {
  context.fillStyle = color;
  context.strokeStyle = color;
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  for (let dot of this.connections)
  {
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(this.pos.x, this.pos.y);
    context.lineTo(dot.pos.x, dot.pos.y);
    context.closePath();
    context.stroke();
  }
 }

 update() 
 {
  this.pos.x += this.speed.x;
  this.pos.y += this.speed.y;
  this.speed.x = (minimumSpeed > this.speed.x && this.speed.x > -minimumSpeed)? this.speed.x : this.speed.x - (deceleration * Math.sign(this.speed.x));
  this.speed.y = (minimumSpeed > this.speed.y && this.speed.y > -minimumSpeed)? this.speed.y : this.speed.y - (deceleration * Math.sign(this.speed.y));

  if (this.pos.x < 0 && this.speed.x < 0) 
  {
    this.speed.x = -this.speed.x;
  }
  if (this.pos.x > canvas.width && this.speed.x > 0) 
  {
    this.speed.x = -this.speed.x;
  }
  
  if (this.pos.y < 0 && this.speed.y < 0) 
  {
    this.speed.y = -this.speed.y;
  }
  if (this.pos.y > canvas.height && this.speed.y > 0) 
  {
    this.speed.y = -this.speed.y;
  }
 }
}

for (let i = 0; i < 30; i++) //creating the dots.
{
 let v = new vector2(Math.random() * canvas.width, Math.random() * canvas.height);
 dots.push(new Dot(v.x, v.y));
}

function animate() 
{
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  addLineBetweenDots();
  for (let dot of dots)
  {
    dot.draw();
    dot.update();
  }
}

animate();

canvas.addEventListener("mousemove", onMouseMove); 
function onMouseMove(event) 
{
  for (let dot of dots) 
 {
  
  let mousePos = new vector2(event.clientX, event.clientY);
  let d = vector2.subtract(mousePos, dot.pos);
  
  let distance = d.distance(vector2.zero);

  if (distance < 300) 
  {
    dot.speed = vector2.multiply(vector2.subtract(vector2.zero, d.normilized()), 2);
  }

  addLineBetweenDots();
 }
};

function addLineBetweenDots()
{
  for(let dot1 of dots)
  {
    for (let dot2 of dots)
    {
      dot1.connections = [];
      if (dot1 == this)
      {
        return;
      }
      
      let cdistance = dot1.pos.distance(dot2.pos);

      if (cdistance < lineDistance)
      {
        dot2.connections.push(dot1);
      }
      if (cdistance < dot2.size + dot1.size)
      {
        vector2.multiply(dot2.speed, -1);
        vector2.multiply(dot1.speed, -1);
      }
    }
  }    
}
addLineBetweenDots();
