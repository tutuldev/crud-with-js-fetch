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
function addNewModal(){
	var addModal = document.getElementById("addModal");
	addModal.style.display = 'block';

	fetch('php/fetch-class-field.php')
	.then((response) => response.json())
	.then((data)=>{
			var select = document.getElementById('classlist');
			var option = '<option value="0" disabled selected>Select Class</option>';
			for(var i=0; i < data.length; i++){
				option += `<option value="${data[i].cid}">${data[i].class_name}</option>`;
			}
			select.innerHTML = option;
	})
	.catch((error) => {
		show_message('error',"Can't Fetch Class List");
	});
}

// Hide Modal Box / Popup Box
function hide_modal(){
	var addModal = document.getElementById("addModal");
	addModal.style.display = 'none';

	var editModal = document.getElementById("modal");
	editModal.style.display = 'none';
}

// Add Student Record
function submit_data(){
	var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
	var sClass = document.getElementById('classlist').value;
	var city = document.getElementById('city').value;

	if(fname === '' || lname === '' || sClass === '0' || city === ''){
		alert('Please Fill All The Fields');
		return false;
	}else{
		var formdata = {
			'fname' : fname,
			'lname' : lname,
			'class' : sClass,
			'city' : city
		}

		jsondata = JSON.stringify(formdata);

		fetch('php/fetch-insert.php',{
			method : 'POST',
			body : jsondata,
			headers: {
				'Content-type' : 'application/json',
			}
		})
		.then((response) => response.json())
		.then((result)=>{
				if(result.insert == 'success'){
					show_message('success','Data Inserted Successfully.');
					loadTable();
					hide_modal();
					document.getElementById('addModal-form').reset();
				}else{
					show_message('error',"Data Can't Inserted.");
					hide_modal();
				}
		})
		.catch((error) => {
			show_message('error',"Data not Inserted.");
		});
	}
}

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