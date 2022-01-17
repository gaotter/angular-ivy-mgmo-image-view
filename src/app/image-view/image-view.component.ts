import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css'],
})
export class ImageViewComponent implements OnInit {
  constructor(private http: HttpClient, private sanitization: DomSanitizer) {}

  @Input() imageSrc: string = '';

  safeImageSrc: any;

  ngOnInit(): void {
    if (this.imageSrc?.length > 0) {
      this.downLoadImage(this.imageSrc);
    }
  }

  downLoadImage(uri: string) {
    const HTTPOptions = {
      headers: new HttpHeaders({
        Accept: 'image/*',
      }),
      responseType: 'blob' as 'json',
    };

    const request = this.http.get(uri, HTTPOptions);

    request.subscribe((d: any) => {
      const objUrl = URL.createObjectURL(d);

      const safeUrl: SafeResourceUrl =
        this.sanitization.bypassSecurityTrustResourceUrl(objUrl);
      this.safeImageSrc = safeUrl;
    });
  }
}
