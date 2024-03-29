
export function convertDate(s: String): Date | null {

    if (s == '' || s == null || s == undefined || Number(s) == 0) {

        return null

    } else {

        let day: number = Number(s.substring(0, 2));

        let month: number = Number(s.substring(2, 4)) - 1

        let strAux: String = s.substring(4, 8)
        if (strAux.length == 2) {
            if (Number(strAux) > 90) {
                strAux = '19' + strAux
            } else {
                strAux = '20' + strAux
            }
        }

        let year: number = Number(strAux);

        return new Date(year, month, day)

    }



}

export function getEnumKeyByEnumValue(myEnum: any, enumValue: String): any {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

//TODO: Prepare function splitTextLineOfBC3 considering simple backslash instead of double backslash
export function splitTextLineOfBC3(str: string): string[][] {

    return str.split('|').map((el) => el.split('\\'))

}
