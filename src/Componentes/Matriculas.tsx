import adapterFetch from 'alova/fetch'
import { createAlova } from 'alova'
import { useState, useEffect } from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const url = 'http://localhost:3000/'

const alovaInstance = createAlova({
    requestAdapter: adapterFetch(),
    cacheFor: null
})

const Obtener = (ruta: string, setear: any) => {
    alovaInstance.Get(url + ruta).then((response: any) => response.json()).then(setear)
}

export default function Matriculas() {
    const [matriculas, setMatriculas] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [cursos, setCursos] = useState([])
    const [id, setId] = useState('')
    const [alumnoId, setAlumnoId] = useState('')
    const [cursoId, setCursoId] = useState('')
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        Obtener('alumnos', setAlumnos)
        Obtener('cursos', setCursos)
        Obtener('matriculas', setMatriculas)
    }, [])

    const Grabar = () => {
        if (alumnoId === '' || cursoId === '') return setMensaje('Todos los campos son obligatorios')
        if (matriculas.some((mat: any) => mat.alumnoId === alumnoId && mat.cursoId === cursoId && mat.id !== id))
            return setMensaje('El alumno ya esta matriculado en ese curso')
        const datos = { alumnoId: alumnoId, cursoId: cursoId }
        const peticion = id === '' ? alovaInstance.Post(url + 'matriculas', datos) : alovaInstance.Put(url + 'matriculas/' + id, datos)
        peticion.then(() => {
            setMensaje('')
            setId('')
            setAlumnoId('')
            setCursoId('')
            Obtener('matriculas', setMatriculas)
        })
    }

    const Eliminar = (matId: string) => {
        alovaInstance.Delete(url + 'matriculas/' + matId).then(() => Obtener('matriculas', setMatriculas))
    }

    return (
        <div>
            <h2>Matriculas (Alova)</h2>
            <Form onSubmit={ev => {
                ev.preventDefault();
                Grabar();
            }}>
                <Form.Select value={alumnoId} onChange={ev => setAlumnoId(ev.currentTarget.value)}>
                    <option value=''>Seleccione alumno</option>
                    {alumnos.map((alu: any) => (
                        <option key={alu.id} value={alu.id}>{alu.nombres}</option>
                    ))}
                </Form.Select>
                <br />
                <Form.Select value={cursoId} onChange={ev => setCursoId(ev.currentTarget.value)}>
                    <option value=''>Seleccione curso</option>
                    {cursos.map((cur: any) => (
                        <option key={cur.id} value={cur.id}>{cur.nombre}</option>
                    ))}
                </Form.Select>
                <br />
                <p style={{ color: 'red' }}>{mensaje}</p>
                <Button type='submit' variant='primary'>Grabar</Button>
            </Form>

            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Alumno</th>
                        <th>Curso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.map((mat: any) => (
                        <tr key={mat.id}>
                            <td>{mat.id}</td>
                            <td>{(alumnos.find((alu: any) => String(alu.id) === mat.alumnoId) as any)?.nombres}</td>
                            <td>{(cursos.find((cur: any) => String(cur.id) === mat.cursoId) as any)?.nombre}</td>
                            <td>
                                <Button variant='warning' onClick={() => {
                                    setId(mat.id)
                                    setAlumnoId(mat.alumnoId)
                                    setCursoId(mat.cursoId)
                                }}>Editar</Button>
                                {' '}
                                <Button variant='danger' onClick={() => Eliminar(mat.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}