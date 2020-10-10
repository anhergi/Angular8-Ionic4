import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Product } from '../domain/product';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' }),
};
const apiUrl = "http://localhost:3000/api/v1/products";

export class ApiService {

    constructor(private http: HttpClient) {

    }

    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            return of(result as T);
        };
    }

    getProducts(): Observable<Array<Product>> {
        return this.http
            .get<Array<Product>>(apiUrl)
                .pipe(
                    tap(product => console.log("fetched products")),
                    catchError(this.handleError('getProducts', []))
                );
    }

    getProduct(id: any): Observable<Product> {
        const url = apiUrl + "/" + id;
        return this.http
            .get<Product>(url)
                .pipe(
                    tap(res => console.log("fetched product id = ${id}")),
                    catchError(this.handleError<Product>('getProduct id = ${id}'))
                );
    }

    addProduct(product: any): Observable<any> {
        return this.http
            .post<any>(apiUrl, product, httpOptions)
                .pipe(
                    tap((prod: any) => console.log("added product id=${prod.id}")),
                    catchError(this.handleError<any>('addProduct'))
                );
    }

    updateProduct(id: any, product: any): Observable<any> {
        const url = apiUrl + "/" + id;
        return this.http
            .put<any>(url, product, httpOptions)
                .pipe(
                    tap(res => console.log("updated product id=${id}")),
                    catchError(this.handleError<any>('updateProduct'))
                );
    }

    deleteProduct(id: any): Observable<Product> {
        const url = apiUrl + "/" + id;
        return this.http
            .delete<Product>(url, httpOptions)
                .pipe(
                    tap(res => console.log("deleted product id=${id}")),
                    catchError(this.handleError<Product>('deleteProduct'))
                );
    }
}
