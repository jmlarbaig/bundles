    // initialization
    var athlete;
    var athletes;
    var timerId;
    var timecapNTP = "";
    var startTimeNTP;
    var heatId ;
    var heat_Name;
    var heatName;
    var heatInfos = []
    var updateInterval = 30000;
    var resetVar = false;
    var athletes_final = new Array();
    var timerInterval= null;
    var dataTime;
    var totalRep = [];

    let root = document.documentElement;
    let logoEvent = document.getElementById("logoProgress");

    var pathLogo;
    var main_color;
    var second_color;
    var finish__color;
    var first_rank__color;
    var second_rank__color;
    var third_rank__color;

    var tx_main_color;
    var tx_second_color;
    var tx_finish__color;
    var tx_first_rank__color;
    var tx_second_rank__color;
    var tx_third_rank__color;

    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');
    const LogoImg = nodecg.Replicant('LogoImg', 'connector');
    const FVReplicant = nodecg.Replicant('FVspot', 'leaderboard');
    const sponsorWod = nodecg.Replicant('sponsorWod', 'connector')

    const Colors = nodecg.Replicant('Colors', 'configuration');

    const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard')

    // const BgColor = nodecg.Replicant('BgColor','configuration')
    // const MainColor = nodecg.Replicant('MainColor','configuration')
    // const SecondColor = nodecg.Replicant('SecondColor','configuration')

    // const FinishRankColor = nodecg.Replicant('FinishRankColor','configuration')
    // const FirstRankColor = nodecg.Replicant('FirstRankColor','configuration')
    // const SecondRankColor = nodecg.Replicant('SecondRankColor','configuration')
    // const ThirdRankColor = nodecg.Replicant('ThirdRankColor','configuration')

    const TransparenceLogo = nodecg.Replicant('TransparenceLogo', 'configuration')

    console.log("Largeur = ",window.innerWidth)

    statics.on('change', (newValue, oldValue) => {
        console.log("Static")
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        timecapNTP = newValue.heatInfo[0].timeCap;
        heatId = newValue.heatId;
        heat_Name = newValue.heatName;

        resetHeat(newValue);
        // resetWod(newValue);
        showTime()
        resetProgress(newValue)
        showFV();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);
        if(newValue.status != 0 && newValue.athletes[0].CurrentRank !=null){
            updateDynamics(newValue.athletes, newValue.status)
        }
        dataTime = newValue;

    }); 

    UrlChange.on('change', (newValue, oldValue) => {
        console.log("Url = ",newValue)
        console.log("Url Old = ",oldValue)
        if( oldValue != undefined){
            if(newValue != oldValue){
                window.location.replace(newValue)
            }
        }
    })

    FVReplicant.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        showFV();
    }); 

    LogoImg.on('change', (newValue, oldValue) => {
        try{


            $(".logoEvent").attr("src", newValue);
            // console.log("Logo url = ",newValue)

            // var $imgLogo = $("#logoProgress");
            // $imgLogo.find(".logoEvent").remove();

            // var $item = $(
            //         '<img class="logoEvent img-fluid" src="'+ newValue +'">' +
            //         '</img>'
            // );
            
            // $imgLogo.append($item);
        }
        catch(e){
            console.log(e)
        }
    }); 

    sponsorWod.on('change', (newValue)=> {
        try{

            // var $imgLogo = $("#sponsor");
            // $imgLogo.find(".logoSponsor").remove();

            // var $item = $(
            //         '<img class="logoSponsor img-fluid" src="'+ newValue +'">' +
            //         '</img>'
            // );
            
            // $imgLogo.append($item);
        }
        catch(e){
            console.log(e)
        }
    })

    Colors.on('change', (newValue, oldValue) => {
        console.log("new value = ", newValue)

        main_color = newValue.MainColor;
        root.style.setProperty("--main-color",main_color );

        second_color = newValue.SecondColor;
        root.style.setProperty("--second-color",second_color );

        finish__color = newValue.FinishRankColor;
        root.style.setProperty("--finish-color",finish__color );

        first_rank__color = newValue.FirstRankColor;
        root.style.setProperty("--firstRank-color",first_rank__color );

        second_rank__color = newValue.SecondRankColor;
        root.style.setProperty("--secondRank-color",second_rank__color );

        third_rank__color = newValue.ThirdRankColor;
        root.style.setProperty("--thirdRank-color",third_rank__color );

        tx_main_color = newValue.TxMainColor;
        root.style.setProperty("--tx-main-color",tx_main_color );

        tx_second_color = newValue.TxSecondColor;
        root.style.setProperty("--tx-second-color",tx_second_color );

        tx_finish__color = newValue.TxFinishRankColor;
        root.style.setProperty("--tx-finish-color",tx_finish__color );

        tx_first_rank__color = newValue.TxFirstRankColor;
        root.style.setProperty("--tx-firstRank-color",tx_first_rank__color );

        tx_second_rank__color = newValue.TxSecondRankColor;
        root.style.setProperty("--tx-secondRank-color",tx_second_rank__color );

        tx_third_rank__color = newValue.TxThirdRankColor;
        root.style.setProperty("--tx-thirdRank-color",tx_third_rank__color );
        
    })

    TransparenceLogo.on('change', (newValue) => {
        root.style.setProperty("--transparence",newValue );
    })

    // BgColor.on('change', (newValue, oldValue) => {
    //     $("body").css('background-color', newValue)
    // })

    // MainColor.on('change', (newValue, oldValue) => {
    //     main_color = newValue;
    //     root.style.setProperty("--main-color",newValue );
    // })

    // SecondColor.on('change', (newValue, oldValue) => {
    //     second_color = newValue;
    //     root.style.setProperty("--second-color",newValue );
    // })

    // FinishRankColor.on('change', (newValue, oldValue) => {
    //     console.log(newValue)
    //     finish__color = newValue;
    //     root.style.setProperty("--finish-color",newValue );
    // })

    // FirstRankColor.on('change', (newValue, oldValue) => {
    //     first_rank__color = newValue;
    //     root.style.setProperty("--firstRank-color",newValue );
    // })    
    
    // SecondRankColor.on('change', (newValue, oldValue) => {
    //     second_rank__color = newValue;
    //     root.style.setProperty("--secondRank-color",newValue );
    // })

    // ThirdRankColor.on('change', (newValue, oldValue) => {
    //     third_rank__color = newValue;
    //     root.style.setProperty("--thirdRank-color",newValue );
    // })
