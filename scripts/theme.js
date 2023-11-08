changeTheme();
let b = document.getElementById("themeChange");
b.onchange = onThemeChange;

if (localStorage.getItem('theme') == "dark")
{
    b.checked = true;
}else
{
    b.checked = false;
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
        document.documentElement.style.setProperty('--mb', "#1582ca");
        document.documentElement.style.setProperty('--db', "#bfdfff");
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