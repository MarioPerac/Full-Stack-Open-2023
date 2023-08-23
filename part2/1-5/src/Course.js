import React from "react"

const Header = (props) => {

    return (<div>
        <h1>{props.course}</h1>
    </div>)
}

const Part = ({ part }) => {
    return (<div>
        <p>{part.name} {part.exercises}</p>
    </div>)
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (<div>
        <p><b>total of {sum} exercises</b></p>
    </div>)

}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course