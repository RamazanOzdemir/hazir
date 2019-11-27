import React,{useEffect,useState} from 'react';
import { Progress } from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
import { ProgressBar } from "react-bootstrap";


const Simple_chart = (props)=>{
    const {title,desc,number,color} = props;
    const [count,setCount] = useState(0);
    const [width,setWidth] = useState(0);
    const x = 200/number;
    useEffect(()=>{
            if(count < number){
            setTimeout(() => {
                setCount(count+1);
                setWidth(width+x)
        }, 50);}  
          
    },[count]);

    return(
        <>
        <div className="col-12 bg-white text-center" style={{height:'200px',padding:'30px'}}>
            <h2 className={`mt-3`}>{title}</h2>
            <p className={`text-${color}`}>{desc}</p>
            <h1 className={`text-${color} text-darken-5`}><b>{count}</b></h1>
        </div>
        <ProgressBar animated now={width} variant={color} />

        <div className="kt-space-20" />
        </>
    );
}

export default Simple_chart;