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
    const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
    const showLogo = nodecg.Replicant('showLogo')
    const showFlag = nodecg.Replicant('showFlag')
    const showManuel = nodecg.Replicant('showManuel')
    const showWodDetails = nodecg.Replicant('showWodDetails')
    const LogoImg = nodecg.Replicant('LogoImg', 'connector')
    const FVReplicant = nodecg.Replicant('FVspot')
    const LogoFVFixe = nodecg.Replicant('LogoFVFixe')

    const sponsorWod = nodecg.Replicant('sponsorWod', 'connector')

    const laneInfos = nodecg.Replicant('laneInfos')
    const laneShow = nodecg.Replicant('laneShow')
    const showChrono = nodecg.Replicant('showChrono')

    const Colors = nodecg.Replicant('Colors','configuration');

    // const BgColor = nodecg.Replicant('BgColor','configuration')
    // const MainColor = nodecg.Replicant('MainColor','configuration')
    // const SecondColor = nodecg.Replicant('SecondColor','configuration')

    // const FinishRankColor = nodecg.Replicant('FinishRankColor','configuration')
    // const FirstRankColor = nodecg.Replicant('FirstRankColor','configuration')
    // const SecondRankColor = nodecg.Replicant('SecondRankColor','configuration')
    // const ThirdRankColor = nodecg.Replicant('ThirdRankColor','configuration')

    const TransparenceLogo = nodecg.Replicant('TransparenceLogo', 'configuration')

    const widthLogoEvent = nodecg.Replicant('widthLogoEvent')

    const lowerThirdData = nodecg.Replicant('lowerThirdData', 'lowerthird')
    const lowerThirdVoidShow = nodecg.Replicant('lowerThirdVoidShow', 'lowerthird')

    const sponsors = nodecg.Replicant('assets:sponsors', 'connector')
    const sponsorLower = nodecg.Replicant('assets:sponsorLower')

    const Teams = nodecg.Replicant('Teams')
    const dataRow = nodecg.Replicant('dataRow', 'connector')

    const timeNTP = nodecg.Replicant('timeNTP', 'connector')

    const Att_poids = nodecg.Replicant('Att_poids')
    const Ft_Ap = nodecg.Replicant('fortime_amrap')


    var leftLane;
    var rigthLane;
    var staticData;
    let i=0;

    var sponsorWodimg
    console.log(sponsorWodimg)

    sponsorLower.on('change', (newValue)=> {
        console.log("sponsor Wod =", newValue[0].url)
        $(".logoSponsor").attr('src', newValue[0].url)
        // A revoir
    })

    sponsors.on('change', (newValue)=> {
        
        var $list = $("#sponsorLogo");
        $list.find(".sponsorImg").remove();

        if(newValue.length>0){
            $("#sponsorLogo").css('background-color', "black")
            newValue.forEach(element => {
                var $item = $('<img class="sponsorImg" id="sponsorImg" src="'+ element.url +'"></img>')
                $list.append($item);
            });
        }
        else{
            $("#sponsorLogo").css('background-color', "rgba(0,0,0,0)")
        }
    })


    function changeSponsor(newValue){
        $(".logoSponsor").attr('src', newValue[i].url)
        $("#sponsorImg").attr('src', newValue[i].url);
        i ++;
        if(i > newValue.length-1){
            i = 0;
        }
    }

    Teams.on('change',(newValue)=>{
        leftLane = newValue[0];
        rigthLane = newValue[1];
        console.log("newValue = ", newValue)
        resetLeaderboard(leftLane, rigthLane)
    })

    statics.on('change', (newValue, oldValue) => {
        // console.log(`statics changed from ${oldValue} to ${newValue}`);

        timecapNTP = newValue.heatInfo[0].timeCap;
        heatId = newValue.heatId;
        heat_Name = newValue.heatName;
        staticData = newValue

        resetWod();
        resetLeaderboard(leftLane, rigthLane);
        showTime();
    }); 

    dynamics.on('change', (newValue, oldValue) => {
        if(newValue.status != 0 && newValue.athletes[0].CurrentRank !=null){
            updateDynamics(newValue.athletes, newValue.status)
        }
        dataTime = newValue;

    }); 

    showLeaderboard_lead.on('change', (newValue, oldValue) => {
        console.log("showLeaderboard_lead = ", newValue)
        switch(newValue){
            case true:
                $('#laneLeft').fadeIn(1000)
                $('#laneRight').fadeIn(1000)
                // $('#laneRight').fadeIn(1000)
                // $('#chrono').fadeIn(1000)
                break;
            case false :
                $('#laneLeft').fadeOut(1000)
                $('#laneRight').fadeOut(1000)
                // $('#laneRight').fadeOut(1000)
                // $('#chrono').fadeOut(1000)
                break;
        }
    });

    showLogo.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        switch(newValue){
            case true:
                $('#logoLocation').show(1000)
                break;
            case false :
                $('#logoLocation').hide(1000)
                break;
        }
    }); 

    showChrono.on('change', (newValue, oldValue)=> {
        console.log(`ShowChrono changed from ${oldValue} to ${newValue}`);
        switch(newValue){
            case true:
                $(".chrono").fadeIn(1000)
                break;
            case false :
                $(".chrono").fadeOut(1000)
                break;
        }
    })

    FVReplicant.on('change', (newValue, oldValue) => {
        // console.log(`showLogo changed from ${oldValue} to ${newValue}`);
        if (newValue == true){
            $('#fvLocation').show(1000)
            // showFV();
        }
        else{
            $('#fvLocation').hide(1000); 
        }
    }); 

    LogoImg.on('change', (newValue, oldValue) => {
        try{
            console.log(newValue)
            var $imgLogo = $("#logoLocation");
            $imgLogo.find(".logo").remove();

            var $item = $(
                    '<img class="logo img-fluid" src="'+ newValue +'">' +
                    '</img>'
            );
            
            $imgLogo.append($item);
        }
        catch(e){
            console.log(e)
        }
    }); 



    showWodDetails.on('change', (newValue, oldValue) =>{
        switch(newValue){
            case true:
                $('#wodDetails').fadeIn(1000)
                break;
            case false :
                $('#wodDetails').fadeOut(1000)
                break;
        }
    })

    laneInfos.on('change', (newValue) => {
        lowerThird()
    })

    laneShow.on('change', (newValue, oldValue) => {
        console.log("value = ",oldValue)
            console.log(newValue)
            // lowerThird()
            setTimeout(function(){ 
                console.log("1")
                console.log("1")
                console.log("1")
            }, 2000);
            switch(newValue){
                case true:
                    $('#lowerThird').fadeIn(1000)
                    break;
                case false :
                    $('#lowerThird').fadeOut(1000)
                    break;
            }

    })


    lowerThirdVoidShow.on('change', (newValue, oldValue) => {
            setTimeout(function(){
                console.log("lowerThirdVoidShow1")
                console.log("lowerThirdVoidShow2")
                console.log("lowerThirdVoidShow3")
            }, 2000);
            lowerThirdVoid()
            switch(newValue){
                case true:
                    // $("#sponsorImg").fadeOut(1000);
                    setTimeout( $('#lowerThirdVoid').fadeIn(1000),1000)
                    break;
                case false :
                    $('#lowerThirdVoid').fadeOut(1000)
                    // setTimeout($("#sponsorImg").fadeIn(1000),1000)
                    break;
            }

    })

    Colors.on('change', (newValue, oldValue) => {
        console.log("new value = ", newValue)

        // cellbg = newValue.CellBgColor;
        // root.style.setProperty("--cellbg-color",cellbg );

        // tx_cellbg = newValue.TxCellBgColor;
        // root.style.setProperty("--tx-cellbg-color",tx_cellbg );

        // lf_rk_color = newValue.LeftRankColor;
        // root.style.setProperty("--left-rk-color",lf_rk_color );

        // tx_lf_rk_color = newValue.TxLeftRankColor;
        // root.style.setProperty("--tx-left-rk-color",tx_lf_rk_color );

        // rg_rk_color = newValue.RightRankColor;
        // root.style.setProperty("--right-rk-color",rg_rk_color );

        // tx_rg_rk_color = newValue.TxRightRankColor;
        // root.style.setProperty(" --tx-right-rk-color",tx_rg_rk_color );

        // lf_sc_color = newValue.LeftScoreColor;
        // root.style.setProperty("--left-sc-color", lf_sc_color );

        // tx_lf_sc_color = newValue.TxLeftScoreColor;
        // root.style.setProperty("--tx-left-sc-color",tx_lf_sc_color );

        // rg_sc_color = newValue.RightScoreColor;
        // root.style.setProperty("--right-sc-color",rg_sc_color );

        // tx_rg_sc_color = newValue.TxRightScoreColor;
        // root.style.setProperty("--tx-right-sc-color",tx_rg_sc_color );

        bg_color = newValue.BgColor
        $("body").css('background-color', bg_color)

        chrono_color = newValue.ChronoColor
        root.style.setProperty("--chrono-color", chrono_color );

        tx_chrono_color = newValue.TxChronoColor
        root.style.setProperty("--tx-chrono-color", tx_chrono_color );

        wod_color = newValue.WodColor
        root.style.setProperty("--wod-color",wod_color );

        tx_wod_color = newValue.TxWodColor
        root.style.setProperty("--tx-wod-color",tx_wod_color );

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


    // BgColor.on('change', (newValue, oldValue) => {
    //     // $("body").css('background-color', newValue)
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


    Att_poids.on('change', (newValue)=>{

        console.log("Att Poids = ",newValue)

        AttPoids (newValue);

    })

    function AttPoids (data){
        console.log("Show manual ",showManuel.value)
        if (showManuel.value){


            athletes[leftLane].$item.find(".Name1").text(data[0].name);
            athletes[leftLane].$item.find(".Poids1").text(data[0].poids + " kg");
    
            // athletes[leftLane].$item.find(".Name2").text(data[1].name);
            // athletes[leftLane].$item.find(".Poids2").text(data[1].poids+ " kg");
    
            // athletes[leftLane].$item.find(".Name3").text(data[2].name);
            // athletes[leftLane].$item.find(".Poids3").text(data[2].poids+ " kg");
    
            athletes[rigthLane].$item.find(".Name1").text(data[3].name);
            athletes[rigthLane].$item.find(".Poids1").text(data[3].poids+ " kg");
    
            // athletes[rigthLane].$item.find(".Name2").text(data[4].name);
            // athletes[rigthLane].$item.find(".Poids2").text(data[4].poids+ " kg");
    
            // athletes[rigthLane].$item.find(".Name3").text(data[5].name);
            // athletes[rigthLane].$item.find(".Poids3").text(data[5].poids+ " kg");
    
            // var poid1 = parseInt(data[0].poids) + parseInt(data[1].poids) + parseInt(data[2].poids)
            // var poid2 = parseInt(data[3].poids) + parseInt(data[4].poids) + parseInt(data[5].poids)
    
            var poid1 = parseInt(data[0].poids)
            var poid2 = parseInt(data[3].poids)
    
            athletes[leftLane].$item.find(".score").text(poid1 + " kg");
            athletes[rigthLane].$item.find(".score").text(poid2 + " kg");

        }
    }