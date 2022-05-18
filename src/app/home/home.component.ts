import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  constructor(private _fb: FormBuilder, private _appService: AppService) {
    this.searchForm = this._fb.group({
      username: ['', []]
    });
  }

  ngOnInit(): void {
  }

  searchUser = (): void => {
    this._appService.getUser(this.searchForm.value.username).subscribe((res) => {
      const userData = {
        username: this.searchForm.value.username,
        resultType: 'success',
        timestamp: Date.now(),
        ...res
      };
      this._appService.setHistry = userData;

      Swal.fire({
        title: `${res.login}`,
        imageUrl: res.avatar_url,
        html: `<div><strong>Name</strong> : ${res.name}</div>
        <div><strong>Email</strong> : ${res.email}</div>
        <div><strong>Followers</strong> : ${res.followers} <strong>Following</strong> : ${res.following}</div>`
      });

    }, (err) => {
      const userData = {
        username: this.searchForm.value.username,
        resultType: 'fail'
      };
      this._appService.setHistry = userData;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No data available for this user',
      })
    });
  }

}
