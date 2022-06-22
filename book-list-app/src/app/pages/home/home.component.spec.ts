import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "../../models/book.model";
import { BookService } from "../../services/book.service";
import { HomeComponent } from "./home.component"


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

//se utiliza en beforeEach, providers          
// {
//     provide: BookService,
//     useValue: bookServiceMock
// }
//creando un mock de un servicio
const bookServiceMock = {
    getBooks: () => of(listBook)
}

//creando una clase para implementar test para una pipe
@Pipe({ name: 'reduceText' })
class ReducePipeMock implements PipeTransform {
    transform(): string {
        return '';
    }
}

describe('Home component', () => {

    let componet: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach( () => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent,
                ReducePipeMock
            ],
            providers: [
                //BookService
                //De la siguiente forma estamos diciendo que cada vez que se llame al servicio de BookService, debemos de utilizar bookServiceMock colocado en useValue
                //creando un mock de un servicio
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

        }).compileComponents();

    });

    beforeEach( ()=> {

        fixture = TestBed.createComponent(HomeComponent);
        componet = fixture.componentInstance;
        fixture.detectChanges();

    })

    it('Componente creado correctamente', () => {
        expect(componet).toBeTruthy();
    })


    // public getBooks(): void {
    //     this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
    //       this.listBook = resp;
    //     });
    //   }

    //test a suscripciones
    it('getBook obtiene los libros de la suscripcion', () => {

        const bookService = fixture.debugElement.injector.get(BookService);
        //se comenta el spya debido a que se importo en beforeEach - providers
        //const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce( of(listBook) ); //of se ocupa para devolver un observable como se requeire en la funcion del componente
        componet.getBooks();
        //se comenta el spya debido a que se importo en beforeEach - providers
        //expect(spy1).toHaveBeenCalledTimes(1); //comprobamos que se esta llamando al menos una vez
        expect(componet.listBook.length).toBe(3); //comporbando que el tamaño del array es 3 ya que se estan pasando 3 libros en la lista
        expect(componet.listBook).toEqual(listBook); //toEqual nos sirve para comparar objetos

    });



})