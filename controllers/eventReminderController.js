const eventReminderService = require('../services/eventReminderService');

const eventReminderController = {

display_events() {
	var events = new Array();
         
    var result=response.data;
    $.each(result, function (i, item) {
    	events.push({
            event_id: result[i].event_id,
            event_name: result[i].event_name,
            start: result[i].start,
            end: result[i].end,
            color: result[i].color,
            url: result[i].url
        }); 	
    })

	var calendar = $('#calendar').fullCalendar({
	    defaultView: 'month',
		timeZone: 'local',
	    editable: true,
        selectable: true,
		selectHelper: true,
        select: function(start, end) {
            alert(start);
            alert(end);
            $('#event_start_date').val(moment(start).format('YYYY-MM-DD'));
            $('#event_end_date').val(moment(end).format('YYYY-MM-DD'));
            $('#event_entry_modal').modal('show');
			},
        events: events,
	    eventRender: function(event, element, view) { 
            element.bind('click', function() {
					alert(event.event_id);
			});
    	}
		}); 
	  },
	  error: function (xhr, status) {
	  alert(response.msg);
	}

// save_event() {
//     var event_name=$("#event_name").val();
//     var event_start_date=$("#event_start_date").val();
//     var event_end_date=$("#event_end_date").val();
//     if(event_name=="" || event_start_date=="" || event_end_date=="")
//     {
//         alert("Please enter all required details.");
//         return false;
//     }
//     });    
// return false;
// };
};




module.exports = eventReminderController;