export default interface cateSteelDefect {
    steelDefectID: number;
    defectName: string;
    defectType: string;
    parentID: number;
    material: string;
    number? : number,
    isDelete?: boolean
}

export interface cateSteelDefect_MANAGER extends cateSteelDefect {
    option1: cateSteelDefect[],
    option2: cateSteelDefect[],
    option3: cateSteelDefect[],
    option4: cateSteelDefect[],
}

export interface cateSteelDefectList {
    steelDefectID: number;
    defectName: string;
    defectType: string;
    option1: cateSteelDefectList[],
    option2: cateSteelDefectList[],
    option3: cateSteelDefectList[],
    option4: cateSteelDefectList[],
}
