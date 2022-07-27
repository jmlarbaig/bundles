    // initialization
    var athlete;
    var athletes;
    var timerId;
    var timecapNTP = "";
    var startTimeNTP;
    var heatId ;
    var heat_Name;
    var heatName;
    var updateInterval = 30000;
    var resetVar = false;
    var athletes_final = new Array();
    var timerInterval= null;
    var dataTime;

    let root = document.documentElement;

    var main_color;
    var second_color;

    var finish__color
    var first_rank__color
    var second_rank__color
    var third_rank__color

    const statics = nodecg.Replicant('statics', 'connector');
    const dynamics = nodecg.Replicant('dynamics', 'connector');

    const BgColor = nodecg.Replicant('BgColor')
    const MainColor = nodecg.Replicant('MainColor')
    const SecondColor = nodecg.Replicant('SecondColor')

    const FinishRankColor = nodecg.Replicant('FinishRankColor')
    const FirstRankColor = nodecg.Replicant('FirstRankColor')
    const SecondRankColor = nodecg.Replicant('SecondRankColor')
    const ThirdRankColor = nodecg.Replicant('ThirdRankColor')

    statics.on('change', (newValue, oldValue) => {
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        timecapNTP = newValue.heatInfo[0].timeCap;
        heatId = newValue.heatId;
        heat_Name = newValue.heatName;
        staticData = newValue

        resetHeat(newValue);
        showTime();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        // console.log(`dynamics changed from ${oldValue} to ${newValue}`);

        updateDynamics(newValue.athletes[1])
        dataTime = newValue

    }); 



    BgColor.on('change', (newValue, oldValue) => {
        $("body").css('background-color', newValue)
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
