
import { parseRegistroK } from '../../src/parser/parseK';

describe('parseRegistroK', () => {
    it('debe parsear correctamente los porcentajes y decimales con huecos', () => {
        // Simulación:
        // Campo 2 (Porcentajes): 5% CI, 13% GG, 6% BI, 0 Baja, 21% IVA
        // Campo 3 (Moderno): DRC=3, DC=2, (hueco), DFS=4 (custom), ... resto defaults ..., DIVISA=EUR
        // Nota: Observa los dobles contrabarras para simular huecos vacíos en el string
        const linea = '~K|IGNORE_LEGACY|5\\13\\6\\0\\21|3\\2\\\\4\\3\\\\2\\2\\2\\2\\2\\2\\2\\2\\EUR|[1]';

        const resultado = parseRegistroK(linea);

        expect(resultado.tipo).toBe('K');

        // Verificar porcentajes
        expect(resultado.porcentajes).toEqual({
            costesIndirectos: 5,
            gastosGenerales: 13,
            beneficioIndustrial: 6,
            bajaAdjudicacion: 0,
            iva: 21
        });

        // Verificar formato decimales
        const formatoEur = resultado.formatosModernos[0];
        expect(formatoEur.drc).toBe(3);
        expect(formatoEur.dfs).toBe(4); // Valor custom que pusimos
        expect(formatoEur.dsp).toBe(2); // Valor por defecto (estaba vacío en string implícitamente)
        expect(formatoEur.divisa).toBe('EUR');
    });

    it('debe aplicar defaults si el campo 3 está vacío', () => {
        const linea = '~K|||||';
        const resultado = parseRegistroK(linea);

        // Los porcentajes deben ser 0
        expect(resultado.porcentajes.iva).toBe(0);

        // El array de formatos estará vacío, el consumidor deberá decidir qué hacer 
        // (normalmente aplicar default manualmente si array length es 0)
        expect(resultado.formatosModernos).toHaveLength(0);
    });
});
