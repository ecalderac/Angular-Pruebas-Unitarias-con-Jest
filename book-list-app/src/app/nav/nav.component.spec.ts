import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
// import { HomeComponent } from "../pages/home/home.component";
// import { CartComponent } from "../pages/cart/cart.component";

//Esto se realiza para no importar todos lo componentes y colocar solo esto para hacerlo mas limpio, luego esto se utiliza en los import en vez del componente propiamente tal, es un truco
class ComponentTestRoute {}

describe('Nav component', () => {

    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;


    beforeEach( () => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: ComponentTestRoute },
                    { path: 'cart', component: ComponentTestRoute },
                ]),
            ],
            declarations: [
                NavComponent
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })

    });

    beforeEach( () => {

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('Deberia crearse', () => {

        expect(component).toBeTruthy();

    });

    it('Deberia navegar', () => {

        const router = TestBed.inject(Router);
        const spy = jest.spyOn(router, 'navigate');

        component.navTo('home'); //indicandole al componente que navegue a home
        expect(spy).toHaveBeenCalledWith(['/home']); //comporbar que navego a home especificamente
        
        component.navTo('cart'); //indicandole al componente que navegue a cart
        expect(spy).toHaveBeenCalledWith(['/cart']); //comporbar que navego a cart especificamente
        
        expect(spy).toHaveBeenCalled(); //esto es para comprobar solo que navego hacia otra pagina 

    });

});