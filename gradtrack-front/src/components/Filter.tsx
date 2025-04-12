type Props = {
    graduado: string;
    setGraduado: (category: string) => void;
    name:string;
    setName: (name: string) => void;
}
export default function Filter(props:Props) {
    return (
        <>
            <div className="flex justify-start items-center gap-3">
                <label className="text-gray-700 text-lg font-bold">Filtros</label>
                <input
                    type="text"
                    placeholder="Search product..."
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={props.graduado}
                    onChange={(e) => props.setGraduado(e.target.value)}
                >
                    <option value="" disabled>Select an option</option>
                    <option key={1} value="All">Todos</option>
                    <option key={2} value="SI">Graduado</option>
                    <option key={3} value="NO">No Graduado</option>
                </select>
            </div>
        </>
    )
}