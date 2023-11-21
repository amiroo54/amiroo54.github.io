let codes = document.querySelectorAll("code");

const expressions = ["=", ">", "<", ">=", "<=",  "/", "+", "-", "*", "%", "+=", "-=", "*=", "/=", "new", "if", "static"];
const keywords = ["let", "class", "var", "const", "function", "constructor", "int", "string", "String", "float", "private", "print", "console"];
const symbols = ["(", ")", ";", ":"]
const serializer = new XMLSerializer();

for (let i = 0; i < codes.length; i++)
{
    let code = codes[i];
    code.setAttribute("class", "code");
    codifyCode(code);
}


let x = 10 ;


function codifyCode(code)
{
    let subCodes = code.textContent.split(" "); // getting arrays of subtexts;
    let latsOneKeyword = true; //this is for coloring the texts after a keyword;
    for (let i = 0; i < subCodes.length; i++)
    {
        for (let j = 0; j < symbols.length; j++)
        {
            let symbol = symbols[j];
            let symbolIndex = subCodes[i].indexOf(symbol);
            if (symbolIndex > -1 && !(subCodes[i] == symbol))
            {
                let splits = subCodes[i].split(symbol);
                subCodes[i] = splits[0];
                let index = i + 1;
                subCodes.splice(index, 0, symbol);
                subCodes.splice(index + 1, 0, splits[1]);
            }
        }
        if (subCodes[i].includes("'") || subCodes[i].includes('"'))
        {
            hasFound = false;
            let index = i + 1;
            while (!hasFound)
            {
                if(subCodes[index].includes("'") || subCodes[index].includes('"'))
                {
                    hasFound = true;

                    var newFullString = "";
                    newFullString += subCodes.splice(i, index - i + 1);
                }
                newFullString = newFullString.replace(",", " ");
                subCodes.splice(i, 0, newFullString);
            }
            
        }
    }
    code.textContent = ""; // clearing the text;
    
    //preparing the language name on top of the code block;
    let langName = code.getAttribute("data-language");
    let langNode = document.createElement("div");
    langNode.setAttribute("class", "codeName");
    langNode.appendChild(document.createElement("h2"));
    langNode.firstChild.textContent = langName;
    langNode.firstChild.setAttribute("class", "codeName");
    code.appendChild(langNode);

    // preparing the main text content;
    let textNode = document.createElement("p");
    textNode.setAttribute("class", "codeText");

    for (let i = 0; i < subCodes.length; i++)
    {
        let subCode = subCodes[i];
        if (subCode[0] == "'" || subCode[0] == '"')
        {
            textNode.appendChild(generateCodeNode(subCode, "string"));
        }
        else if (symbols.find(e => e == subCode))
        {
            textNode.appendChild(generateCodeNode(subCode, "semicolon"));
        }
        else if (expressions.find(e => e == subCode))
        {
            textNode.appendChild(generateCodeNode(subCode, "expression"));
            latsOneKeyword = true;
        }
        else if (keywords.find(e => e == subCode))
        {
            textNode.appendChild(generateCodeNode(subCode, "keyword"));
            latsOneKeyword = true;
        }
        else if(latsOneKeyword)
        {
            if (parseInt(subCode) || parseFloat(subCode))
            {
                textNode.appendChild(generateCodeNode(subCode, "value"))
            }
            else
            {
                textNode.appendChild(generateCodeNode(subCode, "name"));
            }
            latsOneKeyword = false;
        }
        else
        {
            textNode.appendChild(generateCodeNode(subCode, "other"));
        }
    }

    code.appendChild(textNode);
}

function generateCodeNode(subCode, nodeClass)
{
    let node = document.createElement("span");
    node.setAttribute("class", nodeClass);
    node.innerHTML = subCode + " ";
    return node;
}