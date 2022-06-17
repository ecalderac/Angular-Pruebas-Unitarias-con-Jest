import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";


//Se crea constante para utilizar en getTotalPrice de las pruebas
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


describe('Cart Component', () => {

    let component: CartComponent; //para utilizar compoentes
    let fixture: ComponentFixture<CartComponent>; //para utilizar componente
    let service: BookService;

    //------------------------------------------------------------
    //NOTAS IMPORTANTES
    //SE EJECUTA ANTES DE CADA TEST  //beforeEach(()=> {})
    //SE EJECUTA DESPUES DE CADA TEST  //afterEach(()=> {})
    //SE EJECUTA AL PRINCIPIO DEL TODO Y DESPUES NO SE LLAMA MAS  //beforeAll(()=> {})
    //SE EJECUTA DESPUES DE QUE HAYAN TERMINADO TODOS LOS TESTS  //afterAll(()=> {})
    //------------------------------------------------------------


    //beforeEach se ejecuta antes de cada test
    beforeEach( () => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService //en los providers se instancian los servicios que se estan utilizando en el componente a testaear, osea lo que estan en el contructor de ese componente
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] //agregar para evitar posibles errores en las pruebas
        }).compileComponents();

    });


    // ngOnInit(): void {
    //     this.listCartBook = this._bookService.getBooksFromCart();
    //     this.totalPrice = this.getTotalPrice(this.listCartBook);
    //   }


    //se puede utilizar mas de un beforeEach
    beforeEach( () => {
        //instanciando componente
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); //esto es como decirle que entre al onInit() del componente
        //estas 3 lineas de codigo se necesitan para instanciar el componente

        //Instanciando Servicio, recordar que siempre debe ir despues de haber instanciado el fixture
        service = fixture.debugElement.injector.get(BookService);

        //test para ngOninit ya que esta llamando unos servicios al iniciar
        jest.spyOn(service, 'getBooksFromCart').mockImplementation( () => listBook ); //aqui cumpliendo con el test unitario en ngOninit para que devuelva el listado de libros al iniciar
    });


    //se ejecuta despues de cada test
    afterEach( () => {
        //realizando los respectivos resets para que se limpie despues de cada prueba
        fixture.destroy(); // se destruye el fixture para q despues se vuelva a instanciar
        jest.resetAllMocks(); // setea todos los mocks despues de cada test
    })


    //La prueba mas sencilla de realizar para comporbar que existe un componente
    it('Componente creado', () => {

        expect(component).toBeTruthy(); //comporbacion simp,e para saber si el componente se ha instanciado correctamente

    });


    //Se copia metodo del test a realizar para solo tenerlo de referencia
    // public getTotalPrice(listCartBook: Book[]): number {
    //     let totalPrice = 0;
    //     listCartBook.forEach((book: Book) => {
    //       totalPrice += book.amount * book.price;
    //     });
    //     return totalPrice;
    //   }

    //Esta prueba se esta realizando con una funciuon que devuelve un return
    it('getTotalPrice returns an amount', () => {

        const totalPrice = component.getTotalPrice(listBook); //instanciando el componente y le pasamos el array de libros creado arriba, en resumen esta utilizando la misma funcion del componente CartComponent y esta asignando el valor recibido a una constante la cual se puede evaluar como uno quiera
        //console.log('valor total price:',totalPrice)
        expect(totalPrice).toBeGreaterThan(0); //estamos indicando que el valor obtenido de totalPrice es mayor que 0
        expect(totalPrice).not.toBe(0); //indicando que el totalPrice no sea igual 0
        expect(totalPrice).not.toBeNull();; //indicando que el totalPrice no sea nulo
    });


    // public onInputNumberChange(action: string, book: Book): void {
    //     const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
    //     book.amount = Number(amount);
    //     this.listCartBook = this._bookService.updateAmountBook(book);
    //     this.totalPrice = this.getTotalPrice(this.listCartBook);
    //   }

    //Este metodo no devuelve un return por lo que en estos casos se debe de ocupar un spy
    it('onInputNumberChange incrementa correctamente', () => {

        const action = 'plus';
        const book: Book = {
                name: '',
                author: '',
                isbn: '',
                price: 15,
                amount: 2
        }

        //Esto se deja todo comentado ya que sera instanciado mas arriba, recordar que se debe de ocupar la forma 3 que es la correcta 
        //Primera forma para llamar al servicio(NO RECOMENDADO)
        //const service1 = (component as any)._bookService; //Esta forma no es recomendad llamar al servicio ya que si bien funciona rompoe el tipado en typescript y no se aprovecha su funcionalidad
        
        //Segunda forma para llamar al servicio(NO RECOMENDADO) 
        //const service2 = component["_bookService"]; //Esta forma igual funciona pero tampoco se recomienda ya que puede haber errores en el llamado a bookService

        //Tercera forma para llamar al servicio(RECOMENDADO Y ASÍ DEBE SER)
        //const service = fixture.debugElement.injector.get(BookService); //Instanciando el servicio BookService (FORMA 3 CORRECTA - ACTUAL)
        //const service2 = TestBed.get(BookService) //Esta forma igual se puede utilizar solo que para versiones superiores de angular esta deprecada (FORMA 3 CORRECTA - ANTIGUA)

        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null); //aqui estamos llamando al servicio con su respectiva funcion
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null ); //el codigo desde = .mockImplementation( () => null ) , hace referencia a que no se va a llamar realmente el compoenete o servicio indicado y solo devolvera un null, esto se debe de hacer por que no se debe de llamar realmente un servicio en las pruebas unitarias

        //verificando que el valor de book.amount es igual a 2, declarado incialmente
        expect(book.amount).toBe(2);

        //para llamar este metodo siempre antes deben de declararse primero los espias - spy
        component.onInputNumberChange(action, book);

        //como ya se ejecuto la accion en la linea de codigo anterior, el valor de amount deberia haberse sumado 1 segun la funcion.
        expect(book.amount).toBe(3);

        expect(spy1).toHaveBeenCalled(); //comprueba que ha sido llamado correctamente
        expect(spy2).toHaveBeenCalledTimes(1); //comprueba cuantas veces ha tenido que ser llamado, en este caso asumiendo que se llamo solo 1 vez

    });

    it('onInputNumberChange decrementa correctamente', () => {

        const action = 'minus';
        const book: Book = {
                name: '',
                author: '',
                isbn: '',
                price: 15,
                amount: 2
        }

        const spy1 = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null); //aqui estamos llamando al servicio con su respectiva funcion
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null ); //el codigo dessde = .mockImplementation( () => null ) , hace referencia a que no se va a llamar realmente el compoenete o servicio indicado y solo devolvera un null, esto se debe de hacer por que no se debe de llamar realmente un servicio en las pruebas unitarias

        //verificando que el valor de book.amount es igual a 2, declarado incialmente
        expect(book.amount).toBe(2);

        //para llamar este metodo siempre antes deben de declararse primero los espias - spy
        component.onInputNumberChange(action, book);

        //como ya se ejecuto la accion en la linea de codigo anterior, el valor de amount deberia haberse restado 1 segun la funcion.
        expect(book.amount).toBe(1);
        expect(book.amount === 1).toBe(true); //lo mismo del expect de arriba pero echo de otra forma

        expect(spy1).toHaveBeenCalled(); //comprueba que ha sido llamado correctamente
        expect(spy2).toHaveBeenCalledTimes(1); //comprueba cuantas veces ha tenido que ser llamado, en este caso asumiendo que se llamo solo 1 vez

    });


    // public onClearBooks(): void {
    //     if (this.listCartBook && this.listCartBook.length > 0) {
    //       this._clearListCartBook();
    //     } else {
    //        console.log("No books available");
    //     }
    //   }
    
    //   private _clearListCartBook() {
    //     this.listCartBook = [];
    //     this._bookService.removeBooksFromCart();
    //   }

    it('_clearListCartBook funciona correctamente', () => {

        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null );
        const spy2 = jest.spyOn(component as any, '_clearListCartBook'); //En este caso no es necesario mockear, pero si se utiliza un metodo no recomendado anteriormente pero se debe de ocupar si o si para llamar a un metodo privado ya que no hay otra forma
        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0); //como ya se llamo a la funcion se deberia haber vaciado el carro, por ende se comprueba comprobando a traves del largo de este para ver si la lista esta vacia
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);

    });

    it('_clearListCartBook funciona correctamente', () => {

        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null );
        component.listCartBook = listBook;
        component["_clearListCartBook"]();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalledTimes(1);

    });

});