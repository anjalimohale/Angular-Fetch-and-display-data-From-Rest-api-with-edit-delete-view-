import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent, MatDialog} from '@angular/material';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns = ['id', 'first_name', 'last_name', 'avatar', 'actions'];
  dataSource: any;
  currentPage:PageEvent;
  page_size;
  length;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private userService: UserService,
              public dialog: MatDialog) {}

  ngOnInit(){
    this.loadData(this.currentPage);
}
loadData(currentPage){ 
 
  this.userService.getPage(currentPage).subscribe(
    data => { 
      console.log(data);
      this.page_size=data['per_page'];
      this.length=data['total'];
      this.dataSource=new MatTableDataSource(data.data);
      console.log(this.dataSource);
    }
  );
}
onPaginateChange(event){ 
  this.currentPage=event.pageIndex+1;
  this.loadData(this.currentPage);
}

viewData:string;
addData:string;
add(){
console.log("Add called");
const dialogRef = this.dialog.open(AddDialogComponent, {width: '350px', height: '350px'
});
dialogRef.afterClosed()
      .subscribe(selection => {
      if(selection){
        this.addData=selection;
        console.log(selection);
      }
    });
}

edit(user){
  console.log("Edit called");
  const dialogRef = this.dialog.open(EditDialogComponent, {width: '350px', height: '350px',
   data:user,
  });
  dialogRef.afterClosed()
        .subscribe(selection => {
        if(selection){
          console.log(selection);
        }
      })
}

delete(i,user){
  console.log("Delete called",i);
  const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '350px', height: '350px',
    data: user,
  });
  dialogRef.afterClosed()
        .subscribe(selection => {
        if(selection){
          console.log(selection);
          this.dataSource.data.splice(i,1);
          this.dataSource=new MatTableDataSource(this.dataSource.data);
        }
      })
}

view(user){
  console.log("View called");
  const dialogRef = this.dialog.open(ViewDialogComponent, {width: '370px', height: '390px',
    data:user,
  });
  dialogRef.afterClosed()
        .subscribe(selection => {
        if(selection){
          console.log(selection);
        }
      });
}



}