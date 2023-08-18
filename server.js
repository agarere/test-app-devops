const express = require('express');
const app = express();
const { accessControl } = require('./middleware')

const PORT = 5000;

const users = [
  { id: 1, name: 'Ediz'},
  { id: 2, name: 'Hülya'}
]

// not: req.body'yi json olarak alabilmek için bu middleware dahil ediyoruz.
app.use(express.json())

// not: accessControl middleware'ını tüm requestler için kullanılır.
// app.use(accessControl)

// not: accessControl middleware'ını bu request için kullanılır.
// app.get('/users', accessControl, (req, res, next) => {
//   res.json(users)
// })

app.get('/users', (req, res, next) => {
  res.json(users)
})

app.post('/users', (req, res, next) => {
  console.log('body:', req.body)

  const user = req.body
  users.push(user)

  res.json({
    success: true,
    data: user
  })
})

app.put('/users/:id', (req, res, next) => {
  const user = req.body
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex < 0) {
    res.status(400).json({
      success: false,
      message: 'The user not found !'
    })
    return
  }

  users.splice(userIndex, 1, user)

  res.json({
    success: true,
    data: user
  })
})

app.delete('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex < 0) {
    res.status(400).json({
      success: false,
      message: 'The user not found !'
    })
    return
  }

  users.splice(userIndex, 1)

  res.json({
    success: true,
    data: 'Deleted the user'
  })
})

app.listen(PORT, () => {
  console.log('Server Started');
});