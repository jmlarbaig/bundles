function lowerThird(){

    var data = laneInfos.value
    var country
    var avatar
    var affichage_aff = true;

    console.log(data)

    if (data.countryCode=="" || data.countryCode==null){data.countryCode = "FRA"}
    else{
        country = FLAG.find(element => element["3L"] == data.countryCode)
    }

    // if (data.avatarPath=="" || data.avatarPath==undefined){avatar = "https://competitioncorner.net/file.aspx/mainFilesystem?Avatars%2F80CAD1B0-409B-42C3-98A1-67BC86D3D51F.jpeg"}
    // else {avatar = data.avatarPath}

    console.log(data.countryCode)
    console.log(data.aff)

    var $lower = $("#lowerThird")
    $lower.find(".lowerThirdChildren").remove()

    if (data.aff != undefined){
        var $item = $(
            '<div class="container lowerThirdChildren" style=" font-family: montserrat;">'+
                '<div class="row lowerChild">'+
                    '<div class="col-auto text-center d-flex flex-column align-items" style="background-color: #ffffff;padding: 2px 2px;margin-left: 5px;margin-bottom: 5px;margin-right: 5px;margin-top: 5px;"><em class="text-center" style="font-size: 20px; padding-right:5px;">'+data.rank+'° </em>'+
                        // '<strong style="font-size: 35px;">'+ data.rank+'</strong>'+
                    '</div>'+
                    // '<div class="col-auto text-truncate text-center" style="width: 30px;padding: 0px 5px; overflow-y: visible;">'+
                    //     '<picture><img class="img-fluid" src="'+ avatar +'"></picture>'+
                    // '</div>'+
                    '<div class="col" style="">'+
                        '<div class="row justify-content-between">'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><strong style="font-size: 30px;color:white;"># '+ data.station+'</strong></div>'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><img class="d-lg-flex" src="https://flagcdn.com/'+ country["2L"].toLowerCase() + '.svg" style="width: 30px;margin: -3px 5px;"></div>'+
                            '<div class="col text-left d-xl-flex align-items-xl-center text-nowrap text-truncate text-break" style="padding: 0px 40px 0px 10px;">' +
                                '<h1 class="text-left d-xl-flex justify-content-xl-start" style="color: rgb(255,255,255);font-size: 24px;margin: 0px;">'+data.displayName+'</h1>' +
                           ' </div>' +
                            '<div class="col-auto" style="margin-right: 10px;">' +
                                '<div class="row">' +
                                    '<div class="col d-xl-flex justify-content-xl-end" style="padding: 0px 5px;margin-top: 5px;"><em style="color: rgb(255,255,255);font-size: 8px;">FROM</em></div>' +
                                '</div>' +
                                '<div class="row">' +
                                    '<div class="col text-nowrap text-truncate text-break text-right" style="padding: 0px;"><strong style="color: rgb(255,255,255);font-size: 12px;padding: 0px 5px;">'+ data.aff +'</strong></div>' +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                '</div>'+
            '</div>'
        )
    }
    else{
        var $item = $(
            '<div class="container lowerThirdChildren" style=" font-family: montserrat;">'+
                '<div class="row lowerChild">'+
                    '<div class="col-auto text-center d-flex flex-column align-items" style="background-color: #ffffff;padding: 2px 2px;margin-left: 5px;margin-bottom: 5px;margin-right: 5px;margin-top: 5px;"><em class="text-center" style="font-size: 20px; padding-right:5px;">'+data.rank+'° </em>'+
                        // '<strong style="font-size: 35px;">'+ data.rank+'</strong>'+
                    '</div>'+
                    // '<div class="col-auto text-truncate text-center" style="width: 30px;padding: 0px 5px; overflow-y: visible;">'+
                    //     '<picture><img class="img-fluid" src="'+ avatar +'"></picture>'+
                    // '</div>'+
                    '<div class="col" style="">'+
                        '<div class="row justify-content-between">'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><strong style="font-size: 30px;color:white;"># '+ data.station+'</strong></div>'+
                            '<div class="col-auto d-lg-flex align-items-lg-center" style="padding: 0px; margin-left:5px;"><img class="d-lg-flex" src="https://flagcdn.com/'+ country["2L"].toLowerCase() + '.svg" style="width: 30px;margin: -3px 5px;"></div>'+
                            '<div class="col text-left d-xl-flex align-items-xl-center text-nowrap text-truncate text-break" style="padding: 0px 40px 0px 10px;;">' +
                                '<h1 class="text-left d-xl-flex justify-content-xl-start" style="color: rgb(255,255,255);font-size: 24px;margin: 0px;">'+data.displayName+'</h1>' +
                           ' </div>' +
                        '</div>'+
                    '</div>' +
                '</div>'+
            '</div>'
        )
    }




    $lower.append($item)

}

function lowerThirdVoid(){

    console.log("LowerThird Data = ",sponsorLower.value)
    $(".sponsor").attr('src', sponsorLower.value[0].url)

    console.log("LowerThird Data = ", lowerThirdData.value)

    var data = lowerThirdData.value

    var $lower = $("#lowerThirdVoid")
    $lower.find(".lowerThirdChildrenVoid").remove()

    if (data.qrcode != ""){
        var $item = $(
            '<div class="lowerThirdChildrenVoid text-left">'+
                '<div class="row lowerChildVoid">'+
                    '<div class="col-2 img_lower">'+
                        '<img class="sponsor img-fluid" src="'+ data.url +'"/>' +
                    '</div>'+
                    '<div class="col text_lower">'+
                            '<h5 class="text-left text_lower_name">'+data.Name+'</h1>' +
                            '<h6 class="text-left text_lower_function">'+data.Fonction+'</h1>' +
                    '</div>' +
                    '<div class="col qrcodeC">'+
                            '<div id="qrcode"></div>' +
                    '</div>' +
                '</div>'+
            '</div>'
        )
    }
    else {
        var $item = $(
            '<div class="lowerThirdChildrenVoid text-left">'+
                '<div class="row lowerChildVoid">'+
                    '<div class="col-2 img_lower">'+
                        '<img class="sponsor img-fluid" src="'+ data.url +'"/>' +
                    '</div>'+
                    '<div class="col text_lower">'+
                            '<h5 class="text-left text_lower_name">'+data.Name+'</h1>' +
                            '<h6 class="text-left text_lower_function">'+data.Fonction+'</h1>' +
                    '</div>' +
                '</div>'+
            '</div>'
        )
    }


    $lower.append($item)

    if (data.qrcode != ""){
        var qrcode = new QRCode("qrcode", {
            text: data.qrcode,
            width: 100,
            height: 100,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }



}