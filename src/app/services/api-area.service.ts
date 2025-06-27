import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllProductArea } from '../../interfaces/all-product-area';

@Injectable({
  providedIn: 'root'
})
export class ApiAreaService {

  constructor(private http: HttpClient) { }

  signIn(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", body)
  }

  register(body: any){
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", body)
  }

  profileInfo() {
    return this.http.get("https://api.everrest.educata.dev/auth")
  }

  updateProfile(body: any) {
    return this.http.patch("https://api.everrest.educata.dev/auth/update", body)
  }

 
}
