import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'
 
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  accept = '*';
  files:File[] = [];
  progress:number;
  url = 'https://evening-anchorage-3159.herokuapp.com/api/';
  hasBaseDropZoneOver:boolean = false;
  httpEmitter:Subscription;
  httpEvent:HttpEvent<{}>;
  lastFileAt:Date;
 
  sendableFormData:FormData;//populated via ngfFormData directive
 
  constructor(public HttpClient:HttpClient){}
 
  cancel(){
    this.progress = 0
    if( this.httpEmitter ){
      console.log('cancelled')
      this.httpEmitter.unsubscribe()
    }
  }
 
  uploadFiles(files:File[]):Subscription{
    const req = new HttpRequest<FormData>('POST', this.url, this.sendableFormData, {
      reportProgress: true//, responseType: 'text'
    })
    
    return this.httpEmitter = this.HttpClient.request(req)
    .subscribe(
      event=>{
        this.httpEvent = event
        
        if (event instanceof HttpResponse) {
          delete this.httpEmitter
          console.log('request done', event)
        }
      },
      error=>console.log('Error Uploading',error)
    )
  }
 
  getDate(){
    return new Date()
  }
}
