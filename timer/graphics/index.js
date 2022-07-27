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

    var finish__color
    var first_rank__color
    var second_rank__color
    var third_rank__color

    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');
    const LogoImg = nodecg.Replicant('LogoImg', 'leaderboard')
    const FVReplicant = nodecg.Replicant('FVspot', 'leaderboard')

    const BgColor = nodecg.Replicant('BgColor', 'leaderboard')
    const MainColor = nodecg.Replicant('MainColor', 'leaderboard')
    const SecondColor = nodecg.Replicant('SecondColor', 'leaderboard')

    const FinishRankColor = nodecg.Replicant('FinishRankColor', 'leaderboard')
    const FirstRankColor = nodecg.Replicant('FirstRankColor', 'leaderboard')
    const SecondRankColor = nodecg.Replicant('SecondRankColor', 'leaderboard')
    const ThirdRankColor = nodecg.Replicant('ThirdRankColor', 'leaderboard')

    const TransparenceLogo = nodecg.Replicant('TransparenceLogo', 'leaderboard')

    statics.on('change', (newValue, oldValue) => {
        console.log("Static")
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        timecapNTP = newValue.heatInfo[0].timeCap;
        heatId = newValue.heatId;
        heat_Name = newValue.heatName;

        resetHeat(newValue);
        // resetWod(newValue);
        showTime()
        // resetProgress(newValue)
        // showFV();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);
        // updateDynamics(newValue.athletes, newValue.status)
        dataTime = newValue;

    }); 

    FVReplicant.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        showFV();
    }); 

    LogoImg.on('change', (newValue, oldValue) => {
        try{
            $("#logoProgress").attr("src", newValue);
        }
        catch(e){
            console.log(e)
        }
    }); 

    TransparenceLogo.on('change', (newValue) => {
        root.style.setProperty("--transparence",newValue );
    })


    MainColor.on('change', (newValue, oldValue) => {
        main_color = newValue;
        root.style.setProperty("--main-color",newValue );
    })

    SecondColor.on('change', (newValue, oldValue) => {
        second_color = newValue;
        root.style.setProperty("--second-color",newValue );
    })

    FinishRankColor.on('change', (newValue, oldValue) => {
        console.log(newValue)
        finish__color = newValue;
        root.style.setProperty("--finish-color",newValue );
    })

    FirstRankColor.on('change', (newValue, oldValue) => {
        first_rank__color = newValue;
        root.style.setProperty("--firstRank-color",newValue );
    })    
    
    SecondRankColor.on('change', (newValue, oldValue) => {
        second_rank__color = newValue;
        root.style.setProperty("--secondRank-color",newValue );
    })

    ThirdRankColor.on('change', (newValue, oldValue) => {
        third_rank__color = newValue;
        root.style.setProperty("--thirdRank-color",newValue );
    })
