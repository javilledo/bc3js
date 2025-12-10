import { parseRegistroC } from '../../src/parser/lineParser';
import { TipoConcepto } from '../../src/types'; // Importante importar el Enum

describe('parseRegistroC (~C)', () => {

    // ... (mantén los tests anteriores de sinónimos y fechas) ...

    // CASO NUEVO: Validación del Enum TipoConcepto
    it('debe identificar correctamente el TIPO de concepto (Enum)', () => {
        // Ejemplo: "3" corresponde a Materiales
        // Ejemplo: "1" corresponde a Mano de Obra
        const lineaMaterial = '~C|LADRILLO|u|Ladrillo hueco|0.50|01012024|3|';
        const lineaManoObra = '~C|OFICIAL|h|Oficial 1a|20.00|01012024|1|';

        const resMaterial = parseRegistroC(lineaMaterial);
        const resManoObra = parseRegistroC(lineaManoObra);

        // Verificamos contra el Enum
        expect(resMaterial.tipoConcepto).toBe(TipoConcepto.Materiales); // 3
        expect(resManoObra.tipoConcepto).toBe(TipoConcepto.ManoDeObra); // 1
    });

    it('debe dejar tipoConcepto como undefined si viene vacío', () => {
        const lineaSinTipo = '~C|ITEM||Generico|10|||'; // El campo 6 está vacío (el último | cierra el 6)

        const res = parseRegistroC(lineaSinTipo);
        expect(res.tipoConcepto).toBeUndefined();
    });
});