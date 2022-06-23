import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../environments/environment.prod";

import { Book } from "../models/book.model";
import { BookService } from "./book.service";
import swal from 'sweetalert2';

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    },
]

describe('BookService', () => {

    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach( () => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });

    });

    beforeEach( () => {

        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    //para resetear el localstorage
    afterEach( () => {

        jest.resetAllMocks();
        localStorage.clear();
    
    });

    afterEach( () => {

        httpMock.verify();

    });

    it('should create', () => {

        expect(service).toBeTruthy();

    });

    // public getBooks(): Observable<Book[]> {
    //     const url: string = environment.API_REST_URL + `/book`;
    //     return this._httpClient.get<Book[]>(url);
    //   }

    it('getBook devuelve una lista de libros y realiza un metodo get', () => {

        service.getBooks().subscribe( (resp: Book[] ) => {

            expect(resp).toEqual(listBook); //esperamos que la respuesta sea igual al listado de libros

        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET'); //comprobando que el metodo que se esta realizando sea de tipo GET
        req.flush(listBook); //simulando que la peticion se esta realizando y esta devolviendo un observable de tipo listbook

    });

    // public getBooksFromCart(): Book[] {
    //     let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    //     if (listBook === null) {
    //       listBook = [];
    //     }
    //     return listBook;
    //   }

    //para que funcione correctamente este servicio se debe de tener en cuenta la configuracion que se coloco en setup-jest.ts
    it('getBooksFromCart devuelve un array vacio cuando el localstorage esta vacio', () => {

        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);

    });

    it('getBooksFromCart devuelve un array de libros cuando exista en el localstorage', () => {

        localStorage.setItem('listCartBook', JSON.stringify(listBook));
        const newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(3);

    });

    // public addBookToCart(book: Book) {
    //     let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    //     if (listBook === null) { // Create a list with the book
    //       book.amount = 1;
    //       listBook = [ book ];
    //     } else { 
    //       const index = listBook.findIndex((item: Book) => {
    //         return book.id === item.id;
    //       });
    //       if (index !== -1) { // Update the quantity in the existing book
    //         listBook[index].amount++;
    //       } else { 
    //         book.amount = 1;
    //         listBook.push(book);
    //       }
    //     }
    //     localStorage.setItem('listCartBook', JSON.stringify(listBook));
    //     this._toastSuccess(book);
    //   }

    it('addBookToCart añade un libro correctamente cuando la lista no existe en el localstorage', () => {

       const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };

        //para probar el toast
        const toastMock = {
            fire: () => null
        } as any;
        //para probar el toast
        const spy1 = jest.spyOn(swal, 'mixin').mockImplementation( () => {
            return toastMock;
        });

        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
        service.addBookToCart(book);
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
        expect(spy1).toHaveBeenCalledTimes(1);

    });

    
//   public removeBooksFromCart(): void {
//     localStorage.setItem('listCartBook', null);
//   }

    it('removeBooksFromCart elimina la lista en el localstorage', () => {

        //para probar el toast
        const toastMock = {
            fire: () => null
        } as any;
        //para probar el toast
        jest.spyOn(swal, 'mixin').mockImplementation( () => {
            return toastMock;
        });

        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };

        service.addBookToCart(book);
        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
        service.removeBooksFromCart();
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);

    });

});