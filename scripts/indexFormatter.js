var articles = document.getElementById("news");
let number = 3;

const articlesPath = '/articles/'; 

var articlesJson;

async function generateArticlePreview(text)
{
    await fetch(articlesPath + `/index.json`).then(res => res.json()).then(res =>{
        var keys = Object.keys(res)
        var count = articles.getAttribute("data-Count");
        if (count == "all")
        {
            number = keys.length;
        }
        else
        {
            number = count;
        }
        for (let i = 0; i < number; i++)
        {
            const randIndex = Math.floor(Math.random() * keys.length)
            const randKey = keys[randIndex]
            keys.splice(randIndex, 1);
            const name = res[randKey]
            addToDoc(articlesPath + name, text);
        }
    });
    
}

function addToDoc(articlePath, text)
{
    fetch(articlePath).then(art => art.text()).then(art => { 
        const parser = new DOMParser();
        var doc = parser.parseFromString(text, "text/html");
        var artDOM = parser.parseFromString(art, "text/html");
        doc.querySelector(".title").innerHTML = artDOM.getElementsByTagName("title")[0].textContent;
        doc.querySelector(".preview").innerHTML = artDOM.getElementsByName("description")[0].getAttribute("content");
        doc.querySelector(".title").setAttribute("href", articlePath);
        const serilizer = new XMLSerializer();
        articles.innerHTML += serilizer.serializeToString(doc);
    })
}

fetch("htmlTemplates/ArticlePreview.html").then(text => text.text()).then(text => {
    generateArticlePreview(text);        
})

