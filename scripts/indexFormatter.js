var articles = document.getElementById("news");
let number = 1;

const articlesPath = '/articles/'; 


async function getRandomArticle(_callback, text)
{
    await fetch(articlesPath + `/index.json`).then(res => res.json()).then(res =>{
        _callback(articlesPath + res['articles']['1'], text);
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
    for (let i = 0; i < number; i++)
    {
        //choosing articles.
        let articlePath = getRandomArticle(addToDoc, text);        
    }
})

