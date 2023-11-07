var headerDiv = document.querySelector(".header");

const xhr = new XMLHttpRequest();
xhr.open('GET', 'Header.html', false); 
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
    console.log(currentPage);
    if (navs[i].getAttribute("href") === currentPage || (navs[i].getAttribute("href") == "index.html" && currentPage==""))
    { 
      navs[i].classList.add("current");
      navs[i].setAttribute("href", "#");
    }
  }
  
  const serializer = new XMLSerializer();
  
  HeaderString = serializer.serializeToString(hDoc);
  headerDiv.innerHTML = HeaderString; //adding the modified header to the selected div.
}

