import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export type ProjectView = 'ADD' | 'EDIT' | 'READ';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  projectViewType: ProjectView = 'ADD';
  project: FormGroup = new FormGroup({
    general: new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl(''),
      company: new FormControl(''),
      leader: new FormControl(''),
    }),
    budget: new FormGroup({
      estimatedBudget: new FormControl(''),
      amount: new FormControl('', Validators.required),
      duration: new FormControl(''),
    }),
  });

  constructor(private router: Router) {
    if (this.router.url.includes('add-project')) {
      this.projectViewType = 'ADD';
    } else if (this.router.url.includes('edit-project')) {
      this.projectViewType = 'EDIT';
    } else {
      this.projectViewType = 'READ';
    }
  }

  ngOnInit() {
    if (this.projectViewType === 'EDIT') {
      let projects = localStorage.getItem('projects');
      if (projects !== null) {
        this.project.setValue((JSON.parse(projects) as any)[0]);
      }
    }
  }

  resetProject() {
    this.project.reset();
  }

  onAddProject() {
    let projects = localStorage.getItem('projects');
    let newProjects = [];
    if (projects === null) {
      newProjects.push(this.project.value);
    } else {
      projects = JSON.parse(projects);
      (projects as any).push(this.project.value);
      newProjects.push(...(projects as any));
    }
    localStorage.setItem('projects', JSON.stringify(newProjects));
    this.resetProject();
  }
}
