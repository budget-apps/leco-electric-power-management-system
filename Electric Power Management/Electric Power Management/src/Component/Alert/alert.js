import Swal from 'sweetalert2'
const firebase =require('firebase')

firebase.database().ref().child('electricMap').on('child_changed',snapshot=>{
    Swal.fire('Database changed')

    console.log(snapshot.val())
  })
