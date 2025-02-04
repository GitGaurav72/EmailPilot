// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const token = localStorage.getItem('authToken');
//         console.log('Intercepted Request URL:', req.url);
//         console.log('Auth Token:', token);
      
//         const excludedUrls = ['/api/login', '/api/register'];
//         if (excludedUrls.some(url => req.url.includes(url))) {
//           console.log('Skipping token for:', req.url);
//           return next.handle(req);
//         }
       
//         if (token) {
//           const clonedRequest = req.clone({
//             setHeaders: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           console.log('Token added to request:', clonedRequest);
//           return next.handle(clonedRequest);
//         }
      
//         return next.handle(req);
//       }
      
// }


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId'); // ✅ Retrieve userId

        console.log('Intercepted Request URL:', request.url);
        console.log('Auth Token:', token);
        console.log('User ID:', userId);

        const excludedUrls = ['/api/login', '/api/register'];
        if (excludedUrls.some(url => request.url.includes(url))) {
            console.log('Skipping token for:', request.url);
            return next.handle(request);
        }

        if (token && userId) {
            const clonedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'X-User-Id': userId  // ✅ Attach userId in headers
                },
            });
            console.log('Token & UserId added to request:', clonedRequest);
            return next.handle(clonedRequest);
        } else if (token) {
            const clonedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log('Token added to request:', clonedRequest);
            return next.handle(clonedRequest);
        }

        return next.handle(request);
    }
}

