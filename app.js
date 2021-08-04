$(document).ready(function(){
	$('#task-result').hide();
	let edit = false;
	fetchTasks();
	$('#search').keyup(function(){
		if($('#search').val()){
			let search = $('#search').val();
			$.ajax({
				url: 'task-search.php',
				data: {search},
				type: 'POST',
				success: function (response){
					if(!response.error){
						let tasks = JSON.parse(response);
						let template = '';
						tasks.forEach(task => {
							template +=  `<li><a href="#" classs="task-item"> ${task.name}</a></li>`
						});
						$('#task-result').show();
						$('#container').html(template);
					}
				}
			})
		}
	});
	$('#task-form').submit(function(e){
		const postData = {
			name: $('#name').val(),
			description: $('#description').val(),
			id: $('#taskId').val()
		};
		let url = edit === false ? 'task-add.php' : 'task-edit.php';
		$.post(url, postData, function(response){
			fetchTasks();
			$('#task-form').trigger('reset');
		});
		e.preventDefault();
	});

	function fetchTasks(){
		$.ajax({
		url: 'task-list.php',
		type: 'GET',
		success: function(response){
			
			let tasklist = JSON.parse(response);
			let template = '';
			tasklist.forEach(task => {
				template += `
					<tr taskId="${task.id}">
						<td > ${task.id}</td>
						<td> 
							<a href="#" class="task-item">${task.name} </a>
						</td>
						<td> ${task.description}</td>
						<td>
							<button class="btn btn-danger task-delete"> Delete </button>
						</td>
					</tr>
				`
			});
			$('#tasks').html(template);
		}
	});
	}

	$(document).on('click', '.task-delete', function() {
		if(confirm('Are you sure to delete it?')){
			let element = $(this)[0].parentElement.parentElement;
			let id = $(element).attr('taskId');
			$.post('task-delete.php', {id}, function(response){
				fetchTasks();
			});
		}
	});
	$(document).on('click', '.task-item', function(){
		
		let element = $(this)[0].parentElement.parentElement;
		
		let id = $(element).attr('taskId');
		
		$.post('task-single.php', {id}, function(response){
			
			const task = JSON.parse(response);

			$('#name').val(task.name);
			$('#description').val(task.description);
			$('#taskId').val(task.id);
			edit = true;
		});
	});

})