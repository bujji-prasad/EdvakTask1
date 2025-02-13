import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const deletedTasksFromStorage = JSON.parse(localStorage.getItem('deletedTasks') || '[]');
    this.deletedTasks = deletedTasksFromStorage;
    this.getTasks();
  }

  Task = {
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: '',
    status: '',
    markasRead: false,
  };

  isCreateTaskOpen: boolean = false;
  isCreateTask: boolean = false;
  isUpdateTask: boolean = false;
  idToUpdateTask: String = '';
  idToDeleteTask: String = '';
  showCreateTaskBtn: boolean = false;
  showUpdateTaskBtn: boolean = false;
  isDelete: boolean = false;
  tasks: any[] = [];
  filteredTasks: any[] = [];
  deletedTasks: any[] = [];

  priorityValue: String = '';
  statusValue: String = '';
  searchValue: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalTasks: number = 0;

  createTask() {
    this.isCreateTaskOpen = true;
    this.isCreateTask = true;
    this.isUpdateTask = false;
    this.idToUpdateTask = '';
    this.showCreateTaskBtn = true;
    this.showUpdateTaskBtn = false;
  }

  
  CreateTaskClose() {
    this.isCreateTaskOpen = false;
  }

  closeCreateTask() {
    this.isCreateTaskOpen = false;
  }

  onTaskCreated() {
    if (!this.Task.title || !this.Task.description || !this.Task.assignedTo || !this.Task.dueDate || !this.Task.priority || !this.Task.status) {
      console.log("Please fill in all required fields.");
      return;
    }

    if (this.isCreateTask) {
      console.log('Creating task...');
      this.apiService.addTaskApi(this.Task).subscribe(
        (response) => {
          console.log('Task added to DB:', response);
          this.isCreateTaskOpen = false;
          this.Task = { title: '', description: '', assignedTo: '', dueDate: '', priority: '', status: '', markasRead: false };
          this.getTasks();
        },
        (error) => {
          console.log('Error while adding task:', error);
          alert('Error while creating task: ' + error.message);
        }
      );
    } else {
      console.log('Editing task...');
      this.apiService.updateTaskApi(this.idToUpdateTask, this.Task).subscribe(
        (response) => {
          console.log('Task updated in DB:', response);
          this.isCreateTaskOpen = false;
          this.Task = { title: '', description: '', assignedTo: '', dueDate: '', priority: '', status: '', markasRead: false };
          this.getTasks();
        },
        (error) => {
          console.log('Error while updating task:', error);
          alert('Error while updating task: ' + error.message);
        }
      );
    }
  }

  
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredTasks = this.filteredTasks.slice(startIndex, endIndex);
    this.cdr.detectChanges();  
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
      this.getTasks()
    }
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
      this.getTasks()
    }
  }

  onTaskDelete(taskId: String) {
    console.log(`deleting the task with id: ${taskId}`);
    this.isDelete = true;
    this.idToDeleteTask = taskId;
  }

  onDeleteConfirm() {
    const taskIndex = this.tasks.findIndex(task => task._id === this.idToDeleteTask);
    if (taskIndex !== -1) {
      const deletedTask = this.tasks.splice(taskIndex, 1)[0];
      this.deletedTasks.push(deletedTask);
      localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks));

      
      this.applyFilter();
      this.applyPagination();
    }
    this.isDelete = false;
  }

 
  onDeleteCancel() {
    console.log("on delete cancel");
    this.isDelete = false;
  }

  
  onUpdateTask(taskId: String) {
    this.idToUpdateTask = taskId;
    console.log(`id to update task: ${this.idToUpdateTask}`);
    this.isCreateTaskOpen = true;
    this.isCreateTask = false;
    this.isUpdateTask = true;
    this.showUpdateTaskBtn = true;
    this.showCreateTaskBtn = false;

    this.apiService.getTaskbyIdApi(taskId).subscribe(
      (response) => {
        this.Task = {
          title: response.task.title,
          description: response.task.description,
          assignedTo: response.task.assignedTo,
          dueDate: response.task.dueDate,
          priority: response.task.priority,
          status: response.task.status,
          markasRead: response.task.markasRead,
        };
        console.log(JSON.stringify(this.Task));
      },
      (error) => {
        console.log('Error while fetching task to edit', error);
      }
    );
  }

  
  applyFilter() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesPriority = this.priorityValue ? task.priority === this.priorityValue : true;
      const matchesStatus = this.statusValue ? task.status === this.statusValue : true;
      const matchesSearch = this.searchValue ? task.title.toLowerCase().includes(this.searchValue.toLowerCase()) : true;
      return matchesPriority && matchesStatus && matchesSearch;
    });

    this.totalTasks = this.filteredTasks.length;
    this.totalPages = Math.ceil(this.totalTasks / this.itemsPerPage);
    this.applyPagination();
  }

  
  getTasks() {
    this.apiService.getTasksApi().subscribe(
      (response) => {
        this.tasks = response.tasks;
        this.tasks = this.tasks.filter(task => !this.deletedTasks.some(deletedTask => deletedTask._id === task._id));
        this.filteredTasks = [...this.tasks]; 
        this.applyFilter();
      },
      (error) => {
        console.log('Error fetching tasks:', error);
      }
    );
  }

  
  onChangePriority() {
    this.applyFilter();
  }

  onChangeStatus() {
    this.applyFilter();
  }


  onSearchTitle() {
    this.applyFilter();
  }
}
