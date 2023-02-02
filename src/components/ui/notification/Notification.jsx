import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notification = (props) => {
    const { status } = props
    const style = {
        height: '20px',
        width: '290px',
    }
    if (status === 'success') {
        style.backgroundColor = '#EAFBE7'
        style.color = '#EAFBE7'
    } else if (status === 'warning') {
        style.backgroundColor = '#FFF3D8'
        style.color = '#ED9E44'
    } else if (status === 'info') {
        style.backgroundColor = '#EBEFF7'
        style.color = '#375BB0'
    } else if (status === 'error') {
        style.backgroundColor = '#FFEBEB'
        style.color = '#BC2C2C'
    }

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="colored"
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ width: '400px', height: '50px' }}
            toastStyle={style}
        />
    )
}

export default Notification
