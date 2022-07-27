const Config = {
    "BgColor":"",
    "ChronoColor":"",
    "TxChronoColor":"",
    "WodColor":"",
    "TxWodColor":"",
    "MainColor":"",
    "SecondColor":"",
    "FinishRankColor":"",
    "FirstRankColor":"",
    "SecondRankColor":"",
    "ThirdRankColor":"",
    "TransparenceLogo":0,
    "Border":true,
    "TxMainColor":"",
    "TxSecondColor":"",
    "TxFinishRankColor":"",
    "TxFirstRankColor":"",
    "TxSecondRankColor":"",
    "TxThirdRankColor":"",

    // "CellBgColor":"",
    // "TxCellBgColor":"",
    // "LeftRankColor":"",
    // "TxLeftRankColor":"",
    // "RightRankColor":"",
    // "TxRightRankColor":"",
    // "LeftScoreColor":"",
    // "TxLeftScoreColor":"",
    // "RightScoreColor":"",
    // "TxRightScoreColor":"",

    "PositionXChrono":0,
    "PositionYChrono":0,
}

const Colors = nodecg.Replicant('Colors');

// const BgColor = nodecg.Replicant('BgColor')
// const MainColor = nodecg.Replicant('MainColor')
// const SecondColor = nodecg.Replicant('SecondColor')

// const FinishRankColor = nodecg.Replicant('FinishRankColor')
// const FirstRankColor = nodecg.Replicant('FirstRankColor')
// const SecondRankColor = nodecg.Replicant('SecondRankColor')
// const ThirdRankColor = nodecg.Replicant('ThirdRankColor')

const TransparenceLogo = nodecg.Replicant('TransparenceLogo')
const Border = nodecg.Replicant('Border');

const logoEvent = nodecg.Replicant('assets:logoEvent');
const pubVideo = nodecg.Replicant('assets:pub');
const videoAth = nodecg.Replicant('assets:ath');

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}


function Actualiser(){
    

    // BgColor.value = document.getElementById("bg__color").value;
    // MainColor.value = document.getElementById("main__color").value;
    // SecondColor.value = document.getElementById("second__color").value;

    // FinishRankColor.value = document.getElementById("finish__color").value;
    // FirstRankColor.value = document.getElementById("first_rank__color").value;
    // SecondRankColor.value = document.getElementById("second_rank__color").value;
    // ThirdRankColor.value = document.getElementById("third_rank__color").value;

    // TransparenceLogo.value = document.getElementById("transparence_logo").value/ 100;
    Border.value = document.getElementById("border").checked;

    var bg_trans = document.getElementById("bg_trans").checked;

    if(bg_trans == true){
        Config.BgColor = "rgba(0,0,0,0)";
    }
    else{
        Config.BgColor = document.getElementById("bg__color").value;
    }

    Config.ChronoColor = document.getElementById("chrono_color").value;
    Config.TxChronoColor = document.getElementById("tx_chrono_color").value

    Config.WodColor = document.getElementById("wod_color").value;
    Config.TxWodColor = document.getElementById("tx_wod_color").value

    Config.MainColor = document.getElementById("main__color").value;
    Config.SecondColor = document.getElementById("second__color").value;

    Config.FinishRankColor = document.getElementById("finish__color").value;
    Config.FirstRankColor = document.getElementById("first_rank__color").value;
    Config.SecondRankColor = document.getElementById("second_rank__color").value;
    Config.ThirdRankColor = document.getElementById("third_rank__color").value;

    Config.TxMainColor = document.getElementById("tx_main__color").value;
    Config.TxSecondColor = document.getElementById("tx_second__color").value;
    Config.TxFinishRankColor = document.getElementById("tx_finish__color").value;
    Config.TxFirstRankColor = document.getElementById("tx_first_rank__color").value;
    Config.TxSecondRankColor = document.getElementById("tx_second_rank__color").value;
    Config.TxThirdRankColor = document.getElementById("tx_third_rank__color").value;

    // Config.CellBgColor = document.getElementById("cl_bg_color").value;
    // Config.TxCellBgColor = document.getElementById("tx_bg_color").value;

    // Config.LeftRankColor = document.getElementById("lf_rk_color").value;
    // Config.RightRankColor = document.getElementById("rg_rk_color").value;
    // Config.TxLeftRankColor = document.getElementById("lf_tx_rk_color").value;
    // Config.TxRightRankColor = document.getElementById("rg_tx_rk_color").value;

    // Config.LeftScoreColor = document.getElementById("lf_sc_color").value;
    // Config.RightScoreColor = document.getElementById("rg_sc_color").value;
    // Config.TxLeftScoreColor = document.getElementById("lf_tx_sc_color").value;
    // Config.TxRightScoreColor = document.getElementById("rg_tx_sc_color").value;

    Config.PositionXChrono = document.getElementById("positionX_chrono").value;
    Config.PositionYChrono = document.getElementById("positionY_chrono").value;

    Config.TransparenceLogo = document.getElementById("transparence_logo").value/ 100;
    Config.Border = document.getElementById("border").checked;

    Colors.value = Config;

    console.log("Config = ",Config)

    nodecg.sendMessage('colorOverwrite', Config);
}

nodecg.readReplicant('colorConfig', (value) =>{
    console.log(value);
    document.getElementById('bg__color').value = value.BgColor

    document.getElementById('chrono_color').value = value.ChronoColor;
    document.getElementById('tx_chrono_color').value = value.TxChronoColor

    document.getElementById("wod_color").value = value.WodColor
    document.getElementById("tx_wod_color").value = value.TxWodColor

    document.getElementById('main__color').value = value.MainColor
    document.getElementById('second__color').value = value.SecondColor
    document.getElementById('finish__color').value = value.FinishRankColor
    document.getElementById('first_rank__color').value = value.FirstRankColor
    document.getElementById('second_rank__color').value = value.SecondRankColor
    document.getElementById('third_rank__color').value = value.ThirdRankColor

    document.getElementById("tx_main__color").value = value.TxMainColor;
    document.getElementById("tx_second__color").value = value.TxSecondColor;
    document.getElementById("tx_finish__color").value = value.TxFinishRankColor;
    document.getElementById("tx_first_rank__color").value = value.TxFirstRankColor;
    document.getElementById("tx_second_rank__color").value = value.TxSecondColor;
    document.getElementById("tx_third_rank__color").value = value.TxThirdRankColor;

    // document.getElementById("cl_bg_color").value = value.CellBgColor
    // document.getElementById("tx_bg_color").value = value.TxCellBgColor

    // document.getElementById("lf_rk_color").value = value.LeftRankColor
    // document.getElementById("rg_rk_color").value = value.RightRankColor
    // document.getElementById("lf_tx_rk_color").value = value.TxLeftRankColor;
    // document.getElementById("rg_tx_rk_color").value = value.TxRightRankColor

    // document.getElementById("lf_sc_color").value = value.LeftScoreColor
    // document.getElementById("rg_sc_color").value = value.RightScoreColor
    // document.getElementById("lf_tx_sc_color").value = value.TxLeftScoreColor
    // document.getElementById("rg_tx_sc_color").value = value.TxRightScoreColor

    document.getElementById("positionX_chrono").value =  value.PositionXChrono;
    document.getElementById("positionY_chrono").value =  value.PositionYChrono;

    document.getElementById('transparence_logo').value = value.TransparenceLogo
    document.getElementById('border').value = value.Border
})

nodecg.readReplicant('Colors', (value) =>{

    if (value.BgColor == "rgba(0,0,0,0)"){
        document.getElementById('bg_trans').checked = true;
    }
    else{
        document.getElementById('bg_trans').checked = false;
    }
    document.getElementById('bg__color').value = value.BgColor

    document.getElementById("chrono_color").value = value.ChronoColor;
    document.getElementById("tx_chrono_color").value = value.TxChronoColor

    document.getElementById("wod_color").value = value.WodColor
    document.getElementById("tx_wod_color").value = value.TxWodColor

    document.getElementById('main__color').value = value.MainColor
    document.getElementById('second__color').value = value.SecondColor
    document.getElementById('finish__color').value = value.FinishRankColor
    document.getElementById('first_rank__color').value = value.FirstRankColor
    document.getElementById('second_rank__color').value = value.SecondRankColor
    document.getElementById('third_rank__color').value = value.ThirdRankColor

    document.getElementById("tx_main__color").value = value.TxMainColor;
    document.getElementById("tx_second__color").value = value.TxSecondColor;
    document.getElementById("tx_finish__color").value = value.TxFinishRankColor;
    document.getElementById("tx_first_rank__color").value = value.TxFirstRankColor;
    document.getElementById("tx_second_rank__color").value = value.TxSecondColor;
    document.getElementById("tx_third_rank__color").value = value.TxThirdRankColor;

    // document.getElementById("cl_bg_color").value = value.CellBgColor
    // document.getElementById("tx_bg_color").value = value.TxCellBgColor

    // document.getElementById("lf_rk_color").value = value.LeftRankColor
    // document.getElementById("rg_rk_color").value = value.RightRankColor
    // document.getElementById("lf_tx_rk_color").value = value.TxLeftRankColor;
    // document.getElementById("rg_tx_rk_color").value = value.TxRightRankColor

    // document.getElementById("lf_sc_color").value = value.LeftScoreColor
    // document.getElementById("rg_sc_color").value = value.RightScoreColor
    // document.getElementById("lf_tx_sc_color").value = value.TxLeftScoreColor
    // document.getElementById("rg_tx_sc_color").value = value.TxRightScoreColor

    document.getElementById("positionX_chrono").value =  value.PositionXChrono;
    document.getElementById("positionY_chrono").value =  value.PositionYChrono;

    document.getElementById('transparence_logo').value = value.TransparenceLogo
    document.getElementById('border').value = value.Border
})

// nodecg.readReplicant('BgColor', (value) =>{
//     document.getElementById('bg__color').value = value
// })

// nodecg.readReplicant('MainColor', (value) =>{
//     document.getElementById('main__color').value = value
// })

// nodecg.readReplicant('SecondColor', (value) =>{
//     document.getElementById('second__color').value = value
// })

// nodecg.readReplicant('FinishRankColor', (value) =>{
//     document.getElementById('finish__color').value = value
// })

// nodecg.readReplicant('FirstRankColor', (value) =>{
//     document.getElementById('first_rank__color').value = value
// })

// nodecg.readReplicant('SecondRankColor', (value) =>{
//     document.getElementById('second_rank__color').value = value
// })

// nodecg.readReplicant('ThirdRankColor', (value) =>{
//     document.getElementById('third_rank__color').value = value
// })

// nodecg.readReplicant('TransparenceLogo', (value) =>{
//     document.getElementById('transparence_logo').value = value
// })

nodecg.readReplicant('Border', (value) =>{
    document.getElementById('border').value = value
})
