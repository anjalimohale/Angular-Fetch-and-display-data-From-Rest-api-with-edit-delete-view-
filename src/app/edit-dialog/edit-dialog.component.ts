import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
image:any;
imageUrl: any;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  first_name= new FormControl(this.data.first_name);
  last_name= new FormControl(this.data.last_name);
  file:any;
  onFileChange(e) {
    let reader = new FileReader();
      //get the selected file from event
    let file = e.target.files[0];
    reader.onloadend = () => {
      //Assign the result to variable for setting the src(path) of image element
    this.file= reader.result;
    }
   reader.readAsDataURL(file);
   }

  onClick(){
    this.data.first_name=this.first_name.value;
    this.data.last_name=this.last_name.value;
    this.data.avatar=this.file
      this.dialogRef.close(this.data);
  }
  
  onClickClose(){
    this.dialogRef.close();
  }


}
