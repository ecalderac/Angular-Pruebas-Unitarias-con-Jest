import { ReduceTextPipe } from "./reduce-text.pipe";


//recordar las importaciones que se hicieron el componente home para que funcionara correctamente las pruebas
describe('ReduceTextPipe', () => {

    let pipe: ReduceTextPipe;

    beforeEach( () => {
        pipe = new ReduceTextPipe();
    });

    it('Puede crearse', () => {
        expect(pipe).toBeTruthy();
    })

    // transform(value: string, ...args: number[]): string {
    //     return value.substring(0, args[0]);
    //   }

    it('Se puede usar pipe transform correctamente', () => {

        const text = 'Hello this is a test to check the pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);

    });

});