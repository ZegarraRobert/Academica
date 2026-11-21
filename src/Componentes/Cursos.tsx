import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'

export default function Cursos() {
    const [cursos, setCursos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        axios({ url: 'http://localhost:3000/cursos' })
            .then((response: any) => setCursos(response.data))
            .catch(() => setError("Error al cargar cursos"))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Cargando cursos...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h2>Consulta de Cursos</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Creditos</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map((cur: any) => (
                        <tr key={cur.id}>
                            <td>{cur.codigo}</td>
                            <td>{cur.nombre}</td>
                            <td>{cur.creditos}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}