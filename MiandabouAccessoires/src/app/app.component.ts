import { Component, OnInit } from '@angular/core';
import { apis } from '../environments/api.environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MiandabouAccessoires';
  url: string = `https://maps.googleapis.com/maps/api/js?key=${apis.googleMapsApiKey}&callback=console.debug&libraries=places`;

  ngOnInit() {
    this.loadGoogleMapsApi(this.url);
  }

  loadGoogleMapsApi(url: string) {
    // const script = document.createElement('script');
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${apis.googleMapsApiKey}&callback=console.debug&libraries=places`;
    // script.defer = true;
    // script.async = true;
    // document.head.appendChild(script);
    // console.log(script);
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
      resolve(script);
    });
  }
  
}
