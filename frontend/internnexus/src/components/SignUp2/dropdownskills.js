import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import '../SignUp2/CustomDropDown.css';
import list from "../SignUp2/list.json";


function CustomButtonExample() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='relative'>
    <Button onClick={() => setIsOpen((prev)=> !prev)}    className='skills-button'>Select Your Skills
    {!isOpen ?
   
   ( <AiOutlineCaretDown className='h-8'/> ):
   (  <AiOutlineCaretUp className='h-8'/>
    )}
    </Button>
   {isOpen && (
    <div className='elementet'>
        {list.map((item, i)=>(
            <div className='element-children' key={i}>
                <h3>{item.Skills}</h3>
                <h3>{item.SkillsCss}</h3>
                <h3>{item.SkillsJs}</h3>

            </div>
        )
        )} </div>
   )}
    </div>
  );
}

export default CustomButtonExample;
