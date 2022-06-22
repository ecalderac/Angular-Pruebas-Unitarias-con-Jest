import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service";

describe('BookService', () => {

    let service: BookService;
    let httpMock: HttpClientTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            BookService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    beforeEach( () => {

        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);

        //recordar que aqui debe haber un cambio ver nota de la seccion 31, anterior

    });

});