import React,{useState} from 'react'
import { Collapse, Button } from 'react-bootstrap'

const GroupCode = React.forwardRef((props,ref) => {
    const [open, setOpen] = useState(true);
    return (
        <div ref={ref} >
            <Button 
                
                size = "sm"
                block
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className = "text-left"
            >
                {props.name}
            </Button>
            <Collapse in={open} ref={ref} >
            <div id="example-collapse-text">
                {props.children}
            </div>
            </Collapse>

        </div>
    )
}
);
export default GroupCode
