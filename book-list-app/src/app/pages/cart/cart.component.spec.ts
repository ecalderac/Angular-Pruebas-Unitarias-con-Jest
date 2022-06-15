import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";


describe('Cart Component', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

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
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] //agregar para evitar posibles errores en las pruebas
        }).compileComponents();

    });

    beforeEach( () => {
        //instanciando componente
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); //esto es como decirle que entre al onInit() del componente
    })

    it('Componente creado', () => {

        expect(component).toBeTruthy(); //comporbacion simp,e para saber si el componente se ha instanciado correctamente

    })


});