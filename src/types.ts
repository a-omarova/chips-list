export type ChipListType = {
    multipleChoice: boolean,
    list: ChipType[]
}

export type ChipType = {
    id: string,
    value: string,
    name: string
}

export type ChipPropsType = {
    id: string,
    multiple?: boolean,
    value: string,
    isChecked?: boolean,
    name?: string,
    onChipClick?: (id: string) => void
}
