import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AppService } from '../app.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historyList: any[] = [];

  constructor(private _appService: AppService, private _cdRef: ChangeDetectorRef) {
    this.historyList = this._appService.getHistory;
  }

  ngOnInit(): void {
  }

  searchUser = (userData: any): void => {
    if (userData.resultType === 'success') {
      Swal.fire({
        title: `${userData.login}`,
        imageUrl: userData.avatar_url,
        html: `<div><strong>Name</strong> : ${userData.name}</div>
        <div><strong>Email</strong> : ${userData.email}</div>
        <div><strong>Followers</strong> : ${userData.followers} <strong>Following</strong> : ${userData.following}</div>`
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No data available for this user',
      })
    }
  }

  deleteDelected = (selected: any) => {
    if (selected && selected._value && selected._value.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(selected._value);

          selected._value.forEach((ele: number) => {
            this._appService.deleteHistory(ele);
          });
          this.historyList = this._appService.getHistory;
          this._cdRef.detectChanges();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    } else {
      Swal.fire('Selecte at least one element to delete!');
    }
  }


  clearHistory = (): void => {

    Swal.fire({
      title: 'Are you sure, You want to clear all History?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._appService.clearAllHistory();
        this.historyList.length = 0;
        this._cdRef.detectChanges();
        this._cdRef.detectChanges();
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })


  }
}
