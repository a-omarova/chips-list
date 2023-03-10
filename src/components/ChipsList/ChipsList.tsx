import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ChipsList.module.css'
import { Chip } from '@/components/Chip/Chip'
import { ChipListType } from '@/types'

export const ChipsList = (props: ChipListType) => {
    const {
        multipleChoice,
        list
    } = props
    const [chosenList, setChosenList] = useState<string[]>([])
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [chipPopupNextLineFirstElem, setChipPopupNextLineFirstElem] = useState<number>(-1)
    const popupRef = useRef<any>(null)
    const sectionRef = useRef<any>(null)
    const chipsListRef = useRef<any>(null)

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setOpenPopup(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [popupRef])

    useEffect(() => {
        function handleRecalculateChips () {
            if (chipsListRef.current) {
                const arr = [...chipsListRef.current.children]
                const firstElemOffsetTop = arr[0].offsetTop

                setChipPopupNextLineFirstElem(arr.findIndex(chip => chip.offsetTop > firstElemOffsetTop))
            }
        }

        window.addEventListener('resize', handleRecalculateChips);
        handleRecalculateChips();
        return () => window.removeEventListener('resize', handleRecalculateChips);
    }, [list])

    const onChipClick = useCallback((id: string) => {
        if (multipleChoice) {
            if (chosenList.includes(id)) {
                setChosenList(prevList => prevList.filter(item => item !== id))
            } else {
                setChosenList(prevList => [...prevList, id])
            }
        } else {
            setChosenList([id])
        }
    }, [chosenList, multipleChoice])

    console.log(chipPopupNextLineFirstElem)

    return (
        <section className={styles.root} ref={sectionRef}>
            <div className={styles.chipsList} ref={chipsListRef}>
                {list.slice(0, chipPopupNextLineFirstElem === -1 ? list.length : chipPopupNextLineFirstElem).map(chip => (
                    <Chip
                        key={chip.id}
                        id={chip.id}
                        name={chip.name}
                        multiple={multipleChoice}
                        value={chip.value}
                        isChecked={chosenList.includes(chip.id)}
                        onChipClick={onChipClick}
                    />
                ))}
            </div>
            {chipPopupNextLineFirstElem !== -1 && (
                <div className={styles.moreContainer} ref={popupRef}>
                    <button className={styles.moreButton} onClick={() => setOpenPopup(!openPopup)}>
                        <span className="visually-hidden">Показать больше</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                            <path
                                d="M12 9.75c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25 2.25-1.01 2.25-2.25S13.24 9.75 12 9.75Zm-7.5 0c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25S6.75 13.24 6.75 12 5.74 9.75 4.5 9.75Zm15 0c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25 2.25-1.01 2.25-2.25-1.01-2.25-2.25-2.25Z"
                                fill="currentColor"/>
                        </svg>
                    </button>
                    {openPopup && (
                        <div className={styles.morePopup}>
                            {list.slice(chipPopupNextLineFirstElem, list.length).map(chip => (
                                <Chip
                                    key={chip.id}
                                    id={chip.id}
                                    name={chip.name}
                                    multiple={multipleChoice}
                                    value={chip.value}
                                    isChecked={chosenList.includes(chip.id)}
                                    onChipClick={onChipClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
