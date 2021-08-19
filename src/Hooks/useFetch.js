import {useState , useEffect, useRef} from 'react';
import axios from "axios";


function useFetch(url) {
    const [data , setData] = useState([]);
    const loading  = useRef(false);

    useEffect(() => { 
        const fetchData = async () => {
           try {
             const res = await axios.get(`${url}&key=${process.env.REACT_APP_API_KEY}`)
             loading.current = true ;
             setData(res.data);
           }catch (err) {
             console.log(err);
             loading.current = false ;
           }
        }
          fetchData();

     },[url]);

     return {data , loading} 

}

export default useFetch;
