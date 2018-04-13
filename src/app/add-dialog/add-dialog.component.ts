import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  fname:string;
  lname:string;
  image:any;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit() {
  }
  onFileChange($event) {
    this.image=$event.target.files[0];
    console.log(this.image); // outputs the first file
   }
  onClick(){
     let name={first_name:this.fname,last_name:this.lname,avatar:this.image}
      this.dialogRef.close(name);
  }
  onClickClose(){
    this.dialogRef.close();
  }

}
