
function updateSponsorOption(data){

    const listSponsors = $('.sponsor');

    listSponsors.find('option').remove()

    let opt = document.createElement('option');

    opt.value= '';
    opt.text = 'No Sponsor'; // whatever property it has

   // then append it to the select element
   $('.sponsor').append(opt)

    data.forEach((element) => {

        let opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('.sponsor').append(opt)
    });

}

function addSponsorOption(data, id){

    let opt = document.createElement('option');

    opt.value= '';
    opt.text = 'No Sponsor'; // whatever property it has

   // then append it to the select element
   $('#sponsor'+id).append(opt)

    data.forEach((element) => {

        let opt = document.createElement('option');

        opt.value= element.url;
        opt.text = element.name; // whatever property it has
    
       // then append it to the select element
       $('#sponsor'+id).append(opt)
    });
}
