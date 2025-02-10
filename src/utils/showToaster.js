import toast from "react-hot-toast";

const showToaster = () => {
    toast.error('You must login or register to add items to your wishlist !', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      })
}

export default showToaster;