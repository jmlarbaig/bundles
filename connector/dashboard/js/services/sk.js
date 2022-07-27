// Paramètre généraux
// var skStaticUrl = "SK/Satatic_beta_CIS_simul.json";
// var skDynamicUrl = "SK/Dynamics_beta_CIS_simul.json";

// Paramètre Dynamique
// var skStaticUrl = "http://10.17.86.41:5000/Satatic_beta_CIS_210603_1.json";
// var skDynamicUrl = "http://10.17.86.41:5000/Dynamics_beta_CIS_210605.json";

async function getStatics(skStaticUrl) {
    let response = await fetch(skStaticUrl,{cache: "no-store"} );
    let currentHeatInfo = await response.json();
    return currentHeatInfo;
}

async function getDynamics(skDynamicUrl) {
    let response = await fetch(skDynamicUrl, {cache: "no-store"});
    let currentHeatInfo = await response.json();
    return currentHeatInfo;
}
