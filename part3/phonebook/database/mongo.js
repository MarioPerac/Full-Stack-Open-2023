const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://peracmario:${password}@phonebookcluster.jysyzwv.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)


if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const info = new Person({ name: name, number: number })
    info.save().then(result => {
        console.log('added ' + name + ' number ' + number + ' to phonebook')
        mongoose.connection.close()
    })

}
else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(persons => {
        persons.forEach(person => console.log(person.name + ' ' + person.number))
        mongoose.connection.close()
    })
}