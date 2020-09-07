/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* JAVASCRIPT FILE */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// When document is ready
$(document).ready(function() {

	// AJAX. The database is generated
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "create_database.php", true);
    xmlhttp.send();

    console.log("The database has been created/updated");

    setTimeout(function(){

	    // AJAX. We get the reports from the database
		var xmlhttpReports = new XMLHttpRequest();
        xmlhttpReports.open("GET", "get_reports.php", true);
        xmlhttpReports.send();		        
		
        xmlhttpReports.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

            	// The database reports are temporarily stored
			    var reportsArray = jQuery.parseJSON(xmlhttpReports.responseText);

			    console.log("Loading reports from the database...");	

			    // For each of them 
				for (var i = 0; i < reportsArray.length; i++) {

					// We get its ID
					var reportId = reportsArray[i][0];
					// We get its name
					var reportName = reportsArray[i][1];

					// We generate a report-entry in the Report Manager
					addReport(parseInt(reportId), reportName);
				}
            }
        };
	}, 10);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Boolean for tracking whether the Report Manager panel is unfolded
	var menu_unfolded = false;
	// Boolean for tracking whether the report-entries are unfolded
	var reports_unfolded = true;

	// Array where loaded and created reports are stored (client-side)
	//
	// Example array items: [["1", "new Report", false, false], ["2", "new Report (2)", false, false]];
	//
	// Where:
	//
	// · "1" is the ID of the report
	// · "new Report" is the name of the report
	// · The first "false" tracks whether its setting panel is visible
	// · The second "false" tracks whether its textfield is visible

	var reports = [];

	// When clicking on the Storyclash button
	$("#tab_1").on('click', function() {

		// If Report Manager panel is hidden
		if(!menu_unfolded) {
			$(".report_management").css("transform", "translateX(70px)");
			$(".report_management").css( "transition", ".25s");
			menu_unfolded = true;
			$("#tab_1").attr('title', 'Fold the Report Manager');
		}
		// If Report Manager panel is visible
		else {
			$(".report_management").css("transform", "translateX(-230px)");
			$(".report_management").css( "transition", ".2s");
			menu_unfolded = false;
			$("#tab_1").attr('title', 'Unfold the Report Manager');
		}
	});
	// When clicking the fold button
	$(".fold").on('click', function() {

		$(".report_management").css("transform", "translateX(-230px)");
		$(".report_management").css( "transition", ".2s");
		menu_unfolded = false;
		$("#tab_1").attr('title', 'Unfold the Report Manager');
	});

	// When clicking the report-entries fold button
	$(".fold_report").on('click', function() {

		// If report-entries are hidden
		if(!reports_unfolded) {
			$(".reports").css("display", "inherit");
			$(".fold_report i").css("transform", "rotate(180deg)");
			reports_unfolded = true;
			$(".fold_report").attr('title', 'Collapse the list of reports');

			console.log(reports)
		}
		// If report-entries are visible
		else {
			$(".reports").css("display", "none");
			$(".fold_report i").css("transform", "rotate(0deg)");
			reports_unfolded = false;
			$(".fold_report").attr('title', 'Expand the list of reports');
		}
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// When clicking on "Save Report"
	$(".save_report").on('click', function() {

		addReport("","");
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// Add a new report-entry to Report Manager
	function addReport(id, name) {

		// Name of the report that we are about to create
		var newName;
		// ID of the report that we are about to create
		var reportId;

		// We check whether the report is loaded from the database or created in the application
		var loadedReport = false;
		if(id != "" && name != "") {
			loadedReport = true;
		}

		// If it is created
		if(!loadedReport) {

			// Default name
			newName = "new Report";
			var counter = 2;

			// We find an available name
			for (var i = 0; i < reports.length; i++) {
				if(newName.toLowerCase() == reports[i][1].toLowerCase()) {
					newName = "new Report (" + counter + ")";
					i = 0;
					counter++;
				}
			}

			// Default ID
			reportId = 4;

			// We find an available ID
			for (var i = 0; i < reports.length; i++) {
				if(reportId == reports[i][0]) {
					reportId++;
					i = 0;
				}
			}
		} 
		// If the report has been loaded from the database
		else {
			// We use its ID and name
			reportId = id;
			newName = name;
		}

		console.log("· Report: [" + reportId + ", " + newName + "]");

		// We push the added report into the client-side reports array
		reports.push([reportId, newName, false, false]);

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		// REPORT DIV GENERATION				

		// Report icon div
		var $r_icon = $("<div>", {"class": "r-icon center"});
		var $trophy = $("<i>", {"class": "trophy"});
		$($r_icon).append($trophy);

		// Report name div
		var $r_name = $("<div>", {"class": "r-name center"});
		var $p_name = $("<p>").text(newName);
		$($r_name).append($p_name);

		// Report input
		var $name_field = $("<input>", {id: "report_" + reportId + "_input", "class": "name_field", "type": "text"});

		// Report context menu button
		var $r_menu = $("<div>", {"class": "r-menu center", "title": "Report settings"});
		var $circle = $("<div>", {"class": "circle"});
		var $ellipsis = $("<i>", {"class": "fas fa-ellipsis-v"});
		$($r_menu).append($circle);
		$($r_menu).append($ellipsis);

		// Report context menu
		var $r_menu_panel = $("<div>", {"class": "r-menu_panel"});
		var $rename = $("<div>", {id: "rename", "class": "menu-option"});
		var $pencil = $("<i>", {"class": "fas fa-pencil-alt"});
		var $p_rename = $("<p>", {"class": ""}).text("Rename");
		var $delete = $("<div>", {id: "delete", "class": "menu-option"});
		var $trash = $("<i>", {"class": "fas fa-trash-alt"});
		var $p_delete = $("<p>").text("Delete");
		$($rename).append($pencil);
		$($rename).append($p_rename);
		$($delete).append($trash);
		$($delete).append($p_delete);
		$($r_menu_panel).append($rename);
		$($r_menu_panel).append($delete);

		// Report div
		var $report = $("<div>", {id: "report_" + reportId, "class": "report"});
		$($report).append($r_icon);
		$($report).append($r_name);
		$($report).append($name_field);
		$($report).append($r_menu);
		$($report).append($r_menu_panel);

		// We finally add the HTML structure of the new report to its container in the app
		$(".reports").append($report);

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		// "SAVE REPORT" DIV GENERATION

		// We remove the "Save Report" element
		$(".save_report").remove();

		// Save report div
		var $save_report = $("<div>", {"class": "save_report", "title": "Create a new report"});
		var $r_icon_save = $("<div>", {"class": "r-icon center"});
		var $plus = $("<i>", {"class": "fas fa-plus"});
		var $r_name_save = $("<div>", {"class": "r-name center"});
		var $p_save = $("<p>").text("Save Report");

		$($r_name_save).append($p_save);
		$($r_icon_save).append($plus);
		$($save_report).append($r_icon_save);
		$($save_report).append($r_name_save);
		$(".reports").append($save_report);

		$(".save_report").on('click', function() {
			addReport("","");
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		// EVENTS OF EACH REPORT-ENTRY

		// When clicking on the context menu button
		$("#report_" + reportId + " .r-menu").click(function() {

			reportIndex = getReportIndex(reportId);

			// If the context menu is hidden
			if(!reports[reportIndex][2]) {
				$("#report_" + reportId + " .r-menu_panel").css("opacity", "1");
				$("#report_" + reportId + " .r-menu_panel").css("pointer-events", "all");	
				reports[reportIndex][2] = true;
			} 
			// If the context menu is visible
			else {
				$("#report_" + reportId + " .r-menu_panel").css("opacity", "0");
				$("#report_" + reportId + " .r-menu_panel").css("pointer-events", "none");
				reports[reportIndex][2] = false;
			}
		});

		// When mouse leaves the report-entry
		$("#report_" + reportId).on('mouseleave', function() {

			reportIndex = getReportIndex(reportId);

			// If the context menu is visible
			if(reports[reportIndex][2]) {

				// We hide the context menu
				$("#report_" + reportId + " .r-menu_panel").css("opacity", "0");
				$("#report_" + reportId + " .r-menu_panel").css("pointer-events", "none");
				reports[reportIndex][2] = false;
			}
		});

		// When we select delete report in the context menu
		$("#report_" + reportId + " #delete").on('click', function() {

			deleteReportDialog(reportId);
		});

		// When we select rename report in the context menu
		$("#report_" + reportId + " #rename").on('click', function() {

			activateReportInput(reportId);
		});

		// When pressing
		$("#report_" + reportId + " .name_field").keyup(function(e){

			// Enter
	    	if(e.which === 13) {

	    		renameReport(reportId);			    		
	      	} 
	      	// Escape
	      	else if(e.key === "Escape") {
	      		if($("#report_" + reportId + " .r-icon").css("background-color") == "rgba(0, 0, 0, 0)") {
					deleteReport(reportId);
				} else {
					$("#report_" + reportId + " .name_field").val($("#report_" + reportId + " .r-name p").text())
	      			$("#report_" + reportId + " .name_field").css("opacity", "0");
					$("#report_" + reportId + " .name_field").css("pointer-events", "none");
				}			      		
		    }
	   	});

		// When the textfield loses focus
		$("#report_" + reportId + " .name_field").focusout(function() {
			renameReport(reportId);
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		// If the report is created
		if(!loadedReport) {

			// AJAX. We add the new report into the database
			var xmlhttp = new XMLHttpRequest();
	        xmlhttp.open("POST", "add_report.php?i=" + reportId + "&n=" + newName, true);
	        xmlhttp.send();

	        // We change the style of its icon
	        $("#report_" + reportId + " .trophy").css("background-image", "url('assets/images/trophy_green.png')");
	        $("#report_" + reportId + " .r-icon").css("background-color", "transparent");

	        // We focus the textfield of the new report
			activateReportInput(reportId);
		}
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// Function for finding the index of a report through its ID (client-side array)
	function getReportIndex(reportId) {

		var reportIndex;

		for (var i = 0; i < reports.length; i++) {
			if(reportId == reports[i][0]) {
				reportIndex = i;
			}
		}

		return reportIndex;
	}

	function activateReportInput(reportId) {

		reportIndex = getReportIndex(reportId);

		reports[reportIndex][3] = true;

		$("#report_" + reportId + " .name_field").css("opacity", "1");
		$("#report_" + reportId + " .name_field").css("pointer-events", "all");

		$("#report_" + reportId + " .r-menu_panel").css("opacity", "0");
		$("#report_" + reportId + " .r-menu_panel").css("pointer-events", "none");
		reports[reportIndex][2] = false;

		$("#report_" + reportId + " .name_field").val($("#report_" + reportId + " .r-name p").text());

		$("#report_" + reportId + " .name_field").focus();
		$("#report_" + reportId + " .name_field").select();				
	}

	// In case we want to confirm the report removal
	function deleteReportDialog(reportId) {

		/*reportIndex = getReportIndex(reportId);

		if($("#report_" + reportId + " .r-icon").css("background-color") != "rgba(0, 0, 0, 0)") {
			if (confirm('Delete the report "' + reports[reportIndex][1] + '"?')) {

			  	deleteReport(reportId);
			} else {

			}
		} else {
			deleteReport(reportId);
		}*/
		deleteReport(reportId);
	}

	function deleteReport(reportId) {

		$("#report_" + reportId).remove();

		// We delete the report from the client-side array
		reports.splice(reportIndex, 1);				

		// AJAX. We delete the report from the database
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "delete_report.php?i=" + reportId, true);
        xmlhttp.send();

	  	console.log('Report deleted');
	}

	function renameReport(reportId) {

		// We storage the name written in the textfield
		var newName = $("#report_" + reportId + " .name_field").val();
		// We create a boolean for checking whether the introduced name is already in use
		var exists = false;

		reportIndex = getReportIndex(reportId);

		// We iterate the array of the reports
		for (var i = 0; i < reports.length; i++) {
			// When there is a match
			if(newName.toLowerCase() == reports[i][1].toLowerCase() && i != reportIndex) {
				exists = true;
			}
		}

		// If the textfield is not empty
		if(newName != "") {

			// If the name is available
			if(!exists) {

				// We hide the textfield
				$("#report_" + reportId + " .name_field").css("opacity", "0");
				$("#report_" + reportId + " .name_field").css("pointer-events", "none");

				// We rename the text component of the report with the new name
	      		$("#report_" + reportId + " .r-name p").text(newName)

	      		// We rename the report in the client-side array
	      		reports[reportIndex][1] = newName;

	      		// AJAX. We rename the report in the database
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.open("POST", "rename_report.php?i=" + reportId + "&n=" + newName, true);
		        xmlhttp.send();

		        // We indicate that the textfield is hidden
		        reports[reportIndex][3] = false;

		        // We return the report icon to its original style
		        if($("#report_" + reportId + " .r-icon").css("background-color") == "rgba(0, 0, 0, 0)") {
					$("#report_" + reportId + " .trophy").css("background-image", "url('assets/images/trophy.png')");
			        $("#report_" + reportId + " .r-icon").css("background-color", "rgb(24,183,127)");
				}
			}
			// If the name is already in use
			else {
				$("#report_" + reportId + " .name_field").val($("#report_" + reportId + " .r-name p").text())
				alert("Report name already in use");
				setTimeout(function(){
				    activateReportInput(reportId);
				}, 10);
			}
		} 
		// If the textfield is empty
		else {

			// We return the report icon to its original style
			if($("#report_" + reportId + " .r-icon").css("background-color") == "rgba(0, 0, 0, 0)") {
				$("#report_" + reportId + " .trophy").css("background-image", "url('assets/images/trophy.png')");
		        $("#report_" + reportId + " .r-icon").css("background-color", "rgb(24,183,127)");
			}

			// We fill the textfield with the last viable name
			$("#report_" + reportId + " .name_field").val($("#report_" + reportId + " .r-name p").text())

			// We hide the textfield
	      	$("#report_" + reportId + " .name_field").css("opacity", "0");
			$("#report_" + reportId + " .name_field").css("pointer-events", "none");
		}
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// Every time that we resize the browser, the transitions stop
	$(window).on('resize', function(){
		$("*").css( "transition-property", "none");
	});

	// Once the resizing is done, the animations are reestablished
	var rtime;
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
		rtime = new Date();
		if (timeout === false) {
			timeout = true;
			setTimeout(resizeend, delta);
		}
	});

	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta);
		} else {
			timeout = false;
			$("*").css( "transition-property", "initial");
		}               
	}
});