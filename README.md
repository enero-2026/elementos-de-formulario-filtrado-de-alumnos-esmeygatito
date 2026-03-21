# Ejercicio de Forms y Creación de Datos

Continuación del ejercicio de lista de Alumnos y ordenamiento de los elementos

Utilizaremos
https://oss.callstack.com/react-native-paper/docs/components/Modal 
https://oss.callstack.com/react-native-paper/docs/components/Button/ 
https://oss.callstack.com/react-native-paper/docs/components/TextInput/

Modal
1. Crear un componente con Modal de Agregar alumno (Agregar.js)
2. Utilizar Modal de Paper como contenedor
3. Agregar 2 campos de texto de Paper
4. Estos 2 campos de texto almacenaran la matrícula y nombre del alumno respectivamente
5. Agregar un método onAdd, este es un manejador de evento en React native para manejar la lógica cuando un elemento se agrega a una lista, justo para nuestro ejercicio 👀
6. Agregar un 2do boton que sea para Cancelar, al hacer clic se debe limpiar los 2 campos de texto y cerrar el Modal

Alumno
1. Importar el componente de Agregar que recién creamos
2. Recuerda que Agregar regresa el parámetro del nuevo alumno, quedaría algo así: <AlumnoModal onAdd={agregarAlumno} />
3. Modificaremos el arreglo de alumnos para que incluya el nuevo alumno, en este caso utilizaremos el operador ... (spread), que básicamente toma todos los elementos actuales del arreglo, los copia y agrega el nuevo elemento al final, como resultado React native detecta el cambio en el estado y actualiza el arreglo.

Ejemplo: 
```
const alumnos = [
  { nombre: "Alexis" },
  { nombre: "Samanta" }
];

const nuevoAlumno = { nombre: "Diego" };

setAlumnos([...alumnos, nuevoAlumno]);
```

Resultado: 
```
[
  { nombre: "Alexis" },
  { nombre: "Samantha" },
  { nombre: "Diego" }
]

```


Consideraciones:
1. El componente del Modal es HIJO del componente de Alumno, por lo cual recibe parametros de Alumno que controlan ciertos aspectos como la visibilidad del modal, qué sucede cuando se agrega el elemento al arreglo  y qué sucede cuando el usuario cancela y cierra el modal.
2. Puedes utilizar referencia de una asignación anterior 👀 para revisar este punto de la comunicación entre componentes.
