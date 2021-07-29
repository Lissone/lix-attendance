import { http } from './app'
import './websockets/client'

const port = process.env.PORT || 5000

http.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
