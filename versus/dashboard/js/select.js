
function resetSelect(data){

    console.log("Data = ",data)

    const listLeft = document.getElementById("leftTeam");
    const listRigth = document.getElementById("rigthTeam");

    while (listLeft.hasChildNodes()) {
        listLeft.removeChild(listLeft.firstChild);
    }

    while (listRigth.hasChildNodes()) {
        listRigth.removeChild(listRigth.firstChild);
    }

    data.athletes.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.lane-1;
        opt.text = element.lane; // whatever property it has
    
       // then append it to the select element
       $('#leftTeam').append(opt)
    });


    data.athletes.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value = element.lane-1;
        opt.text = element.lane; // whatever property it has
    
       // then append it to the select element
       $('#rigthTeam').append(opt)
    });

    $('#rigthTeam').val(1)
    
}


function resetSelectSponsor(data){

    console.log("Data = ",data)

    const listSponsor1 = document.getElementById("sponsor_1");
    const listSponsor2 = document.getElementById("sponsor_2");
    const listSponsor3 = document.getElementById("sponsor_3");
    const listSponsor4 = document.getElementById("sponsor_4");
    const listSponsor5 = document.getElementById("sponsor_5");
    const listSponsor6 = document.getElementById("sponsor_6");

    while (listSponsor1.hasChildNodes()) {
        listSponsor1.removeChild(listSponsor1.firstChild);
    }

    while (listSponsor2.hasChildNodes()) {
        listSponsor2.removeChild(listSponsor2.firstChild);
    }

    while (listSponsor3.hasChildNodes()) {
        listSponsor3.removeChild(listSponsor3.firstChild);
    }

    while (listSponsor4.hasChildNodes()) {
        listSponsor4.removeChild(listSponsor4.firstChild);
    }

    while (listSponsor5.hasChildNodes()) {
        listSponsor5.removeChild(listSponsor5.firstChild);
    }

    while (listSponsor6.hasChildNodes()) {
        listSponsor6.removeChild(listSponsor6.firstChild);
    }

    data.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor_1').append(opt)
    });


    data.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor_2').append(opt)
    });

    data.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor_3').append(opt)
    });

    data.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor_4').append(opt)
    });

    data.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor_5').append(opt)
    });

    data.forEach((element, index) => {
        console.log("Element : ",element);

        var opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor_6').append(opt)
    });
    
}
