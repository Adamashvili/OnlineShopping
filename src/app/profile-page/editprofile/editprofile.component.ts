import { Component, EventEmitter, Output } from '@angular/core';
import { ApiAreaService } from '../../services/api-area.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-editprofile',
  imports: [ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent {
  constructor(private userServ: ApiAreaService) {
    this.getUser();
  }
  @Output()public closeEmitter: EventEmitter<boolean> = new EventEmitter()
 
  public userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    zipcode: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl(''),
  });

  getUser() {
    this.userServ.profileInfo().subscribe({
      next: (data: any) => {
        this.userForm = new FormGroup({
          firstName: new FormControl(data.firstName, Validators.required),
              lastName: new FormControl(data.lastName, Validators.required),
              age: new FormControl(data.age, Validators.required),
              email: new FormControl(data.email, [Validators.required, Validators.email]),
              address: new FormControl(data.address, Validators.required),
              phone: new FormControl(data.phone, [
                Validators.required,
                Validators.minLength(13),
                Validators.maxLength(13)
              ]),
              zipcode: new FormControl(data.zipcode, Validators.required),
              avatar: new FormControl(data.avatar, Validators.required),
              gender: new FormControl(data.gender, Validators.required),
        });
      },
    });
  }

  updateInfo() {
    this.userServ.updateProfile(this.userForm.value).subscribe( {
      next:(data:any) => {
        console.log(data);
        
      },
      error: () => {}
    } )
    
  }

  closeForm() {
    this.closeEmitter.emit(false)
  }
}
