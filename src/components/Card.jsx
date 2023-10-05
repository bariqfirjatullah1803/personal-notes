export default function Card(props) {
    return (
        <div
            className={'border-white border-[1px] w-full h-auto text-white p-5 rounded-md flex flex-col justify-between'}>
            <div className={'mb-5 leading-relaxed'}>
                <h1 className={'text-3xl'}>{props.title}</h1>
                <p className={'text-xl mb-3'}>{props.date}</p>
                <p>{props.description}</p>
            </div>
            <div className={'flex flex-row w-full'}>
                <button
                    className={'text-yellow-400 w-full border-[1px] border-yellow-400 rounded-md px-5 py-3 font-semibold text-center me-3'}
                    onClick={() => props.onChange(props.id)}>{(props.archived === true) ? 'Pindahkan' : 'Arsipkan'}
                </button>
                <button
                    className={'text-red-400 w-full border-[1px] border-red-400 rounded-md px-5 py-3 font-semibold text-center'}
                    onClick={() => props.onDelete(props.id)}>Hapus
                </button>
            </div>
        </div>
    );
}