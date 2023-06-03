import { useEffect } from "react";
import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({attrsfilter,setattrsfromfilter}) => {
  const color= ["red", "blue", "green"]
  const ram= ["1 TB", "2 TB"]
  useEffect(()=>{ 
    }
  ,[])
  return (
    <> 
    <span className="fw-bold mb-3">Attributes</span>
    {attrsfilter && attrsfilter.length>0 &&(
      
      attrsfilter.map((filter,index)=>{
      return <div key={index} className="mb-3">
        <Form.Label>
          <b>{filter.key} </b>
        </Form.Label>
        {filter.value.map((valueforkey, idx) => (
          <Form.Check key={idx} type="checkbox" label={valueforkey} onChange={(e)=>{
            setattrsfromfilter(filters => {
              if (filters.length === 0) {
                  return [{ key: filter.key, values: [valueforkey] }];
              } 

             let index = filters.findIndex((item) => item.key === filter.key);
             if (index === -1) {
                 // if not found (if clicked key is not inside filters)
                 return [...filters, { key: filter.key, values: [valueforkey] }];
             }

             // if clicked key is inside filters and checked
             if (e.target.checked) {
                 filters[index].values.push(valueforkey);
                 let unique = [...new Set(filters[index].values)];
                 filters[index].values = unique;
                 return [...filters];
             }

             // if clicked key is inside filters and unchecked
             let valuesWithoutUnChecked = filters[index].values.filter((val) => val !== valueforkey);
             filters[index].values = valuesWithoutUnChecked;
             if (valuesWithoutUnChecked.length > 0) {
                 return [...filters];
             } else {
                 let filtersWithoutOneKey = filters.filter((item) => item.key !== filter.key);
                 return [...filtersWithoutOneKey];
             }

          })
          }} />
          ))}
      </div> 
    
    }
    ))} 
    </>
  );
};

export default AttributesFilterComponent;
