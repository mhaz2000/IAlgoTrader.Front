import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-edit-personal-information',
  templateUrl: './edit-personal-information.component.html',
  styleUrls: ['./edit-personal-information.component.css']
})
export class EditPersonalInformationComponent implements OnInit {

camera = faCamera;

  constructor() { }

  ngOnInit(): void {
  }

  editPersonalInformationForm = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    password: new FormControl('', [Validators.minLength(6)]),
    passwordMatch: new FormControl('', [Validators.minLength(6)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.minLength(11), Validators.maxLength(11)])
  })

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }
}
