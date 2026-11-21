import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form, Table } from 'react-bootstrap'

const url = 'http://localhost:3000/alumnos'

export default function AlumnosAxios() {
    const [alumnos, setAlumnos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [codigo, setCodigo] = useState('')
    const [nombres, setNombres] = useState('')
    const [correo, setCorreo] = useState('')
    const [carrera, setCarrera] = useState('')
    const [mensaje, setMensaje] = useState('')

    const Listar = () => {
        axios({ url: url })
            .then((response: any) => setAlumnos(response.data))
            .catch(() => setError("Error al cargar alumnos"))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        Listar()
    }, [])

    const Grabar = () => {
        const errorMessage = Validate(codigo, nombres, correo, carrera, alumnos)
        if (errorMessage !== '') {
            setMensaje(errorMessage)
            return
        }
        axios.post(url, { codigo: codigo, nombres: nombres, correo: correo, carrera: carrera })
            .then(() => {
                setMensaje('')
                setCodigo('')
                setNombres('')
                setCorreo('')
                setCarrera('')
                Listar()
            })
            .catch(() => setMensaje('Error al registrar alumno'))
    }

    if (loading) return <p>Cargando alumnos...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h2>Alumnos (Axios)</h2>
            <Form onSubmit={ev => {
                ev.preventDefault();
                Grabar();
            }}>
                <Form.Control type='text' name='codigo' placeholder='Codigo' autoComplete='false'
                    value={codigo} onChange={ev => setCodigo(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='nombres' placeholder='Nombres' autoComplete='false'
                    value={nombres} onChange={ev => setNombres(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='correo' placeholder='Correo' autoComplete='false'
                    value={correo} onChange={ev => setCorreo(ev.currentTarget.value)} />
                <br />
                <Form.Control type='text' name='carrera' placeholder='Carrera' autoComplete='false'
                    value={carrera} onChange={ev => setCarrera(ev.currentTarget.value)} />
                <br />
                <p style={{ color: 'red' }}>{mensaje}</p>
                <Button type='submit' variant='primary'>Grabar</Button>
            </Form>

            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Codigo</th>
                        <th>Nombres</th>
                        <th>Correo</th>
                        <th>Carrera</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map((alu: any) => (
                        <tr key={alu.id}>
                            <td>{alu.id}</td>
                            <td>{alu.codigo}</td>
                            <td>{alu.nombres}</td>
                            <td>{alu.correo}</td>
                            <td>{alu.carrera}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const Validate = (codigo: string, nombres: string, correo: string, carrera: string, alumnos: any[]) => {
    if (codigo === '' || nombres === '' || correo === '' || carrera === '') return 'Todos los campos son obligatorios'
    if (!correo.includes('@')) return 'El correo no es valido'
    if (alumnos.some((alu: any) => alu.codigo === codigo)) return 'El codigo ya esta registrado'
    return ''
}