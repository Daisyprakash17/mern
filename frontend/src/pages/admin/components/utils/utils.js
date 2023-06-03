export const categoryChange=(e,categories,setattributesFromDb,setcategoryChoosen)=>{ 

    const newcategory=e.target.value.split('/')[0]; 
    const newcategoryData=categories.find((item)=>item.name===newcategory) 
    if(newcategoryData && newcategoryData.attrs){
    setattributesFromDb(newcategoryData.attrs)}
    else
    setattributesFromDb([])

    setcategoryChoosen(e.target.value);
}

export const onattschangeHandler=(e,attvalue,attributesFromDb)=>{
    // console.log('attribut chagne is called');
    if(e.target.value!="Choose attribute")
    {
            let selectedAttr=attributesFromDb.find((item)=>item.key===e.target.value)
            let valueForattrkey=attvalue.current;
            console.log(attvalue.current);
            if(selectedAttr && selectedAttr.value.length>0)
            {
                while(valueForattrkey.options.length){
                    valueForattrkey.remove(0);
                }
                valueForattrkey.options.add(new Option("Choose attribute value"));
                selectedAttr.value.map((item)=>{
                    valueForattrkey.add(new Option(item));
                    return "";
                })
            }
    }
}

export const attributvalueChanged=(e,attkey,attvalue,attributesTable,setattributesTable)=>{
    if(e.target.value!=="Choose attribute value")
    {
        const key=attkey.current.value;
        const value=attvalue.current.value;
         

            let keyalreadyexistintable=false;
            let newattributevalues=attributesTable.map((item)=>{
                if(item.key===key)
                {
                    keyalreadyexistintable=true;
                    return {key:key,value:value}
                }
                else
                return item;
            })
            if(!keyalreadyexistintable)
                {
                    newattributevalues.push({key:key,value:value})
                } 
                setattributesTable(newattributevalues)
             
        
    }
}