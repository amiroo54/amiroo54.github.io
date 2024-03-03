
function getKeyPrice()
{
    const TF2AppId = 440;
    const MannCoSupplyCrateKeyHashName = "Mann Co. Supply Crate Key"
    const Key = "C769E88431D6F887F8EDD34FBF63949A";
    const SteamURL = `https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v0001/?key=${Key}&appid=${TF2AppId}`;
    fetch(SteamURL).then((res) => res.json()).then((res) =>
    {
        console.log(res);
    })
}

getKeyPrice();