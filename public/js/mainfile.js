function searching(){
  	$.ajax({
        url: '/searchautocomplete',
        type: 'POST',
        data: {input: $("#inputsearch").val()}
	}).then(res => {
		console.log(res)
		var arrdata = []
		for(var i=0; i< res.length; i++){
			arrdata.push({"label": res[i].namecp, "value": "http://localhost:3000/detailcompaney/" + res[i]._id})
		}
	    $( "#inputsearch" ).autocomplete({
	      source: arrdata,
	      select: function( event, ui ) { 
            window.location.href = ui.item.value;
        	}
	    });
	})
}
