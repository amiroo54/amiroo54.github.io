var headerDiv = document.querySelector(".header");

const HeaderString = 
'<header><h1>Amiroof\'s very Professional Website</h1></header>' +
'<nav>' +
'    <ul class="nav">' +
'        <li><a href="index.html">Home</a></li>' +
'        <li><a href="Projects.html">Projects</a></li>' +
'        <li><a href="#">Articles</a></li>' +
'    </ul>' +
'</nav>' ;

/*
const input = document.getElementById("file-sel");

input.addEventListener('change', handleFiles, false);

function handleFiles()
{
    var fr = new FileReader(); 
    fr.onload=function()
    { 
        console.debug(fr.result);
        loadHeader(fr.result);
    } 

    fr.readAsText(this.files[0]);
}
*/
loadHeader(HeaderString);
function loadHeader(HeaderString)
{
    const parser = new DOMParser();
    const hDoc = parser.parseFromString(HeaderString, "text/html"); //getting a DOM object from the string.
    

    var navs = hDoc.querySelectorAll(".nav a");
    var currentPage = window.location.href.split("/").pop().replace("#", ""); //getting current page url.
    console.debug(currentPage);
    for (var i = 0; i < navs.length; i++) 
    {
        if (navs[i].getAttribute("href") === currentPage) 
        { 
            //changing attributes in the selected nav.
            navs[i].classList.add("current");
            navs[i].setAttribute("href", "#");
        }
    }
    
    const serializer = new XMLSerializer();
    
    HeaderString = serializer.serializeToString(hDoc);
    headerDiv.innerHTML = HeaderString; //adding the modified header to the selected div.
}

