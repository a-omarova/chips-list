import Head from 'next/head'
import { ChipsList } from '@/components/ChipsList/ChipsList'
import {dataCheckbox, dataRadio} from '@/data';
import { Chip } from '@/components/Chip/Chip'

export default function Home() {
    return (
        <>
            <Head>
                <title>Chips List</title>
                <meta name="description" content="Chips List component example"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Примеры</h1>
                <div>
                    <h2>Список чипсов с выбором нескольких чипсов</h2>
                    <ChipsList multipleChoice={true} list={dataCheckbox}/>
                </div>
                <div>
                    <h2>Список чипсов с выбором только одного чипса</h2>
                    <ChipsList multipleChoice={false} list={dataRadio}/>
                </div>
                <div>
                    <h2>Одиночные чипсы</h2>
                    <Chip id='single-chip' value="single-chip"/>
                </div>
            </main>
        </>
    )
}
