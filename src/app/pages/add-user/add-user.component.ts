import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading = false;
  cardTypes = [
    'jcb',
    'instapayment',
    'bankcard',
    'diners-club-carte-blanche',
    'americanexpress',
    'switch',
    'mastercard',
    'maestro',
    'diners-club-enroute',
    'solo',
  ]

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    const formData = this.form.value;
    const userData: User = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      image: formData.image,
      bank: {
        cardExpire: formData.cardExpire,
        cardNumber: formData.cardNumber,
        cardType: formData.cardType,
      }
    };
    this.usersService.addUser(userData).subscribe((data: User) => {
      if(data.id) {
        this.usersService.openSnackBar(data.id, `User id ${data.id} has been added`);
      }
      this.loading = false;
    });
    void this.router.navigate(['/']);
  }
}
