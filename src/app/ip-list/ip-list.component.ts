import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationInfo } from './../model/IpInfo';
import { HttpService } from './../services/http.service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-ip-list',
  templateUrl: './ip-list.component.html',
  styleUrls: ['./ip-list.component.scss']
})
export class IpListComponent {
  ipList: LocationInfo[] = [
    {
      ip: "8.8.8.8",
      continent: "North America",
      country: "United States",
      country_capital: "Washington D.C."
    },
    {
      "ip": "8.8.8.89",
      "continent": "North America",
      "country": "United States",
      "country_capital": "Washington D.C."
    },
    {
      "ip": "128.8.8.89",
      "continent": "North America",
      "country": "United States",
      "country_capital": "Washington D.C."
    },
    {
      "ip": "128.8.128.89",
      "continent": "North America",
      "country": "United States",
      "country_capital": "Washington D.C."
    }
  ]
  errorMsg!: string;
  clubs = [
    {
      position: 1,
      name: "Liverpool",
      played: 20,
      won: 19,
      drawn: 1,
      lost: 0,
      points: 58
    },
    {
      position: 2,
      name: "Leicester City",
      played: 21,
      won: 14,
      drawn: 3,
      lost: 4,
      points: 45
    },
    {
      position: 3,
      name: "Manchester City",
      played: 21,
      won: 14,
      drawn: 2,
      lost: 5,
      points: 44
    },
    {
      position: 4,
      name: "Chelsea",
      played: 21,
      won: 11,
      drawn: 3,
      lost: 7,
      points: 36
    },
    {
      position: 5,
      name: "Manchester United",
      played: 21,
      won: 8,
      drawn: 7,
      lost: 6,
      points: 31
    }
  ];
  @ViewChild('epltable', { static: false }) epltable!: ElementRef;

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
    console.log(this.ipList);

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

  exportToExcel() {
    const ws: xlsx.WorkSheet =
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);

    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }
}

