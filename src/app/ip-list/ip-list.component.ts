import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationInfo } from './../model/IpInfo';
import { HttpService } from './../services/http.service';

@Component({
  selector: 'app-ip-list',
  templateUrl: './ip-list.component.html',
  styleUrls: ['./ip-list.component.scss']
})
export class IpListComponent {
  ipList: LocationInfo[] = []
  errorMsg!: string;
  addForm : FormGroup = new FormGroup({
    ip: new FormControl('8.8.8.8', [Validators.required, this.customValidator()]),
  })
  constructor(private httpService: HttpService) { }


  send() {
    let ip = this.addForm.get('ip')?.value;
    this.errorMsg = ''
    let hasIp = this.ipList.some(d => d.ip === ip);
    if (hasIp) {
      this.errorMsg = ' IP существует в списке'
      return;
    }


    this.httpService.getIpInfo(ip).subscribe({
      next: (data: any) => {
        if (data.length != 0) { this.ipList.push(data);} else {this.errorMsg = 'Ошибка! Возможно неправильное IP'}
      },
      error: (err) => console.log(err),
    });
  }

  customValidator() {
    return (control: AbstractControl) => {
      const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

      if (regex.test(control.value)) {
        return null;
      }

      return { ipError: true };
    };
  }

  remove(ip: string) {
    this.ipList = this.ipList.filter(data => data.ip !== ip)
  }
}
