let Articles = document.getElementsByClassName("news")[0];
let number = 3;

const articlesPath = '/articles/'; 

var articlesJson;

async function generateArticlePreview(text)
{
    let articleListPath = '/articles.json';
    await fetch(articlesPath + articleListPath).then(res => res.json()).then(res =>{
        var keys = Object.keys(res);
        var count = Articles.getAttribute("data-Count");
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

function addToDoc(articlePath, template)
{
    fetch(articlePath).then(art => art.text()).then(art => { 
        const parser = new DOMParser();
        var doc = parser.parseFromString(template, "text/html");
        var artDOM = parser.parseFromString(art, "text/html");
        doc.querySelector(".anchor").innerHTML = artDOM.getElementsByTagName("title")[0].textContent;
        doc.querySelector(".preview").innerHTML = artDOM.getElementsByName("description")[0].getAttribute("content");
        doc.querySelector(".anchor").setAttribute("href", articlePath);
        const serilizer = new XMLSerializer();
        
        Articles.innerHTML += serilizer.serializeToString(doc);    
    })
}

fetch("htmlTemplates/ArticlePreview.html").then(res => res.text()).then(res => {
    generateArticlePreview(res);        
})

