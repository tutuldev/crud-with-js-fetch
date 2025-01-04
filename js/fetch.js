// function for load student record in table on page load
function loadTable(){ 
	fetch('php/load-table.php')
	.then((response) => response.json())
	.then((data)=>{
		var tbody = document.getElementById('tbody');
		if(data['empty']){
			tbody.innerHTML = '<tr><td colspan="6" align="center"><h3>No Record Found.</h3></td></tr>'
		}else{
			var tr = '';
			for(var i in data){
				tr += `<tr>
		            <td align="center">${data[i].id}</td>
		            <td>${data[i].first_name} ${data[i].last_name}</td>
		            <td>${data[i].class_name}</td>
		            <td>${data[i].city}</td>
		            <td align="center"><button class="edit-btn" onclick="editRecord(${data[i].id})">Edit</button></td>
		            <td align="center"><button class="delete-btn" onclick="deleteRecord(${data[i].id})">Delete</button></td>
		          </tr>`;
			}
			tbody.innerHTML = tr;
		}
	})
	.catch((error) => {
		show_message('error',"Can't Fetch Data");
	});
}

loadTable(); // Load Student Record on Page opening

// Open Add new student Modal Box 


// Hide Modal Box / Popup Box


// Add Student Record


// Open Update Modal Box and show Student record in it.


// Update student record


// Delete student record


// Search student record


//show error / success message
function show_message(type,text){
	if(type=='error'){
		var message_box = document.getElementById('error-message');
	}else{
		var message_box = document.getElementById('success-message');	
	}
	message_box.innerHTML = text;
	message_box.style.display = "block";
	setTimeout(function(){
		message_box.style.display = "none";
	},3000);
}