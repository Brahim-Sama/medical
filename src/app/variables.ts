import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";


export const httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : environment.authorization
    })
  }