$(function(){ 


    

	//hide children
	$.each($('#mainTable tbody tr'), function(i,e) {

		console.log(e)
		nbOfChildren = $('#mainTable').find('tr[data-parent='+e.id+']').length;
		
		//count the number of separators to determine the level
		var count = (e.id.match(/-/g) || []).length;
		

		switch(count) {
			case 0:
			type = "state";
			break;

			case 1:
			type = "district";
			break;

			case 2:
			type = "township";
			break;
		}
		//generates dynamically the type according to the level

		$(e).addClass('level'+count).addClass(type);
		var typeOfChildren = '';
		if (nbOfChildren > 0) { 
			switch ( count ){
				case 0:
				typeOfChildren = 'District';
				break;

				case 1:
				typeOfChildren = 'Township';
				break;
			}

			//add the plural
			if (nbOfChildren > 1) {
				typeOfChildren = typeOfChildren + 's';
			}

			$(e).addClass('hasChildren').find('td:eq(0) span:eq(1)').append('<span class="nbOfChildren">' + nbOfChildren + ' ' + typeOfChildren + '<span class="operator">+</span></span>');
		}
		if ($(e).data('parent') !== undefined) {
			$($(e)).hide();
		}
	})


	$('tr.hasChildren').click(function(){
		// $('tr[data-parent='+$(this).attr('id')+']').toggle();

		//close children elements
		if ($('tr[data-parent='+$(this).attr('id')+']').css('display') == 'none') {
			$('tr[data-parent='+$(this).attr('id')+']').show();
			$($(this).find('.operator')).html('-');
			
			$(this).addClass('opened');
		} else { 
			$('tr[data-parent='+$(this).attr('id')+']').hide();
			$(this).removeClass('opened');
			$($(this).find('.operator')).html('+');
		}

	})

	//when changing the select value, trigger the keyup event
	$("#filterSelect").change(function(){
		$("#searchField input").keyup();
	});

    // Write on keyup event of keyword input element
    $("#searchField input").keyup(function(){
    	//if reset, show all
    	if ($(this).val() === '') {
    		console.log('show all');
    		$('#mainTable tbody tr').hide();
    		$('#mainTable tbody tr.level0').show();
    	} else {

	        _this = this;
	        // show the matching row according to the selected category, hide the others
	        var selectedFilter = $('#filterSelect').val();
	        // $("#mainTable tbody tr").show();
	        $.each($("#mainTable tbody tr"), function() {
	            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) !== -1 && $(this).hasClass(selectedFilter) ) {
	            	$(this).show();
	            }
	            else {
	               $(this).hide();
	            }
	               
	        });
	        //show the parents of the found item
	        console.log(selectedFilter)
	        $.each($("#mainTable tbody tr:visible"), function() {
	        	currentNode = this;
	        	while ($(currentNode).data('parent') !== undefined) {
	        		$('#'+$(currentNode).data('parent')).show();
	        		$('#'+$(currentNode).data('parent')).find('.operator').html('-');
	        		currentNode = $('#'+$(currentNode).data('parent'));
	        	}

	        });
        }
	}); 
	



})