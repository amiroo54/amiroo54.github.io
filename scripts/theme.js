changeTheme();
//changeLanguage();
let t = document.getElementById("themeChange");
t.onchange = onThemeChange;

//let l = document.getElementById("language");
//l.onclick = setLanguage;

if (localStorage.getItem('theme') == "dark")
{
    t.checked = true;
}else
{
    t.checked = false;
}

function onThemeChange()
{
    if (this.checked)
    {
        localStorage.setItem("theme", "dark");
        changeTheme();
    }else
    {
        localStorage.setItem("theme", "light");
        changeTheme();
    }
}
function changeTheme()
{

    let currentTheme = localStorage.getItem("theme");
    var icon = document.querySelector('[rel="icon"');

    if (currentTheme == "dark")
    {
        //change everything to dark.
        icon.setAttribute("href", "/resources/Icons/Icon-Light-512.png");
        document.documentElement.style.setProperty('--w', "#051923");
        document.documentElement.style.setProperty('--lb', "#003554");
        document.documentElement.style.setProperty('--b', "#006494");
        document.documentElement.style.setProperty('--mb', "#bfdfff");
        document.documentElement.style.setProperty('--db', "#1582ca");
    } else if(currentTheme == "light")
    {
        //change everything to light.
        icon.setAttribute("href", "/resources/Icons/Icon-Dark-512.png");
        document.documentElement.style.setProperty('--db', "#051923");
        document.documentElement.style.setProperty('--mb', "#003554");
        document.documentElement.style.setProperty('--b', "#006494");
        document.documentElement.style.setProperty('--lb', "#1582ca");
        document.documentElement.style.setProperty('--w', "#bfdfff");
    }
}