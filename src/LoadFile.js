import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function LoadFile(props) {

    const[inputValue, setInputValue] = useState();

    

    return (
        <>
            <Form className='w-100' >
                <Form.Label>Metni aşağıya giriniz.</Form.Label>
                <Form.Control className='w-100' as="textarea" rows={15} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </Form>
            <Button className='mt-3' onClick={() => props.saveText(inputValue)} >Kaydet</Button>
        </>
    );
}

export default LoadFile;
