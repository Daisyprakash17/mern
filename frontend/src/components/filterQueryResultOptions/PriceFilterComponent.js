import { Form } from "react-bootstrap";

const PriceFilterComponent = ({price,setprice}) => {
  return (
    <>
      <Form.Label>
        <span className="fw-bold ">Price no greater than:</span>{" "}₹{" "}{ price}
      </Form.Label>
      <Form.Range min={10} max={1000} step={10} onChange={(e)=>{
        setprice(e.target.value)
      }} />
    </>
  );
};

export default PriceFilterComponent;
