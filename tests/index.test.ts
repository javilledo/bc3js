// tests/index.test.ts
import { holaMundo } from '../src/index';

describe('Probando bc3js', () => {
    test('holaMundo debería devolver el saludo correcto', () => {
        // 1. Preparación (no necesaria aquí)

        // 2. Ejecución
        const resultado = holaMundo();

        // 3. Verificación
        expect(resultado).toBe("Hola desde bc3js");
    });
});